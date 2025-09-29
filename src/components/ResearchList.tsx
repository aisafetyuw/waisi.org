'use client';

import React, { useState } from "react";
import { ResearchData } from "@/types";

interface ResearchListProps {
  research: ResearchData[];
  clubMembers: Set<string>;
}

export default function ResearchList({ research, clubMembers }: ResearchListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className={`overflow-x-auto ${!isExpanded ? 'max-h-96 overflow-y-auto' : ''} p-4`} style={{backgroundColor: '#FFF9F0'}}>
        <table className="w-full border-collapse">
          <tbody>
            {research.map((paper, index) => (
              <React.Fragment key={index}>
                <tr className="hidden sm:table-row">
                  <td className="px-4 py-2 w-1/3">
                    <a
                      href={paper.link}
                      className="font-bold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif', textDecoration: 'none'}}
                    >
                      {paper.name}
                    </a>
                  </td>
                  <td className="px-4 py-2 w-1/2" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>{highlightAuthors(paper.authors, clubMembers)}</td>
                  <td className="px-4 py-2 w-1/6 text-right pl-2" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>{paper.date}</td>
                </tr>

                {/* Mobile view */}
                <tr className="sm:hidden">
                  <td className="px-4 py-2">
                    <a
                      href={paper.link}
                      className="font-bold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif', textDecoration: 'none'}}
                    >
                      {paper.name}
                    </a>
                    <div className="mt-1" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>{highlightAuthors(paper.authors, clubMembers)}</div>
                    <div className="mt-1" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>{paper.date}</div>
                  </td>
                </tr>

                {index < research.length - 1 && <tr><td colSpan={3} className="border-b" style={{borderColor: '#E8DCC8'}}></td></tr>}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-6 py-2 font-semibold transition-opacity hover:opacity-80"
          style={{backgroundColor: '#C4B5FD', color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}
        >
          {isExpanded ? 'Collapse' : 'Expand All'}
        </button>
      </div>
    </>
  );
}

function highlightAuthors(authors: string, clubMembers: Set<string>) {
  return authors.split(", ").map((name, i, arr) => (
    <React.Fragment key={i}>
      {clubMembers.has(name.trim()) ? <strong className="font-bold" style={{color: '#6B46C1'}}>{name}</strong> : name}
      {i < arr.length - 1 && ", "}
    </React.Fragment>
  ));
}