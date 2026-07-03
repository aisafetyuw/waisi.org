'use client';

import { useState, useEffect } from 'react';
import CalendarEvent from '@/components/calendarEvent';
import { CalendarEventData } from '@/types';

export default function Events() {
  const [events, setEvents] = useState<CalendarEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error(`Events request failed with status ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(true);
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
          <p className='text-xl'>Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="events">
        <div className="text-center">
          <p className='bold text-xl'>
            We couldn&apos;t load upcoming events right now &#8212; please check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="events">
      <div className="text-center">
        {events && events.length > 0 ?
          <ul className="md:w-5/6 mx-auto text-left">
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
