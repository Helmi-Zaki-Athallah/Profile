import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

/**
 * Seed script — populates MySQL with data from the original portfolioData.js
 */

async function seed() {
  const conn = await pool.getConnection();

  try {
    console.log('🌱 Seeding database...\n');

    // ─── Admin User ───
    const hashedPw = await bcrypt.hash('admin123', 10);
    await conn.execute(
      `INSERT IGNORE INTO admin_users (username, password_hash) VALUES (?, ?)`,
      ['admin', hashedPw]
    );
    console.log('✅ Admin user created (admin / admin123)');

    // ─── Personal Info ───
    const personalData = [
      ['name', 'Helmi Zaki Athallah'],
      ['firstName', 'HELMI'],
      ['middleName', 'ZAKI'],
      ['lastName', 'ATHALLAH'],
      ['fullCaps', 'HELMI ZAKI ATHALLAH'],
      ['initials', 'HZA'],
      ['email', 'athallahhelmi2@gmail.com'],
      ['emailAlt', 'helmiathallah2@gmail.com'],
      ['phone', '(+62) 859 2500 5036'],
      ['whatsapp', 'https://wa.me/6285925005036'],
      ['location', 'Kab. Bogor, Jawa Barat, Indonesia'],
      ['campus', 'Universitas Pamulang (UNPAM)'],
      ['faculty', 'Fakultas Teknik - Teknik Elektro'],
      ['linkedin', 'https://www.linkedin.com/in/helmi-zaki'],
      ['instagram', 'https://www.instagram.com/athl.lahh?igsh=MWF3dWlkN21memNucw=='],
      ['instagramHandle', '@athl.lahh'],
      ['github', 'https://github.com/'],
      ['tagline_id', 'Membangun Pengalaman Digital'],
      ['tagline_en', 'Building Digital Experiences'],
      ['subHeadline_id', 'Mahasiswa & Web Developer Freelance yang berdedikasi menciptakan solusi web yang bersih, fungsional, dan responsif.'],
      ['subHeadline_en', 'University Student & Freelance Web Developer passionate about creating clean, functional, and responsive solutions.'],
      ['roleLabel_id', 'Web Developer & Koordinator Logistik'],
      ['roleLabel_en', 'Web Developer & Logistics Coordinator'],
      ['aboutParagraphs_id_0', 'Saya adalah seorang mahasiswa dan freelance web developer yang berdedikasi membangun pengalaman digital yang bersih, fungsional, dan responsif. Dengan fondasi yang kuat dalam HTML, CSS, Python, dan pengelolaan WordPress, saya berfokus menciptakan website berkinerja tinggi dan solusi kustom yang menjawab kebutuhan nyata.'],
      ['aboutParagraphs_id_1', 'Di luar pengembangan web, saya memiliki pengalaman langsung memimpin logistik proyek komunitas untuk lebih dari 100 peserta bersama IYMPACK, sekaligus merancang dan meluncurkan portal organisasi mereka. Kepemimpinan organisasi ini memperkuat kemampuan saya dalam mengoordinasikan tim dan mengelola alur kerja operasional secara efektif.'],
      ['aboutParagraphs_id_2', 'Selain itu, saya memiliki latar belakang akademis di bidang elektronika, sistem logika, dan instrumentasi, serta aktif mengintegrasikan alat AI ke dalam pemrosesan gambar digital. Saya terus belajar dan berkembang, saat ini memperdalam keahlian full-stack web development dan terbuka untuk peluang proyek freelance.'],
      ['aboutParagraphs_en_0', "I'm a university student and freelance web developer passionate about building clean, functional, and responsive digital experiences. With a strong foundation in HTML, CSS, Python, and WordPress management, I focus on creating performance-driven websites and custom solutions that solve real-world problems."],
      ['aboutParagraphs_en_1', 'Beyond web development, I have hands-on experience leading community project logistics for over 100 participants with IYMPACK, as well as designing and deploying their organization portal. This organizational leadership has strengthened my ability to coordinate teams and manage complex operational workflows effectively.'],
      ['aboutParagraphs_en_2', "Additionally, I hold a foundational background in electronics, logic circuits, and instrumentation, while actively integrating AI tools into digital image processing workflows. I'm constantly learning and evolving, currently expanding my skills in full-stack web development and open to freelance opportunities."],
      ['stats_id', JSON.stringify([
        { value: "100+", label: "Peserta Komunitas Dikoordinasikan" },
        { value: "100%", label: "Responsif & Teroptimasi Performa" },
        { value: "2", label: "Sertifikasi Resmi Terverifikasi" },
        { value: "1.5s", label: "Target Waktu Muat PageSpeed" }
      ])],
      ['stats_en', JSON.stringify([
        { value: "100+", label: "Community Participants Coordinated" },
        { value: "100%", label: "Responsive & Performance Optimized" },
        { value: "2", label: "Official Verified Certifications" },
        { value: "1.5s", label: "Average PageSpeed Load Target" }
      ])]
    ];

    for (const [key, val] of personalData) {
      await conn.execute(
        `INSERT INTO personal_info (key_name, value_text) VALUES (?, ?) ON DUPLICATE KEY UPDATE value_text = VALUES(value_text)`,
        [key, val]
      );
    }
    console.log('✅ Personal info seeded');

    // ─── Experiences ───
    const experiences = [
      {
        role_id: 'Web Developer', role_en: 'Web Developer',
        company: 'IYMPACK Community',
        duration_id: '2026 – Sekarang', duration_en: '2026 – Present',
        type_id: 'Organisasi / Freelance', type_en: 'Organization / Freelance',
        description_id: 'Membangun website responsif, mengkustomisasi plugin dan tema WordPress, serta mengelola optimasi performa web untuk klien independen dan portal organisasi. Berfokus menghadirkan solusi digital yang rapi, fungsional, dan ramah pengguna.',
        description_en: 'Building responsive websites, customizing WordPress plugins and themes, and managing web performance optimization for independent clients and organization portals. Focused on delivering clean, functional, and user-friendly digital solutions.',
        tags: JSON.stringify(["Web Development", "WordPress", "UI/UX Design", "Elementor", "HTML/CSS", "Yoast SEO", "Performance Optimization"]),
        icon: '/foto/iympack-logo.png',
        sort_order: 0
      },
      {
        role_id: 'Koordinator Logistik', role_en: 'Logistics Coordinator',
        company: 'IYMPACK Community',
        duration_id: 'Mei 2025 – Mei 2026', duration_en: 'May 2025 – May 2026',
        type_id: 'Kepemimpinan Komunitas', type_en: 'Community Leadership',
        description_id: 'Mengoordinasikan logistik lapangan untuk proyek komunitas yang melibatkan lebih dari 100 peserta. Bertanggung jawab penuh atas survei lokasi, perencanaan sumber daya, dan alokasi kebutuhan lintas tim.',
        description_en: 'Coordinated field logistics for a community project involving over 100 participants. Held full responsibility for site surveys, resource planning, and the allocation of cross-team requirements.',
        tags: JSON.stringify(["Logistics Management", "Team Coordination", "Operations", "Field Survey", "Resource Allocation"]),
        icon: '/foto/iympack-logo.png',
        sort_order: 1
      }
    ];

    for (const exp of experiences) {
      await conn.execute(
        `INSERT INTO experiences (role_id, role_en, company, duration_id, duration_en, type_id, type_en, description_id, description_en, tags, icon, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [exp.role_id, exp.role_en, exp.company, exp.duration_id, exp.duration_en, exp.type_id, exp.type_en, exp.description_id, exp.description_en, exp.tags, exp.icon, exp.sort_order]
      );
    }
    console.log('✅ Experiences seeded');

    // ─── Projects ───
    const projects = [
      {
        slug: 'iympack-id',
        title: 'IYMPACK.id',
        full_title_id: 'IYMPACK.id — Portal Relawan & Komunitas',
        full_title_en: 'IYMPACK.id — Volunteer & Community Portal',
        subtitle_id: 'Platform relawan siap-AI dan portal manajemen inisiatif kemanusiaan.',
        subtitle_en: 'AI-ready volunteer platform and humanitarian initiative management portal.',
        tagline_id: 'Platform Relawan & Komunitas dibangun dengan WordPress, Elementor, dan Custom CSS',
        tagline_en: 'Volunteer & Community Platform built with WordPress, Elementor, and Custom CSS',
        category_id: 'WordPress & Elementor',
        category_en: 'WordPress & Elementor',
        badge_id: 'Teknologi Relawan',
        badge_en: 'Volunteer Tech',
        year: '2026',
        image: '/projects/Cuplikan-layar-2026-08-07-160114.png',
        live_url: 'https://iympack.id',
        overview_id: 'IYMPACK.id adalah portal organisasi yang cerdas dan ramah pengguna, dirancang untuk mendukung operasional dan keterlibatan komunitas IYMPACK (Indonesia Yuwana Muda Peduli Aksi Cinta Kasih). Situs ini berfungsi sebagai pusat informasi program, pendaftaran relawan, dan etalase inisiatif kemanusiaan.',
        overview_en: 'IYMPACK.id is an intelligent, user-friendly organizational portal designed to support the operations and community engagement of IYMPACK (Indonesia Yuwana Muda Peduli Aksi Cinta Kasih). The site serves as a central hub for program information, volunteer registrations, and humanitarian initiative showcases.',
        problem_id: 'Para relawan dan pemuda antusias sebelumnya belum memiliki wadah digital terpadu untuk terhubung, mengakses jadwal kegiatan terverifikasi, mendaftar aksi sosial, dan mengoordinasikan logistik regional di seluruh Indonesia.',
        problem_en: 'Travelers and passionate youth lacked a unified digital hub to connect, access verified event itineraries, register for volunteer social initiatives, and coordinate regional logistic deployments across Indonesia.',
        details: JSON.stringify({
          role: { id: 'Web Developer & Koordinator Logistik', en: 'Web Developer & Logistics Coordinator' },
          timeline: { id: 'Jan 2026 – Sekarang', en: 'Jan 2026 – Present' },
          scope: { id: 'Desain UI/UX, tata letak kustom Elementor, otomasi WPForms, caching LiteSpeed, dan optimasi SEO.', en: 'UI/UX design, custom Elementor layouts, WPForms automations, LiteSpeed caching, and SEO optimization.' }
        }),
        metrics: JSON.stringify({
          id: [{ label: 'Relawan Terlibat', value: '100+' }, { label: 'Waktu Muat', value: '< 1.5s' }, { label: 'Responsif Mobile', value: '100%' }, { label: 'Uptime Platform', value: '99.9%' }],
          en: [{ label: 'Volunteers Engaged', value: '100+' }, { label: 'Load Time', value: '< 1.5s' }, { label: 'Mobile Responsive', value: '100%' }, { label: 'Platform Uptime', value: '99.9%' }]
        }),
        features: JSON.stringify({
          id: [
            { title: 'Pendaftaran Relawan Mulus', desc: 'Formulir online bertahap otomatis yang menangkap data peserta, kontak darurat, dan preferensi keahlian secara tersinkronisasi aman.' },
            { title: 'Etalase Program Interaktif', desc: 'Linimasa visual terstruktur dari inisiatif pendidikan komunitas, tanggap bencana, dan pemberdayaan pemuda yang sedang berjalan.' },
            { title: 'Arsitektur Caching Performa Tinggi', desc: 'Direkayasa dengan LiteSpeed Cache dan pengiriman media WebP untuk menangani lonjakan lalu lintas pendaftaran dengan lancar.' },
            { title: 'Navigasi Sentuh Mobile-First', desc: 'Navigasi drawer yang mulus, ukuran tombol sentuh yang optimal, dan tipografi responsif untuk semua perangkat Android & iOS.' }
          ],
          en: [
            { title: 'Seamless Volunteer Registration', desc: 'Automated multi-step online forms capturing participant data, emergency contacts, and skill preferences synced securely.' },
            { title: 'Interactive Program Showcase', desc: 'Structured visual timeline of ongoing community education, disaster relief, and youth empowerment initiatives.' },
            { title: 'High-Performance Caching Architecture', desc: 'Engineered with LiteSpeed Cache and WebP image delivery to handle high-traffic registration surges smoothly.' },
            { title: 'Mobile-First Touch Navigation', desc: 'Fluid drawer navigation, optimal tap targets, and responsive typography optimized for all Android and iOS devices.' }
          ]
        }),
        challenges: JSON.stringify({
          id: [
            { challenge: 'Lonjakan lalu lintas tinggi saat batas akhir pendaftaran rekrutmen relawan nasional.', solution: 'Menerapkan aturan LiteSpeed caching server-side yang agresif, optimasi indeks database, dan kompresi media WebP.' },
            { challenge: 'Ukuran layar smartphone yang beragam di kalangan relawan pemuda dari berbagai daerah.', solution: 'Merancang breakpoint CSS kustom dan layout flex/grid responsif untuk memastikan kemudahan penggunaan di semua ukuran layar.' }
          ],
          en: [
            { challenge: 'High traffic spikes during nationwide volunteer recruitment registration deadlines.', solution: 'Implemented aggressive server-side LiteSpeed caching rules, database index optimization, and WebP media compression.' },
            { challenge: 'Varied smartphone screen sizes across diverse regional youth volunteers.', solution: 'Crafted custom CSS media breakpoints and responsive flex/grid layouts ensuring flawless usability across all screen sizes.' }
          ]
        }),
        learnings: JSON.stringify({
          id: ['Menguasai arsitektur produksi WordPress end-to-end untuk organisasi nirlaba bervolume tinggi.', 'Mendapatkan keahlian mendalam dalam menyeimbangkan konten multimedia kaya dengan waktu muat PageSpeed sub-1.5 detik.', 'Belajar menyelaraskan deployment teknis web dengan operasional logistik lapangan di dunia nyata.'],
          en: ['Mastered end-to-end WordPress production architecture for high-volume non-profit organizations.', 'Gained deep expertise in balancing rich multimedia content with sub-1.5s PageSpeed load times.', 'Learned to coordinate technical web deployments with real-world ground logistics operations.']
        }),
        roadmap: JSON.stringify({
          id: ['Sistem verifikasi sertifikat relawan digital dengan kode QR unik.', 'Integrasi payment gateway donasi otomatis (Midtrans / Xendit).', 'Peta dampak regional interaktif yang melacak aktivitas relawan di seluruh Indonesia.'],
          en: ['Digital volunteer certificate verification system with unique QR codes.', 'Integration with automated donation payment gateways (Midtrans / Xendit).', 'Interactive regional impact map tracking volunteer activities across Indonesia.']
        }),
        tech_stack: JSON.stringify({ frontend: ['HTML5', 'Custom CSS3', 'JavaScript (ES6+)'], cms: ['WordPress', 'Elementor', 'Astra Theme'], optimization: ['LiteSpeed Cache', 'Yoast SEO', 'WebP Converter'], tools: ['WPForms', 'Canva Pro', 'Git / GitHub'] }),
        gallery: JSON.stringify(['/projects/Cuplikan-layar-2026-08-07-160114.png', '/projects/Cuplikan-layar-2026-07-21-082150.png', '/projects/Cuplikan-layar-2026-07-21-082211.png', '/projects/Cuplikan-layar-2026-08-07-192622.png']),
        sort_order: 0
      },
      {
        slug: 'zcode-agency',
        title: 'Z-Code Studio',
        full_title_id: 'Z-Code Creative Studio — High-Converting Web & App Engineering',
        full_title_en: 'Z-Code Creative Studio — High-Converting Web & App Engineering',
        subtitle_id: 'Studio Web Engineering & Desain UI/UX spesialis landing page, company profile, dan aplikasi bisnis modern.',
        subtitle_en: 'Web Engineering & UI/UX Studio specializing in high-converting landing pages, corporate profiles, and modern business apps.',
        tagline_id: 'Website & Aplikasi Berkelas. Lebih Banyak Klien. Rekayasa Web Ultra Cepat (< 0.8s).',
        tagline_en: 'High-Class Websites & Apps. More Clients. Ultra-Fast Web Engineering (< 0.8s).',
        category_id: 'Web Engineering & Studio Agency',
        category_en: 'Web Engineering & Studio Agency',
        badge_id: 'Creative Web Studio',
        badge_en: 'Creative Web Studio',
        year: '2026',
        image: '/projects/zcode-showcase.png',
        live_url: 'https://zcode.agency',
        overview_id: 'Z-Code Creative Studio adalah platform studio rekayasa web dan agensi digital yang didirikan oleh Helmi Zaki Athallah. Z-Code berfokus merekayasa landing page berkonversi tinggi, company profile korporat profesional, platform e-commerce, serta aplikasi kasir cloud modern dengan jaminan kecepatan muat sub-detik (< 0.8s), desain luxury, dan arsitektur bebas bug.',
        overview_en: 'Z-Code Creative Studio is a web engineering platform and digital studio founded by Helmi Zaki Athallah. Z-Code focuses on engineering high-converting landing pages, professional corporate profiles, e-commerce platforms, and modern cloud POS applications with guaranteed sub-second (< 0.8s) load speeds, luxury aesthetics, and bug-free architecture.',
        problem_id: 'Banyak pemilik bisnis dan korporasi kehilangan potensi klien akibat website lambat, tampilan visual yang kurang kredibel, serta minimnya optimasi alur konversi penjualan dan integrasi sistem operasional.',
        problem_en: 'Many business owners and enterprises lose potential clients due to sluggish websites, outdated non-credible aesthetics, and poor conversion funnel optimization or operational system integrations.',
        details: JSON.stringify({ role: { id: 'Founder & Lead Web Engineer', en: 'Founder & Lead Web Engineer' }, timeline: { id: '2026 – Sekarang', en: '2026 – Present' }, scope: { id: 'Arsitektur frontend performa tinggi, desain UI/UX interaktif, sistem manajemen konten mandiri, integrasi API, dan deployment cloud.', en: 'High-performance frontend architecture, interactive UI/UX design, self-managed content CMS, API integrations, and cloud deployment.' } }),
        metrics: JSON.stringify({ id: [{ label: 'Waktu Muat Rata-rata', value: '< 0.8s' }, { label: 'Peningkatan Konversi', value: '+120%' }, { label: 'Skor PageSpeed', value: '100/100' }, { label: 'Klien Kelola Mandiri', value: '99%' }], en: [{ label: 'Average Load Time', value: '< 0.8s' }, { label: 'Conversion Lift', value: '+120%' }, { label: 'PageSpeed Score', value: '100/100' }, { label: 'Self-Managed Clients', value: '99%' }] }),
        features: JSON.stringify({ id: [{ title: 'Arsitektur Ultra Cepat (< 0.8s)', desc: 'Dioptimalkan dengan arsitektur Vite modern, code splitting, kompresi WebP, dan caching tingkat server untuk kecepatan akses instan.' }, { title: 'Desain High-Converting UI/UX', desc: 'Tata letak modern beraura korporat luxury dengan navigasi intuitif, mikro-interaksi dinamis, dan alur Call-to-Action (CTA) terarah.' }, { title: 'Katalog Solusi & Layanan Lengkap', desc: 'Menyajikan paket solusi terintegrasi: Landing Page, Company Profile, E-Commerce, Aplikasi Kasir Cloud POS, hingga Custom SaaS.' }, { title: 'Sistem Manajemen Konten Mandiri', desc: 'Dilengkapi portal admin dan API backend konten yang memudahkan update portofolio, layanan, dan testimoni secara realtime.' }], en: [{ title: 'Ultra-Fast Architecture (< 0.8s)', desc: 'Optimized with modern Vite architecture, code splitting, WebP asset compression, and server-grade caching for blazing speed.' }, { title: 'High-Converting UI/UX Design', desc: 'Modern luxury corporate aesthetic with intuitive navigation, fluid micro-interactions, and targeted conversion Call-to-Actions (CTAs).' }, { title: 'Comprehensive Solutions Catalog', desc: 'Showcases full-suite digital solutions: Landing Pages, Corporate Profiles, E-Commerce, Cloud POS Systems, and Custom SaaS.' }, { title: 'Self-Managed Content CMS', desc: 'Equipped with an admin portal and live backend content API for seamless, real-time updates of projects, services, and testimonials.' }] }),
        challenges: JSON.stringify({ id: [{ challenge: 'Mempertahankan animasi motion interaktif yang kaya tanpa mengorbankan skor Core Web Vitals dan LCP di perangkat seluler.', solution: 'Menerapkan lazy-loading komponen Framer Motion, preload aset LCP kritis, serta isolasi render menggunakan Tailwind CSS.' }, { challenge: 'Menghadirkan portal admin yang ringkas untuk manajemen konten dinamis tanpa overhead framework CMS berat.', solution: 'Membangun endpoint API RESTful mandiri dengan autentikasi berbasis token dan sinkronisasi JSON aman.' }], en: [{ challenge: 'Maintaining rich motion animations without compromising Core Web Vitals or LCP scores on mobile devices.', solution: 'Implemented Framer Motion component lazy loading, critical LCP preloading, and scoped rendering via Tailwind CSS.' }, { challenge: 'Delivering a lightweight admin portal for dynamic content updates without heavy CMS framework bloat.', solution: 'Built a standalone RESTful API layer with secure token-based authentication and structured JSON synchronization.' }] }),
        learnings: JSON.stringify({ id: ['Mendalami rekayasa web berorientasi konversi bisnis (conversion-driven web engineering).', 'Penguasaan teknik optimasi Core Web Vitals untuk mencapai skor PageSpeed sempurna (100).', 'Mengelola siklus pengembangan agensi dari penataan brand hingga peluncuran sistem digital.'], en: ['Deepened expertise in conversion-driven web engineering and enterprise digital positioning.', 'Mastered Core Web Vitals optimization techniques to achieve perfect (100) PageSpeed scores.', 'Managed agency-scale full lifecycle development from brand styling to system deployment.'] }),
        roadmap: JSON.stringify({ id: ['Kalkulator instan perkiraan biaya proyek dengan quotation PDF otomatis.', 'Integrasi live dashboard client portal untuk pelacakan progres pembuatan website.', 'AI Website Auditor otomatis untuk mengevaluasi performa web calon klien.'], en: ['Instant project cost estimator with automated PDF quotation generation.', 'Live client portal dashboard integration for real-time project milestone tracking.', 'Automated AI Website Auditor to evaluate prospective clients' site performance.'] }),
        tech_stack: JSON.stringify({ frontend: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vite'], cms: ['RESTful API', 'Custom Admin Portal', 'JSON Storage'], optimization: ['PWA Ready', 'PageSpeed 100', 'LCP < 0.8s', 'SEO Schema'], tools: ['Figma', 'Hostinger Cloud', 'Git / GitHub'] }),
        gallery: JSON.stringify(['/projects/zcode-showcase.png']),
        sort_order: 1
      },
      {
        slug: 'kasir-pintar-pos',
        title: 'Kasir Pintar POS',
        full_title_id: 'Kasir Pintar POS — Sistem Kasir & Monitoring Omzet Multi-Cabang Real-Time',
        full_title_en: 'Kasir Pintar POS — Multi-Outlet Real-Time Cloud POS & Revenue Monitor',
        subtitle_id: 'Aplikasi POS & dashboard analitik cloud terintegrasi untuk bisnis F&B multi-outlet.',
        subtitle_en: 'Integrated cloud POS and analytics monitoring dashboard for multi-outlet F&B businesses.',
        tagline_id: 'Aplikasi Kasir Cloud Real-Time dengan Monitoring Omzet Multi-Cabang, Audit Shift, dan Kontrol Hak Akses',
        tagline_en: 'Real-Time Cloud POS App with Multi-Outlet Revenue Monitoring, Shift Auditing, and Access Control',
        category_id: 'Aplikasi Web & Cloud POS',
        category_en: 'Web App & Cloud POS',
        badge_id: 'Sistem Kasir Pintar',
        badge_en: 'Smart Cloud POS',
        year: '2026',
        image: '/foto/kasir-pos-cover.png',
        live_url: 'https://kasir-pintar-pos.web.app/',
        overview_id: 'Kasir Pintar POS adalah aplikasi kasir berbasis web dan cloud modern yang dirancang untuk mengelola operasional bisnis kuliner (seperti Soto Mie Bogor) dan ritel secara efisien. Sistem ini dilengkapi dengan pemantauan status terminal kasir real-time, monitoring omzet antar cabang otomatis, manajemen menu & porsi terlaris, serta audit shift dan pembatasan hak akses berjenjang.',
        overview_en: 'Kasir Pintar POS is a modern web and cloud-based point-of-sale application engineered for high-efficiency culinary (e.g. Soto Mie Bogor) and retail operations. It features real-time terminal status monitoring, automated multi-outlet revenue tracking, best-selling menu analytics, shift auditing, and tiered role-based access control.',
        problem_id: 'Pemilik usaha kuliner dengan banyak cabang kesulitan memantau omzet penjualan secara langsung, mengaudit selisih kas pada setiap pergantian shift kasir, serta mengamankan pembatalan transaksi (void) tanpa otorisasi supervisor.',
        problem_en: "Multi-branch F&B owners struggled to track live revenue across disparate outlets, reconcile cash discrepancies during cashier shift handovers, and prevent unauthorized transaction cancellations (voids).",
        details: JSON.stringify({ role: { id: 'Fullstack Web Developer & UI/UX Designer', en: 'Fullstack Web Developer & UI/UX Designer' }, timeline: { id: '2026', en: '2026' }, scope: { id: 'Arsitektur frontend responsif, sinkronisasi database real-time, dashboard analitik multi-cabang, sistem audit shift kasir, dan integrasi otentikasi role berjenjang.', en: 'Responsive frontend architecture, real-time database synchronization, multi-outlet analytics dashboard, cashier shift audit system, and role-based access control.' } }),
        metrics: JSON.stringify({ id: [{ label: 'Sinkronisasi Data', value: 'Real-Time' }, { label: 'Dukungan Cabang', value: 'Multi-Outlet' }, { label: 'Deteksi Kasir Offline', value: '< 3s' }, { label: 'Audit Keamanan', value: 'OTP / Void Log' }], en: [{ label: 'Data Sync', value: 'Real-Time' }, { label: 'Outlet Support', value: 'Multi-Outlet' }, { label: 'Offline Detection', value: '< 3s' }, { label: 'Security Audit', value: 'OTP / Void Log' }] }),
        features: JSON.stringify({ id: [{ title: 'Live Terminal Monitor', desc: 'Pelacakan status aktif/offline terminal kasir di setiap cabang secara real-time dengan auto-detect dalam 3 detik.' }, { title: 'Monitoring Omzet Multi-Cabang', desc: 'Visualisasi metrik komprehensif: total omzet, total struk transaksi, estimasi rata-rata per struk, dan total menu terjual dengan filter cabang instan.' }, { title: 'Analisis Menu Terlaris', desc: 'Peringkat penjualan otomatis untuk mendeteksi menu paling diminati dan mengoptimalkan persediaan bahan baku.' }, { title: 'Audit Shift & Keamanan Kasir', desc: 'Pencatatan sesi shift kasir, riwayat login pengguna, serta proteksi pembatalan transaksi (void) menggunakan OTP supervisor.' }], en: [{ title: 'Live Terminal Monitor', desc: 'Real-time tracking of active and offline cashier terminals across all outlets with automatic 3-second offline detection.' }, { title: 'Multi-Branch Revenue Monitor', desc: 'Comprehensive metrics visualization: gross revenue, receipt count, average ticket size, and items sold with instant outlet filtering.' }, { title: 'Top-Selling Item Analytics', desc: 'Automated menu rank tracking to identify top-performing dishes and optimize inventory purchasing.' }, { title: 'Shift Audit & Cashier Security', desc: 'Detailed shift session logs, user activity auditing, and supervisor OTP verification for transaction voids.' }] }),
        challenges: JSON.stringify({ id: [{ challenge: 'Memastikan sinkronisasi data transaksi antar cabang tetap instan tanpa membebani performa browser.', solution: 'Menerapkan listener real-time cloud teroptimasi dan state management reaktif dengan pembaruan delta data.' }, { challenge: 'Mencegah kecurangan kasir dan selisih pembukuan kas pada jam sibuk.', solution: 'Membangun sistem audit shift ketat dengan pencatatan saldo awal/akhir kas dan verifikasi log void.' }], en: [{ challenge: 'Ensuring instant multi-branch transaction sync without degrading browser client performance.', solution: 'Engineered optimized cloud real-time listeners and reactive state management with delta payload updates.' }, { challenge: 'Preventing cashier fraud and cash drawer discrepancies during rush hours.', solution: 'Built a strict shift auditing mechanism tracking opening/closing balances with void verification logging.' }] }),
        learnings: JSON.stringify({ id: ['Pengembangan sistem POS cloud modern dengan arsitektur data real-time.', 'Desain antarmuka dashboard analitik bisnis yang intuitif untuk pemilik usaha dan staf operasional.', 'Penerapan kontrol hak akses keamanan berjenjang (Super Owner, Manajer Cabang, Kasir).'], en: ['Modern cloud POS system development with real-time reactive data architecture.', 'Intuitive business analytics dashboard UI/UX design tailored for business owners and operational staff.', 'Implementation of tiered security access control (Super Owner, Branch Manager, Cashier).'] }),
        roadmap: JSON.stringify({ id: ['Integrasi pencetakan struk termal Bluetooth nirkabel langsung dari browser / HP.', 'Integrasi pembayaran QRIS dinamis otomatis pada terminal kasir.', 'Modul manajemen inventaris & stok bahan baku otomatis berbasis resep.'], en: ['Direct wireless Bluetooth thermal receipt printing from browser / mobile.', 'Automated dynamic QRIS payment gateway integration at checkout terminals.', 'Recipe-based automated raw ingredient inventory and stock management module.'] }),
        tech_stack: JSON.stringify({ frontend: ['React.js', 'Tailwind CSS', 'JavaScript (ES6+)'], cms: ['Firebase Cloud', 'Firestore Realtime', 'Firebase Hosting'], optimization: ['PWA Ready', 'Real-Time Sync', 'Responsive UI'], tools: ['Figma UI/UX', 'Git / GitHub', 'Firebase CLI'] }),
        gallery: JSON.stringify(['/foto/kasir-pos-cover.png']),
        sort_order: 2
      }
    ];

    for (const p of projects) {
      await conn.execute(
        `INSERT INTO projects (slug, title, full_title_id, full_title_en, subtitle_id, subtitle_en, tagline_id, tagline_en, category_id, category_en, badge_id, badge_en, year, image, live_url, overview_id, overview_en, problem_id, problem_en, details, metrics, features, challenges, learnings, roadmap, tech_stack, gallery, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.slug, p.title, p.full_title_id, p.full_title_en, p.subtitle_id, p.subtitle_en, p.tagline_id, p.tagline_en, p.category_id, p.category_en, p.badge_id, p.badge_en, p.year, p.image, p.live_url, p.overview_id, p.overview_en, p.problem_id, p.problem_en, p.details, p.metrics, p.features, p.challenges, p.learnings, p.roadmap, p.tech_stack, p.gallery, p.sort_order]
      );
    }
    console.log('✅ Projects seeded');

    // ─── Skills Categories & Skills ───
    const skillsCats = [
      { index_label: '01', title_id: 'CMS & Pembangun Web', title_en: 'CMS & Web Builder', sort_order: 0, skills: [
        { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
        { name: 'Elementor', icon: '/icons/elementor.svg' },
        { name: 'Yoast SEO', icon: '/icons/yoast.svg' }
      ]},
      { index_label: '02', title_id: 'Frontend Dasar', title_en: 'Frontend Core', sort_order: 1, skills: [
        { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript (JS)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' }
      ]},
      { index_label: '03', title_id: 'Framework & Kode', title_en: 'Frameworks & Code', sort_order: 2, skills: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' }
      ]},
      { index_label: '04', title_id: 'Desain & Optimasi', title_en: 'Design & Optimization', sort_order: 3, skills: [
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
        { name: 'SEO', icon: '/icons/seo.svg' }
      ]}
    ];

    for (const cat of skillsCats) {
      const [result] = await conn.execute(
        `INSERT INTO skills_categories (index_label, title_id, title_en, sort_order) VALUES (?, ?, ?, ?)`,
        [cat.index_label, cat.title_id, cat.title_en, cat.sort_order]
      );
      const catId = result.insertId;
      for (let i = 0; i < cat.skills.length; i++) {
        await conn.execute(
          `INSERT INTO skills (category_id, name, icon, sort_order) VALUES (?, ?, ?, ?)`,
          [catId, cat.skills[i].name, cat.skills[i].icon, i]
        );
      }
    }
    console.log('✅ Skills categories & skills seeded');

    // ─── Certificates ───
    const certs = [
      {
        cert_key: 'cert-logistics',
        title_id: 'Sertifikat Koordinator Logistik',
        title_en: 'Logistics Coordinator Certificate',
        issuer: 'IYMPACK',
        year: '2025 – 2026',
        type_id: 'Kepemimpinan',
        type_en: 'Leadership',
        image: '/sertifikat/sertif-helmi-page-1.png',
        accent_color: '#455CE9',
        skills: JSON.stringify(['Field Logistics', 'Team Coordination', 'Operations Management', 'Site Survey', 'Event Execution']),
        sort_order: 0
      },
      {
        cert_key: 'cert-webdev',
        title_id: 'Sertifikat Web Development',
        title_en: 'Web Development Certificate',
        issuer: 'IYMPACK',
        year: '2026',
        type_id: 'Rekayasa Web',
        type_en: 'Web Engineering',
        image: '/sertifikat/sertif-helmi-page-2.png',
        accent_color: '#00F0FF',
        skills: JSON.stringify(['WordPress Development', 'Elementor', 'Custom CSS3', 'Responsive UI/UX', 'PageSpeed Optimization']),
        sort_order: 1
      }
    ];

    for (const c of certs) {
      await conn.execute(
        `INSERT INTO certificates (cert_key, title_id, title_en, issuer, year, type_id, type_en, image, accent_color, skills, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [c.cert_key, c.title_id, c.title_en, c.issuer, c.year, c.type_id, c.type_en, c.image, c.accent_color, c.skills, c.sort_order]
      );
    }
    console.log('✅ Certificates seeded');

    console.log('\n🎉 Seeding complete!');
  } finally {
    conn.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
