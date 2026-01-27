<template>
  <div class="article-page">
    <!-- Loading state -->
    <template v-if="pending">
      <UContainer class="max-w-7xl py-8">
        <div aria-live="polite" aria-busy="true">
          <span class="sr-only">{{ t("news.article.loading") }}</span>
          <div class="article-skeleton" aria-hidden="true">
            <div class="skeleton-breadcrumb" />
            <div class="skeleton-badge" />
            <div class="skeleton-title" />
            <div class="skeleton-excerpt" />
            <div class="skeleton-meta" />
            <div class="skeleton-hero" />
            <div class="skeleton-body">
              <div class="skeleton-paragraph" />
              <div class="skeleton-paragraph short" />
              <div class="skeleton-paragraph" />
            </div>
          </div>
        </div>
      </UContainer>
    </template>

    <!-- Error / Not found -->
    <template v-else-if="!post">
      <UContainer class="max-w-7xl py-16">
        <div class="not-found">
          <Icon
            name="i-heroicons-document-magnifying-glass"
            class="not-found-icon"
          />
          <h1 class="not-found-title">{{ t("news.article.notFound") }}</h1>
          <p class="not-found-text">
            {{ t("news.article.notFoundText") }}
          </p>
          <UButton to="/news" variant="solid" size="lg" class="not-found-btn">
            <Icon name="i-heroicons-arrow-left" class="mr-2" />
            {{ t("news.article.backToNews") }}
          </UButton>
        </div>
      </UContainer>
    </template>

    <!-- Article content -->
    <template v-else>
      <article class="article-container">
        <UContainer class="max-w-7xl py-8">
          <!-- Breadcrumb -->
          <NewsBreadcrumb
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 300 } }"
            :crumbs="breadcrumbs"
          />

          <!-- Article header -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { duration: 400, delay: 100 },
            }"
          >
            <NewsArticleHeader :post="post" />
          </div>

          <!-- Article body -->
          <div
            v-if="post.body && post.body.length > 0"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { duration: 400, delay: 200 },
            }"
            class="article-body"
          >
            <NewsPortableTextRenderer :blocks="post.body" />
          </div>

          <!-- Share and actions -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 400 } }"
            class="article-actions"
          >
            <div class="share-section">
              <span class="share-label">{{ t("news.article.share") }}</span>
              <div class="share-buttons">
                <UButton
                  :href="linkedInShareUrl"
                  target="_blank"
                  rel="noopener"
                  variant="ghost"
                  size="sm"
                  :aria-label="t('news.article.shareLinkedIn')"
                >
                  <Icon name="i-simple-icons-linkedin" class="share-icon" />
                </UButton>
                <UButton
                  :href="twitterShareUrl"
                  target="_blank"
                  rel="noopener"
                  variant="ghost"
                  size="sm"
                  :aria-label="t('news.article.shareTwitter')"
                >
                  <Icon name="i-simple-icons-x" class="share-icon" />
                </UButton>
                <UButton
                  :href="emailShareUrl"
                  variant="ghost"
                  size="sm"
                  :aria-label="t('news.article.shareEmail')"
                >
                  <Icon name="i-heroicons-envelope" class="share-icon" />
                </UButton>
              </div>
            </div>
            <UButton to="/news" variant="outline" size="md">
              <Icon name="i-heroicons-arrow-left" class="mr-2" />
              {{ t("news.article.allArticles") }}
            </UButton>
          </div>

          <!-- Related posts -->
          <NewsRelatedPosts
            v-if="relatedPosts && relatedPosts.length > 0"
            :posts="relatedPosts"
          />
        </UContainer>
      </article>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Post } from "~/types/sanity";
import { usePostBySlug } from "~/composables/useSanityPosts";

const route = useRoute();
const { t } = useI18n();
const config = useRuntimeConfig();

const slug = computed(() => route.params.slug as string);

// Fetch post data
const { data: post, pending } = usePostBySlug(slug.value);

const relatedPostsQuery = `*[
  _type == "post"
  && publishedAt <= now()
  && _id != *[_type == "post" && slug.current == $slug][0]._id
]
| order(publishedAt desc)[0...3]
{
  _id,
  _type,
  title,
  slug,
  postType,
  publishedAt,
  featured,
  excerpt,
  heroImage,
  heroImageAlt
}`;

const { data: relatedPostsData } = useSanityFetch<Post[]>(
  relatedPostsQuery,
  { slug: slug.value },
  { key: `related-posts-${slug.value}` },
);

const relatedPosts = computed(() => relatedPostsData.value ?? []);

// Breadcrumbs
const breadcrumbs = computed(() => [
  { label: t("nav.home"), to: "/" },
  { label: t("news.title"), to: "/news" },
  {
    label: post.value?.title || t("news.article.defaultTitle"),
    to: `/news/${slug.value}`,
  },
]);

// SEO
const seoTitle = computed(() => {
  if (pending.value) return t("news.article.defaultTitle");
  if (!post.value) return t("news.article.notFound");
  return post.value.seo?.metaTitle || post.value.title;
});

const seoDescription = computed(() => {
  if (!post.value) return "";
  return post.value.seo?.metaDescription || post.value.excerpt;
});

