import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// ══════════════════════════════════════════
//  PERSONAL INFO
// ══════════════════════════════════════════

// GET /api/data/personal-info
router.get('/personal-info', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT key_name, value_text FROM personal_info ORDER BY id');
    const data = {};
    for (const row of rows) {
      data[row.key_name] = row.value_text;
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/data/personal-info
router.put('/personal-info', async (req, res) => {
  try {
    const entries = req.body; // { key_name: value, ... }
    for (const [key, val] of Object.entries(entries)) {
      await pool.execute(
        'INSERT INTO personal_info (key_name, value_text) VALUES (?, ?) ON DUPLICATE KEY UPDATE value_text = VALUES(value_text)',
        [key, val]
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ══════════════════════════════════════════
//  EXPERIENCES
// ══════════════════════════════════════════

// GET /api/data/experiences
router.get('/experiences', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM experiences ORDER BY sort_order, id');
    res.json(rows.map(r => ({ ...r, tags: JSON.parse(r.tags || '[]') })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/data/experiences
router.post('/experiences', async (req, res) => {
  try {
    const d = req.body;
    const [result] = await pool.execute(
      `INSERT INTO experiences (role_id, role_en, company, duration_id, duration_en, type_id, type_en, description_id, description_en, tags, icon, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [d.role_id, d.role_en, d.company, d.duration_id, d.duration_en, d.type_id, d.type_en, d.description_id, d.description_en, JSON.stringify(d.tags || []), d.icon, d.sort_order || 0]
    );
    res.json({ id: result.insertId, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/data/experiences/:id
router.put('/experiences/:id', async (req, res) => {
  try {
    const d = req.body;
    await pool.execute(
      `UPDATE experiences SET role_id=?, role_en=?, company=?, duration_id=?, duration_en=?, type_id=?, type_en=?, description_id=?, description_en=?, tags=?, icon=?, sort_order=? WHERE id=?`,
      [d.role_id, d.role_en, d.company, d.duration_id, d.duration_en, d.type_id, d.type_en, d.description_id, d.description_en, JSON.stringify(d.tags || []), d.icon, d.sort_order || 0, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/data/experiences/:id
router.delete('/experiences/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM experiences WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ══════════════════════════════════════════
//  PROJECTS
// ══════════════════════════════════════════

// GET /api/data/projects
router.get('/projects', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM projects ORDER BY sort_order, id');
    res.json(rows.map(r => ({
      ...r,
      details: JSON.parse(r.details || '{}'),
      metrics: JSON.parse(r.metrics || '{}'),
      features: JSON.parse(r.features || '{}'),
      challenges: JSON.parse(r.challenges || '{}'),
      learnings: JSON.parse(r.learnings || '{}'),
      roadmap: JSON.parse(r.roadmap || '{}'),
      tech_stack: JSON.parse(r.tech_stack || '{}'),
      gallery: JSON.parse(r.gallery || '[]')
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/data/projects
router.post('/projects', async (req, res) => {
  try {
    const d = req.body;
    const [result] = await pool.execute(
      `INSERT INTO projects (slug, title, full_title_id, full_title_en, subtitle_id, subtitle_en, tagline_id, tagline_en, category_id, category_en, badge_id, badge_en, year, image, live_url, overview_id, overview_en, problem_id, problem_en, details, metrics, features, challenges, learnings, roadmap, tech_stack, gallery, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [d.slug, d.title, d.full_title_id, d.full_title_en, d.subtitle_id, d.subtitle_en, d.tagline_id, d.tagline_en, d.category_id, d.category_en, d.badge_id, d.badge_en, d.year, d.image, d.live_url, d.overview_id, d.overview_en, d.problem_id, d.problem_en, JSON.stringify(d.details || {}), JSON.stringify(d.metrics || {}), JSON.stringify(d.features || {}), JSON.stringify(d.challenges || {}), JSON.stringify(d.learnings || {}), JSON.stringify(d.roadmap || {}), JSON.stringify(d.tech_stack || {}), JSON.stringify(d.gallery || []), d.sort_order || 0]
    );
    res.json({ id: result.insertId, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/data/projects/:id
router.put('/projects/:id', async (req, res) => {
  try {
    const d = req.body;
    await pool.execute(
      `UPDATE projects SET slug=?, title=?, full_title_id=?, full_title_en=?, subtitle_id=?, subtitle_en=?, tagline_id=?, tagline_en=?, category_id=?, category_en=?, badge_id=?, badge_en=?, year=?, image=?, live_url=?, overview_id=?, overview_en=?, problem_id=?, problem_en=?, details=?, metrics=?, features=?, challenges=?, learnings=?, roadmap=?, tech_stack=?, gallery=?, sort_order=? WHERE id=?`,
      [d.slug, d.title, d.full_title_id, d.full_title_en, d.subtitle_id, d.subtitle_en, d.tagline_id, d.tagline_en, d.category_id, d.category_en, d.badge_id, d.badge_en, d.year, d.image, d.live_url, d.overview_id, d.overview_en, d.problem_id, d.problem_en, JSON.stringify(d.details || {}), JSON.stringify(d.metrics || {}), JSON.stringify(d.features || {}), JSON.stringify(d.challenges || {}), JSON.stringify(d.learnings || {}), JSON.stringify(d.roadmap || {}), JSON.stringify(d.tech_stack || {}), JSON.stringify(d.gallery || []), d.sort_order || 0, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/data/projects/:id
router.delete('/projects/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ══════════════════════════════════════════
//  SKILLS CATEGORIES + SKILLS
// ══════════════════════════════════════════

// GET /api/data/skills
router.get('/skills', async (req, res) => {
  try {
    const [categories] = await pool.execute('SELECT * FROM skills_categories ORDER BY sort_order, id');
    const [skills] = await pool.execute('SELECT * FROM skills ORDER BY sort_order, id');
    const result = categories.map(cat => ({
      ...cat,
      skills: skills.filter(s => s.category_id === cat.id)
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/data/skills/categories
router.post('/skills/categories', async (req, res) => {
  try {
    const d = req.body;
    const [result] = await pool.execute(
      'INSERT INTO skills_categories (index_label, title_id, title_en, sort_order) VALUES (?, ?, ?, ?)',
      [d.index_label, d.title_id, d.title_en, d.sort_order || 0]
    );
    res.json({ id: result.insertId, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/data/skills/categories/:id
router.put('/skills/categories/:id', async (req, res) => {
  try {
    const d = req.body;
    await pool.execute(
      'UPDATE skills_categories SET index_label=?, title_id=?, title_en=?, sort_order=? WHERE id=?',
      [d.index_label, d.title_id, d.title_en, d.sort_order || 0, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/data/skills/categories/:id
router.delete('/skills/categories/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM skills_categories WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/data/skills/items
router.post('/skills/items', async (req, res) => {
  try {
    const d = req.body;
    const [result] = await pool.execute(
      'INSERT INTO skills (category_id, name, icon, sort_order) VALUES (?, ?, ?, ?)',
      [d.category_id, d.name, d.icon, d.sort_order || 0]
    );
    res.json({ id: result.insertId, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/data/skills/items/:id
router.put('/skills/items/:id', async (req, res) => {
  try {
    const d = req.body;
    await pool.execute(
      'UPDATE skills SET category_id=?, name=?, icon=?, sort_order=? WHERE id=?',
      [d.category_id, d.name, d.icon, d.sort_order || 0, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/data/skills/items/:id
router.delete('/skills/items/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM skills WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ══════════════════════════════════════════
//  CERTIFICATES
// ══════════════════════════════════════════

// GET /api/data/certificates
router.get('/certificates', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM certificates ORDER BY sort_order, id');
    res.json(rows.map(r => ({ ...r, skills: JSON.parse(r.skills || '[]') })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/data/certificates
router.post('/certificates', async (req, res) => {
  try {
    const d = req.body;
    const [result] = await pool.execute(
      `INSERT INTO certificates (cert_key, title_id, title_en, issuer, year, type_id, type_en, image, accent_color, skills, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [d.cert_key, d.title_id, d.title_en, d.issuer, d.year, d.type_id, d.type_en, d.image, d.accent_color, JSON.stringify(d.skills || []), d.sort_order || 0]
    );
    res.json({ id: result.insertId, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/data/certificates/:id
router.put('/certificates/:id', async (req, res) => {
  try {
    const d = req.body;
    await pool.execute(
      `UPDATE certificates SET cert_key=?, title_id=?, title_en=?, issuer=?, year=?, type_id=?, type_en=?, image=?, accent_color=?, skills=?, sort_order=? WHERE id=?`,
      [d.cert_key, d.title_id, d.title_en, d.issuer, d.year, d.type_id, d.type_en, d.image, d.accent_color, JSON.stringify(d.skills || []), d.sort_order || 0, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/data/certificates/:id
router.delete('/certificates/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM certificates WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ══════════════════════════════════════════
//  GENERATE STATIC JSON
// ══════════════════════════════════════════

// POST /api/data/generate — triggers static JSON generation
router.post('/generate', async (req, res) => {
  try {
    const { generateStaticJSON } = await import('../scripts/generate.js');
    await generateStaticJSON();
    res.json({ success: true, message: 'Static JSON generated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Generation failed: ' + err.message });
  }
});

export default router;
