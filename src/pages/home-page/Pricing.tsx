import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import s from './Pricing.module.scss';
import type { MouseEvent } from 'react';
import { BUSINESS_DATA } from '../../business-data';
import { SectionHeader } from '../../components/SectionHeader';
import { Button } from '../../components/Button';

const INCLUSIONS = [
    'Custom-built website',
    'Mobile-responsive design',
    'Managed hosting + SSL + backups',
    'Uptime monitoring',
    'Domain & DNS wiring',
    'Contact form + CRM integration',
    'Basic on-page SEO',
    'Four small revisions per month',
] as const;

export function Pricing() {
    const reduced_motion = useReducedMotion() ?? false;

    const anim = (delay: number) =>
        reduced_motion
            ? {}
            : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay },
              };

    const scroll_to_contact = (
        e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>
    ) => {
        e.preventDefault();
        document
            .getElementById('contact')
            ?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className={s.pricing} id="pricing">
            <div className={s.inner}>
                <motion.div {...anim(0)}>
                    <SectionHeader
                        className={s.header}
                        label="Pricing"
                        title="One plan. Everything included."
                        subtitle="No tiers. No add-ons. No surprises."
                    />
                </motion.div>

                <div className={s.card}>
                    <div className={s.priceHeader}>
                        <div className={s.priceRow}>
                            <div className={s.priceGroup}>
                                <span className={s.priceLabel}>Setup</span>
                                <span className={s.priceValue}>
                                    ${BUSINESS_DATA.pricing.setup}
                                </span>
                            </div>
                            <span className={s.pricePlus}>+</span>
                            <div className={s.priceGroup}>
                                <span className={s.priceLabel}>Monthly</span>
                                <span className={s.priceValue}>
                                    ${BUSINESS_DATA.pricing.monthly}
                                    <span className={s.priceUnit}>/mo</span>
                                </span>
                            </div>
                        </div>
                        <p className={s.priceNote}>
                            Cancel anytime. No lock-in contracts.
                        </p>
                    </div>

                    <div className={s.cardBody}>
                        <p className={s.valueFrame}>
                            If your website brings in just a few extra enquiries
                            a month, it pays for itself many times over.
                            Whatever your site is for, it&apos;s a small price
                            for a professional web presence that&apos;s fully
                            managed for you.
                        </p>

                        <h3 className={s.inclusionsTitle}>
                            Everything you get, included:
                        </h3>
                        <ul className={s.features}>
                            {INCLUSIONS.map((feature) => (
                                <li key={feature} className={s.feature}>
                                    <span className={s.featureCheck}>
                                        <Check size={10} strokeWidth={3} />
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            href="#contact"
                            className={s.ctaButton}
                            onClick={scroll_to_contact}
                        >
                            Get Started
                            <ArrowRight size={17} />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
