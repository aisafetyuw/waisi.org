import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata:Metadata={
  title:'About WAISI coffee chats',
  description:'How WAISI coffee chats uses public appointment times and optional Google Calendar availability.',
};

export default function AboutCoffeeChats(){return <article className="mx-auto max-w-3xl py-12 space-y-5">
  <h1 className="text-heading">WAISI coffee chats</h1>
  <p>WAISI coffee chats helps fellows find a time to meet Wisconsin AI Safety Initiative leadership.</p>
  <p>The calendar brings public appointment times together. Fellows can filter by leader, time of day, time zone, and meeting format. Booking takes place on each leader’s booking provider.</p>
  <h2 className="text-xl font-semibold">Optional Google Calendar connection</h2>
  <p>You can connect your primary Google Calendar to hide appointment times that overlap with your busy periods. The app requests availability only. It does not read event titles, descriptions, or guests, and it cannot change your events.</p>
  <p>Your Google token and busy periods stay in the page’s memory. You can disconnect at any time. Read the <Link className="text-link underline" href="/coffee-chats/privacy">coffee chat privacy policy</Link> for details.</p>
  <p>The coffee-chat calendar is in a limited preview while WAISI completes its launch checks.</p>
  <p>For access or support, contact <a className="text-link underline" href="mailto:aisafetyuw@gmail.com">aisafetyuw@gmail.com</a>.</p>
</article>;}
