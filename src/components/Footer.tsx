import { Phone, Mail, Clock } from 'lucide-react';
import { BUSINESS_DATA } from '../business-data';
import s from './Footer.module.scss';

export function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.inner}>
                <div className={s.grid}>
                    <div className={s.brand}>
                        <a
                            href="#"
                            className={s.logoText}
                            aria-label={`${BUSINESS_DATA.name} — home`}
                        >
                            {BUSINESS_DATA.name}
                        </a>
                        <p className={s.tagline}>{BUSINESS_DATA.tagline}</p>
                        <p className={s.desc}>{BUSINESS_DATA.description}</p>
                        {BUSINESS_DATA.online.facebook && (
                            <a
                                href={BUSINESS_DATA.online.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={s.social}
                                aria-label={`${BUSINESS_DATA.name} on Facebook`}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                                <span>{BUSINESS_DATA.name}</span>
                            </a>
                        )}
                    </div>

                    <div>
                        <div className={s.colTitle}>Quick Links</div>
                        <div className={s.links}>
                            {BUSINESS_DATA.navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className={s.link}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className={s.colTitle}>Contact</div>
                        <div className={s.contactItems}>
                            <a
                                href={`tel:${BUSINESS_DATA.contact.phone.replace(/\s/g, '')}`}
                                className={s.contactItem}
                            >
                                <Phone size={16} className={s.contactIcon} />
                                {BUSINESS_DATA.contact.phone}
                            </a>
                            <a
                                href={`mailto:${BUSINESS_DATA.contact.email}`}
                                className={s.contactItem}
                            >
                                <Mail size={16} className={s.contactIcon} />
                                {BUSINESS_DATA.contact.email}
                            </a>
                            <div className={s.contactItem}>
                                <Clock size={16} className={s.contactIcon} />
                                <span>{BUSINESS_DATA.hours}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.bottom}>
                    <span>
                        &copy; {new Date().getFullYear()} {BUSINESS_DATA.name}.
                        All rights reserved.
                    </span>
                    <span className={s.attribution}>
                        Website by{' '}
                        <a
                            href="https://www.jbmweb.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.attributionLink}
                        >
                            JBM Web Co
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
