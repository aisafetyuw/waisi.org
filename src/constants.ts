export const DISCORD_URL = 'https://discord.gg/8xZtDBmCHa';
export const TWITTER_URL = 'https://twitter.com/aisafetyuw';
export const INSTAGRAM_URL = 'https://www.instagram.com/waisi_uw/';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/waisi/';
export const CULTURE_STATEMENT = 'https://docs.google.com/document/d/1KUVD7c-ZM0uijD0RvYYk6yBl0Oe09AAgIvYyoVUj4h8/edit?usp=sharing';
export const INTEREST_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdWum58p_SbQdSp3XouCpi3zwPQOf3Pm_rRobxRlorr0Dn2Ag/viewform';
export const Handbooks = {
    AT_A_GLANCE: 'https://docs.google.com/document/d/18wiWtYgUxwXKSxChBOuQAittTNzXxSUaagsz-43Nt14/edit?usp=sharing',
    FELLOWSHIP: 'https://docs.google.com/document/d/1nlA0I7yGo7e7tC6xS8kBQUuyil88xrYji5KPeyUPRwA/edit?usp=sharing',
    SAFETY_SCHOLARS: 'https://docs.google.com/document/d/1npT_7Svl_Gp10-BV8yusx6A90OokOflWFgCagKKU0G8/edit?usp=sharing',
    UPSKILLING_DETAILS: 'https://docs.google.com/document/d/16UH2uN-9Bu8DMiBNqYc1LYbkBIhVF0R_dvN9nC-3qIo/edit?usp=sharing',
};

export type ApplicationCycle = {
  status: "open" | "closed";
  deadline?: string;
  techFormUrl: string;
  policyFormUrl: string;
  upskillingInterestUrl: string;
  interestFormUrl: string;
};

// Single source of truth for application-cycle state. Update status/deadline
// each semester; every deadline mention and CTA on the site derives from it.
export const APPLICATION_CYCLE: ApplicationCycle = {
  status: "closed", // spring apps closed Feb 23, 2026; flip to "open" in fall
  techFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdJ5rgafADd1JlnpmVoCd323XMUGOGzGreGWsmaLGF_3OvMMg/viewform?usp=header",
  policyFormUrl: "https://forms.gle/4fBTy2cFxuQECqz17",
  upskillingInterestUrl: "https://forms.gle/ZB9855GZi6aZ4obh9",
  interestFormUrl: INTEREST_URL,
};

export function primaryCta(): { label: string; href: string } {
  return APPLICATION_CYCLE.status === "open"
    ? { label: "Apply now", href: "/programs" }
    : { label: "Join us", href: APPLICATION_CYCLE.interestFormUrl };
}