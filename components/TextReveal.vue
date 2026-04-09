<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { STAGGER_TEXT } from "~/composables/useAccessibleMotion";

const props = withDefaults(
  defineProps<{

    text: string;

    tag?: string;

    delay?: number;

    stagger?: number;

    triggerOnMount?: boolean;

    wordClass?: string;

    trigger?: boolean;
  }>(),
  {
    tag: "span",
    delay: 0,
    stagger: STAGGER_TEXT,
    triggerOnMount: false,
    wordClass: "",
    trigger: true,
  }
);

const containerRef = ref<HTMLElement | null>(null);
const isRevealed = ref(false);
let pendingReveal = false;

const words = computed(() => props.text.split(/\s+/).filter(Boolean));

let observer: IntersectionObserver | null = null;

const doReveal = () => {
  if (!props.trigger) {
    pendingReveal = true;
    return;
  }
  setTimeout(() => {
    isRevealed.value = true;
  }, props.delay);
};

watch(
  () => props.trigger,
  (val) => {
    if (val && pendingReveal) {
      pendingReveal = false;
      setTimeout(() => {
        isRevealed.value = true;
      }, props.delay);
    }
  }
);

onMounted(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) {
    isRevealed.value = true;
    return;
  }

  if (props.triggerOnMount) {
    doReveal();
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        doReveal();
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

