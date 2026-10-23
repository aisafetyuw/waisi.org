"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MobileNavProps } from "@/types";

function MobileNav({ open, setOpen, pathname }: MobileNavProps) {
  return (
    <div
      inert={!open}
      className={`lg:hidden absolute top-0 left-0 h-screen w-screen transition-all duration-500 ease-in-out filter bg-page ${open ? "z-50 opacity-100 translate-y-2" : "opacity-0 -translate-y-2 pointer-events-none"}`}
    >
      <div className="flex flex-col justify-center items-center mt-28">
        <Link
          href="/"
          className={`text-2xl font-semibold my-4 transition-colors ${pathname == "/" ? "text-brand" : "text-primary hover:text-brand active:text-link-hover"}`}
        >
          Home
        </Link>
        <Link
          href="/programs"
          className={`text-2xl font-semibold my-4 transition-colors ${pathname == "/programs" ? "text-brand" : "text-primary hover:text-brand active:text-link-hover"}`}
        >
          Get Involved
        </Link>
        <Link
          href="/events"
          className={`text-2xl font-semibold my-4 transition-colors ${pathname == "/events" ? "text-brand" : "text-primary hover:text-brand active:text-link-hover"}`}
        >
          Events
        </Link>
        <Link
          href="/research"
          className={`text-2xl font-semibold my-4 transition-colors ${pathname == "/research" ? "text-brand" : "text-primary hover:text-brand active:text-link-hover"}`}
        >
          Research
        </Link>
        <Link
          href="/resources"
          className={`text-2xl font-semibold my-4 transition-colors ${pathname == "/resources" ? "text-brand" : "text-primary hover:text-brand active:text-link-hover"}`}
        >
          Resources
        </Link>
        <Link
          href="/team"
          className={`text-2xl font-semibold my-4 transition-colors ${pathname == "/team" ? "text-brand" : "text-primary hover:text-brand active:text-link-hover"}`}
        >
          Team
        </Link>
        <Link
          href="/contact"
          className={`text-2xl font-semibold my-4 transition-colors ${pathname == "/contact" ? "text-brand" : "text-primary hover:text-brand active:text-link-hover"}`}
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

  // On the home page the nav floats transparent over the full-screen photo
  // hero and turns solid once its bottom edge scrolls past the hero. The
  // 80px matches the nav's own height (hero is h-screen, nav overlays it).
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight - 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isTransparent = isHome && !scrolled && !open;

  return (
    <nav
      className={`w-full z-50 transition-colors duration-300 ${
        isHome ? "fixed top-0" : "relative"
      } ${isTransparent ? "bg-transparent" : "bg-page"}`}
    >
      <MobileNav open={open} setOpen={setOpen} pathname={pathname} />

      <div className="flex justify-between items-center gap-3 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex shrink-0 items-center py-3">
          <Link href="/" className="z-10 flex items-center gap-3">
            <Image
              src={isTransparent ? "/waisi_white_full.png" : "/waisi_black_full.png"}
              width={120}
              height={120}
              alt="WAISI logo"
            />
          </Link>
        </div>

        <div className="items-center justify-end space-x-1 xl:space-x-4 py-4 ml-auto whitespace-nowrap text-base xl:text-lg font-medium z-50 lg:flex hidden">
          <Link
            href="/programs"
            className={`p-2 transition-colors ${pathname == "/programs" ? "text-brand" : isTransparent ? "text-cream hover:text-link-on-dark active:text-link-on-dark" : "text-primary hover:text-brand active:text-link-hover"}`}
          >
            Get Involved
          </Link>
          <Link
            href="/events"
            className={`p-2 transition-colors ${pathname == "/events" ? "text-brand" : isTransparent ? "text-cream hover:text-link-on-dark active:text-link-on-dark" : "text-primary hover:text-brand active:text-link-hover"}`}
          >
            Events
          </Link>
          <Link
            href="/research"
            className={`p-2 transition-colors ${pathname == "/research" ? "text-brand" : isTransparent ? "text-cream hover:text-link-on-dark active:text-link-on-dark" : "text-primary hover:text-brand active:text-link-hover"}`}
          >
            Research
          </Link>
          <Link
            href="/resources"
            className={`p-2 transition-colors ${pathname == "/resources" ? "text-brand" : isTransparent ? "text-cream hover:text-link-on-dark active:text-link-on-dark" : "text-primary hover:text-brand active:text-link-hover"}`}
          >
            Resources
          </Link>
          <Link
            href="/team"
            className={`p-2 transition-colors ${pathname == "/team" ? "text-brand" : isTransparent ? "text-cream hover:text-link-on-dark active:text-link-on-dark" : "text-primary hover:text-brand active:text-link-hover"}`}
          >
            Team
          </Link>
          <Link
            href="/contact"
            className={`p-2 transition-colors ${pathname == "/contact" ? "text-brand" : isTransparent ? "text-cream hover:text-link-on-dark active:text-link-on-dark" : "text-primary hover:text-brand active:text-link-hover"}`}
          >
            Contact
          </Link>
        </div>

        <div className="z-50 flex shrink-0 items-center gap-3 py-4">
          <Link
            href="/coffee-chats"
            onClick={() => setOpen(false)}
            aria-current={pathname === "/coffee-chats" ? "page" : undefined}
            className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-card bg-brand px-3 sm:px-4 py-2.5 text-sm lg:text-base font-semibold text-white transition-colors hover:bg-link-hover active:bg-link-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Book a chat
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="group lg:hidden w-6 h-6 cursor-pointer flex-col justify-between items-center flex"
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
          </button>
        </div>
      </div>
    </nav>
  );
}
