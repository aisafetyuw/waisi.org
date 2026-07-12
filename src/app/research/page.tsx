import getResearch from "@/app/research/getResearch";
import Professor from "@/components/prof";
import ResearchList from "@/components/ResearchList";
import { FACULTY_COLLABORATORS } from "@/content/research";
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
    <div id="research" className="bg-page -mx-10">
      <div className="mx-auto pt-8 w-3/4">
        <h2 className="text-3xl font-semibold mb-6 text-heading pb-2">
          <span className="text-heading">WAISI</span>{" "}
          <span className="text-primary">&</span>{" "}
          <span className="text-primary">XLab</span>
        </h2>
        <div className="space-y-6 mb-12">
          <div className="p-6 bg-card border border-subtle rounded-card">
            <h3 className="text-xl font-semibold mb-3 text-heading">
              WAISI Technical AI Safety Workshop Program
            </h3>
            <p className="leading-relaxed text-primary">
              Most AI Safety communities introduce members who are interested in
              technical AI safety through the pipeline of Intro Technical
              Fellowship → Paper Reading Sessions → Alignment Research Engineer
              Accelerator program (ARENA) → Research Programs (SPAR, XLab SRF,
              MATS). However, most university groups have struggled with ARENA
              sessions for a few key reasons: the steep learning curve,
              significant time commitment, and lack of experienced TA's. The
              technical workshop program aims to address these issues by
              creating ARENA-styled workshops on AI Safety topics that focus on
              shorter, more manageable exercises, while still preserving the
              rigor of research-style work.
            </p>
          </div>

          <div className="p-6 bg-card border border-subtle rounded-card">
            <h3 className="text-xl font-semibold mb-3 text-heading">
              Transferable Adversarial Materials (TAM): Defeating ISR AUASs and
              LAWSs via Disruptive and Adversarial Material
            </h3>
            <p className="leading-relaxed text-primary">
              Within the past decade, small portable Unmanned Aerial Systems
              (UASs) operated by individual infantry units have been
              demonstrated to be vital assets on the battlefield in
              intelligence, surveillance, and reconnaissance (ISR) roles as well
              as in one-way suicide attacks (loitering munition) and reusable
              bomb-dropping UASs. Many countries are attempting to integrate AI
              vision models into these systems to automate navigation and target
              identification and reduce vulnerability to jamming. We aim to
              demonstrate the effectiveness of a Transferable Adversarial
              Material (TAM), a deformable material which could be deployed in a
              variety of settings and deceive military-purpose computer vision
              models analogous to those being deployed in AUASs.
            </p>
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
