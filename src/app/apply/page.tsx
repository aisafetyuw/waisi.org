import type { Metadata } from "next";
import { APPLICATION_CYCLE, Curricula, primaryCta } from "@/constants";
import ApplyEmbed from "./ApplyEmbed";

export const metadata: Metadata = {
  title: "Apply to the Fellowship",
  description:
    "Apply to the WAISI Fellowship — a six-week reading group on technical AI safety or AI governance.",
};

// Minimal chrome: the shared nav, a one-line header, then straight into the
// form. The `-mx-10` cancels the 40px gutters `#content` adds so the form can
// use tighter mobile gutters (`px-6`) while staying centred and measured on
// desktop.
export default function Apply() {
  const open = APPLICATION_CYCLE.status === "open";
  return (
    <div id="apply" className="-mx-10">
      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8">
        <h1 className="text-heading">Apply to the Fellowship</h1>
        <p className="mt-2 max-w-prose text-base text-primary">
          Six weeks, two hours a week — technical AI safety or AI governance.
          {open ? " Fill out the form below; it takes about ten minutes." : " Applications are currently closed."}
          {" "}See the{" "}
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
          </a>{" "}
          curriculum.
        </p>
        {open ? <ApplyEmbed /> : (
          <a href={primaryCta().href} className="waisi-button mt-8" target="_blank" rel="noopener noreferrer">
            Get notified when applications open
          </a>
        )}
      </div>
    </div>
  );
}
