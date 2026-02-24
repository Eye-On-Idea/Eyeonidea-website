<script setup lang="ts">
const { t } = useI18n();

withDefaults(
  defineProps<{
    /** Short description of the image this placeholder represents */
    description: string;
    /** Aspect ratio class — controls placeholder height */
    ratio?: "square" | "video" | "portrait" | "wide";
    /** Whether to show the description text below the icon */
    showDescription?: boolean;
  }>(),
  {
    ratio: "video",
    showDescription: true,
  }
);
</script>

<template>
  <div
    class="image-placeholder"
    :class="`image-placeholder--${ratio}`"
    role="img"
    :aria-label="description"
  >
    <div class="image-placeholder__inner" aria-hidden="true">
      <UIcon name="i-heroicons-photo" class="image-placeholder__icon" />
      <p class="image-placeholder__label">{{ t("common.imagePlaceholder") }}</p>
      <p v-if="showDescription" class="image-placeholder__description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-placeholder {
  position: relative;
  width: 100%;
  border-radius: var(--radius-lg);
  border: 2px dashed color-mix(in srgb, var(--color-text-tertiary) 25%, transparent);
  background: color-mix(in srgb, var(--color-surface-2) 60%, transparent);
  overflow: hidden;

  &--square  { aspect-ratio: 1 / 1; }
  &--video   { aspect-ratio: 16 / 9; }
  &--portrait { aspect-ratio: 3 / 4; }
  &--wide    { aspect-ratio: 21 / 9; }
}

.image-placeholder__inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem;
  text-align: center;
}

.image-placeholder__icon {
  width: 2.5rem;
  height: 2.5rem;
  color: color-mix(in srgb, var(--color-text-tertiary) 40%, transparent);
  flex-shrink: 0;
}

.image-placeholder__label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-tertiary);
}

.image-placeholder__description {
  font-size: var(--text-xs);
  color: color-mix(in srgb, var(--color-text-tertiary) 70%, transparent);
  max-width: 24ch;
  line-height: 1.4;
}
</style>
