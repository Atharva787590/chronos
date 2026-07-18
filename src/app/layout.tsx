import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chronos: Interactive Spatial History Experience",
  description: "A premium 3D web experience exploring history through immersive space and time timelines.",
  keywords: ["history", "sundial", "hourglass", "3d history", "ancient rome", "renaissance", "cyberpunk future"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-charcoal text-warm-ivory selection:bg-accent selection:text-charcoal-dark overflow-x-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow pt-24 min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-accent/10 py-12 px-4 md:px-8 bg-charcoal-dark/40 backdrop-blur-sm mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="font-playfair font-bold text-lg tracking-wider text-accent">CHRONOS</span>
              <p className="font-outfit text-sm text-warm-ivory/50 mt-1 max-w-md">
                An interactive spatial history experience charting human advancement across ancient realms and cyberpunk tomorrows.
              </p>
            </div>
            <div className="flex gap-8 text-sm font-outfit">
              <a href="/timeline" className="text-warm-ivory/60 hover:text-accent transition-colors">Chronology</a>
              <a href="/explorer/rome" className="text-warm-ivory/60 hover:text-accent transition-colors">Explorer</a>
              <a href="/gallery" className="text-warm-ivory/60 hover:text-accent transition-colors">Museum</a>
            </div>
            <div className="font-outfit text-xs text-warm-ivory/40">
              © {new Date().getFullYear()} Chronos. Built with Next.js & Three.js.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
