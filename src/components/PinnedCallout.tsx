import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { CalendarEvent } from "@/lib/calendarEvents";
import { DateRail, EventMeta } from "@/components/EventRow";

// A pinned event, surfaced above the main list on the /events page. Shares the
// date-rail layout of EventRow so the two read as one family, but carries a
// brand border, a faint violet wash, and a "Don't miss" eyebrow.
export default function PinnedCallout({ event }: { event: CalendarEvent }) {
    return (
        <div className="event-in event-card flex items-start gap-4 rounded-card border border-brand bg-[#F5F2FD] p-4 sm:gap-5 sm:p-5">
            <DateRail date={event.date} accent />
            <div className="min-w-0 flex-1 border-l border-[#D9CBF7] pl-4 sm:pl-5">
                <div className="flex items-center gap-1.5 text-brand">
                    <FontAwesomeIcon icon={faThumbtack} className="text-[0.7rem]" />
                    <span className="text-[0.7rem] font-semibold uppercase tracking-wider">
                        Don&apos;t miss
                    </span>
                </div>
                <h3 className="mt-1 font-serif text-lg font-medium leading-snug text-heading">
                    {event.title}
                </h3>
                <EventMeta event={event} />
                {event.description && (
                    <p className="mt-2 text-sm leading-relaxed text-primary">
                        {event.description}
                    </p>
                )}
            </div>
        </div>
    );
}
