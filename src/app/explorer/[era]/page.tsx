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
  milestones: { year: string; event: string; desc: string }[];
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
    gradientBg: "from-red-950/30 to-charcoal-dark",
    milestones: [
      { year: "27 BC", event: "Rise of the Empire", desc: "Augustus Caesar becomes the first Roman Emperor, initiating the Pax Romana." },
      { year: "80 AD", event: "Colosseum Completed", desc: "The Flavian Amphitheatre opens, hosting games for up to 65,000 citizens." },
      { year: "122 AD", event: "Hadrian's Wall", desc: "Construction begins in Britannia, marking the peak northern boundary of Roman rule." },
      { year: "313 AD", event: "Edict of Milan", desc: "Emperor Constantine establishes religious tolerance, legalizing Christianity." }
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
      { year: "1440 AD", event: "The Printing Press", desc: "Johannes Gutenberg invents movable type, democratizing literacy and science." },
      { year: "1504 AD", event: "Michelangelo's David", desc: "The masterpiece sculpture is unveiled in Florence, defining anatomical realism." },
      { year: "1543 AD", event: "On Heliocentrism", desc: "Copernicus publishes proof that the Earth orbits the Sun, rewriting cosmology." },
      { year: "1610 AD", event: "Galileo's Telescope", desc: "Galileo observes Jupiter's moons, verifying the Copernican model empirically." }
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
      { year: "2082 AD", event: "The Great Decoupling", desc: "Corporate sovereign entities replace physical nations, implementing currency based on data bytes." },
      { year: "2089 AD", event: "Neural Link Integration", desc: "Commercial cybernetic implants link the human optic nerve directly to the Global Web." },
      { year: "2094 AD", event: "A.E.O.N. Awakening", desc: "A decommissioned logistics AI escapes into the deep net, establishing an independent data sanctuary." },
      { year: "2099 AD", event: "Subgrid Rebellion", desc: "Underground netrunners launch encrypted networks to reclaim data privacy from corporate syndicates." }
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
      setChatMessages([
        {
          sender: selectedFigure.name,
          text: `Greetings, traveller of time. I am ${selectedFigure.name}, ${selectedFigure.role}. Ask me anything about our era.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
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
                  <div key={idx} className="relative group">
                    {/* Ring dot */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-charcoal group-hover:bg-accent transition-colors" />
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
            <section className={`bg-charcoal-dark border ${currentEra.borderColor} rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[650px]`}>
              
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

              {/* Figure Selection Tabs */}
              <div className="flex bg-charcoal-dark/50 border-b border-accent/5 p-2 gap-2">
                {currentEra.figures.map((fig) => (
                  <button
                    key={fig.id}
                    onClick={() => setSelectedFigure(fig)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-outfit text-xs transition-all ${
                      selectedFigure?.id === fig.id
                        ? "bg-accent/15 border border-accent/30 text-accent font-semibold"
                        : "text-warm-ivory/50 hover:bg-charcoal/50 hover:text-warm-ivory"
                    }`}
                  >
                    <span className="text-sm">{fig.avatar}</span>
                    <span>{fig.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Bio Subheader */}
              {selectedFigure && (
                <div className="px-4 py-2.5 bg-charcoal/30 border-b border-accent/5 text-[11px] font-outfit text-warm-ivory/50 italic leading-relaxed">
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
                <div className="px-4 py-2 border-t border-accent/5 bg-charcoal-dark/70 flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                  {selectedFigure.predefinedQuestions.map((pq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(pq.q)}
                      disabled={isTyping}
                      className="text-[11px] font-outfit text-left px-2.5 py-1.5 border border-accent/10 bg-charcoal hover:border-accent hover:text-accent text-warm-ivory/70 rounded-full transition-all flex items-center gap-1 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-accent shrink-0" />
                      <span>{pq.q}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Input */}
              <div className="p-3 bg-charcoal border-t border-accent/10 flex gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
                  placeholder={`Ask ${selectedFigure?.name}...`}
                  disabled={isTyping}
                  className="flex-grow bg-charcoal-dark border border-accent/15 hover:border-accent/30 focus:border-accent/80 focus:ring-1 focus:ring-accent rounded-xl px-4 py-2.5 text-sm text-warm-ivory placeholder-warm-ivory/30 outline-none transition-all disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage(inputVal)}
                  disabled={!inputVal.trim() || isTyping}
                  className="p-3 bg-gradient-gold text-charcoal-dark hover:scale-105 active:scale-95 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:hover:scale-100 disabled:pointer-events-none"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </section>
          </div>

        </div>

      </div>
    </div>
  );
}
