# Coffee chats: deployment and operations

## Current state

The app is integrated at `/coffee-chats`. Production launch is disabled. Deploy previews use `COFFEE_CHAT_ENV=preview` and show current public availability; Google connection stays disabled unless the configured origin matches the preview origin.

Live anonymous checks passed for all six event types on Calendly and Cal.com (five leaders). Eight Google appointment links remain unsupported. They appear as direct links, never as available blocks. There is no snapshot fallback. Public Google page inspection was blocked by automatic approval review, including after the user approved the public page. No signed-in calendar data was inspected.

## Configuration

Use Node.js 22. Set these variables in Netlify with both build and function access:

| Variable | Production value |
| --- | --- |
| `COFFEE_CHAT_ENABLED` | `false` until all launch checks pass |
| `COFFEE_CHAT_ENV` | `production`; override to `preview` for Deploy Previews |
| `COFFEE_CHAT_PUBLIC_ORIGIN` | `https://waisi.org` |
| `COFFEE_CHAT_STORE` | `netlify` |
| `GOOGLE_CALENDAR_CLIENT_ID` | Public Google web client ID, never a client secret |
| `COFFEE_CHAT_GOOGLE_READY` | `false` until the Google checks below pass |
| `NODE_VERSION` | `22` |

These values were added to the existing WAISI Netlify project. Existing service-account credentials were not changed. Netlify applies updated variables to subsequent deploys.

The public config endpoint exposes only the client ID, privacy URL, and setup status. The client ID is not a secret. Keep all tokens, service-account keys, and OAuth client secrets out of the repository.

## Google production setup

Use the existing `waisi-org` Google Cloud project. The local token flow already uses the public client ending in `nkfgqaft.apps.googleusercontent.com`. The user approved keeping the existing web client for the production and local origins.

1. Enable the Google Calendar API in the project.
2. Set the application name to `WAISI Coffee Chats` in Google Auth Platform → Branding.
3. Set the home page to `https://waisi.org/coffee-chats`.
4. Set the privacy URL to `https://waisi.org/coffee-chats/privacy`.
5. Use a WAISI-controlled support email and developer contact.
6. Add and verify the authorized domain `waisi.org`.
7. For the web client, add the exact JavaScript origin `https://waisi.org`. Add `https://www.waisi.org` only if it serves the app without redirecting to the canonical origin.
8. Declare only `https://www.googleapis.com/auth/calendar.freebusy` for this feature. This popup token flow needs no redirect URI or client secret in the app.
9. Configure the audience for external fellows. Complete any branding or scope verification Google requires before general release. Publish the app only after those checks pass.
10. Check sign-in, consent denial, popup closure, Refresh, expiry, Disconnect, and reconnection on the deployed origin, including a fellow account outside the test-user list.
11. Set `COFFEE_CHAT_GOOGLE_READY=true` only after these checks pass.

The user approved adding `https://waisi.org` and `http://localhost:4180` to the existing web client. The save is part of this setup session. Google says origin changes can take five minutes to several hours. The earlier live Google check used port 4173; it does not prove that the new origin or iframe works.

Privacy behavior: request only primary-calendar busy periods; keep the token and periods in page memory; send neither to WAISI. Disconnect clears local memory and requests revocation. Do not add personal calendar details to logs, analytics, or error reports.

