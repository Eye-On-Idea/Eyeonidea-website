<template>
  <a
    class="some-card flex flex-col"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img :src="imgSrc" :alt="alt" class="w-full h-auto" />
    <p>{{ text }}</p>
  </a>
</template>

<script setup lang="ts">
// Define props with types
const props = defineProps<{
  imgSrc: string;
  alt?: string;
  text: string;
  href: string;
}>();
</script>

<style lang="scss" scoped>
.some-card {
  margin-top: auto;
  padding: 6px;
  align-items: center;
  gap: 6px;
  border-radius: var(--border-radius);
  width: 85px;
  height: 100px;
  img {
    width: 50px;
    height: 50px;
  }
  p {
    text-align: center;
  }
  &:hover {
    outline: solid;
    outline-width: 1px;
    outline-color: var(--color-brand-50);
  }
  &:active {
    background-color: var(--color-neutral-900);
  }
}
</style>
