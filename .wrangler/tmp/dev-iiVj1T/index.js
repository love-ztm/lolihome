var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker/index.js
var _initialized = false;
var DEFAULT_PROFILE = {
  name: "\u9752\u4E91\u5FD7\u4E3B\u9875",
  brand: "QingHome",
  avatar: "https://pan.811520.xyz/icon/logo128.webp",
  title: "\u4E00\u4E2A\u53C8\u83DC\u53C8\u7231\u73A9\u7684\u5C0F\u767D",
  tagline: "\u7528\u4EE3\u7801\u89E3\u51B3\u95EE\u9898\uFF0C\u7528\u6587\u5B57\u8BB0\u5F55\u601D\u8003\u3002",
  bio: "\u8FD9\u91CC\u662F\u6211\u8BB0\u5F55\u6240\u5B66\u3001\u4E0E\u540C\u597D\u4EA4\u6D41\u7684\u5C0F\u5C0F\u7A97\u53E3\uFF0C\u4E5F\u662F\u7763\u4FC3\u81EA\u5DF1\u4E0D\u65AD\u7CBE\u8FDB\u7684\u81EA\u7559\u5730\u3002\n\u613F\u6BCF\u4E00\u4F4D\u5230\u8BBF\u7684\u4F60\uFF0C\u90FD\u80FD\u6709\u6240\u6536\u83B7\u3001\u5FC3\u751F\u5171\u9E23\u3002",
  email: "admin@24811213.xyz",
  status: "available"
};
var DEFAULT_STATS = [
  { id: 1, label: "\u5F00\u6E90\u8D21\u732E", value: "1.5k+", icon: "fa-solid fa-atom" },
  { id: 2, label: "\u6280\u672F\u6587\u7AE0", value: "96", icon: "fa-solid fa-file-lines" },
  { id: 3, label: "GitHub Stars", value: "839", icon: "fa-solid fa-star" }
];
var DEFAULT_NAV = [
  { id: 1, label: "\u9996\u9875", icon: "fa-solid fa-house", section_id: "home" },
  { id: 2, label: "\u535A\u5BA2", icon: "fa-solid fa-feather", section_id: "blog" },
  { id: 3, label: "\u9879\u76EE", icon: "fa-solid fa-code", section_id: "projects" },
  { id: 4, label: "\u7AD9\u70B9", icon: "fa-solid fa-compass", section_id: "resources" },
  { id: 5, label: "\u8054\u7CFB", icon: "fa-solid fa-envelope", section_id: "connect" }
];
var DEFAULT_BLOG = [
  { id: 1, title: "\u73B0\u4EE3\u5316\u57DF\u540D\u7BA1\u7406\u5DE5\u5177", excerpt: "\u57FA\u4E8E Cloudflare Worker \u548C KV \u6784\u5EFA\u7684\u57DF\u540D\u76D1\u63A7\u9762\u677F\u3002", date: "2025-11-18", tags: "Cloudflare,Domain", url: "https://blog.notett.com/post/2025/11/251118-domain-check/" },
  { id: 2, title: "Hexo \u535A\u5BA2\u6587\u7AE0\u52A0\u5BC6\u5C40\u90E8\u6307\u5B9A\u5185\u5BB9", excerpt: "\u52A0\u5BC6\u63D2\u4EF6 hexo-blog-encrypt \u53EF\u4EE5\u52A0\u5BC6\u5355\u7BC7\u6587\u7AE0\uFF0C\u4F46\u4E0D\u80FD\u5B9E\u73B0\u5C40\u90E8\u5185\u5BB9\u52A0\u5BC6\u3002", date: "2025-12-24", tags: "Hexo,Encrypt", url: "https://blog.notett.com/post/2025/08/250809-hexo-jiami/" },
  { id: 3, title: "\u5728 Obsidian \u4E2D\u4F7F\u7528\u5170\u7A7A\u56FE\u5E8A API \u81EA\u52A8\u4F20\u56FE", excerpt: "pnpm workspace + Turborepo + Changesets \u7684\u5B9E\u6218\u843D\u5730\u3002", date: "2025-02-18", tags: "Obsidian,LskyPro", url: "https://blog.notett.com/post/2024/10/lskypro-nf/" },
  { id: 4, title: "\u767D\u5AD6 B2 10G \u5BF9\u8C61\u5B58\u50A8\u5E76\u6302\u8F7D\u5230 alist", excerpt: "\u8BA9 B2 \u7684\u79C1\u6709\u6876\u901A\u8FC7 CF Worker \u53CD\u4EE3\u5B9E\u73B0\u516C\u5F00\u8BBF\u95EE\u3002", date: "2025-05-03", tags: "backblaze,Cloudflare", url: "https://blog.notett.com/post/2025/05/b2-bucket-mount/" },
  { id: 5, title: "\u514D\u8D39\u57DF\u540D\u8D44\u6E90\u6536\u96C6", excerpt: "\u6536\u96C6\u4E00\u4E9B\u514D\u8D39\u7684\u57DF\u540D\u8D44\u6E90\u4F9B\u5927\u5BB6\u9009\u62E9\u4F7F\u7528\u3002", date: "2025-05-30", tags: "Domain,Free", url: "https://blog.notett.com/post/2025/05/250530-free-domain/" },
  { id: 6, title: "\u7528 Serv00 \u8BBE\u7F6E\u57DF\u540D\u90AE\u7BB1", excerpt: "Serv00 \u81EA\u5E26\u7684\u90AE\u7BB1\u529F\u80FD\u80FD\u591F\u5B9E\u73B0\u6536\u53D1\u4EF6\uFF0C\u540C\u65F6\u652F\u6301 IMAP/POP/SMTP \u529F\u80FD\u3002", date: "2025-06-29", tags: "Serv00,Mail", url: "https://blog.notett.com/post/2025/06/202506-s00-email/" }
];
var DEFAULT_PROJECTS = [
  { id: 1, name: "domain-check", description: "\u57FA\u4E8E Cloudflare Worker \u548C KV \u6784\u5EFA\u7684\u57DF\u540D\u5230\u671F\u76D1\u63A7\u4EEA\u8868\u76D8\uFF0C\u652F\u6301\u5230\u671F\u63D0\u9192\u3002", tags: "Cloudflare,Domain", stars: 245, language: "JavaScript", language_color: "#083fa1", url: "https://github.com/yutian81/domain-check", icon: "fa-brands fa-github" },
  { id: 2, name: "IP-SpeedTest", description: "\u6D4B\u8BD5 Cloudflare IP \u5730\u5740\u7684\u4F4D\u7F6E\u4FE1\u606F\u3001\u5EF6\u8FDF\u548C\u4E0B\u8F7D\u901F\u5EA6\u3002", tags: "SpeedTest,Cloudflare", stars: 30, language: "Golang", language_color: "#3178c6", url: "https://github.com/yutian81/IP-SpeedTest", icon: "fa-brands fa-github" },
  { id: 3, name: "Keepalive", description: "\u5404\u79CD\u4FDD\u6D3B\u9879\u76EE\u5408\u96C6\u3002", tags: "Keepalive,Action", stars: 167, language: "Python", language_color: "#f1e05a", url: "https://github.com/yutian81/Keepalive", icon: "fa-brands fa-github" },
  { id: 4, name: "QingHome", description: "\u4E00\u4E2A\u7CBE\u7F8E\u7684\u73B0\u4EE3\u5316\u4E2A\u4EBA\u4E3B\u9875\u3002", tags: "Cloudflare,Vite,React", stars: 99, language: "TypeScript", language_color: "#3178c6", url: "https://github.com/yutian81/QingHome", icon: "fa-brands fa-github" },
  { id: 5, name: "openclaw-hug", description: "\u4E13\u7528\u4E8E Hugging Face \u7684 openclaw \u90E8\u7F72\u65B9\u6848\u3002", tags: "Hugging,AI", stars: 98, language: "Shell", language_color: "#f1e05a", url: "https://github.com/yutianqq/openclaw-hug", icon: "fa-brands fa-github" },
  { id: 6, name: "hermes-hug", description: "\u4E13\u7528\u4E8E Hugging Face \u7684 hermes \u90E8\u7F72\u65B9\u6848\u3002", tags: "Hugging,AI", stars: 97, language: "Shell", language_color: "#563d7c", url: "https://github.com/yutianqq/hermes-hug", icon: "fa-brands fa-github" }
];
var DEFAULT_RESOURCES = [
  { id: 1, title: "\u9752\u4E91\u5FD7\u5BFC\u822A", description: "\u4E2A\u4EBA\u5BFC\u822A\u7AD9\u70B9\uFF0C\u53EF\u6CE8\u518C\u8D26\u6237\uFF0C\u6216\u79C1\u6709\u5316\u90E8\u7F72\u3002", category: "nav", icon: "fa-solid fa-compass", url: "https://weby.netlib.re" },
  { id: 2, title: "MoonTV", description: "\u514D\u8D39\u7684\u5728\u7EBF\u89C6\u9891\u7F51\u7AD9\u3002", category: "video", icon: "fa-solid fa-circle-play", url: "https://moon.qyun.nyc.mn" },
  { id: 3, title: "\u57DF\u540D\u90AE\u7BB1", description: "\u53EF\u957F\u671F\u4F7F\u7528\u7684\u514D\u8D39\u57DF\u540D\u90AE\u7BB1\u3002", category: "email", icon: "fa-solid fa-envelope", url: "https://mail.v360.pp.ua/" },
  { id: 4, title: "WebSSH", description: "\u5728\u7EBFSSH\u8FDE\u63A5\u5DE5\u5177\u3002", category: "ssh", icon: "fa-solid fa-crosshairs", url: "https://ssh.yuzong.nyc.mn" },
  { id: 5, title: "\u8BA2\u9605\u8F6C\u6362", description: "\u5728\u7EBF\u8BA2\u9605\u8F6C\u6362\u5DE5\u5177\uFF0C\u652F\u6301 clash\u3001sing-box \u7B49\u683C\u5F0F\u3002", category: "sub", icon: "fa-solid fa-arrows-to-dot", url: "https://sub.ccwu.cc" },
  { id: 6, title: "\u4F18\u9009\u8BA2\u9605", description: "\u7CBE\u9009\u5927\u91CF\u4F18\u8D28\u4E2D\u8F6CIP\uFF0C\u52A0\u901F\u4F60\u7684CF\u8282\u70B9\u3002", category: "sub", icon: "fa-solid fa-diagram-next", url: "https://sub.ais.sld.tw/sub" },
  { id: 7, title: "\u5170\u7A7A\u56FE\u5E8A", description: "\u4E8C\u5F00\u7F8E\u5316\u7684\u5170\u7A7A\u56FE\u5E8A\u3002", category: "images", icon: "fa-solid fa-images", url: "https://img.811520.xyz" },
  { id: 8, title: "\u5C01\u9762\u5236\u4F5C", description: "\u4E3A\u535A\u5BA2\u6587\u7AE0\u5236\u4F5C\u7CBE\u7F8E\u7684\u5C01\u9762\u3002", category: "images", icon: "fa-solid fa-layer-group", url: "https://cover.811520.xyz" },
  { id: 9, title: "\u6BCF\u65E5bing\u56FE", description: "\u6BCF\u65E5\u81EA\u52A8\u66F4\u65B0 Bing \u58C1\u7EB8\uFF0C\u63D0\u4F9B\u7CBE\u7F8E\u9AD8\u6E05\u56FE\u7247\u3002", category: "images", icon: "fa-brands fa-square-xing", url: "https://bing.by.ccwu.cc" }
];
var DEFAULT_SOCIALS = [
  { id: 1, name: "GitHub", handle: "@yutian81", url: "https://github.com/yutian81", icon: "fa-brands fa-github" },
  { id: 2, name: "Telegram", handle: "@yutian88881", url: "https://t.me/yutian88881", icon: "fa-brands fa-telegram" },
  { id: 3, name: "Bilibili", handle: "@\u96E8\u5929-\u72C2\u5954", url: "https://space.bilibili.com/677845115", icon: "fa-brands fa-bilibili" },
  { id: 4, name: "Email", handle: "@yutian81", url: "mailto:admin@24811213.xyz", icon: "fa-solid fa-envelope" }
];
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const derived = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 1e5, hash: "SHA-256" }, keyMaterial, 256);
  const saltHex = Array.from(salt).map((b) => b.toString(16).padStart(2, "0")).join("");
  const hash = Array.from(new Uint8Array(derived)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return saltHex + ":" + hash;
}
__name(hashPassword, "hashPassword");
async function verifyPassword(password, stored) {
  const [saltHex, hashHex] = stored.split(":");
  const salt = new Uint8Array(saltHex.match(/.{2}/g).map((b) => parseInt(b, 16)));
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const derived = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 1e5, hash: "SHA-256" }, keyMaterial, 256);
  const hash = Array.from(new Uint8Array(derived)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return hash === hashHex;
}
__name(verifyPassword, "verifyPassword");
function crudAPI(table, columns) {
  const cols = columns.join(",");
  const placeholders = columns.map(() => "?").join(",");
  const setClause = columns.map((c) => `${c}=?`).join(",");
  return {
    async getAll(db) {
      const r = await db.prepare(`SELECT id,${cols} FROM ${table} ORDER BY sort_order ASC, id ASC`).all();
      return r.results;
    },
    async add(db, data) {
      const m = await db.prepare(`SELECT COALESCE(MAX(sort_order), -1) + 1 as n FROM ${table}`).first();
      const vals = columns.map((c) => data[c] ?? null);
      await db.prepare(`INSERT INTO ${table} (${cols},sort_order) VALUES (${placeholders},?)`).bind(...vals, m.n).run();
    },
    async update(db, id, data) {
      const vals = columns.map((c) => data[c] ?? null);
      await db.prepare(`UPDATE ${table} SET ${setClause} WHERE id=?`).bind(...vals, id).run();
    },
    async remove(db, id) {
      await db.prepare(`DELETE FROM ${table} WHERE id=?`).bind(id).run();
    }
  };
}
__name(crudAPI, "crudAPI");
var SECTIONS = {
  stats: crudAPI("stats", ["label", "value", "icon"]),
  nav: crudAPI("nav_items", ["label", "icon", "section_id"]),
  blog: crudAPI("blog_posts", ["title", "excerpt", "date", "tags", "url"]),
  projects: crudAPI("projects", ["name", "description", "tags", "stars", "language", "language_color", "url", "icon"]),
  resources: crudAPI("resources", ["title", "description", "category", "icon", "url"]),
  socials: crudAPI("socials", ["name", "handle", "url", "icon"])
};
var TABLES_SQL = [
  `CREATE TABLE IF NOT EXISTS admin_users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT NOT NULL UNIQUE, user_id INTEGER NOT NULL, expires_at TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT DEFAULT '', brand TEXT DEFAULT '', avatar TEXT DEFAULT '', title TEXT DEFAULT '', tagline TEXT DEFAULT '', bio TEXT DEFAULT '', email TEXT DEFAULT '', status TEXT DEFAULT 'available')`,
  `CREATE TABLE IF NOT EXISTS stats (id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT DEFAULT '', value TEXT DEFAULT '', icon TEXT DEFAULT '', sort_order INTEGER DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS blog_posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT DEFAULT '', excerpt TEXT DEFAULT '', date TEXT DEFAULT '', tags TEXT DEFAULT '', url TEXT DEFAULT '', sort_order INTEGER DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT DEFAULT '', description TEXT DEFAULT '', tags TEXT DEFAULT '', stars INTEGER DEFAULT 0, language TEXT DEFAULT '', language_color TEXT DEFAULT '', url TEXT DEFAULT '', icon TEXT DEFAULT 'fa-brands fa-github', sort_order INTEGER DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS resources (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT DEFAULT '', description TEXT DEFAULT '', category TEXT DEFAULT '', icon TEXT DEFAULT '', url TEXT DEFAULT '', sort_order INTEGER DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS socials (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT DEFAULT '', handle TEXT DEFAULT '', url TEXT DEFAULT '', icon TEXT DEFAULT '', sort_order INTEGER DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS nav_items (id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT DEFAULT '', icon TEXT DEFAULT '', section_id TEXT DEFAULT '', sort_order INTEGER DEFAULT 0)`,
  `CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token)`,
  `CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at)`,
  `CREATE TABLE IF NOT EXISTS gh_stars_cache (repo TEXT PRIMARY KEY, stars INTEGER NOT NULL, updated_at TEXT NOT NULL)`
];
async function ensureTables(env) {
  if (_initialized) return;
  for (const sql of TABLES_SQL) {
    await env.DB.prepare(sql).run();
  }
  await env.DB.prepare("DELETE FROM sessions WHERE expires_at < datetime('now')").run();
  _initialized = true;
}
__name(ensureTables, "ensureTables");
async function seedIfEmpty(env) {
  const { count } = await env.DB.prepare("SELECT COUNT(*) as count FROM profile").first();
  if (count > 0) return;
  const stmts = [
    env.DB.prepare("INSERT INTO profile (name,brand,avatar,title,tagline,bio,email,status) VALUES (?,?,?,?,?,?,?,?)").bind(DEFAULT_PROFILE.name, DEFAULT_PROFILE.brand, DEFAULT_PROFILE.avatar, DEFAULT_PROFILE.title, DEFAULT_PROFILE.tagline, DEFAULT_PROFILE.bio, DEFAULT_PROFILE.email, DEFAULT_PROFILE.status)
  ];
  DEFAULT_STATS.forEach((s, i) => stmts.push(env.DB.prepare("INSERT INTO stats (label,value,icon,sort_order) VALUES (?,?,?,?)").bind(s.label, s.value, s.icon, i)));
  DEFAULT_NAV.forEach((n, i) => stmts.push(env.DB.prepare("INSERT INTO nav_items (label,icon,section_id,sort_order) VALUES (?,?,?,?)").bind(n.label, n.icon, n.section_id, i)));
  DEFAULT_BLOG.forEach((b, i) => stmts.push(env.DB.prepare("INSERT INTO blog_posts (title,excerpt,date,tags,url,sort_order) VALUES (?,?,?,?,?,?)").bind(b.title, b.excerpt, b.date, b.tags, b.url, i)));
  DEFAULT_PROJECTS.forEach((p, i) => stmts.push(env.DB.prepare("INSERT INTO projects (name,description,tags,stars,language,language_color,url,icon,sort_order) VALUES (?,?,?,?,?,?,?,?,?)").bind(p.name, p.description, p.tags, p.stars, p.language, p.language_color, p.url, p.icon, i)));
  DEFAULT_RESOURCES.forEach((r, i) => stmts.push(env.DB.prepare("INSERT INTO resources (title,description,category,icon,url,sort_order) VALUES (?,?,?,?,?,?)").bind(r.title, r.description, r.category, r.icon, r.url, i)));
  DEFAULT_SOCIALS.forEach((s, i) => stmts.push(env.DB.prepare("INSERT INTO socials (name,handle,url,icon,sort_order) VALUES (?,?,?,?,?)").bind(s.name, s.handle, s.url, s.icon, i)));
  await env.DB.batch(stmts);
}
__name(seedIfEmpty, "seedIfEmpty");
async function hasAdmin(env) {
  const row = await env.DB.prepare("SELECT COUNT(*) as count FROM admin_users").first();
  return row.count > 0;
}
__name(hasAdmin, "hasAdmin");
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
__name(json, "json");
async function handleRequest(request, env) {
  const url = new URL(request.url);
  const { pathname } = url;
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS" } });
  }
  await ensureTables(env);
  await seedIfEmpty(env);
  if (pathname === "/api/public/config" && request.method === "GET") return getPublicConfig(env);
  if (pathname === "/api/auth/login" && request.method === "POST") return login(request, env);
  if (pathname === "/api/auth/logout" && request.method === "POST") return logout(request, env);
  if (pathname === "/api/admin/status" && request.method === "GET") {
    return json({ setupNeeded: !await hasAdmin(env) });
  }
  if (pathname === "/api/admin/setup" && request.method === "POST") {
    const exists = await hasAdmin(env);
    if (exists) return json({ error: "\u7BA1\u7406\u5458\u5DF2\u5B58\u5728" }, 400);
    const { username, password } = await request.json();
    if (!username || !password) return json({ error: "\u7528\u6237\u540D\u548C\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A" }, 400);
    if (password.length < 6) return json({ error: "\u5BC6\u7801\u81F3\u5C11 6 \u4F4D" }, 400);
    const hash = await hashPassword(password);
    try {
      await env.DB.prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)").bind(username, hash).run();
    } catch (e) {
      if (e.message.includes("UNIQUE")) return json({ error: "\u7528\u6237\u540D\u5DF2\u5B58\u5728" }, 409);
      throw e;
    }
    await seedIfEmpty(env);
    const token = generateToken();
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString();
    const user = await env.DB.prepare("SELECT id FROM admin_users WHERE username = ?").bind(username).first();
    await env.DB.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)").bind(token, user.id, expires).run();
    return json({ token, username, expires });
  }
  if (pathname === "/api/admin/change-password" && request.method === "POST") {
    const authUser = await getAuthUser(request, env);
    if (!authUser) return json({ error: "\u672A\u767B\u5F55" }, 401);
    const { oldPassword, newPassword } = await request.json();
    if (!oldPassword || !newPassword) return json({ error: "\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A" }, 400);
    if (newPassword.length < 6) return json({ error: "\u65B0\u5BC6\u7801\u81F3\u5C11 6 \u4F4D" }, 400);
    const user = await env.DB.prepare("SELECT password_hash FROM admin_users WHERE id = ?").bind(authUser.userId).first();
    if (!await verifyPassword(oldPassword, user.password_hash)) return json({ error: "\u65E7\u5BC6\u7801\u9519\u8BEF" }, 401);
    const newHash = await hashPassword(newPassword);
    await env.DB.prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?").bind(newHash, user.id).run();
    return json({ ok: true });
  }
  if (pathname === "/api/github-stars" && request.method === "GET") {
    const repos = url.searchParams.get("repos") || "";
    const list = repos.split(",").filter(Boolean);
    const results = {};
    const now = Date.now();
    const ttl = 60 * 60 * 1e3;
    for (const repo of list.slice(0, 20)) {
      const cached = await env.DB.prepare("SELECT stars, updated_at FROM gh_stars_cache WHERE repo = ?").bind(repo).first();
      if (cached && now - new Date(cached.updated_at).getTime() < ttl) {
        results[repo] = cached.stars;
        continue;
      }
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: { "User-Agent": "qinghome/1.0", "Accept": "application/vnd.github.v3+json" }
        });
        if (res.ok) {
          const data = await res.json();
          const stars = data.stargazers_count;
          results[repo] = stars;
          await env.DB.prepare("INSERT OR REPLACE INTO gh_stars_cache (repo, stars, updated_at) VALUES (?, ?, datetime('now'))").bind(repo, stars).run();
        }
      } catch {
      }
    }
    return json(results);
  }
  if (pathname.startsWith("/api/admin/")) {
    const authUser = await getAuthUser(request, env);
    if (!authUser) return json({ error: "\u672A\u767B\u5F55" }, 401);
    const sectionPath = pathname.replace("/api/admin/", "");
    if (sectionPath === "config" && request.method === "GET") return getPublicConfig(env);
    if (sectionPath === "config/profile" && request.method === "PUT") {
      const data = await parseJSON(request);
      const { count } = await env.DB.prepare("SELECT COUNT(*) as count FROM profile").first();
      if (count > 0) {
        await env.DB.prepare("UPDATE profile SET name=?,brand=?,avatar=?,title=?,tagline=?,bio=?,email=?,status=? WHERE id=(SELECT id FROM profile LIMIT 1)").bind(data.name, data.brand, data.avatar, data.title, data.tagline, data.bio, data.email, data.status).run();
      } else {
        await env.DB.prepare("INSERT INTO profile (name,brand,avatar,title,tagline,bio,email,status) VALUES (?,?,?,?,?,?,?,?)").bind(data.name, data.brand, data.avatar, data.title, data.tagline, data.bio, data.email, data.status).run();
      }
      return json({ ok: true });
    }
    const sectionMatch = sectionPath.match(/^config\/(stats|nav|blog|projects|resources|socials)(?:\/(\d+))?$/);
    if (sectionMatch) {
      const section = sectionMatch[1];
      const id = sectionMatch[2] ? parseInt(sectionMatch[2]) : null;
      const api = SECTIONS[section];
      if (request.method === "GET" && !id) {
        const items = await api.getAll(env.DB);
        return json(items);
      }
      if (request.method === "POST" && !id) {
        const d = await parseJSON(request);
        await api.add(env.DB, d);
        return json({ ok: true });
      }
      if (request.method === "PUT" && id) {
        const d = await parseJSON(request);
        await api.update(env.DB, id, d);
        return json({ ok: true });
      }
      if (request.method === "DELETE" && id) {
        await api.remove(env.DB, id);
        return json({ ok: true });
      }
    }
    return json({ error: "\u672A\u77E5\u8DEF\u7531" }, 404);
  }
  return void 0;
}
__name(handleRequest, "handleRequest");
async function parseJSON(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
__name(parseJSON, "parseJSON");
function generateToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(generateToken, "generateToken");
async function getAuthUser(request, env) {
  const auth = request.headers.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  const row = await env.DB.prepare(
    "SELECT s.user_id, u.username FROM sessions s JOIN admin_users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > datetime('now')"
  ).bind(token).first();
  if (!row) return null;
  return { userId: row.user_id, username: row.username };
}
__name(getAuthUser, "getAuthUser");
async function login(request, env) {
  const { username, password } = await parseJSON(request);
  if (!username || !password) return json({ error: "\u7528\u6237\u540D\u548C\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A" }, 400);
  const user = await env.DB.prepare("SELECT id, password_hash FROM admin_users WHERE username = ?").bind(username).first();
  if (!user) return json({ error: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF" }, 401);
  if (!await verifyPassword(password, user.password_hash)) return json({ error: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF" }, 401);
  const token = generateToken();
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString();
  await env.DB.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)").bind(token, user.id, expires).run();
  return json({ token, username, expires });
}
__name(login, "login");
async function logout(request, env) {
  const auth = request.headers.get("Authorization");
  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice(7);
    const row = await env.DB.prepare("SELECT id FROM sessions WHERE token = ?").bind(token).first();
    if (row) {
      await env.DB.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
    }
  }
  return json({ ok: true });
}
__name(logout, "logout");
async function getPublicConfig(env) {
  const db = env.DB;
  const [profile, stats, navItems, blogPosts, projects, resources, socials] = await Promise.all([
    db.prepare("SELECT * FROM profile LIMIT 1").first(),
    db.prepare("SELECT * FROM stats ORDER BY sort_order ASC, id ASC").all().then((r) => r.results),
    db.prepare("SELECT * FROM nav_items ORDER BY sort_order ASC, id ASC").all().then((r) => r.results),
    db.prepare("SELECT * FROM blog_posts ORDER BY sort_order ASC, id ASC").all().then((r) => r.results),
    db.prepare("SELECT * FROM projects ORDER BY sort_order ASC, id ASC").all().then((r) => r.results),
    db.prepare("SELECT * FROM resources ORDER BY sort_order ASC, id ASC").all().then((r) => r.results),
    db.prepare("SELECT * FROM socials ORDER BY sort_order ASC, id ASC").all().then((r) => r.results)
  ]);
  return json({
    profile: profile || DEFAULT_PROFILE,
    stats: stats.length ? stats : DEFAULT_STATS,
    navItems: navItems.length ? navItems : DEFAULT_NAV,
    blogPosts: blogPosts.length ? blogPosts : DEFAULT_BLOG,
    projects: projects.length ? projects : DEFAULT_PROJECTS,
    resources: resources.length ? resources : DEFAULT_RESOURCES,
    socials: socials.length ? socials : DEFAULT_SOCIALS
  });
}
__name(getPublicConfig, "getPublicConfig");
var worker_default = {
  async fetch(request, env) {
    try {
      const response = await handleRequest(request, env);
      if (response) return response;
      return env.ASSETS && env.ASSETS.fetch(request);
    } catch (err) {
      console.error("QingHome Error:", err.message);
      return json({ error: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF" }, 500);
    }
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-zGnVwa/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-zGnVwa/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
