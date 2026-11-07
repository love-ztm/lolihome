# LuoliHome

> 动态个人主页 — 基于 React + Vite + Cloudflare Workers (D1 + Static Assets)
> 所有配置由 D1 数据库驱动，提供可视化管理后台

## About

**LuoliHome**（原名 QingHome）是洛璃的个人主页项目。水墨国风 × 现代卡片式设计，暗色武侠大图背景、飘雪氛围、头像旋转光环，配合毛玻璃质感的简洁导航。

首页内容**全自动**：博客文章从 RSS/Atom 源自动拉取，精选项目从 GitHub 仓库自动拉取——发文章、传代码，主页自动同步，无需手工维护。

- 线上演示：https://ztmss.com
- 仓库地址：https://github.com/love-ztm/lolihome

---

## ✨ 特性

- 🎨 **水墨国风卡片设计**：渐变 Hero、旋转光环头像、毛玻璃文字遮罩、悬浮卡片、滚动渐入动画
- 🌗 **明暗双主题**：一键切换，localStorage 持久化，亮暗各自匹配遮罩与背景
- 📡 **博客文章自动拉取**：后台配置 RSS/Atom 地址（支持 2~3 个源合并），Worker 解析 + D1 缓存 1 小时，按时间倒序展示
- 🐙 **GitHub 项目自动拉取**：后台填用户名即可，自动按 Star 排序、过滤 Fork、匹配语言颜色（内置 27 种语言配色）
- 🖼 **背景图后台可配**：亮色/暗色背景图分别设置，走数据库驱动
- 🧭 **导航外链支持**：导航项可填外链地址（新窗口 + 外链图标），或滚动到页面区块
- 🔗 **Favicon 跟随头像**：后台改头像，浏览器标签图标自动同步
- ⚡ **轻量产物**：JS ≈195 KB（gzip ≈62 KB），CSS ≈21 KB（gzip ≈5 KB）
- 📱 **完全响应式**：桌面 3 列 → 平板 2 列 → 手机 1 列，含汉堡菜单
- 🚀 **边缘部署**：Cloudflare Workers + Static Assets，全球 300+ 节点 CDN
- 🗄️ **D1 数据库驱动**：所有配置存储在 D1 中，支持老表自动迁移（ALTER TABLE 兜底）
- 🔐 **管理后台**：`/admin` 路径进入，九个面板可视化编辑，Bearer Token 会话（7 天有效期）

---

## 🛠 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 初始化本地 D1 数据库（仅首次需要）
npm run db:local

# 3. 启动本地开发服务器（Worker + 本地 D1 + 前端，端口 8787）
npm run dev:local
# → http://localhost:8787

# 4. 仅前端开发（热更新，端口 5173）
npm run dev
# → http://localhost:5173
```

---

## 🚀 部署到 Cloudflare Workers

### 前置条件

你需要一个 [Cloudflare 账户](https://dash.cloudflare.com/)。

> ⚠️ 无需手动设置任何环境变量，首次访问 `/admin/login` 时会自动引导创建管理员账号。

### 手动部署（CLI）

```bash
# Step 1 — 登录 Cloudflare（会弹出浏览器授权）
npx wrangler login

# Step 2 — 创建 D1 数据库
npx wrangler d1 create qinghome-db

# Step 3 — 应用数据库结构
npx wrangler d1 execute qinghome-db --remote --file=schema.sql

# Step 4 — 构建 + 部署
npm run deploy
```

首次部署成功后，终端会输出访问地址：

```
✨ Successfully deployed
https://qinghome.<你的子域>.workers.dev
```

> 💡 `wrangler.toml` 中的 `account_id` 建议改成你自己的，可避免多账号登录时部署到错误账号。

### 手动部署（Cloudflare Dashboard）

- Fork 本仓库
- 登录 [Cloudflare](https://dash.cloudflare.com/) 后台
- `Workers 和 Pages` → `创建应用程序` → `连接 Git`，选择 fork 的仓库
- **构建命令**：`npm run build`
- **部署命令**：`npm run deploy`
- 部署完成后绑定 D1 数据库（绑定名 `DB`）

---

## 🎮 使用指南

### 创建管理员

1. 打开站点，点击右上角 **「登录后台」**
2. 首次访问自动显示 **「创建管理员」** 注册表单
3. 创建成功后自动登录，进入管理仪表盘

### 后台面板一览（/admin）

| 面板 | 可编辑内容 |
|------|-----------|
| 📋 个人资料 | 名称、品牌、头像 URL、标题、副标题、简介、邮箱、状态、**亮/暗背景图** |
| 📊 统计胶囊 | Hero 区域的统计胶囊（可增删改） |
| 🧭 站点导航 | 顶部导航菜单项，**支持外链地址**（留空则滚动到区块） |
| 📝 博客文章 | 手动文章列表（配置博客源后自动列表优先生效） |
| 📡 博客源 | **RSS/Atom 地址**，支持多个源自动合并、按时间排序、1 小时缓存 |
| 💻 项目仓库 | 手动项目卡片（配置 GitHub 源后自动列表优先生效） |
| 🐙 GitHub 项目源 | **GitHub 用户名**，自动拉取仓库、按 Star 排序、过滤 Fork |
| 🔗 公益站点 | 分类资源链接（可增删改） |
| 🌐 联系方式 | 社交媒体链接（可增删改） |
| 🔑 修改密码 | 管理员密码修改 |

### 博客自动拉取配置

- Hexo：安装 `hexo-generator-feed` 插件生成 `/atom.xml`
- WordPress：默认自带 `/feed`
- 后台「博客源」→ 新增 → 填名称和 RSS 地址即可

### GitHub 项目自动拉取配置

- 后台「GitHub 项目源」→ 新增 → 填 GitHub 用户名即可
- 自动显示前 6 个仓库（按 Star 倒序、过滤 Fork、语言颜色自动匹配）

---

## 📝 定制配色

打开 `src/styles/global.css`，修改顶部两个变量块：

```css
/* 亮色主题 */
:root, [data-theme='light'] {
  --brand: #7c6ed8;     /* 主品牌色（紫蓝） */
  --brand-2: #9d7fe0;   /* 渐变副色 */
}

/* 暗色主题 */
[data-theme='dark'] {
  --brand: #8b7ff0;
  --brand-2: #b098eb;
}
```

---

## 📄 License

MIT

---

## 🙏 致谢

- 基于 [QingHome](https://github.com/yutian81/QingHome) 二次开发
- hermes + deepseek v4 协助编写
