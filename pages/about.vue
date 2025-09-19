<template>
  <about-my-hero />
</template>

<script setup lang="ts">
onMounted(() => {
  const { lang } = useLang();
  const other = lang.value === "en" ? "da" : "en";
  import(/* @vite-ignore */ `~/content/${other}/index.json`).catch(() => {});
});
</script>

<style lang="scss" scoped></style>
