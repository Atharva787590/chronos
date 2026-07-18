"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Landmark, Compass, Cpu, Clock, MousePointer, Calendar } from "lucide-react";

interface MilestoneItem {
  id: string;
  era: string;
  eraName: string;
  year: string;
  title: string;
  summary: string;
  imageUrl: string;
  borderTheme: string;
  accentText: string;
  themeBg: string;
}

const timeStreamData: MilestoneItem[] = [
  // Ancient Rome (8 Milestones)
  {
    id: "rome-1",
    era: "rome",
    eraName: "Ancient Rome",
    year: "753 BC",
    title: "Steampunk Foundation of Rome",
    summary: "Romulus and Remus construct early brass clockwork defense relays on the Palatine Hill, initiating Rome's legendary steam-powered defense grid to guard the nascent borders.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "rome-2",
    era: "rome",
    eraName: "Ancient Rome",
    year: "509 BC",
    title: "Pneumatic Senate Assembly",
    summary: "Tarquin the Proud is deposed, and the Senate instates a complex pneumatic message tube system across the Forum, allowing consuls to instantly cast brass-ballot votes.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "rome-3",
    era: "rome",
    eraName: "Ancient Rome",
    year: "27 BC",
    title: "Holographic Imperial Decree",
    summary: "Augustus Caesar projects the first giant golden holographic state-directive from the Senate roof, initiating the Pax Romana security protocol.",
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "rome-4",
    era: "rome",
    eraName: "Ancient Rome",
    year: "79 AD",
    title: "Thermal Energy Overload",
    summary: "Mount Vesuvius undergoes a catastrophic thermal energy overload, burying Pompeii in volcanic dust and freezing its mechanical clockwork streets in time.",
    imageUrl: "https://images.unsplash.com/photo-1529260830199-44580453794b?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "rome-5",
    era: "rome",
    eraName: "Ancient Rome",
    year: "80 AD",
    title: "Holographic Colosseum Battles",
    summary: "The Colosseum is fitted with dynamic light-emitting water projection plates, hosting full-scale glowing naval battle simulations and gladiator defense testing.",
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "rome-6",
    era: "rome",
    eraName: "Ancient Rome",
    year: "122 AD",
    title: "Hadrian's Chrono-Fortress",
    summary: "Construction begins on a 73-mile defensive wall in Britannia, fitted with signal towers and steam-powered signal horns to control the imperial frontier.",
    imageUrl: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "rome-7",
    era: "rome",
    eraName: "Ancient Rome",
    year: "313 AD",
    title: "Constantine's Solar Decree",
    summary: "Constantine legalizes Christianity, transmitting the message across the empire via reflective brass solar mirrors (heliographs) for synchronized reception.",
    imageUrl: "https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "rome-8",
    era: "rome",
    eraName: "Ancient Rome",
    year: "476 AD",
    title: "De-Synchronization of Rome",
    summary: "The central gear-clock of Ravenna is dismantled by Odoacer, causing the Western Empire to de-synchronize from the imperial network.",
    imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  // Ancient India (12 Milestones)
  {
    id: "india-1",
    era: "india",
    eraName: "Ancient India",
    year: "2500 BC",
    title: "Pneumatic Sanitation Grid",
    summary: "Mohenjo-daro installs pressurized copper pneumatic water filtration tubes, creating the ancient world's finest municipal sanitation grid.",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "india-2",
    era: "india",
    eraName: "Ancient India",
    year: "1500 BC",
    title: "Phonetic Vocal Calculators",
    summary: "Sanskrit scholars program oral chants with mathematical syntax, serving as acoustic vocal data stores to preserve cosmological information.",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "india-3",
    era: "india",
    eraName: "Ancient India",
    year: "599 BC",
    title: "Ahimsa Harmonic Protocol",
    summary: "Mahavira codifies Jain philosophy, establishing the Ahimsa non-harming protocol to maintain biological harmony across all living organisms.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "india-4",
    era: "india",
    eraName: "Ancient India",
    year: "563 BC",
    title: "Mind-State Synchronization",
    summary: "Gautama Buddha achieves full neural synchronization under the Bodhi Tree, mapping the Four Noble Truths to override human emotional suffering.",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "india-5",
    era: "india",
    eraName: "Ancient India",
    year: "322 BC",
    title: "Kautilya's Spy Network",
    summary: "Chandragupta Maurya and Chanakya establish a highly organized spy intelligence network using coded letters and secret optical signaling.",
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "india-6",
    era: "india",
    eraName: "Ancient India",
    year: "261 BC",
    title: "Dhamma Rock Transmitters",
    summary: "Ashoka carves his moral code onto rock pillars across India, turning pillars into permanent communication hubs for ethical instruction.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "india-7",
    era: "india",
    eraName: "Ancient India",
    year: "78 AD",
    title: "Silk Road Trading Hub",
    summary: "Kanishka unifies the transcontinental Silk Road, establishing copper currency standards and trade control outposts.",
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "india-8",
    era: "india",
    eraName: "Ancient India",
    year: "320 AD",
    title: "Sanskrit Golden Codex",
    summary: "Chandragupta I initiates the golden age of metallurgy, crafting the rust-free Delhi Iron Pillar as a metallurgical wonder.",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "india-9",
    era: "india",
    eraName: "Ancient India",
    year: "499 AD",
    title: "Zero-Origin Calculation Gear",
    summary: "Aryabhata devises the gears-of-zero math system, proving the Earth's rotation and calculating planetary orbits with high precision.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "india-10",
    era: "india",
    eraName: "Ancient India",
    year: "630 AD",
    title: "Nalanda Central Library",
    summary: "Nalanda reaches peak capacity, holding thousands of scrolls containing ancient treatises on logic, medicine, and mechanical calculations.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "india-11",
    era: "india",
    eraName: "Ancient India",
    year: "757 AD",
    title: "Monolithic Basalt Excavation",
    summary: "Engineers carve the massive Kailash temple from the top-down out of a single basalt mountain, removing 200,000 tons of rock.",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "india-12",
    era: "india",
    eraName: "Ancient India",
    year: "1010 AD",
    title: "Granite Interlocking System",
    summary: "Chola builders lift an 81-ton monolithic dome to the top of a 216-foot tower, using mortar-free interlocking granite blocks.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  // The Renaissance (8 Milestones)
  {
    id: "ren-1",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1308 AD",
    title: "Vernacular Thought Codex",
    summary: "Dante codes the Divine Comedy in vernacular Italian, bypassing traditional Latin to democratize literature and human morality.",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "ren-2",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1440 AD",
    title: "Steam-Press Movable Type",
    summary: "Gutenberg builds a high-pressure mechanical type-press, accelerating book production and democratizing knowledge distribution.",
    imageUrl: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "ren-3",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1492 AD",
    title: "Steam Flight Sketches",
    summary: "Leonardo da Vinci drafts mechanical blueprints for human flight, including gear systems for the ornithopter and aerial screw.",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "ren-4",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1504 AD",
    title: "Anatomical Marble Precision",
    summary: "Michelangelo chisels David with near-perfect biological accuracy, demonstrating the renaissance mastery of human geometry.",
    imageUrl: "https://images.unsplash.com/photo-1614701167693-85ae30ff3c4d?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "ren-5",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1508 AD",
    title: "Ceiling Fresco Matrix",
    summary: "Michelangelo paints the Sistine Chapel ceiling, creating a massive visual grid of Genesis using complex geometric perspectives.",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "ren-6",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1543 AD",
    title: "Heliocentric Orbit Model",
    summary: "Copernicus publishes his mathematical calculations placing the Sun at the center of the solar system, replacing geocentrism.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "ren-7",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1597 AD",
    title: "Acoustic Globe Theatre",
    summary: "The Globe Theatre is constructed with wooden acoustic rings, maximizing sound projection for Shakespeare's deep human dramas.",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "ren-8",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1610 AD",
    title: "Optic Focal Lens Observer",
    summary: "Galileo develops a double-lens optic spyglass, recording Jupiter's moons and providing empirical proof of heliocentrism.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  // Ancient Egypt (6 Milestones)
  {
    id: "egypt-1",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "3100 BC",
    title: "Dynastic Border Merger",
    summary: "King Narmer unifies Upper and Lower Egypt under a single administrative grid, symbolized by the double-crown crown protocol.",
    imageUrl: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "egypt-2",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "2560 BC",
    title: "Solar Pyramid Accumulator",
    summary: "Pharaoh Khufu commissions the Great Pyramid of Giza, clad in white limestone to act as a colossal solar-focusing heat energy accumulator.",
    imageUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "egypt-3",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "1478 BC",
    title: "Punt Expedition Fleet",
    summary: "Hatshepsut launches a massive fleet of deep-sea cargo ships to Punt, returning with gold, ivory, and live incense trees.",
    imageUrl: "https://images.unsplash.com/photo-1600577916048-804c9191e36c?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "egypt-4",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "1332 BC",
    title: "Thebes Coordinate Reset",
    summary: "Tutankhamun resets the imperial capital back to Thebes, restoring traditional temple priesthood operations and structural grids.",
    imageUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "egypt-5",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "1274 BC",
    title: "The Kadesh Chronometer",
    summary: "Ramses II fights the Hittites in a massive chariot battle, leading to the world's first recorded international peace treaty, sealed inside a mechanical brass coordinate-box.",
    imageUrl: "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  },
  {
    id: "egypt-6",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "30 BC",
    title: "Imperial Network Annexation",
    summary: "Cleopatra VII's reign concludes, and Egypt's agricultural breadbasket grid is annexed as a central province of the Roman Empire.",
    imageUrl: "https://images.unsplash.com/photo-1600577916048-804c9191e36c?q=80&w=800",
    borderTheme: "border-accent/35",
    accentText: "text-accent-muted",
    themeBg: "bg-accent/5"
  }
];

export default function TimelinePage() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the entire timeline wrapper
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  // We have 35 screens total (1 Intro + 34 Milestones), so we translate from 0% to -97.14%
  const totalScreens = timeStreamData.length + 1; // 35 screens
  const translatePercent = -((totalScreens - 1) / totalScreens) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${translatePercent}%`]);

  return (
    <div ref={targetRef} className="relative h-[1800vh] bg-charcoal">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex flex-col justify-between py-12">
        
        {/* Header Indicator */}
        <div className="px-6 md:px-12 flex justify-between items-center z-10">
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-warm-ivory animate-fade-in">The Time Stream</h1>
            <p className="font-outfit text-sm text-warm-ivory/50 mt-1">Scroll down to travel horizontally through key historical coordinates</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-outfit text-accent border border-accent/20 px-4 py-2 rounded-full bg-charcoal-dark/50">
            <MousePointer className="w-3.5 h-3.5 animate-bounce" />
            <span>Scroll Wheel Traverses Timeline</span>
          </div>
        </div>

        {/* Timeline Horizontal Rail */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 -translate-y-1/2 pointer-events-none" />

        {/* Animated Horizontal Container */}
        <motion.div style={{ x }} className={`flex h-[62vh] md:h-[68vh] w-[3500vw] items-center px-12 md:px-24`}>
          
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
                Welcome to the continuous Time Stream. As you scroll downwards, the timeline will sweep horizontally through 34 critical milestones across ancient Rome, classical India, the Renaissance, and Ancient Egypt.
              </p>
              <div className="flex items-center gap-3 text-sm text-accent font-outfit">
                <span>Scroll down or swipe to travel</span>
                <span className="animate-ping w-2.5 h-2.5 rounded-full bg-accent" />
              </div>
            </motion.div>
          </div>

          {/* Cards 1-34: The Milestones */}
          {timeStreamData.map((milestone) => {
            return (
              <div key={milestone.id} className="w-[100vw] h-full flex items-center pr-12 md:pr-36">
                
                {/* Wrapped the overall square card with a Link so the entire place is clickable */}
                <Link
                  href={`/explorer/${milestone.era}`}
                  className="w-full h-full block focus:outline-none"
                >
                  <div className={`w-full h-full border ${milestone.borderTheme} ${milestone.themeBg} hover:bg-charcoal-dark/70 hover:border-accent/40 rounded-3xl p-6 md:p-8 backdrop-blur-md flex flex-col justify-between shadow-2xl relative group overflow-hidden transition-all duration-300 cursor-pointer`}>
                    
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1">
                        <span className={`px-3 py-1 bg-charcoal-dark border ${milestone.borderTheme} rounded-full text-xs font-outfit font-bold tracking-wider uppercase w-fit ${milestone.accentText}`}>
                          {milestone.eraName}
                        </span>
                      </div>
                      <div className={`px-4 py-1.5 rounded-2xl ${milestone.accentText} bg-charcoal border ${milestone.borderTheme} flex items-center gap-1.5`}>
                        <Calendar className="w-4 h-4" />
                        <span className="font-outfit text-sm font-bold">{milestone.year}</span>
                      </div>
                    </div>

                    {/* Body Content: Grid with Image */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-2 md:my-0 flex-grow">
                      
                      {/* Left: Text Details (7 cols) */}
                      <div className="md:col-span-7 flex flex-col gap-2.5">
                        <h3 className="font-playfair text-2xl md:text-3xl font-bold text-warm-ivory group-hover:text-accent transition-colors leading-snug">
                          {milestone.title}
                        </h3>
                        <p className="font-outfit text-[11px] md:text-[13px] text-warm-ivory/60 leading-relaxed max-h-[120px] overflow-y-auto pr-2">
                          {milestone.summary}
                        </p>
                      </div>

                      {/* Right: Big Image (5 cols) */}
                      <div className="md:col-span-5 relative h-[160px] md:h-[190px] rounded-2xl overflow-hidden border border-accent/10 shadow-lg">
                        <img
                          src={milestone.imageUrl}
                          alt={milestone.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/70 to-transparent" />
                      </div>

                    </div>

                    {/* Footer Action */}
                    <div className="flex justify-between items-center pt-3 border-t border-accent/10 mt-auto">
                      <span className="font-outfit text-[10px] text-warm-ivory/30">Sector Coordinate: {milestone.id.toUpperCase()}</span>
                      <div
                        className="px-5 py-2.5 bg-gradient-gold text-charcoal-dark font-outfit text-xs font-bold tracking-wider uppercase rounded-full shadow group-hover:scale-105 transition-all flex items-center gap-1.5"
                      >
                        Enter Sector
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                  </div>
                </Link>

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
