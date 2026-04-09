<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useScrollProgress } from "~/composables/useScrollProgress";

const { smoothedProgress, reducedMotion, sectionProgress } = useScrollProgress();

const isMobile = ref(false);
onMounted(() => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
});

const servicesProgress = sectionProgress(0.18, 0.68);
const valuesProgress   = sectionProgress(0.55, 0.78);
const ctaProgress      = sectionProgress(0.72, 0.90);

const servicesOpacity = computed(() => {
  const p = smoothedProgress.value;
  if (p < 0.14) return 0;
  if (p < 0.22) return (p - 0.14) / 0.08;
  if (p > 0.70) return Math.max(0, 1 - (p - 0.70) / 0.08);
  return 1;
});

const valuesOpacity = computed(() => {
  const p = smoothedProgress.value;
  if (p < 0.52) return 0;
  if (p < 0.60) return (p - 0.52) / 0.08;
  if (p > 0.78) return Math.max(0, 1 - (p - 0.78) / 0.07);
  return 1;
});

const ctaOpacity = computed(() => {
  const p = smoothedProgress.value;
  if (p < 0.70) return 0;
  if (p < 0.78) return (p - 0.70) / 0.08;
  return 1;
});

const sceneState = useSceneState();

const dpr = computed<[number, number]>(() => isMobile.value ? [1, 1] : [1, 2]);
</script>

<template>
  <div class="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
    <TresCanvas
      clear-color="#481f0a"
      :alpha="false"
      :dpr="dpr"
      :shadows="false"
      :legacy="false"
      window-size
    >
      <TresPerspectiveCamera :position="[0, 0, 7]" :fov="60" />

      <ThreeCameraController
        :smoothed-progress="smoothedProgress"
        :reduced-motion="reducedMotion"
      />

      <TresAmbientLight :intensity="0.3" />
      <TresDirectionalLight
        :position="[5, 8, 5]"
        :intensity="1.2"
        color="#ffe4cf"
        :cast-shadow="false"
      />
      <TresPointLight
        :position="[-4, -2, 3]"
        :intensity="0.8"
        color="#64c6b7"
        :distance="20"
      />

      <Environment preset="city" />

      <ThreeObjectsServiceChapters
        :section-progress="servicesProgress"
        :opacity="servicesOpacity"
        :active-service-index="sceneState.activeServiceIndex"
        :reduced-motion="reducedMotion"
      />

      <ThreeObjectsValuesOrbs
        :section-progress="valuesProgress"
        :opacity="valuesOpacity"
        :reduced-motion="reducedMotion"
        :is-mobile="isMobile"
      />

      <ThreeObjectsCTAShape
        :section-progress="ctaProgress"
        :opacity="ctaOpacity"
        :reduced-motion="reducedMotion"
      />
    </TresCanvas>
  </div>
</template>
