<script setup lang="ts">
const { t } = useI18n();

useSeo({
  title: t("landing.meta.title"),
  description: t("landing.meta.description"),
  image: "/public-material/company-page-banner.png",
  imageWidth: 1200,
  imageHeight: 630,
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
      "Digital consultancy helping B2B companies establish professional web presence",
    priceRange: "$$",
    url: "https://eyeonidea.com",
    areaServed: { "@type": "Place", name: "Europe" },
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
  },
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
    <ProcessFAQ />
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
