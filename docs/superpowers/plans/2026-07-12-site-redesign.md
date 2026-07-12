# WAISI Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework waisi.org's visual design and IA per `docs/superpowers/specs/2026-07-12-site-redesign-design.md` — editorial "serious research org" identity, compressed pages, and a program-application conversion funnel.

**Architecture:** Token-first: because every page already styles through CSS-variable tokens, redefining the tokens (ink-on-paper palette, serif headings) restyles the whole site at once; per-page tasks then fix layout and IA. New `APPLICATION_CYCLE` object in `src/constants.ts` drives all deadline copy and CTA states.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind 3.3 (token classes), `next/font/google`, Netlify.

## Global Constraints

- Work on the `redesign` branch; never push to `main` until Wave 1 is user-approved.
- Keep the stack, routes, Google Sheets/Calendar fetchers, and ISR intervals untouched.
- Style only through token classes (`bg-page`, `text-heading`, …) — no inline `style={{}}` hex values (existing convention).
- Server components by default; `"use client"` only for interactivity.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Every task ends with `npm run build` passing (run from repo root; needs `.env.local`).
- No new pages or routes; no dark mode; no wholesale copy rewrite.
- Preserve the "couldn't load" error states on data-backed pages.

## Design decisions (pinned for all tasks)

- **Heading font:** Newsreader (serif), weights 500/600, via `next/font/google`, CSS variable `--font-serif`, Tailwind class `font-serif`.
- **Body font:** Inter, weights 400/500/600, CSS variable `--font-sans`, default on `body` at weight 400.
- **Palette (new token values):**
  | Token | New value | Meaning |
  |---|---|---|
  | `--bg-page` | `#FAF9F7` | warm off-white paper |
  | `--bg-card` | `#FFFFFF` | flat surface (used with hairline border, no shadow) |
  | `--bg-card-alt` | `#F3F1EC` | tinted surface |
  | `--bg-ink` | `#1C1B1A` | NEW — dark surfaces (footer) |
  | `--text-primary` | `#26241F` | body ink |
  | `--text-heading` | `#1C1B1A` | headings are ink now, not violet |
  | `--text-link` | `#6D28D9` | violet accent, deepened for contrast on paper |
  | `--border-subtle` | `#E4E1DA` | hairlines |
  | `--shadow-card` | `none` | elevation retired; surfaces are flat + bordered |
  | `--line-color` | (deleted) | SVG connector lines are removed |
  | `cream` alias | `#FAF9F7` | text/icons over dark ink + hero photo |
- **Brand violet as background** (`bg-brand`) now maps to `--text-link` violet and is used ONLY for the primary CTA button.
- **Surfaces:** `rounded-card` drops to 4px. Cards = `bg-card border border-subtle rounded-card` (no shadow).
- **Measure:** long-form text blocks get `max-w-prose` or explicit `max-w-[70ch]`.

---

### Task 0: Create the redesign branch

**Files:** none

- [ ] **Step 1:** `git -C /Users/kaustubhkislay/waisi.org-1 checkout -b redesign` (from `main`). Expected: `Switched to a new branch 'redesign'`.
- [ ] **Step 2:** `npm run build` to confirm a green baseline. Expected: build succeeds.

### Task 1: Fonts + token foundation

**Files:**
- Modify: `src/app/layout.tsx` (add `next/font` setup)
- Modify: `src/styles/globals.css` (tokens, base type)
- Modify: `tailwind.config.js` (font families, radius, `ink` color)

**Interfaces:**
- Produces: Tailwind classes `font-serif`, `bg-ink`, `text-cream`/`bg-cream` (revalued), all existing token classes with new values. Body defaults to Inter 400; `h1–h3` default to Newsreader.

- [ ] **Step 1:** In `src/app/layout.tsx`, add before the metadata export:

```tsx
import { Inter, Newsreader } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
```

and change `<html lang="en">` / `<body>` to:

```tsx
<html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
  <body className="font-sans">
```

