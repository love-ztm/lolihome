import { useEffect, useState } from 'react';
import { useSite } from '../context/SiteContext.jsx';
import Section from './Section.jsx';
import { IconArrow, IconExternal } from './Icons.jsx';
import { fetchBlogPosts } from '../api.js';

export default function Blog() {
  const { config } = useSite();
  const manualPosts = config?.blogPosts || [];
  const [autoPosts, setAutoPosts] = useState(null);

  // 自动拉取：有博客源时覆盖手填数据
  useEffect(() => {
    fetchBlogPosts().then(d => {
      if (d && d.posts && d.posts.length) setAutoPosts(d.posts);
    }).catch(() => {});
  }, []);

  const posts = autoPosts || manualPosts;

  return (
    <div className="main-content">
      <Section
        id="blog"
        eyebrow="Blog"
        title="最新博文"
        subtitle=""
        icon="fa-solid fa-pen-nib"
        action={
          <a className="section__link" href="https://blog.ztmss.com" target="_blank" rel="noreferrer">
            查看所有博文 <IconExternal size={14} />
          </a>
        }
      >
        <div className="cards cards--blog">
          {posts.slice(0, 6).map((post, i) => (
            <a className="blog__item" href={post.url} key={post.url || i} target="_blank" rel="noreferrer">
              <div className="blog__meta">
                <span className="blog__date">{post.date}</span>
                {post.tags && post.tags.split(',').filter(Boolean).map((tag, j) => (
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
