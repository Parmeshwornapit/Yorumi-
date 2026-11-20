# Yorumi — Vercel edition

A standard Next.js 16 / React 19 / TypeScript edition of Yorumi, prepared for a private GitHub repository and Vercel hosting at **yorumi.parmeshwornapit.com.np**.

The site is deployed from `Parmeshwornapit/Yorumi-` on Vercel at https://yorumi.parmeshwornapit.com.np, with its existing Supabase project.

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

## Sign-in repair — October 8, 2026

The Vercel integration supplied `POSTGRES_URL`, while the original application only read `DATABASE_URL`. The missing schema and database connection prevented the profile bootstrap from completing, which made a valid authenticated session look signed out.

The application and migration runner now accept `DATABASE_URL`, `POSTGRES_URL`, and `POSTGRES_PRISMA_URL`. Authentication accepts publishable and legacy anon-key names, and the sign-in page receives its public configuration from the server. Server secret keys are excluded from this public configuration. The session endpoint verifies a signed-in user independently of database availability; the interface shows an unavailable profile without claiming that the user is signed out.

The production schema was initialized with row-level security and its migration checksum recorded. Supabase's site URL now uses the custom production domain, with an allowed callback at that domain. The sign-in form supports requesting a fresh email-confirmation link when needed.

Regression checks: healthy bootstrap, verified identity surviving a data failure, anonymous behavior, failed identity verification, and integration-key/secret isolation. Run with `node --test tests/auth-bootstrap.test.mjs`.

## Build and database migrations

The website build compiles with next build. Run npm run db:migrate explicitly when applying schema changes, using an authorized database connection. A database outage must not prevent static stories from building; account and shared-room features still require a working Supabase/PostgreSQL deployment.


## Illustrated webtoons and daily AI publishing

The public reader is `/manga`; `/stories` opens the same illustrated reader. The prose stories remain at `/stories/prose`. Finished illustrated chapters and accessible transcripts are listed in `public/manga/archive.json`. Artwork uses actual generated PNGs; incomplete image requests never enter the archive.

Daily generation is implemented by `.github/workflows/daily-manga.yml`, targeting 07:00 Nepal time (01:15 UTC). GitHub may delay scheduled runs. The workflow is intentionally gated until configured:

1. Add `OPENAI_API_KEY` as a GitHub Actions repository secret. Use a dedicated OpenAI project and set its usage/budget controls in the provider dashboard. Never place a real key in source, a browser bundle, or chat.
2. Set repository Actions variable `DAILY_MANGA_ENABLED` to `true` when ready to activate. The workflow then makes one text request and one image request per run, skips already-completed Nepal dates, and publishes only complete episodes. There are no automatic API retries. A manually repeated failed run can incur another request charge.
3. Run **Daily original manga** from GitHub Actions to test, then allow the schedule to run. The workflow commits completed chapters to main, which triggers the existing Vercel deployment. Failures are reported in Actions; the last published archive stays available. Set the variable to `false` to stop generation.

Quality-first defaults requested by the owner: text model `gpt-6.2-astra` with high reasoning and a bounded 10,000-token output; image model `gpt-image-2.5-sunburst` at high quality. `OPENAI_STORY_MODEL` and `OPENAI_IMAGE_MODEL` can be set in the execution environment to change supported models. The API uses structured story output, six panel descriptions, and one illustrated comic strip. Generated output is marked as AI-generated; lettering and character consistency may occasionally need editorial review. This is a daily automated original mini-episode generator, not an unrestricted visitor chat interface. It does not need the app database.

Verification: `node scripts/check-daily-manga.mjs` tests the Nepal date rollover, story validation, six-panel requirement, and image-prompt construction without making paid requests.

First chapter art: `public/manga/cartographer-episode-01.png`, generated with the built-in image generation tool. Prompt brief: a seven-panel original full-color vertical webtoon following Ika, an adult courier with a short black bob, orange rain jacket and teal bicycle; a bridge disappears on a rainy neon riverfront, a talking parcel contains a tiny glowing streetlamp and blue doorway, and she rides a luminous bridge toward it. Modern crisp manhwa linework, consistent character design, legible English speech bubbles, single-column panel order, generous gutters, and original characters.
