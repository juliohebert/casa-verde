insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'host-assets',
  'host-assets',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "host_assets_public_read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'host-assets');

create policy "host_assets_insert_own_prefix"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'host-assets'
  and (
    (
      (storage.foldername(name))[1] = (select auth.uid())::text
      and public.has_active_access(auth.uid())
    )
    or public.is_super_admin()
  )
);

create policy "host_assets_update_own_prefix"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'host-assets'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or public.is_super_admin()
  )
)
with check (
  bucket_id = 'host-assets'
  and (
    (
      (storage.foldername(name))[1] = (select auth.uid())::text
      and public.has_active_access(auth.uid())
    )
    or public.is_super_admin()
  )
);

create policy "host_assets_delete_own_prefix"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'host-assets'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or public.is_super_admin()
  )
);
