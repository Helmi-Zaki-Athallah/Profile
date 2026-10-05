import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateStaticJSON() {
  console.log('📦 Fetching data from MySQL to generate 100% static portfolio...\n');

  // ─── Personal Info ───
  const [piRows] = await pool.execute('SELECT key_name, value_text FROM personal_info ORDER BY id');
  const personalRaw = {};
  for (const row of piRows) {
    personalRaw[row.key_name] = row.value_text;
  }

  const personalInfo = {
    name: personalRaw.name || "Helmi Zaki Athallah",
    firstName: personalRaw.firstName || "HELMI",
    middleName: personalRaw.middleName || "ZAKI",
    lastName: personalRaw.lastName || "ATHALLAH",
    fullCaps: personalRaw.fullCaps || "HELMI ZAKI ATHALLAH",
    initials: personalRaw.initials || "HZA",
    email: personalRaw.email || "athallahhelmi2@gmail.com",
    emailAlt: personalRaw.emailAlt || "helmiathallah2@gmail.com",
    phone: personalRaw.phone || "(+62) 859 2500 5036",
    whatsapp: personalRaw.whatsapp || "https://wa.me/6285925005036",
    location: personalRaw.location || "Kab. Bogor, Jawa Barat, Indonesia",
    campus: personalRaw.campus || "Universitas Pamulang (UNPAM)",
    faculty: personalRaw.faculty || "Fakultas Teknik - Teknik Elektro",
    linkedin: personalRaw.linkedin || "https://www.linkedin.com/in/helmi-zaki",
    instagram: personalRaw.instagram || "https://www.instagram.com/athl.lahh?igsh=MWF3dWlkN21memNucw==",
    instagramHandle: personalRaw.instagramHandle || "@athl.lahh",
    github: personalRaw.github || "https://github.com/",
    tagline: {
      id: personalRaw.tagline_id || "Membangun Pengalaman Digital",
      en: personalRaw.tagline_en || "Building Digital Experiences"
    },
    subHeadline: {
      id: personalRaw.subHeadline_id || "Mahasiswa & Web Developer Freelance yang berdedikasi menciptakan solusi web yang bersih, fungsional, dan responsif.",
      en: personalRaw.subHeadline_en || "University Student & Freelance Web Developer passionate about creating clean, functional, and responsive solutions."
    },
    roleLabel: {
      id: personalRaw.roleLabel_id || "Web Developer & Koordinator Logistik",
      en: personalRaw.roleLabel_en || "Web Developer & Logistics Coordinator"
    },
    aboutParagraphs: {
      id: [personalRaw.aboutParagraphs_id_0, personalRaw.aboutParagraphs_id_1, personalRaw.aboutParagraphs_id_2].filter(Boolean),
      en: [personalRaw.aboutParagraphs_en_0, personalRaw.aboutParagraphs_en_1, personalRaw.aboutParagraphs_en_2].filter(Boolean)
    },
    stats: {
      id: JSON.parse(personalRaw.stats_id || '[]'),
      en: JSON.parse(personalRaw.stats_en || '[]')
    }
  };

  // ─── Experiences ───
  const [expRows] = await pool.execute('SELECT * FROM experiences ORDER BY sort_order, id');
  const experiences = expRows.map(r => ({
    role: { id: r.role_id, en: r.role_en },
    company: r.company,
    duration: { id: r.duration_id, en: r.duration_en },
    type: { id: r.type_id, en: r.type_en },
    description: { id: r.description_id, en: r.description_en },
    tags: JSON.parse(r.tags || '[]'),
    icon: r.icon
  }));

  // ─── Projects ───
  const [projRows] = await pool.execute('SELECT * FROM projects ORDER BY sort_order, id');
  const projectCaseStudies = projRows.map(r => ({
    id: r.slug,
    slug: r.slug,
    title: r.title,
    fullTitle: { id: r.full_title_id, en: r.full_title_en },
    subtitle: { id: r.subtitle_id, en: r.subtitle_en },
    tagline: { id: r.tagline_id, en: r.tagline_en },
    category: { id: r.category_id, en: r.category_en },
    badge: { id: r.badge_id, en: r.badge_en },
    year: r.year,
    image: r.image,
    liveUrl: r.live_url,
    overview: { id: r.overview_id, en: r.overview_en },
    problem: { id: r.problem_id, en: r.problem_en },
    details: JSON.parse(r.details || '{}'),
    metrics: JSON.parse(r.metrics || '{}'),
    features: JSON.parse(r.features || '{}'),
    challenges: JSON.parse(r.challenges || '{}'),
    learnings: JSON.parse(r.learnings || '{}'),
    roadmap: JSON.parse(r.roadmap || '{}'),
    techStack: JSON.parse(r.tech_stack || '{}'),
    gallery: JSON.parse(r.gallery || '[]')
  }));

  // ─── Skills ───
  const [catRows] = await pool.execute('SELECT * FROM skills_categories ORDER BY sort_order, id');
  const [skillRows] = await pool.execute('SELECT * FROM skills ORDER BY sort_order, id');
  const skillsCategories = catRows.map(cat => ({
    index: cat.index_label,
    title: { id: cat.title_id, en: cat.title_en },
    skills: skillRows.filter(s => s.category_id === cat.id).map(s => ({
      name: s.name,
      icon: s.icon
    }))
  }));

  // ─── Certificates ───
  const [certRows] = await pool.execute('SELECT * FROM certificates ORDER BY sort_order, id');
  const certificates = certRows.map(r => ({
    id: r.cert_key,
    title: { id: r.title_id, en: r.title_en },
    issuer: r.issuer,
    year: r.year,
    type: { id: r.type_id, en: r.type_en },
    image: r.image,
    accentColor: r.accent_color,
    skills: JSON.parse(r.skills || '[]')
  }));

  const generatedAt = new Date().toISOString();

  // 1. Write public/data/portfolio.json
  const output = {
    personalInfo,
    experiences,
    projectCaseStudies,
    skillsCategories,
    certificates,
    generatedAt
  };

  const outputDir = path.resolve(__dirname, '../../public/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'portfolio.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

  // 2. Also update src/data/portfolioData.js so Vite static build is baked with fresh data
  const jsDataContent = `/**
 * Data Portfolio Asli Helmi Zaki Athallah (Dwibahasa: ID / EN)
 * Auto-generated from MySQL Database at: ${generatedAt}
 * 100% Static - Zero LocalStorage, Zero runtime DB overhead
 */

export const personalInfo = ${JSON.stringify(personalInfo, null, 2)};

export const experiences = ${JSON.stringify(experiences, null, 2)};

export const projectCaseStudies = ${JSON.stringify(projectCaseStudies, null, 2)};

export const skillsCategories = ${JSON.stringify(skillsCategories, null, 2)};

export const certificates = ${JSON.stringify(certificates, null, 2)};

/**
 * Helper to safely extract localized value or fallback to string
 */
export function getLocalized(item, lang = 'id') {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item[lang] || item.id || item.en || '';
}
`;

  const jsDataPath = path.resolve(__dirname, '../../src/data/portfolioData.js');
  fs.writeFileSync(jsDataPath, jsDataContent, 'utf-8');

  console.log(`✅ Static JSON written to: ${outputPath}`);
  console.log(`✅ Static JS Module updated at: ${jsDataPath}`);
  console.log(`📊 Total Items: ${experiences.length} Experiences, ${projectCaseStudies.length} Projects, ${skillsCategories.length} Skill Categories, ${certificates.length} Certificates`);

  return output;
}

// Run directly if called from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateStaticJSON()
    .then(() => {
      console.log('\n🎉 Generation complete!');
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Generation failed:', err.message);
      process.exit(1);
    });
}
