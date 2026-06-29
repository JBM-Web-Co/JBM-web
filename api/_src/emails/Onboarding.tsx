import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Text,
    Button,
    Hr,
} from 'react-email';
import type { CSSProperties } from 'react';
import type { ContactSchema } from '../utils/contact-schema.js';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';

const PRICING = { setup: 499, monthly: 79 } as const;

const FONT_FAMILY =
    'ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif' as const;
const CTA_BG = '#28a2ca' as const;
const FORM_URL =
    'https://airtable.com/appxHfmSf7GtoDAaE/pagQBedE0w1qBPoaC/form' as const;

const make_form_url = (data: ContactSchema): string => {
    const { name, email, phone, preferredContact } = data;
    const url = new URL(FORM_URL);
    url.searchParams.set('prefill_Name', name);
    url.searchParams.set('prefill_Email', email);
    url.searchParams.set('prefill_Phone', phone);
    url.searchParams.set('prefill_Preferred contact method', preferredContact);
    return url.toString();
};

function Hero({ name }: { name: string }) {
    return (
        <>
            <Text style={PARAGRAPH}>Hi {name},</Text>

            <Text style={PARAGRAPH}>
                Thanks for reaching out to <strong>JBM Web Co</strong>. We're
                excited to work with you to bring your landing page to life.
            </Text>

            <Text style={PARAGRAPH}>
                We build, host, and manage your landing page so you can focus on
                running your business, not the tech behind it.
            </Text>
        </>
    );
}

function Pricing() {
    return (
        <Section style={PRICE_PILL}>
            <Text style={PRICE_EYEBROW}>One Plan. Everything Included.</Text>

            <Text style={PRICE_LINE}>
                <span style={PRICE_STRONG}>${PRICING.setup} upfront</span>{' '}
                <span style={PRICE_PLUS}>+</span>{' '}
                <span style={PRICE_STRONG}>${PRICING.monthly}/month</span>{' '}
            </Text>

            <Text style={PRICE_NOTE}>
                No lock-in contracts. Cancel anytime.
            </Text>

            <Section style={BADGE_ROW}>
                <Text style={BADGE}>Fully managed</Text>
                <Text style={BADGE}>No hidden fees</Text>
                <Text style={BADGE}>Fast turnaround</Text>
            </Section>
        </Section>
    );
}

function NextSteps() {
    return (
        <Section style={INFO_BOX}>
            <Text style={SECTION_TITLE}>What happens next</Text>
            <Text style={LIST_ITEM_MUTED}>
                1. Complete onboarding (15-20 minutes)
            </Text>
            <Text style={LIST_ITEM_MUTED}>
                2. You&apos;ll receive a 50% setup deposit invoice
            </Text>
            <Text style={LIST_ITEM_MUTED}>
                3. Build begins once deposit is received
            </Text>
            <Text style={LIST_ITEM_MUTED}>
                4. Landing page completed in 3–4 weeks
            </Text>
            <Text style={LIST_ITEM_MUTED}>
                5. Remaining 50% is due before launch
            </Text>
            <Text style={LIST_ITEM_MUTED}>
                6. Ongoing management continues at ${PRICING.monthly}/month
            </Text>
        </Section>
    );
}

function Onboarding({ url }: { url: string }) {
    return (
        <>
            <Text style={{ ...PARAGRAPH, margin: '0' }}>
                To move forward, complete the onboarding form below.
            </Text>
            <Text style={SUBTLE_NOTE}>
                We take on a limited number of builds each month to ensure fast
                turnaround and quality delivery.
            </Text>

            <Section style={CTA_WRAP}>
                <Button href={url} style={CTA_BUTTON}>
                    Start onboarding
                </Button>
            </Section>

            <Text style={SUBTLE_NOTE}>
                Once submitted, we’ll review everything and send your deposit
                invoice.
            </Text>
        </>
    );
}

function EmailContent(data: ContactSchema) {
    const year = new Date().getFullYear();
    const url = make_form_url(data);

    return (
        <Container style={OUTER_CONTAINER_STYLE}>
            <Section style={CARD_STYLE}>
                <Header
                    heading={`Your landing page journey starts here, ${data.name.split(' ')[0]}!`}
                />
                <Section style={BODY_SECTION}>
                    <Hero name={data.name} />

                    <Pricing />

                    <Hr style={DIVIDER} />

                    <NextSteps />

                    <Onboarding url={url} />

                    <Text style={SIGN_OFF}>
                        Cheers,
                        <br />
                        <strong>JBM Web Co</strong>
                    </Text>
                </Section>

                <Footer />
            </Section>

            <Text style={COPYRIGHT_STYLE}>&copy; {year} JBM Web Co</Text>
        </Container>
    );
}

export function OnboardingEmail(data: ContactSchema) {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <meta name="x-apple-disable-message-reformatting" />
            </Head>
            <Preview>
                Start onboarding to get your landing page live in 3–4 weeks.
            </Preview>

            <Body style={BODY_STYLE}>
                <EmailContent {...data} />
            </Body>
        </Html>
    );
}

