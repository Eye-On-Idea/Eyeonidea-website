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

  // Static Site Generation (SSG) configuration
  ssr: true,
  nitro: {
    preset: "static",
    prerender: {
      routes: [
        "/",
        "/services",
        "/about",
        "/about/legal",
        "/about/policies",
        "/contact",
      ],
      failOnError: false,
      crawlLinks: true,
    },
  },

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: false, // Disable for production
    },
    build: {
      cssMinify: "lightningcss",
      sourcemap: false, // Disable for production
    },
  },
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
    // EU Compliance settings
    barPosition: "bottom-full",
    isAcceptNecessaryButtonEnabled: true,
    declineAllAcceptsNecessary: true,
    isControlButtonEnabled: true,
    closeModalOnClickOutside: false, // Prevent accidental consent
    isIframeBlocked: true,
    cookieExpiryOffsetMs: 1000 * 60 * 60 * 24 * 365, // 1 year
    cookieNameIsConsentGiven: "ncc_c",
    cookieNameCookiesEnabledIds: "ncc_e",
    cookieOptions: { path: "/", sameSite: "strict", secure: true },

    colors: {
      barBackground: "var(--color-surface-1)",
      barTextColor: "var(--color-text)",
      // Primary button (Accept All) - less prominent
      barButtonBackground: "var(--color-primary-200)",
      barButtonColor: "var(--color-brand-700)",
      barButtonHoverBackground: "var(--color-primary-300)",
      barButtonHoverColor: "var(--color-brand-700)",
      // Decline All button - more prominent (EU requirement)
      barButtonDeclineBackground: "var(--btn-primary-bg)",
      barButtonDeclineColor: "var(--btn-primary-text)",
      barButtonDeclineHoverBackground: "var(--btn-primary-hover)",
      barButtonDeclineHoverColor: "var(--btn-primary-text)",
      // Only necessary button styling
      barButtonNecessaryBackground: "transparent",
      barButtonNecessaryColor: "var(--color-primary-700)",
      barButtonNecessaryHoverBackground: "var(--color-brand-100)",
      barButtonNecessaryHoverColor: "var(--color-brand-700)",
      // Control button
      controlButtonBackground: "var(--btn-ghost-hover)",
      controlButtonHoverBackground: "var(--btn-primary-bg)",
      controlButtonIconColor: "var(--color-brand-700)",
      controlButtonIconHoverColor: "var(--btn-primary-text)",
      // Modal colors
      modalBackground: "var(--color-bg)",
      modalTextColor: "var(--color-text)",
      modalButtonBackground: "var(--btn-primary-bg)",
      modalButtonColor: "var(--btn-primary-text)",
      modalButtonHoverBackground: "var(--btn-primary-hover)",
      modalButtonHoverColor: "var(--btn-primary-text)",
      // Checkbox colors (unchecked by default for EU compliance)
      checkboxActiveBackground: "var(--color-brand-700)",
      checkboxInactiveBackground: "var(--color-border)",
      checkboxDisabledBackground: "var(--color-primary-100)",
      focusRingColor: "var(--focus-ring)",
      modalOverlay: "var(--color-primary-900)",
      modalOverlayOpacity: 0.6,
      modalUnsavedColor: "var(--color-primary-600)",
    },
    // Keep locales minimal; only override *known* keys
    locales: ["en"],
    localeTexts: {
      en: {
        bannerDescription:
          "We use cookies to ensure our website functions properly and to analyze traffic. You can accept all cookies, reject all non-essential cookies, or manage your preferences.",
        acceptAll: "Accept all cookies",
        declineAll: "Reject all", // Prominent reject button
        save: "Save my preferences",
        close: "Close",
        manageCookies: "Manage cookie preferences",
      },
    },

    cookies: {
      necessary: [
        {
          id: "ncc-essential",
          name: { en: "Essential Cookies" },
          description: {
            en: "These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not work.",
          },
          targetCookieIds: ["ncc_c", "ncc_e"],
        },
      ],
      optional: [
        {
          id: "google-analytics",
          name: { en: "Analytics Cookies" },
          description: {
            en: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.",
          },
          targetCookieIds: ["_ga", "_ga_*", "_gid", "_gat", "_gac_*"],
          src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX",
        },
        {
          id: "google-tag-manager",
          name: { en: "Tag Management" },
          description: {
            en: "These cookies are used by Google Tag Manager to control the loading of other cookies and tracking scripts based on your consent preferences. This helps us respect your privacy choices across our website.",
          },
          targetCookieIds: ["_gtm*"],
        },
      ],
    },
  },
  // Build configuration for static deployment
  build: {
    transpile: ["@nuxt/ui"],
  },
  // Experimental features for better static generation
  experimental: {
    payloadExtraction: false,
  },
  // Compatibility fixes
  alias: {
    "@nuxt/kit": "@nuxt/kit",
  },
  routeRules: { "/**": { prerender: true } },
});
