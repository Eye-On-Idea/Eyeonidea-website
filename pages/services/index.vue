<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("services.meta.title"),
  description: () => t("services.meta.description"),
  ogTitle: () => t("services.meta.title"),
  ogDescription: () => t("services.meta.description"),
  ogType: "website",
  ogUrl: "https://eyeonidea.com/services",
  twitterCard: "summary_large_image",
  twitterTitle: () => t("services.meta.title"),
  twitterDescription: () => t("services.meta.description"),
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://eyeonidea.com/services",
    },
  ],
});
</script>

<template>
  <div class="services-page">
    <!-- Hero Section -->
    <ServicesHero />

    <!-- Website Packages Cards -->
    <ServicesPackagesSection />

    <!-- Feature Comparison Table -->
    <ServicesComparisonTable />

    <!-- Add-ons & Extras -->
    <ServicesAddonsSection />

    <!-- Visual Identity -->
    <ServicesIdentitySection />

    <!-- CMS Solutions -->
    <ServicesCMSSection />

    <!-- Support Plans -->
    <ServicesSupportPlans />

    <!-- CTA Section -->
    <ServicesCTA />
  </div>
</template>

<style lang="scss" scoped>
.services-page {
  min-height: 100vh;
}
</style>
