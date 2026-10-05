import React, { useState } from 'react';
import { Shield, Lock, User, ArrowRight, Loader2, Database } from 'lucide-react';
import { apiLogin } from '../services/api';

export default function Login({ onLoginSuccess, showToast }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      showToast('Harap isi username dan password', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await apiLogin(username, password);
      showToast('Login berhasil! Selamat datang kembali.', 'success');
      onLoginSuccess(res.user);
    } catch (err) {
      showToast(err.message || 'Gagal login. Periksa username dan password Anda.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-[#0D1117] border border-[#1E2638] rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 mb-4">
              <Shield size={28} />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">HZA Portfolio CMS</h1>
            <p className="text-xs text-slate-400 mt-1">
              Admin Control Panel & MySQL Data Manager
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#151B28] border border-[#1E2638] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#151B28] border border-[#1E2638] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Panel Admin</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Database Notice */}
          <div className="mt-6 pt-6 border-t border-[#1E2638] text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151B28] text-[11px] text-slate-400 font-mono">
              <Database size={12} className="text-cyan-400" />
              <span>Default Login: admin / admin123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
