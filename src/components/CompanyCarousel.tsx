"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Company {
  name: string;
  logo: string;
  bgColor: string;
  website?: string;
}

interface CompanyCarouselProps {
  companies: Company[];
}

// Auto-scrolling logo marquee. The list is duplicated and scrollLeft wraps at
// the halfway point for a seamless loop. The RAF loop mutates scrollLeft
// directly (no per-frame React state). Users can drag to scroll; a drag
// suppresses the click so logo links only open on a deliberate click.
export default function CompanyCarousel({ companies }: CompanyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const dragState = useRef({ dragging: false, startX: 0, startScroll: 0, moved: 0 });

  const duplicatedCompanies = [...companies, ...companies];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const speed = 0.5; // px per frame
    let rafId: number;

    const tick = () => {
      if (!pausedRef.current) {
        const half = el.scrollWidth / 2;
        if (half > 0) {
          el.scrollLeft = el.scrollLeft + speed >= half ? 0 : el.scrollLeft + speed;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = {
      dragging: true,
      startX: e.pageX,
      startScroll: el.scrollLeft,
      moved: 0,
    };
    pausedRef.current = true;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    const d = dragState.current;
    if (!el || !d.dragging) return;
    e.preventDefault();
    const walk = e.pageX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(walk));
    el.scrollLeft = d.startScroll - walk;
  };

  const endDrag = () => {
    dragState.current.dragging = false;
    setTimeout(() => {
      pausedRef.current = false;
    }, 800);
  };

  // A real drag shouldn't open the logo's link on release.
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.moved > 8) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="w-full pt-16 pb-8">
      <h2 className="text-3xl font-semibold text-center mb-8 px-8 text-heading">
        Our Members Have Collaborated With
      </h2>

      <div className="relative overflow-hidden">
        {/* Gradient fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg-page), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg-page), transparent)" }}
        />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onClickCapture={onClickCapture}
        >
          {duplicatedCompanies.map((company, index) => {
            const content = (
              <>
                <div className="w-32 h-24 mb-2 flex items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={120}
                    height={96}
                    className="max-h-full max-w-full w-auto h-auto object-contain"
                    unoptimized={company.logo.startsWith("http")}
                  />
                </div>
                <span className="text-xs font-medium text-center leading-tight text-primary">
                  {company.name}
                </span>
              </>
            );

            return company.website ? (
              <a
                key={`${company.name}-${index}`}
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="flex-shrink-0 flex flex-col items-center justify-start p-4 h-40 w-48 group"
              >
                {content}
              </a>
            ) : (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 flex flex-col items-center justify-start p-4 h-40 w-48"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
