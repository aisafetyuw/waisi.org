// Homepage content — edit copy here, not in the page components.

export type Opportunity = {
  title: string;
  description: string;
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    title: "Technical Fundamentals",
    description:
      "An eight-week research-oriented reading group on technical AI safety. Topics include reward specification, generalization, interpretability...",
  },
  {
    title: "Policy Fundamentals",
    description:
      "An eight-week reading group on the foundational governance and policy challenges posed by advanced AI systems. Topics include AI harms...",
  },
  {
    title: "Technical Upskilling",
    description:
      "Build foundational machine learning knowledge and get an overview of major AI safety topics. Receive a certificate of completion after finishing the program...",
  },
];

// Rendered wider, centered below the grid.
export const FEATURED_OPPORTUNITY: Opportunity = {
  title: "Safety Scholars Program",
  description:
    "Safety Scholars are our core groups of members engaged in AI safety work. Members meet weekly to discuss topics in either technical AI safety or AI policy over a provided meal...",
};

export type Project = {
  title: string;
  description: string;
};

export const CURRENT_PROJECTS: Project[] = [
  {
    title: "WAISI Technical AI Safety Workshop Program",
    description:
      "Most AI Safety communities introduce members who are interested in technical AI safety through the pipeline of Intro Technical Fellowship → Paper Reading Sessions → Alignment Research Engineer Accelerator program (ARENA)...",
  },
  {
    title: "Transferable Adversarial Materials (TAM)",
    description:
      "Within the past decade, small portable Unmanned Aerial Systems (UASs) operated by individual infantry units have been demonstrated to be vital assets on the battlefield in intelligence, surveillance...",
  },
];

export type PaperHighlight = {
  title: string;
  image: string;
  alt: string;
  link: string;
};

export const RESEARCH_HIGHLIGHTS: PaperHighlight[] = [
  {
    title:
      "Towards Interpretability Without Sacrifice: Faithful Dense Layer Decomposition with Mixture of Decoders",
    image: "/towards_interp.png",
    alt: "Towards Interpretability Without Sacrifice",
    link: "https://arxiv.org/pdf/2505.21364",
  },
  {
    title:
      "Debate or Vote: Which Yields Better Decisions in Multi-Agent Large Language Models?",
    image: "/Debate_or_Vote.webp",
    alt: "Debate or Vote",
    link: "https://arxiv.org/pdf/2508.17536",
  },
  {
    title:
      "Everything Everywhere All at Once: LLMs can In-Context Learn Multiple Tasks in Superposition",
    image: "/Everything_Everywhere.png",
    alt: "Everything Everywhere All at Once",
    link: "https://arxiv.org/pdf/2410.05603",
  },
];

export type Company = {
  name: string;
  logo: string;
  bgColor: string;
  website: string;
};

export const COLLABORATORS: Company[] = [
  { name: "UChicago XLab", logo: "/xlab_logo.jpeg", bgColor: "bg-red-50", website: "https://xrisk.uchicago.edu/" },
  { name: "Center for AI Safety", logo: "/cais_logo.jpeg", bgColor: "bg-blue-50", website: "https://www.safe.ai/" },
  { name: "Americans for Responsible Innovation", logo: "/americans_for_responsible_innovation_logo.jpeg", bgColor: "bg-green-50", website: "https://responsibleinnovation.org/" },
  { name: "MATS", logo: "/mats_logo.jpeg", bgColor: "bg-purple-50", website: "https://www.matsprogram.org/" },
  { name: "NYU Alignment Group", logo: "/nyu_logo.png", bgColor: "bg-purple-50", website: "https://wp.nyu.edu/arg/" },
  { name: "Stanford SAIL", logo: "/sail_logo.jpg", bgColor: "bg-red-50", website: "https://ai.stanford.edu/" },
  { name: "OpenNLP Labs", logo: "/opennlplabs_logo.jpeg", bgColor: "bg-indigo-50", website: "http://opennlplabs.org/" },
  { name: "EleutherAI", logo: "/eleuther_logo.png", bgColor: "bg-gray-50", website: "https://www.eleuther.ai/" },
  { name: "Meta", logo: "/meta_logo.jpeg", bgColor: "bg-blue-50", website: "https://about.meta.com/" },
  { name: "DeepSeek", logo: "/deepseek_logo.jpeg", bgColor: "bg-teal-50", website: "https://www.deepseek.com/" },
  { name: "Cooperative AI Foundation", logo: "/cooperative_ai.jpeg", bgColor: "bg-green-50", website: "https://www.cooperativeai.com/" },
  { name: "Anthropic", logo: "/labs/anthropic.webp", bgColor: "bg-orange-50", website: "https://www.anthropic.com/" },
  { name: "FAR.AI", logo: "/far_ai_logo.jpeg", bgColor: "bg-purple-50", website: "https://far.ai/" },
  { name: "Google", logo: "/google_logo.jpeg", bgColor: "bg-blue-50", website: "https://www.google.com/" },
  { name: "Microsoft", logo: "/microsoft_logo.jpeg", bgColor: "bg-gray-50", website: "https://www.microsoft.com/" },
  { name: "Apple", logo: "/apple_logo.jpeg", bgColor: "bg-gray-50", website: "https://www.apple.com/" },
  { name: "Amazon", logo: "/amazon_logo.jpeg", bgColor: "bg-yellow-50", website: "https://www.amazon.com/" },
];

export type Sponsor = {
  name: string;
  logo: string;
  alt: string;
  website: string;
};

export const SPONSORS: Sponsor[] = [
  {
    name: "Kairos",
    logo: "/kairos_logo.jpeg",
    alt: "KAIROS Logo",
    website: "https://kairos-project.org",
  },
  {
    name: "UW-Madison Computer Sciences",
    logo: "/uw_madison_computer_sciences_logo.jpeg",
    alt: "UW Madison Computer Sciences Logo",
    website: "https://www.cs.wisc.edu/",
  },
];
