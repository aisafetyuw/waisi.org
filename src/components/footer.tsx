import {
  INTEREST_URL,
  DISCORD_URL,
  INSTAGRAM_URL,
  TWITTER_URL,
  LINKEDIN_URL,
} from "@/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bottom-0 w-full" style={{ backgroundColor: "#6B46C1" }}>
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className="font-semibold text-lg mb-3"
              style={{
                color: "#FFF9F0",
              }}
            >
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/team"
                className="hover:underline"
                style={{
                  color: "#FFF9F0",
                  opacity: 0.9,
                }}
              >
                Our Team
              </Link>
              <Link
                href="/programs"
                className="hover:underline"
                style={{
                  color: "#FFF9F0",
                  opacity: 0.9,
                }}
              >
                Get Involved
              </Link>
              <Link
                href="/research"
                className="hover:underline"
                style={{
                  color: "#FFF9F0",
                  opacity: 0.9,
                }}
              >
                Research
              </Link>
              <Link
                href="/contact"
                className="hover:underline"
                style={{
                  color: "#FFF9F0",
                  opacity: 0.9,
                }}
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3
              className="font-semibold text-lg mb-3"
              style={{
                color: "#FFF9F0",
              }}
            >
              Connect With Us
            </h3>
            <div className="flex flex-col space-y-2">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{
                  color: "#FFF9F0",
                  opacity: 0.9,
                }}
              >
                <i className="fab fa-discord mr-2" aria-hidden="true"></i>Discord
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{
                  color: "#FFF9F0",
                  opacity: 0.9,
                }}
              >
                <i className="fab fa-instagram mr-2" aria-hidden="true"></i>Instagram
              </a>
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{
                  color: "#FFF9F0",
                  opacity: 0.9,
                }}
              >
                <i className="fab fa-twitter mr-2" aria-hidden="true"></i>Twitter
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{
                  color: "#FFF9F0",
                  opacity: 0.9,
                }}
              >
                <i className="fab fa-linkedin mr-2" aria-hidden="true"></i>LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3
              className="font-semibold text-lg mb-3"
              style={{
                color: "#FFF9F0",
              }}
            >
              Stay Updated
            </h3>
            <p
              className="mb-3"
              style={{
                color: "#FFF9F0",
                opacity: 0.9,
              }}
            >
              Join our mailing list for updates on programs, events, and
              research.
            </p>
            <a
              href={INTEREST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 transition-colors hover:opacity-90"
              style={{
                backgroundColor: "#C4B5FD",
                color: "#6B46C1",
                fontWeight: 600,
              }}
            >
              Subscribe →
            </a>
          </div>
        </div>

        {/* Copyright and Non-Profit Notice */}
        <div
          className="mt-8 pt-6 border-t text-center"
          style={{ borderColor: "rgba(255, 249, 240, 0.2)" }}
        >
          <p
            style={{
              color: "#FFF9F0",
              opacity: 0.9,
            }}
          >
            © {new Date().getFullYear()} Wisconsin AI Safety Initiative. All
            rights reserved.
          </p>
          <p
            className="mt-2"
            style={{
              color: "#FFF9F0",
              opacity: 0.9,
            }}
          >
            WAISI is a 501(c)(3) non-profit organization.
          </p>
        </div>
      </div>
    </footer>
  );
}

