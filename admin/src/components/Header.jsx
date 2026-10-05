import React from 'react';
import { Database, ShieldCheck, Sparkles } from 'lucide-react';

export default function Header({ user, title, subtitle }) {
  return (
    <header className="h-16 border-b border-[#1E2638] bg-[#0D1117]/80 backdrop-blur px-8 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h2 className="text-base font-bold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#151B28] border border-[#1E2638] text-xs font-mono text-cyan-400">
          <Database size={13} />
          <span>MySQL Connected</span>
        </div>

        <div className="flex items-center gap-2 pl-3 border-l border-[#1E2638]">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
            {user?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-white leading-none">{user?.username || 'Admin'}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck size={10} /> Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
