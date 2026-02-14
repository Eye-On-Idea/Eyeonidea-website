<script setup lang="ts">
import AcceptingInvitation from "~/components/client-hub/articles/AcceptingInvitation.vue";
import LoggingIn from "~/components/client-hub/articles/LoggingIn.vue";
import StudioOverview from "~/components/client-hub/articles/StudioOverview.vue";
import CreatingContent from "~/components/client-hub/articles/CreatingContent.vue";
import EditingContent from "~/components/client-hub/articles/EditingContent.vue";
import UnderstandingDrafts from "~/components/client-hub/articles/UnderstandingDrafts.vue";
import UploadingMedia from "~/components/client-hub/articles/UploadingMedia.vue";
import ManagingMedia from "~/components/client-hub/articles/ManagingMedia.vue";
import PublishingChanges from "~/components/client-hub/articles/PublishingChanges.vue";
import DraftPublishWorkflow from "~/components/client-hub/articles/DraftPublishWorkflow.vue";
import CannotLogin from "~/components/client-hub/articles/CannotLogin.vue";
import ChangesNotShowing from "~/components/client-hub/articles/ChangesNotShowing.vue";
import PermissionIssues from "~/components/client-hub/articles/PermissionIssues.vue";
import ContentTips from "~/components/client-hub/articles/ContentTips.vue";
import ImageGuidelines from "~/components/client-hub/articles/ImageGuidelines.vue";

const articleComponents: Record<string, Component> = {
  "accepting-invitation": AcceptingInvitation,
  "logging-in": LoggingIn,
  "studio-overview": StudioOverview,
  "creating-content": CreatingContent,
  "editing-content": EditingContent,
  "understanding-drafts": UnderstandingDrafts,
  "uploading-media": UploadingMedia,
  "managing-media": ManagingMedia,
  "publishing-changes": PublishingChanges,
  "draft-publish-workflow": DraftPublishWorkflow,
  "cannot-login": CannotLogin,
  "changes-not-showing": ChangesNotShowing,
  "permission-issues": PermissionIssues,
  "content-tips": ContentTips,
  "image-guidelines": ImageGuidelines,
};

definePageMeta({
  layout: "client-hub",
  middleware: ["client-hub-auth"],
});

const { t } = useI18n();
const route = useRoute();
const { getCategory, getArticle, getAdjacentArticles } = useClientHub();

const categorySlug = computed(() => route.params.category as string);
const articleSlug = computed(() => route.params.article as string);

const category = computed(() => getCategory(categorySlug.value));
const article = computed(() =>
  getArticle(categorySlug.value, articleSlug.value),
);
const adjacent = computed(() =>
  getAdjacentArticles(categorySlug.value, articleSlug.value),
);

// 404 if not found
if (!category.value || !article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Article not found",
  });
}

const currentArticleComponent = computed(() => {
  return articleComponents[articleSlug.value] || null;
});

useHead({
  title: `${t(article.value!.titleKey)} | ${t("clientHub.meta.title")}`,
});
</script>

<template>
  <div class="article-page" v-if="category && article">
    <div class="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Breadcrumb -->
      <BaseBreadcrumb
        :crumbs="[
          { label: t('clientHub.breadcrumb.hub'), to: '/client-hub' },
          { label: t(category.titleKey), to: `/client-hub/${category.slug}` },
          { label: t(article.titleKey) },
        ]"
      />

      <!-- Article header -->
      <div class="mt-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)">
          {{ t(article.titleKey) }}
        </h1>
        <p class="text-base text-(--color-text-secondary) mt-2">
          {{ t(article.summaryKey) }}
        </p>
      </div>

      <!-- Studio may differ notice -->
      <div class="mt-6 flex items-start gap-2 p-3 rounded-xl bg-accent-500/5 border border-accent-500/10">
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
          :to="`/client-hub/${category.slug}/${adjacent.previous.slug}`"
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
          :to="`/client-hub/${category.slug}/${adjacent.next.slug}`"
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
