<script setup lang="ts">
import { withDelay } from "~/composables/useAccessibleMotion";

const { t } = useI18n();
const localePath = useLocalePath();

const sectionRef = ref<HTMLElement | null>(null);
const visible = ref(false);
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        visible.value = true;
        observer.value?.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  if (sectionRef.value) observer.value.observe(sectionRef.value);
});
onUnmounted(() => observer.value?.disconnect());

const leftMotion = withDelay("fadeInUp", 80);
const rightMotion = withDelay("fadeInUp", 200);

const values = ["clarity", "partnership", "quality"] as const;
</script>

<template>
  <section
    ref="sectionRef"
    id="about-section"
    class="about-section"
    aria-labelledby="about-heading"
  >
    <!-- Section separator / label -->
    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("landing.about.badge") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <!-- Two-column layout -->
    <div class="about-inner">

      <!-- Left column: text + CTA -->
      <div
        class="about-left"
        :key="`about-left-${visible}`"
        v-motion
        :initial="leftMotion.initial"
        :enter="visible ? leftMotion.visible : leftMotion.initial"
      >
        <h2 id="about-heading" class="about-title">
          {{ t("landing.about.title") }}
        </h2>

        <div class="about-deco-divider" aria-hidden="true">
          <span class="deco-line" />
          <span class="deco-diamond" />
          <span class="deco-line" />
        </div>

        <p class="about-description">{{ t("landing.about.description") }}</p>

        <AppCtaButton
          variant="secondary"
          :to="localePath('/about')"
          class="about-cta"
        >
          {{ t("landing.about.cta") }}
        </AppCtaButton>
      </div>

      <!-- Right column: gradient block + values list -->
      <div
        class="about-right"
        :key="`about-right-${visible}`"
        v-motion
        :initial="rightMotion.initial"
        :enter="visible ? rightMotion.visible : rightMotion.initial"
      >
        <!-- Gradient accent block (image placeholder) -->
        <div class="about-gradient-block" aria-hidden="true">
          <div class="gradient-inner" />
          <div class="deco-frame">
            <span class="corner corner--tl" />
            <span class="corner corner--tr" />
            <span class="corner corner--bl" />
            <span class="corner corner--br" />
          </div>
        </div>

        <!-- Values list -->
        <ul class="values-list" role="list">
          <li
            v-for="key in values"
            :key="key"
            class="value-item"
          >
            <div class="value-marker" aria-hidden="true">
              <span class="marker-rule" />
              <span class="marker-diamond" />
            </div>
            <div class="value-content">
              <h3 class="value-title">{{ t(`landing.about.values.${key}.title`) }}</h3>
              <p class="value-body">{{ t(`landing.about.values.${key}.description`) }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom deco rule — transition into next section block -->
    <div class="section-bottom-rule" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond-lg" />
      <span class="sep-line" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.about-section {
  background: #0d0908;
  padding-bottom: 0;
}

/* ── Section separator / label ────────────────────────────────── */
.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 2rem 3.5rem;
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

/* ── Inner layout ─────────────────────────────────────────────── */
.about-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: start;
  }
}

/* ── Left column ──────────────────────────────────────────────── */
.about-left {
  display: flex;
  flex-direction: column;
}

.about-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  line-height: 1.15;
  color: #fff;
  margin: 0 0 1.5rem;
  letter-spacing: -0.02em;
}

.about-deco-divider {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);
}

.deco-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.about-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.1vw, 1.05rem);
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.55);
  margin: 0 0 2.5rem;
}

.about-cta {
  align-self: flex-start;
}

/* ── Right column ─────────────────────────────────────────────── */
.about-right {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* ── Gradient block (image placeholder) ──────────────────────── */
.about-gradient-block {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 2px;
  overflow: hidden;

  @media (min-width: 1024px) {
    aspect-ratio: 4 / 3;
  }
}

.gradient-inner {
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, #481f0a 0%, #200b03 55%, #0d0908 100%);
  opacity: 0.9;
}

.deco-frame {
  position: absolute;
  inset: 0.875rem;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border-color: rgba(223, 175, 133, 0.22);
  border-style: solid;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

/* ── Values list ──────────────────────────────────────────────── */
.values-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.value-item {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(223, 175, 133, 0.08);

  &:last-child {
    border-bottom: 1px solid rgba(223, 175, 133, 0.08);
  }
}

.value-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.3rem;
  gap: 0.4rem;
  flex-shrink: 0;
}

.marker-rule {
  width: 1px;
  height: 0.875rem;
  background: rgba(223, 175, 133, 0.2);
}

.marker-diamond {
  width: 6px;
  height: 6px;
  background: rgba(223, 175, 133, 0.45);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.value-content {
  flex: 1;
}

.value-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(0.95rem, 1.1vw, 1rem);
  line-height: 1.3;
  color: #ffeddf;
  margin: 0 0 0.4rem;
}

.value-body {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

/* ── Bottom deco rule ─────────────────────────────────────────── */
.section-bottom-rule {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

.sep-diamond-lg {
  width: 7px;
  height: 7px;
  background: rgba(223, 175, 133, 0.25);
  transform: rotate(45deg);
  flex-shrink: 0;
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .about-section {
    background: var(--color-section-light);
  }

  /* Section separator */
  .sep-line {
    background: var(--deco-line);
  }

  .sep-diamond {
    background: var(--deco-diamond);
  }

  .sep-text {
    color: var(--deco-text);
  }

  /* Title & body text */
  .about-title {
    color: var(--color-text-primary);
  }

  .about-description {
    color: var(--color-text-subtle);
  }

  /* Deco divider */
  .deco-line {
    background: var(--deco-line);
  }

  .deco-diamond {
    background: var(--deco-diamond);
  }

  /* Gradient block — flip to warm light */
  .gradient-inner {
    background: linear-gradient(145deg, #f5efe8 0%, #e8ddd2 55%, #faf7f4 100%);
    opacity: 1;
  }

  /* Art deco corners on gradient block */
  .corner {
    border-color: var(--deco-border);
  }

  /* Values list */
  .value-item {
    border-top-color: var(--deco-line);

    &:last-child {
      border-bottom-color: var(--deco-line);
    }
  }

  .marker-rule {
    background: var(--deco-line-strong);
  }

  .marker-diamond {
    background: var(--deco-diamond);
  }

  .value-title {
    color: var(--color-text-primary);
  }

  .value-body {
    color: var(--color-text-subtle);
  }

  /* Bottom deco rule */
  .sep-diamond-lg {
    background: var(--deco-diamond-sm);
  }
}
</style>


