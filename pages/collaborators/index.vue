<template>
  <main class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <CollaboratorsHero />
    <CollaboratorsGrid />
  </main>
</template>
<script setup lang="ts">
import CollaboratorsGrid from "~/components/collab/CollaboratorsGrid.vue";
import CollaboratorsHero from "~/components/collab/CollaboratorsHero.vue";

useHead({ title: "Collaborators — Tegetec" });
</script>
