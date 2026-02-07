import { CalendarEventData } from "@/types";

export default function CalendarEvent({ event }: { event: CalendarEventData }) {
  function formatDate(dateString: string, isAllDay: boolean): string {
    const date = new Date(dateString);

    if (isAllDay) {
        date.setDate(date.getDate() + 1);
    }

    return `${date.toLocaleString('default', { month: 'short' })}. ${date.getDate()}`;
  }

  function formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' }).replace(/^0+/, '');
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
          <a href={event.htmlLink} title="View in Google Calendar" target="_blank" className="hover:opacity-80">
            <i className="fa-regular fa-calendar mb-3"></i>
            &nbsp;&nbsp;
            <span style={{ color: "#1F2937" }}>{event.summary}</span>
          </a>
        </h3>
      }
      <hr className="mb-1" />
      {event.start &&
        <span className="text-sm" style={{ color: "#1A1A1A" }}>
          <i className="fa-regular fa-clock text-sm mb-3" style={{ color: "#6B7280" }}></i>
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
            <i className="fa-solid text-sm fa-location-dot"></i>
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