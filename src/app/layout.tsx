import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ChronoGuide from "@/components/ChronoGuide";
import AuthProvider from "@/components/AuthProvider";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chronos: Interactive Spatial History Experience",
  description: "A premium 3D web experience exploring history through immersive space and time timelines.",
  keywords: ["history", "sundial", "hourglass", "3d history", "ancient rome", "renaissance", "ancient egypt"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-charcoal text-warm-ivory selection:bg-accent selection:text-charcoal-dark overflow-x-hidden">
        <AuthProvider>
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow pt-24 min-h-screen">
            {children}
          </main>

          {/* Global AI Chrono-Guide Widget */}
          <ChronoGuide />

          {/* Footer */}
          <footer className="border-t border-accent/10 py-12 px-4 md:px-8 bg-charcoal-dark/40 backdrop-blur-sm mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <span className="font-playfair font-bold text-lg tracking-wider text-accent">CHRONOS</span>
                <p className="font-outfit text-sm text-warm-ivory/50 mt-1 max-w-md">
                  An interactive spatial history experience charting human advancement across ancient realms and classical dynasties.
                </p>
              </div>
              <div className="flex gap-8 text-sm font-outfit">
                <Link href="/timeline" className="text-warm-ivory/60 hover:text-accent transition-colors">Chronology</Link>
                <Link href="/explorer/rome" className="text-warm-ivory/60 hover:text-accent transition-colors">Explorer</Link>
                <Link href="/gallery" className="text-warm-ivory/60 hover:text-accent transition-colors">Museum</Link>
              </div>
              <div className="font-outfit text-xs text-warm-ivory/40">
                © {new Date().getFullYear()} Chronos. Built with Next.js & Three.js.
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
