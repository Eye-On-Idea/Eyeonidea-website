<script setup lang="ts">
definePageMeta({
  layout: "client-hub",
  middleware: ["client-hub-auth"],
});

const { t } = useI18n();
const { getServices, getServiceArticleCount } = useClientHub();

const services = getServices();
const isLoaded = ref(false);

onMounted(() => {
  isLoaded.value = true;
});

useSeoMeta({
  title: () => t("clientHub.meta.title"),
  description: () => t("clientHub.meta.description"),
  ogTitle: () => t("clientHub.meta.title"),
  ogDescription: () => t("clientHub.meta.description"),
  ogType: "website",
  ogUrl: "https://eyeonidea.com/client-hub",
});

useHead({
  link: [{ rel: "canonical", href: "https://eyeonidea.com/client-hub" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Client Hub",
        description: "Guides and resources to help you manage your website, email, domain, hosting, and brand identity",
        publisher: {
          "@type": "Organization",
          name: "Eye On Idea",
          url: "https://eyeonidea.com",
        },
      }),
    },
  ],
});
</script>

<template>
  <div class="hub-landing">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Breadcrumb -->
      <BaseBreadcrumb :crumbs="[{ label: t('clientHub.breadcrumb.hub') }]" />

      <!-- Search bar -->
      <div class="mt-6 max-w-xl">
        <ClientHubSearchBar />
      </div>

      <!-- Welcome section -->
      <div class="mt-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)">
          {{ t("clientHub.hub.welcomeTitle") }}
        </h1>
        <p
          class="text-base text-(--color-text-secondary) mt-2 max-w-2xl leading-relaxed"
        >
          {{ t("clientHub.hub.welcomeDescription") }}
        </p>
      </div>

      <!-- Onboarding section -->
      <div class="mt-8">
        <ClientHubOnboardingSection />
      </div>

      <!-- Getting started callout -->
      <div
        class="mt-6 flex items-center gap-2 p-3 rounded-xl bg-primary-500/5 border border-primary-500/10"
      >
        <Icon
          name="i-heroicons-rocket-launch"
          class="w-5 h-5 text-primary-500 shrink-0"
          aria-hidden="true"
        />
        <p class="text-sm text-(--color-text-secondary)">
          {{ t("clientHub.hub.gettingStartedHighlight") }}
        </p>
      </div>

      <!-- Services grid -->
      <div class="mt-8">
        <h2 class="text-lg font-semibold text-(--color-text-primary) mb-4">
          {{ t("clientHub.hub.servicesTitle") }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(service, index) in services"
            :key="service.slug"
            class="service-card-wrapper"
            :class="{ 'service-card-wrapper--visible': isLoaded }"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <ClientHubServiceCard
              :slug="service.slug"
              :title-key="service.titleKey"
              :description-key="service.descriptionKey"
              :icon-key="service.iconKey"
              :article-count="getServiceArticleCount(service.slug)"
              :coming-soon="service.comingSoon"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-card-wrapper {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity var(--duration-slow, 500ms) var(--ease-smooth, cubic-bezier(0.22, 1, 0.36, 1)),
    transform var(--duration-slow, 500ms) var(--ease-smooth, cubic-bezier(0.22, 1, 0.36, 1));
}

.service-card-wrapper--visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .service-card-wrapper {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
