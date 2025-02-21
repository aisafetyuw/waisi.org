import React from "react";
import getResearch from '@/app/research/getResearch';

export default async function ResearchList() {
  const research = await getResearch();
  const clubMembers = new Set(research.map(paper => paper.author.trim()));

  return (
    <div id="research" className="page">
      <div className="flex align-center justify-center mb-4 sm:mb-8 margin-auto">
        <h1 className="text-4xl">
          Recent Research by WAISI Members
        </h1>
      </div>
      <div className="overflow-x-auto ">
        <table className="w-full border-collapse">
          <tbody>
            {research.map((paper, index) => (
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

                {index < research.length - 1 && <tr><td colSpan={3} className="border-b"></td></tr>}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
