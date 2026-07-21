import type { VercelRequest, VercelResponse } from '@vercel/node';
import { HttpError } from './_src/utils/http-error.js';
import * as logger from './_src/utils/logger.js';
import { ContactRequestSchema } from './_src/utils/contact-schema.js';
import type {
    ContactRequest,
    ContactSchema,
} from './_src/utils/contact-schema.js';
import { sendEmail } from './_src/utils/send-email.js';
import { ContactEmail } from './_src/emails/Contact.js';
import { sendLeadToAirtable } from './_src/airtable-lead.js';
import { onboardingEmail } from './_src/onboarding-email.js';

const FROM_EMAIL = process.env.FROM_EMAIL ?? '';
const TO_EMAIL = process.env.TO_EMAIL ?? '';

const SENDER_NAME = 'JBM Web Co' as const;

const log_rejection = (
    message: string,
    result: PromiseSettledResult<unknown>
): void => {
    if (result.status === 'rejected') {
        logger.error(message, {
            error:
                result.reason instanceof Error
                    ? result.reason.message
                    : String(result.reason),
        });
    }
};

const validate_request = (req: VercelRequest): ContactRequest => {
    // --- Request validation ---
    if (req.method !== 'POST') throw new HttpError(405, 'Method not allowed');

    // --- Body validation ---
    const parsed = ContactRequestSchema.safeParse(req.body);
    if (!parsed.success) throw new HttpError(400, 'Invalid request body');

    return parsed.data;
};

const validate_contact_data = (data: ContactRequest): ContactSchema | null => {
    // Honeypot: real users never fill the hidden `company` field.
    // Silently accept and drop bot submissions so we don't tip them off.
    if (data.company && data.company.trim().length > 0) {
        logger.warn('Contact submission dropped by honeypot');
        return null;
    }

    // Strip the honeypot before building the email; never log raw PII.
    const { company: _company, ...contact_data } = data;
    logger.info('Received valid contact submission');

    return contact_data;
};

const contact_email = async (data: ContactSchema) => {
    if (!FROM_EMAIL || !TO_EMAIL) {
        logger.error(
            'FROM_EMAIL or TO_EMAIL environment variables are missing'
        );
        throw new HttpError(500, 'Email configuration error');
    }

    try {
        await sendEmail({
            from: `${SENDER_NAME} <${FROM_EMAIL}>`,
            to: TO_EMAIL,
            subject: `New contact form submission from ${data.name}`,
            react: ContactEmail(data),
        });
    } catch (error) {
        // Upstream email provider failed. Log the detail, return a generic
        // message so we never leak provider internals to the client.
        logger.error('Failed to send notification email', {
            error: error instanceof Error ? error.message : String(error),
        });
        throw new HttpError(502, 'Unable to send your message right now.');
    }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const request_data = validate_request(req);
        const contact_data = validate_contact_data(request_data);
        if (!contact_data) {
            // Honeypot triggered, respond with 200 to avoid tipping off bots.
            return res.status(200).json({ ok: true });
        }

        // Run all three side effects together. Airtable is the critical one:
        // if the lead isn't saved we surface a 500. The two emails are best
        // effort; a failure is logged but doesn't fail the request.
        const [airtable, onboard_email, notification_email] =
            await Promise.allSettled([
                sendLeadToAirtable(contact_data),
                onboardingEmail(contact_data),
                contact_email(contact_data),
            ]);

        if (airtable.status === 'rejected') {
            log_rejection('Failed to send lead to Airtable', airtable);
            return res.status(500).json({
                error: 'Failed to save lead data. Please try again later.',
            });
        }

        log_rejection('Failed to send onboarding email', onboard_email);
        log_rejection('Failed to send notification email', notification_email);

        return res.status(200).json({ ok: true });
    } catch (err) {
        if (err instanceof HttpError) {
            logger.error(`HTTP error ${err.statusCode}: ${err.message}`);
            return res.status(err.statusCode).json({ error: err.message });
        }

        logger.error('Unexpected error', {
            error: String(err),
        });
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
}
