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

const open = APPLICATION_CYCLE.status === "open";
const notify = {
  label: "Get notified",
  href: APPLICATION_CYCLE.interestFormUrl,
};

export const PROGRAMS: Program[] = [
  {
    title: "Technical Fundamentals",
    what: "An eight-week reading group on technical AI safety — reward specification, generalization, interpretability, unlearning, and career explorations — based on the BlueDot Alignment course.",
    commitment: "2 hr/week sessions + ≤1 hr prep, 8 weeks",
    audience:
      "Anyone curious about technical AI safety; ML experience encouraged but not required",
    cta: open
      ? { label: "Apply", href: APPLICATION_CYCLE.techFormUrl }
      : notify,
    handbookUrl: Handbooks.FELLOWSHIP,
  },
  {
    title: "Policy Fundamentals",
    what: "An eight-week reading group on AI governance — AI harms, economic and social impacts, responsible scaling, open vs. closed source — based on the BlueDot Governance course.",
    commitment: "2 hr/week sessions + ≤1 hr prep, 8 weeks",
    audience:
      "Anyone interested in AI policy; a public-policy background is encouraged but not required",
    cta: open
      ? { label: "Apply", href: APPLICATION_CYCLE.policyFormUrl }
      : notify,
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
