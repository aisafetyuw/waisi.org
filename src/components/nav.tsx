"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { MobileNavProps } from "@/types";

function MobileNav({ open, setOpen, pathname }: MobileNavProps) {
  return (
    <div
      id="mobile-navigation"
      hidden={!open}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) setOpen(false);
      }}
      className="md:hidden absolute top-0 left-0 h-dvh w-full overflow-y-auto z-50 bg-page"
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
  return <Navigation key={pathname} pathname={pathname} />;
}

function Navigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    navRef.current?.querySelector<HTMLAnchorElement>("#mobile-navigation a")?.focus();
    return () => { document.body.style.overflow = overflow; };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) {
        const menuHadFocus = navRef.current?.querySelector("#mobile-navigation")?.contains(document.activeElement)
          || document.activeElement === buttonRef.current;
        setOpen(false);
        if (menuHadFocus) navRef.current?.querySelector<HTMLAnchorElement>("[data-nav-logo]")?.focus();
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

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
      ref={navRef}
      aria-label="Main navigation"
      onKeyDown={(event) => {
        if (!open) return;
        if (event.key === "Escape") {
          event.preventDefault();
          setOpen(false);
          buttonRef.current?.focus();
        }
        if (event.key === "Tab") {
          const links = Array.from(navRef.current?.querySelectorAll<HTMLAnchorElement>("#mobile-navigation a") ?? []);
          const first = links[0];
          const last = buttonRef.current;
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }}
      className={`w-full z-50 transition-colors duration-300 ${
        isHome ? "fixed top-0" : "relative"
      } ${isTransparent ? "bg-transparent" : "bg-page"}`}
    >
      <MobileNav open={open} pathname={pathname} setOpen={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) buttonRef.current?.focus();
      }} />

      <div className="flex justify-between items-center mx-auto max-w-6xl px-6">
        <div className="flex items-center py-3">
          <Link href="/" data-nav-logo tabIndex={open ? -1 : undefined} className="z-10 flex items-center gap-3">
            <Image
              src={isTransparent ? "/waisi_white_full.png" : "/waisi_black_full.png"}
              width={120}
              height={120}
              alt="WAISI logo"
            />
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-4 py-4 -mr-2 text-lg font-medium z-50 md:flex hidden">
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

        <div className="w-4/5 md:hidden flex justify-end p-4 items-center gap-3">
          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
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
          </button>
        </div>
      </div>
    </nav>
  );
}