const seoImage = computed(() => {
  if (!post.value) return undefined;
  if (post.value.seo?.ogImage?.asset?._ref) {
    return `https://cdn.sanity.io/images/${config.public.sanityProjectId}/${config.public.sanityDataset}/${post.value.seo.ogImage.asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`;
  }
  if (post.value.heroImage?.asset?._ref) {
    return `https://cdn.sanity.io/images/${config.public.sanityProjectId}/${config.public.sanityDataset}/${post.value.heroImage.asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`;
  }
  return undefined;
});

const canonicalUrl = computed(() => `https://eyeonidea.com/news/${slug.value}`);

const seoOptions = computed(() => ({
  title: seoTitle.value,
  description: seoDescription.value,
  image: seoImage.value,
  imageAlt: post.value?.heroImageAlt || post.value?.title || seoTitle.value,
  // Optimal dimensions for LinkedIn (1.91:1 ratio) and other social platforms
  imageWidth: 1200,
  imageHeight: 630,
  url: `/news/${slug.value}`,
  canonical: canonicalUrl.value,
  type: "article",
  publishedTime: post.value?.publishedAt,
  modifiedTime: post.value?._updatedAt,
  noindex: post.value?.seo?.noIndex,
  breadcrumbs: [
    { name: t("nav.home"), url: "/" },
    { name: t("news.title"), url: "/news" },
    {
      name: post.value?.title || t("news.article.defaultTitle"),
      url: `/news/${slug.value}`,
    },
  ],
  twitterCard: "summary_large_image",
  schemaType: "ItemPage",
  includeWebSiteSchema: false,
  // Article-specific metadata for enhanced SEO
  articleSection: post.value?.postType || "News",
  articleTags:
    post.value?.tags
      ?.map((tag: { title?: string }) => tag.title)
      .filter(Boolean) || [],
}));

useSeo(seoOptions);

// Share URLs
const shareUrl = computed(() => encodeURIComponent(canonicalUrl.value));
const shareTitle = computed(() => encodeURIComponent(post.value?.title || ""));

const linkedInShareUrl = computed(
  () => `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl.value}`,
);

const twitterShareUrl = computed(
  () =>
    `https://twitter.com/intent/tweet?url=${shareUrl.value}&text=${shareTitle.value}`,
);

const emailShareUrl = computed(
  () =>
    `mailto:?subject=${shareTitle.value}&body=${t("news.article.checkOut")} ${canonicalUrl.value}`,
);
</script>

<style lang="scss" scoped>
.article-page {
  min-height: 100vh;
  background: var(--color-bg);
}

.article-container {
  background: var(--color-bg);
}

.article-body {
  margin-bottom: 3rem;
}

.article-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.share-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.share-label {
  font-size: 0.875rem;
  color: var(--color-primary-600);
  font-weight: 500;
}

.share-buttons {
  display: flex;
  gap: 0.25rem;
}

.share-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Loading skeleton */
.article-skeleton {
  animation: pulse 2s ease-in-out infinite;
}

.skeleton-breadcrumb {
  height: 1rem;
  width: 200px;
  background: var(--color-primary-100);
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.skeleton-badge {
  height: 1.5rem;
  width: 80px;
  background: var(--color-primary-100);
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.skeleton-title {
  height: 3rem;
  width: 80%;
  background: var(--color-primary-100);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.skeleton-excerpt {
  height: 1.5rem;
  width: 60%;
  background: var(--color-primary-100);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.skeleton-meta {
  height: 1rem;
  width: 300px;
  background: var(--color-primary-100);
  border-radius: 4px;
  margin-bottom: 2rem;
}

.skeleton-hero {
  aspect-ratio: 16 / 9;
  background: var(--color-primary-100);
  border-radius: 16px;
  margin-bottom: 2rem;
}

.skeleton-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-paragraph {
  height: 1rem;
  width: 100%;
  background: var(--color-primary-100);
  border-radius: 4px;

  &.short {
    width: 70%;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Not found state */
.not-found {
  text-align: center;
  padding: 3rem 0;
}

.not-found-icon {
  width: 5rem;
  height: 5rem;
  color: var(--color-primary-400);
  margin-bottom: 1.5rem;
}

.not-found-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-primary-900);
  margin-bottom: 0.75rem;
}

.not-found-text {
  color: var(--color-primary-600);
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.not-found-btn {
  display: inline-flex;
}

/* Dark mode */
:global(.dark) .share-label {
  color: var(--color-primary-400);
}

:global(.dark) .skeleton-breadcrumb,
:global(.dark) .skeleton-badge,
:global(.dark) .skeleton-title,
:global(.dark) .skeleton-excerpt,
:global(.dark) .skeleton-meta,
:global(.dark) .skeleton-hero,
:global(.dark) .skeleton-paragraph {
  background: var(--color-primary-800);
}

:global(.dark) .not-found-icon {
  color: var(--color-primary-500);
}

:global(.dark) .not-found-title {
  color: var(--color-primary-100);
}

:global(.dark) .not-found-text {
  color: var(--color-primary-400);
}

/* Responsive */
@media (max-width: 640px) {
  .article-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .share-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
