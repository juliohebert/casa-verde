create type public.user_role as enum ('host', 'super_admin');
create type public.account_status as enum ('active', 'suspended');
create type public.payment_status as enum ('paid', 'pending', 'failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  owner_name text not null check (char_length(trim(owner_name)) between 2 and 120),
  role public.user_role not null default 'host',
  account_status public.account_status not null default 'active',
  trial_ends_at timestamptz not null default (now() + interval '7 days'),
  subscription_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 2 and 120),
  slug text,
  public_token uuid not null default gen_random_uuid(),
  is_published boolean not null default false,
  guide_data jsonb not null default '{
    "host": {
      "names": "",
      "photoPath": null,
      "tagline": "",
      "bio": "",
      "languages": [],
      "responseTime": "",
      "phone": "",
      "whatsapp": "",
      "email": "",
      "airbnbSupportLink": null
    },
    "property": {
      "addressLine1": "",
      "addressLine2": "",
      "cityStateZip": "",
      "latitude": null,
      "longitude": null
    },
    "wifi": {
      "ssid": "",
      "password": "",
      "routerLocation": ""
    },
    "rules": [],
    "amenities": [],
    "checkIn": {
      "time": "",
      "gateCode": "",
      "steps": []
    },
    "checkOut": {
      "time": "",
      "steps": []
    }
  }'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint properties_public_token_key unique (public_token),
  constraint properties_slug_format check (
    slug is null or slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  ),
  constraint properties_guide_data_object check (
    jsonb_typeof(guide_data) = 'object'
    and guide_data ?& array[
      'host',
      'property',
      'wifi',
      'rules',
      'amenities',
      'checkIn',
      'checkOut'
    ]
  )
);

create table public.payment_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount_cents integer not null check (amount_cents > 0),
  status public.payment_status not null,
  method text not null check (char_length(trim(method)) between 2 and 60),
  paid_at timestamptz,
  notes text check (notes is null or char_length(notes) <= 1000),
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  constraint payment_paid_at_consistency check (
    (status = 'paid' and paid_at is not null)
    or (status <> 'paid' and paid_at is null)
  )
);

create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  comment text check (
    comment is null
    or char_length(trim(comment)) between 1 and 2000
  ),
  created_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles(role);
create index profiles_account_status_idx on public.profiles(account_status);
create index properties_owner_id_idx on public.properties(owner_id);
create unique index properties_owner_slug_key
  on public.properties(owner_id, slug)
  where slug is not null;
create index properties_published_idx
  on public.properties(is_published)
  where is_published = true;
create index payment_records_user_id_created_at_idx
  on public.payment_records(user_id, created_at desc);
create index feedback_property_id_created_at_idx
  on public.feedback(property_id, created_at desc);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger properties_set_updated_at
before update on public.properties
for each row execute function public.set_updated_at();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  profile_name text;
begin
  profile_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'owner_name'), ''),
    nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
    'Anfitriao'
  );

  insert into public.profiles (id, email, owner_name)
  values (new.id, coalesce(new.email, ''), profile_name)
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create function public.sync_profile_email()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.email is distinct from old.email then
    update public.profiles
    set email = coalesce(new.email, '')
    where id = new.id;
  end if;

  return new;
end;
$$;

create trigger on_auth_user_email_updated
after update of email on auth.users
for each row execute function public.sync_profile_email();

comment on table public.profiles is
  'Application profile linked one-to-one with auth.users.';
comment on table public.properties is
  'Host properties and their versioned guest guide payload.';
comment on column public.properties.public_token is
  'Unpredictable public identifier. Rotate instead of reusing old values.';
comment on table public.payment_records is
  'Manual payment audit records; amounts are stored in cents.';
comment on table public.feedback is
  'Guest feedback. Public writes must go through a rate-limited server action.';
