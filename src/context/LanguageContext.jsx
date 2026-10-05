import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  id: {
    // Navigation
    nav: {
      home: 'Beranda',
      project: 'Proyek',
      about: 'Tentang',
      resume: 'Résumé',
      contact: 'Kontak',
      menuTitle: 'NAVIGASI MENU (5 HALAMAN)',
      directContact: 'Kontak Langsung',
    },
    // Hero
    hero: {
      availableStatus: 'Tersedia untuk Freelance • 2026',
      quickChat: 'Chat Cepat',
      downloadCv: 'Unduh CV',
      marquee: {
        portfolio: 'PORTFOLIO 2026',
        wpSpecialist: 'SPESIALIS WORDPRESS & ELEMENTOR',
        logisticsCoord: 'KOORDINATOR LOGISTIK IYMPACK',
        frontendCreator: 'KREATOR FRONTEND & WEB',
        unpam: 'TEKNIK ELEKTRO UNPAM',
        cleanArch: 'PERFORMA & ARSITEKTUR BERSIH',
      }
    },
    // About
    about: {
      tag: '02 • TENTANG SAYA',
      pageTag: 'HALAMAN 03 • LATAR BELAKANG & VISI',
      heading: 'Tentang',
      connect: 'Terhubung:',
      follow: 'Ikuti:',
      location: 'Lokasi',
      campus: 'Kampus',
      organization: 'Organisasi',
      viewResume: 'Lihat Résumé',
      getInTouch: 'Hubungi Saya',
      nextUpTitle: 'Lihat Curriculum Vitae & Kredensial',
      backToProjects: 'Proyek',
      goToResume: 'Menuju Résumé',
      pillars: {
        p1Tag: '01 • PENGEMBANGAN WEB & WORDPRESS',
        p1Title: 'Solusi Web Freelance',
        p1Desc: 'Custom Elementor, Astra, CSS3, & Optimasi PageSpeed',
        p2Tag: '02 • KEPEMIMPINAN ORGANISASI',
        p2Title: 'Komunitas IYMPACK',
        p2Desc: 'Koordinator Logistik • 100+ Relawan Dikelola',
        p3Tag: '03 • JALUR AKADEMIK',
        p3Title: 'Teknik Elektro • UNPAM',
        p3Desc: 'Rangkaian, Sistem Logika, Instrumentasi & IoT',
      }
    },
    // Experience
    experience: {
      subTag: 'Tempat saya berkontribusi dalam organisasi & proyek nyata',
      title: 'Pengalaman',
      titleHighlight: 'Organisasi & Kerja',
    },
    // Projects
    projects: {
      tag: 'KARYA YANG SAYA BANGUN',
      title: 'Proyek',
      titleHighlight: 'Pilihan',
      deepDive: 'Pelajari Studi Kasus',
      visitSite: 'Kunjungi Situs',
      clickZoom: 'Klik untuk Memperbesar',
      projectOverview: 'Ringkasan Proyek',
      theChallenge: 'Tantangan & Tujuan',
      keyFeatures: 'Fitur Utama & Cakupan Fungsional',
      techChallenges: 'Tantangan Teknis & Solusi',
      challengeLabel: 'Tantangan:',
      solutionLabel: 'Solusi:',
      execDetails: 'Detail Eksekusi',
      role: 'Peran:',
      timeline: 'Linimasa:',
      archStack: 'Arsitektur & Tech Stack',
      keyLearnings: 'Pembelajaran Utama',
      futureRoadmap: 'Rencana Pengembangan',
      explorePage: 'Jelajahi Halaman Khusus Proyek',
      backToPortfolio: 'Kembali ke Portfolio',
      backToProjects: 'Kembali ke Daftar Proyek',
      pageHeading: 'Proyek Rekayasa & Web',
      pageDesc: 'Studi kasus teknis mendalam yang menampilkan arsitektur, tantangan, dan metrik dari proyek unggulan saya.',
      readCaseStudy: 'Baca Studi Kasus',
      continueExploring: 'LANJUTKAN EKSPLORASI',
      discoverHelmi: 'Temukan latar belakang, kredensial, dan kontak Helmi.',
      aboutHelmi: 'Tentang Helmi',
      letsTalk: 'Mari Berdiskusi',
      execSummary: 'Ringkasan Eksekutif',
      gallery: 'Galeri Tangkapan Layar',
      projectMetrics: 'Metrik Proyek',
      techStack: 'Tech Stack',
      otherCaseStudies: 'Studi Kasus Lainnya',
      liveDemo: 'Demo Langsung',
    },
    // Skills
    skills: {
      tag: 'KEAHLIAN UTAMA & PERANGKAT',
      title: 'Keahlian &',
      titleHighlight: 'Teknologi',
    },
    // Certificates
    certificates: {
      tag: 'KREDENSIAL TERVERIFIKASI',
      title: 'Sertifikat &',
      titleHighlight: 'Prestasi',
      subDesc: 'Kredensial resmi terverifikasi yang membuktikan rekam jejak dalam rekayasa web WordPress dan koordinasi logistik lapangan organisasi.',
      spotlightTag: 'Kredensial Pilihan',
      issuedBy: 'Diterbitkan oleh',
      officialCerts: 'Sertifikat Resmi',
      skillsValidated: 'Keahlian Tervalidasi',
      verifiedReal: 'Terverifikasi Asli',
      tapToCycle: 'Gunakan navigasi untuk beralih sertifikat',
      clickToSwap: 'Ganti Sertifikat',
      zoomCertificate: 'Perbesar Sertifikat',
      zoomIn: 'Perbesar',
      zoomOut: 'Perkecil',
      resetZoom: 'Reset Zoom',
      viewFullPdf: 'Unduh PDF Resmi',
      close: 'Tutup',
      hintZoom: 'Scroll mouse atau klik dua kali untuk zoom • Geser untuk menelusuri detail',
      previewBadge: 'Pratinjau Resolusi Tinggi',
    },
    // Resume
    resume: {
      pageTag: 'HALAMAN 04 • RESUME & KUALIFIKASI',
      heading1: 'Curriculum',
      heading2: 'Vitae',
      subDesc: 'Rincian terverifikasi mengenai kapabilitas teknis, kompetensi desain, dan kredensial profesional untuk',
      downloadBtn: 'Unduh Résumé Resmi',
      hireBtn: 'Pekerjakan Helmi',
      activeStatus: 'AKTIF',
      verifiedCv: 'Curriculum Vitae Terverifikasi • 2026',
      coreExpertise: 'KEAHLIAN UTAMA',
      directConnect: 'HUBUNGI LANGSUNG',
      credentials: 'KREDENSIAL',
      nextUpTitle: 'Hubungi & Kolaborasi',
      backToAbout: 'Tentang',
      goToContact: 'Menuju Kontak',
    },
    // Contact
    contact: {
      tag: '07 • KONTAK & KOLABORASI',
      pageTag: 'HALAMAN 05 • MARI BEKERJA SAMA',
      headingItalic: "Mari bekerja",
      headingBold: "bersama.",
      startProject: "Mulai",
      projectWord: "Proyek",
      subDesc: "Punya ide untuk website WordPress, proyek komunitas nirlaba, atau solusi frontend custom? Mari kita bangun bersama.",
      touchBtn: "Hubungi Saya",
      fastWa: "WhatsApp • Respon Cepat",
      sendDirect: "Kirim Pesan Langsung",
      yourName: "Nama Anda",
      namePlaceholder: "contoh: Budi Santoso",
      yourEmail: "Email Anda",
      emailPlaceholder: "contoh: budi@example.com",
      message: "Detail Proyek / Pesan",
      messagePlaceholder: "Ceritakan tentang proyek, target, atau linimasa Anda...",
      sendWaBtn: "Kirim via WhatsApp",
      emailLabel: "Email",
      copyEmail: "Salin",
      copiedEmail: "Tersalin ke clipboard",
      clickCopy: "Klik untuk menyalin alamat email",
      phoneLoc: "Telepon • Lokasi",
      socials: "Media Sosial",
      backToTop: "Kembali ke Atas",
      versionInfo: "Versi: Edisi React • Next '26",
      facultyInfo: "Universitas Pamulang • Teknik Elektro",
    },
    // Toasts
    toasts: {
      langSwitched: 'Bahasa diubah ke Bahasa Indonesia',
      downloadingCv: 'Mengunduh Résumé Helmi Zaki Athallah...',
      fillRequired: 'Mohon lengkapi nama dan email Anda.',
      msgPrepared: 'Pesan berhasil disiapkan untuk WhatsApp!',
      emailCopied: 'Email berhasil disalin ke clipboard!',
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      project: 'Project',
      about: 'About',
      resume: 'Resume',
      contact: 'Contact',
      menuTitle: 'MENU NAVIGATION (5 PAGES)',
      directContact: 'Direct Contact',
    },
    // Hero
    hero: {
      availableStatus: 'Available for Freelance • 2026',
      quickChat: 'Quick Chat',
      downloadCv: 'Download CV',
      marquee: {
        portfolio: 'PORTFOLIO 2026',
        wpSpecialist: 'WORDPRESS & ELEMENTOR SPECIALIST',
        logisticsCoord: 'IYMPACK LOGISTICS COORDINATOR',
        frontendCreator: 'FRONTEND & WEB CREATOR',
        unpam: 'TEKNIK ELEKTRO UNPAM',
        cleanArch: 'PERFORMANCE & CLEAN ARCHITECTURE',
      }
    },
    // About
    about: {
      tag: '02 • ABOUT ME',
      pageTag: 'PAGE 03 • BACKGROUND & VISION',
      heading: 'About',
      connect: 'Connect:',
      follow: 'Follow:',
      location: 'Location',
      campus: 'Campus',
      organization: 'Organization',
      viewResume: 'View Résumé',
      getInTouch: 'Get in Touch',
      nextUpTitle: 'View Curriculum Vitae & Credentials',
      backToProjects: 'Projects',
      goToResume: 'Go to Résumé',
      pillars: {
        p1Tag: '01 • WEB DEVELOPMENT & WORDPRESS',
        p1Title: 'Freelance Web Solutions',
        p1Desc: 'Custom Elementor, Astra, CSS3, & PageSpeed Optimization',
        p2Tag: '02 • ORGANIZATION LEADERSHIP',
        p2Title: 'IYMPACK Community',
        p2Desc: 'Logistics Coordinator • 100+ Volunteers Managed',
        p3Tag: '03 • ACADEMIC TRACK',
        p3Title: 'Teknik Elektro • UNPAM',
        p3Desc: 'Circuits, Logic Systems, Instrumentation & IoT',
      }
    },
    // Experience
    experience: {
      subTag: 'Places where I have been involved in organizations',
      title: 'Organization &',
      titleHighlight: 'Work Experience',
    },
    // Projects
    projects: {
      tag: "WHAT I'VE BUILT",
      title: 'Featured',
      titleHighlight: 'Projects',
      deepDive: 'Deep-Dive Case Study',
      visitSite: 'Visit Site',
      clickZoom: 'Click to Zoom',
      projectOverview: 'Project Overview',
      theChallenge: 'The Challenge & Objective',
      keyFeatures: 'Key Features & Functional Scope',
      techChallenges: 'Technical Challenges & Solutions',
      challengeLabel: 'Challenge:',
      solutionLabel: 'Solution:',
      execDetails: 'Execution Details',
      role: 'Role:',
      timeline: 'Timeline:',
      archStack: 'Architecture & Tech Stack',
      keyLearnings: 'Key Learnings',
      futureRoadmap: 'Future Roadmap',
      explorePage: 'Explore Dedicated Projects Page',
      backToPortfolio: 'Back to Portfolio',
      backToProjects: 'Back to Projects',
      pageHeading: 'Engineering & Web Projects',
      pageDesc: 'Deep-dive technical case studies showcasing architecture, challenges, and metrics from my top projects.',
      readCaseStudy: 'Read Case Study',
      continueExploring: 'CONTINUE EXPLORING',
      discoverHelmi: "Discover Helmi's background, credentials & contact.",
      aboutHelmi: 'About Helmi',
      letsTalk: "Let's Talk",
      execSummary: 'Executive Summary',
      gallery: 'Gallery',
      projectMetrics: 'Project Metrics',
      techStack: 'Tech Stack',
      otherCaseStudies: 'Other Case Studies',
      liveDemo: 'Live Demo',
    },
    // Skills
    skills: {
      tag: 'CORE EXPERTISE & TOOLS',
      title: 'Skills &',
      titleHighlight: 'Technologies',
    },
    // Certificates
    certificates: {
      tag: 'VERIFIED CREDENTIALS',
      title: 'Certificates &',
      titleHighlight: 'Achievements',
      subDesc: 'Official verified credentials highlighting proven execution in WordPress web engineering and community organization field logistics coordination.',
      spotlightTag: 'Spotlight Credential',
      issuedBy: 'Issued by',
      officialCerts: 'Official Certs',
      skillsValidated: 'Skills Validated',
      verifiedReal: 'Verified Real',
      tapToCycle: 'Use navigation controls to switch certificates',
      clickToSwap: 'Switch Certificate',
      zoomCertificate: 'Zoom Certificate',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      resetZoom: 'Reset Zoom',
      viewFullPdf: 'Download Official PDF',
      close: 'Close',
      hintZoom: 'Scroll mouse or double-click to zoom • Drag to explore details',
      previewBadge: 'High-Resolution Preview',
    },
    // Resume
    resume: {
      pageTag: 'PAGE 04 • RESUME & QUALIFICATIONS',
      heading1: 'Curriculum',
      heading2: 'Vitae',
      subDesc: 'A verified breakdown of technical capabilities, design competencies, and professional credentials for',
      downloadBtn: 'Download Official Résumé',
      hireBtn: 'Hire Helmi',
      activeStatus: 'ACTIVE',
      verifiedCv: 'Verified Curriculum Vitae • 2026',
      coreExpertise: 'CORE EXPERTISE',
      directConnect: 'DIRECT CONNECT',
      credentials: 'CREDENTIALS',
      nextUpTitle: 'Get in Touch & Collaborate',
      backToAbout: 'About',
      goToContact: 'Go to Contact',
    },
    // Contact
    contact: {
      tag: '07 • CONTACT & COLLABORATION',
      pageTag: "PAGE 05 • LET'S WORK TOGETHER",
      headingItalic: "Let's work",
      headingBold: "together.",
      startProject: "Start a",
      projectWord: "Project",
      subDesc: "Have an idea for a WordPress website, non-profit community project, or custom frontend solution? Let's build something remarkable.",
      touchBtn: "Get in Touch",
      fastWa: "WhatsApp • Fast",
      sendDirect: "Send Direct Message",
      yourName: "Your Name",
      namePlaceholder: "e.g. John Doe",
      yourEmail: "Your Email",
      emailPlaceholder: "e.g. john@example.com",
      message: "Project Details / Message",
      messagePlaceholder: "Tell me about your project, goals, or timeline...",
      sendWaBtn: "Send via WhatsApp",
      emailLabel: "Email",
      copyEmail: "Copy",
      copiedEmail: "Copied to clipboard",
      clickCopy: "Click to copy email address",
      phoneLoc: "Phone • Location",
      socials: "Socials",
      backToTop: "Back to Top",
      versionInfo: "Version: React • Next '26 Edition",
      facultyInfo: "Universitas Pamulang • Teknik Elektro",
    },
    // Toasts
    toasts: {
      langSwitched: 'Language switched to English',
      downloadingCv: 'Downloading Helmi Zaki Athallah Résumé...',
      fillRequired: 'Please provide both your name and email.',
      msgPrepared: 'Message prepared for WhatsApp!',
      emailCopied: 'Email copied to clipboard!',
    }
  }
};

export function LanguageProvider({ children, onLanguageChange }) {
  const [language, setLanguageState] = useState('id');

  const setLanguage = (newLang) => {
    if (newLang !== 'id' && newLang !== 'en') return;
    setLanguageState(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'id' ? 'en' : 'id';
    setLanguage(nextLang);
  };

  const t = translations[language] || translations.id;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

