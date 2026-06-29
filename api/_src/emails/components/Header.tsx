import { Section, Heading, Img, Hr } from 'react-email';
import type { CSSProperties } from 'react';

const FONT_FAMILY =
    'ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif' as const;
const LOGO_URL = 'https://jbmweb.com/logo.svg' as const;

export function Header({ heading }: { heading: string }) {
    return (
        <>
            <Section style={BRAND_BAR}>
                <Img src={LOGO_URL} alt="JBM Web Co" width="190" style={LOGO} />
            </Section>

            <Section style={HERO}>
                <Heading as="h1" style={HEADLINE}>
                    {heading}
                </Heading>
            </Section>
            <Hr style={DIVIDER} />
        </>
    );
}

const BRAND_BAR: CSSProperties = {
    padding: '14px 24px',
} as const;
const LOGO: CSSProperties = {
    width: '220px',
    display: 'block',
    margin: '0 auto',
} as const;
const HERO: CSSProperties = {
    padding: '0px 24px 16px',
    backgroundColor: '#ffffff',
} as const;
const HEADLINE: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: 900,
    lineHeight: 1.25,
    color: '#111827',
    margin: 0,
    padding: 0,
} as const;
const DIVIDER: CSSProperties = {
    borderTop: '1px solid #e6edf7',
    margin: '0',
} as const;
