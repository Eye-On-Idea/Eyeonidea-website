<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import {
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Color,
} from "three";

// Props for customization
const props = withDefaults(
  defineProps<{
    particleCount?: number;
    waveSpeed?: number;
    waveAmplitude?: number;
    primaryColor?: string;
    secondaryColor?: string;
  }>(),
  {
    particleCount: 5000,
    waveSpeed: 0.5,
    waveAmplitude: 0.8,
    primaryColor: "#dfaf85", // primary-200
    secondaryColor: "#64c6b7", // accent-300
  }
);

// Refs for Three.js objects
const pointsRef = ref<THREE.Points | null>(null);
const geometryRef = ref<BufferGeometry | null>(null);
const time = ref(0);

// Reduced motion preference
const prefersReducedMotion = ref(false);

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Listen for changes
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleChange = (e: MediaQueryListEvent) => {
    prefersReducedMotion.value = e.matches;
  };
  mediaQuery.addEventListener("change", handleChange);

  onUnmounted(() => {
    mediaQuery.removeEventListener("change", handleChange);
  });
});

// Create particle geometry
const createParticles = () => {
  const geometry = new BufferGeometry();
  const positions = new Float32Array(props.particleCount * 3);
  const colors = new Float32Array(props.particleCount * 3);
  const sizes = new Float32Array(props.particleCount);

  const primaryCol = new Color(props.primaryColor);
  const secondaryCol = new Color(props.secondaryColor);

  for (let i = 0; i < props.particleCount; i++) {
    // Distribute particles in a wide plane
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Interpolate between primary and secondary colors
    const mixFactor = Math.random();
    const color = primaryCol.clone().lerp(secondaryCol, mixFactor);

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    sizes[i] = Math.random() * 0.5 + 0.1;
  }

  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geometry.setAttribute("size", new Float32BufferAttribute(sizes, 1));

  return geometry;
};

// Create material
const createMaterial = () => {
  return new PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
};

// Animation loop
const { onLoop } = useRenderLoop();

onLoop(({ delta }) => {
  if (prefersReducedMotion.value) return;
  if (!pointsRef.value || !geometryRef.value) return;

  time.value += delta * props.waveSpeed;

  const positions = geometryRef.value.attributes.position.array as Float32Array;
  const originalPositions =
    geometryRef.value.userData.originalPositions as Float32Array;

  if (!originalPositions) {
    // Store original positions on first run
    geometryRef.value.userData.originalPositions = new Float32Array(positions);
    return;
  }

  for (let i = 0; i < positions.length; i += 3) {
    const x = originalPositions[i];
    const z = originalPositions[i + 2];

    // Create flowing wave effect
    const waveX = Math.sin(x * 0.5 + time.value) * props.waveAmplitude;
    const waveZ = Math.cos(z * 0.5 + time.value * 0.8) * props.waveAmplitude;

    positions[i + 1] =
      originalPositions[i + 1] + waveX * 0.5 + waveZ * 0.3;
  }

  geometryRef.value.attributes.position.needsUpdate = true;
});

// Initialize geometry and material
const geometry = createParticles();
const material = createMaterial();
geometryRef.value = geometry;
</script>

<template>
  <TresCanvas
    clear-color="transparent"
    :alpha="true"
    class="particle-canvas"
    :dpr="[1, 2]"
    :shadows="false"
    :legacy="false"
  >
    <TresPerspectiveCamera :position="[0, 0, 8]" :fov="60" />
    <TresAmbientLight :intensity="0.5" />

    <TresPoints ref="pointsRef" :geometry="geometry" :material="material">
      <TresBufferGeometry ref="geometryRef" />
    </TresPoints>
  </TresCanvas>
</template>

<style scoped>
.particle-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

@media (prefers-reduced-motion: reduce) {
  .particle-canvas {
    opacity: 0.5;
  }
}
</style>
