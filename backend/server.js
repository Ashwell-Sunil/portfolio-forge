const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const os       = require('os');
const { initDB } = require('./db');
const { renderPortfolio } = require('./renderer');
const portfolioRoutes = require('./routes/portfolios');
const uploadRoutes    = require('./routes/uploads');

const app  = express();
const PORT = 3001;

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '20mb' }));

// Serve uploaded files (images, PDFs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── API Routes ─────────────────────────────────────────────────────────────
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/upload', uploadRoutes);

// ── Server info (for frontend to display network URL) ──────────────────────
function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

app.get('/api/server-info', (req, res) => {
  const ip = getLocalIP();
  res.json({
    localUrl:   `http://localhost:${PORT}`,
    networkUrl: `http://${ip}:${PORT}`,
    ip,
    port: PORT,
  });
});

// ── Public Portfolio Page ──────────────────────────────────────────────────
// Opens on mobile at: http://{your-ip}:3001/p/{slug}
app.get('/p/:slug', (req, res) => {
  try {
    const { getDB } = require('./db');
    const db  = getDB();
    const row = db.prepare('SELECT * FROM portfolios WHERE slug = ?').get(req.params.slug);

    if (!row) {
      return res.status(404).send(`
        <!DOCTYPE html><html><head><title>Not Found</title>
        <style>body{background:#0b0f1a;color:#94a3b8;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center}</style>
        </head><body>
        <div><h1 style="color:#6366f1;font-size:2rem;margin-bottom:8px">404</h1>
        <p>Portfolio <strong style="color:#e2e8f0">${req.params.slug}</strong> not found.</p>
        <p style="margin-top:8px;font-size:.875rem">Publish it first from Folio Vitae.</p></div>
        </body></html>
      `);
    }

    const data = JSON.parse(row.data);
    const html = renderPortfolio(data, row.theme_id || 'engineering-dark');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(html);
  } catch (e) {
    console.error('[server] Error rendering portfolio:', e);
    res.status(500).send('Server error');
  }
});

// ── Root redirect ──────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    name: 'Folio Vitae API',
    version: '1.0.0',
    endpoints: {
      portfolios:  '/api/portfolios',
      upload:      '/api/upload',
      serverInfo:  '/api/server-info',
      publicPage:  '/p/:slug',
    },
  });
});

// ── Start ──────────────────────────────────────────────────────────────────
initDB();

app.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║        Folio Vitae Backend  v1.0             ║');
  console.log('╠══════════════════════════════════════════════╣');
  console.log(`║  Local:    http://localhost:${PORT}             ║`);
  console.log(`║  Network:  http://${ip}:${PORT}    ║`);
  console.log('║  Share the Network URL with your phone!      ║');
  console.log('╚══════════════════════════════════════════════╝\n');
});
