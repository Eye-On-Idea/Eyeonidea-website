<script setup lang="ts">
definePageMeta({
  layout: "client-hub",
  middleware: ["client-hub-auth"],
});

const { t } = useI18n();
const { getServices, getServiceArticleCount } = useClientHub();

const services = getServices().filter((s) => !s.comingSoon);

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
        description:
          "Guides and resources to help you manage your website, email, domain, hosting, and brand identity",
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
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Welcome section -->
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)">
          {{ t("clientHub.hub.welcomeTitle") }}
        </h1>
        <p
          class="text-base text-(--color-text-secondary) mt-2 max-w-2xl leading-relaxed"
        >
          {{ t("clientHub.hub.welcomeDescription") }}
        </p>
      </div>

      <!-- Onboarding CTA -->
      <NuxtLink
        to="/client-hub/onboarding"
        class="mt-8 block p-5 rounded-xl border border-accent-500/15 bg-accent-500/5 hover:bg-accent-500/10 transition-colors group"
      >
        <div class="flex items-start gap-4">
          <div class="p-2.5 rounded-xl bg-accent-500/10 shrink-0">
            <Icon
              name="i-heroicons-academic-cap"
              class="w-6 h-6 text-accent-500"
              aria-hidden="true"
            />
          </div>
          <div class="flex-1 min-w-0">
            <h2
              class="text-base font-semibold text-(--color-text-primary) group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors"
            >
              {{ t("clientHub.onboarding.title") }}
            </h2>
            <p class="text-sm text-(--color-text-secondary) mt-1">
              {{ t("clientHub.onboarding.ctaDescription") }}
            </p>
          </div>
          <Icon
            name="i-heroicons-arrow-right"
            class="w-5 h-5 text-(--color-text-tertiary) group-hover:text-accent-500 transition-colors shrink-0 mt-1"
            aria-hidden="true"
          />
        </div>
      </NuxtLink>

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

      <!-- Quick links grid -->
      <div class="mt-8">
        <h2 class="text-lg font-semibold text-(--color-text-primary) mb-4">
          {{ t("clientHub.hub.servicesTitle") }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <NuxtLink
            v-for="service in services"
            :key="service.slug"
            :to="`/client-hub/${service.slug}`"
            class="quick-link-tile flex items-center gap-3 p-4 rounded-xl border border-(--glass-border-subtle) bg-(--color-surface-1) hover:bg-(--color-surface-2) transition-colors group"
          >
            <div class="p-2 rounded-lg bg-primary-500/10 shrink-0">
              <Icon
                :name="t(service.iconKey)"
                class="w-5 h-5 text-primary-500"
                aria-hidden="true"
              />
            </div>
            <div class="flex-1 min-w-0">
              <div
                class="text-sm font-semibold text-(--color-text-primary) truncate"
              >
                {{ t(service.titleKey) }}
              </div>
              <div class="text-xs text-(--color-text-tertiary)">
                {{
                  t("clientHub.serviceCard.guideCount", {
                    count: getServiceArticleCount(service.slug),
                  })
                }}
              </div>
            </div>
            <Icon
              name="i-heroicons-chevron-right"
              class="w-4 h-4 text-(--color-text-tertiary) group-hover:text-(--color-text-secondary) transition-colors shrink-0"
              aria-hidden="true"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- Need help -->
      <div
        class="mt-10 p-4 rounded-xl bg-(--color-surface-2) border border-(--glass-border-subtle)"
      >
        <div class="flex items-start gap-3">
          <Icon
            name="i-heroicons-chat-bubble-left-right"
            class="w-5 h-5 text-primary-500 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <h3 class="text-sm font-semibold text-(--color-text-primary)">
              {{ t("clientHub.article.needHelp") }}
            </h3>
            <p class="text-sm text-(--color-text-secondary) mt-0.5">
              {{ t("clientHub.article.needHelpText") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quick-link-tile:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .quick-link-tile {
    transition: none;
  }
}
</style>
