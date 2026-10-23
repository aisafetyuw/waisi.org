import type {Metadata} from 'next';
export const metadata:Metadata={title:'Coffee chat privacy'};
export default function CoffeeChatPrivacy(){return <article className="mx-auto max-w-3xl py-12 space-y-5">
  <h1 className="text-heading">Coffee chat privacy</h1>
  <p>WAISI coffee chats helps visitors compare public leadership appointment times with their own availability.</p>
  <h2 className="text-xl font-semibold">Your Google Calendar</h2>
  <p>Calendar connection is optional. With your permission, this page asks Google for busy periods on your primary calendar. It does not request event titles, descriptions, guests, or permission to change events.</p>
  <p>Your Google access token and busy periods stay in this page’s memory. WAISI does not send them to its server or store them in browser storage. Reloading or closing the page clears them. Google access expires, and you can reconnect when needed.</p>
  <p>Disconnect clears this page’s data and asks Google to revoke this app’s access. You can also remove access through <a className="text-link underline" href="https://myaccount.google.com/connections" target="_blank" rel="noopener noreferrer">your Google Account connections</a>.</p>
  <h2 className="text-xl font-semibold">Leadership availability and bookings</h2>
  <p>WAISI reads public booking pages and briefly caches appointment times. Those providers receive the public availability requests. A booking link opens the provider’s website, where its privacy policy applies. This page does not create or reserve appointments.</p>
  <h2 className="text-xl font-semibold">Operational data</h2>
  <p>The hosting provider processes ordinary request logs, which can include an IP address and browser information. Application diagnostics contain provider identifiers, check times, and error codes. They exclude Google tokens and your calendar data.</p>
  <p>Contact <a className="text-link underline" href="mailto:aisafetyuw@gmail.com">aisafetyuw@gmail.com</a> with questions.</p>
</article>;}
