import React from "react";
import getResearch from '@/app/research/getResearch';
import Professor from "@/components/prof";
import ResearchList from "@/components/ResearchList";
import { ProfProps } from "@/types";

export default async function ResearchPage() {
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
      <div className="mb-12">
        <h2 className="text-3xl mb-6">Current Projects: <span className="text-purple-600">WAISI</span> & <span className="text-red-800">XLab</span></h2>
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">WAISI Technical AI Safety Workshop Program</h3>
            <p className="text-gray-700 leading-relaxed">
              Most AI Safety communities introduce members who are interested in technical AI safety through the pipeline of Intro Technical Fellowship → Paper Reading Sessions → Alignment Research Engineer Accelerator program (ARENA) → Research Programs (SPAR, XLab SRF, MATS). However, most university groups have struggled with ARENA sessions for a few key reasons: the steep learning curve, significant time commitment, and lack of experienced TA's. The technical workshop program aims to address these issues by creating ARENA-styled workshops on AI Safety topics that focus on shorter, more manageable exercises, while still preserving the rigor of research-style work.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Transferable Adversarial Materials (TAM): Defeating ISR AUASs and LAWSs via Disruptive and Adversarial Material</h3>
            <p className="text-gray-700 leading-relaxed">
              Within the past decade, small portable Unmanned Aerial Systems (UASs) operated by individual infantry units have been demonstrated to be vital assets on the battlefield in intelligence, surveillance, and reconnaissance (ISR) roles as well as in one-way suicide attacks (loitering munition) and reusable bomb-dropping UASs. Many countries are attempting to integrate AI vision models into these systems to automate navigation and target identification and reduce vulnerability to jamming. We aim to demonstrate the effectiveness of a Transferable Adversarial Material (TAM), a deformable material which could be deployed in a variety of settings and deceive military-purpose computer vision models analogous to those being deployed in AUASs.
            </p>
          </div>
        </div>
      </div>

      <div className="flex align-center justify-center mb-4 sm:mb-8 margin-auto">
        <h1 className="text-4xl">
          Our Research Catalog
        </h1>
      </div>
      <ResearchList research={research} clubMembers={clubMembers} />
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
