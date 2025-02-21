import { INTEREST_URL, DISCORD_URL, INSTAGRAM_URL } from "@/constants"

export default function Footer() {
  return (
    <footer className="bottom-0 w-full p-8 bg-fuchsia-500 from-violet-500 bg-gradient-to-tr">
      <p className="text-white">Keep up to date. Subscribe to our <a className="font-bold underline" href={INTEREST_URL} target="_blank">mailing list</a>, join our <a className="font-bold underline" href={DISCORD_URL} target="_blank">Discord</a> community, or follow our <a className="font-bold underline" href="https://www.instagram.com/waisi_uw" target="_blank">Instagram</a>.</p>
      <p className="text-white mb-2">Contact us at <a className="font-bold underline" href="mailto:aisafetyuw@gmail.com">aisafetyuw@gmail.com</a>.</p>
    </footer>
  )
}