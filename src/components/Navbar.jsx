import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Project', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ activeSection }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if past top threshold
      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Auto-hide on scroll down, reveal on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling DOWN -> Hide
        setIsVisible(false);
      } else {
        // Scrolling UP -> Show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -110,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 sm:px-6 pt-4 pointer-events-none"
      >
        <div
          className={`pointer-events-auto w-full max-w-6xl flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-zinc-950/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]'
              : 'bg-zinc-900/60 backdrop-blur-md border border-white/5 shadow-lg'
          }`}
        >
          {/* Logo / Monogram HZA */}
          <a
            href="#home"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Helmi Zaki Athallah Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-brand-cyan/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:border-brand-cyan group-hover:scale-105 transition-all duration-300">
              <svg className="w-6 h-6" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path
                  d="M22 30 L22 70 M22 50 L42 50 M42 30 L42 70"
                  stroke="url(#navLogoGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 32 L74 32 L50 68 L74 68"
                  stroke="#00F0FF"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="82" cy="68" r="4" fill="#8B5CF6" />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-brand-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-brand-cyan transition-colors">
                HELMI ZAKI
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 -mt-0.5">
                ATHALLAH
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-zinc-900/60 rounded-xl border border-white/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/30"
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="relative hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-950 bg-gradient-to-r from-brand-cyan to-sky-400 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden p-5 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-white/10 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </a>
                );
              })}
              
              <div className="pt-3 mt-1 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-zinc-950 bg-brand-cyan rounded-xl shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Hire Me / Let's Talk</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

