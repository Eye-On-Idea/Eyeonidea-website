<template>
  <section v-if="posts && posts.length > 0" class="related-posts-section">
    <h2 class="related-title">{{ t("news.article.relatedPosts") }}</h2>
    <div class="related-grid">
      <article
        v-for="post in posts"
        :key="post._id"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 400 } }"
        class="related-card"
      >
        <NuxtLink :to="`/news/${post.slug?.current}`" class="related-link">
          <div v-if="post.heroImage" class="related-image-wrapper">
            <SanityImage
              :asset-id="post.heroImage.asset?._ref"
              auto="format"
              :alt="post.heroImageAlt || post.title"
              class="related-image"
            />
          </div>
          <div v-else class="related-image-placeholder">
            <Icon name="i-heroicons-newspaper" class="placeholder-icon" />
          </div>
          <div class="related-content">
            <span :class="['related-badge', `badge-${post.postType}`]">
              {{ getPostTypeLabel(post.postType) }}
            </span>
            <h3 class="related-card-title">{{ post.title }}</h3>
            <time :datetime="post.publishedAt" class="related-date">
              {{ formatDate(post.publishedAt) }}
            </time>
          </div>
        </NuxtLink>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Post, PostType } from "~/types/sanity";

defineProps<{
  posts: Post[];
}>();

const { t, locale } = useI18n();

function getPostTypeLabel(type: PostType) {
  return t(`news.postTypes.${type}`);
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(locale.value, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
</script>

<style lang="scss" scoped>
.related-posts-section {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid var(--color-border);
}

.related-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary-900);
  margin-bottom: 1.5rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.related-card {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-smooth);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--glass-shadow-elevated);
    border-color: var(--color-primary-200);
  }
}

.related-link {
  display: block;
  text-decoration: none;
  color: inherit;

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: -2px;
    border-radius: 12px;
  }
}

.related-image-wrapper {
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.related-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-normal) var(--ease-smooth);

  .related-card:hover & {
    transform: scale(1.05);
  }
}

.related-image-placeholder {
  aspect-ratio: 16 / 10;
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  width: 3rem;
  height: 3rem;
  color: var(--color-primary-400);
}

.related-content {
  padding: 1rem 1.25rem 1.25rem;
}

.related-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  margin-bottom: 0.5rem;
}

.badge-news {
  background: rgba(64, 150, 255, 0.15);
  color: var(--color-primary-700);
}

.badge-event {
  background: rgba(249, 115, 22, 0.15);
  color: var(--color-accent-700);
}

.badge-product_update {
  background: rgba(34, 197, 94, 0.15);
  color: #15803d;
}

.badge-press_release {
  background: rgba(139, 92, 246, 0.15);
  color: #6d28d9;
}

.related-card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary-900);
  line-height: 1.4;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-date {
  font-size: 0.8rem;
  color: var(--color-primary-500);
}

/* Dark mode */
:global(.dark) .related-title {
  color: var(--color-primary-100);
}

:global(.dark) .related-card {
  background: var(--color-surface-1);
  border-color: var(--color-border);

  &:hover {
    border-color: var(--color-primary-600);
  }
}

:global(.dark) .related-image-placeholder {
  background: linear-gradient(135deg, var(--color-primary-800), var(--color-primary-700));
}

:global(.dark) .placeholder-icon {
  color: var(--color-primary-500);
}

:global(.dark) .badge-news {
  background: rgba(64, 150, 255, 0.2);
  color: var(--color-primary-300);
}

:global(.dark) .badge-event {
  background: rgba(249, 115, 22, 0.2);
  color: var(--color-accent-400);
}

:global(.dark) .badge-product_update {
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
}

:global(.dark) .badge-press_release {
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
}

:global(.dark) .related-card-title {
  color: var(--color-primary-100);
}

:global(.dark) .related-date {
  color: var(--color-primary-400);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .related-card:hover {
    transform: none;
  }

  .related-image {
    transition: none;
  }

  .related-card:hover .related-image {
    transform: none;
  }
}
</style>
