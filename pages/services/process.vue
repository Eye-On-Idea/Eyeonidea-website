<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("process.meta.title"),
  description: () => t("process.meta.description"),
  ogTitle: () => t("process.meta.title"),
  ogDescription: () => t("process.meta.description"),
  ogType: "website",
  ogUrl: "https://eyeonidea.com/services/process",
  twitterCard: "summary_large_image",
  twitterTitle: () => t("process.meta.title"),
  twitterDescription: () => t("process.meta.description"),
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://eyeonidea.com/services/process",
    },
  ],
});
</script>

<template>
  <div class="process-page">
    <ProcessHero />
    <ProcessTimeline />
    <ProcessFAQ />
    <ProcessCTA />
  </div>
</template>

<style lang="scss" scoped>
.process-page {
  min-height: 100vh;
}
</style>
