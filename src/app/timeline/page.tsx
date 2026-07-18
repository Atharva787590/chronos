"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Landmark, Compass, Cpu, Clock, MousePointer } from "lucide-react";

interface EraItem {
  id: string;
  name: string;
  date: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  summary: string;
  details: string[];
  themeColor: string;
  accentText: string;
  borderTheme: string;
}

const timelineData: EraItem[] = [
  {
    id: "rome",
    name: "Ancient Rome",
    date: "27 BC - 476 AD",
    icon: Landmark,
    title: "Pax Romana & Marble Engineering",
    summary: "The apex of classical architecture, law, and roads that bound the Western world together for centuries.",
    details: [
      "The Pantheon & Concrete Architecture",
      "Gladiatorial Arenas & Bread and Circuses",
      "Twelve Tables & Legal Frameworks",
      "Pax Romana: Golden Age of Expansion"
    ],
    themeColor: "bg-red-950/20",
    accentText: "text-red-400",
    borderTheme: "border-red-800/30"
  },
  {
    id: "renaissance",
    name: "The Renaissance",
    date: "14th - 17th Century",
    icon: Compass,
    title: "Rebirth of Reason & Golden Ratios",
    summary: "A cultural rebirth sparking humanism, scientific investigation, and artistic brilliance under the Tuscan sky.",
    details: [
      "Leonardo da Vinci's Mechanical Inventions",
      "Gutenberg Press & Intellectual Expansion",
      "Perspective in Painting & Sculptures",
      "Heliocentrism & Copernican Revolution"
    ],
    themeColor: "bg-amber-950/20",
    accentText: "text-accent",
    borderTheme: "border-accent/30"
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Future",
    date: "2099 & Beyond",
    icon: Cpu,
    title: "Neon Hegemony & Synthetic Minds",
    summary: "A projection of human civilization into cybernetic enhancement, megacorporations, and artificial consciousness.",
    details: [
      "Neural Interfaces & Memory Portability",
      "Artificial General Intelligence (A.E.O.N.)",
      "Transhumanism & Cybernetic Prosthetics",
      "The Neon Underbelly & Subgrid Resistance"
    ],
    themeColor: "bg-cyan-950/20",
    accentText: "text-cyan-400",
    borderTheme: "border-cyan-800/30"
  }
];

export default function TimelinePage() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the entire timeline wrapper
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  // Map scroll progress to horizontal translation (x coordinate)
  // We have 4 screens total (1 Intro + 3 Eras), so we translate from 0% to -75%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={targetRef} className="relative h-[400vh] bg-charcoal">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex flex-col justify-between py-12">
        
        {/* Header Indicator */}
        <div className="px-6 md:px-12 flex justify-between items-center z-10">
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-warm-ivory">The Chronology</h1>
            <p className="font-outfit text-sm text-warm-ivory/50 mt-1">Scroll down to traverse across dimensions of time</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-outfit text-accent border border-accent/20 px-4 py-2 rounded-full bg-charcoal-dark/50">
            <MousePointer className="w-3.5 h-3.5 animate-bounce" />
            <span>Scroll Wheel Coordinates History</span>
          </div>
        </div>

        {/* Timeline Horizontal Rail */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 -translate-y-1/2 pointer-events-none" />

        {/* Animated Horizontal Container */}
        <motion.div style={{ x }} className="flex h-[60vh] md:h-[65vh] w-[400vw] items-center px-12 md:px-24">
          
          {/* Card 0: Intro */}
          <div className="w-[100vw] h-full flex flex-col justify-center items-start pr-12 md:pr-36">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl flex flex-col gap-6"
            >
              <div className="p-3 bg-accent/10 border border-accent/30 rounded-xl text-accent w-fit">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className="font-playfair text-5xl md:text-7xl font-black text-warm-ivory leading-none">
                Traverse <br />
                <span className="text-gradient-gold">Space & Time</span>
              </h2>
              <p className="font-outfit text-lg text-warm-ivory/70 leading-relaxed">
                Welcome to the Chronology. As you scroll downwards, the timeline will sweep horizontally from classical marble antiquities to neon futures. Watch the transformation of design, culture, and thought.
              </p>
              <div className="flex items-center gap-3 text-sm text-accent font-outfit">
                <span>Scroll down or swipe to travel</span>
                <span className="animate-ping w-2.5 h-2.5 rounded-full bg-accent" />
              </div>
            </motion.div>
          </div>

          {/* Cards 1-3: The Eras */}
          {timelineData.map((era) => {
            const Icon = era.icon;
            return (
              <div key={era.id} className="w-[100vw] h-full flex items-center pr-12 md:pr-36">
                <div className={`w-full max-w-4xl h-full border ${era.borderTheme} ${era.themeColor} rounded-3xl p-8 md:p-12 backdrop-blur-md flex flex-col justify-between shadow-2xl relative group overflow-hidden`}>
                  
                  {/* Decorative background overlay */}
                  <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <Icon className="w-64 h-64 text-warm-ivory" />
                  </div>

                  {/* Header */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <span className={`font-outfit text-xs font-semibold uppercase tracking-widest ${era.accentText}`}>
                        {era.date}
                      </span>
                      <h3 className="font-playfair text-3xl md:text-5xl font-bold text-warm-ivory">
                        {era.name}
                      </h3>
                    </div>
                    <div className={`p-4 rounded-2xl ${era.accentText} bg-charcoal border ${era.borderTheme}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6 md:my-0">
                    <div className="flex flex-col justify-center gap-4">
                      <h4 className="font-playfair text-xl md:text-2xl font-semibold text-warm-ivory">
                        {era.title}
                      </h4>
                      <p className="font-outfit text-sm text-warm-ivory/60 leading-relaxed">
                        {era.summary}
                      </p>
                    </div>

                    {/* Milestones list */}
                    <div className="flex flex-col justify-center gap-2 border-l border-accent/10 pl-6">
                      <span className="font-outfit text-xs text-warm-ivory/40 uppercase tracking-widest mb-1">Eras Keynotes</span>
                      {era.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2.5">
                          <span className={`w-1.5 h-1.5 rounded-full bg-accent`} />
                          <span className="font-outfit text-sm text-warm-ivory/80">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="flex justify-between items-center pt-6 border-t border-accent/10 mt-auto">
                    <span className="font-outfit text-xs text-warm-ivory/30">Chronos Sector ID: {era.id.toUpperCase()}-X</span>
                    <Link
                      href={`/explorer/${era.id}`}
                      className="px-6 py-3 bg-gradient-gold text-charcoal-dark font-outfit text-xs font-bold tracking-wider uppercase rounded-full shadow hover:scale-105 transition-all flex items-center gap-2 group/btn"
                    >
                      Enter Explorer
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}

        </motion.div>

        {/* Scrubber (Bottom progress bar) */}
        <div className="px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 font-outfit text-xs text-warm-ivory/40">
            <span>Ancient Antiquity</span>
            
            {/* The progress rail */}
            <div className="flex-grow h-1 bg-charcoal border border-accent/10 rounded-full overflow-hidden relative">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="absolute inset-0 bg-accent origin-left"
              />
            </div>
            
            <span>Technological Zenith</span>
          </div>
        </div>

      </div>
    </div>
  );
}
