import React from 'react';
import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Hr,
} from 'react-email';
import type { ContactSchema } from '../utils/contact-schema.js';

const FONT_FAMILY =
    'ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif';

export const ContactEmail = (data: ContactSchema) => {
    const { name, email, phone, preferredContact, message } = data;

    return (
        <Html lang="en">
            <Head />

            <Preview>New contact form submission from {name}</Preview>

            <Body style={BODY_STYLE}>
                <Container style={CONTAINER_STYLE}>
                    <Heading as="h2" style={HEADING_STYLE}>
                        New Contact Form Submission
                    </Heading>

                    <Hr style={DIVIDER} />

                    <Text style={FIELD_STYLE}>
                        <strong>Name:</strong> {name}
                    </Text>
                    <Text style={FIELD_STYLE}>
                        <strong>Email:</strong> {email}
                    </Text>
                    <Text style={FIELD_STYLE}>
                        <strong>Phone:</strong> {phone}
                    </Text>
                    <Text style={FIELD_STYLE}>
                        <strong>Preferred Contact:</strong> {preferredContact}
                    </Text>
                    <Section>
                        <Text style={FIELD_STYLE}>
                            <strong>Message:</strong>
                        </Text>
                        <Text style={MESSAGE_STYLE}>
                            {message ?? 'No message provided'}
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

/* ---------- Styles ---------- */

const BODY_STYLE = {
    margin: 0,
    padding: '24px 0',
    backgroundColor: '#f6f7fb',
    fontFamily: FONT_FAMILY,
} as const satisfies React.CSSProperties;

const CONTAINER_STYLE = {
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '24px',
} as const satisfies React.CSSProperties;

const HEADING_STYLE = {
    fontFamily: FONT_FAMILY,
    fontSize: '20px',
    color: '#111827',
    margin: '0 0 8px',
} as const satisfies React.CSSProperties;

const DIVIDER = {
    borderTop: '1px solid #e5e7eb',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    margin: '12px 0 16px',
} as const satisfies React.CSSProperties;

const FIELD_STYLE = {
    fontFamily: FONT_FAMILY,
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#111827',
    margin: '0 0 8px',
} as const satisfies React.CSSProperties;

const MESSAGE_STYLE = {
    fontFamily: FONT_FAMILY,
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#374151',
    margin: '0',
    whiteSpace: 'pre-wrap',
} as const satisfies React.CSSProperties;
