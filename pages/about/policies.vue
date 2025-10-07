<script lang="ts" setup>
// SEO Meta Tags
useHead({
  title: "Privacy Policy & Data Protection",
  meta: [
    {
      name: "description",
      content:
        "Privacy policy and data protection information for Eye On Idea. Learn how we handle and protect your personal data in compliance with GDPR.",
    },
    {
      name: "robots",
      content: "noindex, nofollow",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Privacy Policy - Eye On Idea",
    },
    {
      property: "og:description",
      content:
        "Privacy policy and data protection information for Eye On Idea services.",
    },
    { property: "og:url", content: "https://eyeonidea.com/about/policies" },
    { property: "og:type", content: "website" },
  ],
  link: [{ rel: "canonical", href: "https://eyeonidea.com/about/policies" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://eyeonidea.com/about/policies#webpage",
        name: "Privacy Policy - Eye On Idea",
        url: "https://eyeonidea.com/about/policies",
        description:
          "Privacy policy and data protection information for Eye On Idea.",
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
            {
              "@type": "ListItem",
              position: 3,
              name: "Privacy Policy",
              item: "https://eyeonidea.com/about/policies",
            },
          ],
        },
      }),
    },
  ],
});
</script>

<template>
  <div>
    <h1>Under construction - Policies</h1>
  </div>
</template>

<style></style>
