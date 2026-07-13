import type { Metadata } from "next";
import { APPLICATION_CYCLE, Handbooks } from "@/constants";
import { PROGRAMS } from "@/content/programs";
import CalendarEvent from "@/components/calendarEvent";
import getEvents from "@/app/programs/getEvents";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "WAISI's semester programs and upcoming events: Technical Fundamentals, Policy Fundamentals, Technical Upskilling, and the Safety Scholars program.",
};

// Events are time-sensitive: re-fetch the calendar in the background at most
// every 15 minutes.
export const revalidate = 900;

export default async function Programs() {
  const events = await getEvents();
  return (
    <div id="programs" className="-mx-10">
      <div className="px-8 py-12 pb-20 max-w-5xl mx-auto">
        {APPLICATION_CYCLE.deadline && (
          <p className="text-base max-w-prose mb-10 font-semibold text-heading">
            Applications are due by {APPLICATION_CYCLE.deadline}.
          </p>
        )}

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

        <div className="mt-14">
          <h2 className="text-heading">Upcoming Events</h2>
          <div className="mt-4 max-w-3xl">
            {events === null ? (
              <p className="text-base text-primary">
                We couldn&apos;t load upcoming events right now &#8212; please
                check back soon!
              </p>
            ) : events.length > 0 ? (
              <ul>
                {events.map((event, index) => (
                  <li key={index}>
                    <CalendarEvent event={event} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base text-primary">
                Nothing outside of our usual programming happening soon &#8212;
                check back later!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
