import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {enabled} from '@/lib/coffee-chats/config.mjs';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Leadership coffee chats',description:'Find a time to meet WAISI leadership.',robots:{index:false,follow:false}};
export default function CoffeeChats(){
  if(!enabled())notFound();
  return <section data-coffee-chats-page className="-mx-10 h-full min-h-0" aria-label="WAISI leadership coffee chats">
    <h1 className="sr-only">WAISI leadership coffee chats</h1>
    <iframe title="Find a coffee chat with WAISI leadership" src="/coffee-chats/embed/index.html" className="block h-full w-full border-0" />
  </section>;
}
