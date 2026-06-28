import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../../components/SectionHeader';
import { useScrollReveal } from '../../hooks/use-scroll-reveal';
import { useRevealMotion } from '../../hooks/use-reveal-motion';
import { BUSINESS_DATA } from '../../business-data';
import s from './AboutUs.module.scss';

export function AboutUs() {
    const { ref, is_visible } = useScrollReveal();
    const reveal = useRevealMotion();

    return (
        <section id="about" className={s.aboutUs}>
            <div className={s.inner}>
                <SectionHeader
                    label="About Us"
                    title={`About ${BUSINESS_DATA.name}`}
                    subtitle={BUSINESS_DATA.description}
                />
                <motion.div
                    ref={ref}
                    className={s.content}
                    {...reveal({ visible: is_visible })}
                >
                    <ul className={s.points}>
                        {BUSINESS_DATA.whyUsPoints.map((point) => (
                            <li key={point} className={s.point}>
                                <CheckCircle2
                                    size={18}
                                    className={s.pointIcon}
                                    aria-hidden="true"
                                />
                                {point}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
