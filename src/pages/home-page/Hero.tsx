import type { MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Target, Zap, Shield } from 'lucide-react';
import s from './Hero.module.scss';
import { BUSINESS_DATA } from '../../business-data';

const STAT_CARDS = [
    {
        icon: <Target size={22} />,
        value: 'Lead-Focused',
        label: 'Built to generate enquiries',
        gradient: 'card1',
    },
    {
        icon: <Zap size={22} />,
        value: 'Fast Delivery',
        label: 'Live in as little as 3–4 weeks',
        gradient: 'card2',
    },
    {
        icon: <Shield size={22} />,
        value: 'Fully Managed',
        label: 'Hosting & support included',
        gradient: 'card3',
    },
] as const;

const BOTTOM_STATS = [
    { value: '99.9%', label: 'Uptime guaranteed' },
    { value: '<24h', label: 'Avg. support response' },
    { value: '3–4 wks', label: 'Average time to launch' },
] as const;

export function Hero() {
    const reduced_motion = useReducedMotion() ?? false;

    const anim = (delay: number) =>
        reduced_motion
            ? {}
            : {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay },
              };

    const scroll_to = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className={s.hero}>
            <div className={s.inner}>
                {/* ── Left column ── */}
                <div className={s.left}>
                    <motion.div {...anim(0.3)}>
                        <div className={s.badge}>
                            <span className={s.badgeDot} />
                            Landing pages for Australian service businesses
                        </div>
                    </motion.div>

                    <motion.h1 className={s.title} {...anim(0.4)}>
                        Landing Pages That
                        <span className={s.highlight}> Convert</span> Your
                        Visitors Into Customers
                    </motion.h1>

                    <motion.p className={s.subtitle} {...anim(0.5)}>
                        More calls. More enquiries. We build, host, and manage
                        your landing page so you can focus on running your
                        business.
                    </motion.p>

                    <motion.p className={s.priceLine} {...anim(0.55)}>
                        ${BUSINESS_DATA.pricing.setup} upfront, then $
                        {BUSINESS_DATA.pricing.monthly}/month. Cancel anytime.
                    </motion.p>

                    <motion.div className={s.actions} {...anim(0.6)}>
                        <a
                            href="#contact"
                            className={s.btnPrimary}
                            onClick={scroll_to('contact')}
                        >
                            Get Started <ArrowRight size={16} />
                        </a>
                        <a
                            href="#pricing"
                            className={s.btnSecondary}
                            onClick={scroll_to('pricing')}
                        >
                            View Pricing
                        </a>
                    </motion.div>

                    <motion.p className={s.microReassurance} {...anim(0.65)}>
                        Takes 2 minutes. We respond within 24 hours.
                    </motion.p>
                </div>

                {/* ── Right column — gradient stat cards ── */}
                <motion.div className={s.right} {...anim(0.55)}>
                    {STAT_CARDS.map((card) => (
                        <div
                            key={card.value}
                            className={`${s.statCard} ${s[card.gradient]}`}
                        >
                            <div className={s.statCardIcon}>{card.icon}</div>
                            <div className={s.statValue}>{card.value}</div>
                            <div className={s.statLabel}>{card.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ── Bottom bar — numerical stats + scroll indicator ── */}
            <div className={s.heroBottom}>
                <div className={s.bottomInner}>
                    <div className={s.bottomStats}>
                        {BOTTOM_STATS.map((stat) => (
                            <div key={stat.value} className={s.bottomStat}>
                                <span className={s.bottomStatValue}>
                                    {stat.value}
                                </span>
                                <span className={s.bottomStatLabel}>
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
