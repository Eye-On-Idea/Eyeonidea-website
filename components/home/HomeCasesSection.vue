<script setup lang="ts">
import { withDelay } from "~/composables/useAccessibleMotion";

const { t, tm } = useI18n();
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

const headingMotion = withDelay("fadeInUp", 80);
const rowMotion = (i: number) => withDelay("fadeInUp", 160 + i * 100);
const footerMotion = withDelay("fadeInUp", 360);

const featuredCases = computed(
  () => tm("landing.cases.featured") as Array<{
    title: string;
    category: string;
    year: string;
    outcome: string;
    slug: string;
  }>
);

const caseGradients = [
  "linear-gradient(135deg, #481f0a 0%, #200b03 100%)",
  "linear-gradient(135deg, #3a1508 0%, #1a0904 100%)",
];
</script>

<template>
  <section
    ref="sectionRef"
    id="cases-preview-section"
    class="cases-section"
    aria-labelledby="cases-heading"
  >
    <!-- Section separator / label -->
    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("landing.cases.badge") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <!-- Header -->
    <div
      class="cases-header"
      :key="`cases-header-${visible}`"
      v-motion
      :initial="headingMotion.initial"
      :enter="visible ? headingMotion.visible : headingMotion.initial"
    >
      <h2 id="cases-heading" class="cases-title">
        {{ t("landing.cases.title") }}
      </h2>
      <p class="cases-subtitle">{{ t("landing.cases.subtitle") }}</p>
    </div>

    <!-- Case rows -->
    <ul class="cases-list" role="list">
      <li
        v-for="(item, i) in featuredCases"
        :key="`case-${item.slug}-${visible}`"
        v-motion
        :initial="rowMotion(i).initial"
        :enter="visible ? rowMotion(i).visible : rowMotion(i).initial"
      >
        <NuxtLink
          :to="localePath(`/cases/${item.slug}`)"
          class="case-row"
          :aria-label="`${item.title} — ${item.category}, ${item.year}`"
        >
          <!-- Deco corner frame (appears on hover) -->
          <div class="deco-frame" aria-hidden="true">
            <span class="corner corner--tl" />
            <span class="corner corner--tr" />
            <span class="corner corner--bl" />
            <span class="corner corner--br" />
          </div>

          <!-- Left: meta + title -->
          <div class="row-left">
            <div class="case-meta">
              <span class="case-category">{{ item.category }}</span>
              <span class="meta-sep" aria-hidden="true" />
              <span class="case-year">{{ item.year }}</span>
            </div>
            <h3 class="case-title">{{ item.title }}</h3>
          </div>

          <!-- Middle: outcome -->
          <p class="case-outcome">{{ item.outcome }}</p>

          <!-- Right: image placeholder + arrow -->
          <div class="row-right">
            <div
              class="case-image-placeholder"
              :style="{ background: caseGradients[i % caseGradients.length] }"
              aria-hidden="true"
            />
            <span class="case-arrow" aria-hidden="true">→</span>
          </div>
        </NuxtLink>
      </li>
    </ul>

    <!-- Footer -->
    <div
      class="cases-footer"
      :key="`cases-footer-${visible}`"
      v-motion
      :initial="footerMotion.initial"
      :enter="visible ? footerMotion.visible : footerMotion.initial"
    >
      <AppCtaButton
        variant="primary"
        :to="localePath(t('landing.cases.ctaHref'))"
        :show-icon="true"
      >
        {{ t("landing.cases.cta") }}
      </AppCtaButton>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.cases-section {
  background: #0d0908;
  padding-bottom: 4rem;
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

/* ── Header ───────────────────────────────────────────────────── */
.cases-header {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.cases-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  color: #fff;
  margin: 0 0 0.875rem;
  letter-spacing: -0.02em;
}

.cases-subtitle {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
  max-width: 36rem;
}

/* ── Cases list ───────────────────────────────────────────────── */
.cases-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* ── Case row ─────────────────────────────────────────────────── */
.case-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem 2rem;
  max-width: 80rem;
  margin: 0 auto;
  text-decoration: none;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
  transition: background 0.3s ease;

  &:hover {
    background: rgba(223, 175, 133, 0.03);

    .case-title {
      color: #dfaf85;
    }

    .case-arrow {
      transform: translateX(6px);
      color: #dfaf85;
    }

    .deco-frame {
      opacity: 1;
    }

    .case-image-placeholder {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.6);
    outline-offset: -2px;
  }

  @media (max-width: 767px) {
    flex-wrap: wrap;

    .row-right {
      align-self: flex-end;
      margin-left: auto;
    }
  }
}

