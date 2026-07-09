import type { MetaFunction } from 'react-router';
import s from './Terms.module.scss';

export const meta: MetaFunction = () => [
    { title: 'JBM Web Co | Terms of Service' },
    {
        name: 'description',
        content:
            'Read the terms and conditions for all JBM Web Co services, including website builds, managed hosting plans, and code handover packages.',
    },
    { property: 'og:title', content: 'Terms of Service' },
    {
        property: 'og:description',
        content:
            'Read the terms and conditions for all JBM Web Co services, including website builds, managed hosting plans, and code handover packages.',
    },
    { property: 'og:site_name', content: 'JBM Web Co' },
    {
        tagName: 'link',
        rel: 'canonical',
        href: 'https://www.jbmweb.com/terms',
    },
];

export default function TermsOfService() {
    return (
        <main className={s.termsPage}>
            <article className={s.termsArticle} aria-labelledby="tos-title">
                <header className={s.termsHeader}>
                    <h1 id="tos-title" className={s.termsTitle}>
                        Terms of Service
                    </h1>

                    <p className={s.termsMeta}>
                        <strong>Effective Date:</strong> March 2026
                    </p>

                    <address className={s.termsAddress}>
                        <strong>JBM Web Co</strong>
                        <br />
                        Armidale NSW 2350
                        <br />
                        ABN: 75 779 233 781
                        <br />
                        Email:{' '}
                        <a
                            className={s.termsLink}
                            href="mailto:admin@jbmweb.com"
                        >
                            admin@jbmweb.com
                        </a>
                    </address>
                </header>

                <hr className={s.termsDivider} />

                <section className={s.termsSection} aria-labelledby="s1">
                    <h2 id="s1" className={s.sectionTitle}>
                        1. Acceptance
                    </h2>
                    <p className={s.paragraph}>
                        1.1 These Terms apply to all services provided by JBM
                        Web Co.
                    </p>
                    <p className={s.paragraph}>
                        1.2 By paying a deposit or subscribing to a Managed
                        Plan, the Client agrees to be bound by these Terms.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s2">
                    <h2 id="s2" className={s.sectionTitle}>
                        2. Services
                    </h2>
                    <p className={s.paragraph}>
                        2.1 JBM Web Co provides website design, development,
                        deployment and ongoing managed hosting services.
                    </p>
                    <p className={s.paragraph}>
                        2.2 Websites are delivered under a managed subscription
                        model. Ongoing management is a core component of the
                        service.
                    </p>
                    <p className={s.paragraph}>
                        2.3 JBM Web Co does not guarantee specific business
                        results, search rankings or revenue outcomes.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s3">
                    <h2 id="s3" className={s.sectionTitle}>
                        3. Payment Terms
                    </h2>
                    <p className={s.paragraph}>
                        3.1 A deposit of fifty percent (50%) of the Website
                        Build Fee is required prior to commencement of work.
                    </p>
                    <p className={s.paragraph}>
                        3.2 The remaining fifty percent (50%) is due prior to
                        website launch.
                    </p>
                    <p className={s.paragraph}>
                        3.3 Work will not commence until the deposit has
                        cleared.
                    </p>
                    <p className={s.paragraph}>
                        3.4 The website will not be launched until all
                        outstanding invoices are paid in full.
                    </p>
                    <p className={s.paragraph}>
                        3.5 Invoices are payable within seven (7) days unless
                        otherwise agreed in writing.
                    </p>
                    <p className={s.paragraph}>
                        3.6 JBM Web Co is not registered for GST. No GST is
                        charged on invoices.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s4">
                    <h2 id="s4" className={s.sectionTitle}>
                        4. Managed Website Subscription
                    </h2>
                    <p className={s.paragraph}>
                        4.1 All websites are provided under an active Managed
                        Plan.
                    </p>
                    <p className={s.paragraph}>
                        4.2 Managed Plans may be billed monthly or annually in
                        advance.
                    </p>
                    <p className={s.paragraph}>
                        4.3 Annual subscriptions are prepaid and receive a
                        fifteen percent (15%) discount compared to monthly
                        pricing.
                    </p>
                    <p className={s.paragraph}>
                        4.4 Subscription fees are non-refundable once the
                        billing period has commenced.
                    </p>
                    <p className={s.paragraph}>
                        4.5 Subscription pricing may change for future billing
                        periods with reasonable notice.
                    </p>
                    <p className={s.paragraph}>
                        4.6 The website will remain live only while an active
                        Managed Plan is maintained.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s5">
                    <h2 id="s5" className={s.sectionTitle}>
                        5. Cancellation
                    </h2>
                    <p className={s.paragraph}>
                        5.1 The Client may cancel a Managed Plan by providing at
                        least thirty (30) days written notice.
                    </p>
                    <p className={s.paragraph}>
                        5.2 Cancellation does not entitle the Client to any
                        refund for partial billing periods.
                    </p>
                    <p className={s.paragraph}>
                        5.3 Hosting and related services will cease at the end
                        of the paid billing period.
                    </p>
                    <p className={s.paragraph}>
                        5.4 JBM Web Co is not responsible for retaining backups
                        beyond thirty (30) days after termination.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s6">
                    <h2 id="s6" className={s.sectionTitle}>
                        6. Code Handover
                    </h2>
                    <p className={s.paragraph}>
                        6.1 If the Client wishes to obtain a copy of the website
                        code for independent hosting, a Platform Handover Fee of
                        $2,000 AUD applies.
                    </p>
                    <p className={s.paragraph}>
                        6.2 The Handover Fee is separate from the Website Build
                        Fee and Managed Plan fees.
                    </p>
                    <p className={s.paragraph}>
                        6.3 Upon payment of the Handover Fee and all outstanding
                        amounts, JBM Web Co will provide:
                    </p>
                    <ul className={s.termsList}>
                        <li className={s.termsListItem}>
                            A production-ready build of the website
                        </li>
                        <li className={s.termsListItem}>
                            Basic deployment instructions
                        </li>
                    </ul>
                    <p className={s.paragraph}>
                        6.4 The following are excluded from handover:
                    </p>
                    <ul className={s.termsList}>
                        <li className={s.termsListItem}>
                            Proprietary frameworks and reusable template systems
                        </li>
                        <li className={s.termsListItem}>
                            Internal deployment tooling
                        </li>
                        <li className={s.termsListItem}>
                            Hosting infrastructure
                        </li>
                        <li className={s.termsListItem}>CRM integrations</li>
                        <li className={s.termsListItem}>
                            Email automation systems
                        </li>
                        <li className={s.termsListItem}>
                            Ongoing technical support
                        </li>
                    </ul>
                    <p className={s.paragraph}>
                        6.5 After handover, JBM Web Co is not responsible for
                        performance, maintenance or updates.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s7">
                    <h2 id="s7" className={s.sectionTitle}>
                        7. Intellectual Property
                    </h2>
                    <p className={s.paragraph}>
                        7.1 Upon full payment of the Website Build Fee, the
                        Client receives ownership of their specific website
                        design and content.
                    </p>
                    <p className={s.paragraph}>
                        7.2 JBM Web Co retains ownership of all underlying
                        frameworks, reusable components, template structures and
                        proprietary systems.
                    </p>
                    <p className={s.paragraph}>
                        7.3 The Client is granted a non-exclusive licence to use
                        such systems as incorporated into their website.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s8">
                    <h2 id="s8" className={s.sectionTitle}>
                        8. Attribution
                    </h2>
                    <p className={s.paragraph}>
                        8.1 JBM Web Co may include a discreet credit in the
                        website footer indicating that the website was built by
                        JBM Web Co.
                    </p>
                    <p className={s.paragraph}>
                        8.2 Removal of the attribution may be requested in
                        writing and may incur an administrative fee.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s9">
                    <h2 id="s9" className={s.sectionTitle}>
                        9. Portfolio Rights
                    </h2>
                    <p className={s.paragraph}>
                        9.1 The Client grants JBM Web Co the right to display
                        the completed website, business name and related
                        materials in its portfolio, marketing materials and
                        online channels.
                    </p>
                    <p className={s.paragraph}>
                        9.2 The Client may opt out of this by providing written
                        notice prior to project completion.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s10">
                    <h2 id="s10" className={s.sectionTitle}>
                        10. Non-payment and Suspension
                    </h2>
                    <p className={s.paragraph}>
                        10.1 JBM Web Co may suspend services if any invoice
                        remains unpaid after its due date.
                    </p>
                    <p className={s.paragraph}>
                        10.2 Suspension may include temporary removal of the
                        website from public access.
                    </p>
                    <p className={s.paragraph}>
                        10.3 Suspension does not relieve the Client of payment
                        obligations.
                    </p>
                    <p className={s.paragraph}>
                        10.4 JBM Web Co is not liable for loss arising from
                        suspension due to non-payment.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s11">
                    <h2 id="s11" className={s.sectionTitle}>
                        11. Limitation of Liability
                    </h2>
                    <p className={s.paragraph}>
                        11.1 To the maximum extent permitted by law, JBM Web Co
                        excludes liability for indirect or consequential loss.
                    </p>
                    <p className={s.paragraph}>
                        11.2 Liability for any claim is limited to the total
                        fees paid by the Client in the preceding twelve (12)
                        months.
                    </p>
                    <p className={s.paragraph}>
                        11.3 JBM Web Co is not liable for downtime caused by
                        third-party providers, hosting platforms or force
                        majeure events.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s12">
                    <h2 id="s12" className={s.sectionTitle}>
                        12. Termination for Breach
                    </h2>
                    <p className={s.paragraph}>
                        12.1 JBM Web Co may terminate services immediately if
                        the Client breaches these Terms.
                    </p>
                    <p className={s.paragraph}>
                        12.2 JBM Web Co may refuse to host unlawful, defamatory
                        or prohibited content.
                    </p>
                </section>

                <section className={s.termsSection} aria-labelledby="s13">
                    <h2 id="s13" className={s.sectionTitle}>
                        13. Governing Law
                    </h2>
                    <p className={s.paragraph}>
                        13.1 These Terms are governed by the laws of New South
                        Wales, Australia.
                    </p>
                    <p className={s.paragraph}>
                        13.2 The parties submit to the exclusive jurisdiction of
                        the courts of New South Wales.
                    </p>
                </section>
            </article>
        </main>
    );
}
