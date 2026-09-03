"use client";

import { useState } from "react";
import Link from "next/link";
import { PROGRAMS, Program } from "@/content/programs";

// Interactive version of the landing-page funnel for the Get Involved page:
// same single four-sided trapezoid (one clip-path on the wrapper), larger
// tiles, and clicking a tile opens that program's description card below.
const FUNNEL_CLIP = "polygon(0% 0%, 100% 0%, 73% 100%, 27% 100%)";

const tileBase =
  "flex items-center justify-center transition-colors text-center cursor-pointer";
const tileLabel = "font-serif text-lg md:text-2xl text-heading";

function byTitle(title: string): Program {
  const program = PROGRAMS.find((p) => p.title === title);
  if (!program) throw new Error(`Unknown program: ${title}`);
  return program;
}

function ProgramCard({ program }: { program: Program }) {
  // Internal CTAs (e.g. the Fellowship /apply page) route client-side and must
  // not open in a new tab; external form links keep the blank-target treatment.
  const ctaIsExternal = /^https?:\/\//.test(program.cta.href);
  return (
    <div className="flex flex-col p-6 bg-card border border-subtle rounded-card max-w-2xl mx-auto">
      <h2 className="text-2xl text-heading">{program.title}</h2>
      <p className="text-base text-primary mt-3">{program.what}</p>
      <dl className="mt-4 space-y-1 text-base text-primary">
        <div>
          <dt className="inline font-medium text-heading">Commitment: </dt>
          <dd className="inline">{program.commitment}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-heading">For: </dt>
          <dd className="inline">{program.audience}</dd>
        </div>
      </dl>
      <div className="flex items-center gap-5 mt-auto pt-6">
        {ctaIsExternal ? (
          <a
            href={program.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="waisi-button"
          >
            {program.cta.label}
          </a>
        ) : (
          <Link href={program.cta.href} className="waisi-button">
            {program.cta.label}
          </Link>
        )}
        {program.handbookUrl && (
          <a
            href={program.handbookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:underline font-medium"
          >
            Handbook &rarr;
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProgramsFunnel() {
  const [selected, setSelected] = useState<string | null>(null);

  // Tint deepens as the funnel narrows; a selected tile holds its hover
  // shade so the active program stays visibly marked.
  const tile = (title: string, resting: string, active: string) => (
    <button
      type="button"
      onClick={() => setSelected(selected === title ? null : title)}
      aria-expanded={selected === title}
      className={`${tileBase} ${selected === title ? active : resting}`}
    >
      <span
        className={`${tileLabel} ${selected === title ? "underline underline-offset-8" : ""}`}
      >
        {title}
      </span>
    </button>
  );

  return (
    <div>
      <div
        className="flex flex-col gap-1 max-w-4xl mx-auto"
        style={{ clipPath: FUNNEL_CLIP }}
      >
        <div className="flex h-28 md:h-32 [&>button]:flex-1 [&>button:first-child]:pl-[11%] [&>button:first-child]:pr-2 [&>button:last-child]:pr-[11%] [&>button:last-child]:pl-2">
          {tile("Policy Fundamentals", "bg-violet-100 hover:bg-violet-200", "bg-violet-200")}
          <div className="w-1 bg-page shrink-0" />
          {tile("Technical Fundamentals", "bg-violet-100 hover:bg-violet-200", "bg-violet-200")}
        </div>
        <div className="flex h-28 md:h-32 [&>button]:w-full [&>button]:px-[20%]">
          {tile("Technical Upskilling", "bg-violet-200 hover:bg-violet-300", "bg-violet-300")}
        </div>
        <div className="flex h-28 md:h-32 [&>button]:w-full [&>button]:px-[29%]">
          {tile("Safety Scholars", "bg-violet-300 hover:bg-violet-400", "bg-violet-400")}
        </div>
      </div>

      <div className="mt-8">
        {selected ? (
          <ProgramCard program={byTitle(selected)} />
        ) : (
          <p className="text-base text-primary text-center">
            Select a program to see the details.
          </p>
        )}
      </div>
    </div>
  );
}
