import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import Toast from './components/Toast';
import MusicPlayer from './components/MusicPlayer';
import { InitialPageLoader, TransitionCurtain } from './components/PageLoader';
import HomeView from './views/HomeView';
import ProjectsView from './views/ProjectsView';
import CaseStudyView from './views/CaseStudyView';
import AboutView from './views/AboutView';
import ResumeView from './views/ResumeView';
import ContactView from './views/ContactView';

function AppContent() {
  const { language, t } = useLanguage();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState(null);

  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash.startsWith('project/') || hash.startsWith('projects/')) {
      const slug = hash.replace('projects/', '').replace('project/', '');
      return `project/${slug}`;
    }
    if (['home', 'project', 'projects', 'about', 'resume', 'contact'].includes(hash)) {
      return hash === 'projects' ? 'project' : hash;
    }
    return 'home';
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleNavigate = (pageKey) => {
    let normalizedKey = pageKey;
    if (pageKey === 'projects') normalizedKey = 'project';
    if (pageKey.startsWith('projects/')) normalizedKey = pageKey.replace('projects/', 'project/');
    
    // If clicking same active page, just scroll to top
    if (normalizedKey === activePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Trigger smooth page transition curtain
    setIsTransitioning(true);
    setTransitionTarget(normalizedKey);

    // Switch view content halfway when screen is blanketed
    setTimeout(() => {
      setActivePage(normalizedKey);
      window.location.hash = normalizedKey;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 340);

    // Unveil new page
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionTarget(null);
    }, 760);
  };

  const handleLoaderComplete = () => {
    setIsInitialLoading(false);
    if (typeof window !== 'undefined' && window.__bgAudio && window.__bgAudio.paused) {
      window.__bgAudio.play().catch(() => {});
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      let target = 'home';
      if (hash.startsWith('project/') || hash.startsWith('projects/')) {
        const slug = hash.replace('projects/', '').replace('project/', '');
        target = `project/${slug}`;
      } else if (['home', 'project', 'projects', 'about', 'resume', 'contact'].includes(hash)) {
        target = hash === 'projects' ? 'project' : hash;
      }

      if (target !== activePage && !isTransitioning) {
        setIsTransitioning(true);
        setTransitionTarget(target);
        setTimeout(() => {
          setActivePage(target);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, 340);
        setTimeout(() => {
          setIsTransitioning(false);
          setTransitionTarget(null);
        }, 760);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activePage, isTransitioning]);

  const handleDownloadResume = () => {
    showToast(language === 'id' ? 'Menyiapkan dokumen Résumé PDF...' : 'Preparing PDF résumé document...');

    const isId = language === 'id';
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      // Fallback text download if popups are completely blocked
      const fallbackText = isId 
        ? `HELMI ZAKI ATHALLAH\n+62 859 2500 5036 | athallahhelmi2@gmail.com | linkedin.com/in/helmi-zaki | https://helmizakiathallah.my.id\n\nPENDIDIKAN:\nUniversitas Pamulang (UNPAM) - S1 Teknik Elektro (Sept. 2024 – Sekarang)\n\nPENGALAMAN:\n1. Koordinator Proyek & Logistik | Proyek Relawan Komunitas (Agu. 2025 - 2026)\n2. Web Developer | Proyek Relawan Komunitas (Mei 2026)\n\nPROYEK:\n1. Portal Organisasi IYMPACK (WordPress, HTML, CSS)\n2. Website Portfolio Pribadi (WordPress, Elementor Pro, Astra Pro)\n3. Kasir Pintar POS (React.js, Firebase, Cloud Firestore)\n\nKEAHLIAN:\nReact.js, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3, Vite, Node.js, Express.js, MySQL, REST API, Firebase, WordPress, Elementor Pro, WooCommerce, Arduino IDE, Python, Git/GitHub, Figma, Canva, Manajemen Logistik`
        : `HELMI ZAKI ATHALLAH\n+62 859 2500 5036 | athallahhelmi2@gmail.com | linkedin.com/in/helmi-zaki | https://helmizakiathallah.my.id\n\nEDUCATION:\nUniversitas Pamulang (UNPAM) - Bachelor of Electrical Engineering (Sept. 2024 – Present)\n\nEXPERIENCE:\n1. Project Coordinator & Logistics | Community Volunteer Project (Aug. 2025 - 2026)\n2. Web Developer | Community Volunteer Project (May 2026)\n\nPROJECTS:\n1. IYMPACK Organization Portal (WordPress, HTML, CSS)\n2. Personal Portfolio Website (WordPress, Elementor Pro, Astra Pro)\n3. Kasir Pintar POS (React.js, Firebase, Cloud Firestore)\n\nTECHNICAL SKILLS:\nReact.js, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3, Vite, Node.js, Express.js, MySQL, REST API, Firebase, WordPress, Elementor Pro, WooCommerce, Arduino IDE, Python, Git/GitHub, Figma, Canva, Logistics Management`;
      const blob = new Blob([fallbackText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Helmi_Zaki_Athallah_Resume_${language.toUpperCase()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="${isId ? 'id' : 'en'}">
<head>
  <meta charset="UTF-8">
  <title>Helmi_Zaki_Athallah_Resume_${isId ? 'ID' : 'EN'}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    body {
      color: #0f172a;
      background: #ffffff;
      line-height: 1.4;
      font-size: 10pt;
      padding: 24px 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      margin-bottom: 12px;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 10px;
    }

    .name {
      font-size: 18pt;
      font-weight: 800;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
      color: #000000;
      text-transform: uppercase;
    }

    .contact-row {
      font-size: 8.8pt;
      color: #334155;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 6px;
    }

    .contact-row a {
      color: #2563eb;
      text-decoration: underline;
    }

    .section-title {
      font-size: 10pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #0f172a;
      padding-bottom: 2px;
      margin-top: 12px;
      margin-bottom: 6px;
      color: #000000;
    }

    p, li {
      font-size: 9.2pt;
      color: #1e293b;
      line-height: 1.42;
    }

    .entry {
      margin-bottom: 8px;
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }

    .entry-title {
      font-weight: 700;
      font-size: 9.4pt;
      color: #000000;
    }

    .entry-date {
      font-size: 8.8pt;
      color: #475569;
      font-weight: 600;
      white-space: nowrap;
      margin-left: 8px;
    }

    ul {
      margin-left: 18px;
      margin-top: 2px;
    }

    li {
      margin-bottom: 2px;
    }

    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .skill-item {
      font-size: 9.2pt;
    }

    .skill-label {
      font-weight: 700;
      color: #0f172a;
    }

    .actions-bar {
      position: fixed;
      top: 16px;
      right: 16px;
      background: #0f172a;
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 10px;
      display: flex;
      gap: 12px;
      align-items: center;
      box-shadow: 0 10px 25px rgba(0,0,0,0.25);
      z-index: 9999;
      font-size: 13px;
    }

    .btn-print {
      background: #455ce9;
      color: #ffffff;
      border: none;
      padding: 6px 14px;
      border-radius: 6px;
      font-weight: 700;
      cursor: pointer;
      font-size: 12.5px;
      transition: background 0.2s;
    }

    .btn-print:hover {
      background: #3246c7;
    }

    @media print {
      .actions-bar {
        display: none !important;
      }
      body {
        padding: 0 !important;
        max-width: 100% !important;
      }
    }
  </style>
</head>
<body>
  <div class="actions-bar">
    <span>📄 ${isId ? 'Pratinjau CV Resmi' : 'Official Resume Preview'}</span>
    <button class="btn-print" onclick="window.print()">📥 ${isId ? 'Simpan PDF / Cetak' : 'Save PDF / Print'}</button>
  </div>

  <div class="header">
    <h1 class="name">HELMI ZAKI ATHALLAH</h1>
    <div class="contact-row">
      <span>+62 859 2500 5036</span> &bull;
      <span>athallahhelmi2@gmail.com</span> &bull;
      <a href="https://linkedin.com/in/helmi-zaki" target="_blank">linkedin.com/in/helmi-zaki</a> &bull;
      <a href="https://helmizakiathallah.my.id" target="_blank">helmizakiathallah.my.id</a>
    </div>
  </div>

  <div class="section-title">${isId ? 'RINGKASAN PROFIL' : 'SUMMARY'}</div>
  <p>
    ${isId 
      ? 'Web developer yang berdedikasi membangun solusi teknologi yang responsif, fungsional, dan estetis. Menguasai pengembangan WordPress dan pengkodean manual dengan HTML/CSS. Berpengalaman dalam mengoordinasikan logistik dan membangun website untuk komunitas. Terus mengembangkan keterampilan teknis dan mengeksplorasi peluang untuk menerapkan keterampilan pengembangan pada permasalahan dunia nyata.'
      : 'A passionate web developer building responsive, functional, and aesthetically pleasing technology solutions. Skilled in WordPress development and manual coding with HTML/CSS. Experienced in coordinating logistics and building websites for communities. Continually developing technical skills and exploring opportunities to apply development skills to real-world problems.'}
  </p>

  <div class="section-title">${isId ? 'PENDIDIKAN' : 'EDUCATION'}</div>
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">Universitas Pamulang (UNPAM) | Tangerang Selatan, Indonesia</span>
      <span class="entry-date">${isId ? 'Sept. 2024 – Sekarang' : 'Sept. 2024 – Present'}</span>
    </div>
    <ul>
      <li>${isId ? 'S1 Teknik Elektro / Fakultas Teknik' : 'Bachelor of Electrical Engineering / Engineering'}</li>
    </ul>
  </div>

  <div class="section-title">${isId ? 'PENGALAMAN KERJA & ORGANISASI' : 'EXPERIENCE'}</div>
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">${isId ? 'Koordinator Proyek & Logistik | Proyek Relawan Komunitas' : 'Project Coordinator & Logistics | Community Volunteer Project'}</span>
      <span class="entry-date">Aug. 2025 - 2026</span>
    </div>
    <ul>
      <li>${isId ? 'Mengoordinasikan logistik menyeluruh (end-to-end) dan survei lokasi untuk proyek penjangkauan komunitas yang melibatkan 100 peserta.' : 'Coordinated end-to-end logistics and site surveys for a community outreach project involving 100 participants.'}</li>
      <li>${isId ? 'Mengelola komunikasi lintas fungsi serta menyusun pembaruan dan pengingat tepat waktu untuk kelompok relawan.' : 'Managed cross-functional communications and drafted timely updates and reminders for volunteer cohorts.'}</li>
    </ul>
  </div>

  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">${isId ? 'Web Developer | Proyek Relawan Komunitas' : 'Web Developer | Community Volunteer Project'}</span>
      <span class="entry-date">May. 2026</span>
    </div>
    <ul>
      <li>${isId ? 'Mengembangkan portal web resmi untuk organisasi IYMPACK menggunakan platform WordPress. Selain template standar, kami menggunakan HTML dan CSS untuk mengkustomisasi gaya dan tata letak, memastikan tampilan visual website selaras dengan kebutuhan identitas organisasi.' : "Developed the official web portal for the IYMPACK organization using the WordPress platform. Beyond standard templates, we used HTML and CSS to customize the styling and layout, ensuring the website's visual appearance aligns with the organization's identity needs."}</li>
      <li>${isId ? 'Merancang struktur navigasi dan halaman utama pada website untuk memudahkan pengunjung memahami visi organisasi dan program relawan yang sedang berjalan.' : "Designing the navigation structure and main pages on the website to make it easier for visitors to understand the organization's vision and ongoing volunteer programs."}</li>
      <li>${isId ? 'Menyusun struktur kode dan desain agar website dapat diakses secara responsif, dan memastikan seluruh sistem web siap untuk deployment akses publik.' : 'Structuring the code and design so that the website can be accessed responsively, and ensuring that the entire web system is ready for deployment for public access.'}</li>
      <li>${isId ? 'Mendukung penyampaian informasi, survei area, dan pengingat kegiatan bagi para relawan.' : 'Support the delivery of information, area surveys, and activity reminders for the volunteers.'}</li>
    </ul>
  </div>

  <div class="section-title">${isId ? 'PROYEK UNGGULAN' : 'PROJECTS'}</div>
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">${isId ? 'Portal Organisasi IYMPACK | WordPress, HTML, CSS' : 'IYMPACK Organization Portal | WordPress, HTML, CSS'}</span>
      <span class="entry-date">${isId ? 'Mei 2026 – Juni 2026' : 'May. 2026 – June 2026'}</span>
    </div>
    <ul>
      <li>${isId ? 'Memimpin pengembangan dan peluncuran portal web khusus untuk organisasi IYMPACK.' : 'Spearheaded the development and launch of the dedicated web portal for the IYMPACK organization.'}</li>
      <li>${isId ? 'Memanfaatkan pendekatan hibrida yang menggabungkan framework WordPress dengan styling manual HTML/CSS untuk komponen yang sangat terkustomisasi.' : 'Leveraged a hybrid approach combining WordPress frameworks with manual HTML/CSS styling for highly customized components.'}</li>
      <li>${isId ? 'Mengoptimalkan arsitektur situs, aksesibilitas pengguna, dan kecepatan muat halaman di versi desktop maupun seluler.' : 'Optimized site architecture, user accessibility, and page load speeds across desktop and mobile versions.'}</li>
    </ul>
  </div>

  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">${isId ? 'Website Portfolio Pribadi | WordPress, Elementor Pro, Astra Pro' : 'Personal Portfolio Website | WordPress, Elementor Pro, Astra Pro'}</span>
      <span class="entry-date">${isId ? 'Juni 2026' : 'June 2026'}</span>
    </div>
    <ul>
      <li>${isId ? 'Merancang dan merekayasa struktur portfolio multibahasa yang komprehensif menggunakan lisensi Elementor Pro dan Astra Pro.' : 'Designed and engineered a comprehensive multilingual portfolio structure using Elementor Pro and Astra Pro licenses.'}</li>
      <li>${isId ? 'Menerapkan logika navigasi kustom dan tata letak interaktif untuk menampilkan aset desain khusus dan kode sumber secara efisien.' : 'Implemented custom navigation logic and interactive layouts to efficiently showcase specialized design assets and source code.'}</li>
    </ul>
  </div>

  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">${isId ? 'Kasir Pintar POS | React.js, Firebase, Cloud Firestore' : 'Kasir Pintar POS | React.js, Firebase, Cloud Firestore'}</span>
      <span class="entry-date">2026</span>
    </div>
    <ul>
      <li>${isId ? 'Membangun aplikasi POS kasir berbasis cloud dengan monitoring status terminal real-time dan analitik omzet multi-cabang.' : 'Developed a cloud-based POS application featuring real-time terminal monitoring and multi-outlet revenue analytics.'}</li>
      <li>${isId ? 'Mengimplementasikan pelacakan menu terlaris, audit shift kasir, dan proteksi pembatalan transaksi dengan OTP supervisor.' : 'Implemented best-selling item tracking, cashier shift auditing, and supervisor OTP-protected transaction voids.'}</li>
    </ul>
  </div>

  <div class="section-title">${isId ? 'KEAHLIAN TEKNIS' : 'TECHNICAL SKILLS'}</div>
  <div class="skills-list">
    <div class="skill-item">
      <span class="skill-label">&bull; Frontend:</span> React.js, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3
    </div>
    <div class="skill-item">
      <span class="skill-label">&bull; Backend:</span> Node.js, Express.js, Python, Git, GitHub
    </div>
    <div class="skill-item">
      <span class="skill-label">&bull; ${isId ? 'Basis Data' : 'Database'}:</span> MySQL, Firebase Firestore & Realtime, PostgreSQL, MongoDB, SQLite
    </div>
    <div class="skill-item">
      <span class="skill-label">&bull; WordPress & CMS:</span> WordPress, Elementor Pro, WooCommerce, Yoast SEO, Astra Pro
    </div>
    <div class="skill-item">
      <span class="skill-label">&bull; ${isId ? 'Teknik Elektro & Simulasi' : 'Electrical Engineering & Simulation'}:</span> Proteus (ISIS/ARES), MATLAB, Arduino IDE (C/C++), LTspice, FreeMat
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 400);
    };
  </script>
</body>
</html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const isCaseStudy = activePage.startsWith('project/');
  const currentProjectId = isCaseStudy ? activePage.split('/')[1] : null;

  return (
    <div className="min-h-screen bg-[#0e0e11] text-zinc-100 selection:bg-cobalt/40 selection:text-white font-sans relative overflow-x-hidden">
      {/* 5-Page Navigation Header with Translate Button */}
      <Header
        activePage={activePage.startsWith('project') ? 'project' : activePage}
        onNavigate={handleNavigate}
        onShowToast={showToast}
      />

      {/* Animated Multi-Page View Container */}
      <main className="relative">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <HomeView
              key="home"
              onNavigate={handleNavigate}
              onDownloadResume={handleDownloadResume}
              onShowToast={showToast}
            />
          )}

          {activePage === 'project' && (
            <ProjectsView
              key="project"
              onNavigate={handleNavigate}
            />
          )}

          {isCaseStudy && (
            <CaseStudyView
              key={activePage}
              projectId={currentProjectId}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'about' && (
            <AboutView
              key="about"
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'resume' && (
            <ResumeView
              key="resume"
              onNavigate={handleNavigate}
              onDownloadResume={handleDownloadResume}
            />
          )}

          {activePage === 'contact' && (
            <ContactView
              key="contact"
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Global Headless Background Music */}
      <MusicPlayer />

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Initial Multilingual Page Preloader */}
      <AnimatePresence mode="wait">
        {isInitialLoading && (
          <InitialPageLoader
            key="initial-preloader"
            onComplete={handleLoaderComplete}
            language={language}
          />
        )}
      </AnimatePresence>

      {/* Page Transition Curtain with Multilingual Greeting */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <TransitionCurtain
            key="page-transition-curtain"
            targetPage={transitionTarget}
            language={language}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
