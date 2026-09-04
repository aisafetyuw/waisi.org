import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { CalendarEvent, formatEventDate } from "@/lib/calendarEvents";

const MUTED = "#6B7280";

// A calendar date split into the three stacked lines of the date rail.
function dateRailParts(date: Date) {
    const part = (opt: Intl.DateTimeFormatOptions) =>
        date.toLocaleDateString("en-US", { ...opt, timeZone: "UTC" });
    return {
        weekday: part({ weekday: "short" }),
        day: part({ day: "numeric" }),
        month: part({ month: "short" }),
    };
}

export function DateRail({ date, accent }: { date: Date; accent?: boolean }) {
    const { weekday, day, month } = dateRailParts(date);
    return (
        <div className="w-12 shrink-0 text-center">
            <div
                className="text-[0.7rem] font-semibold uppercase tracking-wider"
                style={{ color: MUTED }}
            >
                {weekday}
            </div>
            <div
                className={`font-serif text-2xl leading-none ${
                    accent ? "text-brand" : "text-heading"
                }`}
            >
                {day}
            </div>
            <div
                className="text-[0.7rem] font-semibold uppercase tracking-wider"
                style={{ color: MUTED }}
            >
                {month}
            </div>
        </div>
    );
}

// A single line of "6:00 PM · Union South" with small leading icons. Renders
// nothing when the event has neither a time nor a location.
export function EventMeta({ event }: { event: CalendarEvent }) {
    if (!event.time && !event.location) return null;
    return (
        <p
            className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
            style={{ color: MUTED }}
        >
            {event.time && (
                <span>
                    <FontAwesomeIcon icon={faClock} className="mr-1.5 opacity-70" />
                    {event.time}
                </span>
            )}
            {event.time && event.location && (
                <span className="opacity-50">&middot;</span>
            )}
            {event.location && (
                <span>
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="mr-1.5 opacity-70"
                    />
                    {event.location}
                </span>
            )}
        </p>
    );
}

// One event in a list. `compact` drops the date rail and description and
// collapses everything into a tight block — used by the Get Involved summary;
// the full form (with the date rail) is used on the /events page. `index` only
// stages the load-in animation, so later rows fade in slightly after earlier
// ones; the delay is capped so nothing sits blank for long.
export default function EventRow({
    event,
    compact = false,
    index = 0,
}: {
    event: CalendarEvent;
    compact?: boolean;
    index?: number;
}) {
    if (compact) {
        return (
            <li className="rounded-card border border-subtle bg-card p-4">
                <div className="text-sm font-medium" style={{ color: MUTED }}>
                    {formatEventDate(event.date, true)}
                </div>
                <h3 className="mt-0.5 font-serif text-base font-medium text-heading">
                    {event.title}
                </h3>
                {(event.time || event.location) && (
                    <p className="mt-1 text-sm" style={{ color: MUTED }}>
                        {[event.time, event.location].filter(Boolean).join(" · ")}
                    </p>
                )}
            </li>
        );
    }

    return (
        <li
            className="event-in event-card flex items-start gap-4 rounded-card border border-subtle bg-card p-4 hover:border-[#D6D2C8] hover:bg-[#FAF9F7] sm:gap-5 sm:p-5"
            style={{ animationDelay: `${Math.min(index, 6) * 55}ms` }}
        >
            <DateRail date={event.date} />
            <div className="min-w-0 flex-1 border-l border-subtle pl-4 sm:pl-5">
                <h3 className="font-serif text-lg font-medium leading-snug text-heading">
                    {event.title}
                </h3>
                <EventMeta event={event} />
                {event.description && (
                    <p className="mt-2 text-sm leading-relaxed text-primary">
                        {event.description}
                    </p>
                )}
            </div>
        </li>
    );
}
