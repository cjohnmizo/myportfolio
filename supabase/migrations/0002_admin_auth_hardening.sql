create table if not exists public.admin_auth_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references auth.users(id) on delete set null,
  email text not null,
  ip_address inet,
  user_agent text,
  event_type text not null check (
    event_type in ('sign_in_succeeded', 'sign_in_failed', 'sign_in_blocked', 'sign_out')
  ),
  reason text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists admin_auth_audit_log_email_created_at_idx
on public.admin_auth_audit_log (email, created_at desc);

create index if not exists admin_auth_audit_log_ip_created_at_idx
on public.admin_auth_audit_log (ip_address, created_at desc);

create index if not exists admin_auth_audit_log_event_created_at_idx
on public.admin_auth_audit_log (event_type, created_at desc);

create index if not exists admin_auth_audit_log_user_created_at_idx
on public.admin_auth_audit_log (admin_user_id, created_at desc);

alter table public.admin_auth_audit_log enable row level security;

create policy "Admins read auth audit log"
on public.admin_auth_audit_log
for select
to authenticated
using (public.is_admin_user());
