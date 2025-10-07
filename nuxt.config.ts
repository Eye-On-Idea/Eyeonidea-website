// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
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
      title: "Eye On Idea",
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
        // Global SEO defaults
        { name: "author", content: "Eye On Idea" },
        { property: "og:site_name", content: "Eye On Idea" },
        { property: "og:locale", content: "en_US" },
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
      // Cookie bar styling - dark background with brand colors
      barBackground: "rgba(31, 31, 31, 0.95)", // --color-neutral-900 with transparency
      barTextColor: "#ffeddf", // --color-brand-50 (light cream)
      // Accept All button - brand colors, less prominent
      barButtonBackground: "#dfaf85", // --color-brand-200 (warm tan)
      barButtonColor: "#1f1f1f", // --color-neutral-900 (dark text)
      barButtonHoverBackground: "#d39a69", // --color-brand-300
      barButtonHoverColor: "#1f1f1f",
      // Decline All button - more prominent with primary brand color (EU requirement)
      barButtonDeclineBackground: "#995226", // --color-brand-500 (base brand)
      barButtonDeclineColor: "#ffeddf", // --color-brand-50 (light text)
      barButtonDeclineHoverBackground: "#7d3412", // --color-brand-600
      barButtonDeclineHoverColor: "#ffeddf",
      // Only necessary button - transparent with brand text
      barButtonNecessaryBackground: "transparent",
      barButtonNecessaryColor: "#dfaf85", // --color-brand-200
      barButtonNecessaryHoverBackground: "rgba(223, 175, 133, 0.1)", // brand-200 with transparency
      barButtonNecessaryHoverColor: "#ffe4cf", // --color-brand-100
      // Control button (floating button)
      controlButtonBackground: "rgba(153, 82, 38, 0.9)", // --color-brand-500 with transparency
      controlButtonHoverBackground: "#7d3412", // --color-brand-600
      controlButtonIconColor: "#ffeddf", // --color-brand-50
      controlButtonIconHoverColor: "#ffe4cf", // --color-brand-100
      // Modal styling - consistent with bar
      modalBackground: "#1f1f1f", // --color-neutral-900
      modalTextColor: "#ffeddf", // --color-brand-50
      modalButtonBackground: "#995226", // --color-brand-500
      modalButtonColor: "#ffeddf", // --color-brand-50
      modalButtonHoverBackground: "#7d3412", // --color-brand-600
      modalButtonHoverColor: "#ffe4cf", // --color-brand-100
      // Checkbox colors for cookie selections
      checkboxActiveBackground: "#995226", // --color-brand-500
      checkboxActiveCircleBackground: "#ffeddf", // --color-brand-50
      checkboxInactiveBackground: "#67280e", // --color-brand-700
      checkboxInactiveCircleBackground: "#ffeddf", // --color-brand-50
      checkboxDisabledBackground: "#441a08", // --color-brand-900
      checkboxDisabledCircleBackground: "#dfaf85", // --color-brand-200
      // Focus and overlay
      focusRingColor: "#dfaf85", // --color-brand-200 for focus rings
      modalOverlay: "#1f1f1f", // --color-neutral-900
      modalOverlayOpacity: 0.8,
      modalUnsavedColor: "#d39a69", // --color-brand-300 for unsaved indicator
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
          src: "https://www.googletagmanager.com/gtag/js?id=G-505858582",
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
