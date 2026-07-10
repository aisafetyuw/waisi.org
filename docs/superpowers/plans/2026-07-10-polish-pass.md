# WAISI.org Polish Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix stale artifacts, consolidate all inline styles onto the Tailwind token system, and rewrite `DESIGN_SYSTEM.md` — with zero user-facing prose changes and no visual redesign.

**Architecture:** Pure cleanup of an existing Next.js 16 App Router site. No new features, no new dependencies. `next.config.js` becomes `next.config.ts` so redirect destinations can be imported from `src/constants.ts`. All styling consolidates onto the CSS-variable tokens in `src/styles/globals.css` via the Tailwind mappings in `tailwind.config.js`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3. No test framework exists; verification is `npm run build`, `grep`, and `curl` against the dev server.

**Spec:** `docs/superpowers/specs/2026-07-10-polish-pass-design.md` (approved 2026-07-10).

## Global Constraints

- **Repo:** All work happens in `/Users/kaustubhkislay/waisi.org-1`. Run every command from that directory.
- **PROSE FREEZE:** User-facing copy stays byte-for-byte unchanged — every visible text string in JSX, `src/content/*.ts`, nav/footer labels, and `metadata` fields. Only `README.md`, `DESIGN_SYSTEM.md`, and specific factual corrections in `llms.txt` (listed in Task 3) may change textually.
- **NEVER `git push`.** Pushing to `main` deploys production via Netlify. Commit locally only; the maintainer pushes.
- **No visual redesign.** DOM structure, spacing, and layout stay as-is. Tailwind classes must reproduce the current computed styles (snap rule below).
- **Snap rule:** an inline value that exactly matches a token's `var()` or hex becomes the token class. A near-miss (e.g. `#F9FAFB` vs token `#FAFAFA`) snaps to the token. A meaningfully different value (e.g. `#800000` maroon) keeps its exact value via a Tailwind arbitrary class like `text-[#800000]`.
- **No test suite exists and none is added.** Each task's verify steps are its test cycle.
- Commit after every task with the exact message given (append the Claude co-author trailer).

## Token Reference (memorize before Tasks 5–10)

Tokens defined in `src/styles/globals.css:6-16`, mapped in `tailwind.config.js`:

| CSS variable | Value | Tailwind classes |
|---|---|---|
| `--bg-page` | `#FFFFFF` | `bg-page` |
| `--bg-card` | `#F5F5F5` | `bg-card` |
| `--bg-card-alt` | `#FAFAFA` | `bg-card-alt` |
| `--text-primary` | `#1A1A1A` | `text-primary` |
| `--text-heading` | `#6B46C1` | `text-heading` (also `bg-brand` after Task 5) |
| `--text-link` | `#8B5CF6` | `text-link` |
| `--shadow-card` | `0 2px 16px rgba(0,0,0,0.08)` | `shadow-card` |
| `--border-subtle` | `#E0E0E0` | `border-subtle` |
| (none — legacy cream) | `#FFF9F0` | `text-cream`/`bg-cream` after Task 5 |

Common spacing equivalences: `-40px` margin = `-mx-10`; `8px` = `pb-2`; `12px` radius = `rounded-card` (or `rounded-xl`); `16px` radius = `rounded-2xl`; `1200px` = `max-w-[1200px]`.

---

### Task 1: Delete stale artifacts

**Files:**
- Delete: `public/sitemap.xml`, `public/about/convert.sh`, `src/components/program.tsx`
- Modify: `tailwind.config.js:4`, `README.md:54`

**Interfaces:** Produces nothing later tasks consume, but Task 4 assumes `program.tsx` is gone (it makes `.program a` and `#programs .closed` CSS dead).

- [ ] **Step 1: Verify the deletions are safe**

```bash
rg -l "from ['\"].*components/program['\"]" src/   # expect: no output (unimported)
rg -n "sitemap.xml" src/ public/robots.txt          # expect: only robots.txt Sitemap line + src/app/sitemap.ts comment
```

- [ ] **Step 2: Delete the three files**

```bash
git rm public/sitemap.xml public/about/convert.sh src/components/program.tsx
```

