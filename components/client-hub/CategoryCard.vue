<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  slug: string;
  titleKey: string;
  descriptionKey: string;
  iconKey: string;
  articleCount: number;
}>();

const iconName = computed(() => t(props.iconKey));
</script>

<template>
  <NuxtLink
    :to="`/client-hub/${slug}`"
    class="category-card group cursor-pointer"
  >
    <GlassCard
      variant="solid"
      hover-effect="lift"
      :padding="true"
      wrapper-class="h-full"
    >
      <div class="flex flex-col gap-3 h-full min-h-45">
        <div class="flex items-start justify-between">
          <div class="p-2.5 rounded-xl bg-primary-500/10">
            <Icon
              :name="iconName"
              class="w-6 h-6 text-primary-500"
              aria-hidden="true"
            />
          </div>
          <span class="text-xs text-(--color-text-tertiary) mt-1">
            {{ t("clientHub.categoryCard.guideCount", { count: articleCount }) }}
          </span>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-bold text-(--color-text-primary) group-hover:text-primary-500 transition-colors">
            {{ t(titleKey) }}
          </h3>
          <p class="text-sm text-(--color-text-secondary) mt-1.5 leading-relaxed">
            {{ t(descriptionKey) }}
          </p>
        </div>
        <div class="flex items-center gap-1 text-sm text-primary-600 font-medium">
          <span>{{ t("clientHub.categoryCard.browse") }}</span>
          <Icon
            name="i-heroicons-arrow-right"
            class="w-4 h-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </GlassCard>
  </NuxtLink>
</template>
