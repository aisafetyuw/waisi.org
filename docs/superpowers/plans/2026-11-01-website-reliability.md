# Website Reliability Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Track verification below.

**Goal:** Fix the issues from the repository review, starting with event dates and spreadsheet validation.

**Architecture:** Keep Next.js, Google Sheets, and Fillout. Resolve event years from the calendar title or explicit dates; validate spreadsheet rows before page rendering. Keep interactive changes small.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Node test runner with tsx, ESLint.

**Spec:** The repository audit and the user's instruction to fix its findings in this chat.

## Global Constraints

- Work in the existing checkout on `fix/website-data-and-accessibility`.
- Preserve current application availability while centralizing its controls.
- Do not change the external spreadsheets, publish, or deploy.
- Commit and push the feature branch after verification, as the user subsequently requested. Do not merge or deploy.
- Use a neutral initials fallback for missing photos; do not invent a portrait.

## Review Focus

- Old semester sheets must stay old after New Year's Day.
- Explicit dates must support a calendar that crosses calendar years.
- Madison's local date must respect daylight saving time.
- Blank and incomplete spreadsheet rows must not crash a page or create unsafe links.
- Hidden mobile navigation must not retain keyboard focus; closed applications must use the interest form.

## Task 1: Event dates

**Files:** `src/lib/calendarEvents.ts`, `tests/calendarEvents.test.ts`, `package.json`, `package-lock.json`.

- [x] Add regression tests for past events, semester years, explicit dates, invalid dates, invalid CSV structure, and Central time boundaries.
- [x] Run the tests against the old parser and confirm failures.
- [x] Resolve yearless dates from the calendar title. Require explicit years when the title is ambiguous. Filter past events without changing their year.
- [x] Run the calendar tests and confirm success.

## Task 2: Spreadsheet validation

**Files:** `src/lib/sheetRows.ts`, both Google Sheets loaders, `tests/sheetRows.test.ts`.

- [x] Add tests for blank rows, invalid required fields, optional fields, supported team values, and safe HTTP(S) links.
- [x] Extract pure `parseMemberRows(rows: unknown[]): MemberData[]` and `parseResearchRows(rows: unknown[]): ResearchData[]` parsers from the current loaders. Confirm tests fail before adding validation.
- [x] Skip malformed rows, normalize text, and return safe optional values. Use the parsers in both loaders.
- [x] Run the spreadsheet tests and confirm success.

## Task 3: Visitor controls and photographs

**Files:** navigation, member photo component, application constants/content/components, application page, and focused application-state tests.

- [x] Use a real mobile menu button, hide closed links from focus, and support Escape and focus return.
- [x] Provide initials when a member photo fails to load. Give icon links accessible names.
- [x] Centralize fellowship availability and links while preserving the currently open form. Test both open and closed states.
- [x] Check the interactions in a browser and include `/apply` in the sitemap.

## Task 4: Checks and maintenance

**Files:** ESLint config, package scripts/lock, README, environment example, design guide, public site summary, and obsolete components.

- [x] Replace `next lint` with the ESLint CLI and resolve reported source issues.
- [x] Remove the five components with no active imports and their obsolete styles/dependency.
- [x] Update documentation to match the CSV source, refresh periods, application controls, and photo fallback.
- [x] Run regression tests, lint, TypeScript, and the production build. Inspect generated data pages.
- [x] Request an independent review and address substantive findings.

## Verification record

- Calendar regression run: 8 failures before the fix; all 10 calendar tests pass afterward.
- Spreadsheet regression run: 5 failures before validation; all 7 spreadsheet tests pass afterward.
- Application regression run: both state tests fail before the fix and pass afterward.
- Final checks: all 19 tests, ESLint, TypeScript, production build, and git diff whitespace checks pass.
- Current source data: the public calendar contains only past events. Generated events page correctly shows the empty upcoming state; team and research render without load errors.
- Browser checks at 390px and 1280px: Enter opens the menu, focus starts on Home, Tab from Contact reaches Close, Tab wraps, Escape returns focus, the current-page link closes correctly, and a desktop resize restores scrolling and visible focus.
- Browser check: Kaden Johnson's missing photograph displays initials; the application banner opens the Fillout page.
- Independent review found a covered-logo keyboard focus issue. The fix removes that logo from the open menu's tab order. Browser checks confirm the fix.
- Checks do not submit the Fillout form or deploy to Netlify. GitHub Actions will run after the branch is pushed.
- Existing untracked AGENTS.md and CLAUDE.md belong to the initial checkout and stay outside the commit. The user requested a commit and push of fix/website-data-and-accessibility after the implementation review.

## Integration into current main

The user subsequently authorized merging into `main` and pushing for deployment. The merge includes upstream main at `908541b`, which added coffee chats, the Scholars' Projects proposal campaign, and the closed fellowship cycle after this work's original base.

- Preserve the upstream coffee-chat routes, booking navigation, project proposal banner, alumni portraits, and closed fellowship state.
- Combine the website regression tests with the existing coffee-chat tests: all 87 tests pass.
- Clean dependency installation, ESLint, TypeScript, and the production build pass. The local environment keeps coffee chats disabled; production retains its existing release settings.
- Browser checks at 390px, 900px, and 1280px confirm the closed application notice, booking link, keyboard menu focus loop, Escape, and desktop focus/scroll restoration.
- Sample the research timeline clock in the server page and pass its value into the timeline component. Document the intentional hourly server clock read with a scoped lint exception.
- The upstream ignore rules cover the generated AGENTS.md and CLAUDE.md files; neither file enters this merge.
