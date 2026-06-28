# Guru Translines — Website

A premium marketing + lead-generation website for Guru Translines, built with Next.js
(App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## What's included

- **Home, About, Services (+ 6 detail pages), Fleet, Fare Estimator, Booking, Contact,
  Privacy Policy** — all pages from the brief.
- **Smart Fare Estimator** — calculates Local and Outstation fares live from the rates in
  `lib/rates.ts` (sourced from the client's rate sheet). Outstation distance auto-calculates via
  Google Maps once a key is configured; falls back to manual entry otherwise.
- **WhatsApp integration** — a floating button site-wide, plus the Estimator, Booking form and
  Contact form all hand off to WhatsApp with a pre-filled message in the exact template from the
  brief.
- **SEO** — metadata, Open Graph tags, JSON-LD structured data, `sitemap.xml`, `robots.txt`.
- **Real brand assets** — the client's logo (plus a white variant generated for the dark
  footer) and fleet photos are wired in under `public/images/`.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

### Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — optional but recommended. Without it, the estimator still
works fully, just with manual distance entry instead of auto-calculation. See `.env.example` for
how to get a key.

## Deployment (Vercel — recommended)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Add the `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` environment variable in the Vercel project settings
   (Settings → Environment Variables).
4. Deploy. Vercel auto-detects Next.js — no extra configuration needed.
5. Point your domain (e.g. `gurutranslines.com`) at the Vercel project under Settings → Domains.

Any other Node.js host (Netlify, your own server, etc.) works too — just run `npm run build` then
`npm run start`.

## Before you go live — please review

A few things were deliberately left as placeholders or flagged decisions, called out here so
nothing ships by accident:

1. **Testimonials** (`data/testimonials.ts`) are illustrative placeholder copy, not real
   customer quotes. Replace with real reviews before launch — this is marked clearly in the file.
2. **Corporate client list** is shown as text only (`lib/company.ts` → `clients`). If you can
   send over the actual client logos, I can swap the text strip for a logo strip.
3. **Sedan, Innova Crysta, 16-Seater and 55-Seater Bus** are intentionally excluded from the
   fleet and estimator — no current rates exist for them in the rate sheet. Send updated rates
   and I'll add them back in (the data model in `data/fleet.ts` / `lib/rates.ts` already
   supports it — it's a content change, not a code change).
4. **Google Maps API key** isn't included (Anthropic can't create or pay for Google Cloud
   billing on your behalf) — see `.env.example` for how to get one. The site works correctly
   without it; the estimator just asks for distance manually instead of calculating it.
5. **Primary contact number** is set to 93488 87007 throughout (`lib/company.ts`). If that
   changes, it's a one-line edit in that file — every Call/WhatsApp button site-wide reads from
   it.
6. **Domain** — metadata currently points at `https://www.gurutranslines.com`. Update
   `siteUrl` in `app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts` if the real domain differs.

## Project structure

```
app/                  Routes (App Router)
components/
  layout/             Header, Footer, WhatsApp float button
  home/                Homepage sections
  fleet/               Fleet card + filter bar
  estimator/           Fare estimator form, location autocomplete, result card
  booking/             Booking form
  contact/             Contact form
  shared/              Button, Container, SectionHeading, FadeIn
lib/
  rates.ts             Fare data + calculation functions
  company.ts           Single source of truth for contact info, WhatsApp message builder
  googleMaps.ts         Google Maps script loader + distance calculation
  validations.ts        Zod schemas for the booking/contact forms
data/
  fleet.ts, services.ts, testimonials.ts   Content
public/images/         Logo + fleet photos
```

## Editing content

- **Fleet vehicles & prices**: `data/fleet.ts` (display info) and `lib/rates.ts` (pricing logic).
- **Services**: `data/services.ts`.
- **Company info / phone numbers / address**: `lib/company.ts`.
- **Testimonials**: `data/testimonials.ts`.
