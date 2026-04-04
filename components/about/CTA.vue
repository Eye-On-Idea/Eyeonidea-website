<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t } = useI18n();
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
    { threshold: 0.1 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <section
    ref="sectionRef"
    class="about-cta"
    aria-labelledby="about-cta-heading"
  >
    <div class="cta-container" :class="{ 'animate-in': isVisible }">
      <div class="cta-panel">
        <!-- Corner frame -->
        <div class="deco-frame" aria-hidden="true">
          <span class="corner corner--tl" />
          <span class="corner corner--tr" />
          <span class="corner corner--bl" />
          <span class="corner corner--br" />
        </div>

        <!-- Label row -->
        <div class="cta-label-row" aria-hidden="true">
          <span class="label-line" />
          <span class="label-diamond" />
          <span class="label-text">{{ t("about.cta.badge") }}</span>
          <span class="label-diamond" />
          <span class="label-line" />
        </div>

        <h2 id="about-cta-heading" class="cta-title">
          {{ t("about.cta.title") }}
        </h2>

        <!-- Deco divider -->
        <div class="cta-divider" aria-hidden="true">
          <span class="div-line" />
          <span class="div-diamond div-diamond--sm" />
          <span class="div-line div-line--inner" />
          <span class="div-diamond" />
          <span class="div-line div-line--inner" />
          <span class="div-diamond div-diamond--sm" />
          <span class="div-line" />
        </div>

        <p class="cta-description">{{ t("about.cta.description") }}</p>

        <div class="cta-actions">
          <AppCtaButton
            variant="primary"
            :to="localePath('/solutions/website-packages')"
          >
            {{ t("about.cta.primary") }}
          </AppCtaButton>
          <AppCtaButton
            variant="secondary"
            :to="localePath('/contact')"
          >
            {{ t("about.cta.secondary") }}
          </AppCtaButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.about-cta {
  background: #0d0908;
  padding: 6rem 2rem 8rem;
}

/* ── Container ────────────────────────────────────────────────── */
.cta-container {
  max-width: 56rem;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s var(--ease-smooth),
    transform 0.7s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Panel ────────────────────────────────────────────────────── */
.cta-panel {
  position: relative;
  padding: 4rem 3rem;
  background: rgba(18, 7, 3, 0.6);
  border: 1px solid rgba(223, 175, 133, 0.14);
  text-align: center;

  @media (min-width: 640px) {
    padding: 4.5rem 4rem;
  }
}

/* ── Corner frame ─────────────────────────────────────────────── */
.deco-frame {
  position: absolute;
  inset: 0.875rem;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border-color: rgba(223, 175, 133, 0.2);
  border-style: solid;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

/* ── Label row ────────────────────────────────────────────────── */
.cta-label-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.label-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.label-diamond {
  width: 4px;
  height: 4px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.label-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  flex-shrink: 0;
}

/* ── Title ────────────────────────────────────────────────────── */
.cta-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ffeddf;
  margin: 0 0 1.5rem;
  text-wrap: balance;
}

/* ── Deco divider ─────────────────────────────────────────────── */
.cta-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}

.div-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.1);
  max-width: 4rem;

  &--inner { flex: 0 0 0.75rem; max-width: none; }
}

.div-diamond {
  width: 6px;
  height: 6px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 3px;
    height: 3px;
    background: rgba(223, 175, 133, 0.18);
  }
}

/* ── Description ──────────────────────────────────────────────── */
.cta-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.45);
  max-width: 46ch;
  margin: 0 auto 2.5rem;
}

/* ── Actions ──────────────────────────────────────────────────── */
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .cta-container {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .about-cta { background: var(--color-section-alt); }

  .cta-panel {
    background: rgba(255, 255, 255, 0.70);
    border-color: var(--deco-border);
  }

  .corner { border-color: var(--deco-border); }

  .label-line    { background: var(--deco-line); }
  .label-diamond { background: var(--deco-diamond); }
  .label-text    { color: var(--deco-text); }

  .cta-title { color: var(--color-text-primary); }

  .div-line    { background: var(--deco-line); }
  .div-diamond { background: var(--deco-diamond);
    &--sm { background: var(--deco-diamond-sm); }
  }

  .cta-description { color: var(--color-text-subtle); }
}
</style>


