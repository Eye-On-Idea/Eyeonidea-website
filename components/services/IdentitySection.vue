<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();
const localePath = useLocalePath();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const carouselImages = [
  {
    src: "/images/visual-identity/eoi-light-bg.png",
    alt: t("services.identity.carousel.eoiLight"),
  },
  {
    src: "/images/visual-identity/eoi-dark-bg.png",
    alt: t("services.identity.carousel.eoiDark"),
  },
  {
    src: "/images/visual-identity/herqulez-logo-package.png",
    alt: t("services.identity.carousel.herqulez"),
  },
];

onMounted(() => {
  if (!sectionRef.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <section
    id="identity-section"
    ref="sectionRef"
    class="identity-section"
    aria-labelledby="identity-heading"
  >

    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("services.identity.title") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-container">
      <div class="content-grid" :class="{ 'animate-in': isVisible }">

        <div class="main-content">
          <h2 id="identity-heading" class="section-title">
            {{ t("services.identity.title") }}
          </h2>

          <div class="deco-divider" aria-hidden="true">
            <span class="deco-line" />
            <span class="deco-diamond" />
            <span class="deco-line" />
          </div>

          <p class="section-description">{{ t("services.identity.description") }}</p>

          <div class="includes-block">
            <ul class="includes-list">
              <li
                v-for="(item, index) in (tm('services.identity.includes') as string[])"
                :key="index"
                class="include-item"
              >
                <span class="include-diamond" aria-hidden="true" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <AppCtaButton
            variant="primary"
            :to="localePath('/contact')"
            :show-icon="true"
            class="identity-cta"
          >
            {{ t("services.identity.cta") }}
          </AppCtaButton>
        </div>

        <div class="carousel-panel">
          <div class="carousel-frame">

            <div class="deco-frame" aria-hidden="true">
              <span class="corner corner--tl" />
              <span class="corner corner--tr" />
              <span class="corner corner--bl" />
              <span class="corner corner--br" />
            </div>

            <UCarousel
              :items="carouselImages"
              arrows
              dots
              loop
              :autoplay="{ delay: 5000, stopOnInteraction: true }"
              fade
              class="carousel"
              :ui="{
                root: 'w-full',
                item: 'min-w-0 flex-[0_0_100%]',
                controls: 'mt-3 justify-center',
                dot: 'carousel-dot',
              }"
            >
              <template #default="{ item }">
                <figure class="carousel-slide">
                  <NuxtImg
                    :src="item.src"
                    :alt="item.alt"
                    width="800"
                    height="600"
                    format="webp"
                    quality="85"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
                    class="carousel-image"
                  />
                </figure>
              </template>
            </UCarousel>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.identity-section {
  background: #0d0908;
  padding-bottom: 0;
}

.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 2rem 3rem;
}

.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.sep-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.sep-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  flex-shrink: 0;
}

.section-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s var(--ease-smooth),
    transform 0.7s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 5rem;
    align-items: start;
  }
}

.main-content {
  display: flex;
  flex-direction: column;
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: #ffeddf;
  margin: 0 0 1.25rem;
}

.deco-divider {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);
}

.deco-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.section-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.1vw, 1.05rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.55);
  max-width: 46ch;
  margin: 0 0 2rem;
}

.includes-block {
  margin-bottom: 2.25rem;
}

.includes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.include-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-text);
  font-size: 0.875rem;
  color: rgba(255, 237, 223, 0.6);
  line-height: 1.45;
}

.include-diamond {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.45);
  transform: rotate(45deg);
}

.carousel-panel {
  @media (min-width: 1024px) {
    position: sticky;
    top: 7rem;
  }
}

.carousel-frame {
  position: relative;
  background: #161210;
  border: 1px solid rgba(223, 175, 133, 0.15);
  border-radius: 2px;
  overflow: hidden;
  padding: 1.5rem;
}

.deco-frame {
  position: absolute;
  inset: 0.75rem;
  pointer-events: none;
  z-index: 1;
}

.corner {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-color: rgba(223, 175, 133, 0.2);
  border-style: solid;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

.carousel {
  border-radius: 0;
  overflow: hidden;
}

.carousel-slide {
  margin: 0;
  width: 100%;
}

.carousel-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.carousel :deep(.carousel-dot) {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: rgba(223, 175, 133, 0.2);
  cursor: pointer;
  transition: background 0.2s ease;
  min-height: 0;

  &[data-state="active"] {
    background: rgba(223, 175, 133, 0.7);
  }
}

.carousel :deep([data-slot="prev"]),
.carousel :deep([data-slot="next"]) {
  color: rgba(223, 175, 133, 0.6);
  border-color: rgba(223, 175, 133, 0.15);
  background: rgba(13, 9, 8, 0.8);

  &:hover:not(:disabled) {
    color: #dfaf85;
    border-color: rgba(223, 175, 133, 0.3);
    background: rgba(30, 18, 10, 0.9);
  }

  &:disabled {
    opacity: 0.25;
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-grid {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .carousel :deep(.carousel-dot) {
    transition: none;
  }
}

html:not(.dark) {
  .identity-section { background: var(--color-section-alt); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title    { color: var(--color-text-primary); }
  .deco-line        { background: var(--deco-line); }
  .deco-diamond     { background: var(--deco-diamond); }
  .section-description { color: var(--color-text-subtle); }

  .include-item   { color: var(--color-text-secondary); }
  .include-diamond { background: rgba(153, 82, 38, 0.45); }

  .carousel-frame {
    background: rgba(255, 255, 255, 0.80);
    border-color: var(--deco-line);
  }

  .corner { border-color: var(--deco-border); }

  .carousel :deep(.carousel-dot) {
    background: rgba(153, 82, 38, 0.2);

    &[data-state="active"] { background: rgba(153, 82, 38, 0.65); }
  }

  .carousel :deep([data-slot="prev"]),
  .carousel :deep([data-slot="next"]) {
    color: var(--color-primary-600);
    border-color: var(--deco-line);
    background: rgba(255, 255, 255, 0.85);

    &:hover:not(:disabled) {
      color: var(--color-primary-700);
      border-color: var(--deco-line-strong);
      background: rgba(255, 255, 255, 0.95);
    }
  }
}
</style>
