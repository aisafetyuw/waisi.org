import { Lora } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora'
});

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={lora.className}>
      {children}
    </div>
  );
}