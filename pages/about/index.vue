<script setup lang="ts">
const { t } = useI18n();

useSeo({
  title: () => t("about.meta.title"),
  description: () => t("about.meta.description"),
  type: "website",
  schemaType: "AboutPage",
  includeWebSiteSchema: false,
});
</script>

<template>
  <div class="about-page">
    <AboutHero />
    <AboutStory />
    <AboutFounder />
    <AboutValues />
    <AboutLocation />
    <AboutCTA />
  </div>
</template>

<style lang="scss" scoped>
.about-page {
  min-height: 100vh;
}
</style>
