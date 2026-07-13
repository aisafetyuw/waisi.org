import Image from "next/image";
import Link from "next/link";
import CapabilitiesHero from "@/components/CapabilitiesHero";
import CompanyCarousel from "@/components/CompanyCarousel";
import NumbersCarousel from "@/components/NumbersCarousel";
import PhotoCarousel from "@/components/PhotoCarousel";
import ScrollArrow from "@/components/ScrollArrow";
import PaperCard from "@/components/PaperCard";
import { primaryCta } from "@/constants";
import {
  IMPACT_HIGHLIGHTS,
  PROGRAM_TEASERS,
  RESEARCH_HIGHLIGHTS,
  COLLABORATORS,
  SPONSORS,
} from "@/content/home";

export default function Home() {
  const cta = primaryCta();
  return (
    <div id="home" className="-mx-10">
      {/* 1 — Hero: METR-style capabilities curve with climber */}
      <section className="relative min-h-[86vh] flex items-center px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto w-full">
          <div className="order-2 lg:order-1">
            <CapabilitiesHero />
          </div>
          <div className="order-1 lg:order-2 flex flex-col gap-5">
            <h1 className="text-4xl md:text-5xl xl:text-6xl text-heading">
              Conquering capabilities.
              <br />
              Making AI go well.
            </h1>
            <p className="text-lg text-primary max-w-prose">
              The Wisconsin AI Safety Initiative is UW–Madison&apos;s community
              for AI safety research, policy, and education.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href={cta.href}
                {...(cta.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="waisi-button"
              >
                {cta.label}
              </a>
              <Link
                href="/programs"
                className="px-6 py-3 border border-subtle text-primary rounded-card font-semibold hover:bg-card-alt transition-colors"
              >
                Explore programs →
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <ScrollArrow />
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
          <p className="text-base text-primary text-center mb-10 max-w-prose mx-auto">
            WAISI members publish across interpretability, multi-agent systems,
            and more — with members in 12+ research labs on campus.
          </p>
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
