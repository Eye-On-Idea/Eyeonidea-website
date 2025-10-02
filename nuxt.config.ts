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
      meta: [{ name: "theme-color", content: "#7d3412" }],
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
      // keep if other code reads it; nuxt-gtag uses `gtag.id` below
      gtag: { id: "G-WY6NJ5BYTJ" },
      gtmId: "GTM-MHZ76SX2",
    },
  },

  // ---------- Google Analytics 4 (nuxt-gtag) ----------
  gtag: {
    enabled: process.env.NODE_ENV === "production",
    id: process.env.NUXT_PUBLIC_GA4_ID || "G-WY6NJ5BYTJ",
    config: { send_page_view: true },
    initCommands: [
      [
        "consent",
        "default",
        {
          ad_user_data: "denied",
          ad_personalization: "denied",
          ad_storage: "denied",
          analytics_storage: "denied",
          wait_for_update: 500,
        },
      ],
    ],
    // OPTIONAL hard-block: uncomment to prevent loading until consent, then call initialize() in plugin
    // initMode: "manual",
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
