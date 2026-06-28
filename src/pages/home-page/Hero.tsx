import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { BUSINESS_DATA } from '../../business-data';
import { useRevealMotion } from '../../hooks/use-reveal-motion';
import s from './Hero.module.scss';

export function Hero() {
    const reveal = useRevealMotion();
    const phone_href = `tel:${BUSINESS_DATA.contact.phone.replace(/\s/g, '')}`;

    return (
        <section className={s.hero}>
            <div className={s.inner}>
                <motion.p className={s.eyebrow} {...reveal({ delay: 0 })}>
                    {BUSINESS_DATA.address.city}
                </motion.p>

                <motion.h1 className={s.headline} {...reveal({ delay: 0.1 })}>
                    {BUSINESS_DATA.tagline}
                </motion.h1>

                <motion.p className={s.sub} {...reveal({ delay: 0.2 })}>
                    {BUSINESS_DATA.description}
                </motion.p>

                <motion.div className={s.ctas} {...reveal({ delay: 0.3 })}>
                    <a href={phone_href} className={s.ctaPrimary}>
                        <Phone size={18} />
                        Call {BUSINESS_DATA.contact.phone}
                    </a>
                    <a href="#contact" className={s.ctaSecondary}>
                        Get a Free Quote
                        <ArrowRight size={18} />
                    </a>
                </motion.div>

                <motion.div className={s.stats} {...reveal({ delay: 0.4 })}>
                    {BUSINESS_DATA.heroStats.map((stat) => (
                        <div key={stat.label} className={s.stat}>
                            <span className={s.statNum}>{stat.num}</span>
                            <span className={s.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
