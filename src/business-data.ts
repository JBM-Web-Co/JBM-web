import type { IconLibrary } from './components/Icon';

type Address = Readonly<{
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    location?: Readonly<{
        lat: number;
        long: number;
    }>;
}>;

type BusinessContact = Readonly<{
    email: string;
    phone: string;
}>;

type EmployeeContact = Readonly<{
    name: string;
    email: string;
    phone: string;
}>;

type OnlinePresence = Readonly<{
    url: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
}>;

type HeroStat = Readonly<{
    num: string;
    label: string;
}>;

type NavItem = Readonly<{
    label: string;
    href: string;
}>;

type Service = Readonly<{
    title: string;
    description: string;
    iconName: IconLibrary;
}>;

export type BusinessData = Readonly<{
    name: string;
    tagline: string;
    description: string;
    hours: string;
    address: Readonly<Address>;
    contact: Readonly<BusinessContact>;
    employees?: readonly EmployeeContact[];
    online: Readonly<OnlinePresence>;
    serviceAreas: readonly string[];
    heroStats: readonly HeroStat[];
    whyUsPoints: readonly string[];
    navItems: readonly NavItem[];
    services: readonly Service[];
}>;

export const BUSINESS_DATA: BusinessData = {
    name: 'Your Business Name',
    tagline: 'Your business tagline goes here',
    description:
        'A brief description of your business, what you do, and why customers should choose you.',
    hours: 'Mon–Fri: 9am – 5pm',

    contact: {
        phone: '00 0000 0000',
        email: 'hello@yourbusiness.com',
    },

    address: {
        street: '123 Street Name',
        city: 'City',
        state: 'State',
        postcode: '0000',
        country: 'AU', // ISO 3166-1 alpha-2 country code, e.g. 'AU', 'US', 'GB'
    },

    online: {
        url: 'https://www.yourbusiness.com',
    },

    serviceAreas: ['Area One', 'Area Two', 'Area Three'],

    heroStats: [
        { num: 'X+', label: 'Stat Label' },
        { num: 'X+', label: 'Stat Label' },
        { num: 'X+', label: 'Stat Label' },
        { num: 'X+', label: 'Stat Label' },
    ],

    whyUsPoints: [
        'Why choose us — point one',
        'Why choose us — point two',
        'Why choose us — point three',
        'Why choose us — point four',
    ],

    navItems: [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' },
    ],

    // iconName must be a key in ICON_LIBRARY (src/components/Icon.tsx).
    services: [
        {
            title: 'Service One',
            description:
                'A brief description of this service and what it involves.',
            iconName: 'briefcase',
        },
        {
            title: 'Service Two',
            description:
                'A brief description of this service and what it involves.',
            iconName: 'wrench',
        },
        {
            title: 'Service Three',
            description:
                'A brief description of this service and what it involves.',
            iconName: 'shield',
        },
        {
            title: 'Service Four',
            description:
                'A brief description of this service and what it involves.',
            iconName: 'star',
        },
    ],
} as const satisfies BusinessData;
