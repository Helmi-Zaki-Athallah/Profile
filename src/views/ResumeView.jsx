import React from 'react';
import PageTransition from '../components/PageTransition';
import SkillsGrid from '../components/SkillsGrid';
import CertificatesShowcase from '../components/CertificatesShowcase';
import Magnetic from '../components/Magnetic';
import TiltCard from '../components/TiltCard';
import { personalInfo, getLocalized } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function ResumeView({ onNavigate, onDownloadResume }) {
  const { language, t } = useLanguage();

  return (
    <PageTransition>
      <div className="pt-24 sm:pt-32 bg-[#0e0e11] min-h-screen">
        
        {/* Resume Hero Section with Helmi Photo Split */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[3px] text-zinc-500 font-mono">
              {t.resume.pageTag}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Column: Heading, Subhead, Download CTA */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
              <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl text-white tracking-tight uppercase leading-none">
                {t.resume.heading1} <br />
                <span className="text-zinc-500">{t.resume.heading2}</span>
              </h1>
              
              <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-xl leading-relaxed">
                {t.resume.subDesc} <strong>Helmi Zaki Athallah</strong>.
              </p>

              {/* Direct Download Button */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Magnetic strength={0.35}>
                  <button
                    onClick={onDownloadResume}
                    className="group flex items-center gap-4 px-7 py-4 rounded-full bg-cobalt hover:bg-cobalt-hover text-white text-xs font-semibold uppercase tracking-wider shadow-[0_4px_30px_rgba(69,92,233,0.4)] hover:shadow-[0_6px_40px_rgba(69,92,233,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    <span>{t.resume.downloadBtn}</span>
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:translate-y-0.5 transition-transform">
                      &darr;
                    </span>
                  </button>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-6 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {t.resume.hireBtn} &rarr;
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* Right Column: Hero Portrait Photo Card of Helmi */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <TiltCard
                maxTilt={6}
                glowColor="rgba(69, 92, 233, 0.3)"
                className="relative w-full max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-[#18181f] to-[#111116] border border-zinc-800 shadow-2xl p-3 flex flex-col justify-end group"
              >
                {/* Photo of Helmi */}
                <img
                  src="/foto/Helmi-live.png"
                  alt="Helmi Zaki Athallah"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain object-bottom filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/foto/Helmi.png';
                  }}
                />

                {/* Subtle Ambient Light Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/30 to-transparent pointer-events-none" />

                {/* Portrait Overlay Badge */}
                <div className="relative z-10 p-3.5 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono">
                      Helmi Zaki Athallah
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {t.resume.verifiedCv}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cobalt/20 text-cobalt border border-cobalt/30 font-semibold">
                    {t.resume.activeStatus}
                  </span>
                </div>
              </TiltCard>
            </div>

          </div>
        </section>

        {/* Interactive Resume Canvas Widget */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 mb-16">
          <div className="p-6 sm:p-10 rounded-3xl bg-[#141419] border border-zinc-800/80 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Expertise */}
              <TiltCard
                maxTilt={6}
                glowColor="rgba(69, 92, 233, 0.25)"
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cobalt font-bold block mb-3">
                    {t.resume.coreExpertise}
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-zinc-200 flex items-center gap-2">
                      <span className="text-cobalt text-[10px]">&bull;</span> UI/UX &amp; Product Design
                    </span>
                    <span className="text-xs font-medium text-zinc-200 flex items-center gap-2">
                      <span className="text-cobalt text-[10px]">&bull;</span> WordPress &amp; Elementor Architecture
                    </span>
                    <span className="text-xs font-medium text-zinc-200 flex items-center gap-2">
                      <span className="text-cobalt text-[10px]">&bull;</span> Frontend &amp; Responsive Layouts
                    </span>
                  </div>
                </div>
              </TiltCard>

              {/* Card 2: Contact Links */}
              <TiltCard
                maxTilt={6}
                glowColor="rgba(69, 92, 233, 0.25)"
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cobalt font-bold block mb-3">
                    {t.resume.directConnect}
                  </span>
                  <p className="text-xs font-mono text-zinc-300 truncate mb-1">
                    {personalInfo.email}
                  </p>
                  <p className="text-xs font-mono text-zinc-400">
                    {personalInfo.phone}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-800">
                  <a
                    href={personalInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-800 hover:bg-cobalt text-zinc-300 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-800 hover:bg-cobalt text-zinc-300 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={personalInfo.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-800 hover:bg-cobalt text-zinc-300 hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </TiltCard>

              {/* Card 3: Credentials */}
              <TiltCard
                maxTilt={6}
                glowColor="rgba(69, 92, 233, 0.25)"
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cobalt font-bold block mb-3">
                    {t.resume.credentials}
                  </span>
                  <div className="flex flex-col gap-2">
                    <div>
                      <strong className="text-xs text-white block">Logistics Coordinator</strong>
                      <span className="text-[10px] font-mono text-zinc-400">IYMPACK Community &bull; 2025–2026</span>
                    </div>
                    <div className="pt-1">
                      <strong className="text-xs text-white block">Web Development</strong>
                      <span className="text-[10px] font-mono text-zinc-400">IYMPACK / Professional &bull; 2026</span>
                    </div>
                  </div>
                </div>
              </TiltCard>

            </div>
          </div>
        </div>

        {/* Skills & Technologies Grid */}
        <SkillsGrid />

        {/* Certificates Showcase */}
        <CertificatesShowcase />

        {/* Bottom Page Navigation Footer CTA */}
        <div className="py-16 px-4 max-w-5xl mx-auto border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              NEXT UP
            </span>
            <h3 className="font-bebas text-3xl sm:text-4xl text-white uppercase">
              {t.resume.nextUpTitle}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <Magnetic strength={0.3}>
              <button
                onClick={() => onNavigate('about')}
                className="px-5 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                &larr; {t.resume.backToAbout}
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full bg-cobalt hover:bg-cobalt-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_25px_rgba(69,92,233,0.5)] cursor-pointer"
              >
                {t.resume.goToContact} &rarr;
              </button>
            </Magnetic>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
