<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useLoop } from "@tresjs/core";
import type { BufferGeometry } from "three";

const props = defineProps<{
  waveSpeed: number;
  waveAmplitude: number;
  geometry: BufferGeometry;
}>();

const pointsRef = ref(null);
const time = ref(0);
const prefersReducedMotion = ref(false);

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleChange = (e: MediaQueryListEvent) => {
    prefersReducedMotion.value = e.matches;
  };
  mediaQuery.addEventListener("change", handleChange);

  onUnmounted(() => {
    mediaQuery.removeEventListener("change", handleChange);
  });
});

const { onBeforeRender } = useLoop();

onBeforeRender(({ delta }) => {
  if (prefersReducedMotion.value) return;
  if (!props.geometry) return;
  const positionAttribute = props.geometry.getAttribute("position");
  if (!positionAttribute) return;

  time.value += delta * props.waveSpeed;

  const positions = positionAttribute.array as Float32Array;
  const originalPositions =
    props.geometry.userData.originalPositions as Float32Array;

  if (!originalPositions) {
    props.geometry.userData.originalPositions = new Float32Array(positions);
    return;
  }

  for (let i = 0; i < positions.length; i += 3) {
    const x = originalPositions[i];
    const y = originalPositions[i + 1];
    const z = originalPositions[i + 2];
    if (x === undefined || y === undefined || z === undefined) continue;

    const waveX = Math.sin(x * 0.5 + time.value) * props.waveAmplitude;
    const waveZ = Math.cos(z * 0.5 + time.value * 0.8) * props.waveAmplitude;

    positions[i + 1] =
      y + waveX * 0.5 + waveZ * 0.3;
  }

  positionAttribute.needsUpdate = true;
});
</script>

<template>
  <TresPoints ref="pointsRef" :geometry="geometry">
    <slot />
  </TresPoints>
</template>
