import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Sparkles,
  Download,
  ExternalLink,
  Zap,
  Layers,
  Code2,
  CheckCircle2
} from 'lucide-react';
import { personalInfo, clientStats } from '../data/portfolioData';

export default function Hero({ onDownloadResume }) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-gradient-to-tr from-brand-cyan/15 via-brand-purple/10 to-transparent rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-brand-cyan/10 rounded-full filter blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-purple/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Engineering & CMS Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-brand-cyan/30 text-zinc-300 text-xs font-medium backdrop-blur-md mb-6 shadow-sm hover:border-brand-cyan/60 transition-colors"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
              </span>
              <span className="text-zinc-200">
                ⚡ Teknik Elektro <strong className="text-brand-cyan">UNPAM</strong> &bull; 🌐 WordPress & Elementor
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-5">
              Halo, Saya <br />
              <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Helmi Zaki Athallah
              </span>
              <span className="text-brand-cyan">.</span>
            </h1>

            {/* Animated Dynamic Subtitle */}
            <div className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-brand-cyan mb-4 font-mono">
              <Zap className="w-5 h-5 text-brand-cyan animate-pulse" />
              <span>Web Creator &amp; Engineering Mind</span>
            </div>

            {/* Tagline / Bio Description */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed mb-8 font-light">
              Mahasiswa <strong>Teknik Elektro Universitas Pamulang</strong> yang memadukan logika terstruktur rekayasa sistem dengan kreativitas pembuatan website modern menggunakan <strong>WordPress, Elementor, React, &amp; Tailwind CSS</strong>.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#projects"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-zinc-950 bg-gradient-to-r from-brand-cyan via-sky-400 to-brand-blue shadow-[0_0_30px_rgba(0,240,255,0.35)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Layers className="w-4 h-4" />
                <span>Lihat Featured Projects</span>
              </a>

              <button
                onClick={onDownloadResume}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-zinc-200 bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-brand-cyan/40 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-md"
              >
                <Download className="w-4 h-4 text-brand-cyan" />
                <span>Download Resume / CV</span>
              </button>
            </div>

            {/* Micro Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-white/10">
              {clientStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight flex items-center gap-1">
                    {stat.value}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Hero Visual & Real Photo Integration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] rounded-3xl p-3 glass-card border border-white/10 shadow-2xl group">
              
              {/* Outer Glowing Gradient Frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-brand-cyan via-brand-purple to-sky-400 opacity-30 group-hover:opacity-60 blur-xl transition-opacity duration-500 -z-10" />

              {/* Image Container with Dark Theme Backdrop */}
              <div className="w-full h-full rounded-2xl overflow-hidden bg-zinc-950/80 relative border border-white/10 flex items-center justify-center">
                
                {/* Real Photo */}
                <img
                  src="/foto/Helmi.png"
                  alt="Helmi Zaki Athallah"
                  className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback to /Helmi.png if public subfolder differs
                    e.currentTarget.src = '/Helmi.png';
                  }}
                />

                {/* Bottom Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Floating Badge: HZA Monogram */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-brand-cyan/40 flex items-center gap-2 shadow-lg">
                  <span className="text-xs font-mono font-bold text-brand-cyan">HZA</span>
                  <span className="text-[10px] text-zinc-400 border-l border-zinc-700 pl-2">UNPAM EE</span>
                </div>

                {/* Floating Status Pill (Bottom Left) */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white">Open to Projects</span>
                      <span className="text-[10px] text-zinc-400">WordPress &bull; Web Design</span>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="p-2 rounded-lg bg-brand-cyan/10 hover:bg-brand-cyan text-brand-cyan hover:text-zinc-950 transition-all duration-200"
                    aria-label="Direct message"
                  >
                    <Sparkles className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-500 text-xs font-mono"
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-brand-cyan" />
        </motion.div>
      </motion.div>
    </section>
  );
}

