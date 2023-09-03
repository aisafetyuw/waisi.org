import getEvents from '@/app/events/getEvents';
// import CalendarEvent from '@/components/calendarEvent';

export default async function Events() {
  const events = await getEvents();

  return (
    <div id="events" className="page">
      {/* <h2>Events</h2>
      <ul>
        {events!.map((event, index) => (
          <li>
            <CalendarEvent key={index} event={event} />
          </li>
        ))}
      </ul> */}
    </div>
  )
}