<script setup lang="ts">
import { useAccessibleMotion } from "~/composables/useAccessibleMotion";

const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "default" | "herqulez" | "dots";
    text?: string;
    center?: boolean;
  }>(),
  {
    size: "md",
    variant: "herqulez",
    text: "",
    center: false,
  }
);

const { prefersReducedMotion } = useAccessibleMotion();

const sizeClasses = computed(() => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };
  return sizes[props.size];
});

const dotSizeClasses = computed(() => {
  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
    xl: "w-6 h-6",
  };
  return sizes[props.size];
});

const textSizeClasses = computed(() => {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };
  return sizes[props.size];
});
</script>

<template>
  <div
    :class="[
      'loading-spinner-wrapper',
      { 'flex items-center justify-center min-h-[200px]': center },
      { 'inline-flex items-center gap-3': !center },
    ]"
  >
    <!-- Herqulez Branded Spinner -->
    <div
      v-if="variant === 'herqulez'"
      :class="[sizeClasses, 'herqulez-spinner']"
      role="status"
      aria-live="polite"
    >
      <span class="sr-only">{{
        text || "Loading Herqulez content..."
      }}</span>
    </div>

    <!-- Default Spinner -->
    <div
      v-else-if="variant === 'default'"
      :class="[sizeClasses, 'spinner']"
      role="status"
      aria-live="polite"
    >
      <div
        class="w-full h-full border-4 border-gray-200 dark:border-gray-700 border-t-brand-500 rounded-full"
      ></div>
      <span class="sr-only">{{ text || "Loading..." }}</span>
    </div>

    <!-- Loading Dots -->
    <div
      v-else-if="variant === 'dots'"
      class="flex items-center gap-2"
      role="status"
      aria-live="polite"
    >
      <div
        :class="[dotSizeClasses, 'loading-dot rounded-full bg-brand-500']"
      ></div>
      <div
        :class="[dotSizeClasses, 'loading-dot rounded-full bg-brand-500']"
      ></div>
      <div
        :class="[dotSizeClasses, 'loading-dot rounded-full bg-brand-500']"
      ></div>
      <span class="sr-only">{{ text || "Loading..." }}</span>
    </div>

    <!-- Loading Text -->
    <p
      v-if="text && !prefersReducedMotion"
      :class="[textSizeClasses, 'text-gray-700 dark:text-gray-300']"
    >
      {{ text }}
    </p>
    <p
      v-else-if="text && prefersReducedMotion"
      :class="[textSizeClasses, 'text-gray-700 dark:text-gray-300']"
    >
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
