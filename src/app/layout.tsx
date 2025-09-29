import '../styles/globals.css'
import { Open_Sans, DM_Serif_Display } from 'next/font/google'
import Nav from '../components/nav';
import Footer from '../components/footer';

const font = Open_Sans({ subsets: ['latin'], weight: ['400'] })
const dmSerifDisplay = DM_Serif_Display({ subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'], variable: '--font-dm-serif' })

export const metadata = {
  title: 'Wisconsin AI Safety Initiative',
  description: 'A community of students building skills to reduce risk from advanced AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/8a0618493f.js" crossOrigin="anonymous"></script>
      </head>
      <body className={`${font.className} ${dmSerifDisplay.variable}`}>
        <Nav />
        <div id="content" className="flex flex-col min-h-screen pt-20"  style={{ minHeight: 'calc(100vh - 210px)' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
