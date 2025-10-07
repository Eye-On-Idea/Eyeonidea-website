<script setup lang="ts">
// SEO Meta Tags
useHead({
  title: "Our Services - QA Testing & Digital Product Quality",
  meta: [
    {
      name: "description",
      content:
        "Comprehensive QA services including accessibility testing (WCAG compliance), usability testing, and front-end testing. Expert quality assurance for digital products across Europe.",
    },
    {
      name: "keywords",
      content:
        "QA services, accessibility testing, WCAG compliance, usability testing, front-end testing, cross-browser testing, responsive design testing, digital product quality",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Our Services - QA Testing & Digital Product Quality",
    },
    {
      property: "og:description",
      content:
        "Comprehensive QA services including accessibility testing (WCAG compliance), usability testing, and front-end testing. Expert quality assurance for digital products across Europe.",
    },
    {
      property: "og:image",
      content: "https://eyeonidea.com/public-material/Company Page Banner.png",
    },
    { property: "og:url", content: "https://eyeonidea.com/services" },
    { property: "og:type", content: "website" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Our Services - QA Testing & Digital Product Quality",
    },
    {
      name: "twitter:description",
      content:
        "Comprehensive QA services including accessibility testing (WCAG compliance), usability testing, and front-end testing.",
    },
    {
      name: "twitter:image",
      content: "https://eyeonidea.com/public-material/Company Page Banner.png",
    },
  ],
  link: [{ rel: "canonical", href: "https://eyeonidea.com/services" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Quality Assurance Testing",
        provider: {
          "@type": "Organization",
          name: "Eye On Idea",
          url: "https://eyeonidea.com",
        },
        areaServed: {
          "@type": "Place",
          name: "Europe",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "QA Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Accessibility Testing",
                description:
                  "WCAG compliance audits and accessibility testing to ensure your digital products are usable by everyone",
                serviceType: "Accessibility Testing",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Usability Testing",
                description:
                  "User experience testing and optimization to create intuitive, user-friendly digital products",
                serviceType: "Usability Testing",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Front-end Testing",
                description:
                  "Cross-browser and responsive design testing to ensure consistent experiences across all devices",
                serviceType: "Front-end Testing",
              },
            },
          ],
        },
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://eyeonidea.com/services#webpage",
        name: "Services - Eye On Idea",
        url: "https://eyeonidea.com/services",
        description:
          "Comprehensive QA services including accessibility testing, usability testing, and front-end testing.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://eyeonidea.com/#website",
          name: "Eye On Idea",
          url: "https://eyeonidea.com",
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://eyeonidea.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: "https://eyeonidea.com/services",
            },
          ],
        },
      }),
    },
  ],
});
</script>

<template locale="en">
  <services-myhero />
  <services-my-services-table />
  <CookieControl locale="en" />
</template>

<style lang="scss" scoped></style>
