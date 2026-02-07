import "../styles/globals.css";
import { Suspense } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import ThemeProvider from "../components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://kit.fontawesome.com/8a0618493f.js"
          crossOrigin="anonymous"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('waisi-theme')||'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Suspense
            fallback={
              <div
                className="fixed top-0 left-0 right-0 z-50 h-20"
                style={{ backgroundColor: "var(--bg-page)" }}
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
              backgroundColor: "var(--bg-page)",
            }}
          >
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
