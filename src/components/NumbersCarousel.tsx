"use client";

import React, { useState, useEffect } from "react";

interface Stat {
  number: string;
  label: string;
}

export default function NumbersCarousel() {
  const stats: Stat[] = [
    { number: "10", label: "PhD Safety Scholars" },
    { number: "6", label: "Masters Safety Scholars" },
    { number: "50+", label: "Undergraduate Safety Scholars" },
    { number: "30", label: "Current AI Safety Fellowship participants" },
    { number: "130+", label: "AI Safety Fellowship graduates" },
  ];

  return (
    <div className="py-12 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-16">
        {/* Left Column - Quote */}
        <div className="flex flex-col justify-center items-center lg:items-end lg:pr-8">
          <div className="max-w-md">
            <p
              className="text-lg lg:text-xl italic mb-4"
              style={{
                color: "var(--text-primary)",
              }}
            >
              "It's been great working with everyone and getting to be around
              people who are really interested in AI Safety and helping people
              get involved. It's exciting to be a part of this."
            </p>
            <p
              className="text-lg font-semibold"
              style={{
                color: "var(--text-heading)",
              }}
            >
              — Shawn Im, PhD Student
            </p>
          </div>
        </div>

        {/* Center Column - Numbers. On phones it comes first, left-aligned with
            the number in a fixed-width column so long labels wrap cleanly. */}
        <div className="order-first lg:order-none flex flex-col gap-2 items-center text-center relative px-0 lg:px-8">
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden lg:block"
            style={{ backgroundColor: "var(--border-subtle)" }}
          ></div>
          <div
            className="absolute right-0 top-0 bottom-0 w-px hidden lg:block"
            style={{ backgroundColor: "var(--border-subtle)" }}
          ></div>
          <div className="relative flex items-center justify-center">
            <ul className="flex flex-col items-stretch lg:items-center justify-center gap-3 w-full max-w-md">
              {stats.map((stat, index) => (
                <li
                  key={index}
                  className="list-none text-lg lg:text-xl flex items-baseline gap-3 text-left lg:block lg:text-center"
                  style={{
                    color: "var(--text-primary)",
                  }}
                >
                  <span className="font-black text-link shrink-0 w-14 text-right lg:w-auto lg:text-center">
                    {stat.number}
                  </span>{" "}
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Quote */}
        <div className="flex flex-col justify-center items-center lg:items-start lg:pl-8">
          <div className="max-w-md">
            <p
              className="text-lg lg:text-xl italic mb-4"
              style={{
                color: "var(--text-primary)",
              }}
            >
              "...A year ago the idea of facilitating a group discussion
              would've been hugely intimidating to me but now I find myself
              looking forward to my cohort sessions. This much needed nudge out
              of my comfort zone has shaped my growth as a leader and
              student..."
            </p>
            <p
              className="text-lg font-semibold"
              style={{
                color: "var(--text-heading)",
              }}
            >
              — Elise Fischer, Policy Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

