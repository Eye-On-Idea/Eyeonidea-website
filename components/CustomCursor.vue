<script setup lang="ts">
const { cursorX, cursorY, isHovering, prefersReducedMotion } =
  useCursorFollow();

const isMobile = ref(false);

onMounted(() => {
  isMobile.value =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(max-width: 1024px)").matches;
});

const showCursor = computed(
  () => !prefersReducedMotion.value && !isMobile.value
);
</script>

<template>
  <div v-if="showCursor" class="custom-cursor-wrapper">
    <div
      class="custom-cursor-dot"
      :style="{
        transform: `translate(${cursorX}px, ${cursorY}px)`,
      }"
      :class="{ 'cursor-hovering': isHovering }"
    ></div>

    <div
      class="custom-cursor-ring"
      :style="{
        transform: `translate(${cursorX}px, ${cursorY}px)`,
      }"
      :class="{ 'cursor-hovering': isHovering }"
    ></div>
  </div>
</template>

<style scoped>
.custom-cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}

.custom-cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--color-primary-400);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: width 0.3s var(--ease-smooth), height 0.3s var(--ease-smooth), background 0.3s var(--ease-smooth);
  margin-left: -4px;
  margin-top: -4px;
}

.custom-cursor-dot.cursor-hovering {
  width: 16px;
  height: 16px;
  margin-left: -8px;
  margin-top: -8px;
  background: var(--color-accent-400);
}

.custom-cursor-ring {
  position: fixed;
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-primary-400);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.5;
  transition: width 0.3s var(--ease-smooth), height 0.3s var(--ease-smooth), opacity 0.3s var(--ease-smooth),
    border-color 0.3s var(--ease-smooth);
  margin-left: -16px;
  margin-top: -16px;
}

.custom-cursor-ring.cursor-hovering {
  width: 48px;
  height: 48px;
  margin-left: -24px;
  margin-top: -24px;
  opacity: 0.8;
  border-color: var(--color-accent-400);
}

:global(body.custom-cursor-active) {
  cursor: none;
}

:global(body.custom-cursor-active a),
:global(body.custom-cursor-active button),
:global(body.custom-cursor-active .cursor-interactive) {
  cursor: none;
}
</style>
