import { useSite } from '../context/SiteContext.jsx';
import Section from './Section.jsx';
import { FaIcon, IconArrow, IconExternal } from './Icons.jsx';

export default function Resources() {
  const { config } = useSite();
  const resourcesList = config?.resources || [];

  return (
    <div className="main-content">
      <Section
        id="resources"
        eyebrow="Resources"
        title="优质资源"
        subtitle=""
        icon="fa-solid fa-gem"
        action={
          <a className="section__link" href="#resources" target="_blank" rel="noreferrer">
            查看更多资源 <IconExternal size={14} />
          </a>
        }
      >
        <div className="cards cards--resources">
          {resourcesList.map((r, i) => (
            <a className="card" href={r.url} key={r.url || i} target="_blank" rel="noreferrer">
              <div className="card__icon">
                <FaIcon icon={r.icon} size={20} />
              </div>
              <div className="card__row">
                <h3 className="card__title">{r.title}</h3>
                {r.category && <span className="card__cat">{r.category}</span>}
              </div>
              <p className="card__desc">{r.description}</p>
              <span className="card__go">
                查看 <IconArrow size={13} />
              </span>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
