import { INTEREST_URL, DISCORD_URL, INSTAGRAM_URL, TWITTER_URL, LINKEDIN_URL } from "@/constants"
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bottom-0 w-full bg-fuchsia-500 from-violet-500 bg-gradient-to-tr">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/about" className="text-white/90 hover:text-white hover:underline">About</Link>
              <Link href="/programs" className="text-white/90 hover:text-white hover:underline">Get Involved</Link>
              <Link href="/research" className="text-white/90 hover:text-white hover:underline">Research</Link>
              <Link href="/contact" className="text-white/90 hover:text-white hover:underline">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Connect With Us</h3>
            <div className="flex flex-col space-y-2">
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white hover:underline">
                <i className="fab fa-discord mr-2"></i>Discord
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white hover:underline">
                <i className="fab fa-instagram mr-2"></i>Instagram
              </a>
              <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white hover:underline">
                <i className="fab fa-twitter mr-2"></i>Twitter
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white hover:underline">
                <i className="fab fa-linkedin mr-2"></i>LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Stay Updated</h3>
            <p className="text-white/90 mb-3">Join our mailing list for updates on programs, events, and research.</p>
            <a href={INTEREST_URL} target="_blank" rel="noopener noreferrer"
               className="inline-block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
              Subscribe →
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}