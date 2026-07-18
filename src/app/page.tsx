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
      color: "border-red-800/40 hover:border-red-700/60 shadow-red-950/20",
      accentBg: "bg-red-800/10",
      accentText: "text-red-400",
    },
    {
      id: "renaissance",
      name: "The Renaissance",
      period: "14th - 17th Century",
      icon: Compass,
      description: "Witness the resurgence of classical art, humanism, and scientific curiosity under the Tuscan sun.",
      color: "border-accent/40 hover:border-accent/60 shadow-accent/10",
      accentBg: "bg-accent/10",
      accentText: "text-accent",
    },
    {
      id: "cyberpunk",
      name: "Cyberpunk Future",
      period: "2099 & Beyond",
      icon: Cpu,
      description: "Fast-forward into neon shadowscapes, cybernetic augmentation, and artificial sentience networks.",
      color: "border-cyan-800/40 hover:border-cyan-700/60 shadow-cyan-950/20",
      accentBg: "bg-cyan-800/10",
      accentText: "text-cyan-400",
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eras.map((era, index) => {
              const IconComponent = era.icon;
              return (
                <motion.div
                  key={era.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className={`bg-charcoal border ${era.color} p-8 rounded-2xl flex flex-col items-start gap-5 shadow-2xl transition-all hover:-translate-y-2 group`}
                >
                  <div className={`p-4 rounded-xl ${era.accentBg} ${era.accentText}`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-outfit text-xs text-warm-ivory/40 tracking-wider font-semibold">{era.period}</span>
                    <h3 className="font-playfair text-2xl font-bold text-warm-ivory group-hover:text-accent transition-colors">
                      {era.name}
                    </h3>
                  </div>
                  <p className="font-outfit text-sm leading-relaxed text-warm-ivory/60">
                    {era.description}
                  </p>
                  <div className="mt-auto pt-6 w-full flex items-center justify-between border-t border-accent/5">
                    <Link
                      href={`/explorer/${era.id}`}
                      className="font-outfit text-sm font-semibold text-accent hover:text-accent-muted flex items-center gap-1.5 transition-colors group/link"
                    >
                      Explore Hub
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/timeline"
                      className="text-xs font-outfit text-warm-ivory/40 hover:text-warm-ivory transition-colors"
                    >
                      Timeline view
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
