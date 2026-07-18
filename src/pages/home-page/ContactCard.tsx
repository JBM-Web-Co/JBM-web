import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { track } from '@vercel/analytics';
import { BUSINESS_DATA } from '../../business-data';
import s from './ContactForm.module.scss';
import { Button } from '../../components/Button';

type PreferredContact = 'Email' | 'Phone' | 'Either';

type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    preferredContact: PreferredContact;
    message: string;
    // Honeypot — hidden from real users; bots that fill it are dropped.
    company: string;
};

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const INITIAL_FORM: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    preferredContact: 'Either',
    message: '',
    company: '',
};

function validate_form(form: ContactFormData): FormErrors {
    const errors: FormErrors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errors.email = 'Please enter a valid email';
    if (!form.phone.trim()) errors.phone = 'Phone number is required';
    return errors;
}

export function ContactFormCard() {
    const [form, set_form] = useState<ContactFormData>(INITIAL_FORM);
    const [errors, set_errors] = useState<FormErrors>({});
    const [loading, set_loading] = useState(false);
    const [submitted, set_submitted] = useState(false);
    const [submit_error, set_submit_error] = useState<string | null>(null);

    const set_field =
        (field: keyof ContactFormData) =>
        (
            e: ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            const value = e.target.value;
            set_form((prev) => ({ ...prev, [field]: value }));
            if (errors[field]) {
                set_errors((prev) => {
                    const next = { ...prev };
                    delete next[field];
                    return next;
                });
            }
        };

    const handle_submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validation_errors = validate_form(form);
        if (Object.keys(validation_errors).length > 0) {
            set_errors(validation_errors);
            return;
        }

        track('Form Submitted', { source: 'homepage' });
        set_loading(true);
        set_submit_error(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error('Something went wrong. Please try again.');
            }

            set_submitted(true);
        } catch {
            set_submit_error(
                `We couldn't send your request right now. Please try again. If the problem continues, contact us at ${BUSINESS_DATA.contact.email}`
            );
        } finally {
            set_loading(false);
        }
    };

    return (
        <div className={s.formCard}>
            {submitted ? (
                <div className={s.success}>
                    <CheckCircle size={56} className={s.successIcon} />
                    <h3 className={s.successTitle}>Message Sent!</h3>
                    <p className={s.successText}>
                        We&apos;ll review your details and get back to you
                        within 24 hours. Keep an eye on your inbox — we may ask
                        a few quick questions.
                    </p>
                </div>
            ) : (
                <form className={s.form} onSubmit={handle_submit} noValidate>
                    <div className={s.row}>
                        <div className={s.field}>
                            <label
                                htmlFor="contact-name"
                                className={s.fieldLabel}
                            >
                                Name *
                            </label>
                            <input
                                id="contact-name"
                                type="text"
                                className={`${s.input} ${errors.name ? s.inputError : ''}`}
                                value={form.name}
                                onChange={set_field('name')}
                                placeholder="Your full name"
                                disabled={loading}
                            />
                            {errors.name && (
                                <span className={s.fieldError}>
                                    {errors.name}
                                </span>
                            )}
                        </div>
                        <div className={s.field}>
                            <label
                                htmlFor="contact-email"
                                className={s.fieldLabel}
                            >
                                Email *
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                className={`${s.input} ${errors.email ? s.inputError : ''}`}
                                value={form.email}
                                onChange={set_field('email')}
                                placeholder="you@example.com"
                                disabled={loading}
                            />
                            {errors.email && (
                                <span className={s.fieldError}>
                                    {errors.email}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={s.row}>
                        <div className={s.field}>
                            <label
                                htmlFor="contact-phone"
                                className={s.fieldLabel}
                            >
                                Phone *
                            </label>
                            <input
                                id="contact-phone"
                                type="tel"
                                className={`${s.input} ${errors.phone ? s.inputError : ''}`}
                                value={form.phone}
                                onChange={set_field('phone')}
                                placeholder="+61 400 000 000"
                                disabled={loading}
                            />
                            {errors.phone && (
                                <span className={s.fieldError}>
                                    {errors.phone}
                                </span>
                            )}
                        </div>
                        <div className={s.field}>
                            <label
                                htmlFor="contact-preferred"
                                className={s.fieldLabel}
                            >
                                Preferred Contact Method *
                            </label>
                            <select
                                id="contact-preferred"
                                className={s.input}
                                value={form.preferredContact}
                                onChange={set_field('preferredContact')}
                                disabled={loading}
                            >
                                <option value="Either">Either</option>
                                <option value="Email">Email</option>
                                <option value="Phone">Phone</option>
                            </select>
                        </div>
                    </div>
                    <div className={s.field}>
                        <label
                            htmlFor="contact-message"
                            className={s.fieldLabel}
                        >
                            Message
                        </label>
                        <p className={s.fieldHelper}>
                            Share a few details about your project and goals.
                        </p>
                        <textarea
                            id="contact-message"
                            className={`${s.input} ${s.textarea}`}
                            value={form.message}
                            onChange={set_field('message')}
                            placeholder="Tell us about your project..."
                            rows={5}
                            disabled={loading}
                        />
                    </div>
                    <div className={s.honeypot} aria-hidden="true">
                        <label htmlFor="contact-company">
                            Company (leave blank)
                        </label>
                        <input
                            id="contact-company"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={form.company}
                            onChange={set_field('company')}
                        />
                    </div>
                    <Button
                        type="submit"
                        className={s.ctaButton}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className={s.spinner} />{' '}
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send size={16} /> Get Started
                            </>
                        )}
                    </Button>
                    {submit_error && (
                        <div className={s.errorBanner}>
                            <AlertCircle size={40} />
                            <span>{submit_error}</span>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}
