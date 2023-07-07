import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  return (
    <div id="nav" className="flex justify-between items-center">
      <div className="flex items-center p-8">
        <Image
          src="/waisi_gradient_rounded.png"
          width={150}
          height={150}
          alt="WAISI logo"
        />
      </div>
      <div id="links" className="flex items-center justify-end space-x-4 p-8">
        <Link href="/" className="p-2 hover:font-bold">Home</Link>
        <Link href="/about" className="p-2 hover:font-bold">About</Link>
        <Link href="/events" className="p-2 hover:font-bold">Events</Link>
        <Link href="/leadership" className="p-2 hover:font-bold">Leadership</Link>
        <Link href="/projects" className="p-2 hover:font-bold">Projects</Link>
      </div>
    </div>
  )
}