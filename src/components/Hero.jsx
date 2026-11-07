import { useSite } from '../context/SiteContext.jsx';
import { FaIcon, IconArrow, IconMail } from './Icons.jsx';
import Snowfall from './Snowfall.jsx';

export default function Hero() {
  const { config } = useSite();
  const p = config?.profile || {};
  const statsList = config?.stats || [];
  const initials = (p.name || 'L').slice(0, 2).toUpperCase();

  // 动态背景图
  const bgLight = p.bg_light || 'https://cdn.jsdelivr.net/gh/yutian81/cdn/ink-mountain-light.png';
  const bgDark = p.bg_dark || 'https://cdn.jsdelivr.net/gh/yutian81/cdn/ink-mountain-dark.png';

  return (
    <section className="hero" id="home">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__grid" />
      </div>

      {/* 背景图：亮色/暗色各一张 */}
      <div className="hero__bg-img hero__bg-img--light" style={{ backgroundImage: `url("${bgLight}")` }} />
      <div className="hero__bg-img hero__bg-img--dark" style={{ backgroundImage: `url("${bgDark}")` }} />

      {/* 文字区渐变遮罩，提升可读性 */}
      <div className="hero__shade" aria-hidden="true" />

      {/* 飘雪效果 */}
      <Snowfall />

      <div className="hero__inner">
        {/* 左侧文字 */}
        <div className="hero__text">
          <p className="hero__hello">
            <span className="wave">👋</span> Hello, I'm
          </p>
          <h1 className="hero__name">{p.name || 'Luoli'}</h1>
          <p className="hero__title">{p.title || ''}</p>
          <p className="hero__tagline">{p.tagline || ''}</p>
          <p className="hero__bio">
            {(p.bio || '').replace(/\\n|<br\s*\/?>/gi, '<br>').split('<br>').map((line, i) => (
              <span key={i}>{i > 0 && <br />}{line}</span>
            ))}
          </p>

          <div className="hero__cta">
            <button
              className="btn btn--primary"
              onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              风雅录 <IconArrow size={16} />
            </button>
            <button
              className="btn btn--primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Github <IconArrow size={16} />
            </button>
            {p.email && (
              <a className="btn btn--ghost" href={`mailto:${p.email}`}>
                <IconMail size={16} /> 书信往来
              </a>
            )}
          </div>

          {statsList.length > 0 && (
            <div className="hero__stats">
              {statsList.map((s, i) => (
                <div className="stat-pill" key={i}>
                  <FaIcon icon={s.icon} size={16} />
                  <span className="stat-pill__value">{s.value}</span>
                  <span className="stat-pill__label">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 右侧头像 */}
        <div className="hero__avatar-wrap">
          <div className="hero__avatar">
            {p.avatar ? (
              <img src={p.avatar} alt={p.name} />
            ) : (
              <div className="hero__avatar-placeholder">{initials}</div>
            )}
            <span className={`hero__status hero__status--${p.status || 'offline'}`} />
          </div>
        </div>
      </div>
    </section>
  );
}