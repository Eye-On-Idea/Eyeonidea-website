<script setup lang="ts">
const { t } = useI18n();

defineProps<{
  description: string;
}>();
</script>

<template>
  <div
    class="screenshot-placeholder flex flex-col items-center justify-center gap-2 p-8 my-4 rounded-xl border-2 border-dashed border-(--color-text-tertiary)/20 bg-(--color-surface-2)/50"
    role="img"
    :aria-label="`Screenshot placeholder: ${description}`"
  >
    <Icon
      name="i-heroicons-photo"
      class="w-8 h-8 text-(--color-text-tertiary)/40"
      aria-hidden="true"
    />
    <p class="text-sm text-(--color-text-tertiary) text-center">
      {{ t("clientHub.article.screenshotPlaceholder") }}
    </p>
    <p class="text-xs text-(--color-text-tertiary)/60 text-center">
      {{ description }}
    </p>
  </div>
</template>
