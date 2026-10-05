import React, { useState, useEffect } from 'react';
import { Wrench, Plus, Edit2, Trash2, Save, X, Loader2, Layers } from 'lucide-react';
import {
  getSkills,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  createSkillItem,
  updateSkillItem,
  deleteSkillItem,
} from '../services/api';

export default function SkillsManager({ showToast }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null); // { category_id, ... }
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getSkills();
      setCategories(data || []);
    } catch (err) {
      showToast(err.message || 'Gagal memuat kategori keahlian', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Category Handlers
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingCategory.id) {
        await updateSkillCategory(editingCategory.id, editingCategory);
        showToast('Kategori keahlian berhasil diperbarui!', 'success');
      } else {
        await createSkillCategory(editingCategory);
        showToast('Kategori keahlian baru berhasil ditambahkan!', 'success');
      }
      setEditingCategory(null);
      fetchData();
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan kategori', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Hapus kategori ini beserta seluruh keahlian di dalamnya?')) return;
    try {
      await deleteSkillCategory(id);
      showToast('Kategori berhasil dihapus', 'success');
      fetchData();
    } catch (err) {
      showToast(err.message || 'Gagal menghapus kategori', 'error');
    }
  };

  // Skill Item Handlers
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingSkill.id) {
        await updateSkillItem(editingSkill.id, editingSkill);
        showToast('Keahlian berhasil diperbarui!', 'success');
      } else {
        await createSkillItem(editingSkill);
        showToast('Keahlian baru berhasil ditambahkan!', 'success');
      }
      setEditingSkill(null);
      fetchData();
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan keahlian', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Hapus item keahlian ini?')) return;
    try {
      await deleteSkillItem(id);
      showToast('Keahlian berhasil dihapus', 'success');
      fetchData();
    } catch (err) {
      showToast(err.message || 'Gagal menghapus keahlian', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E2638]">
        <div>
          <h3 className="text-base font-bold text-white">Keahlian & Kategori Stack</h3>
          <p className="text-xs text-slate-400">
            Atur pengelompokan skill (Frontend, CMS, Framework, Desain) dan daftar teknologinya.
          </p>
        </div>

        {!editingCategory && !editingSkill && (
          <button
            onClick={() =>
              setEditingCategory({
                index_label: `0${categories.length + 1}`,
                title_id: '',
                title_en: '',
                sort_order: categories.length,
              })
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus size={15} />
            <span>Tambah Kategori</span>
          </button>
        )}
      </div>

      {/* Category Editor Modal / Box */}
      {editingCategory && (
        <form onSubmit={handleSaveCategory} className="p-6 rounded-2xl bg-[#12161F] border border-indigo-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers size={16} className="text-indigo-400" />
              <span>{editingCategory.id ? 'Edit Kategori Keahlian' : 'Tambah Kategori Baru'}</span>
            </h4>
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
              className="p-1 hover:bg-[#1A2234] rounded-lg text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Index Label</label>
              <input
                type="text"
                required
                value={editingCategory.index_label || ''}
                onChange={(e) => setEditingCategory({ ...editingCategory, index_label: e.target.value })}
                placeholder="01"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Nama Kategori (ID)</label>
              <input
                type="text"
                required
                value={editingCategory.title_id || ''}
                onChange={(e) => setEditingCategory({ ...editingCategory, title_id: e.target.value })}
                placeholder="CMS & Pembangun Web"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Nama Kategori (EN)</label>
              <input
                type="text"
                required
                value={editingCategory.title_en || ''}
                onChange={(e) => setEditingCategory({ ...editingCategory, title_en: e.target.value })}
                placeholder="CMS & Web Builder"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#1E2638]">
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
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
              <span>Simpan Kategori</span>
            </button>
          </div>
        </form>
      )}

      {/* Skill Item Editor Modal / Box */}
      {editingSkill && (
        <form onSubmit={handleSaveSkill} className="p-6 rounded-2xl bg-[#12161F] border border-cyan-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Wrench size={16} className="text-cyan-400" />
              <span>{editingSkill.id ? 'Edit Item Keahlian' : 'Tambah Keahlian Baru'}</span>
            </h4>
            <button
              type="button"
              onClick={() => setEditingSkill(null)}
              className="p-1 hover:bg-[#1A2234] rounded-lg text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Nama Keahlian / Tool</label>
              <input
                type="text"
                required
                value={editingSkill.name || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                placeholder="WordPress, React, Figma"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Icon URL / SVG Path</label>
              <input
                type="text"
                value={editingSkill.icon || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                placeholder="/icons/elementor.svg atau devicon url"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#1E2638]">
            <button
              type="button"
              onClick={() => setEditingSkill(null)}
              className="px-4 py-2 rounded-xl bg-[#0D1117] hover:bg-[#1A2234] text-slate-300 text-xs font-semibold transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>Simpan Item</span>
            </button>
          </div>
        </form>
      )}

      {/* Categories & Skills List */}
      {loading ? (
        <div className="flex items-center justify-center p-16 text-slate-400 gap-3">
          <Loader2 size={24} className="animate-spin text-indigo-500" />
          <span>Memuat data keahlian...</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#12161F] border border-[#1E2638] text-slate-400 text-sm">
          Belum ada kategori keahlian tersimpan di database.
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.id} className="p-6 rounded-2xl bg-[#12161F] border border-[#1E2638] space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2638]">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono font-bold text-xs">
                    {cat.index_label}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{cat.title_id}</h4>
                    <p className="text-[11px] text-slate-400">{cat.title_en}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setEditingSkill({
                        category_id: cat.id,
                        name: '',
                        icon: '',
                        sort_order: (cat.skills || []).length,
                      })
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D1117] hover:bg-[#151B28] text-cyan-400 text-xs font-semibold border border-[#1E2638]"
                  >
                    <Plus size={13} />
                    <span>Item Baru</span>
                  </button>
                  <button
                    onClick={() => setEditingCategory(cat)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0D1117]"
                    title="Edit Kategori"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20"
                    title="Hapus Kategori"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Skills Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
                {(!cat.skills || cat.skills.length === 0) ? (
                  <p className="text-xs text-slate-500 col-span-full py-2">Belum ada item keahlian di kategori ini.</p>
                ) : (
                  cat.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 rounded-xl bg-[#0D1117] border border-[#1E2638] flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        {skill.icon ? (
                          <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                        ) : (
                          <Wrench size={16} className="text-slate-500" />
                        )}
                        <span className="text-xs font-semibold text-slate-200">{skill.name}</span>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                        <button
                          onClick={() => setEditingSkill(skill)}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="p-1 text-rose-400 hover:text-rose-300"
                          title="Hapus"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
