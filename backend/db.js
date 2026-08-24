const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'portfolio.db');

let db;

function getDB() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

function initDB() {
  const db = getDB();

  db.exec(`
    CREATE TABLE IF NOT EXISTS portfolios (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      slug      TEXT    UNIQUE NOT NULL,
      name      TEXT    DEFAULT '',
      data      TEXT    NOT NULL,
      theme_id  TEXT    DEFAULT 'engineering-dark',
      published INTEGER DEFAULT 1,
      created_at TEXT   DEFAULT (datetime('now')),
      updated_at TEXT   DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS uploads (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      filename      TEXT UNIQUE NOT NULL,
      original_name TEXT,
      mimetype      TEXT,
      size          INTEGER,
      url           TEXT NOT NULL,
      created_at    TEXT DEFAULT (datetime('now'))
    );
  `);

  console.log('[DB] SQLite initialized at', DB_PATH);
  return db;
}

module.exports = { getDB, initDB };
