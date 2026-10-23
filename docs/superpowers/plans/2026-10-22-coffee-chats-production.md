# Coffee Chats Production Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate the approved calendar into WAISI with current public availability, production configuration, and operational checks.

**Architecture:** Preserve the calendar as a same-origin embed. Normalize public provider data in server modules, cache it briefly, and remove failed or expired data. Keep personal Google data entirely in the browser.

**Tech Stack:** Existing Next.js 16, TypeScript, native JavaScript modules, Node test runner, Netlify Functions/Blobs.

**Spec:** `docs/superpowers/specs/2026-10-22-coffee-chats-production-design.md`

## Global Constraints
- Public link access; no leader credentials or booking mutations.
- No saved availability fallback. Five-minute expiry; no stale slots on provider failure.
- Google provider stays unavailable until safely verified.
- Never log tokens, private events, or raw provider responses.
- Keep the existing theme and selection interactions.

## Review Focus
- A provider returns an empty or malformed response: distinguish no slots from failed checking.
- A slow response follows date navigation: never replace the newly selected week.
- Browser restores a hidden tab after expiry: hide stale slots before refresh completes.
- A provider response includes an unexpected URL: never turn the route into an arbitrary proxy.
- An unconfigured production deployment must fail preflight and health checks.

### Task 1: Public availability service
**Files:** `src/lib/coffee-chats/{providers,service,store}.mjs`, source JSON, `tests/coffee-chats/providers.test.mjs`.
**Interfaces:** `readSource(source, range, fetchImpl) -> slots`; `collectAvailability(sources, range, options) -> snapshot`; `validateRange(start,end,now) -> range`.
- [x] Write failing tests for real payload parsing, malformed payloads, request allowlists, expired cache, partial failures, bounded dates, and coalesced requests.
- [x] Run tests and confirm expected failures.
- [x] Implement provider readers and a five-minute cache with sanitized failure codes.
- [x] Run the complete Node suite and a live read-only provider check.

### Task 2: Website and Google configuration
**Files:** `/coffee-chats` page, API routes, embed assets, privacy page, production config module.
**Interfaces:** GET config/roster/availability; browser source controller discards obsolete responses and expired slots.
- [x] Write failing lifecycle/config tests.
- [x] Implement the page and routes, preserve existing UI, add compact failure recovery and direct calendar fallbacks.
- [x] Add distinct Calendar API error handling and production origin validation.
- [x] Verify tests, production build, desktop/mobile UI, and keyboard controls.

### Task 3: Operations and launch
**Files:** health route, Netlify scheduled function, CI workflows, preflight script, deployment runbook, environment example.
- [x] Write failing health/preflight tests for missing configuration, partial coverage, stale data, and safe diagnostics.
- [x] Implement scheduled refresh, health checks, CI, and release/rollback instructions.
- [x] Run all tests and build. Inspect production integration access without exposing credentials.
- [x] Record external blockers explicitly; do not represent local readiness as a deployed production service.

### Task 4: Review and verification
- [x] Obtain a fresh whole-change review and fix material findings with regression tests.
- [x] Save a screenshot of the integrated preview.
- [x] Report completed work, measured checks, and remaining Google/provider/deployment requirements.

## Remaining external release work

The reviewed code merged in PR #3 and deployed to production with the calendar disabled. The public app information and privacy pages are live. The user approved Google consent publication, which now reports In production. Google marks the availability scope as non-sensitive and requires no data-access verification. The owner is Kaustubh Kislay; an authorized intentional GitHub failure produced a matching email in his inbox. The user confirmed that the embedded local Google connection works in Chrome or Safari. PR #4 published the approved verification file, and Search Console verified WAISI ownership for aisafetyuw@gmail.com. Google requires a 24-hour wait before retrying branding; retry no earlier than 2026-10-24 04:46 UTC. Remaining work: Google leader source integration, branding verification, production-origin Google connection tests, and calendar activation with scheduled refresh verification. The implementation checkboxes above describe completed preparation and tests, not a calendar launch.

The follow-up empty-calendar correction distinguishes failed source checks from confirmed empty results. It preserves leader multi-select and adds seven regression tests. Google appointment pages still require direct booking until a permitted reader is implemented.
