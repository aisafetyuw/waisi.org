import getEvents from '@/app/events/getEvents';

export default async function Events() {
  const events = await getEvents();

  console.log(events!.toString());

  return (
    <div id="events" className="page">
      <h2>Events</h2>
      <p>{}</p>
    </div>
  )
}