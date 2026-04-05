<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <PageHero
    heading-id="process-hero-heading"
    :badge="t('process.hero.badge')"
    :title="t('process.hero.title')"
    :subtitle="t('process.hero.subtitle')"
    bg-image="/images/process/hero.jpg"
    bg-image-position="right center"
    bg-image-position-mobile="right center"
  >
    <template #cta>
      <AppCtaButton variant="primary" :to="localePath('/contact')" :show-icon="true">
        {{ t("process.cta.primary") }}
      </AppCtaButton>
      <AppCtaButton variant="secondary" :to="localePath('/solutions/website-packages')">
        {{ t("process.cta.secondary") }}
      </AppCtaButton>
    </template>
  </PageHero>
</template>
