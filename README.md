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
- GitHub activity section powered by the GitHub API
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
```

## Environment variables

Copy the values from `.env.example` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`
- `GITHUB_USERNAME`

If Supabase variables are omitted, the public site still renders from typed seed data and the admin renders in demo mode.
If only the public Supabase keys are set, the public site can read from Supabase while admin writes and uploads remain in demo mode until `SUPABASE_SERVICE_ROLE_KEY` is added.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/migrations/0001_portfolio_platform.sql`](./supabase/migrations/0001_portfolio_platform.sql).
3. Create an admin user in Supabase Auth.
4. Insert a matching row into `profiles` with the same `id` as the auth user and `is_admin = true`.
5. Add your environment variables locally and in Vercel.

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
