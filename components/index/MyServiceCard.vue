<template>
  <UCard class="bg-amber-50">
    <template #header class="relative">
      <h3 class="font-bold uppercase size-2 absolute">
        {{ h3 }}
      </h3>
      <img class="text-brand-700" :src="{ img }" :alt="{ alt }" />
    </template>
    <section class="flex flex-col gap-2">
      <p>{{ p1 }}</p>
      <p>{{ p2 }}</p>
    </section>
    <template #footer class="flex flex-row">
      <p class="mr-auto">
        {{ footTxt }}
        <i
          ><small>{{ VAT }}</small></i
        >
      </p>
      <UButton class="ml-auto cursor-pointer hover:bg-primary-600 transition">
        <span>{{ butTxt }}</span>

        <UIcon name="i-lucide-arrow-right" />
      </UButton>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const props = defineProps<{
  h3: string;
  img: x;
  alt: string;
  p1: string;
  p2: string;
  footTxt: string;
  VAT: string;
  butTxt: string;
}>();
</script>

<style lang="scss" scoped>
p,
h3 {
  color: var(--color-brand-700);
}
</style>
