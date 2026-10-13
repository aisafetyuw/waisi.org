// Programs page content — edit copy here, not in the page component.
// CTA hrefs derive from APPLICATION_CYCLE in constants.ts: when the cycle is
// closed, application CTAs fall back to the interest form.

import {
  APPLICATION_CYCLE,
  Handbooks,
  Curricula,
  PROJECTS_RFP,
} from "@/constants";

export type Program = {
  title: string;
  what: string;
  commitment: string;
  audience: string;
  cta: { label: string; href: string };
  handbookUrl?: string;
  curriculumUrl?: string;
  // Optional sub-section rendered inside the card (Scholars' Projects).
  projects?: {
    title: string;
    summary: string;
    facts: { label: string; value: string }[];
    cta?: { label: string; href: string };
    rfpUrl: string;
    open: boolean;
  };
};

// Fellowship applications (both fellowship tracks) now run through the
// on-site /apply page — a Fillout embed — regardless of cycle state, so the
// old cycle-aware `open` switch is no longer referenced here. Kept commented
// for an easy revert.
// const open = APPLICATION_CYCLE.status === "open";
const notify = {
  label: "Get notified",
  href: APPLICATION_CYCLE.interestFormUrl,
};
// Fellowship apps are closed (Oct 2026), so both fellowship cards point back at
// the interest form. Restore `cta: applyToFellowship` when they reopen.
// const applyToFellowship = { label: "Apply", href: "/apply" };

export const PROGRAMS: Program[] = [
  {
    title: "Technical Fellowship",
    what: "A six-week reading group on technical AI safety — reward specification, generalization, interpretability, unlearning, and career explorations — based on the BlueDot Alignment course.",
    commitment: "2 hr/week sessions + ≤1 hr prep, 6 weeks",
    audience:
      "Anyone curious about technical AI safety; ML experience encouraged but not required",
    // Was a cycle-aware CTA ("Get notified" → interest form while closed,
    // "Apply" → Google Form while open). Then the on-site /apply embed;
    // now back to the interest form while apps are closed (docs/ARCHIVE.md):
    // cta: open
    //   ? { label: "Apply", href: APPLICATION_CYCLE.techFormUrl }
    //   : notify,
    cta: notify,
    handbookUrl: Handbooks.FELLOWSHIP,
    curriculumUrl: Curricula.TECHNICAL_FUNDAMENTALS,
  },
  {
    title: "Policy Fellowship",
    what: "A six-week reading group on AI governance — AI harms, economic and social impacts, responsible scaling, open vs. closed source — based on the BlueDot Governance course.",
    commitment: "2 hr/week sessions + ≤1 hr prep, 6 weeks",
    audience:
      "Anyone interested in AI policy; a public-policy background is encouraged but not required",
    // Was a cycle-aware CTA ("Get notified" → interest form while closed,
    // "Apply" → Google Form while open). Then the on-site /apply embed;
    // now back to the interest form while apps are closed (docs/ARCHIVE.md):
    // cta: open
    //   ? { label: "Apply", href: APPLICATION_CYCLE.policyFormUrl }
    //   : notify,
    cta: notify,
    handbookUrl: Handbooks.FELLOWSHIP,
    curriculumUrl: Curricula.POLICY_FUNDAMENTALS,
  },
  {
    title: "Technical Upskilling",
    what: "Build a strong foundation in machine learning and a working overview of the major topics in AI safety, with a certificate on completion.",
    commitment: "Self-paced with weekly support",
    audience:
      "Members preparing to participate effectively in technical Safety Scholars sessions",
    cta: {
      label: "Express interest",
      href: APPLICATION_CYCLE.upskillingInterestUrl,
    },
    handbookUrl: Handbooks.UPSKILLING_DETAILS,
  },
  {
    title: "Safety Scholars",
    what: "Our core member group: weekly technical or policy discussions over a provided meal, with office hours, skill-building, and priority access to opportunities and projects.",
    commitment: "Weekly meetings, semester-long",
    audience:
      "Standout intro-program graduates and students with strong AI safety background",
    cta: notify,
    handbookUrl: Handbooks.SAFETY_SCHOLARS,
    // Driven by PROJECTS_RFP (status, deadline, links); see docs/ARCHIVE.md
    // for how to close/archive the RFP.
    projects: {
      title: "Scholars' Projects",
      summary:
        "Eight-week mentored AI safety projects: small teams of mentees (fellowship and cohort graduates) work with an experienced mentor on a real project. Every project ends in a concrete output and a showcase.",
      open: PROJECTS_RFP.status === "open",
      facts: [
        { label: "Length", value: "8 weeks · Oct 28 – Dec 22" },
        { label: "Funding", value: "Up to $1,000 per project" },
        { label: "Projects", value: "Up to 4 funded" },
        PROJECTS_RFP.status === "open"
          ? { label: "Proposals due", value: PROJECTS_RFP.deadline }
          : {
              label: "Proposers",
              value: "Leadership, scholars, grad students",
            },
      ],
      cta:
        PROJECTS_RFP.status === "open"
          ? { label: "Submit a proposal", href: PROJECTS_RFP.formUrl }
          : undefined,
      rfpUrl: PROJECTS_RFP.rfpUrl,
    },
  },
];
