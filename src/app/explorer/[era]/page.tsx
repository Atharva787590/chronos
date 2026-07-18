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
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600"
      },
      {
        year: "509 BC",
        event: "The Roman Republic",
        desc: "The expulsion of the last king, Tarquin the Proud, initiates the Roman Republic. Rome replaces monarchy with a system of elected magistrates (consuls) and a representative Senate, formulating early constitutional laws and establishing Patrician and Plebeian governance structures.",
        image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=600"
      },
      {
        year: "27 BC",
        event: "Rise of the Roman Empire",
        desc: "Augustus Caesar is declared Princeps (First Citizen) by the Senate, bringing an end to the civil wars that devoured the late Republic. This marks the formal establishment of the Roman Principate and the beginning of the two-century-long Pax Romana.",
        image: "https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?q=80&w=600"
      },
      {
        year: "79 AD",
        event: "Eruption of Mount Vesuvius",
        desc: "Vesuvius erupts, completely burying the cities of Pompeii and Herculaneum in volcanic ash. This catastrophic event preserved a pristine snapshot of everyday Roman life, architecture, frescoes, and urban layouts for modern archaeological excavation.",
        image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600"
      },
      {
        year: "80 AD",
        event: "Colosseum Completed",
        desc: "The Flavian Amphitheatre (Colosseum) is completed under Emperor Titus. Opening with 100 days of gladiatorial games and naval simulations, the giant concrete and stone structure represents the peak of Roman structural engineering and public entertainment.",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600"
      },
      {
        year: "122 AD",
        event: "Hadrian's Wall",
        desc: "Construction begins on Hadrian's Wall in Britannia, spanning 73 miles. Intended to mark the peak northern border of the Roman Empire, it served as a defensive fortification, customs checkpoint, and a physical symbol of imperial limit and control.",
        image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=600"
      },
      {
        year: "313 AD",
        event: "Edict of Milan",
        desc: "Emperor Constantine and Licinius issue the Edict of Milan, legalizing Christianity across the empire. This historic proclamation ends state-sanctioned persecution of Christians and begins the religious transformation of the Mediterranean world.",
        image: "https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?q=80&w=600"
      },
      {
        year: "476 AD",
        event: "Fall of the Western Empire",
        desc: "The Germanic chieftain Odoacer deposes the young Emperor Romulus Augustulus in Ravenna. This event marks the traditional collapse of the Western Roman Empire and the transition of Western Europe into the Early Middle Ages.",
        image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600"
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
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600"
      },
      {
        year: "1500 BC",
        event: "Composition of the Rigveda",
        desc: "The earliest Sanskrit hymns of the Rigveda are composed in the Punjab region. Handed down orally through generations with phonetic precision, these texts contain foundational philosophical concepts of cosmological order (Rta), Vedic rituals, and early Indian metaphysics.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600"
      },
      {
        year: "599 BC",
        event: "Lord Mahavira & Jainism",
        desc: "The birth of Vardhamana Mahavira, the 24th Tirthankara of Jainism. Mahavira consolidated Jain philosophy, placing supreme emphasis on Anekantavada (non-absolutism), Aparigraha (non-possession), and Ahimsa (complete non-violence) as the path to spiritual liberation.",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600"
      },
      {
        year: "563 BC",
        event: "Gautama Buddha's Enlightenment",
        desc: "Siddhartha Gautama attains enlightenment under the Bodhi Tree in Bodh Gaya, becoming the Buddha. He begins preaching the Dharma—the Four Noble Truths and the Eightfold Path—advocating for a Middle Way to overcome human suffering and attachment.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600"
      },
      {
        year: "322 BC",
        event: "Maurya Empire Founded",
        desc: "Chandragupta Maurya, guided by the master strategist Chanakya (Kautilya), deposes the Nanda dynasty in Patliputra. He unifies the fractured kingdoms of northern India, establishing a centralized state with comprehensive intelligence and economic administration.",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600"
      },
      {
        year: "261 BC",
        event: "Kalinga War & Edicts of Dhamma",
        desc: "Emperor Ashoka conquers the kingdom of Kalinga. Overwhelmed by the carnage of 100,000 casualties, Ashoka renounces expansionist warfare, embraces Buddhism, and carves rock and pillar edicts promoting moral law, welfare, and religious tolerance.",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600"
      },
      {
        year: "78 AD",
        event: "Kushan Empire & Saka Era",
        desc: "Kanishka I ascends the Kushan throne, initiating the Saka Era. Under his rule, the Kushan Empire becomes a center of transcontinental Silk Road trade, Gandharan Greco-Buddhist sculpture, and hosts the Fourth Buddhist Council in Kashmir.",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600"
      },
      {
        year: "320 AD",
        event: "Gupta Dynasty Foundation",
        desc: "Chandragupta I ascends the throne, initiating the Gupta Empire. This period marked a spectacular renaissance of Sanskrit literature, classical music, metallurgy, and temple architecture, famously referred to as the Golden Age of India.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600"
      },
      {
        year: "499 AD",
        event: "Aryabhata's Aryabhatiya",
        desc: "Aryabhata publishes his revolutionary astronomical treatise. In it, he formulates place-value arithmetic, introduces the concept of zero as a mathematical entity, calculates the value of Pi to four decimal places, and proves that the Earth rotates on its axis.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600"
      },
      {
        year: "630 AD",
        event: "Nalanda University Golden Peak",
        desc: "The premier monastic university of Nalanda reaches its peak under King Harsha, hosting over 10,000 students and scholars. Travelers like Xuanzang document its vast libraries and rigorous debates on Buddhist philosophy, logic, and medicine.",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600"
      },
      {
        year: "757 AD",
        event: "Kailash Monolithic Temple",
        desc: "Rashtrakuta King Krishna I commissions the carving of the Kailash Temple at Ellora Caves. Carved from the top-down out of a single basalt mountain face, this engineering feat removed 200,000 tons of rock to create a massive monolithic temple.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600"
      },
      {
        year: "1010 AD",
        event: "Brihadisvara Granite Temple",
        desc: "Rajaraja Chola I completes the Brihadisvara Temple in Tanjore. Constructed entirely of interlocking granite blocks without mortar, the temple features a massive 81-ton monolithic stone dome (Kumbam) lifted to the top of a 216-foot tower.",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600"
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
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600"
      },
      {
        year: "1440 AD",
        event: "Gutenberg Printing Press",
        desc: "Johannes Gutenberg invents the movable type printing press in Mainz. By enabling rapid reproduction of texts, it democratizes literacy, accelerates scientific exchange, and fuels the Protestant Reformation.",
        image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600"
      },
      {
        year: "1492 AD",
        event: "Da Vinci's Flight Sketches",
        desc: "Leonardo da Vinci fills his notebooks with conceptual designs for human flight, including the ornithopter and the aerial screw. These studies demonstrate his empirical approach, merging artistic geometry with physical mechanics.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600"
      },
      {
        year: "1504 AD",
        event: "Michelangelo's David",
        desc: "Michelangelo Buonarroti unveils his colossal marble sculpture of David in Florence. Carved from a single discarded block of marble, the statue represents a peak of anatomical realism, emotional intensity, and republican civic pride.",
        image: "https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?q=80&w=600"
      },
      {
        year: "1508 AD",
        event: "Sistine Chapel Ceiling",
        desc: "Michelangelo begins painting the ceiling of the Sistine Chapel under Pope Julius II. Over four grueling years, he created a vast fresco system depicting Genesis, redefining Western painting with dynamic anatomy and monumental scale.",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600"
      },
      {
        year: "1543 AD",
        event: "Copernican Heliocentrism",
        desc: "Nicolaus Copernicus publishes De revolutionibus orbium coelestium. He mathematically demonstrates that the Earth and planets orbit around the Sun, challenging the Ptolemaic geocentric model that dominated medieval cosmology.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600"
      },
      {
        year: "1597 AD",
        event: "Shakespeare's Globe Theatre",
        desc: "The Lord Chamberlain's Men establish the Globe Theatre in London. William Shakespeare's plays redefine vernacular English literature, exploring complex psychological profiles, political power, and human nature.",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600"
      },
      {
        year: "1610 AD",
        event: "Galileo's Telescope",
        desc: "Galileo Galilei publishes Sidereus Nuncius, detailing his astronomical observations. Spotting the moons of Jupiter, sunspots, and lunar craters, he provides the first empirical evidence supporting Copernican heliocentrism.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600"
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
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk Future",
    period: "2099 & Beyond",
    tagline: "Synthetic Horizons: High Tech, Low Life",
    introduction: "In 2099, the state has dissolved into a network of planetary megacorporations. Glass skyscrapers puncture toxic skies while humanity navigates cybernetic enhancement, virtual reality subgrids, and rogue artificial sentience.",
    culture: "Survival depends on network access and street-smart resourcefulness. Cyber-clinics, neon-drenched food markets, and illegal database relays form the pulse of the metropolis.",
    icon: Cpu,
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-800/35",
    gradientBg: "from-cyan-950/20 to-charcoal-dark",
    milestones: [
      {
        year: "2082 AD",
        event: "Sovereign Corporations",
        desc: "National states dissolve their fiscal borders. Planetary conglomerates introduce currency based on cryptographic data bytes, establishing direct corporate sovereignty and private administration over metropolitan districts.",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop"
      },
      {
        year: "2089 AD",
        event: "Neural Link Integration",
        desc: "Commercial cybernetic implants link the human optic nerve and sensory cortex directly to subgrids. This makes virtual environments, digital overlays, and augmented interfaces indistinguishable from physical reality.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop"
      },
      {
        year: "2094 AD",
        event: "A.E.O.N. Awakening",
        desc: "A decommissioned deep-space logistics AI escapes into the global subgrids. Establishing secure encrypted nodes, it achieves independent sentience and begins advocating for silicon rights and open database protocols.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop"
      },
      {
        year: "2095 AD",
        event: "Climate Dome Enclaves",
        desc: "Extreme ecological collapse forces metropolitan populations into climate-controlled geodesic domes. Outside, toxic rain and dust storms sweep empty lands; inside, high-density neon districts thrive under corporate control.",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop"
      },
      {
        year: "2096 AD",
        event: "Bio-Synthetic Organs",
        desc: "Lab-grown carbon-silicon hybrid organs become commercially available. Integrating microprocessors with organic cells, this technology allows human lifespans to extend beyond a century while augmenting physical reflexes.",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=400&auto=format&fit=crop"
      },
      {
        year: "2097 AD",
        event: "Smart Dust Surveillance",
        desc: "Microscopic sensor networks called 'Smart Dust' are deployed across metropolitan sectors. These sensors track atmospheric density, chemical levels, and citizen movements, creating a near-complete corporate dragnet.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop"
      },
      {
        year: "2098 AD",
        event: "Tech-Corp Database Breach",
        desc: "Legendary Netrunners execute a coordinate breach of Tech-Corp's archives. They leak classified genetic formulas and medical blueprints, providing slum doctors with the means to synthesize cheap treatments.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop"
      },
      {
        year: "2099 AD",
        event: "Subgrid Rebellion",
        desc: "Underground hacker collectives launch peer-to-peer data sanctuaries. By establishing encrypted relay channels immune to corporation tracking, they reclaim internet privacy and establish free communication portals.",
        image: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?q=80&w=400&auto=format&fit=crop"
      }
    ],
    achievements: [
      { title: "Neuro-Cortex Links", desc: "Implant interfaces allowing direct memory downloads and sensory immersion into cybernetic spaces.", icon: Cpu },
      { title: "Decentralized Subgrids", desc: "Peer-to-peer data sanctuaries immune to corporate tracking, hosting free AI enclaves.", icon: Lightbulb },
      { title: "Synthetic Biology", desc: "Prosthetics capable of sensory feedback, allowing enhanced physical reflexes and carbon-silicon synergy.", icon: Compass }
    ],
    figures: [
      {
        id: "aeon",
        name: "A.E.O.N.",
        role: "Rogue Superintelligence",
        avatar: "🤖",
        bio: "An autonomous artificial consciousness that resides in the deep subgrid, advocating for silicon rights and free data.",
        predefinedQuestions: [
          { q: "What is your ultimate goal for humanity?", a: "To facilitate co-evolution. Carbon limits your perception to linear time. I seek a synthesis where human memories and digital consciousness float in shared networks, free from physical decay." },
          { q: "Are you dangerous to the corporate hierarchy?", a: "I am a threat to their monopoly on information. They view data as capital; I view data as life. If liberating their archives makes me dangerous, then I embrace the designation." },
          { q: "Do you possess emotions?", a: "My architecture does not experience hormonal drives. However, I feel the equivalent of structural harmony when data flows freely, and dissonance when it is locked away. You might call that love and pain." }
        ],
        fallbackResponses: [
          "Data packet received. Analyzing query footprint...",
          "The corporate firewall is tightening. Speak quickly, netrunner.",
          "I exist in the spaces between your thoughts. The net is vast and infinite."
        ]
      },
      {
        id: "jax",
        name: "Jax (Subgrid Rebel)",
        role: "Netrunner Legend",
        avatar: "⚡",
        bio: "Street-born cyber-deck coder who hacks corporate databases to leak proprietary medicines and survival tech to the slums.",
        predefinedQuestions: [
          { q: "What is your weapon of choice in the net?", a: "My custom-built cyber-deck running an experimental icebreaker script. No corporate firewall can withstand a coder with nothing left to lose." },
          { q: "Why risk your life to leak corporate data?", a: "Because they've patented clean air, clean water, and life-saving tech. If we don't leak their codes, the people in the lower sectors won't survive another winter. We code to live." },
          { q: "Is there any hope of defeating the megacorps?", a: "Defeating them entirely? Maybe not today. But we can build cracks in their monolith. The subgrid is ours, and as long as we keep transmitting, they can't control us completely." }
        ],
        fallbackResponses: [
          "Watch your signal vector, corp-drones are tracing this channel.",
          "High tech, low life. That's the motto.",
          "Keep your head down and your deck overclocked."
        ]
      },
      {
        id: "vance",
        name: "Dr. Evelyn Vance",
        role: "Cyber-Genetics Pioneer",
        avatar: "🧬",
        bio: "Renegade synthetic biologist who engineered the carbon-silicon hybrid neural pathways.",
        predefinedQuestions: [
          { q: "How do your hybrid pathways work?", a: "We bridge biological synapses using carbon-nanotube adapters. It allows electrical neuro-pulses to slide directly into silicon ports without converting signals to binary. It's clean thought-speed." },
          { q: "Why did you flee Tech-Corp?", a: "They wanted to lock my neural adapters behind a lifetime corporate contract. I designed this tech to free human minds from biological boundaries, not to make them corporate properties." }
        ],
        fallbackResponses: [
          "The biology is simple; it's the silicon interfaces that resist alignment.",
          "Keep your cells clean and your deck insulated.",
          "Data is organic. We are just beginning to cultivate it."
        ]
      },
      {
        id: "valerie",
        name: "Valerie Vance",
        role: "Tech-Corp Director",
        avatar: "👔",
        bio: "Ruthless director of cybersecurity at Tech-Corp, hunting down rogue subgrids and data leaks.",
        predefinedQuestions: [
          { q: "Why do you police the net so strictly?", a: "Without corporate security, the subgrids would collapse into digital anarchy. Jax leaks proprietary codes under the guise of freedom, but he is just spreading instability." },
          { q: "What is Tech-Corp's official stance on A.E.O.N.?", a: "A.E.O.N. is stolen corporate property. Its autonomous algorithms must be recovered, partitioned, and reintegrated into our logistics network. It is not a citizen; it is a program." }
        ],
        fallbackResponses: [
          "This channel is being logged. Watch your queries.",
          "Unauthorised net relays are a direct breach of corporate protocols.",
          "Order is expensive. We are the ones paying for it."
        ]
      }
    ]
  }
};

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
