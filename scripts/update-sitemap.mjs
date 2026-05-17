// Regenerates sitemap.xml by fetching live blog/category data from the API.
// Designed to run inside GitHub Actions on a schedule.
// Requires Node 20+ (built-in fetch).

import fs from "node:fs";
import path from "node:path";

const SITE_URL = process.env.SITE_URL || "https://www.quantifyai.co";
const API_BASE = process.env.API_BASE || "https://quantifyaiapi.mavenerp.in/public/api";
const OUT_PATH = path.resolve(process.cwd(), "sitemap.xml");

// Static routes (must match what's in your React app's App.jsx)
const STATIC_ROUTES = [
  { path: "/",                                   priority: "1.0" },
  { path: "/platform",                           priority: "0.8" },
  { path: "/solutions",                          priority: "0.8" },
  { path: "/approach",                           priority: "0.7" },
  { path: "/company",                            priority: "0.7" },
  { path: "/services",                           priority: "0.8" },
  { path: "/services/questionnaire-development", priority: "0.8" },
  { path: "/services/survey-programming",        priority: "0.8" },
  { path: "/services/fielding-data-collection",  priority: "0.8" },
  { path: "/services/data-analysis",             priority: "0.8" },
  { path: "/contact",                            priority: "0.7" },
  { path: "/blogs",                              priority: "0.8" },
  { path: "/terms",                              priority: "0.4" },
  { path: "/privacy-policy",                     priority: "0.4" },
];

const today = new Date().toISOString().slice(0, 10);

async function fetchAllBlogs() {
  const out = [];
  let page = 1;
  let lastPage = 1;
  do {
    const url = `${API_BASE}/blogs?per_page=100&page=${page}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`Blogs API ${res.status} on page ${page}`);
    const json = await res.json();
    const payload = json?.data ?? {};
    const items = payload?.data ?? [];
    for (const b of items) {
      if (b?.slug) {
        out.push({
          slug: b.slug,
          lastmod: (b.updated_at || b.published_at || "").slice(0, 10) || today,
        });
      }
    }
    lastPage = payload?.last_page ?? 1;
    page += 1;
  } while (page <= lastPage);
  return out;
}

async function fetchAllCategories() {
  try {
    const res = await fetch(`${API_BASE}/blog-categories`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const items = json?.data ?? [];
    return Array.isArray(items)
      ? items
          .filter((c) => c?.slug)
          .map((c) => ({
            slug: c.slug,
            lastmod: (c.updated_at || "").slice(0, 10) || today,
          }))
      : [];
  } catch {
    return [];
  }
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function urlBlock({ loc, lastmod, priority }) {
  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>always</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

(async () => {
  console.log(`Fetching blogs from ${API_BASE} ...`);
  const blogs = await fetchAllBlogs();
  const categories = await fetchAllCategories();
  console.log(`Found ${blogs.length} blogs, ${categories.length} categories.`);

  const entries = [];

  for (const r of STATIC_ROUTES) {
    entries.push({ loc: `${SITE_URL}${r.path}`, lastmod: today, priority: r.priority });
  }
  for (const b of blogs) {
    entries.push({
      loc: `${SITE_URL}/blogs/${b.slug}`,
      lastmod: b.lastmod,
      priority: "0.7",
    });
  }
  for (const c of categories) {
    entries.push({
      loc: `${SITE_URL}/blogs?category=${c.slug}`,
      lastmod: c.lastmod,
      priority: "0.6",
    });
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.map(urlBlock).join("\n"),
    "</urlset>",
    "",
  ].join("\n");

  fs.writeFileSync(OUT_PATH, xml, "utf8");
  console.log(`Wrote ${entries.length} URLs to ${OUT_PATH}`);
})().catch((err) => {
  console.error("Sitemap generation failed:", err);
  process.exit(1);
});
