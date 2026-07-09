import { OnboardingEmail } from '../emails/Onboarding.js';
import type { ContactSchema } from '../utils/contact-schema.js';

const MOCK_DATA: ContactSchema = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '0400 000 000',
    preferredContact: 'Either',
    message:
        'Hi, I would like a quote for a kitchen renovation.\nWhat does your availability look like next month?',
} as const;

export default function OnboardingPreview() {
    return <OnboardingEmail {...MOCK_DATA} />;
}
