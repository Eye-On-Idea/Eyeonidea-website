// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/seo",
    "@nuxt/image",
    "@nuxt/ui",
    "nuxt-gtag",
    "@dargmuesli/nuxt-cookie-control",
  ],

  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  image: { provider: "ipx" },

  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Eye On Idea - Transform good ideas in to great experiences",
      titleTemplate: "%s | Eye On Idea",
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
        { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
          crossorigin: "",
        },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#7d3412" },
        { name: "msapplication-TileColor", content: "#7d3412" },
        { name: "format-detection", content: "telephone=no" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
        // Global SEO defaults (can be overridden by individual pages)
        { name: "author", content: "Eye On Idea" },
        { name: "robots", content: "index, follow" },
        { property: "og:site_name", content: "Eye On Idea" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:creator", content: "@eyeonidea" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Eye On Idea",
            url: "https://eyeonidea.com",
            description:
              "Helping businesses across Europe, build digital products that are reliable, accessible, and easy to use",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://eyeonidea.com/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
            publisher: {
              "@type": "Organization",
              name: "Eye On Idea",
              logo: {
                "@type": "ImageObject",
                url: "https://eyeonidea.com/public-material/profile-picture.png",
              },
            },
          }),
        },
      ],
    },
  },

  site: {
    url: "https://eyeonidea.com",
    name: "Eye on Idea",
    description:
      "EOI helps businesses across Europe deliver reliable, accessible, and user-friendly digital products with actionable QA in accessibility, usability, and front-end testing.",
    defaultLocale: "en",
  },

  robots: {
    groups: [{ userAgent: "*", allow: "/" }],
    sitemap: ["/sitemap.xml"],
  },
  sitemap: {},
  schemaOrg: {
    identity: {
      type: "Organization",
      name: "EOI – Eye on Idea",
      url: "https://eyeonidea.com",
      logo: "https://eyeonidea.com/public-material/profile-picture.png",
    },
  },
  ogImage: { enabled: true },

  runtimeConfig: {
    public: {
      GTM_ID: "GTM-MHZ76SX2",
    },
  },

  // ---------- Cookie banner ----------
  cookieControl: {
    barPosition: "bottom-full",
    isControlButtonEnabled: true,
    isAcceptNecessaryButtonEnabled: true,
    isModalForced: false,
    declineAllAcceptsNecessary: true,

    // Keep locales minimal; only override *known* keys
    locales: ["en"],
    localeTexts: {
      en: {
        // Example of a known key:
        save: "Save choices",
        // (Avoid untyped keys like `settings`, `acceptNecessary`, `bannerTitle`, etc.)
      },
    },

    cookies: {
      necessary: [
        {
          id: "essential",
          name: { en: "Essential" },
          description: {
            en: "Required for core features (navigation, forms).",
          },
          targetCookieIds: ["ncc_c", "ncc_e"],
        },
      ],
      optional: [
        {
          id: "google-analytics",
          name: { en: "Google Analytics 4" },
          description: { en: "Helps us improve the site. Off by default." },
          targetCookieIds: ["_ga", "_ga_*", "_gid"],
          isPreselected: false,
        },
        {
          id: "google-tag-manager",
          name: { en: "Google Tag Manager" },
          description: {
            en: "Loads marketing/analytics tags configured in GTM.",
          },
          targetCookieIds: [], // GTM may set various cookies via tags
          isPreselected: false,
        },
      ],
    },
  },

  // Cloudflare Pages static build
  nitro: { preset: "cloudflare-pages" },
  routeRules: { "/**": { prerender: true } },
});
