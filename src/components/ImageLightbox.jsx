import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, RotateCcw } from 'lucide-react';

export default function ImageLightbox({
  isOpen,
  images = [],
  initialIndex = 0,
  title = '',
  onClose
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomScale, setZoomScale] = useState(1);
  const swipeStartX = useRef(null);

  // Sync index when initialIndex changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex >= 0 && initialIndex < images.length ? initialIndex : 0);
      setZoomScale(1);
    }
  }, [isOpen, initialIndex, images.length]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const total = images.length;
  const currentImage = images[currentIndex];

  const navigatePhoto = useCallback((dir) => {
    if (total <= 1) return;
    setCurrentIndex((prev) => {
      if (dir === 'next') {
        return (prev + 1) % total;
      }
      return (prev - 1 + total) % total;
    });
    setZoomScale(1);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        navigatePhoto('next');
      } else if (e.key === 'ArrowLeft') {
        navigatePhoto('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, navigatePhoto]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentSrc = typeof currentImage === 'string' ? currentImage : currentImage?.url || currentImage?.image;
  const currentTitle = typeof currentImage === 'object' && (currentImage?.title || currentImage?.caption)
    ? (currentImage.title || currentImage.caption)
    : title;

  const content = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-label="Image Lightbox"
        className="fixed inset-0 z-[99999] flex items-center justify-center select-none bg-black/95 backdrop-blur-md"
        onTouchStart={(e) => {
          swipeStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (swipeStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - swipeStartX.current;
          swipeStartX.current = null;
          if (Math.abs(dx) > 50) {
            navigatePhoto(dx < 0 ? 'next' : 'prev');
          }
        }}
        onClick={onClose}
      >
        {/* Top Bar: Counter & Close Button */}
        <div className="absolute top-4 inset-x-4 sm:inset-x-6 flex items-center justify-between z-30 pointer-events-none">
          {total > 1 ? (
            <div className="pointer-events-auto bg-zinc-950/80 border border-white/15 rounded-full px-3.5 py-1 text-xs text-zinc-300 font-mono shadow-lg backdrop-blur-sm">
              {currentIndex + 1} / {total}
            </div>
          ) : <div />}

          <button
            type="button"
            onClick={onClose}
            className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950/80 hover:bg-zinc-800 text-white border border-white/20 transition-all cursor-pointer active:scale-95 shadow-xl hover:rotate-90 duration-200"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto('prev');
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-zinc-950/70 hover:bg-zinc-800 text-white border border-white/20 transition-all cursor-pointer active:scale-90 shadow-2xl backdrop-blur-sm hover:scale-105"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto('next');
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-zinc-950/70 hover:bg-zinc-800 text-white border border-white/20 transition-all cursor-pointer active:scale-90 shadow-2xl backdrop-blur-sm hover:scale-105"
            aria-label="Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Central Image Container */}
        <div
          className="relative flex flex-col items-center mx-4 sm:mx-20 max-w-[92vw] max-h-[88vh] z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative overflow-hidden rounded-t-xl bg-zinc-950 border-t border-x border-zinc-800/80 flex items-center justify-center">
            <img
              src={currentSrc}
              alt={currentTitle || `Screenshot ${currentIndex + 1}`}
              draggable={false}
              className="block object-contain max-w-full max-h-[calc(85vh-70px)] select-none transition-transform duration-200"
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: 'center center',
                cursor: zoomScale > 1 ? 'zoom-out' : 'zoom-in',
              }}
              onClick={() => setZoomScale((prev) => (prev > 1 ? 1 : 2))}
            />
          </div>

          {/* Bottom Bar: Title & Zoom Controls */}
          <div className="w-full bg-zinc-950/90 border border-zinc-800 rounded-b-xl px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl backdrop-blur-md">
            <div className="min-w-0 pr-2">
              <p className="text-white text-xs sm:text-sm font-semibold truncate leading-tight">
                {currentTitle || 'Tangkapan Layar Portofolio'}
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                {zoomScale > 1 ? 'Klik gambar untuk mereset zoom' : 'Klik gambar untuk memperbesar'}
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 bg-zinc-900/90 px-2 py-1 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.max(prev - 0.3, 1))}
                disabled={zoomScale <= 1}
                className="w-7 h-7 flex items-center justify-center rounded text-zinc-300 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Perkecil"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-mono text-zinc-300 w-10 text-center tabular-nums">
                {Math.round(zoomScale * 100)}%
              </span>

              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.min(prev + 0.3, 3))}
                disabled={zoomScale >= 3}
                className="w-7 h-7 flex items-center justify-center rounded text-zinc-300 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Perbesar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {zoomScale > 1 && (
                <button
                  type="button"
                  onClick={() => setZoomScale(1)}
                  className="w-7 h-7 flex items-center justify-center rounded text-zinc-400 hover:text-white hover:bg-white/15 transition-colors cursor-pointer ml-1"
                  title="Reset Zoom (100%)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
}
