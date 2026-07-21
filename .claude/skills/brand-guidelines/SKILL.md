---
name: brand-guidelines
description: Apply when writing copy, generating UI, or making styling decisions: enforces JBM Web Co's brand identity, tone, colours, and typography
---

# Brand Guidelines: JBM Web Co

Apply these guidelines whenever writing copy, choosing colours, selecting fonts, or designing UI components for this site.

---

## Business Overview

- **Business name:** JBM Web Co
- **What we do:** Custom website design, build, hosting, and ongoing management
- **Location:** Armidale, NSW, Australia, serving clients Australia-wide
- **Target audience:** Anyone who needs a website: small businesses, sole traders, professionals, portfolios, personal and community projects
- **Unique selling point:** One flat, transparent plan ($499 setup + $79/month) with everything included: hosting, SSL, monitoring, revisions, and direct Australian-based support. No lock-in contracts.

---

## Tone of Voice

- **Overall tone:** Plain-spoken, direct, and confident. Friendly without being matey; professional without being corporate.
- **Do:**
    - Lead with outcomes (more enquiries, more bookings, more attention)
    - Use short sentences and concrete numbers ($499, $79/month, 3–4 weeks, 24-hour response)
    - Speak to the reader as "you"; keep audience language broad. Never assume the reader runs a business
    - Emphasise transparency: no hidden fees, no lock-in, cancel anytime
- **Don't:**
    - Use jargon, tech-speak, or agency fluff ("digital solutions", "synergy")
    - Make unverifiable claims or inflate numbers
    - Narrow copy to a single industry or client type
    - Bury the price: transparent pricing is the pitch

Copy should always be conversion-focused. Assume a primarily Australian audience, but write for anyone who needs a website.

---

## Colours

Tokens live in `src/styles/_variables.scss` (static SCSS) and `src/styles/global.scss` (`:root` custom properties). Never hardcode hex values in components. Use the tokens.

| Token            | Value                   | Usage                                   |
| ---------------- | ----------------------- | --------------------------------------- |
| `$primary`       | `#2563eb`               | CTAs, links, key accents                |
| `$primary-hover` | `#1d4ed8`               | CTA hover state                         |
| `$secondary`     | `#10b981`               | Success states, supporting accents      |
| `$accent`        | `#f59e0b`               | Amber highlights (badges, week markers) |
| `$navy`          | `#2f416c`               | Wordmark navy                           |
| `$paper`         | `oklch(98.2% 0.004 75)` | Page / hero / light section backgrounds |
| `$paper-alt`     | `oklch(96% 0.006 75)`   | Alternating section backgrounds         |
| `$ink`           | `oklch(18% 0.03 260)`   | Headings                                |
| `$ink-dark`      | `oklch(20% 0.04 260)`   | Dark surfaces (footer, pricing header)  |
| `$text-body`     | `oklch(42% 0.02 260)`   | Paragraph copy                          |
| `$text-soft`     | `oklch(52% 0.015 260)`  | Muted text, captions                    |

The palette is a warm paper background with navy ink and a blue primary; light-only, no theme switching on marketing sections.

---

## Typography

- **Heading font:** Outfit (weights 400–700)
- **Body font:** Plus Jakarta Sans (weights 300–600)
- **Font source:** Google Fonts: preconnected and imported in `src/root.tsx`
- SCSS tokens: `$font-heading`, `$font-body` in `_variables.scss`

---

## Logo

- **Files:** `public/logo.svg` (mark), `public/horizontal_logo.svg` (horizontal lockup), `public/favicon.svg`, `public/logo.png` (used for Open Graph / JSON-LD images)
- **Usage:** On light (`$paper`) backgrounds by default; the footer renders the wordmark in text ("JBM" mark + "Web Co")
- **Minimum clear space:** 16px on all sides

---

## Imagery

- **Style:** UI mockups and abstract product visuals (browser-frame mockups, floating badges); no generic stock photography
- **Project previews:** Recent-projects cards use stylised browser previews with a per-project accent colour, not screenshots
- **Alt text tone:** Descriptive and keyword-rich (supports SEO); decorative visuals use `aria-hidden`
