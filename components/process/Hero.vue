<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <BaseHero
    :badge="t('process.hero.badge')"
    :title="t('process.hero.title')"
    :subtitle="t('process.hero.subtitle')"
    heading-id="process-hero-heading"
  />
</template>
