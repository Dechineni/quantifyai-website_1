import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchAllBlogs, resolveImage } from "./blog-data.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const indexPath = path.join(distDir, "index.html");
const sitemapPath = path.join(distDir, "sitemap.xml");
const fallbackPath = path.join(distDir, "404.html");

const DEFAULT_SITE_URL = "https://quantifyai.co";
const siteUrl = normalizeSiteUrl(process.env.SITE_URL || DEFAULT_SITE_URL);
const DEFAULT_DESCRIPTION =
  "QuantifyAI delivers AI-powered market research with verified respondents, fraud prevention, and reliable survey data quality solutions worldwide.";
const LEGACY_REDIRECTS = [
  { from: "/platform", to: "/platform-b2b-survey-panel-provider-in-california" },
  { from: "/solutions", to: "/solutions-online-survey-platform-for-b2b-insights" },
  { from: "/approach", to: "/approach-global-survey-panel-with-fraud-detection-technology" },
  { from: "/company", to: "/company-product-market-research-insights-with-ai-analytics" },
  {
    from: "/services/questionnaire-development",
    to: "/services/questionnaire-development/b2b-survey-panel-provider-in-california",
  },
  {
    from: "/services/survey-programming",
    to: "/services/survey-programming/verified-survey-respondents-in-california",
  },
  {
    from: "/services/fielding-data-collection",
    to: "/services/fielding-data-collection/fraud-free-survey-data-in-california",
  },
  {
    from: "/services/data-analysis",
    to: "/services/data-analysis/market-segmentation-analysis-in-california",
  },
  { from: "/services/data-quality", to: "/survey-data-quality-solutions-for-market-research" },
  { from: "/services/global-panel", to: "/global-survey-panel-with-fraud-detection-technology" },
  { from: "/services/research-solutions", to: "/solutions-online-survey-platform-for-b2b-insights" },
  { from: "/contact", to: "/contact-market-segmentation-analysis-in-california" },
  { from: "/consultation", to: "/contact-market-segmentation-analysis-in-california" },
  { from: "/blog", to: "/blogs" },
  { from: "/blogs/cross-country-consumer-data-emerging-markets-2026", to: "/blogs" },
  { from: "/blogs/sample-size-survey-quality-methodology", to: "/blogs" },
  { from: "/blogs/income-bands-reshaping-consumer-spending-2026", to: "/blogs" },
];

await main();

async function main() {
  if (!fs.existsSync(indexPath)) {
    throw new Error("dist/index.html was not found. Run this script after vite build.");
  }

  const indexHtml = fs.readFileSync(indexPath, "utf8");
  const sitePaths = readSitemapPaths(sitemapPath);

  // Map blog slug -> full post record so /blogs/<slug> pages get real metadata.
  const blogsBySlug = new Map();
  try {
    const blogs = await fetchAllBlogs();
    for (const blog of blogs) blogsBySlug.set(blog.slug, blog);
    console.log(`Fetched ${blogs.length} blog post(s) for pre-rendering.`);
  } catch (error) {
    console.warn(
      `WARNING: could not fetch blog posts for pre-render (${error.message}).`
    );
    console.warn("Blog pages will fall back to the generic SPA shell.");
  }

  let routeCount = 0;
  let blogCount = 0;

  for (const sitePath of sitePaths) {
    if (sitePath === "/") continue;

    const routeDir = path.join(distDir, ...sitePath.split("/").filter(Boolean));
    const routeIndexPath = path.join(routeDir, "index.html");
    const canonical = canonicalUrlForPath(sitePath);

    let html;
    const slug = blogSlugFromPath(sitePath);
    if (slug && blogsBySlug.has(slug)) {
      html = buildBlogHtml(indexHtml, blogsBySlug.get(slug), canonical);
      blogCount += 1;
    } else {
      html = withCanonical(indexHtml, canonical);
    }

    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(routeIndexPath, html, "utf8");
    routeCount += 1;
  }

  let redirectCount = 0;
  for (const { from, to } of LEGACY_REDIRECTS) {
    if (sitePaths.has(from)) continue;

    const routeDir = path.join(distDir, ...from.split("/").filter(Boolean));
    const routeIndexPath = path.join(routeDir, "index.html");
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(routeIndexPath, buildRedirectHtml(canonicalUrlForPath(to)), "utf8");
    redirectCount += 1;
  }

  // Give the home page a self-referencing canonical too.
  fs.writeFileSync(indexPath, withCanonical(indexHtml, canonicalUrlForPath("/")), "utf8");

  // SPA fallback for unknown routes on GitHub Pages.
  fs.writeFileSync(fallbackPath, withNoindex(indexHtml), "utf8");

  console.log(
    `Generated ${routeCount} route file(s) in dist/ (${blogCount} pre-rendered blog page(s)).`
  );
  console.log(`Generated ${redirectCount} legacy redirect page(s).`);
  console.log("Generated dist/404.html fallback");
}

