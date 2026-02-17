<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <NuxtLink to="/client-hub/onboarding" class="onboarding-cta group block">
    <GlassCard variant="solid" hover-effect="lift" :padding="false">
      <div class="onboarding-accent-border" />
      <div class="p-4 md:p-6">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-xl bg-accent-500/10 shrink-0 group-hover:bg-accent-500/15 transition-colors">
            <Icon
              name="i-heroicons-academic-cap"
              class="w-7 h-7 text-accent-500"
              aria-hidden="true"
            />
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-bold text-(--color-text-primary) group-hover:text-accent-600 transition-colors">
              {{ t("clientHub.onboarding.title") }}
            </h2>
            <p class="text-sm text-(--color-text-secondary) mt-0.5 leading-relaxed">
              {{ t("clientHub.onboarding.ctaDescription") }}
            </p>
          </div>
          <div class="flex items-center gap-1.5 text-sm font-medium text-accent-600 shrink-0">
            <span class="hidden sm:inline">{{ t("clientHub.onboarding.ctaButton") }}</span>
            <Icon
              name="i-heroicons-arrow-right"
              class="w-5 h-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </GlassCard>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.onboarding-accent-border {
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--color-accent-500, #2a9386),
    var(--color-primary-500, #995226)
  );
}

@media (prefers-reduced-motion: reduce) {
  .onboarding-cta * {
    transition-duration: 0.01ms !important;
  }
}
</style>
