import React, { useState, useEffect } from 'react';
import { FolderKanban, Plus, Edit2, Trash2, Save, X, Loader2, ExternalLink, Image as ImageIcon, Layers } from 'lucide-react';
import { getProjects, createProject, updateProject, deleteProject } from '../services/api';

export default function ProjectsManager({ showToast }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      showToast(err.message || 'Gagal memuat data proyek', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNew = () => {
    setEditingItem({
      slug: '',
      title: '',
      full_title_id: '',
      full_title_en: '',
      subtitle_id: '',
      subtitle_en: '',
      tagline_id: '',
      tagline_en: '',
      category_id: 'WordPress & Elementor',
      category_en: 'WordPress & Elementor',
      badge_id: 'Teknologi Digital',
      badge_en: 'Digital Tech',
      year: '2026',
      image: '',
      live_url: '',
      overview_id: '',
      overview_en: '',
      problem_id: '',
      problem_en: '',
      details: { role: { id: '', en: '' }, timeline: { id: '', en: '' }, scope: { id: '', en: '' } },
      metrics: { id: [], en: [] },
      features: { id: [], en: [] },
      challenges: { id: [], en: [] },
      learnings: { id: [], en: [] },
      roadmap: { id: [], en: [] },
      tech_stack: { frontend: [], cms: [], optimization: [], tools: [] },
      gallery: [],
      sort_order: projects.length,
    });
  };

  const handleEdit = (item) => {
    setEditingItem({
      ...item,
      details: item.details || {},
      metrics: item.metrics || { id: [], en: [] },
      features: item.features || { id: [], en: [] },
      challenges: item.challenges || { id: [], en: [] },
      learnings: item.learnings || { id: [], en: [] },
      roadmap: item.roadmap || { id: [], en: [] },
      tech_stack: item.tech_stack || {},
      gallery: item.gallery || [],
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus proyek ini?')) return;
    try {
      await deleteProject(id);
      showToast('Proyek berhasil dihapus dari MySQL', 'success');
      fetchData();
    } catch (err) {
      showToast(err.message || 'Gagal menghapus proyek', 'error');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingItem.id) {
        await updateProject(editingItem.id, editingItem);
        showToast('Proyek berhasil diperbarui di MySQL!', 'success');
      } else {
        await createProject(editingItem);
        showToast('Proyek baru berhasil ditambahkan ke MySQL!', 'success');
      }
      setEditingItem(null);
      fetchData();
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan proyek', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E2638]">
        <div>
          <h3 className="text-base font-bold text-white">Studi Kasus Proyek</h3>
          <p className="text-xs text-slate-400">
            Kelola detail studi kasus, ringkasan tantangan, metrik performa, dan galeri tangkapan layar.
          </p>
        </div>

        {!editingItem && (
          <button
            onClick={handleOpenNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus size={15} />
            <span>Tambah Proyek Baru</span>
          </button>
        )}
      </div>

      {/* Editor Modal / Inline Form */}
      {editingItem && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#12161F] border border-indigo-500/30 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FolderKanban size={16} className="text-indigo-400" />
              <span>{editingItem.id ? `Edit: ${editingItem.title}` : 'Buat Proyek Baru'}</span>
            </h4>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="p-1 hover:bg-[#1A2234] rounded-lg text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Core Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Judul Ringkas</label>
              <input
                type="text"
                required
                value={editingItem.title || ''}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                placeholder="IYMPACK.id"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Slug URL</label>
              <input
                type="text"
                required
                value={editingItem.slug || ''}
                onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                placeholder="iympack-id"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tahun</label>
              <input
                type="text"
                value={editingItem.year || ''}
                onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                placeholder="2026"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Gambar Utama (Path / URL)</label>
              <input
                type="text"
                value={editingItem.image || ''}
                onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                placeholder="/projects/Cuplikan-layar-2026-08-07-160114.png"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Live Demo URL</label>
              <input
                type="text"
                value={editingItem.live_url || ''}
                onChange={(e) => setEditingItem({ ...editingItem, live_url: e.target.value })}
                placeholder="https://iympack.id"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Kategori (ID)</label>
              <input
                type="text"
                value={editingItem.category_id || ''}
                onChange={(e) => setEditingItem({ ...editingItem, category_id: e.target.value })}
                placeholder="WordPress & Elementor"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Kategori (EN)</label>
              <input
                type="text"
                value={editingItem.category_en || ''}
                onChange={(e) => setEditingItem({ ...editingItem, category_en: e.target.value })}
                placeholder="WordPress & Elementor"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Badge Label (ID)</label>
              <input
                type="text"
                value={editingItem.badge_id || ''}
                onChange={(e) => setEditingItem({ ...editingItem, badge_id: e.target.value })}
                placeholder="Teknologi Relawan"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Bilingual Full Titles & Subtitles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#1E2638]">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Judul Lengkap (ID)</label>
              <input
                type="text"
                value={editingItem.full_title_id || ''}
                onChange={(e) => setEditingItem({ ...editingItem, full_title_id: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Judul Lengkap (EN)</label>
              <input
                type="text"
                value={editingItem.full_title_en || ''}
                onChange={(e) => setEditingItem({ ...editingItem, full_title_en: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Sub Judul (ID)</label>
              <textarea
                rows={2}
                value={editingItem.subtitle_id || ''}
                onChange={(e) => setEditingItem({ ...editingItem, subtitle_id: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Sub Judul (EN)</label>
              <textarea
                rows={2}
                value={editingItem.subtitle_en || ''}
                onChange={(e) => setEditingItem({ ...editingItem, subtitle_en: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Overview & Problem */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#1E2638]">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Overview / Ringkasan (ID)</label>
              <textarea
                rows={3}
                value={editingItem.overview_id || ''}
                onChange={(e) => setEditingItem({ ...editingItem, overview_id: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Overview / Summary (EN)</label>
              <textarea
                rows={3}
                value={editingItem.overview_en || ''}
                onChange={(e) => setEditingItem({ ...editingItem, overview_en: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Masalah yang Diselesaikan (ID)</label>
              <textarea
                rows={3}
                value={editingItem.problem_id || ''}
                onChange={(e) => setEditingItem({ ...editingItem, problem_id: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">The Problem (EN)</label>
              <textarea
                rows={3}
                value={editingItem.problem_en || ''}
                onChange={(e) => setEditingItem({ ...editingItem, problem_en: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Gallery */}
          <div className="pt-2 border-t border-[#1E2638]">
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Galeri Tangkapan Layar (URL / Path, pisahkan dengan koma)
            </label>
            <textarea
              rows={2}
              value={Array.isArray(editingItem.gallery) ? editingItem.gallery.join(', ') : ''}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  gallery: e.target.value.split(',').map((u) => u.trim()).filter(Boolean),
                })
              }
              placeholder="/projects/img1.png, /projects/img2.png"
              className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#1E2638]">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 rounded-xl bg-[#0D1117] hover:bg-[#1A2234] text-slate-300 text-xs font-semibold transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>Simpan ke Database</span>
            </button>
          </div>
        </form>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-16 text-slate-400 gap-3">
          <Loader2 size={24} className="animate-spin text-indigo-500" />
          <span>Memuat studi kasus proyek...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#12161F] border border-[#1E2638] text-slate-400 text-sm">
          Belum ada proyek tersimpan di database.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl bg-[#12161F] border border-[#1E2638] hover:border-indigo-500/40 transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image Preview */}
                <div className="h-40 bg-[#0A0C10] relative overflow-hidden border-b border-[#1E2638]">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <ImageIcon size={32} />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur text-[10px] text-white font-mono">
                    {proj.year || '2026'}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold">
                      {proj.category_id}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{proj.subtitle_id}</p>
                </div>
              </div>

              <div className="p-4 bg-[#0D1117] border-t border-[#1E2638] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">/{proj.slug}</span>
                <div className="flex items-center gap-1.5">
                  {proj.live_url && (
                    <a
                      href={proj.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1A2234]"
                      title="Kunjungi Web"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => handleEdit(proj)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1A2234]"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20"
                    title="Hapus"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
