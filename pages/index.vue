<script setup lang="ts">
const { t } = useI18n();

// SEO Meta Tags using useHead
useHead({
  title: t("landing.meta.title"),
  meta: [
    {
      name: "description",
      content: t("landing.meta.description"),
    },
    {
      name: "keywords",
      content:
        "digital agency, website creation, B2B websites, visual identity, CMS solutions, Sanity CMS, web development Denmark, EU web agency, professional website, business website",
    },
    // Open Graph
    {
      property: "og:title",
      content: t("landing.meta.title"),
    },
    {
      property: "og:description",
      content: t("landing.meta.description"),
    },
    {
      property: "og:image",
      content: "https://eyeonidea.com/public-material/Company Page Banner.png",
    },
    { property: "og:url", content: "https://eyeonidea.com/" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Eye On Idea" },
    { property: "og:locale", content: "en_US" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: t("landing.meta.title"),
    },
    {
      name: "twitter:description",
      content: t("landing.meta.description"),
    },
    {
      name: "twitter:image",
      content: "https://eyeonidea.com/public-material/Company Page Banner.png",
    },
    { name: "twitter:site", content: "@eyeonidea" },
    { name: "twitter:creator", content: "@eyeonidea" },
  ],
  link: [{ rel: "canonical", href: "https://eyeonidea.com/" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Eye On Idea",
        alternateName: "EOI",
        url: "https://eyeonidea.com",
        logo: "https://eyeonidea.com/public-material/profile-picture.png",
        image: "https://eyeonidea.com/public-material/Company Page Banner.png",
        description:
          "Eye On Idea helps companies across Europe establish a clear, professional digital presence. Website creation, visual identity, and ongoing support.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+45-29-93-05-83",
          contactType: "Customer Service",
          email: "hello@eyeonidea.com",
          availableLanguage: ["English", "Danish"],
          areaServed: "EU",
        },
        sameAs: [
          "https://www.linkedin.com/company/eye-on-idea",
          "https://twitter.com/eyeonidea",
        ],
        address: {
          "@type": "PostalAddress",
          addressCountry: "DK",
          addressRegion: "Capital Region",
        },
        founder: {
          "@type": "Person",
          name: "Rune M. P. Pjetursson",
        },
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://eyeonidea.com/#webpage",
        name: "Eye On Idea - Digital Agency for B2B Websites",
        url: "https://eyeonidea.com/",
        description:
          "Eye On Idea helps companies across Europe establish a clear, professional digital presence. Website creation, visual identity, and ongoing support.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://eyeonidea.com/#website",
          name: "Eye On Idea",
          url: "https://eyeonidea.com",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://eyeonidea.com/public-material/Company Page Banner.png",
        },
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Eye On Idea",
        description:
          "Digital consultancy helping B2B companies establish professional web presence",
        priceRange: "$$",
        url: "https://eyeonidea.com",
        areaServed: {
          "@type": "Place",
          name: "Europe",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Website Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Website Launch",
                description:
                  "Professional website for companies establishing their online presence",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Website Growth",
                description:
                  "Flexible website designed for content updates and business growth",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Website Platform",
                description:
                  "Long-term digital platform for structured content and multiple audiences",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Visual Identity",
                description:
                  "Logo, colors, typography, and brand direction for digital platforms",
              },
            },
          ],
        },
      }),
    },
  ],
});
</script>

<template>
  <div class="homepage">
    <!-- Hero Section -->
    <HomeHeroSection />

    <!-- About Section -->
    <HomeAboutSection />

    <!-- Services Section -->
    <HomeServicesSection />

    <!-- CTA Section -->
    <HomeCTASection />

    <!-- Cookie Control -->
    <CookieControl locale="en" />
  </div>
</template>

<style lang="scss" scoped>
.homepage {
  position: relative;
  overflow-x: hidden;
}
</style>
