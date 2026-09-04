import type { Metadata } from "next";
import {
    fetchCalendarEvents,
    eventsWithin,
    type CalendarEvent,
} from "@/lib/calendarEvents";
import EventRow from "@/components/EventRow";
import PinnedCallout from "@/components/PinnedCallout";

// Split a chronological event list into consecutive "Month Year" runs so the
// page can print a lightweight heading before each block.
function groupByMonth(events: CalendarEvent[]) {
    const groups: { label: string; events: CalendarEvent[] }[] = [];
    for (const event of events) {
        const label = event.date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
        });
        const last = groups[groups.length - 1];
        if (last && last.label === label) last.events.push(event);
        else groups.push({ label, events: [event] });
    }
    return groups;
}

export const metadata: Metadata = {
    title: "Events",
    description:
        "Upcoming WAISI events — talks, socials, and outreach — alongside the UW–Madison academic dates we plan around.",
};

// Events are time-sensitive; re-fetch the published calendar CSV in the
// background at most every 15 minutes.
export const revalidate = 900;

export default async function EventsPage() {
    const all = await fetchCalendarEvents();
    const events = all ? eventsWithin(all, 365) : [];
    const pinned = events.filter((e) => e.pinned);
    const rest = events.filter((e) => !e.pinned);

    return (
        <div className="page">
            <div className="mx-auto max-w-3xl px-4 py-12 pb-20">
                <h1 className="text-heading">Events</h1>
                <p className="mt-3 max-w-prose text-base text-primary">
                    Everything happening at WAISI over the next year, plus the
                    UW&#8211;Madison dates we plan around.
                </p>

                {all === null ? (
                    <p className="mt-10 text-base text-primary">
                        We couldn&apos;t load events right now &#8212; please check
                        back soon.
                    </p>
                ) : events.length === 0 ? (
                    <p className="mt-10 text-base text-primary">
                        Nothing outside of our usual programming happening soon
                        &#8212; check back later!
                    </p>
                ) : (
                    <>
                        {pinned.length > 0 && (
                            <div className="mt-8 space-y-3">
                                {pinned.map((event, i) => (
                                    <PinnedCallout
                                        key={`pinned-${i}`}
                                        event={event}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="mt-10 space-y-10">
                            {groupByMonth(rest).map((group) => (
                                <section key={group.label}>
                                    <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                                        {group.label}
                                    </h2>
                                    <ul className="space-y-3">
                                        {group.events.map((event, i) => (
                                            <EventRow
                                                key={i}
                                                event={event}
                                                index={i}
                                            />
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
