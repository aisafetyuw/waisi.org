import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Nav from '../components/nav';
import Footer from '../components/footer';

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
