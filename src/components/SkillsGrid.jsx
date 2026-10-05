import React from 'react';
import { motion } from 'framer-motion';
import { skillsCategories, electricalSkills, getLocalized } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import TiltCard from './TiltCard';

export default function SkillsGrid() {
  const { language, t } = useLanguage();

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-12 bg-[#0e0e11] border-b border-zinc-800/60 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-cobalt/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-cyan/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              <p className="text-xs uppercase tracking-[3px] text-zinc-400 font-mono font-medium">
                {t.skills.tag}
              </p>
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none uppercase">
              {t.skills.title} <br />
              <span className="text-zinc-500">{t.skills.titleHighlight}</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-sans leading-relaxed md:pb-2">
            {language === 'id'
              ? 'Arsitektur web modern, integrasi backend, basis data terstruktur, CMS, serta perangkat lunak simulasi dan komputasi Teknik Elektro.'
              : 'Modern web architecture, backend integration, structured databases, CMS solutions, and electrical engineering simulation software.'}
          </p>
        </div>

        {/* Web Categories: 2x2 on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 items-start mb-14 sm:mb-20">
          {skillsCategories.map((col, cIdx) => (
            <motion.div
              key={col.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: cIdx * 0.08 }}
              className="flex flex-col"
            >
              {/* Category Header - Clean, No Icon Box */}
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-800">
                <h3 className="text-[11px] sm:text-xs md:text-sm font-semibold text-white uppercase tracking-wider font-sans truncate">
                  {getLocalized(col.title, language)}
                </h3>
                <span className="text-[10px] sm:text-xs font-mono text-zinc-500 font-bold ml-2">
                  {col.index}
                </span>
              </div>

              {/* Skills Items */}
              <div className="flex flex-col gap-2 sm:gap-2.5">
                {col.skills.map((skill, sIdx) => (
                  <TiltCard
                    key={sIdx}
                    maxTilt={6}
                    glowColor="rgba(69, 92, 233, 0.18)"
                    className="p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-[#141419] border border-zinc-800/80 hover:border-zinc-600/80 hover:bg-[#191922] transition-all flex items-center group shadow-sm cursor-default"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800/90 p-1 sm:p-1.5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-inner">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[11px] sm:text-xs md:text-sm font-medium text-zinc-200 group-hover:text-white group-hover:translate-x-0.5 transition-all truncate">
                        {skill.name}
                      </span>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dedicated Section: Teknik Elektro & Simulasi */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="pt-12 sm:pt-16 border-t border-zinc-800/70"
        >
          {/* Sub-Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs uppercase tracking-[3px] text-zinc-400 font-mono font-medium">
                  {language === 'id' ? 'Bidang Keteknikan' : 'Engineering Discipline'}
                </p>
              </div>
              <h3 className="font-bebas text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
                {language === 'id' ? 'Keahlian Teknik Elektro & Simulasi' : 'Electrical Engineering & Simulation'}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-sans leading-relaxed md:pb-1">
              {language === 'id'
                ? 'Instrumen perangkat lunak simulasi sirkuit, komputasi matriks, dan mikrokontroler yang digunakan dalam studi Teknik Elektro Universitas Pamulang.'
                : 'Circuit simulation tools, matrix computation engines, and microcontroller software applied in Electrical Engineering at Universitas Pamulang.'}
            </p>
          </div>

          {/* 5 Electrical Engineering Skill Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {electricalSkills.map((item, idx) => (
              <TiltCard
                key={idx}
                maxTilt={6}
                glowColor="rgba(52, 211, 153, 0.18)"
                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#141419] border border-zinc-800/80 hover:border-emerald-500/40 hover:bg-[#181a20] transition-all flex flex-col justify-between group shadow-sm cursor-default"
              >
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 min-w-0">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800/90 p-1 sm:p-1.5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-inner">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors truncate">
                      {item.name}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-zinc-400 font-sans leading-relaxed line-clamp-2">
                    {getLocalized(item.desc, language)}
                  </p>
                </div>

                <div className="pt-2.5 mt-2.5 sm:pt-3 sm:mt-3 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    EE-{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

