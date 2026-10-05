import React, { useState, useEffect } from 'react';
import { Save, Loader2, User, Mail, Globe, MapPin, GraduationCap, Share2, AlignLeft } from 'lucide-react';
import { getPersonalInfo, updatePersonalInfo } from '../services/api';

export default function PersonalInfoEditor({ showToast }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getPersonalInfo();
      setFormData(data || {});
    } catch (err) {
      showToast(err.message || 'Gagal mengambil data profil', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updatePersonalInfo(formData);
      showToast('Profil dan kontak berhasil diperbarui di MySQL!', 'success');
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan data', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 text-slate-400 gap-3">
        <Loader2 size={24} className="animate-spin text-indigo-500" />
        <span>Memuat data profil...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Action Bar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E2638]">
        <div>
          <h3 className="text-base font-bold text-white">Informasi Pribadi & Kontak</h3>
          <p className="text-xs text-slate-400">
            Kelola identitas, bio dwibahasa, tautan media sosial, dan detail kontak Anda.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
        </button>
      </div>

      {/* 1. Identity Information */}
      <div className="p-6 rounded-2xl bg-[#12161F] border border-[#1E2638] space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <User size={16} className="text-indigo-400" />
          <span>Identitas & Nama</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nama Lengkap</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nama Depan</label>
            <input
              type="text"
              value={formData.firstName || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Inisial</label>
            <input
              type="text"
              value={formData.initials || ''}
              onChange={(e) => handleChange('initials', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Headline & Role Labels (Bilingual) */}
      <div className="p-6 rounded-2xl bg-[#12161F] border border-[#1E2638] space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <AlignLeft size={16} className="text-cyan-400" />
          <span>Tagline & Headline (Dwibahasa ID / EN)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tagline (ID)</label>
            <input
              type="text"
              value={formData.tagline_id || ''}
              onChange={(e) => handleChange('tagline_id', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tagline (EN)</label>
            <input
              type="text"
              value={formData.tagline_en || ''}
              onChange={(e) => handleChange('tagline_en', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Label Peran (ID)</label>
            <input
              type="text"
              value={formData.roleLabel_id || ''}
              onChange={(e) => handleChange('roleLabel_id', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Label Peran (EN)</label>
            <input
              type="text"
              value={formData.roleLabel_en || ''}
              onChange={(e) => handleChange('roleLabel_en', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Sub Headline (ID)</label>
            <textarea
              rows={2}
              value={formData.subHeadline_id || ''}
              onChange={(e) => handleChange('subHeadline_id', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Sub Headline (EN)</label>
            <textarea
              rows={2}
              value={formData.subHeadline_en || ''}
              onChange={(e) => handleChange('subHeadline_en', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Contact & Socials */}
      <div className="p-6 rounded-2xl bg-[#12161F] border border-[#1E2638] space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Mail size={16} className="text-emerald-400" />
          <span>Kontak & Media Sosial</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Utama</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Alternatif</label>
            <input
              type="email"
              value={formData.emailAlt || ''}
              onChange={(e) => handleChange('emailAlt', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nomor Telepon</label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tautan WhatsApp</label>
            <input
              type="text"
              value={formData.whatsapp || ''}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">LinkedIn URL</label>
            <input
              type="text"
              value={formData.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Instagram URL</label>
            <input
              type="text"
              value={formData.instagram || ''}
              onChange={(e) => handleChange('instagram', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Education & Location */}
      <div className="p-6 rounded-2xl bg-[#12161F] border border-[#1E2638] space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <GraduationCap size={16} className="text-purple-400" />
          <span>Pendidikan & Lokasi</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Kampus / Universitas</label>
            <input
              type="text"
              value={formData.campus || ''}
              onChange={(e) => handleChange('campus', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Fakultas / Jurusan</label>
            <input
              type="text"
              value={formData.faculty || ''}
              onChange={(e) => handleChange('faculty', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Lokasi / Domisili</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button Bottom */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{saving ? 'Menyimpan...' : 'Simpan Semua Perubahan Profil'}</span>
        </button>
      </div>
    </form>
  );
}
