import { motion, useReducedMotion } from 'framer-motion';
import s from './HowItWorks.module.scss';
import { SectionHeader } from '../../components/SectionHeader';

type Step = {
    number: string;
    title: string;
    timeline: string;
    description: string;
};

const STEPS: readonly Step[] = [
    {
        number: '01',
        title: 'Strategy & planning',
        timeline: 'Week 1',
        description:
            'We review your goals, audience, and content, then map out example layouts and page structure.',
    },
    {
        number: '02',
        title: 'Build & refinement',
        timeline: 'Week 2–3',
        description:
            'We build your page with your branding, content, and calls to action, then refine it with your feedback.',
    },
    {
        number: '03',
        title: 'Launch & ongoing management',
        timeline: 'Week 4+',
        description:
            'Your website goes live and starts doing its job. Hosting, SSL, monitoring, and revisions are all included.',
    },
] as const;

export function HowItWorks() {
    const reduced_motion = useReducedMotion() ?? false;

    return (
        <section className={s.howItWorks} id="how-it-works">
            <div className={s.inner}>
                <SectionHeader
                    className={s.header}
                    label="How It Works"
                    title="From brief to live in four weeks"
                    subtitle="A clear, structured process — no tech skills needed. We handle everything from strategy to launch."
                />
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
                            <div className={s.stepTimeline}>
                                {step.timeline}
                            </div>
                            <h3 className={s.stepTitle}>{step.title}</h3>
                            <p className={s.stepDesc}>{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
