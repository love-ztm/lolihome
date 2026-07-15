import { useSite } from '../context/SiteContext.jsx';
import Section from './Section.jsx';
import { IconArrow, IconExternal } from './Icons.jsx';

export default function Blog() {
  const { config } = useSite();
  const posts = config?.blogPosts || [];

  return (
    <div className="main-content">
      <Section
        id="blog"
        eyebrow="Blog"
        title="最新博文"
        subtitle=""
        icon="fa-solid fa-pen-nib"
        action={
          <a className="section__link" href="https://blog.us.ci" target="_blank" rel="noreferrer">
            查看所有博文 <IconExternal size={14} />
          </a>
        }
      >
        <div className="cards cards--blog">
          {posts.map((post, i) => (
            <a className="blog__item" href={post.url} key={post.url || i} target="_blank" rel="noreferrer">
              <div className="blog__meta">
                <span className="blog__date">{post.date}</span>
                {post.tags && post.tags.split(',').map((tag, j) => (
                  <span className="blog__tag" key={j}>{tag.trim()}</span>
                ))}
              </div>
              <h3 className="blog__title">{post.title}</h3>
              <p className="blog__excerpt">{post.excerpt}</p>
              <span className="blog__more">
                阅读更多 <IconArrow size={14} />
              </span>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
