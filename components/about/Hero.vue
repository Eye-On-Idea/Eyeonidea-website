<script setup lang="ts">
import { computed } from "vue";
import { useWindowScroll, usePreferredReducedMotion } from "@vueuse/core";

const { t } = useI18n();

const { y: scrollY } = useWindowScroll();
const reducedMotion = usePreferredReducedMotion();
const prefersReduced = computed(() => reducedMotion.value === "reduce");

const bgStyle = computed(() =>
  prefersReduced.value
    ? {}
    : { transform: `translateY(${scrollY.value * 0.2}px)` },
);
</script>

<template>
  <section class="about-hero" aria-labelledby="about-hero-heading">

    <NuxtImg
      src="/images/about/hero.jpg"
      alt=""
      class="hero-image"
      aria-hidden="true"
      width="1920"
      height="1080"
      format="webp"
      quality="82"
      loading="eager"
      fetchpriority="high"
    />

    <div class="hero-image-overlay" aria-hidden="true" />
    <div class="hero-bg" aria-hidden="true" :style="bgStyle" />

    <div class="hero-content">

      <div class="hero-label-row" aria-hidden="true">
        <span class="label-line" />
        <span class="label-diamond" />
        <span class="label-text">{{ t("about.hero.badge") }}</span>
        <span class="label-diamond" />
        <span class="label-line" />
      </div>

      <h1 id="about-hero-heading" class="hero-title">
        <TextReveal
          :text="t('about.hero.title')"
          word-class="word-amber"
          :delay="200"
          :stagger="65"
        />
      </h1>

      <div class="hero-deco-divider" aria-hidden="true">
        <span class="div-line" />
        <span class="div-diamond div-diamond--sm" />
        <span class="div-line div-line--inner" />
        <span class="div-diamond" />
        <span class="div-line div-line--inner" />
        <span class="div-diamond div-diamond--sm" />
        <span class="div-line" />
      </div>

      <p class="hero-subtitle">{{ t("about.hero.subtitle") }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-hero {
  position: relative;
  min-height: 55vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #0d0908;
  padding: 10rem 2rem 7rem;

  @media (min-width: 768px) {
    padding: 12rem 2rem 9rem;
  }
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

.hero-image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(13, 9, 8, 0.62);
  z-index: 1;
}

.hero-bg {
  position: absolute;
  inset: -20% 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 0%, rgba(223, 175, 133, 0.07) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 20% 80%, rgba(223, 175, 133, 0.03) 0%, transparent 50%);
  will-change: transform;
  pointer-events: none;
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 48rem;
  text-align: center;
}

.hero-label-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.label-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);
}

.label-diamond {
  width: 4px;
  height: 4px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.label-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.55);
  flex-shrink: 0;
}

.hero-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  line-height: 1.08;
  letter-spacing: -0.025em;
  color: #ffeddf;
  margin: 0 0 1.5rem;
  text-wrap: balance;
}

:deep(.word-amber) {
  color: rgba(223, 175, 133, 0.85);
}

.hero-deco-divider {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}

.div-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);

  &--inner { flex: 0 0 0.75rem; }
}

.div-diamond {
  width: 6px;
  height: 6px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 3px;
    height: 3px;
    background: rgba(223, 175, 133, 0.2);
  }
}

.hero-subtitle {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.3vw, 1.1rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.5);
  max-width: 44ch;
  margin: 0 auto;
}

@media (prefers-reduced-motion: reduce) {
  .hero-bg { will-change: auto; transform: none !important; }
}

</style>
