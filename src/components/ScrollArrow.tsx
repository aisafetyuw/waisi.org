"use client";

import { useState, useEffect } from "react";

// The one interactive piece of the homepage hero: a bounce arrow that fades
// out once the visitor scrolls. Isolated here so the rest of the homepage can
// stay a server component.
export default function ScrollArrow() {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const originalScrollRestoration =
      "scrollRestoration" in window.history
        ? window.history.scrollRestoration
        : "auto";

    // Disable browser scroll restoration for Firefox compatibility.
    // Only affects this page - restored when navigating away.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          const shouldShow = window.scrollY < 100;
          setShowArrow((prev) => (prev === shouldShow ? prev : shouldShow));
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = originalScrollRestoration;
      }
    };
  }, []);

  return (
    <div
      className="absolute bottom-8 animate-bounce transition-opacity duration-300"
      style={{
        opacity: showArrow ? 0.6 : 0,
        pointerEvents: showArrow ? "auto" : "none",
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1C1B1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </div>
  );
}
