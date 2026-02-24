<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

export interface BeforeAfterMetric {
  label: string;
  before: string;
  after: string;
  unit: string;
  improved: boolean;
}

export interface BeforeAfterData {
  title: string;
  subtitle: string;
  beforeLabel: string;
  afterLabel: string;
  metrics: BeforeAfterMetric[];
}

const props = defineProps<{
  data: BeforeAfterData;
  isClient?: boolean; // true = accent colors, false = primary colors
}>();

const sectionRef = ref<HTMLElement | null>(null);
const sliderRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const sliderPosition = ref(50);
const isDragging = ref(false);

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
    { threshold: 0.1 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <div ref="sectionRef" class="cs-ba">
    <!-- Header -->
    <div class="cs-ba__header" :class="{ 'cs-ba__header--visible': isVisible }">
      <h2 class="cs-ba__title">{{ data.title }}</h2>
      <p class="cs-ba__subtitle">{{ data.subtitle }}</p>
    </div>

    <!-- Slider -->
    <div
      ref="sliderRef"
      class="cs-ba__slider"
      :class="{ 'cs-ba__slider--visible': isVisible }"
      role="slider"
      :aria-valuenow="Math.round(sliderPosition)"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Drag to compare before and after metrics"
      tabindex="0"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown="onKeyDown"
    >
      <!-- Before panel -->
      <div class="cs-ba__panel cs-ba__panel--before">
        <span class="cs-ba__panel-label">{{ data.beforeLabel }}</span>
        <div class="cs-ba__metrics">
          <div
            v-for="(metric, i) in data.metrics"
            :key="`before-${i}`"
            class="cs-ba__metric"
          >
            <span class="cs-ba__metric-value cs-ba__metric-value--before">
              {{ metric.before }}{{ metric.unit }}
            </span>
            <span class="cs-ba__metric-label">{{ metric.label }}</span>
          </div>
        </div>
      </div>

      <!-- After panel (clipped) -->
      <div
        class="cs-ba__panel cs-ba__panel--after"
        :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
      >
        <span class="cs-ba__panel-label cs-ba__panel-label--after">{{ data.afterLabel }}</span>
        <div class="cs-ba__metrics">
          <div
            v-for="(metric, i) in data.metrics"
            :key="`after-${i}`"
            class="cs-ba__metric"
          >
            <span class="cs-ba__metric-value cs-ba__metric-value--after">
              {{ metric.after }}{{ metric.unit }}
            </span>
            <span class="cs-ba__metric-label">{{ metric.label }}</span>
          </div>
        </div>
      </div>

      <!-- Drag handle -->
      <div
        class="cs-ba__handle"
        :style="{ left: `${sliderPosition}%` }"
        aria-hidden="true"
      >
        <div class="cs-ba__handle-line" />
        <div class="cs-ba__handle-grip">
          <UIcon name="i-heroicons-arrows-right-left" class="cs-ba__handle-icon" />
        </div>
      </div>
    </div>

    <!-- Hint -->
    <p class="cs-ba__hint" aria-hidden="true">
      <UIcon name="i-heroicons-cursor-arrow-rays" class="w-4 h-4" />
      Drag to compare
    </p>
  </div>
</template>

<style lang="scss" scoped>
.cs-ba {
  padding: 3rem 0 0;
}

.cs-ba__header {
  text-align: center;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.cs-ba__title {
  font-size: clamp(1.375rem, 3vw, 1.875rem);
  font-weight: 700;
  color: var(--color-text-heading);
  margin-bottom: 0.5rem;
}

.cs-ba__subtitle {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

// Slider
.cs-ba__slider {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  cursor: ew-resize;
  user-select: none;
  touch-action: none;
  border: 1px solid var(--color-border);
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.15s,
    transform 0.6s var(--ease-smooth) 0.15s;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-400);
    outline-offset: 4px;
  }
}

// Panels
.cs-ba__panel {
  padding: 2rem 1.75rem;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 640px) {
    padding: 2.5rem;
    min-height: 280px;
  }

  &--before {
    background: var(--color-surface-2);
  }

  &--after {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--color-primary-800) 92%, var(--color-primary-600)),
      var(--color-primary-800)
    );
    z-index: 1;
  }
}

.cs-ba__panel-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);

  &--after {
    color: var(--color-primary-200);
  }
}

.cs-ba__metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem 1.5rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
}

.cs-ba__metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cs-ba__metric-value {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;

  &--before {
    color: var(--color-text-muted);
    opacity: 0.6;
  }

  &--after {
    color: var(--color-primary-100);
  }
}

.cs-ba__metric-label {
  font-size: 0.75rem;
  font-weight: 500;

  .cs-ba__panel--before & {
    color: var(--color-text-muted);
  }

  .cs-ba__panel--after & {
    color: var(--color-primary-300);
  }
}

// Drag handle
.cs-ba__handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  z-index: 2;
  pointer-events: none;
}

.cs-ba__handle-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -1px;
  width: 2px;
  background: var(--color-primary-300);
  box-shadow: 0 0 8px color-mix(in srgb, var(--color-primary-400) 60%, transparent);
}

.cs-ba__handle-grip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-primary-500);
  border: 3px solid var(--color-primary-100);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 0 4px color-mix(in srgb, var(--color-primary-500) 30%, transparent),
    0 4px 12px rgba(0, 0, 0, 0.25);
  pointer-events: auto;
  cursor: ew-resize;
}

.cs-ba__handle-icon {
  width: 18px;
  height: 18px;
  color: #fff;
}

.cs-ba__hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin-top: 0.875rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

// Dark mode
:root.dark {
  .cs-ba__panel--before {
    background: color-mix(in srgb, var(--color-surface-2) 60%, var(--color-primary-950));
  }

  .cs-ba__panel--after {
    background: linear-gradient(
      135deg,
      var(--color-primary-900),
      color-mix(in srgb, var(--color-primary-800) 80%, var(--color-primary-950))
    );
  }

  .cs-ba__metric-value--after {
    color: var(--color-primary-200);
  }

  .cs-ba__panel-label--after {
    color: var(--color-primary-300);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cs-ba__header,
  .cs-ba__slider {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
