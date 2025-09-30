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
    <div id="research" style={{backgroundColor: '#FFF9F0', marginLeft: '-40px', marginRight: '-40px'}}>
      <div className="mx-auto pt-8" style={{width: '75%'}}>
        <h2 className="text-3xl font-semibold mb-6" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"DM Serif Display", serif'}}><span style={{color: '#6B46C1'}}>WAISI</span> <span style={{color: '#2D2A26'}}>&</span> <span style={{color: '#800000'}}>XLab</span></h2>
        <div className="space-y-6 mb-12">
          <div className="p-6" style={{backgroundColor: '#F7F0E6'}}>
            <h3 className="text-xl font-semibold mb-3" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>WAISI Technical AI Safety Workshop Program</h3>
            <p className="leading-relaxed" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
              Most AI Safety communities introduce members who are interested in technical AI safety through the pipeline of Intro Technical Fellowship → Paper Reading Sessions → Alignment Research Engineer Accelerator program (ARENA) → Research Programs (SPAR, XLab SRF, MATS). However, most university groups have struggled with ARENA sessions for a few key reasons: the steep learning curve, significant time commitment, and lack of experienced TA's. The technical workshop program aims to address these issues by creating ARENA-styled workshops on AI Safety topics that focus on shorter, more manageable exercises, while still preserving the rigor of research-style work.
            </p>
          </div>

          <div className="p-6" style={{backgroundColor: '#F7F0E6'}}>
            <h3 className="text-xl font-semibold mb-3" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Transferable Adversarial Materials (TAM): Defeating ISR AUASs and LAWSs via Disruptive and Adversarial Material</h3>
            <p className="leading-relaxed" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
              Within the past decade, small portable Unmanned Aerial Systems (UASs) operated by individual infantry units have been demonstrated to be vital assets on the battlefield in intelligence, surveillance, and reconnaissance (ISR) roles as well as in one-way suicide attacks (loitering munition) and reusable bomb-dropping UASs. Many countries are attempting to integrate AI vision models into these systems to automate navigation and target identification and reduce vulnerability to jamming. We aim to demonstrate the effectiveness of a Transferable Adversarial Material (TAM), a deformable material which could be deployed in a variety of settings and deceive military-purpose computer vision models analogous to those being deployed in AUASs.
            </p>
          </div>
        </div>
        <div className="flex align-center justify-center mb-6">
          <h1 className="text-4xl font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>
            Our Research Catalog
          </h1>
        </div>
        <ResearchList research={research} clubMembers={clubMembers} />
        <div className="mt-12 pb-16">
          <h2 className="text-3xl font-semibold mb-6" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"DM Serif Display", serif'}}>Faculty Collaborators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1">
            {profs.sort((a, b) => a.name.split(' ')[1].toLowerCase().localeCompare(b.name.split(' ')[1].toLowerCase())) // sort by last name
              .map(prof => <Professor link={prof.link} name={prof.name} extra={prof.extra} focus={prof.focus} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
