import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiClock,
  FiArrowRight,
  FiCalendar,
  FiUser,
  FiTag,
  FiChevronLeft,
  FiChevronRight,
  FiBookOpen,
  FiTrendingUp,
} from 'react-icons/fi';
import { MdOutlineArticle, MdOutlineAutoStories } from 'react-icons/md';
import HeroBg from '../assets/imgs/hero-bg2.png';
import useDocumentMeta from '../hooks/useDocumentMeta';

const API_BASE = 'https://quantifyaiapi.mavenerp.in/public/api';
const ASSET_HOST = 'https://quantifyaiapi.mavenerp.in/public';

const resolveImage = (path = '') => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${ASSET_HOST}${path.startsWith('/') ? '' : '/'}${path}`;
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
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' },
  }),
};

const BlogCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 animate-pulse">
    <div className="aspect-[16/10] bg-white/5" />
    <div className="p-6 space-y-3">
      <div className="h-3 w-24 bg-white/10 rounded" />
      <div className="h-5 w-full bg-white/10 rounded" />
      <div className="h-5 w-2/3 bg-white/10 rounded" />
      <div className="h-3 w-full bg-white/10 rounded" />
      <div className="h-3 w-4/5 bg-white/10 rounded" />
    </div>
  </div>
);

const CategoryChip = ({ active, onClick, children, count }) => (
  <button
    onClick={onClick}
    className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
      active
        ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white border-transparent shadow-lg shadow-cyan-500/20'
        : 'bg-white/5 text-gray-200 border-white/10 hover:bg-white/10 hover:border-cyan-400/30'
    }`}
  >
    <span>{children}</span>
    {typeof count === 'number' && (
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          active ? 'bg-white/20' : 'bg-white/10 text-gray-300'
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

const FeaturedBlogCard = ({ blog }) => {
  const readMin = estimateReadTime(blog?.content);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0b1a36]/80 to-[#0a1228]/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-64 md:h-full overflow-hidden">
          {blog?.featured_image ? (
            <img
              src={resolveImage(blog.featured_image)}
              alt={blog.title}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : null}
          <div
            className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-green-500/20"
            style={{ display: blog?.featured_image ? 'none' : 'flex' }}
          >
            <MdOutlineAutoStories className="text-cyan-300/40 text-8xl" />
          </div>
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-lg">
              <FiTrendingUp /> Featured
            </span>
          </div>
        </div>

        <div className="p-8 lg:p-10 flex flex-col justify-center">
          {blog?.category?.name && (
            <span className="text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              {blog.category.name}
            </span>
          )}
          <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-4">
            {blog?.title}
          </h2>
          {blog?.excerpt && (
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6 line-clamp-3">
              {blog.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6">
            {blog?.author_name && (
              <span className="inline-flex items-center gap-1.5">
                <FiUser /> {blog.author_name}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <FiCalendar /> {formatDate(blog?.published_at || blog?.created_at)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiClock /> {readMin} min read
            </span>
          </div>

          <Link
            to={`/blogs/${blog?.slug}`}
            className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
          >
            Read article <FiArrowRight />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const BlogCard = ({ blog, index }) => {
  const readMin = estimateReadTime(blog?.content);
  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-cyan-400/30 hover:shadow-[0_20px_60px_rgba(34,211,238,0.12)] transition-all"
    >
      <Link to={`/blogs/${blog?.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          {blog?.featured_image ? (
            <img
              src={resolveImage(blog.featured_image)}
              alt={blog.title}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : null}
          <div
            className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-green-500/15"
            style={{ display: blog?.featured_image ? 'none' : 'flex' }}
          >
            <MdOutlineArticle className="text-cyan-300/40 text-6xl" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050b16] via-transparent to-transparent" />
          {blog?.category?.name && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/40 backdrop-blur-md text-cyan-300 border border-cyan-400/20">
              <FiTag size={11} /> {blog.category.name}
            </span>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-white leading-snug mb-3 line-clamp-2 group-hover:text-cyan-300 transition-colors">
            {blog?.title}
          </h3>
          {blog?.excerpt && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
              {blog.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
            <span className="inline-flex items-center gap-1.5">
              <FiCalendar size={12} /> {formatDate(blog?.published_at || blog?.created_at)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiClock size={12} /> {readMin} min
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const BlogsPage = () => {
  useDocumentMeta({
    title: 'Insights & Research Blog | QuantifyAI',
    description:
      'Cross-country consumer research, demographic shifts, income trends, and survey methodology — decoded by the QuantifyAI team.',
  });
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const perPage = 9;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/blog-categories`);
        if (!mounted) return;
        const items = res?.data?.data?.data ?? res?.data?.data ?? [];
        setCategories(Array.isArray(items) ? items : []);
      } catch (e) {
        // categories optional
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const params = {
          per_page: perPage,
          page,
        };
        if (search.trim()) params.search = search.trim();
        if (activeCategory !== 'all') params.category = activeCategory;

        const res = await axios.get(`${API_BASE}/blogs`, { params });
        if (!mounted) return;
        const payload = res?.data?.data ?? {};
        const items = payload?.data ?? [];
        setBlogs(Array.isArray(items) ? items : []);
        setLastPage(payload?.last_page ?? 1);
      } catch (e) {
        if (!mounted) return;
        setBlogs([]);
        setError('Could not load articles. Please try again shortly.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [search, activeCategory, page]);

  const [featured, ...rest] = blogs;

  const totalCount = useMemo(() => blogs.length, [blogs]);

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  const handleCategory = (slug) => {
    setPage(1);
    setActiveCategory(slug);
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative z-10 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <FiBookOpen className="text-cyan-400" />
            <span className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">
              Insights & Research
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5"
          >
            The QuantifyAI{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Insights Blog
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10"
          >
            Cross-country consumer research, demographic shifts, income trends, and
            methodology — decoded by the team behind the data.
          </motion.p>

          {/* SEARCH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <div className="relative">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search articles, topics, keywords…"
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-wrap justify-center">
            <CategoryChip
              active={activeCategory === 'all'}
              onClick={() => handleCategory('all')}
            >
              All Articles
            </CategoryChip>
            {categories.map((c) => (
              <CategoryChip
                key={c.id}
                active={activeCategory === c.slug}
                onClick={() => handleCategory(c.slug)}
              >
                {c.name}
              </CategoryChip>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="space-y-10">
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 animate-pulse">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[16/10] bg-white/5" />
                  <div className="p-8 space-y-3">
                    <div className="h-3 w-24 bg-white/10 rounded" />
                    <div className="h-7 w-3/4 bg-white/10 rounded" />
                    <div className="h-3 w-full bg-white/10 rounded" />
                    <div className="h-3 w-4/5 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-gray-300">{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <MdOutlineArticle className="mx-auto text-6xl text-cyan-300/30 mb-4" />
              <h3 className="text-xl text-white font-semibold mb-2">
                No articles found
              </h3>
              <p className="text-gray-400 text-sm">
                Try a different search term or category.
              </p>
            </div>
          ) : (
            <>
              {page === 1 && featured && (
                <div className="mb-12">
                  <FeaturedBlogCard blog={featured} />
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${search}-${page}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {(page === 1 ? rest : blogs).map((b, i) => (
                    <BlogCard key={b.id} blog={b} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* PAGINATION */}
              {lastPage > 1 && (
                <div className="flex items-center justify-center gap-2 mt-14">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 disabled:opacity-30 hover:bg-white/10 transition"
                  >
                    <FiChevronLeft />
                  </button>
                  {Array.from({ length: lastPage }).map((_, idx) => {
                    const n = idx + 1;
                    return (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition ${
                          page === n
                            ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-lg shadow-cyan-500/20'
                            : 'bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10'
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                  <button
                    disabled={page === lastPage}
                    onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 disabled:opacity-30 hover:bg-white/10 transition"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
