import { useSite } from '../context/SiteContext.jsx';
import { useEffect } from 'react';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Blog from '../components/Blog.jsx';
import Projects from '../components/Projects.jsx';
import Resources from '../components/Resources.jsx';
import Social from '../components/Social.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  const { config, loading, error } = useSite();

  // 头像同步到 favicon
  useEffect(() => {
    const avatar = config?.profile?.avatar;
    if (!avatar) return;
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = avatar.toLowerCase().endsWith('.svg') ? 'image/svg+xml' : 'image/png';
    link.href = avatar;
  }, [config]);

  // 滚动渐入动画
  useEffect(() => {
    if (!config) return;
    const els = document.querySelectorAll('.card, .blog__item, .cta-banner, .section__head');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, [config]);

  if (error) {
    return (
      <div className="admin-loading">
        <span>加载失败，请刷新页面</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg)' }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Blog />
        <Projects />
        <Resources />
        <Social />
      </main>
      <Footer />
    </>
  );
}