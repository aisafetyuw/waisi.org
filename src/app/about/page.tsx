import React from "react";

export default function About() {
  return (
    <div id="about" className="page">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="border-b">Our Mission</h2>
          <p className="text-lg">
          Our modern world is the product of technological advancement. Artificial intelligence is poised to accelerate this transformation, reshaping economies, global power structures, and daily life. These shifts aren't decades away; in fact, they've already begun.
          </p><br/>
          <p className="text-lg">
          AI has the potential to be a force for immense good, provided we can develop and deploy it safely. The field of AI safety addresses this challenge, requiring expertise that spans technical research, policy, and ethics.
          </p><br/>
          <p className="text-lg">
          At the Wisconsin AI Safety Initiative (WAISI), we bring people together to understand and address the risks of advanced AI. Our aim is to guide its development toward a future that benefits everyone — and the best time to work on that future is now.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="border-b">Our Impact</h2>
          <ul className="list-disc pl-5 text-lg">
            <li>9 WAISI members flew out to DC to participate in a Congressional Exhibition on Advanced AI, hosted by the <a href="https://www.centeraipolicy.org/" target="_blank">Center for AI Policy (CAIP)</a>.</li>
            <li>One of our members contributed to Wisconsin's <a href="https://docs.legis.wisconsin.gov/2023/proposals/reg/asm/bill/ab664" target="_blank">2023 Assembly Bill 664</a>, which requires disclosing AI-generated material in political ads.</li>
            <li>We've hosted speakers from <a href="https://deepmind.google/" target="_blank">Google DeepMind</a>, <a href="https://www.anthropic.com/" target="_blank">Anthropic</a>, <a href="https://www.metr.org/" target="_blank">Model Evaluation and Threat Research (METR)</a>, the <a href="https://www.cnas.org/" target="_blank">Center for a New American Security (CNAS)</a>, and the <a href="https://horizonpublicservice.org/" target="_blank">Horizon Institute for Public Service</a>.</li>
            <li>We have members in 11 research labs on campus. <a href="research">See our research page.</a></li>
            <li>We've collaborated with professors from the School of Computer, Data, and Information Sciences, the School of Education, the School of Business, and the Department of Philosophy.</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="border-b">Our Goals</h2>
          <ol className="list-decimal pl-5 text-lg">
            <li className="text-lg"><b>Spark dialogue.</b> We leverage our position at a flagship school to promote better models of AI futures, encourage productive debate, and engage with key decision-makers.</li>
            <li className="text-lg"><b>Help students build skills for technical AI research and AI policy positions.</b> We connect students with mentors, share relevant opportunities, and run projects that matter. Learn more about our programs <a href="programs">here.</a></li>
            <li className="text-lg"><b>Build a club that lasts.</b> We aim to be a place where friendliness, critical thinking, and shared ambition bring out the best in each other. Learn more by reading our <a href="https://docs.google.com/document/d/1KUVD7c-ZM0uijD0RvYYk6yBl0Oe09AAgIvYyoVUj4h8/edit?usp=sharing" target="_blank">culture statement</a>.</li>
          </ol>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="border-b">Contact</h2>
          <p className="text-lg">If you're a student interested in getting involved, check out our <a href="programs">programs page</a>.</p>
          <p className="text-lg">For all other inquiries, email us at <a href="mailto:aisafetyuw@gmail.com">aisafetyuw@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}