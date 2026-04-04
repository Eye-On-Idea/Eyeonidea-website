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
    class="process-cta"
    aria-labelledby="process-cta-heading"
  >
    <div class="cta-bg-radial" aria-hidden="true" />

    <div class="section-container">
      <div class="cta-inner" :class="{ 'animate-in': isVisible }">
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
          <span class="label-text">{{ t("process.cta.badge") }}</span>
          <span class="label-diamond" />
          <span class="label-line" />
        </div>

        <h2 id="process-cta-heading" class="cta-heading">
          {{ t("process.cta.title") }}
        </h2>

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

        <p class="cta-description">{{ t("process.cta.description") }}</p>

        <div class="cta-actions">
          <AppCtaButton
            variant="primary"
            :to="localePath('/contact')"
            :show-icon="true"
          >
            {{ t("process.cta.primary") }}
          </AppCtaButton>
          <AppCtaButton
            variant="secondary"
            :to="localePath('/solutions/website-packages')"
          >
            {{ t("process.cta.secondary") }}
          </AppCtaButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.process-cta {
  position: relative;
  background: #0d0908;
  overflow: hidden;
  padding: 5rem 2rem;

  @media (min-width: 768px) {
    padding: 7rem 2rem;
  }
}

/* ── Background radial ────────────────────────────────────────── */
.cta-bg-radial {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 80% at 50% 100%,
    rgba(223, 175, 133, 0.06) 0%,
    transparent 65%
  );
  pointer-events: none;
}

/* ── Container ────────────────────────────────────────────────── */
.section-container {
  position: relative;
  max-width: 44rem;
  margin: 0 auto;
}

/* ── Inner wrapper ────────────────────────────────────────────── */
.cta-inner {
  position: relative;
  padding: 3rem 2.5rem;
  border: 1px solid rgba(223, 175, 133, 0.12);
  text-align: center;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s var(--ease-smooth),
    transform 0.7s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    padding: 4rem 3.5rem;
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
  width: 1rem;
  height: 1rem;
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
  margin-bottom: 1.5rem;
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
  color: rgba(223, 175, 133, 0.5);
  flex-shrink: 0;
}

/* ── Heading ──────────────────────────────────────────────────── */
.cta-heading {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  line-height: 1.1;
  color: #ffeddf;
  margin: 0 0 1.25rem;
  letter-spacing: -0.02em;
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
  background: rgba(223, 175, 133, 0.1);

  &--inner { flex: 0 0 0.75rem; }
}

.deco-diamond {
  width: 6px;
  height: 6px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 3px;
    height: 3px;
    background: rgba(223, 175, 133, 0.2);
  }
}

/* ── Description ──────────────────────────────────────────────── */
.cta-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.5);
  max-width: 44ch;
  margin: 0 auto 2.5rem;
}

/* ── Actions ──────────────────────────────────────────────────── */
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .cta-inner {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .process-cta { background: var(--color-section-light); }

  .cta-bg-radial {
    background: radial-gradient(
      ellipse 60% 80% at 50% 100%,
      rgba(153, 82, 38, 0.05) 0%,
      transparent 65%
    );
  }

  .cta-inner { border-color: var(--deco-line); }

  .corner { border-color: var(--deco-border); }

  .label-line    { background: var(--deco-line); }
  .label-diamond { background: var(--deco-diamond); }
  .label-text    { color: var(--deco-text); }

  .cta-heading { color: var(--color-text-primary); }

  .deco-line    { background: var(--deco-line); }
  .deco-diamond {
    background: var(--deco-diamond);
    &--sm { background: var(--deco-diamond-sm); }
  }

  .cta-description { color: var(--color-text-subtle); }
}
</style>


