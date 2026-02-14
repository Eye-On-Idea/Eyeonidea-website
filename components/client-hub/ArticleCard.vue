<script setup lang="ts">
const { t } = useI18n();

defineProps<{
  slug: string;
  categorySlug: string;
  titleKey: string;
  summaryKey: string;
  order: number;
}>();
</script>

<template>
  <NuxtLink
    :to="`/client-hub/${categorySlug}/${slug}`"
    class="article-card group block"
  >
    <div class="flex items-start gap-4 p-4 min-h-11 rounded-xl border border-(--glass-border-subtle) hover:border-primary-400/30 hover:bg-(--color-surface-2) transition-all">
      <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-500/10 text-sm font-bold text-primary-600 shrink-0 mt-0.5">
        {{ order }}
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-base font-semibold text-(--color-text-primary) group-hover:text-primary-500 transition-colors">
          {{ t(titleKey) }}
        </h3>
        <p class="text-sm text-(--color-text-secondary) mt-0.5 line-clamp-2">
          {{ t(summaryKey) }}
        </p>
      </div>
      <Icon
        name="i-heroicons-chevron-right"
        class="w-5 h-5 text-(--color-text-tertiary) group-hover:text-primary-500 transition-all shrink-0 mt-1"
        aria-hidden="true"
      />
    </div>
  </NuxtLink>
</template>
