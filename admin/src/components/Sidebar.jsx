import React from 'react';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderKanban,
  Wrench,
  Award,
  LogOut,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onLogout, onGenerateStatic, isGenerating }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'personal', label: 'Profil & Kontak', icon: User },
    { id: 'projects', label: 'Proyek & Studi Kasus', icon: FolderKanban },
    { id: 'experiences', label: 'Pengalaman Kerja', icon: Briefcase },
    { id: 'skills', label: 'Keahlian & Kategori', icon: Wrench },
    { id: 'certificates', label: 'Sertifikat Resmi', icon: Award },
  ];

  return (
    <aside className="w-64 bg-[#0D1117] border-r border-[#1E2638] flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#1E2638] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            H
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide text-white">HZA CMS</h1>
            <p className="text-[11px] text-slate-400 font-mono">Portfolio Admin</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#151B28]'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-[#1E2638] space-y-3">
        {/* 100% Static Sync Button */}
        <button
          onClick={onGenerateStatic}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold tracking-wide transition-all disabled:opacity-50"
          title="Tarik perubahan dari MySQL dan generate file statis"
        >
          <RefreshCw size={14} className={isGenerating ? 'animate-spin' : ''} />
          <span>{isGenerating ? 'Menyinkronkan...' : 'Generate Static JSON'}</span>
        </button>

        {/* View Live Portfolio */}
        <a
          href={import.meta.env.VITE_PORTFOLIO_URL || 'http://localhost:3000'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#151B28] hover:bg-[#1A2234] text-slate-300 text-xs font-medium transition-all"
        >
          <ExternalLink size={13} />
          <span>Lihat Website Portfolio</span>
        </a>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-xs font-medium transition-all"
        >
          <LogOut size={14} />
          <span>Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
}
