"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Compass, Landmark, Cpu, ArrowRight } from "lucide-react";

// Import Canvas with SSR disabled to prevent hydration errors from WebGL context
const PortalCanvas = dynamic(() => import("@/components/PortalCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="font-outfit text-sm text-accent tracking-widest uppercase">Aligning Realities...</span>
      </div>
    </div>
  ),
});

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToTimeStream = () => {
    const element = document.getElementById("time-stream");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const eras = [
    {
      id: "rome",
      name: "Ancient Rome",
      period: "27 BC - 476 AD",
      icon: Landmark,
      description: "Step into the marble courts of empires, gladiators, and engineering feats that shaped the western world.",
      color: "border-accent/25 hover:border-accent/45 shadow-accent/5",
      accentBg: "bg-accent/10",
      accentText: "text-accent",
      imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800",
    },
    {
      id: "india",
      name: "Ancient India",
      period: "322 BC - 1050 AD",
      icon: Compass,
      description: "Delve into ancient stone empires, zero-origin math, and profound dharma paths that shaped global thoughts.",
      color: "border-accent/25 hover:border-accent/45 shadow-accent/5",
      accentBg: "bg-accent/10",
      accentText: "text-accent",
      imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800",
    },
    {
      id: "renaissance",
      name: "The Renaissance",
      period: "14th - 17th Century",
      icon: Compass,
      description: "Witness the resurgence of classical art, humanism, and scientific curiosity under the Tuscan sun.",
      color: "border-accent/25 hover:border-accent/45 shadow-accent/5",
      accentBg: "bg-accent/10",
      accentText: "text-accent",
      imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800",
    },
    {
      id: "egypt",
      name: "Ancient Egypt",
      period: "3100 BC - 30 BC",
      icon: Landmark,
      description: "Traverse the sands of time to explore towering pyramids, sacred hieroglyphs, and powerful pharaohs.",
      color: "border-accent/25 hover:border-accent/45 shadow-accent/5",
      accentBg: "bg-accent/10",
      accentText: "text-accent",
      imageUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800",
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-charcoal">
      {/* 3D Hero Section */}
      <section className="relative h-[calc(100vh-6rem)] w-full flex flex-col justify-center items-center overflow-hidden px-4">
        {/* Floating 3D Object Container */}
        <motion.div style={{ scale: canvasScale }} className="absolute inset-0 z-0 flex items-center justify-center opacity-60 md:opacity-80">
          <div className="w-full h-full max-w-[650px] max-h-[650px]">
            <PortalCanvas />
          </div>
        </motion.div>

        {/* Hero Copy (Overlay) */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          <span className="font-outfit text-xs md:text-sm font-semibold tracking-[0.4em] text-accent uppercase">
            Interactive Spatial History Experience
          </span>
          <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-warm-ivory mt-2 select-none">
            CHRONOS
          </h1>
          <p className="font-outfit text-lg md:text-xl text-warm-ivory/70 max-w-2xl font-light leading-relaxed">
            Drag to orbit the hourglass. Scroll down to enter the stream of human history and explore critical turning points across space and time.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/timeline"
              className="px-8 py-4 bg-gradient-gold text-charcoal-dark font-outfit text-sm font-bold tracking-wider uppercase rounded-full shadow-lg hover:shadow-accent/25 hover:scale-[1.03] transition-all flex items-center gap-2 group"
            >
              Enter Time-Stream
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={scrollToTimeStream}
              className="px-8 py-4 border border-warm-ivory/20 hover:border-accent hover:text-accent font-outfit text-sm font-semibold tracking-wider uppercase rounded-full transition-all flex items-center justify-center gap-2 bg-charcoal-dark/30 backdrop-blur-sm"
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToTimeStream}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-warm-ivory/40 hover:text-accent transition-colors"
        >
          <span className="font-outfit text-xs tracking-widest uppercase">Scroll Down</span>
          <ArrowDown className="w-5 h-5 text-accent" />
        </motion.button>
      </section>

      {/* Intro section: Eras */}
      <section id="time-stream" className="relative py-24 md:py-36 px-4 md:px-8 border-t border-accent/15 bg-charcoal-dark/30">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center gap-4">
            <span className="font-outfit text-xs md:text-sm font-bold tracking-widest text-accent uppercase">
              The Spheres of Influence
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-warm-ivory">
              Traverse Major Civilizations
            </h2>
            <div className="w-12 h-1 bg-accent rounded-full my-2" />
            <p className="font-outfit text-base md:text-lg text-warm-ivory/60">
              Human development moves in cycles of growth, artistic rediscovery, and technological projection. Select an era below to jump directly into its history or open the complete chronological view.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eras.map((era, index) => {
              const IconComponent = era.icon;
              return (
                <motion.div
                  key={era.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className={`bg-charcoal border ${era.color} p-5 rounded-2xl flex flex-col items-start gap-3.5 shadow-2xl transition-all hover:-translate-y-2 group overflow-hidden`}
                >
                  {/* Era Image Banner */}
                  <div className="relative w-full h-40 rounded-xl overflow-hidden border border-accent/10 shrink-0">
                    <img
                      src={era.imageUrl}
                      alt={era.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/70 to-transparent" />
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-outfit text-[10px] text-warm-ivory/40 tracking-wider font-semibold uppercase">{era.period}</span>
                      <h3 className="font-playfair text-xl font-bold text-warm-ivory group-hover:text-accent transition-colors">
                        {era.name}
                      </h3>
                    </div>
                    <div className={`p-2.5 rounded-xl ${era.accentBg} ${era.accentText} border border-accent/5`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="font-outfit text-xs leading-relaxed text-warm-ivory/60">
                    {era.description}
                  </p>
                  <div className="mt-auto pt-4 w-full flex items-center justify-between border-t border-accent/5">
                    <Link
                      href={`/explorer/${era.id}`}
                      className="font-outfit text-xs font-semibold text-accent hover:text-accent-muted flex items-center gap-1 transition-colors group/link"
                    >
                      Explore Hub
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/timeline"
                      className="text-[10px] font-outfit text-warm-ivory/40 hover:text-warm-ivory transition-colors"
                    >
                      Timeline
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/timeline"
              className="inline-flex items-center gap-2 px-8 py-4 border border-accent text-accent font-outfit text-sm font-bold tracking-widest uppercase rounded-full hover:bg-accent hover:text-charcoal-dark transition-all"
            >
              Launch Interactive Chronology
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
