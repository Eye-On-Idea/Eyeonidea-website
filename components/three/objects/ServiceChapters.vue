<script setup lang="ts">
import { ref } from "vue";
import { useLoop } from "@tresjs/core";
import {
  MeshPhysicalMaterial,
  BoxGeometry,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  Color,
} from "three";

const props = defineProps<{
  sectionProgress: number;
  opacity: number;
  activeServiceIndex: number;
  reducedMotion: boolean;
}>();

const PANELS = [
  { key: "websites", pos: [ 2.0,   0.0,  0.8], baseScale: 1.20, tilt: [0,  0.08, 0] },
  { key: "identity", pos: [ 1.8,   0.3,  0.4], baseScale: 1.00, tilt: [0,  0.12, 0] },
  { key: "content",  pos: [ 2.2,  -0.2,  0.0], baseScale: 0.95, tilt: [0,  0.06, 0] },
  { key: "seo",      pos: [ 1.9,   0.2, -0.3], baseScale: 1.00, tilt: [0,  0.10, 0] },
  { key: "email",    pos: [ 2.1,  -0.1, -0.6], baseScale: 0.90, tilt: [0,  0.08, 0] },
  { key: "domain",   pos: [ 1.7,   0.1, -1.0], baseScale: 0.90, tilt: [0,  0.12, 0] },
  { key: "qa",       pos: [ 2.0,  -0.3, -1.4], baseScale: 0.85, tilt: [0,  0.06, 0] },
] as const;

const slabGeo  = new BoxGeometry(2.2, 1.45, 0.07);
const edgesGeo = new EdgesGeometry(slabGeo);

const materials = PANELS.map(() =>
  new MeshPhysicalMaterial({
    color: new Color(0x3a1f0d),
    emissive: new Color(0xdfaf85),
    emissiveIntensity: 0,
    roughness: 0.15,
    metalness: 0.08,
    transmission: 0.30,
    thickness: 0.07,
    envMapIntensity: 2.0,
    transparent: true,
    opacity: 1,
  })
);

const edgeMaterials = PANELS.map(() =>
  new LineBasicMaterial({ color: 0x64c6b7, transparent: true, opacity: 0.55 })
);
const edgeLines = PANELS.map((_, i) => new LineSegments(edgesGeo, edgeMaterials[i]));

const groupRefs = PANELS.map(() => ref<any>(null));
const currentYOffsets = PANELS.map((p) => ref(p.pos[1] - 4.0));
const currentScales   = PANELS.map((p) => ref(p.baseScale * 0.94));

onUnmounted(() => {
  materials.forEach((m) => m.dispose());
  edgeMaterials.forEach((m) => m.dispose());
  slabGeo.dispose();
  edgesGeo.dispose();
});

const { onBeforeRender } = useLoop();

onBeforeRender(({ elapsed }) => {
  const sp           = props.sectionProgress;
  const globalOpacity = props.opacity;
  const activeIdx    = props.activeServiceIndex;
  const lerpFactor   = props.reducedMotion ? 1 : 0.045;

  PANELS.forEach((panel, i) => {
    const groupRef = groupRefs[i];
    const yOffsetRef = currentYOffsets[i];
    const scaleRef = currentScales[i];
    const panelMat = materials[i];
    const edgeMat = edgeMaterials[i];
    const edgeLine = edgeLines[i];
    if (!groupRef || !yOffsetRef || !scaleRef || !panelMat || !edgeMat || !edgeLine) return;

    const group = groupRef.value;
    if (!group) return;

    const entranceStart = i * 0.03;
    const entered       = sp > entranceStart;
    const targetY       = props.reducedMotion || entered
      ? panel.pos[1]
      : panel.pos[1] - 4.0;

    yOffsetRef.value += (targetY - yOffsetRef.value) * lerpFactor;
    group.position.set(panel.pos[0], yOffsetRef.value, panel.pos[2]);

    const isActive      = activeIdx === i;
    const targetScale   = isActive ? panel.baseScale * 1.12 : panel.baseScale * 0.94;
    const targetEmissive = isActive ? 0.18 : 0;
    const targetEdgeOp  = isActive ? 1.0 : 0.35;

    scaleRef.value += (targetScale - scaleRef.value) * lerpFactor;
    group.scale.setScalar(scaleRef.value);

    panelMat.emissiveIntensity +=
      (targetEmissive - panelMat.emissiveIntensity) * lerpFactor;
    panelMat.opacity  = globalOpacity;
    edgeMat.opacity +=
      ((targetEdgeOp * globalOpacity) - edgeMat.opacity) * lerpFactor;

    if (!props.reducedMotion && !isActive) {
      group.position.y += Math.sin(elapsed * 0.35 + i * 0.9) * 0.018;
    }

    if (group.children.length < 2) {
      group.add(edgeLine);
    }
  });
});
</script>

<template>
  <TresGroup>
    <TresGroup
      v-for="(panel, i) in PANELS"
      :key="panel.key"
      :ref="(el: any) => { if (groupRefs[i]) groupRefs[i].value = el }"
      :rotation="panel.tilt as [number, number, number]"
    >
      <TresMesh>
        <TresBoxGeometry :args="[2.2, 1.45, 0.07]" />
        <primitive :object="materials[i] ?? materials[0]" />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
