import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Multilingual Greetings Dataset
export const GREETINGS = [
  { text: 'Halo' },
  { text: 'Hello' },
  { text: 'Bonjour' },
  { text: 'Ciao' },
  { text: 'Hola' },
  { text: 'Guten Tag' },
  { text: 'こんにちは' },
  { text: '안녕하세요' },
  { text: 'مرحباً' },
  { text: 'Olá' },
  { text: 'Namaste' },
  { text: 'Halo' },
];

/**
 * Pure Black Minimalist Fullscreen Preloader:
 * - Waits for page asset downloading to complete
 * - Immediately triggers background music when loader finishes
 */
export function InitialPageLoader({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWindowLoaded, setIsWindowLoaded] = useState(
    typeof document !== 'undefined' && document.readyState === 'complete'
  );
  const isFinishedRef = useRef(false);

  // Helper to start background music immediately
  const triggerAudio = () => {
    if (typeof window !== 'undefined' && window.__bgAudio && window.__bgAudio.paused) {
      window.__bgAudio.play().catch(() => {});
    }
  };

  // Track full page/network asset download
  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsWindowLoaded(true);
      return;
    }
    const handleLoad = () => setIsWindowLoaded(true);
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Finish loader and play music
  const finishAndPlay = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    triggerAudio();
    setTimeout(() => {
      triggerAudio();
      if (onComplete) onComplete();
    }, 180);
  };

  // Rapidly cycle through multilingual greetings
  useEffect(() => {
    const intervalTime = 140; // 140ms per greeting (~1.6s total)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= GREETINGS.length) {
          // If assets are still downloading, hold on final greeting until ready
          if (!isWindowLoaded && document.readyState !== 'complete') {
            return GREETINGS.length - 1;
          }
          clearInterval(interval);
          finishAndPlay();
          return prev;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isWindowLoaded]);

  // When slow asset download completes after greetings have finished cycling
  useEffect(() => {
    if (isWindowLoaded && currentIndex >= GREETINGS.length - 1) {
      finishAndPlay();
    }
  }, [isWindowLoaded, currentIndex]);

  const currentGreeting = GREETINGS[currentIndex] || GREETINGS[0];

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
      }}
      onClick={triggerAudio}
      onPointerDown={triggerAudio}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black text-white select-none overflow-hidden cursor-default"
    >
      {/* Center Multilingual Greeting Text ONLY */}
      <div className="relative z-10 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white font-sans text-center"
          >
            {currentGreeting.text}
          </motion.h1>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/**
 * Snappy Page Transition Curtain: Pure Black Background & Rapid Multilingual Greetings
 */
export function TransitionCurtain() {
  const [greetingIdx, setGreetingIdx] = useState(0);

  const transitionGreetings = [
    { text: 'Halo' },
    { text: 'Hello' },
    { text: 'Bonjour' },
    { text: 'Ciao' },
  ];

  useEffect(() => {
    const cycle = setInterval(() => {
      setGreetingIdx((prev) => (prev + 1) % transitionGreetings.length);
    }, 90);
    return () => clearInterval(cycle);
  }, []);

  const current = transitionGreetings[greetingIdx] || transitionGreetings[0];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{
        y: '0%',
        transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
      }}
      exit={{
        y: '-100%',
        transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white select-none overflow-hidden shadow-2xl pointer-events-auto"
    >
      {/* Center Multilingual Greeting Text ONLY */}
      <div className="relative z-10 flex items-center justify-center px-4">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-sans text-center">
          {current.text}
        </h2>
      </div>
    </motion.div>
  );
}

export default {
  InitialPageLoader,
  TransitionCurtain,
  GREETINGS,
};
