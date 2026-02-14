<script setup lang="ts">
definePageMeta({
  layout: "client-hub",
  middleware: ["client-hub-auth"],
});

const { t } = useI18n();
const { getCategories } = useClientHub();

const categories = getCategories();

useHead({
  title: t("clientHub.meta.title"),
});
</script>

<template>
  <div class="hub-landing">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Breadcrumb -->
      <ClientHubBreadcrumb />

      <!-- Search bar -->
      <div class="mt-6 max-w-xl">
        <ClientHubSearchBar />
      </div>

      <!-- Welcome section -->
      <div class="mt-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)">
          {{ t("clientHub.hub.welcomeTitle") }}
        </h1>
        <p class="text-base text-(--color-text-secondary) mt-2 max-w-2xl leading-relaxed">
          {{ t("clientHub.hub.welcomeDescription") }}
        </p>
      </div>

      <!-- Getting started callout -->
      <div class="mt-6 flex items-center gap-2 p-3 rounded-xl bg-primary-500/5 border border-primary-500/10">
        <Icon name="i-heroicons-rocket-launch" class="w-5 h-5 text-primary-500 shrink-0" aria-hidden="true" />
        <p class="text-sm text-(--color-text-secondary)">
          {{ t("clientHub.hub.gettingStartedHighlight") }}
        </p>
      </div>

      <!-- Categories grid -->
      <div class="mt-8">
        <h2 class="text-lg font-semibold text-(--color-text-primary) mb-4">
          {{ t("clientHub.hub.categoriesTitle") }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ClientHubCategoryCard
            v-for="category in categories"
            :key="category.slug"
            :slug="category.slug"
            :title-key="category.titleKey"
            :description-key="category.descriptionKey"
            :icon-key="category.iconKey"
            :article-count="category.articles.length"
          />
        </div>
      </div>
    </div>
  </div>
</template>
