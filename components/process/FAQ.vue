<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const openIndex = ref<number | null>(0);

onMounted(() => {
  if (!sectionRef.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.08 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});

interface FAQItem {
  question: string;
  answer: string;
}

const items = computed(() => tm("process.faq.items") as FAQItem[]);

const toggleItem = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <section ref="sectionRef" class="process-faq" aria-labelledby="faq-heading">
    <!-- Section label row -->
    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("process.faq.title") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-container">
      <!-- Header -->
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 id="faq-heading" class="section-title">
          {{ t("process.faq.subtitle") }}
        </h2>
      </div>

      <!-- Accordion -->
      <div class="faq-list" :class="{ 'animate-in': isVisible }">
        <details
          v-for="(item, index) in items"
          :key="index"
          class="faq-item"
          :open="openIndex === index"
        >
          <summary class="faq-trigger" @click.prevent="toggleItem(index)">
            <span class="faq-question">{{ item.question }}</span>
            <span
              class="faq-chevron"
              :class="{ 'faq-chevron--open': openIndex === index }"
              aria-hidden="true"
              >▾</span
            >
          </summary>

          <div
            class="faq-answer-wrapper"
            :class="{ 'faq-answer-wrapper--open': openIndex === index }"
          >
            <p class="faq-answer">{{ item.answer }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.process-faq {
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
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

/* ── Header ───────────────────────────────────────────────────── */
.section-header {
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  line-height: 1.1;
  color: #fff;
  margin: 0;
  letter-spacing: -0.02em;
}

/* ── FAQ list ─────────────────────────────────────────────────── */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.15s,
    transform 0.6s var(--ease-smooth) 0.15s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── FAQ item ─────────────────────────────────────────────────── */
.faq-item {
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);
  transition: background 0.2s ease;

  &:first-child {
    border-top: 1px solid rgba(223, 175, 133, 0.08);
  }

  &--open {
    background: rgba(223, 175, 133, 0.02);
  }
}

/* ── Trigger ──────────────────────────────────────────────────── */
.faq-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1.25rem 0;
  min-height: 56px;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  text-align: left;

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 2px;
  }
}

.faq-question {
  font-family: var(--font-heading);
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  font-weight: 600;
  color: rgba(255, 237, 223, 0.75);
  line-height: 1.4;
  letter-spacing: -0.01em;

  .faq-item--open & {
    color: #ffeddf;
  }
}

.faq-chevron {
  font-size: 1.1rem;
  color: rgba(223, 175, 133, 0.35);
  flex-shrink: 0;
  line-height: 1;
  transition:
    transform 0.35s var(--ease-smooth),
    color 0.35s var(--ease-smooth);

  &--open {
    transform: rotate(180deg);
    color: rgba(223, 175, 133, 0.75);
  }
}

/* ── Answer panel ─────────────────────────────────────────────── */
/*
 * Baseline (all browsers incl. Safari):
 * Grid-row expansion trick — forces the wrapper to always render
 * (overriding UA display:none on details:not([open]) children)
 * then animates grid-template-rows 0fr → 1fr for smooth height.
 * The inner <p> fades + slides in separately for a layered feel.
 */
.faq-answer-wrapper {
  display: grid !important;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.38s var(--ease-smooth);

  &--open {
    grid-template-rows: 1fr;
  }
}

.faq-answer {
  overflow: hidden; /* required for the grid-row clip */
  padding: 0 0 1.5rem;
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.875rem, 1vw, 0.95rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.5);
  margin: 0;
  max-width: 56ch;
  opacity: 0;
  transform: translateY(-6px);
  transition:
    opacity 0.3s var(--ease-smooth) 0.08s,
    transform 0.3s var(--ease-smooth) 0.08s;

  .faq-answer-wrapper--open & {
    opacity: 1;
    transform: translateY(0);
  }
}

/*
 * Enhancement (Chrome 129+, Firefox 131+):
 * Uses ::details-content + interpolate-size to animate height: 0 → auto
 * natively, plus content-visibility allow-discrete so the closing
 * fade-out plays before the element disappears.
 * The wrapper div becomes layout-transparent (display: contents).
 */
@supports (interpolate-size: allow-keywords) {
  :root {
    interpolate-size: allow-keywords;
  }

  /* Neutralise the wrapper — ::details-content takes over layout */
  .faq-answer-wrapper {
    display: contents !important;
    transition: none;
  }

  /* Reset inner text — ::details-content handles opacity now */
  .faq-answer {
    overflow: visible;
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }

  /* The native pseudo-element: height + opacity + discrete visibility */
  .faq-item::details-content {
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition:
      opacity 0.35s var(--ease-smooth),
      height 0.38s var(--ease-smooth),
      content-visibility 0.38s allow-discrete;
  }

  .faq-item[open]::details-content {
    opacity: 1;
    height: auto;
  }
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .section-header,
  .faq-list {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .faq-chevron {
    transition: none;
  }

  /* Baseline: snap open, no animation */
  .faq-answer-wrapper {
    transition: none;
  }

  .faq-answer-wrapper--open {
    grid-template-rows: 1fr;
  }

  .faq-answer-wrapper--open .faq-answer {
    opacity: 1;
    transform: none;
    transition: none;
  }

  /* Enhanced: snap open, no animation */
  @supports (interpolate-size: allow-keywords) {
    .faq-item::details-content {
      transition: none;
      opacity: 1;
      height: auto;
    }
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .process-faq { background: var(--color-section-alt); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title { color: var(--color-text-primary); }

  .faq-item {
    border-bottom-color: var(--deco-line);

    &:first-child { border-top-color: var(--deco-line); }
  }

  .faq-trigger:focus-visible { outline-color: var(--color-primary-500); }

  .faq-question {
    color: var(--color-text-secondary);

    .faq-item--open & { color: var(--color-text-primary); }
  }

  .faq-chevron {
    color: var(--color-primary-500);
    opacity: 0.5;

    &--open { color: var(--color-primary-600); opacity: 1; }
  }

  .faq-answer { color: var(--color-text-subtle); }
}
</style>
