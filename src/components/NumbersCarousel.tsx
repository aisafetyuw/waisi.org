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


  return (
    <div className="py-16" style={{backgroundColor: '#FFF9F0', width: '100vw', maxWidth: '100vw'}}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 lg:px-16">
        {/* Left Column - Quote */}
        <div className="flex flex-col justify-center items-center lg:items-end lg:pr-8">
          <div className="max-w-md">
            <p className="text-xl italic mb-4" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
              "It's been great working with everyone and getting to be around people who are really interested in AI Safety and helping people get involved. It's exciting to be a part of this."
            </p>
            <p className="text-lg font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>
              — Shawn Im, PhD Student
            </p>
          </div>
        </div>

        {/* Center Column - Numbers */}
        <div className="flex flex-col gap-2 items-center text-center relative px-8">
          <div className="absolute left-0 top-0 bottom-0 w-px hidden lg:block" style={{backgroundColor: '#E8DCC8'}}></div>
          <div className="absolute right-0 top-0 bottom-0 w-px hidden lg:block" style={{backgroundColor: '#E8DCC8'}}></div>
          <h2 className="text-3xl font-semibold mb-2" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Numbers and Beyond</h2>
          <div className="relative flex items-center justify-center">
            <ul className="flex flex-col items-center justify-center gap-3">
          {stats.map((stat, index) => (
            <li
              key={index}
              className="list-none text-xl"
              style={{
                color: '#2D2A26',
                fontFamily: '"DM Serif Display", serif'
              }}
            >
              <span className="font-black">
                {stat.number}
              </span>{' '}
              <span>
                {stat.label}
              </span>
            </li>
          ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Quote */}
        <div className="flex flex-col justify-center items-center lg:items-start lg:pl-8">
          <div className="max-w-md">
            <p className="text-xl italic mb-4" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
              "...A year ago the idea of facilitating a group discussion would've been hugely intimidating to me but now I find myself looking forward to my cohort sessions. This much needed nudge out of my comfort zone has shaped my growth as a leader and student..."
            </p>
            <p className="text-lg font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>
              — Elise Fischer, Policy Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}