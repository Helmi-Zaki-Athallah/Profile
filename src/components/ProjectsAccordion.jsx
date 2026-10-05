import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectCaseStudies, getLocalized } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import Magnetic from './Magnetic';
import TiltCard from './TiltCard';
import ImageLightbox from './ImageLightbox';

export default function ProjectsAccordion({ onNavigate }) {
  const [expandedId, setExpandedId] = useState(null);
  const [lightboxData, setLightboxData] = useState(null);
  const { language, t } = useLanguage();
  const itemRefs = useRef({});

  const toggleProject = useCallback((id) => {
    const isClosing = expandedId === id;
    setExpandedId(isClosing ? null : id);

    // Scroll the newly opened item into view after the previous one collapses
    if (!isClosing) {
      setTimeout(() => {
        const el = itemRefs.current[id];
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const offset = 80; // clearance for fixed header
          window.scrollTo({ top: top - offset, behavior: 'smooth' });
        }
      }, 50);
    }
  }, [expandedId]);

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-12 bg-[#0e0e11] border-b border-zinc-800/60"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <p className="text-xs uppercase tracking-[3px] text-zinc-500 font-mono mb-2 sm:mb-3">
            {t.projects.tag}
          </p>
          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none uppercase">
            {t.projects.title} <br />
            <span className="text-zinc-500">{t.projects.titleHighlight}</span>
          </h2>
        </div>

        {/* Accordion Projects List */}
        <div className="flex flex-col border-t border-zinc-800">
          {projectCaseStudies.map((project) => {
            const isExpanded = expandedId === project.id;
            const projectMetrics = project.metrics[language] || project.metrics.id;
            const projectFeatures = project.features[language] || project.features.id;
            const projectChallenges = project.challenges[language] || project.challenges.id;
            const projectLearnings = project.learnings ? (project.learnings[language] || project.learnings.id) : null;
            const projectRoadmap = project.roadmap ? (project.roadmap[language] || project.roadmap.id) : null;

            return (
              <div
                key={project.id}
                ref={(el) => { itemRefs.current[project.id] = el; }}
                className="border-b border-zinc-800 transition-colors"
              >
                {/* Accordion Trigger Row */}
                <button
                  onClick={() => toggleProject(project.id)}
                  className="w-full py-6 sm:py-9 flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <h3 className="font-bebas text-2xl sm:text-4xl md:text-5xl text-zinc-300 group-hover:text-white group-hover:translate-x-3 transition-all duration-300 uppercase">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-xs sm:text-sm font-mono text-zinc-500 group-hover:text-cobalt transition-colors hidden sm:inline-block">
                      {getLocalized(project.category, language)}
                    </span>
                    <Magnetic strength={0.3}>
                      <span
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:border-cobalt group-hover:text-white transition-all duration-300 shadow-md ${
                          isExpanded ? 'rotate-45 bg-cobalt text-white border-cobalt shadow-[0_0_20px_rgba(69,92,233,0.5)]' : ''
                        }`}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="w-3.5 h-3.5"
                        >
                          <path d="M7 1v12M1 7h12" />
                        </svg>
                      </span>
                    </Magnetic>
                  </div>
                </button>

                {/* Accordion Expandable Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                      className="overflow-hidden pb-10 sm:pb-14"
                    >
                      <div className="p-6 sm:p-10 rounded-3xl bg-[#141419] border border-zinc-800 shadow-2xl flex flex-col gap-10">
                        
                        {/* Case Study Header & Action Buttons */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-zinc-800">
                          <div>
                            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                              {project.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed">
                              {getLocalized(project.tagline, language)}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            {onNavigate && (
                              <Magnetic strength={0.3}>
                                <button
                                  onClick={() => onNavigate(`project/${project.id}`)}
                                  className="px-5 py-2.5 rounded-full bg-cobalt hover:bg-cobalt-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(69,92,233,0.35)] hover:shadow-[0_6px_30px_rgba(69,92,233,0.5)] hover:scale-105 inline-block cursor-pointer"
                                >
                                  {t.projects.deepDive} &rarr;
                                </button>
                              </Magnetic>
                            )}
                            {project.liveUrl && (
                              <Magnetic strength={0.3}>
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider border border-zinc-700 hover:border-zinc-500 transition-all hover:scale-105 inline-block"
                                >
                                  {t.projects.visitSite} &rarr;
                                </a>
                              </Magnetic>
                            )}
                          </div>
                        </div>

                        {/* Top Gallery Images with Click-to-Zoom */}
                        <div className={`grid gap-5 ${project.gallery.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                          {project.gallery.map((img, iIdx) => (
                            <div
                              key={iIdx}
                              onClick={() => setLightboxData({ images: project.gallery, initialIndex: iIdx, title: project.title })}
                              className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 group cursor-zoom-in hover:border-zinc-600 transition-colors"
                            >
                              <img
                                src={img}
                                alt={`${project.title} screenshot ${iIdx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors" />
                                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md text-[11px] font-mono text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {t.projects.clickZoom}
                                </div>
                            </div>
                          ))}
                        </div>

                        {/* 4 Interactive Metrics Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                          {projectMetrics.map((metric, mIdx) => (
                            <TiltCard
                              key={mIdx}
                              maxTilt={5}
                              glowColor="rgba(69, 92, 233, 0.25)"
                              className="p-5 sm:p-6 rounded-2xl bg-[#181820]/90 border border-zinc-800/90 hover:border-cobalt/50 transition-all shadow-lg flex flex-col justify-center min-h-[105px]"
                            >
                              <span className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-cobalt tracking-wider leading-none mb-2">
                                {metric.value}
                              </span>
                              <span className="text-xs sm:text-[13px] font-mono text-zinc-300 leading-snug tracking-wide">
                                {metric.label}
                              </span>
                            </TiltCard>
                          ))}
                        </div>

                        {/* Main Content Breakdown */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 pt-2">
                          
                          {/* Left Column (7/12): Overview, Problem, Features, Challenges */}
                          <div className="lg:col-span-7 flex flex-col gap-8">
                            
                            {/* Project Overview */}
                            <div className="flex flex-col gap-2.5">
                              <h5 className="text-xs font-mono uppercase tracking-[2px] text-zinc-500 font-semibold">
                                {t.projects.projectOverview}
                              </h5>
                              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                                {getLocalized(project.overview, language)}
                              </p>
                            </div>

                            {/* The Problem & Objectives Box */}
                            <div className="p-5 sm:p-6 rounded-2xl bg-[#181820]/80 border border-blue-900/40 flex flex-col gap-2.5">
                              <h5 className="text-xs font-mono uppercase tracking-[2px] text-cobalt font-bold">
                                {t.projects.theChallenge}
                              </h5>
                              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                                {getLocalized(project.problem, language)}
                              </p>
                            </div>

                            {/* Key Features List */}
                            <div className="flex flex-col gap-3.5">
                              <h5 className="text-xs font-mono uppercase tracking-[2px] text-zinc-500 font-semibold">
                                {t.projects.keyFeatures}
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {projectFeatures.map((feat, fIdx) => (
                                  <div
                                    key={fIdx}
                                    className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 flex flex-col gap-1.5 transition-colors"
                                  >
                                    <strong className="text-xs font-bold text-white flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-cobalt flex-shrink-0" />
                                      {feat.title}
                                    </strong>
                                    <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                                      {feat.desc}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Technical Challenges & Solutions */}
                            <div className="flex flex-col gap-3.5">
                              <h5 className="text-xs font-mono uppercase tracking-[2px] text-zinc-500 font-semibold">
                                {t.projects.techChallenges}
                              </h5>
                              <div className="flex flex-col gap-3.5">
                                {projectChallenges.map((c, cIdx) => (
                                  <div
                                    key={cIdx}
                                    className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col gap-3 font-mono text-xs"
                                  >
                                    <div className="text-red-300 flex flex-col gap-1">
                                      <span className="font-bold text-red-400 uppercase tracking-wider text-[11px]">
                                        {t.projects.challengeLabel}
                                      </span>
                                      <span className="leading-relaxed text-zinc-300">{c.challenge}</span>
                                    </div>
                                    <div className="text-emerald-300 pt-3 border-t border-zinc-800/80 flex flex-col gap-1">
                                      <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                                        {t.projects.solutionLabel}
                                      </span>
                                      <span className="leading-relaxed text-zinc-300">{c.solution}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>

                          {/* Right Column (5/12) */}
                          <div className="lg:col-span-5 flex flex-col gap-6">
                            
                            {/* Container 1: Execution Details */}
                            <div className="p-5 sm:p-6 rounded-2xl bg-[#181820]/90 border border-zinc-800 flex flex-col gap-3 font-mono">
                              <h5 className="text-xs uppercase tracking-[2px] text-zinc-500 font-bold mb-1">
                                {t.projects.execDetails}
                              </h5>
                              <div className="flex justify-between items-start text-xs py-2 border-b border-zinc-800/80 gap-3">
                                <span className="text-zinc-400">{t.projects.role}</span>
                                <strong className="text-white text-right leading-snug">{getLocalized(project.details.role, language)}</strong>
                              </div>
                              <div className="flex justify-between items-center text-xs py-2 gap-3">
                                <span className="text-zinc-400">{t.projects.timeline}</span>
                                <strong className="text-white text-right leading-snug">{getLocalized(project.details.timeline, language)}</strong>
                              </div>
                            </div>

                            {/* Container 2: Architecture & Tech Stack */}
                            {project.techStack && (
                              <div className="p-5 sm:p-6 rounded-2xl bg-[#181820]/90 border border-zinc-800 flex flex-col gap-4">
                                <h5 className="text-xs font-mono uppercase tracking-[2px] text-zinc-500 font-bold">
                                  {t.projects.archStack}
                                </h5>
                                {Object.entries(project.techStack).map(([category, tags], tIdx) => (
                                  <div key={tIdx} className="flex flex-col gap-1.5">
                                    <span className="text-[11px] font-mono capitalize text-zinc-400">
                                      {category}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                      {tags.map((tag, tagIdx) => (
                                        <span
                                          key={tagIdx}
                                          className="px-3 py-1 text-xs rounded-lg bg-zinc-900 text-zinc-200 border border-zinc-800 hover:border-cobalt hover:text-white transition-all cursor-default font-mono"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Container 3: Key Learnings */}
                            {projectLearnings && (
                              <div className="p-5 sm:p-6 rounded-2xl bg-[#181820]/90 border border-zinc-800 flex flex-col gap-3">
                                <h5 className="text-xs font-mono uppercase tracking-[2px] text-zinc-500 font-bold">
                                  {t.projects.keyLearnings}
                                </h5>
                                <ul className="list-disc list-inside text-xs text-zinc-300 flex flex-col gap-2.5 leading-relaxed">
                                  {projectLearnings.map((l, lIdx) => (
                                    <li key={lIdx} className="pl-1">
                                      <span>{l}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Container 4: Future Roadmap */}
                            {projectRoadmap && (
                              <div className="p-5 sm:p-6 rounded-2xl bg-[#181820]/90 border border-zinc-800 flex flex-col gap-3">
                                <h5 className="text-xs font-mono uppercase tracking-[2px] text-zinc-500 font-bold">
                                  {t.projects.futureRoadmap}
                                </h5>
                                <ul className="list-disc list-inside text-xs text-zinc-300 flex flex-col gap-2.5 leading-relaxed">
                                  {projectRoadmap.map((r, rIdx) => (
                                    <li key={rIdx} className="pl-1">
                                      <span>{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          </div>

                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* View All Projects Bottom Magnetic CTA */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <Magnetic strength={0.35}>
            <button
              onClick={() => onNavigate && onNavigate('project')}
              className="group flex items-center gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-cobalt text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(69,92,233,0.3)] cursor-pointer"
            >
              <span>{t.projects.explorePage}</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cobalt flex items-center justify-center text-white group-hover:translate-x-1 group-hover:rotate-45 transition-all duration-300">
                &rarr;
              </div>
            </button>
          </Magnetic>
        </div>

      </div>

      {/* Image Zoom Lightbox Modal */}
      <ImageLightbox
        isOpen={!!lightboxData}
        images={lightboxData?.images || []}
        initialIndex={lightboxData?.initialIndex || 0}
        title={lightboxData?.title || ''}
        onClose={() => setLightboxData(null)}
      />
    </section>
  );
}
