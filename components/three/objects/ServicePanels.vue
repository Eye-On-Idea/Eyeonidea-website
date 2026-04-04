<script setup lang="ts">
import { ref } from "vue";
import { useLoop } from "@tresjs/core";
import { MeshPhysicalMaterial, MeshStandardMaterial, EdgesGeometry, BoxGeometry, LineSegments, LineBasicMaterial } from "three";

const props = defineProps<{
  sectionProgress?: number; // 0–1 across the services section scroll range
  opacity?: number;
  reducedMotion?: boolean;
}>();

// Positions shifted right by ~1.5 units for the split layout right column
const panels = [
  {
    color: 0xd39a69,
    emissive: 0xb87343,
    edgeColor: 0x64c6b7,
    position: [-1.5, 0, 0] as [number, number, number],
    rotation: [0, 0.25, 0] as [number, number, number],
    scale: [1, 1, 1] as [number, number, number],
    activeAt: 0.2,
  },
  {
    color: 0xdfaf85,
    emissive: 0xd39a69,
    edgeColor: 0x9eddd2,
    position: [1.5, 0.3, 1.5] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: [1.1, 1.1, 1.1] as [number, number, number],
    activeAt: 0.5,
  },
  {
    color: 0xb87343,
    emissive: 0x995226,
    edgeColor: 0x64c6b7,
    position: [4.5, 0, 0] as [number, number, number],
    rotation: [0, -0.25, 0] as [number, number, number],
    scale: [1, 1, 1] as [number, number, number],
    activeAt: 0.8,
  },
];

// Create materials per panel
const materials = panels.map((p) =>
  new MeshPhysicalMaterial({
    color: p.color,
    emissive: p.emissive,
    emissiveIntensity: 0.15,
    roughness: 0.2,
    metalness: 0.05,
    transmission: 0.6,
    thickness: 0.2,
    transparent: true,
    opacity: 1,
  })
);

// Screen face material — simulates a device display
const screenMat = new MeshStandardMaterial({
  color: 0x1a1a2e,
  emissive: 0x0d0d1a,
  emissiveIntensity: 0.8,
  roughness: 0.8,
  metalness: 0.0,
  transparent: true,
  opacity: 1,
});

// Slightly thicker box (0.14) for a device-like feel
const boxGeo = new BoxGeometry(2.8, 3.8, 0.14);
const edgesGeo = new EdgesGeometry(boxGeo);
const edgeMaterials = panels.map((p) =>
  new LineBasicMaterial({ color: p.edgeColor, transparent: true, opacity: 0.8 })
);
const edgeLines = panels.map((_, i) => new LineSegments(edgesGeo, edgeMaterials[i]));

const groupRefs = [ref(), ref(), ref()];

const currentYOffsets = panels.map(() => ref(-5));

onUnmounted(() => {
  materials.forEach((m) => m.dispose());
  edgeMaterials.forEach((m) => m.dispose());
  screenMat.dispose();
  boxGeo.dispose();
  edgesGeo.dispose();
});

const { onBeforeRender } = useLoop();

onBeforeRender(({ elapsed, delta }) => {
  const sp = props.sectionProgress ?? 0;
  const globalOpacity = props.opacity ?? 1;

  panels.forEach((panel, i) => {
    const groupRef = groupRefs[i];
    const yOffsetRef = currentYOffsets[i];
    const panelMat = materials[i];
    const edgeMat = edgeMaterials[i];
    const edgeLine = edgeLines[i];
    if (!groupRef || !yOffsetRef || !panelMat || !edgeMat || !edgeLine) return;

    const group = groupRef.value;
    if (!group) return;

    // Entrance: panels rise from y=-5 as sectionProgress increases from 0
    const targetY = sp > 0 ? panel.position[1] : panel.position[1] - 5;
    yOffsetRef.value +=
      (targetY - yOffsetRef.value) * (props.reducedMotion ? 1 : 0.06);
    group.position.y = yOffsetRef.value;
    group.position.x = panel.position[0];
    group.position.z = panel.position[2];

    // Active panel state: brighter emissive, pushed forward
    const distToActive = Math.abs(sp - panel.activeAt);
    const isActive = distToActive < 0.2;
    const activeFactor = Math.max(0, 1 - distToActive / 0.2);

    panelMat.emissiveIntensity = 0.15 + activeFactor * 0.35;
    panelMat.opacity = globalOpacity;
    edgeMat.opacity = (0.5 + activeFactor * 0.5) * globalOpacity;
    screenMat.opacity = globalOpacity;

    group.position.z += activeFactor * 0.8;

    // Gentle sway
    if (!props.reducedMotion) {
      group.rotation.z = Math.sin(elapsed * 0.4 + i * 1.2) * 0.015;
    }

    // Mount edge lines as children if not yet done
    if (group.children.length < 2) {
      group.add(edgeLine);
    }
  });
});
</script>

<template>
  <TresGroup>
    <TresGroup
      v-for="(panel, i) in panels"
      :key="i"
      :ref="(el) => { if (groupRefs[i]) groupRefs[i].value = el }"
      :rotation="panel.rotation"
      :scale="panel.scale"
    >
      <!-- Panel body -->
      <TresMesh>
        <TresBoxGeometry :args="[2.8, 3.8, 0.14]" />
        <primitive :object="materials[i] ?? materials[0]" />
      </TresMesh>
      <!-- Screen face — dark plane on the front face of the panel -->
      <TresMesh :position="[0, 0, 0.08]">
        <TresPlaneGeometry :args="[2.3, 3.3]" />
        <primitive :object="screenMat" />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
