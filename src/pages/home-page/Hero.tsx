import type { MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import s from './Hero.module.scss';
import { BUSINESS_DATA } from '../../business-data';
import { Button } from '../../components/Button';

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

    const scroll_to =
        (id: string) =>
        (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        };

    return (
        <section className={s.hero}>
            <span className={s.glowTop} aria-hidden="true" />
            <span className={s.glowBottom} aria-hidden="true" />

            <div className={s.inner}>
                {/* ── Left column ── */}
                <div className={s.left}>
                    <motion.div {...anim(0.3)}>
                        <div className={s.badge}>
                            <span className={s.badgeDot} />
                            Custom websites — built, hosted & managed
                        </div>
                    </motion.div>

                    <motion.h1 className={s.title} {...anim(0.4)}>
                        Websites that
                        <br />
                        <span className={s.highlight}>convert</span> your
                        visitors
                        <br />
                        into results.
                    </motion.h1>

                    <motion.p className={s.subtitle} {...anim(0.5)}>
                        More enquiries. More bookings. More attention. We build,
                        host, and manage your website so every visitor knows
                        exactly what to do next.
                    </motion.p>

                    <motion.p className={s.priceLine} {...anim(0.55)}>
                        ${BUSINESS_DATA.pricing.setup} upfront, then $
                        {BUSINESS_DATA.pricing.monthly}/month — cancel anytime
                    </motion.p>

                    <motion.div className={s.actions} {...anim(0.6)}>
                        <Button
                            href="#contact"
                            className={s.heroCtaPrimary}
                            onClick={scroll_to('contact')}
                        >
                            Get Started <ArrowRight size={17} />
                        </Button>
                        <Button
                            href="#pricing"
                            variant="secondary"
                            className={s.heroCtaSecondary}
                            onClick={scroll_to('pricing')}
                        >
                            View Pricing
                        </Button>
                    </motion.div>

                    <motion.p className={s.microReassurance} {...anim(0.65)}>
                        Takes 2 minutes. We respond within 24 hours.
                    </motion.p>
                </div>

                {/* ── Right column — product mockup ── */}
                <motion.div className={s.right} {...anim(0.55)}>
                    <div className={s.mockup} aria-hidden="true">
                        <div className={s.mockupBar}>
                            <span className={`${s.dot} ${s.dotRed}`} />
                            <span className={`${s.dot} ${s.dotAmber}`} />
                            <span className={`${s.dot} ${s.dotGreen}`} />
                            <div className={s.mockupUrl}>
                                yourwebsite.com.au
                            </div>
                        </div>
                        <div className={s.mockupBody}>
                            <div className={s.mockNav}>
                                <span className={s.mockLogo} />
                                <div className={s.mockNavLinks}>
                                    <span className={s.mockNavLink} />
                                    <span className={s.mockNavLink} />
                                    <span className={s.mockNavCta} />
                                </div>
                            </div>
                            <div className={s.mockHeadline}>
                                <span className={s.mockHeadlineDark} />
                                <span className={s.mockHeadlineBlue} />
                            </div>
                            <div className={s.mockCopy}>
                                <span className={s.mockCopyLine} />
                                <span className={s.mockCopyLineShort} />
                            </div>
                            <div className={s.mockCtaRow}>
                                <span className={s.mockCtaPrimary} />
                                <span className={s.mockCtaGhost} />
                            </div>
                            <div className={s.mockImage}>
                                <span>client photo / hero image</span>
                            </div>
                        </div>
                    </div>

                    <div className={s.floatBadge}>
                        <div className={s.floatBadgeIcon}>
                            <Check size={18} strokeWidth={2.4} />
                        </div>
                        <div>
                            <div className={s.floatBadgeTitle}>
                                Live in 3–4 weeks
                            </div>
                            <div className={s.floatBadgeSub}>
                                from brief to launch
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Bottom stat bar ── */}
            <div className={s.heroBottom}>
                <div className={s.bottomInner}>
                    {BOTTOM_STATS.map((stat, i) => (
                        <div key={stat.value} className={s.bottomStat}>
                            {i > 0 && <span className={s.bottomDivider} />}
                            <span className={s.bottomStatText}>
                                <span className={s.bottomStatValue}>
                                    {stat.value}
                                </span>
                                <span className={s.bottomStatLabel}>
                                    {stat.label}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
