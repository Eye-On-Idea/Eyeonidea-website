<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { useLoop } from "@tresjs/core";
import * as THREE from "three";
import { MeshPhysicalMaterial, MeshStandardMaterial, LineBasicMaterial, BufferGeometry, Float32BufferAttribute, Line } from "three";

const props = defineProps<{
  sectionProgress?: number; // 0–1 across values section scroll range
  opacity?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
}>();

// Node materials — matching original color intent
const clarityMat = new MeshPhysicalMaterial({
  transmission: 0.95,
  roughness: 0.02,
  ior: 1.8,
  thickness: 1.5,
  color: 0x9eddd2,
  transparent: true,
  opacity: 1,
  envMapIntensity: 2.0,
});

const partnershipMat = new MeshStandardMaterial({
  metalness: 0.9,
  roughness: 0.1,
  color: 0xdfaf85,
});

const qualityMat = new MeshStandardMaterial({
  metalness: 1.0,
  roughness: 0.05,
  color: 0xd39a69,
});

// Edge lines connecting the 3 nodes (triangle network)
const edgeMat = new LineBasicMaterial({
  color: 0x64c6b7,
  transparent: true,
  opacity: 0.45,
});

// Target positions — shifted ~1 unit right for the split layout right column
const TARGET_POSITIONS = {
  clarity:     [-0.5, 0.5,  2] as [number, number, number],
  partnership: [ 1.5, 0,    2] as [number, number, number],
  quality:     [ 3.5, -0.3, 2] as [number, number, number],
};

// Build edge geometries between node pairs: 0-1, 1-2, 0-2
function buildEdge(
  a: [number, number, number],
  b: [number, number, number]
): Line {
  const positions = new Float32Array([
    a[0], a[1], a[2],
    b[0], b[1], b[2],
  ]);
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
  return new Line(geo, edgeMat);
}

const edges = [
  buildEdge(TARGET_POSITIONS.clarity, TARGET_POSITIONS.partnership),
  buildEdge(TARGET_POSITIONS.partnership, TARGET_POSITIONS.quality),
  buildEdge(TARGET_POSITIONS.clarity, TARGET_POSITIONS.quality),
];

// Refs
const clarityRef = ref();
const partnershipRef = ref();
const qualityRef = ref();
const groupRef = ref();

// Y positions for entrance animation (start below)
const clarityY = ref(TARGET_POSITIONS.clarity[1] - 5);
const partnershipY = ref(TARGET_POSITIONS.partnership[1] - 5);
const qualityY = ref(TARGET_POSITIONS.quality[1] - 5);

const sphereDetail = props.isMobile ? 16 : 32;

onUnmounted(() => {
  clarityMat.dispose();
  partnershipMat.dispose();
  qualityMat.dispose();
  edgeMat.dispose();
  edges.forEach((e) => e.geometry.dispose());
});

const { onBeforeRender } = useLoop();

onBeforeRender(({ elapsed, delta }) => {
  const sp = props.sectionProgress ?? 0;
  const globalOpacity = props.opacity ?? 1;
  const lerpFactor = props.reducedMotion ? 1 : 0.05;

  // Staggered entrance via sectionProgress thresholds
  const clarityIn     = sp > 0;
  const partnershipIn = sp > 0.1;
  const qualityIn     = sp > 0.2;

  const targetCY = clarityIn     ? TARGET_POSITIONS.clarity[1]     : TARGET_POSITIONS.clarity[1] - 5;
  const targetPY = partnershipIn ? TARGET_POSITIONS.partnership[1] : TARGET_POSITIONS.partnership[1] - 5;
  const targetQY = qualityIn     ? TARGET_POSITIONS.quality[1]     : TARGET_POSITIONS.quality[1] - 5;

  clarityY.value     += (targetCY - clarityY.value) * lerpFactor;
  partnershipY.value += (targetPY - partnershipY.value) * lerpFactor;
  qualityY.value     += (targetQY - qualityY.value) * lerpFactor;

  // Sync material opacity
  clarityMat.opacity = globalOpacity;
  edgeMat.opacity    = globalOpacity * 0.45;

  if (!props.reducedMotion) {
    if (clarityRef.value) {
      clarityRef.value.rotation.y += delta * 0.2;
      clarityRef.value.position.y = clarityY.value + Math.sin(elapsed * 0.6) * 0.08;
    }
    if (partnershipRef.value) {
      partnershipRef.value.rotation.y += delta * 0.15;
      partnershipRef.value.position.y = partnershipY.value + Math.sin(elapsed * 0.5 + 1) * 0.06;
    }
    if (qualityRef.value) {
      qualityRef.value.rotation.y += delta * 0.18;
      qualityRef.value.position.y = qualityY.value + Math.sin(elapsed * 0.55 + 2) * 0.07;
    }
  } else {
    if (clarityRef.value)     clarityRef.value.position.y = clarityY.value;
    if (partnershipRef.value) partnershipRef.value.position.y = partnershipY.value;
    if (qualityRef.value)     qualityRef.value.position.y = qualityY.value;
  }

  // Update edge endpoints to match animated node positions
  if (clarityRef.value && partnershipRef.value && qualityRef.value) {
    const cPos = clarityRef.value.position;
    const pPos = partnershipRef.value.position;
    const qPos = qualityRef.value.position;

    const updateEdge = (line: Line, a: THREE.Vector3, b: THREE.Vector3) => {
      const positionAttr = line.geometry.getAttribute("position") as Float32BufferAttribute | undefined;
      if (!positionAttr) return;

      const positions = positionAttr.array as Float32Array;
      positions[0] = a.x; positions[1] = a.y; positions[2] = a.z;
      positions[3] = b.x; positions[4] = b.y; positions[5] = b.z;
      positionAttr.needsUpdate = true;
    };

    const edgeOne = edges[0];
    const edgeTwo = edges[1];
    const edgeThree = edges[2];
    if (!edgeOne || !edgeTwo || !edgeThree) return;

    updateEdge(edgeOne, cPos, pPos);
    updateEdge(edgeTwo, pPos, qPos);
    updateEdge(edgeThree, cPos, qPos);
  }
});
</script>

<template>
  <TresGroup ref="groupRef">
    <!-- Clarity node: crystal sphere -->
    <TresMesh
      ref="clarityRef"
      :position="[TARGET_POSITIONS.clarity[0], TARGET_POSITIONS.clarity[1] - 5, TARGET_POSITIONS.clarity[2]]"
    >
      <TresSphereGeometry :args="[0.4, sphereDetail, sphereDetail]" />
      <primitive :object="clarityMat" />
    </TresMesh>

    <!-- Partnership node: metallic sphere -->
    <TresMesh
      ref="partnershipRef"
      :position="[TARGET_POSITIONS.partnership[0], TARGET_POSITIONS.partnership[1] - 5, TARGET_POSITIONS.partnership[2]]"
    >
      <TresSphereGeometry :args="[0.4, sphereDetail, sphereDetail]" />
      <primitive :object="partnershipMat" />
    </TresMesh>

    <!-- Quality node: gold sphere -->
    <TresMesh
      ref="qualityRef"
      :position="[TARGET_POSITIONS.quality[0], TARGET_POSITIONS.quality[1] - 5, TARGET_POSITIONS.quality[2]]"
    >
      <TresSphereGeometry :args="[0.4, sphereDetail, sphereDetail]" />
      <primitive :object="qualityMat" />
    </TresMesh>

    <!-- Triangle edge connectors -->
    <primitive v-for="(edge, i) in edges" :key="i" :object="edge" />
  </TresGroup>
</template>
