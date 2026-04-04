<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { useLoop } from "@tresjs/core";
import { MeshPhysicalMaterial, MeshStandardMaterial } from "three";

const props = defineProps<{
  sectionProgress?: number; // 0–1, this shape's appearance range
  opacity?: number;
  reducedMotion?: boolean;
}>();

const groupRef = ref();
const torusRef = ref();
const currentScale = ref(0);

// Outer eyelid ring — teal, slightly emissive
const torusMat = new MeshPhysicalMaterial({
  metalness: 0.5,
  roughness: 0.2,
  color: 0x64c6b7,
  emissive: 0x2a9386,
  emissiveIntensity: 0.4,
  envMapIntensity: 2.0,
  transparent: true,
  opacity: 1,
});

// Iris sphere — warm gold
const irisMat = new MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.15,
  color: 0xdfaf85,
  emissive: 0x481f0a,
  emissiveIntensity: 0.3,
  transparent: true,
  opacity: 1,
});

// Pupil — dark
const pupilMat = new MeshStandardMaterial({
  metalness: 0.2,
  roughness: 0.6,
  color: 0x1a0a04,
  transparent: true,
  opacity: 1,
});

onUnmounted(() => {
  torusMat.dispose();
  irisMat.dispose();
  pupilMat.dispose();
});

const { onBeforeRender } = useLoop();

onBeforeRender(({ elapsed, delta }) => {
  if (!groupRef.value) return;

  const sp = props.sectionProgress ?? 0;
  const globalOpacity = props.opacity ?? 1;

  // Spring-like scale entrance (reuse existing easing)
  const lerpFactor = props.reducedMotion ? 1 : 0.05;
  currentScale.value += (sp - currentScale.value) * lerpFactor;
  const eased =
    currentScale.value < 1
      ? 1 - Math.pow(1 - currentScale.value, 3) * (1 + 0.25 * Math.sin(currentScale.value * Math.PI))
      : 1;

  groupRef.value.scale.setScalar(eased);

  // Opacity
  torusMat.opacity = globalOpacity;
  irisMat.opacity = globalOpacity;
  pupilMat.opacity = globalOpacity;
  torusMat.emissiveIntensity = 0.4 + sp * 0.3;

  if (!props.reducedMotion) {
    // Slow Z rotation on the torus (eyelid blink feel)
    if (torusRef.value) torusRef.value.rotation.z += delta * 0.18;
    // Gentle bob
    groupRef.value.position.y = -0.3 + Math.sin(elapsed * 0.5) * 0.1;
  }
});
</script>

<template>
  <!-- Eye / Iris shape: horizontally flattened torus + iris + pupil -->
  <TresGroup ref="groupRef" :position="[1.5, -0.3, 0]">
    <!-- Outer eyelid ring — stretched horizontally via scaleY -->
    <TresMesh ref="torusRef" :scale="[1, 0.45, 1]">
      <TresTorusGeometry :args="[1.5, 0.08, 16, 80]" />
      <primitive :object="torusMat" />
    </TresMesh>

    <!-- Iris sphere -->
    <TresMesh>
      <TresSphereGeometry :args="[0.55, 32, 32]" />
      <primitive :object="irisMat" />
    </TresMesh>

    <!-- Pupil -->
    <TresMesh :position="[0, 0, 0.45]">
      <TresSphereGeometry :args="[0.2, 16, 16]" />
      <primitive :object="pupilMat" />
    </TresMesh>
  </TresGroup>
</template>
