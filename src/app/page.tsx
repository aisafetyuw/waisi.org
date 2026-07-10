import Image from "next/image";
import heroImg from "../../public/capital_landscape.webp";
import CompanyCarousel from "@/components/CompanyCarousel";
import NumbersCarousel from "@/components/NumbersCarousel";
import PhotoCarousel from "@/components/PhotoCarousel";
import ScrollArrow from "@/components/ScrollArrow";
import OpportunityCard from "@/components/OpportunityCard";
import PaperCard from "@/components/PaperCard";
import {
  OPPORTUNITIES,
  FEATURED_OPPORTUNITY,
  CURRENT_PROJECTS,
  RESEARCH_HIGHLIGHTS,
  COLLABORATORS,
  SPONSORS,
} from "@/content/home";

export default function Home() {
  return (
    <div id="home" className="-mx-10">
      {/* Full Screen Hero Banner */}
      <div
        className="relative"
        style={{ height: "100vh", marginTop: "-80px", paddingTop: "80px" }}
      >
        <Image
          src={heroImg}
          alt="WAISI at the Capitol"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          placeholder="blur"
          quality={60}
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1 }}
        >
          <h1 className="text-4xl md:text-6xl text-center px-8 font-semibold max-w-5xl text-white">
            A community at UW–Madison dedicated to making AI safe and beneficial
            for all.
          </h1>
          <ScrollArrow />
        </div>
      </div>

      {/* About Section Content */}
      <div id="about" className="bg-page w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Left Column - Photo */}
          <div className="relative h-full min-h-0 bg-page">
            <Image
              src="/about/CAIP_2.JPG"
              alt="Nine WAISI members in front of the US Capitol"
              width={792}
              height={891}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Our Mission Text */}
          <div className="flex flex-col py-8 h-full bg-page pl-8">
            <div className="flex flex-col gap-4 h-full pr-8">
              <h2 className="text-3xl font-semibold pb-2 text-heading">
                Our Mission
              </h2>
              <p className="text-lg text-primary">
                We believe that AI presents a magnitude of risks and benefits
                unmatched by any previous technology. To realize the benefits,
                we must address the risks.
              </p>
              <p className="text-lg font-semibold text-heading">
                We contribute by:
              </p>
              <div className="space-y-4 ml-4">
                {[
                  "Building and supporting a community of AI Safety specialists.",
                  "Producing impactful research across disciplines.",
                  "Informing public discourse on transformative AI.",
                ].map((item) => (
                  <p key={item} className="text-lg flex items-start text-primary">
                    <span className="text-heading mr-2">•</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <p className="text-lg text-primary">
                <span className="font-semibold text-heading">Our goal:</span>{" "}
                help humanity navigate the transition to advanced AI wisely.
              </p>
            </div>
          </div>
        </div>

        {/* By The Numbers - Full Width Section */}
        <NumbersCarousel />

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* Left Column - Involvement and Impact */}
          <div className="flex flex-col gap-6 px-8 py-8 bg-page">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-semibold pb-2 text-heading">
                Involvement and Impact
              </h2>
              <ul className="list-disc pl-5 text-lg space-y-2 mt-4 text-primary">
                <li>
                  9 WAISI members were flown out to DC to{" "}
                  <a
                    href="https://www.cs.wisc.edu/2025/03/13/waisi-presents-caip-advanced-ai-expo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link no-underline hover:underline"
                  >
                    participate in a Congressional Exhibition on Advanced AI.
                  </a>
                </li>
                <li>
                  Contributed to Wisconsin&apos;s{" "}
                  <a
                    href="https://docs.legis.wisconsin.gov/2023/proposals/reg/asm/bill/ab664"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link no-underline hover:underline"
                  >
                    2023 Assembly Bill 664
                  </a>
                  , which requires disclosing AI-generated material in political
                  ads.
                </li>
                <li>
                  Hosted speakers from{" "}
                  <a
                    href="https://deepmind.google/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link no-underline hover:underline"
                  >
                    Google DeepMind
                  </a>
                  ,{" "}
                  <a
                    href="https://www.anthropic.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link no-underline hover:underline"
                  >
                    Anthropic
                  </a>
                  ,{" "}
                  <a
                    href="https://www.metr.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link no-underline hover:underline"
                  >
                    Model Evaluation and Threat Research (METR)
                  </a>
                  , the{" "}
                  <a
                    href="https://www.cnas.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link no-underline hover:underline"
                  >
                    Center for a New American Security (CNAS)
                  </a>
                  , and the{" "}
                  <a
                    href="https://horizonpublicservice.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link no-underline hover:underline"
                  >
                    Horizon Institute for Public Service
                  </a>
                  .
                </li>
                <li>
                  Members in 12+ research labs on campus.{" "}
                  <a
                    href="/research"
                    className="text-link no-underline hover:underline"
                  >
                    See our research page.
                  </a>
                </li>
                <li>
                  Collaborated with professors from the School of Computer,
                  Data, and Information Sciences, the School of Education, the
                  School of Business, and the Department of Philosophy.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Photo Carousel */}
          <PhotoCarousel />
        </div>

        {/* Opportunities Section */}
        <div className="px-8 py-16 bg-page w-full">
          <h2
            className="text-3xl font-semibold text-center mb-8 pb-2 text-heading"
            style={{ maxWidth: "800px", margin: "0 auto 2rem" }}
          >
            Opportunities
          </h2>

          <div className="max-w-6xl mx-auto mb-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {OPPORTUNITIES.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.title}
                  opportunity={opportunity}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <OpportunityCard
                opportunity={FEATURED_OPPORTUNITY}
                className="w-full md:w-1/2 z-10"
              />
            </div>
          </div>
        </div>

        {/* Highlighted Research Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-page w-full">
          {/* Left Column - Image with Title Overlay */}
          <div className="flex items-center justify-center relative">
            <Image
              src="/waisi_writing.webp"
              alt="WAISI members working on research"
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-opacity-90 p-4 bg-card-alt rounded-card">
                <h2 className="text-3xl font-semibold text-heading">
                  Current Projects
                </h2>
              </div>
            </div>
          </div>

          {/* Right Column - Research Excerpts */}
          <div className="flex flex-col gap-6 px-8 py-8">
            {CURRENT_PROJECTS.map((project) => (
              <div
                key={project.title}
                className="p-6 bg-card rounded-card shadow-card"
              >
                <h3 className="text-xl font-semibold mb-3 text-heading">
                  {project.title}
                </h3>
                <p className="leading-relaxed text-primary">
                  {project.description}
                </p>
                <a
                  href="/research"
                  className="text-lg font-semibold mt-2 inline-block text-link no-underline"
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Research Highlights Section */}
        <div className="px-8 py-16 bg-page w-full">
          <h2
            className="text-3xl font-semibold text-center mb-8 pb-2 text-heading"
            style={{ maxWidth: "800px", margin: "0 auto 2rem" }}
          >
            Research Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {RESEARCH_HIGHLIGHTS.map((paper) => (
              <PaperCard key={paper.link} paper={paper} />
            ))}
          </div>

          {/* See More Papers Button */}
          <div className="flex justify-center mt-8">
            <a
              href="/research"
              className="px-6 py-3 font-semibold transition-opacity hover:opacity-80 text-white rounded-card bg-link"
            >
              See our 20+ Papers
            </a>
          </div>
        </div>
      </div>

      {/* Collaborations Section */}
      <CompanyCarousel companies={COLLABORATORS} />

      {/* Our Sponsors Section */}
      <div className="px-8 py-16 bg-page w-full">
        <h2
          className="text-3xl font-semibold text-center mb-12 pb-2 text-heading"
          style={{ maxWidth: "800px", margin: "0 auto 3rem" }}
        >
          Our Sponsors
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
          {SPONSORS.map((sponsor) => (
            <div key={sponsor.name} className="flex flex-col items-center gap-4">
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.alt}
                  width={200}
                  height={100}
                  className="object-contain"
                />
              </a>
              <p className="text-lg font-semibold text-center text-primary">
                {sponsor.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
