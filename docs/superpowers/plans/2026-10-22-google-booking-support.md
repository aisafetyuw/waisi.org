# Google Booking Support Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Show current appointment slots for all eight Google booking links in the existing WAISI calendar.

**Architecture:** Resolve each public short link without cookies. Read the public page's initial configuration as JSON, then call only its read-only ListAvailableSlots method. Normalize returned timestamps and actual durations through the existing availability service.

**Tech Stack:** Existing JavaScript modules, Node fetch and test runner, Next.js/Netlify.

**Spec:** `docs/superpowers/specs/2026-10-22-coffee-chats-production-design.md`, extended by the user's explicit request to finish Google booking support.

## Global Constraints

- Use public booking links only; no leader credentials, browser session, OAuth token, or cookies.
- Do not call booking, cancellation, user calendar listing, or private event methods.
- Use exact allowed hosts and appointment paths; validate each redirect before following it.
- Read the page's published application key dynamically; never save it in source or logs.
- Keep requests and pagination bounded. Malformed or failed responses must remove that source's blocks.
- Preserve the calendar design, filters, five-minute expiry, and direct booking links.
- Keep production disabled until the separate Google consent and launch checks pass.

## Evidence

Anonymous GET requests returned Eva's public schedule page. Its published JavaScript identifies `google.internal.calendar.v1.AppointmentBookingService/ListAvailableSlots` on `calendar-pa.clients6.google.com`. The public page provides the application key. The anonymous request uses the actual public booking page as its Referer. It returned current slots with durations. Two requests with page size 2 confirmed that the response's continuation token retrieves the next slots. No browser session or private calendar data was used.

## Review Focus

- A redirect leaves the booking-page allowlist: reject it before any request.
- A source fails on a later page: reject the whole source rather than return partial slots.
- Google returns a successful empty protobuf response: distinguish it from malformed data and API errors.
- Timezone and daylight-saving boundaries: retain absolute timestamps and apply the existing display conversion.
- The page schema or pagination changes: fail visibly, without stale-slot fallback or raw response logs.

### Task 1: Public Google reader

**Files:** Add `src/lib/coffee-chats/google-booking.mjs` and `tests/coffee-chats/google-booking.test.mjs`; update `providers.mjs` and its tests.

**Interfaces:** `readGoogleBooking(source, range, fetchImpl) -> slots`; `parseGoogleSlots(payload, source, range) -> {slots, nextPageToken}`. The range uses inclusive UTC start and exclusive UTC end dates.

- [ ] Write failing tests for public configuration extraction, absolute times and actual duration, empty responses, malformed data, approved redirects, cookie-free requests, pagination and late-page failure.
- [ ] Implement strict parsing and bounded anonymous requests. Use only the observed read-only RPC.
- [ ] Run the complete suite and check every Google source against the live public service.

### Task 2: Readiness and deployed verification

**Files:** Update `operations.mjs`, operations tests, and `docs/coffee-chats/operations.md`.

- [ ] Replace the unconditional Google-source blocker only after all eight live sources pass. Continue rejecting unsupported provider names and incomplete production configuration.
- [ ] Verify the local calendar with Eva, Arya, and another Google leader, including leader selection and timezone conversion.
- [ ] Run the production build and request a fresh code review.
- [ ] Publish a pull request and inspect its Netlify preview. Confirm all source statuses and visible Google blocks before merging.
- [ ] Record the actual checks and remaining consent-branding/production launch work.
