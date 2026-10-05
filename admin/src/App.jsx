import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PersonalInfoEditor from './pages/PersonalInfoEditor';
import ExperiencesManager from './pages/ExperiencesManager';
import ProjectsManager from './pages/ProjectsManager';
import SkillsManager from './pages/SkillsManager';
import CertificatesManager from './pages/CertificatesManager';

import {
  getAuthToken,
  clearAuthToken,
  triggerGenerateStatic,
  getProjects,
  getExperiences,
  getSkills,
  getCertificates,
} from './services/api';

export default function App() {
  const [user, setUser] = useState(() => {
    const token = getAuthToken();
    return token ? { username: 'admin' } : null;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Global dashboard counts
  const [stats, setStats] = useState({
    projectsCount: 0,
    experiencesCount: 0,
    skillsCatsCount: 0,
    certificatesCount: 0,
  });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  const handleLogout = () => {
    clearAuthToken();
    setUser(null);
    showToast('Sesi telah berakhir. Anda telah keluar.', 'info');
  };

  useEffect(() => {
    const handleExpired = () => {
      setUser(null);
      showToast('Sesi login telah berakhir. Silakan login kembali.', 'error');
    };
    window.addEventListener('auth:expired', handleExpired);
    return () => window.removeEventListener('auth:expired', handleExpired);
  }, []);

  const loadDashboardStats = async () => {
    if (!user) return;
    try {
      const [p, e, s, c] = await Promise.all([
        getProjects().catch(() => []),
        getExperiences().catch(() => []),
        getSkills().catch(() => []),
        getCertificates().catch(() => []),
      ]);
      setStats({
        projectsCount: p?.length || 0,
        experiencesCount: e?.length || 0,
        skillsCatsCount: s?.length || 0,
        certificatesCount: c?.length || 0,
      });
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (user) {
      loadDashboardStats();
    }
  }, [user, activeTab]);

  const handleGenerateStatic = async () => {
    setIsGenerating(true);
    try {
      await triggerGenerateStatic();
      showToast('✅ Berhasil menyinkronkan data MySQL ke Static JSON & Module!', 'success');
    } catch (err) {
      showToast(err.message || 'Gagal menghasilkan file statis', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!user) {
    return (
      <>
        <Login onLoginSuccess={(u) => setUser(u)} showToast={showToast} />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  const titles = {
    dashboard: { title: 'Dashboard Ikhtisar', subtitle: 'Pusat kontrol dan status data portfolio' },
    personal: { title: 'Informasi Pribadi', subtitle: 'Biodata, peran, dan saluran komunikasi' },
    projects: { title: 'Studi Kasus Proyek', subtitle: 'Portofolio karya dan spesifikasi teknis' },
    experiences: { title: 'Pengalaman Kerja', subtitle: 'Riwayat profesional dan keterlibatan komunitas' },
    skills: { title: 'Keahlian & Stack', subtitle: 'Pengelompokan teknologi dan perkakas' },
    certificates: { title: 'Sertifikat Resmi', subtitle: 'Kredensial dan lisensi terverifikasi' },
  };

  const currentMeta = titles[activeTab] || titles.dashboard;

  return (
    <div className="flex min-h-screen bg-[#0A0C10] text-[#E2E8F0]">
      {/* Fixed Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        onGenerateStatic={handleGenerateStatic}
        isGenerating={isGenerating}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} title={currentMeta.title} subtitle={currentMeta.subtitle} />

        <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              stats={stats}
              setActiveTab={setActiveTab}
              onGenerateStatic={handleGenerateStatic}
              isGenerating={isGenerating}
            />
          )}
          {activeTab === 'personal' && <PersonalInfoEditor showToast={showToast} />}
          {activeTab === 'projects' && <ProjectsManager showToast={showToast} />}
          {activeTab === 'experiences' && <ExperiencesManager showToast={showToast} />}
          {activeTab === 'skills' && <SkillsManager showToast={showToast} />}
          {activeTab === 'certificates' && <CertificatesManager showToast={showToast} />}
        </main>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
