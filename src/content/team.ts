import { AdvisorData, AlumnusData } from "@/types";

// Former WAISI members and where they've gone — edit here, not in the page.
// The leadership roster is sheet-backed (see src/app/team/getMembers.ts); this
// list is static, so add a headshot to /public/alumni when you add a person.
// `previously` runs most-recent-first and ends with the person's WAISI role.
// The club's faculty advisor(s) — rendered as a centered card on the team
// page. Add a 400×400 headshot to /public/advisors when you add a person.
export const FACULTY_ADVISORS: AdvisorData[] = [
  {
    name: "Junjie Hu",
    link: "https://junjiehu.github.io/",
    position: "Assistant Professor in the Department of Computer Sciences",
    photo: "junjie_hu",
  },
];

export const NOTABLE_ALUMNI: AlumnusData[] = [
  {
    name: "Jeremy Kintana",
    role: "Generalist @ Kairos",
    previously: "Mentor @ PathFinder, Director @ WAISI",
    photo: "jeremy_kintana",
  },
  {
    name: "Ben Hayum",
    role: "Research Assistant @ CNAS",
    previously: "Research Fellow @ MATS, Director @ WAISI",
    photo: "ben_hayum",
  },
  {
    name: "Will Anderson",
    role: "Research Strategist @ CAIF",
    previously:
      "Research Fellow @ MATS, Research Fellow @ UChicago XLab, Director @ WAISI",
    photo: "will_anderson",
  },
  {
    name: "Andy Wang",
    role: "Technical Governance Researcher @ Safe AI Forum",
    previously:
      "Contractor @ SAIF, Research Contractor @ METR, Research Fellow @ Astra, AI Safety Research Fellow @ SPAR, Project Lead @ UChicago XLab, Deputy Director @ WAISI",
    photo: "andy_wang",
  },
  {
    name: "Satya Srinath Namburi",
    role: "AI Security Scientist @ GE HealthCare",
    previously: "Founding Leadership Team @ WAISI",
    photo: "satya_srinath_namburi",
  },
];

// UW–Madison alumni outside WAISI who work in AI / AI safety. Same card format
// and /public/alumni headshots as NOTABLE_ALUMNI.
export const OTHER_UW_ALUMNI: AlumnusData[] = [
  {
    name: "Blaine Hoak",
    role: "Assistant Professor of Computer Science @ UT Dallas",
    previously: "PhD Research Intern @ Visa, PhD @ UW–Madison",
    photo: "blaine_hoak",
    linkedin: "https://www.linkedin.com/in/blaine-hoak-97270b158",
    website: "https://hoak.me/",
  },
  {
    name: "Sean Du",
    role: "Assistant Professor @ Nanyang Technological University",
    previously:
      "Research Intern @ Microsoft Research, Jane Street Graduate Research Fellow, PhD @ UW–Madison",
    photo: "sean_du",
    linkedin: "https://www.linkedin.com/in/sean-xuefeng-du-094723192/",
    website: "https://d12306.github.io/",
  },
  {
    name: "Jihye Choi",
    role: "Research Scientist @ NVIDIA Research",
    previously:
      "Research Intern @ Google Cloud AI Research, PhD Research Intern @ Visa Research, PhD @ UW–Madison",
    photo: "jihye_choi",
    linkedin: "https://www.linkedin.com/in/jihye-choi-a473a8148",
    website: "https://jihyechoi77.github.io/",
  },
  {
    name: "Asvin G",
    role: "Research Scientist @ Simplex",
    previously:
      "Anthropic Fellow @ Anthropic, Postdoc @ Institute for Advanced Study, PhD @ UW–Madison",
    photo: "asvin_g",
    website: "https://asving.com/",
  },
  {
    name: "Hayley Clatterbuck",
    role: "Senior Research Manager @ Rethink Priorities",
    previously:
      "Associate Professor of Philosophy @ UW–Madison, Assistant Professor of Philosophy @ University of Rochester, PhD @ UW–Madison",
    photo: "hayley_clatterbuck",
  },
  {
    name: "Varun Chandrasekaran",
    role: "Assistant Professor @ University of Illinois Urbana-Champaign",
    previously: "Postdoctoral Researcher @ Microsoft Research, PhD @ UW–Madison",
    photo: "varun_chandrasekaran",
    linkedin: "https://www.linkedin.com/in/varun-c-a684a179",
    website: "https://ece.illinois.edu/about/faculty/varunc",
  },
  {
    name: "Matt Fredrikson",
    role: "CEO & Co-founder @ Gray Swan AI, Associate Professor @ Carnegie Mellon University",
    previously: "PhD @ UW–Madison",
    photo: "matt_fredrikson",
    linkedin: "https://www.linkedin.com/in/matt-fredrikson-7596349/",
    website: "https://www.mattfredrikson.com",
  },
  {
    name: "Yiyou Sun",
    role: "Postdoctoral Researcher @ UC Berkeley",
    previously: "Researcher @ NEC Laboratories America, PhD @ UW–Madison",
    photo: "yiyou_sun",
    linkedin: "https://www.linkedin.com/in/yiyou-sun-2698b0102",
    website: "https://sunyiyou.github.io/",
  },
  {
    name: "Patricia Paskov",
    role: "Director of Standards @ AVERI",
    previously:
      "Technology and Security Policy Fellow @ RAND, Data Scientist @ Condé Nast, Agricultural & Applied Economics @ UW–Madison",
    photo: "patricia_paskov",
    linkedin: "https://www.linkedin.com/in/patricia-paskov/",
    website: "https://www.prpaskov.com",
  },
];