Also delete the `style={{ minHeight: "calc(100vh - 210px)" }}` inline style on `#content` (keep `min-h-screen`).

- [ ] **Step 2:** Replace the `:root` block, `body` rule, and heading rules in `src/styles/globals.css`:

```css
:root {
  --bg-page: #FAF9F7;
  --bg-card: #FFFFFF;
  --bg-card-alt: #F3F1EC;
  --bg-ink: #1C1B1A;
  --text-primary: #26241F;
  --text-heading: #1C1B1A;
  --text-link: #6D28D9;
  --shadow-card: none;
  --border-subtle: #E4E1DA;
}

body {
  font-family: var(--font-sans), system-ui, sans-serif;
  font-weight: 400;
  background-color: var(--bg-page);
  color: var(--text-primary);
}

h1, h2, h3 {
  font-family: var(--font-serif), Georgia, serif;
  font-weight: 500;
  letter-spacing: -0.01em;
}
h1 { font-size: 2.6em; line-height: 1.1; }
h2 { font-size: 1.8em; line-height: 1.2; }
h3 { font-size: 1.3em; line-height: 1.3; }
```

Delete: the `#home p { font-size: 1.25em }` rule, the `rgb(170, 68, 255)` link-color rules (token classes handle links), and `--line-color`. Keep `@keyframes enter`, `.page`, `#programs`, `#content`, `.waisi-button` (restyled in Task 3), `.lab`.

- [ ] **Step 3:** In `tailwind.config.js` extend:

```js
fontFamily: {
  sans: ["var(--font-sans)", "system-ui", "sans-serif"],
  serif: ["var(--font-serif)", "Georgia", "serif"],
},
colors: {
  // ...existing entries, plus/changed:
  ink: "var(--bg-ink)",
  brand: "var(--text-link)",   // violet now = CTA accent only
  cream: "#FAF9F7",
},
borderRadius: { card: "4px" },
```

- [ ] **Step 4:** `npm run build`. Expected: PASS. Commit: `feat(redesign): ink-on-paper tokens + Newsreader/Inter type system`.

### Task 2: APPLICATION_CYCLE in constants

**Files:**
- Modify: `src/constants.ts`

**Interfaces:**
- Produces:

```ts
export type ApplicationCycle = {
  status: "open" | "closed";
  deadline?: string;            // human-readable, e.g. "September 19, 2026"
  techFormUrl: string;
  policyFormUrl: string;
  upskillingInterestUrl: string;
  interestFormUrl: string;
};
export const APPLICATION_CYCLE: ApplicationCycle;
// helper used by nav/home/programs:
export function primaryCta(): { label: string; href: string };
```

- [ ] **Step 1:** Append to `src/constants.ts`:

```ts
export type ApplicationCycle = {
  status: "open" | "closed";
  deadline?: string;
  techFormUrl: string;
  policyFormUrl: string;
  upskillingInterestUrl: string;
  interestFormUrl: string;
};

// Single source of truth for application-cycle state. Update status/deadline
// each semester; every deadline mention and CTA on the site derives from it.
export const APPLICATION_CYCLE: ApplicationCycle = {
  status: "closed", // spring apps closed Feb 23, 2026; flip to "open" in fall
  techFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdJ5rgafADd1JlnpmVoCd323XMUGOGzGreGWsmaLGF_3OvMMg/viewform?usp=header",
  policyFormUrl: "https://forms.gle/4fBTy2cFxuQECqz17",
  upskillingInterestUrl: "https://forms.gle/ZB9855GZi6aZ4obh9",
  interestFormUrl: INTEREST_URL,
};

export function primaryCta(): { label: string; href: string } {
  return APPLICATION_CYCLE.status === "open"
    ? { label: "Apply now", href: "/programs" }
    : { label: "Join us", href: APPLICATION_CYCLE.interestFormUrl };
}
```

- [ ] **Step 2:** `npm run build`. Expected: PASS. Commit: `feat(redesign): APPLICATION_CYCLE single source of truth`.

