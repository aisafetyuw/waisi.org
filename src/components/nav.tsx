"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MobileNavProps } from "@/types";
import { useTheme } from "./ThemeProvider";

function MobileNav({ open, setOpen, pathname }: MobileNavProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const linkColor = isDark ? "#FFFFFF" : "#1A1A1A";

  return (
    <div
      className={`md:hidden absolute top-0 left-0 h-screen w-screen transition-all duration-500 ease-in-out filter ${open ? "z-50 opacity-100 translate-y-2" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      style={{ backgroundColor: isDark ? "#000000" : "#FFFFFF" }}
    >
      <div className="flex flex-col justify-center items-center mt-28">
        <Link
          href="/"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/" ? "underline" : ""}`}
          style={{
            color: pathname == "/" ? "#6B46C1" : linkColor,
          }}
        >
          Home
        </Link>
        <Link
          href="/programs"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/programs" ? "underline" : ""}`}
          style={{
            color: pathname == "/programs" ? "#6B46C1" : linkColor,
          }}
        >
          Get Involved
        </Link>
        <Link
          href="/events"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/events" ? "underline" : ""}`}
          style={{
            color: pathname == "/events" ? "#6B46C1" : linkColor,
          }}
        >
          Events
        </Link>
        <Link
          href="/research"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/research" ? "underline" : ""}`}
          style={{
            color: pathname == "/research" ? "#6B46C1" : linkColor,
          }}
        >
          Research
        </Link>
        <Link
          href="/resources"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/resources" ? "underline" : ""}`}
          style={{
            color: pathname == "/resources" ? "#6B46C1" : linkColor,
          }}
        >
          Resources
        </Link>
        <Link
          href="/team"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/team" ? "underline" : ""}`}
          style={{
            color: pathname == "/team" ? "#6B46C1" : linkColor,
          }}
        >
          Team
        </Link>
        <Link
          href="/contact"
          className={`text-2xl font-semibold my-4 hover:underline ${pathname == "/contact" ? "underline" : ""}`}
          style={{
            color: pathname == "/contact" ? "#6B46C1" : linkColor,
          }}
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
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === "/";
  const { theme, toggleTheme } = useTheme();

  // Close mobile menu on navigation (Firefox fix)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(false);
      return;
    }

    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          const aboutSection = document.getElementById("about");
          // Defensive check: only update if element exists
          if (aboutSection) {
            const aboutTop = aboutSection.getBoundingClientRect().top;
            const shouldBeScrolled = aboutTop <= 0;
            // Only update state if the value has changed
            setScrolled((prev) =>
              prev === shouldBeScrolled ? prev : shouldBeScrolled,
            );
          } else {
            // Element doesn't exist (not on homepage or during navigation) - reset to false
            setScrolled(false);
          }
          ticking = false;
        });
      }
    };

    // Small delay to ensure DOM is ready (Safari fix)
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isHomePage]);

  const isTransparent = isHomePage && !scrolled;
  const isDark = theme === "dark";
  const navBackground = isTransparent ? "transparent" : isDark ? "#000000" : "#FFFFFF";

  return (
    <nav
      className="fixed top-4 left-4 right-4 z-50 transition-all duration-300"
      style={{
        backgroundColor: navBackground,
        borderRadius: "16px",
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: isTransparent ? "none" : isDark ? "none" : "0 2px 16px rgba(0, 0, 0, 0.08)",
      }}
    >
      <MobileNav open={open} setOpen={setOpen} pathname={pathname} />

      <div className="flex justify-between items-center mx-auto">
        <div className="flex items-center p-3">
          <Link href="/" className="z-10 flex items-center gap-3">
            <Image
              src={isTransparent || isDark ? "/wordmark_dark.png" : "/wordmark_light.png"}
              width={120}
              height={120}
              alt="WAISI logo"
            />
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-4 p-4 text-lg font-semibold underline-offset-8 z-50 md:flex hidden">
          {/* <Link href="/" className={`p-2 hover:underline ${pathname=="/" ? "underline" : ""}`}>Home</Link> */}
          <Link
            href="/programs"
            className={`p-2 hover:underline ${pathname == "/programs" ? "underline" : ""}`}
            style={{
              color:
                pathname == "/programs"
                  ? "#6B46C1"
                  : isTransparent
                    ? "#FFF9F0"
                    : isDark ? "#FFFFFF" : "#1A1A1A",
            }}
          >
            Get Involved
          </Link>
          <Link
            href="/events"
            className={`p-2 hover:underline ${pathname == "/events" ? "underline" : ""}`}
            style={{
              color:
                pathname == "/events"
                  ? "#6B46C1"
                  : isTransparent
                    ? "#FFF9F0"
                    : isDark ? "#FFFFFF" : "#1A1A1A",
            }}
          >
            Events
          </Link>
          <Link
            href="/research"
            className={`p-2 hover:underline ${pathname == "/research" ? "underline" : ""}`}
            style={{
              color:
                pathname == "/research"
                  ? "#6B46C1"
                  : isTransparent
                    ? "#FFF9F0"
                    : isDark ? "#FFFFFF" : "#1A1A1A",
            }}
          >
            Research
          </Link>
          <Link
            href="/resources"
            className={`p-2 hover:underline ${pathname == "/resources" ? "underline" : ""}`}
            style={{
              color:
                pathname == "/resources"
                  ? "#6B46C1"
                  : isTransparent
                    ? "#FFF9F0"
                    : isDark ? "#FFFFFF" : "#1A1A1A",
            }}
          >
            Resources
          </Link>
          <Link
            href="/team"
            className={`p-2 hover:underline ${pathname == "/team" ? "underline" : ""}`}
            style={{
              color:
                pathname == "/team"
                  ? "#6B46C1"
                  : isTransparent
                    ? "#FFF9F0"
                    : isDark ? "#FFFFFF" : "#1A1A1A",
            }}
          >
            Team
          </Link>
          <Link
            href="/contact"
            className={`p-2 hover:underline ${pathname == "/contact" ? "underline" : ""}`}
            style={{
              color:
                pathname == "/contact"
                  ? "#6B46C1"
                  : isTransparent
                    ? "#FFF9F0"
                    : isDark ? "#FFFFFF" : "#1A1A1A",
            }}
          >
            Contact
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-all duration-300 hover:opacity-80"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isTransparent ? "#FFF9F0" : "#1A1A1A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </div>

        <div className="w-4/5 md:hidden flex justify-end p-4 items-center gap-3">
          <button
            onClick={toggleTheme}
            className="z-50 p-2 rounded-lg transition-all duration-300 hover:opacity-80"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isTransparent ? "#FFF9F0" : isDark ? "#FFFFFF" : "#6B46C1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isTransparent ? "#FFF9F0" : isDark ? "#FFFFFF" : "#6B46C1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
          <div
            className="group z-50 w-6 h-6 cursor-pointer flex-col justify-between items-center flex"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <span
              className={`h-1 w-full rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-2.5" : ""}`}
              style={{
                backgroundColor:
                  isTransparent ? "#FFF9F0" : isDark ? "#FFFFFF" : "#6B46C1",
              }}
            />
            <span
              className={`h-1 w-full rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${open ? "w-px" : "w-full"}`}
              style={{
                backgroundColor:
                  isTransparent ? "#FFF9F0" : isDark ? "#FFFFFF" : "#6B46C1",
              }}
            />
            <span
              className={`h-1 w-full rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-2.5" : ""}`}
              style={{
                backgroundColor:
                  isTransparent ? "#FFF9F0" : isDark ? "#FFFFFF" : "#6B46C1",
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
