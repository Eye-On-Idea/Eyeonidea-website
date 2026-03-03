<script setup lang="ts">
const { t } = useI18n();

useSeo({
  title: () => t("contact.meta.title"),
  description: () => t("contact.meta.description"),
  type: "website",
  schemaType: "ContactPage",
  includeWebSiteSchema: false,
  structuredData: {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://eyeonidea.com/#localbusiness",
    name: "Eye On Idea",
    url: "https://eyeonidea.com",
    telephone: "+4529930583",
    email: "hello@eyeonidea.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Aalborg",
      addressRegion: "North Jutland",
      addressCountry: "DK",
    },
    areaServed: ["Denmark", "Nordic Countries", "European Union"],
    priceRange: "$$",
  },
});
</script>

<template>
  <div class="contact-page">
    <ContactHero />
    <ContactForm />
    <ContactInfo />
  </div>
</template>

<style lang="scss" scoped>
.contact-page {
  min-height: 100vh;
}
</style>
