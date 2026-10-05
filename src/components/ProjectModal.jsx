import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { useModalBehavior } from '../hooks/useModalBehavior';

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);

  useModalBehavior({
    isOpen: !!project,
    onClose,
    focusRef: modalRef
  });

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
        role="presentation"
      >
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl rounded-3xl bg-zinc-950 border border-white/15 shadow-2xl overflow-hidden z-10 my-8 focus:outline-none"
        >
          {/* Header Image */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-zinc-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-white/10"
              aria-label="Close Project Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category Tag */}
            <div className="absolute bottom-4 left-6">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-cyan text-zinc-950 shadow-lg">
                {project.category}
              </span>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 id="project-modal-title" className="text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h3>
              {project.metrics && (
                <span className="text-xs font-mono text-brand-cyan px-2.5 py-1 rounded-md bg-brand-cyan/10 border border-brand-cyan/20">
                  {project.metrics}
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              {project.fullDesc || project.shortDesc}
            </p>

            {/* Tech Stack Badges */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                Teknologi &amp; Pendekatan
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 text-xs font-medium rounded-lg bg-zinc-900 text-zinc-200 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-zinc-950 bg-brand-cyan hover:bg-sky-400 transition-colors shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Kunjungi Live Preview</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}

              <button
                onClick={onClose}
                className="ml-auto text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

