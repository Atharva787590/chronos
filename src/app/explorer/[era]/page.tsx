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
        event: "Steampunk Foundation of Rome",
        desc: "Romulus and Remus construct early brass clockwork defense relays on the Palatine Hill, initiating Rome's legendary steam-powered defense grid to guard the nascent borders.",
        image: "https://images.unsplash.com/photo-1608447714925-599deeb5a682?q=80&w=800"
      },
      {
        year: "509 BC",
        event: "Pneumatic Senate Assembly",
        desc: "Tarquin the Proud is deposed, and the Senate instates a complex pneumatic message tube system across the Forum, allowing consuls to instantly cast brass-ballot votes.",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800"
      },
      {
        year: "27 BC",
        event: "Holographic Imperial Decree",
        desc: "Augustus Caesar projects the first giant golden holographic state-directive from the Senate roof, initiating the Pax Romana security protocol.",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800"
      },
      {
        year: "79 AD",
        event: "Thermal Energy Overload",
        desc: "Mount Vesuvius undergoes a catastrophic thermal energy overload, burying Pompeii in volcanic dust and freezing its mechanical clockwork streets in time.",
        image: "https://images.unsplash.com/photo-1461943890886-f6ba62b9a716?q=80&w=800"
      },
      {
        year: "80 AD",
        event: "Holographic Colosseum Battles",
        desc: "The Colosseum is fitted with dynamic light-emitting water projection plates, hosting full-scale glowing naval battle simulations and gladiator defense testing.",
        image: "https://images.unsplash.com/photo-1515542690899-7a450643db0e?q=80&w=800"
      },
      {
        year: "122 AD",
        event: "Hadrian's Chrono-Fortress",
        desc: "Construction begins on a 73-mile defensive wall in Britannia, fitted with signal towers and steam-powered signal horns to control the imperial frontier.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Hadrians_Wall_view_near_Greenhead_Lough.jpg/1280px-Hadrians_Wall_view_near_Greenhead_Lough.jpg"
      },
      {
        year: "313 AD",
        event: "Constantine's Solar Decree",
        desc: "Constantine legalizes Christianity, transmitting the message across the empire via reflective brass solar mirrors (heliographs) for synchronized reception.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Arch_of_Constantine_Rome.jpg/1280px-Arch_of_Constantine_Rome.jpg"
      },
      {
        year: "476 AD",
        event: "De-Synchronization of Rome",
        desc: "The central gear-clock of Ravenna is dismantled by Odoacer, causing the Western Empire to de-synchronize from the imperial network.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mausoleum_of_Theodoric_Ravenna.jpg/1280px-Mausoleum_of_Theodoric_Ravenna.jpg"
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
        event: "Pneumatic Sanitation Grid",
        desc: "Mohenjo-daro installs pressurized copper pneumatic water filtration tubes, creating the ancient world's finest municipal sanitation grid.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Mohenjodaro_Sindh.jpeg/1024px-Mohenjodaro_Sindh.jpeg"
      },
      {
        year: "1500 BC",
        event: "Phonetic Vocal Calculators",
        desc: "Sanskrit scholars program oral chants with mathematical syntax, serving as acoustic vocal data stores to preserve cosmological information.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Rig_Veda_MS2097.jpg/1024px-Rig_Veda_MS2097.jpg"
      },
      {
        year: "599 BC",
        event: "Ahimsa Harmonic Protocol",
        desc: "Mahavira codifies Jain philosophy, establishing the Ahimsa non-harming protocol to maintain biological harmony across all living organisms.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Dilwara_Temples.jpg/1280px-Dilwara_Temples.jpg"
      },
      {
        year: "563 BC",
        event: "Mind-State Synchronization",
        desc: "Gautama Buddha achieves full neural synchronization under the Bodhi Tree, mapping the Four Noble Truths to override human emotional suffering.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Mahabodhi_Temple_Bodh_Gaya.jpg/1280px-Mahabodhi_Temple_Bodh_Gaya.jpg"
      },
      {
        year: "322 BC",
        event: "Kautilya's Spy Network",
        desc: "Chandragupta Maurya and Chanakya establish a highly organized spy intelligence network using coded letters and secret optical signaling.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Chandragupta_Maurya.jpg/800px-Chandragupta_Maurya.jpg"
      },
      {
        year: "261 BC",
        event: "Dhamma Rock Transmitters",
        desc: "Ashoka carves his moral code onto rock pillars across India, turning pillars into permanent communication hubs for ethical instruction.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Vaishali_Ashoka_pillar.jpg/800px-Vaishali_Ashoka_pillar.jpg"
      },
      {
        year: "78 AD",
        event: "Silk Road Trading Hub",
        desc: "Kanishka unifies the transcontinental Silk Road, establishing copper currency standards and trade control outposts.",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800"
      },
      {
        year: "320 AD",
        event: "Sanskrit Golden Codex",
        desc: "Chandragupta I initiates the golden age of metallurgy, crafting the rust-free Delhi Iron Pillar as a metallurgical wonder.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Iron_pillar_of_Delhi.jpg/400px-Iron_pillar_of_Delhi.jpg"
      },
      {
        year: "499 AD",
        event: "Zero-Origin Calculation Gear",
        desc: "Aryabhata devises the gears-of-zero math system, proving the Earth's rotation and calculating planetary orbits with high precision.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800"
      },
      {
        year: "630 AD",
        event: "Nalanda Central Library",
        desc: "Nalanda reaches peak capacity, holding thousands of scrolls containing ancient treatises on logic, medicine, and mechanical calculations.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Nalanda_University_ruins1.JPG/1024px-Nalanda_University_ruins1.JPG"
      },
      {
        year: "757 AD",
        event: "Monolithic Basalt Excavation",
        desc: "Engineers carve the massive Kailash temple from the top-down out of a single basalt mountain, removing 200,000 tons of rock.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Ellora_cave_16_Kailasha_temple_panorama.jpg/1024px-Ellora_cave_16_Kailasha_temple_panorama.jpg"
      },
      {
        year: "1010 AD",
        event: "Granite Interlocking System",
        desc: "Chola builders lift an 81-ton monolithic dome to the top of a 216-foot tower, using mortar-free interlocking granite blocks.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Brihadisvara_Temple_Thanjavur.jpg/1280px-Brihadisvara_Temple_Thanjavur.jpg"
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
        event: "Vernacular Thought Codex",
        desc: "Dante codes the Divine Comedy in vernacular Italian, bypassing traditional Latin to democratize literature and human morality.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dante_Alighieri_by_Sandro_Botticelli.jpg/800px-Dante_Alighieri_by_Sandro_Botticelli.jpg"
      },
      {
        year: "1440 AD",
        event: "Steam-Press Movable Type",
        desc: "Gutenberg builds a high-pressure mechanical type-press, accelerating book production and democratizing knowledge distribution.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Buchdruck_im_15_Jh.jpg/800px-Buchdruck_im_15_Jh.jpg"
      },
      {
        year: "1492 AD",
        event: "Steam Flight Sketches",
        desc: "Leonardo da Vinci drafts mechanical blueprints for human flight, including gear systems for the ornithopter and aerial screw.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Leonardo_da_Vinci_helicopter.jpg/800px-Leonardo_da_Vinci_helicopter.jpg"
      },
      {
        year: "1504 AD",
        event: "Anatomical Marble Precision",
        desc: "Michelangelo chisels David with near-perfect biological accuracy, demonstrating the renaissance mastery of human geometry.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Michelangelo%27s_David_-_right_view_2.jpg/400px-Michelangelo%27s_David_-_right_view_2.jpg"
      },
      {
        year: "1508 AD",
        event: "Ceiling Fresco Matrix",
        desc: "Michelangelo paints the Sistine Chapel ceiling, creating a massive visual grid of Genesis using complex geometric perspectives.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/GodandAdamCutout.jpg/1280px-GodandAdamCutout.jpg"
      },
      {
        year: "1543 AD",
        event: "Heliocentric Orbit Model",
        desc: "Copernicus publishes his mathematical calculations placing the Sun at the center of the solar system, replacing geocentrism.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Nicolaus_Copernicus.jpg/800px-Nicolaus_Copernicus.jpg"
      },
      {
        year: "1597 AD",
        event: "Acoustic Globe Theatre",
        desc: "The Globe Theatre is constructed with wooden acoustic rings, maximizing sound projection for Shakespeare's deep human dramas.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Shakespeare_Globe_Theatre_London.jpg/1280px-Shakespeare_Globe_Theatre_London.jpg"
      },
      {
        year: "1610 AD",
        event: "Optic Focal Lens Observer",
        desc: "Galileo develops a double-lens optic spyglass, recording Jupiter's moons and providing empirical proof of heliocentrism.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Galileo_telescope.jpg/800px-Galileo_telescope.jpg"
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
        event: "Dynastic Border Merger",
        desc: "King Narmer unifies Upper and Lower Egypt under a single administrative grid, symbolized by the double-crown crown protocol.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Narmer_Palette_verso.jpg/400px-Narmer_Palette_verso.jpg"
      },
      {
        year: "2560 BC",
        event: "Solar Pyramid Accumulator",
        desc: "Pharaoh Khufu commissions the Great Pyramid of Giza, clad in white limestone to act as a colossal solar-focusing heat energy accumulator.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/1280px-Kheops-Pyramid.jpg"
      },
      {
        year: "1478 BC",
        event: "Punt Expedition Fleet",
        desc: "Hatshepsut launches a massive fleet of deep-sea cargo ships to Punt, returning with gold, ivory, and live incense trees.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Deir_el-Bahari_Hatshepsut_Temple.jpg/1280px-Deir_el-Bahari_Hatshepsut_Temple.jpg"
      },
      {
        year: "1332 BC",
        event: "Thebes Coordinate Reset",
        desc: "Tutankhamun resets the imperial capital back to Thebes, restoring traditional temple priesthood operations and structural grids.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tutankhamun_Mask.jpg/800px-Tutankhamun_Mask.jpg"
      },
      {
        year: "1274 BC",
        event: "The Kadesh Chronometer",
        desc: "Ramses II fights the Hittites in a massive chariot battle, leading to the world's first recorded international peace treaty, sealed inside a mechanical brass coordinate-box.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Abu_simbel_temple.jpg/1024px-Abu_simbel_temple.jpg"
      },
      {
        year: "30 BC",
        event: "Imperial Network Annexation",
        desc: "Cleopatra VII's reign concludes, and Egypt's agricultural breadbasket grid is annexed as a central province of the Roman Empire.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Kleopatra-VII.-Altes-Museum-Berlin1.jpg/800px-Kleopatra-VII.-Altes-Museum-Berlin1.jpg"
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
