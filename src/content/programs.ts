// Programs page content — edit copy here, not in the page component.
// CTA hrefs derive from APPLICATION_CYCLE in constants.ts: when the cycle is
// closed, application CTAs fall back to the interest form.

import { APPLICATION_CYCLE, Handbooks } from "@/constants";

export type Program = {
  title: string;
  what: string;
  commitment: string;
  audience: string;
  cta: { label: string; href: string };
  handbookUrl?: string;
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
const applyToFellowship = { label: "Apply", href: "/apply" };

export const PROGRAMS: Program[] = [
  {
    title: "Technical Fellowship",
    what: "An eight-week reading group on technical AI safety — reward specification, generalization, interpretability, unlearning, and career explorations — based on the BlueDot Alignment course.",
    commitment: "2 hr/week sessions + ≤1 hr prep, 8 weeks",
    audience:
      "Anyone curious about technical AI safety; ML experience encouraged but not required",
    // Was a cycle-aware CTA ("Get notified" → interest form while closed,
    // "Apply" → Google Form while open). Now always the on-site embed:
    // cta: open
    //   ? { label: "Apply", href: APPLICATION_CYCLE.techFormUrl }
    //   : notify,
    cta: applyToFellowship,
    handbookUrl: Handbooks.FELLOWSHIP,
  },
  {
    title: "Policy Fellowship",
    what: "An eight-week reading group on AI governance — AI harms, economic and social impacts, responsible scaling, open vs. closed source — based on the BlueDot Governance course.",
    commitment: "2 hr/week sessions + ≤1 hr prep, 8 weeks",
    audience:
      "Anyone interested in AI policy; a public-policy background is encouraged but not required",
    // Was a cycle-aware CTA ("Get notified" → interest form while closed,
    // "Apply" → Google Form while open). Now always the on-site embed:
    // cta: open
    //   ? { label: "Apply", href: APPLICATION_CYCLE.policyFormUrl }
    //   : notify,
    cta: applyToFellowship,
    handbookUrl: Handbooks.FELLOWSHIP,
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
  },
];
