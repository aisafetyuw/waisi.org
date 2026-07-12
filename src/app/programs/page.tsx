import type { Metadata } from "next";
import { APPLICATION_CYCLE, Handbooks } from "@/constants";
import { PROGRAMS } from "@/content/programs";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "WAISI's semester programs: Technical Fundamentals, Policy Fundamentals, Technical Upskilling, and the Safety Scholars program.",
};

export default function Programs() {
  return (
    <div id="programs" className="-mx-10 bg-page">
      <div className="px-8 py-12 pb-20 max-w-5xl mx-auto">
        <div className="max-w-prose mb-10">
          <h1 className="text-heading">Get involved</h1>
          <p className="text-base text-primary mt-3">
            Four programs, from first exposure to core membership. Applications
            open at the start of each semester; most programs require no prior
            experience.
            {APPLICATION_CYCLE.deadline && (
              <>
                {" "}
                <span className="font-semibold text-heading">
                  Applications are due by {APPLICATION_CYCLE.deadline}.
                </span>
              </>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS.map((program) => (
            <div
              key={program.title}
              className="flex flex-col p-6 bg-card border border-subtle rounded-card"
            >
              <h2 className="text-2xl text-heading">{program.title}</h2>
              <p className="text-base text-primary mt-3">{program.what}</p>
              <dl className="mt-4 space-y-1 text-base text-primary">
                <div>
                  <dt className="inline font-medium text-heading">
                    Commitment:{" "}
                  </dt>
                  <dd className="inline">{program.commitment}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-heading">For: </dt>
                  <dd className="inline">{program.audience}</dd>
                </div>
              </dl>
              <div className="flex items-center gap-5 mt-auto pt-6">
                <a
                  href={program.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="waisi-button"
                >
                  {program.cta.label}
                </a>
                {program.handbookUrl && (
                  <a
                    href={program.handbookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:underline font-medium"
                  >
                    Handbook →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-prose">
          <h2 className="text-heading">Details</h2>
          <div className="mt-4 space-y-4 text-base text-primary">
            <p>
              <span className="font-medium text-heading">
                Graduate students:
              </span>{" "}
              email{" "}
              <a href="mailto:aisafetyuw@gmail.com" className="text-link">
                aisafetyuw@gmail.com
              </a>{" "}
              to shadow a Safety Scholars session — invitations are extended to
              good fits.
            </p>
            <p>
              <span className="font-medium text-heading">Undergraduates:</span>{" "}
              Safety Scholars applications open at the end of each semester.
              Priority goes to standout intro-program participants and students
              with a strong AI safety background; strong applicants are
              encouraged to reach out directly.
            </p>
            <p>
              New to WAISI? Start with the{" "}
              <a
                href={Handbooks.AT_A_GLANCE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                WAISI at-a-glance handbook
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
