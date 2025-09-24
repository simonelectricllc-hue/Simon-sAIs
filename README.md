
# TradesPro – Live Starter
Website + simple admin + AI search. Answers are temporarily locked so only someone with `ADMIN_TOKEN` can post via API until real logins/roles are added.

## Accounts you need
1) Vercel.com (host site) – free.
2) Supabase.com or Neon.tech (Postgres DB) – free tier ok.
3) OpenAI (API key) – pay-as-you-go.

## Step 1 — Create the database
- Create a new Postgres DB (Supabase/Neon).
- Open SQL editor and paste/run: `scripts/migrate.sql`.

## Step 2 — Put the code online
- Make a GitHub repo and upload all files in this folder.
- In Vercel: New Project → Import from GitHub → select repo.

## Step 3 — Set environment variables in Vercel
- `DATABASE_URL` = copy from your DB (looks like postgres://USER:PASSWORD@HOST:5432/DB)
- `OPENAI_API_KEY` = from OpenAI
- `ADMIN_TOKEN` = make a long random string (you will paste it in /admin later)
- (optional) `NEXT_PUBLIC_APP_URL` = your Vercel URL

Deploy. Vercel builds and gives you a live URL.

## Step 4 — Use it
- Visit `/verify` to submit a test license (any info is fine for now).
- Visit `/admin`, paste your `ADMIN_TOKEN`, click **Use Token**, then **Refresh**.
- Approve the pending license(s).

## Step 5 — Try AI search
- Visit `/ask` and create a test question.
- (To add answers right now, use a tool like Postman or a tiny admin-only script to call `/api/answers` with header `x-admin-token: YOUR_TOKEN`.)

## Next Up (I plan these after you go live)
- Add email login + real roles (homeowner vs verified pro vs admin).
- Allow only verified pros (role='pro') to post answers in the UI.
- Add IndexNow pings for Bing when Q&A is created/updated.
- Add QAPage schema + XML sitemaps for SEO.
