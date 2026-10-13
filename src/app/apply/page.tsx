import type { Metadata } from "next";
import { APPLICATION_CYCLE, Curricula, PROJECTS_RFP } from "@/constants";
import ApplyEmbed from "./ApplyEmbed";

const open = APPLICATION_CYCLE.status === "open";

export const metadata: Metadata = {
  title: "Apply to the Fellowship",
  description: open
    ? "Apply to the WAISI Fellowship — a six-week reading group on technical AI safety or AI governance."
    : "WAISI Fellowship applications are closed — sign up to hear when the next cycle opens.",
};

// Minimal chrome: the shared nav, a one-line header, then straight into the
// form. The `-mx-10` cancels the 40px gutters `#content` adds so the form can
// use tighter mobile gutters (`px-6`) while staying centred and measured on
// desktop.
//
// Gated on APPLICATION_CYCLE.status (src/constants.ts): while "closed" the
// Fillout embed is replaced by a closed notice + interest form. Flip status to
// "open" to bring the form back — see docs/ARCHIVE.md.
export default function Apply() {
  return (
    <div id="apply" className="-mx-10">
      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8">
        {open ? (
          <>
            <h1 className="text-heading">Apply to the Fellowship</h1>
            <p className="mt-2 max-w-prose text-base text-primary">
              Six weeks, two hours a week — technical AI safety or AI
              governance. Fill out the form below; it takes about ten minutes.
              Want to see what you&apos;d be reading first? Check out the{" "}
              <CurriculumLinks /> curriculum.
            </p>
            <ApplyEmbed />
          </>
        ) : (
          <>
            <h1 className="text-heading">Fellowship applications are closed</h1>
            <p className="mt-2 max-w-prose text-base text-primary">
              Applications for this semester&apos;s Technical and Policy
              Fellowships have closed. Fill out the interest form and
              we&apos;ll let you know when the next cycle opens. In the
              meantime, browse the <CurriculumLinks /> curriculum.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={APPLICATION_CYCLE.interestFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="waisi-button"
              >
                Get notified
              </a>
            </div>
            {PROJECTS_RFP.status === "open" && (
              <div className="mt-10 max-w-prose rounded-card border border-subtle bg-card p-5">
                <h2 className="text-xl text-heading">
                  Already a fellowship graduate?
                </h2>
                <p className="mt-2 text-base text-primary">
                  Proposals for Scholars&apos; Projects, eight-week mentored
                  AI safety projects, are due {PROJECTS_RFP.deadline}.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a
                    href={PROJECTS_RFP.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waisi-button"
                  >
                    Submit a proposal
                  </a>
                  <a
                    href={PROJECTS_RFP.rfpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-link transition-colors hover:text-link-hover"
                  >
                    Read the RFP &rarr;
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CurriculumLinks() {
  return (
    <>
      <a
        href={Curricula.TECHNICAL_FUNDAMENTALS}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link hover:underline"
      >
        Technical Fundamentals
      </a>{" "}
      or{" "}
      <a
        href={Curricula.POLICY_FUNDAMENTALS}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link hover:underline"
      >
        Policy Fundamentals
      </a>
    </>
  );
}
