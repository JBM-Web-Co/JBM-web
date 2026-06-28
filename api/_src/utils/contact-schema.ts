import { z } from 'zod';

export const ContactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(120, 'Name is too long'),
    email: z.email('Invalid email').max(254, 'Email is too long'),
    phone: z
        .string()
        .trim()
        .min(1, 'Phone is required')
        .max(40, 'Phone is too long'),
    preferredContact: z.enum(['Email', 'Phone', 'Either'], {
        message: 'Please select a contact method',
    }),
    message: z.string().trim().max(5000, 'Message is too long').optional(),
});
export type ContactSchema = z.infer<typeof ContactSchema>;

// The raw request body the client POSTs. `company` is a honeypot field —
// it is hidden from real users, so any non-empty value indicates a bot.
// It is intentionally NOT part of ContactSchema (the email payload).
export const ContactRequestSchema = ContactSchema.extend({
    company: z.string().optional(),
});
export type ContactRequest = z.infer<typeof ContactRequestSchema>;
