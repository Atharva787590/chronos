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
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1529260830199-44580453794b?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1614701167693-85ae30ff3c4d?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800",
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
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    borderTheme: "border-accent/30",
    accentText: "text-accent",
    themeBg: "bg-yellow-950/10"
  },

  // Ancient Egypt (6 Milestones)
  {
    id: "egypt-1",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "3100 BC",
    title: "Unification of Egypt",
    summary: "King Narmer unifies Upper and Lower Egypt under the first dynasty, establishing the double crown and founding the capital at Memphis.",
    imageUrl: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?q=80&w=800",
    borderTheme: "border-amber-800/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/10"
  },
  {
    id: "egypt-2",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "2560 BC",
    title: "Great Pyramid of Giza",
    summary: "The monumental limestone tomb built for Pharaoh Khufu is completed, standing as the tallest structure in the world for over 3,800 years.",
    imageUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800",
    borderTheme: "border-amber-800/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/10"
  },
  {
    id: "egypt-3",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "1478 BC",
    title: "Reign of Hatshepsut",
    summary: "Hatshepsut rules as a king pharaoh, launching major trade expeditions to Punt and commissioning the spectacular Deir el-Bahari temple.",
    imageUrl: "https://images.unsplash.com/photo-1600577916048-804c9191e36c?q=80&w=800",
    borderTheme: "border-amber-800/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/10"
  },
  {
    id: "egypt-4",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "1332 BC",
    title: "Reign of Tutankhamun",
    summary: "The young pharaoh restores traditional religious practices and shifts the administrative capital back to the sacred city of Thebes.",
    imageUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800",
    borderTheme: "border-amber-800/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/10"
  },
  {
    id: "egypt-5",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "1274 BC",
    title: "Battle of Kadesh",
    summary: "Ramses II fights the Hittites in a massive chariot battle, leading to the signing of the world's first recorded international peace treaty.",
    imageUrl: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?q=80&w=800",
    borderTheme: "border-amber-800/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/10"
  },
  {
    id: "egypt-6",
    era: "egypt",
    eraName: "Ancient Egypt",
    year: "30 BC",
    title: "Fall to the Roman Empire",
    summary: "Cleopatra VII's reign ends, concluding Ptolemaic rule and formalizing Egypt's annexation as a key province of the Roman Empire.",
    imageUrl: "https://images.unsplash.com/photo-1600577916048-804c9191e36c?q=80&w=800",
    borderTheme: "border-amber-800/30",
    accentText: "text-amber-500",
    themeBg: "bg-amber-950/10"
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
