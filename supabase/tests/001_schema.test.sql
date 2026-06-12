begin;

create extension if not exists pgtap with schema extensions;

select plan(18);

select ok(to_regclass('public.profiles') is not null, 'profiles table exists');
select ok(to_regclass('public.properties') is not null, 'properties table exists');
select ok(
  to_regclass('public.payment_records') is not null,
  'payment_records table exists'
);
select ok(to_regclass('public.feedback') is not null, 'feedback table exists');

select ok(
  exists (
    select 1
    from pg_type
    join pg_namespace on pg_namespace.oid = pg_type.typnamespace
    where pg_namespace.nspname = 'public'
      and pg_type.typname = 'user_role'
  ),
  'user_role enum exists'
);
select ok(
  exists (
    select 1
    from pg_type
    join pg_namespace on pg_namespace.oid = pg_type.typnamespace
    where pg_namespace.nspname = 'public'
      and pg_type.typname = 'account_status'
  ),
  'account_status enum exists'
);
select ok(
  exists (
    select 1
    from pg_type
    join pg_namespace on pg_namespace.oid = pg_type.typnamespace
    where pg_namespace.nspname = 'public'
      and pg_type.typname = 'payment_status'
  ),
  'payment_status enum exists'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.profiles'::regclass),
  'profiles has RLS enabled'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.properties'::regclass),
  'properties has RLS enabled'
);
select ok(
  (
    select relrowsecurity
    from pg_class
    where oid = 'public.payment_records'::regclass
  ),
  'payment_records has RLS enabled'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.feedback'::regclass),
  'feedback has RLS enabled'
);

select ok(
  exists (
    select 1
    from pg_trigger
    where tgrelid = 'auth.users'::regclass
      and tgname = 'on_auth_user_created'
      and not tgisinternal
  ),
  'auth user creation trigger exists'
);
select ok(
  exists (
    select 1
    from pg_trigger
    where tgrelid = 'public.profiles'::regclass
      and tgname = 'profiles_set_updated_at'
      and not tgisinternal
  ),
  'profiles updated_at trigger exists'
);
select ok(
  exists (
    select 1
    from pg_trigger
    where tgrelid = 'public.properties'::regclass
      and tgname = 'properties_set_updated_at'
      and not tgisinternal
  ),
  'properties updated_at trigger exists'
);

select ok(
  to_regprocedure('public.get_public_guide(uuid)') is not null,
  'public guide function exists'
);
select ok(
  to_regprocedure(
    'public.register_manual_payment_and_renew(uuid,integer,text,text,integer)'
  ) is not null,
  'manual payment transaction function exists'
);
select is(
  (select count(*) from storage.buckets where id = 'host-assets'),
  1::bigint,
  'host-assets bucket exists'
);
select is(
  (
    select count(*)
    from public.get_public_guide(
      '40000000-0000-0000-0000-000000000001'::uuid
    )
  ),
  1::bigint,
  'seed includes a published demo guide'
);

select * from finish();
rollback;
