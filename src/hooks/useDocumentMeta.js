import { useEffect } from 'react';

const DEFAULT_TITLE = 'AI Market Research with Verified Respondents | QuantifyAI';
const DEFAULT_DESCRIPTION =
  'QuantifyAI delivers AI-powered market research with verified respondents, fraud prevention, and reliable survey data quality solutions worldwide.';

const setMeta = (selector, attr, name, content) => {
  if (!content) return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/**
 * Updates <title> and <meta name="description"> (plus OG/Twitter equivalents)
 * for the current page. Restores defaults when the component unmounts.
 */
export default function useDocumentMeta({ title, description, image } = {}) {
  useEffect(() => {
    // Only write what we actually have. Pre-rendered pages already ship a
    // correct per-route <title>/description, and stamping the generic site
    // defaults over them while data loads made every article look like the
    // same near-empty page to crawlers.
    if (!title && !description && !image) return undefined;

    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', 'property', 'og:title', title);
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    }
    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description);
      setMeta(
        'meta[property="og:description"]',
        'property',
        'og:description',
        description
      );
      setMeta(
        'meta[name="twitter:description"]',
        'name',
        'twitter:description',
        description
      );
    }
    if (image) {
      setMeta('meta[property="og:image"]', 'property', 'og:image', image);
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    }

    return () => {
      // Restore site defaults so a stale title doesn't leak between routes.
      document.title = DEFAULT_TITLE;
      setMeta('meta[name="description"]', 'name', 'description', DEFAULT_DESCRIPTION);
      setMeta('meta[property="og:title"]', 'property', 'og:title', DEFAULT_TITLE);
      setMeta(
        'meta[property="og:description"]',
        'property',
        'og:description',
        DEFAULT_DESCRIPTION
      );
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', DEFAULT_TITLE);
      setMeta(
        'meta[name="twitter:description"]',
        'name',
        'twitter:description',
        DEFAULT_DESCRIPTION
      );
    };
  }, [title, description, image]);
}
