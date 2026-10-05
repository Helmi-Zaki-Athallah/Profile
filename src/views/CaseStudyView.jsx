import React, { useState } from 'react';
import PageTransition from '../components/PageTransition';
import { projectCaseStudies, getLocalized } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import ImageLightbox from '../components/ImageLightbox';

export default function CaseStudyView({ projectId, onNavigate }) {
  const [lightboxData, setLightboxData] = useState(null);
  const { language, t } = useLanguage();

  const project =
    projectCaseStudies.find((p) => p.id === projectId || p.slug === projectId) ||
    projectCaseStudies[0];

  const otherProjects = projectCaseStudies.filter((p) => p.id !== project.id);
  const projectMetrics = project.metrics[language] || project.metrics.id;
  const projectFeatures = project.features[language] || project.features.id;
  const projectChallenges = project.challenges[language] || project.challenges.id;
  const projectLearnings = project.learnings ? (project.learnings[language] || project.learnings.id) : null;
  const projectRoadmap = project.roadmap ? (project.roadmap[language] || project.roadmap.id) : null;

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#111] text-[#eee] font-sans selection:bg-blue-900 selection:text-white">
        
        {/* Top Hero Section */}
        <section className="pt-32 pb-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto border-b border-neutral-800">
          
          {/* Back Navigation Link */}
          <div className="mb-8">
            <button
              onClick={() => onNavigate('project')}
              className="text-sm font-medium text-neutral-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t.projects.backToProjects}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Meta, Title, CTA, Role/Timeline */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-900/30 text-blue-400 text-xs font-bold tracking-widest uppercase border border-blue-900 w-fit font-mono">
                {getLocalized(project.badge || project.category, language)}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-[1.1] tracking-tight mb-6 text-white whitespace-pre-line">
                {project.title}
              </h1>

              <p className="text-xl md:text-2xl text-neutral-400 font-medium tracking-wide mb-8">
                {getLocalized(project.subtitle || project.tagline, language)}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 text-sm font-semibold tracking-wide rounded-lg transition-colors shadow-lg text-center bg-white text-black hover:bg-neutral-200"
                  >
                    {t.projects.liveDemo} &rarr;
                  </a>
                )}
              </div>

              {/* Timeline & Role Grid */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-6 py-6 border-t border-neutral-800">
                <div>
                  <span className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1 font-mono">
                    {t.projects.timeline}
                  </span>
                  <span className="block text-sm font-medium text-neutral-200">
                    {getLocalized(project.details.timeline, language)}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1 font-mono">
                    {t.projects.role}
                  </span>
                  <span className="block text-sm font-medium text-neutral-200">
                    {getLocalized(project.details.role, language)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Aspect-Video Image */}
            <div className="w-full lg:w-1/2 flex-shrink-0">
              <div
                onClick={() => setLightboxData({ images: project.gallery || [project.image], initialIndex: 0, title: project.title })}
                className="relative aspect-video rounded-xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-neutral-800 cursor-zoom-in group"
              >
                <img
                  src={project.image || project.gallery[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-mono text-white">
                  {t.projects.clickZoom} 🔍
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Deep-Dive Case Study Content Section */}
        <section className="py-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Main Article Content (8/12 Columns) */}
            <div className="w-full lg:w-8/12">
              
              {/* 1. Executive Summary */}
              <article className="mb-20">
                <h2 className="text-3xl font-serif font-bold text-white mb-6 pb-2 border-b border-neutral-800">
                  {t.projects.execSummary}
                </h2>
                <div className="text-neutral-300 leading-relaxed space-y-6 text-lg">
                  <p>
                    <strong className="text-white">{t.projects.projectOverview}:</strong> {getLocalized(project.overview, language)}
                  </p>
                  
                  {/* The Problem Callout Box */}
                  <div className="p-6 bg-neutral-900 border-l-4 border-blue-500 rounded-r-lg">
                    <h3 className="text-xl font-bold text-white mb-2 font-serif">
                      {t.projects.theChallenge}
                    </h3>
                    <p className="text-neutral-300 text-base leading-relaxed">
                      {getLocalized(project.problem, language)}
                    </p>
                  </div>
                </div>
              </article>

              {/* 2. Key Features */}
              {projectFeatures && (
                <article className="mb-20">
                  <h2 className="text-3xl font-serif font-bold text-white mb-8 pb-2 border-b border-neutral-800">
                    {t.projects.keyFeatures}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {projectFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-6 bg-neutral-900 rounded-xl border border-neutral-800 shadow-sm hover:border-neutral-700 transition-colors"
                      >
                        <h3 className="text-lg font-bold text-white mb-2">
                          {feat.title}
                        </h3>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {/* 3. Engineering Challenges & Solutions */}
              {projectChallenges && (
                <article className="mb-20">
                  <h2 className="text-3xl font-serif font-bold text-white mb-6 pb-2 border-b border-neutral-800">
                    {t.projects.techChallenges}
                  </h2>
                  <div className="space-y-8">
                    {projectChallenges.map((c, idx) => (
                      <div
                        key={idx}
                        className="bg-neutral-900 p-8 rounded-xl border border-neutral-800"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/2">
                            <span className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2 block font-mono">
                              {t.projects.challengeLabel}
                            </span>
                            <p className="text-white font-medium text-lg leading-relaxed">
                              {c.challenge}
                            </p>
                          </div>
                          <div className="md:w-1/2">
                            <span className="text-xs font-bold uppercase tracking-wider text-green-400 mb-2 block font-mono">
                              {t.projects.solutionLabel}
                            </span>
                            <p className="text-neutral-300 leading-relaxed text-base">
                              {c.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {/* 4. Key Learnings & Future Roadmap */}
              {(projectLearnings || projectRoadmap) && (
                <article className="mb-20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projectLearnings && (
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-white mb-6 pb-2 border-b border-neutral-800">
                          {t.projects.keyLearnings}
                        </h2>
                        <ul className="list-disc pl-5 text-neutral-300 space-y-3 text-sm leading-relaxed">
                          {projectLearnings.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {projectRoadmap && (
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-white mb-6 pb-2 border-b border-neutral-800">
                          {t.projects.futureRoadmap}
                        </h2>
                        <ul className="list-disc pl-5 text-neutral-300 space-y-3 text-sm leading-relaxed">
                          {projectRoadmap.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              )}

              {/* 5. Screenshot Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <article className="mb-20">
                  <h2 className="text-3xl font-serif font-bold text-white mb-8 pb-2 border-b border-neutral-800">
                    {t.projects.gallery}
                  </h2>
                  <div className="grid grid-cols-1 gap-8">
                    {project.gallery.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxData({ images: project.gallery, initialIndex: idx, title: project.title })}
                        className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-video relative group cursor-zoom-in"
                      >
                        <img
                          src={img}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-mono text-white">
                          {t.projects.clickZoom} 🔍
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

            </div>

            {/* Sidebar Column (4/12 Columns) */}
            <aside className="w-full lg:w-4/12 flex flex-col gap-12">
              
              {/* Project Metrics Box */}
              {projectMetrics && (
                <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 sticky top-32">
                  <h3 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2 font-serif">
                    {t.projects.projectMetrics}
                  </h3>
                  <div className="space-y-6">
                    {projectMetrics.map((m, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-neutral-400 text-sm font-mono">{m.label}</span>
                        <span className="text-xl font-bold text-white font-mono">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Box */}
              {project.techStack && (
                <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
                  <h3 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2 font-serif">
                    {t.projects.techStack}
                  </h3>
                  <div className="space-y-6">
                    {Object.entries(project.techStack).map(([category, tags]) => (
                      <div key={category}>
                        <span className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-mono">
                          {category}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-black text-neutral-300 text-sm font-medium rounded-md border border-neutral-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </aside>

          </div>
        </section>

        {/* Other Case Studies Section */}
        {otherProjects.length > 0 && (
          <section className="py-20 px-6 sm:px-12 md:px-24 bg-neutral-950 border-t border-neutral-900">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-white mb-10 text-center">
                {t.projects.otherCaseStudies}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {otherProjects.map((other) => (
                  <div
                    key={other.id}
                    onClick={() => {
                      onNavigate(`project/${other.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group block bg-neutral-900 rounded-2xl p-6 border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer"
                  >
                    <div className="w-full aspect-video mb-6 rounded overflow-hidden bg-black">
                      <img
                        src={other.image || other.gallery[0]}
                        alt={other.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <h3 className="font-bold text-white mb-2 text-xl group-hover:text-blue-400 transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                      {getLocalized(other.overview, language)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Lightbox Zoom Modal for Images */}
      <ImageLightbox
        isOpen={!!lightboxData}
        images={lightboxData?.images || []}
        initialIndex={lightboxData?.initialIndex || 0}
        title={lightboxData?.title || ''}
        onClose={() => setLightboxData(null)}
      />
    </PageTransition>
  );
}