### Task 3: Button component + .waisi-button restyle

**Files:**
- Modify: `src/components/button.tsx`
- Modify: `src/styles/globals.css` (`.waisi-button`)

**Interfaces:**
- Consumes: nothing new.
- Produces: existing `Button` usage keeps working; `.waisi-button` becomes the flat violet primary button (4px radius). Check `src/components/button.tsx` and `handbook.tsx` for how `.waisi-button` is consumed before editing; preserve their props.

- [ ] **Step 1:** Restyle `.waisi-button` in `globals.css`:

```css
.waisi-button {
  display: inline-block;
  padding: 12px 24px;
  font-weight: 600;
  color: #ffffff;
  background-color: var(--text-link);
  border-radius: 4px;
  transition: background-color 0.15s ease;
}
.waisi-button:hover { background-color: #5B21B6; }
```

- [ ] **Step 2:** `npm run build`; visually confirm buttons on /programs and /resources render violet, flat, 4px. Commit: `feat(redesign): flat primary button style`.

### Task 4: Nav — persistent CTA + restyle

**Files:**
- Modify: `src/components/nav.tsx`

**Interfaces:**
- Consumes: `primaryCta` from `@/constants`.

- [ ] **Step 1:** In `nav.tsx`, import `{ primaryCta }` from `@/constants`. After the Contact link in the desktop link row, add:

```tsx
<a
  href={primaryCta().href}
  {...(primaryCta().href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {})}
  className="ml-2 px-4 py-2 rounded-card font-semibold text-white bg-brand hover:opacity-90 transition-opacity"
>
  {primaryCta().label}
</a>
```

Add the same element (larger: `text-2xl my-4 px-6 py-3`) at the bottom of `MobileNav`'s link column.

- [ ] **Step 2:** Tone the nav down to match the editorial system: on the solid state keep `bg-page` but replace `shadow-card` with `border border-subtle`; nav links drop `font-semibold` for `font-medium`. In the JSX: `${isTransparent ? "bg-transparent border-transparent" : "bg-page border border-subtle"}` on the `<nav>` shell (keep the rounded-2xl shell and transparent-hero behavior).

- [ ] **Step 3:** `npm run build`; check desktop + mobile nav shows the CTA, transparent hero state still works. Commit: `feat(redesign): nav CTA button + hairline nav shell`.

### Task 5: Footer — dark ink restyle

**Files:**
- Modify: `src/components/footer.tsx`

- [ ] **Step 1:** Change the footer shell from `bg-brand` to `bg-ink`. Keep the three-column structure and links. Text stays `text-cream` (now `#FAF9F7`). Replace the Subscribe pill (`bg-[#C4B5FD] text-heading`) with:

```tsx
className="inline-block px-4 py-2 rounded-card bg-brand text-white font-semibold hover:opacity-90 transition-opacity"
```

Column headings (`h3`) get `font-serif`.

- [ ] **Step 2:** `npm run build`; confirm footer is dark ink with violet Subscribe button. Commit: `feat(redesign): dark ink footer`.

