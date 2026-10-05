import React from 'react';
import {
  FolderKanban,
  Briefcase,
  Wrench,
  Award,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Database,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  FileCode2
} from 'lucide-react';

export default function Dashboard({ stats, setActiveTab, onGenerateStatic, isGenerating }) {
  const statCards = [
    {
      title: 'Studi Kasus Proyek',
      count: stats.projectsCount,
      tab: 'projects',
      icon: FolderKanban,
      color: 'from-blue-600/20 to-indigo-600/20',
      border: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Pengalaman Kerja',
      count: stats.experiencesCount,
      tab: 'experiences',
      icon: Briefcase,
      color: 'from-purple-600/20 to-pink-600/20',
      border: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      title: 'Kategori Keahlian',
      count: stats.skillsCatsCount,
      tab: 'skills',
      icon: Wrench,
      color: 'from-emerald-600/20 to-teal-600/20',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Sertifikat Resmi',
      count: stats.certificatesCount,
      tab: 'certificates',
      icon: Award,
      color: 'from-amber-600/20 to-orange-600/20',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-[#121622] to-cyan-900/20 border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <ShieldCheck size={13} /> Sistem Manajemen Konten Statis
          </span>
          <h2 className="text-xl font-bold text-white">Kelola Portfolio & Sinkronkan ke Statis</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Edit data langsung di MySQL melalui panel ini. Klik tombol Generate Static JSON agar website utama mengompilasi data terbaru tanpa runtime overhead.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onGenerateStatic}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
          >
            <RefreshCw size={16} className={isGenerating ? 'animate-spin' : ''} />
            <span>{isGenerating ? 'Menyinkronkan...' : 'Sinkronkan ke Statis'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => setActiveTab(card.tab)}
              className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} bg-[#12161F] border ${card.border} hover:scale-[1.02] cursor-pointer transition-all duration-200 group`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl bg-[#0D1117] border border-[#1E2638] ${card.iconColor}`}>
                  <Icon size={20} />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-slate-500 group-hover:text-white transition-colors"
                />
              </div>
              <div className="mt-4">
                <p className="text-3xl font-extrabold text-white">{card.count}</p>
                <p className="text-xs font-medium text-slate-400 mt-1">{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Architecture Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#12161F] border border-[#1E2638] space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers size={16} className="text-indigo-400" />
            <span>Alur Kerja 100% Statis (Zero LocalStorage)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-[#0D1117] border border-[#1E2638]">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold mb-2">
                1
              </div>
              <h4 className="text-xs font-semibold text-white">Input di Panel Admin</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Ubah informasi profil, proyek, keahlian, atau sertifikat kapan saja.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D1117] border border-[#1E2638]">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold mb-2">
                2
              </div>
              <h4 className="text-xs font-semibold text-white">Tersimpan di MySQL</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Backend API menyimpan seluruh data ke database MySQL terstruktur.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D1117] border border-[#1E2638]">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mb-2">
                3
              </div>
              <h4 className="text-xs font-semibold text-white">Ekspor Statis Otomatis</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Generator menghasilkan JSON statis tanpa perlu query database saat pengunjung membuka web.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-3">
            <FileCode2 className="text-indigo-400 shrink-0 mt-0.5" size={16} />
            <p className="text-xs text-indigo-200">
              Setiap kali Anda menekan tombol <strong className="text-white">"Sinkronkan ke Statis"</strong>, file <code className="px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 font-mono">public/data/portfolio.json</code> dan modul <code className="px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 font-mono">src/data/portfolioData.js</code> diperbarui seketika.
            </p>
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="p-6 rounded-2xl bg-[#12161F] border border-[#1E2638] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database size={16} className="text-cyan-400" />
              <span>Akses Cepat</span>
            </h3>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => setActiveTab('personal')}
                className="w-full text-left p-3 rounded-xl bg-[#0D1117] hover:bg-[#151B28] border border-[#1E2638] text-xs font-medium text-slate-300 flex items-center justify-between group transition-all"
              >
                <span>Edit Kontak & Profil Utama</span>
                <ArrowUpRight size={14} className="text-slate-500 group-hover:text-indigo-400" />
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className="w-full text-left p-3 rounded-xl bg-[#0D1117] hover:bg-[#151B28] border border-[#1E2638] text-xs font-medium text-slate-300 flex items-center justify-between group transition-all"
              >
                <span>Tambah / Edit Studi Kasus Proyek</span>
                <ArrowUpRight size={14} className="text-slate-500 group-hover:text-indigo-400" />
              </button>

              <button
                onClick={() => setActiveTab('certificates')}
                className="w-full text-left p-3 rounded-xl bg-[#0D1117] hover:bg-[#151B28] border border-[#1E2638] text-xs font-medium text-slate-300 flex items-center justify-between group transition-all"
              >
                <span>Kelola Sertifikat Terverifikasi</span>
                <ArrowUpRight size={14} className="text-slate-500 group-hover:text-indigo-400" />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E2638] mt-4">
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 size={14} />
              <span>Sistem 100% Siap Digunakan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
