import { DISCORD_URL, INSTAGRAM_URL, INTEREST_URL } from "@/constants";
import Button from "@/components/button";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Wisconsin AI Safety Initiative — Discord, Instagram, email, and interest form.",
};

export default function Contact() {
  return (
    <div id="contact" className="max-w-6xl mx-auto">
      <div className="px-16 py-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex flex-col gap-3 max-w-md">
                <Button
                  url={DISCORD_URL}
                  fa="discord"
                  text="Join our Discord Community"
                />
                <Button
                  url={INSTAGRAM_URL}
                  fa="instagram"
                  text="Follow us on Instagram"
                />
                <Button
                  url={INTEREST_URL}
                  text="Subscribe to our Mailing List →"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-4 text-heading">
                Direct Inquiries
              </h2>
              <p className="text-lg mb-4 text-primary">
                For general questions, partnerships, or other inquiries, please
                reach out to us directly:
              </p>
              <a
                href="mailto:aisafetyuw@gmail.com"
                className="inline-flex items-center gap-2 text-lg font-semibold hover:underline text-link"
              >
                <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
                aisafetyuw@gmail.com
              </a>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-4 text-heading">
                Office Hours
              </h2>
              <p className="text-lg text-primary">
                Our team members hold regular office hours for students
                interested in learning more about AI safety. Check our Discord
                for the latest schedule and announcements.
              </p>
            </div>
          </div>

          {/* Right Column - Google Form */}
          <div className="flex flex-col">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSewVZAUvWPY7BkwarV4b_baBN9h3WgpouakfTE6uJXwaDp6IQ/viewform?embedded=true"
              width="100%"
              height="600"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="rounded-card border border-subtle"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
