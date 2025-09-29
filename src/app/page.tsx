import { INTEREST_URL, DISCORD_URL, INSTAGRAM_URL, TWITTER_URL, LINKEDIN_URL } from '@/constants';
import Button from '@/components/button';
import CompanyCarousel from '@/components/CompanyCarousel';

export default function Home() {
  return (
    <div id="home" className="page max-w-full px-8">
      <div className="flex flex-col py-4">
        <h1 className="text-4xl md:text-6xl" >
          A community at UW–Madison aligned to making{' '}
          <span className="text-gradient inline">AI safe and beneficial for all.</span>
        </h1>
      </div>
      <div className="flex flex-col py-4 gap-4 w-full md:w-2/3 text-xl md:text-2xl">
      {/* <Button url={INTEREST_URL} text="Join our mailing list →"/> */}
      <Button url={"https://forms.gle/pPn5idt81BEDH8bG8"} text="Apply to our technical intro program →"/>
      <Button url={"https://forms.gle/bcRimCCmg7F3uEaS9"} text="Apply to our policy intro program →"/>
      </div>
      <div id="home-content">
        <div className="flex flex-col py-4">
        <h3 className="text-xl">
        At the Wisconsin AI Safety Initiative (WAISI), we think that reducing risks from advanced artificial intelligence may be one of the most important problems of our time. It's a challenge that spans technical research, policy, and ethics—and we're bringing people together to work on it.
        </h3>
        <h3 className="text-xl">
        We run semester-long introductory programs on AI safety, including a technical and policy track. <a href="/programs" className="underline">Learn more here.</a>
        </h3>
        <h3 className="text-xl">
        We also host Safety Scholars, our core group of members. Scholars meet weekly to discuss a relevant research paper over a provided meal, and often go on to work on relevant projects. <a href="/programs" className="underline">Learn more here.</a>
        </h3>
        </div>
        {/* <div id="buttons" className="flex flex-wrap mb-8 gap-2">
          <Button url={"/about"} text="About" />
          <Button url={"/programs"} text="Programs" />
          <Button url={DISCORD_URL} fa="discord" text="Discord" />
          <Button url={INSTAGRAM_URL} fa="instagram" text="Instagram" />
          <Button url={TWITTER_URL} fa="twitter" text="Twitter" />
          <Button url={LINKEDIN_URL} fa="linkedin" text="LinkedIn" />
        </div> */}
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
