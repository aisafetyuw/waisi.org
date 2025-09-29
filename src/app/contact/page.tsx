import { DISCORD_URL, INSTAGRAM_URL, INTEREST_URL } from '@/constants';
import Button from '@/components/button';

export default function Contact() {
  return (
    <div id="contact" className="-mx-10" style={{marginLeft: '-40px', marginRight: '-40px', backgroundColor: '#FFF9F0'}}>
      <div className="px-8 py-8">
        <h1 className="text-4xl font-semibold mb-8" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"Lora", serif'}}>Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4" style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}>Get Connected</h2>

              <div className="flex flex-col gap-3 max-w-md">
                <Button url={DISCORD_URL} fa="discord" text="Join our Discord Community" />
                <Button url={INSTAGRAM_URL} fa="instagram" text="Follow us on Instagram" />
                <Button url={INTEREST_URL} text="Subscribe to our Mailing List →" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-4" style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}>Direct Inquiries</h2>
              <p className="text-lg mb-4" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
                For general questions, partnerships, or other inquiries, please reach out to us directly:
              </p>
              <a
                href="mailto:aisafetyuw@gmail.com"
                className="inline-flex items-center gap-2 text-lg font-semibold hover:underline"
                style={{color: '#8B5CF6', fontFamily: '"Lora", serif', textDecoration: 'none'}}
              >
                <i className="fas fa-envelope"></i>
                aisafetyuw@gmail.com
              </a>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-4" style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}>Office Hours</h2>
              <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
                Our team members hold regular office hours for students interested in learning more about AI safety.
                Check our Discord for the latest schedule and announcements.
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
              style={{border: '2px solid #E8DCC8'}}
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  )
}