- [ ] **Step 3: Remove the vestigial pages glob** in `tailwind.config.js` — delete line 4 so `content` reads:

```js
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
```

- [ ] **Step 4: Remove the stale README line.** Delete `README.md:54` exactly:

```
  archive/        old pages kept for reference (not routed)
```

(It sits inside the directory-tree listing; remove only that line.)

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: completes with no errors; build output lists `/sitemap.xml` as generated from `src/app/sitemap.ts`.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: remove stale sitemap.xml, convert.sh, unused program component"
```

### Task 2: Real redirects replacing meta-refresh stubs

**Files:**
- Create: `next.config.ts` (replaces `next.config.js` — Next ≥15 supports TS config, which lets us import from `src/constants.ts`)
- Delete: `next.config.js`, `src/app/discord/page.tsx`, `src/app/interest/page.tsx`, `src/app/twitter/page.tsx`, `src/app/instagram/page.tsx`, `src/app/qrcode/page.tsx` (and their now-empty directories)

**Interfaces:**
- Consumes: `DISCORD_URL`, `INTEREST_URL`, `TWITTER_URL`, `INSTAGRAM_URL` from `src/constants.ts` (all `export const … : string`). `/qrcode` redirects to `DISCORD_URL` (matches current stub behavior).
- Produces: `/discord`, `/interest`, `/twitter`, `/instagram`, `/qrcode` return HTTP 307.

**Deviation from spec, intentional:** spec said "permanent redirects", but the destinations are a Discord invite and Google Form links that get rotated — a cached 308 would strand users on dead URLs. Use `permanent: false` (307).

- [ ] **Step 1: Create `next.config.ts`** with this exact content:

```ts
import type { NextConfig } from "next";
import {
  DISCORD_URL,
  INSTAGRAM_URL,
  INTEREST_URL,
  TWITTER_URL,
} from "./src/constants";

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF (30-50% smaller than WebP for photos); WebP as fallback.
    formats: ["image/avif", "image/webp"],
    // Allowed quality values; 60 is used by the homepage hero (dimmed by an
    // overlay, so the lower quality is imperceptible).
    qualities: [60, 75],
  },
  async redirects() {
    // Destinations (Discord invite, Google Forms) get rotated, so these are
    // temporary (307) — a cached permanent redirect would outlive the URL.
    return [
      { source: "/discord", destination: DISCORD_URL, permanent: false },
      { source: "/interest", destination: INTEREST_URL, permanent: false },
      { source: "/twitter", destination: TWITTER_URL, permanent: false },
      { source: "/instagram", destination: INSTAGRAM_URL, permanent: false },
      { source: "/qrcode", destination: DISCORD_URL, permanent: false },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Delete the old config and the five stubs**

```bash
git rm next.config.js
git rm -r src/app/discord src/app/interest src/app/twitter src/app/instagram src/app/qrcode
```

- [ ] **Step 3: Verify redirects against the dev server**

```bash
npm run dev &   # wait for "Ready"
for p in discord interest twitter instagram qrcode; do
  curl -s -o /dev/null -w "/$p %{http_code} -> %{redirect_url}\n" http://localhost:3000/$p
done
kill %1
```

Expected: each line shows `307` and the matching URL from `src/constants.ts`. `robots.txt` still disallows all five paths (unchanged — redirects shouldn't be crawled).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: replace meta-refresh stub pages with real 307 redirects"
```

### Task 3: Serve llms.txt and correct stale facts

**Files:**
- Move: `llms.txt` → `public/llms.txt` (`git mv`)
- Modify: `public/llms.txt` (the corrections below ONLY — mission/prose untouched)

- [ ] **Step 1: Move the file**

```bash
git mv llms.txt public/llms.txt
```

- [ ] **Step 2: Apply exactly these factual corrections** (line numbers from the current file):

1. Line 53: `- **/about** - Mission, impact, and organizational goals` → `- **/** - Mission, impact, and organizational goals (homepage)` (there is no `/about` page).
2. Lines 159–160 (Technical Stack): `- Next.js 13.4 with App Router` → `- Next.js 16 with App Router`; `- React 18 with TypeScript` → `- React 19 with TypeScript`.
3. Line 130: Discord URL `https://discord.gg/9yrw8Azdje` → `https://discord.gg/8xZtDBmCHa` (match `src/constants.ts` — or simply `https://waisi.org/discord`, which now redirects; prefer the latter, it never goes stale).
4. Line 133: `company/wisconsin-ai-safety-initiative` → `company/waisi` (match `LINKEDIN_URL`).
5. Line 181 (Last Updated): `December 2024` → `July 2026`.

Touch nothing else in the file.

- [ ] **Step 3: Verify it serves**

```bash
npm run dev &   # wait for Ready
curl -s http://localhost:3000/llms.txt | head -3
kill %1
```

Expected: first line is `# Wisconsin AI Safety Initiative (WAISI) - LLMs.txt`.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "fix: serve llms.txt from public/ and correct stale facts"
```

### Task 4: Remove dead CSS from globals.css

**Files:**
- Modify: `src/styles/globals.css`

**IMPORTANT — spec correction:** the spec assumed the `#about …` selectors were dead because no `/about` page exists. Grep shows the **homepage has a `<div id="about">` section** (`src/app/page.tsx:50`), so `#about a` and `#about a:hover` are LIVE. Do not remove them.

Verified-dead selectors (each was grepped against `src/` with zero JSX usage; `.program`/`.closed` become dead once Task 1 deletes `program.tsx`):

- [ ] **Step 1: Re-verify each selector is unused** (run after Task 1):

```bash
for c in about-img-left about-img-right program-container see-info landing-img buttons stats stat-num headline text-gradient; do
  printf '%-20s' "$c"; rg -c "$c" src/ --glob '!src/styles/**' || echo "DEAD"
done
rg -n 'className="[^"]*\bprogram\b' src/   # expect: no output
```

Any selector that shows a live hit stays in the file.

- [ ] **Step 2: Delete these blocks from `globals.css`** (current line numbers in parentheses):

- `.about-img-left { float: left; }` (34–36)
- `.about-img-right { float: right; }` (38–40)
- `.program a { word-break: break-word; }` (42–44)
- `#program-container { … }` (69–73)
- `#see-info { display: none; }` (75–77)
- the entire `@media (max-width: 1200px)` block for `#program-container` / `#see-info` (79–87)
- `#landing-img { … }` (115–119)
- `#programs .closed { background-image: … }` (137–139)
- `#buttons { … }` (151–155)
- `#buttons .waisi-button { margin-bottom: 10px; }` (166–168)
- `.text-gradient { … }` and its `@keyframes gradientshift` (174–193)
- `#stats { … }`, `.stat-num { … }`, `#stats li { … }` (195–209)
- In the grouped selector at 125–131, remove only `#headline a` from the list, leaving `#about a, #programs a, .location, .event-description a { color: rgb(170, 68, 255); }`.

Keep everything else, notably: `@keyframes enter`, `#programs`, `.page`, `#content`, `h1/h2/h3`, `#home p`, the `#about`/`#programs` link rules, `.waisi-button` and its hover, `.lab`.

- [ ] **Step 3: Verify build and pages**

Run: `npm run build`
Expected: clean. Then `npm run dev` and eyeball `/`, `/programs`, `/events` — link colors, buttons, and section animations unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/styles/globals.css && git commit -m "chore: remove grep-verified dead CSS selectors"
```

### Task 5: Token aliases + migrate contact and team pages

**Files:**
- Modify: `tailwind.config.js`, `src/app/contact/page.tsx`, `src/app/team/page.tsx`

**Interfaces:**
- Produces: Tailwind color aliases `brand` (`var(--text-heading)`, for violet used as a background) and `cream` (`#FFF9F0`, legacy cream used ~15× in nav/footer). Tasks 8–9 consume `bg-brand`, `text-cream`, `bg-cream`.

- [ ] **Step 1: Add the two aliases** to `tailwind.config.js` `theme.extend.colors`:

```js
      colors: {
        page: "var(--bg-page)",
        card: "var(--bg-card)",
        "card-alt": "var(--bg-card-alt)",
        primary: "var(--text-primary)",
        heading: "var(--text-heading)",
        link: "var(--text-link)",
        subtle: "var(--border-subtle)",
        // Aliases: the brand violet doubles as a background (footer, nav
        // hamburger); cream is the legacy palette's off-white, kept only for
        // text/icons over the violet footer and the homepage hero photo.
        brand: "var(--text-heading)",
        cream: "#FFF9F0",
      },
```

- [ ] **Step 2: Migrate `src/app/contact/page.tsx`.** The recurring patterns and their replacements (these same five rules drive Tasks 6–10):

| Inline style | Replacement |
|---|---|
| `style={{ marginLeft: "-40px", marginRight: "-40px" }}` | delete — the element already has `className="-mx-10"` (equal to −40px) |
| `style={{ color: "var(--text-heading)", paddingBottom: "8px" }}` | add `text-heading pb-2` to className |
| `style={{ color: "var(--text-heading)" }}` | add `text-heading` |
| `style={{ color: "var(--text-primary)" }}` | add `text-primary` |
| `style={{ color: "var(--text-link)", textDecoration: "none" }}` | add `text-link no-underline` — BUT check the element: the contact mailto link has `hover:underline` in its className, and `no-underline` would fight it; since `<a>` has no default underline suppression need beyond Tailwind's preflight (preflight already strips it), just add `text-link` and drop both properties |
| `style={{ borderRadius: "12px", boxShadow: "var(--shadow-card)" }}` (iframe) | add `rounded-card shadow-card` |

Worked example — the heading at `contact/page.tsx:24-32` becomes:

```tsx
        <h1 className="text-4xl font-semibold mb-8 text-heading pb-2">
          Contact Us
        </h1>
```

Apply the table to every `style={{}}` in the file. **Do not alter any text content.**

- [ ] **Step 3: Migrate `src/app/team/page.tsx`** with the same table. Its distinct patterns: `-40px` margins (delete if `-mx-10` present, else add `-mx-10`), `backgroundColor: "var(--bg-page)"` → `bg-page`, `color: "var(--text-heading)", paddingBottom: "8px"` → `text-heading pb-2`. One extra rule: `style={{ backgroundColor: "var(--bg-card)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}` → `bg-card rounded-card shadow-card`.

- [ ] **Step 4: Verify**

```bash
rg -c 'style=\{' src/app/contact/page.tsx src/app/team/page.tsx   # expect: no output (zero matches)
npm run build                                                      # expect: clean
```

Then visually diff `/contact` and `/team` on the dev server against production waisi.org — headings violet, cards unchanged.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "refactor: migrate contact and team pages to token classes"
```

### Task 6: Migrate research page

**Files:**
- Modify: `src/app/research/page.tsx`

**Interfaces:** Consumes the Task 5 mapping table.

- [ ] **Step 1: Apply the mapping table.** File-specific additions:

| Inline style | Replacement |
|---|---|
| `style={{ width: "75%" }}` | `w-3/4` |
| `style={{ color: "#800000" }}` | `text-[#800000]` — maroon, meaningfully distinct, keep exact |
| `style={{ backgroundColor: "var(--bg-card)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}` | `bg-card rounded-card shadow-card` |
| `style={{ backgroundColor: "var(--bg-page)", marginLeft: "-40px", marginRight: "-40px" }}` | `bg-page` + `-mx-10` (delete margins if `-mx-10` already in className) |
| `maxWidth: "1200px"` | `max-w-[1200px]` |
| `gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))"` | `grid-cols-[repeat(auto-fill,minmax(280px,1fr))]` (note: no spaces inside the arbitrary value) |

- [ ] **Step 2: Verify**

```bash
rg -c 'style=\{' src/app/research/page.tsx   # expect: no output
npm run build                                 # expect: clean
```

Visual check `/research` vs production: card grid, maroon accents, paper list identical.

- [ ] **Step 3: Commit**

```bash
git add src/app/research/page.tsx && git commit -m "refactor: migrate research page to token classes"
```

### Task 7: Migrate programs page

**Files:**
- Modify: `src/app/programs/page.tsx` (488 lines, 43 style blocks — the biggest file; same rules, more of them)

- [ ] **Step 1: Apply the Task 5 + Task 6 mapping tables.** File-specific additions:

| Inline style | Replacement |
|---|---|
| `style={{ color: "var(--text-heading)", fontWeight: "bold" }}` | `text-heading font-bold` |
| `style={{ backgroundColor: "var(--bg-page)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}` | `bg-page rounded-card shadow-card` |
| `style={{ top: "280px", left: "0", width: "100%", height: "140px", pointerEvents: "none", zIndex: 0 }}` | `top-[280px] left-0 w-full h-[140px] pointer-events-none z-0` |

Work through all 43 occurrences top-to-bottom; every one must resolve to a table rule (the tables cover all distinct values present — verified by extraction). If an untabled value appears, keep it pixel-exact as an arbitrary class.

- [ ] **Step 2: Verify**

```bash
rg -c 'style=\{' src/app/programs/page.tsx   # expect: no output
npm run build
```

Visual check `/programs` vs production — this page has the most surface; scroll the whole page at desktop and ~390px mobile width.

- [ ] **Step 3: Commit**

```bash
git add src/app/programs/page.tsx && git commit -m "refactor: migrate programs page to token classes"
```

### Task 8: Migrate nav

**Files:**
- Modify: `src/components/nav.tsx`

**Interfaces:** Consumes `bg-brand`, `text-cream`, `bg-cream` from Task 5. Nav colors are *conditional* — they become conditional className fragments, not static classes.

- [ ] **Step 1: MobileNav section.** Container `style={{ backgroundColor: "#FFFFFF" }}` → add `bg-page`. Each mobile `<Link>`'s conditional color becomes part of the existing template className; e.g. the Home link (`nav.tsx:18-26`):

```tsx
        <Link
          href="/"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/" ? "underline text-heading" : "text-primary"}`}
        >
          Home
        </Link>
```

Apply identically for `/programs`, `/events`, `/research`, `/resources`, `/team`, `/contact`. Delete the now-unused `const linkColor = "#1A1A1A";` (`nav.tsx:10`).

- [ ] **Step 2: Nav container** (`nav.tsx:143-153`). Replace the style block with conditional classes; `16px` radius = `rounded-2xl`, and the shadow value equals `--shadow-card`:

```tsx
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl max-w-[1200px] mx-auto ${isTransparent ? "bg-transparent shadow-none" : "bg-page shadow-card"}`}
    >
```

Delete the now-unused `const navBackground = …` (`nav.tsx:140`).

- [ ] **Step 3: Desktop links** (six `<Link>`s, `nav.tsx:169-252`). Pattern for each:

```tsx
          <Link
            href="/programs"
            className={`p-2 hover:underline ${pathname == "/programs" ? "underline text-heading" : isTransparent ? "text-cream" : "text-primary"}`}
          >
            Get Involved
          </Link>
```

- [ ] **Step 4: Hamburger spans** (three, `nav.tsx:262-279`): replace each `style={{ backgroundColor: isTransparent ? "#FFF9F0" : "#6B46C1" }}` with `${isTransparent ? "bg-cream" : "bg-brand"}` appended inside the existing template className.

- [ ] **Step 5: Verify**

```bash
rg -c 'style=\{' src/components/nav.tsx   # expect: no output
npm run build
```

Dev-server check, all four nav states: homepage top (transparent bg, cream links, white logo), homepage scrolled past the About section (white bg, dark links, black logo), any inner page (white bg, active link violet+underline), mobile menu open/close (hamburger animates, links correct colors).

- [ ] **Step 6: Commit**

```bash
git add src/components/nav.tsx && git commit -m "refactor: migrate nav to token classes with conditional variants"
```

### Task 9: Migrate footer

**Files:**
- Modify: `src/components/footer.tsx`

**Interfaces:** Consumes `bg-brand`, `text-cream` from Task 5.

- [ ] **Step 1: Apply these file-specific rules** (17 style blocks):

| Inline style | Replacement |
|---|---|
| `style={{ backgroundColor: "#6B46C1" }}` (footer container) | `bg-brand` |
| `style={{ color: "#FFF9F0", opacity: 0.9 }}` (11×) | `text-cream opacity-90` |
| `style={{ color: "#FFF9F0" }}` (3×) | `text-cream` |
| `style={{ backgroundColor: "#C4B5FD", color: "#6B46C1", fontWeight: 600 }}` (CTA button) | `bg-[#C4B5FD] text-heading font-semibold` — the light-violet has no token; keep exact |
| `style={{ borderColor: "rgba(255, 249, 240, 0.2)" }}` (divider) | `border-cream/20` (Tailwind opacity modifier on the Task 5 `cream` alias — 0.2 alpha of `#FFF9F0` exactly) |

- [ ] **Step 2: Verify**

```bash
rg -c 'style=\{' src/components/footer.tsx   # expect: no output
npm run build
```

Visual check of the footer on any page: violet background, cream text at correct opacity, CTA pill, divider hairline.

- [ ] **Step 3: Commit**

```bash
git add src/components/footer.tsx && git commit -m "refactor: migrate footer to token classes"
```

### Task 10: Stragglers sweep (mechanical swaps only)

**Files:**
- Modify (candidates): `src/components/calendarEvent.tsx`, `src/components/member.tsx`, `src/components/prof.tsx`, `src/components/PaperCard.tsx`, `src/components/ResearchList.tsx`, `src/app/events/page.tsx`, `src/app/resources/page.tsx`, `src/app/page.tsx`, `src/app/layout.tsx`

**Scope rule:** this task ONLY converts inline declarations that (a) exactly match a token `var()`/hex, or (b) are a near-miss snap (e.g. `#F9FAFB` → `bg-card-alt` whose value is `#FAFAFA`). Leave untouched: dynamic/computed styles (carousel transforms, ResearchList scroll-shadow opacities), and any value with no close token (e.g. `#6B7280` grey icons in calendarEvent — keep as `text-[#6B7280]` ONLY if trivially swappable, otherwise leave the inline style). When in doubt, leave it — this task must stay mechanical. Carousels (`CompanyCarousel`, `PhotoCarousel`, `NumbersCarousel`, `ScrollArrow`) are expected to keep their computed inline styles.

- [ ] **Step 1: Enumerate**

```bash
rg -n 'style=\{\{' src/ --glob '!src/components/*Carousel.tsx' --glob '!src/components/ScrollArrow.tsx'
```

- [ ] **Step 2: For each hit,** apply the Task 5–9 tables where a rule matches exactly; snap `#F9FAFB` → `bg-card-alt`, `#1A1A1A` → `text-primary`, `#6B46C1` → `text-heading`/`bg-brand`, `#8B5CF6` → `text-link`, `#F5F5F5` → `bg-card`. Skip everything else.

- [ ] **Step 3: Verify**

Run: `npm run build` — clean. Visual check `/events` and `/resources` plus the homepage.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "refactor: sweep remaining static inline styles onto tokens"
```

### Task 11: Rewrite DESIGN_SYSTEM.md

**Files:**
- Rewrite: `DESIGN_SYSTEM.md` (full replacement — current content describes the retired cream/Lora design)

- [ ] **Step 1: Replace the entire file** with:

```markdown
# WAISI.org Design System

The source of truth is `src/styles/globals.css` (CSS variables) plus the
Tailwind mappings in `tailwind.config.js`. Style components with the token
classes below — never inline `style={{}}` hex values.

## Palette

| Token | Value | Tailwind | Use |
|---|---|---|---|
| `--bg-page` | `#FFFFFF` | `bg-page` | Page background |
| `--bg-card` | `#F5F5F5` | `bg-card` | Card background |
| `--bg-card-alt` | `#FAFAFA` | `bg-card-alt` | Alternate card / event card |
| `--text-primary` | `#1A1A1A` | `text-primary` | Body text |
| `--text-heading` | `#6B46C1` | `text-heading`, `bg-brand` | Headings; brand violet as background (footer, nav hamburger) |
| `--text-link` | `#8B5CF6` | `text-link` | Links, buttons |
| `--border-subtle` | `#E0E0E0` | `border-subtle` | Hairline borders |
| `--shadow-card` | `0 2px 16px rgba(0,0,0,0.08)` | `shadow-card` | Card elevation |
| (alias) | `#FFF9F0` | `text-cream`, `bg-cream` | Legacy cream — ONLY for text/icons over the violet footer and the transparent-nav hero state |

One-off accents that intentionally stay off-token: maroon `#800000`
(research faculty accent), light violet `#C4B5FD` (footer CTA pill).

## Typography

- Stack: `"SF Pro Rounded", "SF Pro", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, sans-serif` (set on `body`), default weight 300.
- Headings: `h1` 2.8em, `h2` 1.9em, `h3` 1.5em, weight 550 (see `globals.css`).
- Radii: cards `rounded-card` (12px); nav shell `rounded-2xl` (16px).

## Component conventions

- Server components by default. `"use client"` only for interactivity:
  nav (scroll/menu state), carousels, `ScrollArrow`, `ResearchList` scroll shadows.
- Page copy lives in `src/content/*.ts`, not in component JSX, where practical.
- Data-driven pages (team, research, events) fetch server-side from Google
  Sheets/Calendar via `src/lib/google.ts` with ISR (1 h / 1 h / 15 min) and
  render an explicit error state when the fetch fails — never silently empty.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Shared external URLs live in `src/constants.ts`; redirects in `next.config.ts`
  import from it.
- Buttons: `.waisi-button` class (violet, 12px radius) via `components/button.tsx`
  / `handbook.tsx`.

## Future considerations

- Dark mode variant (tokens make this tractable: redefine the CSS variables
  under a `[data-theme="dark"]` scope).
- Migrate the remaining computed inline styles (carousels) if they ever grow.
```

- [ ] **Step 2: Verify claims against code** — spot-check that every token, radius, and ISR window named above matches `globals.css`, `tailwind.config.js`, and the three `get*.ts` files (`revalidate` exports).

- [ ] **Step 3: Commit**

```bash
git add DESIGN_SYSTEM.md && git commit -m "docs: rewrite DESIGN_SYSTEM.md to match the shipped token system"
```

### Task 12: Final verification suite

**Files:** none modified (fix-forward if anything fails, amending the responsible task's commit approach: make a new fix commit).

- [ ] **Step 1: Clean build**

Run: `npm run build`
Expected: zero errors/warnings of note; route list shows `/sitemap.xml`, no `/discord` etc. pages (they're redirects now).

- [ ] **Step 2: Grep gates**

```bash
rg -n 'style=\{' src/app/contact src/app/team src/app/research src/app/programs src/components/nav.tsx src/components/footer.tsx   # expect: no output
rg -n 'sitemap.xml' public/    # expect: no output (file deleted)
rg -ln 'components/program"' src/  # expect: no output
```

- [ ] **Step 3: HTTP smoke tests**

```bash
npm run dev &   # wait for Ready
curl -s http://localhost:3000/sitemap.xml | rg -c '<url>'          # expect: 7
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/robots.txt   # 200
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/llms.txt     # 200
for p in discord interest twitter instagram qrcode; do
  curl -s -o /dev/null -w "/$p %{http_code}\n" http://localhost:3000/$p     # 307 each
done
```

- [ ] **Step 4: Full visual pass** — with the dev server up, compare every page (`/`, `/programs`, `/events`, `/research`, `/resources`, `/team`, `/contact`) against production https://waisi.org side by side, desktop and ~390px mobile. Nav in all four states (Task 8 step 5 list). Expected: no perceptible differences anywhere.

- [ ] **Step 5: Prose-freeze audit**

```bash
git diff d8d29fa..HEAD -- src/content/ src/app | rg '^[+-][^+-]' | rg -v 'style=|className=|^\+*import|Link|</?\w+$' ; echo "content diff above (expect only markup-shape lines, no wording changes)"
```

Also skim `git diff --stat` — only expected files changed.

- [ ] **Step 6: Report** — summarize results to the user. Do NOT push; the maintainer reviews and pushes (push deploys production).
```
