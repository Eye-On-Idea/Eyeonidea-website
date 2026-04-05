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
    "@nuxt/fonts",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@vueuse/motion/nuxt",
    "@nuxtjs/sanity",
    "nuxt-auth-utils",
    "@tresjs/nuxt",
  ],

  // Color mode configuration (included with @nuxt/ui)
  colorMode: {
    preference: "system", // Default to system preference
    fallback: "light", // Fallback if no system preference detected
    classSuffix: "", // Use '.dark' not '.dark-mode'
    storage: "localStorage", // Persist user preference
    storageKey: "color-mode",
  },
  // Static generation — output to .output/public, deploy via FTP
  ssr: true,
  nitro: {
    preset: "static",
  },
  icon: {
    serverBundle: "local",
    clientBundle: {
      scan: true,
      sizeLimitKb: 0, // Include all icons in SSR bundle
    },
  },

  sanity: {
    projectId: process.env.SANITY_APP_PROJECT_ID,
    dataset: process.env.SANITY_APP_DATASET,
  },

  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        language: "en-US",
        name: "English",
        file: "en/index.ts",
        isCatchallLocale: true,
      },
      {
        code: "de",
        iso: "de-DE",
        language: "de-DE",
        name: "Deutsch",
        file: "de/index.ts",
      },
      {
        code: "fr",
        iso: "fr-FR",
        language: "fr-FR",
        name: "Français",
        file: "fr/index.ts",
      },
      {
        code: "es",
        iso: "es-ES",
        language: "es-ES",
        name: "Español",
        file: "es/index.ts",
      },
      {
        code: "it",
        iso: "it-IT",
        language: "it-IT",
        name: "Italiano",
        file: "it/index.ts",
      },
      {
        code: "dk",
        iso: "da-DK",
        language: "da-DK",
        name: "Dansk",
        file: "dk/index.ts",
      },
    ],
    langDir: "locales",
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_locale",
      redirectOn: "root",
      alwaysRedirect: false,
      fallbackLocale: "en",
      cookieCrossOrigin: false,
      cookieSecure: true,
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
    // SEO: Enable automatic alternate links for better multilingual SEO
    baseUrl: "https://eyeonidea.com",
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
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {},
      title: "Eye On Idea",
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
        { rel: "preconnect", href: "https://cdn.sanity.io" },
        { rel: "dns-prefetch", href: "//cdn.sanity.io" },
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
    },
  },

  runtimeConfig: {
    clientHubPassword: process.env.CLIENT_HUB_PASSWORD || "",
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
    locales: ["en", "de", "fr", "es", "it", "da"],
    localeTexts: {
      en: {
        bannerDescription:
          "We use cookies to ensure our website functions properly and to analyze traffic. You can accept all cookies, reject all non-essential cookies, or manage your preferences.",
        acceptAll: "Accept all cookies",
        declineAll: "Reject all",
        save: "Save my preferences",
        close: "Close",
        manageCookies: "Manage cookie preferences",
      },
      de: {
        bannerDescription:
          "Wir verwenden Cookies, um sicherzustellen, dass unsere Website ordnungsgemäß funktioniert, und um den Datenverkehr zu analysieren. Sie können alle Cookies akzeptieren, alle nicht wesentlichen Cookies ablehnen oder Ihre Einstellungen verwalten.",
        acceptAll: "Alle Cookies akzeptieren",
        declineAll: "Alle ablehnen",
        save: "Meine Einstellungen speichern",
        close: "Schließen",
        manageCookies: "Cookie-Einstellungen verwalten",
      },
      fr: {
        bannerDescription:
          "Nous utilisons des cookies pour garantir le bon fonctionnement de notre site et analyser le trafic. Vous pouvez accepter tous les cookies, refuser tous les cookies non essentiels ou gérer vos préférences.",
        acceptAll: "Accepter tous les cookies",
        declineAll: "Tout refuser",
        save: "Enregistrer mes préférences",
        close: "Fermer",
        manageCookies: "Gérer les préférences de cookies",
      },
      es: {
        bannerDescription:
          "Utilizamos cookies para garantizar el correcto funcionamiento de nuestro sitio web y analizar el tráfico. Puede aceptar todas las cookies, rechazar todas las no esenciales o gestionar sus preferencias.",
        acceptAll: "Aceptar todas las cookies",
        declineAll: "Rechazar todo",
        save: "Guardar mis preferencias",
        close: "Cerrar",
        manageCookies: "Gestionar preferencias de cookies",
      },
      it: {
        bannerDescription:
          "Utilizziamo i cookie per garantire il corretto funzionamento del nostro sito e analizzare il traffico. Puoi accettare tutti i cookie, rifiutare tutti i cookie non essenziali o gestire le tue preferenze.",
        acceptAll: "Accetta tutti i cookie",
        declineAll: "Rifiuta tutto",
        save: "Salva le mie preferenze",
        close: "Chiudi",
        manageCookies: "Gestisci le preferenze sui cookie",
      },
      da: {
        bannerDescription:
          "Vi bruger cookies for at sikre, at vores hjemmeside fungerer korrekt og for at analysere trafikken. Du kan acceptere alle cookies, afvise alle ikke-nødvendige cookies eller administrere dine præferencer.",
        acceptAll: "Accepter alle cookies",
        declineAll: "Afvis alle",
        save: "Gem mine præferencer",
        close: "Luk",
        manageCookies: "Administrer cookie-præferencer",
      },
    },

    cookies: {
      necessary: [
        {
          id: "ncc-essential",
          name: {
            en: "Essential Cookies",
            de: "Notwendige Cookies",
            fr: "Cookies essentiels",
            es: "Cookies esenciales",
            it: "Cookie essenziali",
            da: "Nødvendige cookies",
          },
          description: {
            en: "These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not work.",
            de: "Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden. Sie werden in der Regel nur als Reaktion auf von Ihnen durchgeführte Aktionen gesetzt, wie z. B. das Festlegen Ihrer Datenschutzeinstellungen, das Anmelden oder das Ausfüllen von Formularen.",
            fr: "Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés. Ils sont généralement définis en réponse à des actions que vous effectuez, comme la définition de vos préférences de confidentialité, la connexion ou le remplissage de formulaires.",
            es: "Estas cookies son necesarias para el funcionamiento del sitio web y no se pueden desactivar. Por lo general, solo se establecen en respuesta a acciones realizadas por usted, como configurar sus preferencias de privacidad, iniciar sesión o rellenar formularios.",
            it: "Questi cookie sono necessari per il funzionamento del sito e non possono essere disattivati. Di solito vengono impostati solo in risposta ad azioni da te eseguite, come la configurazione delle preferenze sulla privacy, l'accesso o la compilazione di moduli.",
            da: "Disse cookies er nødvendige for, at hjemmesiden kan fungere, og kan ikke slås fra. De indstilles normalt kun som svar på handlinger, du foretager, f.eks. ved at angive dine privatlivsindstillinger, logge ind eller udfylde formularer.",
          },
          targetCookieIds: ["ncc_c", "ncc_e"],
        },
      ],
      optional: [
        {
          id: "google-analytics",
          name: {
            en: "Analytics Cookies",
            de: "Analyse-Cookies",
            fr: "Cookies analytiques",
            es: "Cookies analíticas",
            it: "Cookie analitici",
            da: "Analytiske cookies",
          },
          description: {
            en: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.",
            de: "Diese Cookies ermöglichen es uns, Besuche und Verkehrsquellen zu zählen, um die Leistung unserer Website zu messen und zu verbessern. Sie helfen uns zu verstehen, welche Seiten am beliebtesten sind. Alle durch diese Cookies gesammelten Informationen sind aggregiert und daher anonym.",
            fr: "Ces cookies nous permettent de comptabiliser les visites et les sources de trafic afin de mesurer et d'améliorer les performances de notre site. Toutes les informations collectées par ces cookies sont agrégées et donc anonymes.",
            es: "Estas cookies nos permiten contar las visitas y las fuentes de tráfico para medir y mejorar el rendimiento de nuestro sitio. Toda la información que recopilan estas cookies es agregada y, por lo tanto, anónima.",
            it: "Questi cookie ci permettono di contare le visite e le sorgenti di traffico per misurare e migliorare le prestazioni del sito. Tutte le informazioni raccolte da questi cookie sono aggregate e quindi anonime.",
            da: "Disse cookies giver os mulighed for at tælle besøg og trafikkilder, så vi kan måle og forbedre vores hjemmesides ydeevne. Alle oplysninger, disse cookies indsamler, er aggregerede og derfor anonyme.",
          },
          targetCookieIds: ["_ga", "_ga_*", "_gid", "_gat", "_gac_*"],
          src: "https://www.googletagmanager.com/gtag/js?id=G-505858582",
        },
        {
          id: "google-tag-manager",
          name: {
            en: "Tag Management",
            de: "Tag-Verwaltung",
            fr: "Gestion des balises",
            es: "Gestión de etiquetas",
            it: "Gestione tag",
            da: "Tag-styring",
          },
          description: {
            en: "These cookies are used by Google Tag Manager to control the loading of other cookies and tracking scripts based on your consent preferences. This helps us respect your privacy choices across our website.",
            de: "Diese Cookies werden von Google Tag Manager verwendet, um das Laden anderer Cookies und Tracking-Skripte basierend auf Ihren Einwilligungseinstellungen zu steuern.",
            fr: "Ces cookies sont utilisés par Google Tag Manager pour contrôler le chargement d'autres cookies et scripts de suivi en fonction de vos préférences de consentement.",
            es: "Estas cookies son utilizadas por Google Tag Manager para controlar la carga de otras cookies y scripts de seguimiento según sus preferencias de consentimiento.",
            it: "Questi cookie vengono utilizzati da Google Tag Manager per controllare il caricamento di altri cookie e script di tracciamento in base alle tue preferenze di consenso.",
            da: "Disse cookies bruges af Google Tag Manager til at styre indlæsningen af andre cookies og sporingsscripts baseret på dine samtykkepræferencer.",
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
    viewTransition: true,
  },
  // Compatibility fixes
  alias: {
    "@nuxt/kit": "@nuxt/kit",
  },

  // ---------- Link Checker ----------
  linkChecker: {
    // Only run during build/generate — never in production runtime
    runOnBuild: true,
    // Do not fail the build on broken links (report only).
    // Set to true once all current issues are resolved.
    failOnError: false,
    // Do not fetch external URLs during CI — avoids rate-limiting and
    // network-dependent build failures. Review external links manually.
    fetchRemoteUrls: false,
    // Show live inspections in Nuxt DevTools during development
    showLiveInspections: true,
    // Exclude private/auth-gated routes from inspection
    excludeLinks: ["/client-hub/**", "/about/legal", "/about/policies"],
    // Generate a JSON report alongside the build for CI archiving
    report: {
      json: true,
    },
  },

  routeRules: {
    // Prerender public marketing pages for performance
    "/": { prerender: true },
    "/solutions": { prerender: true },
    "/solutions/**": { prerender: true },
    "/about": { prerender: true },
    "/about/**": { prerender: true },
    "/contact": { prerender: true },
    "/cases": { prerender: true },
    "/cases/**": { prerender: true },
    "/news": { prerender: true },
    "/news/**": { prerender: true },
    // Client Hub — excluded from prerender (no SSR on static host)
    "/client-hub/**": { prerender: false },
  },
});
