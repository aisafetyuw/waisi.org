"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MobileNavProps } from "@/types";

function MobileNav({ open, setOpen, pathname }: MobileNavProps) {
  const linkColor = "#1A1A1A";

  return (
    <div
      className={`md:hidden absolute top-0 left-0 h-screen w-screen transition-all duration-500 ease-in-out filter ${open ? "z-50 opacity-100 translate-y-2" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      style={{ backgroundColor: "#FFFFFF" }}
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
          if (aboutSection) {
            const aboutTop = aboutSection.getBoundingClientRect().top;
            const shouldBeScrolled = aboutTop <= 0;
            setScrolled((prev) =>
              prev === shouldBeScrolled ? prev : shouldBeScrolled,
            );
          } else {
            setScrolled(false);
          }
          ticking = false;
        });
      }
    };

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
  const navBackground = isTransparent ? "transparent" : "#FFFFFF";

  return (
    <nav
      className="fixed top-4 left-4 right-4 z-50 transition-all duration-300"
      style={{
        backgroundColor: navBackground,
        borderRadius: "16px",
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: isTransparent ? "none" : "0 2px 16px rgba(0, 0, 0, 0.08)",
      }}
    >
      <MobileNav open={open} setOpen={setOpen} pathname={pathname} />

      <div className="flex justify-between items-center mx-auto">
        <div className="flex items-center p-3">
          <Link href="/" className="z-10 flex items-center gap-3">
            <Image
              src={isTransparent ? "/waisi_white_full.png" : "/waisi_black_full.png"}
              width={120}
              height={120}
              alt="WAISI logo"
            />
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-4 p-4 text-lg font-semibold underline-offset-8 z-50 md:flex hidden">
          <Link
            href="/programs"
            className={`p-2 hover:underline ${pathname == "/programs" ? "underline" : ""}`}
            style={{
              color:
                pathname == "/programs"
                  ? "#6B46C1"
                  : isTransparent
                    ? "#FFF9F0"
                    : "#1A1A1A",
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
                    : "#1A1A1A",
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
                    : "#1A1A1A",
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
                    : "#1A1A1A",
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
                    : "#1A1A1A",
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
                    : "#1A1A1A",
            }}
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
              className={`h-1 w-full rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-2.5" : ""}`}
              style={{
                backgroundColor: isTransparent ? "#FFF9F0" : "#6B46C1",
              }}
            />
            <span
              className={`h-1 w-full rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${open ? "w-px" : "w-full"}`}
              style={{
                backgroundColor: isTransparent ? "#FFF9F0" : "#6B46C1",
              }}
            />
            <span
              className={`h-1 w-full rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-2.5" : ""}`}
              style={{
                backgroundColor: isTransparent ? "#FFF9F0" : "#6B46C1",
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
