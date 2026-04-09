<script setup lang="ts">
import { withDelay } from "~/composables/useAccessibleMotion";

const { t } = useI18n();

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
const stepMotion = (i: number) => withDelay("fadeInUp", 160 + i * 100);

const steps = [
  { key: "discover" as const, numeral: "I" },
  { key: "design"   as const, numeral: "II" },
  { key: "develop"  as const, numeral: "III" },
  { key: "support"  as const, numeral: "IV" },
];
</script>

<template>
  <section
    ref="sectionRef"
    id="process-section"
    class="process-section"
    aria-labelledby="process-heading"
  >

    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("landing.process.badge") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div
      class="process-header"
      :key="`process-header-${visible}`"
      v-motion
      :initial="headingMotion.initial"
      :enter="visible ? headingMotion.visible : headingMotion.initial"
    >
      <h2 id="process-heading" class="process-title">
        {{ t("landing.process.title") }}
      </h2>
    </div>

    <ol class="steps-grid" role="list">
      <li
        v-for="(step, i) in steps"
        :key="`step-${step.key}-${visible}`"
        class="step-item"
        v-motion
        :initial="stepMotion(i).initial"
        :enter="visible ? stepMotion(i).visible : stepMotion(i).initial"
      >

        <div class="step-numeral-row" aria-hidden="true">
          <span class="step-rule" />
          <span class="step-numeral">{{ step.numeral }}</span>
          <span class="step-rule" />
        </div>

        <div class="step-deco-divider" aria-hidden="true">
          <span class="deco-line" />
          <span class="deco-diamond" />
          <span class="deco-line" />
        </div>

        <h3 class="step-heading">
          {{ t(`landing.process.steps.${step.key}.title`) }}
        </h3>
        <p class="step-body">
          {{ t(`landing.process.steps.${step.key}.description`) }}
        </p>
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>

.process-section {
  position: relative;
  z-index: 1;
  background: rgba(13, 9, 8, 0.80);
  padding-bottom: 0;
}

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

.process-header {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.process-title {
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

    .step-numeral {
      opacity: 1;
    }

    .deco-diamond {
      background: rgba(223, 175, 133, 0.65);
    }
  }

  @media (min-width: 1024px) {
    &:last-child {
      border-right: none;
    }
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    &:nth-child(2n) {
      border-right: none;
    }
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

@media (prefers-reduced-motion: reduce) {
  .step-item,
  .step-numeral,
  .deco-diamond {
    transition: none;
  }
}

html:not(.dark) {
  .process-section {
    background: var(--color-section-alt);
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

  .process-title {
    color: var(--color-text-primary);
  }

  .steps-grid {
    border-top-color: var(--deco-line);
  }

  .step-item {
    border-right-color: var(--deco-line);
    border-bottom-color: var(--deco-line);

    &:hover {
      background: rgba(153, 82, 38, 0.03);

      .deco-diamond {
        background: var(--deco-diamond);
      }
    }
  }

  .step-rule {
    background: var(--deco-line);
  }

  .step-numeral {
    color: var(--color-primary-600);
    opacity: 0.5;
  }

  .deco-line {
    background: var(--deco-line);
  }

  .deco-diamond {
    background: var(--deco-diamond-sm);
  }

  .step-heading {
    color: var(--color-text-primary);
  }

  .step-body {
    color: var(--color-text-subtle);
  }
}
</style>

