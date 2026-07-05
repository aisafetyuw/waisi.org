import { CalendarEventData } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

// Events happen in Madison, so format dates/times in Central time explicitly.
// This also keeps rendering deterministic now that this runs on the server,
// where the machine timezone would otherwise be UTC.
const TIME_ZONE = 'America/Chicago';

export default function CalendarEvent({ event }: { event: CalendarEventData }) {
  function formatDate(dateString: string, isAllDay: boolean): string {
    const date = new Date(dateString);

    // All-day events come as bare dates ("2026-07-05"), which parse as UTC
    // midnight — format those in UTC so the calendar date is preserved.
    // Timed events carry a real instant — format those in Central time.
    const timeZone = isAllDay ? 'UTC' : TIME_ZONE;
    const month = date.toLocaleString('en-US', { month: 'short', timeZone });
    const day = date.toLocaleString('en-US', { day: 'numeric', timeZone });
    return `${month}. ${day}`;
  }

  function formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: TIME_ZONE }).replace(/^0+/, '');
  }

  function generateGoogleMapsURL(location: string): string {
    const baseURL = "https://www.google.com/maps/search/?api=1&query=";
    return baseURL + encodeURIComponent(location);
  }

  function formatDescription(description: string): string {
    description = description.replace(/(?<!^)<p>/g, '<br />');
    description = description.replace(/<\/p>(?!$)/g, '<br />');
    description = description.replace(/^<p>|<\/p>$/g, '');
    description = description.replace(/(<br \/>\s*){2,}/g, '<br />');
    return description;
  }

  return (
    <div className="shadow-lg rounded-lg my-4 p-4 h-full transform transition-transform hover:scale-105" style={{ backgroundColor: "#F9FAFB", color: "#1A1A1A" }}>
      {event.htmlLink &&
        <h3 className="mb-1" style={{ color: "#6B7280" }}>
          <a href={event.htmlLink} title="View in Google Calendar" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <FontAwesomeIcon icon={faCalendar} className="mb-3" />
            &nbsp;&nbsp;
            <span style={{ color: "#1F2937" }}>{event.summary}</span>
          </a>
        </h3>
      }
      <hr className="mb-1" />
      {event.start &&
        <span className="text-sm" style={{ color: "#1A1A1A" }}>
          <FontAwesomeIcon icon={faClock} className="text-sm mb-3" style={{ color: "#6B7280" }} />
          &nbsp;
          <span className="text-sm">
            {event.start.date ? formatDate(event.start.date, true) : formatDate(event.start.dateTime!, false)}
          </span>
          {event.start.dateTime && event.end && event.end.dateTime &&
            <span className="text-sm">
              ,&nbsp;
              {formatTime(event.start.dateTime)}
              {event.start.dateTime && <span>-</span>}
              {formatTime(event.end.dateTime)}
            </span>
          }
        </span>
      }
      {event.location &&
        <span className="text-sm">
          <br />
          <a className="text-sm hover:opacity-80" style={{ color: "#6B7280" }} href={generateGoogleMapsURL(event.location)}>
            <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
            &nbsp;
            <span className="location">{event.location}</span>
          </a>
        </span>
      }
      {event.description &&
        <span>
          <hr className="mb-1" />
          <div className="text-md event-description" style={{ color: "#1A1A1A" }} dangerouslySetInnerHTML={{ __html: formatDescription(event.description) }} />
        </span>
      }
    </div>
  );
}