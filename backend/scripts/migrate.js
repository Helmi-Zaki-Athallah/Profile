import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

const DB_NAME = process.env.DB_NAME || 'hza_portfolio';

async function migrate() {
  // Connect without database first to create it
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  });

  console.log('🔌 Connected to MySQL');

  // Create database
  await conn.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await conn.execute(`USE \`${DB_NAME}\``);
  console.log(`📦 Database "${DB_NAME}" ready`);

  // ─── personal_info ───
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS personal_info (
      id INT AUTO_INCREMENT PRIMARY KEY,
      key_name VARCHAR(100) NOT NULL UNIQUE,
      value_text TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✅ Table personal_info');

  // ─── experiences ───
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS experiences (
      id INT AUTO_INCREMENT PRIMARY KEY,
      role_id VARCHAR(255) NOT NULL,
      role_en VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      duration_id VARCHAR(255),
      duration_en VARCHAR(255),
      type_id VARCHAR(100),
      type_en VARCHAR(100),
      description_id TEXT,
      description_en TEXT,
      tags JSON,
      icon VARCHAR(500),
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✅ Table experiences');

  // ─── projects ───
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(100) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      full_title_id VARCHAR(500),
      full_title_en VARCHAR(500),
      subtitle_id TEXT,
      subtitle_en TEXT,
      tagline_id TEXT,
      tagline_en TEXT,
      category_id VARCHAR(255),
      category_en VARCHAR(255),
      badge_id VARCHAR(100),
      badge_en VARCHAR(100),
      year VARCHAR(20),
      image VARCHAR(500),
      live_url VARCHAR(500),
      overview_id TEXT,
      overview_en TEXT,
      problem_id TEXT,
      problem_en TEXT,
      details JSON,
      metrics JSON,
      features JSON,
      challenges JSON,
      learnings JSON,
      roadmap JSON,
      tech_stack JSON,
      gallery JSON,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✅ Table projects');

  // ─── skills_categories ───
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS skills_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      index_label VARCHAR(10) NOT NULL,
      title_id VARCHAR(255) NOT NULL,
      title_en VARCHAR(255) NOT NULL,
      sort_order INT DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✅ Table skills_categories');

  // ─── skills ───
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS skills (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      icon VARCHAR(500),
      sort_order INT DEFAULT 0,
      FOREIGN KEY (category_id) REFERENCES skills_categories(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✅ Table skills');

  // ─── certificates ───
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS certificates (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cert_key VARCHAR(50) NOT NULL UNIQUE,
      title_id VARCHAR(255) NOT NULL,
      title_en VARCHAR(255) NOT NULL,
      issuer VARCHAR(255),
      year VARCHAR(50),
      type_id VARCHAR(100),
      type_en VARCHAR(100),
      image VARCHAR(500),
      accent_color VARCHAR(20),
      skills JSON,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✅ Table certificates');

  // ─── admin_users ───
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✅ Table admin_users');

  await conn.end();
  console.log('\n🎉 Migration complete!');
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
