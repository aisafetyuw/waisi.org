# Coffee chats: deployment and operations

## Current state

The app is integrated at `/coffee-chats`. PR #3 merged as `ab1805b9bc637c70f53fd9b1b63891eb3ed953e2` and Netlify published it. The calendar remains disabled in production. The public `/coffee-chats/about` and `/coffee-chats/privacy` pages return 200. Deploy previews use `COFFEE_CHAT_ENV=preview` and show current public availability; Google connection stays disabled unless the configured origin matches the preview origin.

Live anonymous checks now pass for all eight Google appointment links, in addition to the six event types on Calendly and Cal.com. Google leaders can appear as calendar blocks. There is no snapshot fallback. The Google reader uses anonymous HTTP requests to public pages and their read-only appointment service. It does not use browser sessions, cookies, account tokens, or private calendar data.

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
2. Keep the existing project-wide application name `waisi.org` in Google Auth Platform → Branding.
3. Set the home page to `https://waisi.org/coffee-chats/about`. This public page describes the feature and links to its privacy policy while the calendar remains gated.
4. Set the privacy URL to `https://waisi.org/coffee-chats/privacy`.
5. Use a WAISI-controlled support email and developer contact.
6. Add and verify the authorized domain `waisi.org`.
7. For the web client, add the exact JavaScript origin `https://waisi.org`. Add `https://www.waisi.org` only if it serves the app without redirecting to the canonical origin.
8. Declare only `https://www.googleapis.com/auth/calendar.freebusy` for this feature. This popup token flow needs no redirect URI or client secret in the app.
9. Configure the audience for external fellows. The owner approved consent publication, and Google now reports In production. Complete the separate branding check before general release.
10. Check sign-in, consent denial, popup closure, Refresh, expiry, Disconnect, and reconnection on the deployed origin, including a fellow account outside the test-user list.
11. Set `COFFEE_CHAT_GOOGLE_READY=true` only after these checks pass.

The user approved adding `https://waisi.org` and `http://localhost:4180` to the existing web client. Both origins were saved. The user subsequently confirmed that the integrated page on port 4180 connects and shows free times in Chrome or Safari. This local check does not verify the production origin.

Privacy behavior: request only primary-calendar busy periods; keep the token and periods in page memory; send neither to WAISI. Disconnect clears local memory and requests revocation. Do not add personal calendar details to logs, analytics, or error reports.

