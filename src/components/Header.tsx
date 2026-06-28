import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { BUSINESS_DATA } from '../business-data';
import s from './Header.module.scss';

export function Header() {
    const [menu_open, set_menu_open] = useState(false);
    const [active_section, set_active_section] = useState('');
    const reduced_motion = useReducedMotion();

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        set_active_section(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -60% 0px', threshold: 0 }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const close_menu = () => set_menu_open(false);

    const phone_href = `tel:${BUSINESS_DATA.contact.phone.replace(/\s/g, '')}`;

    return (
        <header className={s.header}>
            <div className={s.inner}>
                <a
                    href="#"
                    className={s.logo}
                    aria-label={`${BUSINESS_DATA.name} — home`}
                >
                    <span className={s.logoText}>{BUSINESS_DATA.name}</span>
                </a>

                <nav className={s.nav} aria-label="Main navigation">
                    {BUSINESS_DATA.navItems.map((item) => {
                        const section_id = item.href.replace('#', '');
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`${s.link} ${active_section === section_id ? s.linkActive : ''}`}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                    <a href={phone_href} className={s.cta}>
                        <Phone size={16} />
                        Call Now
                    </a>
                </nav>

                <button
                    className={s.mobileMenuBtn}
                    onClick={() => set_menu_open(!menu_open)}
                    aria-label={menu_open ? 'Close menu' : 'Open menu'}
                    aria-expanded={menu_open}
                >
                    {menu_open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {menu_open && (
                    <motion.div
                        className={s.mobileMenu}
                        initial={reduced_motion ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduced_motion ? {} : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {BUSINESS_DATA.navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={s.mobileNavLink}
                                onClick={close_menu}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href={phone_href}
                            className={s.mobileNavCta}
                            onClick={close_menu}
                        >
                            <Phone size={18} />
                            Call {BUSINESS_DATA.contact.phone}
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
