<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useWindowScroll, usePreferredReducedMotion } from "@vueuse/core";

interface Props {
  headingId: string;
  badge: string;
  title: string;
  subtitle: string;
  bgImage?: string;
  bgImageAlt?: string;
  bgImagePosition?: string;
  bgImagePositionMobile?: string;
}

const props = withDefaults(defineProps<Props>(), {
  bgImagePosition: "center",
  bgImagePositionMobile: "center",
});

const {
  headingId,
  badge,
  title,
  subtitle,
  bgImage,
  bgImageAlt,
  bgImagePosition,
  bgImagePositionMobile,
} = toRefs(props);

const { y: scrollY } = useWindowScroll();
const reducedMotion = usePreferredReducedMotion();
const prefersReduced = computed(() => reducedMotion.value === "reduce");

const heroImageStyle = computed(() => ({
  "--hero-image-position": bgImagePosition.value,
  "--hero-image-position-mobile": bgImagePositionMobile.value,
}));

const bgStyle = computed(() =>
  prefersReduced.value
    ? {}
    : { transform: `translateY(${scrollY.value * 0.18}px)` },
);
</script>

<template>
  <section class="page-hero" :aria-labelledby="headingId">

    <NuxtImg
      v-if="bgImage"
      :src="bgImage"
      :alt="bgImageAlt || ''"
      :style="heroImageStyle"
      class="hero-image"
      aria-hidden="true"
      width="1920"
      height="1080"
      format="webp"
      quality="82"
      loading="eager"
      fetchpriority="high"
    />

    <div v-if="bgImage" class="hero-image-overlay" aria-hidden="true" />

    <div class="hero-bg" aria-hidden="true" :style="bgStyle" />

    <div class="deco-frame" aria-hidden="true">
      <span class="corner corner--tl" />
      <span class="corner corner--tr" />
      <span class="corner corner--bl" />
      <span class="corner corner--br" />
    </div>

    <div class="hero-container">

      <div class="hero-content">

        <div class="hero-label-row" aria-hidden="true">
          <span class="label-line" />
          <span class="label-diamond" />
          <span class="label-text">{{ badge }}</span>
          <span class="label-diamond" />
          <span class="label-line label-line--trail" />
        </div>

        <h1 :id="headingId" class="hero-title">
          <TextReveal
            :text="title"
            word-class="word-amber"
            :trigger-on-mount="true"
            :delay="250"
            :stagger="55"
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

        <p class="hero-subtitle">{{ subtitle }}</p>

        <div v-if="$slots.cta" class="hero-cta">
          <slot name="cta" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.page-hero {
  position: relative;
  min-height: 85vh;
  min-height: 85dvh;
  display: flex;
  background: #0d0908;
  overflow: hidden;

  padding: 9rem 2rem 5rem;

  @media (min-width: 768px) {
    padding: 11rem 2rem 6rem;
  }
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: var(--hero-image-position, center);
  z-index: 0;
}

@media (max-width: 1023px) {
  .hero-image {
    object-position: var(--hero-image-position-mobile, center);
  }
}

.hero-image-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to right,
      rgba(13, 9, 8, 0.88) 0%,
      rgba(13, 9, 8, 0.62) 40%,
      rgba(13, 9, 8, 0.32) 65%,
      rgba(13, 9, 8, 0.12) 100%
    ),
    linear-gradient(to bottom, rgba(13, 9, 8, 0.25) 0%, transparent 40%, rgba(13, 9, 8, 0.4) 100%);
  z-index: 1;
}

.hero-bg {
  position: absolute;
  inset: -25% 0;
  background:
    radial-gradient(ellipse 75% 55% at 18% 45%, rgba(223, 175, 133, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 55% 40% at 80% 85%, rgba(223, 175, 133, 0.03) 0%, transparent 55%);
  will-change: transform;
  pointer-events: none;
  z-index: 2;
}

.hero-container {
  flex: 1;
  max-width: 90rem;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
}

.deco-frame {
  position: absolute;
  inset: 2rem;
  pointer-events: none;
  z-index: 5;
}

.corner {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-color: rgba(223, 175, 133, 0.2);
  border-style: solid;

  &::after {
    content: "";
    position: absolute;
    width: 0.85rem;
    height: 0.85rem;
    border-style: solid;
    border-color: rgba(223, 175, 133, 0.1);
  }

  &--tl { top: 0;    left: 0;  border-width: 1px 0 0 1px; }
  &--tl::after { top: 5px; left: 5px; border-width: 1px 0 0 1px; }

  &--tr { top: 0;    right: 0; border-width: 1px 1px 0 0; }
  &--tr::after { top: 5px; right: 5px; border-width: 1px 1px 0 0; }

  &--bl { bottom: 0; left: 0;  border-width: 0 0 1px 1px; }
  &--bl::after { bottom: 5px; left: 5px; border-width: 0 0 1px 1px; }

  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
  &--br::after { bottom: 5px; right: 5px; border-width: 0 1px 1px 0; }
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 52rem;
  padding: 2rem 0;
}

.hero-label-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  max-width: 22rem;
}

.label-line {
  flex: 0 0 1.5rem;
  height: 1px;
  background: rgba(223, 175, 133, 0.2);

  &--trail { flex: 1; }
}

.label-diamond {
  width: 4px;
  height: 4px;
  background: rgba(223, 175, 133, 0.45);
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
  font-size: clamp(2.5rem, 5.5vw, 4.5rem);
  line-height: 1.06;
  letter-spacing: -0.025em;
  color: #ffeddf;
  margin: 0 0 1.75rem;
}

:deep(.word-amber) {
  color: rgba(223, 175, 133, 0.85);
}

.hero-deco-divider {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 1.5rem;
  max-width: 18rem;
}

.div-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.14);

  &--inner { flex: 0 0 0.875rem; }
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
  font-size: clamp(1rem, 1.4vw, 1.1rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.55);
  max-width: 55ch;
  margin: 0 0 2.5rem;
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (prefers-reduced-motion: reduce) {
  .hero-bg {
    will-change: auto;
    transform: none !important;
  }
}

</style>
