import getResearch from "@/app/research/getResearch";
import Professor from "@/components/prof";
import ResearchList from "@/components/ResearchList";
import { FACULTY_COLLABORATORS, SPAR_PROJECTS } from "@/content/research";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description:
    "AI safety research by WAISI members — 20+ papers, current projects, and faculty collaborators at UW–Madison.",
};

// Re-fetch the research sheet in the background at most once an hour, so
// spreadsheet edits go live without a redeploy.
export const revalidate = 3600;

export default async function ResearchPage() {
  const research = await getResearch();
  const clubMembers = new Set(
    (research ?? []).map((paper) => paper.author.trim()),
  );


  return (
    <div id="research" className="-mx-10">
      <div className="mx-auto pt-8 w-3/4">
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
                className="flex flex-col p-4 h-full bg-card border border-subtle rounded-card md:grid md:grid-rows-subgrid md:row-span-4 md:gap-y-0"
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
                    className="font-semibold text-link no-underline hover:underline"
                  >
                    {project.waisiMentor}
                  </a>
                  {project.coMentors && <> with {project.coMentors}</>}
                </div>
                <p className="mt-2 text-sm text-primary">
                  {project.description}
                </p>
                <div className="mt-auto pt-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold inline-block hover:underline text-link no-underline"
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
