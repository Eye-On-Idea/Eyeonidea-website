<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <BaseCTASection
    :badge="t('process.cta.badge')"
    :title="t('process.cta.title')"
    :description="t('process.cta.description')"
    :primary-text="t('process.cta.primary')"
    primary-to="/contact"
    :secondary-text="t('process.cta.secondary')"
    secondary-to="/services"
    heading-id="process-cta-heading"
  />
</template>
