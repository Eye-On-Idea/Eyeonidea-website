<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("contact.meta.title"),
  description: () => t("contact.meta.description"),
  ogTitle: () => t("contact.meta.title"),
  ogDescription: () => t("contact.meta.description"),
  ogType: "website",
  ogUrl: "https://eyeonidea.com/contact",
  twitterCard: "summary_large_image",
  twitterTitle: () => t("contact.meta.title"),
  twitterDescription: () => t("contact.meta.description"),
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://eyeonidea.com/contact",
    },
  ],
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
