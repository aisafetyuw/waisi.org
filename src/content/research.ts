import { ProfProps } from "@/types";

export type SparProject = {
  title: string;
  link: string;
  waisiMentor: string; // the WAISI member/alum to highlight
  waisiMentorLink: string;
  coMentors?: string;
  description: string;
  tags: string[]; // topic tags as shown on the SPAR project page
};

// Scholars' Projects section at the top of /research — edit here, not in the
// page. Items marked openOnly are hidden once PROJECTS_RFP.status is not "open".
export const SCHOLARS_PROJECTS_INTRO =
  "Eight-week mentored AI safety projects for WAISI fellowship and cohort graduates. Small teams of mentees work with an experienced mentor on a real project; the priority is mentee growth, and every project ends in a concrete output plus a showcase.";

export type ScholarsStat = {
  value: string;
  label: string;
  openOnly?: boolean;
};

export const SCHOLARS_PROJECTS_STATS: ScholarsStat[] = [
  { value: "8 weeks", label: "mentored project" },
  { value: "$1,000", label: "per project" },
  { value: "Up to 4", label: "funded projects" },
  { value: "Due Oct 18", label: "11:59 PM CST", openOnly: true },
];

export type ScholarsProjectType = { title: string; description: string };

export const SCHOLARS_PROJECT_TYPES: ScholarsProjectType[] = [
  {
    title: "Original research",
    description: "A new technical or policy question.",
  },
  {
    title: "Replications",
    description: "Reproduce a published safety result, then extend it.",
  },
  {
    title: "Tooling",
    description: "Software that makes safety work easier.",
  },
  {
    title: "Evaluations & datasets",
    description: "Measure behaviors existing benchmarks miss.",
  },
  {
    title: "Explainers & demos",
    description: "Make a safety idea understandable, often interactively.",
  },
  {
    title: "Memos & briefs",
    description: "Policy analysis with recommendations.",
  },
];

export type ScholarsMilestone = {
  date: string; // ISO date (end of that day, Central time)
  label: string;
  detail?: string;
};

export const SCHOLARS_TIMELINE: ScholarsMilestone[] = [
  { date: "2026-10-07", label: "RFP opens" },
  { date: "2026-10-18", label: "Proposals due", detail: "11:59 PM CST" },
  { date: "2026-10-26", label: "Interviews end" },
  { date: "2026-10-28", label: "Projects start" },
  { date: "2026-11-17", label: "Week 3 checkpoint" },
  { date: "2026-12-08", label: "Week 6 checkpoint" },
  { date: "2026-12-22", label: "Project deadline" },
];

export const SCHOLARS_PROPOSERS: string[] = [
  "WAISI leadership",
  "Current and past scholars",
  "Graduate students and postgrads",
  "Cohort members co-proposing with a leadership member",
];

export const SCHOLARS_CONTACT_EMAIL = "aisafetyuw@gmail.com";

// SPAR projects mentored by WAISI members and alumni, shown at the top of
// /research — edit here, not in the page.
export const SPAR_PROJECTS: SparProject[] = [
  {
    title: "AI Safety Said Simply",
    link: "https://sparai.org/projects/f26/recK4NKaFBvAEznFB/",
    waisiMentor: "Kaustubh Kislay",
    waisiMentorLink: "https://kaustubhais.com",
    coMentors: "Christine Corry",
    description:
      "Produces short, accessible content on AI safety — explainers, videos, and interactive demos on topics like sleeper agents and AI control — for academic and policy audiences.",
    tags: ["Generalist", "Communications"],
  },
  {
    // Display title shortened for the card; the full title lives on the SPAR page.
    title: "Red-Teaming Catastrophic AI Misuse",
    link: "https://sparai.org/projects/f26/recs0II21LeSn5B7F",
    waisiMentor: "Max Kamachee",
    waisiMentorLink: "https://www.maxkamachee.com/",
    coMentors: "John Kitaoka",
    description:
      "Studies how task-decomposition attacks extract dangerous dual-use knowledge from frontier models, and builds measurement and detection tools that help AI providers harden their defenses.",
    tags: ["Misuse risk", "Evaluations", "Behavioral evaluation of LLMs"],
  },
  {
    title: "Multi-Agent Evaluations and Behavioral Discovery",
    link: "https://sparai.org/projects/f26/recs4Td7KwmajVB09",
    waisiMentor: "William Anderson",
    waisiMentorLink: "https://www.wlanderson.com/",
    coMentors: "Joss Oliver",
    description:
      "Extends safety-auditing tools like Petri, Bloom, and Prism to multi-agent systems, enabling discovery of safety-relevant emergent behavior and measurement of propensities like collusion and coercion.",
    tags: ["Multi-agent systems", "Evaluations", "Behavioral evaluation of LLMs"],
  },
];

// Faculty collaborators shown on /research — edit here, not in the page.
export const FACULTY_COLLABORATORS: ProfProps[] = [
  {
    name: "Sharon Li",
    link: "https://pages.cs.wisc.edu/~sharonli/",
    focus:
      "Algorithmic and theoretical foundations of reliable machine learning",
    extra: "Associate Professor in the Department of Computer Sciences",
  },
  {
    name: "Grigorios Chrysos",
    link: "https://grigorisg9gr.github.io/_pages/about/",
    focus: "Learning (robust) representations and generative modeling",
    extra: "Assistant Professor",
  },
  {
    name: "Fred Sala",
    link: "https://pages.cs.wisc.edu/~fredsala/",
    focus: "Fundamentals of data-driven systems and machine learning",
    extra: "Assistant Professor in the Department of Computer Sciences",
  },
  {
    name: "Kangwook Lee",
    link: "https://kangwooklee.com/",
    focus: "Theory and algorithms for deep learning with foundation models",
    extra:
      "Associate Professor in the Electrical and Computer Engineering Department",
  },
  {
    name: "Junjie Hu",
    link: "https://junjiehu.github.io/",
    focus: "Natural language processing and machine learning",
    extra: "Assistant Professor in the Department of Computer Sciences",
  },
  {
    name: "Dimitris Papailiopoulos",
    link: "https://papail.io/",
    focus: "Machine learning, coding theory, and optimization",
    extra:
      "Associate Professor in the Electrical and Computer Engineering Department",
  },
  {
    name: "Vikas Singh",
    link: "https://www.biostat.wisc.edu/~vsingh/",
    focus: "Image analysis, computer vision, and ML in biostatistics",
    extra: "Professor in the Department of Biostatistics",
  },
  {
    name: "Patrick McDaniel",
    link: "https://patrickmcdaniel.org/",
    focus: "Mobile security, adversarial ML, and systems security research",
    extra: "Professor in the Department of Computer Sciences",
  },
  {
    name: "Josiah Hanna",
    link: "https://pages.cs.wisc.edu/~jphanna/",
    focus: "Reinforcement learning and autonomous agents",
    extra: "Assistant Professor in the Department of Computer Sciences",
  },
  {
    name: "Ramya Vinayak",
    link: "https://ramyakv.github.io/",
    focus: "Machine learning, statistical inference, and crowdsourcing",
    extra: "Assistant Professor in the ECE Department",
  },
  {
    name: "Somesh Jha",
    link: "https://pages.cs.wisc.edu/~jha/",
    focus: "Adversarial machine learning, privacy, and formal methods",
    extra: "Professor in the Department of Computer Sciences",
  },
  {
    name: "Yiqiao Zhong",
    link: "https://pages.stat.wisc.edu/~zhong35/",
    focus:
      "LLM evaluations, high dimensional statistics, and deep learning theory",
    extra: "Assistant Professor in the Department of Statistics",
  },
];
