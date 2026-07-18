"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Compass, Cpu, Info, Maximize2, ShieldAlert, Sparkles, X } from "lucide-react";

// Dynamically load the WebGL ArtifactCanvas component with SSR disabled
const ArtifactCanvas = dynamic(() => import("@/components/ArtifactCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] flex items-center justify-center bg-charcoal-dark/40 rounded-2xl border border-accent/5">
      <div className="animate-pulse flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="font-outfit text-xs text-accent/60 tracking-wider">Loading Relic Geometry...</span>
      </div>
    </div>
  ),
});

interface RelicItem {
  id: string;
  name: string;
  era: string;
  year: string;
  icon: React.ComponentType<{ className?: string }>;
  canvasType: "laurel" | "astrolabe" | "core";
  description: string;
  technicalSpecs: string[];
  rarity: "Imperial" | "Scientific" | "Encrypted";
  colorTheme: string;
  accentText: string;
  badgeBg: string;
}

const relics: RelicItem[] = [
  {
    id: "laurel",
    name: "The Augustus Laurel",
    era: "Ancient Rome",
    year: "27 BC",
    icon: Landmark,
    canvasType: "laurel",
    description: "Hand-forged in solid Roman gold to commemorate the ascension of Augustus Caesar. Worn during triumph marches, it symbolized the emperor's absolute authority and connection to Apollo.",
    technicalSpecs: [
      "Material: 24k Gold Alloy",
      "Dimensions: 22cm Diameter",
      "Weight: 420 grams",
      "Symbolic Authority: High"
    ],
    rarity: "Imperial",
    colorTheme: "border-red-800/30 hover:border-red-700/60 shadow-red-950/10",
    accentText: "text-red-400",
    badgeBg: "bg-red-950/40 text-red-400 border-red-800/30"
  },
  {
    id: "astrolabe",
    name: "The Galileo Astrolabe",
    era: "The Renaissance",
    year: "1598 AD",
    icon: Compass,
    canvasType: "astrolabe",
    description: "An intricate metal analog calculator used to solve problems relating to time and the position of the stars in the sky. Extensively marked with stellar constellations and geographic latitudes.",
    technicalSpecs: [
      "Material: Gilded Brass & Bronze",
      "Dimensions: 18cm Diameter",
      "Weight: 890 grams",
      "Calculative Precision: ±0.5 degrees"
    ],
    rarity: "Scientific",
    colorTheme: "border-accent/30 hover:border-accent/60 shadow-accent/5",
    accentText: "text-accent",
    badgeBg: "bg-accent/10 text-accent border-accent/20"
  },
  {
    id: "core",
    name: "The Chrono-Core",
    era: "Cyberpunk Future",
    year: "2099 AD",
    icon: Cpu,
    canvasType: "core",
    description: "A decrypted memory core extracted from the central servers of the A.E.O.N. network enclaves. Contains encrypted subgrid blockchains and synthetic neurological memories.",
    technicalSpecs: [
      "Material: Carbon-Silicon Hybrid",
      "Dimensions: 12cm Dodecahedron",
      "Storage Capacity: 8.4 Yottabytes",
      "Encryption: Quantum-Diffused"
    ],
    rarity: "Encrypted",
    colorTheme: "border-cyan-800/30 hover:border-cyan-700/60 shadow-cyan-950/10",
    accentText: "text-cyan-400",
    badgeBg: "bg-cyan-950/40 text-cyan-400 border-cyan-800/30"
  }
];

