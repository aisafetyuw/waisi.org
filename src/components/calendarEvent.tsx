// import { EventProps } from "@/types";
//
// export default function CalendarEvent({ event }: EventProps) {
//   return (
//     <div>
//       <h3>{event.summary}</h3>
//         <a href={event.htmlLink} target="_blank">View in Google Calendar</a>
//         <p>
//           <span className="event-start-time">{new Date(event.start.dateTime).toLocaleString()}</span>
//           <span> to </span>
//           <span className="event-end-time">{new Date(event.end.dateTime).toLocaleString()}</span>
//         </p>
//         <p>{event.location}</p>
//         {event.description && <p>{event.description}</p>}
//     </div>
//   );
// }