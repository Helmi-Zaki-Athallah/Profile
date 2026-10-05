import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl glass-card border border-brand-cyan/30 text-white shadow-2xl backdrop-blur-xl"
        style={{
          boxShadow: '0 10px 40px -10px rgba(0, 240, 255, 0.25)'
        }}
      >
        <div className="flex-shrink-0 text-brand-cyan">
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-brand-cyan" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-brand-cyan" />
          )}
        </div>
        
        <p className="text-sm font-medium text-zinc-100 pr-2">
          {toast.message}
        </p>

        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
          aria-label="Close Notification"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

