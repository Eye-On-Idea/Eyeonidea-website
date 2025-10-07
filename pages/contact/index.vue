<script lang="ts" setup>
import ContactForm from "~/components/contact/ContactForm.vue";
import ContactIntro from "~/components/contact/ContactIntro.vue";

// SEO Meta Tags
useHead({
  title: "Contact Us - Get in Touch with Eye On Idea",
  meta: [
    {
      name: "description",
      content:
        "Contact Eye On Idea for professional QA testing services. Reach out to discuss your accessibility, usability, and front-end testing needs for your digital products.",
    },
    {
      name: "keywords",
      content:
        "contact Eye On Idea, QA consultation, accessibility testing inquiry, get in touch, request quote",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Contact Us - Get in Touch with Eye On Idea",
    },
    {
      property: "og:description",
      content:
        "Contact Eye On Idea for professional QA testing services. Reach out to discuss your accessibility, usability, and front-end testing needs.",
    },
    {
      property: "og:image",
      content: "https://eyeonidea.com/public-material/Company Page Banner.png",
    },
    { property: "og:url", content: "https://eyeonidea.com/contact" },
    { property: "og:type", content: "website" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Contact Us - Get in Touch with Eye On Idea",
    },
    {
      name: "twitter:description",
      content:
        "Contact Eye On Idea for professional QA testing services. Discuss your digital product quality needs.",
    },
    {
      name: "twitter:image",
      content: "https://eyeonidea.com/public-material/Company Page Banner.png",
    },
  ],
  link: [{ rel: "canonical", href: "https://eyeonidea.com/contact" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": "https://eyeonidea.com/contact#webpage",
        name: "Contact - Eye On Idea",
        url: "https://eyeonidea.com/contact",
        description:
          "Contact Eye On Idea for professional QA testing services.",
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
              name: "Contact",
              item: "https://eyeonidea.com/contact",
            },
          ],
        },
        mainEntity: {
          "@type": "Organization",
          name: "Eye On Idea",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            availableLanguage: ["English", "Danish"],
            areaServed: "EU",
          },
        },
      }),
    },
  ],
});
</script>

<template>
  <ContactIntro />
  <ContactForm />
</template>

<style></style>
