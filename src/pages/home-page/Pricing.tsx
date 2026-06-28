import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import s from './Pricing.module.scss';
import type { MouseEvent } from 'react';
import { BUSINESS_DATA } from '../../business-data';

const INCLUSIONS = [
    'Custom-built landing page',
    'Mobile-responsive design',
    'Managed hosting + SSL + backups',
    'Uptime monitoring',
    'Domain & DNS wiring',
    'Contact form + CRM integration',
    'Basic on-page SEO',
    'Monthly updates & revisions included.',
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

    const scroll_to_contact = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document
            .getElementById('contact')
            ?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className={s.pricing} id="pricing">
            <div className={s.inner}>
                <motion.div className={s.header} {...anim(0)}>
                    <div className={s.label}>Pricing</div>
                    <h2 className={s.title}>One Plan. Everything Included.</h2>
                    <p className={s.subtitle}>
                        No tiers. No add-ons. No surprises.
                    </p>
                </motion.div>

                <div className={s.card}>
                    <motion.div className={s.priceBlock} {...anim(0.1)}>
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
                    </motion.div>

                    <motion.p className={s.valueFrame} {...anim(0.2)}>
                        If your landing page generates just a few additional
                        enquiries per month, it pays for itself. For most
                        service businesses, a single extra job covers the cost
                        many times over.
                    </motion.p>

                    <motion.div className={s.inclusions} {...anim(0.25)}>
                        <h3 className={s.inclusionsTitle}>
                            Everything you get, included:
                        </h3>
                        <ul className={s.features}>
                            {INCLUSIONS.map((feature) => (
                                <li key={feature} className={s.feature}>
                                    <Check
                                        size={16}
                                        className={s.featureCheck}
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div className={s.ctaWrap} {...anim(0.3)}>
                        <a
                            href="#contact"
                            className={s.btnPrimary}
                            onClick={scroll_to_contact}
                        >
                            Get Started
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
