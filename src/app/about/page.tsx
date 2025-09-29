import React from "react";
import Image from "next/image";
import Lab from "@/components/lab";
import { LabProps } from "@/types";
import NumbersCarousel from "@/components/NumbersCarousel";

export default function About() {
  const labs: LabProps[] = [
    {
      name: "Google DeepMind",
      filename: "deepmind.png",
      link: "https://deepmind.google/",
    },
    {
      name: "METR",
      filename: "arcevals.svg",
      link: "https://metr.org/",
    },
    {
      name: "Center for a New American Security",
      filename: "cnas.png",
      link: "https://www.cnas.org/",
    },
    {
      name: "Anthropic",
      filename: "anthropic.webp",
      link: "https://www.anthropic.com/",
    },
  ];

  return (
    <div id="about" className="page max-w-full px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Photo */}
        <div className="flex flex-col gap-4">
          <Image
            src="/about/CAIP_2.JPG"
            alt="Nine WAISI members in front of the US Capitol"
            width={792}
            height={891}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Column - Our Mission Text */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="border-b text-3xl font-semibold">Our Mission</h2>
            <p className="text-lg">
              Our modern world is the product of technological advancement. Artificial intelligence is poised to accelerate this transformation, reshaping economies, global power structures, and daily life. These shifts aren't decades away; in fact, they've already begun.
            </p>
            <p className="text-lg">
              AI has the potential to be a force for immense good, provided we can develop and deploy it safely. The field of AI safety addresses this challenge, requiring expertise that spans technical research, policy, and ethics.
            </p>
            <p className="text-lg">
              At the Wisconsin AI Safety Initiative (WAISI), we bring people together to understand and address the risks of advanced AI. Our aim is to guide its development toward a future that benefits everyone—and the best time to work on that future is now.
            </p>
          </div>
        </div>
      </div>

      {/* By The Numbers - Full Width Section */}
      <NumbersCarousel />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Involvement and Impact */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="border-b text-3xl font-semibold">Involvement and Impact</h2>
            <p className="mb-3 text-lg">
              Research groups with members hosted by WAISI for speaker events:
            </p>
            <div className="flex flex-wrap gap-4 mb-4">
              {labs.map(lab => <Lab name={lab.name} filename={lab.filename} link={lab.link} />)}
            </div>
            <ul className="list-disc pl-5 text-lg space-y-2">
              <li>9 WAISI members were flown out to DC to <a href="https://www.cs.wisc.edu/2025/03/13/waisi-presents-caip-advanced-ai-expo/" target="_blank" className="text-purple-600 hover:underline">participate in a Congressional Exhibition on Advanced AI.</a></li>
              <li>Contributed to Wisconsin's <a href="https://docs.legis.wisconsin.gov/2023/proposals/reg/asm/bill/ab664" target="_blank" className="text-purple-600 hover:underline">2023 Assembly Bill 664</a>, which requires disclosing AI-generated material in political ads.</li>
              <li>Hosted speakers from <a href="https://deepmind.google/" target="_blank" className="text-purple-600 hover:underline">Google DeepMind</a>, <a href="https://www.anthropic.com/" target="_blank" className="text-purple-600 hover:underline">Anthropic</a>, <a href="https://www.metr.org/" target="_blank" className="text-purple-600 hover:underline">Model Evaluation and Threat Research (METR)</a>, the <a href="https://www.cnas.org/" target="_blank" className="text-purple-600 hover:underline">Center for a New American Security (CNAS)</a>, and the <a href="https://horizonpublicservice.org/" target="_blank" className="text-purple-600 hover:underline">Horizon Institute for Public Service</a>.</li>
              <li>Members in 12+ research labs on campus. <a href="research" className="text-purple-600 hover:underline">See our research page.</a></li>
              <li>Collaborated with professors from the School of Computer, Data, and Information Sciences, the School of Education, the School of Business, and the Department of Philosophy.</li>
            </ul>
          </div>
        </div>

        {/* Right Column - 2x2 Grid of Photos */}
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/about/AConversationOnAI_3.jpeg"
              alt="A speaker event"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/about/Intro.jpg"
              alt="Students gathered at a WAISI intro presentation"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/about/Scholars_1.jpg"
              alt="7 students learning about AI"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/about/Tabling.jpg"
              alt="A WAISI booth at the student organization fair"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}