<script setup lang="ts">
const { srMessage } = useSrAnnounce();
</script>

<template>
  <!-- Polite so it won't interrupt; aria-atomic to read whole message -->
  <p class="sr-only" aria-live="polite" aria-atomic="true">{{ srMessage }}</p>
</template>
