# cjohnmizo.in Portfolio Platform

Premium Next.js portfolio and admin CMS for `cjohnmizo.in`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn-style UI primitives
- Supabase PostgreSQL, Auth, and Storage
- React Hook Form + Zod
- Vercel deployment target

## What’s included

- Recruiter-focused public portfolio homepage
- Searchable project archive and dynamic case study pages
- Protected admin route structure with Supabase Auth hooks
- CMS forms for profile, projects, skills, experience, education, social links, settings, and media
- Supabase SQL schema with RLS and storage bucket setup
- Sitemap, robots, manifest, and Open Graph image routes
- Demo-mode fallback when Supabase credentials are not configured

## Local development

```bash
npm install
cp .env.example .env.local
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

For the local browser suite:

- Run `npm run test:e2e:install` once to install Chromium for Playwright.
- The public smoke coverage runs in demo mode or connected mode.
- Set `PLAYWRIGHT_ADMIN_EMAIL` and `PLAYWRIGHT_ADMIN_PASSWORD` if you want the authenticated admin smoke flow to run.

## Environment variables

Copy the values from `.env.example` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`

If Supabase variables are omitted, the public site still renders from typed seed data and the admin renders in demo mode.
If only the public Supabase keys are set, the public site can read from Supabase while admin writes and uploads remain in demo mode until `SUPABASE_SERVICE_ROLE_KEY` is added.

## Supabase setup

1. Create a Supabase project.
2. Run the SQL migrations in [`supabase/migrations`](./supabase/migrations), including:
   [`0001_portfolio_platform.sql`](./supabase/migrations/0001_portfolio_platform.sql) and
   [`0002_admin_auth_hardening.sql`](./supabase/migrations/0002_admin_auth_hardening.sql).
3. Create an admin user in Supabase Auth.
4. Insert a matching row into `profiles` with the same `id` as the auth user and `is_admin = true`.
5. Add your environment variables locally and in Vercel.

Until `0002_admin_auth_hardening.sql` is applied, login still works, but audit logging and sign-in throttling stay inactive.

## Admin access guide

The admin login is intentionally hidden from the public navigation and footer.

Use this direct route when you need CMS access:

- URL: `/admin/login`
- Admin email: `johnchangsan39@gmail.com`

Password handling:

- Keep the password out of the repository.
- Change or reset it from Supabase Auth when needed.
- Rotate temporary passwords after first sign-in.

## Deployment

The app is configured for Vercel.

Preview or production deploys require:

- a Vercel account linked to the repo
- the environment variables above
- DNS/domain configuration for `cjohnmizo.in`

## Key paths

- [`docs/architecture.md`](./docs/architecture.md)
- [`src/app`](./src/app)
- [`src/components`](./src/components)
- [`src/lib`](./src/lib)
- [`src/validators`](./src/validators)
- [`supabase/migrations`](./supabase/migrations)
