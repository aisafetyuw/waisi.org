import getEvents from '@/app/events/getEvents';
import CalendarEvent from '@/components/calendarEvent';

export default async function Events() {
  const events = await getEvents();

  return (
    <div id="events">
        <div>
          <h2>Upcoming Events</h2>
          {events && events.length > 0 ?
            <ul className="md:w-5/6">
              {events.map((event, index) => (
                <li key={index}>
                  <CalendarEvent key={index} event={event} />
                </li>
              ))}
            </ul> :
            <p className='bold text-xl'>
              Nothing outside of our usual programming happening soon &#8212; check back later!
            </p>
          }
        </div>
    </div>
  )
}