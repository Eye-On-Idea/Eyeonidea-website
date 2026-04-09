<script setup lang="ts">
const { srMessage } = useSrAnnounce();
</script>

<template>

  <p class="sr-only" aria-live="polite" aria-atomic="true">{{ srMessage }}</p>
</template>
