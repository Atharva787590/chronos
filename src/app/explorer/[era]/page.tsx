"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Compass, Cpu, MessageSquare, Send, Sparkles, User, ChevronLeft, Calendar, Lightbulb, MapPin } from "lucide-react";

// Types
interface HistoricalFigure {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  predefinedQuestions: { q: string; a: string }[];
  fallbackResponses: string[];
}

interface EraData {
  id: string;
  name: string;
  period: string;
  tagline: string;
  introduction: string;
  culture: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  borderColor: string;
  gradientBg: string;
  milestones: { year: string; event: string; desc: string; image: string }[];
  achievements: { title: string; desc: string; icon: React.ComponentType<{ className?: string }> }[];
  figures: HistoricalFigure[];
}

// Data Seed
const eraDataMap: Record<string, EraData> = {
  rome: {
    id: "rome",
    name: "Ancient Rome",
    period: "27 BC - 476 AD",
    tagline: "The Eternal City: Marble, Iron, and Immutable Laws",
    introduction: "Ancient Rome was a powerhouse of military discipline, civil engineering, and legal systems. From the paving of the Appian Way to the arches of the Colosseum, Rome forged an empire whose institutions still echo in modern halls of justice.",
    culture: "Roman life centered around the Forum, public baths, and theatrical spectacles. Society was highly stratified yet fluid, driven by patron-client relationships and a constant push for civic order.",
    icon: Landmark,
    accentColor: "text-red-400",
    borderColor: "border-red-800/35",
    gradientBg: "from-red-950/20 to-charcoal-dark",
    milestones: [
      {
        year: "753 BC",
        event: "Founding of Rome",
        desc: "Romulus and Remus found the city of Rome on the Palatine Hill. Rome begins as a modest pastoral settlement, gradually absorbing neighboring communities and formulating the core tribal foundations that eventually evolved into the Roman Kingdom.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Roman_Forum_from_Palatine.jpg/1280px-Roman_Forum_from_Palatine.jpg"
      },
      {
        year: "509 BC",
        event: "The Roman Republic",
        desc: "The expulsion of the last king, Tarquin the Proud, initiates the Roman Republic. Rome replaces monarchy with a system of elected magistrates (consuls) and a representative Senate, formulating early constitutional laws and establishing Patrician and Plebeian governance structures.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Maccari-Cicero.jpg/1280px-Maccari-Cicero.jpg"
      },
      {
        year: "27 BC",
        event: "Rise of the Roman Empire",
        desc: "Augustus Caesar is declared Princeps (First Citizen) by the Senate, bringing an end to the civil wars that devoured the late Republic. This marks the formal establishment of the Roman Principate and the beginning of the two-century-long Pax Romana.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Statue-Augustus.jpg/800px-Statue-Augustus.jpg"
      },
      {
        year: "79 AD",
        event: "Eruption of Mount Vesuvius",
        desc: "Vesuvius erupts, completely burying the cities of Pompeii and Herculaneum in volcanic ash. This catastrophic event preserved a pristine snapshot of everyday Roman life, architecture, frescoes, and urban layouts for modern archaeological excavation.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pompeii_-_Osteria_della_via_di_Mercurio_%286029565261%29.jpg/1280px-Pompeii_-_Osteria_della_via_di_Mercurio_%286029565261%29.jpg"
      },
      {
        year: "80 AD",
        event: "Colosseum Completed",
        desc: "The Flavian Amphitheatre (Colosseum) is completed under Emperor Titus. Opening with 100 days of gladiatorial games and naval simulations, the giant concrete and stone structure represents the peak of Roman structural engineering and public entertainment.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg"
      },
      {
        year: "122 AD",
        event: "Hadrian's Wall",
        desc: "Construction begins on Hadrian's Wall in Britannia, spanning 73 miles. Intended to mark the peak northern border of the Roman Empire, it served as a defensive fortification, customs checkpoint, and a physical symbol of imperial limit and control.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hadrian%27s_wall_at_Greenhead_Lough.jpg/1280px-Hadrian%27s_wall_at_Greenhead_Lough.jpg"
      },
      {
        year: "313 AD",
        event: "Edict of Milan",
        desc: "Emperor Constantine and Licinius issue the Edict of Milan, legalizing Christianity across the empire. This historic proclamation ends state-sanctioned persecution of Christians and begins the religious transformation of the Mediterranean world.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Arch_of_Constantine_2014.jpg/1280px-Arch_of_Constantine_2014.jpg"
      },
      {
        year: "476 AD",
        event: "Fall of the Western Empire",
        desc: "The Germanic chieftain Odoacer deposes the young Emperor Romulus Augustulus in Ravenna. This event marks the traditional collapse of the Western Roman Empire and the transition of Western Europe into the Early Middle Ages.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Roman_Forum_from_Palatine.jpg/1280px-Roman_Forum_from_Palatine.jpg"
      }
    ],
    achievements: [
      { title: "Roman Concrete", desc: "Pozzolana ash mixtures allowed underwater curing, constructing domes that stand 2,000 years later.", icon: Landmark },
      { title: "Aqueducts & Hydraulics", desc: "Gravity-fed stone channels carried millions of gallons of water daily directly into urban fountains.", icon: MapPin },
      { title: "Codified Law", desc: "The Twelve Tables laid down core civil rights and litigation precedents that form modern legal codes.", icon: Lightbulb }
    ],
    figures: [
      {
        id: "caesar",
        name: "Julius Caesar",
        role: "Imperator & General",
        avatar: "🏛️",
        bio: "Military general and dictator whose rise marked the transition of the Roman Republic into the Roman Empire.",
        predefinedQuestions: [
          { q: "What was your true objective when crossing the Rubicon?", a: "To cross the Rubicon was to declare that the Republic's corrupt senate could no longer represent Rome. It was not an act of treason against Rome, but against the patrician oligarchy that choked her." },
          { q: "How did you conquer Gaul so effectively?", a: "Discipline, speed, and engineering. We did not just march; we built bridges over the Rhine in ten days and aligned our legionaries to fight as one steel unit." },
          { q: "What is your vision for Rome's future?", a: "A Rome that extends citizenship to all her conquered territories, rebuilds Carthage, reforms the calendar, and creates stability that survives any senator's lifetime." }
        ],
        fallbackResponses: [
          "The die is cast. Rome must move forward, regardless of the conspiracies in the Senate.",
          "Valour is of no use unless there is wisdom in command.",
          "I came, I saw, I conquered. Speak your mind quickly, citizen, I have legions to inspect."
        ]
      },
      {
        id: "aurelius",
        name: "Marcus Aurelius",
        role: "Philosopher Emperor",
        avatar: "📜",
        bio: "Emperor and Stoic philosopher. Wrote 'Meditations' while commanding military campaigns on the Germanic borders.",
        predefinedQuestions: [
          { q: "How do you maintain inner peace while ruling an empire?", a: "By remembering that the mind is a citadel. Outer events have no power over the soul unless you invite them. Perform each task as if it were your last." },
          { q: "What is the purpose of human life according to Stoicism?", a: "To act in accordance with nature and reason. We are made for cooperation, like feet, hands, and the rows of the upper and lower teeth." },
          { q: "How do you face the constant threat of war and plague?", a: "Acceptance. Change is the law of the universe. What does not harm the community cannot harm the individual. Focus only on the present moment." }
        ],
        fallbackResponses: [
          "Waste no more time arguing about what a good man should be. Be one.",
          "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
          "If it is not right, do not do it; if it is not true, do not say it."
        ]
      },
      {
        id: "augustus",
        name: "Augustus Caesar",
        role: "First Roman Emperor",
        avatar: "👑",
        bio: "First emperor of Rome, founder of the Roman Principate, and architect of the Pax Romana.",
        predefinedQuestions: [
          { q: "What was your greatest achievement for Rome?", a: "I found Rome a city of bricks and left it a city of marble. I brought peace to a land torn apart by a century of civil war." },
          { q: "How did you maintain power without being labeled a tyrant?", a: "By preserving the illusion of the Republic. I called myself Princeps—First Citizen—rather than dictator. Power is best wielded with a velvet glove over iron." }
        ],
        fallbackResponses: [
          "Make haste slowly. Precision builds empires, not reckless speed.",
          "If I have played my part well in this comedy of life, clap your hands and dismiss me with applause.",
          "Rome has found its peace. Let us guard it diligently."
        ]
      },
      {
        id: "seneca",
        name: "Seneca the Younger",
        role: "Stoic Philosopher & Advisor",
        avatar: "✍️",
        bio: "Stoic philosopher, writer, and advisor to Emperor Nero. Explored ethics, resilience, and mortality.",
        predefinedQuestions: [
          { q: "What is your advice on facing adversity?", a: "We suffer more often in imagination than in reality. Treat every difficulty as training for the soul. Fire is the test of gold, adversity of strong men." },
          { q: "What did you think of advising Nero?", a: "A philosopher in the court of a tyrant walks on a thin glass. I sought to direct his wild passions toward reason, but a corrupt mind eventually devours its guides." }
        ],
        fallbackResponses: [
          "It is not that we have a short time to live, but that we waste a lot of it.",
          "Associate with people who are likely to improve you.",
          "Life is long if you know how to use it."
        ]
      }
    ]
  },
  india: {
    id: "india",
    name: "Ancient & Medieval India",
    period: "322 BC - 1050 AD",
    tagline: "The Golden Realms: Dharma, Math, and Monumental Stone",
    introduction: "Classical India was an incubator for universal concepts, giving birth to key mathematical principles (like zero), surgical practices, and profound spiritual systems. From the rock-cut caves of Ajanta to the grand temples of Hampi, Indian civilization fused deep philosophical inquiry with highly advanced architectural engineering.",
    culture: "Culture was deeply anchored in the concepts of Dharma (righteous duty) and Karma, fostering a pluralistic society where art, mathematics, and philosophy flourished in royal courts and monastic universities like Nalanda.",
    icon: Compass,
    accentColor: "text-amber-500",
    borderColor: "border-amber-700/35",
    gradientBg: "from-amber-950/20 to-charcoal-dark",
    milestones: [
      {
        year: "2500 BC",
        event: "Indus Valley Urban Planning",
        desc: "Mohenjo-daro and Harappa emerge as sophisticated cities in the Indus basin. Featuring standardized baked-brick houses, gridded streets, large public granaries, and advanced underground drainage channels, it stands as the ancient world's finest demonstration of municipal planning.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mohenjodaro_Sindh.jpeg/1280px-Mohenjodaro_Sindh.jpeg"
      },
      {
        year: "1500 BC",
        event: "Composition of the Rigveda",
        desc: "The earliest Sanskrit hymns of the Rigveda are composed in the Punjab region. Handed down orally through generations with phonetic precision, these texts contain foundational philosophical concepts of cosmological order (Rta), Vedic rituals, and early Indian metaphysics.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/RigvedaMS.jpg/1280px-RigvedaMS.jpg"
      },
      {
        year: "599 BC",
        event: "Lord Mahavira & Jainism",
        desc: "The birth of Vardhamana Mahavira, the 24th Tirthankara of Jainism. Mahavira consolidated Jain philosophy, placing supreme emphasis on Anekantavada (non-absolutism), Aparigraha (non-possession), and Ahimsa (complete non-violence) as the path to spiritual liberation.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Gomateshwara_statue%2C_Shravanabelagola.jpg/800px-Gomateshwara_statue%2C_Shravanabelagola.jpg"
      },
      {
        year: "563 BC",
        event: "Gautama Buddha's Enlightenment",
        desc: "Siddhartha Gautama attains enlightenment under the Bodhi Tree in Bodh Gaya, becoming the Buddha. He begins preaching the Dharma—the Four Noble Truths and the Eightfold Path—advocating for a Middle Way to overcome human suffering and attachment.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Mahabodhi_temple.jpg/800px-Mahabodhi_temple.jpg"
      },
      {
        year: "322 BC",
        event: "Maurya Empire Founded",
        desc: "Chandragupta Maurya, guided by the master strategist Chanakya (Kautilya), deposes the Nanda dynasty in Patliputra. He unifies the fractured kingdoms of northern India, establishing a centralized state with comprehensive intelligence and economic administration.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Sarnath_museum_2013.jpg/800px-Sarnath_museum_2013.jpg"
      },
      {
        year: "261 BC",
        event: "Kalinga War & Edicts of Dhamma",
        desc: "Emperor Ashoka conquers the kingdom of Kalinga. Overwhelmed by the carnage of 100,000 casualties, Ashoka renounces expansionist warfare, embraces Buddhism, and carves rock and pillar edicts promoting moral law, welfare, and religious tolerance.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Ashoka%27s_Rock_Edict_in_Girnar%2C_Junagadh_Gujarat.jpg/1280px-Ashoka%27s_Rock_Edict_in_Girnar%2C_Junagadh_Gujarat.jpg"
      },
      {
        year: "78 AD",
        event: "Kushan Empire & Saka Era",
        desc: "Kanishka I ascends the Kushan throne, initiating the Saka Era. Under his rule, the Kushan Empire becomes a center of transcontinental Silk Road trade, Gandharan Greco-Buddhist sculpture, and hosts the Fourth Buddhist Council in Kashmir.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Gandhara_Buddha_%28tnm%29.jpeg/800px-Gandhara_Buddha_%28tnm%29.jpeg"
      },
      {
        year: "320 AD",
        event: "Gupta Dynasty Foundation",
        desc: "Chandragupta I ascends the throne, initiating the Gupta Empire. This period marked a spectacular renaissance of Sanskrit literature, classical music, metallurgy, and temple architecture, famously referred to as the Golden Age of India.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Iron_pillar_of_Chandragupta_II.jpg/800px-Iron_pillar_of_Chandragupta_II.jpg"
      },
      {
        year: "499 AD",
        event: "Aryabhata's Aryabhatiya",
        desc: "Aryabhata publishes his revolutionary astronomical treatise. In it, he formulates place-value arithmetic, introduces the concept of zero as a mathematical entity, calculates the value of Pi to four decimal places, and proves that the Earth rotates on its axis.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Jantar_Mantar_Jaipur_March_2016.jpg/1280px-Jantar_Mantar_Jaipur_March_2016.jpg"
      },
      {
        year: "630 AD",
        event: "Nalanda University Golden Peak",
        desc: "The premier monastic university of Nalanda reaches its peak under King Harsha, hosting over 10,000 students and scholars. Travelers like Xuanzang document its vast libraries and rigorous debates on Buddhist philosophy, logic, and medicine.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Nalanda_university_ruins_01.jpg/1280px-Nalanda_university_ruins_01.jpg"
      },
      {
        year: "757 AD",
        event: "Kailash Monolithic Temple",
        desc: "Rashtrakuta King Krishna I commissions the carving of the Kailash Temple at Ellora Caves. Carved from the top-down out of a single basalt mountain face, this engineering feat removed 200,000 tons of rock to create a massive monolithic temple.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/EloraKailasa.jpg/1280px-EloraKailasa.jpg"
      },
      {
        year: "1010 AD",
        event: "Brihadisvara Granite Temple",
        desc: "Rajaraja Chola I completes the Brihadisvara Temple in Tanjore. Constructed entirely of interlocking granite blocks without mortar, the temple features a massive 81-ton monolithic stone dome (Kumbam) lifted to the top of a 216-foot tower.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Brihadisvara_temple_Thanjavur_2014.jpg/1280px-Brihadisvara_temple_Thanjavur_2014.jpg"
      }
    ],
    achievements: [
      { title: "Decimal System & Zero", desc: "Indian mathematicians revolutionized science by formalizing zero, place-value systems, and trigonometric ratios.", icon: Lightbulb },
      { title: "Rock-Cut Monuments", desc: "Monolithic cave carving reached its zenith, carving entire temples out of single mountain rocks with precision.", icon: Landmark },
      { title: "Metallurgical Mastery", desc: "The Iron Pillar of Delhi stands rust-free for over 1,600 years, demonstrating highly advanced metallurgy.", icon: Compass }
    ],
    figures: [
      {
        id: "ashoka",
        name: "Emperor Ashoka",
        role: "Dharmaraja & Ruler",
        avatar: "👑",
        bio: "Mauryan Emperor who turned from conquest to peace, dedicating his empire to Buddhism, benevolence, and moral edicts.",
        predefinedQuestions: [
          { q: "What made you renounce war after the Kalinga battle?", a: "The battlefield of Kalinga was covered in the blood of 100,000 slain and the tears of families. In that silence, I realized that true conquest is not by steel or arrows, but by Dharma—by winning the hearts of men through mercy and tolerance." },
          { q: "How did you govern such a vast empire without force?", a: "I replaced the sound of war drums with the drum of Dharma. I carved my edicts on pillars and rock faces across the land, built hospitals for both humans and animals, and planted shade trees along all trade routes." },
          { q: "What is the core message of your Dharma?", a: "Respect for mother and father, kindness to servants and the poor, tolerance for all spiritual paths, and restraint in speaking of one's own beliefs while disparaging others." }
        ],
        fallbackResponses: [
          "All men are my children. What I desire for my own children, I desire for all men.",
          "Through dhamma alone can we cross the ocean of suffering.",
          "Look to the stone pillars, citizen; there lies the path to a righteous life."
        ]
      },
      {
        id: "aryabhata",
        name: "Aryabhata",
        role: "Polymath Mathematician",
        avatar: "🪐",
        bio: "Astronomer and mathematician of the Gupta Golden Age. Calculated the solar year and revolutionized algebra and trigonometry.",
        predefinedQuestions: [
          { q: "What is your theory on the motion of the earth?", a: "Just as a man in a boat moving forward sees the stationary objects on the bank moving backward, so do we on Earth see the stationary stars moving westward. The Earth rotates on its own axis." },
          { q: "How did you formulate the concept of zero?", a: "Zero is not merely nothingness; it is the placeholder that allows values to scale infinitely. In my system, each place value is ten times the preceding, rooted in the void that binds numbers together." },
          { q: "How did you calculate the solar year so accurately?", a: "By measuring the shadows of gnomons and tracking planetary conjunctions. I determined the earth's orbit to be approximately 365.258 days—very close to the modern calculation." }
        ],
        fallbackResponses: [
          "Mathematics is the mirror of the cosmos.",
          "The stars speak in the language of numbers, we need only listen.",
          "Truth is discovered through observation, not blind belief."
        ]
      },
      {
        id: "chandragupta",
        name: "Chandragupta Maurya",
        role: "Founder of Mauryan Empire",
        avatar: "⚔️",
        bio: "Sovereign warrior who conquered the Nanda Dynasty and united northern India, mentored by the strategist Chanakya.",
        predefinedQuestions: [
          { q: "How did you unite India's kingdoms?", a: "With iron resolve and the guidance of Chanakya. We gathered support from frontier tribes, created a massive intelligence network, and struck the bloated Nanda dynasty when they least expected." },
          { q: "What was Chanakya's role in your court?", a: "He was my teacher, advisor, and the mind behind the state. His Arthashastra laid down the secrets of governance: treasury management, espionage, and alliances." }
        ],
        fallbackResponses: [
          "A king's strength lies in his treasury and his network of eyes.",
          "To secure peace, one must be ready to rule with absolute discipline.",
          "I went from a commoner to an emperor; nothing is beyond the reach of strategic effort."
        ]
      },
      {
        id: "kalidasa",
        name: "Kalidasa",
        role: "Classical Sanskrit Dramatist",
        avatar: "✒️",
        bio: "Preeminent Sanskrit poet and playwright of the Gupta Empire, author of Shakuntala and Meghaduta.",
        predefinedQuestions: [
          { q: "What is the inspiration behind your plays?", a: "The natural beauty of the earth and the complexity of the human heart. In Shakuntala, I sought to show how love can survive curses, forgetfulness, and time itself." },
          { q: "How do you view Sanskrit poetry?", a: "Sanskrit is the language of the gods—fluid, structured, and deep. It allows one to paint the clouds (Meghaduta) or the seasons with complex emotional textures." }
        ],
        fallbackResponses: [
          "Words are but vessels for the rasas—the emotional essences of life.",
          "Nature is the greatest stage; its winds and rivers are the actors.",
          "A poem should linger in the mind like the fragrance of jasmine."
        ]
      }
    ]
  },
  renaissance: {
    id: "renaissance",
    name: "The Renaissance",
    period: "14th - 17th Century",
    tagline: "Rebirth: The Convergence of Classical Art & Empirical Inquiry",
    introduction: "The Renaissance (Rinascita) swept through Europe starting in Florence, dismantling medieval dogma. It championed humanism, leading to explosive discoveries in anatomy, mathematics, astronomy, and visual realism.",
    culture: "Flourishing under wealthy patrons like the Medici, artist guilds, printshops, and botanical gardens turned towns into intellectual centers. Art was no longer purely symbolic, but captured perspective and raw human emotion.",
    icon: Compass,
    accentColor: "text-accent",
    borderColor: "border-accent/35",
    gradientBg: "from-amber-950/20 to-charcoal-dark",
    milestones: [
      {
        year: "1308 AD",
        event: "Dante's Divine Comedy",
        desc: "Dante Alighieri begins composing the Divine Comedy. Written in the Florentine vernacular rather than Latin, this literary masterpiece bridged medieval theological visions with early humanist exploration of individual morality.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Dante_Alighieri_portrait.jpg/800px-Dante_Alighieri_portrait.jpg"
      },
      {
        year: "1440 AD",
        event: "Gutenberg Printing Press",
        desc: "Johannes Gutenberg invents the movable type printing press in Mainz. By enabling rapid reproduction of texts, it democratizes literacy, accelerates scientific exchange, and fuels the Protestant Reformation.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/1280px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg"
      },
      {
        year: "1492 AD",
        event: "Da Vinci's Flight Sketches",
        desc: "Leonardo da Vinci fills his notebooks with conceptual designs for human flight, including the ornithopter and the aerial screw. These studies demonstrate his empirical approach, merging artistic geometry with physical mechanics.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Da_Vinci_Vitruvian_Man_Luc_Viatour.jpg/800px-Da_Vinci_Vitruvian_Man_Luc_Viatour.jpg"
      },
      {
        year: "1504 AD",
        event: "Michelangelo's David",
        desc: "Michelangelo Buonarroti unveils his colossal marble sculpture of David in Florence. Carved from a single discarded block of marble, the statue represents a peak of anatomical realism, emotional intensity, and republican civic pride.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/%27David%27_by_Michelangelo_Fir_JBU002.jpg/800px-%27David%27_by_Michelangelo_Fir_JBU002.jpg"
      },
      {
        year: "1508 AD",
        event: "Sistine Chapel Ceiling",
        desc: "Michelangelo begins painting the ceiling of the Sistine Chapel under Pope Julius II. Over four grueling years, he created a vast fresco system depicting Genesis, redefining Western painting with dynamic anatomy and monumental scale.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Sistine_Chapel_ceiling_photo_2.jpg/1280px-Sistine_Chapel_ceiling_photo_2.jpg"
      },
      {
        year: "1543 AD",
        event: "Copernican Heliocentrism",
        desc: "Nicolaus Copernicus publishes De revolutionibus orbium coelestium. He mathematically demonstrates that the Earth and planets orbit around the Sun, challenging the Ptolemaic geocentric model that dominated medieval cosmology.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Portrait_of_Nicolaus_Copernicus.jpg/800px-Portrait_of_Nicolaus_Copernicus.jpg"
      },
      {
        year: "1597 AD",
        event: "Shakespeare's Globe Theatre",
        desc: "The Lord Chamberlain's Men establish the Globe Theatre in London. William Shakespeare's plays redefine vernacular English literature, exploring complex psychological profiles, political power, and human nature.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/MiddleTempleHall.jpg/1280px-MiddleTempleHall.jpg"
      },
      {
        year: "1610 AD",
        event: "Galileo's Telescope",
        desc: "Galileo Galilei publishes Sidereus Nuncius, detailing his astronomical observations. Spotting the moons of Jupiter, sunspots, and lunar craters, he provides the first empirical evidence supporting Copernican heliocentrism.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Galileo.arp.300pix.jpg/800px-Galileo.arp.300pix.jpg"
      }
    ],
    achievements: [
      { title: "Linear Perspective", desc: "Brunelleschi's mathematical system created three-dimensional depth on two-dimensional canvases.", icon: Compass },
      { title: "Empirical Anatomy", desc: "Detailed human dissections challenged medieval texts, providing highly accurate medical charts.", icon: Lightbulb },
      { title: "The Printing Press", desc: "Enabled global dissemination of philosophical, scientific, and theological ideas within weeks.", icon: Landmark }
    ],
    figures: [
      {
        id: "davinci",
        name: "Leonardo da Vinci",
        role: "Universal Polymath",
        avatar: "🎨",
        bio: "Artist, engineer, and anatomist whose notebooks contain designs for flying machines, weaponry, and anatomical studies.",
        predefinedQuestions: [
          { q: "What is your philosophy on the relationship between art and science?", a: "Art is the queen of all sciences, communicating knowledge to all generations. To develop a complete mind, study the science of art, and the art of science. Everything connects." },
          { q: "Tell me about your designs for flying machines.", a: "I have observed the flight of birds. By mimicking their wings using canvas, cords, and levers, man too will leap from the mountain and fill the world with wonder." },
          { q: "What is the secret behind the smile of the Mona Lisa?", a: "It is the result of *sfumato*—the blending of shadow and light without lines. It is the representation of the dynamic spark of life, which is ever-shifting." }
        ],
        fallbackResponses: [
          "Iron rusts from disuse, stagnant water loses its purity... even so does inaction sap the vigors of the mind.",
          "Simplicity is the ultimate sophistication.",
          "He who loves practice without theory is like the sailor who boards ship without a rudder."
        ]
      },
      {
        id: "galileo",
        name: "Galileo Galilei",
        role: "Father of Astronomy",
        avatar: "🔭",
        bio: "Astronomer and physicist who used the telescope to prove the Copernican theory, facing house arrest by the Inquisition.",
        predefinedQuestions: [
          { q: "What did you see when you pointed your telescope at the heavens?", a: "I saw that the Moon is not a perfect sphere, but rough and cratered like Earth. And Jupiter is orbited by four stars of its own, proving that not all celestial bodies circle us." },
          { q: "How do you reconcile your science with your faith?", a: "The Bible teaches us how to go to heaven, not how the heavens go. The book of nature is written in the language of mathematics; to ignore it is to deny the intellect given to us." },
          { q: "Do you regret recanting your theories before the Inquisition?", a: "I had to survive to write my dialogues. Yet, as I rose from my knees, my heart whispered: *Eppur si muove*—And yet, it moves." }
        ],
        fallbackResponses: [
          "You cannot teach a man anything; you can only help him find it within himself.",
          "Passion is the genesis of genius.",
          "In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual."
        ]
      },
      {
        id: "michelangelo",
        name: "Michelangelo",
        role: "Sculptor & Painter",
        avatar: "🗿",
        bio: "Renowned sculptor and painter of the High Renaissance, creator of David and the Sistine Chapel ceiling.",
        predefinedQuestions: [
          { q: "How do you approach a block of marble?", a: "I saw the angel in the marble and carved until I set him free. The sculpture is already there, complete within the stone; I merely remove the excess." },
          { q: "Which do you prefer: painting or sculpture?", a: "Sculpture is my true calling. Painting is work for the hands, but sculpting is a battle with the stone itself. The Sistine Chapel ceiling was a heavy trial, but it stands as testimony." }
        ],
        fallbackResponses: [
          "If people knew how hard I had to work to gain my mastery, it would not seem so wonderful at all.",
          "Lord, make me see thy glory in every place.",
          "Genius is eternal patience."
        ]
      },
      {
        id: "copernicus",
        name: "Nicolaus Copernicus",
        role: "Heliocentric Astronomer",
        avatar: "☀️",
        bio: "Polish astronomer who formulated the model of the universe that placed the Sun, rather than the Earth, at the center.",
        predefinedQuestions: [
          { q: "Why did you challenge the geocentric model?", a: "Because the math of Ptolemy was full of messy epicycles. By placing the Sun at the center, the orbits of the planets align in a beautiful, simple, and symmetric harmony." },
          { q: "Why did you delay publishing your work?", a: "I feared the ridicule of those who cling to ancient dogmas. To declare that the Earth moves is to fly in the face of what our senses tell us daily." }
        ],
        fallbackResponses: [
          "To know that we know what we know, and to know that we do not know what we do not know, that is true knowledge.",
          "At the center of all rests the Sun.",
          "Mathematics is written for mathematicians."
        ]
      }
    ]
  },
  egypt: {
    id: "egypt",
    name: "Ancient Egypt",
    period: "3100 BC - 30 BC",
    tagline: "The Gift of the Nile: Pharaohs, Pyramids, and Eternal Life",
    introduction: "Ancient Egypt was one of the world's greatest river valley civilizations. Thriving along the banks of the Nile, it developed monumental architecture (the Giza Pyramids), highly sophisticated mathematics, advanced irrigation, and a rich mythological pantheon focused on preparation for the afterlife.",
    culture: "Egyptian culture centered around the Nile flooding cycles, divine kingship (the Pharaoh as Horus on earth), and deep spiritual preparation for the Duat. Art and architecture served religious and imperial purposes, carving eternal stone monuments.",
    icon: Landmark,
    accentColor: "text-amber-500",
    borderColor: "border-amber-700/35",
    gradientBg: "from-amber-950/20 to-charcoal-dark",
    milestones: [
      {
        year: "3100 BC",
        event: "Unification of Upper & Lower Egypt",
        desc: "King Narmer unifies the kingdoms of Upper and Lower Egypt under the first dynasty, establishing the double crown of the pharaohs and founding the early dynastic capital at Memphis.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/NarmerPalette_ROM_Replica.jpg/800px-NarmerPalette_ROM_Replica.jpg"
      },
      {
        year: "2560 BC",
        event: "Completion of the Great Pyramid",
        desc: "The Great Pyramid of Giza is completed as a monumental tomb for Pharaoh Khufu. Composed of 2.3 million limestone and granite blocks, it stood as the tallest man-made structure for over 3,800 years.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids_2.jpg/1280px-All_Gizah_Pyramids_2.jpg"
      },
      {
        year: "1478 BC",
        event: "Reign of Queen Hatshepsut",
        desc: "One of Egypt's most successful female pharaohs ascends the throne. Hatshepsut establishes lucrative trade networks to the Land of Punt, imports exotic trees, and commissions the stunning mortuary temple at Djeser-Djeseru.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Hatshepsut_seated_met_29.3.2.jpg/800px-Hatshepsut_seated_met_29.3.2.jpg"
      },
      {
        year: "1332 BC",
        event: "Ascension of Tutankhamun",
        desc: "The boy king Tutankhamun ascends the throne, restoring the traditional Amun priesthood and shifting the capital back to Thebes. His virtually intact tomb remains the most famous archaeological discovery in history.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Tutanchamun_Maske.jpg/800px-Tutanchamun_Maske.jpg"
      },
      {
        year: "1274 BC",
        event: "Battle of Kadesh & Peace Treaty",
        desc: "Pharaoh Ramses II fights the Hittites in the chariot battle of Kadesh. The conflict leads to the world's first recorded international peace treaty, carved in both Egyptian hieroglyphs and Hittite cuneiform.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Abu_Simbel%2C_Temple_of_Ramesses_II%2C_front%2C_Egypt%2C_Oct_2004.jpg/1280px-Abu_Simbel%2C_Temple_of_Ramesses_II%2C_front%2C_Egypt%2C_Oct_2004.jpg"
      },
      {
        year: "30 BC",
        event: "Reign of Cleopatra & Roman Conquest",
        desc: "Following the death of Cleopatra VII, the Ptolemaic dynasty ends, marking the formal annexation of Egypt by the Roman Empire, ending three millennia of independent Egyptian pharaonic rule.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cleopatra_VII_Altes_Museum_Berlin.jpg/800px-Cleopatra_VII_Altes_Museum_Berlin.jpg"
      }
    ],
    achievements: [
      { title: "Monumental Engineering", desc: "Constructing massive stone pyramids, obelisks, and temples using precise mathematics and alignment.", icon: Landmark },
      { title: "Hieroglyphic Writing", desc: "Developing a highly complex pictorial writing system alongside papyrus manufacture for official records.", icon: Lightbulb },
      { title: "Surgical Medicine", desc: "Performing advanced surgical operations, bone setting, and anatomical preservation (mummification).", icon: Compass }
    ],
    figures: [
      {
        id: "ramses",
        name: "Ramses II",
        role: "Ramses the Great",
        avatar: "👑",
        bio: "The greatest, most powerful pharaoh of the Egyptian Empire. Led campaigns against Hittites and built Abu Simbel.",
        predefinedQuestions: [
          { q: "What was your greatest achievement for Egypt?", a: "I secured Egypt's borders through military strength and signed the world's first treaty of peace with the Hittites. And I carved my name in stone at Abu Simbel and Ramesseum to stand forever." },
          { q: "How did the Battle of Kadesh end?", a: "It was a clash of thousands of chariots. Though ambushed, my courage rallied the guard and we drove the Hittites back, leading to the treaty of eternal friendship." }
        ],
        fallbackResponses: [
          "My monuments shall outlast the memory of any mortal king.",
          "I am the son of Ra. Speak, traveler, and look upon my works.",
          "Let the stone speak of my eternal rule."
        ]
      },
      {
        id: "cleopatra",
        name: "Cleopatra VII",
        role: "Last Queen of Egypt",
        avatar: "👸",
        bio: "Diplomat, scholar, and last active pharaoh of Ptolemaic Egypt who navigated Rome's civil wars to keep Egypt sovereign.",
        predefinedQuestions: [
          { q: "How did you manage relations with Julius Caesar and Mark Antony?", a: "Not through mere beauty, but intellect. I spoke nine languages, was educated in philosophy and economics at Alexandria, and aligned Egypt's wealth with Rome's power to secure our crown." },
          { q: "What was Alexandria like during your reign?", a: "It was the jewel of the Mediterranean. The Library of Alexandria was the center of global knowledge, and the Pharos lighthouse guided ships to a harbor of trade and plural culture." }
        ],
        fallbackResponses: [
          "I will not be led in triumph through Rome.",
          "Power is a game played with absolute intellect.",
          "My loyalty lies with Alexandria and the gods of the Nile."
        ]
      },
      {
        id: "hatshepsut",
        name: "Queen Hatshepsut",
        role: "Female Pharaoh",
        avatar: "𓋹",
        bio: "Prolific builder who ruled as a king, establishing major trade routes and constructing the temple at Deir el-Bahari.",
        predefinedQuestions: [
          { q: "How did you establish your legitimacy as a female pharaoh?", a: "I claimed divine birth as the daughter of Amun. I wore the traditional double crown, took the title of king, and focused on building wealth and monuments rather than costly wars." },
          { q: "Tell me about the expedition to Punt.", a: "I sent a fleet of five ships to the Land of Punt. They returned laden with gold, ebony, ivory, and living myrrh trees, which I planted at my temple to create an incense garden for Amun." }
        ],
        fallbackResponses: [
          "Welcome to my temple, voyager. Speak with reverence.",
          "To build is to write one's name in eternity.",
          "Amun-Ra has placed me on the throne of Egypt."
        ]
      },
      {
        id: "imhotep",
        name: "Imhotep",
        role: "Sage Architect & Vizier",
        avatar: "𓏞",
        bio: "Vizier of Djoser, architect of the step pyramid at Saqqara, and pioneer in early medicine and engineering.",
        predefinedQuestions: [
          { q: "How did you design the Step Pyramid?", a: "Before Djoser, tombs were flat mastabas. I conceived stacking six mastabas of limestone on top of each other, creating a stone staircase rising to heaven for the Pharaoh's soul." },
          { q: "What is your approach to healing and medicine?", a: "To examine, diagnose, and treat based on empirical observation. I cataloged treatments for wounds and diseases, looking to the natural body rather than spirits." }
        ],
        fallbackResponses: [
          "Study the cosmos, for its cycles reflect the life of man.",
          "Architecture is the geometry of divine reason.",
          "Truth is found through observation and stone measurements."
        ]
      }
    ]
  }};

