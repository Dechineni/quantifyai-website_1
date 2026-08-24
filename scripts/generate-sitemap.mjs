import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchAllBlogs } from "./blog-data.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const DEFAULT_SITE_URL = "https://quantifyai.co";
const siteUrl = normalizeSiteUrl(process.env.SITE_URL || DEFAULT_SITE_URL);
const today = new Date().toISOString().slice(0, 10);

const routesFilePath = path.join(projectRoot, "src", "routes.js");
const sitemapPath = path.join(projectRoot, "public", "sitemap.xml");
const robotsPath = path.join(projectRoot, "public", "robots.txt");

await main();

async function main() {
  const staticPaths = collectStaticPathsFromRoutes(routesFilePath);

  // Each entry is { path, lastmod }. Static routes use today's date.
  const entries = new Map();
  for (const sitePath of staticPaths) {
    entries.set(sitePath, { path: sitePath, lastmod: today });
  }

  // Pull every blog post from the API so each /blogs/<slug> is discoverable.
  // A failed fetch must not break the build — fall back to the static routes.
  try {
    const blogs = await fetchAllBlogs();
    for (const blog of blogs) {
      const sitePath = `/blogs/${blog.slug}`;
      entries.set(sitePath, { path: sitePath, lastmod: blogLastmod(blog) });
    }
    console.log(`Fetched ${blogs.length} blog post(s) from the API.`);
  } catch (error) {
    console.warn(
      `WARNING: could not fetch blog posts for the sitemap (${error.message}).`
    );
    console.warn("Sitemap will be generated without individual blog URLs.");
  }

  const sitemapXml = buildSitemapXml([...entries.values()], siteUrl);
  const robotsTxt = buildRobotsTxt(siteUrl);

  fs.writeFileSync(sitemapPath, sitemapXml, "utf8");
  fs.writeFileSync(robotsPath, robotsTxt, "utf8");

  console.log(
    `Sitemap generated with ${entries.size} URLs at ${toProjectRelative(sitemapPath)}`
  );
  console.log(`Robots updated at ${toProjectRelative(robotsPath)}`);
}

function blogLastmod(blog) {
  const raw = blog?.updated_at || blog?.published_at || blog?.created_at;
  if (!raw) return today;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? today : date.toISOString().slice(0, 10);
}

function normalizeSiteUrl(url) {
  return String(url || DEFAULT_SITE_URL).trim().replace(/\/+$/, "");
}

function toProjectRelative(absolutePath) {
  return path.relative(projectRoot, absolutePath).replaceAll("\\", "/");
}

function collectStaticPathsFromRoutes(filePath) {
  const paths = new Set(["/"]);

  if (!fs.existsSync(filePath)) {
    return paths;
  }

  const source = stripComments(fs.readFileSync(filePath, "utf8"));
  const routeRegex = /:\s*["']([^"']+)["']/g;

  let match = routeRegex.exec(source);
  while (match) {
    const routePath = normalizePath(match[1]);
    if (routePath && isIndexablePath(routePath)) {
      paths.add(routePath);
    }
    match = routeRegex.exec(source);
  }

  return paths;
}

function stripComments(source) {
  return source
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
}

function isIndexablePath(routePath) {
  if (!routePath.startsWith("/")) return false;
  if (routePath.includes("*")) return false;
  if (routePath.includes(":")) return false;
  return true;
}

function normalizePath(routePath) {
  if (!routePath) return "/";
  if (routePath === "/") return "/";
  return routePath.replace(/\/+$/, "");
}

function canonicalPath(sitePath) {
  const normalized = normalizePath(sitePath);
  if (normalized === "/") return "/";
  return `${normalized}/`;
}

function toCanonicalUrl(sitePath, baseUrl) {
  return `${baseUrl}${canonicalPath(sitePath)}`;
}

function buildSitemapXml(entries, baseUrl) {
  const sorted = [...entries].sort((a, b) => {
    if (a.path === "/") return -1;
    if (b.path === "/") return 1;
    return a.path.localeCompare(b.path);
  });

  const urlEntries = sorted
    .map(({ path: sitePath, lastmod }) => {
      const loc = toCanonicalUrl(sitePath, baseUrl);
      const { changefreq, priority } = getSeoDefaults(sitePath);
      return [
        "  <url>",
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${lastmod || today}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    "</urlset>",
    "",
  ].join("\n");
}

function getSeoDefaults(sitePath) {
  if (sitePath === "/") {
    return { changefreq: "always", priority: "1.0" };
  }

  if (sitePath.startsWith("/blog/") || sitePath.startsWith("/blogs/")) {
    return { changefreq: "weekly", priority: "0.8" };
  }

  if (sitePath === "/terms" || sitePath === "/privacy-policy") {
    return { changefreq: "yearly", priority: "0.4" };
  }

  if (sitePath.startsWith("/services")) {
    return { changefreq: "monthly", priority: "0.8" };
  }

  return { changefreq: "monthly", priority: "0.7" };
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildRobotsTxt(baseUrl) {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
}
