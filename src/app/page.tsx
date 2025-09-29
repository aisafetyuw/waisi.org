import { INTEREST_URL, DISCORD_URL, INSTAGRAM_URL, TWITTER_URL, LINKEDIN_URL } from '@/constants';
import Button from '@/components/button';
import CompanyCarousel from '@/components/CompanyCarousel';
import NumbersCarousel from '@/components/NumbersCarousel';
import PhotoCarousel from '@/components/PhotoCarousel';
import Image from 'next/image';

export default function Home() {
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
          <h1 className="text-4xl md:text-6xl text-center px-8 font-semibold max-w-5xl" style={{color: '#FFF9F0', fontFamily: '"Lora", serif'}}>
            A community at UW–Madison dedicated to making AI safe and beneficial for all.
          </h1>

          {/* Scroll Down Arrow */}
          <div className="absolute bottom-8 animate-bounce" style={{opacity: 0.6}}>
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
              <h2 className="text-3xl font-semibold" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"Lora", serif'}}>Our Mission</h2>
              <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
                The Wisconsin AI Safety Initiative brings together students and stakeholders to understand and address the risks of advanced AI.
              </p>
              <p className="text-lg font-semibold" style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}>
                We pursue this mission through three pillars:
              </p>
              <div className="space-y-4 ml-4 flex-grow">
                <p className="text-lg flex items-start" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
                  <span style={{color: '#6B46C1', marginRight: '8px'}}>•</span>
                  <span><span className="font-semibold" style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}>Spark dialogue.</span> We leverage our position at a flagship school to promote better models of AI futures, encourage productive debate, and engage with key decision-makers.</span>
                </p>
                <p className="text-lg flex items-start" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
                  <span style={{color: '#6B46C1', marginRight: '8px'}}>•</span>
                  <span><span className="font-semibold" style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}>Build expertise.</span> We help students develop skills for technical AI research and policy positions by running meaningful projects, connecting students with mentors, and sharing opportunities</span>
                </p>
                <p className="text-lg flex items-start" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
                  <span style={{color: '#6B46C1', marginRight: '8px'}}>•</span>
                  <span><span className="font-semibold" style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}>Foster community.</span> We cultivate a lasting culture where friendliness, critical thinking, and shared ambition bring out the best in each other.</span>
                </p>
              </div>
              <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
                AI safety requires expertise spanning technical research, policy, and ethics. As AI accelerates technological transformation, we're committed to ensuring it is developed and deployed safely.
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
              <h2 className="text-3xl font-semibold" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"Lora", serif'}}>Involvement and Impact</h2>
              <ul className="list-disc pl-5 text-lg space-y-2 mt-4" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
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
      </div>

      {/* Application Buttons Section */}
      <div className="px-8 py-8" style={{backgroundColor: '#FFF9F0', width: '100vw', maxWidth: '100vw'}}>
        <div className="flex flex-col gap-4 w-full md:w-2/3 text-xl md:text-2xl">
          <Button url={"https://forms.gle/pPn5idt81BEDH8bG8"} text="Apply to our technical intro program →"/>
          <Button url={"https://forms.gle/bcRimCCmg7F3uEaS9"} text="Apply to our policy intro program →"/>
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
              website: "https://opennlp.apache.org/"
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
              name: "AISI",
              logo: "/ai_safety_institute_logo.jpeg",
              bgColor: "bg-blue-50",
              website: "https://www.aisi.gov.uk/"
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
    </div>
  )
}
