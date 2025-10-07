<script setup lang="ts">
import AboutCTA from "~/components/about/AboutCTA.vue";
import AboutFounder from "~/components/about/AboutFounder.vue";
import AboutVP from "~/components/about/AboutVP.vue";
import AboutWhyExist from "~/components/about/AboutWhyExist.vue";

// SEO Meta Tags
useHead({
  title: "About Us - Meet the Team Behind Eye On Idea",
  meta: [
    {
      name: "description",
      content:
        "Learn about Eye On Idea's mission to deliver reliable, accessible, and user-friendly digital products. Meet our founder and discover why we exist to help businesses across Europe.",
    },
    {
      name: "keywords",
      content:
        "about Eye On Idea, QA team, accessibility experts, digital quality assurance, company mission, founder story",
    },
    // Open Graph
    {
      property: "og:title",
      content: "About Us - Meet the Team Behind Eye On Idea",
    },
    {
      property: "og:description",
      content:
        "Learn about Eye On Idea's mission to deliver reliable, accessible, and user-friendly digital products. Meet our founder and discover why we exist.",
    },
    {
      property: "og:image",
      content: "https://eyeonidea.com/public-material/Company Page Banner.png",
    },
    { property: "og:url", content: "https://eyeonidea.com/about" },
    { property: "og:type", content: "website" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "About Us - Meet the Team Behind Eye On Idea",
    },
    {
      name: "twitter:description",
      content:
        "Learn about Eye On Idea's mission to deliver reliable, accessible, and user-friendly digital products.",
    },
    {
      name: "twitter:image",
      content: "https://eyeonidea.com/public-material/Company Page Banner.png",
    },
  ],
  link: [{ rel: "canonical", href: "https://eyeonidea.com/about" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://eyeonidea.com/about#webpage",
        name: "About - Eye On Idea",
        url: "https://eyeonidea.com/about",
        description:
          "Learn about Eye On Idea's mission to deliver reliable, accessible, and user-friendly digital products.",
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
              name: "About",
              item: "https://eyeonidea.com/about",
            },
          ],
        },
        mainEntity: {
          "@type": "Organization",
          "@id": "https://eyeonidea.com/#organization",
          name: "Eye On Idea",
          url: "https://eyeonidea.com",
          logo: "https://eyeonidea.com/public-material/profile-picture.png",
          description:
            "EOI helps businesses across Europe deliver reliable, accessible, and user-friendly digital products.",
          foundingDate: "2020",
          areaServed: {
            "@type": "Place",
            name: "Europe",
          },
        },
      }),
    },
  ],
});
</script>

<template>
  <div id="main">
    <AboutHero />
    <AboutFounder />
    <AboutVP />

    <AboutWhyExist />
    <AboutCTA />
  </div>
</template>

<style scoped>
/* Ensure good focus visibility and accessible outlines */
:focus-visible {
  outline: 2px solid var(--color-brand-500);
  outline-offset: 2px;
}
</style>
