import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUser,
  FiTag,
  FiShare2,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiLink,
  FiChevronRight,
  FiArrowRight,
  FiBookOpen,
} from 'react-icons/fi';
import { MdOutlineArticle, MdOutlineAutoStories } from 'react-icons/md';
import HeroBg from '../assets/imgs/hero-bg2.png';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { ROUTES } from '../routes';

const API_BASE = 'https://quantifyaiapi.mavenerp.in/public/api';
const ASSET_HOST = 'https://quantifyaiapi.mavenerp.in/public';

const resolveImage = (path = '') => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${ASSET_HOST}${path.startsWith('/') ? '' : '/'}${path}`;
};

// The build step inlines this post's API payload into the pre-rendered HTML so
// the first paint needs no network round-trip. Crawlers (and users on a cold
// API) get the full article immediately instead of a skeleton loader.
const readSeededBlog = (slug) => {
  if (typeof window === 'undefined') return null;
  const seed = window.__BLOG_DATA__;
  return seed && seed.slug === slug ? seed : null;
};

const stripHtml = (html = '') =>
  String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const estimateReadTime = (html = '') => {
  const words = stripHtml(html).split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

const formatDate = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
};

const parseTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return tags.split(',').map((t) => t.trim()).filter(Boolean);
    }
  }
  return [];
};

const buildToc = (html = '') => {
  if (typeof document === 'undefined') return [];
  const div = document.createElement('div');
  div.innerHTML = html;
  const headings = div.querySelectorAll('h2, h3');
  return Array.from(headings).map((h, i) => ({
    id: `section-${i}`,
    text: h.textContent || '',
    level: h.tagName === 'H2' ? 2 : 3,
  }));
};

const injectTocIds = (html = '') => {
  if (typeof document === 'undefined') return html;
  const div = document.createElement('div');
  div.innerHTML = html;
  const headings = div.querySelectorAll('h2, h3');
  headings.forEach((h, i) => {
    h.id = `section-${i}`;
  });
  return div.innerHTML;
};

const RelatedCard = ({ blog }) => (
  <Link
    to={`/blogs/${blog?.slug}`}
    className="group flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
  >
    <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/15 to-green-500/15">
      {blog?.featured_image ? (
        <img
          src={resolveImage(blog.featured_image)}
          alt={blog.title}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <MdOutlineArticle className="text-cyan-300/50 text-2xl" />
        </div>
      )}
    </div>
    <div className="min-w-0 flex-1">
      {blog?.category?.name && (
        <span className="text-cyan-300 text-[10px] font-semibold uppercase tracking-wider">
          {blog.category.name}
        </span>
      )}
      <h4 className="text-sm text-white font-semibold leading-snug line-clamp-2 group-hover:text-cyan-300 transition">
        {blog?.title}
      </h4>
      <span className="text-xs text-gray-500 mt-1 inline-flex items-center gap-1">
        <FiCalendar size={10} /> {formatDate(blog?.published_at || blog?.created_at)}
      </span>
    </div>
  </Link>
);

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(() => readSeededBlog(slug));
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(() => !readSeededBlog(slug));
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    const seed = readSeededBlog(slug);
    (async () => {
      try {
        setError('');
        if (seed) {
          // Render the pre-rendered post right away, then refresh in the
          // background. Never fall back to the skeleton when we already have it.
          setBlog(seed);
          setLoading(false);
        } else {
          setLoading(true);
          setBlog(null);
        }

        const res = await axios.get(`${API_BASE}/blogs/${slug}`);
        if (!mounted) return;
        const data = res?.data?.data ?? null;
        if (data) setBlog(data);
        else if (!seed) setBlog(null);

        const categorySlug = (data || seed)?.category?.slug;
        if (categorySlug) {
          try {
            const r = await axios.get(`${API_BASE}/blogs`, {
              params: { category: categorySlug, per_page: 4 },
            });
            if (!mounted) return;
            const items = r?.data?.data?.data ?? [];
            setRelated(
              (Array.isArray(items) ? items : []).filter((b) => b.slug !== slug).slice(0, 3)
            );
          } catch {
            setRelated([]);
          }
        }
      } catch {
        if (!mounted) return;
        // A failed refresh must not replace a post we already have on screen,
        // otherwise a slow/down API turns a good page into a soft 404.
        if (!seed) setError('Article not found.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const scrolled = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useDocumentMeta({
    title: blog?.meta_title || (blog?.title ? `${blog.title} | QuantifyAI` : undefined),
    description: blog?.meta_description || blog?.excerpt || undefined,
    image: blog?.og_image ? resolveImage(blog.og_image) : undefined,
  });

  const readMin = useMemo(() => estimateReadTime(blog?.content), [blog]);
  const tags = useMemo(() => parseTags(blog?.tags), [blog]);
  const toc = useMemo(() => (blog?.content ? buildToc(blog.content) : []), [blog]);
  const contentWithIds = useMemo(
    () => (blog?.content ? injectTocIds(blog.content) : ''),
    [blog]
  );

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      className="relative w-full min-h-screen pb-24"
      style={{
        background: `linear-gradient(135deg,
          rgba(10, 25, 47, 0.95) 0%,
          rgba(15, 32, 58, 0.92) 50%,
          rgba(20, 40, 70, 0.89) 100%),
          url(${HeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 z-[9998] h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-green-400 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* BREADCRUMBS */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
            <Link to="/" className="hover:text-cyan-300 transition">
              Home
            </Link>
            <FiChevronRight size={12} />
            <Link to="/blogs" className="hover:text-cyan-300 transition">
              Blogs
            </Link>
            {blog?.category?.name && (
              <>
                <FiChevronRight size={12} />
                <span className="text-cyan-300">{blog.category.name}</span>
              </>
            )}
          </nav>

          {loading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-4 w-32 bg-white/10 rounded" />
              <div className="h-10 w-3/4 bg-white/10 rounded" />
              <div className="h-4 w-1/2 bg-white/10 rounded" />
              <div className="aspect-[21/9] bg-white/5 rounded-2xl" />
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-3 w-full bg-white/10 rounded" />
                ))}
              </div>
            </div>
          ) : error || !blog ? (
            <div className="text-center py-24">
              <MdOutlineArticle className="mx-auto text-6xl text-cyan-300/30 mb-4" />
              <h2 className="text-2xl text-white font-bold mb-2">
                Article not found
              </h2>
              <p className="text-gray-400 mb-6">
                The article you were looking for doesn't exist or has been moved.
              </p>
              <button
                onClick={() => navigate('/blogs')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 text-white text-sm font-semibold"
              >
                <FiArrowLeft /> Back to Blogs
              </button>
            </div>
          ) : (
            <>
              {/* HEADER */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                {blog?.category?.name && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 mb-5">
                    <FiBookOpen size={12} /> {blog.category.name}
                  </span>
                )}

                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
                  {blog.title}
                </h1>

                {blog.excerpt && (
                  <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-7">
                    {blog.excerpt}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
                  {blog.author_name && (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center text-white font-semibold text-xs">
                        {blog.author_name
                          .split(' ')
                          .map((s) => s[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                      <span className="text-gray-200 font-medium">{blog.author_name}</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar /> {formatDate(blog.published_at || blog.created_at)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiClock /> {readMin} min read
                  </span>
                </div>
              </motion.header>

              {/* HERO IMAGE */}
              {blog.featured_image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative rounded-3xl overflow-hidden border border-white/10 mb-12 aspect-[21/9] bg-gradient-to-br from-cyan-500/10 to-green-500/10"
                >
                  <img
                    src={resolveImage(blog.featured_image)}
                    alt={blog.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 hidden items-center justify-center">
                    <MdOutlineAutoStories className="text-cyan-300/30 text-9xl" />
                  </div>
                </motion.div>
              )}

              {/* BODY GRID */}
              <div className="grid lg:grid-cols-[1fr_320px] gap-12">
                <article className="min-w-0">
                  {/* TOC (mobile collapsible inline above content) */}
                  {toc.length > 0 && (
                    <div className="lg:hidden mb-8 p-5 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-xs uppercase tracking-widest text-cyan-300 font-semibold mb-3">
                        In this article
                      </p>
                      <ul className="space-y-2">
                        {toc.map((h) => (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              className={`block text-sm text-gray-300 hover:text-cyan-300 transition ${
                                h.level === 3 ? 'pl-4 text-xs' : ''
                              }`}
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div
                    className="blog-content text-gray-200"
                    dangerouslySetInnerHTML={{ __html: contentWithIds }}
                  />

                  {/* TAGS */}
                  {tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-white/10">
                      <div className="flex items-start gap-3 flex-wrap">
                        <span className="inline-flex items-center gap-2 text-gray-400 text-sm">
                          <FiTag /> Tags:
                        </span>
                        {tags.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-400/30 hover:text-cyan-300 transition"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SHARE */}
                  <div className="mt-10 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-white font-semibold mb-1 flex items-center gap-2">
                          <FiShare2 /> Share this article
                        </p>
                        <p className="text-xs text-gray-400">
                          Help your network find this insight
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            shareUrl
                          )}&text=${encodeURIComponent(blog.title)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-gray-200 hover:text-cyan-300 hover:border-cyan-400/30 transition"
                        >
                          <FiTwitter />
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-gray-200 hover:text-cyan-300 hover:border-cyan-400/30 transition"
                        >
                          <FiLinkedin />
                        </a>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-gray-200 hover:text-cyan-300 hover:border-cyan-400/30 transition"
                        >
                          <FiFacebook />
                        </a>
                        <button
                          onClick={handleCopy}
                          className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-cyan-300 hover:border-cyan-400/30 transition text-sm"
                        >
                          <FiLink /> {copied ? 'Copied!' : 'Copy link'}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>

                {/* SIDEBAR */}
                <aside className="space-y-8 lg:sticky lg:top-28 self-start">
                  {toc.length > 0 && (
                    <div className="hidden lg:block p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                      <p className="text-xs uppercase tracking-widest text-cyan-300 font-semibold mb-4">
                        In this article
                      </p>
                      <ul className="space-y-2">
                        {toc.map((h) => (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              className={`block text-sm text-gray-300 hover:text-cyan-300 transition py-1 ${
                                h.level === 3 ? 'pl-4 text-xs' : ''
                              }`}
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {related.length > 0 && (
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                      <p className="text-xs uppercase tracking-widest text-cyan-300 font-semibold mb-4">
                        Related Reading
                      </p>
                      <div className="space-y-2">
                        {related.map((b) => (
                          <RelatedCard key={b.id} blog={b} />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-green-500/15 border border-cyan-400/20 backdrop-blur-xl">
                    <p className="text-white font-semibold mb-2">
                      Want data for your category?
                    </p>
                    <p className="text-sm text-gray-200 mb-4">
                      Talk to our research team about a tailored cut.
                    </p>
                    <Link
                      to={ROUTES.contact}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#0a192f] text-sm font-semibold hover:bg-cyan-50 transition"
                    >
                      Contact us <FiArrowRight />
                    </Link>
                  </div>
                </aside>
              </div>

              {/* BACK */}
              <div className="mt-16">
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-cyan-300 transition text-sm"
                >
                  <FiArrowLeft /> Back to all articles
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* TYPOGRAPHY FOR BLOG CONTENT */}
      <style>{`
        .blog-content { font-size: 1rem; line-height: 1.8; }
        .blog-content h2 { font-size: 1.75rem; font-weight: 700; color: #fff; margin: 2.5rem 0 1rem; line-height: 1.3; scroll-margin-top: 7rem; }
        .blog-content h3 { font-size: 1.35rem; font-weight: 600; color: #fff; margin: 2rem 0 .75rem; scroll-margin-top: 7rem; }
        .blog-content p { margin: 1rem 0; color: #cbd5e1; }
        .blog-content a { color: #67e8f9; text-decoration: underline; text-underline-offset: 3px; }
        .blog-content a:hover { color: #a7f3d0; }
        .blog-content strong { color: #fff; font-weight: 600; }
        .blog-content ul, .blog-content ol { margin: 1rem 0 1rem 1.25rem; color: #cbd5e1; }
        .blog-content ul { list-style: disc; }
        .blog-content ol { list-style: decimal; }
        .blog-content li { margin: .5rem 0; }
        .blog-content blockquote { border-left: 3px solid #22d3ee; padding: .5rem 1.25rem; margin: 1.5rem 0; color: #e2e8f0; background: rgba(255,255,255,0.03); border-radius: 0 .75rem .75rem 0; font-style: italic; }
        .blog-content img { border-radius: 1rem; margin: 1.5rem 0; border: 1px solid rgba(255,255,255,0.1); }
        .blog-content code { background: rgba(255,255,255,0.06); padding: .1rem .4rem; border-radius: .35rem; font-size: .9em; color: #67e8f9; }
        .blog-content pre { background: rgba(0,0,0,0.4); padding: 1rem; border-radius: .75rem; overflow-x: auto; margin: 1.25rem 0; border: 1px solid rgba(255,255,255,0.08); }
        .blog-content pre code { background: transparent; padding: 0; color: #e2e8f0; }
      `}</style>
    </div>
  );
};

export default BlogDetailPage;
