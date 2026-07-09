import type { ContactSchema } from './utils/contact-schema.js';
import { OnboardingEmail } from './emails/Onboarding.js';
import { sendEmail } from './utils/send-email.js';
import * as logger from './utils/logger.js';
import { HttpError } from './utils/http-error.js';

const FROM_EMAIL = process.env.FROM_EMAIL ?? '';

export const onboardingEmail = async (data: ContactSchema): Promise<void> => {
    if (!FROM_EMAIL) {
        logger.error(
            'Onboarding email configuration is missing: FROM_EMAIL is not set'
        );
        return;
    }

    try {
        await sendEmail({
            from: `JBM Web Co <${FROM_EMAIL}>`,
            to: data.email,
            subject: 'Next step: complete your website brief',
            react: OnboardingEmail(data),
        });
    } catch (error) {
        throw new HttpError(
            502,
            `Failed to send onboarding email: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};
