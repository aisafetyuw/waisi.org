import { INTEREST_URL, DISCORD_URL, INSTAGRAM_URL, TWITTER_URL, LINKEDIN_URL } from "@/constants"
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bottom-0 w-full" style={{backgroundColor: '#6B46C1'}}>
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h3 className="font-semibold text-lg mb-3" style={{color: '#FFF9F0', fontFamily: '"Lora", serif'}}>Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/about" className="hover:underline" style={{color: '#FFF9F0', opacity: 0.9, fontFamily: '"Lora", serif'}}>About</Link>
              <Link href="/programs" className="hover:underline" style={{color: '#FFF9F0', opacity: 0.9, fontFamily: '"Lora", serif'}}>Get Involved</Link>
              <Link href="/research" className="hover:underline" style={{color: '#FFF9F0', opacity: 0.9, fontFamily: '"Lora", serif'}}>Research</Link>
              <Link href="/contact" className="hover:underline" style={{color: '#FFF9F0', opacity: 0.9, fontFamily: '"Lora", serif'}}>Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3" style={{color: '#FFF9F0', fontFamily: '"Lora", serif'}}>Connect With Us</h3>
            <div className="flex flex-col space-y-2">
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color: '#FFF9F0', opacity: 0.9, fontFamily: '"Lora", serif'}}>
                <i className="fab fa-discord mr-2"></i>Discord
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color: '#FFF9F0', opacity: 0.9, fontFamily: '"Lora", serif'}}>
                <i className="fab fa-instagram mr-2"></i>Instagram
              </a>
              <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color: '#FFF9F0', opacity: 0.9, fontFamily: '"Lora", serif'}}>
                <i className="fab fa-twitter mr-2"></i>Twitter
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color: '#FFF9F0', opacity: 0.9, fontFamily: '"Lora", serif'}}>
                <i className="fab fa-linkedin mr-2"></i>LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3" style={{color: '#FFF9F0', fontFamily: '"Lora", serif'}}>Stay Updated</h3>
            <p className="mb-3" style={{color: '#FFF9F0', opacity: 0.9, fontFamily: '"Lora", serif'}}>Join our mailing list for updates on programs, events, and research.</p>
            <a href={INTEREST_URL} target="_blank" rel="noopener noreferrer"
               className="inline-block px-4 py-2 transition-colors hover:opacity-90" style={{backgroundColor: '#C4B5FD', color: '#6B46C1', fontFamily: '"Lora", serif', fontWeight: 600}}>
              Subscribe →
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}