import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  return (
    <div id="nav" className="flex justify-between items-center">
      <Image
        src="/waisi_gradient_rounded.png"
        width={150}
        height={150}
        alt="WAISI logo"
        className="flex items-center p-4"
      />
      <div id="links" className="flex items-center justify-end space-x-4 p-4">
        <Link href="/" className="p-4">Home</Link>
        <Link href="/about" className="p-4">About</Link>
        <Link href="/events" className="p-4">Events</Link>
        <Link href="/leadership" className="p-4">Leadership</Link>
        <Link href="/projects" className="p-4">Projects</Link>
      </div>
    </div>
  )
}