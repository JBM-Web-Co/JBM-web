import { motion } from 'framer-motion';
import { Icon } from '../../components/Icon';
import { SectionHeader } from '../../components/SectionHeader';
import { useScrollReveal } from '../../hooks/use-scroll-reveal';
import { useRevealMotion } from '../../hooks/use-reveal-motion';
import { BUSINESS_DATA } from '../../business-data';
import s from './Services.module.scss';

export function Services() {
    const { ref, is_visible } = useScrollReveal();
    const reveal = useRevealMotion();

    return (
        <section id="services" className={s.services}>
            <div className={s.inner}>
                <SectionHeader
                    label="What We Do"
                    title="Our Services"
                    subtitle="A full range of professional services delivered with care and expertise."
                />

                <div ref={ref} className={s.grid}>
                    {BUSINESS_DATA.services.map((svc, i) => (
                        <motion.article
                            key={svc.title}
                            className={s.card}
                            {...reveal({
                                visible: is_visible,
                                delay: i * 0.07,
                            })}
                        >
                            <div className={s.iconWrap}>
                                <Icon name={svc.iconName} size={24} />
                            </div>
                            <h3 className={s.cardTitle}>{svc.title}</h3>
                            <p className={s.cardDesc}>{svc.description}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
