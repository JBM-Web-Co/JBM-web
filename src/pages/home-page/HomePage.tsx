import type { MetaFunction } from 'react-router';
import { Hero } from './Hero';
import { Services } from './Services';
import { AboutUs } from './AboutUs';
import { Contact } from './Contact';
import { BUSINESS_DATA } from '../../business-data';

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
        streetAddress: BUSINESS_DATA.address.street,
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
        areaServed: BUSINESS_DATA.serviceAreas.map((area) => ({
            '@type': 'City',
            name: area,
        })),
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
};

export const meta: MetaFunction = () => [
    { title: `${BUSINESS_DATA.name} | ${BUSINESS_DATA.tagline}` },
    { name: 'description', content: BUSINESS_DATA.description },
    {
        property: 'og:title',
        content: `${BUSINESS_DATA.name} | ${BUSINESS_DATA.tagline}`,
    },
    { property: 'og:description', content: BUSINESS_DATA.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: BUSINESS_DATA.online.url },
    { property: 'og:site_name', content: BUSINESS_DATA.name },
    { tagName: 'link', rel: 'canonical', href: BUSINESS_DATA.online.url },
    { property: 'og:image', content: `${BUSINESS_DATA.online.url}/hero.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    {
        property: 'og:image:alt',
        content: BUSINESS_DATA.name,
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
        name: 'twitter:title',
        content: `${BUSINESS_DATA.name} | ${BUSINESS_DATA.tagline}`,
    },
    { name: 'twitter:description', content: BUSINESS_DATA.description },
    { name: 'twitter:image', content: `${BUSINESS_DATA.online.url}/hero.png` },
    {
        name: 'twitter:image:alt',
        content: BUSINESS_DATA.name,
    },
    { 'script:ld+json': JSON_LD },
];

export default function HomePage() {
    return (
        <>
            <Hero />
            <AboutUs />
            <Services />
            <Contact />
        </>
    );
}
