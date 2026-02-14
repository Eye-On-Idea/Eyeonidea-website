<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  categorySlug?: string;
  categoryTitle?: string;
  articleTitle?: string;
}>();

const crumbs = computed(() => {
  const items: Array<{ label: string; to?: string }> = [
    { label: t("clientHub.breadcrumb.hub"), to: "/client-hub" },
  ];

  if (props.categorySlug && props.categoryTitle) {
    items.push({
      label: props.categoryTitle,
      to: props.articleTitle
        ? `/client-hub/${props.categorySlug}`
        : undefined,
    });
  }

  if (props.articleTitle) {
    items.push({ label: props.articleTitle });
  }

  return items;
});
</script>

<template>
  <nav aria-label="Breadcrumb" class="hub-breadcrumb">
    <ol class="flex items-center gap-1.5 text-sm flex-wrap">
      <li
        v-for="(crumb, index) in crumbs"
        :key="index"
        class="flex items-center gap-1.5"
      >
        <Icon
          v-if="index > 0"
          name="i-heroicons-chevron-right-20-solid"
          class="w-3.5 h-3.5 text-(--color-text-tertiary) shrink-0"
          aria-hidden="true"
        />
        <NuxtLink
          v-if="crumb.to"
          :to="crumb.to"
          class="min-h-11 inline-flex items-center text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span
          v-else
          class="min-h-11 inline-flex items-center text-(--color-text-primary) font-medium"
          aria-current="page"
        >
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