// ---------------------------------------------------------------------------
// HTML builders
// ---------------------------------------------------------------------------

// Inject a self-referencing canonical + og:url into an otherwise-default page.
function withCanonical(html, canonical) {
  const tags = [
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
  ].join("\n    ");
  return injectIntoHead(html, tags);
}

function withNoindex(html) {
  return injectIntoHead(html, '<meta name="robots" content="noindex,follow" />');
}

function buildRedirectHtml(targetUrl) {
  const escapedUrl = escapeAttr(targetUrl);
  const jsonUrl = JSON.stringify(targetUrl);
  return [
    "<!doctype html>",
    '<html lang="en">',
    "  <head>",
    '    <meta charset="UTF-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '    <meta name="robots" content="noindex,follow" />',
    `    <link rel="canonical" href="${escapedUrl}" />`,
    `    <meta http-equiv="refresh" content="0; url=${escapedUrl}" />`,
    "    <title>Redirecting | QuantifyAI</title>",
    "  </head>",
    "  <body>",
    `    <a href="${escapedUrl}">Continue to the current QuantifyAI page</a>`,
    `    <script>window.location.replace(${jsonUrl});</script>`,
    "  </body>",
    "</html>",
    "",
  ].join("\n");
}

// Build a fully SEO-populated, pre-rendered page for a single blog post.
function buildBlogHtml(baseHtml, blog, fallbackCanonical) {
  const postUrl = canonicalUrlForPath(`/blogs/${blog.slug}`);
  const title = blog.meta_title || (blog.title ? `${blog.title} | QuantifyAI` : "QuantifyAI");
  const description = blog.meta_description || blog.excerpt || DEFAULT_DESCRIPTION;
  const canonical = normalizeCanonicalUrl(blog.canonical_url || fallbackCanonical || postUrl);
  const robots = blog.robots || "index,follow";

  const ogTitle = blog.og_title || title;
  const ogDescription = blog.og_description || description;
  const ogImage = resolveImage(blog.og_image || blog.featured_image || "");

  const twTitle = blog.twitter_title || ogTitle;
  const twDescription = blog.twitter_description || ogDescription;
  const twImage = resolveImage(blog.twitter_image || blog.og_image || blog.featured_image || "");

  let html = baseHtml;

  // Replace the default <title> and the four shared content meta tags.
  html = replaceTitle(html, title);
  html = replaceMetaContent(html, "name", "description", description);
  html = replaceMetaContent(html, "property", "og:title", ogTitle);
  html = replaceMetaContent(html, "property", "og:description", ogDescription);
  html = replaceMetaContent(html, "name", "twitter:title", twTitle);
  html = replaceMetaContent(html, "name", "twitter:description", twDescription);
  html = replaceMetaContent(html, "property", "og:type", "article");

  const headTags = [
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    `<meta name="robots" content="${escapeAttr(robots)}" />`,
    `<meta property="og:url" content="${escapeAttr(postUrl)}" />`,
    `<meta property="og:site_name" content="QuantifyAI" />`,
    ogImage ? `<meta property="og:image" content="${escapeAttr(ogImage)}" />` : "",
    twImage ? `<meta name="twitter:image" content="${escapeAttr(twImage)}" />` : "",
    blog.published_at
      ? `<meta property="article:published_time" content="${escapeAttr(blog.published_at)}" />`
      : "",
    blog.updated_at
      ? `<meta property="article:modified_time" content="${escapeAttr(blog.updated_at)}" />`
      : "",
    buildJsonLd(blog, postUrl, { title, description, image: ogImage }),
    buildBlogBootstrap(blog),
  ]
    .filter(Boolean)
    .join("\n    ");

  html = injectIntoHead(html, headTags);

  // Pre-render the article into #root so crawlers (and social scrapers that
  // don't run JS) get real content. React's createRoot replaces this on mount.
  html = injectIntoRoot(html, buildPrerenderedBody(blog));

  return html;
}

