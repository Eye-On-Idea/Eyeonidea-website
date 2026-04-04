<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

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
    { threshold: 0.06 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});

const numerals = ["I", "II", "III", "IV"];

const values = computed(
  () =>
    tm("about.values.items") as Array<{
      icon: string;
      title: string;
      description: string;
    }>,
);
</script>

<template>
  <section
    ref="sectionRef"
    class="about-values"
    aria-labelledby="values-heading"
  >
    <!-- Section label row -->
    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("about.values.badge") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-container">
      <!-- Heading -->
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 id="values-heading" class="section-title">
          {{ t("about.values.title") }}
        </h2>
      </div>

      <!-- Values as editorial rows -->
      <ol class="values-list" :class="{ 'animate-in': isVisible }">
        <li
          v-for="(value, index) in values"
          :key="index"
          class="value-row"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <!-- Left: numeral -->
          <div class="value-numeral-col" aria-hidden="true">
            <span class="value-rule" />
            <span class="value-numeral">{{ numerals[index] }}</span>
            <span class="value-rule" />
          </div>

          <!-- Center: title + description -->
          <div class="value-body">
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-description">{{ value.description }}</p>
          </div>

          <!-- Right: amber diamond accent -->
          <div class="value-accent" aria-hidden="true">
            <span class="accent-diamond" />
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.about-values {
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
  padding: 6rem 2rem 4rem;
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
  padding: 0 2rem 6rem;
}

/* ── Header ───────────────────────────────────────────────────── */
.section-header {
  margin-bottom: 3rem;
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
  font-size: clamp(1.9rem, 3.5vw, 2.75rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ffeddf;
  margin: 0;
}

/* ── Values list ──────────────────────────────────────────────── */
.values-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
}

.value-row {
  display: grid;
  grid-template-columns: 5rem 1fr auto;
  align-items: center;
  gap: 2rem;
  padding: 2.25rem 0;
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.5s var(--ease-smooth),
    transform 0.5s var(--ease-smooth),
    background 0.25s ease;

  .values-list.animate-in & {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    background: rgba(223, 175, 133, 0.02);
  }

  @media (min-width: 768px) {
    grid-template-columns: 8rem 1fr auto;
    gap: 3rem;
    padding: 2.75rem 0;
  }
}

/* ── Numeral column ───────────────────────────────────────────── */
.value-numeral-col {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.value-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.1);
}

.value-numeral {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(223, 175, 133, 0.35);
  flex-shrink: 0;
}

/* ── Value body ───────────────────────────────────────────────── */
.value-body {
  display: grid;
  gap: 0.375rem;

  @media (min-width: 640px) {
    grid-template-columns: 10rem 1fr;
    gap: 2rem;
    align-items: baseline;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 12rem 1fr;
  }
}

.value-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  color: #ffeddf;
  margin: 0;
  letter-spacing: -0.01em;
}

.value-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.85rem, 1vw, 0.95rem);
  line-height: 1.7;
  color: rgba(255, 237, 223, 0.45);
  margin: 0;
}

/* ── Right accent ─────────────────────────────────────────────── */
.value-accent {
  flex-shrink: 0;
}

.accent-diamond {
  display: block;
  width: 6px;
  height: 6px;
  background: rgba(223, 175, 133, 0.2);
  transform: rotate(45deg);
  transition: background 0.25s ease;

  .value-row:hover & {
    background: rgba(223, 175, 133, 0.5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .value-row {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .about-values { background: var(--color-section-light); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title { color: var(--color-text-primary); }

  .values-list { border-top-color: var(--deco-line); }

  .value-row {
    border-bottom-color: var(--deco-line);

    &:hover { background: rgba(153, 82, 38, 0.02); }
  }

  .value-rule    { background: var(--deco-line); }
  .value-numeral { color: var(--color-primary-500); opacity: 0.4; }

  .value-title       { color: var(--color-text-primary); }
  .value-description { color: var(--color-text-subtle); }

  .accent-diamond {
    background: var(--deco-diamond-sm);

    .value-row:hover & { background: var(--deco-diamond); }
  }
}
</style>


