import { $fetch } from "ofetch";

const BASE = "https://eyeonidea.com";
const LASTMOD = "2026-04-05";

// Locale prefixes: '' = English (default, no prefix), others get /locale/ prefix
const LOCALE_PREFIXES = ["", "dk", "de", "fr", "es", "it"];

interface StaticPage {
  path: string;
  priority: string;
  changefreq: string;
}

const STATIC_PAGES: StaticPage[] = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/solutions", priority: "0.9", changefreq: "monthly" },
  { path: "/solutions/website-packages", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions/visual-identity", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions/additional-services", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions/process", priority: "0.7", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/cases", priority: "0.8", changefreq: "monthly" },
  { path: "/cases/herqulez", priority: "0.7", changefreq: "monthly" },
  { path: "/cases/tegetec", priority: "0.7", changefreq: "monthly" },
  { path: "/news", priority: "0.7", changefreq: "weekly" },
];

function buildLocaleUrl(prefix: string, page: StaticPage): string {
  const loc =
    page.path === "/"
      ? prefix
        ? `${BASE}/${prefix}/`
        : `${BASE}/`
      : prefix
        ? `${BASE}/${prefix}${page.path}`
        : `${BASE}${page.path}`;

  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}

const STATIC_URLS = STATIC_PAGES.flatMap((page) =>
  LOCALE_PREFIXES.map((prefix) => buildLocaleUrl(prefix, page)),
).join("");

interface SanityPost {
  slug: string;
  publishedAt: string;
  _updatedAt: string;
}

export default defineEventHandler(async () => {
  const sanityProjectId = process.env.SANITY_APP_PROJECT_ID;
  const sanityDataset = process.env.SANITY_APP_DATASET || "production";
  const sanityToken = process.env.SANITY_APP_READ_TOKEN;

  let newsUrls = "";

  if (sanityProjectId) {
    try {
      const query = encodeURIComponent(
        `*[_type == "post" && publishedAt <= now() && defined(slug.current)]{ "slug": slug.current, publishedAt, _updatedAt } | order(publishedAt desc)`,
      );
      const sanityUrl = `https://${sanityProjectId}.api.sanity.io/v2023-08-01/data/query/${sanityDataset}?query=${query}`;

      const headers: Record<string, string> = {};
      if (sanityToken) {
        headers["Authorization"] = `Bearer ${sanityToken}`;
      }

      const result = await $fetch<{ result: SanityPost[] }>(sanityUrl, {
        headers,
      });

      if (result?.result?.length) {
        newsUrls = result.result
          .map((post) => {
            const lastmod = new Date(post._updatedAt || post.publishedAt)
              .toISOString()
              .split("T")[0];
            return `
  <url>
    <loc>${BASE}/news/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>never</changefreq>
    <priority>0.6</priority>
  </url>`;
          })
          .join("");
      }
    } catch {
      // Graceful degradation — static pages still get indexed
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${STATIC_URLS}${newsUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
});
