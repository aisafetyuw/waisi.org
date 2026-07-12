# Site Redesign — Design Spec

**Date:** 2026-07-12
**Scope:** Full visual + IA redesign of waisi.org. Keep the stack (Next.js App
Router, Tailwind, Netlify, Google Sheets/Calendar backend) and page content;
completely rework visual design, layout, and information architecture.

## Motivation

Three problems, confirmed with the site owner:

1. **Looks dated / generic.** Every page is stacked full-width sections of
   bullet-list cards with violet headings, rounded corners, and drop shadows.
   SF Pro Rounded at weight 300 reads friendly-casual — the opposite of the
   intended positioning.
2. **Too much scrolling / weak IA.** Content is long and list-heavy. The
   programs page is four bulleted boxes joined by decorative SVG lines; the
   home page is seven near-independent scroll sections.
3. **Doesn't convert.** The single most important visitor action — applying to
   a program — is a text link inside a bullet list, several scroll-lengths deep
   on a subpage. The page also shows a stale deadline ("February 23rd, 2026").

**Positioning target:** serious research org — editorial, restrained,
type-driven (reference class: Anthropic, ARC, Redwood Research). Credible to
researchers and faculty; still legible to freshmen.

**Primary conversion:** apply to a program. When applications are closed, CTAs
fall back to the evergreen interest form.

## 1. Visual direction

- **Typography-led identity.** Self-hosted editorial serif for headings via
  `next/font` (candidate: Newsreader or Source Serif; final pick during the
  Hallmark craft pass), clean sans for body at normal weight (drop the
  300-weight default). Tighter heading scale with real hierarchy.
- **Palette: ink on paper.** Near-black text on warm off-white. Retire violet
  as the heading color; WAISI violet survives only as a restrained accent
  (links, primary CTA, small details). Footer becomes dark ink, not violet.
- **Layout language: editorial.** Constrained text measure (~65–70ch),
  generous whitespace, hairline rules and flat bordered surfaces instead of
  rounded shadow-cards. Remove the programs-page SVG connector lines.
- **Deliverable:** updated token system in `src/styles/globals.css` +
  `tailwind.config.js`; `DESIGN_SYSTEM.md` rewritten to match. All pages style
  through tokens (existing convention, preserved).
- The **Hallmark design skill** drives the craft pass (type pairing, spacing
  scale, exact palette values) during implementation — this spec fixes the
  direction, not the hex codes.

## 2. IA and conversion

### Navigation
- Nav gains a persistent **primary CTA button** (label driven by application
  cycle: "Apply" when open, "Join us" → interest form when closed).
- Page set and routes unchanged: home, programs (nav label "Get Involved"),
  events, research, resources, team, contact.

### Home page
Compress from seven stacked sections to five, targeting roughly half the
current scroll length:

1. **Hero** — keep the Capitol image; add a primary CTA alongside the
   mission line.
2. **Mission** — current two-column mission section, tightened.
3. **Proof band** — merge "By the Numbers" and "Involvement and Impact" into
   one section (numbers + 2–3 impact highlights + photo).
4. **Programs teaser** — replaces the "Opportunities" card grid; short program
   summaries with a CTA into /programs.
5. **Research highlights** — merge "Current Projects" and "Research
   Highlights" into one section linking to /research; partners/sponsors strip
   below.

### Programs page (Get Involved)
Becomes a **decision surface**: the four programs (Technical Fundamentals,
Policy Fundamentals, Technical Upskilling, Safety Scholars) render as a
scannable grid of structured cards, visible within the first viewport. Each
card: what it is / time commitment / who it's for / deadline / an Apply (or
Interest) **button**. Deep details (handbooks, grad-student shadowing notes)
sit below the grid or behind the handbook links — not in the cards.

### Application-cycle data
One `APPLICATION_CYCLE` object in `src/constants.ts`:

```ts
{ status: "open" | "closed", deadline?: string,
  techFormUrl, policyFormUrl, interestFormUrl }
```

Every deadline mention and CTA state derives from it — fixes the stale
deadline and prevents recurrence. When `closed`, all Apply CTAs fall back to
the interest form.

## 3. Rollout plan

Work happens on a `redesign` branch (no staging env; review via local
`npm run build` + dev-server screenshots). Merge to `main` = production deploy.

- **Wave 0 — foundation:** new tokens, fonts, nav (with CTA), footer, button
  component. Nothing merges alone; this lands with Wave 1.
- **Wave 1 — flagship pages:** home + programs fully redesigned. Owner reviews
  screenshots; on approval, merge to `main`.
- **Wave 2 — remaining pages:** research, events, team, resources, contact
  migrated onto the new system with light per-page IA cleanup. Shipped
  incrementally to `main` after Wave 1 merges.

The site is briefly mixed-style between waves; accepted trade-off for landing
the highest-impact pages first.

## 4. Non-goals

- No stack, hosting, or content-backend changes; Google Sheets/Calendar
  fetchers and ISR intervals untouched.
- No wholesale copy rewrite — only conversion-critical copy (CTAs, deadlines)
  and stale facts change.
- No dark mode (token system keeps it tractable later).
- No new pages or routes.

## Error handling / testing

- Existing "couldn't load" error states on data-backed pages are preserved and
  restyled, not removed.
- Each wave: `npm run build` must pass locally before push (build prerenders
  all pages and needs Google env vars from `.env.local`).
- Visual verification per page at mobile (~390px) and desktop (~1280px)
  widths before review.
