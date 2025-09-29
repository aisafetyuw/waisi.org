import React from "react";
import Image from "next/image";
import NumbersCarousel from "@/components/NumbersCarousel";
import PhotoCarousel from "@/components/PhotoCarousel";

export default function About() {

  return (
    <div id="about" className="-mx-10" style={{marginLeft: '-40px', marginRight: '-40px', backgroundColor: '#FFF9F0'}}>
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
        <div className="flex flex-col px-8 py-8 h-full" style={{backgroundColor: '#FFF9F0'}}>
          <div className="flex flex-col gap-4 h-full">
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

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column - Involvement and Impact */}
        <div className="flex flex-col gap-6 px-8" style={{backgroundColor: '#FFF9F0'}}>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"Lora", serif'}}>Involvement and Impact</h2>
            <ul className="list-disc pl-5 text-lg space-y-2 mt-4" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
              <li>9 WAISI members were flown out to DC to <a href="https://www.cs.wisc.edu/2025/03/13/waisi-presents-caip-advanced-ai-expo/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">participate in a Congressional Exhibition on Advanced AI.</a></li>
              <li>Contributed to Wisconsin's <a href="https://docs.legis.wisconsin.gov/2023/proposals/reg/asm/bill/ab664" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">2023 Assembly Bill 664</a>, which requires disclosing AI-generated material in political ads.</li>
              <li>Hosted speakers from <a href="https://deepmind.google/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Google DeepMind</a>, <a href="https://www.anthropic.com/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Anthropic</a>, <a href="https://www.metr.org/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Model Evaluation and Threat Research (METR)</a>, the <a href="https://www.cnas.org/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Center for a New American Security (CNAS)</a>, and the <a href="https://horizonpublicservice.org/" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Horizon Institute for Public Service</a>.</li>
              <li>Members in 12+ research labs on campus. <a href="research" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">See our research page.</a></li>
              <li>Collaborated with professors from the School of Computer, Data, and Information Sciences, the School of Education, the School of Business, and the Department of Philosophy.</li>
            </ul>
          </div>
        </div>

        {/* Right Column - Photo Carousel */}
        <PhotoCarousel />
      </div>
    </div>
  );
}