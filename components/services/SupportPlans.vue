<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();
const localePath = useLocalePath();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  if (!sectionRef.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.08 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});

const plans = [
  { key: "essential" as const, featured: false },
  { key: "growth" as const, featured: true },
  { key: "partner" as const, featured: false },
];
</script>

<template>
  <section
    id="support-plans"
    ref="sectionRef"
    class="support-plans"
    aria-labelledby="support-heading"
  >
    <!-- Section label row -->
    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("services.support.title") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-container">
      <!-- Header -->
      <div class="section-header">
        <h2 id="support-heading" class="section-title">
          {{ t("services.support.title") }}
        </h2>
        <p class="section-subtitle">{{ t("services.support.subtitle") }}</p>
      </div>

      <!-- Plans grid -->
      <div class="plans-grid">
        <article
          v-for="(plan, index) in plans"
          :key="plan.key"
          class="plan-panel"
          :class="[
            { 'plan-panel--featured': plan.featured },
            { 'animate-in': isVisible },
          ]"
          :style="{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }"
        >
          <!-- Hover gradient overlay -->
          <div class="panel-gradient-layer" aria-hidden="true" />

          <!-- Corner frame -->
          <div class="deco-frame" aria-hidden="true">
            <span class="corner corner--tl" />
            <span class="corner corner--tr" />
            <span class="corner corner--bl" />
            <span class="corner corner--br" />
          </div>

          <!-- Plan name -->
          <div class="plan-numeral-row" aria-hidden="true">
            <span class="plan-rule" />
            <span class="plan-key">{{ t(`services.support.plans.${plan.key}.name`) }}</span>
            <span class="plan-rule" />
          </div>

          <!-- Deco divider -->
          <div class="deco-divider" aria-hidden="true">
            <span class="deco-line" />
            <span class="deco-diamond deco-diamond--sm" />
            <span class="deco-line deco-line--inner" />
            <span class="deco-diamond" />
            <span class="deco-line deco-line--inner" />
            <span class="deco-diamond deco-diamond--sm" />
            <span class="deco-line" />
          </div>

          <!-- Description -->
          <p class="plan-description">
            {{ t(`services.support.plans.${plan.key}.description`) }}
          </p>

          <!-- Pricing -->
          <div class="plan-pricing">
            <span class="price-currency">{{ t(`services.support.plans.${plan.key}.price.currency`) }}</span>
            <span class="price-amount">{{ t(`services.support.plans.${plan.key}.price.amount`) }}</span>
            <span class="price-unit">{{ t(`services.support.plans.${plan.key}.price.unit`) }}</span>
          </div>
          <span class="price-vat">{{ t(`services.support.plans.${plan.key}.price.vatNote`) }}</span>

          <!-- Best for -->
          <p class="plan-best-for">
            {{ t(`services.support.plans.${plan.key}.bestFor`) }}
          </p>

          <!-- Includes -->
          <ul class="plan-includes" role="list">
            <li
              v-for="(item, i) in (tm(`services.support.plans.${plan.key}.includes`) as string[])"
              :key="i"
              class="include-item"
            >
              <span class="include-diamond" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <div class="plan-cta-wrapper">
            <AppCtaButton
              :variant="plan.featured ? 'primary' : 'secondary'"
              :to="localePath('/contact')"
              class="plan-cta-btn"
            >
              {{ t("services.support.cta") }}
            </AppCtaButton>
          </div>
        </article>
      </div>

      <!-- Billing note -->
      <p class="billing-note" :class="{ 'animate-in': isVisible }">
        {{ t("services.support.billing") }}
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.support-plans {
  background: #0d0908;
  padding-bottom: 0;
}

/* ── Section label row ────────────────────────────────────────── */
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

/* ── Container ────────────────────────────────────────────────── */
.section-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

/* ── Header ───────────────────────────────────────────────────── */
.section-header {
  margin-bottom: 3rem;
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  line-height: 1.1;
  color: #fff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.5);
  max-width: 48ch;
  margin: 0;
}

/* ── Plans grid ───────────────────────────────────────────────── */
.plans-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ── Plan panel ───────────────────────────────────────────────── */
.plan-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem;
  background: #161210;
  border: 1px solid rgba(223, 175, 133, 0.12);
  border-radius: 2px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    .panel-gradient-layer { opacity: 1; }
    .corner { border-color: rgba(223, 175, 133, 0.35); }
  }

  &--featured {
    border-color: rgba(223, 175, 133, 0.3);
    background: #1a1410;

    .plan-key { color: #dfaf85; opacity: 1; }
    .price-amount { color: #dfaf85; }
  }
}

/* ── Hover overlay ────────────────────────────────────────────── */
.panel-gradient-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 50% at 50% 0%,
    rgba(223, 175, 133, 0.05) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

/* ── Corner frame ─────────────────────────────────────────────── */
.deco-frame {
  position: absolute;
  inset: 0.875rem;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-color: rgba(223, 175, 133, 0.15);
  border-style: solid;
  transition: border-color 0.3s ease;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

/* ── Plan name row ────────────────────────────────────────────── */
.plan-numeral-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.plan-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);
}

.plan-key {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.55);
  flex-shrink: 0;
  white-space: nowrap;
}

/* ── Deco divider ─────────────────────────────────────────────── */
.deco-divider {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);

  &--inner { flex: 0 0 0.75rem; }
}

.deco-diamond {
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

/* ── Plan description ─────────────────────────────────────────── */
.plan-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.65;
  color: rgba(255, 237, 223, 0.5);
  margin: 0 0 1.5rem;
}

