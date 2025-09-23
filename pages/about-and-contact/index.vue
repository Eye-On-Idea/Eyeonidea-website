<template>
  <main class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <AboutIntro />
    <AboutExpertise />
    <ContactOffice />
  </main>
</template>
<script setup lang="ts">
import AboutExpertise from "~/components/about/AboutExpertise.vue";
import AboutIntro from "~/components/about/AboutIntro.vue";
import ContactOffice from "~/components/about/ContactOffice.vue";

useHead({ title: "About & Contact — Tegetec" });
</script>
