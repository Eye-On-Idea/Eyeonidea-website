<script setup lang="ts">
const { t } = useI18n();

useSeo({
  title: () => t("services.meta.title"),
  description: () => t("services.meta.description"),
  type: "website",
  schemaType: "WebPage",
  includeWebSiteSchema: false,
  breadcrumbs: [
    { name: "Home", url: "https://eyeonidea.com" },
    { name: "Solutions", url: "https://eyeonidea.com/solutions" },
  ],
});
</script>

<template>
  <div class="services-page">
    <ServicesHero />
    <ServicesSectionNav />
    <ServicesPackagesSection />
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
