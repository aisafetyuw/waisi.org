'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Photo {
  src: string;
  alt: string;
}

export default function PhotoCarousel() {
  const photos: Photo[] = [
    {
      src: "/about/AConversationOnAI_3.jpeg",
      alt: "A speaker event"
    },
    {
      src: "/about/Intro.jpg",
      alt: "Students gathered at a WAISI intro presentation"
    },
    {
      src: "/about/Scholars_1.jpg",
      alt: "7 students learning about AI"
    },
    {
      src: "/about/Tabling.jpg",
      alt: "A WAISI booth at the student organization fair"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      }, 4000); // Change slide every 4 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, photos.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % photos.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full"
      style={{backgroundColor: '#FFF9F0'}}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Image Container */}
      <div className="relative w-full overflow-hidden" style={{height: '400px'}}>
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{transform: `translateX(-${currentIndex * 100}%)`}}
        >
          {photos.map((photo, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 transition-all"
          style={{backgroundColor: 'rgba(255, 249, 240, 0.8)'}}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF9F0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 249, 240, 0.8)'}
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" stroke="#6B46C1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 transition-all"
          style={{backgroundColor: 'rgba(255, 249, 240, 0.8)'}}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF9F0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 249, 240, 0.8)'}
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" stroke="#6B46C1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 py-4">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 transition-all ${
              index === currentIndex
                ? 'w-6'
                : 'w-2'
            }`}
            style={{
              backgroundColor: index === currentIndex ? '#6B46C1' : '#E8DCC8'
            }}
            onMouseEnter={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.backgroundColor = '#C4B5FD';
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.backgroundColor = '#E8DCC8';
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}