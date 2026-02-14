<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <BaseCTASection
    :badge="t('services.cta.badge')"
    :title="t('services.cta.title')"
    :description="t('services.cta.description')"
    :primary-text="t('services.cta.primary')"
    primary-to="/contact"
    :secondary-text="t('services.cta.secondary')"
    secondary-to="/news"
    heading-id="services-cta-heading"
  />
</template>
