'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MobileNavProps } from '@/types';

function MobileNav({open, setOpen, pathname}: MobileNavProps) {
  return (
    <div className={`md:hidden absolute top-0 left-0 h-screen w-screen transition-all duration-500 ease-in-out filter ${open ? "z-50 opacity-100 translate-y-2" : "opacity-0 -translate-y-2"}`} style={{backgroundColor: '#FFF9F0'}}>

      <div className="flex flex-col justify-center items-center mt-28">
        <a href="/" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/" ? "underline" : ""}`} style={{color: pathname=="/" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>Home</a>
        <a href="/about" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/about" ? "underline" : ""}`} style={{color: pathname=="/about" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>About</a>
        <a href="/programs" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/programs" ? "underline" : ""}`} style={{color: pathname=="/programs" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>Get Involved</a>
        {/* <a href="/events" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/events" ? "underline" : ""}`}>Events</a> */}
        <a href="/research" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/research" ? "underline" : ""}`} style={{color: pathname=="/research" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>Research</a>
        <a href="/resources" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/resources" ? "underline" : ""}`} style={{color: pathname=="/resources" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>Resources</a>
        <a href="/team" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/team" ? "underline" : ""}`} style={{color: pathname=="/team" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>Team</a>
        <a href="/contact" className={`text-2xl font-semibold my-4 hover:underline ${pathname=="/contact" ? "underline" : ""}`} style={{color: pathname=="/contact" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>Contact</a>
      </div>
    </div>
  )
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{backgroundColor: '#FFF9F0'}}>
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
            <span className="text-2xl font-bold" style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}>
              WAISI
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-4 p-4 text-lg font-semibold underline-offset-8 z-50 md:flex hidden">
          {/* <Link href="/" className={`p-2 hover:underline ${pathname=="/" ? "underline" : ""}`}>Home</Link> */}
          <Link href="/about" className={`p-2 hover:underline ${pathname=="/about" ? "underline" : ""}`} style={{color: pathname=="/about" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>About</Link>
          <Link href="/programs" className={`p-2 hover:underline ${pathname=="/programs" ? "underline" : ""}`} style={{color: pathname=="/programs" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>Get Involved</Link>
          {/* <Link href="/events" className={`p-2 hover:underline ${pathname=="/events" ? "underline" : ""}`}>Events</Link> */}
          <Link href="/research" className={`p-2 hover:underline ${pathname=="/research" ? "underline" : ""}`} style={{color: pathname=="/research" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>Research</Link>
          <Link href="/resources" className={`p-2 hover:underline ${pathname=="/resources" ? "underline" : ""}`} style={{color: pathname=="/resources" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>Resources</Link>
          <Link href="/team" className={`p-2 hover:underline ${pathname=="/team" ? "underline" : ""}`} style={{color: pathname=="/team" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>Team</Link>
          <Link href="/contact" className={`p-2 hover:underline ${pathname=="/contact" ? "underline" : ""}`} style={{color: pathname=="/contact" ? '#6B46C1' : '#2D2A26', fontFamily: '"Lora", serif'}}>Contact</Link>
        </div>

        <div className="w-4/5 md:hidden flex justify-end p-4 items-center">
          <div className="group z-50 w-6 h-6 cursor-pointer flex-col justify-between items-center flex" onClick={() => { setOpen(!open) }}>
            <span className={`h-1 w-full rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-2.5" : ""}`} style={{backgroundColor: '#6B46C1'}} />
            <span className={`h-1 w-full rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${open ? "w-px" : "w-full"}`} style={{backgroundColor: '#6B46C1'}} />
            <span className={`h-1 w-full rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-2.5" : ""}`} style={{backgroundColor: '#6B46C1'}} />
          </div>
        </div>
      </div>
    </nav>
  )
}