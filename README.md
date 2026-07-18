# JBM Web Co — Website

Production codebase for **jbmweb.com**, JBM Web Co's own marketing and lead-generation site. JBM Web Co builds and manages custom websites — from business landing pages to portfolios and anything else a client needs. This repo is that pitch: it markets the service, captures leads through the contact form, onboards new JBM clients through `/onboarding`, and can raise a Stripe deposit invoice once a client signs on.

All of JBM Web Co's own business content (name, contact details, services, pricing, nav, hero copy) lives in `src/business-data.ts`, and the codebase is architected so the same components/backend could be reused to stand up a similar site for someone else — but this deployment is the real thing, not a placeholder/demo.

## Quick Start

```bash
npm install
npm i -g vercel        # if not already installed
vercel link             # link this folder to the JBM Web Co Vercel project
vercel env pull         # pulls .env.local (see Environment Variables below)
npm run vercel-dev
```

`vercel-dev` runs `vercel dev`, which serves the Vite frontend **and** the `api/*.ts` serverless functions together (e.g. `/api/contact`, `/api/ping`, `/api/stripe`). Running `react-router dev` / `vite dev` directly will serve the frontend only — API routes won't resolve.

## Tech Stack

### Frontend

- React 19 + TypeScript (strict mode)
- Vite 8
- SCSS Modules
- Framer Motion 12
- React Router v7 (SSG — static prerendering)
- lucide-react

### Backend

- Vercel Serverless Functions
- Zod v4 validation
- Airtable REST API
- Resend SDK v6
- React Email v6

## Repo Structure

```text
/
├── api/
│   ├── contact.ts
│   ├── ping.ts
│   ├── stripe.ts
│   ├── tsconfig.json
│   └── _src/
│
├── src/
│   ├── root.tsx
│   ├── routes.ts
│   ├── business-data.ts
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   └── styles/
│
├── public/
├── scripts/
├── docs/
├── .github/workflows/
├── vercel.json
├── env.template
└── .claude/skills/brand-guidelines/SKILL.md
```

## Routes

| Path                 | Component                                      |
| -------------------- | ---------------------------------------------- |
| `/`                  | `pages/home-page/HomePage.tsx`                 |
| `/onboarding`        | `pages/onboarding/Onboarding.tsx`              |
| `/onboarding/thanks` | `pages/thanks-onboarding/ThanksOnboarding.tsx` |
| `/terms`             | `pages/terms-of-service/TermsOfService.tsx`    |

Each page exports a `MetaFunction` (Open Graph, Twitter Card, canonical, JSON-LD `LocalBusiness`).

## API Routes (Vercel Functions)

All handlers live at the root of `api/` (Vercel convention — each `.ts` file there is a route; everything under `api/_src/` is shared code, not a route). All validate input with Zod, throw `HttpError` for known failures, and never leak stack traces to the client.

### `GET /api/ping`

Health check

### `POST /api/contact`

Main lead-capture endpoint used by the homepage contact form.

- Validates the body against `ContactRequestSchema`
- Runs three side effects in parallel:
    1. **Airtable** — upserts the client, creates a lead record. This is the critical path: if it fails, the endpoint returns a `5xx` even though the other two effects may have run.
    2. **Onboarding email** — sends the "complete your brief" follow-up to the lead. Best-effort; failure is logged, not fatal.
    3. **Notification email** — sends a new-lead notification to the business via Resend. Best-effort; failure is logged, not fatal.

### `POST /api/stripe`

Creates a Stripe customer, adds the build & setup fee as an invoice item, and creates a draft invoice. |
