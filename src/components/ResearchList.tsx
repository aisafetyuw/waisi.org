"use client";

import React, { useState, useRef, useEffect } from "react";
import { ResearchData } from "@/types";

interface ResearchListProps {
  research: ResearchData[];
  clubMembers: Set<string>;
}

export default function ResearchList({
  research,
  clubMembers,
}: ResearchListProps) {
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setShowTopShadow(scrollTop > 0);
      setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 5);
    }
  };

  useEffect(() => {
    handleScroll(); // Check on mount
  }, []);

  return (
    <div className="relative">
      {showTopShadow && (
        <div
          className="absolute top-0 left-0 right-0 h-4 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(107, 70, 193, 0.1), transparent)",
          }}
        ></div>
      )}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-x-auto max-h-96 overflow-y-auto p-4 bg-card border border-subtle rounded-card"
      >
        <table className="w-full border-collapse">
          <tbody>
            {research.map((paper, index) => (
              <React.Fragment key={index}>
                <tr className="hidden sm:table-row">
                  <td className="px-4 py-2 w-1/4">
                    <a
                      href={paper.link}
                      className="font-bold hover:underline text-link no-underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {paper.name}
                    </a>
                  </td>
                  <td
                    className="px-4 py-2 w-2/5 text-primary"
                  >
                    {highlightAuthors(paper.authors, clubMembers)}
                  </td>
                  <td
                    className="px-4 py-2 w-1/6 text-primary"
                  >
                    {paper.conference && (
                      <span
                        className="inline-block px-2 py-1 text-sm font-semibold text-heading"
                        style={{
                          backgroundColor: "#EDE9FE",
                          borderRadius: "8px",
                        }}
                      >
                        {paper.conference}
                      </span>
                    )}
                  </td>
                  <td
                    className="px-4 py-2 w-1/6 text-right pl-2 text-primary"
                  >
                    {paper.date}
                  </td>
                </tr>

                {/* Mobile view */}
                <tr className="sm:hidden">
                  <td className="px-4 py-2">
                    <a
                      href={paper.link}
                      className="font-bold hover:underline text-link no-underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {paper.name}
                    </a>
                    <div className="mt-1 text-primary">
                      {highlightAuthors(paper.authors, clubMembers)}
                    </div>
                    {paper.conference && (
                      <div className="mt-1">
                        <span
                          className="inline-block px-2 py-1 text-sm font-semibold text-heading"
                          style={{
                            backgroundColor: "#EDE9FE",
                            borderRadius: "8px",
                          }}
                        >
                          {paper.conference}
                        </span>
                      </div>
                    )}
                    <div className="mt-1 text-primary">
                      {paper.date}
                    </div>
                  </td>
                </tr>

                {index < research.length - 1 && (
                  <tr>
                    <td colSpan={4} className="py-1"></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {showBottomShadow && (
        <div
          className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(107, 70, 193, 0.1), transparent)",
          }}
        ></div>
      )}
    </div>
  );
}

function highlightAuthors(authors: string, clubMembers: Set<string>) {
  return authors.split(", ").map((name, i, arr) => (
    <React.Fragment key={i}>
      {clubMembers.has(name.trim()) ? (
        <strong className="font-bold text-heading">
          {name}
        </strong>
      ) : (
        name
      )}
      {i < arr.length - 1 && ", "}
    </React.Fragment>
  ));
}

