<script setup lang="ts">
import ContactForm from "~/components/contact/ContactForm.vue";

// SEO Meta Tags using useHead
useHead({
  title: "Eye On Idea - Transform good ideas into great experiences",
  meta: [
    {
      name: "description",
      content:
        "EOI helps businesses across Europe deliver reliable, accessible, and user-friendly digital products with actionable QA in accessibility, usability, and front-end testing.",
    },
    {
      name: "keywords",
      content:
        "QA testing, accessibility testing, usability testing, front-end testing, WCAG compliance, digital product quality, Europe",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Eye On Idea - Transform good ideas into great experiences",
    },
    {
      property: "og:description",
      content:
        "EOI helps businesses across Europe deliver reliable, accessible, and user-friendly digital products with actionable QA in accessibility, usability, and front-end testing.",
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
      content: "Eye On Idea - Transform good ideas into great experiences",
    },
    {
      name: "twitter:description",
      content:
        "EOI helps businesses across Europe deliver reliable, accessible, and user-friendly digital products with actionable QA in accessibility, usability, and front-end testing.",
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
          "EOI helps businesses across Europe deliver reliable, accessible, and user-friendly digital products with actionable QA in accessibility, usability, and front-end testing.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
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
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://eyeonidea.com/#webpage",
        name: "Eye On Idea - Home",
        url: "https://eyeonidea.com/",
        description:
          "EOI helps businesses across Europe deliver reliable, accessible, and user-friendly digital products with actionable QA in accessibility, usability, and front-end testing.",
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
          "Quality Assurance and Testing Services for Digital Products",
        priceRange: "$$",
        url: "https://eyeonidea.com",
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
                description: "WCAG compliance and accessibility audits",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Usability Testing",
                description: "User experience testing and optimization",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Front-end Testing",
                description: "Cross-browser and responsive design testing",
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
  <!-- Background image provided from https://www.pexels.com/photo/black-and-white-photography-of-sand-2387819/ -->
  <div class="main-bg fixed w-full h-screen overflow-hidden"></div>
  <index-my-hero />
  <index-my-about />
  <index-my-services />
  <ContactForm />
  <CookieControl locale="en" />
</template>

<style lang="scss" scoped>
.main-bg {
  background-color: var(--quart-colour);
  background-image: url("/images/pexels-large.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  max-width: 1920px;
}

@media (min-width: 1940px) {
  .main-bg {
    background-image: url("/images/pexels-large.jpg");
    background-size: cover;
    width: 1920px;
  }
}
@media (max-width: 1440px) {
  .main-bg {
    background-image: url("/images/pexels-medium.jpg");
  }
}
@media (max-width: 768px) {
  .main-bg {
    background-image: url("/images/pexels-small.jpg");
  }
}
</style>
