-- Detach Innovations: quote requests, project photos, product edits and admin access.

-- Admins: team members who can sign in to /admin. Add a row per user after creating them in Auth.
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;
revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create policy "Admins can see the admin list" on public.admins
  for select to authenticated using ((select public.is_admin()));

-- Quote requests from the website form. Anyone can send one; only admins can read or change them.
create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  phone text not null check (char_length(phone) between 5 and 40),
  email text check (email is null or char_length(email) <= 160),
  item text check (item is null or char_length(item) <= 120),
  size text check (size is null or char_length(size) <= 200),
  location text check (location is null or char_length(location) <= 160),
  details text check (details is null or char_length(details) <= 3000),
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
  notes text check (notes is null or char_length(notes) <= 3000)
);
alter table public.quotes enable row level security;
create index quotes_created_at_idx on public.quotes (created_at desc);

create policy "Anyone can send a quote request" on public.quotes
  for insert to anon, authenticated
  with check (status = 'new' and notes is null);
create policy "Admins can read quote requests" on public.quotes
  for select to authenticated using ((select public.is_admin()));
create policy "Admins can update quote requests" on public.quotes
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admins can delete quote requests" on public.quotes
  for delete to authenticated using ((select public.is_admin()));

-- Project photos uploaded in the admin portal, shown on /projects with their traced lines.
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null check (char_length(title) between 1 and 120),
  category text not null,
  image_url text not null,
  storage_path text,
  trace jsonb,
  published boolean not null default true,
  sort integer not null default 0
);
alter table public.projects enable row level security;
create index projects_sort_idx on public.projects (sort, created_at desc);

create policy "Published projects are public" on public.projects
  for select to anon, authenticated using (published or (select public.is_admin()));
create policy "Admins can add projects" on public.projects
  for insert to authenticated with check ((select public.is_admin()));
create policy "Admins can update projects" on public.projects
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admins can delete projects" on public.projects
  for delete to authenticated using ((select public.is_admin()));

-- Edits to the built-in product catalogue: a price note, a new summary, or hiding a product.
create table public.product_overrides (
  slug text primary key,
  price_note text check (price_note is null or char_length(price_note) <= 80),
  summary text check (summary is null or char_length(summary) <= 600),
  hidden boolean not null default false,
  updated_at timestamptz not null default now()
);
alter table public.product_overrides enable row level security;

create policy "Product edits are public" on public.product_overrides
  for select to anon, authenticated using (true);
create policy "Admins can add product edits" on public.product_overrides
  for insert to authenticated with check ((select public.is_admin()));
create policy "Admins can change product edits" on public.product_overrides
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admins can remove product edits" on public.product_overrides
  for delete to authenticated using ((select public.is_admin()));

-- Public photo bucket; only admins can upload, replace or delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('project-photos', 'project-photos', true, 5242880, array['image/webp', 'image/jpeg', 'image/png']);

create policy "Admins can upload project photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'project-photos' and (select public.is_admin()));
create policy "Admins can replace project photos" on storage.objects
  for update to authenticated using (bucket_id = 'project-photos' and (select public.is_admin()));
create policy "Admins can delete project photos" on storage.objects
  for delete to authenticated using (bucket_id = 'project-photos' and (select public.is_admin()));
