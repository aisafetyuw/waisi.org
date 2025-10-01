'use client';

import { INTEREST_URL, DISCORD_URL, INSTAGRAM_URL, TWITTER_URL, LINKEDIN_URL } from '@/constants';
import Button from '@/components/button';
import CompanyCarousel from '@/components/CompanyCarousel';
import NumbersCarousel from '@/components/NumbersCarousel';
import PhotoCarousel from '@/components/PhotoCarousel';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide arrow when scrolled down more than 100px
      setShowArrow(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="home" style={{marginLeft: '-40px', marginRight: '-40px', width: '100%'}}>
      {/* Full Screen Hero Banner */}
      <div className="relative" style={{height: '100vh', width: '100vw', marginTop: '-80px', paddingTop: '80px'}}>
        <Image
          src="/capital_landscape.png"
          alt="WAISI at the Capitol"
          fill
          className="object-cover"
          priority
          style={{zIndex: -1}}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 0}}>
          <h1 className="text-4xl md:text-6xl text-center px-8 font-semibold max-w-5xl" style={{color: '#FFF9F0', fontFamily: '"DM Serif Display", serif'}}>
            A community at UW–Madison dedicated to making AI safe and beneficial for all.
          </h1>

          {/* Scroll Down Arrow */}
          <div
            className="absolute bottom-8 animate-bounce transition-opacity duration-300"
            style={{opacity: showArrow ? 0.6 : 0, pointerEvents: showArrow ? 'auto' : 'none'}}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFF9F0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>

      {/* About Section Content */}
      <div id="about" style={{backgroundColor: '#FFF9F0', width: '100vw', maxWidth: '100vw'}}>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Left Column - Photo */}
          <div className="flex flex-col" style={{backgroundColor: '#FFF9F0'}}>
            <Image
              src="/about/CAIP_2.JPG"
              alt="Nine WAISI members in front of the US Capitol"
              width={792}
              height={891}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Our Mission Text */}
          <div className="flex flex-col py-8 h-full" style={{backgroundColor: '#FFF9F0', paddingLeft: '32px', paddingRight: '0px'}}>
            <div className="flex flex-col gap-4 h-full" style={{paddingRight: '32px'}}>
              <h2 className="text-3xl font-semibold" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"DM Serif Display", serif'}}>Our Mission</h2>
              <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                The Wisconsin AI Safety Initiative advances understanding and mitigation of advanced AI risks through strategic collaboration and rigorous inquiry.
              </p>
              <p className="text-lg font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>
                We pursue this mission through three integrated pillars:
              </p>
              <div className="space-y-4 ml-4 flex-grow">
                <p className="text-lg flex items-start" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                  <span style={{color: '#6B46C1', marginRight: '8px'}}>•</span>
                  <span><span className="font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Advancing Public Discourse.</span> We leverage our platform at a leading research institution to shape informed perspectives on AI futures, catalyze substantive debate, and engage decision-makers across sectors.</span>
                </p>
                <p className="text-lg flex items-start" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                  <span style={{color: '#6B46C1', marginRight: '8px'}}>•</span>
                  <span><span className="font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Driving Research and Innovation.</span> We conduct meaningful research projects that address critical questions in AI safety, bridging technical analysis with policy implications and fostering collaboration across disciplines.</span>
                </p>
                <p className="text-lg flex items-start" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                  <span style={{color: '#6B46C1', marginRight: '8px'}}>•</span>
                  <span><span className="font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Strengthening Community.</span> We cultivate an enduring intellectual culture where collaborative rigor, critical analysis, and shared purpose drive collective excellence.</span>
                </p>
              </div>
              <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                Addressing AI safety demands expertise spanning technical research, policy, and ethics. As AI reshapes our technological landscape, we are committed to ensuring its responsible development and deployment.
              </p>
            </div>
          </div>
        </div>

        {/* By The Numbers - Full Width Section */}
        <NumbersCarousel />

        <div className="grid grid-cols-1 lg:grid-cols-2" style={{width: '100vw', maxWidth: '100vw'}}>
          {/* Left Column - Involvement and Impact */}
          <div className="flex flex-col gap-6 px-8 py-8" style={{backgroundColor: '#FFF9F0'}}>
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-semibold" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"DM Serif Display", serif'}}>Involvement and Impact</h2>
              <ul className="list-disc pl-5 text-lg space-y-2 mt-4" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                <li>9 WAISI members were flown out to DC to <a href="https://www.cs.wisc.edu/2025/03/13/waisi-presents-caip-advanced-ai-expo/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">participate in a Congressional Exhibition on Advanced AI.</a></li>
                <li>Contributed to Wisconsin's <a href="https://docs.legis.wisconsin.gov/2023/proposals/reg/asm/bill/ab664" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">2023 Assembly Bill 664</a>, which requires disclosing AI-generated material in political ads.</li>
                <li>Hosted speakers from <a href="https://deepmind.google/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Google DeepMind</a>, <a href="https://www.anthropic.com/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Anthropic</a>, <a href="https://www.metr.org/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Model Evaluation and Threat Research (METR)</a>, the <a href="https://www.cnas.org/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Center for a New American Security (CNAS)</a>, and the <a href="https://horizonpublicservice.org/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Horizon Institute for Public Service</a>.</li>
                <li>Members in 12+ research labs on campus. <a href="/research" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">See our research page.</a></li>
                <li>Collaborated with professors from the School of Computer, Data, and Information Sciences, the School of Education, the School of Business, and the Department of Philosophy.</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Photo Carousel */}
          <PhotoCarousel />
        </div>

        {/* Opportunities Section */}
        <div className="px-8 py-16" style={{backgroundColor: '#FFF9F0', width: '100vw', maxWidth: '100vw'}}>
          <h2 className="text-3xl font-semibold text-center mb-8" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"DM Serif Display", serif', maxWidth: '800px', margin: '0 auto 2rem'}}>Opportunities</h2>

          <div className="max-w-6xl mx-auto mb-8 relative">
            {/* Top Row - Technical and Policy Fundamentals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Technical Fundamentals */}
              <a href="/programs" className="flex flex-col gap-2 p-6 relative cursor-pointer" style={{backgroundColor: '#FFF9F0', border: '2px solid #E8DCC8', textDecoration: 'none'}}>
                <h3 className="text-2xl font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Technical Fundamentals</h3>
                <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                  The technical track of AI Safety Fundamentals is an eight-week research-oriented reading group on technical AI safety. Topics include reward specification, generalization, interpretability...
                </p>
                <p className="text-lg font-semibold mt-2" style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif'}}>Click to learn more</p>
              </a>

              {/* Policy Fundamentals */}
              <a href="/programs" className="flex flex-col gap-2 p-6 relative cursor-pointer" style={{backgroundColor: '#FFF9F0', border: '2px solid #E8DCC8', textDecoration: 'none'}}>
                <h3 className="text-2xl font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Policy Fundamentals</h3>
                <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                  The policy track of AI Safety Fundamentals is an eight-week reading group on the foundational governance and policy challenges posed by advanced AI systems. Topics include AI harms...
                </p>
                <p className="text-lg font-semibold mt-2" style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif'}}>Click to learn more</p>
              </a>
            </div>

            {/* Connection Lines */}
            <svg className="absolute hidden md:block" style={{top: '200px', left: '0', width: '100%', height: '140px', pointerEvents: 'none', zIndex: 0}}>
              {/* Line from Technical to Safety Scholars */}
              <line x1="25%" y1="0" x2="37.5%" y2="100%" stroke="#E8DCC8" strokeWidth="2" />
              {/* Line from Policy to Safety Scholars */}
              <line x1="75%" y1="0" x2="62.5%" y2="100%" stroke="#E8DCC8" strokeWidth="2" />
            </svg>

            {/* Bottom Row - Safety Scholars (Centered) */}
            <div className="flex justify-center">
              <a href="/programs" className="flex flex-col gap-2 p-6 w-full md:w-1/2 relative z-10 cursor-pointer" style={{backgroundColor: '#FFF9F0', border: '2px solid #E8DCC8', textDecoration: 'none'}}>
                <h3 className="text-2xl font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Safety Scholars Program</h3>
                <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                  Safety Scholars are our core groups of members engaged in AI safety work. Members meet weekly to discuss topics in either technical AI safety or AI policy over a provided meal...
                </p>
                <p className="text-lg font-semibold mt-2" style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif'}}>Click to learn more</p>
              </a>
            </div>
          </div>
        </div>

        {/* Highlighted Research Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{backgroundColor: '#FFF9F0', width: '100vw', maxWidth: '100vw'}}>
          {/* Left Column - Image with Title Overlay */}
          <div className="flex items-center justify-center relative">
            <Image
              src="/waisi_writing.jpeg"
              alt="WAISI members working on research"
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-opacity-90 p-4" style={{backgroundColor: '#FFF9F0'}}>
                <h2 className="text-3xl font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Current Projects</h2>
              </div>
            </div>
          </div>

          {/* Right Column - Research Excerpts */}
          <div className="flex flex-col gap-6 px-8 py-8">

            {/* Project 1 */}
            <div className="p-6" style={{backgroundColor: '#F7F0E6', border: '2px solid #E8DCC8'}}>
              <h3 className="text-xl font-semibold mb-3" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>WAISI Technical AI Safety Workshop Program</h3>
              <p className="leading-relaxed" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                Most AI Safety communities introduce members who are interested in technical AI safety through the pipeline of Intro Technical Fellowship → Paper Reading Sessions → Alignment Research Engineer Accelerator program (ARENA)...
              </p>
              <a href="/research" className="text-lg font-semibold mt-2 inline-block" style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif'}}>Learn more →</a>
            </div>

            {/* Project 2 */}
            <div className="p-6" style={{backgroundColor: '#F7F0E6', border: '2px solid #E8DCC8'}}>
              <h3 className="text-xl font-semibold mb-3" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Transferable Adversarial Materials (TAM)</h3>
              <p className="leading-relaxed" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                Within the past decade, small portable Unmanned Aerial Systems (UASs) operated by individual infantry units have been demonstrated to be vital assets on the battlefield in intelligence, surveillance...
              </p>
              <a href="/research" className="text-lg font-semibold mt-2 inline-block" style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif'}}>Learn more →</a>
            </div>
          </div>
        </div>

        {/* Research Highlights Section */}
        <div className="px-8 py-16" style={{backgroundColor: '#FFF9F0', width: '100vw', maxWidth: '100vw'}}>
          <h2 className="text-3xl font-semibold text-center mb-8" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"DM Serif Display", serif', maxWidth: '800px', margin: '0 auto 2rem'}}>Research Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Paper 1 */}
            <div className="flex flex-col overflow-hidden" style={{backgroundColor: '#F7F0E6', border: '2px solid #E8DCC8'}}>
              <div className="relative w-full" style={{height: '200px'}}>
                <Image
                  src="/towards_interp.png"
                  alt="Towards Interpretability Without Sacrifice"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-3" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>
                  Towards Interpretability Without Sacrifice: Faithful Dense Layer Decomposition with Mixture of Decoders
                </h3>
                <div className="mt-auto">
                  <a href="https://arxiv.org/pdf/2505.21364" target="_blank" rel="noopener noreferrer" className="text-base font-semibold inline-block hover:underline" style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif', textDecoration: 'none'}}>
                    Read paper →
                  </a>
                </div>
              </div>
            </div>

            {/* Paper 2 */}
            <div className="flex flex-col overflow-hidden" style={{backgroundColor: '#F7F0E6', border: '2px solid #E8DCC8'}}>
              <div className="relative w-full" style={{height: '200px'}}>
                <Image
                  src="/Debate_or_Vote.png"
                  alt="Debate or Vote"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-3" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>
                  Debate or Vote: Which Yields Better Decisions in Multi-Agent Large Language Models?
                </h3>
                <div className="mt-auto">
                  <a href="https://arxiv.org/pdf/2508.17536" target="_blank" rel="noopener noreferrer" className="text-base font-semibold inline-block hover:underline" style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif', textDecoration: 'none'}}>
                    Read paper →
                  </a>
                </div>
              </div>
            </div>

            {/* Paper 3 */}
            <div className="flex flex-col overflow-hidden" style={{backgroundColor: '#F7F0E6', border: '2px solid #E8DCC8'}}>
              <div className="relative w-full" style={{height: '200px'}}>
                <Image
                  src="/Everything_Everywhere.png"
                  alt="Everything Everywhere All at Once"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-3" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>
                  Everything Everywhere All at Once: LLMs can In-Context Learn Multiple Tasks in Superposition
                </h3>
                <div className="mt-auto">
                  <a href="https://arxiv.org/pdf/2410.05603" target="_blank" rel="noopener noreferrer" className="text-base font-semibold inline-block hover:underline" style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif', textDecoration: 'none'}}>
                    Read paper →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* See More Papers Button */}
          <div className="flex justify-center mt-8">
            <a href="/research" className="px-6 py-3 font-semibold transition-opacity hover:opacity-80" style={{backgroundColor: '#8B5CF6', color: '#FFF9F0', fontFamily: '"DM Serif Display", serif'}}>
              See our 20+ Papers
            </a>
          </div>
        </div>
      </div>

      {/* Collaborations Section */}
      <CompanyCarousel companies={[
            {
              name: "UChicago XLab",
              logo: "/xlab_logo.jpeg",
              bgColor: "bg-red-50",
              website: "https://xrisk.uchicago.edu/"
            },
            {
              name: "Center for AI Safety",
              logo: "/cais_logo.jpeg",
              bgColor: "bg-blue-50",
              website: "https://www.safe.ai/"
            },
            {
              name: "Americans for Responsible Innovation",
              logo: "/americans_for_responsible_innovation_logo.jpeg",
              bgColor: "bg-green-50",
              website: "https://responsibleinnovation.org/"
            },
            {
              name: "MATS",
              logo: "/mats_logo.jpeg",
              bgColor: "bg-purple-50",
              website: "https://www.matsprogram.org/"
            },
            {
              name: "NYU Alignment Group",
              logo: "/nyu_logo.png",
              bgColor: "bg-purple-50",
              website: "https://wp.nyu.edu/arg/"
            },
            {
              name: "Stanford SAIL",
              logo: "/sail_logo.jpg",
              bgColor: "bg-red-50",
              website: "https://ai.stanford.edu/"
            },
            {
              name: "OpenNLP Labs",
              logo: "/opennlplabs_logo.jpeg",
              bgColor: "bg-indigo-50",
              website: "http://opennlplabs.org/"
            },
            {
              name: "EleutherAI",
              logo: "/eleuther_logo.png",
              bgColor: "bg-gray-50",
              website: "https://www.eleuther.ai/"
            },
            {
              name: "Meta",
              logo: "/meta_logo.jpeg",
              bgColor: "bg-blue-50",
              website: "https://about.meta.com/"
            },
            {
              name: "DeepSeek",
              logo: "/deepseek_logo.jpeg",
              bgColor: "bg-teal-50",
              website: "https://www.deepseek.com/"
            },
            {
              name: "Cooperative AI Foundation",
              logo: "/cooperative_ai.jpeg",
              bgColor: "bg-green-50",
              website: "https://www.cooperativeai.com/"
            },
            {
              name: "Anthropic",
              logo: "/labs/anthropic.webp",
              bgColor: "bg-orange-50",
              website: "https://www.anthropic.com/"
            },
            {
              name: "FAR.AI",
              logo: "/far_ai_logo.jpeg",
              bgColor: "bg-purple-50",
              website: "https://far.ai/"
            },
            {
              name: "Google",
              logo: "/google_logo.jpeg",
              bgColor: "bg-blue-50",
              website: "https://www.google.com/"
            },
            {
              name: "Microsoft",
              logo: "/microsoft_logo.jpeg",
              bgColor: "bg-gray-50",
              website: "https://www.microsoft.com/"
            },
            {
              name: "Apple",
              logo: "/apple_logo.jpeg",
              bgColor: "bg-gray-50",
              website: "https://www.apple.com/"
            },
            {
              name: "Amazon",
              logo: "/amazon_logo.jpeg",
              bgColor: "bg-yellow-50",
              website: "https://www.amazon.com/"
            }
          ]} />

      {/* Our Sponsors Section */}
      <div className="px-8 py-16" style={{backgroundColor: '#FFF9F0', width: '100vw', maxWidth: '100vw'}}>
        <h2 className="text-3xl font-semibold text-center mb-12" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"DM Serif Display", serif', maxWidth: '800px', margin: '0 auto 3rem'}}>Our Sponsors</h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
          {/* KAIROS */}
          <div className="flex flex-col items-center gap-4">
            <a href="https://kairos-project.org" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
              <Image
                src="/kairos_logo.jpeg"
                alt="KAIROS Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            </a>
            <p className="text-lg font-semibold text-center" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>KAIROS</p>
          </div>

          {/* UW Madison CS */}
          <div className="flex flex-col items-center gap-4">
            <a href="https://www.cs.wisc.edu/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
              <Image
                src="/uw_madison_computer_sciences_logo.jpeg"
                alt="UW Madison Computer Sciences Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            </a>
            <p className="text-lg font-semibold text-center" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>UW-Madison Computer Sciences</p>
          </div>
        </div>
      </div>
    </div>
  )
}