### Task 6: Home page compression

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/content/home.ts` (add `IMPACT_HIGHLIGHTS`, `PROGRAM_TEASERS`; remove `OPPORTUNITIES`/`FEATURED_OPPORTUNITY`/`CURRENT_PROJECTS` when no longer imported)
- Reference: `src/components/NumbersCarousel.tsx`, `PhotoCarousel.tsx`, `CompanyCarousel.tsx`, `PaperCard.tsx` (reused; restyle only if they carry retired styles)
- Delete if orphaned after this task: `src/components/OpportunityCard.tsx`

**Interfaces:**
- Consumes: `APPLICATION_CYCLE`, `primaryCta` from `@/constants`.
- Produces (in `src/content/home.ts`):

```ts
export type ImpactHighlight = { text: string; href?: string; linkText?: string };
export const IMPACT_HIGHLIGHTS: ImpactHighlight[]; // 3 items max, from current "Involvement and Impact" bullets
export type ProgramTeaser = { title: string; blurb: string }; // one line each
export const PROGRAM_TEASERS: ProgramTeaser[]; // 4 programs
```

Target structure (5 sections, ~half current scroll):

1. **Hero** — keep Capitol image + overlay; add under the `h1` a subline and two buttons: primary `primaryCta()` (`.waisi-button` styles) and secondary "Explore programs →" → `/programs` (ghost: `border border-cream text-cream rounded-card px-6 py-3 hover:bg-white/10`). `h1` gets `font-serif`.
2. **Mission** — keep two-column layout; tighten copy spacing; body text `text-lg` → `text-base`, `max-w-prose`.
3. **Proof band** — replace `NumbersCarousel` + "Involvement and Impact" two-column with ONE section: `NumbersCarousel` on top, below it a three-across grid of `IMPACT_HIGHLIGHTS` (short sentences distilled from the current five bullets: DC Congressional Exhibition, AB 664, speakers from DeepMind/Anthropic/METR/CNAS/Horizon) with `PhotoCarousel` beside or below at `lg:` width. Cut the "12+ labs" and "collaborated with professors" bullets (covered by research section).
4. **Programs teaser** — replaces the "Opportunities" grid: section head "Get involved" (serif), 4 one-line `PROGRAM_TEASERS` rows in a bordered list (each row: title, one-line blurb, arrow link to `/programs`), one primary CTA button below. Delete `OpportunityCard` usage.
5. **Research + partners** — merge "Current Projects" into "Research Highlights": keep the 3 `PaperCard`s + "See our 20+ Papers" button, drop the Current Projects two-column block. Then `CompanyCarousel` and the Sponsors strip as-is.

- [ ] **Step 1:** Add `IMPACT_HIGHLIGHTS` and `PROGRAM_TEASERS` to `src/content/home.ts` (distill copy from existing bullets/opportunities; keep links).
- [ ] **Step 2:** Rewrite `src/app/page.tsx` to the 5-section structure above, styling with token classes only.
- [ ] **Step 3:** Remove now-unused exports/imports (`OPPORTUNITIES`, `FEATURED_OPPORTUNITY`, `CURRENT_PROJECTS`, `OpportunityCard`); delete `src/components/OpportunityCard.tsx` if nothing imports it (`rg -l OpportunityCard src`).
- [ ] **Step 4:** `npm run build`. Screenshot home at 1280px and 390px; verify 5 sections, hero CTAs, no violet headings. Commit: `feat(redesign): compressed editorial home page`.

### Task 7: Programs page — decision surface

**Files:**
- Create: `src/content/programs.ts`
- Modify: `src/app/programs/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `APPLICATION_CYCLE`, `Handbooks` from `@/constants`.
- Produces (in `src/content/programs.ts`):

```ts
export type Program = {
  title: string;
  what: string;          // one sentence
  commitment: string;    // e.g. "2 hr/week + ≤1 hr prep, 8 weeks"
  audience: string;      // who it's for
  cta: { label: string; href: string };  // Apply/Interest form (falls back to interest form when cycle closed)
  handbookUrl?: string;
};
export const PROGRAMS: Program[];  // Technical Fundamentals, Policy Fundamentals, Technical Upskilling, Safety Scholars
```

- [ ] **Step 1:** Write `src/content/programs.ts`, deriving all copy from the current page content (`src/app/programs/page.tsx` on `main`): fundamentals details from the two fundamentals boxes, upskilling and scholars from theirs. CTA hrefs come from `APPLICATION_CYCLE` (when `status === "closed"`, fundamentals CTAs become `{ label: "Get notified", href: APPLICATION_CYCLE.interestFormUrl }`; never render a dated deadline unless `APPLICATION_CYCLE.deadline` is set).
- [ ] **Step 2:** Rewrite `src/app/programs/page.tsx`:
  - Page head: serif `h1` "Get involved", one-line intro, `max-w-prose`.
  - **Program grid:** `grid md:grid-cols-2 gap-6 max-w-5xl` of 4 cards (`bg-card border border-subtle rounded-card p-6`). Each card top-to-bottom: serif `h2` title → `what` sentence → definition rows (`Commitment:` / `For:` with `font-medium` labels) → deadline line only if `APPLICATION_CYCLE.deadline` → `.waisi-button` CTA + "Handbook →" text link. No bullets, no SVG lines.
  - **Below the grid:** a compact "Details" section: grad-student shadowing note (email link), undergrad application-timing note, `Handbooks.AT_A_GLANCE` link — condensed from the current Safety Scholars box.
