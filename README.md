# waisi.org

Official website for the [Wisconsin AI Safety Initiative](https://waisi.org) (WAISI) at UW–Madison. Deployed to Netlify from this repo — every push to `main` triggers a production deploy.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + React + TypeScript
- Tailwind CSS (design tokens documented in [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md))
- Google Sheets + Google Calendar as the content backend for team, research, and events

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in real values — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without credentials the site still runs; the team/research/events pages show a "couldn't load" message instead of data.

## Credentials (required for team / research / events)

The site reads two env vars (see `.env.example`):

- `GOOGLE_CLIENT_EMAIL` — the service account's email
- `GOOGLE_PRIVATE_KEY` — its private key (literal `\n` sequences are fine)

They belong to a **Google Cloud service account** (`google-apis@waisi-org.iam.gserviceaccount.com`, project `waisi-org`) that has read-only access to the content spreadsheet and the WAISI group calendar. In production they are set as Netlify environment variables (Site configuration → Environment variables).

**Never commit credentials.** A service-account key was committed here in 2023; Google detected it in the public repo, disabled it, and the site's dynamic pages silently broke for weeks. `src/credentials.json` is gitignored for that reason. If a key is ever exposed again: GCP console → IAM & Admin → Service Accounts → Keys → create a new key, delete the old one, update Netlify, redeploy.

If the GCP project is ever lost to officer turnover: create a new project + service account under a club-controlled Google account, enable the Sheets and Calendar APIs, share the spreadsheet and calendar with the new service account's email, and update the env vars. No code changes needed.

## Where content lives

| Content | Source | Updates live |
|---|---|---|
| Team members | Google Sheet `1OGoGF4Gn...` (tab 1, `A:F`) | within 1 hour (ISR) |
| Research catalog | same sheet, `Research!A:F` | within 1 hour (ISR) |
| Events | WAISI group Google Calendar | within 15 minutes (ISR) |
| Programs, links, handbooks | `src/constants.ts` and page components | on deploy |

The data-backed pages are statically rendered with incremental static regeneration (`export const revalidate` in each page), so sheet/calendar edits appear without a redeploy. If a background refresh fails (Google outage, bad credentials), the page shows a visible "couldn't load" message rather than silently rendering empty — if you see that message in production, check the Netlify function logs and the credentials first.

## Project layout

```
src/
  app/            pages (App Router); team/, research/, events/ fetch from Google
  components/     shared components
  lib/google.ts   service-account auth helper (env vars → JWT client)
  constants.ts    static links (Discord, forms, handbooks)
  types.ts        shared types
public/           images and static assets
```

## Deploying

Push to `main` → Netlify builds (`npm run build`) and deploys. There is no staging environment; use `npm run build` locally to catch errors before pushing. The build prerenders all pages, so it needs the Google env vars to bake in initial data (it succeeds without them, but ships error states).
