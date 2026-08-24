const express = require('express');
const multer  = require('multer');
const path    = require('path');
const { v4: uuidv4 } = require('uuid');
const { getDB } = require('../db');

const router = express.Router();

// ── Multer storage: saves files to backend/uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  },
});

const ALLOWED_MIMES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/pdf',
];

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed. Use images or PDF.`));
    }
  },
});

// ── POST /api/upload — upload a single file
router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file received' });

    const { filename, originalname, mimetype, size } = req.file;
    // Build URL that the frontend can use
    const fileUrl = `/uploads/${filename}`;

    // Track in DB
    const db = getDB();
    db.prepare(`
      INSERT INTO uploads (filename, original_name, mimetype, size, url)
      VALUES (?, ?, ?, ?, ?)
    `).run(filename, originalname, mimetype, size, fileUrl);

    res.json({
      success: true,
      url: fileUrl,          // relative — proxied through Vite in dev
      filename,
      originalName: originalname,
      mimetype,
      size,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Error handler for multer (file too large, wrong type)
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

module.exports = router;
