<template>
  <UCard class="bg-amber-50">
    <template #header>
      <img class="text-brand-700 w-auto max-h-[250px]" :src="img" :alt="alt" />
    </template>
    <section class="flex flex-col gap-2">
      <h3 class="font-bold uppercase">
        {{ h3 }}
      </h3>
      <p>{{ p1 }}</p>
      <p>{{ p2 }}</p>
    </section>
    <template #footer>
      <div class="flex flex-row flex-wrap gap-4">
        <p class="mr-auto">
          <strong>{{ footTxt }}</strong>
          <i
            ><small>{{ VAT }}</small></i
          >
        </p>
        <UButton class="ml-auto cursor-pointer hover:bg-primary-600 transition">
          <span>{{ butTxt }}</span>

          <UIcon name="i-lucide-arrow-right" />
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const props = defineProps<{
  h3: string;
  img: string;
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
