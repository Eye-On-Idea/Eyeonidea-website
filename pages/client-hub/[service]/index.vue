<script setup lang="ts">
definePageMeta({
  layout: "client-hub",
  middleware: ["client-hub-auth"],
});

const { t } = useI18n();
const route = useRoute();
const { getService } = useClientHub();

const serviceSlug = computed(() => route.params.service as string);
const service = computed(() => getService(serviceSlug.value));

// 404 if service doesn't exist or is coming soon
if (!service.value || service.value.comingSoon) {
  throw createError({
    statusCode: 404,
    statusMessage: "Service not found",
  });
}

useHead({
  title: `${t(service.value!.titleKey)} | ${t("clientHub.meta.title")}`,
});
</script>

<template>
  <div class="service-page" v-if="service">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Service header -->
      <div class="flex items-start gap-4">
        <div class="p-3 rounded-xl bg-primary-500/10">
          <Icon
            :name="t(service.iconKey)"
            class="w-7 h-7 text-primary-500"
            aria-hidden="true"
          />
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)">
            {{ t(service.titleKey) }}
          </h1>
          <p class="text-base text-(--color-text-secondary) mt-1 leading-relaxed">
            {{ t(service.descriptionKey) }}
          </p>
        </div>
      </div>

      <!-- Categories grid -->
      <div class="mt-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ClientHubCategoryCard
            v-for="category in service.categories"
            :key="category.slug"
            :slug="category.slug"
            :service-slug="service.slug"
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
