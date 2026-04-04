<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <PageHero
    heading-id="solutions-hero-heading"
    :badge="t('services.hero.badge')"
    :title="t('services.hero.title')"
    :subtitle="t('services.hero.subtitle')"
  >
    <template #cta>
      <AppCtaButton variant="primary" :to="localePath('/contact')" :show-icon="true">
        {{ t("services.cta.primary") }}
      </AppCtaButton>
      <AppCtaButton variant="secondary" :to="localePath('/cases')">
        {{ t("services.cta.secondary") }}
      </AppCtaButton>
    </template>
  </PageHero>
</template>
