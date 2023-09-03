import { EventProps } from "@/types";

export default function CalendarEvent({ event }: EventProps) {
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
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

  return (
    <div className="bg-gray-50 shadow-lg rounded-lg my-4 p-4 h-full transform transition-transform hover:scale-105">
      {event.htmlLink &&
        <h3 className="mb-1 text-gray-500 hover:text-gray-700">
          <a href={event.htmlLink} title="View in Google Calendar" target="_blank">
            <i className="fa-regular fa-calendar mb-3"></i>
            &nbsp;&nbsp;
            <span className="text-gray-800">{event.summary}</span>
          </a>
        </h3>
      }
      <hr className="mb-1" />
      {event.start &&
        <span className="text-sm">
          <i className="fa-regular fa-clock text-sm text-gray-500 mb-3"></i>
          &nbsp;
          <span className="text-sm">
            {event.start.date ? formatDate(event.start.date) : formatDate(event.start.dateTime!)}
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
          <a className="text-sm text-gray-500 hover:text-gray-700" href={generateGoogleMapsURL(event.location)}>
            <i className="fa-solid text-sm fa-location-dot"></i>
            &nbsp;
            <span className="location">{event.location}</span>
          </a>
        </span>
      }
      {event.description &&
        <span>
          <hr className="mb-1" />
          <div className="text-sm event-description" dangerouslySetInnerHTML={{ __html: event.description }} />
        </span>
      }
    </div>
  );
}