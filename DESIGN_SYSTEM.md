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
