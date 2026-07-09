import { motion, useReducedMotion } from 'framer-motion';
import { ClipboardList, Zap, Headphones, ShieldCheck } from 'lucide-react';
import s from './WhyChooseUs.module.scss';
import React from 'react';
import { BUSINESS_DATA } from '../../business-data';

type CredibilityBlock = {
    category: string;
    icon: React.ReactNode;
    heading: string;
    description: string;
};

const CREDIBILITY_BLOCKS: readonly CredibilityBlock[] = [
    {
        category: 'Process',
        icon: <ClipboardList size={22} />,
        heading: 'One plan, transparent pricing',
        description: `$${BUSINESS_DATA.pricing.setup} upfront + $${BUSINESS_DATA.pricing.monthly}/month. Hosting, SSL, monitoring, revisions and ongoing support — all included. No hidden fees.`,
    },
    {
        category: 'Technical',
        icon: <Zap size={22} />,
        heading: 'Fast, SEO-ready architecture',
        description:
            'Lightweight, fast-loading pages built on a modern stack, with secure hosting and SEO-ready structure from day one.',
    },
    {
        category: 'Operational',
        icon: <Headphones size={22} />,
        heading: 'Australian-based, direct communication',
        description:
            'You deal with us directly — no outsourcing, no runaround. We respond and confirm next steps within 24 hours.',
    },
    {
        category: 'Risk Reduction',
        icon: <ShieldCheck size={22} />,
        heading: 'No lock-in contracts',
        description:
            "Cancel anytime. Revisions are included, and we'll provide a full handover if you ever decide to leave.",
    },
] as const;

export function WhyChooseUs() {
    const reduced_motion = useReducedMotion() ?? false;

    return (
        <section className={s.whyChooseUs} id="why-us">
            <div className={s.inner}>
                <div className={s.header}>
                    <div className={s.label}>Why Us</div>
                    <h2 className={s.title}>
                        Why businesses choose JBM Web Co
                    </h2>
                    <p className={s.subtitle}>
                        Specialist landing pages backed by a transparent
                        process, honest pricing, and local support.
                    </p>
                </div>
                <div className={s.grid}>
                    {CREDIBILITY_BLOCKS.map((block, i) => (
                        <motion.div
                            key={block.heading}
                            className={s.card}
                            initial={
                                reduced_motion ? false : { opacity: 0, y: 20 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.4,
                                delay: 0.15 + i * 0.1,
                            }}
                        >
                            <div className={s.cardIcon}>{block.icon}</div>
                            <span className={s.cardCategory}>
                                {block.category}
                            </span>
                            <h3 className={s.cardHeading}>{block.heading}</h3>
                            <p className={s.cardDesc}>{block.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
