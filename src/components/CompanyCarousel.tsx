'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Company {
  name: string;
  logo: string;
  bgColor: string;
  website?: string;
}

interface CompanyCarouselProps {
  companies: Company[];
}

export default function CompanyCarousel({ companies }: CompanyCarouselProps) {
  // Add custom CSS for hiding scrollbar
  const scrollbarHideStyles = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  // Add style tag to document head
  if (typeof document !== 'undefined' && !document.querySelector('#scrollbar-hide-styles')) {
    const style = document.createElement('style');
    style.id = 'scrollbar-hide-styles';
    style.innerHTML = scrollbarHideStyles;
    document.head.appendChild(style);
  }
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Duplicate companies for infinite scroll effect
  const duplicatedCompanies = [...companies, ...companies];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    const scrollSpeed = 1; // pixels per frame
    const scrollWidth = scrollContainer.scrollWidth / 2; // Half because we duplicated

    const scroll = () => {
      setScrollPosition((prev) => {
        const newPosition = prev + scrollSpeed;
        // Reset to beginning when we've scrolled through the first set
        if (newPosition >= scrollWidth) {
          return 0;
        }
        return newPosition;
      });
    };

    const animationId = setInterval(scroll, 30); // ~33fps

    return () => clearInterval(animationId);
  }, [isPaused, companies.length]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.scrollLeft = scrollPosition;
  }, [scrollPosition]);

  const handleWheel = (e: React.WheelEvent) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Prevent vertical scroll when hovering over carousel
    e.preventDefault();

    // Convert vertical scroll to horizontal
    const scrollAmount = e.deltaY;
    scrollContainer.scrollLeft += scrollAmount;
    setScrollPosition(scrollContainer.scrollLeft);

    // Pause auto-scroll temporarily when user is scrolling
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <div style={{backgroundColor: '#FFF9F0', width: '100vw', maxWidth: '100vw', paddingTop: '64px', paddingBottom: '32px'}}>
      <h2 className="text-3xl font-semibold text-center mb-8 px-8" style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}>Our Members Have Collaborated With</h2>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onWheel={handleWheel}
      >
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{background: 'linear-gradient(to right, #FFF9F0, transparent)'}} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{background: 'linear-gradient(to left, #FFF9F0, transparent)'}} />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar"
        >
          {duplicatedCompanies.map((company, index) => {
            const content = (
              <>
                <div className="w-32 h-28 mb-2 flex items-center justify-center relative">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={120}
                    height={100}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    unoptimized={company.logo.startsWith('http')}
                  />
                </div>
                <span className="text-xs font-semibold text-center line-clamp-2 transition-colors duration-300" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
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
                className="flex-shrink-0 flex flex-col items-center justify-center p-4 hover:scale-105 transition-all duration-300 h-36 w-48 group cursor-pointer"
              >
                {content}
              </a>
            ) : (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 flex flex-col items-center justify-center p-4 hover:scale-105 transition-all duration-300 h-36 w-48 group cursor-pointer"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Control dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.min(companies.length, 8) }, (_, i) => (
          <button
            key={i}
            onClick={() => {
              const scrollContainer = scrollRef.current;
              if (!scrollContainer) return;
              const cardWidth = 216; // 192px width (w-48) + 24px gap
              scrollContainer.scrollLeft = i * cardWidth * 2;
              setScrollPosition(i * cardWidth * 2);
            }}
            className={`h-2 rounded-full transition-all duration-300`}
            style={{
              backgroundColor: Math.floor(scrollPosition / 432) === i ? '#6B46C1' : '#E8DCC8',
              width: Math.floor(scrollPosition / 432) === i ? '32px' : '8px'
            }}
            onMouseEnter={(e) => {
              if (Math.floor(scrollPosition / 432) !== i) {
                e.currentTarget.style.backgroundColor = '#C4B5FD';
              }
            }}
            onMouseLeave={(e) => {
              if (Math.floor(scrollPosition / 432) !== i) {
                e.currentTarget.style.backgroundColor = '#E8DCC8';
              }
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}