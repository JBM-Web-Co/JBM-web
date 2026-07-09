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

type Pricing = Readonly<{
    setup: number;
    monthly: number;
}>;

export type BusinessData = Readonly<{
    name: string;
    tagline: string;
    description: string;
    hours: string;
    abn: string;
    pricing: Pricing;
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
    name: 'JBM Web Co',
    tagline:
        'Landing pages that convert visitors to customers for Australian service businesses',
    description:
        'Specialist landing pages for Australian service businesses. Clear pricing, fast turnaround, and managed hosting — everything included.',
    hours: 'Mon–Fri: 9am – 5pm AEST',

    abn: '75779233781',
    pricing: { setup: 499, monthly: 79 },

    contact: {
        phone: '+61 459 560 321',
        email: 'admin@jbmweb.com',
    },

    address: {
        street: '',
        city: 'Armidale',
        state: 'NSW',
        postcode: '2350',
        country: 'AU',
    },

    online: {
        url: 'https://www.jbmweb.com',
        facebook: 'https://www.facebook.com/61583552971297',
    },

    serviceAreas: ['Australia Wide'],

    heroStats: [
        { num: '4 Weeks', label: 'Avg. Build Time' },
        { num: '$79', label: '/Month' },
        { num: '24h', label: 'Response Time' },
        { num: '4', label: 'Revisions/Month' },
    ],

    whyUsPoints: [
        'Transparent pricing with no hidden fees',
        'No lock-in contracts, cancel anytime',
        'Australian-based, direct communication',
        'Managed hosting and revisions included',
    ],

    navItems: [
        { label: 'Why Us', href: '#why-us' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
    ],

    services: [
        {
            title: 'Landing Page Design & Build',
            description:
                'Custom-built, conversion-focused landing pages for Australian service businesses.',
            iconName: 'briefcase',
        },
        {
            title: 'Managed Hosting & Maintenance',
            description:
                'Secure hosting, SSL, backups, and uptime monitoring included every month.',
            iconName: 'shield',
        },
        {
            title: 'Ongoing Revisions & Support',
            description:
                'Four monthly revisions included with direct, responsive support.',
            iconName: 'wrench',
        },
    ],
} as const satisfies BusinessData;

export const GOOGLE_REVIEW_URL: string =
    'https://g.page/r/CVsbaC7I06dEEBM/review';

type FAQ = {
    question: string;
    answer: string;
};
export const FAQS: readonly FAQ[] = [
    {
        question: 'What does the monthly fee include?',
        answer: `The $${BUSINESS_DATA.pricing.monthly}/month covers managed hosting, SSL certificate, backups, security updates, uptime monitoring, domain and DNS management, and four small revisions per month.`,
    },
    {
        question: 'Is there a minimum term?',
        answer: 'No. You can cancel at any time, there are no lock-in contracts or cancellation fees.',
    },
    {
        question: 'What happens if I cancel?',
        answer: 'Your site stays live until the end of your paid period. Full handover of your source code and assets is available for a one-off fee if you\u2019d like to host it elsewhere.',
    },
    {
        question: 'How many revisions are included?',
        answer: 'Four small revisions are included each month. If you need more, additional revisions are available at a fixed rate quoted upfront.',
    },
    {
        question: 'What is considered a small revision?',
        answer: 'Small revisions cover minor updates to your existing page, such as text edits, image swaps, link changes, and small layout tweaks. They don\u2019t include new pages, major structural changes, or advanced functionality. If something falls outside scope, we\u2019ll provide a fixed price upfront.',
    },
    {
        question: 'Do I own my domain?',
        answer: 'Yes. Your domain is always registered in your name — you own it outright. We handle the DNS wiring to connect it to your hosted page.',
    },
    {
        question: 'Can you help with domain setup?',
        answer: 'Absolutely. Domain and DNS wiring is included in every plan. We can register a new domain on your behalf or connect your existing one.',
    },
    {
        question: 'What is the typical timeline?',
        answer: 'Most landing pages are completed within 2–4 weeks once content and template selection are confirmed.',
    },
    {
        question: 'What if I don’t have branding?',
        answer: 'That\u2019s fine. We can work with your existing logo and colours, or put together a clean, professional look based on your business name, industry, and a simple colour palette. You\u2019ll see it before anything goes live.',
    },
    {
        question: 'Do you write content?',
        answer: 'Every build includes a content brief and page structure to guide you through what\u2019s needed. Most clients write their own content, you know your business best. If you get stuck, we\u2019re here to help.',
    },
] as const;
