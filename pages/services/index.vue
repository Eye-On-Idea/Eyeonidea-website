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

    <!-- Sticky Section Navigation — Services-only: only page with 8+ scrollable sections -->
    <ServicesSectionNav />

    <!-- Website Packages Cards -->
    <ServicesPackagesSection />

    <!-- Feature Comparison Table — Services-only: plan comparison specific to offerings -->
    <ServicesComparisonTable />

    <!-- Add-ons & Extras -->
    <ServicesAddonsSection />

    <!-- Visual Identity -->
    <ServicesIdentitySection />

    <!-- CMS Solutions -->
    <ServicesCMSSection />

    <!-- Support Plans -->
    <ServicesSupportPlans />

    <!-- How We Work -->
    <ServicesHowWeWorkSection />

    <!-- Before/After Results — Services-only: results showcase unique to services -->
    <ServicesBeforeAfter />

    <!-- CTA Section -->
    <ServicesCTA />
  </div>
</template>

<style lang="scss" scoped>
.services-page {
  min-height: 100vh;
}

/* Offset smooth-scroll targets for sticky header + section nav */
:deep(#packages-section),
:deep(#comparison-section),
:deep(#addons-section),
:deep(#identity-section),
:deep(#cms-section),
:deep(#support-plans),
:deep(#how-we-work-section),
:deep(#before-after-section) {
  scroll-margin-top: 136px;
}
</style>
