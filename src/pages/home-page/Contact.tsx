import { useState } from 'react';
import { Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { BUSINESS_DATA } from '../../business-data';
import { Button } from '../../components/Button';
import { FormField } from '../../components/FormField';
import { SectionHeader } from '../../components/SectionHeader';
import s from './Contact.module.scss';
import { track } from '@vercel/analytics';

type ContactFormData = Readonly<{
    name: string;
    email: string;
    phone: string;
    message: string;
}>;

type ContactFormErrors = Readonly<
    Partial<Record<keyof ContactFormData, string>>
>;

const EMPTY_FORM: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
};

function validate_form(data: ContactFormData): ContactFormErrors {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!data.name.trim()) errs.name = 'Name is required';
    if (!data.email.trim()) {
        errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errs.email = 'Please enter a valid email';
    }
    if (!data.phone.trim()) {
        errs.phone = 'Phone is required';
    } else if (!/^[\d\s()+-]{8,20}$/.test(data.phone)) {
        errs.phone = 'Please enter a valid phone number';
    }
    return errs;
}

export function Contact() {
    const [form, set_form] = useState<ContactFormData>(EMPTY_FORM);
    const [errors, set_errors] = useState<ContactFormErrors>({});
    const [submitted, set_submitted] = useState(false);
    const [loading, set_loading] = useState(false);
    const [submit_error, set_submit_error] = useState<string | null>(null);
    // Honeypot: bound to a hidden field. Bots fill it; real users never do.
    const [honeypot, set_honeypot] = useState('');

    const update = (field: keyof ContactFormData) => (value: string) => {
        set_form((prev) => ({ ...prev, [field]: value }));
        if (errors[field])
            set_errors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handle_submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errs = validate_form(form);
        if (Object.keys(errs).length > 0) {
            set_errors(errs);
            return;
        }

        set_loading(true);
        set_submit_error(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, company: honeypot }),
            });

            if (!res.ok) throw new Error();

            // Only count a real, successful submission as a conversion.
            track('Form Submitted', { source: 'homepage' });
            set_submitted(true);
            set_form(EMPTY_FORM);
        } catch {
            set_submit_error('Something went wrong. Please try again later.');
        } finally {
            set_loading(false);
        }
    };

    return (
        <section id="contact" className={s.contact}>
            <div className={s.inner}>
                <SectionHeader
                    label="Get in Touch"
                    title="Contact us"
                    subtitle="Ready to get started? Give us a call or send us a message below."
                />

                <div className={s.phoneBlock}>
                    <a
                        href={`tel:${BUSINESS_DATA.contact.phone.replace(/\s/g, '')}`}
                        className={s.phoneLink}
                    >
                        <span className={s.phoneIconWrap}>
                            <Phone size={22} />
                        </span>
                        <div className={s.phoneText}>
                            <span className={s.phoneLabel}>
                                Call us directly
                            </span>
                            <span className={s.phoneNumber}>
                                {BUSINESS_DATA.contact.phone}
                            </span>
                        </div>
                    </a>
                </div>

                <div className={s.grid}>
                    <div className={s.info}>
                        <h3 className={s.infoTitle}>{BUSINESS_DATA.name}</h3>
                        <p className={s.infoText}>
                            {BUSINESS_DATA.description}
                        </p>

                        <div className={s.item}>
                            <div className={s.itemIcon}>
                                <Phone size={18} />
                            </div>
                            <div>
                                <div className={s.itemLabel}>Phone</div>
                                <a
                                    href={`tel:${BUSINESS_DATA.contact.phone.replace(/\s/g, '')}`}
                                    className={s.itemValue}
                                >
                                    {BUSINESS_DATA.contact.phone}
                                </a>
                            </div>
                        </div>

                        <div className={s.item}>
                            <div className={s.itemIcon}>
                                <Mail size={18} />
                            </div>
                            <div>
                                <div className={s.itemLabel}>Email</div>
                                <a
                                    href={`mailto:${BUSINESS_DATA.contact.email}`}
                                    className={s.itemValue}
                                >
                                    {BUSINESS_DATA.contact.email}
                                </a>
                            </div>
                        </div>

                        <div className={s.item}>
                            <div className={s.itemIcon}>
                                <Clock size={18} />
                            </div>
                            <div>
                                <div className={s.itemLabel}>Hours</div>
                                <span className={s.itemValueStatic}>
                                    {BUSINESS_DATA.hours}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={s.formWrap}>
                        {submitted ? (
                            <div className={s.successPanel}>
                                <CheckCircle2
                                    size={44}
                                    className={s.successIcon}
                                    aria-hidden="true"
                                />
                                <h3 className={s.successTitle}>
                                    Message Sent!
                                </h3>
                                <p className={s.successText}>
                                    Thanks for reaching out. We'll be in touch
                                    shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handle_submit} noValidate>
                                {/* Honeypot — hidden from users, catches bots. */}
                                <div className={s.honeypot} aria-hidden="true">
                                    <label htmlFor="contact-company">
                                        Company
                                    </label>
                                    <input
                                        id="contact-company"
                                        name="company"
                                        type="text"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={honeypot}
                                        onChange={(e) =>
                                            set_honeypot(e.target.value)
                                        }
                                    />
                                </div>
                                <FormField
                                    label="Full Name"
                                    name="name"
                                    value={form.name}
                                    error={errors.name}
                                    onChange={update('name')}
                                    placeholder="Your full name"
                                    autoComplete="name"
                                    required
                                />
                                <FormField
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    error={errors.phone}
                                    onChange={update('phone')}
                                    placeholder="04XX XXX XXX"
                                    autoComplete="tel"
                                    required
                                />
                                <FormField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    error={errors.email}
                                    onChange={update('email')}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                />
                                <FormField
                                    label="Message"
                                    name="message"
                                    type="textarea"
                                    value={form.message}
                                    onChange={update('message')}
                                    placeholder="Tell us about your project — location, scope, timeline..."
                                />
                                {submit_error && (
                                    <p className={s.submitError}>
                                        {submit_error}
                                    </p>
                                )}
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Sending…' : 'Send Message'}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
