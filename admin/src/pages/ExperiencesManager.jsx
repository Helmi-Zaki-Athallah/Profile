import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit2, Trash2, Save, X, Loader2, Calendar, Tag } from 'lucide-react';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../services/api';

export default function ExperiencesManager({ showToast }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null); // null = not editing, {} = new item, item = edit existing
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getExperiences();
      setExperiences(data || []);
    } catch (err) {
      showToast(err.message || 'Gagal memuat data pengalaman', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNew = () => {
    setEditingItem({
      role_id: '',
      role_en: '',
      company: '',
      duration_id: '',
      duration_en: '',
      type_id: '',
      type_en: '',
      description_id: '',
      description_en: '',
      tags: [],
      icon: '/foto/iympack-logo.png',
      sort_order: experiences.length,
    });
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pengalaman ini?')) return;
    try {
      await deleteExperience(id);
      showToast('Pengalaman berhasil dihapus dari MySQL', 'success');
      fetchData();
    } catch (err) {
      showToast(err.message || 'Gagal menghapus data', 'error');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingItem.id) {
        await updateExperience(editingItem.id, editingItem);
        showToast('Pengalaman berhasil diperbarui!', 'success');
      } else {
        await createExperience(editingItem);
        showToast('Pengalaman baru berhasil ditambahkan!', 'success');
      }
      setEditingItem(null);
      fetchData();
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan pengalaman', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E2638]">
        <div>
          <h3 className="text-base font-bold text-white">Pengalaman Kerja & Organisasi</h3>
          <p className="text-xs text-slate-400">
            Kelola riwayat karir, posisi organisasi, deskripsi peran, dan keahlian terkait.
          </p>
        </div>

        {!editingItem && (
          <button
            onClick={handleOpenNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus size={15} />
            <span>Tambah Pengalaman</span>
          </button>
        )}
      </div>

      {/* Form Modal / Inline Editor */}
      {editingItem && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#12161F] border border-indigo-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase size={16} className="text-indigo-400" />
              <span>{editingItem.id ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}</span>
            </h4>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="p-1 hover:bg-[#1A2234] rounded-lg text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Perusahaan / Organisasi</label>
              <input
                type="text"
                required
                value={editingItem.company || ''}
                onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                placeholder="IYMPACK Community"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Icon Path / URL</label>
              <input
                type="text"
                value={editingItem.icon || ''}
                onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                placeholder="/foto/iympack-logo.png"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Nama Peran (ID)</label>
              <input
                type="text"
                required
                value={editingItem.role_id || ''}
                onChange={(e) => setEditingItem({ ...editingItem, role_id: e.target.value })}
                placeholder="Web Developer"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Nama Peran (EN)</label>
              <input
                type="text"
                required
                value={editingItem.role_en || ''}
                onChange={(e) => setEditingItem({ ...editingItem, role_en: e.target.value })}
                placeholder="Web Developer"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Durasi (ID)</label>
              <input
                type="text"
                value={editingItem.duration_id || ''}
                onChange={(e) => setEditingItem({ ...editingItem, duration_id: e.target.value })}
                placeholder="2026 – Sekarang"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Durasi (EN)</label>
              <input
                type="text"
                value={editingItem.duration_en || ''}
                onChange={(e) => setEditingItem({ ...editingItem, duration_en: e.target.value })}
                placeholder="2026 – Present"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tipe Pengalaman (ID)</label>
              <input
                type="text"
                value={editingItem.type_id || ''}
                onChange={(e) => setEditingItem({ ...editingItem, type_id: e.target.value })}
                placeholder="Organisasi / Freelance"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tipe Pengalaman (EN)</label>
              <input
                type="text"
                value={editingItem.type_en || ''}
                onChange={(e) => setEditingItem({ ...editingItem, type_en: e.target.value })}
                placeholder="Organization / Freelance"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Deskripsi Tugas (ID)</label>
              <textarea
                rows={3}
                value={editingItem.description_id || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description_id: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Deskripsi Tugas (EN)</label>
              <textarea
                rows={3}
                value={editingItem.description_en || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description_en: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Tags / Keahlian Terkait (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={Array.isArray(editingItem.tags) ? editingItem.tags.join(', ') : ''}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
                placeholder="WordPress, HTML/CSS, UI/UX Design"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#1E2638]">
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

      {/* List Table */}
      {loading ? (
        <div className="flex items-center justify-center p-16 text-slate-400 gap-3">
          <Loader2 size={24} className="animate-spin text-indigo-500" />
          <span>Memuat data pengalaman...</span>
        </div>
      ) : experiences.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#12161F] border border-[#1E2638] text-slate-400 text-sm">
          Belum ada pengalaman terdaftar di database.
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#12161F] border border-[#1E2638] hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
                    {item.type_id || 'Pengalaman'}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar size={12} /> {item.duration_id}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {item.role_id} <span className="text-slate-400 font-normal">@ {item.company}</span>
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">{item.description_id}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#0D1117] text-[10px] text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 rounded-xl bg-[#0D1117] hover:bg-[#151B28] text-slate-300 hover:text-white border border-[#1E2638] transition-all"
                  title="Edit"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-[#0D1117] hover:bg-rose-500/20 text-rose-400 border border-[#1E2638] transition-all"
                  title="Hapus"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
