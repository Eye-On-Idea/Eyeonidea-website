// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/seo", "@nuxt/image", "@nuxt/ui"],

  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  image: { provider: "ipx" },

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
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    CONTACT_TO: process.env.CONTACT_TO,
    CONTACT_FROM: process.env.CONTACT_FROM,
    public: {},
  },
});
