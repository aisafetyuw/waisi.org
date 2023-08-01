import '../styles/globals.css'
import { Open_Sans } from 'next/font/google'
import Nav from '../components/nav';
import Footer from '../components/footer';

const font = Open_Sans({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'Wisconsin AI Safety Initiative',
  description: 'Building a community of students collaborating to mitigate the risks of artificial intelligence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Nav />
        <div id="content" className="flex flex-col min-h-screen"  style={{ minHeight: 'calc(100vh - 230px)' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
