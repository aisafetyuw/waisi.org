'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <Image className="absolute z-0 opacity-30 max-h-32 py-6 w-full"
        src="/Wave.png"
        width={1920}
        height={200}
        alt=""
      />
      <div id="nav" className="flex justify-between items-center">
        <div className="flex items-center p-6">
          <Image className="z-10"
            src="/waisi_gradient_rounded.png"
            width={75}
            height={75}
            alt="WAISI logo"
          />
        </div>
        <div id="links" className="flex items-center justify-end space-x-4 p-8 text-lg underline-offset-8 z-10">
          <Link href="/" className={pathname=="/" ? "p-2 underline" : "p-2"}>Home</Link>
          <Link href="/about" className={pathname=="/about" ? "p-2 underline" : "p-2"}>About</Link>
          <Link href="/events" className={pathname=="/events" ? "p-2 underline" : "p-2"}>Events</Link>
          {/*<Link href="/projects" className={pathname=="/projects" ? "p-2 underline" : "p-2"}>Projects</Link>*/}
        </div>
      </div>
    </nav>
  )
}