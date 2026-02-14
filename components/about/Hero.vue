<script setup lang="ts">
import { computed } from "vue";
import { useWindowScroll, usePreferredReducedMotion } from "@vueuse/core";
import { animationPresets, withDelay } from "~/composables/useAccessibleMotion";

const { t } = useI18n();

// Parallax scroll
const { y: scrollY } = useWindowScroll();
const reducedMotion = usePreferredReducedMotion();
const prefersReduced = computed(() => reducedMotion.value === "reduce");

const bgGradientStyle = computed(() =>
  prefersReduced.value ? {} : { transform: `translateY(${scrollY.value * 0.3}px)` }
);
const bgPatternStyle = computed(() =>
  prefersReduced.value ? {} : { transform: `translateY(${scrollY.value * 0.15}px)` }
);
</script>

<template>
  <section
    class="about-hero"
    aria-labelledby="about-hero-heading"
  >
    <!-- Background -->
    <div class="hero-background" aria-hidden="true">
      <div class="bg-gradient" :style="bgGradientStyle" />
      <ClientOnly>
        <ThreeParticleWaves
          :particle-count="2000"
          :wave-amplitude="0.5"
          class="hero-particles"
        />
      </ClientOnly>
      <div class="bg-pattern" :style="bgPatternStyle" />
    </div>

    <!-- Content -->
    <div class="hero-content">
      <span
        class="hero-badge glass-brand"
        v-motion
        :initial="animationPresets.fadeInUp.initial"
        :visible-once="withDelay('fadeInUp', 100).visible"
      >
        {{ t("about.hero.badge") }}
      </span>

      <h1
        id="about-hero-heading"
        class="hero-title"
        style="text-wrap: balance"
      >
        <TextReveal
          :text="t('about.hero.title')"
          word-class="text-gradient"
          :delay="250"
          :stagger="70"
        />
      </h1>

      <p
        class="hero-subtitle"
        v-motion
        :initial="animationPresets.fadeInUp.initial"
        :visible-once="withDelay('fadeInUp', 400).visible"
      >
        {{ t("about.hero.subtitle") }}
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-hero {
  position: relative;
  padding: 10rem 1.5rem 6rem;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 12rem 2rem 8rem;
  }
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bg-gradient {
  position: absolute;
  inset: -20% 0;
  background: var(--color-hero-bg-gradient);
  will-change: transform;
}

.bg-pattern {
  position: absolute;
  inset: -10% 0;
  background:
    radial-gradient(
      ellipse at 25% 35%,
      rgba(223, 175, 133, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 75% 65%,
      rgba(42, 147, 134, 0.08) 0%,
      transparent 50%
    );
  will-change: transform;
}

.hero-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.6;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-accent-200);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: var(--text-4xl);
  color: var(--color-hero-text);
  margin-bottom: 1.5rem;
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: var(--text-5xl);
  }
}

.hero-title :deep(.text-gradient) {
  background-size: 200% auto;
  animation: shimmer 6s ease-in-out infinite;
}

.hero-subtitle {
  font-size: var(--text-lg);
  line-height: 1.7;
  color: var(--color-hero-text-muted);
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: var(--text-xl);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-title :deep(.text-gradient) {
    animation: none;
  }

  .bg-gradient,
  .bg-pattern {
    will-change: auto;
  }
}
</style>