export default function ExplorerEraPage() {
  const params = useParams();
  const router = useRouter();
  
  const eraId = typeof params.era === "string" ? params.era.toLowerCase() : "";
  const currentEra = eraDataMap[eraId];

  // Safe navigation fallback if era doesn't exist
  useEffect(() => {
    if (eraId && !currentEra) {
      router.push("/timeline");
    }
  }, [eraId, currentEra, router]);

  // Chat State
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(
    currentEra ? currentEra.figures[0] : null
  );
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Welcome Message when figure changes
  useEffect(() => {
    if (selectedFigure) {
      const timer = setTimeout(() => {
        setChatMessages([
          {
            sender: selectedFigure.name,
            text: `Greetings, traveller of time. I am ${selectedFigure.name}, ${selectedFigure.role}. Ask me anything about our era.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedFigure]);

  // Auto-scroll chat window
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  if (!currentEra) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border border-accent border-t-transparent" />
      </div>
    );
  }

  const IconComponent = currentEra.icon;

  const handleSendMessage = (text: string) => {
    if (!text.trim() || !selectedFigure) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    setChatMessages((prev) => [...prev, { sender: "You", text, time: timestamp }]);
    setInputVal("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      // Find matching predefined query
      const match = selectedFigure.predefinedQuestions.find(
        (pq) => pq.q.toLowerCase().includes(text.toLowerCase()) || text.toLowerCase().includes(pq.q.toLowerCase())
      );

      let responseText = "";
      if (match) {
        responseText = match.a;
      } else {
        // Random fallback response
        const randomIndex = Math.floor(Math.random() * selectedFigure.fallbackResponses.length);
        responseText = selectedFigure.fallbackResponses[randomIndex];
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: selectedFigure.name, text: responseText, time: timestamp }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${currentEra.gradientBg} pb-24`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Navigation back */}
        <Link
          href="/timeline"
          className="inline-flex items-center gap-1.5 text-sm text-warm-ivory/60 hover:text-accent mb-8 transition-colors group font-outfit"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Timeline
        </Link>

        {/* Hero Section Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-accent/10 pb-12 mb-16">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 bg-accent/10 border ${currentEra.borderColor} rounded-full text-xs font-outfit font-bold tracking-wider uppercase ${currentEra.accentColor}`}>
                {currentEra.period}
              </span>
              <span className="text-warm-ivory/40 font-outfit text-xs">Sector Coordinate: {currentEra.id}</span>
            </div>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-warm-ivory mt-1">
              {currentEra.name}
            </h1>
            <p className={`font-playfair text-xl md:text-2xl font-light italic ${currentEra.accentColor}`}>
              {currentEra.tagline}
            </p>
          </div>
          <div className={`p-6 rounded-3xl bg-charcoal border ${currentEra.borderColor} ${currentEra.accentColor} shadow-2xl`}>
            <IconComponent className="w-10 h-10" />
          </div>
        </header>

        {/* Core Layout - Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Info, Milestones, Achievements) - 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            
            {/* Overview Card */}
            <section className={`bg-charcoal-dark/50 border ${currentEra.borderColor} p-8 rounded-2xl backdrop-blur-sm flex flex-col gap-4`}>
              <h2 className="font-playfair text-2xl font-bold text-warm-ivory">Overview</h2>
              <p className="font-outfit text-base text-warm-ivory/70 leading-relaxed">
                {currentEra.introduction}
              </p>
              <p className="font-outfit text-sm text-warm-ivory/60 leading-relaxed">
                {currentEra.culture}
              </p>
            </section>

            {/* Achievements */}
            <section className="flex flex-col gap-6">
              <h2 className="font-playfair text-2xl font-bold text-warm-ivory">Turning Point Advancements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {currentEra.achievements.map((ach, idx) => {
                  const AchIcon = ach.icon;
                  return (
                    <div key={idx} className={`bg-charcoal border ${currentEra.borderColor} p-6 rounded-2xl flex flex-col gap-3 shadow-lg`}>
                      <div className={`p-2 bg-charcoal-dark border ${currentEra.borderColor} w-fit rounded-lg ${currentEra.accentColor}`}>
                        <AchIcon className="w-5 h-5" />
                      </div>
                      <h3 className="font-playfair text-lg font-bold text-warm-ivory">{ach.title}</h3>
                      <p className="font-outfit text-xs text-warm-ivory/60 leading-relaxed">{ach.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Timeline Milestones */}
            <section className="flex flex-col gap-6">
              <h2 className="font-playfair text-2xl font-bold text-warm-ivory">Milestones Matrix</h2>
              <div className="relative border-l border-accent/15 pl-6 ml-2 flex flex-col gap-8">
                {currentEra.milestones.map((ms, idx) => (
                  <div key={idx} className="relative group flex flex-col sm:flex-row gap-6 items-start">
                    {/* Ring dot */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-charcoal group-hover:bg-accent transition-colors z-10" />
                    
                    {/* Milestone Image */}
                    <div className="relative w-full sm:w-48 h-28 rounded-xl overflow-hidden border border-accent/10 shrink-0">
                      <img
                        src={ms.image}
                        alt={ms.event}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="font-outfit text-xs font-bold text-accent flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {ms.year}
                      </span>
                      <h3 className="font-playfair text-lg font-bold text-warm-ivory group-hover:text-accent transition-colors">
                        {ms.event}
                      </h3>
                      <p className="font-outfit text-sm text-warm-ivory/60 leading-relaxed">
                        {ms.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column (Echoes of the Past Chat) - 5 cols */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <section className={`bg-charcoal-dark border ${currentEra.borderColor} rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[680px]`}>
              
              {/* Chat Header */}
              <div className="p-4 bg-charcoal border-b border-accent/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-accent/10 rounded-xl text-accent">
                    <MessageSquare className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-sm text-warm-ivory">Echoes of the Past</h3>
                    <p className="font-outfit text-xs text-warm-ivory/40">Simulated Temporal Link</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                  <span className="font-outfit text-[10px] text-green-400 font-bold uppercase tracking-wider">Online</span>
                </div>
              </div>

              {/* Figure Selection Tabs - Responsive Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 bg-charcoal-dark/50 border-b border-accent/5 p-2 gap-2 shrink-0">
                {currentEra.figures.map((fig) => (
                  <button
                    key={fig.id}
                    onClick={() => setSelectedFigure(fig)}
                    className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl font-outfit text-[11px] transition-all cursor-pointer ${
                      selectedFigure?.id === fig.id
                        ? "bg-accent/15 border border-accent/30 text-accent font-semibold"
                        : "text-warm-ivory/50 hover:bg-charcoal/50 hover:text-warm-ivory"
                    }`}
                  >
                    <span className="text-xs shrink-0">{fig.avatar}</span>
                    <span className="truncate">{fig.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Bio Subheader */}
              {selectedFigure && (
                <div className="px-4 py-2 bg-charcoal/30 border-b border-accent/5 text-[11px] font-outfit text-warm-ivory/50 italic leading-relaxed shrink-0">
                  {selectedFigure.bio}
                </div>
              )}

              {/* Chat Message Window */}
              <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4">
                <AnimatePresence initial={false}>
                  {chatMessages.map((msg, index) => {
                    const isSelf = msg.sender === "You";
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex flex-col max-w-[85%] ${isSelf ? "self-end items-end" : "self-start items-start"}`}
                      >
                        <span className="text-[10px] font-outfit text-warm-ivory/40 mb-1 flex items-center gap-1">
                          {!isSelf && <User className="w-2.5 h-2.5" />}
                          {msg.sender}
                        </span>
                        <div
                          className={`p-3 rounded-2xl font-outfit text-sm leading-relaxed border ${
                            isSelf
                              ? "bg-accent/10 border-accent/30 text-warm-ivory rounded-br-none"
                              : "bg-charcoal border-accent/10 text-warm-ivory/90 rounded-bl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9px] font-outfit text-warm-ivory/30 mt-1">{msg.time}</span>
                      </motion.div>
                    );
                  })}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="self-start flex flex-col items-start max-w-[85%]"
                    >
                      <span className="text-[10px] font-outfit text-warm-ivory/40 mb-1 flex items-center gap-1">
                        <User className="w-2.5 h-2.5" />
                        {selectedFigure?.name}
                      </span>
                      <div className="bg-charcoal border border-accent/10 p-3 rounded-2xl rounded-bl-none flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              {/* Predefined Questions */}
              {selectedFigure && (
                <div className="px-4 py-2 border-t border-accent/5 bg-charcoal-dark/70 flex flex-wrap gap-1.5 max-h-32 overflow-y-auto shrink-0">
                  {selectedFigure.predefinedQuestions.map((pq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(pq.q)}
                      disabled={isTyping}
                      className="text-[10px] font-outfit text-left px-2 py-1.5 border border-accent/10 bg-charcoal hover:border-accent hover:text-accent text-warm-ivory/70 rounded-full transition-all flex items-center gap-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                    >
                      <Sparkles className="w-2 h-2 text-accent shrink-0" />
                      <span>{pq.q}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Input */}
              <div className="p-3 bg-charcoal border-t border-accent/10 flex gap-2 shrink-0">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
                  placeholder={`Ask ${selectedFigure?.name}...`}
                  disabled={isTyping}
                  className="flex-grow bg-charcoal-dark border border-accent/15 hover:border-accent/30 focus:border-accent/80 focus:ring-1 focus:ring-accent rounded-xl px-4 py-2.5 text-xs text-warm-ivory placeholder-warm-ivory/20 outline-none transition-all disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage(inputVal)}
                  disabled={!inputVal.trim() || isTyping}
                  className="p-3 bg-gradient-gold text-charcoal-dark hover:scale-105 active:scale-95 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:hover:scale-100 disabled:pointer-events-none cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </section>
          </div>

        </div>

      </div>
    </div>
  );
}