/* ---------- Styles ---------- */
const BODY_STYLE: CSSProperties = {
    margin: 0,
    padding: 0,
    background: '#f3f6fb',
} as const;
const OUTER_CONTAINER_STYLE: CSSProperties = {
    backgroundColor: '#f3f6fb',
    padding: '32px 0',
    maxWidth: '800px',
} as const;
const CARD_STYLE: CSSProperties = {
    background: '#ffffff',
    borderRadius: '18px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(17, 24, 39, 0.10)',
    border: '1px solid #e6edf7',
} as const;
const BODY_SECTION: CSSProperties = {
    padding: '18px 24px 22px',
    fontFamily: FONT_FAMILY,
    color: '#111827',
    fontSize: '16px',
    lineHeight: 1.6,
} as const;
const PARAGRAPH: CSSProperties = {
    fontFamily: FONT_FAMILY,
    color: '#111827',
    fontSize: '16px',
    lineHeight: '1.6',
} as const;

// Pricing
const PRICE_PILL: CSSProperties = {
    textAlign: 'center',
    background: '#f0f7ff',
    border: '1px solid #dbeafe',
    borderRadius: '14px',
    padding: '14px 14px',
    margin: '12px 0 18px',
} as const;
const PRICE_EYEBROW: CSSProperties = {
    margin: '0 0 6px',
    fontFamily: FONT_FAMILY,
    fontSize: '14px',
    lineHeight: '1.4',
    fontWeight: 800,
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
} as const;
const PRICE_LINE: CSSProperties = {
    margin: '0 0 4px',
    fontFamily: FONT_FAMILY,
    fontSize: '16px',
    lineHeight: '1.55',
    color: '#1d4ed8',
} as const;
const PRICE_PLUS: CSSProperties = {
    fontWeight: 800,
    color: '#0f172a',
} as const;
const PRICE_STRONG: CSSProperties = {
    fontWeight: 900,
    fontSize: '17px',
} as const;
const PRICE_NOTE: CSSProperties = {
    margin: 0,
    fontFamily: FONT_FAMILY,
    color: '#334155',
    fontSize: '13px',
    lineHeight: '1.5',
} as const;
const BADGE_ROW: CSSProperties = {
    marginTop: '10px',
} as const;
const BADGE: CSSProperties = {
    display: 'inline-block',
    fontFamily: FONT_FAMILY,
    fontSize: '12px',
    lineHeight: '1.2',
    fontWeight: 700,
    color: '#1d4ed8',
    background: '#e7f0ff',
    border: '1px solid #cfe0ff',
    borderRadius: '14px',
    padding: '7px 12px',
    marginRight: '10px',
    marginBottom: '6px',
} as const;

// Section separation
const DIVIDER: CSSProperties = {
    borderTop: '1px solid #e6edf7',
    margin: '18px 0',
} as const;
const SECTION_TITLE: CSSProperties = {
    fontSize: '14px',
    color: '#111827',
    fontWeight: 800,
    fontFamily: FONT_FAMILY,
} as const;

// Next steps
const INFO_BOX: CSSProperties = {
    background: '#f5f5f5',
    border: '1px solid #e6edf7',
    borderRadius: '14px',
    padding: '0px 14px 10px',
    margin: '0 0 14px',
} as const;
const LIST_ITEM: CSSProperties = {
    margin: '0 0 8px',
    fontFamily: FONT_FAMILY,
    color: '#111827',
    fontSize: '14px',
    lineHeight: '1.5',
} as const;
const LIST_ITEM_MUTED: CSSProperties = {
    ...LIST_ITEM,
    color: '#374151',
} as const;

// CTA
const CTA_WRAP: CSSProperties = {
    margin: '18px 0 10px',
} as const;
const CTA_BUTTON: CSSProperties = {
    display: 'inline-block',
    padding: '14px 22px',
    fontFamily: FONT_FAMILY,
    fontSize: '15px',
    fontWeight: 900,
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '14px',
    backgroundColor: CTA_BG,
    border: '1px solid rgba(255,255,255,0.18)',
} as const;
const SUBTLE_NOTE: CSSProperties = {
    color: '#6b7280',
    fontSize: '11px',
    lineHeight: '1.5',
    fontFamily: FONT_FAMILY,
    margin: '0',
} as const;
const SIGN_OFF: CSSProperties = {
    margin: '18px 0 0',
    color: '#111827',
    fontSize: '14px',
    lineHeight: '1.6',
    fontFamily: FONT_FAMILY,
} as const;
const COPYRIGHT_STYLE: CSSProperties = {
    fontFamily: FONT_FAMILY,
    color: '#9ca3af',
    fontSize: '12px',
    textAlign: 'center',
    padding: '18px 16px 0',
    margin: 0,
} as const;
