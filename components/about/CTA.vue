<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <BaseCTASection
    :badge="t('about.cta.badge')"
    :title="t('about.cta.title')"
    :description="t('about.cta.description')"
    :primary-text="t('about.cta.primary')"
    primary-to="/contact"
    :secondary-text="t('about.cta.secondary')"
    secondary-to="/services"
    heading-id="about-cta-heading"
  />
</template>
