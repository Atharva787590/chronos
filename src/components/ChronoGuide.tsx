"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, HelpCircle, Compass, Landmark, Cpu, Sparkles } from "lucide-react";

interface GuideQARecord {
  keywords: string[];
  response: string;
}

const guideDatabase: GuideQARecord[] = [
  {
    keywords: ["how to use", "help", "guide", "navigation", "instructions"],
    response: "Welcome to Chronos! 🧭\n\n1. **Portal (Home)**: Interactive landing featuring the 3D Hourglass. Drag to orbit the model.\n2. **Timeline**: Scroll downward to traverse a continuous horizontal time stream of 18 milestones.\n3. **Explorer**: Choose an era, inspect key milestones with historical images, and converse with 4 different figures per era using the simulated chat client on the right.\n4. **Gallery**: Visit the Relic Museum to interact with WebGL 3D models (laurel wreath, astrolabe, memory core, and silver coin)."
  },
  {
    keywords: ["timeline", "scroll", "horizontal"],
    response: "The Timeline (/timeline) is a custom horizontal scrolling rail of 34 milestones. Scroll vertically on your mouse wheel or swipe up/down on trackpads to slide the timeline left and right through classical history up to Ancient Egypt."
  },
  {
    keywords: ["figure", "figures", "chat", "talk", "converse", "speak"],
    response: "You can interact with simulated historical figures in the **Explorer Hub** (/explorer/[era]). Click the figure's tab at the top of the chat client (we have 4 figures per era, total of 16 characters!), then choose a predefined query or type your own question in the input box!"
  },
  {
    keywords: ["relic", "relics", "model", "3d", "inspect", "gallery", "museum"],
    response: "Visit the **Relic Museum** (/gallery). You can left-click and drag directly on any relic box to rotate the 3D model. Move your cursor over the model to speed up its rotation. Click 'Inspect Technical Data' to view dimensions, weights, and descriptions."
  },
  {
    keywords: ["rome", "roman", "caesar", "aurelius", "seneca", "augustus"],
    response: "The **Ancient Rome** era features 4 figures:\n- **Julius Caesar**: General & Dictator\n- **Marcus Aurelius**: Philosopher Emperor\n- **Augustus Caesar**: First Roman Emperor\n- **Seneca**: Stoic philosopher & writer\n\nThe representative relic is **The Augustus Laurel** (27 BC)."
  },
  {
    keywords: ["india", "indian", "ashoka", "aryabhata", "saffron", "maurya", "chandragupta", "kalidasa", "harappa", "chola"],
    response: "The **Ancient & Medieval India** era features 4 figures:\n- **Emperor Ashoka**: Dharmaraja promoter of peace\n- **Aryabhata**: Polymath mathematician of zero\n- **Chandragupta Maurya**: Warrior unifier of India\n- **Kalidasa**: Master Sanskrit dramatist\n\nThe representative relic is **The Maurya Silver Coin** (260 BC)."
  },
  {
    keywords: ["renaissance", "galileo", "davinci", "astronomy", "florence", "michelangelo", "copernicus"],
    response: "The **Renaissance** era features 4 figures:\n- **Leonardo da Vinci**: Universal Polymath\n- **Galileo Galilei**: Father of Astronomy\n- **Michelangelo**: Master Sculptor & Painter\n- **Nicolaus Copernicus**: Heliocentric Astronomer\n\nThe representative relic is **The Galileo Astrolabe** (1598 AD)."
  },
  {
    keywords: ["egypt", "pyramid", "pharaoh", "ramses", "cleopatra", "ankh", "horus", "tutankhamun", "hatshepsut"],
    response: "The **Ancient Egypt** era features 4 figures:\n- **Ramses II**: The Great Builder Pharaoh\n- **Cleopatra VII**: Intellectual Queen & Diplomat\n- **Queen Hatshepsut**: Prolific Female Pharaoh\n- **Imhotep**: Sage Architect & Father of Medicine\n\nThe representative relic is **The Golden Ankh of Ra** (1274 BC)."
  },
  {
    keywords: ["signin", "sign in", "login", "register", "auth", "account"],
    response: "Click the **Sign In** button on the navbar. You can authenticate using mock SSO logins (Google, GitHub) or type in credentials to sync your custom profile coordinate."
  },
  {
    keywords: ["search"],
    response: "Use the search bar on the left of the navbar. Start typing any keyword (like 'Ashoka', 'Astrolabe', or 'Rome') to see instant matching coordinates. Click any result to fly directly to that era or page!"
  }
];

