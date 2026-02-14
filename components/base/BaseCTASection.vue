<script setup lang="ts">
import {
  animationPresets,
  withDelay,
  staggeredFadeInUp,
} from "~/composables/useAccessibleMotion";

withDefaults(
  defineProps<{
    /** Badge text above the title */
    badge?: string;
    /** CTA heading text */
    title?: string;
    /** Description text below the heading */
    description?: string;
    /** Primary CTA button text */
    primaryText?: string;
    /** Primary CTA button link */
    primaryTo?: string;
    /** Secondary CTA button text */
    secondaryText?: string;
    /** Secondary CTA button link */
    secondaryTo?: string;
    /** aria-labelledby ID for the heading */
    headingId?: string;
  }>(),
  {
    headingId: "cta-heading",
    primaryTo: "/contact",
  }
);
</script>

<template>
  <section
    class="base-cta"
    :aria-labelledby="headingId"
  >
    <div class="cta-background" aria-hidden="true">
      <div class="bg-gradient" />
      <div class="bg-pattern" />
    </div>

    <div class="cta-content">
      <span
        v-if="badge"
        class="cta-badge glass-brand"
        v-motion
        :initial="animationPresets.scaleIn.initial"
        :visible-once="animationPresets.scaleIn.visible"
      >
        {{ badge }}
      </span>

      <h2
        :id="headingId"
        class="cta-title"
        style="text-wrap: balance"
        v-motion
        :initial="animationPresets.fadeInUpScale.initial"
        :visible-once="withDelay('fadeInUpScale', 150).visible"
      >
        {{ title }}
      </h2>

      <p
        v-if="description"
        class="cta-description"
        v-motion
        :initial="animationPresets.fadeInUp.initial"
        :visible-once="withDelay('fadeInUp', 300).visible"
      >
        {{ description }}
      </p>

      <div
        v-if="primaryText || secondaryText"
        class="cta-actions"
        v-motion
        :initial="animationPresets.fadeInUp.initial"
        :visible-once="withDelay('fadeInUp', 450).visible"
      >
        <NuxtLink v-if="primaryText" :to="primaryTo" class="btn-primary">
          {{ primaryText }}
          <UIcon name="i-heroicons-arrow-right" class="btn-icon" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink v-if="secondaryText && secondaryTo" :to="secondaryTo" class="btn-secondary">
          {{ secondaryText }}
        </NuxtLink>
      </div>

      <slot name="extra" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.base-cta {
  position: relative;
  padding: 6rem 1.5rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 10rem 2rem;
  }
}

.cta-background {
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
  background:
    radial-gradient(
      ellipse at 25% 30%,
      rgba(223, 175, 133, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 75% 70%,
      rgba(42, 147, 134, 0.1) 0%,
      transparent 50%
    );
}

// Scroll-driven background effect (progressive enhancement)
@supports (animation-timeline: view()) {
  .bg-pattern {
    animation: ctaPatternReveal linear;
    animation-timeline: view();
    animation-range: entry 0% entry 100%;
  }

  @keyframes ctaPatternReveal {
    from { opacity: 0.4; transform: scale(1.1); }
    to { opacity: 1; transform: scale(1); }
  }
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.cta-badge {
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

.cta-title {
  font-size: var(--text-3xl);
  color: var(--color-hero-text);
  margin-bottom: 1.25rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.cta-description {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-hero-text-muted);
  margin-bottom: 2.5rem;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  min-height: 48px;
  background: var(--color-primary-500);
  color: white;
  font-size: var(--text-base);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background 0.2s var(--ease-smooth), transform 0.2s var(--ease-smooth);

  &:hover {
    background: var(--color-primary-600);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent-300);
    outline-offset: 2px;
  }
}

.btn-icon {
  width: 1.125rem;
  height: 1.125rem;
  transition: transform 0.2s var(--ease-smooth);

  .btn-primary:hover & {
    transform: translateX(3px);
  }
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  min-height: 48px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: var(--color-hero-text);
  font-size: var(--text-base);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background 0.2s var(--ease-smooth), border-color 0.2s var(--ease-smooth);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent-300);
    outline-offset: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-icon {
    transition: none;
  }
}
</style>
