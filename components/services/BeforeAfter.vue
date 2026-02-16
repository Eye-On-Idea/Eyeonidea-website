<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const sliderRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const sliderPosition = ref(50);
const isDragging = ref(false);

const metrics = computed(() =>
  tm("services.beforeAfter.metrics") as Array<{
    label: string;
    before: string;
    after: string;
    unit: string;
    improved: boolean;
  }>
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
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.15 }
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
    <div class="section-container">
      <!-- Header -->
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 id="before-after-heading" class="section-title">
          {{ t("services.beforeAfter.title") }}
        </h2>
        <p class="section-subtitle">
          {{ t("services.beforeAfter.subtitle") }}
        </p>
      </div>

      <!-- Comparison slider -->
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
        <!-- Before panel -->
        <div class="panel panel--before">
          <div class="panel__label">{{ t("services.beforeAfter.beforeLabel") }}</div>
          <div class="panel__metrics">
            <div
              v-for="(metric, i) in metrics"
              :key="`before-${i}`"
              class="metric"
            >
              <span class="metric__value metric__value--poor">{{ metric.before }}{{ metric.unit }}</span>
              <span class="metric__label">{{ metric.label }}</span>
            </div>
          </div>
        </div>

        <!-- After panel (clipped by slider position) -->
        <div
          class="panel panel--after"
          :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
        >
          <div class="panel__label">{{ t("services.beforeAfter.afterLabel") }}</div>
          <div class="panel__metrics">
            <div
              v-for="(metric, i) in metrics"
              :key="`after-${i}`"
              class="metric"
            >
              <span class="metric__value metric__value--good">{{ metric.after }}{{ metric.unit }}</span>
              <span class="metric__label">{{ metric.label }}</span>
            </div>
          </div>
        </div>

        <!-- Slider handle -->
        <div
          class="slider-handle"
          :style="{ left: `${sliderPosition}%` }"
          aria-hidden="true"
        >
          <div class="slider-line" />
          <div class="slider-grip">
            <UIcon name="i-heroicons-arrows-right-left" class="slider-grip__icon" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.before-after {
  padding: 6rem 1.5rem;
  background: var(--color-section-light);

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
}

.section-container {
  max-width: 900px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--badge-accent-bg);
  color: var(--badge-accent-text);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: var(--text-3xl);
  color: var(--color-text);
  margin-bottom: 0.75rem;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.section-subtitle {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

// Slider
.comparison-slider {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: ew-resize;
  user-select: none;
  touch-action: none;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.2s,
    transform 0.6s var(--ease-smooth) 0.2s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent-400);
    outline-offset: 4px;
  }
}

// Panels
.panel {
  padding: 2.5rem 2rem;
  min-height: 320px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 3rem;
    min-height: 360px;
  }
}

.panel--before {
  background: var(--color-surface-1);
  border: 1px solid var(--glass-border-subtle);
}

.panel--after {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-accent-500) 8%, var(--color-surface-1)),
    var(--color-surface-1)
  );
  border: 1px solid color-mix(in srgb, var(--color-accent-500) 25%, transparent);
  z-index: 1;
}

.panel__label {
  font-size: var(--text-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
}

.panel--before .panel__label {
  color: var(--color-text-muted);
}

.panel--after .panel__label {
  color: var(--color-accent-600);
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

// Metrics
.metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric__value {
  font-size: var(--text-2xl);
  font-weight: 800;
  font-family: var(--font-heading);
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: var(--text-3xl);
  }
}

.metric__value--poor {
  color: color-mix(in srgb, var(--color-text-muted) 70%, transparent);
}

.metric__value--good {
  color: var(--color-accent-600);
}

.metric__label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: var(--text-sm);
  }
}

// Slider handle
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
  background: var(--color-accent-500);
}

.slider-grip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-accent-500);
  border: 3px solid var(--color-surface-1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  cursor: ew-resize;
}

.slider-grip__icon {
  width: 20px;
  height: 20px;
  color: white;
}

// Dark mode
:root.dark {
  .before-after {
    background: var(--color-section-dark);
  }

  .panel--before {
    background: var(--color-surface-2);
  }

  .panel--after {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--color-accent-500) 10%, var(--color-surface-2)),
      var(--color-surface-2)
    );
  }

  .panel--after .panel__label {
    color: var(--color-accent-400);
  }

  .metric__value--good {
    color: var(--color-accent-400);
  }

  .section-badge {
    background: var(--color-accent-900);
    color: var(--color-accent-300);
  }

  .slider-grip {
    border-color: var(--color-surface-2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .comparison-slider {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
