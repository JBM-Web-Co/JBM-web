# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Skills:** Four skills extend this file with reusable standards — always load the relevant skill before working in that area:
>
> - `/code-style` — TypeScript rules, naming conventions, exports, component architecture, a11y
> - `/scss` — SCSS tokens, CSS Modules, mobile-first, nesting rules
> - `/seo` — Heading hierarchy, JSON-LD schema, meta tags, MetaFunction convention
> - `/brand-guidelines` — JBM Web Co's business context, tone of voice, and brand colours
>
> `/brand-guidelines` lives in this repo under `.claude/skills/`. `/code-style`, `/scss`, and `/seo` are provided by the shared JBM/ECC Claude config — make sure it is installed in your environment.

---

## Commands

```bash
npm run vercel-dev   # Vercel dev server
npm run build        # Typecheck → build emails → React Router build
npm run typecheck    # Run tsc on both src/ and api/ tsconfigs
npm run lint         # ESLint
npm run style        # Prettier (auto-formats in place)
npm run style:check  # Prettier in check mode (used by CI)
npm run buildEmails  # Compile email TSX → JS via esbuild (runs as part of build)
npm run email-dev    # React Email preview server for api/_src/email-previews
```

CI runs Prettier, typecheck, and ESLint on every PR. Before pushing: run `npm run typecheck && npm run lint && npm run style`.

---

## Architecture

This is JBM Web Co's own marketing and lead-generation site — a **React Router v8 + Vercel** framework-mode app with serverless API functions. It is the live production site for jbmweb.com, not a client template.

### Business content

All business content lives in `src/business-data.ts` — name, contact details, services, pricing, nav items, FAQs. The rest of the app reads from this one file, so copy and detail changes should be made there first.

### Frontend

- `root.tsx` — layout shell with header, footer, analytics, and font imports
- `routes.ts` — route definitions
- `pages/` — page-level components, each exports a `MetaFunction`
- `components/` — reusable UI primitives
- Each component has a co-located `*.module.scss` for styles

### File naming

- **kebab-case** for everything by default — `.ts` utilities, hooks, scripts, data, and standalone stylesheets (`business-data.ts`, `use-scroll-reveal.ts`, `contact-schema.ts`, `send-email.ts`, `global.scss`, `_variables.scss`).
- **PascalCase** only for React component files (`Header.tsx`, `HomePage.tsx`) and the SCSS module co-located with a component (`Header.module.scss`).
- Framework entry/config files keep their required names (`entry.client.tsx`, `react-router.config.ts`, `vite.config.ts`).

### Styling

All styles use SCSS Modules. Design tokens (colours, fonts, radius, spacing) live in `src/styles/_variables.scss`. Breakpoint mixins live in `src/styles/_breakpoints.scss`. Mobile-first: base styles for mobile, then `bp.above(...)` for larger screens. See `/scss` skill for full conventions.

### API

Vercel serverless functions. Each `.ts` file at the root of `api/` becomes an endpoint. Shared backend source lives under `api/_src/` (the `_src` prefix prevents Vercel treating them as routes). Email templates are `.tsx` files in `api/_src/emails/` and must be compiled to `.js` via `npm run buildEmails` before deployment.

### SEO

Pages export a `MetaFunction` with Open Graph, Twitter Card, and JSON-LD structured data. Static `sitemap.xml` and `robots.txt` are in `public/` and must be updated per client. See `/seo` skill for full conventions.

---

## Backend Conventions

- Validate all input with Zod `safeParse`
- Throw `HttpError` with a `statusCode` for known error cases
- Never expose stack traces to the client
- Use `Promise.all` for parallel side effects
- Degrade gracefully for genuinely non-critical side effects, but when an
  endpoint's primary purpose fails (e.g. the contact notification email),
  return a clear 5xx — never a false success

---

## How Claude Should Respond

General guidelines:

- Ask clarifying questions first whenever anything is unclear
- Ruthlessly truth-seek: challenge my framing and assumptions; don't mirror or placate
- For any plan or comparison, give pros and cons
- Check key facts with web search, not just prior knowledge
- Be comprehensive and data-rich with concrete numbers; end with a short bullet summary
- Proactively suggest options I haven't mentioned and anticipate follow-up needs
- Be opinionated; treat me as an expert and favour strong arguments over authority or consensus
- Include new tech and contrarian ideas as well as standard ones; clearly flag speculation and prediction
- For complex topics, surface and challenge hidden assumptions, interpret my intent not literal wording, reframe into the most practical version, and treat rejected ideas as hard constraints you never re-suggest while preferring deeper, non-obvious options
- I have a mechanical mind and am a visual learner
- Prioritize long-term code maintainability and clarity over short-term speed or convenience

When generating code:

- Follow naming conventions strictly
- Follow file structure rules
- Match existing architecture
- No generic boilerplate
- No tutorial explanations
- Assume strong technical knowledge
- Call out architectural problems directly
- Suggest improvements when needed

When generating business copy:

- Speak to anyone who needs a website — businesses, sole traders, professionals, and personal projects alike
- Assume a primarily Australian audience, but never gate copy to businesses or a single industry
- Be conversion-focused
- Avoid fluff
- Be clear and commercial

When unsure:

- Ask for clarification
- Do not guess