- [ ] **Step 3:** `npm run build`. Screenshot /programs at 1280px/390px; all 4 cards visible in ~first viewport at 1280px; no stale "February 23rd" copy (`rg -i "february" src` returns nothing). Commit: `feat(redesign): programs decision-surface grid`.

### Task 8: WAVE 1 REVIEW GATE (user checkpoint)

- [ ] **Step 1:** `npm run build` full pass; screenshot home + programs (1280px, 390px) and present to the user.
- [ ] **Step 2:** On approval: `git checkout main && git merge redesign && git push` (push = production deploy). If changes requested, iterate on `redesign` first. **Do not pass this gate without explicit user approval.**

### Task 9: Wave 2 — remaining pages

**Files:**
- Modify: `src/app/research/page.tsx`, `src/app/events/page.tsx`, `src/app/team/page.tsx`, `src/app/resources/page.tsx`, `src/app/contact/page.tsx` and their components (`ResearchList.tsx`, `PaperCard.tsx`, `calendarEvent.tsx`, `member.tsx`, `prof.tsx`, `lab.tsx`, `handbook.tsx`)

The token flip already restyled these; this task is cleanup, one commit per page:

- [ ] **Step 1 (research):** headings serif (automatic via base styles — remove any per-element color overrides like the maroon `#800000` accent → replace with `text-primary` + serif); cards → `border border-subtle`, no shadows; long text `max-w-prose`. Commit: `refactor(redesign): research page on new system`.
- [ ] **Step 2 (events):** same treatment on event cards; keep error state. Commit: `refactor(redesign): events page on new system`.
- [ ] **Step 3 (team):** member/prof cards flat + bordered; grid spacing normalized. Commit: `refactor(redesign): team page on new system`.
- [ ] **Step 4 (resources):** handbook buttons use `.waisi-button` / bordered cards. Commit: `refactor(redesign): resources page on new system`.
- [ ] **Step 5 (contact):** flat cards, serif heads, `max-w-prose`. Commit: `refactor(redesign): contact page on new system`.
- [ ] **Step 6:** `npm run build`; screenshot each page at 1280px/390px; verify data-backed pages still render sheet/calendar data and error states survive (`rg "couldn't load" src` still matches). Push to `main` incrementally after visual check.

### Task 10: DESIGN_SYSTEM.md rewrite + final sweep

**Files:**
- Modify: `DESIGN_SYSTEM.md`

- [ ] **Step 1:** Rewrite the Palette and Typography sections to match Task 1's shipped values (table format as current file); document the button, card (flat + bordered), and CTA conventions; note `APPLICATION_CYCLE` as the source of cycle copy.
- [ ] **Step 2:** Sweep: `rg -n "shadow-card|#800000|#C4B5FD|SF Pro|line-color" src tailwind.config.js` — each hit either removed or documented as an accepted exception in DESIGN_SYSTEM.md.
- [ ] **Step 3:** `npm run build`; commit `docs(redesign): DESIGN_SYSTEM.md matches shipped system`; push.

## Verification summary

- Per task: `npm run build` green before commit.
- Wave gates: screenshots at 1280px and 390px per changed page.
- Conversion checks: nav CTA present on every page; /programs shows 4 CTA buttons; no dated deadline unless `APPLICATION_CYCLE.deadline` set.
- Content checks: `rg -i "february 23" src` empty; `rg "couldn't load" src` still matches team/research/events.