// Use the CMS-provided JSON-LD if present; otherwise synthesise BlogPosting.
function buildJsonLd(blog, postUrl, { title, description, image }) {
  let payload = null;

  if (blog.schema_markup) {
    try {
      payload =
        typeof blog.schema_markup === "string"
          ? JSON.parse(blog.schema_markup)
          : blog.schema_markup;
    } catch {
      payload = null;
    }
  }

  if (!payload) {
    payload = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title || title,
      description,
      mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
      url: postUrl,
      ...(image ? { image: [image] } : {}),
      ...(blog.author_name
        ? { author: { "@type": "Person", name: blog.author_name } }
        : {}),
      publisher: {
        "@type": "Organization",
        name: "QuantifyAI",
        url: siteUrl,
      },
      ...(blog.published_at ? { datePublished: blog.published_at } : {}),
      ...(blog.updated_at ? { dateModified: blog.updated_at } : {}),
    };
  }

  // Escape "</" so the JSON can't break out of the <script> element.
  const json = JSON.stringify(payload).replace(/<\//g, "<\\/");
  return `<script type="application/ld+json">${json}</script>`;
}

// Inline the exact API payload the app would have fetched. React's createRoot
// wipes the pre-rendered markup below the moment the bundle runs, so without a
// seed the page falls back to a skeleton loader until a slow API round-trip
// resolves -- which is what crawlers were snapshotting as a soft 404.
function buildBlogBootstrap(blog) {
  return `<script>window.__BLOG_DATA__=${serializeForScript(blog)};</script>`;
}

// JSON that is safe to embed inside a <script> element. Angle brackets only
// ever occur inside string values, so escaping them keeps the JSON valid while
// making it impossible to close the script tag early. The two Unicode line
// separators are escaped too: JSON.stringify emits them raw, but JS parsers
// older than ES2019 treat them as line breaks inside a string literal.
function serializeForScript(value) {
  const esc = String.fromCharCode(92) + "u"; // backslash-u: JS unicode escape prefix
  const escapes = {
    "<": esc + "003c",
    ">": esc + "003e",
    [String.fromCharCode(0x2028)]: esc + "2028",
    [String.fromCharCode(0x2029)]: esc + "2029",
  };
  return JSON.stringify(value).replace(
    new RegExp("[<>" + esc + "2028" + esc + "2029]", "g"),
    (ch) => escapes[ch]
  );
}