export default function GalleryPage() {
  const [selectedRelic, setSelectedRelic] = useState<RelicItem | null>(null);

  return (
    <div className="min-h-screen bg-charcoal pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center gap-4">
          <span className="font-outfit text-xs md:text-sm font-bold tracking-[0.3em] text-accent uppercase">
            3D Spatial Gallery
          </span>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-warm-ivory">
            The Relic Museum
          </h1>
          <div className="w-12 h-0.5 bg-accent rounded-full my-1" />
          <p className="font-outfit text-base md:text-lg text-warm-ivory/60">
            Interact directly with objects retrieved from historical sectors. Left-click and drag to rotate the artifacts in three dimensions. Hover to overclock their rotation.
          </p>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relics.map((relic, index) => {
            const RelicIcon = relic.icon;
            return (
              <motion.div
                key={relic.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`bg-charcoal-dark/40 border ${relic.colorTheme} rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative group overflow-hidden`}
              >
                {/* 3D Canvas Box */}
                <div className="relative w-full h-[300px] mb-6 rounded-2xl bg-charcoal/30 overflow-hidden border border-accent/5">
                  <ArtifactCanvas type={relic.canvasType} />
                  
                  {/* Badge */}
                  <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-outfit font-bold uppercase tracking-wider rounded-full border ${relic.badgeBg}`}>
                    {relic.rarity}
                  </span>

                  {/* Drag notice overlay */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[10px] font-outfit text-warm-ivory/40 bg-charcoal-dark/80 px-2.5 py-1 rounded-full border border-accent/5 backdrop-blur-sm pointer-events-none">
                    <Maximize2 className="w-3 h-3 text-accent" />
                    <span>Drag Orbit Enabled</span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col">
                      <span className={`font-outfit text-xs font-bold uppercase tracking-wider ${relic.accentText}`}>
                        {relic.era} ({relic.year})
                      </span>
                      <h3 className="font-playfair text-2xl font-bold text-warm-ivory mt-0.5">
                        {relic.name}
                      </h3>
                    </div>
                    <div className={`p-2.5 rounded-xl bg-charcoal border border-accent/10 ${relic.accentText}`}>
                      <RelicIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="font-outfit text-sm text-warm-ivory/60 leading-relaxed min-h-[72px]">
                    {relic.description}
                  </p>

                  <div className="pt-4 border-t border-accent/5 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedRelic(relic)}
                      className="w-full py-3 bg-charcoal border border-accent/10 hover:border-accent hover:text-accent rounded-xl text-xs font-outfit font-bold uppercase tracking-wider text-warm-ivory/80 flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <Info className="w-4 h-4" />
                      Inspect Technical Data
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Technical Data Modal */}
        <AnimatePresence>
          {selectedRelic && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className={`bg-charcoal border ${selectedRelic.colorTheme} w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl p-8 md:p-10 relative`}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedRelic(null)}
                  className="absolute top-6 right-6 text-warm-ivory/60 hover:text-accent p-2 bg-charcoal-dark border border-accent/10 rounded-full transition-all hover:rotate-90"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col gap-6">
                  {/* Title Header */}
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-xs font-outfit font-bold uppercase tracking-wider rounded-full border ${selectedRelic.badgeBg}`}>
                      {selectedRelic.rarity} Relic
                    </span>
                    <span className="font-outfit text-xs text-warm-ivory/40">Sector ID: {selectedRelic.id.toUpperCase()}-RL</span>
                  </div>

                  <div>
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-warm-ivory">
                      {selectedRelic.name}
                    </h2>
                    <p className={`font-outfit text-sm font-semibold mt-1 ${selectedRelic.accentText}`}>
                      Sector Origin: {selectedRelic.era} ({selectedRelic.year})
                    </p>
                  </div>

                  <p className="font-outfit text-base text-warm-ivory/70 leading-relaxed border-t border-accent/10 pt-4">
                    {selectedRelic.description}
                  </p>

                  {/* Technical Attributes */}
                  <div className="bg-charcoal-dark border border-accent/5 rounded-2xl p-6">
                    <h4 className="font-playfair text-lg font-bold text-warm-ivory mb-4 flex items-center gap-2">
                      <Sparkles className={`w-5 h-5 ${selectedRelic.accentText}`} />
                      Structural & Temporal Telemetry
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedRelic.technicalSpecs.map((spec, idx) => {
                        const [label, val] = spec.split(": ");
                        return (
                          <div key={idx} className="flex flex-col gap-0.5 border-b border-accent/5 pb-2">
                            <span className="font-outfit text-xs text-warm-ivory/40 uppercase tracking-widest">{label}</span>
                            <span className="font-outfit text-sm text-warm-ivory/95 font-medium">{val}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Warning Footer */}
                  <div className="flex items-center gap-3 bg-accent/5 border border-accent/15 px-4 py-3.5 rounded-xl text-xs font-outfit text-warm-ivory/70">
                    <ShieldAlert className="w-5 h-5 text-accent shrink-0" />
                    <span>
                      Temporal synchronization active. Relic status matches carbon half-life metrics. Handling requires certified temporal isolation gloves.
                    </span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
