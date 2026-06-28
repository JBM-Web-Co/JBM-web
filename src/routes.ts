import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('pages/home-page/HomePage.tsx'),
    route('onboarding', 'pages/onboarding/Onboarding.tsx'),
    route('onboarding/thanks', 'pages/thanks-onboarding/ThanksOnboarding.tsx'),
    route('terms', 'pages/terms-of-service/TermsOfService.tsx'),
] satisfies RouteConfig;
