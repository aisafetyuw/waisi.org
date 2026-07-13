import Image from "next/image";
import Link from "next/link";
import CapabilitiesHero from "@/components/CapabilitiesHero";
import CompanyCarousel from "@/components/CompanyCarousel";
import NumbersCarousel from "@/components/NumbersCarousel";
import PhotoCarousel from "@/components/PhotoCarousel";
import PaperCard from "@/components/PaperCard";
import {
  IMPACT_HIGHLIGHTS,
  PROGRAM_TEASERS,
  RESEARCH_HIGHLIGHTS,
  COLLABORATORS,
  SPONSORS,
} from "@/content/home";

export default function Home() {
  return (
    <div id="home" className="-mx-10">
      {/* 1 — Hero: full-stage METR capabilities chart, headline nested in
          its empty upper-left region */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-start justify-center pt-2 px-4 lg:px-10">
        <div className="relative w-full max-w-[calc((100vh-9rem)*1.0125)] mx-auto">
          <div className="lg:absolute lg:left-[7%] lg:top-[36%] flex flex-col gap-5 mb-8 lg:mb-0 max-w-2xl">
            <h1 className="text-4xl md:text-5xl text-heading">
              Capabilities are climbing.
              <br />
              <span className="text-link">Safety must summit.</span>
            </h1>
            <div className="mt-2">
              <Link href="/programs" className="waisi-button">
                Get involved
              </Link>
            </div>
          </div>
          <CapabilitiesHero />
          <p className="mt-3 text-xs font-mono text-primary opacity-50">
            Data:{" "}
            <a
              href="https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80"
            >
              METR, Measuring AI Ability to Complete Long Tasks
            </a>{" "}
            — Time Horizon v1.1, p50 task-completion horizons
          </p>
        </div>
      </section>

      {/* 2 — Mission */}
      <div id="about" className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="relative h-full min-h-0">
            <Image
              src="/about/CAIP_2.JPG"
              alt="Nine WAISI members in front of the US Capitol"
              width={792}
              height={891}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center py-12 h-full px-8 lg:px-12">
            <div className="flex flex-col gap-4 max-w-prose">
              <h2 className="text-heading">Our Mission</h2>
              <p className="text-base text-primary">
                We believe that AI presents a magnitude of risks and benefits
                unmatched by any previous technology. To realize the benefits,
                we must address the risks.
              </p>
              <p className="text-base font-semibold text-heading">
                We contribute by:
              </p>
              <ul className="space-y-2 ml-1 list-none">
                {[
                  "Building and supporting a community of AI Safety specialists.",
                  "Producing impactful research across disciplines.",
                  "Informing public discourse on transformative AI.",
                ].map((item) => (
                  <li key={item} className="text-base flex items-start text-primary">
                    <span className="text-link mr-3">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base text-primary">
                <span className="font-semibold text-heading">Our goal:</span>{" "}
                help humanity navigate the transition to advanced AI wisely.
              </p>
            </div>
          </div>
        </div>

        {/* 3 — Proof band: numbers + impact highlights + photos */}
        <div className="border-t border-b border-subtle">
          <NumbersCarousel />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 lg:px-16 pb-12 max-w-6xl mx-auto">
            {IMPACT_HIGHLIGHTS.map((item) => (
              <div
                key={item.text}
                className="p-6 bg-card border border-subtle rounded-card"
              >
                <p className="text-base text-primary">
                  {item.text}
                  {item.href && item.linkText && (
                    <>
                      {" "}
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link no-underline hover:underline"
                      >
                        {item.linkText}
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
          <PhotoCarousel />
        </div>

        {/* 4 — Programs teaser */}
        <div className="px-8 py-16 w-full">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-heading mb-2">Get involved</h2>
            <p className="text-base text-primary mb-8 max-w-prose">
              Four programs, from first exposure to core membership. Most
              require no prior experience.
            </p>
            <div className="border-t border-subtle">
              {PROGRAM_TEASERS.map((program) => (
                <Link
                  key={program.title}
                  href="/programs"
                  className="group grid grid-cols-1 md:grid-cols-[220px_1fr_auto] gap-x-6 gap-y-1 items-baseline py-5 border-b border-subtle"
                >
                  <span className="font-serif text-lg text-heading">
                    {program.title}
                  </span>
                  <span className="text-base text-primary">
                    {program.blurb}
                  </span>
                  <span className="text-link opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">
                    →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/programs" className="waisi-button">
                See all programs
              </Link>
            </div>
          </div>
        </div>

        {/* 5 — Research highlights */}
        <div className="px-8 py-16 w-full border-t border-subtle">
          <h2 className="text-heading text-center mb-2">
            Research Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {RESEARCH_HIGHLIGHTS.map((paper) => (
              <PaperCard key={paper.link} paper={paper} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/research" className="waisi-button">
              See our 20+ papers
            </Link>
          </div>
        </div>
      </div>

      {/* Partners + sponsors */}
      <CompanyCarousel companies={COLLABORATORS} />

      <div className="px-8 py-16 w-full">
        <h2 className="text-heading text-center mb-12">Our Sponsors</h2>
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
              <p className="text-base font-medium text-center text-primary">
                {sponsor.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
