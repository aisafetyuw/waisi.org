import CalendarEvent from "@/components/calendarEvent";
import getEvents from "@/app/events/getEvents";

// Events are more time-sensitive than the sheet-backed pages: re-fetch the
// calendar in the background at most every 15 minutes.
export const revalidate = 900;

export default async function Calendar() {
  const events = await getEvents();

  return (
    <div
      id="calendar"
      className="page"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      <div id="events">
        <div className="text-center">
          {events === null ? (
            <p className="bold text-xl">
              We couldn&apos;t load upcoming events right now &#8212; please
              check back soon!
            </p>
          ) : events.length > 0 ? (
            <ul className="md:w-5/6 mx-auto text-left">
              {events.map((event, index) => (
                <li key={index}>
                  <CalendarEvent event={event} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="bold text-xl">
              Nothing outside of our usual programming happening soon &#8212;
              check back later!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
