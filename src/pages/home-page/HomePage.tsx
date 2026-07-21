import type { MetaFunction } from 'react-router';
import { Hero } from './Hero';
import { BUSINESS_DATA, FAQS } from '../../business-data';
import { WhyChooseUs } from './WhyChooseUs';
import { HowItWorks } from './HowItWorks';
import { RecentProjects } from './RecentProjects';
import { Pricing } from './Pricing';
import { FAQ } from './FAQ';
import { ContactForm } from './ContactForm';

const JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_DATA.name,
    description: BUSINESS_DATA.description,
    url: BUSINESS_DATA.online.url,
    telephone: BUSINESS_DATA.contact.phone,
    email: BUSINESS_DATA.contact.email,
    image: `${BUSINESS_DATA.online.url}/logo.png`,
    priceRange: '$$',
    address: {
        '@type': 'PostalAddress',
        ...(BUSINESS_DATA.address.street && {
            streetAddress: BUSINESS_DATA.address.street,
        }),
        addressLocality: BUSINESS_DATA.address.city,
        addressRegion: BUSINESS_DATA.address.state,
        postalCode: BUSINESS_DATA.address.postcode,
        addressCountry: BUSINESS_DATA.address.country,
    },
    ...(BUSINESS_DATA.address.location !== undefined && {
        geo: {
            '@type': 'GeoCoordinates',
            latitude: BUSINESS_DATA.address.location.lat,
            longitude: BUSINESS_DATA.address.location.long,
        },
    }),
    openingHours: BUSINESS_DATA.hours,
    ...(BUSINESS_DATA.serviceAreas.length > 0 && {
        areaServed: BUSINESS_DATA.serviceAreas,
    }),
    ...(BUSINESS_DATA.online.facebook && {
        sameAs: [BUSINESS_DATA.online.facebook],
    }),
    ...(BUSINESS_DATA.services.length > 0 && {
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Services',
            itemListElement: BUSINESS_DATA.services.map((svc) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: svc.title,
                    description: svc.description,
                },
            })),
        },
    }),
} as const;

const FAQ_JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
} as const;

const PAGE_TITLE = `${BUSINESS_DATA.name} | Custom Websites, Built & Managed`;

export const meta: MetaFunction = () => [
    { title: PAGE_TITLE },
    { name: 'description', content: BUSINESS_DATA.description },
    {
        property: 'og:title',
        content: PAGE_TITLE,
    },
    { property: 'og:description', content: BUSINESS_DATA.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: BUSINESS_DATA.online.url },
    { property: 'og:site_name', content: BUSINESS_DATA.name },
    { tagName: 'link', rel: 'canonical', href: BUSINESS_DATA.online.url },
    { property: 'og:image', content: `${BUSINESS_DATA.online.url}/logo.png` },
    { property: 'og:image:width', content: '494' },
    { property: 'og:image:height', content: '281' },
    {
        property: 'og:image:alt',
        content: BUSINESS_DATA.name,
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
        name: 'twitter:title',
        content: PAGE_TITLE,
    },
    { name: 'twitter:description', content: BUSINESS_DATA.description },
    {
        name: 'twitter:image',
        content: `${BUSINESS_DATA.online.url}/logo.png`,
    },
    {
        name: 'twitter:image:alt',
        content: BUSINESS_DATA.name,
    },
    { 'script:ld+json': JSON_LD },
    { 'script:ld+json': FAQ_JSON_LD },
];

export default function HomePage() {
    return (
        <>
            <Hero />
            <WhyChooseUs />
            <HowItWorks />
            <Pricing />
            <FAQ />
            <RecentProjects />
            <ContactForm />
        </>
    );
}
