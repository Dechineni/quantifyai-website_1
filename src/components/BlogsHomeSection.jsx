import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiBookOpen,
  FiTag,
} from 'react-icons/fi';
import { MdOutlineArticle } from 'react-icons/md';

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
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 animate-pulse">
    <div className="aspect-[16/10] bg-white/5" />
    <div className="p-6 space-y-3">
      <div className="h-3 w-24 bg-white/10 rounded" />
      <div className="h-5 w-full bg-white/10 rounded" />
      <div className="h-5 w-2/3 bg-white/10 rounded" />
      <div className="h-3 w-full bg-white/10 rounded" />
    </div>
  </div>
);

const HomeBlogCard = ({ blog, index }) => {
  const readMin = estimateReadTime(blog?.content);
  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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

const BlogsHomeSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/blogs`, {
          params: { per_page: 3 },
        });
        if (!mounted) return;
        const items = res?.data?.data?.data ?? [];
        setBlogs(Array.isArray(items) ? items : []);
      } catch (e) {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!loading && blogs.length === 0) return null;

  return (
    <section id="blogs-home" className="relative z-10 py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-32 w-[28rem] h-[28rem] bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-5">
            <FiBookOpen className="text-cyan-400" />
            <span className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">
              From the Blog
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Cross-country consumer data, demographic shifts, and methodology — straight
            from the team behind the research.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : blogs.map((b, i) => <HomeBlogCard key={b.id} blog={b} index={i} />)}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
          >
            Explore all articles <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogsHomeSection;
