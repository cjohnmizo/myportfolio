# cjohnmizo.in Portfolio

Static Next.js portfolio for `cjohnmizo.in`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- React Hook Form + Zod for the contact form
- Vercel Analytics and Speed Insights
- Resend-powered contact form
- Vercel deployment target

## What's Included

- Public portfolio homepage
- Searchable project archive and dynamic case study pages
- Static local portfolio data in `src/lib/portfolio/seeds.ts`
- Sitemap, robots, manifest, health, and Open Graph image routes
- Responsive light sapphire glass dashboard visual system

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Run `npm run test:e2e:install` once to install Chromium for Playwright.

## Environment Variables

These variables are used by the app:

- `NEXT_PUBLIC_SITE_URL`
- `GOOGLE_SITE_VERIFICATION`
- `RESEND_API_KEY`
- `CONTACT_PUBLIC_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `ADMIN_EMAIL`

`NEXT_PUBLIC_SITE_URL` defaults to `https://cjohnmizo.in`. `GOOGLE_SITE_VERIFICATION` is optional and is only needed if you verify a URL-prefix property in Google Search Console via the HTML meta tag method.

The contact form sends through Resend from the server-side `/api/contact` route. Set `RESEND_API_KEY`, set `CONTACT_FROM_EMAIL` to a verified sender on `cjohnmizo.in`, and set `CONTACT_TO_EMAIL` to the inbox where project briefs should arrive. `ADMIN_EMAIL` is a fallback recipient if `CONTACT_TO_EMAIL` is not set.

To make `contact@cjohnmizo.in` fully usable, verify `cjohnmizo.in` in Resend and add the DNS records Resend gives you. If the mailbox itself is not hosted yet, forward `contact@cjohnmizo.in` to an existing inbox or set `CONTACT_TO_EMAIL` to that existing inbox.

## Content Updates

The portfolio is intentionally backend-free. Edit these files for content changes:

- `src/lib/portfolio/seeds.ts`
- `public/profile.jpg`
- `public/projects/*`
- `public/brand/*`

## Deployment

The app is configured for Vercel. Preview or production deploys require:

- a Vercel account linked to the repo
- optional `NEXT_PUBLIC_SITE_URL` and `GOOGLE_SITE_VERIFICATION` variables
- DNS/domain configuration for `cjohnmizo.in`

## Search Console

Recommended path:

1. Add `cjohnmizo.in` as a Domain property in Google Search Console.
2. Use the DNS TXT verification token that Google gives you.
3. Add that TXT record in Vercel DNS because the domain nameservers already point to Vercel.
4. After verification succeeds, submit `https://cjohnmizo.in/sitemap.xml`.

Alternative path:

- If you choose a URL-prefix property instead of a Domain property, set `GOOGLE_SITE_VERIFICATION` in Vercel and redeploy so the verification meta tag is rendered in the site head.

## Monitoring

- Vercel Web Analytics and Speed Insights are mounted in the root layout for production traffic.
- Health check endpoint: `/api/health`
- Security disclosure file: `/.well-known/security.txt`

## Key Paths

- `docs/architecture.md`
- `src/app`
- `src/components`
- `src/lib/portfolio`
- `src/validators`
- `public`
