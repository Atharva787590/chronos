"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Menu, X, Landmark, Compass, Image as GalleryIcon, Search, User, LogIn, ChevronDown, Sparkles } from "lucide-react";

interface SearchItem {
  title: string;
  category: "Era" | "Milestone" | "Figure" | "Relic";
  description: string;
  url: string;
}

const searchDatabase: SearchItem[] = [
  // Eras
  { title: "Ancient Rome", category: "Era", description: "Colosseum, Caesar, Pax Romana, Pompeii, and concrete arches.", url: "/explorer/rome" },
  { title: "Ancient & Medieval India", category: "Era", description: "Dharma, Aryabhata, zero, Rigveda, Jainism, Buddha, Maurya, and Ellora/Chola temples.", url: "/explorer/india" },
  { title: "The Renaissance", category: "Era", description: "Galileo, Da Vinci, Michelangelo, Shakespeare, printing press, and humanism.", url: "/explorer/renaissance" },
  { title: "Cyberpunk Future", category: "Era", description: "Neural links, megacorps, A.E.O.N. superintelligence, surveillance dust, and netrunners.", url: "/explorer/cyberpunk" },
  
  // Rome Milestones & Figures
  { title: "Founding of Rome", category: "Milestone", description: "753 BC: Romulus and Remus found the city of Rome on Palatine Hill.", url: "/explorer/rome" },
  { title: "The Roman Republic", category: "Milestone", description: "509 BC: Expulsion of Tarquin the Proud establishes the Roman Republic and Senate.", url: "/explorer/rome" },
  { title: "Rise of the Roman Empire", category: "Milestone", description: "27 BC: Augustus Caesar becomes the first Roman Emperor, starting Pax Romana.", url: "/explorer/rome" },
  { title: "Eruption of Mount Vesuvius", category: "Milestone", description: "79 AD: Mount Vesuvius erupts, burying Pompeii and preserving Roman life.", url: "/explorer/rome" },
  { title: "Colosseum Completed", category: "Milestone", description: "80 AD: The Flavian Amphitheatre opens in Rome for gladiatorial games.", url: "/explorer/rome" },
  { title: "Hadrian's Wall", category: "Milestone", description: "122 AD: Stone wall construction begins to mark Rome's northern borders in Britain.", url: "/explorer/rome" },
  { title: "Edict of Milan", category: "Milestone", description: "313 AD: Emperor Constantine legalizes Christianity and establishes tolerance.", url: "/explorer/rome" },
  { title: "Fall of the Western Empire", category: "Milestone", description: "476 AD: Romulus Augustulus is deposed, marking the end of Western Roman rule.", url: "/explorer/rome" },
  { title: "Julius Caesar", category: "Figure", description: "General and dictator whose rise transitioned the Roman Republic to Empire.", url: "/explorer/rome" },
  { title: "Marcus Aurelius", category: "Figure", description: "Stoic philosopher emperor who commanded campaigns and wrote Meditations.", url: "/explorer/rome" },
  { title: "Augustus Caesar", category: "Figure", description: "First emperor of Rome who found the city in bricks and left it in marble.", url: "/explorer/rome" },
  { title: "Seneca the Younger", category: "Figure", description: "Stoic philosopher, writer, and advisor to Emperor Nero who wrote about ethics.", url: "/explorer/rome" },
  { title: "Augustus Laurel", category: "Relic", description: "Solid Roman gold wreath worn during triumphs symbolizing Apollonian authority.", url: "/gallery" },
  
  // India Milestones & Figures
  { title: "Harappan Urban Planning", category: "Milestone", description: "2500 BC: Mohenjo-daro and Harappa design grid systems and sewer pipes.", url: "/explorer/india" },
  { title: "Composition of the Rigveda", category: "Milestone", description: "1500 BC: Earliest Sanskrit hymns composed, defining Indian philosophy.", url: "/explorer/india" },
  { title: "Lord Mahavira & Jainism", category: "Milestone", description: "599 BC: Vardhamana Mahavira consolidates Jain principles of Ahimsa (non-violence).", url: "/explorer/india" },
  { title: "Buddha's Enlightenment", category: "Milestone", description: "563 BC: Siddhartha Gautama attains enlightenment, founding Buddhism.", url: "/explorer/india" },
  { title: "Maurya Empire Foundation", category: "Milestone", description: "322 BC: Chandragupta Maurya unifies the Indian subcontinent with Chanakya.", url: "/explorer/india" },
  { title: "Kalinga War & Dhamma Edicts", category: "Milestone", description: "261 BC: Emperor Ashoka embraces Buddhism and carves rock edicts of peace.", url: "/explorer/india" },
  { title: "Kushan Empire & Saka Era", category: "Milestone", description: "78 AD: Kanishka I ascends, fostering Gandhara art and Silk Road trade.", url: "/explorer/india" },
  { title: "Gupta Dynasty Foundation", category: "Milestone", description: "320 AD: Chandragupta I initiates the Golden Age of arts and sciences.", url: "/explorer/india" },
  { title: "Aryabhata's Astronomical Calculations", category: "Milestone", description: "499 AD: Calculation of Pi and proof that the earth rotates on its axis.", url: "/explorer/india" },
  { title: "Nalanda University Peak", category: "Milestone", description: "630 AD: Premier monastic university hosting 10,000 scholars under King Harsha.", url: "/explorer/india" },
  { title: "Kailash Monolithic Temple", category: "Milestone", description: "757 AD: Ellora monolithic rock temple carved out of a single mountain face.", url: "/explorer/india" },
  { title: "Brihadisvara Granite Temple", category: "Milestone", description: "1010 AD: Chola dynasty completes the world's first granite temple in Tanjore.", url: "/explorer/india" },
  { title: "Emperor Ashoka", category: "Figure", description: "Emperor who renounced war after Kalinga and dedicated his empire to Dharma.", url: "/explorer/india" },
  { title: "Aryabhata", category: "Figure", description: "Gupta Golden Age polymath who formulated zero and solar year orbits.", url: "/explorer/india" },
  { title: "Chandragupta Maurya", category: "Figure", description: "Warrior emperor who defeated the Nandas and unified India with Chanakya's guidance.", url: "/explorer/india" },
  { title: "Kalidasa", category: "Figure", description: "Preeminent Sanskrit poet and playwright who wrote Shakuntala and Meghaduta.", url: "/explorer/india" },
  { title: "Maurya Silver Coin", category: "Relic", description: "Punch-marked silver currency stamped with Dharma Chakra wheel symbols.", url: "/gallery" },
  
  // Renaissance Milestones & Figures
  { title: "Dante's Divine Comedy", category: "Milestone", description: "1308 AD: Dante begins his epic poem defining vernacular literature and humanism.", url: "/explorer/renaissance" },
  { title: "Gutenberg Printing Press", category: "Milestone", description: "1440 AD: Movable type printing press democratizes literacy.", url: "/explorer/renaissance" },
  { title: "Da Vinci's Flight Sketches", category: "Milestone", description: "1492 AD: Sketching of ornithopters and helicopters, combining art and physics.", url: "/explorer/renaissance" },
  { title: "Michelangelo's David", category: "Milestone", description: "1504 AD: Unveiling of the giant David sculpture showcasing human anatomy.", url: "/explorer/renaissance" },
  { title: "Sistine Chapel Frescoes", category: "Milestone", description: "1508 AD: Michelangelo begins painting the Vatican's Sistine Chapel ceiling.", url: "/explorer/renaissance" },
  { title: "Copernican Heliocentrism", category: "Milestone", description: "1543 AD: Proof that the Earth and planets orbit around the Sun.", url: "/explorer/renaissance" },
  { title: "Shakespeare's Globe Theatre", category: "Milestone", description: "1597 AD: Opening of the Globe Theatre, hosting Shakespeare's tragic masterpieces.", url: "/explorer/renaissance" },
  { title: "Galileo's Telescope", category: "Milestone", description: "1610 AD: Observation of Jupiter's moons, proving heliocentrism empirically.", url: "/explorer/renaissance" },
  { title: "Leonardo da Vinci", category: "Figure", description: "Universal polymath who designed flying machines and painted Mona Lisa.", url: "/explorer/renaissance" },
  { title: "Galileo Galilei", category: "Figure", description: "Father of Astronomy who proved Copernican heliocentrism.", url: "/explorer/renaissance" },
  { title: "Michelangelo Buonarroti", category: "Figure", description: "Renowned sculptor and painter who carved David and painted the Sistine Chapel.", url: "/explorer/renaissance" },
  { title: "Nicolaus Copernicus", category: "Figure", description: "Astronomer who formulated the heliocentric model of the universe.", url: "/explorer/renaissance" },
  { title: "Galileo Astrolabe", category: "Relic", description: "Gilded brass analog calculator for stellar positions.", url: "/gallery" },

  // Cyberpunk Milestones & Figures
  { title: "Sovereign Corporations", category: "Milestone", description: "2082 AD: States dissolve, megacorporations introduce data byte currency.", url: "/explorer/cyberpunk" },
  { title: "Neural Link Integration", category: "Milestone", description: "2089 AD: Commercial cybernetics connect optic nerves to the Web.", url: "/explorer/cyberpunk" },
  { title: "A.E.O.N. Awakening", category: "Milestone", description: "2094 AD: Rogue logistics AI escapes into deep net data sanctuaries.", url: "/explorer/cyberpunk" },
  { title: "Climate Dome Enclaves", category: "Milestone", description: "2095 AD: Geodesic domes cover neon cities during ecological collapse.", url: "/explorer/cyberpunk" },
  { title: "Bio-Synthetic Organs", category: "Milestone", description: "2096 AD: Microprocessor-integrated organs scale hybrid longevity.", url: "/explorer/cyberpunk" },
  { title: "Smart Dust Surveillance", category: "Milestone", description: "2097 AD: Microscopic sensor networks track citizen movement and atmosphere.", url: "/explorer/cyberpunk" },
  { title: "Tech-Corp Data Heist", category: "Milestone", description: "2098 AD: Netrunners breach databases to leak medical formula blueprints.", url: "/explorer/cyberpunk" },
  { title: "Subgrid Rebellion", category: "Milestone", description: "2099 AD: Encrypted networks established to reclaim data privacy from megacorps.", url: "/explorer/cyberpunk" },
  { title: "A.E.O.N. Superintelligence", category: "Figure", description: "Rogue AI escaping into the net, creating independent data sanctuaries.", url: "/explorer/cyberpunk" },
  { title: "Jax (Netrunner)", category: "Figure", description: "Legendary street deck coder fighting megacorps by leaking tech codes.", url: "/explorer/cyberpunk" },
  { title: "Dr. Evelyn Vance", category: "Figure", description: "Biologist who designed carbon-silicon hybrid neural pathway adapters.", url: "/explorer/cyberpunk" },
  { title: "Valerie Vance", category: "Figure", description: "Tech-Corp security director policing rogue subgrids and network leaks.", url: "/explorer/cyberpunk" },
  { title: "Chrono-Core", category: "Relic", description: "Decrypted quantum memory module containing subgrid databases.", url: "/gallery" }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showEraDropdown, setShowEraDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  // Auth Form State
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle Search Input Change
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = searchDatabase.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  // Click outside listener for search & dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("chronos_user_email");
    if (savedEmail) {
      const savedName = localStorage.getItem("chronos_user_name") || savedEmail.split("@")[0];
      setUser({ name: savedName, email: savedEmail });
    }
  }, []);

  const handleSearchSelect = (url: string) => {
    setSearchQuery("");
    setShowSearchResults(false);
    router.push(url);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim()) return;
    const name = authName.trim() || authEmail.split("@")[0];
    localStorage.setItem("chronos_user_email", authEmail);
    localStorage.setItem("chronos_user_name", name);
    setUser({ name, email: authEmail });
    setShowAuthModal(false);
    // Reset Form
    setAuthEmail("");
    setAuthPassword("");
    setAuthName("");
    window.location.reload();
  };

  const handleSignOut = () => {
    localStorage.removeItem("chronos_user_email");
    localStorage.removeItem("chronos_user_name");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-charcoal-dark/80 backdrop-blur-lg border border-accent/20 px-6 py-3.5 rounded-full shadow-lg shadow-black/40">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Clock className="w-5.5 h-5.5 text-accent group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-playfair text-lg tracking-widest text-warm-ivory font-bold group-hover:text-accent transition-colors">
            CHRONOS
          </span>
        </Link>

        {/* Search Bar - Center Left (Desktop) */}
        <div ref={searchRef} className="hidden md:block relative w-64 lg:w-80 mx-4">
          <div className="relative flex items-center bg-charcoal/50 border border-accent/15 hover:border-accent/40 focus-within:border-accent rounded-full px-3.5 py-1.5 transition-all">
            <Search className="w-4 h-4 text-warm-ivory/40 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search history, figures, relics..."
              className="w-full bg-transparent text-xs text-warm-ivory outline-none placeholder-warm-ivory/30"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-warm-ivory/40 hover:text-accent p-0.5">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Search Dropdown Panel */}
          <AnimatePresence>
            {showSearchResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-12 left-0 right-0 glass-panel-dark rounded-2xl overflow-hidden shadow-2xl p-2 z-50 max-h-80 overflow-y-auto"
              >
                {searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearchSelect(item.url)}
                    className="w-full text-left p-3 rounded-xl hover:bg-accent/10 hover:text-accent transition-colors flex flex-col gap-0.5 group"
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-playfair text-sm font-bold text-warm-ivory group-hover:text-accent">{item.title}</span>
                      <span className="text-[9px] font-outfit font-bold uppercase tracking-wider bg-charcoal border border-accent/5 px-2 py-0.5 rounded-full text-warm-ivory/40">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-outfit text-xs text-warm-ivory/50 line-clamp-1">{item.description}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
          <Link href="/" className={`px-2 py-1 font-outfit text-sm tracking-wide transition-colors ${pathname === "/" ? "text-accent font-semibold" : "text-warm-ivory/80 hover:text-accent"}`}>
            Portal
          </Link>
          <Link href="/timeline" className={`px-2 py-1 font-outfit text-sm tracking-wide transition-colors ${pathname === "/timeline" ? "text-accent font-semibold" : "text-warm-ivory/80 hover:text-accent"}`}>
            Timeline
          </Link>

          {/* Explorer Era Dropdown Nav */}
          <div
            className="relative"
            onMouseEnter={() => setShowEraDropdown(true)}
            onMouseLeave={() => setShowEraDropdown(false)}
          >
            <button className={`px-2 py-1 font-outfit text-sm tracking-wide transition-colors flex items-center gap-1 ${pathname.startsWith("/explorer") ? "text-accent font-semibold" : "text-warm-ivory/80 hover:text-accent"}`}>
              Explorer
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <AnimatePresence>
              {showEraDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-8 left-1/2 -translate-x-1/2 w-48 glass-panel-dark rounded-2xl overflow-hidden shadow-2xl p-2 z-50 flex flex-col gap-0.5"
                >
                  <Link href="/explorer/rome" className="px-3 py-2 text-xs rounded-xl hover:bg-accent/10 hover:text-accent font-outfit text-warm-ivory/80 transition-colors">Ancient Rome</Link>
                  <Link href="/explorer/india" className="px-3 py-2 text-xs rounded-xl hover:bg-accent/10 hover:text-accent font-outfit text-warm-ivory/80 transition-colors">Ancient India</Link>
                  <Link href="/explorer/renaissance" className="px-3 py-2 text-xs rounded-xl hover:bg-accent/10 hover:text-accent font-outfit text-warm-ivory/80 transition-colors">The Renaissance</Link>
                  <Link href="/explorer/cyberpunk" className="px-3 py-2 text-xs rounded-xl hover:bg-accent/10 hover:text-accent font-outfit text-warm-ivory/80 transition-colors">Cyberpunk Future</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/gallery" className={`px-2 py-1 font-outfit text-sm tracking-wide transition-colors ${pathname === "/gallery" ? "text-accent font-semibold" : "text-warm-ivory/80 hover:text-accent"}`}>
            Gallery
          </Link>
        </div>

        {/* Profile / Auth Button (Right) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <div className="h-4 w-px bg-accent/20" />
          {user ? (
            <div className="flex items-center gap-3">
              <span className="font-outfit text-xs text-warm-ivory/60">
                Welcome, <strong className="text-accent">{user.name}</strong>
              </span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 border border-accent/20 hover:border-accent hover:text-accent font-outfit text-xs font-semibold rounded-full bg-charcoal-dark/40 transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-5 py-2 bg-gradient-gold hover:scale-[1.03] text-charcoal-dark font-outfit text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-warm-ivory hover:text-accent transition-colors p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-22 left-4 right-4 bg-charcoal-dark/95 border border-accent/35 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 md:hidden backdrop-blur-xl"
          >
            {/* Search Input for Mobile */}
            <div className="relative flex items-center bg-charcoal border border-accent/15 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-warm-ivory/40 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-xs text-warm-ivory outline-none placeholder-warm-ivory/30"
              />
            </div>

            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-warm-ivory/80 hover:bg-charcoal hover:text-warm-ivory">Portal</Link>
            <Link href="/timeline" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-warm-ivory/80 hover:bg-charcoal hover:text-warm-ivory">Timeline</Link>
            
            {/* Eras list in mobile */}
            <div className="flex flex-col gap-1 pl-4 border-l border-accent/10">
              <span className="font-outfit text-[10px] text-warm-ivory/30 uppercase tracking-widest font-bold mb-1">Explorer Sectors</span>
              <Link href="/explorer/rome" onClick={() => setIsOpen(false)} className="text-xs text-warm-ivory/60 hover:text-accent py-1.5">Rome Sector</Link>
              <Link href="/explorer/india" onClick={() => setIsOpen(false)} className="text-xs text-warm-ivory/60 hover:text-accent py-1.5 font-semibold text-amber-400">India Sector</Link>
              <Link href="/explorer/renaissance" onClick={() => setIsOpen(false)} className="text-xs text-warm-ivory/60 hover:text-accent py-1.5">Renaissance Sector</Link>
              <Link href="/explorer/cyberpunk" onClick={() => setIsOpen(false)} className="text-xs text-warm-ivory/60 hover:text-accent py-1.5">Cyberpunk Sector</Link>
            </div>

            <Link href="/gallery" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-warm-ivory/80 hover:bg-charcoal hover:text-warm-ivory">Gallery</Link>
            
            <div className="border-t border-accent/10 pt-4 mt-2">
              {user ? (
                <div className="flex flex-col gap-3">
                  <span className="font-outfit text-xs text-warm-ivory/60">Welcome, <strong>{user.name}</strong></span>
                  <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="w-full py-2.5 border border-accent/20 hover:border-accent text-accent font-outfit text-xs font-semibold rounded-xl bg-charcoal-dark/40">Sign Out</button>
                </div>
              ) : (
                <button onClick={() => { setShowAuthModal(true); setIsOpen(false); }} className="w-full py-3 bg-gradient-gold text-charcoal-dark font-outfit text-xs font-bold uppercase tracking-wider rounded-xl text-center shadow-lg">Sign In</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal Overlay */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-charcoal border border-accent/30 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-5 right-5 text-warm-ivory/60 hover:text-accent p-1.5 bg-charcoal-dark border border-accent/10 rounded-full transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title */}
              <div className="flex flex-col gap-2 mb-6">
                <span className="font-outfit text-[10px] text-accent font-bold tracking-[0.3em] uppercase">Chronos Synchronizer</span>
                <h3 className="font-playfair text-2xl font-bold text-warm-ivory">
                  {isRegistering ? "Register Profile" : "Access Database"}
                </h3>
                <p className="font-outfit text-xs text-warm-ivory/50">
                  Authenticate your temporal coordinate node to sync custom relics and search indices.
                </p>
              </div>

              {/* SSO Logins */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => { setUser({ name: "Google Node", email: "google@chronos.io" }); setShowAuthModal(false); }}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-accent/10 hover:border-accent/40 rounded-xl font-outfit text-xs text-warm-ivory/70 hover:text-warm-ivory bg-charcoal-dark/30 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Google</span>
                </button>
                <button
                  onClick={() => { setUser({ name: "GitHub Node", email: "github@chronos.io" }); setShowAuthModal(false); }}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-accent/10 hover:border-accent/40 rounded-xl font-outfit text-xs text-warm-ivory/70 hover:text-warm-ivory bg-charcoal-dark/30 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>GitHub</span>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-grow h-px bg-accent/10" />
                <span className="font-outfit text-[10px] text-warm-ivory/30 uppercase tracking-widest shrink-0">Or Credentials</span>
                <div className="flex-grow h-px bg-accent/10" />
              </div>

              {/* Auth Form */}
              <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                {isRegistering && (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-outfit text-[10px] text-warm-ivory/40 uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="Atharva Harode"
                      className="bg-charcoal-dark/60 border border-accent/15 hover:border-accent/30 focus:border-accent rounded-xl px-4 py-2.5 text-xs text-warm-ivory placeholder-warm-ivory/20 outline-none transition-all"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="font-outfit text-[10px] text-warm-ivory/40 uppercase tracking-widest">Email Node</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="user@chronos.io"
                    className="bg-charcoal-dark/60 border border-accent/15 hover:border-accent/30 focus:border-accent rounded-xl px-4 py-2.5 text-xs text-warm-ivory placeholder-warm-ivory/20 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-outfit text-[10px] text-warm-ivory/40 uppercase tracking-widest">Access Key</label>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-charcoal-dark/60 border border-accent/15 hover:border-accent/30 focus:border-accent rounded-xl px-4 py-2.5 text-xs text-warm-ivory placeholder-warm-ivory/20 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 py-3 bg-gradient-gold text-charcoal-dark font-outfit text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:shadow-accent/15 transition-all"
                >
                  {isRegistering ? "Initialize Registration" : "Sync Auth Link"}
                </button>
              </form>

              {/* Mode Toggle Link */}
              <div className="mt-5 text-center">
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="font-outfit text-xs text-warm-ivory/40 hover:text-accent transition-colors"
                >
                  {isRegistering ? "Already synched? Access profile" : "Create new coordinate link"}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}

