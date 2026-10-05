import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EntranceScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-white select-none overflow-hidden"
    >
      {/* Background Circuit Grid Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-cyan/10 filter blur-[100px] -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-purple/10 filter blur-[100px] -bottom-20 -right-20 pointer-events-none" />

      {/* Center HZA Monogram & Circuit Pulse */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-8"
        >
          {/* Outer Pulsing Circuit Ring */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand-cyan/30 via-brand-purple/30 to-brand-cyan/30 animate-spin-slow opacity-60 blur-md" />
          
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-zinc-950 border border-brand-cyan/40 flex items-center justify-center shadow-[0_0_50px_rgba(0,240,255,0.25)]">
            <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="entranceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path
                d="M22 30 L22 70 M22 50 L42 50 M42 30 L42 70"
                stroke="url(#entranceGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M50 32 L74 32 L50 68 L74 68"
                stroke="#00F0FF"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="82" cy="68" r="3.5" fill="#8B5CF6" />
            </svg>
          </div>
        </motion.div>

        {/* Text Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center px-4"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
            <span className="text-xs uppercase tracking-[0.3em] text-brand-cyan font-mono font-medium">
              INITIALIZING PORTFOLIO
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
            Helmi Zaki Athallah
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono">
            Universitas Pamulang &bull; Teknik Elektro &bull; Web Creator
          </p>
        </motion.div>

        {/* Progress Bar & Counter */}
        <div className="w-64 sm:w-80 mt-8">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-2">
            <span>LOADING ASSETS</span>
            <span className="text-brand-cyan font-semibold">{Math.min(progress, 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-cyan via-sky-400 to-brand-purple rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        {/* Skip button if user is in a hurry */}
        <button
          onClick={onComplete}
          className="mt-6 text-xs font-mono text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
        >
          Skip Intro &rarr;
        </button>
      </div>
    </motion.div>
  );
}

