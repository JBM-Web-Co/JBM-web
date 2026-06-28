import { Link } from 'react-router';
import { CircleCheckBig } from 'lucide-react';
import type { MetaFunction } from 'react-router';
import s from './ThanksOnboarding.module.scss';

export const meta: MetaFunction = () => [
    { title: "JBM Web Co | Thanks — We'll Be in Touch" },
    {
        name: 'description',
        content:
            "Your project details have been received. We'll review your information and be in touch shortly to get things moving.",
    },
    { name: 'robots', content: 'noindex, nofollow' },
];

export default function ThanksOnboarding() {
    return (
        <section className={s.thanksOnboarding}>
            <div className={s.card}>
                <img
                    src="/horizontal_logo.svg"
                    alt="JBM Web Co"
                    className={s.logo}
                />
                <div className={s.iconWrap}>
                    <CircleCheckBig size={28} />
                </div>
                <h1 className={s.title}>Project details received</h1>
                <p className={s.body}>
                    Thanks for completing your onboarding form.
                </p>
                <p className={s.body}>
                    We'll review your information and organise your assets for
                    the build.
                </p>
                <p className={s.body}>
                    If anything is unclear or missing, we'll be in touch
                    shortly.
                </p>
                <p className={s.body}>
                    You'll get an update when your project moves into the build
                    phase.
                </p>
                <div className={s.actions}>
                    <Link to="/" className={s.btnPrimary}>
                        Back to home
                    </Link>
                </div>
                <p className={s.footnote}>
                    Need to add something? Email us at{' '}
                    <a href="mailto:admin@jbmweb.com">admin@jbmweb.com</a>
                </p>
            </div>
        </section>
    );
}
