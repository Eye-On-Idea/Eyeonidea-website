<script setup lang="ts">
import { withDelay } from "~/composables/useAccessibleMotion";

const { t, tm } = useI18n();
const localePath = useLocalePath();

const sectionRef = ref<HTMLElement | null>(null);
const visible    = ref(false);
const observer   = ref<IntersectionObserver | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        visible.value = true;
        observer.value?.disconnect();
      }
    },
    { threshold: 0.08 }
  );
  if (sectionRef.value) observer.value.observe(sectionRef.value);
});
onUnmounted(() => observer.value?.disconnect());

const headMotion = withDelay("fadeInUp", 80);
const stepMotion = (i: number) => withDelay("fadeInUp", 160 + i * 100);

const numerals = ["I", "II", "III", "IV"];

const steps = computed(
  () =>
    tm("services.howWeWork.steps") as Array<{
      title: string;
      description: string;
    }>,
);
</script>

<template>
  <section
    id="how-we-work-section"
    ref="sectionRef"
    class="how-we-work-section"
    aria-labelledby="how-we-work-heading"
  >

    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("services.howWeWork.title") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div
      class="section-header"
      :key="`hww-header-${visible}`"
      v-motion
      :initial="headMotion.initial"
      :enter="visible ? headMotion.visible : headMotion.initial"
    >
      <h2 id="how-we-work-heading" class="section-title">
        {{ t("services.howWeWork.subtitle") }}
      </h2>
    </div>

    <ol class="steps-grid" role="list">
      <li
        v-for="(step, index) in steps"
        :key="`step-${index}-${visible}`"
        class="step-item"
        v-motion
        :initial="stepMotion(index).initial"
        :enter="visible ? stepMotion(index).visible : stepMotion(index).initial"
      >

        <div class="step-numeral-row" aria-hidden="true">
          <span class="step-rule" />
          <span class="step-numeral">{{ numerals[index] }}</span>
          <span class="step-rule" />
        </div>

        <div class="step-deco-divider" aria-hidden="true">
          <span class="deco-line" />
          <span class="deco-diamond" />
          <span class="deco-line" />
        </div>

        <h3 class="step-heading">{{ step.title }}</h3>
        <p class="step-body">{{ step.description }}</p>
      </li>
    </ol>

    <NuxtLink
      :to="localePath('/solutions/process')"
      class="footer-strip"
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
        {{ t("services.howWeWork.cta") }}
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
  </section>
</template>

<style lang="scss" scoped>

.how-we-work-section {
  background: #0d0908;
  padding-bottom: 0;
}

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

.section-header {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  color: #fff;
  margin: 0;
  letter-spacing: -0.02em;
}

.steps-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgba(223, 175, 133, 0.08);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.step-item {
  padding: 2.5rem 2rem 3rem;
  border-right: 1px solid rgba(223, 175, 133, 0.08);
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);
  transition: background 0.3s ease;

  &:hover {
    background: rgba(223, 175, 133, 0.02);

    .step-numeral { opacity: 1; }
    .deco-diamond { background: rgba(223, 175, 133, 0.65); }
  }

  @media (min-width: 1024px) {
    &:last-child { border-right: none; }
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    &:nth-child(2n) { border-right: none; }
  }

  @media (max-width: 639px) {
    border-right: none;
  }
}

.step-numeral-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.step-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);
}

.step-numeral {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #dfaf85;
  opacity: 0.45;
  flex-shrink: 0;
  transition: opacity 0.3s ease;
}

.step-deco-divider {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.1);
}

.deco-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.3);
  transform: rotate(45deg);
  flex-shrink: 0;
  transition: background 0.3s ease;
}

.step-heading {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  line-height: 1.3;
  color: #fff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.01em;
}

.step-body {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.85rem, 0.9vw, 0.9rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.footer-strip {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  background: #120703;
  border-top: 1px solid rgba(223, 175, 133, 0.12);
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

@media (prefers-reduced-motion: reduce) {
  .step-item,
  .step-numeral,
  .deco-diamond,
  .footer-strip,
  .strip-diamond,
  .strip-label,
  .strip-icon {
    transition: none;
  }
}

html:not(.dark) {
  .how-we-work-section { background: var(--color-section-alt); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title { color: var(--color-text-primary); }

  .steps-grid { border-top-color: var(--deco-line); }

  .step-item {
    border-right-color: var(--deco-line);
    border-bottom-color: var(--deco-line);

    &:hover {
      background: rgba(153, 82, 38, 0.02);

      .deco-diamond { background: rgba(153, 82, 38, 0.6); }
    }
  }

  .step-rule    { background: var(--deco-line); }
  .step-numeral { color: var(--color-primary-500); opacity: 0.6; }
  .deco-line    { background: var(--deco-line); }
  .deco-diamond { background: var(--deco-diamond); }
  .step-heading { color: var(--color-text-primary); }
  .step-body    { color: var(--color-text-subtle); }

  .footer-strip {
    background: var(--color-surface-2);
    border-top-color: var(--deco-line);

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

