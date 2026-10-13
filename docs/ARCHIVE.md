# Site change archive

A log of seasonal swaps (application cycles, RFPs, banners) and how to undo
them. Old markup is also left commented out in place, next to a pointer back
here. Add a new dated entry at the top whenever you make a swap like this.

---

## 2026-10-12: Fellowship apps closed, Scholars' Projects RFP opened

### Config (start here)

Everything below reads from two objects in `src/constants.ts`:

| Constant | What it controls |
|---|---|
| `APPLICATION_CYCLE` | Fellowship cycle state and form URLs; `interestFormUrl` is the "Get notified" target |
| `PROJECTS_RFP` | Scholars' Projects `status`, `deadline`, `rfpUrl` (Google Doc), `formUrl` (Airtable) |

### 1. Fellowship cards: Apply → Get notified

- **File:** `src/content/programs.ts`
- **Change:** Technical and Policy Fellowship `cta` changed from
  `applyToFellowship` (on-site `/apply` Fillout embed) to `notify` (the
  interest Google Form, `INTEREST_URL`).
- **Revert when apps reopen:** uncomment
  `const applyToFellowship = { label: "Apply", href: "/apply" };` and set both
  fellowship entries back to `cta: applyToFellowship`. Then update the Fillout
  form behind `/apply` (`src/app/apply/ApplyEmbed.tsx`) if it changed.

### 2. Floating banner: "Applications open" → project proposals

- **File:** `src/components/FloatingApplyButton.tsx`
- **Change:** The bottom-right pill was "Applications open now! Click here to
  apply." and linked to `/apply`. It now reads "Project proposals are open!
  Submit an idea." (mobile: "Submit a project") and links to the Airtable form
  (`PROJECTS_RFP.formUrl`) in a new tab. The banner hides itself when
  `PROJECTS_RFP.status` is `"closed"`. The dismiss key was renamed to
  `waisi:projects-rfp-cta-dismissed`, so visitors who dismissed the old banner
  still see this one.
- **Revert:** restore the commented-out `<Link href="/apply">` block in that
  file, re-add the `Link` / `usePathname` imports and the `/apply` path check,
  and change the dismiss key back (or to a new one per cycle).

### 3. /programs: Scholars' Projects inside the Safety Scholars card

- **Files:** `src/content/programs.ts` (`projects` block on the Safety
  Scholars entry), `src/components/ProgramsFunnel.tsx` (renders it in
  `ProgramCard`)
- **Change:** The funnel still has three rows. Clicking Safety Scholars opens
  its card with a "Scholars' Projects" sub-panel that shows key facts, the
  deadline, "Submit a proposal" (Airtable) and "Read the RFP". The deadline
  and submit button hide when `PROJECTS_RFP.status` is `"closed"`.
- **Remove:** delete the `projects` field from the Safety Scholars entry. The
  card skips the panel when that field is absent.

### 4. /research: Scholars' Projects section

- **Files:** `src/app/research/page.tsx` (`ScholarsProjects()` component,
  above SPAR Projects), `src/content/research.ts` (all copy:
  `SCHOLARS_PROJECTS_INTRO`, `_STATS`, `SCHOLARS_PROJECT_TYPES`,
  `SCHOLARS_TIMELINE`, `SCHOLARS_PROPOSERS`, `SCHOLARS_CONTACT_EMAIL`)
- **Change:** The section has:
  - an intro beside four key stats
  - six project-type cards
  - a timeline that highlights the next milestone
  - who can propose
  - a CTA bar with Submit, the RFP and a questions email

  When the RFP is closed, the submit button, the "Due" stat and the timeline
  highlight are hidden.
- **Collapsed by default:** a compact card with the intro, stats, "Submit a
  proposal" and a "More info" toggle (native `<details>`, no JS). Expanding it
  shows the project types, timeline, proposers, the RFP link and the email.
- **Next cycle:** edit the dates in `SCHOLARS_TIMELINE` and change the F26
  pill. Once projects are chosen, the section can turn into cards for the
  funded projects, like the SPAR ones.
- **Remove:** delete the `<ScholarsProjects />` call and the component.

### 5. /apply: closed notice

- **File:** `src/app/apply/page.tsx`
- **Change:** The page is gated on `APPLICATION_CYCLE.status`. While it is
  `"closed"`, the Fillout embed is replaced by "Fellowship applications are
  closed", a "Get notified" button (interest form), the curriculum links, and
  a Scholars' Projects card while `PROJECTS_RFP` is open.
- **Revert when apps reopen:** set `APPLICATION_CYCLE.status = "open"` (and
  `deadline`) in `src/constants.ts`. The original header and form come back.
  Note that this flag now actually controls /apply; before this change, /apply
  ignored it.

### 6. "Proposals open" pill colour

- **File:** `src/components/ProgramsFunnel.tsx` (`ProjectsBlock`)
- **Change:** The pill is green (`text-emerald-800 bg-emerald-50
  border-emerald-600`) instead of violet. Green is the site's only "status:
  open" colour.

### When the RFP closes (after Oct 18, 2026)

1. Set `PROJECTS_RFP.status = "closed"` in `src/constants.ts`. This hides:
   - the floating banner
   - the /apply projects card
   - the "Proposals open" pill
   - every "Submit a proposal" button and deadline

   The Safety Scholars panel then shows "Proposers" in place of the deadline.
2. Optionally list the funded projects in the /research section.

## Reference: links in use (Oct 2026)

- Interest form: `INTEREST_URL` in `src/constants.ts`
- RFP doc: https://docs.google.com/document/d/1O0z5kGK6K-NOElRKu__zcgfW0CsP7vCcIYsZSAHTpSc/edit?tab=t.8ni5omp9szkh
- Proposal form: https://airtable.com/appLKxqFeGT6WLmkN/pagtqRwex5BrO6ozg/form
