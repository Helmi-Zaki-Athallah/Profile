import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md transition-all animate-bounce-short bg-[#12161F]/95 text-white border-[#1E2638]">
      {isSuccess && <CheckCircle2 className="text-emerald-400" size={18} />}
      {isError && <AlertCircle className="text-rose-400" size={18} />}
      {!isSuccess && !isError && <Info className="text-cyan-400" size={18} />}
      <span className="text-sm font-medium">{toast.message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-slate-700/50 rounded-lg text-slate-400 hover:text-white"
      >
        <X size={14} />
      </button>
    </div>
  );
}
