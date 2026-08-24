// Pre-deploy sanity check. Exits non-zero so a bad build is never published.
//
// This exists because a build once captured a stale post list from the API (21
// posts when the API had 28). It deployed green, but seven blog URLs were
// advertised in the sitemap with no page behind them -- which Search Console
// reported as 404s. Every check below maps to a failure that actually happened.

import fs from "node:fs";
import path from "node:path";

const distDir = "dist";
const SITE_HOST = "quantifyai.co";
const problems = [];
const notes = [];

function fail(message) {
  problems.push(message);
}

function requireFile(relativePath, why) {
  const full = path.join(distDir, relativePath);
  if (!fs.existsSync(full)) {
    fail(`missing ${relativePath} -- ${why}`);
    return null;
  }
  return fs.readFileSync(full, "utf8");
}

// --- shell files -----------------------------------------------------------

const indexHtml = requireFile("index.html", "the site has no entry point");
requireFile("404.html", "unknown routes would show GitHub's default 404");

const cname = requireFile("CNAME", "the custom domain would be dropped");
if (cname !== null && cname.trim() !== SITE_HOST) {
  fail(`CNAME is "${cname.trim()}", expected "${SITE_HOST}"`);
}

// Only matters for branch-based Pages; the Actions deploy path never runs
// Jekyll. Worth noting, not worth blocking a release over.
if (!fs.existsSync(path.join(distDir, ".nojekyll"))) {
  notes.push("note: .nojekyll absent (harmless on Actions-based Pages)");
}

if (indexHtml && !/<script[^>]+type="module"/.test(indexHtml)) {
  fail("index.html has no module script tag -- the app bundle is not linked");
}

// --- sitemap ---------------------------------------------------------------

const sitemap = requireFile("sitemap.xml", "search engines get no URL list");
let blogSlugs = [];

if (sitemap) {
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (locs.length === 0) {
    fail("sitemap.xml contains no URLs");
  }

  // A www or non-canonical host means every advertised URL is a redirect.
  const wrongHost = locs.filter((loc) => {
    try {
      return new URL(loc).hostname !== SITE_HOST;
    } catch {
      return true;
    }
  });
  if (wrongHost.length) {
    fail(
      `${wrongHost.length} sitemap URL(s) are not on ${SITE_HOST}, ` +
        `e.g. ${wrongHost[0]}`
    );
  }

  blogSlugs = locs
    .map((loc) => {
      const m = new RegExp(`^https://${SITE_HOST}/blogs/([^/?#]+)/?$`).exec(loc);
      return m ? m[1] : null;
    })
    .filter(Boolean);

  if (blogSlugs.length === 0) {
    fail("sitemap.xml lists no blog posts -- the blog API fetch likely failed");
  }
}

// --- every advertised blog URL must resolve to a real, seeded page ----------

let seeded = 0;

for (const slug of blogSlugs) {
  const rel = path.join("blogs", slug, "index.html");
  const full = path.join(distDir, rel);

  if (!fs.existsSync(full)) {
    fail(`sitemap advertises /blogs/${slug}/ but ${rel} does not exist (404)`);
    continue;
  }

  const html = fs.readFileSync(full, "utf8");

  if (!/rel="canonical"/.test(html)) {
    fail(`/blogs/${slug}/ has no canonical link`);
  }

  // The inlined payload is what stops crawlers seeing an empty skeleton.
  const match = html.match(/window\.__BLOG_DATA__=([\s\S]*?);<\/script>/);
  if (!match) {
    fail(`/blogs/${slug}/ has no inlined post data -- would render a skeleton`);
    continue;
  }

  let payload;
  try {
    payload = JSON.parse(match[1]);
  } catch (error) {
    fail(`/blogs/${slug}/ has malformed inlined JSON: ${error.message}`);
    continue;
  }

  if (payload.slug !== slug) {
    fail(`/blogs/${slug}/ carries data for a different post (${payload.slug})`);
  } else if (!payload.content) {
    fail(`/blogs/${slug}/ inlined data has no content`);
  } else {
    seeded += 1;
  }
}

notes.push(`blog posts advertised : ${blogSlugs.length}`);
notes.push(`fully seeded pages    : ${seeded}`);

// --- report ----------------------------------------------------------------

console.log("Build verification");
for (const note of notes) console.log(`  ${note}`);

if (problems.length) {
  console.error(`\n${problems.length} problem(s) -- refusing to deploy:`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log("\nAll checks passed.");
