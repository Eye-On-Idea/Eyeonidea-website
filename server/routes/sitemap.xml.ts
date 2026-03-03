import { $fetch } from "ofetch";

const STATIC_URLS = `
  <url>
    <loc>https://eyeonidea.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://eyeonidea.com/services</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://eyeonidea.com/services/website-packages</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://eyeonidea.com/services/visual-identity</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://eyeonidea.com/services/additional-services</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://eyeonidea.com/services/process</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://eyeonidea.com/about</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://eyeonidea.com/contact</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://eyeonidea.com/cases</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://eyeonidea.com/cases/herqulez</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://eyeonidea.com/cases/tegetec</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://eyeonidea.com/news</loc>
    <lastmod>2026-03-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;

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
    <loc>https://eyeonidea.com/news/${post.slug}</loc>
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
