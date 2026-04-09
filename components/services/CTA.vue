<script setup lang="ts">
import { withDelay } from "~/composables/useAccessibleMotion";

const { t } = useI18n();
const localePath = useLocalePath();

const cardMotion = withDelay("fadeInUp", 80);
</script>

<template>
  <section
    id="services-cta-section"
    class="services-cta-section"
    aria-labelledby="services-cta-heading"
  >
    <div class="cta-bg-radial" aria-hidden="true" />

    <div class="cta-inner">
      <div
        class="cta-glass"
        v-motion
        :initial="cardMotion.initial"
        :visible-once="cardMotion.visible"
      >

        <div class="deco-frame" aria-hidden="true">
          <span class="corner corner--tl" />
          <span class="corner corner--tr" />
          <span class="corner corner--bl" />
          <span class="corner corner--br" />
        </div>

        <span class="cta-badge">{{ t("services.cta.badge") }}</span>

        <div class="cta-deco-divider" aria-hidden="true">
          <span class="deco-line" />
          <span class="deco-diamond deco-diamond--sm" />
          <span class="deco-line deco-line--inner" />
          <span class="deco-diamond" />
          <span class="deco-line deco-line--inner" />
          <span class="deco-diamond deco-diamond--sm" />
          <span class="deco-line" />
        </div>

        <h2 id="services-cta-heading" class="cta-heading">
          {{ t("services.cta.title") }}
        </h2>

        <p class="cta-description">{{ t("services.cta.description") }}</p>

        <NuxtLink
          :to="localePath('/contact')"
          class="cta-strip"
          :aria-label="t('services.cta.primary')"
        >
          <span class="strip-deco" aria-hidden="true">
            <span class="strip-line" />
            <span class="strip-diamond strip-diamond--sm" />
            <span class="strip-line strip-line--inner" />
            <span class="strip-diamond" />
            <span class="strip-line strip-line--inner" />
            <span class="strip-diamond strip-diamond--sm" />
            <span class="strip-line" />
          </span>
          <span class="strip-label">
            {{ t("services.cta.primary") }}
            <UIcon name="i-heroicons-arrow-right-20-solid" class="strip-icon" />
          </span>
          <span class="strip-deco" aria-hidden="true">
            <span class="strip-line" />
            <span class="strip-diamond strip-diamond--sm" />
            <span class="strip-line strip-line--inner" />
            <span class="strip-diamond" />
            <span class="strip-line strip-line--inner" />
            <span class="strip-diamond strip-diamond--sm" />
            <span class="strip-line" />
          </span>
        </NuxtLink>

        <div class="cta-secondary-row">
          <AppCtaButton
            variant="secondary"
            :to="localePath('/cases')"
          >
            {{ t("services.cta.secondary") }}
          </AppCtaButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.services-cta-section {
  position: relative;
  background: #0d0908;
  padding: 7rem 1.5rem 7rem;
  overflow: hidden;
}

.cta-bg-radial {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 55% 55% at 50% 50%,
    rgba(125, 52, 18, 0.28) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.cta-inner {
  position: relative;
  z-index: 1;
  max-width: 50rem;
  margin: 0 auto;
}

.cta-glass {
  position: relative;
  border-radius: 2px;
  padding: 3.5rem 2rem 2.5rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(223, 175, 133, 0.18);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  box-shadow:
    0 8px 48px rgba(0, 0, 0, 0.45),
    0 0 80px rgba(223, 175, 133, 0.05),
    inset 0 1px 0 rgba(255, 237, 223, 0.07);
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 4.5rem 4rem 3rem;
  }
}

.deco-frame {
  position: absolute;
  inset: 1.25rem;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-color: rgba(223, 175, 133, 0.2);
  border-style: solid;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

.cta-badge {
  display: inline-block;
  margin-bottom: 1.5rem;
  padding: 0.4rem 1.25rem;
  border-radius: 100px;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.9);
  background: rgba(223, 175, 133, 0.12);
  border: 1px solid rgba(223, 175, 133, 0.3);
}

.cta-deco-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  margin-bottom: 1.5rem;
  max-width: 20rem;
  margin-left: auto;
  margin-right: auto;
}

.deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.18);

  &--inner { flex: 0 0 1rem; }
}

.deco-diamond {
  width: 7px;
  height: 7px;
  background: rgba(223, 175, 133, 0.45);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 4px;
    height: 4px;
    background: rgba(223, 175, 133, 0.22);
  }
}

.cta-heading {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.08;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #ffeddf;
  margin: 0 0 1.25rem;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
}

.cta-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  line-height: 1.65;
  color: rgba(255, 237, 223, 0.55);
  max-width: 34rem;
  margin: 0 auto 2.5rem;
}

.cta-strip {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: calc(100% + 4rem);
  margin-left: -2rem;
  margin-right: -2rem;
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  background: #120703;
  border-top: 1px solid rgba(223, 175, 133, 0.14);
  border-bottom: 1px solid rgba(223, 175, 133, 0.14);
  text-decoration: none;
  transition: background 0.35s ease;

  &:hover {
    background: #1e0b04;

    .strip-diamond { background: rgba(223, 175, 133, 0.7); }
    .strip-diamond--sm { background: rgba(223, 175, 133, 0.4); }
    .strip-label { color: #dfaf85; }
    .strip-icon { transform: translateX(4px); }
  }

  &:focus-visible {
    outline: 2px solid #dfaf85;
    outline-offset: -2px;
  }

  @media (min-width: 768px) {
    width: calc(100% + 8rem);
    margin-left: -4rem;
    margin-right: -4rem;
    padding: 1.5rem 3rem;
  }
}

.strip-deco {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.55rem;

  @media (max-width: 767px) { display: none; }
}

.strip-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.2);

  &--inner { flex: 0 0 1.25rem; }
}

.strip-diamond {
  width: 7px;
  height: 7px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;
  transition: background 0.35s ease;

  &--sm {
    width: 4px;
    height: 4px;
    background: rgba(223, 175, 133, 0.22);
  }
}

.strip-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.7);
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.35s ease;

  @media (max-width: 767px) {
    width: 100%;
    justify-content: center;
  }
}

.strip-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.25s ease;
}

.cta-secondary-row {
  display: flex;
  justify-content: center;
}

@media (prefers-reduced-motion: reduce) {
  .cta-strip,
  .strip-diamond,
  .strip-label,
  .strip-icon {
    transition: none;
  }
}

html:not(.dark) {
  .services-cta-section { background: var(--color-section-alt); }

  .cta-bg-radial {
    background: radial-gradient(
      ellipse 55% 55% at 50% 50%,
      rgba(153, 82, 38, 0.08) 0%,
      transparent 70%
    );
  }

  .cta-glass {
    background: rgba(255, 255, 255, 0.70);
    border-color: var(--deco-border);
    box-shadow:
      0 8px 48px rgba(0, 0, 0, 0.06),
      0 0 80px rgba(153, 82, 38, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  .corner { border-color: var(--deco-border); }

  .cta-badge {
    color: var(--color-primary-700);
    background: rgba(153, 82, 38, 0.08);
    border-color: var(--deco-line-strong);
  }

  .deco-line    { background: var(--deco-line); }
  .deco-diamond {
    background: var(--deco-diamond);

    &--sm { background: var(--deco-diamond-sm); }
  }

  .cta-heading     { color: var(--color-text-primary); }
  .cta-description { color: var(--color-text-subtle); }

  .cta-strip {
    background: var(--color-surface-2);
    border-top-color: var(--deco-line);
    border-bottom-color: var(--deco-line);

    &:hover {
      background: var(--color-surface-3);

      .strip-diamond     { background: rgba(153, 82, 38, 0.6); }
      .strip-diamond--sm { background: rgba(153, 82, 38, 0.35); }
      .strip-label       { color: var(--color-primary-700); }
    }

    &:focus-visible { outline-color: var(--color-primary-500); }
  }

  .strip-line    { background: var(--deco-line); }
  .strip-diamond {
    background: var(--deco-diamond);

    &--sm { background: var(--deco-diamond-sm); }
  }
  .strip-label   { color: var(--color-primary-600); }
}
</style>
