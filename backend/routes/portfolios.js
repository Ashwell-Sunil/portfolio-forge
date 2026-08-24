const express = require('express');
const router = express.Router();
const { getDB } = require('../db');

// ── GET /api/portfolios — list all (local dashboard use)
router.get('/', (req, res) => {
  try {
    const db = getDB();
    const rows = db.prepare('SELECT id, slug, name, theme_id, created_at, updated_at FROM portfolios ORDER BY updated_at DESC').all();
    res.json({ portfolios: rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── GET /api/portfolios/:slug/export — download single file HTML
router.get('/:slug/export', (req, res) => {
  try {
    const { renderPortfolio, embedLocalAssets } = require('../renderer');
    const db = getDB();
    const row = db.prepare('SELECT * FROM portfolios WHERE slug = ?').get(req.params.slug);
    if (!row) return res.status(404).send('Not found');

    const data = JSON.parse(row.data);
    let html = renderPortfolio(data, row.theme_id || 'engineering-dark');
    
    // Embed local /uploads/ images as base64 for a true single-file experience
    html = embedLocalAssets(html);

    res.setHeader('Content-disposition', `attachment; filename=${req.params.slug}-portfolio.html`);
    res.setHeader('Content-type', 'text/html');
    res.send(html);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// ── GET /api/portfolios/:slug — get portfolio data
router.get('/:slug', (req, res) => {
  try {
    const db = getDB();
    const row = db.prepare('SELECT * FROM portfolios WHERE slug = ?').get(req.params.slug);
    if (!row) return res.status(404).json({ error: 'Portfolio not found' });
    res.json({ portfolio: { ...row, data: JSON.parse(row.data) } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── POST /api/portfolios — create or update portfolio
router.post('/', (req, res) => {
  try {
    const db = getDB();
    const { data, slug, themeId } = req.body;
    if (!data || !slug) return res.status(400).json({ error: 'data and slug are required' });

    const name = data.profile?.name || slug;
    const dataStr = JSON.stringify(data);
    const now = new Date().toISOString();

    const existing = db.prepare('SELECT id FROM portfolios WHERE slug = ?').get(slug);
    if (existing) {
      db.prepare(`
        UPDATE portfolios SET data = ?, name = ?, theme_id = ?, updated_at = ? WHERE slug = ?
      `).run(dataStr, name, themeId || 'engineering-dark', now, slug);
    } else {
      db.prepare(`
        INSERT INTO portfolios (slug, name, data, theme_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(slug, name, dataStr, themeId || 'engineering-dark', now, now);
    }

    res.json({ success: true, slug, message: existing ? 'Updated' : 'Created' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── DELETE /api/portfolios/:slug
router.delete('/:slug', (req, res) => {
  try {
    const db = getDB();
    db.prepare('DELETE FROM portfolios WHERE slug = ?').run(req.params.slug);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
