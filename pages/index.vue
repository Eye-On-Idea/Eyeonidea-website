<script setup lang="ts">
const { t, locale } = useI18n();

// Map i18n locale codes to cookie-control ISO 639-1 codes (dk → da)
const cookieLocale = computed(() =>
  locale.value === "dk" ? "da" : locale.value,
);

useSeo({
  title: t("landing.meta.title"),
  description: t("landing.meta.description"),
  image: "/images/og-image.png",
  url: "/",
  canonical: "https://eyeonidea.com/",
  type: "website",
  schemaType: "WebPage",
  includeOrganizationSchema: true,
  includeWebSiteSchema: true,
  structuredData: {
    "@type": "ProfessionalService",
    "@id": "https://eyeonidea.com/#service",
    name: "Eye On Idea",
    description:
      "Full-service digital agency helping European B2B companies build and manage their complete online presence",
    priceRange: "$$",
    url: "https://eyeonidea.com",
    areaServed: { "@type": "Place", name: "Europe" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Agency Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Design & Development",
            description:
              "Fast, accessible B2B websites tailored to brand and business goals",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Visual Identity & Design",
            description:
              "Logos, colour palettes, typography, and brand guidelines built for digital",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Content Creation",
            description:
              "Structured content and copywriting that communicates clearly to B2B audiences",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & Social Media",
            description:
              "Search engine optimisation and social media presence management for B2B brands",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Professional Email Setup",
            description:
              "Branded, secure business email configuration that reinforces professional identity",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Domain Management",
            description:
              "Domain registration, security, and configuration for complete brand control",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Quality Assurance Consulting",
            description:
              "End-to-end auditing and testing of digital products to identify issues before launch",
          },
        },
      ],
    },
  },
});
</script>

<template>
  <div class="homepage">
    <!-- Fixed background image — sits beneath every section at z-index -1.
         Sections with solid/semi-transparent backgrounds naturally cover it;
         transparent sections let it show through as ambient atmosphere. -->
    <div class="homepage-bg" aria-hidden="true">
      <img
        src="/images/landing/hero.webp"
        alt=""
        class="homepage-bg-img"
        loading="eager"
        fetchpriority="high"
        decoding="sync"
      />
    </div>

    <HomeHeroSection />
    <HomeAudienceSection />
    <HomePackagesSection />
    <HomeCasesSection />
    <HomeProcessSection />
    <HomeAboutSection />
    <HomeCTASection />

    <!-- Cookie Control -->
    <CookieControl :locale="cookieLocale" />
  </div>
</template>

<style lang="scss" scoped>
.homepage {
  overflow-x: clip;
  position: relative;
}

/* Fixed hero image — always visible behind transparent sections */
.homepage-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* Fallback colour fills any edges beyond max image dimensions */
  background: #0d0908;
}

.homepage-bg-img {
  width: 100%;
  height: 100%;
  max-width: 2560px;
  max-height: 1440px;
  object-fit: cover;
  object-position: center;
}
</style>
