<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  src?: string;
  alt: string;
  caption?: string;
  aspectRatio?: "16/9" | "4/3" | "3/2" | "3/4" | "1/1";
  borderRadius?: string;
}>();

const loaded = ref(false);
const hasError = ref(false);
const hasSrc = computed(() => !!props.src);

const isLightboxOpen = ref(false);
const dialogRef = ref<HTMLElement | null>(null);

const onLoad = () => {
  loaded.value = true;
};

const onError = () => {
  hasError.value = true;
};

const openLightbox = () => {
  if (loaded.value && !hasError.value) {
    isLightboxOpen.value = true;
  }
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
};

watch(isLightboxOpen, (open) => {
  if (open) {
    document.body.style.overflow = "hidden";
    nextTick(() => dialogRef.value?.focus());
  } else {
    document.body.style.overflow = "";
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <figure class="article-image" role="figure" :aria-label="caption || alt">
    <div
      class="article-image__wrapper"
      :style="{
        aspectRatio: aspectRatio || '16/9',
        borderRadius: borderRadius || '0.75rem',
      }"
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

      <!-- Clickable image with expand affordance -->
      <button
        v-if="hasSrc && !hasError"
        type="button"
        class="article-image__btn"
        :class="{ 'article-image__btn--ready': loaded }"
        :aria-label="`${t('clientHub.article.viewFullSize')}: ${alt}`"
        :disabled="!loaded"
        @click="openLightbox"
      >
        <NuxtImg
          :src="src"
          :alt="alt"
          format="webp"
          class="article-image__img"
          :class="{ 'article-image__img--loaded': loaded }"
          loading="lazy"
          @load="onLoad"
          @error="onError"
        />

        <!-- Expand hint icon -->
        <div
          v-if="loaded"
          class="article-image__expand-hint"
          aria-hidden="true"
        >
          <UIcon name="i-lucide-expand" class="w-4 h-4 text-white" />
        </div>
      </button>
    </div>

    <figcaption v-if="caption" class="article-image__caption">
      {{ caption }}
    </figcaption>
  </figure>

  <!-- Lightbox -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isLightboxOpen"
        ref="dialogRef"
        class="article-image__lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="alt"
        tabindex="-1"
        @click="closeLightbox"
        @keydown.escape="closeLightbox"
      >
        <!-- Close button -->
        <button
          type="button"
          class="article-image__lightbox-close"
          :aria-label="t('clientHub.article.closeFullSize')"
          @click="closeLightbox"
        >
          <UIcon name="i-lucide-x" class="w-5 h-5" />
        </button>

        <!-- Full-size image -->
        <div class="article-image__lightbox-inner" @click.stop>
          <NuxtImg
            :src="src"
            :alt="alt"
            format="webp"
            class="article-image__lightbox-img"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.article-image {
  margin: 1.5rem 0;
}

.article-image__wrapper {
  position: relative;
  width: 100%;
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

.article-image__btn {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  background: none;
  cursor: default;
  display: block;
}

.article-image__btn--ready {
  cursor: zoom-in;
}

.article-image__btn:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.article-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s var(--ease-smooth, ease);
  display: block;
}

.article-image__img--loaded {
  opacity: 1;
}

.article-image__expand-hint {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem;
  border-radius: 0.375rem;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.2s var(--ease-smooth, ease);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.article-image__btn--ready:hover .article-image__expand-hint {
  opacity: 1;
}

.article-image__caption {
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
  text-align: center;
}

/* Lightbox */
.article-image__lightbox {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

.article-image__lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
}

.article-image__lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.article-image__lightbox-close:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

.article-image__lightbox-inner {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.article-image__lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
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
  .article-image__img,
  .article-image__expand-hint {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }

  .article-image__img {
    opacity: 1;
  }
}
</style>
