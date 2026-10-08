# Yorumi — Vercel edition

A standard Next.js 16 / React 19 / TypeScript edition of Yorumi, prepared for a private GitHub repository and Vercel hosting at **yorumi.parmeshwornapit.com.np**.

This source is prepared and locally validated. A GitHub repository, Vercel project, Supabase project, and DNS record have not yet been created by this migration.

## Included

Original cinematic artwork, a 24-story fictional anime catalogue, discovery filters, persistent anime lists/reviews, profiles, onboarding, posts/polls/comments, communities, private groups, watch rooms/invites, collections, ideas, themes, daily trivia/XP, Memory Garden, notifications, and an initial moderation desk.

The original first-release limitations still apply: fictional catalogue, six-second chat/playback updates, a bounded bootstrap query, and no streaming-service integration, Google/Discord OAuth, voice rooms, anonymous identity mode, or full moderation suite.

## Hosting architecture

- **Vercel:** normal Next.js Node.js route handlers, with no Sites or Cloudflare runtime bindings.
- **Supabase Auth:** email/password signup and sign-in, confirmation callbacks, password reset, and refreshed cookie sessions. Server identity is validated with the auth provider; caller-supplied user headers are ignored.
- **PostgreSQL:** parameterized server queries, small connection pool, atomic multi-statement writes, and versioned SQL migrations. Direct browser-role table access is revoked and row-level security is enabled.
- **Supabase Storage:** a private `yorumi-media` bucket. The application checks ownership/record visibility before serving an image.
- **Administration:** only a verified email matching `ADMIN_EMAIL` can initialize an admin profile. The first public visitor is never automatically made an administrator.

The migration prepares the application and schema; it does not copy existing Sites production records or user identities. Such a transfer requires an explicit account mapping and a separate private data migration. Do not put user records or secrets into GitHub.

## Configure Supabase

1. Sign in to Supabase or create an account yourself, and create a free project named **Yorumi**. Choose a suitable nearby region, such as Mumbai if offered.
2. In its Connect dialog, obtain the project URL, publishable API key, and PostgreSQL **transaction pooler** connection string. Use the pooler for Vercel's serverless connections.
3. Obtain the server-side service-role/secret API key for private storage. It must never have a `NEXT_PUBLIC_` prefix or be placed in client code.
4. Add the values from `.env.example` to Vercel's encrypted project environment settings. Use `ADMIN_EMAIL` for the verified email of the site administrator. Set `NEXT_PUBLIC_SITE_URL` to `https://yorumi.parmeshwornapit.com.np`.
5. In Supabase Auth URL settings, set the site URL to that address, and permit `https://yorumi.parmeshwornapit.com.np/auth/callback`. During initial testing, also allow the actual Vercel deployment origin and `http://localhost:3000/auth/callback` if local auth testing is needed.
6. Keep email confirmation enabled. Review signup/password-reset email delivery before opening the site broadly.

The build applies pending PostgreSQL migrations with an advisory lock and checksum journal. It also creates the private image bucket, if storage credentials are configured. It refuses to use a public media bucket. Without a database connection, compilation can complete, but saved-data features remain unavailable; that is not a completed functional deployment.

## GitHub and Vercel

1. Create a new **private** repository, normally `yorumi`, in the selected GitHub account. Push this directory's `main` branch. `.env.local`, `.vercel`, dependency folders, and generated build output are ignored.
2. Import that repository into Vercel as a Next.js project. Repository root: this directory. Install: `npm ci`. Build: `npm run build`.
3. Configure the Supabase environment values before the functional production deployment. Keep production and preview database credentials separate.
4. Confirm successful build, server operation, signup/confirmation, a saved anime list, and an authorized image upload.
5. Add `yorumi.parmeshwornapit.com.np` in the project's Domains settings. Vercel will show the exact DNS record for this project.
6. The domain currently uses `ns100.nepaldns.com` and `ns101.nepaldns.com`; add Vercel's supplied record in that DNS manager. Do not change the domain's entire nameserver delegation or unrelated records.
7. Wait for Vercel domain verification and HTTPS issuance, then verify the live subdomain.

## Local commands

```sh
npm ci
# Supply real values in an ignored .env.local file.
npm run db:migrate
npm run dev
npm run typecheck
npm run build
```

Credentials are intentionally absent from the repository. PostgreSQL connections require verified TLS. `DATABASE_CA_CERT` can hold the provider's CA certificate when needed; no certificate verification bypass is used.

## Validation completed

- TypeScript and optimized Next.js build pass.
- PostgreSQL schema applies, with direct browser table access revoked.
- All 40 application SQL statements compile on PostgreSQL.
- Account provisioning is idempotent.
- Database-backed rate increments work.
- Duplicate daily reward transactions roll back, keeping XP at one award.
- Placeholder conversion preserves quoted question marks and bound parameters.

Hosted Supabase signup/email delivery, remote database access, private uploads, GitHub publication, Vercel deployment, and domain routing still require the account connections and production environment setup.
