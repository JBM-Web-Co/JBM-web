import { Link } from 'react-router';
import { BUSINESS_DATA, GOOGLE_REVIEW_URL } from '../business-data';
import { FacebookIcon } from './SocialIcons';
import s from './Footer.module.scss';

export function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.inner}>
                <div className={s.top}>
                    <div className={s.brand}>
                        <Link
                            to="/"
                            className={s.logo}
                            aria-label={`${BUSINESS_DATA.name} home`}
                        >
                            <span className={s.logoMark}>JBM</span>
                            <span className={s.logoWord}>Web Co</span>
                        </Link>
                        <p className={s.tagline}>{BUSINESS_DATA.tagline}</p>
                    </div>
                    <nav className={s.nav} aria-label="Footer navigation">
                        <div className={s.navGroup}>
                            <div className={s.navTitle}>Quick Links</div>
                            <Link to="/" className={s.navLink}>
                                Home
                            </Link>
                            <Link to="/#pricing" className={s.navLink}>
                                Pricing
                            </Link>
                            <Link to="/#faq" className={s.navLink}>
                                FAQs
                            </Link>
                            <Link to="/#contact" className={s.navLink}>
                                Contact
                            </Link>
                            <Link to="/terms" className={s.navLink}>
                                Terms of Service
                            </Link>
                        </div>
                        <div className={s.navGroup}>
                            <div className={s.navTitle}>Get in Touch</div>
                            <a
                                href={`mailto:${BUSINESS_DATA.contact.email}`}
                                className={s.navLink}
                            >
                                {BUSINESS_DATA.contact.email}
                            </a>
                            <a
                                href={`tel:${BUSINESS_DATA.contact.phone.replace(/\s/g, '')}`}
                                className={s.navLink}
                            >
                                {BUSINESS_DATA.contact.phone}
                            </a>
                            <a
                                href={GOOGLE_REVIEW_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={s.navLink}
                            >
                                Leave us a Review
                            </a>
                            <div className={s.social}>
                                <a
                                    href={BUSINESS_DATA.online.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${BUSINESS_DATA.name} on Facebook`}
                                    className={s.socialLink}
                                >
                                    <FacebookIcon className={s.socialIcon} />
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className={s.bottom}>
                    <p className={s.copyright}>
                        &copy; {new Date().getFullYear()} {BUSINESS_DATA.name}.
                        All rights reserved. | {BUSINESS_DATA.abn}
                    </p>
                </div>
            </div>
        </footer>
    );
}
