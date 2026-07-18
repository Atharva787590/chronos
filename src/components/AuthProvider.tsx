"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Key, Mail, Sparkles, UserPlus, Lock, Compass, ArrowRight } from "lucide-react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  
  // Auth Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("chronos_user_email");
    if (savedEmail) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (isSignUpMode && !fullName.trim()) {
      setError("Please enter your name.");
      return;
    }

    setLoading(true);

    // Simulate database latency
    setTimeout(() => {
      localStorage.setItem("chronos_user_email", email);
      if (isSignUpMode) {
        localStorage.setItem("chronos_user_name", fullName);
      }
      setIsAuthenticated(true);
      setLoading(false);
    }, 1200);
  };

  // Skip loader state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border border-accent border-t-transparent" />
      </div>
    );
  }

  // If logged in, show site content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Else, show gatekeeper portal screen
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center relative overflow-hidden px-4 select-none">
      
      {/* Background Animated Neon Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/15 rounded-full filter blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full filter blur-[120px] animate-pulse [animation-delay:2s]" />

      <div className="w-full max-w-md z-10">
        
        {/* Logo / Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-10">
          <div className="p-4 bg-charcoal-dark border border-accent/20 rounded-3xl text-accent shadow-2xl animate-bounce">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="font-playfair text-4xl font-black text-warm-ivory tracking-widest uppercase">
            CHRONOS
          </h1>
          <p className="font-outfit text-sm text-warm-ivory/50">
            Secure Temporal Link Authority
          </p>
        </div>

        {/* Auth Box */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-charcoal-dark/50 border border-accent/15 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative"
        >
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full text-xs text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-outfit font-bold uppercase tracking-wider">Gatekeeper</span>
          </div>

          <h2 className="font-playfair text-2xl font-bold text-warm-ivory mb-2">
            {isSignUpMode ? "Create Temporal Node" : "Access Sector Gate"}
          </h2>
          <p className="font-outfit text-xs text-warm-ivory/50 mb-6 leading-relaxed">
            {isSignUpMode 
              ? "Register your email coordinates to begin traversing classical and future epochs."
              : "Verify your email ID to authorize temporal navigation channels."}
          </p>

          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
            
            {isSignUpMode && (
              <div className="flex flex-col gap-1.5">
                <label className="font-outfit text-xs text-warm-ivory/50 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-ivory/30">
                    <LogIn className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-charcoal border border-accent/15 focus:border-accent/80 focus:ring-1 focus:ring-accent rounded-xl pl-11 pr-4 py-3 text-xs text-warm-ivory placeholder-warm-ivory/20 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="font-outfit text-xs text-warm-ivory/50 uppercase tracking-widest">Email ID Address</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-ivory/30">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-charcoal border border-accent/15 focus:border-accent/80 focus:ring-1 focus:ring-accent rounded-xl pl-11 pr-4 py-3 text-xs text-warm-ivory placeholder-warm-ivory/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-outfit text-xs text-warm-ivory/50 uppercase tracking-widest">Access Passkey</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-ivory/30">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-charcoal border border-accent/15 focus:border-accent/80 focus:ring-1 focus:ring-accent rounded-xl pl-11 pr-4 py-3 text-xs text-warm-ivory placeholder-warm-ivory/20 outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-outfit text-red-400 bg-red-950/20 border border-red-800/30 p-3 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-gold text-charcoal-dark font-outfit text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-charcoal-dark border-t-transparent rounded-full animate-spin" />
              ) : isSignUpMode ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Register Temporal Node</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Authorize Access</span>
                </>
              )}
            </button>

          </form>

          {/* Mode Switcher */}
          <div className="mt-6 pt-6 border-t border-accent/10 text-center">
            <button
              onClick={() => {
                setIsSignUpMode(!isSignUpMode);
                setError("");
              }}
              className="font-outfit text-xs text-accent hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              {isSignUpMode ? (
                <>
                  <span>Already registered? Sign In instead</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Create a new temporal identity node</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

        </motion.div>

        {/* Trust Note */}
        <p className="text-center font-outfit text-[10px] text-warm-ivory/30 mt-6 max-w-xs mx-auto">
          Authorization link secure. Credentials stored locally in client-side temporal caches.
        </p>

      </div>
    </div>
  );
}
