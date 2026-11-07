import { useEffect, useState } from 'react';
import { useSite } from '../context/SiteContext.jsx';
import Section from './Section.jsx';
import { FaIcon, IconStarFill, IconExternal } from './Icons.jsx';
import { fetchGitHubRepos } from '../api.js';

function fmtStars(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

export default function Projects() {
  const { config } = useSite();
  const manualProjects = config?.projects || [];
  const [autoRepos, setAutoRepos] = useState(null);

  // 自动拉取：有 GitHub 源时覆盖手填数据
  useEffect(() => {
    fetchGitHubRepos().then(d => {
      if (d && d.repos && d.repos.length) setAutoRepos(d.repos);
    }).catch(() => {});
  }, []);

  const projectsList = (autoRepos || manualProjects).slice(0, 6);

  return (
    <div className="main-content">
      <Section
        id="projects"
        eyebrow="Open Source"
        title="精选项目"
        subtitle=""
        icon="fa-solid fa-code"
        action={
          <a className="section__link" href={autoRepos?.[0]?.url ? `https://github.com/${(new URL(autoRepos[0].url)).pathname.split('/')[1]}` : 'https://github.com/love-ztm'} target="_blank" rel="noreferrer">
            查看全部项目 <IconExternal size={14} />
          </a>
        }
      >
        <div className="cards cards--projects">
          {projectsList.map((p, i) => (
            <a key={p.url || p.name} className="card" href={p.url} target="_blank" rel="noreferrer">
              <div className="card__top">
                <div className="card__repo-icon">
                  <FaIcon icon={p.icon || 'fa-brands fa-github'} size={22} />
                </div>
                <span className="card__stars">
                  <IconStarFill size={13} /> {fmtStars(p.stars || 0)}
                </span>
              </div>
              <h3 className="card__name">{p.name}</h3>
              <p className="card__desc">{p.description}</p>
              <div className="card__foot">
                {p.language && (
                  <span className="lang">
                    {p.language_color && <span className="lang__dot" style={{ background: p.language_color }} />}
                    {p.language}
                  </span>
                )}
                {p.tags && (
                  <div className="card__tags">
                    {p.tags.split(',').filter(Boolean).slice(0, 2).map((t, j) => (
                      <span className="tag" key={j}>{t.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
