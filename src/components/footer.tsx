import {
  INTEREST_URL,
  DISCORD_URL,
  INSTAGRAM_URL,
  TWITTER_URL,
  LINKEDIN_URL,
} from "@/constants";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bottom-0 w-full bg-brand">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3 text-cream">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/team"
                className="hover:underline text-cream opacity-90"
              >
                Our Team
              </Link>
              <Link
                href="/programs"
                className="hover:underline text-cream opacity-90"
              >
                Get Involved
              </Link>
              <Link
                href="/research"
                className="hover:underline text-cream opacity-90"
              >
                Research
              </Link>
              <Link
                href="/contact"
                className="hover:underline text-cream opacity-90"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 text-cream">
              Connect With Us
            </h3>
            <div className="flex flex-col space-y-2">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-cream opacity-90"
              >
                <FontAwesomeIcon icon={faDiscord} className="mr-2" aria-hidden="true" />Discord
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-cream opacity-90"
              >
                <FontAwesomeIcon icon={faInstagram} className="mr-2" aria-hidden="true" />Instagram
              </a>
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-cream opacity-90"
              >
                <FontAwesomeIcon icon={faTwitter} className="mr-2" aria-hidden="true" />Twitter
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-cream opacity-90"
              >
                <FontAwesomeIcon icon={faLinkedin} className="mr-2" aria-hidden="true" />LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 text-cream">
              Stay Updated
            </h3>
            <p className="mb-3 text-cream opacity-90">
              Join our mailing list for updates on programs, events, and
              research.
            </p>
            <a
              href={INTEREST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 transition-colors hover:opacity-90 bg-[#C4B5FD] text-heading font-semibold"
            >
              Subscribe →
            </a>
          </div>
        </div>

        {/* Copyright and Non-Profit Notice */}
        <div className="mt-8 pt-6 border-t text-center border-cream/20">
          <p className="text-cream opacity-90">
            © {new Date().getFullYear()} Wisconsin AI Safety Initiative. All
            rights reserved.
          </p>
          <p className="mt-2 text-cream opacity-90">
            WAISI is a 501(c)(3) non-profit organization.
          </p>
        </div>
      </div>
    </footer>
  );
}
