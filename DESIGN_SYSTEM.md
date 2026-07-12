# WAISI.org Design System

The source of truth is `src/styles/globals.css` (CSS variables) plus the
Tailwind mappings in `tailwind.config.js`. Style components with the token
classes below — never inline `style={{}}` hex values.

The identity is editorial "ink on paper": serif headings, near-black text on
warm off-white, hairline borders instead of shadows, violet reserved for links
and CTAs.

## Palette

| Token | Value | Tailwind | Use |
|---|---|---|---|
| `--bg-page` | `#FAF9F7` | `bg-page` | Page background (warm off-white paper) |
| `--bg-card` | `#FFFFFF` | `bg-card` | Card surface — always with `border border-subtle` |
| `--bg-card-alt` | `#F3F1EC` | `bg-card-alt` | Tinted surface |
| `--bg-ink` | `#1C1B1A` | `bg-ink` | Dark surfaces (footer) |
| `--text-primary` | `#26241F` | `text-primary` | Body text |
| `--text-heading` | `#1C1B1A` | `text-heading` | Headings (ink, not violet) |
| `--text-link` | `#6D28D9` | `text-link`, `bg-brand` | Links; violet as background ONLY for CTA buttons |
| `--border-subtle` | `#E4E1DA` | `border-subtle` | Hairline borders |
| (alias) | `#FAF9F7` | `text-cream`, `bg-cream` | Text/icons over dark ink and the hero photo |

There are no card shadows: elevation is retired in favor of flat surfaces with
hairline borders (`bg-card border border-subtle rounded-card`).

## Typography

- **Headings:** Newsreader (serif), weights 500/600, loaded via `next/font`
  in `src/app/layout.tsx` as `--font-serif` (`font-serif`). `h1`–`h3` get it
  by default from `globals.css`; use `font-serif` for heading-styled spans.
- **Body:** Inter, weights 400/500/600, `--font-sans` (`font-sans`), default
  on `body` at weight 400.
- Scale: `h1` 2.6em, `h2` 1.8em, `h3` 1.3em (see `globals.css`).
- Long-form text blocks: constrain measure with `max-w-prose`.
- Radii: cards/buttons `rounded-card` (4px); nav shell `rounded-2xl` (16px).

## Buttons and CTAs

- Primary: `.waisi-button` (violet `--text-link` bg, white text, 4px radius) —
  via `components/button.tsx` or the class directly.
- Secondary/ghost (over photos): `border border-cream text-cream rounded-card`.
- The nav carries a persistent CTA whose label/href come from `primaryCta()`.

## Application cycle

`APPLICATION_CYCLE` in `src/constants.ts` is the single source of truth for
application status, deadline, and form URLs. Every deadline mention and CTA
state on the site derives from it — never hardcode a dated deadline in a page.
Flip `status` to `"open"` (and set `deadline`) each semester; when `closed`,
apply CTAs fall back to the interest form.

## Component conventions

- Server components by default. `"use client"` only for interactivity:
  nav (scroll/menu state), carousels, `ScrollArrow`, `ResearchList`/resources
  scroll shadows.
- Page copy lives in `src/content/*.ts` (`home.ts`, `programs.ts`,
  `research.ts`), not in component JSX, where practical.
- Data-driven pages (team, research, events) fetch server-side from Google
  Sheets/Calendar via `src/lib/google.ts` with ISR (1 h / 1 h / 15 min) and
  render an explicit error state when the fetch fails — never silently empty.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Shared external URLs live in `src/constants.ts`; redirects in `next.config.ts`
  import from it.

## Accepted off-token exceptions

- Computed inline styles in the carousels and resources scroll-shadow logic.
- The hero image overlay (`bg-black/45`) and hero inline sizing in
  `src/app/page.tsx`.

## Future considerations

- Dark mode variant (tokens make this tractable: redefine the CSS variables
  under a `[data-theme="dark"]` scope).
