<script setup lang="ts">
definePageMeta({
  layout: "client-hub",
  middleware: ["client-hub-auth"],
});

const { t } = useI18n();
const route = useRoute();
const { getService, getCategory, getArticle, getAdjacentArticles } = useClientHub();

const serviceSlug = computed(() => route.params.service as string);
const categorySlug = computed(() => route.params.category as string);
const articleSlug = computed(() => route.params.article as string);

const service = computed(() => getService(serviceSlug.value));
const category = computed(() =>
  getCategory(serviceSlug.value, categorySlug.value),
);
const article = computed(() =>
  getArticle(serviceSlug.value, categorySlug.value, articleSlug.value),
);
const adjacent = computed(() =>
  getAdjacentArticles(serviceSlug.value, categorySlug.value, articleSlug.value),
);

// 404 if not found
if (!service.value || !category.value || !article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Article not found",
  });
}

// Dynamic component mapping: service slug -> article slug -> component name
const componentMap: Record<string, Record<string, () => Promise<Component>>> = {
  "website-content": {
    "cms-overview": () => import("~/components/client-hub/articles/website-content/CmsOverview.vue"),
    "logging-in": () => import("~/components/client-hub/articles/website-content/LoggingIn.vue"),
    "studio-navigation": () => import("~/components/client-hub/articles/website-content/StudioNavigation.vue"),
    "editing-text": () => import("~/components/client-hub/articles/website-content/EditingText.vue"),
    "drafts-and-publishing": () => import("~/components/client-hub/articles/website-content/DraftsAndPublishing.vue"),
    "seo-basics": () => import("~/components/client-hub/articles/website-content/SeoBasics.vue"),
    "slugs-and-urls": () => import("~/components/client-hub/articles/website-content/SlugsAndUrls.vue"),
    "creating-a-post": () => import("~/components/client-hub/articles/website-content/CreatingAPost.vue"),
    "publishing-a-post": () => import("~/components/client-hub/articles/website-content/PublishingAPost.vue"),
    "image-best-practices": () => import("~/components/client-hub/articles/website-content/ImageBestPractices.vue"),
    "alt-text-and-files": () => import("~/components/client-hub/articles/website-content/AltTextAndFiles.vue"),
    "common-mistakes": () => import("~/components/client-hub/articles/website-content/CommonMistakes.vue"),
    "cms-faq": () => import("~/components/client-hub/articles/website-content/CmsFaq.vue"),
  },
  email: {
    "email-overview": () => import("~/components/client-hub/articles/email/EmailOverview.vue"),
    "first-login": () => import("~/components/client-hub/articles/email/FirstLogin.vue"),
    "webmail-access": () => import("~/components/client-hub/articles/email/WebmailAccess.vue"),
    "email-app-setup": () => import("~/components/client-hub/articles/email/EmailAppSetup.vue"),
    "email-backup": () => import("~/components/client-hub/articles/email/EmailBackup.vue"),
    "email-faq": () => import("~/components/client-hub/articles/email/EmailFaq.vue"),
  },
  domain: {
    "domain-ownership": () => import("~/components/client-hub/articles/domain/DomainOwnership.vue"),
    "domain-renewal": () => import("~/components/client-hub/articles/domain/DomainRenewal.vue"),
    "domain-transfer": () => import("~/components/client-hub/articles/domain/DomainTransfer.vue"),
    "dns-configuration": () => import("~/components/client-hub/articles/domain/DnsConfiguration.vue"),
    "domain-faq": () => import("~/components/client-hub/articles/domain/DomainFaq.vue"),
  },
  hosting: {
    "hosting-setup": () => import("~/components/client-hub/articles/hosting/HostingSetup.vue"),
    environments: () => import("~/components/client-hub/articles/hosting/Environments.vue"),
    "content-updates": () => import("~/components/client-hub/articles/hosting/ContentUpdates.vue"),
    analytics: () => import("~/components/client-hub/articles/hosting/AnalyticsReporting.vue"),
    "support-and-maintenance": () => import("~/components/client-hub/articles/hosting/SupportAndMaintenance.vue"),
    "hosting-faq": () => import("~/components/client-hub/articles/hosting/HostingFaq.vue"),
  },
  "visual-identity": {
    "logo-files": () => import("~/components/client-hub/articles/visual-identity/LogoFiles.vue"),
    "logo-usage": () => import("~/components/client-hub/articles/visual-identity/LogoUsage.vue"),
    "colors-and-typography": () => import("~/components/client-hub/articles/visual-identity/ColorsAndTypography.vue"),
    "templates-and-print": () => import("~/components/client-hub/articles/visual-identity/TemplatesAndPrint.vue"),
    "brand-consistency": () => import("~/components/client-hub/articles/visual-identity/BrandConsistency.vue"),
    "visual-identity-faq": () => import("~/components/client-hub/articles/visual-identity/VisualIdentityFaq.vue"),
  },
};

const currentArticleComponent = computed(() => {
  const serviceMap = componentMap[serviceSlug.value];
  if (!serviceMap) return null;
  const loader = serviceMap[articleSlug.value];
  if (!loader) return null;
  return defineAsyncComponent({
    loader,
    loadingComponent: {
      template: `<div class="article-skeleton"><div class="skeleton h-6 w-3/4 mb-4"></div><div class="skeleton h-4 w-full mb-2"></div><div class="skeleton h-4 w-full mb-2"></div><div class="skeleton h-4 w-5/6 mb-6"></div><div class="skeleton h-6 w-1/2 mb-4"></div><div class="skeleton h-4 w-full mb-2"></div><div class="skeleton h-4 w-4/5 mb-2"></div></div>`,
    },
  });
});

