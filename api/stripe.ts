import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { z } from 'zod';
import { HttpError } from './_src/utils/http-error.js';
import * as logger from './_src/utils/logger.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
const DEPOSIT_COUPON_ID = 'nwTb01Wk' as const;
const BUILD_SETUP_PRICE = 'price_1T7hhdECaVL73EU2P5R16snB' as const;
const BUILD_DESCRIPTION = 'Website build & setup' as const;
const MEMO =
    'Deposit to commence work. Remaining balance due before launch.' as const;
const FOOTER =
    `Thanks for choosing JBM Web Co. If you have any questions, email us at admin@jbmweb.com or call us on 0459560321.

JBM Web Co | ABN: 75 779 233 781 | Armidale, NSW | Payment due within 7 days of invoice date. ` as const;

const address_schema = z.object({
    line1: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postal_code: z.string().min(1),
    country: z.string().default('AU'),
});

const body_schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    address: address_schema,
    business_name: z.string().min(1),
    business_abn: z.string().optional(),
    airtable_client_id: z.string().optional(),
    subscription_tier: z.enum(['monthly', 'yearly']),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        if (req.headers['jbm-api-key'] !== process.env.JBM_API_KEY) {
            throw new HttpError(401, 'Unauthorized');
        }

        const parse_result = body_schema.safeParse(req.body);

        if (!parse_result.success) {
            return res.status(400).json({
                error: 'Invalid request body',
                issues: parse_result.error.issues,
            });
        }

        const {
            name,
            email,
            phone,
            address,
            business_name,
            business_abn,
            airtable_client_id,
            subscription_tier,
        } = parse_result.data;

        // Check if a customer with the same email already exists, if not create a new one
        const existing = await stripe.customers.list({ email, limit: 1 });
        const customer =
            existing.data.length > 0
                ? existing.data[0]
                : await stripe.customers.create({
                      name,
                      email,
                      phone,
                      address,
                      description: business_name,
                      tax_id_data: business_abn
                          ? [{ type: 'au_abn', value: business_abn }]
                          : undefined,
                      metadata: {
                          business_name,
                          subscription_tier,
                          ...(airtable_client_id && { airtable_client_id }),
                      },
                  });

        //Create a line item for the build/setup fee on the customer's next invoice
        await stripe.invoiceItems.create({
            customer: customer.id,
            pricing: { price: BUILD_SETUP_PRICE },
            description: BUILD_DESCRIPTION,
        });

        // Create a draft invoice for the customer with the deposit coupon applied
        const invoice = await stripe.invoices.create({
            customer: customer.id,
            collection_method: 'send_invoice',
            days_until_due: 7,
            pending_invoice_items_behavior: 'include',
            discounts: [{ coupon: DEPOSIT_COUPON_ID }],
            description: MEMO,
            footer: FOOTER,
            metadata: {
                business_name,
                ...(airtable_client_id && { airtable_client_id }),
            },
        });

        return res.status(201).json({
            customerId: customer.id,
            invoiceId: invoice.id,
            invoiceStatus: invoice.status,
        });
    } catch (err) {
        if (err instanceof Stripe.errors.StripeError) {
            const status = err.statusCode ?? 500;
            logger.error(`Stripe error ${status}: ${err.message}`);
            return res.status(status).json({ error: err.message });
        }

        if (err instanceof HttpError) {
            logger.error(`HTTP error ${err.statusCode}: ${err.message}`);
            return res.status(err.statusCode).json({ error: err.message });
        }

        logger.error('Unexpected error creating Stripe customer', {
            error: String(err),
        });
        return res.status(500).json({
            error: 'Unexpected error creating Stripe customer',
        });
    }
}
