import type { MetaFunction } from 'react-router';
import s from './Onboarding.module.scss';

const FORM_URL =
    'https://airtable.com/embed/appxHfmSf7GtoDAaE/pagQBedE0w1qBPoaC/form';

export const meta: MetaFunction = () => [
    { title: 'JBM Web Co | Onboarding' },
    {
        name: 'description',
        content:
            "Ready to get your landing page built? Tell us about your business and we'll put together a clear plan and get back to you within 24 hours.",
    },
    { name: 'robots', content: 'noindex, follow' },
    {
        tagName: 'link',
        rel: 'canonical',
        href: 'https://www.jbmweb.com/onboarding',
    },
];

export default function Onboarding() {
    return (
        <section className={s.onboarding}>
            <div className={s.inner}>
                <h1 className={s.title}>Website onboarding</h1>
                <p className={s.helper}>
                    Complete this form to kick off your project. If you're
                    unsure, leave it blank and we'll follow up.
                </p>

                <iframe
                    className={s.embed}
                    src={FORM_URL}
                    width="100%"
                    title="JBM Web Co Onboarding Form"
                />

                <p className={s.fallback}>
                    If the form doesn't load,{' '}
                    <a
                        href={FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        open it in a new tab
                    </a>
                    .
                </p>
            </div>
        </section>
    );
}