const isCmsArticle = computed(() => serviceSlug.value === "website-content");

// SEO
useSeoMeta({
  title: () => `${t(article.value!.titleKey)} | ${t("clientHub.meta.title")}`,
  description: () => t(article.value!.summaryKey),
  ogTitle: () => `${t(article.value!.titleKey)} | ${t("clientHub.meta.title")}`,
  ogDescription: () => t(article.value!.summaryKey),
  ogType: "article",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: `https://eyeonidea.com/client-hub/${serviceSlug.value}/${categorySlug.value}/${articleSlug.value}`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        name: t(article.value!.titleKey),
        description: t(article.value!.summaryKey),
        publisher: {
          "@type": "Organization",
          name: "Eye On Idea",
          url: "https://eyeonidea.com",
        },
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("clientHub.breadcrumb.hub"),
            item: "https://eyeonidea.com/client-hub",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t(service.value!.titleKey),
            item: `https://eyeonidea.com/client-hub/${serviceSlug.value}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: t(category.value!.titleKey),
            item: `https://eyeonidea.com/client-hub/${serviceSlug.value}/${categorySlug.value}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: t(article.value!.titleKey),
          },
        ],
      }),
    },
  ],
});
</script>

<template>
  <div class="article-page" v-if="service && category && article">
    <div class="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Article header -->
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)">
          {{ t(article.titleKey) }}
        </h1>
        <p class="text-base text-(--color-text-secondary) mt-2">
          {{ t(article.summaryKey) }}
        </p>
      </div>

      <!-- Studio may differ notice (CMS articles only) -->
      <div
        v-if="isCmsArticle"
        class="mt-6 flex items-start gap-2 p-3 rounded-xl bg-accent-500/5 border border-accent-500/10"
      >
        <Icon name="i-heroicons-information-circle" class="w-5 h-5 text-accent-500 shrink-0 mt-0.5" aria-hidden="true" />
        <p class="text-sm text-(--color-text-secondary)">
          {{ t("clientHub.article.studioMayDiffer") }}
        </p>
      </div>

      <!-- Article content -->
      <div class="mt-8 article-content prose prose-sm max-w-none">
        <component
          :is="currentArticleComponent"
          v-if="currentArticleComponent"
        />
        <div v-else class="article-skeleton">
          <div class="skeleton h-6 w-3/4 mb-4"></div>
          <div class="skeleton h-4 w-full mb-2"></div>
          <div class="skeleton h-4 w-full mb-2"></div>
          <div class="skeleton h-4 w-5/6 mb-6"></div>
        </div>
      </div>

      <!-- Need help callout -->
      <div class="mt-10 p-4 rounded-xl bg-(--color-surface-2) border border-(--glass-border-subtle)">
        <div class="flex items-start gap-3">
          <Icon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" aria-hidden="true" />
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

      <!-- Previous / Next navigation -->
      <div class="mt-8 flex items-center justify-between gap-4">
        <NuxtLink
          v-if="adjacent.previous"
          :to="`/client-hub/${service.slug}/${category.slug}/${adjacent.previous.slug}`"
          class="flex items-center gap-2 min-h-11 text-sm text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
        >
          <Icon name="i-heroicons-arrow-left" class="w-4 h-4" aria-hidden="true" />
          <div class="text-left">
            <div class="text-xs text-(--color-text-tertiary)">{{ t("clientHub.article.previousArticle") }}</div>
            <div class="font-medium">{{ t(adjacent.previous.titleKey) }}</div>
          </div>
        </NuxtLink>
        <div v-else />

        <NuxtLink
          v-if="adjacent.next"
          :to="`/client-hub/${service.slug}/${category.slug}/${adjacent.next.slug}`"
          class="flex items-center gap-2 min-h-11 text-sm text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
        >
          <div class="text-right">
            <div class="text-xs text-(--color-text-tertiary)">{{ t("clientHub.article.nextArticle") }}</div>
            <div class="font-medium">{{ t(adjacent.next.titleKey) }}</div>
          </div>
          <Icon name="i-heroicons-arrow-right" class="w-4 h-4" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-skeleton {
  padding: 1rem 0;
}

.article-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.article-content :deep(h3) {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.article-content :deep(p) {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.article-content :deep(ol),
.article-content :deep(ul) {
  color: var(--color-text-secondary);
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.article-content :deep(strong) {
  color: var(--color-text-primary);
  font-weight: 600;
}

.article-content :deep(code) {
  background: var(--color-surface-2);
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.article-content :deep(.tip-box),
.article-content :deep(.note-box),
.article-content :deep(.warning-box) {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  margin: 1rem 0;
  font-size: 0.875rem;
}

.article-content :deep(.tip-box) {
  background: color-mix(in srgb, var(--color-accent-500, #2a9386) 5%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent-500, #2a9386) 15%, transparent);
}

.article-content :deep(.note-box) {
  background: color-mix(in srgb, var(--color-primary-500) 5%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary-500) 15%, transparent);
}

.article-content :deep(.warning-box) {
  background: rgb(239 68 68 / 0.05);
  border: 1px solid rgb(239 68 68 / 0.15);
}

@media (prefers-reduced-motion: reduce) {
  .article-page * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
