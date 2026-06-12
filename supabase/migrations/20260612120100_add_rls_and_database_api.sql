create function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'super_admin'
      and account_status = 'active'
  );
$$;

create function public.has_active_access(profile_uuid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = profile_uuid
      and account_status = 'active'
      and (
        role = 'super_admin'
        or trial_ends_at >= now()
        or subscription_expires_at >= now()
      )
  );
$$;

create function public.owns_property(property_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.properties
    where id = property_uuid
      and owner_id = (select auth.uid())
  );
$$;

create function public.protect_profile_privileged_fields()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if auth.uid() is not null and not public.is_super_admin() then
    if old.id is distinct from auth.uid()
      or new.id is distinct from old.id
      or new.email is distinct from old.email
      or new.role is distinct from old.role
      or new.account_status is distinct from old.account_status
      or new.trial_ends_at is distinct from old.trial_ends_at
      or new.subscription_expires_at is distinct from old.subscription_expires_at
    then
      raise exception 'Profile field cannot be changed by this user'
        using errcode = '42501';
    end if;
  end if;

  return new;
end;
$$;

create trigger profiles_protect_privileged_fields
before update on public.profiles
for each row execute function public.protect_profile_privileged_fields();

create function public.get_public_guide(guide_token uuid)
returns table (
  property_id uuid,
  property_name text,
  property_slug text,
  guide_data jsonb,
  updated_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    property.id,
    property.name,
    property.slug,
    property.guide_data,
    property.updated_at
  from public.properties as property
  join public.profiles as owner on owner.id = property.owner_id
  where property.public_token = guide_token
    and property.is_published = true
    and owner.account_status = 'active'
    and (
      owner.role = 'super_admin'
      or owner.trial_ends_at >= now()
      or owner.subscription_expires_at >= now()
    )
  limit 1;
$$;

create function public.register_manual_payment_and_renew(
  target_user_id uuid,
  payment_amount_cents integer,
  payment_method text default 'pix_manual',
  payment_notes text default null,
  renewal_months integer default 1
)
returns public.payment_records
language plpgsql
security definer
set search_path = ''
as $$
declare
  payment public.payment_records;
begin
  if not public.is_super_admin() then
    raise exception 'Only super admins can register payments'
      using errcode = '42501';
  end if;

  if payment_amount_cents <= 0 then
    raise exception 'Payment amount must be greater than zero'
      using errcode = '22023';
  end if;

  if renewal_months < 1 or renewal_months > 24 then
    raise exception 'Renewal months must be between 1 and 24'
      using errcode = '22023';
  end if;

  insert into public.payment_records (
    user_id,
    amount_cents,
    status,
    method,
    paid_at,
    notes,
    created_by
  )
  values (
    target_user_id,
    payment_amount_cents,
    'paid',
    payment_method,
    now(),
    payment_notes,
    auth.uid()
  )
  returning * into payment;

  update public.profiles
  set subscription_expires_at =
    greatest(coalesce(subscription_expires_at, now()), now())
    + make_interval(months => renewal_months)
  where id = target_user_id;

  if not found then
    raise exception 'Target profile not found'
      using errcode = 'P0002';
  end if;

  return payment;
end;
$$;

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.payment_records enable row level security;
alter table public.feedback enable row level security;

create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (id = (select auth.uid()) or public.is_super_admin());

create policy "profiles_update_own_or_admin"
on public.profiles
for update
to authenticated
using (id = (select auth.uid()) or public.is_super_admin())
with check (id = (select auth.uid()) or public.is_super_admin());

create policy "properties_select_owned_or_admin"
on public.properties
for select
to authenticated
using (owner_id = (select auth.uid()) or public.is_super_admin());

create policy "properties_insert_active_owner_or_admin"
on public.properties
for insert
to authenticated
with check (
  (
    owner_id = (select auth.uid())
    and public.has_active_access(auth.uid())
  )
  or public.is_super_admin()
);

create policy "properties_update_active_owner_or_admin"
on public.properties
for update
to authenticated
using (owner_id = (select auth.uid()) or public.is_super_admin())
with check (
  (
    owner_id = (select auth.uid())
    and public.has_active_access(auth.uid())
  )
  or public.is_super_admin()
);

create policy "properties_delete_active_owner_or_admin"
on public.properties
for delete
to authenticated
using (
  (
    owner_id = (select auth.uid())
    and public.has_active_access(auth.uid())
  )
  or public.is_super_admin()
);

create policy "payments_select_own_or_admin"
on public.payment_records
for select
to authenticated
using (user_id = (select auth.uid()) or public.is_super_admin());

create policy "payments_admin_all"
on public.payment_records
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

create policy "feedback_select_property_owner_or_admin"
on public.feedback
for select
to authenticated
using (
  public.owns_property(property_id)
  or public.is_super_admin()
);

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.properties from anon, authenticated;
revoke all on table public.payment_records from anon, authenticated;
revoke all on table public.feedback from anon, authenticated;

grant select, update on table public.profiles to authenticated;
grant select, insert, update, delete on table public.properties to authenticated;
grant select, insert, update, delete on table public.payment_records to authenticated;
grant select on table public.feedback to authenticated;

revoke all on function public.is_super_admin() from public;
revoke all on function public.has_active_access(uuid) from public;
revoke all on function public.owns_property(uuid) from public;
revoke all on function public.get_public_guide(uuid) from public;
revoke all on function public.register_manual_payment_and_renew(
  uuid,
  integer,
  text,
  text,
  integer
) from public;

grant execute on function public.is_super_admin() to authenticated;
grant execute on function public.has_active_access(uuid) to authenticated;
grant execute on function public.owns_property(uuid) to authenticated;
grant execute on function public.get_public_guide(uuid) to anon, authenticated;
grant execute on function public.register_manual_payment_and_renew(
  uuid,
  integer,
  text,
  text,
  integer
) to authenticated;
