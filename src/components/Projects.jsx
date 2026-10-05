import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  ArrowUpRight,
  Eye
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

const categories = [
  'All',
  'WordPress & Elementor',
  'Frontend / Code',
  'UI/UX'
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-brand-purple/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-brand-cyan/30 text-brand-cyan text-xs font-mono mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>SELECTED PORTFOLIO WORKS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Karya &amp; Proyek Unggulan
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
            Eksplorasi website WordPress, arsitektur antarmuka React, dan inovasi IoT yang telah dibangun.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-zinc-900/80 border border-white/5 backdrop-blur-md">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                    isSelected
                      ? 'text-zinc-950 font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-sky-400 rounded-xl shadow-md"
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="group rounded-3xl glass-card border border-white/10 overflow-hidden flex flex-col justify-between hover:border-brand-cyan/40 hover:shadow-[0_10px_35px_rgba(0,240,255,0.15)] transition-all duration-300"
              >
                {/* Thumbnail Area */}
                <div
                  onClick={() => setActiveModalProject(project)}
                  className="relative h-52 w-full overflow-hidden bg-zinc-900 cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-zinc-950/80 backdrop-blur-md text-brand-cyan border border-brand-cyan/30">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-zinc-950/60 backdrop-blur-xs transition-opacity duration-300">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-cyan text-zinc-950 text-xs font-bold shadow-lg">
                      <Eye className="w-4 h-4" />
                      <span>Detail Proyek</span>
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Performance / Highlight Metric */}
                    {project.metrics && (
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand-cyan mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{project.metrics}</span>
                      </div>
                    )}

                    {/* Title */}
                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="text-lg font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                      {project.shortDesc}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 text-[11px] font-medium rounded-md bg-zinc-900 text-zinc-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-zinc-900/60 text-zinc-500">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>Selengkapnya</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                            aria-label="GitHub Repo"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-brand-cyan/10 hover:bg-brand-cyan text-brand-cyan hover:text-zinc-950 transition-colors"
                            aria-label="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}

