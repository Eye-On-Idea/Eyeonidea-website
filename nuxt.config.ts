
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

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
    storage: "localStorage",
    storageKey: "color-mode",
  },

  ssr: true,
  nitro: {
    preset: "static",
  },
  icon: {
    serverBundle: "local",
    clientBundle: {
      scan: true,
      sizeLimitKb: 0,
      icons: ["lucide:menu"],
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

    baseUrl: "https://eyeonidea.com",
  },

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: false,
    },
    build: {
      cssMinify: "lightningcss",
      sourcemap: false,
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

  cookieControl: {

    barPosition: "bottom-full",
    isAcceptNecessaryButtonEnabled: true,
    declineAllAcceptsNecessary: true,
    isControlButtonEnabled: true,
    closeModalOnClickOutside: false,
    isIframeBlocked: true,
    cookieExpiryOffsetMs: 1000 * 60 * 60 * 24 * 365,
    cookieNameIsConsentGiven: "ncc_c",
    cookieNameCookiesEnabledIds: "ncc_e",
    cookieOptions: { path: "/", sameSite: "strict", secure: true },

    colors: {

      barBackground: "rgba(31, 31, 31, 0.95)",
      barTextColor: "#ffeddf",

      barButtonBackground: "#dfaf85",
      barButtonColor: "#1f1f1f",
      barButtonHoverBackground: "#d39a69",
      barButtonHoverColor: "#1f1f1f",

      barButtonDeclineBackground: "#995226",
      barButtonDeclineColor: "#ffeddf",
      barButtonDeclineHoverBackground: "#7d3412",
      barButtonDeclineHoverColor: "#ffeddf",

      barButtonNecessaryBackground: "transparent",
      barButtonNecessaryColor: "#dfaf85",
      barButtonNecessaryHoverBackground: "rgba(223, 175, 133, 0.1)",
      barButtonNecessaryHoverColor: "#ffe4cf",

      controlButtonBackground: "rgba(153, 82, 38, 0.9)",
      controlButtonHoverBackground: "#7d3412",
      controlButtonIconColor: "#ffeddf",
      controlButtonIconHoverColor: "#ffe4cf",

      modalBackground: "#1f1f1f",
      modalTextColor: "#ffeddf",
      modalButtonBackground: "#995226",
      modalButtonColor: "#ffeddf",
      modalButtonHoverBackground: "#7d3412",
      modalButtonHoverColor: "#ffe4cf",

      checkboxActiveBackground: "#995226",
      checkboxActiveCircleBackground: "#ffeddf",
      checkboxInactiveBackground: "#67280e",
      checkboxInactiveCircleBackground: "#ffeddf",
      checkboxDisabledBackground: "#441a08",
      checkboxDisabledCircleBackground: "#dfaf85",

      focusRingColor: "#dfaf85",
      modalOverlay: "#1f1f1f",
      modalOverlayOpacity: 0.8,
      modalUnsavedColor: "#d39a69",
    },

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

  build: {
    transpile: ["@nuxt/ui"],
  },

  experimental: {
    payloadExtraction: false,
    viewTransition: true,
  },

  alias: {
    "@nuxt/kit": "@nuxt/kit",
  },

  linkChecker: {

    runOnBuild: true,

    failOnError: false,

    fetchRemoteUrls: false,

    showLiveInspections: true,

    excludeLinks: ["/client-hub/**", "/about/legal", "/about/policies"],

    report: {
      json: true,
    },
  },

  routeRules: {

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

    "/client-hub/**": { prerender: false },
  },
});
