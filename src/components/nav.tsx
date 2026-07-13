"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MobileNavProps } from "@/types";

function MobileNav({ open, setOpen, pathname }: MobileNavProps) {
  return (
    <div
      className={`md:hidden absolute top-0 left-0 h-screen w-screen transition-all duration-500 ease-in-out filter bg-page ${open ? "z-50 opacity-100 translate-y-2" : "opacity-0 -translate-y-2 pointer-events-none"}`}
    >
      <div className="flex flex-col justify-center items-center mt-28">
        <Link
          href="/"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/" ? "underline text-heading" : "text-primary"}`}
        >
          Home
        </Link>
        <Link
          href="/programs"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/programs" ? "underline text-heading" : "text-primary"}`}
        >
          Get Involved
        </Link>
        <Link
          href="/research"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/research" ? "underline text-heading" : "text-primary"}`}
        >
          Research
        </Link>
        <Link
          href="/resources"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/resources" ? "underline text-heading" : "text-primary"}`}
        >
          Resources
        </Link>
        <Link
          href="/team"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/team" ? "underline text-heading" : "text-primary"}`}
        >
          Team
        </Link>
        <Link
          href="/contact"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/contact" ? "underline text-heading" : "text-primary"}`}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile menu on navigation (Firefox fix)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // The nav is always a solid paper shell; the old transparent-over-photo
  // hero state went away with the photo hero.
  const isTransparent = false;

  return (
    <nav className="relative w-full z-50 bg-page">
      <MobileNav open={open} setOpen={setOpen} pathname={pathname} />

      <div className="flex justify-between items-center mx-auto max-w-6xl px-6">
        <div className="flex items-center py-3">
          <Link href="/" className="z-10 flex items-center gap-3">
            <Image
              src={isTransparent ? "/waisi_white_full.png" : "/waisi_black_full.png"}
              width={120}
              height={120}
              alt="WAISI logo"
            />
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-4 py-4 -mr-2 text-lg font-medium underline-offset-8 z-50 md:flex hidden">
          <Link
            href="/programs"
            className={`p-2 hover:underline ${pathname == "/programs" ? "underline text-heading" : isTransparent ? "text-cream" : "text-primary"}`}
          >
            Get Involved
          </Link>
          <Link
            href="/research"
            className={`p-2 hover:underline ${pathname == "/research" ? "underline text-heading" : isTransparent ? "text-cream" : "text-primary"}`}
          >
            Research
          </Link>
          <Link
            href="/resources"
            className={`p-2 hover:underline ${pathname == "/resources" ? "underline text-heading" : isTransparent ? "text-cream" : "text-primary"}`}
          >
            Resources
          </Link>
          <Link
            href="/team"
            className={`p-2 hover:underline ${pathname == "/team" ? "underline text-heading" : isTransparent ? "text-cream" : "text-primary"}`}
          >
            Team
          </Link>
          <Link
            href="/contact"
            className={`p-2 hover:underline ${pathname == "/contact" ? "underline text-heading" : isTransparent ? "text-cream" : "text-primary"}`}
          >
            Contact
          </Link>
        </div>

        <div className="w-4/5 md:hidden flex justify-end p-4 items-center gap-3">
          <div
            className="group z-50 w-6 h-6 cursor-pointer flex-col justify-between items-center flex"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <span
              className={`h-1 w-full rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-2.5" : ""} ${isTransparent ? "bg-cream" : "bg-brand"}`}
            />
            <span
              className={`h-1 w-full rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${open ? "w-px" : "w-full"} ${isTransparent ? "bg-cream" : "bg-brand"}`}
            />
            <span
              className={`h-1 w-full rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-2.5" : ""} ${isTransparent ? "bg-cream" : "bg-brand"}`}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
