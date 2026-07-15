import { useSite } from '../context/SiteContext.jsx';
import Section from './Section.jsx';
import { FaIcon, IconArrow } from './Icons.jsx';

export default function Social() {
  const { config } = useSite();
  const email = config?.profile?.email;
  const brand = config?.profile?.brand || 'Luoli';

  return (
    <div className="main-content">
      {/* CTA Banner */}
      <div className="cta-banner">
        <div className="cta-banner__text">
          <h3>让我们一起创造美好的数字体验</h3>
          <p>期待与你在代码的世界里相遇，共同探索无限可能</p>
        </div>
        <div className="cta-banner__actions">
          {email && (
            <a className="btn btn--primary" href={`mailto:${email}`}>
              <FaIcon icon="fa-solid fa-envelope" size="1em" /> 联系我
            </a>
          )}
          <a className="btn btn--ghost" href="#projects">
            查看项目 <IconArrow size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
