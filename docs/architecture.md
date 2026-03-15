# Portfolio Platform Architecture

## Goal

Build a premium developer portfolio and secure admin CMS for `cjohnmizo.in` using Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui-inspired primitives, Supabase, and Vercel.

## Delivery Stages

1. Architecture and planning
2. Database schema
3. Folder structure and app shell
4. Public UI
5. Admin CMS
6. Supabase integration
7. Authentication and route protection
8. Storage integration
9. SEO and performance optimization
10. Deployment

## Application Layers

### Presentation

- `src/app/(public)` contains the recruiter-facing experience.
- `src/app/admin` contains the CMS interface.
- `src/components/ui` contains reusable design-system primitives.
- `src/components/portfolio` and `src/components/admin` contain feature-specific composition.

### Domain and data

- `src/types` defines strongly typed domain objects and Supabase contracts.
- `src/lib/portfolio` owns repository logic, seed fallbacks, GitHub integration, and content mapping.
- `src/validators` will hold Zod schemas for all admin forms.

### Infrastructure

- `src/lib/supabase` contains browser, server, and middleware clients.
- `src/middleware.ts` refreshes auth state and prepares the app for route protection.
- `supabase/migrations` contains the canonical SQL schema and policies.

## Runtime model

- Public routes prefer Supabase content when environment variables are configured.
- During local development without secrets, the app falls back to typed seed data so builds stay stable.
- Admin routes will use Supabase Auth and RLS-backed CRUD once the CMS stage is completed.
- Storage will use Supabase buckets for avatars, projects, resumes, and shared media.

## SEO strategy

- Route-level metadata for public pages and case studies.
- `robots.ts`, `sitemap.ts`, Open Graph, and Twitter metadata in later stages.
- Semantic sections, strong headings, and recruiter-oriented copy structure.

## Security model

- Public users can read only published content.
- Admin users authenticate with Supabase Auth.
- All writes are restricted through Row Level Security and storage policies.
- Service-role operations stay server-side only.

## Notes

- The repository layer is intentionally structured so the UI can be developed before live Supabase credentials are available.
- This keeps the build production-oriented while avoiding hardcoded secrets or brittle mock wiring.
