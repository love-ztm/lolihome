import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { FaIcon, IconSun, IconMoon, IconMenu, IconClose, IconExternal } from './Icons.jsx';

export default function Header() {
  const { config } = useSite();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const nav = config?.navItems || [];
  const brand = config?.profile?.brand || 'Luoli';
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('qinghome2_theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('qinghome2_theme', next);
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // 过滤掉"首页"导航项
  const visibleNav = nav.filter(item => item.section_id !== 'home');

  return (
    <header className="header">
      <div className="header__inner">
        {/* Logo */}
        <a href="/" className="header__brand" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="header__logo">{brand.charAt(0)}</span>
          <span className="header__name">{brand}</span>
        </a>

        {/* 导航菜单 */}
        <nav className={`header__nav ${menuOpen ? 'is-open' : ''}`}>
          {visibleNav.map(item => {
            // 有 url 则渲染为外链，否则按 section_id 滚动
            if (item.url) {
              return (
                <a
                  key={item.id || item.label}
                  className="header__link"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon && <FaIcon icon={item.icon} size={13} />}
                  <span>{item.label}</span>
                  <IconExternal size={11} />
                </a>
              );
            }
            return (
              <button
                key={item.section_id || item.id}
                className="header__link"
                onClick={() => scrollTo(item.section_id)}
              >
                {item.icon && <FaIcon icon={item.icon} size={13} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* 右侧操作区 */}
        <div className="header__actions">
          {user ? (
            <>
              <Link to="/admin" className="icon-btn" title="管理后台">
                <FaIcon icon="fa-solid fa-gear" size={16} />
              </Link>
              <button className="icon-btn" onClick={handleLogout} title="注销">
                <FaIcon icon="fa-solid fa-right-from-bracket" size={16} />
              </button>
            </>
          ) : (
            <Link to="/admin/login" className="icon-btn" title="登录后台">
              <FaIcon icon="fa-solid fa-lock" size={16} />
            </Link>
          )}

          {/* 主题切换 */}
          <button className="icon-btn" onClick={toggleTheme} title="切换主题">
            {theme === 'light' ? <IconMoon size={16} /> : <IconSun size={16} />}
          </button>

          {/* Follow 按钮 */}
          <a
            href={config?.socials?.[0]?.url || '#'}
            target="_blank"
            rel="noreferrer"
            className="btn-follow"
          >
            <FaIcon icon="fa-solid fa-heart" size={12} />
            Follow
          </a>

          {/* 汉堡菜单 */}
          <button
            className="header__menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="菜单"
          >
            {menuOpen ? <IconClose size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}