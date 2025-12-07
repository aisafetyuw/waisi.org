'use client';

import { useState, useEffect } from 'react';
import CalendarEvent from '@/components/calendarEvent';
import { CalendarEventData } from '@/types';

export default function Events() {
  const [events, setEvents] = useState<CalendarEventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div id="events">
        <div>
          <h2 className="font-bold">Upcoming Events</h2>
          <p className='text-xl'>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="events">
      <div>
        <h2 className="font-bold">Upcoming Events</h2>
        {events && events.length > 0 ?
          <ul className="md:w-5/6">
            {events.map((event, index) => (
              <li key={index}>
                <CalendarEvent event={event} />
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
