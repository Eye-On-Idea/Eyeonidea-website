<script setup lang="ts">
import { animationPresets } from "~/composables/useAccessibleMotion";

withDefaults(
  defineProps<{
    /** Badge text displayed above the title */
    badge?: string;
    /** Heading text - used with TextReveal when showTextReveal is true */
    title?: string;
    /** Subtitle text below the heading */
    subtitle?: string;
    /** Minimum height of the hero section */
    minHeight?: string;
    /** Whether to wrap the title in TextReveal */
    showTextReveal?: boolean;
    /** Delay for TextReveal animation (ms) */
    textRevealDelay?: number;
    /** aria-labelledby ID for the heading */
    headingId?: string;
  }>(),
  {
    minHeight: "45vh",
    showTextReveal: false,
    textRevealDelay: 200,
    headingId: "hero-heading",
  }
);
</script>

<template>
  <section
    class="base-hero"
    :style="{ minHeight }"
    :aria-labelledby="headingId"
  >
    <!-- Background -->
    <div class="hero-background" aria-hidden="true">
      <div class="bg-gradient" />
      <div class="bg-pattern">
        <slot name="background" />
      </div>
    </div>

    <!-- Content -->
    <div class="hero-content">
      <div
        class="content-wrapper"
        v-motion
        :initial="animationPresets.fadeInUp.initial"
        :enter="animationPresets.fadeInUp.visible"
      >
        <span v-if="badge" class="hero-badge glass-brand">
          {{ badge }}
        </span>

        <slot name="title">
          <h1 v-if="title" :id="headingId" class="hero-title">
            <TextReveal
              v-if="showTextReveal"
              :text="title"
              :delay="textRevealDelay"
            />
            <template v-else>{{ title }}</template>
          </h1>
        </slot>

        <p v-if="subtitle" class="hero-subtitle">
          {{ subtitle }}
        </p>

        <slot name="after-subtitle" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.base-hero {
  position: relative;
  padding: 10rem 1.5rem 6rem;
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
  inset: 0;
  background: var(--color-hero-bg-gradient);
}

.bg-pattern {
  position: absolute;
  inset: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
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
</style>
