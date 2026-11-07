import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useSite } from '../context/SiteContext.jsx';
import * as api from '../api.js';
import { FaIcon } from '../components/Icons.jsx';
import ListEditor from '../components/admin/ListEditor.jsx';
import ChangePassword from '../components/admin/ChangePassword.jsx';
import F from '../components/admin/FormField.jsx';
import '../styles/admin.css';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const { refresh } = useSite();
  const [tab, setTab] = useState('profile');
  const [msg, setMsg] = useState(null);

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState([]);
  const [nav, setNav] = useState([]);
  const [blog, setBlog] = useState([]);
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [socials, setSocials] = useState([]);
  const [blogSources, setBlogSources] = useState([]);
  const [githubSources, setGithubSources] = useState([]);

  const show = (text, type = 'success') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 3000); };

  const loadAll = useCallback(async () => {
    const c = await api.getAdminConfig();
    setProfile(c.profile);
    setStats(c.stats);
    setNav(c.navItems);
    setBlog(c.blogPosts);
    setProjects(c.projects);
    setResources(c.resources);
    setSocials(c.socials);
    setBlogSources(c.blogSources || []);
    setGithubSources(c.githubSources || []);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const saveProfile = async () => {
    await api.updateProfile(profile);
    show('资料已保存');
    refresh();
  };

  const refreshSection = async () => { await loadAll(); refresh(); };

  const TABS = [
    { id: 'profile', label: '个人资料', icon: 'fa-solid fa-user' },
    { id: 'stats', label: '统计胶囊', icon: 'fa-solid fa-chart-simple' },
    { id: 'nav', label: '站点导航', icon: 'fa-solid fa-bars' },
    { id: 'blog', label: '博客文章', icon: 'fa-solid fa-feather' },
    { id: 'blogSources', label: '博客源', icon: 'fa-solid fa-rss' },
    { id: 'projects', label: '项目仓库', icon: 'fa-solid fa-code' },
    { id: 'githubSources', label: 'GitHub 项目源', icon: 'fa-brands fa-github' },
    { id: 'resources', label: '公益站点', icon: 'fa-solid fa-link' },
    { id: 'socials', label: '联系方式', icon: 'fa-solid fa-share-nodes' },
    { id: 'password', label: '修改密码', icon: 'fa-solid fa-key' },
  ];

  const STATUS_OPTIONS = [
    { value: 'available', label: 'available — 绿色状态点' },
    { value: 'busy', label: 'busy — 黄色状态点' },
    { value: 'offline', label: 'offline — 灰色状态点' },
  ];

  const fromList = (list) => ({
    onAdd: async (d) => { await list.add(d); await refreshSection(); show('已添加'); },
    onUpdate: async (id, d) => { await list.update(id, d); await refreshSection(); show('已更新'); },
    onDelete: async (id) => { await list.delete(id); await refreshSection(); show('已删除'); },
  });

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <h2><span className="admin-icon-gap"><FaIcon icon="fa-solid fa-gear" size={16} />管理后台</span></h2>
          <p className="admin-user"><FaIcon icon="fa-solid fa-user" size={12} /> {user?.username}</p>
        </div>
        <nav>
          {TABS.map(t => (
            <button key={t.id} className={`admin-nav-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              <span className="admin-icon-gap"><FaIcon icon={t.icon} size={14} /> {t.label}</span>
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-nav-btn"><span className="admin-icon-gap"><FaIcon icon="fa-solid fa-house" size={15} />查看首页</span></Link>
          <button className="admin-nav-btn" onClick={logout}><span className="admin-icon-gap"><FaIcon icon="fa-solid fa-right-from-bracket" size={15} />退出登录</span></button>
        </div>
      </aside>

      <main className="admin-main">
        {msg && <div className={`admin-msg ${msg.type}`}><span className="admin-icon-gap"><FaIcon icon={msg.type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-check-circle'} size={14} />{msg.text}</span></div>}

        {tab === 'profile' && profile && (
          <div className="admin-section">
            <div className="admin-section-header"><h3><span className="admin-hicon-gap"><FaIcon icon="fa-solid fa-user" size={15} />个人资料</span></h3></div>
            <div className="admin-form-grid">
              <F label="名称" value={profile.name} onChange={v => setProfile(p => ({ ...p, name: v }))} placeholder="例如：青云志主页" />
              <F label="品牌" value={profile.brand} onChange={v => setProfile(p => ({ ...p, brand: v }))} placeholder="例如：QingHome" />
              <F label="头像 URL" value={profile.avatar} onChange={v => setProfile(p => ({ ...p, avatar: v }))} placeholder="https://example.com/avatar.png" />
              <F label="标题" value={profile.title} onChange={v => setProfile(p => ({ ...p, title: v }))} placeholder="例如：一个又菜又爱玩的小白" />
              <F label="副标题" value={profile.tagline} onChange={v => setProfile(p => ({ ...p, tagline: v }))} placeholder="例如：用代码解决问题，用文字记录思考。" />
              <F label="邮箱" value={profile.email} onChange={v => setProfile(p => ({ ...p, email: v }))} type="email" placeholder="admin@example.com" />
              <F label="简介" value={profile.bio} onChange={v => setProfile(p => ({ ...p, bio: v }))} rows={3} placeholder="个人简介，支持多行文本" />
              <F label="亮色背景图 URL" value={profile.bg_light} onChange={v => setProfile(p => ({ ...p, bg_light: v }))} placeholder="https://example.com/bg-light.png" />
              <F label="暗色背景图 URL" value={profile.bg_dark} onChange={v => setProfile(p => ({ ...p, bg_dark: v }))} placeholder="https://example.com/bg-dark.png" />
              <div className="admin-field">
                <label htmlFor="status">状态</label>
                <select id="status" value={profile.status} onChange={e => setProfile(p => ({ ...p, status: e.target.value }))}>
                  {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
            <button className="admin-btn primary" onClick={saveProfile} style={{ marginTop: 16 }}>保存</button>
          </div>
        )}

        {tab === 'stats' && <ListEditor items={stats} title="统计胶囊" icon="fa-solid fa-chart-simple"
          columns={[{ key: 'label', label: '标签', placeholder: '开源贡献' }, { key: 'value', label: '数值', placeholder: '1.5k+' }, { key: 'icon', label: '图标 Class', placeholder: 'fa-solid fa-atom' }]}
          {...fromList(api.statsApi)} />}

        {tab === 'nav' && <ListEditor items={nav} title="站点导航" icon="fa-solid fa-bars"
          columns={[{ key: 'label', label: '标签', placeholder: '首页' }, { key: 'section_id', label: '区块 ID（留空则走外链）', placeholder: 'home' }, { key: 'url', label: '外链地址（留空则滚动到区块）', placeholder: 'https://…' }, { key: 'icon', label: '图标 Class', placeholder: 'fa-solid fa-house' }]}
          {...fromList(api.navApi)} />}

        {tab === 'blog' && <ListEditor items={blog} title="博客文章（手动）" icon="fa-solid fa-feather"
          columns={[{ key: 'title', label: '标题', placeholder: '文章标题' }, { key: 'date', label: '日期', type: 'date' },
            { key: 'url', label: '链接', placeholder: 'https://…' }, { key: 'tags', label: '标签', placeholder: 'Cloudflare,Domain' },
            { key: 'excerpt', label: '摘要', rows: 2, placeholder: '文章摘要内容…' }]}
          {...fromList(api.blogApi)} />}

        {tab === 'blogSources' && (
          <div>
            <div className="admin-section" style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: 'var(--admin-text-soft, #888)', lineHeight: 1.7 }}>
                配置博客 RSS/Atom 地址后，首页「最新博文」会自动拉取最新文章（1 小时缓存），不再使用下方手动列表。
                Hexo 博客需安装 <b>hexo-generator-feed</b> 插件生成 <code>/atom.xml</code>；WordPress 默认自带 <code>/feed</code>。
                支持配置 2~3 个博客源，自动合并按时间排序。
              </p>
            </div>
            <ListEditor items={blogSources} title="博客源（自动拉取）" icon="fa-solid fa-rss"
              columns={[{ key: 'name', label: '名称', placeholder: 'Luoli BLOG' },
                { key: 'url', label: 'RSS/Atom 地址', placeholder: 'https://blog.ztmss.com/atom.xml' }]}
              {...fromList(api.blogSourcesApi)} />
          </div>
        )}

        {tab === 'projects' && (
          <div>
            <div className="admin-section" style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: 'var(--admin-text-soft, #888)', lineHeight: 1.7 }}>
                💡 在「GitHub 项目源」面板配置用户名后，首页「精选项目」会自动拉取你的仓库（按 Star 排序，过滤 Fork，1 小时缓存），不再使用手动列表。
              </p>
            </div>
            <ListEditor items={projects} title="项目仓库（手动）" icon="fa-solid fa-code"
              columns={[{ key: 'name', label: '名称', placeholder: 'project-name' }, { key: 'tags', label: '标签', placeholder: 'Cloudflare,Vite' },
                { key: 'icon', label: '图标 Class', placeholder: 'fa-brands fa-github' }, { key: 'stars', label: 'Stars', type: 'number', placeholder: '99' },
                { key: 'language', label: '语言', placeholder: 'JavaScript' }, { key: 'language_color', label: '语言色', type: 'color-text', placeholder: '#3178c6' },
                { key: 'url', label: '链接', placeholder: 'https://github.com/…' }, { key: 'description', label: '摘要', rows: 2, placeholder: '项目描述…' }]}
              onAdd={async d => { await api.projectsApi.add({ ...d, stars: Number(d.stars) || 0 }); await refreshSection(); show('已添加'); }}
              onUpdate={async (id, d) => { await api.projectsApi.update(id, { ...d, stars: Number(d.stars) || 0 }); await refreshSection(); show('已更新'); }}
              onDelete={async id => { await api.projectsApi.delete(id); await refreshSection(); show('已删除'); }} />
          </div>
        )}

        {tab === 'githubSources' && (
          <div>
            <div className="admin-section" style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: 'var(--admin-text-soft, #888)', lineHeight: 1.7 }}>
                填写 GitHub 用户名（支持多个账号），自动拉取其公开仓库。按 Star 数排序显示前 6 个，Fork 项目自动过滤，语言颜色自动匹配。
              </p>
            </div>
            <ListEditor items={githubSources} title="GitHub 项目源（自动拉取）" icon="fa-brands fa-github"
              columns={[{ key: 'username', label: 'GitHub 用户名', placeholder: 'love-ztm' }]}
              {...fromList(api.githubSourcesApi)} />
          </div>
        )}

        {tab === 'resources' && <ListEditor items={resources} title="公益站点" icon="fa-solid fa-link"
          columns={[{ key: 'title', label: '标题', placeholder: '站点名称' }, { key: 'category', label: '分类', placeholder: 'nav / video / images' },
            { key: 'url', label: '链接', placeholder: 'https://…' }, { key: 'icon', label: '图标 Class', placeholder: 'fa-solid fa-compass' },
            { key: 'description', label: '描述', rows: 2, placeholder: '站点描述…' }]}
          {...fromList(api.resourcesApi)} />}

        {tab === 'socials' && <ListEditor items={socials} title="联系方式" icon="fa-solid fa-share-nodes"
          columns={[{ key: 'name', label: '名称', placeholder: 'GitHub' }, { key: 'handle', label: '账号', placeholder: '@username' },
            { key: 'url', label: '链接', placeholder: 'https://github.com/…' }, { key: 'icon', label: '图标 Class', placeholder: 'fa-brands fa-github' }]}
          {...fromList(api.socialsApi)} />}

        {tab === 'password' && <ChangePassword />}
      </main>
    </div>
  );
}

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) return <div className="admin-loading"><span className="admin-icon-gap"><FaIcon icon="fa-solid fa-spinner fa-spin" size={15} />加载中…</span></div>;
  if (!user) return null;

  return <AdminDashboard />;
}