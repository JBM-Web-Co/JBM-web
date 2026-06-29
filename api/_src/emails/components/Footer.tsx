import { Section, Text, Link } from 'react-email';
import type { CSSProperties } from 'react';

const FONT_FAMILY =
    'ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif' as const;

export function Footer() {
    return (
        <Section style={FOOTER_STYLE}>
            <Text style={FOOTER_TEXT}>
                <Link href="https://jbmweb.com" style={FOOTER_LINK}>
                    jbmweb.com
                </Link>
                &nbsp;&bull;&nbsp;
                <Link href="mailto:admin@jbmweb.com" style={FOOTER_LINK}>
                    admin@jbmweb.com
                </Link>
                &nbsp;&bull;&nbsp;
                <Link href="tel:0459560321" style={FOOTER_LINK}>
                    0459560321
                </Link>
                &nbsp;&bull;&nbsp; ABN: 75779233781
            </Text>
            <Text style={FOOTER_TEXT}>
                You received this email because you submitted an enquiry on JBM
                Web Co.
            </Text>
        </Section>
    );
}

const FOOTER_STYLE: CSSProperties = {
    padding: '16px 24px',
    background: '#ffffff',
    borderTop: '1px solid #e6edf7',
} as const;
const FOOTER_TEXT: CSSProperties = {
    fontFamily: FONT_FAMILY,
    color: '#9ca3af',
    fontSize: '12px',
    lineHeight: '1.6',
    margin: '0 0 8px',
} as const;
const FOOTER_LINK: CSSProperties = {
    color: '#64748b',
    textDecoration: 'underline',
} as const;
