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
        <a href="/" className={`text-2xl font-semibold my-4 ${pathname=="/" ? "underline" : ""}`}>Home</a>
        <a href="/about" className={`text-2xl font-semibold my-4 ${pathname=="/about" ? "underline" : ""}`}>About</a>
        <a href="/programs" className={`text-2xl font-semibold my-4 ${pathname=="/programs" ? "underline" : ""}`}>Programs</a>
        <a href="/team" className={`text-2xl font-semibold my-4 ${pathname=="/team" ? "underline" : ""}`}>Team</a>
      </div>  
    </div>
  )
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false)

  return (
    <nav>
      <MobileNav open={open} setOpen={setOpen} pathname={pathname}/>

      <Image className="absolute z-0 opacity-40 max-h-32 py-6 w-full"
        src="/Wave.png"
        width={1920}
        height={200}
        alt=""
      />

      <div className="flex justify-between items-center mx-auto">
        <div className="flex items-center p-6">
          <Link href="/" className="z-10">
            <Image
              src="/waisi_gradient_rounded.png"
              width={80}
              height={80}
              alt="WAISI logo"
            />
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-4 p-8 text-lg font-semibold underline-offset-8 z-50 md:flex hidden">
          <Link href="/" className={`p-2 ${pathname=="/" ? "underline" : ""}`}>Home</Link>
          <Link href="/about" className={`p-2 ${pathname=="/about" ? "underline" : ""}`}>About</Link>
          <Link href="/programs" className={`p-2 ${pathname=="/programs" ? "underline" : ""}`}>Programs</Link>
          <Link href="/team" className={`p-2 ${pathname=="/team" ? "underline" : ""}`}>Team</Link>
        </div>

        <div className="w-4/5 md:hidden flex justify-end p-8 items-center">
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