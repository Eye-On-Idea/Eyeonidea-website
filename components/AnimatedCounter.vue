<script setup lang="ts">
const props = defineProps<{
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  easing?: "linear" | "easeOut" | "easeInOut";
  label?: string;
  description?: string;
}>();

const { targetRef, formattedValue } = useScrollTriggeredCounter(props.value, {
  duration: props.duration || 2000,
  decimals: props.decimals || 0,
  suffix: props.suffix || "",
  prefix: props.prefix || "",
  easing: props.easing || "easeOut",
  threshold: 0.5,
});
</script>

<template>
  <div
    ref="targetRef"
    class="animated-counter"
  >
    <div class="counter-value">
      {{ formattedValue }}
    </div>
    <div v-if="label" class="counter-label">
      {{ label }}
    </div>
    <div v-if="description" class="counter-description">
      {{ description }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.animated-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.counter-value {
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--color-primary-300) 0%, var(--color-accent-400) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.counter-label {
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  font-weight: 700;
  color: white;
  margin-top: 0.5rem;
}

.counter-description {
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: var(--color-neutral-300);
  margin-top: 0.25rem;
  max-width: 18rem;
}

/* Dark mode adjustments (in case used outside dark hero) */
:global(.dark) .counter-label {
  color: var(--color-primary-100);
}

:global(.dark) .counter-description {
  color: var(--color-primary-300);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .counter-value {
    transition: none;
  }
}
</style>
