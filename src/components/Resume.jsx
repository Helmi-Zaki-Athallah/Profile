import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  GraduationCap,
  Briefcase,
  Download,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { educationAndExperience, personalInfo } from '../data/portfolioData';

export default function Resume({ onDownloadResume }) {
  const educationList = educationAndExperience.filter((item) => item.type === 'education');
  const experienceList = educationAndExperience.filter((item) => item.type === 'experience');

  return (
    <section id="resume" className="py-24 px-4 sm:px-6 relative bg-zinc-950/60 border-t border-white/5">
      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-brand-cyan/30 text-brand-cyan text-xs font-mono mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>ACADEMIC &amp; WORK PATH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Resume &amp; Pengalaman
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
            Perjalanan akademik di Teknik Elektro UNPAM serta jejak pengalaman profesional di dunia web development.
          </p>

          {/* Download CV CTA */}
          <div className="mt-6">
            <button
              onClick={onDownloadResume}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-zinc-950 bg-gradient-to-r from-brand-cyan to-sky-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download Helmi Zaki Athallah - CV (PDF)</span>
            </button>
          </div>
        </div>

        {/* Dual Column Layout: Education vs Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Education Column */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 flex flex-col">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Pendidikan Formal</h3>
                <p className="text-xs text-zinc-400 font-mono">Academic Track Record</p>
              </div>
            </div>

            <div className="relative pl-6 border-l-2 border-brand-cyan/30 flex flex-col gap-8">
              {educationList.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-brand-cyan group-hover:bg-brand-cyan transition-colors" />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800 text-brand-cyan border border-brand-cyan/20">
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white mb-0.5">
                    {item.role}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-brand-cyan mb-2">
                    {item.institution}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs text-zinc-400 font-mono bg-zinc-900/80 px-3 py-1 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 flex flex-col">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Pengalaman Kerja &amp; Proyek</h3>
                <p className="text-xs text-zinc-400 font-mono">Professional &amp; Freelance Works</p>
              </div>
            </div>

            <div className="relative pl-6 border-l-2 border-brand-purple/30 flex flex-col gap-8">
              {experienceList.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-brand-purple group-hover:bg-brand-purple transition-colors" />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800 text-purple-400 border border-purple-500/20">
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white mb-0.5">
                    {item.role}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-brand-purple mb-2">
                    {item.institution}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs text-zinc-400 font-mono bg-zinc-900/80 px-3 py-1 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

