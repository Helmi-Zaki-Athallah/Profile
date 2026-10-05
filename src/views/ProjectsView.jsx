import React from 'react';
import PageTransition from '../components/PageTransition';
import Magnetic from '../components/Magnetic';
import { projectCaseStudies, getLocalized } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectsView({ onNavigate }) {
  const { language, t } = useLanguage();
  const featuredProjects = projectCaseStudies;

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#111] text-[#eee] py-32 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto font-sans">
        
        {/* Back Link */}
        <div className="mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-mono cursor-pointer"
          >
            &larr; {t.projects.backToPortfolio}
          </button>
        </div>

        {/* Page Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-white tracking-tight">
            {t.projects.pageHeading}
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            {t.projects.pageDesc}
          </p>
        </header>

        {/* 2-Column Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-20">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onNavigate(`project/${project.id}`)}
              className="group block cursor-pointer"
            >
              <article className="flex flex-col h-full bg-[#1a1a1a] p-6 rounded-2xl border border-neutral-800 shadow-sm hover:border-neutral-600 transition-colors duration-300">
                
                {/* Aspect Video Image */}
                <div className="w-full mb-6">
                  <div className="aspect-video relative rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 bg-neutral-900">
                    <img
                      src={project.image || project.gallery?.[0]}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2 font-mono">
                    {getLocalized(project.badge || project.category, language)}
                  </span>
                  
                  <h2 className="text-xl md:text-2xl font-bold mb-3 text-white leading-tight group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h2>
                  
                  <p className="text-sm text-neutral-400 mb-6 line-clamp-3 leading-relaxed">
                    {getLocalized(project.overview, language)}
                  </p>

                  <div className="mt-auto pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-400 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      {t.projects.readCaseStudy}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {project.year}
                    </span>
                  </div>
                </div>

              </article>
            </div>
          ))}
        </div>

        {/* Bottom Page Navigation CTA */}
        <div className="pt-12 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-1">
              {t.projects.continueExploring}
            </span>
            <p className="text-lg font-bold text-white">
              {t.projects.discoverHelmi}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Magnetic strength={0.3}>
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                {t.projects.aboutHelmi} &rarr;
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full bg-cobalt hover:bg-cobalt-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_25px_rgba(69,92,233,0.5)] cursor-pointer"
              >
                {t.projects.letsTalk} &rarr;
              </button>
            </Magnetic>
          </div>
        </div>

      </main>
    </PageTransition>
  );
}
