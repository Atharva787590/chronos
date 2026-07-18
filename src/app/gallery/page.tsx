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
  canvasType: "laurel" | "astrolabe" | "core" | "coin";
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
    description: "Hand-forged in solid Roman gold to commemorate the historic ascension of Augustus Caesar. Worn during prestigious triumph marches down the Via Sacra, it symbolized the emperor's absolute civil and military authority, linking him directly to Apollo's divine protection.",
    technicalSpecs: [
      "Material: 24k Gold-Copper Alloy",
      "Dimensions: 22.4cm Diameter",
      "Weight: 420.5 grams",
      "Symbolic Authority: Absolute Imperial",
      "Engraving: Detailed Laurel Leaves",
      "Restoration Status: Fully Intact",
      "Temporal Sector: Rome-A1",
      "Chronological Half-Life: Stable"
    ],
    rarity: "Imperial",
    colorTheme: "border-red-800/30 hover:border-red-700/60 shadow-red-950/10",
    accentText: "text-red-400",
    badgeBg: "bg-red-950/40 text-red-400 border-red-800/30"
  },
  {
    id: "coin",
    name: "The Maurya Silver Coin",
    era: "Ancient India",
    year: "260 BC",
    icon: Compass,
    canvasType: "coin",
    description: "An authentic punch-marked silver coin stamped during the peaceful reign of Emperor Ashoka the Great. Featuring intricate stamps of the sun, the six-armed wheel (Dharma Chakra), and sacred hills, it served as both imperial currency and a medium to propagate moral governance across the Silk Road trading posts.",
    technicalSpecs: [
      "Material: Punch-Marked Sterling Silver",
      "Dimensions: 3.2cm Diameter",
      "Weight: 3.4 grams",
      "Symbolic Stamps: Sun, Chakra, Hills",
      "Trade Circulation: Patliputra to Taxila",
      "Restoration Status: Cleaned and Stamped",
      "Temporal Sector: India-B3",
      "Chronological Half-Life: Resonant"
    ],
    rarity: "Imperial",
    colorTheme: "border-amber-700/30 hover:border-amber-600/60 shadow-amber-950/15",
    accentText: "text-amber-500",
    badgeBg: "bg-amber-950/40 text-amber-500 border-amber-800/30"
  },
  {
    id: "astrolabe",
    name: "The Galileo Astrolabe",
    era: "The Renaissance",
    year: "1598 AD",
    icon: Compass,
    canvasType: "astrolabe",
    description: "An incredibly complex analog astronomical calculator designed and hand-calibrated in Florence. Extensively engraved with stellar coordinates, zodiac tracks, and geographic latitudes, it allowed astronomers to compute the positions of stars, time of day, and navigate open oceans with empirical precision.",
    technicalSpecs: [
      "Material: Gilded Brass & Cast Bronze",
      "Dimensions: 18.2cm Diameter",
      "Weight: 890.2 grams",
      "Calculative Precision: ±0.25 degrees",
      "Constellation Markings: 48 Ptolemaic stars",
      "Restoration Status: Retained Original Alidade",
      "Temporal Sector: Florence-R5",
      "Chronological Half-Life: Pristine"
    ],
    rarity: "Scientific",
    colorTheme: "border-accent/30 hover:border-accent/60 shadow-accent/5",
    accentText: "text-accent",
    badgeBg: "bg-accent/10 text-accent border-accent/20"
  },
  {
    id: "core",
    name: "The Golden Ankh of Ra",
    era: "Ancient Egypt",
    year: "1274 BC",
    icon: Landmark,
    canvasType: "core",
    description: "A solid gold ritual scepter shaped as an Ankh, symbolic of eternal life, excavated from the tomb of Pharaoh Ramses II. Detailed with lapis lazuli and carnelian inlays, it represents the high aesthetic and spiritual mastery of Egypt's New Kingdom.",
    technicalSpecs: [
      "Material: Solid Gold & Lapis Lazuli Inlays",
      "Dimensions: 28cm height, 14cm width",
      "Weight: 650 grams",
      "Symbolic Meaning: Key of Life & Eternity",
      "Dynasty: 19th Dynasty of Egypt",
      "Restoration Status: Fully Intact",
      "Temporal Sector: Egypt-E1",
      "Chronological Half-Life: Stable"
    ],
    rarity: "Imperial",
    colorTheme: "border-yellow-700/30 hover:border-yellow-600/60 shadow-yellow-950/15",
    accentText: "text-amber-500",
    badgeBg: "bg-amber-950/40 text-amber-500 border-amber-800/30"
  },
  {
    id: "harappa-bull",
    name: "The Harappan Terracotta Bull",
    era: "Ancient India",
    year: "2500 BC",
    icon: Compass,
    canvasType: "laurel",
    description: "A finely sculpted terracotta bull figurine unearthed from the lower streets of Mohenjo-daro. Depicting a hump-backed Zebu bull with powerful shoulder musculature, it illustrates the advanced artistic refinement and deep pastoral/agrarian cultural roots of the Indus Valley Civilization.",
    technicalSpecs: [
      "Material: Baked Terracotta Clay",
      "Dimensions: 14.5cm length, 9cm height",
      "Weight: 310 grams",
      "Artistry Model: Hand-Modeled Zebu Bull",
      "Archaeological Layer: Mature Harappan (Phase II)",
      "Restoration Status: Intact horn joints repaired",
      "Temporal Sector: Indus-H1",
      "Chronological Half-Life: Stable"
    ],
    rarity: "Imperial",
    colorTheme: "border-amber-700/30 hover:border-amber-600/60 shadow-amber-950/15",
    accentText: "text-amber-500",
    badgeBg: "bg-amber-950/40 text-amber-500 border-amber-800/30"
  },
  {
    id: "nalanda-seal",
    name: "The Nalanda Monastic Seal",
    era: "Ancient India",
    year: "630 AD",
    icon: Compass,
    canvasType: "coin",
    description: "An official clay seal of the Nalanda Mahavihara, bearing the inscription of the university name in post-Gupta Brahmi script and the insignia of the Dharma Chakra flanked by two deer. Used to certify academic credentials and official monastic communications across Asia.",
    technicalSpecs: [
      "Material: Sun-Dried River Silt Clay",
      "Dimensions: 5.6cm Diameter",
      "Weight: 45.2 grams",
      "Insignia: Dharma Chakra & Deer Symbol",
      "Script: Brahmi Characters",
      "Restoration Status: Kiln-hardened for preservation",
      "Temporal Sector: India-N4",
      "Chronological Half-Life: Resonant"
    ],
    rarity: "Imperial",
    colorTheme: "border-amber-700/30 hover:border-amber-600/60 shadow-amber-950/15",
    accentText: "text-amber-500",
    badgeBg: "bg-amber-950/40 text-amber-500 border-amber-800/30"
  },
  {
    id: "travertine-ring",
    name: "The Travertine Arch Fragment",
    era: "Ancient Rome",
    year: "80 AD",
    icon: Landmark,
    canvasType: "laurel",
    description: "A sculpted segment of travertine limestone salvaged from the outer ring of the Roman Colosseum. Bears marks of iron clamps and chisel scoring from Flavian stonemasons, representing the immense architectural scale and public theater structures of the Roman empire.",
    technicalSpecs: [
      "Material: Travertine Limestone",
      "Dimensions: 34cm width, 25cm height",
      "Weight: 8.2 kilograms",
      "Structural Component: Arch radial stone",
      "Quarry Origin: Tivoli Basins",
      "Restoration Status: Sandblasted and stabilized",
      "Temporal Sector: Rome-C3",
      "Chronological Half-Life: Stable"
    ],
    rarity: "Imperial",
    colorTheme: "border-red-800/30 hover:border-red-700/60 shadow-red-950/10",
    accentText: "text-red-400",
    badgeBg: "bg-red-950/40 text-red-400 border-red-800/30"
  },
  {
    id: "gutenberg-type",
    name: "The Gutenberg Metal Type Block",
    era: "The Renaissance",
    year: "1440 AD",
    icon: Compass,
    canvasType: "core",
    description: "An original lead-tin-antimony alloy type block cast during Gutenberg's first printing of the Bible in Mainz. Features the reverse relief of the Gothic character 'G', representing the dawn of mass literacy and movable type printing in Europe.",
    technicalSpecs: [
      "Material: Lead-Tin-Antimony Alloy",
      "Dimensions: 2.1cm height, 0.8cm width",
      "Weight: 14.8 grams",
      "Character Relief: Gothic Capital 'G'",
      "Casting Technique: Hand-held mold punch",
      "Restoration Status: Fully readable letterface",
      "Temporal Sector: Mainz-G1",
      "Chronological Half-Life: Stable"
    ],
    rarity: "Scientific",
    colorTheme: "border-accent/30 hover:border-accent/60 shadow-accent/5",
    accentText: "text-accent",
    badgeBg: "bg-accent/10 text-accent border-accent/20"
  },
  {
    id: "chola-bronze",
    name: "The Chola Nataraja Bronze",
    era: "Ancient India",
    year: "1010 AD",
    icon: Compass,
    canvasType: "astrolabe",
    description: "A masterwork bronze sculpture of Lord Shiva in his cosmic dance posture (Nataraja), cast using the lost-wax method during the peak of the Chola Dynasty in Tanjore. Represents the intersection of physical metallurgy and metaphysical devotion.",
    technicalSpecs: [
      "Material: Lost-Wax Cast Bronze",
      "Dimensions: 45cm height, 38cm width",
      "Weight: 12.4 kilograms",
      "Casting Method: Madhuchishta Vidhana",
      "Patina Finish: Natural green copper carbonate",
      "Restoration Status: Pristine ring of fire",
      "Temporal Sector: Tanjore-C2",
      "Chronological Half-Life: Stable"
    ],
    rarity: "Imperial",
    colorTheme: "border-amber-700/30 hover:border-amber-600/60 shadow-amber-950/15",
    accentText: "text-amber-500",
    badgeBg: "bg-amber-950/40 text-amber-500 border-amber-800/30"
  },
  {
    id: "dante-inkwell",
    name: "The Florentine Bronze Inkwell",
    era: "The Renaissance",
    year: "1308 AD",
    icon: Compass,
    canvasType: "core",
    description: "An ornate bronze inkwell used by Florentine writers during the late Middle Ages and early Renaissance. Engraved with classical figures and gargoyles, it served as the literal basin from which works of humanism and early literature were penned.",
    technicalSpecs: [
      "Material: Cast Bronze & Brass Liner",
      "Dimensions: 14cm width, 10cm height",
      "Weight: 620 grams",
      "Engraving motifs: Classic laurel wreaths",
      "Lid Seal: Threaded screw fit",
      "Restoration Status: Preserved dry ink residue",
      "Temporal Sector: Florence-D1",
      "Chronological Half-Life: Stable"
    ],
    rarity: "Scientific",
    colorTheme: "border-accent/30 hover:border-accent/60 shadow-accent/5",
    accentText: "text-accent",
    badgeBg: "bg-accent/10 text-accent border-accent/20"
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
                transition={{ delay: index * 0.1, duration: 0.6 }}
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
