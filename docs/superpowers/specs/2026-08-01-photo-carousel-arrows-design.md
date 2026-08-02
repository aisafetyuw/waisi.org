# PhotoCarousel arrow controls — design

**Date:** 2026-08-01
**Scope:** `src/components/PhotoCarousel.tsx` only.

## Goal

Add a left arrow and a right arrow to the landing-page photo carousel (under the
mission statement). The arrows let a visitor move through the photos without
dragging or using the dots.

## Design

- **Placement:** overlaid inside the photo frame, vertically centered at the
  left and right edges, `z-10` (same layer as the dot indicators).
- **Wiring:** the buttons call the existing `goToPrevious` / `goToNext`
  functions. No new navigation logic.
- **Style:** cream-over-photo treatment per `DESIGN_SYSTEM.md`. Each button is
  a circle with a translucent ink background (`bg-black/35`, darker on hover),
  a cream FontAwesome chevron (`faChevronLeft` / `faChevronRight`), and no
  shadow.
- **Behavior:** clicks call `stopPropagation` so they do not start a drag.
  Desktop hover already pauses auto-rotation. For touch (no hover), a tap also
  pauses rotation briefly via the existing `setIsPaused` + timeout pattern.
- **Accessibility:** real `<button>` elements with
  `aria-label="Previous photo"` / `aria-label="Next photo"`.
- **Visibility:** always visible on all viewports. No fade-in on hover.

## Out of scope

- No changes to photo content, auto-rotation timing, drag behavior, or dots.
- No changes to other carousels (CompanyCarousel, NumbersCarousel).

## Verification

- `npm run build` passes.
- Manual check in the dev server: arrows navigate correctly, drag and dots
  still work, auto-rotation resumes after interaction.
