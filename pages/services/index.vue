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
    <ServicesHero />
    <ServicesSectionNav />
    <ServicesOverviewSection />
    <ServicesHowWeWorkSection />
    <ServicesCTA />
  </div>
</template>

<style lang="scss" scoped>
.services-page {
  min-height: 100vh;
}

:deep(#overview-websites),
:deep(#overview-identity),
:deep(#overview-additional),
:deep(#overview-support),
:deep(#how-we-work-section) {
  scroll-margin-top: 136px;
}
</style>
