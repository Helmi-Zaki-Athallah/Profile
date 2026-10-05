import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Layers,
  ShoppingCart,
  Database,
  Zap,
  Shield,
  Code2,
  Palette,
  Cpu,
  FileCode2,
  Boxes,
  Sparkles,
  Activity,
  Radio,
  Wifi,
  Wrench,
  Figma,
  GitBranch,
  Server,
  BarChart3,
  Terminal,
  GraduationCap,
  Compass
} from 'lucide-react';
import { personalInfo, skillsData } from '../data/portfolioData';

const iconLookup = {
  Globe,
  Layers,
  ShoppingCart,
  Database,
  Zap,
  Shield,
  Code2,
  Palette,
  Cpu,
  FileCode2,
  Boxes,
  Sparkles,
  Activity,
  Radio,
  Wifi,
  Wrench,
  Figma,
  GitBranch,
  Server,
  BarChart3,
  Terminal
};

const skillCategories = [
  { id: 'cms', label: 'WordPress & CMS', icon: Globe },
  { id: 'frontend', label: 'Frontend & Code', icon: Code2 },
  { id: 'engineering', label: 'Teknik Elektro & IoT', icon: Cpu },
  { id: 'tools', label: 'Tools & Workflow', icon: Terminal },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('cms');

  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-brand-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-brand-purple/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-brand-cyan/30 text-brand-cyan text-xs font-mono mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>BACKGROUND &amp; PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Tentang Helmi Zaki Athallah
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
            Menghubungkan ketelitian rekayasa sistem dengan estetika digital berkonversi tinggi.
          </p>
        </div>

        {/* Top Bento Grid: Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          
          {/* Main Story Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-card border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Mahasiswa Teknik Elektro &bull; UNPAM
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Universitas Pamulang, Tangerang Selatan
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4">
                {personalInfo.aboutBio}
              </p>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {personalInfo.philosophy}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-zinc-300">
                  Status: Aktif Mahasiswa &amp; Freelance Developer
                </span>
              </div>
              <a
                href="#contact"
                className="text-xs font-semibold text-brand-cyan hover:underline underline-offset-4"
              >
                Mulai Diskusi Proyek &rarr;
              </a>
            </div>
          </div>

          {/* Quick Highlight Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  Spesialis WordPress &amp; Elementor
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Pembuatan landing page kustom, toko online, dan website bisnis yang cepat, aman, dan mudah diedit mandiri oleh klien.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 flex-shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  Logika Rangkaian &amp; IoT
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Penguasaan pemrograman mikrokontroler (ESP32/Arduino) dan integrasi telemetri hardware ke dashboard web.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-start gap-4 sm:col-span-2 lg:col-span-1">
              <div className="p-2.5 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/20 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  Optimasi Kecepatan &amp; SEO
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Penerapan caching canggih, kompresi aset, dan struktur SEO on-page untuk ranking maksimal di Google.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Skills Section with Category Tabs */}
        <div className="p-6 sm:p-10 rounded-3xl glass-card border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Keahlian &amp; Penguasaan Teknologi
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Pilih kategori untuk melihat instrumen dan stack yang dikuasai
              </p>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-zinc-950/80 border border-white/5">
              {skillCategories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-brand-cyan text-zinc-950 font-semibold shadow-md'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Animated Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {skillsData[activeTab].map((skill, sIdx) => {
                const SkillIcon = iconLookup[skill.icon] || Code2;
                return (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-brand-cyan/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-zinc-800 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-zinc-950 transition-colors">
                          <SkillIcon className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-medium text-brand-cyan">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: sIdx * 0.05 }}
                        className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

