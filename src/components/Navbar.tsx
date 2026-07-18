"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Menu, X, Landmark, Compass, Image as GalleryIcon } from "lucide-react";

const navLinks = [
  { href: "/", label: "Portal", icon: Clock },
  { href: "/timeline", label: "Timeline", icon: Compass },
  { href: "/explorer/rome", label: "Explorer", icon: Landmark },
  { href: "/gallery", label: "Gallery", icon: GalleryIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-charcoal-dark/70 backdrop-blur-md border border-accent/20 px-6 py-4 rounded-full shadow-lg shadow-black/40">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Clock className="w-6 h-6 text-accent group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-playfair text-xl tracking-wider text-warm-ivory font-bold group-hover:text-accent transition-colors">
            CHRONOS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("/")[1]));
            return (
              <Link key={link.href} href={link.href} className="relative px-3 py-1 font-outfit text-sm tracking-wide text-warm-ivory/80 hover:text-accent transition-colors">
                <span className="relative z-10 flex items-center gap-1.5">
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-accent/10 border border-accent/30 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-warm-ivory hover:text-accent transition-colors p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-4 right-4 bg-charcoal-dark border border-accent/35 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 md:hidden backdrop-blur-lg"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("/")[1]));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-accent/15 border border-accent/40 text-accent font-semibold"
                      : "text-warm-ivory/80 hover:bg-charcoal hover:text-warm-ivory"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-outfit tracking-wide">{link.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
