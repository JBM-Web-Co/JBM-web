# Landing Page Template

JBM Web Co reusable landing page template. Built with React Router v8, Vite 8, TypeScript, SCSS Modules, and deployed on Vercel.

## Quick Start

```bash
npm install
npm run vercel-dev
```

`vercel-dev` runs the Vercel dev server so the serverless API routes (e.g.
`/api/contact`) work alongside the frontend. It requires the Vercel CLI
(`npm i -g vercel`) and a linked project (`vercel link`).

## Repo Structure

```text
/
├── api/                  # Vercel serverless function handlers
│   └── _src/             # Backend source (not exposed as routes)
│       ├── emails/       # React Email templates (.tsx + compiled .js)
│       └── utils/        # HttpError, sendEmail, logger
├── public/               # Static assets — logo, hero image, sitemap, robots.txt
├── scripts/              # Build scripts (e.g. buildEmails)
└── src/
    ├── pages/            # Page-level components (each exports a MetaFunction)
    ├── components/       # Reusable UI primitives
    ├── styles/           # Global SCSS, design tokens, breakpoint mixins
    ├── business-data.ts  # All client content — name, contact, services, areas, etc.
    ├── root.tsx          # HTML shell, layout, global fonts and analytics
    ├── routes.ts         # Route definitions
    └── hooks/            # Shared hooks (e.g. use-scroll-reveal.ts)
```

## Tech Stack

- [React Router v8](https://reactrouter.com) — framework mode, SSG via Vercel
- [Vite 8](https://vite.dev) — build tool
- SCSS Modules — component-scoped styles
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Resend](https://resend.com) — transactional email
- [Vercel Analytics](https://vercel.com/analytics) — usage tracking

## Testing

There is no automated test suite yet. CI runs Prettier, typecheck, ESLint, and a
production build on every PR. Worth adding when capacity allows: Vitest unit tests
for `validate_form` and `ContactSchema`, plus a Playwright smoke test (hero renders,
form validates, `/api/ping` returns 200).

## New Client Checklist

- [ ] Fill in `src/business-data.ts` with all business details
- [ ] Add the client's brand guidelines to `.claude/skills/brand-guidelines/SKILL.md`
- [ ] Replace `public/logo.png` and `public/hero.png` with the client's assets
- [ ] Set `SENDER_NAME` in `api/contact.ts` (the notification email's "from" name)
- [ ] Update `public/sitemap.xml` and `public/robots.txt` with the client's domain and URL structure
- [ ] Add required environment variables in Vercel then run `vercel pull`
- [ ] Set the canonical URL and OG image URL in the page's `MetaFunction`
- [ ] Add the Vercel project ID to the GitHub repo environment variables as `VERCEL_PROJECT_ID`
- [ ] Turn off automatic deployments in Vercel
- [ ] (Optional) Add a `Content-Security-Policy` header in `vercel.json` once tested against Google Fonts + Vercel Analytics
- [ ] Deploy to Vercel and verify end-to-end
- [ ] Check all SEO meta tags and JSON-LD in production
