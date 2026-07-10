# WAISI.org Polish Pass — Design Spec

**Date:** 2026-07-10
**Scope:** Conservative polish of waisi.org — bug fixes, styling consolidation, doc rewrite. No visual redesign, no new features.

## Hard constraint: prose freeze

All user-facing copy stays byte-for-byte unchanged. This covers every text string in `src/content/*.ts`, page JSX, nav/footer labels, and metadata descriptions. The maintainer will edit prose separately. The only textual edits allowed are in developer docs (`README.md`, `DESIGN_SYSTEM.md`) and factual corrections to `llms.txt`'s description of the *design* (it still describes the retired cream/Lora theme); mission wording in `llms.txt` stays as-is.

## 1. Bug & stale-artifact cleanup

| Item | Action |
|---|---|
| `public/sitemap.xml` | Delete. Stale (dated 2025-09-21, lists nonexistent `/about`). `src/app/sitemap.ts` becomes the single sitemap source; verify it lists all seven indexable routes (`/`, `/programs`, `/events`, `/research`, `/resources`, `/team`, `/contact`). |
| Redirect stubs (`src/app/{discord,interest,twitter,instagram,qrcode}/`) | Delete the five meta-refresh stub pages. Add equivalent permanent redirects in `next.config.js` `redirects()`, destinations taken from `src/constants.ts` (import them — don't duplicate the URLs). Keep the paths listed in `robots.txt` Disallow. |
| `llms.txt` | Move from repo root to `public/llms.txt` so it is actually served. Correct its design-era descriptions; leave mission prose untouched. |
| `globals.css` | Remove dead `#about …` selectors (no `/about` page exists). Remove any other selectors that grep proves unreferenced. |
| `src/components/program.tsx` | Delete. Verified unimported (also removes the only `dangerouslySetInnerHTML` in the codebase). |
| `public/about/convert.sh` | Delete (stray build script being publicly served). |
| `tailwind.config.js` | Remove the vestigial `./src/pages/**` content glob. |
| `README.md` | Remove the stale `src/archive/` reference (folder was deleted in the July 2026 pass). |

## 2. Inline-style migration

Migrate remaining `style={{}}` inline values and id-scoped CSS on **team, research, contact, programs, nav, footer** (and any stragglers grep finds) onto the existing Tailwind token classes (`bg-page`, `bg-card`, `text-heading`, `text-link`, `shadow-card`, `rounded-card`, …).

- **Decision: snap to tokens.** Near-miss one-off values (e.g., a grey within a shade of the card grey) are unified onto the nearest token. Imperceptible visual shifts are acceptable; a value that is *meaningfully* different keeps its exact value via a Tailwind arbitrary class rather than distorting the token palette.
- No layout restructuring. This is a mechanical consolidation onto one styling system; DOM structure and spacing stay as they are except where a snapped token implies a trivial difference.

## 3. DESIGN_SYSTEM.md rewrite

Rewrite to document the shipped system, replacing the obsolete cream/Lora content:

- CSS-variable tokens in `src/styles/globals.css` and their Tailwind mappings in `tailwind.config.js`
- Palette: white page, grey cards, charcoal text, violet heading/link accents
- Type: SF Pro Rounded → system-ui stack, weight conventions
- Component conventions: server components by default, client components only for interactivity (carousels, nav, scroll effects); content lives in `src/content/*.ts`
- Keep "dark mode" listed as future work

## 4. Verification

1. `npm run build` passes clean.
2. Dev-server visual spot-check of every page against production waisi.org — no unintended visual change.
3. `/sitemap.xml` serves the dynamic sitemap; `/robots.txt` and `/llms.txt` serve correctly; all five redirect paths return 3xx to the correct destinations.
4. `git grep` confirms zero remaining `style={{` in the migrated components and no references to deleted files.

## Out of scope

Visual redesign, new content sections, prose edits, analytics, structured data, dark mode, replacing the Google Sheets/Calendar pipeline. (Candidates for a future "elevated evolution" pass.)
