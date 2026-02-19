<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  src?: string;
  alt: string;
  caption?: string;
  aspectRatio?: "16/9" | "4/3" | "3/2" | "1/1";
}>();

const loaded = ref(false);
const hasError = ref(false);
const hasSrc = computed(() => !!props.src);

const onLoad = () => {
  loaded.value = true;
};

const onError = () => {
  hasError.value = true;
};
</script>

<template>
  <figure class="article-image" role="figure" :aria-label="caption || alt">
    <div
      class="article-image__wrapper"
      :style="{ aspectRatio: aspectRatio || '16/9' }"
    >
      <!-- Skeleton placeholder (shown when no src, loading, or error) -->
      <div
        v-if="!hasSrc || !loaded || hasError"
        class="article-image__skeleton"
        :class="{ 'article-image__skeleton--permanent': !hasSrc }"
        role="img"
        :aria-label="!hasSrc ? t('clientHub.article.screenshotPlaceholder') : alt"
      >
        <Icon
          name="i-heroicons-photo"
          class="w-8 h-8 text-(--color-text-tertiary)"
          aria-hidden="true"
        />
        <span v-if="!hasSrc" class="text-xs text-(--color-text-tertiary) mt-1">
          {{ t("clientHub.article.screenshotPlaceholder") }}
        </span>
      </div>

      <!-- Actual image (rendered when src is provided) -->
      <img
        v-if="hasSrc && !hasError"
        :src="src"
        :alt="alt"
        class="article-image__img"
        :class="{ 'article-image__img--loaded': loaded }"
        loading="lazy"
        @load="onLoad"
        @error="onError"
      />
    </div>

    <figcaption
      v-if="caption"
      class="article-image__caption"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.article-image {
  margin: 1.5rem 0;
}

.article-image__wrapper {
  position: relative;
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid var(--glass-border-subtle);
  background: var(--color-surface-2);
}

.article-image__skeleton {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-2);
}

.article-image__skeleton:not(.article-image__skeleton--permanent) {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.article-image__skeleton--permanent {
  background: linear-gradient(
    135deg,
    var(--color-surface-2) 0%,
    color-mix(in srgb, var(--color-surface-2) 80%, var(--color-primary-500)) 50%,
    var(--color-surface-2) 100%
  );
  background-size: 200% 200%;
  animation: skeleton-shimmer 3s ease infinite;
}

.article-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s var(--ease-smooth, ease);
}

.article-image__img--loaded {
  opacity: 1;
}

.article-image__caption {
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
  text-align: center;
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes skeleton-shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .article-image__skeleton,
  .article-image__skeleton--permanent,
  .article-image__img {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }

  .article-image__img {
    opacity: 1;
  }
}
</style>