/* ── Pricing ──────────────────────────────────────────────────── */
.plan-pricing {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  margin-bottom: 0.25rem;
}

.price-currency {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 237, 223, 0.6);
  align-self: flex-start;
  margin-top: 0.4rem;
}

.price-amount {
  font-family: var(--font-heading);
  font-size: clamp(2.25rem, 4vw, 2.75rem);
  font-weight: 700;
  color: rgba(255, 237, 223, 0.85);
  letter-spacing: -0.02em;
  line-height: 1;
}

.price-unit {
  font-family: var(--font-text);
  font-size: 0.875rem;
  color: rgba(255, 237, 223, 0.4);
}

.price-vat {
  display: block;
  font-family: var(--font-text);
  font-size: 0.7rem;
  color: rgba(255, 237, 223, 0.3);
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(223, 175, 133, 0.1);
}

/* ── Best for ─────────────────────────────────────────────────── */
.plan-best-for {
  font-family: var(--font-text);
  font-size: 0.8rem;
  line-height: 1.55;
  color: rgba(255, 237, 223, 0.45);
  margin: 0 0 1.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(223, 175, 133, 0.08);
  border-radius: 2px;
  background: rgba(223, 175, 133, 0.03);
}

/* ── Includes list ────────────────────────────────────────────── */
.plan-includes {
  list-style: none;
  padding: 0;
  margin: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.include-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-text);
  font-size: 0.85rem;
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

/* ── CTA ──────────────────────────────────────────────────────── */
.plan-cta-wrapper {
  margin-top: 2rem;
}

.plan-cta-btn {
  width: 100%;
  justify-content: center;
}

/* ── Billing note ─────────────────────────────────────────────── */
.billing-note {
  text-align: center;
  font-family: var(--font-text);
  font-size: 0.8rem;
  color: rgba(255, 237, 223, 0.3);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.4s,
    transform 0.6s var(--ease-smooth) 0.4s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .plan-panel,
  .billing-note {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .panel-gradient-layer,
  .corner {
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .support-plans { background: var(--color-section-alt); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title    { color: var(--color-text-primary); }
  .section-subtitle { color: var(--color-text-subtle); }

  /* Regular plan panels — warm white cards */
  .plan-panel {
    background: linear-gradient(175deg, #ffffff 0%, #fff7f0 100%);
    border-color: var(--deco-line);
    box-shadow: 0 2px 10px rgba(153, 82, 38, 0.05);

    .plan-rule       { background: var(--deco-line); }
    .plan-key        { color: var(--color-primary-600); }
    .deco-line       { background: var(--deco-line); }
    .deco-diamond    { background: var(--deco-diamond); &--sm { background: var(--deco-diamond-sm); } }
    .corner          { border-color: var(--deco-border); }
    .plan-description { color: var(--color-text-secondary); }
    .price-currency   { color: var(--color-primary-600); }
    .price-amount     { color: var(--color-text-primary); }
    .price-unit       { color: var(--color-text-subtle); }
    .price-vat {
      color: var(--color-text-muted);
      border-bottom-color: var(--deco-line);
    }
    .plan-best-for {
      color: var(--color-text-secondary);
      border-color: var(--deco-line);
      background: rgba(153, 82, 38, 0.025);
    }
    .include-item    { color: var(--color-text-secondary); }
    .include-diamond { background: rgba(153, 82, 38, 0.5); }
    .panel-gradient-layer {
      background: radial-gradient(
        ellipse 70% 50% at 50% 0%,
        rgba(153, 82, 38, 0.06) 0%,
        transparent 70%
      );
    }
    &:hover .corner { border-color: rgba(153, 82, 38, 0.3); }
  }

  /* Featured plan (Growth) — subtle cream tint, slightly warmer than regular panels */
  .plan-panel--featured {
    background: linear-gradient(175deg, #ffe4cf 0%, #ffeddf 60%, #faf7f4 100%);
    border-color: rgba(153, 82, 38, 0.28);
    box-shadow: 0 4px 20px rgba(153, 82, 38, 0.1);

    .plan-key         { color: var(--color-primary-700); opacity: 1; }
    .plan-rule        { background: rgba(153, 82, 38, 0.25); }
    .deco-line        { background: rgba(153, 82, 38, 0.18); }
    .deco-diamond     { background: rgba(153, 82, 38, 0.5); &--sm { background: rgba(153, 82, 38, 0.25); } }
    .corner           { border-color: rgba(153, 82, 38, 0.28); }
    .plan-description { color: var(--color-text-secondary); }
    .price-currency   { color: var(--color-primary-600); }
    .price-amount     { color: var(--color-primary-900); }
    .price-unit       { color: var(--color-text-subtle); }
    .price-vat {
      color: var(--color-text-muted);
      border-bottom-color: rgba(153, 82, 38, 0.18);
    }
    .plan-best-for {
      color: var(--color-text-secondary);
      border-color: rgba(153, 82, 38, 0.15);
      background: rgba(153, 82, 38, 0.04);
    }
    .include-item    { color: var(--color-text-secondary); }
    .include-diamond { background: rgba(153, 82, 38, 0.55); }
    .panel-gradient-layer {
      background: radial-gradient(
        ellipse 70% 50% at 50% 0%,
        rgba(153, 82, 38, 0.08) 0%,
        transparent 70%
      );
    }
    &:hover .corner { border-color: rgba(153, 82, 38, 0.4); }
  }

  .billing-note { color: var(--color-text-subtle); opacity: 0.7; }
}
</style>