References: [Google web setup](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid), [Google token model](https://developers.google.com/identity/oauth2/web/guides/use-token-model).

## Sources and refresh

`src/lib/coffee-chats/roster.json` contains the reviewed roster. `sources.json` contains public booking links and format metadata. It contains no saved slots. Changes require a reviewed deploy; automatic roster maintenance is outside this change.

Cal.com uses its public v2 slots endpoint. Calendly uses its public booking-page endpoints. Google resolves the public appointment link, reads the page’s published configuration as JSON, and calls only `AppointmentBookingService/ListAvailableSlots`. The Google request uses the page’s public application key and its actual page URL as Referer. It sends no account credentials. These public page interfaces have no stability guarantee. Each reader validates its response and URL. A malformed response, provider error, or unsupported source removes that source's blocks. Successful sources can still appear. Time and format metadata must remain accurate when leaders change their booking pages.

The availability route accepts at most ten days, from two days before today through sixty-two days ahead. Browser requests include a one-day timezone buffer. A five-minute cache uses a deployment-specific Netlify Blobs store. Previews cannot supply cache entries or heartbeats to production. The browser polls and discards old-week responses, expired data, and failed refreshes. Final booking and conflict prevention remain with the provider.

The Google reader allows only the two observed public appointment path formats on `calendar.google.com` and short links on `calendar.app.google`. It validates every redirect and allows no other request destination besides the fixed slot service. One eight-second deadline covers the page and all slot requests. Pagination stops at ten pages of 200 slots; loops, malformed responses, and later-page failures reject the entire source. Slots retain their absolute timestamps and current meeting durations. The public application key never enters the feed, cache, or logs. If Google changes this unpublished protocol, investigate `invalid_response` and update the reader before restoring that source. Do not use account cookies as a fallback.

A scheduled Netlify function refreshes the current range every five minutes. Scheduled functions run only on published deploys. The function writes a separate heartbeat with no appointment slots. The health route returns 503 if setup is incomplete, sources fail, or the heartbeat is older than ten minutes. The heartbeat grace period avoids alerts during normal schedule jitter; it does not extend slot expiry.

References: [Netlify schedules](https://docs.netlify.com/build/functions/scheduled-functions/), [Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/).

## Checks and alert delivery

Run `npm test` and `npm run build` before release. `npm run coffee:preflight` intentionally fails while production setup remains unresolved or the roster contains an unsupported provider. When `COFFEE_CHAT_ENABLED=true`, the normal build enforces preflight.

The pull-request workflow runs tests and the production build. The health workflow checks `https://waisi.org/api/coffee-chats/health` approximately every fifteen minutes, after the repository variable `COFFEE_CHAT_MONITOR_ENABLED=true` enables it. GitHub schedules can run late. A failed check creates a failed workflow run; it does not send a custom email or Slack message.

The operations owner is Kaustubh Kislay (`kaustubh.kislay@gmail.com`), as selected by the user. GitHub Actions email notifications already use failed-workflows-only delivery to that address, with no custom routing override. The user authorized one intentional failure. [Run 39900985612](https://github.com/aisafetyuw/waisi.org/actions/runs/39900985612) failed in its notification-test step and skipped the production request. Its matching email reached the owner's Gmail inbox at 2026-10-23 04:34:17 UTC. Alert delivery is verified. Scheduled monitoring remains disabled until the calendar launches. Client errors show a recovery message; this change does not add browser error telemetry.

Manual runs work while scheduled monitoring remains disabled. Select `notification_test=true` to create one clearly labeled failure without contacting production. Use it only after the alert owner authorizes the test. Keep `COFFEE_CHAT_MONITOR_ENABLED` disabled until launch; manual test success means confirmed notification delivery, not a healthy production calendar.

Netlify function logs contain source IDs and short error codes. Do not log raw provider responses, OAuth tokens, or private busy periods. `provider_blocked`, `rate_limited`, and `provider_schema` require provider inspection. `coffee_cache_unavailable` requires a check of Netlify Blobs and runtime configuration.

## Release and rollback

1. Keep production disabled while the draft change receives review.
2. Verify the deploy preview's layout, filters, date navigation, source failure behavior, and cache writes.
3. Confirm that all 14 source checks succeed on the deploy preview. The public Google reader now supports all eight Google leaders. Preflight rejects unknown provider names; runtime health rejects failed source checks.
4. Complete the Google production checks above.
5. Confirm the monitor owner and notification test.
6. Merge the reviewed change, then enable `COFFEE_CHAT_ENABLED=true` and redeploy.
7. Verify the scheduled function, health response, and full calendar flow on `https://waisi.org/coffee-chats` before sharing the link.

To disable the feature, set `COFFEE_CHAT_ENABLED=false`, leave `COFFEE_CHAT_ENV=production`, and redeploy. The main route returns 404 and the availability, roster, and config APIs return 503. The privacy page remains available. Disable the repository monitor variable to stop alerts during planned downtime.

For a broken deployment, republish the previous successful Netlify deploy. Do not remove the site's existing service-account variables. Cache entries expire naturally; personal tokens never enter that cache.

## Verification record

The Node suite has 58 passing tests. A fresh review found and resolved an OAuth callback race and shared cache entries between preview and production. The integrated desktop page has no outer overflow. Browser checks passed for leader multi-select, time selection and keyboard deselection, automatic leader-panel collapse, and phone day navigation at 390 × 844 pixels. Both the parent and embedded page fit the phone width. The production build passes without local service-account credentials; unrelated data pages show their documented credential error states locally. Production retains its existing credentials.

Google Cloud now reports an External audience with publishing status **In production**, after explicit user approval. The home page is `https://waisi.org/coffee-chats/about` and the privacy URL is `https://waisi.org/coffee-chats/privacy`; both are live and saved in Branding. The existing app name `waisi.org`, support email, developer contacts, and authorized domain remain unchanged. Data Access lists only `calendar.freebusy` as non-sensitive. Verification Center explicitly says data-access verification is not required. Brand verification failed because the home page was not registered to the WAISI account.

The user explicitly approved publishing Google's verification file and claiming `https://waisi.org/` for `aisafetyuw@gmail.com`. PR #4 merged as `214cf79d199f0a77676359d9e31c33dfab032805`. The public file `/google05f367d4eacc68ca.html` returned 200 and matched Google's downloaded file byte-for-byte. Search Console confirmed **Ownership verified** via HTML file at approximately 2026-10-23 04:46 UTC, then opened the WAISI property under the WAISI account. Keep the file in place. Google instructed us to wait 24 hours after ownership verification before retrying branding; retry no earlier than 2026-10-24 04:46 UTC. Branding remains pending. No automatic retry was scheduled.

The Netlify preview deployed successfully. Its six supported source checks returned current availability, and a repeated request reused the persistent cache. The preview correctly withheld the Google client ID because its origin differs from `https://waisi.org`. Both approved Google origins were saved successfully.

A second test reproduced the missing Google popup in the in-app browser both inside the website frame and on the direct embedded page. No browser console error explained it. The user then tested `http://localhost:4180/coffee-chats` in Chrome or Safari and confirmed: "It connects and shows free times." This verifies the integrated local flow by user report. The deployed production origin and an account outside the former test-user list still need verification. Keep `COFFEE_CHAT_GOOGLE_READY=false` until the production flow checks pass.

After the production deployment, `/coffee-chats` returned 404 and `/api/coffee-chats/config` returned 503 as intended. The health endpoint returned 503 with `google_production_review_pending` and no scheduled heartbeat. The merged GitHub build and all 40 automated tests passed. Scheduled refresh and scheduled health checks still require verification after the calendar is enabled.

Selecting Eva and Arya reproduced a misleading "No matching times" message because the empty-day renderer ignored failed source checks. It now shows "Check booking pages" when none of the selected sources were checked, or "Some times unavailable" for partial coverage. A confirmed empty result appears only after every selected source succeeds. Seven regression tests cover failed/missing sources, multiple event types, and personal-calendar filtering. The integrated local browser check confirmed the corrected message with both leaders selected. This message correction does not implement Google appointment-page support.

Netlify serves public assets before Next.js. The static embed therefore also defines its security headers in `netlify.toml`; keep those values aligned with `next.config.ts`. Verify both the embed's content-security policy and the parent page's popup policy after deployment.

## Google public-page support verification

On 2026-10-23, the anonymous reader returned slots for Anaya, Arya, Celeste, Eva, Kaustubh, Lucy, Maanan, and Samuel. Every source passed for October 23–30 UTC and October 31–November 7 UTC. The latter range spans the Chicago daylight-saving change. Current-week counts were 37, 168, 169, 80, 111, 118, 89, and 50 respectively; these are observations, not saved availability. The reader returned each result in less than one second. Tests cover both public URL formats, strict redirect validation, JSON-only configuration, actual meeting durations, distinct daylight-saving instants, pagination, duplicate removal, response bounds, and failed-source behavior.

Google booking support and personal-calendar consent are separate integrations. This change leaves production disabled and keeps `COFFEE_CHAT_GOOGLE_READY=false`. Branding and production-origin sign-in checks remain pending.

The integrated local page showed live blocks for Arya, Eva, and Anaya. Multi-select combined Eva and Arya; selecting 9 am showed both correct booking links and collapsed the leader panel. Selecting the same block again restored the leader panel. Changing Chicago to New York moved the same two-leader block from 9 am to 10 am. The production build passed. Local data pages still reported their existing missing service-account credentials; no private credentials were required for this feature.

PR #6 preview (`https://deploy-preview-6--waisi.netlify.app/coffee-chats`) passed all 14 source checks at 2026-10-23 05:05 UTC. A ten-day request returned 1,446 slots in 3.5 seconds. Arya returned 256 and Celeste returned 245 slots, which exercised pagination beyond the 200-slot page size. A second request reused the persistent cache. The preview withheld the Google OAuth client ID as intended because its origin does not match production. Its browser showed Eva and Arya blocks and the correct two booking links for a selected 9 am slot.

A fresh independent review found no Critical, Important, or Minor code issues and independently passed all 58 tests. Deployed behavior required a separate preview check, which passed before merge. Consent branding and production-origin sign-in remain separate launch checks, so production stays disabled. The unrelated legacy GitHub Pages/Jekyll failure remains outside this change; Netlify and the coffee-chat workflow passed.
