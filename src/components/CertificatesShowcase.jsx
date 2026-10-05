import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { certificates, getLocalized } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import TiltCard from './TiltCard';

export default function CertificatesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const { language, t } = useLanguage();

  const activeCert = certificates[activeIndex] || certificates[0];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % certificates.length);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  const handleOpenZoom = () => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
    setIsZoomOpen(true);
  };

  const handleCloseZoom = useCallback(() => {
    setIsZoomOpen(false);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(3.5, Number((prev + 0.35).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const next = Math.max(1, Number((prev - 0.35).toFixed(2)));
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleToggleDoubleClick = (e) => {
    e.stopPropagation();
    if (zoomScale > 1) {
      handleResetZoom();
    } else {
      setZoomScale(2);
    }
  };

  const modalViewportRef = useRef(null);

  // Lock body scroll with scrollbar-width compensation to eliminate layout shift
  useEffect(() => {
    if (!isZoomOpen) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isZoomOpen]);

  // Non-passive wheel event listener on the modal viewport to completely block background scroll
  useEffect(() => {
    if (!isZoomOpen) return;
    const viewport = modalViewportRef.current;
    if (!viewport) return;

    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY < 0) {
        setZoomScale((prev) => Math.min(3.5, Number((prev + 0.2).toFixed(2))));
      } else {
        setZoomScale((prev) => {
          const next = Math.max(1, Number((prev - 0.2).toFixed(2)));
          if (next === 1) setPanPosition({ x: 0, y: 0 });
          return next;
        });
      }
    };

    const onTouchMove = (e) => {
      // Prevent mobile elastic scrolling
      e.preventDefault();
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('touchmove', onTouchMove);
    };
  }, [isZoomOpen]);

  // Drag & pan handling when zoomed in
  const handleMouseDown = (e) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - panPosition.x,
      y: e.clientY - panPosition.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoomScale <= 1) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    // Bound the pan relative to scale
    const maxBound = (zoomScale - 1) * 350;
    setPanPosition({
      x: Math.max(-maxBound, Math.min(maxBound, newX)),
      y: Math.max(-maxBound, Math.min(maxBound, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard controls when modal is open
  useEffect(() => {
    if (!isZoomOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseZoom();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen, handleCloseZoom, handleNext, handlePrev]);

  return (
    <section
      id="certificates"
      className="py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-12 bg-[#0e0e11] border-b border-zinc-800/60"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <p className="text-xs uppercase tracking-[3px] text-zinc-500 font-mono mb-2 sm:mb-3">
            {t.certificates.tag}
          </p>
          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none uppercase">
            {t.certificates.title} <br />
            <span className="text-zinc-500">{t.certificates.titleHighlight}</span>
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          
          {/* Left Column: Info, Active Spotlight, Stats, List */}
          <div className="lg:col-span-6 flex flex-col gap-6 sm:gap-8">
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg">
              {t.certificates.subDesc}
            </p>

            {/* Spotlight Showcase Box with TiltCard */}
            <TiltCard
              maxTilt={5}
              glowColor="rgba(69, 92, 233, 0.2)"
              className="p-5 sm:p-6 rounded-3xl bg-[#141419] border border-zinc-800 shadow-xl flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cobalt font-semibold flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-cobalt" />
                  {t.certificates.spotlightTag} — {activeCert.year}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                  {activeIndex + 1} / {certificates.length}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug break-words">
                {getLocalized(activeCert.title, language)}
              </h3>
              
              <p className="text-xs text-zinc-400 font-mono">
                {t.certificates.issuedBy} <strong className="text-zinc-200">{activeCert.issuer}</strong>
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeCert.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Zoom Lightbox & Official PDF Link */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-zinc-800/80">
                <button
                  type="button"
                  onClick={handleOpenZoom}
                  className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-cobalt hover:bg-cobalt/90 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cobalt/20 active:scale-[0.98] cursor-pointer"
                >
                  <ZoomIn size={14} />
                  <span>{t.certificates.zoomCertificate}</span>
                </button>

                <a
                  href="/sertifikat/sertif-helmi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 font-mono text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                  title={t.certificates.viewFullPdf}
                >
                  <Download size={13} />
                  <span className="hidden sm:inline">{t.certificates.viewFullPdf}</span>
                  <span className="sm:hidden">PDF</span>
                </a>
              </div>
            </TiltCard>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800">
              <div className="flex flex-col">
                <span className="font-bebas text-2xl sm:text-3xl text-cobalt">
                  2
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {t.certificates.officialCerts}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-2xl sm:text-3xl text-white">
                  10+
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {t.certificates.skillsValidated}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-2xl sm:text-3xl text-white">
                  100%
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {t.certificates.verifiedReal}
                </span>
              </div>
            </div>

            {/* Certificate Switcher List (with sleek vertical bar instead of dot) */}
            <div className="flex flex-col gap-2.5">
              {certificates.map((cert, idx) => (
                <button
                  key={cert.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setZoomScale(1);
                    setPanPosition({ x: 0, y: 0 });
                  }}
                  className={`p-3.5 rounded-xl flex items-center justify-between text-left transition-all text-xs font-mono cursor-pointer w-full overflow-hidden ${
                    activeIndex === idx
                      ? 'bg-zinc-900 text-white border border-zinc-700 shadow-md translate-x-1'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                    <span
                      className={`w-1 h-4 rounded-sm flex-shrink-0 transition-all ${
                        activeIndex === idx ? 'bg-cobalt shadow-[0_0_8px_rgba(69,92,233,0.7)]' : 'bg-zinc-700'
                      }`}
                    />
                    <span className="truncate font-semibold text-xs sm:text-sm">
                      {getLocalized(cert.title, language)}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono flex-shrink-0 whitespace-nowrap">
                    {cert.year}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: High-Clarity Interactive Certificate Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <TiltCard
              maxTilt={6}
              glowColor="rgba(69, 92, 233, 0.25)"
              className="relative w-full max-w-[440px] rounded-3xl bg-[#141419] border border-zinc-800 p-3 sm:p-4 shadow-2xl group select-none overflow-hidden"
            >
              {/* Certificate Image Frame */}
              <div
                onClick={handleOpenZoom}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/80 border border-zinc-700/80 cursor-zoom-in group/frame flex items-center justify-center shadow-inner"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCert.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="w-full h-full relative flex items-center justify-center"
                  >
                    <img
                      src={activeCert.image}
                      alt={getLocalized(activeCert.title, language)}
                      className="w-full h-full object-contain p-2 sm:p-3 transition-transform duration-500 group-hover/frame:scale-[1.03]"
                    />

                    {/* Subtle vignette border inside frame */}
                    <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Zoom In Trigger Badge on Card */}
                <div className="absolute bottom-3 right-3 z-10 px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-zinc-700 text-white font-mono text-[11px] flex items-center gap-1.5 shadow-xl group-hover/frame:bg-cobalt group-hover/frame:border-cobalt transition-all">
                  <ZoomIn size={13} />
                  <span>{t.certificates.zoomCertificate}</span>
                </div>

                {/* Top Badge: Type & Index */}
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-zinc-800 text-zinc-300 font-mono text-[10px] uppercase tracking-wider">
                  {getLocalized(activeCert.type, language)}
                </div>
              </div>

              {/* Navigation Footer Under Card */}
              <div className="flex items-center justify-between pt-3.5 px-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft size={14} />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <p className="text-[11px] text-zinc-500 font-mono text-center">
                  {t.certificates.tapToCycle}
                </p>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
                  title="Next"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </TiltCard>
          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* FULLSCREEN CERTIFICATE ZOOM MODAL (LIGHTBOX)                   */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99999] flex flex-col bg-black/92 backdrop-blur-xl select-none touch-none overscroll-contain"
            onClick={handleCloseZoom}
          >
            {/* Top Toolbar */}
            <div
              className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-zinc-950/80 border-b border-zinc-800/80 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title & Metadata */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cobalt/20 text-cobalt border border-cobalt/30 whitespace-nowrap">
                  {activeIndex + 1} / {certificates.length}
                </span>
                <div className="truncate">
                  <h4 className="text-xs sm:text-sm font-bold text-white font-mono truncate">
                    {getLocalized(activeCert.title, language)}
                  </h4>
                  <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">
                    {activeCert.issuer} — {activeCert.year}
                  </span>
                </div>
              </div>

              {/* Center / Right: Zoom & Navigation Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Zoom Out */}
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 1}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                  title={t.certificates.zoomOut}
                >
                  <ZoomOut size={16} />
                </button>

                {/* Scale Display Pill (Click to reset) */}
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="px-2.5 py-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono font-medium min-w-[56px] text-center transition-colors cursor-pointer"
                  title={t.certificates.resetZoom}
                >
                  {Math.round(zoomScale * 100)}%
                </button>

                {/* Zoom In */}
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 3.5}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                  title={t.certificates.zoomIn}
                >
                  <ZoomIn size={16} />
                </button>

                {/* Reset Zoom Icon */}
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer hidden sm:flex"
                  title={t.certificates.resetZoom}
                >
                  <RotateCcw size={15} />
                </button>

                <div className="w-[1px] h-5 bg-zinc-800 mx-1 hidden sm:block" />

                {/* PDF Link */}
                <a
                  href="/sertifikat/sertif-helmi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                  title={t.certificates.viewFullPdf}
                >
                  <Download size={16} />
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleCloseZoom}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 border border-zinc-700 hover:border-red-500/40 transition-colors cursor-pointer ml-1"
                  title={t.certificates.close}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Viewport for Certificate Image with Pan & Zoom */}
            <div
              ref={modalViewportRef}
              className={`relative flex-1 w-full h-full overflow-hidden flex items-center justify-center p-4 sm:p-8 touch-none overscroll-contain ${
                zoomScale > 1
                  ? isDragging
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : 'cursor-zoom-in'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onDoubleClick={handleToggleDoubleClick}
              onClick={(e) => {
                // If clicked outside the image or not dragging, let background click close only if at 1x
                if (zoomScale === 1 && e.target === e.currentTarget) {
                  handleCloseZoom();
                }
              }}
            >
              {/* Previous Arrow Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 sm:left-6 z-30 p-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 backdrop-blur-md transition-all shadow-xl active:scale-95 cursor-pointer"
                title="Previous Certificate"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next Arrow Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 sm:right-6 z-30 p-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 backdrop-blur-md transition-all shadow-xl active:scale-95 cursor-pointer"
                title="Next Certificate"
              >
                <ChevronRight size={22} />
              </button>

              {/* Zoomable Image Container */}
              <motion.div
                animate={{
                  scale: zoomScale,
                  x: panPosition.x,
                  y: panPosition.y,
                }}
                transition={{
                  scale: { duration: 0.18, ease: 'easeOut' },
                  x: { duration: isDragging ? 0 : 0.15, ease: 'easeOut' },
                  y: { duration: isDragging ? 0 : 0.15, ease: 'easeOut' },
                }}
                className="relative max-w-full max-h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activeCert.image}
                  alt={getLocalized(activeCert.title, language)}
                  draggable={false}
                  className="max-w-[92vw] max-h-[76vh] object-contain rounded-xl shadow-2xl border border-zinc-700/50 bg-black pointer-events-auto"
                />
              </motion.div>
            </div>

            {/* Bottom Guide Hint */}
            <div
              className="relative z-20 py-2.5 px-4 bg-zinc-950/80 border-t border-zinc-800/80 backdrop-blur-md text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[11px] text-zinc-400 font-mono">
                {t.certificates.hintZoom} &bull; <span className="text-zinc-500">ESC {t.certificates.close}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
