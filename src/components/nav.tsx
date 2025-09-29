'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MobileNavProps } from '@/types';

function MobileNav({open, setOpen, pathname}: MobileNavProps) {
  return (
    <div className={`md:hidden absolute top-0 left-0 h-screen w-screen bg-white transition-all duration-500 ease-in-out filter ${open ? "z-50 opacity-100 translate-y-2" : "opacity-0 -translate-y-2"}`}>

      <div className="flex flex-col justify-center items-center mt-28">
        <a href="/" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/" ? "underline" : ""}`}>Home</a>
        <a href="/about" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/about" ? "underline" : ""}`}>About</a>
        <a href="/programs" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/programs" ? "underline" : ""}`}>Get Involved</a>
        {/* <a href="/events" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/events" ? "underline" : ""}`}>Events</a> */}
        <a href="/research" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/research" ? "underline" : ""}`}>Research</a>
        <a href="/resources" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/resources" ? "underline" : ""}`}>Resources</a>
        <a href="/team" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/team" ? "underline" : ""}`}>Team</a>
        <a href="/contact" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/contact" ? "underline" : ""}`}>Contact</a>
      </div>
    </div>
  )
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
      <MobileNav open={open} setOpen={setOpen} pathname={pathname}/>

      <div className="flex justify-between items-center mx-auto">
        <div className="flex items-center p-3">
          <Link href="/" className="z-10 flex items-center gap-3">
            <Image
              src="/waisi_gradient_rounded.png"
              // src="/waisi_banner.png"
              width={60}
              height={60}
              alt="WAISI logo"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              WAISI
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-4 p-4 text-lg font-semibold underline-offset-8 z-50 md:flex hidden">
          {/* <Link href="/" className={`p-2 hover:underline ${pathname=="/" ? "underline" : ""}`}>Home</Link> */}
          <Link href="/about" className={`p-2 hover:underline ${pathname=="/about" ? "underline" : ""}`}>About</Link>
          <Link href="/programs" className={`p-2 hover:underline ${pathname=="/programs" ? "underline" : ""}`}>Get Involved</Link>
          {/* <Link href="/events" className={`p-2 hover:underline ${pathname=="/events" ? "underline" : ""}`}>Events</Link> */}
          <Link href="/research" className={`p-2 hover:underline ${pathname=="/research" ? "underline" : ""}`}>Research</Link>
          <Link href="/resources" className={`p-2 hover:underline ${pathname=="/resources" ? "underline" : ""}`}>Resources</Link>
          <Link href="/team" className={`p-2 hover:underline ${pathname=="/team" ? "underline" : ""}`}>Team</Link>
          <Link href="/contact" className={`p-2 hover:underline ${pathname=="/contact" ? "underline" : ""}`}>Contact</Link>
        </div>

        <div className="w-4/5 md:hidden flex justify-end p-4 items-center">
          <div className="group z-50 w-6 h-6 cursor-pointer flex-col justify-between items-center flex" onClick={() => { setOpen(!open) }}>
            <span className={`h-1 w-full bg-black rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`h-1 w-full bg-black rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${open ? "w-px" : "w-full"}`} />
            <span className={`h-1 w-full bg-black rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </div>
      </div>
    </nav>
  )
}