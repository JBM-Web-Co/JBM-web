import { ContactFormCard } from './ContactCard';
import s from './ContactForm.module.scss';
import { Phone, Mail } from 'lucide-react';
import { BUSINESS_DATA } from '../../business-data';
import { SectionHeader } from '../../components/SectionHeader';

const NEXT_STEPS = [
    'We send you an onboarding form to capture your details',
    'Once submitted, we send you a deposit invoice',
    'Once paid, your build begins',
] as const;

function ContactDetails() {
    return (
        <div className={s.info}>
            <div>
                <h3 className={s.infoTitle}>{BUSINESS_DATA.name}</h3>
                <p className={s.infoText}>
                    Custom websites, built and managed for you. Clear pricing.
                    Fast turnaround. No tech headaches.
                </p>
            </div>
            <div className={s.nextSteps}>
                <h4 className={s.stepsTitle}>What happens next?</h4>
                <p className={s.stepsSubtitle}>
                    Simple and transparent process
                </p>
                <ol className={s.stepsList}>
                    {NEXT_STEPS.map((step, i) => (
                        <li key={step} className={s.stepsItem}>
                            <span className={s.stepsNumber}>{i + 1}</span>
                            {step}
                        </li>
                    ))}
                </ol>
            </div>

            <div className={s.item}>
                <div className={s.itemIcon}>
                    <Mail size={18} />
                </div>
                <div>
                    <div className={s.itemLabel}>Email</div>
                    <a
                        href={`mailto:${BUSINESS_DATA.contact.email}`}
                        className={s.itemLink}
                    >
                        {BUSINESS_DATA.contact.email}
                    </a>
                </div>
            </div>
            <div className={s.item}>
                <div className={s.itemIcon}>
                    <Phone size={18} />
                </div>
                <div>
                    <div className={s.itemLabel}>Phone</div>
                    <a
                        href={`tel:${BUSINESS_DATA.contact.phone.replace(/\s/g, '')}`}
                        className={s.itemLink}
                    >
                        {BUSINESS_DATA.contact.phone}
                    </a>
                </div>
            </div>
        </div>
    );
}

export function ContactForm() {
    return (
        <section className={s.contactForm} id="contact">
            <div className={s.inner}>
                <div className={s.header}>
                    <SectionHeader
                        className={s.headerInner}
                        label="Contact"
                        title="Ready to launch your website?"
                        subtitle="Tell us what you need and we'll get back to you within 24 hours with a clear plan."
                    />
                    <p className={s.urgency}>
                        Limited build slots each month. Enquire early to secure
                        your spot.
                    </p>
                </div>

                <div className={s.grid}>
                    <ContactDetails />
                    <ContactFormCard />
                </div>
            </div>
        </section>
    );
}
