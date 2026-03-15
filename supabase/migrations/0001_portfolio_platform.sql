create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  headline text not null,
  current_role text not null,
  location text not null,
  email text not null,
  short_bio text not null,
  long_bio text not null,
  avatar_url text not null,
  resume_url text,
  github_username text not null,
  years_experience integer not null default 0,
  is_available_for_hire boolean not null default true,
  is_admin boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  description text not null,
  challenge text not null,
  solution text not null,
  impact text not null,
  category text not null,
  status text not null,
  year text not null,
  sort_order integer not null default 0,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  cover_image text not null,
  gallery_images text[] not null default '{}',
  demo_url text,
  github_url text,
  case_study_url text,
  metrics jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_tech_stack (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  label text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  proficiency integer not null check (proficiency >= 0 and proficiency <= 100),
  icon text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  location text not null,
  employment_type text not null,
  start_date date not null,
  end_date date,
  summary text not null,
  achievements text[] not null default '{}',
  tech_stack text[] not null default '{}',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text not null,
  field text not null,
  location text not null,
  start_date date not null,
  end_date date,
  grade text not null,
  description text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  platform text not null,
  url text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  hero_eyebrow text not null,
  hero_title text not null,
  hero_subtitle text not null,
  hero_description text not null,
  about_title text not null,
  about_body text not null,
  contact_title text not null,
  contact_description text not null,
  seo_title text not null,
  seo_description text not null,
  footer_note text not null,
  primary_accent text not null default '#6366f1',
  secondary_accent text not null default '#22c55e',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  public_url text not null,
  alt_text text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists projects_slug_idx on public.projects(slug);
create index if not exists projects_sort_order_idx on public.projects(sort_order);
create index if not exists projects_publish_idx on public.projects(is_published, is_featured);
create index if not exists project_tech_stack_project_idx on public.project_tech_stack(project_id);
create index if not exists skills_sort_order_idx on public.skills(sort_order);
create index if not exists experiences_sort_order_idx on public.experiences(sort_order);
create index if not exists education_sort_order_idx on public.education(sort_order);
create index if not exists social_links_sort_order_idx on public.social_links(sort_order);
create index if not exists media_assets_bucket_idx on public.media_assets(bucket);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists set_skills_updated_at on public.skills;
create trigger set_skills_updated_at
before update on public.skills
for each row execute function public.set_updated_at();

drop trigger if exists set_experiences_updated_at on public.experiences;
create trigger set_experiences_updated_at
before update on public.experiences
for each row execute function public.set_updated_at();

drop trigger if exists set_education_updated_at on public.education;
create trigger set_education_updated_at
before update on public.education
for each row execute function public.set_updated_at();

drop trigger if exists set_social_links_updated_at on public.social_links;
create trigger set_social_links_updated_at
before update on public.social_links
for each row execute function public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists set_media_assets_updated_at on public.media_assets;
create trigger set_media_assets_updated_at
before update on public.media_assets
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_tech_stack enable row level security;
alter table public.skills enable row level security;
alter table public.experiences enable row level security;
alter table public.education enable row level security;
alter table public.social_links enable row level security;
alter table public.site_settings enable row level security;
alter table public.media_assets enable row level security;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where public.profiles.id = auth.uid()
      and public.profiles.is_admin = true
  );
$$;

create policy "Public can read profile"
on public.profiles
for select
to anon, authenticated
using (true);

create policy "Admins manage profile"
on public.profiles
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Public can read published projects"
on public.projects
for select
to anon, authenticated
using (is_published = true);

create policy "Admins manage projects"
on public.projects
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Public can read project tech stack for published projects"
on public.project_tech_stack
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.projects
    where public.projects.id = public.project_tech_stack.project_id
      and public.projects.is_published = true
  )
);

create policy "Admins manage project tech stack"
on public.project_tech_stack
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Public can read published skills"
on public.skills
for select
to anon, authenticated
using (is_published = true);

create policy "Admins manage skills"
on public.skills
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Public can read published experiences"
on public.experiences
for select
to anon, authenticated
using (is_published = true);

create policy "Admins manage experiences"
on public.experiences
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Public can read published education"
on public.education
for select
to anon, authenticated
using (is_published = true);

create policy "Admins manage education"
on public.education
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Public can read published social links"
on public.social_links
for select
to anon, authenticated
using (is_published = true);

create policy "Admins manage social links"
on public.social_links
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

create policy "Admins manage site settings"
on public.site_settings
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Public can read media assets"
on public.media_assets
for select
to anon, authenticated
using (true);

create policy "Admins manage media assets"
on public.media_assets
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('projects', 'projects', true),
  ('resumes', 'resumes', false),
  ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public read avatars"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'avatars');

create policy "Public read project assets"
on storage.objects
for select
to anon, authenticated
using (bucket_id in ('projects', 'media'));

create policy "Admins manage storage objects"
on storage.objects
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());
