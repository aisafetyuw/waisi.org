import type { Metadata } from "next";
import Link from "next/link";
import { APPLICATION_CYCLE, Handbooks } from "@/constants";
import ProgramsFunnel from "@/components/ProgramsFunnel";
import EventRow from "@/components/EventRow";
import {
  fetchCalendarEvents,
  eventsWithin,
  upcomingEvents,
  pinnedFirst,
} from "@/lib/calendarEvents";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "WAISI's semester programs and upcoming events: Technical Fundamentals, Policy Fundamentals, Technical Upskilling, and the Safety Scholars program.",
};

// Events are time-sensitive: re-fetch the calendar in the background at most
// every 15 minutes.
export const revalidate = 900;

export default async function Programs() {
  // Get Involved shows a lightweight preview of what's coming up: events in the
  // next 14 days (pinned first), or the next few upcoming events if that window
  // is empty. The full list lives on /events.
  const allEvents = await fetchCalendarEvents();
  const eventPreview = allEvents
    ? (() => {
        const soon = pinnedFirst(eventsWithin(allEvents, 14));
        return soon.length > 0 ? soon : upcomingEvents(allEvents).slice(0, 5);
      })()
    : [];

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

        <div className="mt-14 max-w-3xl">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-heading">Upcoming Events</h2>
            <Link
              href="/events"
              className="shrink-0 text-sm font-semibold text-link hover:underline"
            >
              All events &rarr;
            </Link>
          </div>
          <div className="mt-4">
            {allEvents === null ? (
              <p className="text-base text-primary">
                We couldn&apos;t load upcoming events right now &#8212; please
                check back soon!
              </p>
            ) : eventPreview.length === 0 ? (
              <p className="text-base text-primary">
                Nothing outside of our usual programming happening soon &#8212;
                check back later!
              </p>
            ) : (
              <ul className="space-y-3">
                {eventPreview.map((event, index) => (
                  <EventRow key={index} event={event} compact />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
