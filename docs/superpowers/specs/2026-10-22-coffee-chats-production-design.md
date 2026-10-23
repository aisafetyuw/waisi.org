# Coffee chats production design

Implement the user's approved launch tasks 1–3 and 6. Anyone with the link can use the page. Read only leaders' public booking sources; never require leader credentials, create bookings, or infer bookable times from free/busy gaps. Keep the existing calendar design and interactions.

Use the existing Next.js/Netlify website. Serve the current calendar in a same-origin iframe at `/coffee-chats`, with a direct embed URL. The parent supplies its header. Server-side provider readers return normalized start times and full meeting durations. Cache public availability for five minutes and hide expired/failed data. Retain provider links for sources that cannot be checked. Do not ship the old saved availability snapshot.

Calendly's public booking endpoint and Cal.com's public slots endpoint have returned real times without authentication. Calendly's endpoint is undocumented and therefore needs schema checks and monitoring. Google public-page browser inspection is blocked by automatic approval review, including after explicit user approval. Its adapter must report unavailable until a safe, verified integration exists. Do not claim full provider coverage.

The fellow's Google busy periods and token stay in browser memory. Configure the public client ID by environment, separate development/production origins, add clear failures and a privacy page. Do not silently publish OAuth, grant permissions, invent contact addresses, or claim Google verification. Existing Google Cloud production status is unverified.

Add a health endpoint, a scheduled Netlify refresh, privacy-safe diagnostic codes, CI tests, deployment preflight, and a rollback runbook. Keep requests bounded, use an explicit source allowlist, reject malformed responses, and avoid logging response bodies or personal calendar data. Provider failure must never reuse old slots as if they were current.

Local implementation and validation proceed now. Deployment depends on available Netlify/GitHub access and completed production configuration. Current GitHub CLI authentication is invalid; do not expose or copy credentials to solve this.
