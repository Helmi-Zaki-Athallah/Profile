import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Github,
  Linkedin,
  Instagram
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const projectTypes = [
  'Website WordPress / Elementor',
  'Company Profile & Landing Page',
  'Toko Online / WooCommerce',
  'Frontend React / Web App',
  'Konsultasi Sistem / IoT'
];

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: projectTypes[0],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Mohon lengkapi semua bidang form!', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate direct contact via WhatsApp API or Email action
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast('Pesan berhasil terkirim! Helmi akan segera merespons.');
      
      // Auto open WhatsApp link with formatted inquiry
      const encodedMsg = encodeURIComponent(
        `Halo Helmi Zaki Athallah,\n\nNama: ${formData.name}\nEmail: ${formData.email}\nKebutuhan: ${formData.projectType}\nPesan: ${formData.message}`
      );
      window.open(`https://wa.me/6285925005036?text=${encodedMsg}`, '_blank');

      setFormData({
        name: '',
        email: '',
        projectType: projectTypes[0],
        message: ''
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative bg-zinc-950/70 border-t border-white/5">
      {/* Glow Effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-brand-cyan/10 to-transparent rounded-full filter blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-brand-cyan/30 text-brand-cyan text-xs font-mono mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GET IN TOUCH &bull; COLLABORATE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Mulai Konsultasi &amp; Kolaborasi
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
            Punya ide website bisnis, kebutuhan optimasi performa WordPress, atau proyek kreatif? Mari wujudkan bersama.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Quick Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              
              {/* Direct Info Card */}
              <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">
                  Hubungi Langsung
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                  Tersedia untuk proyek freelance, konsultasi website, dan kolaborasi teknik.
                </p>

                <div className="flex flex-col gap-4">
                  
                  {/* Email */}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-900/80 border border-white/5 hover:border-brand-cyan/40 text-zinc-300 hover:text-white transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-brand-cyan/10 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-zinc-950 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-zinc-400 font-mono">Email Pribadi</span>
                      <span className="text-xs sm:text-sm font-semibold">{personalInfo.email}</span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={personalInfo.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-900/80 border border-white/5 hover:border-emerald-500/40 text-zinc-300 hover:text-white transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-zinc-400 font-mono">WhatsApp Fast Response</span>
                      <span className="text-xs sm:text-sm font-semibold">{personalInfo.phone}</span>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-900/80 border border-white/5 text-zinc-300">
                    <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-zinc-400 font-mono">Domisili &amp; Kampus</span>
                      <span className="text-xs sm:text-sm font-semibold">{personalInfo.location}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Social Channels */}
              <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5">
                <span className="text-xs font-mono text-zinc-400 block mb-3">
                  TEMUKAN SAYA DI PLATFORM
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-600/20 text-sky-400 hover:bg-sky-600/30 border border-sky-500/20 text-xs font-medium transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personalInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-600/20 text-pink-400 hover:bg-pink-600/30 border border-pink-500/20 text-xs font-medium transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl glass-card border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">
              Kirim Pesan Proyek
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-8">
              Isi formulir di bawah ini untuk konsultasi langsung via WhatsApp / Email.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Nama Lengkap / Bisnis <span className="text-brand-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-sm text-white placeholder-zinc-500 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Email Aktif <span className="text-brand-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@perusahaan.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-sm text-white placeholder-zinc-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Project Type Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  Jenis Kebutuhan Website
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-sm text-white outline-none transition-all cursor-pointer"
                >
                  {projectTypes.map((type, idx) => (
                    <option key={idx} value={type} className="bg-zinc-950 text-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  Detail Pesan / Rencana <span className="text-brand-cyan">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan gambaran singkat proyek, estimasi waktu, atau fitur yang Anda inginkan..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-sm text-white placeholder-zinc-500 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-sm text-zinc-950 bg-gradient-to-r from-brand-cyan via-sky-400 to-brand-blue hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-block w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan &amp; Mulai Diskusi</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

