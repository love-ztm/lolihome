-- QingHome D1 Database Schema
-- 与 worker/index.js ensureTables() 保持一致

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT DEFAULT '',
  brand TEXT DEFAULT '',
  avatar TEXT DEFAULT '',
  title TEXT DEFAULT '',
  tagline TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  email TEXT DEFAULT '',
  status TEXT DEFAULT 'available',
  bg_light TEXT DEFAULT '',
  bg_dark TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT DEFAULT '',
  value TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT DEFAULT '',
  excerpt TEXT DEFAULT '',
  date TEXT DEFAULT '',
  tags TEXT DEFAULT '',
  url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT DEFAULT '',
  description TEXT DEFAULT '',
  tags TEXT DEFAULT '',
  stars INTEGER DEFAULT 0,
  language TEXT DEFAULT '',
  language_color TEXT DEFAULT '',
  url TEXT DEFAULT '',
  icon TEXT DEFAULT 'fa-brands fa-github',
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT DEFAULT '',
  description TEXT DEFAULT '',
  category TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS socials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT DEFAULT '',
  handle TEXT DEFAULT '',
  url TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS nav_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  section_id TEXT DEFAULT '',
  url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

-- GitHub Stars 缓存
CREATE TABLE IF NOT EXISTS gh_stars_cache (
  repo TEXT PRIMARY KEY,
  stars INTEGER NOT NULL,
  updated_at TEXT NOT NULL
);

-- 博客源配置（RSS/Atom 地址，多行，每行一个）
CREATE TABLE IF NOT EXISTS blog_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT DEFAULT '',
  url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

-- 博客文章拉取缓存
CREATE TABLE IF NOT EXISTS blog_fetch_cache (
  source TEXT PRIMARY KEY,
  posts TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- GitHub 项目源配置（用户名，支持多个）
CREATE TABLE IF NOT EXISTS github_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

-- GitHub 仓库拉取缓存
CREATE TABLE IF NOT EXISTS github_repos_cache (
  username TEXT PRIMARY KEY,
  repos TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);