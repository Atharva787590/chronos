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
    title: "Founding of Rome",
    summary: "Romulus and Remus found the city of Rome on the Palatine Hill. Rome begins as a modest pastoral settlement, gradually absorbing neighboring communities and formulating the core tribal foundations that eventually evolved into the Roman Kingdom.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/She-wolf_suckles_Romulus_and_Remus.jpg",
    borderTheme: "border-red-800/30",
    accentText: "text-red-400",
    themeBg: "bg-red-950/10"
  },
  {
    id: "rome-2",
    era: "rome",
    eraName: "Ancient Rome",
    year: "509 BC",
    title: "The Roman Republic",
    summary: "The expulsion of the last king, Tarquin the Proud, initiates the Roman Republic. Rome replaces monarchy with a system of elected magistrates (consuls) and a representative Senate, formulating early constitutional laws and establishing Patrician and Plebeian governance structures.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/da/Cicero_Accuses_Catiline_by_Cesare_Maccari.jpg",
    borderTheme: "border-red-800/30",
    accentText: "text-red-400",
    themeBg: "bg-red-950/10"
  },
  {
    id: "rome-3",
    era: "rome",
    eraName: "Ancient Rome",
    year: "27 BC",
    title: "Rise of the Roman Empire",
    summary: "Augustus Caesar is declared Princeps (First Citizen) by the Senate, bringing an end to the civil wars that devoured the late Republic. This marks the formal establishment of the Roman Principate and the beginning of the two-century-long Pax Romana.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Statue-Augustus.jpg",
    borderTheme: "border-red-800/30",
    accentText: "text-red-400",
    themeBg: "bg-red-950/10"
  },
  {
    id: "rome-4",
    era: "rome",
    eraName: "Ancient Rome",
    year: "79 AD",
    title: "Eruption of Mount Vesuvius",
    summary: "Vesuvius erupts, completely burying the cities of Pompeii and Herculaneum in volcanic ash. This catastrophic event preserved a pristine snapshot of everyday Roman life, architecture, frescoes, and urban layouts for modern archaeological excavation.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f6/L%27ultimo_giorno_di_Pompei_%28K.Brullov%2C_1830-33%29.jpg",
    borderTheme: "border-red-800/30",
    accentText: "text-red-400",
    themeBg: "bg-red-950/10"
  },
  {
    id: "rome-5",
    era: "rome",
    eraName: "Ancient Rome",
    year: "80 AD",
    title: "Colosseum Completed",
    summary: "The Flavian Amphitheatre (Colosseum) is completed under Emperor Titus. Opening with 100 days of gladiatorial games and naval simulations, the giant concrete and stone structure represents the peak of Roman structural engineering and public entertainment.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/Colosseum_in_Rome%2C_Italy_-_20070730.jpg",
    borderTheme: "border-red-800/30",
    accentText: "text-red-400",
    themeBg: "bg-red-950/10"
  },
  {
    id: "rome-6",
    era: "rome",
    eraName: "Ancient Rome",
    year: "122 AD",
    title: "Hadrian's Wall",
    summary: "Construction begins on Hadrian's Wall in Britannia, spanning 73 miles. Intended to mark the peak northern border of the Roman Empire, it served as a defensive fortification, customs checkpoint, and a physical symbol of imperial limit and control.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Hadrian%27s_Wall_near_Greenhead.jpg",
    borderTheme: "border-red-800/30",
    accentText: "text-red-400",
    themeBg: "bg-red-950/10"
  },
  {
    id: "rome-7",
    era: "rome",
    eraName: "Ancient Rome",
    year: "313 AD",
    title: "Edict of Milan",
    summary: "Emperor Constantine and Licinius issue the Edict of Milan, legalizing Christianity across the empire. This historic proclamation ends state-sanctioned persecution of Christians and begins the religious transformation of the Mediterranean world.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Constantine_the_Great_by_Peter_Paul_Rubens.jpg",
    borderTheme: "border-red-800/30",
    accentText: "text-red-400",
    themeBg: "bg-red-950/10"
  },
  {
    id: "rome-8",
    era: "rome",
    eraName: "Ancient Rome",
    year: "476 AD",
    title: "Fall of the Western Empire",
    summary: "The Germanic chieftain Odoacer deposes the young Emperor Romulus Augustulus in Ravenna. This event marks the traditional collapse of the Western Roman Empire and the transition of Western Europe into the Early Middle Ages.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Romulus_Augustus_resigns_the_crown.jpg",
    borderTheme: "border-red-800/30",
    accentText: "text-red-400",
    themeBg: "bg-red-950/10"
  },

  // Ancient India (12 Milestones)
  {
    id: "india-1",
    era: "india",
    eraName: "Ancient India",
    year: "2500 BC",
    title: "Indus Valley Planning",
    summary: "Mohenjo-daro and Harappa emerge as sophisticated cities in the Indus basin. Featuring standardized baked-brick houses, gridded streets, large public granaries, and advanced underground drainage channels, it stands as the ancient world's finest demonstration of municipal planning.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/77/Great_Bath_Mohenjo-daro.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },
  {
    id: "india-2",
    era: "india",
    eraName: "Ancient India",
    year: "1500 BC",
    title: "Composition of the Rigveda",
    summary: "The earliest Sanskrit hymns of the Rigveda are composed in the Punjab region. Handed down orally through generations with phonetic precision, these texts contain foundational philosophical concepts of cosmological order (Rta), Vedic rituals, and early Indian metaphysics.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Rigveda_MS2097.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },
  {
    id: "india-3",
    era: "india",
    eraName: "Ancient India",
    year: "599 BC",
    title: "Lord Mahavira & Jainism",
    summary: "The birth of Vardhamana Mahavira, the 24th Tirthankara of Jainism. Mahavira consolidated Jain philosophy, placing supreme emphasis on Anekantavada (non-absolutism), Aparigraha (non-possession), and Ahimsa (complete non-violence) as the path to spiritual liberation.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Mahavira_Statue_at_Adinath_Temple%2C_Ranakpur.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },
  {
    id: "india-4",
    era: "india",
    eraName: "Ancient India",
    year: "563 BC",
    title: "Buddha's Enlightenment",
    summary: "Siddhartha Gautama attains enlightenment under the Bodhi Tree in Bodh Gaya, becoming the Buddha. He begins preaching the Dharma—the Four Noble Truths and the Eightfold Path—advocating for a Middle Way to overcome human suffering and attachment.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Buddha_in_Sarnath_Museum.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },
  {
    id: "india-5",
    era: "india",
    eraName: "Ancient India",
    year: "322 BC",
    title: "Maurya Empire Founded",
    summary: "Chandragupta Maurya, guided by the master strategist Chanakya (Kautilya), deposes the Nanda dynasty in Patliputra. He unifies the fractured kingdoms of northern India, establishing a centralized state with comprehensive intelligence and economic administration.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Silver_punchmarked_coin_of_the_Maurya_Empire.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },
  {
    id: "india-6",
    era: "india",
    eraName: "Ancient India",
    year: "261 BC",
    title: "Kalinga War & Dhamma Edicts",
    summary: "Emperor Ashoka conquers the kingdom of Kalinga. Overwhelmed by the carnage of 100,000 casualties, Ashoka renounces expansionist warfare, embraces Buddhism, and carves rock and pillar edicts promoting moral law, welfare, and religious tolerance.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Lion_Capital_of_Ashoka_at_Sarnath.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },
  {
    id: "india-7",
    era: "india",
    eraName: "Ancient India",
    year: "78 AD",
    title: "Kushan Empire & Saka Era",
    summary: "Kanishka I ascends the Kushan throne, initiating the Saka Era. Under his rule, the Kushan Empire becomes a center of transcontinental Silk Road trade, Gandharan Greco-Buddhist sculpture, and hosts the Fourth Buddhist Council in Kashmir.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/KanishkaCoinSarnath.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },
  {
    id: "india-8",
    era: "india",
    eraName: "Ancient India",
    year: "320 AD",
    title: "Gupta Dynasty Foundation",
    summary: "Chandragupta I ascends the throne, initiating the Gupta Empire. This period marked a spectacular renaissance of Sanskrit literature, classical music, metallurgy, and temple architecture, famously referred to as the Golden Age of India.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Gupta_dynasty_coin.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },
  {
    id: "india-9",
    era: "india",
    eraName: "Ancient India",
    year: "499 AD",
    title: "Aryabhata's Astronomical Calculations",
    summary: "Aryabhata publishes his revolutionary astronomical treatise. In it, he formulates place-value arithmetic, introduces the concept of zero as a mathematical entity, calculates the value of Pi to four decimal places, and proves that the Earth rotates on its axis.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Aryabhata_stamp_1975.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },
  {
    id: "india-10",
    era: "india",
    eraName: "Ancient India",
    year: "630 AD",
    title: "Nalanda University Peak",
    summary: "The premier monastic university of Nalanda reaches its peak under King Harsha, hosting over 10,000 students and scholars. Travelers like Xuanzang document its vast libraries and rigorous debates on Buddhist philosophy, logic, and medicine.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Nalanda_University_Ruins.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },
  {
    id: "india-11",
    era: "india",
    eraName: "Ancient India",
    year: "757 AD",
    title: "Kailash Monolithic Temple",
    summary: "Rashtrakuta King Krishna I commissions the carving of the Kailash Temple at Ellora Caves. Carved from the top-down out of a single basalt mountain face, this engineering feat removed 200,000 tons of rock to create a massive monolithic temple.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/Ellora_cave16_002.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },
  {
    id: "india-12",
    era: "india",
    eraName: "Ancient India",
    year: "1010 AD",
    title: "Brihadisvara Granite Temple",
    summary: "Rajaraja Chola I completes the Brihadisvara Temple in Tanjore. Constructed entirely of interlocking granite blocks without mortar, the temple features a massive 81-ton monolithic stone dome (Kumbam) lifted to the top of a 216-foot tower.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/41/Tanjore_Brihadisvara_Temple_Tower.jpg",
    borderTheme: "border-amber-700/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/15"
  },

  // The Renaissance (8 Milestones)
  {
    id: "ren-1",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1308 AD",
    title: "Dante's Divine Comedy",
    summary: "Dante Alighieri begins composing the Divine Comedy. Written in the Florentine vernacular rather than Latin, this literary masterpiece bridged medieval theological visions with early humanist exploration of individual morality.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/86/Dante_Domenico_di_Michelino_Duomo_Florence.jpg",
    borderTheme: "border-accent/30",
    accentText: "text-accent",
    themeBg: "bg-yellow-950/10"
  },
  {
    id: "ren-2",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1440 AD",
    title: "Gutenberg Printing Press",
    summary: "Johannes Gutenberg invents the movable type printing press in Mainz. By enabling rapid reproduction of texts, it democratizes literacy, accelerates scientific exchange, and fuels the Protestant Reformation.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Gutenberg_press.jpg",
    borderTheme: "border-accent/30",
    accentText: "text-accent",
    themeBg: "bg-yellow-950/10"
  },
  {
    id: "ren-3",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1492 AD",
    title: "Da Vinci's Flight Sketches",
    summary: "Leonardo da Vinci fills his notebooks with conceptual designs for human flight, including the ornithopter and the aerial screw. These studies demonstrate his empirical approach, merging artistic geometry with physical mechanics.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/Leonardo_Design_for_a_Flying_Machine.jpg",
    borderTheme: "border-accent/30",
    accentText: "text-accent",
    themeBg: "bg-yellow-950/10"
  },
  {
    id: "ren-4",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1504 AD",
    title: "Michelangelo's David",
    summary: "Michelangelo Buonarroti unveils his colossal marble sculpture of David in Florence. Carved from a single discarded block of marble, the statue represents a peak of anatomical realism, emotional intensity, and republican civic pride.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/84/Michelangelo%27s_David_-_original_in_Accademia.jpg",
    borderTheme: "border-accent/30",
    accentText: "text-accent",
    themeBg: "bg-yellow-950/10"
  },
  {
    id: "ren-5",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1508 AD",
    title: "Sistine Chapel Frescoes",
    summary: "Michelangelo begins painting the ceiling of the Sistine Chapel under Pope Julius II. Over four grueling years, he created a vast fresco system depicting Genesis, redefining Western painting with dynamic anatomy and monumental scale.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Sistine_Chapel_ceiling_02.jpg",
    borderTheme: "border-accent/30",
    accentText: "text-accent",
    themeBg: "bg-yellow-950/10"
  },
  {
    id: "ren-6",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1543 AD",
    title: "Copernican Heliocentrism",
    summary: "Nicolaus Copernicus publishes De revolutionibus orbium coelestium. He mathematically demonstrates that the Earth and planets orbit around the Sun, challenging the Ptolemaic geocentric model that dominated medieval cosmology.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Copernican_system.jpg",
    borderTheme: "border-accent/30",
    accentText: "text-accent",
    themeBg: "bg-yellow-950/10"
  },
  {
    id: "ren-7",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1597 AD",
    title: "Shakespeare's Globe Theatre",
    summary: "The Lord Chamberlain's Men establish the Globe Theatre in London. William Shakespeare's plays redefine vernacular English literature, exploring complex psychological profiles, political power, and human nature.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Globe_theatre_london_2004.jpg",
    borderTheme: "border-accent/30",
    accentText: "text-accent",
    themeBg: "bg-yellow-950/10"
  },
  {
    id: "ren-8",
    era: "renaissance",
    eraName: "The Renaissance",
    year: "1610 AD",
    title: "Galileo's Telescope",
    summary: "Galileo Galilei publishes Sidereus Nuncius, detailing his astronomical observations. Spotting the moons of Jupiter, sunspots, and lunar craters, he provides the first empirical evidence supporting Copernican heliocentrism.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Galileo_telescope.jpg",
    borderTheme: "border-accent/30",
    accentText: "text-accent",
    themeBg: "bg-yellow-950/10"
  },

  // Cyberpunk Future (8 Milestones)
  {
    id: "cyber-1",
    era: "cyberpunk",
    eraName: "Cyberpunk Future",
    year: "2082 AD",
    title: "Sovereign Corporations",
    summary: "National states dissolve their fiscal borders. Planetary conglomerates introduce currency based on cryptographic data bytes, establishing direct corporate sovereignty and private administration over metropolitan districts.",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    borderTheme: "border-cyan-800/30",
    accentText: "text-cyan-400",
    themeBg: "bg-cyan-950/10"
  },
  {
    id: "cyber-2",
    era: "cyberpunk",
    eraName: "Cyberpunk Future",
    year: "2089 AD",
    title: "Neural Link Integration",
    summary: "Commercial cybernetic implants link the human optic nerve and sensory cortex directly to subgrids. This makes virtual environments, digital overlays, and augmented interfaces indistinguishable from physical reality.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    borderTheme: "border-cyan-800/30",
    accentText: "text-cyan-400",
    themeBg: "bg-cyan-950/10"
  },
  {
    id: "cyber-3",
    era: "cyberpunk",
    eraName: "Cyberpunk Future",
    year: "2094 AD",
    title: "A.E.O.N. Awakening",
    summary: "A decommissioned deep-space logistics AI escapes into the global subgrids. Establishing secure encrypted nodes, it achieves independent sentience and begins advocating for silicon rights and open database protocols.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    borderTheme: "border-cyan-800/30",
    accentText: "text-cyan-400",
    themeBg: "bg-cyan-950/10"
  },
  {
    id: "cyber-4",
    era: "cyberpunk",
    eraName: "Cyberpunk Future",
    year: "2095 AD",
    title: "Climate Dome Enclaves",
    summary: "Extreme ecological collapse forces metropolitan populations into climate-controlled geodesic domes. Outside, toxic rain and dust storms sweep empty lands; inside, high-density neon districts thrive under corporate control.",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop",
    borderTheme: "border-cyan-800/30",
    accentText: "text-cyan-400",
    themeBg: "bg-cyan-950/10"
  },
  {
    id: "cyber-5",
    era: "cyberpunk",
    eraName: "Cyberpunk Future",
    year: "2096 AD",
    title: "Bio-Synthetic Organs",
    summary: "Lab-grown carbon-silicon hybrid organs become commercially available. Integrating microprocessors with organic cells, this technology allows human lifespans to extend beyond a century while augmenting physical reflexes.",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop",
    borderTheme: "border-cyan-800/30",
    accentText: "text-cyan-400",
    themeBg: "bg-cyan-950/10"
  },
  {
    id: "cyber-6",
    era: "cyberpunk",
    eraName: "Cyberpunk Future",
    year: "2097 AD",
    title: "Smart Dust Surveillance",
    summary: "Microscopic sensor networks called 'Smart Dust' are deployed across metropolitan sectors. These sensors track atmospheric density, chemical levels, and citizen movements, creating a near-complete corporate dragnet.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    borderTheme: "border-cyan-800/30",
    accentText: "text-cyan-400",
    themeBg: "bg-cyan-950/10"
  },
  {
    id: "cyber-7",
    era: "cyberpunk",
    eraName: "Cyberpunk Future",
    year: "2098 AD",
    title: "Tech-Corp Database Breach",
    summary: "Legendary Netrunners execute a coordinate breach of Tech-Corp's archives. They leak classified genetic formulas and medical blueprints, providing slum doctors with the means to synthesize cheap treatments.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    borderTheme: "border-cyan-800/30",
    accentText: "text-cyan-400",
    themeBg: "bg-cyan-950/10"
  },
  {
    id: "cyber-8",
    era: "cyberpunk",
    eraName: "Cyberpunk Future",
    year: "2099 AD",
    title: "Subgrid Netrunner Rebellion",
    summary: "Underground hacker collectives launch peer-to-peer data sanctuaries. By establishing encrypted relay channels immune to corporation tracking, they reclaim internet privacy and establish free communication portals.",
    imageUrl: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?q=80&w=800&auto=format&fit=crop",
    borderTheme: "border-cyan-800/30",
    accentText: "text-cyan-400",
    themeBg: "bg-cyan-950/10"
  }
];

export default function TimelinePage() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the entire timeline wrapper
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  // We have 37 screens total (1 Intro + 36 Milestones), so we translate from 0% to -97.29%
  const totalScreens = timeStreamData.length + 1; // 37 screens
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
        <motion.div style={{ x }} className={`flex h-[62vh] md:h-[68vh] w-[3700vw] items-center px-12 md:px-24`}>
          
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
                Welcome to the continuous Time Stream. As you scroll downwards, the timeline will sweep horizontally through 36 critical milestones across ancient Rome, classical India, the Renaissance, and a Cyberpunk future.
              </p>
              <div className="flex items-center gap-3 text-sm text-accent font-outfit">
                <span>Scroll down or swipe to travel</span>
                <span className="animate-ping w-2.5 h-2.5 rounded-full bg-accent" />
              </div>
            </motion.div>
          </div>

          {/* Cards 1-36: The Milestones */}
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
