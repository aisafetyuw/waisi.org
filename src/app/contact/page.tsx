import { DISCORD_URL, INSTAGRAM_URL, INTEREST_URL } from '@/constants';
import Button from '@/components/button';

export default function Contact() {
  return (
    <div className="page">
      <h1 className="text-4xl md:text-5xl mb-8">Contact Us</h1>

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl mb-4">Get Connected</h2>
          <p className="text-lg mb-6">
            Join our community and stay updated with the latest news, events, and opportunities at WAISI.
          </p>

          <div className="flex flex-col gap-3 max-w-md">
            <Button url={DISCORD_URL} fa="discord" text="Join our Discord Community" />
            <Button url={INSTAGRAM_URL} fa="instagram" text="Follow us on Instagram" />
            <Button url={INTEREST_URL} text="Subscribe to our Mailing List →" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl mb-4">Direct Inquiries</h2>
          <p className="text-lg mb-4">
            For general questions, partnerships, or other inquiries, please reach out to us directly:
          </p>
          <a
            href="mailto:aisafetyuw@gmail.com"
            className="inline-flex items-center gap-2 text-lg font-semibold text-violet-600 hover:text-violet-700 hover:underline"
          >
            <i className="fas fa-envelope"></i>
            aisafetyuw@gmail.com
          </a>
        </div>

        <div>
          <h2 className="text-2xl mb-4">Office Hours</h2>
          <p className="text-lg">
            Our team members hold regular office hours for students interested in learning more about AI safety.
            Check our Discord for the latest schedule and announcements.
          </p>
        </div>
      </div>
    </div>
  )
}