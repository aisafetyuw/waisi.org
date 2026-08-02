import { AlumnusData } from "@/types";

// Former WAISI members and where they've gone — edit here, not in the page.
// The leadership roster is sheet-backed (see src/app/team/getMembers.ts); this
// list is static, so add a headshot to /public/alumni when you add a person.
// `previously` runs most-recent-first and ends with the person's WAISI role.
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
    role: "ML Research Intern @ Redwood",
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
  {
    name: "Max Gehred",
    role: "Legislative Aide @ U.S. House of Representatives",
    previously:
      "Technology Policy Fellow, Legislative Intern @ U.S. House of Representatives, Founding Leadership Team @ WAISI",
    photo: "max_gehred",
  },
];
