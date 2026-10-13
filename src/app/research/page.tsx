import getResearch from "@/app/research/getResearch";
import Professor from "@/components/prof";
import ResearchList from "@/components/ResearchList";
import { PROJECTS_RFP } from "@/constants";
import {
  FACULTY_COLLABORATORS,
  SCHOLARS_CONTACT_EMAIL,
  SCHOLARS_PROJECT_TYPES,
  SCHOLARS_PROJECTS_INTRO,
  SCHOLARS_PROJECTS_STATS,
  SCHOLARS_PROPOSERS,
  SCHOLARS_TIMELINE,
  SPAR_PROJECTS,
} from "@/content/research";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description:
    "AI safety research by WAISI members — 20+ papers, Scholars' Projects, current SPAR projects, and faculty collaborators at UW–Madison.",
};

// Re-fetch the research sheet in the background at most once an hour, so
// spreadsheet edits go live without a redeploy.
export const revalidate = 3600;

// Driven by PROJECTS_RFP (src/constants.ts) — see docs/ARCHIVE.md
// Collapsed by default via <details>; no client JS.
function ScholarsProjects() {
  const open = PROJECTS_RFP.status === "open";
  const now = Date.now();
  // Milestones run through the end of their day (Central time, UTC-5 in Oct,
  // UTC-6 after Nov 1 — a 6h offset is close enough for highlighting).
  const endOf = (iso: string) => new Date(`${iso}T23:59:59-06:00`).getTime();
  const nextIndex = open
    ? SCHOLARS_TIMELINE.findIndex((m) => endOf(m.date) >= now)
    : -1;
  const fmt = (iso: string) =>
    new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  const stats = SCHOLARS_PROJECTS_STATS.filter((s) => open || !s.openOnly);
  const linkClass =
    "text-link hover:text-link-hover active:text-link-hover transition-colors font-medium";

  return (
    <div className="mb-12">
      <div className="flex flex-wrap items-center gap-3 mb-3 ml-1">
        <h2 className="text-3xl font-semibold text-heading">
          <span className="text-link">Scholars&apos;</span> Projects
        </h2>
        <span className="text-2xl font-semibold text-brand bg-[#EDE9FE] border border-brand rounded-card px-3 py-0.5">
          F26
        </span>
      </div>

      <div className="m-1 bg-card border border-subtle rounded-card p-4 sm:p-5">
        <p className="text-sm sm:text-base text-primary max-w-prose">
          {SCHOLARS_PROJECTS_INTRO}
        </p>
        <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 border-y border-subtle py-3">
          {stats.map((stat) => (
            <div key={stat.value} className="min-w-0">
              <dt className="font-serif text-xl font-semibold text-heading leading-tight">
                {stat.value}
              </dt>
              <dd className="mt-0.5 text-xs text-primary">{stat.label}</dd>
            </div>
          ))}
        </dl>

        {/* Collapsed by default via <details> (no client JS) */}
        <details className="group mt-4">
          <summary className="flex flex-wrap items-center gap-x-5 gap-y-3 list-none [&::-webkit-details-marker]:hidden cursor-pointer">
            {open && (
              <a
                href={PROJECTS_RFP.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="waisi-button"
              >
                Submit a proposal
              </a>
            )}
            <span
              className={`inline-flex items-center gap-1.5 py-2 ${linkClass}`}
            >
              <span className="group-open:hidden">More info</span>
              <span className="hidden group-open:inline">Show less</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform group-open:rotate-180"
              >
                <path d="M5 8l5 5 5-5" />
              </svg>
            </span>
          </summary>

          <div className="program-card-in mt-6 pt-6 border-t border-subtle">
      <h3 className="mb-3 text-xl font-semibold text-heading">
        Project types
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {SCHOLARS_PROJECT_TYPES.map((type) => (
          <div
            key={type.title}
            className="bg-card-alt border border-subtle rounded-card p-4"
          >
            <h4 className="text-lg font-semibold text-heading font-serif">
              {type.title}
            </h4>
            <p className="mt-1 text-sm text-primary">{type.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6">
        <div className="min-w-0">
          <h3 className="mb-3 text-xl font-semibold text-heading">Timeline</h3>
          <ol className="bg-card-alt border border-subtle rounded-card p-4 grid grid-cols-1 lg:grid-cols-7 gap-3 lg:gap-2">
            {SCHOLARS_TIMELINE.map((m, i) => {
              const next = i === nextIndex;
              return (
                <li
                  key={m.date}
                  aria-current={next ? "step" : undefined}
                  className={`flex items-baseline gap-3 lg:block lg:border-t-2 lg:pt-2 ${
                    next ? "lg:border-brand" : "lg:border-subtle"
                  }`}
                >
                  <div
                    className={`w-16 shrink-0 lg:w-auto text-sm font-semibold ${
                      next ? "text-brand" : "text-heading"
                    }`}
                  >
                    {fmt(m.date)}
                  </div>
                  <div className="text-sm text-primary min-w-0">
                    {m.label}
                    {m.detail && (
                      <span className="block text-xs">{m.detail}</span>
                    )}
                    {next && (
                      <span className="block text-xs font-semibold text-brand">
                        Next up
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="min-w-0">
          <h3 className="mb-3 text-xl font-semibold text-heading">
            Who can propose
          </h3>
          <ul className="bg-card-alt border border-subtle rounded-card p-4 space-y-2 text-sm text-primary list-disc list-inside">
            {SCHOLARS_PROPOSERS.map((who) => (
              <li key={who}>{who}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={PROJECTS_RFP.rfpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Read the full RFP &rarr;
        </a>
        <span className="text-sm text-primary">
          Questions?{" "}
          <a href={`mailto:${SCHOLARS_CONTACT_EMAIL}`} className={linkClass}>
            {SCHOLARS_CONTACT_EMAIL}
          </a>
        </span>
      </div>
          </div>
        </details>
      </div>
    </div>
  );
}

export default async function ResearchPage() {
  const research = await getResearch();
  const clubMembers = new Set(
    (research ?? []).map((paper) => paper.author.trim()),
  );


  return (
    <div id="research" className="-mx-10">
      <div className="mx-auto pt-8 w-3/4">
        <ScholarsProjects />
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3 ml-1">
            <h2 className="text-3xl font-semibold text-heading">
              <span className="text-link">SPAR</span> Projects
            </h2>
            <span className="text-2xl font-semibold text-brand bg-[#EDE9FE] border border-brand rounded-card px-3 py-0.5">
              F26
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-1">
            {SPAR_PROJECTS.map((project) => (
              <div
                key={project.link}
                className="flex flex-col p-4 h-full bg-card border border-subtle rounded-card md:grid md:grid-rows-subgrid md:row-span-5 md:gap-y-0"
              >
                <h3 className="text-lg font-semibold text-heading">
                  {project.title}
                </h3>
                <div className="mt-1 text-sm text-primary">
                  Mentored by{" "}
                  <a
                    href={project.waisiMentorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-link no-underline hover:text-link-hover active:text-link-hover transition-colors"
                  >
                    {project.waisiMentor}
                  </a>
                  {project.coMentors && <> with {project.coMentors}</>}
                </div>
                <p className="mt-2 text-sm text-primary">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap content-start gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-primary bg-card-alt border border-subtle rounded-card px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold inline-block hover:text-link-hover active:text-link-hover transition-colors text-link no-underline"
                  >
                    View on SPAR
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex align-center justify-center mb-6">
          <h1 className="text-4xl font-semibold text-heading">
            Our Research Catalog
          </h1>
        </div>
        {research === null ? (
          <p className="text-lg text-center mb-12 text-primary">
            We couldn&apos;t load the research catalog right now &#8212; please
            check back soon.
          </p>
        ) : (
          <ResearchList research={research} clubMembers={clubMembers} />
        )}
        <div className="mt-12 pb-16">
          <h2 className="text-3xl font-semibold mb-6 text-heading pb-2">
            Faculty Collaborators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1">
            {[...FACULTY_COLLABORATORS]
              .sort((a, b) =>
                a.name
                  .split(" ")[1]
                  .toLowerCase()
                  .localeCompare(b.name.split(" ")[1].toLowerCase()),
              ) // sort by last name
              .map((prof) => (
                <Professor
                  key={prof.name}
                  link={prof.link}
                  name={prof.name}
                  extra={prof.extra}
                  focus={prof.focus}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
