import { motion, useReducedMotion } from 'framer-motion';
import s from './HowItWorks.module.scss';

type Step = {
    number: string;
    title: string;
    timeline: string;
    description: string;
};

const STEPS: readonly Step[] = [
    {
        number: '01',
        title: 'Strategy & Planning',
        timeline: 'Week 1',
        description:
            'We review your business, audience, and goals to explore example layouts and plan your page structure.',
    },
    {
        number: '02',
        title: 'Build & Refinement',
        timeline: 'Week 2–3',
        description:
            'We customise your landing page with your branding, content, and calls to action, then refine with your feedback.',
    },
    {
        number: '03',
        title: 'Launch & Ongoing Management',
        timeline: 'Week 4+',
        description:
            'Your page goes live and starts generating enquiries. Hosting, SSL, monitoring, and ongoing revisions are all included.',
    },
] as const;

export function HowItWorks() {
    const reduced_motion = useReducedMotion() ?? false;

    return (
        <section className={s.howItWorks} id="how-it-works">
            <div className={s.inner}>
                <div className={s.header}>
                    <div className={s.label}>How It Works</div>
                    <h2 className={s.title}>
                        From Brief to Live in Four Weeks
                    </h2>
                    <p className={s.subtitle}>
                        A clear, structured process — no tech skills needed. We
                        handle everything from strategy to launch.
                    </p>
                </div>
                <div className={s.steps}>
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={step.number}
                            className={s.step}
                            initial={
                                reduced_motion ? false : { opacity: 0, y: 20 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.4,
                                delay: 0.15 + i * 0.15,
                            }}
                        >
                            <div className={s.stepNumber}>{step.number}</div>
                            <h3 className={s.stepTitle}>{step.title}</h3>
                            <div className={s.stepTimeline}>
                                {step.timeline}
                            </div>
                            <p className={s.stepDesc}>{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
