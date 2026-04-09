<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const sliderRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const sliderPosition = ref(50);
const isDragging = ref(false);

const metrics = computed(
  () =>
    tm("services.beforeAfter.metrics") as Array<{
      label: string;
      before: string;
      after: string;
      unit: string;
      improved: boolean;
    }>,
);

function updateSlider(clientX: number) {
  if (!sliderRef.value) return;
  const rect = sliderRef.value.getBoundingClientRect();
  const x = clientX - rect.left;
  const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
  sliderPosition.value = percent;
}

function onPointerDown(e: PointerEvent) {
  isDragging.value = true;
  (e.target as HTMLElement).setPointerCapture(e.pointerId);
  updateSlider(e.clientX);
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return;
  updateSlider(e.clientX);
}

function onPointerUp() {
  isDragging.value = false;
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === "ArrowLeft") {
    sliderPosition.value = Math.max(0, sliderPosition.value - 2);
    e.preventDefault();
  } else if (e.key === "ArrowRight") {
    sliderPosition.value = Math.min(100, sliderPosition.value + 2);
    e.preventDefault();
  }
}

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
    { threshold: 0.15 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <section
    ref="sectionRef"
    id="before-after-section"
    class="before-after"
    aria-labelledby="before-after-heading"
  >

    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("services.beforeAfter.title") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-container">

      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 id="before-after-heading" class="section-title">
          {{ t("services.beforeAfter.title") }}
        </h2>
        <p class="section-subtitle">{{ t("services.beforeAfter.subtitle") }}</p>
      </div>

      <div
        ref="sliderRef"
        class="comparison-slider"
        :class="{ 'animate-in': isVisible }"
        role="slider"
        :aria-valuenow="Math.round(sliderPosition)"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="t('services.beforeAfter.sliderLabel')"
        tabindex="0"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @keydown="onKeyDown"
      >

        <div class="panel panel--before">
          <div class="panel__label">{{ t("services.beforeAfter.beforeLabel") }}</div>
          <div class="panel__metrics">
            <div v-for="(metric, i) in metrics" :key="`before-${i}`" class="metric">
              <span class="metric__value metric__value--poor">{{ metric.before }}{{ metric.unit }}</span>
              <span class="metric__label">{{ metric.label }}</span>
            </div>
          </div>
        </div>

        <div
          class="panel panel--after"
          :style="{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }"
        >
          <div class="panel__label">{{ t("services.beforeAfter.afterLabel") }}</div>
          <div class="panel__metrics">
            <div v-for="(metric, i) in metrics" :key="`after-${i}`" class="metric">
              <span class="metric__value metric__value--good">{{ metric.after }}{{ metric.unit }}</span>
              <span class="metric__label">{{ metric.label }}</span>
            </div>
          </div>
        </div>

        <div class="slider-handle" :style="{ left: `${sliderPosition}%` }" aria-hidden="true">
          <div class="slider-line" />
          <div class="slider-grip">
            <span class="grip-arrows">&#8592;&#8594;</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.before-after {
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

.section-container {
  max-width: 56rem;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

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

.comparison-slider {
  position: relative;
  border: 1px solid rgba(223, 175, 133, 0.12);
  border-radius: 2px;
  overflow: hidden;
  cursor: ew-resize;
  user-select: none;
  touch-action: none;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.15s,
    transform 0.6s var(--ease-smooth) 0.15s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.6);
    outline-offset: 4px;
  }
}

.panel {
  padding: 2.5rem 2rem;
  min-height: 300px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 3rem;
    min-height: 340px;
  }
}

.panel--before {
  background: #161210;
}

.panel--after {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1e120a 0%, #161210 60%);
  border-right: 1px solid rgba(223, 175, 133, 0.2);
  z-index: 1;
}

.panel__label {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin-bottom: 2rem;
}

.panel--before .panel__label {
  color: rgba(255, 237, 223, 0.3);
}

.panel--after .panel__label {
  color: rgba(223, 175, 133, 0.8);
}

.panel__metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 2rem;
  flex: 1;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric__value {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.metric__value--poor {
  color: rgba(255, 237, 223, 0.25);
}

.metric__value--good {
  color: #dfaf85;
}

.metric__label {
  font-family: var(--font-text);
  font-size: 0.7rem;
  color: rgba(255, 237, 223, 0.35);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  z-index: 2;
  pointer-events: none;
}

.slider-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -1px;
  width: 2px;
  background: rgba(223, 175, 133, 0.6);
}

.slider-grip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1e120a;
  border: 1px solid rgba(223, 175, 133, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
  cursor: ew-resize;
}

.grip-arrows {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: rgba(223, 175, 133, 0.7);
  letter-spacing: -0.05em;
  line-height: 1;
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .comparison-slider {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

html:not(.dark) {
  .before-after { background: var(--color-section-alt); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title    { color: var(--color-text-primary); }
  .section-subtitle { color: var(--color-text-subtle); }

  .comparison-slider { border-color: var(--deco-line); }
}
</style>

