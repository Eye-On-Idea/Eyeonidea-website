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
  <section class="contact-hero" aria-labelledby="contact-hero-heading">
    <div class="hero-bg" aria-hidden="true" :style="bgStyle" />

    <div class="hero-content">
      <!-- Label row -->
      <div class="hero-label-row" aria-hidden="true">
        <span class="label-line" />
        <span class="label-diamond" />
        <span class="label-text">{{ t("contact.hero.badge") }}</span>
        <span class="label-diamond" />
        <span class="label-line" />
      </div>

      <h1 id="contact-hero-heading" class="hero-title">
        <TextReveal
          :text="t('contact.hero.title')"
          word-class="word-amber"
          :delay="200"
          :stagger="65"
        />
      </h1>

      <!-- Deco divider -->
      <div class="hero-deco-divider" aria-hidden="true">
        <span class="div-line" />
        <span class="div-diamond div-diamond--sm" />
        <span class="div-line div-line--inner" />
        <span class="div-diamond" />
        <span class="div-line div-line--inner" />
        <span class="div-diamond div-diamond--sm" />
        <span class="div-line" />
      </div>

      <p class="hero-subtitle">{{ t("contact.hero.subtitle") }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact-hero {
  position: relative;
  min-height: 50vh;
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

.hero-bg {
  position: absolute;
  inset: -20% 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 0%, rgba(223, 175, 133, 0.07) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 80% 80%, rgba(223, 175, 133, 0.03) 0%, transparent 50%);
  will-change: transform;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 48rem;
  text-align: center;
}

/* ── Label row ────────────────────────────────────────────────── */
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

/* ── Title ────────────────────────────────────────────────────── */
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

/* ── Deco divider ─────────────────────────────────────────────── */
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

/* ── Subtitle ─────────────────────────────────────────────────── */
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

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .contact-hero {
    background: var(--color-hero-bg);
  }

  .hero-bg {
    background:
      radial-gradient(ellipse 70% 60% at 50% 0%, rgba(153, 82, 38, 0.06) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(153, 82, 38, 0.03) 0%, transparent 50%);
  }

  .label-line    { background: var(--deco-line); }
  .label-diamond { background: var(--deco-diamond); }
  .label-text    { color: var(--deco-text); }

  .hero-title { color: #441a08; } /* primary-900 — word spans handled globally in main.css */

  .div-line    { background: var(--deco-line); }
  .div-diamond {
    background: var(--deco-diamond);
    &--sm { background: var(--deco-diamond-sm); }
  }

  .hero-subtitle { color: var(--color-text-subtle); }
}
</style>