References: [Google web setup](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid), [Google token model](https://developers.google.com/identity/oauth2/web/guides/use-token-model).

## Sources and refresh

`src/lib/coffee-chats/roster.json` contains the reviewed roster. `sources.json` contains public booking links and format metadata. It contains no saved slots. Changes require a reviewed deploy; automatic roster maintenance is outside this change.

Cal.com uses its public v2 slots endpoint. Calendly uses the public booking-page endpoints, which have no stability guarantee. Each reader validates its response and URL. A malformed response, provider error, or unsupported source removes that source's blocks. Successful sources can still appear. Time and format metadata must remain accurate when leaders change their booking pages.

The availability route accepts at most ten days, from two days before today through sixty-two days ahead. Browser requests include a one-day timezone buffer. A five-minute cache uses a deployment-specific Netlify Blobs store. Previews cannot supply cache entries or heartbeats to production. The browser polls and discards old-week responses, expired data, and failed refreshes. Final booking and conflict prevention remain with the provider.

A scheduled Netlify function refreshes the current range every five minutes. Scheduled functions run only on published deploys. The function writes a separate heartbeat with no appointment slots. The health route returns 503 if setup is incomplete, sources fail, or the heartbeat is older than ten minutes. The heartbeat grace period avoids alerts during normal schedule jitter; it does not extend slot expiry.

References: [Netlify schedules](https://docs.netlify.com/build/functions/scheduled-functions/), [Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/).

## Checks and alert delivery

Run `npm test` and `npm run build` before release. `npm run coffee:preflight` intentionally fails while Google leader sources or production setup remain unresolved. When `COFFEE_CHAT_ENABLED=true`, the normal build enforces preflight.

The pull-request workflow runs tests and the production build. The health workflow checks `https://waisi.org/api/coffee-chats/health` approximately every fifteen minutes, after the repository variable `COFFEE_CHAT_MONITOR_ENABLED=true` enables it. GitHub schedules can run late. A failed check creates a failed workflow run; it does not send a custom email or Slack message.

Before launch, name an operations owner. That owner must enable GitHub Actions failure notifications, run the monitor manually against an intentionally failed check, and confirm receipt. Alert delivery is not complete until that test succeeds. No recipient or subscription has been configured by this change. Client errors show a recovery message; this change does not add browser error telemetry.

Netlify function logs contain source IDs and short error codes. Do not log raw provider responses, OAuth tokens, or private busy periods. `provider_blocked`, `rate_limited`, and `provider_schema` require provider inspection. `coffee_cache_unavailable` requires a check of Netlify Blobs and runtime configuration.

## Release and rollback

1. Keep production disabled while the draft change receives review.
2. Verify the deploy preview's layout, filters, date navigation, source failure behavior, and cache writes.
3. Resolve all eight Google sources with a permitted public-only integration, or obtain an explicit decision to launch with direct links for those leaders. The current preflight deliberately blocks either accidental omission or an incomplete launch.
4. Complete the Google production checks above.
5. Confirm the monitor owner and notification test.
6. Merge the reviewed change, then enable `COFFEE_CHAT_ENABLED=true` and redeploy.
7. Verify the scheduled function, health response, and full calendar flow on `https://waisi.org/coffee-chats` before sharing the link.

To disable the feature, set `COFFEE_CHAT_ENABLED=false`, leave `COFFEE_CHAT_ENV=production`, and redeploy. The main route returns 404 and the availability, roster, and config APIs return 503. The privacy page remains available. Disable the repository monitor variable to stop alerts during planned downtime.

For a broken deployment, republish the previous successful Netlify deploy. Do not remove the site's existing service-account variables. Cache entries expire naturally; personal tokens never enter that cache.

## Verification record

The Node suite has 40 passing tests. A fresh review found and resolved an OAuth callback race and shared cache entries between preview and production. The integrated desktop page has no outer overflow. Browser checks passed for leader multi-select, time selection and keyboard deselection, automatic leader-panel collapse, and phone day navigation at 390 × 844 pixels. Both the parent and embedded page fit the phone width. The production build passes without local service-account credentials; unrelated data pages show their documented credential error states locally. Production retains its existing credentials.

Google Cloud inspection confirmed an External audience in Testing, two test users, an empty privacy URL, and `waisi.org` as an authorized domain. Publication is unavailable until branding is complete. Keep the existing project-wide app name and contacts unless the WAISI owner requests a change. The privacy URL must be live before it is submitted for review.

The Netlify preview deployed successfully. Its six supported source checks returned current availability, and a repeated request reused the persistent cache. The preview correctly withheld the Google client ID because its origin differs from `https://waisi.org`. Both approved Google origins were saved successfully. An embedded local OAuth attempt did not complete in the in-app browser, so that flow still needs a successful end-to-end check.

Netlify serves public assets before Next.js. The static embed therefore also defines its security headers in `netlify.toml`; keep those values aligned with `next.config.ts`. Verify both the embed's content-security policy and the parent page's popup policy after deployment.
