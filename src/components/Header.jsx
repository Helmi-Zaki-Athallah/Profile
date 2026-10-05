import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import Magnetic from './Magnetic';
import { useBodyScrollLock } from '../hooks/useModalBehavior';

export default function Header({ activePage, onNavigate, onShowToast }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { language, toggleLanguage, setLanguage, t } = useLanguage();

  useBodyScrollLock(isMenuOpen, () => setIsMenuOpen(false));

  const navPages = [
    { index: '01', label: t.nav.home, key: 'home' },
    { index: '02', label: t.nav.project, key: 'project' },
    { index: '03', label: t.nav.about, key: 'about' },
    { index: '04', label: t.nav.resume, key: 'resume' },
    { index: '05', label: t.nav.contact, key: 'contact' },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageKey) => {
    onNavigate(pageKey);
    setIsMenuOpen(false);
  };

  const handleToggleLang = () => {
    const nextLang = language === 'id' ? 'en' : 'id';
    toggleLanguage();
    if (onShowToast) {
      onShowToast(
        nextLang === 'id' ? 'Bahasa diubah ke Bahasa Indonesia 🇮🇩' : 'Language switched to English 🇬🇧'
      );
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
        className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 md:px-12 py-5 flex items-center justify-between pointer-events-none"
      >
        {/* Left: Brand Logo with Magnetic Effect */}
        <Magnetic strength={0.2} className="pointer-events-auto">
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-1.5 focus:outline-none p-2 rounded-xl text-left cursor-pointer"
          >
            <span className="font-bebas text-2xl sm:text-3xl tracking-wider text-white group-hover:text-cobalt transition-colors">
              HELMI
            </span>
            <span className="font-bebas text-2xl sm:text-3xl tracking-wider text-zinc-300 group-hover:text-white transition-colors">
              ZAKI
            </span>
            <span className="font-bebas text-2xl sm:text-3xl tracking-wider text-zinc-400 group-hover:text-white transition-colors">
              ATHALLAH
            </span>
          </button>
        </Magnetic>

        {/* Right: Navigation Links, Translate Button & Mobile Menu Button */}
        <div className="flex items-center gap-3 sm:gap-6 pointer-events-auto">
          
          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-5">
            {navPages.map((item) => {
              const isActive = activePage === item.key;
              return (
                <Magnetic key={item.index} strength={0.25}>
                  <button
                    onClick={() => handleNavClick(item.key)}
                    className={`group flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider transition-colors px-2 py-1 cursor-pointer ${
                      isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono transition-colors ${
                        isActive ? 'text-cobalt font-bold' : 'text-zinc-500 group-hover:text-cobalt'
                      }`}
                    >
                      {item.index}
                    </span>
                    <span>{item.label}</span>
                    <span
                      className={`h-[1px] bg-cobalt transition-all duration-300 ${
                        isActive ? 'w-3' : 'w-0 group-hover:w-3'
                      }`}
                    />
                  </button>
                </Magnetic>
              );
            })}
          </nav>

          {/* Elegant Translate Button (Desktop & Tablet) */}
          <Magnetic strength={0.35}>
            <button
              onClick={handleToggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-cobalt text-xs font-mono transition-all duration-300 shadow-md group cursor-pointer backdrop-blur-md"
              title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              aria-label="Translate website"
            >
              {/* Globe Icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 text-cobalt group-hover:rotate-45 transition-transform duration-500"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>

              {/* Language Pill Switcher */}
              <div className="flex items-center gap-1">
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                    language === 'id'
                      ? 'bg-cobalt text-white shadow-sm'
                      : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}
                >
                  ID
                </span>
                <span className="text-zinc-600 text-[10px]">/</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                    language === 'en'
                      ? 'bg-cobalt text-white shadow-sm'
                      : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}
                >
                  EN
                </span>
              </div>
            </button>
          </Magnetic>

          {/* Mobile / Tablet Only: Magnetic Round Action Button (Toggles Drawer) */}
          <div className="flex lg:hidden">
            <Magnetic strength={0.45}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cobalt hover:bg-cobalt-hover text-white flex items-center justify-center shadow-[0_4px_25px_rgba(69,92,233,0.4)] hover:shadow-[0_6px_35px_rgba(69,92,233,0.6)] hover:scale-108 active:scale-95 transition-all duration-300 group focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                <div className="flex flex-col gap-1.5 items-center justify-center">
                  <span
                    className={`w-5 h-[2px] bg-white transition-transform duration-300 ${
                      isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''
                    }`}
                  />
                  <span
                    className={`w-5 h-[2px] bg-white transition-transform duration-300 ${
                      isMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''
                    }`}
                  />
                </div>
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Sliding Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop for tablet/mobile drawer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-y-0 right-0 w-full sm:w-[460px] z-50 bg-[#141419] text-white p-8 sm:p-12 flex flex-col justify-between shadow-2xl border-l border-zinc-800 overscroll-contain overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
              <span className="text-xs uppercase tracking-[3px] text-zinc-500 font-mono">
                {t.nav.menuTitle}
              </span>
              <Magnetic strength={0.3}>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors text-sm hover:rotate-90 duration-300 cursor-pointer"
                  aria-label="Close Drawer"
                >
                  ✕
                </button>
              </Magnetic>
            </div>

            {/* Mobile Drawer Language Switcher Banner */}
            <div className="my-3 p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-cobalt"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span className="text-xs font-mono text-zinc-300">
                  {language === 'id' ? 'Bahasa:' : 'Language:'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setLanguage('id');
                    if (onShowToast) onShowToast('Bahasa diubah ke Bahasa Indonesia 🇮🇩');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    language === 'id'
                      ? 'bg-cobalt text-white shadow-md'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  ID (Indonesia)
                </button>
                <button
                  onClick={() => {
                    setLanguage('en');
                    if (onShowToast) onShowToast('Language switched to English 🇬🇧');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-cobalt text-white shadow-md'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  EN (English)
                </button>
              </div>
            </div>

            {/* Menu Links for the 5 Pages */}
            <div className="flex flex-col gap-4 my-auto py-4">
              {navPages.map((item, idx) => {
                const isActive = activePage === item.key;
                return (
                  <motion.button
                    key={item.index}
                    onClick={() => handleNavClick(item.key)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.04, duration: 0.35 }}
                    className={`group flex items-baseline gap-4 text-3xl sm:text-4xl font-bebas tracking-wide text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'text-white translate-x-3'
                        : 'text-zinc-400 hover:text-white hover:translate-x-3'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono transition-colors ${
                        isActive ? 'text-cobalt font-bold' : 'text-zinc-600 group-hover:text-cobalt'
                      }`}
                    >
                      {item.index}
                    </span>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-cobalt ml-2 animate-pulse" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Drawer Footer Direct Info */}
            <div className="pt-6 border-t border-zinc-800 flex flex-col gap-2.5">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                {t.nav.directContact}
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-xs sm:text-sm font-mono text-zinc-300 hover:text-cobalt transition-colors truncate"
              >
                {personalInfo.email}
              </a>
              <div className="flex items-center gap-5 mt-2 text-xs text-zinc-400 font-mono">
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-105 transition-all">
                  LinkedIn
                </a>
                <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-105 transition-all">
                  Instagram
                </a>
                <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-105 transition-all">
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </>
        )}
      </AnimatePresence>
    </>
  );
}
