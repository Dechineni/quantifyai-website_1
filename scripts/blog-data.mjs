// Shared helpers for fetching blog data from the QuantifyAI API at build time.
// Used by generate-sitemap.mjs (to list every post in the sitemap) and by
// generate-static-routes.mjs (to pre-render each post's HTML for crawlers).

export const API_BASE =
  process.env.BLOG_API_BASE || "https://quantifyaiapi.mavenerp.in/public/api";
export const ASSET_HOST =
  process.env.BLOG_ASSET_HOST || "https://quantifyaiapi.mavenerp.in/public";

// Resolve a possibly-relative asset path coming from the API into an absolute URL.
export function resolveImage(path = "") {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${ASSET_HOST}${path.startsWith("/") ? "" : "/"}${path}`;
}

// The API sits behind a LiteSpeed cache that has served build requests a stale
// post list (28 posts live, 21 in the cached copy). A build that captures the
// stale list silently drops real posts from both the sitemap and the
// pre-rendered pages, which shows up in Search Console as 404s. Bust the cache
// on every request so a build always sees current data.
function noCacheUrl(url) {
  return `${url}${url.includes("?") ? "&" : "?"}_cb=${Date.now()}`;
}

const NO_CACHE_HEADERS = {
  Accept: "application/json",
  "Cache-Control": "no-cache, no-store, max-age=0",
  Pragma: "no-cache",
};

// Walk every page of the paginated /blogs endpoint and return all posts.
// Throws on a network/HTTP error so callers can decide how to degrade.
export async function fetchAllBlogs() {
  if (typeof fetch !== "function") {
    throw new Error("global fetch is unavailable; Node 18+ is required.");
  }

  const all = [];
  let page = 1;
  let lastPage = 1;

  do {
    const url = `${API_BASE}/blogs?per_page=50&page=${page}`;
    const res = await fetch(noCacheUrl(url), { headers: NO_CACHE_HEADERS });
    if (!res.ok) {
      throw new Error(`Blog API responded ${res.status} for ${url}`);
    }
    const json = await res.json();
    const payload = json?.data ?? {};
    const items = Array.isArray(payload?.data) ? payload.data : [];
    all.push(...items);
    lastPage = Number(payload?.last_page) || 1;
    page += 1;
  } while (page <= lastPage);

  // Only surface published posts to crawlers.
  const published = all.filter((b) => {
    if (!b?.slug) return false;
    if (b.status == null) return true;
    const status = String(b.status).toLowerCase();
    return status === "published" || status === "1" || status === "active";
  });

  // An empty list means the API is broken or misconfigured, not that the blog
  // is empty. Shipping that would drop every post from the sitemap and delete
  // every pre-rendered page, so fail the build instead of degrading quietly.
  if (published.length === 0) {
    throw new Error(
      `Blog API returned no published posts (${all.length} raw record(s)). ` +
        "Refusing to build a site with zero blog pages."
    );
  }

  return published;
}
