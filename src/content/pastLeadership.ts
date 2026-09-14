// Leadership Roster snapshot, 2026-09-14:
// https://docs.google.com/spreadsheets/d/1z4Hgqkmx1Wdee_aNsi6wyzKrrBf4AS7YrrivFGB-Gwg/edit
// All semester tabs, Fall 2026 through Spring 2024. Use the latest recorded
// role and the latest non-empty email. Preserve source uncertainty markers.
// Excludes the existing leadership and notable alumni, including the
// Zavier Naafi Rahmansyah / Zavi Rahmansyah name variant (same email).
// Years reflect appearances in the semester tabs, not inferred tenure outside them.
// Only names, roles, years, and emails belong here; other roster fields stay private.
export type PastLeader = {
  name: string;
  role?: string;
  years: string;
  email?: string;
};

export const PAST_LEADERSHIP: PastLeader[] = [
  {
    "name": "Zach Lichtman",
    "years": "2026",
    "role": "Technical Team"
  },
  {
    "name": "Albert Ge",
    "years": "2024–2026",
    "role": "Research Team"
  },
  {
    "name": "Andrea Tseng",
    "years": "2024",
    "role": "Technical Team"
  },
  {
    "name": "Arman Akbar",
    "years": "2024–2026",
    "role": "Operations Lead"
  },
  {
    "name": "Ben Tietjen",
    "years": "2024",
    "role": "Policy Team?"
  },
  {
    "name": "Christian Classen",
    "years": "2025",
    "role": "Technical Team*"
  },
  {
    "name": "David Viggiano",
    "years": "2024"
  },
  {
    "name": "Elise Fischer",
    "years": "2024–2026",
    "role": "Policy Team"
  },
  {
    "name": "Inba Rajashankar",
    "years": "2024"
  },
  {
    "name": "Jackson Kunde",
    "years": "2024–2025",
    "role": "Deputy Director, Networking Team"
  },
  {
    "name": "Kaushal Dasika",
    "years": "2025–2026",
    "role": "Operations Team",
    "email": "kaushaldasika@gmail.com"
  },
  {
    "name": "Laurel Adams",
    "years": "2025–2026",
    "role": "Policy Team"
  },
  {
    "name": "Maria De Martino",
    "years": "2025",
    "role": "Policy Team"
  },
  {
    "name": "Mason Baloun",
    "years": "2025",
    "role": "Operations Team",
    "email": "mbaloun@wisc.edu"
  },
  {
    "name": "Matthew Foley",
    "years": "2025",
    "role": "Policy Team",
    "email": "mpfoley2@wisc.edu"
  },
  {
    "name": "Nivesh Tuwani",
    "years": "2024",
    "role": "Technical Team"
  },
  {
    "name": "Reid Kuenzi",
    "years": "2024–2025",
    "role": "Policy Advisor"
  },
  {
    "name": "Rheeya Uppaal",
    "years": "2024–2025",
    "role": "Research Team"
  },
  {
    "name": "Ritesh Neela",
    "years": "2025–2026",
    "role": "Technical Team",
    "email": "rneela@wisc.edu"
  },
  {
    "name": "Roxie Clausen",
    "years": "2025–2026",
    "role": "Policy Team"
  },
  {
    "name": "Sam Baumohl",
    "years": "2026",
    "role": "Lead Baumohl Officer"
  },
  {
    "name": "Shrey Modi",
    "years": "2024–2025",
    "role": "Research Team, Hackathon Lead"
  },
  {
    "name": "Stuti Pandey",
    "years": "2024–2025",
    "role": "Technical Lead"
  },
  {
    "name": "Uday Tyagi",
    "years": "2025",
    "role": "Technical Team"
  },
  {
    "name": "Utkarsh Priyadarshi",
    "years": "2024",
    "role": "Technical Team"
  },
  {
    "name": "Viktoria Sakman",
    "years": "2025–2026",
    "role": "Communications Lead",
    "email": "sakman2@wisc.edu"
  },
  {
    "name": "Yogesh Prabhu",
    "years": "2024–2025",
    "role": "Technical Advisor"
  }
];
