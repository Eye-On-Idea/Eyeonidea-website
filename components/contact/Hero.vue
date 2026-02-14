<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <BaseHero
    :badge="t('contact.hero.badge')"
    :title="t('contact.hero.title')"
    :subtitle="t('contact.hero.subtitle')"
    heading-id="contact-hero-heading"
  />
</template>
