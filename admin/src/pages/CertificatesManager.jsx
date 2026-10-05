import React, { useState, useEffect } from 'react';
import { Award, Plus, Edit2, Trash2, Save, X, Loader2, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../services/api';

export default function CertificatesManager({ showToast }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getCertificates();
      setCertificates(data || []);
    } catch (err) {
      showToast(err.message || 'Gagal memuat data sertifikat', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNew = () => {
    setEditingItem({
      cert_key: `cert-${Date.now()}`,
      title_id: '',
      title_en: '',
      issuer: 'IYMPACK',
      year: '2026',
      type_id: 'Rekayasa Web',
      type_en: 'Web Engineering',
      image: '/sertifikat/sertif-helmi-page-1.png',
      accent_color: '#455CE9',
      skills: [],
      sort_order: certificates.length,
    });
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item, skills: item.skills || [] });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus sertifikat ini?')) return;
    try {
      await deleteCertificate(id);
      showToast('Sertifikat berhasil dihapus dari MySQL', 'success');
      fetchData();
    } catch (err) {
      showToast(err.message || 'Gagal menghapus sertifikat', 'error');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingItem.id) {
        await updateCertificate(editingItem.id, editingItem);
        showToast('Sertifikat berhasil diperbarui di MySQL!', 'success');
      } else {
        await createCertificate(editingItem);
        showToast('Sertifikat baru berhasil ditambahkan!', 'success');
      }
      setEditingItem(null);
      fetchData();
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan sertifikat', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E2638]">
        <div>
          <h3 className="text-base font-bold text-white">Sertifikat Resmi & Kredensial</h3>
          <p className="text-xs text-slate-400">
            Kelola verifikasi sertifikat kepemimpinan, rekayasa web, dan keahlian terverifikasi.
          </p>
        </div>

        {!editingItem && (
          <button
            onClick={handleOpenNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus size={15} />
            <span>Tambah Sertifikat</span>
          </button>
        )}
      </div>

      {/* Inline Form / Modal */}
      {editingItem && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#12161F] border border-indigo-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Award size={16} className="text-indigo-400" />
              <span>{editingItem.id ? 'Edit Sertifikat' : 'Tambah Sertifikat Baru'}</span>
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
              <label className="block text-xs font-semibold text-slate-400 mb-1">Key Unik</label>
              <input
                type="text"
                required
                value={editingItem.cert_key || ''}
                onChange={(e) => setEditingItem({ ...editingItem, cert_key: e.target.value })}
                placeholder="cert-webdev"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Penerbit (Issuer)</label>
              <input
                type="text"
                required
                value={editingItem.issuer || ''}
                onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                placeholder="IYMPACK"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Judul Sertifikat (ID)</label>
              <input
                type="text"
                required
                value={editingItem.title_id || ''}
                onChange={(e) => setEditingItem({ ...editingItem, title_id: e.target.value })}
                placeholder="Sertifikat Web Development"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Judul Sertifikat (EN)</label>
              <input
                type="text"
                required
                value={editingItem.title_en || ''}
                onChange={(e) => setEditingItem({ ...editingItem, title_en: e.target.value })}
                placeholder="Web Development Certificate"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tahun / Periode</label>
              <input
                type="text"
                value={editingItem.year || ''}
                onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                placeholder="2026"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Warna Aksen HEX</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={editingItem.accent_color || '#455CE9'}
                  onChange={(e) => setEditingItem({ ...editingItem, accent_color: e.target.value })}
                  className="w-9 h-9 rounded-lg bg-transparent border border-[#1E2638] cursor-pointer"
                />
                <input
                  type="text"
                  value={editingItem.accent_color || '#455CE9'}
                  onChange={(e) => setEditingItem({ ...editingItem, accent_color: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Gambar / Dokumen Sertifikat (Path)</label>
              <input
                type="text"
                value={editingItem.image || ''}
                onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                placeholder="/sertifikat/sertif-helmi-page-2.png"
                className="w-full px-3.5 py-2 bg-[#0D1117] border border-[#1E2638] rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Keahlian Teruji (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={Array.isArray(editingItem.skills) ? editingItem.skills.join(', ') : ''}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="WordPress Development, Elementor, Custom CSS3, Responsive UI/UX"
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
              <span>Simpan Sertifikat</span>
            </button>
          </div>
        </form>
      )}

      {/* Certificates List */}
      {loading ? (
        <div className="flex items-center justify-center p-16 text-slate-400 gap-3">
          <Loader2 size={24} className="animate-spin text-indigo-500" />
          <span>Memuat data sertifikat...</span>
        </div>
      ) : certificates.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#12161F] border border-[#1E2638] text-slate-400 text-sm">
          Belum ada sertifikat tersimpan di database.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-[#12161F] border border-[#1E2638] flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{
                        backgroundColor: `${cert.accent_color || '#455CE9'}20`,
                        color: cert.accent_color || '#455CE9',
                      }}
                    >
                      {cert.type_id}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">{cert.title_id}</h4>
                    <p className="text-xs text-slate-400">
                      {cert.issuer} • {cert.year}
                    </p>
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-[#0D1117] border border-[#1E2638] overflow-hidden shrink-0 flex items-center justify-center">
                    {cert.image ? (
                      <img src={cert.image} alt={cert.title_id} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={20} className="text-slate-600" />
                    )}
                  </div>
                </div>

                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#0D1117] text-[10px] text-slate-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#1E2638]">
                <span className="text-[11px] font-mono text-slate-500">{cert.cert_key}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEdit(cert)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0D1117]"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
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
