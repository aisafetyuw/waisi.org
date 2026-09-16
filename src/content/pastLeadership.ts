// Leadership Roster snapshot, 2026-09-14:
// https://docs.google.com/spreadsheets/d/1z4Hgqkmx1Wdee_aNsi6wyzKrrBf4AS7YrrivFGB-Gwg/edit
// All semester tabs, Fall 2026 through Spring 2024. Use the latest recorded
// role and the latest non-empty email. Omit source question marks and asterisks from titles.
// Excludes the existing leadership and notable alumni, including the
// Zavier Naafi Rahmansyah / Zavi Rahmansyah name variant (same email).
// Years reflect appearances in the semester tabs, not inferred tenure outside them.
// Only names, roles, years, and emails belong here; other roster fields stay private.
export type PastLeader = {
  name: string;
  image: string;
  role?: string;
  years: string;
  email?: string;
};

// Order by final year (newest first), then start year (earliest first), then name.
export const PAST_LEADERSHIP: PastLeader[] = [
  {
    "name": "Albert Ge",
    "image": "/leaders/albert_ge.webp",
    "years": "2024–2026",
    "role": "Research Team"
  },
  {
    "name": "Arman Akbar",
    "image": "/leaders/arman_akbar.webp",
    "years": "2024–2026",
    "role": "Operations Lead"
  },
  {
    "name": "Elise Fischer",
    "image": "/leaders/elise_fischer.webp",
    "years": "2024–2026",
    "role": "Policy Team"
  },
  {
    "name": "Kaushal Dasika",
    "image": "/leaders/kaushal_dasika.webp",
    "years": "2025–2026",
    "role": "Operations Team",
    "email": "kaushaldasika@gmail.com"
  },
  {
    "name": "Laurel Adams",
    "image": "/leaders/laurel_adams.webp",
    "years": "2025–2026",
    "role": "Policy Team"
  },
  {
    "name": "Ritesh Neela",
    "image": "/leaders/ritesh_neela.webp",
    "years": "2025–2026",
    "role": "Technical Team",
    "email": "rneela@wisc.edu"
  },
  {
    "name": "Roxie Clausen",
    "image": "/leaders/roxie_clauson.webp",
    "years": "2025–2026",
    "role": "Policy Team"
  },
  {
    "name": "Viktoria Sakman",
    "image": "/leaders/viktoria_sakman.webp",
    "years": "2025–2026",
    "role": "Communications Lead",
    "email": "sakman2@wisc.edu"
  },
  {
    "name": "Sam Baumohl",
    "image": "/leaders/sam_baumohl.webp",
    "years": "2026",
    "role": "Lead Baumohl Officer"
  },
  {
    "name": "Zach Lichtman",
    "image": "/leaders/zach_lichtman.webp",
    "years": "2026",
    "role": "Technical Team"
  },
  {
    "name": "Jackson Kunde",
    "image": "/leaders/jackson_kunde.webp",
    "years": "2024–2025",
    "role": "Deputy Director, Networking Team"
  },
  {
    "name": "Reid Kuenzi",
    "image": "/leaders/reid_kuenzi.webp",
    "years": "2024–2025",
    "role": "Policy Advisor"
  },
  {
    "name": "Rheeya Uppaal",
    "image": "/leaders/rheeya_uppaal.webp",
    "years": "2024–2025",
    "role": "Research Team"
  },
  {
    "name": "Shrey Modi",
    "image": "/leaders/shrey_modi.webp",
    "years": "2024–2025",
    "role": "Research Team, Hackathon Lead"
  },
  {
    "name": "Stuti Pandey",
    "image": "/leaders/stuti_pandey.webp",
    "years": "2024–2025",
    "role": "Technical Lead"
  },
  {
    "name": "Yogesh Prabhu",
    "image": "/leaders/yogesh_prabhu.webp",
    "years": "2024–2025",
    "role": "Technical Advisor"
  },
  {
    "name": "Christian Classen",
    "image": "/leaders/christian_classen.webp",
    "years": "2025",
    "role": "Technical Team"
  },
  {
    "name": "Maria De Martino",
    "image": "/leaders/maria_de_martino.webp",
    "years": "2025",
    "role": "Policy Team"
  },
  {
    "name": "Mason Baloun",
    "image": "/leaders/mason_baloun.webp",
    "years": "2025",
    "role": "Operations Team",
    "email": "mbaloun@wisc.edu"
  },
  {
    "name": "Matthew Foley",
    "image": "/leaders/matthew_foley.webp",
    "years": "2025",
    "role": "Policy Team",
    "email": "mpfoley2@wisc.edu"
  },
  {
    "name": "Uday Tyagi",
    "image": "/leaders/uday_tyagi.webp",
    "years": "2025",
    "role": "Technical Team"
  },
  {
    "name": "Andrea Tseng",
    "image": "/leaders/andrea_tseng.webp",
    "years": "2024",
    "role": "Technical Team"
  },
  {
    "name": "Ben Tietjen",
    "image": "/leaders/ben_tietjen.webp",
    "years": "2024",
    "role": "Policy Team"
  },
  {
    "name": "David Viggiano",
    "image": "/leaders/david_viggiano.webp",
    "years": "2024"
  },
  {
    "name": "Inba Rajashankar",
    "image": "/leaders/krish_inba_rajashankar.webp",
    "years": "2024"
  },
  {
    "name": "Nivesh Tuwani",
    "image": "/leaders/nivesh_tuwani.webp",
    "years": "2024",
    "role": "Technical Team"
  }
];
