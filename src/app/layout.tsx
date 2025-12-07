import "../styles/globals.css";
import { DM_Serif_Display, Lora } from "next/font/google";
import { Suspense } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export const metadata = {
  title: "Wisconsin AI Safety Initiative",
  description:
    "A community of students building skills to reduce risk from advanced AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://kit.fontawesome.com/8a0618493f.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${lora.className} ${lora.variable}`}>
        <Suspense
          fallback={
            <div
              className="fixed top-0 left-0 right-0 z-50 h-20"
              style={{ backgroundColor: "#FFF9F0" }}
            />
          }
        >
          <Nav />
        </Suspense>
        <div
          id="content"
          className="flex flex-col min-h-screen pt-20"
          style={{
            minHeight: "calc(100vh - 210px)",
            backgroundColor: "#FFF9F0",
          }}
        >
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
