import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Copy,
  Check,
  ArrowUp,
  Clock,
  MapPin,
  Heart,
  Github,
  Linkedin,
  Instagram,
  Sparkles,
  Zap
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ onShowToast }) {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  // Live WIB clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(now.toLocaleTimeString('id-ID', options) + ' WIB (GMT+7)');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    onShowToast('Email berhasil disalin ke clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-24 pb-12 px-4 sm:px-6 bg-zinc-950 overflow-hidden text-zinc-300">
      {/* Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Big Typography Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-brand-cyan/30 text-brand-cyan text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET'S CREATE SOMETHING EXTRAORDINARY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.08] mb-8">
            LET'S BUILD SOMETHING <br />
            <span className="bg-gradient-to-r from-brand-cyan via-sky-400 to-brand-purple bg-clip-text text-transparent">
              IMPACTFUL TOGETHER
            </span>
          </h2>

          {/* Interactive Copy Email Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-2xl backdrop-blur-xl max-w-lg w-full">
            <div className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-mono text-zinc-300 flex-grow">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              <span>{personalInfo.email}</span>
            </div>

            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-brand-cyan to-sky-400 hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-t border-b border-white/5">
          
          {/* Col 1: Identity */}
          <div className="md:col-span-2 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan font-bold font-mono">
                HZA
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Helmi Zaki Athallah</h4>
                <p className="text-xs text-zinc-400 font-mono">Universitas Pamulang &bull; Teknik Elektro</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed mb-4">
              Pengembangan website bisnis, company profile, dan e-commerce berbasis WordPress, Elementor, serta aplikasi antarmuka modern React.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-2.5">
            <h5 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
              Navigasi Cepat
            </h5>
            {['Home', 'About', 'Resume', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs sm:text-sm text-zinc-400 hover:text-brand-cyan transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Col 3: Live Local Status */}
          <div className="flex flex-col gap-3">
            <h5 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
              Live Time &amp; Lokasi
            </h5>
            
            <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
              <Clock className="w-4 h-4 text-brand-cyan" />
              <span>{time || 'Loading WIB...'}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <MapPin className="w-4 h-4 text-brand-purple" />
              <span>Tangerang Selatan, Indonesia</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <Zap className="w-4 h-4" />
              <span>Open for Projects &amp; Collaboration</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} Helmi Zaki Athallah (HZA). All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-brand-cyan transition-colors border border-white/5"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

