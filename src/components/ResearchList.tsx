'use client';

import React, { useState } from "react";
import { ResearchData } from "@/types";

interface ResearchListProps {
  research: ResearchData[];
  clubMembers: Set<string>;
}

export default function ResearchList({ research, clubMembers }: ResearchListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedResearch = isExpanded ? research : research.slice(0, 3);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {displayedResearch.map((paper, index) => (
              <React.Fragment key={index}>
                <tr className="hidden sm:table-row">
                  <td className="px-4 py-2 w-1/3">
                    <a
                      href={paper.link}
                      className="font-bold text-purple-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {paper.name}
                    </a>
                  </td>
                  <td className="px-4 py-2 w-1/2">{highlightAuthors(paper.authors, clubMembers)}</td>
                  <td className="px-4 py-2 w-1/6 text-right pl-2">{paper.date}</td>
                </tr>

                {/* Mobile view */}
                <tr className="sm:hidden">
                  <td className="px-4 py-2">
                    <a
                      href={paper.link}
                      className="font-bold text-purple-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {paper.name}
                    </a>
                    <div className="mt-1">{highlightAuthors(paper.authors, clubMembers)}</div>
                    <div className="mt-1 text-gray-600">{paper.date}</div>
                  </td>
                </tr>

                {index < displayedResearch.length - 1 && <tr><td colSpan={3} className="border-b"></td></tr>}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {research.length > 3 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2 bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-80 transition-opacity"
          >
            {isExpanded ? 'Show Less' : `Show All (${research.length} papers)`}
          </button>
        </div>
      )}
    </>
  );
}

function highlightAuthors(authors: string, clubMembers: Set<string>) {
  return authors.split(", ").map((name, i, arr) => (
    <React.Fragment key={i}>
      {clubMembers.has(name.trim()) ? <strong className="font-bold">{name}</strong> : name}
      {i < arr.length - 1 && ", "}
    </React.Fragment>
  ));
}