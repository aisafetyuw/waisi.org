import React from "react";
import getResearch from '@/app/research/getResearch';
import Professor from "@/components/prof";
import { ProfProps } from "@/types";

export default async function ResearchList() {
  const research = await getResearch();
  const clubMembers = new Set(research.map(paper => paper.author.trim()));

  const profs: ProfProps[] = [
    {
      name: "Sharon Li",
      link: "https://pages.cs.wisc.edu/~sharonli/",
      focus: "Algorithmic and theoretical foundations of reliable machine learning",
      // extra: "MIT Technology Review's 2023 Innovator of the Year",
    },
    {
      name: "Grigorios Chrysos",
      link: "https://grigorisg9gr.github.io/_pages/about/",
      focus: "Learning (robust) representations and generative modeling",
    },
    {
      name: "Fred Sala",
      link: "https://pages.cs.wisc.edu/~fredsala/",
      focus: "Fundamentals of data-driven systems and machine learning",
    },
    {
      name: "Kangwook Lee",
      link: "https://kangwooklee.com/",
      focus: "Theory and algorithms for deep learning with foundation models",
    },
    {
      name: "Junjie Hu",
      link: "https://junjiehu.github.io/",
      focus: "Natural language processing and machine learning",
    },
    {
      name: "Dimitris Papailiopoulos",
      link: "https://papail.io/",
      focus: "Machine learning, coding theory, and optimization",
    },
    {
      name: "Vikas Singh",
      link: "https://www.biostat.wisc.edu/~vsingh/",
      focus: "Image analysis, computer vision, and ML in biostatistics",
    },
    {
      name: "Patrick McDaniel",
      link: "https://patrickmcdaniel.org/",
      focus: "Mobile security, adversarial ML, and systems security research",

    },
    {
      name: "Josiah Hanna",
      link: "https://pages.cs.wisc.edu/~jphanna/",
      focus: "Reinforcement learning and autonomous agents",
    },
    {
      name: "Ramya Vinayak",
      link: "https://ramyakv.github.io/",
      focus: "Machine learning, statistical inference, and crowdsourcing",
    },
    {
      name: "Somesh Jha",
      link: "https://pages.cs.wisc.edu/~jha/",
      focus: "Adversarial machine learning, privacy, and formal methods",
    },
    {
      name: "Yiqiao Zhong",
      link: "https://pages.stat.wisc.edu/~zhong35/",
      focus: "LLM evaluations, high dimensional statistics, and deep learning theory",
    }
  ];

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
      <div className="mt-12">
        <h2 className="text-3xl mb-6">Faculty Collaborators</h2>
        <p className="mb-6 text-lg">Our members work with the following professors:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1 mb-8">
          {profs.sort((a, b) => a.name.split(' ')[1].toLowerCase().localeCompare(b.name.split(' ')[1].toLowerCase())) // sort by last name
            .map(prof => <Professor link={prof.link} name={prof.name} extra={prof.extra} focus={prof.focus} />)}
        </div>
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
