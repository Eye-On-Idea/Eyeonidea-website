<script lang="ts" setup>
// SEO Meta Tags
useHead({
  title: "Legal Information - Terms & Conditions",
  meta: [
    {
      name: "description",
      content:
        "Legal information, terms and conditions, and compliance details for Eye On Idea services.",
    },
    {
      name: "robots",
      content: "noindex, nofollow",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Legal Information - Eye On Idea",
    },
    {
      property: "og:description",
      content:
        "Legal information, terms and conditions, and compliance details for Eye On Idea services.",
    },
    { property: "og:url", content: "https://eyeonidea.com/about/legal" },
    { property: "og:type", content: "website" },
  ],
  link: [{ rel: "canonical", href: "https://eyeonidea.com/about/legal" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://eyeonidea.com/about/legal#webpage",
        name: "Legal - Eye On Idea",
        url: "https://eyeonidea.com/about/legal",
        description: "Legal information and terms for Eye On Idea services.",
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
              name: "Legal",
              item: "https://eyeonidea.com/about/legal",
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
    <h1>Under construction - Legal</h1>
  </div>
</template>

<style></style>
