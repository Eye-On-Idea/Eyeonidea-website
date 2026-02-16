<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <BaseHero
    :badge="t('services.hero.badge')"
    :title="t('services.hero.title')"
    :subtitle="t('services.hero.subtitle')"
    heading-id="services-hero-heading"
    min-height="50vh"
    variant="light"
    show-text-reveal
  />
</template>
