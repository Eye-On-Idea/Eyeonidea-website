<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("about.meta.title"),
  description: () => t("about.meta.description"),
  ogTitle: () => t("about.meta.title"),
  ogDescription: () => t("about.meta.description"),
  ogType: "website",
  ogUrl: "https://eyeonidea.com/about",
  twitterCard: "summary_large_image",
  twitterTitle: () => t("about.meta.title"),
  twitterDescription: () => t("about.meta.description"),
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://eyeonidea.com/about",
    },
  ],
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
