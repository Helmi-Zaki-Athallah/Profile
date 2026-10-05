import React from 'react';
import PageTransition from '../components/PageTransition';
import EditorialAbout from '../components/EditorialAbout';
import Experience from '../components/Experience';
import Magnetic from '../components/Magnetic';
import TiltCard from '../components/TiltCard';
import { personalInfo, getLocalized } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function AboutView({ onNavigate }) {
  const { language, t } = useLanguage();

  return (
    <PageTransition>
      <div className="pt-24 sm:pt-32 bg-[#0e0e11] min-h-screen">
        
        {/* About Hero Section with Helmi Photo & Editorial Split */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[3px] text-zinc-500 font-mono">
              {t.about.pageTag}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Column: Heading, Subhead, Details, Buttons */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
              <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-none">
                {t.about.heading} <br />
                <span className="text-zinc-500">Helmi Zaki Athallah</span>
              </h1>
              
              <p className="text-sm sm:text-base text-zinc-300 font-editorial italic leading-relaxed">
                "{getLocalized(personalInfo.subHeadline, language)}"
              </p>

              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-zinc-400">
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                  {t.about.location}: {personalInfo.location}
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                  {t.about.campus}: {personalInfo.campus}
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                  {t.about.organization}: IYMPACK Community
                </span>
              </div>

              {/* Social Connect Icon-Only Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  {t.about.follow}
                </span>
                <Magnetic strength={0.3}>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn - Helmi Zaki Athallah"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-cobalt border border-zinc-800 hover:border-cobalt text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md group"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.79v-7.6H6.46M7.86 6.81a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                    </svg>
                  </a>
                </Magnetic>

                <Magnetic strength={0.3}>
                  <a
                    href={personalInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram - @athl.lahh"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-cobalt border border-zinc-800 hover:border-cobalt text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md group"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                </Magnetic>

                <Magnetic strength={0.3}>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    aria-label="GitHub"
                    className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-cobalt border border-zinc-800 hover:border-cobalt text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md group"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </a>
                </Magnetic>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Magnetic strength={0.3}>
                  <button
                    onClick={() => onNavigate('resume')}
                    className="px-6 py-3.5 rounded-full bg-cobalt hover:bg-cobalt-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_25px_rgba(69,92,233,0.5)] cursor-pointer"
                  >
                    {t.about.viewResume} &rarr;
                  </button>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {t.about.getInTouch} &rarr;
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* Right Column: Hero Portrait Photo Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <TiltCard
                maxTilt={6}
                glowColor="rgba(69, 92, 233, 0.3)"
                className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-[#18181f] to-[#111116] border border-zinc-800 shadow-2xl p-3 flex flex-col justify-end group"
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
                <div className="relative z-10 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono">
                      Helmi Zaki Athallah
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {getLocalized(personalInfo.roleLabel, language)} &bull; UNPAM
                    </span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </TiltCard>
            </div>

          </div>
        </section>

        {/* Narrative & Pillars */}
        <EditorialAbout />

        {/* Organization Experience */}
        <Experience />

        {/* Bottom Page Navigation Footer CTA */}
        <div className="py-16 px-4 max-w-5xl mx-auto border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              NEXT UP
            </span>
            <h3 className="font-bebas text-3xl sm:text-4xl text-white uppercase">
              {t.about.nextUpTitle}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <Magnetic strength={0.3}>
              <button
                onClick={() => onNavigate('project')}
                className="px-5 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                &larr; {t.about.backToProjects}
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                onClick={() => onNavigate('resume')}
                className="px-6 py-3 rounded-full bg-cobalt hover:bg-cobalt-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_25px_rgba(69,92,233,0.5)] cursor-pointer"
              >
                {t.about.goToResume} &rarr;
              </button>
            </Magnetic>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
