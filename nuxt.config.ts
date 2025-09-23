// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/seo",
    "@nuxt/image",
    "@nuxt/ui",
    "@dargmuesli/nuxt-cookie-control",
    "@nuxtjs/i18n",
  ],

  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  image: { provider: "ipx" },
  i18n: {
    // Your available locales
    locales: [
      { code: "en", iso: "en-US", name: "English" },
      { code: "da", iso: "da-DK", name: "Dansk" },
    ],
    defaultLocale: "en",

    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      fallbackLocale: "en",
    },
  },
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
      meta: [{ name: "theme-color", content: "#184996" }],
    },
  },

  site: {
    url: "tegetec.com",
    name: "tegetec",
    description:
      "tegetec will gladly assist you in all your equipment and optimizing needs. Through our broad experience, we are able to help you achieve your goal: Reliable, cost effective and easy to use packaging.",
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
      name: "Tegetec",
      url: "https://tegetec.com",
      logo: "https://tegetec.com/assets/img/tegetec.svg",
      sameAs: ["https://dk.linkedin.com/company/tegetec-aps"],
    },
  },
  ogImage: { enabled: true },

  runtimeConfig: {
    public: {
      GTM_ID: process.env.NUXT_PUBLIC_GTM_ID || "",
    },
  },

  // ---------- Cookie banner ----------
  cookieControl: {
    barPosition: "bottom-full",
    isAcceptNecessaryButtonEnabled: true,
    declineAllAcceptsNecessary: true,
    isControlButtonEnabled: true,
    closeModalOnClickOutside: true,
    isIframeBlocked: true,
    cookieExpiryOffsetMs: 1000 * 60 * 60 * 24 * 365,
    cookieNameIsConsentGiven: "ncc_c",
    cookieNameCookiesEnabledIds: "ncc_e",
    cookieOptions: { path: "/", sameSite: "strict" },

    // your theme tokens
    colors: {
      barBackground: "var(--color-surface-1)",
      barTextColor: "var(--color-text)",
      barButtonBackground: "var(--btn-primary-bg)",
      barButtonColor: "var(--btn-primary-text)",
      barButtonHoverBackground: "var(--btn-primary-hover)",
      barButtonHoverColor: "var(--btn-primary-text)",
      controlButtonBackground: "var(--btn-ghost-hover)",
      controlButtonHoverBackground: "var(--btn-primary-bg)",
      controlButtonIconColor: "var(--color-primary-700)",
      controlButtonIconHoverColor: "var(--btn-primary-text)",
      modalBackground: "var(--color-bg)",
      modalTextColor: "var(--color-text)",
      modalButtonBackground: "var(--btn-primary-bg)",
      modalButtonColor: "var(--btn-primary-text)",
      modalButtonHoverBackground: "var(--btn-primary-hover)",
      modalButtonHoverColor: "var(--btn-primary-text)",
      checkboxActiveBackground: "var(--color-primary-700)",
      checkboxInactiveBackground: "var(--color-primary-200)",
      checkboxDisabledBackground: "var(--color-primary-100)",
      focusRingColor: "var(--focus-ring)",
      modalOverlay: "var(--color-primary-900)",
      modalOverlayOpacity: 0.5,
      modalUnsavedColor: "var(--color-primary-600)",
    },

    // English strings only (supported keys)
    locales: ["en"],
    localeTexts: {
      en: {
        bannerDescription:
          "We use cookies for essential site functions and analytics. Choose “Only necessary” or manage your preferences.",
        acceptAll: "Accept all",
        declineAll: "Reject all",
        save: "Save preferences",
        close: "Close",
        manageCookies: "Cookie settings",
      },
    },

    // Toggles users can enable
    cookies: {
      necessary: [
        {
          id: "ncc-essential",
          name: { en: "Core functionality" },
          description: {
            en: "Remembers your cookie choices and powers basic site operation.",
          },
          targetCookieIds: [],
        },
      ],
      optional: [
        {
          id: "google-analytics",
          name: { en: "Google Analytics 4" },
          description: {
            en: "Traffic measurement and usage statistics. Only enabled with consent.",
          },
          targetCookieIds: ["_ga", "_ga_*", "_gid"],
        },
        {
          id: "google-tag-manager",
          name: { en: "Google Tag Manager" },
          description: {
            en: "Tag orchestration based on your consent preferences.",
          },
          targetCookieIds: [],
        },
      ],
    },
  },
  /*
  nitro: {
    routeRules: {
      // redirect http://tegetec.com/* -> https://www.tegetec.com/*
      "/**": {
        redirect: { to: "https://www.tegetec.com/**", statusCode: 308 },
      },
    },
  },*/
});
