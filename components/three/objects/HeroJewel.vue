<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useLoop } from "@tresjs/core";
import { MeshPhysicalMaterial, Vector2 } from "three";

const props = defineProps<{
  opacity?: number;
  reducedMotion?: boolean;
}>();

const meshRef = ref();
const time = ref(0);
const mouseTarget = new Vector2(0, 0);
const mouseCurrent = new Vector2(0, 0);
const startTime = ref(0);

const material = new MeshPhysicalMaterial({
  transmission: 0.92,
  roughness: 0.05,
  metalness: 0.1,
  ior: 1.7,
  thickness: 3.5,
  color: 0xdfaf85,
  emissive: 0x481f0a,
  emissiveIntensity: 0.2,
  envMapIntensity: 2.0,
  transparent: true,
  opacity: 1,
});

const onMouseMove = (e: MouseEvent) => {
  mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2;
};

onMounted(() => {
  startTime.value = performance.now();
  window.addEventListener("mousemove", onMouseMove, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove);
  material.dispose();
});

const { onBeforeRender } = useLoop();

onBeforeRender(({ delta, elapsed }) => {
  if (!meshRef.value) return;

  time.value = elapsed;

  material.opacity = props.opacity ?? 1;

  const entranceT = Math.min((performance.now() - startTime.value) / 2000, 1);
  const scale = entranceT < 1 ? entranceT * (2 - entranceT) : 1;
  meshRef.value.scale.setScalar(scale);

  if (props.reducedMotion) return;

  meshRef.value.rotation.y += delta * 0.15;

  meshRef.value.position.y = Math.sin(elapsed * 0.5) * 0.12;

  mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.04;
  mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.04;
  meshRef.value.rotation.x = mouseCurrent.y * 0.09;
  meshRef.value.rotation.z = -mouseCurrent.x * 0.05;
});
</script>

<template>
  <TresMesh ref="meshRef" :position="[0, 0, 0]">
    <TresDodecahedronGeometry :args="[1.8, 0]" />
    <primitive :object="material" />
  </TresMesh>
</template>