function buildPrerenderedBody(blog) {
  const title = escapeHtml(blog.title || "");
  const excerpt = blog.excerpt ? `<p>${escapeHtml(blog.excerpt)}</p>` : "";
  const category = blog?.category?.name
    ? `<p class="prerender-seo__eyebrow">${escapeHtml(blog.category.name)}</p>`
    : "";
  // blog.content is trusted HTML authored in the CMS; emit it as-is.
  const content = blog.content || "";

  // Scoped dark styling so the snapshot matches the app theme during the brief
  // window before React mounts and replaces #root. Removed once JS takes over.
  const style = `<style>
      .prerender-seo{max-width:48rem;margin:0 auto;padding:8rem 1.25rem 4rem;color:#cbd5e1;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.8}
      .prerender-seo h1{color:#fff;font-size:2rem;line-height:1.25;margin:0 0 1rem}
      .prerender-seo h2,.prerender-seo h3{color:#fff}
      .prerender-seo a{color:#67e8f9}
      .prerender-seo__eyebrow{color:#22d3ee;text-transform:uppercase;letter-spacing:.1em;font-size:.75rem;font-weight:600;margin:0 0 .5rem}
      .prerender-seo img{max-width:100%;height:auto;border-radius:1rem}
    </style>`;

  return [
    style,
    '<article class="prerender-seo" style="background:#0a192f;min-height:100vh">',
    category,
    `<h1>${title}</h1>`,
    excerpt,
    content,
    "</article>",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// String/HTML helpers
// ---------------------------------------------------------------------------

function injectIntoHead(html, tags) {
  if (!tags) return html;
  const block = `    ${tags}\n  </head>`;
  if (html.includes("</head>")) {
    return html.replace("</head>", block);
  }
  return html;
}

function injectIntoRoot(html, inner) {
  // Match <div id="root"></div> (with optional whitespace/attributes order).
  const rootRegex = /<div id="root">\s*<\/div>/;
  if (rootRegex.test(html)) {
    return html.replace(rootRegex, `<div id="root">${inner}</div>`);
  }
  return html;
}

function replaceTitle(html, title) {
  if (/<title>[\s\S]*?<\/title>/.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  }
  return injectIntoHead(html, `<title>${escapeHtml(title)}</title>`);
}

// Replace the content="" of an existing meta tag, or append it if absent.
function replaceMetaContent(html, attr, name, content) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `(<meta\\s+${attr}=["']${escapedName}["'][^>]*\\bcontent=["'])[\\s\\S]*?(["'][^>]*>)`,
    "i"
  );
  if (regex.test(html)) {
    return html.replace(regex, `$1${escapeAttr(content)}$2`);
  }
  return injectIntoHead(html, `<meta ${attr}="${name}" content="${escapeAttr(content)}" />`);
}

function blogSlugFromPath(sitePath) {
  const match = /^\/blogs\/([^/]+)\/?$/.exec(sitePath);
  return match ? match[1] : null;
}

function readSitemapPaths(filePath) {
  if (!fs.existsSync(filePath)) {
    return new Set(["/"]);
  }

  const sitemapXml = fs.readFileSync(filePath, "utf8");
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  const paths = new Set(["/"]);

  let match = locRegex.exec(sitemapXml);
  while (match) {
    const routePath = pathnameFromUrl(match[1]);
    if (routePath && isSafeRoutePath(routePath)) {
      paths.add(routePath);
    }
    match = locRegex.exec(sitemapXml);
  }

  return paths;
}

function pathnameFromUrl(value) {
  try {
    const pathname = new URL(value).pathname || "/";
    return pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function isSafeRoutePath(routePath) {
  if (!routePath.startsWith("/")) return false;
  if (routePath.includes("..")) return false;
  if (path.extname(routePath)) return false;
  return true;
}

function normalizeSiteUrl(url) {
  return String(url || DEFAULT_SITE_URL).trim().replace(/\/+$/, "");
}

function canonicalPath(sitePath) {
  const rawPath = String(sitePath || "/").trim();
  const withoutHash = rawPath.split("#")[0];
  const [pathname, query = ""] = withoutHash.split("?");
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const finalPath = normalizedPath === "/" ? "/" : `${normalizedPath}/`;
  return query ? `${finalPath}?${query}` : finalPath;
}

function canonicalUrlForPath(sitePath) {
  return `${siteUrl}${canonicalPath(sitePath)}`;
}

function normalizeCanonicalUrl(value) {
  try {
    const url = new URL(value, siteUrl);
    if (url.hostname === "quantifyai.co" || url.hostname === "www.quantifyai.co") {
      return canonicalUrlForPath(`${url.pathname}${url.search}`);
    }
    return url.toString();
  } catch {
    return canonicalUrlForPath(value);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}
