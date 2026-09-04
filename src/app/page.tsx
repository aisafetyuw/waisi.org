import Image from "next/image";
import Link from "next/link";
import heroImg from "../../public/capital_landscape.webp";
import { DISCORD_URL } from "@/constants";
import CompanyCarousel from "@/components/CompanyCarousel";
import NumbersCarousel from "@/components/NumbersCarousel";
import PhotoCarousel from "@/components/PhotoCarousel";
import PaperCard from "@/components/PaperCard";
import ProgramFunnel from "@/components/ProgramFunnel";
import {
  IMPACT_HIGHLIGHTS,
  RESEARCH_HIGHLIGHTS,
  COLLABORATORS,
  SPONSORS,
} from "@/content/home";

export default function Home() {
  return (
    <div id="home" className="-mx-10">
      {/* 1 — Hero: full-screen Capitol photo under the fixed transparent
          nav, headline left, CTAs right */}
      {/* bg-ink: a flat dark ground while the photo loads, so the hero never
          flashes white or a blurred placeholder under the overlay. */}
      <section className="relative h-screen bg-ink">
        <Image
          src={heroImg}
          alt="WAISI at the Capitol"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={60}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white max-w-4xl text-center">
            A community at the University of Wisconsin dedicated to mitigating
            the{" "}
            {/* violet-300, not --text-link: the brand violet is too dark to
                read over the dimmed photo. whitespace-nowrap keeps the phrase
                on one line as the headline wraps. */}
            <span className="text-violet-300 whitespace-nowrap">
              risks of transformative AI.
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="waisi-button text-lg"
            >
              Join our community
            </a>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 text-lg font-semibold text-white border-2 border-white rounded transition-colors hover:bg-white/15"
            >
              Chat with us
            </Link>
          </div>
        </div>
      </section>

      {/* 2 — Mission */}
      <div id="about" className="w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch lg:min-h-[36rem]">
          <div className="relative h-full min-h-0">
            <Image
              src="/about/CAIP_2.JPG"
              alt="Nine WAISI members in front of the US Capitol"
              width={792}
              height={891}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center py-16 h-full px-8 lg:px-12">
            <div className="flex flex-col gap-5 max-w-prose">
              <h2 className="text-heading">Our Mission</h2>
              <p className="text-lg text-primary">
                We believe that AI presents a magnitude of risks and benefits
                unmatched by any previous technology. To realize the benefits,
                we must address the risks.
              </p>
              <p className="text-lg font-semibold text-heading">
                We contribute by:
              </p>
              <ul className="space-y-2 ml-1 list-none">
                {[
                  "Building and supporting a community of AI Safety specialists.",
                  "Producing impactful research across disciplines.",
                  "Informing public discourse on transformative AI.",
                ].map((item) => (
                  <li key={item} className="text-lg flex items-start text-primary">
                    <span className="text-link mr-3">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg text-primary">
                <span className="font-semibold text-heading">Our goal:</span>{" "}
                help humanity navigate the transition to advanced AI wisely.
              </p>
            </div>
          </div>
        </div>

        {/* 3 — Proof band: numbers + impact highlights + photos */}
        <div>
          <NumbersCarousel />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pb-16 max-w-6xl mx-auto">
            {/* Sized to fill the carousel's height (min 480px on lg) rather
                than float in the middle of it. */}
            <ul className="flex flex-col justify-center gap-10 list-none">
              {IMPACT_HIGHLIGHTS.map((item) => (
                <li
                  key={item.text}
                  className="text-xl lg:text-2xl leading-snug flex items-start text-primary"
                >
                  <span className="text-link mr-3">—</span>
                  <span>
                    {item.text}
                    {item.href && item.linkText && (
                      <>
                        {" "}
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link no-underline hover:text-link-hover active:text-link-hover transition-colors"
                        >
                          {item.linkText}
                        </a>
                        .
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="rounded-card border border-subtle overflow-hidden">
              <PhotoCarousel />
            </div>
          </div>
        </div>

        {/* 4 — Programs funnel */}
        <div className="px-8 py-16 w-full">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-heading mb-8 text-center">Get involved</h2>
            <ProgramFunnel />
            <div className="mt-8 flex justify-center">
              <Link href="/programs" className="waisi-button">
                See full programming
              </Link>
            </div>
          </div>
        </div>

        {/* 5 — Research highlights */}
        <div className="px-8 py-16 w-full">
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
      <div className="max-w-6xl mx-auto px-6">
        <CompanyCarousel companies={COLLABORATORS} />
      </div>

      <div className="px-8 py-16 w-full max-w-6xl mx-auto">
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
