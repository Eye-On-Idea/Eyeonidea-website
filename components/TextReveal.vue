<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    /** The text to reveal word-by-word */
    text: string;
    /** HTML tag to render */
    tag?: string;
    /** Delay before the first word appears (ms) */
    delay?: number;
    /** Delay between each word (ms) */
    stagger?: number;
    /** Whether to trigger on mount vs. on viewport entry */
    triggerOnMount?: boolean;
    /** CSS class to apply to each word span (e.g. for gradient text) */
    wordClass?: string;
  }>(),
  {
    tag: "span",
    delay: 0,
    stagger: 60,
    triggerOnMount: false,
    wordClass: "",
  }
);

const containerRef = ref<HTMLElement | null>(null);
const isRevealed = ref(false);

const words = computed(() => props.text.split(/\s+/).filter(Boolean));

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) {
    isRevealed.value = true;
    return;
  }

  if (props.triggerOnMount) {
    setTimeout(() => {
      isRevealed.value = true;
    }, props.delay);
    return;
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          isRevealed.value = true;
        }, props.delay);
        observer?.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  if (containerRef.value) {
    observer.observe(containerRef.value);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <component
    :is="tag"
    ref="containerRef"
    class="text-reveal"
  >
    <span
      v-for="(word, i) in words"
      :key="i"
      class="text-reveal__word"
      :class="[wordClass, { 'text-reveal__word--visible': isRevealed }]"
      :style="{ transitionDelay: `${i * stagger}ms` }"
    >{{ word }}<span v-if="i < words.length - 1">&nbsp;</span></span>
  </component>
</template>

<style scoped>
.text-reveal {
  display: inline;
}

.text-reveal__word {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.3em);
  filter: blur(4px);
  transition:
    opacity var(--duration-slow) var(--ease-smooth),
    transform var(--duration-slow) var(--ease-smooth),
    filter var(--duration-slow) var(--ease-smooth);
}

.text-reveal__word--visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .text-reveal__word {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
}
</style>
