import getEvents from '@/app/events/getEvents';
import CalendarEvent from '@/components/calendarEvent';

export default async function Events() {
  const events = await getEvents();

  return (
    <div id="events">
      {events && events.length > 0 &&
        <div>
          <h2>Upcoming Events</h2>
          <ul className="md:w-5/6">
            {events.map((event, index) => (
              <li key={index}>
                <CalendarEvent key={index} event={event} />
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}