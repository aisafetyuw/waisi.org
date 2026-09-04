import type { Metadata } from "next";
import { APPLICATION_CYCLE, Handbooks } from "@/constants";
import ProgramsFunnel from "@/components/ProgramsFunnel";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "WAISI's semester programs: Technical Fellowship, Policy Fellowship, Technical Upskilling, and the Safety Scholars program.",
};

export default function Programs() {
  return (
    <div id="programs" className="-mx-10">
      <div className="px-8 py-12 pb-20 max-w-5xl mx-auto">
        {APPLICATION_CYCLE.deadline && (
          <p className="text-base max-w-prose mb-10 font-semibold text-heading">
            Applications are due by {APPLICATION_CYCLE.deadline}.
          </p>
        )}

        <ProgramsFunnel />

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
              Safety Scholars applications open at the beginning and end of
              each semester.
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
