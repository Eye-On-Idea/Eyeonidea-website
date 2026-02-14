<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import {
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Color,
} from "three";

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
    primaryColor: "#dfaf85",
    secondaryColor: "#64c6b7",
  }
);

const createParticles = () => {
  const geometry = new BufferGeometry();
  const positions = new Float32Array(props.particleCount * 3);
  const colors = new Float32Array(props.particleCount * 3);
  const sizes = new Float32Array(props.particleCount);

  const primaryCol = new Color(props.primaryColor);
  const secondaryCol = new Color(props.secondaryColor);

  for (let i = 0; i < props.particleCount; i++) {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

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

const geometry = createParticles();
const material = createMaterial();
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

    <ThreeParticleWaveAnimation
      :wave-speed="waveSpeed"
      :wave-amplitude="waveAmplitude"
      :geometry="geometry"
    >
      <TresPointsMaterial
        :size="0.05"
        :vertex-colors="true"
        :transparent="true"
        :opacity="0.6"
        :depth-write="false"
        :size-attenuation="true"
      />
    </ThreeParticleWaveAnimation>
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
