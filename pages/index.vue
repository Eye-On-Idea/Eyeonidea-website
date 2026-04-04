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
    <HomeHeroSection />
    <HomeAudienceSection />
    <HomePackagesSection />
    <HomeCasesSection />
    <HomeProcessSection />
    <HomeAboutSection />
    <HomeCTASection />

    <!-- Cookie Control -->
    <CookieControl locale="en" />
  </div>
</template>

<style lang="scss" scoped>
.homepage {
  overflow-x: clip;
  position: relative;
}
</style>
