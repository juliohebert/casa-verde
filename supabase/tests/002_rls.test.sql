begin;

create extension if not exists pgtap with schema extensions;

select plan(14);

create function pg_temp.update_property_name(
  property_id uuid,
  property_name text
)
returns bigint
language plpgsql
as $$
declare
  changed_rows bigint;
begin
  update public.properties
  set name = property_name
  where id = property_id;

  get diagnostics changed_rows = row_count;
  return changed_rows;
end;
$$;

create function pg_temp.suspend_profile(profile_id uuid)
returns bigint
language plpgsql
as $$
declare
  changed_rows bigint;
begin
  update public.profiles
  set account_status = 'suspended'
  where id = profile_id;

  get diagnostics changed_rows = row_count;
  return changed_rows;
end;
$$;

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values (
  '00000000-0000-0000-0000-000000000000',
  '10000000-0000-0000-0000-000000000003',
  'authenticated',
  'authenticated',
  'other-host@casaverde.local',
  crypt('OtherHost123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"owner_name":"Outro anfitriao"}'::jsonb,
  now(),
  now()
);

insert into public.properties (
  id,
  owner_id,
  name,
  slug,
  public_token,
  is_published
)
values (
  '30000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000003',
  'Casa de outro anfitriao',
  'casa-outro-anfitriao',
  '40000000-0000-0000-0000-000000000003',
  true
);

set local role authenticated;
select set_config(
  'request.jwt.claims',
  '{"sub":"10000000-0000-0000-0000-000000000001","role":"authenticated"}',
  true
);

select is(
  (select count(*) from public.profiles),
  1::bigint,
  'host reads only their own profile'
);
select is(
  (select count(*) from public.properties),
  1::bigint,
  'host lists only their own properties'
);
select is(
  pg_temp.update_property_name(
    '30000000-0000-0000-0000-000000000003',
    'Alteracao indevida'
  ),
  0::bigint,
  'host cannot update another host property'
);
select is(
  pg_temp.update_property_name(
    '30000000-0000-0000-0000-000000000001',
    'Casa do Vale atualizada'
  ),
  1::bigint,
  'host can update their own property'
);
select throws_ok(
  $$
    update public.profiles
    set role = 'super_admin'
    where id = '10000000-0000-0000-0000-000000000001'
  $$,
  '42501',
  'Profile field cannot be changed by this user',
  'host cannot promote their own role'
);
select ok(
  not has_table_privilege('anon', 'public.properties', 'select'),
  'anonymous role cannot query properties directly'
);
select is(
  (
    select count(*)
    from public.get_public_guide(
      '40000000-0000-0000-0000-000000000001'::uuid
    )
  ),
  1::bigint,
  'anonymous-safe function returns a published active guide'
);
select is(
  (
    select count(*)
    from public.get_public_guide(
      '49999999-9999-9999-9999-999999999999'::uuid
    )
  ),
  0::bigint,
  'public guide function does not reveal unknown tokens'
);

reset role;
select set_config('request.jwt.claims', '{}', true);
update public.profiles
set
  trial_ends_at = now() - interval '1 day',
  subscription_expires_at = null
where id = '10000000-0000-0000-0000-000000000001';

set local role authenticated;
select set_config(
  'request.jwt.claims',
  '{"sub":"10000000-0000-0000-0000-000000000001","role":"authenticated"}',
  true
);

select ok(
  not public.has_active_access(
    '10000000-0000-0000-0000-000000000001'::uuid
  ),
  'expired host is detected as inactive'
);
select throws_ok(
  $$
    insert into public.properties (owner_id, name)
    values (
      '10000000-0000-0000-0000-000000000001',
      'Propriedade bloqueada'
    )
  $$,
  '42501',
  'new row violates row-level security policy for table "properties"',
  'expired host cannot create a property'
);

reset role;
set local role authenticated;
select set_config(
  'request.jwt.claims',
  '{"sub":"10000000-0000-0000-0000-000000000002","role":"authenticated"}',
  true
);

select is(
  (select count(*) from public.properties),
  2::bigint,
  'super admin can list all properties'
);
select is(
  pg_temp.suspend_profile(
    '10000000-0000-0000-0000-000000000003'
  ),
  1::bigint,
  'super admin can suspend another account'
);
select lives_ok(
  $$
    select public.register_manual_payment_and_renew(
      '10000000-0000-0000-0000-000000000001',
      9900,
      'pix_manual',
      'Pagamento de teste',
      1
    )
  $$,
  'super admin can register payment and renew access'
);
select is(
  (
    select count(*)
    from public.payment_records
    where user_id = '10000000-0000-0000-0000-000000000001'
      and status = 'paid'
  ),
  1::bigint,
  'payment transaction creates an audit record'
);

select * from finish();
rollback;
