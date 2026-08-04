import { ProfProps } from "@/types";

export type SparProject = {
  title: string;
  link: string;
  waisiMentor: string; // the WAISI member/alum to highlight
  waisiMentorLink: string;
  coMentors?: string;
  description: string;
};

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
      "Produces short, accessible content on AI safety — written explainers, videos, and interactive demos on topics like sleeper agents and AI control — built for distribution across academic and policy channels.",
  },
  {
    title:
      "Studying Catastrophic AI Misuse: Harm Uplift Measurement and Red-Teaming for Dangerous Knowledge",
    link: "https://sparai.org/projects/f26/recs0II21LeSn5B7F",
    waisiMentor: "Max Kamachee",
    waisiMentorLink: "https://www.maxkamachee.com/",
    coMentors: "John Kitaoka",
    description:
      "Studies how task-decomposition attacks can extract dangerous dual-use knowledge from frontier models, and builds measurement techniques and detection tools that help AI providers harden their defenses.",
  },
  {
    title:
      "Automated Evaluations and Behavioral Discovery for Multi-Agent Systems",
    link: "https://sparai.org/projects/f26/recs4Td7KwmajVB09",
    waisiMentor: "William Anderson",
    waisiMentorLink: "https://www.wlanderson.com/",
    coMentors: "Joss Oliver",
    description:
      "Extends safety-auditing tools like Petri, Bloom, and Prism to multi-agent systems, enabling discovery of safety-relevant emergent behavior and measurement of propensities like collusion and coercion.",
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