/* ── Deco corner frame ────────────────────────────────────────── */
.deco-frame {
  position: absolute;
  inset: 0.5rem 1.25rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.corner {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-color: rgba(223, 175, 133, 0.3);
  border-style: solid;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

/* ── Row left ─────────────────────────────────────────────────── */
.row-left {
  flex: 0 0 auto;
  width: clamp(180px, 26%, 300px);
}

.case-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.case-category {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #dfaf85;
}

.meta-sep {
  width: 4px;
  height: 4px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.case-year {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.3);
}

.case-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.4rem, 2.2vw, 1.85rem);
  line-height: 1.15;
  color: #fff;
  margin: 0;
  transition: color 0.3s ease;
  letter-spacing: -0.01em;
}

/* ── Outcome ──────────────────────────────────────────────────── */
.case-outcome {
  flex: 1;
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.85rem, 0.95vw, 0.95rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

/* ── Row right ────────────────────────────────────────────────── */
.row-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.case-image-placeholder {
  width: clamp(80px, 9vw, 116px);
  aspect-ratio: 4 / 3;
  border-radius: 3px;
  opacity: 0.6;
  flex-shrink: 0;
  transition: opacity 0.3s ease;

  @media (max-width: 767px) {
    display: none;
  }
}

.case-arrow {
  font-size: 1.2rem;
  color: rgba(223, 175, 133, 0.38);
  transition: transform 0.3s ease, color 0.3s ease;
  flex-shrink: 0;
  font-family: var(--font-heading);
}

/* ── Footer ───────────────────────────────────────────────────── */
.cases-footer {
  max-width: 80rem;
  margin: 0 auto;
  padding: 2.5rem 2rem 0;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .case-row,
  .case-title,
  .case-arrow,
  .case-image-placeholder,
  .deco-frame {
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .cases-section {
    background: var(--color-section-light);
  }

  .sep-line {
    background: var(--deco-line);
  }

  .sep-diamond {
    background: var(--deco-diamond);
  }

  .sep-text {
    color: var(--deco-text);
  }

  .cases-title {
    color: var(--color-text-primary);
  }

  .cases-subtitle {
    color: var(--color-text-subtle);
  }

  .case-row {
    border-top-color: var(--deco-line);

    &:hover {
      background: rgba(153, 82, 38, 0.03);

      .case-title {
        color: var(--color-primary-600);
      }

      .case-arrow {
        color: var(--color-primary-500);
      }
    }

    &:focus-visible {
      outline-color: var(--color-primary-500);
    }
  }

  .corner {
    border-color: var(--deco-border);
  }

  .case-category {
    color: var(--color-primary-600);
  }

  .meta-sep {
    background: var(--deco-diamond-sm);
  }

  .case-year {
    color: var(--color-text-subtle);
  }

  .case-title {
    color: var(--color-text-primary);
  }

  .case-outcome {
    color: var(--color-text-subtle);
  }

  .case-image-placeholder {
    /* gradients are defined inline per-item; reduce opacity looks fine on light */
    opacity: 0.5;
  }

  .case-arrow {
    color: rgba(153, 82, 38, 0.35);
  }

  .cases-footer {
    border-top-color: var(--deco-line);
  }
}
</style>


