import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';

// Target keywords for luminous accent highlighting
const HIGHLIGHT_WORDS = new Set([
  'Web', 'Engineer', 'Founder', 'Z-Code', 'Creative', 'Studio,', 'Studio',
  'React,', 'React', 'Tailwind', 'Vite,', 'Node.js/Express,', 'Node.js/Express', 'Node.js',
  'WordPress', 'Elementor', 'LiteSpeed).', 'LiteSpeed',
  'Teknik', 'Elektro', 'Electrical', 'Engineering',
  'AI', 'IYMPACK,', 'IYMPACK', 'PageSpeed', '<', '0.8s', '0.8s)',
  '< 0.8s'
]);

const cleanWord = (w) => w.replace(/[.,()]/g, '');

const checkIfHighlight = (rawWord) => {
  return HIGHLIGHT_WORDS.has(rawWord) || HIGHLIGHT_WORDS.has(cleanWord(rawWord));
};

/**
 * Individual Word component mapped to the global narrative scroll progress
 */
function ScrollWord({ word, progress, range, isHighlight }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [4, 0]);
  const color = useTransform(
    progress,
    range,
    isHighlight
      ? ['rgba(113, 113, 122, 0.4)', 'rgba(56, 189, 248, 1)'] // glows to vibrant cyan
      : ['rgba(113, 113, 122, 0.45)', 'rgba(255, 255, 255, 1)'] // illuminates to pure bright white
  );

  return (
    <span className="inline-block mr-[0.28em] select-none">
      <motion.span
        style={{ opacity, y, color }}
        className={`inline-block tracking-tight ${
          isHighlight ? 'font-semibold drop-shadow-[0_0_12px_rgba(56,189,248,0.25)]' : 'font-normal'
        }`}
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function EditorialAbout() {
  const { language, t } = useLanguage();
  const paragraphs = personalInfo.aboutParagraphs[language] || personalInfo.aboutParagraphs.id;

  // Single shared scroll container so paragraphs activate sequentially (1 -> 2 -> 3)
  const narrativeContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: narrativeContainerRef,
    offset: ['start 0.82', 'end 0.38'],
  });

  // Split words per paragraph and compute precise global sequential index ranges
  const paragraphsWithWords = useMemo(() => {
    return paragraphs.map((p) => p.split(/\s+/).filter(Boolean));
  }, [paragraphs]);

  const totalWords = useMemo(() => {
    return paragraphsWithWords.reduce((sum, words) => sum + words.length, 0);
  }, [paragraphsWithWords]);

  const paragraphStartIndices = useMemo(() => {
    const indices = [];
    let count = 0;
    for (const words of paragraphsWithWords) {
      indices.push(count);
      count += words.length;
    }
    return indices;
  }, [paragraphsWithWords]);

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-8 md:px-12 bg-[#0a0a0d] border-b border-zinc-800/60 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cobalt/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[3px] text-zinc-500 font-mono">
            {t.about.tag}
          </span>
          <span className="w-8 h-[1px] bg-zinc-800" />
        </div>

        {/* Word-by-Word Sequential Scrollytelling Narrative (Paragraph 1 -> 2 -> 3) */}
        <div
          ref={narrativeContainerRef}
          className="flex flex-col gap-10 sm:gap-14"
        >
          {paragraphsWithWords.map((words, pIdx) => {
            const baseIdx = paragraphStartIndices[pIdx];
            return (
              <p
                key={`${language}-${pIdx}`}
                className="text-lg sm:text-xl md:text-2xl lg:text-[23px] font-normal leading-[1.75] sm:leading-[1.85] tracking-tight"
              >
                {words.map((word, wIdx) => {
                  const globalIdx = baseIdx + wIdx;
                  const start = globalIdx / totalWords;
                  const end = Math.min(1, start + (1 / totalWords) * 2.5);

                  return (
                    <ScrollWord
                      key={wIdx}
                      word={word}
                      progress={scrollYProgress}
                      range={[start, end]}
                      isHighlight={checkIfHighlight(word)}
                    />
                  );
                })}
              </p>
            );
          })}
        </div>

        {/* Interactive Bar: Kush Agrawal Style Floating Magnetic Action & Social Connect */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-6">
          
          {/* Social Connect Magnetic Buttons */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              {t.about.connect}
            </span>
            <Magnetic strength={0.3}>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn - Helmi Zaki Athallah"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-zinc-900/90 hover:bg-cobalt border border-zinc-800 hover:border-cobalt text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors">
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
                className="w-10 h-10 rounded-full bg-zinc-900/90 hover:bg-cobalt border border-zinc-800 hover:border-cobalt text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors">
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
                className="w-10 h-10 rounded-full bg-zinc-900/90 hover:bg-cobalt border border-zinc-800 hover:border-cobalt text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </Magnetic>
          </div>

          {/* Kush Agrawal Style Circular Magnetic Call-to-Action */}
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-full bg-cobalt hover:bg-cobalt-light text-white font-medium text-xs sm:text-sm flex items-center gap-2.5 shadow-[0_4px_24px_rgba(69,92,233,0.35)] transition-all duration-300 hover:scale-105 group"
            >
              <span className="font-mono uppercase tracking-wider text-[11px]">
                {t.about.getInTouch || (language === 'id' ? 'Mulai Kolaborasi' : 'Start Collaboration')}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </Magnetic>

        </div>

        {/* Bottom Three Interactive Pillar Cards */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <TiltCard
            maxTilt={6}
            glowColor="rgba(69, 92, 233, 0.2)"
            className="p-5 rounded-2xl bg-[#141419]/90 border border-zinc-800 hover:border-cobalt/40 transition-colors shadow-lg"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-cobalt block mb-1.5 font-semibold">
              {t.about.pillars.p1Tag}
            </span>
            <p className="text-sm font-semibold text-white">
              {t.about.pillars.p1Title}
            </p>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              {t.about.pillars.p1Desc}
            </p>
          </TiltCard>

          <TiltCard
            maxTilt={6}
            glowColor="rgba(69, 92, 233, 0.2)"
            className="p-5 rounded-2xl bg-[#141419]/90 border border-zinc-800 hover:border-cobalt/40 transition-colors shadow-lg"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-cobalt block mb-1.5 font-semibold">
              {t.about.pillars.p2Tag}
            </span>
            <p className="text-sm font-semibold text-white">
              {t.about.pillars.p2Title}
            </p>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              {t.about.pillars.p2Desc}
            </p>
          </TiltCard>

          <TiltCard
            maxTilt={6}
            glowColor="rgba(69, 92, 233, 0.2)"
            className="p-5 rounded-2xl bg-[#141419]/90 border border-zinc-800 hover:border-cobalt/40 transition-colors shadow-lg sm:col-span-2 md:col-span-1"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-cobalt block mb-1.5 font-semibold">
              {t.about.pillars.p3Tag}
            </span>
            <p className="text-sm font-semibold text-white">
              {t.about.pillars.p3Title}
            </p>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              {t.about.pillars.p3Desc}
            </p>
          </TiltCard>
        </div>

      </div>
    </section>
  );
}
