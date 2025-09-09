import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/seo", // bundles robots, sitemap, schema.org, og-image, etc.
    "@nuxt/image",
    "@nuxt/ui",
  ],
  image: {
    provider: "ipx",
  },

  css: ["~/assets/css/main.css"],

  vite: { plugins: [tailwindcss()] },

  // Global <head> tags (favicons, manifest, theme color)
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        { name: "theme-color", content: "#7d3412" }, // EOI brand primary
      ],
    },
  },

  // Nuxt Site Config – used by @nuxtjs/seo submodules
  site: {
    url: "https://eyeonidea.com",
    name: "Eye on Idea",
    description:
      "EOI helps businesses across Europe deliver reliable, accessible, and user-friendly digital products with actionable QA in accessibility, usability, and front-end testing.",
    defaultLocale: "en",
  },

  // Optional: fine-tune bundled modules
  robots: {
    groups: [{ userAgent: "*", allow: "/" }],
    sitemap: ["/sitemap.xml"],
  },

  sitemap: {
    // site.url above is used automatically; add custom entries here if needed
  },

  schemaOrg: {
    identity: {
      // Basic Organization identity for rich results
      type: "Organization",
      name: "EOI – Eye on Idea",
      url: "https://eyeonidea.com",
      logo: "public/public-material/Profile Picture.png", // replace with your actual logo URL
    },
  },

  ogImage: {
    // Will auto-generate default OG images; you can add a component template later
    enabled: true,
  },
});
