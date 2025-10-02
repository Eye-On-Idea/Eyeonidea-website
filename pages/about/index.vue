<template>
  <div id="main">
    <AboutHero />
    <AboutFounder />
    <AboutVP />

    <AboutWhyExist />
    <AboutCTA />
  </div>
</template>

<script setup lang="ts">
import AboutCTA from "~/components/about/AboutCTA.vue";
import AboutFounder from "~/components/about/AboutFounder.vue";
import AboutVP from "~/components/about/AboutVP.vue";
import AboutWhyExist from "~/components/about/AboutWhyExist.vue";
</script>

<style scoped>
/* Ensure good focus visibility and accessible outlines */
:focus-visible {
  outline: 2px solid var(--color-brand-500);
  outline-offset: 2px;
}
</style>
