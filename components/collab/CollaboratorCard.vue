<template>
  <UCard class="bg-[var(--color-surface-1)] text-primary-900 h-full">
    <template #header>
      <div class="flex items-center gap-4">
        <div class="shrink-0">
          <img
            :src="logo"
            :alt="alt"
            class="w-32 h-auto object-contain bg-white rounded-[6px] p-2 ring-1 ring-[var(--color-border)]"
          />
        </div>
        <div class="min-w-0">
          <h3 class="text-xl font-semibold text-primary-900">{{ name }}</h3>
          <p v-if="tagline" class="text-sm text-primary-900">{{ tagline }}</p>
        </div>
      </div>
    </template>

    <div class="space-y-3">
      <p v-if="summary" class="text-primary-900">{{ summary }}</p>
      <ul v-if="bullets?.length" class="list-disc pl-5 space-y-1">
        <li v-for="(b, i) in bullets" :key="i" class="text-primary-900">
          {{ b }}
        </li>
      </ul>
    </div>

    <template #footer>
      <div class="flex items-center gap-3">
        <!-- Left CTAs -->
        <div class="flex flex-wrap gap-3">
          <UButton
            variant="solid"
            :to="cta?.to || '/about-and-contact#contact'"
          >
            {{ cta?.label || "Contact Tegetec" }}
          </UButton>
          <UButton v-if="learnMoreTo" variant="solid" :to="learnMoreTo"
            >Learn more</UButton
          >
        </div>

        <!-- Right external link -->
        <UButton
          v-if="externalHref"
          variant="ghost"
          class="ml-auto"
          :href="externalHref"
          target="_blank"
          rel="noopener"
          :aria-label="`Visit ${name} website (opens in a new tab)`"
        >
          {{ externalLabel || "Visit website" }}
          <Icon name="i-heroicons-arrow-up-right-20-solid" class="ml-1" />
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
interface CTA {
  label?: string;
  to?: string;
}
interface Props {
  name: string;
  logo: string;
  alt: string;
  tagline?: string;
  summary?: string;
  bullets?: string[];
  cta?: CTA;
  learnMoreTo?: string;
  externalHref?: string;
  externalLabel?: string;
}
defineProps<Props>();
</script>
