import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experiences, getLocalized } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import TiltCard from './TiltCard';

/**
 * Individual Timeline Item with Scroll-Driven Connector Line to the Next Logo
 */
function TimelineItem({ exp, idx, isLast, total, scrollYProgress, language }) {
  // Segment range for connector line connecting this logo to the next logo
  const segStart = (idx / total) * 0.82 + 0.04;
  const segEnd = ((idx + 1) / total) * 0.82;

  // Activation threshold for the logo marker itself
  const markerThreshold = idx === 0 ? 0.02 : (idx / total) * 0.82;

  // Scroll animations for connector line
  const segmentScale = useTransform(scrollYProgress, [segStart, segEnd], [0, 1]);

  // Scroll animations for logo marker glow & border
  const markerBorder = useTransform(
    scrollYProgress,
    [markerThreshold - 0.03, markerThreshold + 0.04],
    ['rgba(39, 39, 42, 0.8)', 'rgba(69, 92, 233, 0.95)']
  );
  const markerGlow = useTransform(
    scrollYProgress,
    [markerThreshold - 0.03, markerThreshold + 0.04],
    ['0 4px 12px rgba(0, 0, 0, 0.5)', '0 0 25px rgba(69, 92, 233, 0.5), inset 0 0 12px rgba(69, 92, 233, 0.2)']
  );
  const markerScale = useTransform(
    scrollYProgress,
    [markerThreshold - 0.03, markerThreshold + 0.04],
    [1, 1.06]
  );

  return (
    <div className="flex items-stretch gap-4 sm:gap-7 relative group">
      {/* Left Column: Logo Marker & Animated Connector Line to Next Logo */}
      <div className="flex flex-col items-center flex-shrink-0">
        
        {/* Logo Marker with Scroll-Driven Glow */}
        <motion.div
          style={{
            borderColor: markerBorder,
            boxShadow: markerGlow,
            scale: markerScale,
          }}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#141419] border flex items-center justify-center p-2.5 flex-shrink-0 z-10 transition-colors shadow-lg relative"
        >
          <img
            src={exp.icon}
            alt={exp.company}
            className="w-full h-full object-contain filter brightness-95"
            loading="lazy"
          />
        </motion.div>

        {/* Scroll-Driven Connecting Line (Logo to Next Logo) */}
        {!isLast && (
          <div className="w-[2px] flex-1 my-2 bg-zinc-800/80 rounded-full relative overflow-hidden min-h-[90px] sm:min-h-[120px]">
            {/* Base line track */}
            <div className="absolute inset-0 bg-zinc-800/60" />

            {/* Glowing illuminated fill driven by scroll */}
            <motion.div
              style={{
                scaleY: segmentScale,
                transformOrigin: 'top',
              }}
              className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-cobalt via-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(56,189,248,0.85)] origin-top"
            />
          </div>
        )}
      </div>

      {/* Right Column: Experience Details & Interactive Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        className={`flex-1 ${!isLast ? 'pb-10 sm:pb-14' : 'pb-2'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          
          {/* Role & Company Header Column */}
          <div className="lg:col-span-4 flex flex-col pt-0.5">
            <span className="text-xs font-mono text-cobalt font-semibold mb-1">
              {getLocalized(exp.duration, language)}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-cyan-400 transition-colors">
              {getLocalized(exp.role, language)}
            </h3>
            <p className="text-sm text-zinc-300 font-medium mt-1">
              {exp.company}
            </p>
            <span className="text-xs font-mono text-zinc-500 mt-1">
              {getLocalized(exp.type, language)}
            </span>
          </div>

          {/* Content Card Column with 3D Tilt & Interactive Tags */}
          <div className="lg:col-span-8">
            <TiltCard
              maxTilt={4}
              glowColor="rgba(69, 92, 233, 0.18)"
              className="p-5 sm:p-7 rounded-3xl bg-[#141419] border border-zinc-800/90 group-hover:border-zinc-700/80 transition-all shadow-xl"
            >
              <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                {getLocalized(exp.description, language)}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {exp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 text-[11px] sm:text-xs font-mono rounded-lg bg-zinc-900/90 text-zinc-300 border border-zinc-800 hover:border-cobalt/50 hover:text-white hover:bg-zinc-800/80 transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const { language, t } = useLanguage();

  // Scroll target for the entire experience timeline
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.45'],
  });

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-12 bg-[#0e0e11] border-b border-zinc-800/60 relative overflow-hidden"
    >
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cobalt/5 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <p className="text-xs uppercase tracking-[3px] text-zinc-500 font-mono mb-2 sm:mb-3">
            {t.experience.subTag}
          </p>
          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none uppercase">
            {t.experience.title} <br />
            <span className="text-zinc-500">{t.experience.titleHighlight}</span>
          </h2>
        </div>

        {/* Scroll-Driven Connected Timeline */}
        <div ref={timelineRef} className="flex flex-col">
          {experiences.map((exp, idx) => (
            <TimelineItem
              key={idx}
              exp={exp}
              idx={idx}
              isLast={idx === experiences.length - 1}
              total={experiences.length}
              scrollYProgress={scrollYProgress}
              language={language}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
