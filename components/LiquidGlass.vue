<!-- Reserved for rare showcase use only — not currently mounted anywhere -->
<script setup lang="ts">
import { LiquidGlass as LiquidGlassBase } from "@wxperia/liquid-glass-vue";

defineProps<{
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  cornerRadius?: number;
  padding?: string;
  overLight?: boolean;
}>();
</script>

<template>
  <LiquidGlassBase
    :displacement-scale="displacementScale ?? 30"
    :blur-amount="blurAmount ?? 8"
    :saturation="saturation ?? 1.2"
    :aberration-intensity="aberrationIntensity ?? 0.5"
    :elasticity="elasticity ?? 0.15"
    :corner-radius="cornerRadius ?? 16"
    :padding="padding ?? '0'"
    :over-light="overLight ?? false"
  >
    <slot />
  </LiquidGlassBase>
</template>
