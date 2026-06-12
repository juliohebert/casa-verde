# Supabase local

The local stack is the source of truth for database development.

## Commands

```bash
npm run db:start
npm run db:reset
npm run db:lint
npm run db:test
npm run db:types
npm run db:stop
```

`db:reset` recreates the local database, applies every migration, and loads
`seed.sql`.

The placeholder token in `db:types` is not a credential. Supabase CLI 2.106.0
checks for an access token before local introspection, so the script supplies a
local-only placeholder while `--local` keeps the operation on Docker.

Supabase Studio is available at <http://127.0.0.1:54323> while the stack is
running.

## Demo accounts

These accounts exist only in the local seed:

| Role | Email | Password |
| --- | --- | --- |
| Host | `host@casaverde.local` | `HostDemo123` |
| Super admin | `admin@casaverde.local` | `AdminDemo123` |

Never reuse these credentials in a hosted environment.

## Migration rules

- Never change the remote schema without a migration.
- Keep secrets and real guest data out of the seed.
- Run `npm run db:reset` and `npm run db:test` before merging schema changes.
- Regenerate `lib/types/database.ts` whenever the schema changes.
