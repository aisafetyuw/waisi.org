'use client';

import React, { useState, useEffect } from 'react';

interface Stat {
  number: string;
  label: string;
}

export default function NumbersCarousel() {
  const stats: Stat[] = [
    { number: "10", label: "PhD Safety Scholars" },
    { number: "6", label: "Masters Safety Scholars" },
    { number: "50+", label: "Undergraduate Safety Scholars" },
    { number: "30", label: "Current AI Safety Fundamentals participants" },
    { number: "130+", label: "AI Safety Fundamentals graduates" }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="flex flex-col gap-4 items-center text-center my-12">
      <h2 className="text-3xl font-semibold">By The Numbers</h2>
      <div className="relative h-64 flex items-center justify-center">
        <ul className="flex flex-col items-center justify-center gap-3">
          {stats.map((stat, index) => (
            <li
              key={index}
              className={`
                list-none transition-all duration-700 ease-in-out text-xl
                ${index === activeIndex
                  ? 'scale-125 opacity-100 text-purple-600 font-bold'
                  : 'scale-100 opacity-60 text-gray-600'}
              `}
            >
              <span className="font-black transition-all duration-700">
                {stat.number}
              </span>{' '}
              <span className="transition-all duration-700">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}