export default function ChronoGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "Guide",
      text: "Greetings, voyager! I am the **Chrono-Guide**, your positive temporal assistant. Ask me how to use the app or inquire about any historical sector!"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "You", text }]);
    setInputVal("");

    const query = text.toLowerCase();
    
    // Find matching keyword in guide database
    const matchedRecord = guideDatabase.find((record) =>
      record.keywords.some((keyword) => query.includes(keyword) || keyword.includes(query))
    );

    setTimeout(() => {
      if (matchedRecord) {
        setMessages((prev) => [
          ...prev,
          { sender: "Guide", text: matchedRecord.response }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "Guide",
            text: "My temporal archives are strictly calibrated to the historical records of Rome, India, the Renaissance, and Ancient Egypt. I cannot extrapolate beyond these coordinates. Ask me about our eras, figures, 3D relics, or how to navigate the app!"
          }
        ]);
      }
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 bg-gradient-gold hover:scale-105 active:scale-95 rounded-full shadow-2xl transition-all cursor-pointer glow-gold relative group"
          aria-label="Ask Chrono-Guide"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <X className="w-6 h-6 text-charcoal-dark" />
            ) : (
              <MessageSquare className="w-6 h-6 text-charcoal-dark animate-pulse" />
            )}
          </AnimatePresence>
          {!isOpen && (
            <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-charcoal-dark text-accent text-[10px] font-outfit font-bold uppercase tracking-wider py-1.5 px-3 rounded-full border border-accent/20 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              Chrono-Guide Active
            </span>
          )}
        </button>
      </div>

      {/* Floating Guide Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col z-50 glow-gold"
          >
            {/* Header */}
            <div className="p-4 bg-charcoal border-b border-accent/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-accent/10 rounded-lg text-accent">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-playfair font-bold text-xs text-warm-ivory">Chrono-Guide</h4>
                  <p className="font-outfit text-[9px] text-warm-ivory/40 uppercase tracking-widest">Temporal Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-accent/10 border border-accent/25 px-2 py-0.5 rounded-full text-[10px] text-accent font-bold">
                <Sparkles className="w-3 h-3" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Quick Questions Grid */}
            <div className="p-3 bg-charcoal-dark/40 border-b border-accent/5 flex flex-wrap gap-1.5 overflow-x-auto shrink-0 max-h-24 font-outfit">
              <button
                onClick={() => handleSendMessage("How to use timeline?")}
                className="text-[10px] font-outfit border border-accent/10 hover:border-accent bg-charcoal hover:bg-accent/10 text-warm-ivory/80 hover:text-accent px-2.5 py-1 rounded-full transition-all flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>How to use timeline?</span>
              </button>
              <button
                onClick={() => handleSendMessage("How to talk to figures?")}
                className="text-[10px] font-outfit border border-accent/10 hover:border-accent bg-charcoal hover:bg-accent/10 text-warm-ivory/80 hover:text-accent px-2.5 py-1 rounded-full transition-all flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Talk to figures?</span>
              </button>
              <button
                onClick={() => handleSendMessage("How to inspect 3D relics?")}
                className="text-[10px] font-outfit border border-accent/10 hover:border-accent bg-charcoal hover:bg-accent/10 text-warm-ivory/80 hover:text-accent px-2.5 py-1 rounded-full transition-all flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Inspect 3D relics?</span>
              </button>
              <button
                onClick={() => handleSendMessage("Tell me about India era")}
                className="text-[10px] font-outfit border border-accent/10 hover:border-accent bg-charcoal hover:bg-accent/10 text-warm-ivory/80 hover:text-accent px-2.5 py-1 rounded-full transition-all flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3 animate-pulse text-amber-500" />
                <span className="text-amber-400">Indian History?</span>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4 bg-charcoal-dark/20">
              {messages.map((msg, idx) => {
                const isGuide = msg.sender === "Guide";
                return (
                  <div key={idx} className={`flex flex-col max-w-[85%] ${isGuide ? "self-start items-start" : "self-end items-end"}`}>
                    <span className="text-[9px] font-outfit text-warm-ivory/30 mb-0.5">{msg.sender}</span>
                    <div
                      className={`p-3 rounded-2xl text-xs font-outfit leading-relaxed border whitespace-pre-line ${
                        isGuide
                          ? "bg-charcoal border-accent/10 text-warm-ivory rounded-bl-none"
                          : "bg-accent/10 border-accent/20 text-warm-ivory rounded-br-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-charcoal border-t border-accent/15 flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
                placeholder="Ask Chrono-Guide..."
                className="flex-grow bg-charcoal-dark border border-accent/15 focus:border-accent rounded-xl px-3 py-2 text-xs text-warm-ivory placeholder-warm-ivory/20 outline-none transition-all"
              />
              <button
                onClick={() => handleSendMessage(inputVal)}
                disabled={!inputVal.trim()}
                className="p-2.5 bg-gradient-gold text-charcoal-dark rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
