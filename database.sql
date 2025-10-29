-- BT3 IT Course - Supabase/Postgres schema
-- Run this in your Supabase SQL editor

-- Extensions
create extension if not exists "uuid-ossp";

-- ===== Table: uploaded_files =====
-- Stores metadata for user uploads (subjects/resources/gallery uploads)
create table if not exists public.uploaded_files (
  id text primary key,
  name text not null,
  type text,
  size bigint,
  upload_date timestamptz not null default now(),
  file_path text not null,
  file_url text not null,
  subject text,
  uploader_id uuid,
  uploader_email text
);

-- Helpful indexes
create index if not exists uploaded_files_uploader_id_idx on public.uploaded_files (uploader_id);
create index if not exists uploaded_files_subject_idx on public.uploaded_files (subject);
create index if not exists uploaded_files_upload_date_idx on public.uploaded_files (upload_date desc);

-- Row Level Security
alter table public.uploaded_files enable row level security;

-- Defaulting uploader fields from auth context (if client forgets to send)
create or replace function public.set_uploaded_files_defaults()
returns trigger as $$
begin
  if new.uploader_id is null then
    new.uploader_id := auth.uid();
  end if;
  if new.uploader_email is null then
    new.uploader_email := coalesce(current_setting('request.jwt.claims', true)::jsonb ->> 'email', new.uploader_email);
  end if;
  if new.upload_date is null then
    new.upload_date := now();
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_set_uploaded_files_defaults on public.uploaded_files;
create trigger trg_set_uploaded_files_defaults
before insert on public.uploaded_files
for each row execute function public.set_uploaded_files_defaults();

-- Ensure roles table and helper exist before policies use current_role()
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('student','teacher','admin')),
  updated_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

drop policy if exists user_roles_self_read on public.user_roles;
create policy user_roles_self_read
  on public.user_roles for select to authenticated
  using (user_id = auth.uid());

create or replace function public.current_role()
returns text as $$
declare
  jwt jsonb;
  meta_role text;
  db_role text;
begin
  select role into db_role from public.user_roles where user_id = auth.uid();
  if db_role is not null then
    return db_role;
  end if;
  begin
    jwt := current_setting('request.jwt.claims', true)::jsonb;
    meta_role := coalesce(jwt -> 'user_metadata' ->> 'role', jwt ->> 'role');
  exception when others then
    meta_role := null;
  end;
  return coalesce(meta_role, 'student');
end;
$$ language plpgsql stable;

-- Policies
-- Read: allow anyone to read (public gallery/resources)
drop policy if exists uploaded_files_read_all on public.uploaded_files;
create policy uploaded_files_read_all
  on public.uploaded_files for select
  using (true);

-- Insert: authenticated users only; enforce row owner
drop policy if exists uploaded_files_insert_auth on public.uploaded_files;
create policy uploaded_files_insert_auth
  on public.uploaded_files for insert
  to authenticated
  with check (
    (uploader_id is null or uploader_id = auth.uid())
    and (uploader_email is null or uploader_email = coalesce(current_setting('request.jwt.claims', true)::jsonb ->> 'email',''))
  );

-- Update: owner or teacher/admin can update
drop policy if exists uploaded_files_update_owner on public.uploaded_files;
create policy uploaded_files_update_owner
  on public.uploaded_files for update
  to authenticated
  using (
    uploader_id = auth.uid() OR public.current_role() in ('teacher','admin')
  )
  with check (
    uploader_id = auth.uid() OR public.current_role() in ('teacher','admin')
  );

-- Delete: owner or teacher/admin can delete
drop policy if exists uploaded_files_delete_owner on public.uploaded_files;
create policy uploaded_files_delete_owner
  on public.uploaded_files for delete
  to authenticated
  using (
    uploader_id = auth.uid() OR public.current_role() in ('teacher','admin')
  );

-- ===== Storage: bucket policies (images, student-uploads) =====
-- Buckets should exist: 'images' (gallery/avatars) and 'student-uploads' (resources/uploads)
-- If not created, create them in Storage with public read if desired.

-- Enable storage policies
-- Public read for 'images' bucket (gallery & avatars)
drop policy if exists storage_images_read on storage.objects;
create policy storage_images_read
  on storage.objects for select
  using (bucket_id = 'images');

-- Authenticated can upload to 'images'
drop policy if exists storage_images_insert on storage.objects;
create policy storage_images_insert
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'images');

-- Owners or teacher/admin can delete from 'images'
drop policy if exists storage_images_delete on storage.objects;
create policy storage_images_delete
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'images' and (owner = auth.uid() OR public.current_role() in ('teacher','admin'))
  );

-- Public read for 'student-uploads' (optional: make private by changing to authenticated)
drop policy if exists storage_student_uploads_read on storage.objects;
create policy storage_student_uploads_read
  on storage.objects for select
  using (bucket_id = 'student-uploads');

drop policy if exists storage_student_uploads_insert on storage.objects;
create policy storage_student_uploads_insert
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'student-uploads');

drop policy if exists storage_student_uploads_delete on storage.objects;
create policy storage_student_uploads_delete
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'student-uploads' and (owner = auth.uid() OR public.current_role() in ('teacher','admin'))
  );

-- ===== Optional: user roles table (if you want DB-driven roles) =====
-- Currently roles are kept in auth.user_metadata (full_name, role).
-- If you later want DB-enforced roles, uncomment below and manage via SQL.
-- create table if not exists public.user_roles (
--   user_id uuid primary key references auth.users(id) on delete cascade,
--   role text not null check (role in ('student','teacher','admin')),
--   updated_at timestamptz not null default now()
-- );
-- alter table public.user_roles enable row level security;
-- create policy if not exists user_roles_self_read on public.user_roles for select to authenticated using (user_id = auth.uid());
-- -- Admin management policy would require an admin concept at DB level (e.g., a separate admin list table or JWT claim).

-- ===== Roles (DB-driven with fallback to JWT user_metadata) =====
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('student','teacher','admin')),
  updated_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

drop policy if exists user_roles_self_read on public.user_roles;
create policy user_roles_self_read
  on public.user_roles for select to authenticated
  using (user_id = auth.uid());

create or replace function public.current_role()
returns text as $$
declare
  jwt jsonb;
  meta_role text;
  db_role text;
begin
  select role into db_role from public.user_roles where user_id = auth.uid();
  if db_role is not null then
    return db_role;
  end if;
  begin
    jwt := current_setting('request.jwt.claims', true)::jsonb;
    meta_role := coalesce(jwt -> 'user_metadata' ->> 'role', jwt ->> 'role');
  exception when others then
    meta_role := null;
  end;
  return coalesce(meta_role, 'student');
end;
$$ language plpgsql stable;

-- Done.

-- ===== Realtime (Logical Replication) =====
-- Supabase Realtime streams changes from tables included in the
-- 'supabase_realtime' publication. Add your tables here.

do $$
begin
  if not exists (
    select 1 from pg_publication where pubname = 'supabase_realtime'
  ) then
    create publication supabase_realtime;
  end if;
end $$;

-- Add tables to the realtime publication (idempotent)
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'uploaded_files'
  ) then
    execute 'alter publication supabase_realtime add table public.uploaded_files';
  end if;
end $$;

-- If you enable the optional user_roles table, also add:
-- do $$
-- begin
--   if not exists (
--     select 1 from pg_publication_tables
--     where pubname = 'supabase_realtime'
--       and schemaname = 'public'
--       and tablename = 'user_roles'
--   ) then
--     execute 'alter publication supabase_realtime add table public.user_roles';
--   end if;
-- end $$;


