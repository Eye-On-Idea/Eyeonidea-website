<script setup lang="ts">
definePageMeta({
  layout: "client-hub",
  middleware: ["client-hub-auth"],
});

const { t } = useI18n();
const route = useRoute();
const { getService, getCategory } = useClientHub();

const serviceSlug = computed(() => route.params.service as string);
const categorySlug = computed(() => route.params.category as string);
const service = computed(() => getService(serviceSlug.value));
const category = computed(() => getCategory(serviceSlug.value, categorySlug.value));

// 404 if service or category doesn't exist
if (!service.value || !category.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Category not found",
  });
}

useHead({
  title: `${t(category.value!.titleKey)} | ${t(service.value!.titleKey)} | ${t("clientHub.meta.title")}`,
});
</script>

<template>
  <div class="category-page" v-if="service && category">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Category header -->
      <div class="flex items-start gap-4">
        <div class="p-3 rounded-xl bg-primary-500/10">
          <Icon
            :name="t(category.iconKey)"
            class="w-7 h-7 text-primary-500"
            aria-hidden="true"
          />
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)">
            {{ t(category.titleKey) }}
          </h1>
          <p class="text-base text-(--color-text-secondary) mt-1 leading-relaxed">
            {{ t(category.descriptionKey) }}
          </p>
        </div>
      </div>

      <!-- Articles list -->
      <div class="mt-8 space-y-2 max-w-2xl">
        <ClientHubArticleCard
          v-for="article in category.articles"
          :key="article.slug"
          :slug="article.slug"
          :category-slug="category.slug"
          :service-slug="service.slug"
          :title-key="article.titleKey"
          :summary-key="article.summaryKey"
          :order="article.order"
        />
      </div>

    </div>
  </div>
</template>
