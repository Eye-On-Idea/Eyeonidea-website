<script setup lang="ts">
import { useLoop, useTres } from "@tresjs/core";
import { Vector3 } from "three";
import { useCameraPath } from "~/composables/useCameraPath";

const props = defineProps<{
  smoothedProgress: number;
  reducedMotion: boolean;
}>();

const { getCameraAtProgress } = useCameraPath();

const cameraPos = new Vector3();
const cameraTarget = new Vector3();

const { onBeforeRender } = useLoop();
const { camera } = useTres();

onBeforeRender(() => {
  if (!camera.value) return;
  const { position, target } = getCameraAtProgress(props.smoothedProgress);
  const lerpFactor = props.reducedMotion ? 1.0 : 0.06;
  cameraPos.copy(camera.value.position).lerp(position, lerpFactor);
  camera.value.position.copy(cameraPos);
  cameraTarget.copy(target);
  camera.value.lookAt(cameraTarget);
});
</script>

<template>

  <slot />
</template>
