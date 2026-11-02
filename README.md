# waisi.org

Official website for the [Wisconsin AI Safety Initiative](https://waisi.org) (WAISI) at UW–Madison. Deployed to Netlify from this repo — every push to `main` triggers a production deploy.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + React + TypeScript
- Tailwind CSS (design tokens documented in [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md))
- Google Sheets for team and research; a published Google Sheets CSV for events
- Fillout for fellowship applications

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in real values — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without credentials the site still runs; the team and research pages show a "couldn't load" message instead of data. Events use a public CSV and do not need credentials.

## Credentials (required for team / research)

The site reads two env vars (see `.env.example`):

- `GOOGLE_CLIENT_EMAIL` — the service account's email
- `GOOGLE_PRIVATE_KEY` — its private key (literal `\n` sequences are fine)

They belong to a **Google Cloud service account** (`google-apis@waisi-org.iam.gserviceaccount.com`, project `waisi-org`) that has read-only access to the content spreadsheet. In production they are set as Netlify environment variables (Site configuration → Environment variables).

**Never commit credentials.** A service-account key was committed here in 2023; Google detected it in the public repo, disabled it, and the site's dynamic pages silently broke for weeks. `src/credentials.json` is gitignored for that reason. If a key is ever exposed again: GCP console → IAM & Admin → Service Accounts → Keys → create a new key, delete the old one, update Netlify, redeploy.

If the GCP project is ever lost to officer turnover: create a new project + service account under a club-controlled Google account, enable the Sheets API, share the spreadsheet with the new service account's email, and update the env vars. No code changes needed.

## Where content lives

| Content | Source | Updates live |
|---|---|---|
| Team members | Google Sheet `1OGoGF4Gn...` (tab 1, `A:F`) | eligible for refresh after 1 hour |
| Research catalog | same sheet, `Research!A:F` | eligible for refresh after 1 hour |
| Events | Published calendar CSV at `EVENTS_CALENDAR_CSV_URL` | eligible for refresh after 5 minutes |
| Programs, links, handbooks | `src/content/`, `src/constants.ts`, and page components | on deploy |

The data-backed pages use incremental static regeneration (`export const revalidate` in each page). A request after the refresh interval triggers a background refresh; a later request receives the updated page. These intervals are not a scheduled job or an exact publication deadline. Fetch failures produce a visible "couldn't load" message. Check the Netlify function logs, spreadsheet access, and credentials when this happens.

### Calendar dates

The first CSV row must contain a title such as `WAISI Calendar - Fall 2026`. The second row must contain `Date` and `Website Calendar` headers. The parser reads only those columns.

Yearless dates such as `Monday, September 7` use the title's year. Past events keep their original year and leave the upcoming list. For a calendar that spans years, use explicit dates such as `December 31, 2026` and `2027-01-08`. A title with no year or multiple years requires explicit years on event dates. Invalid structure or ambiguous years produces the error message; invalid individual dates are skipped with a log warning. The day boundary uses `America/Chicago`, including daylight saving time.

Event cells use the existing positional format: `{"Title", "Description", "1800-1900", "Location", "PIN"}`. The last fields can be empty.

### Spreadsheet rows and photographs

`src/lib/sheetRows.ts` skips blank rows and validates other rows before rendering. Members require a name, role, and team code (`0` operations, `1` technical, `2` policy, `3` research). Research requires a member author, title, and HTTP(S) paper URL. Missing author lists fall back to the member author; other optional text fields default to empty strings. Invalid non-empty rows produce a log warning with their row number.

Member photographs use `/public/leaders/<lowercase_name_with_underscores>.webp`. A missing photograph displays the member's initials. Add the real photograph to replace that fallback.

### Applications

`APPLICATION_CYCLE` in `src/constants.ts` controls fellowship status, the optional deadline, the Fillout form ID, and interest links. Fellowship applications are currently closed. Set `status` to `"closed"` to change fellowship links to the interest form; `/apply` also hides the application form. Set `status` to `"open"` for the next application cycle and update the deadline as needed. `PROJECTS_RFP` separately controls the Scholars' Projects proposal links and floating banner.

## Project layout

```
src/
  app/            pages (App Router); team/, research/, events/ fetch from Google
  components/     shared components
  lib/google.ts   service-account auth helper (env vars → JWT client)
  lib/sheetRows.ts validates team and research rows
  lib/calendarEvents.ts parses the public event calendar
  content/        static program, research, and team content
  constants.ts    static links (Discord, forms, handbooks)
  types.ts        shared types
public/           images and static assets
tests/            regression tests for data and application controls
```

## Deploying

Push to `main` → Netlify builds (`npm run build`) and deploys. There is no staging environment; use `npm run build` locally to catch errors before pushing. The build prerenders all pages, so it needs the Google env vars to bake in initial data (it succeeds without them, but ships error states).

## Checks

Use `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build` before deployment. The tests use Node's test runner with `tsx` and need no credentials or network. The build needs network access for Google Fonts and initial content. GitHub Actions runs the tests, lint, and type checks without production credentials.
