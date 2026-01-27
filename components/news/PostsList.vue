<template>
  <section class="posts-list-section">
    <UContainer class="max-w-[120rem] py-10 md:py-14">
      <!-- Posts grid -->
      <div class="posts-grid" v-if="posts.length > 0">
        <div
          v-for="(post, index) in posts"
          :key="post._id"
          v-motion
          :initial="motionVariants.fadeInUp.initial"
          :visible-once="{ ...motionVariants.fadeInUp.visible, transition: { delay: index * 50 } }"
        >
          <NewsPostCard :post="post" />
        </div>
      </div>

      <!-- Loading skeleton -->
      <div v-else-if="pending" class="posts-grid">
        <div v-for="n in 6" :key="n" class="post-skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-meta"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-excerpt"></div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="posts-empty">
        <div class="empty-icon">
          <Icon name="i-heroicons-document-magnifying-glass" class="size-16" aria-hidden="true" />
        </div>
        <h3 class="empty-title">{{ t("news.postsList.noResults") }}</h3>
        <p class="empty-description">
          {{ t("news.postsList.noResultsText") }}
        </p>
        <UButton v-if="hasFilters" variant="outline" @click="$emit('clearFilters')">
          {{ t("news.filters.clearFilters") }}
        </UButton>
      </div>

      <!-- Load more -->
      <div v-if="hasMore && posts.length > 0" class="load-more-container">
        <UButton
          variant="outline"
          size="lg"
          :loading="loadingMore"
          class="load-more-btn"
          @click="$emit('loadMore')"
        >
          <Icon v-if="!loadingMore" name="i-heroicons-plus" class="size-5 mr-2" aria-hidden="true" />
          {{ loadingMore ? t("news.postsList.loading") : t("news.postsList.loadMore") }}
        </UButton>
        <p class="posts-count">
          {{ t("news.postsList.showingCount", { shown: posts.length, total: totalPosts }) }}
        </p>
      </div>

      <!-- All loaded message -->
      <p v-else-if="posts.length > 0 && !hasMore" class="all-loaded">
        {{ t("news.postsList.allLoaded") }}
      </p>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { animationPresets } from "~/composables/useAccessibleMotion";
import type { Post } from "~/types/sanity";

defineProps<{
  posts: Post[];
  pending?: boolean;
  hasMore?: boolean;
  loadingMore?: boolean;
  totalPosts?: number;
  hasFilters?: boolean;
}>();

defineEmits<{
  (e: "loadMore"): void;
  (e: "clearFilters"): void;
}>();

const { t } = useI18n();

const motionVariants = {
  fadeInUp: animationPresets.fadeInUp,
};
</script>

<style lang="scss" scoped>
.posts-list-section {
  background: var(--color-section-alt);
  min-height: 400px;
}

.posts-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Skeleton */
.post-skeleton {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
}

.skeleton-image {
  aspect-ratio: 16 / 9;
  background: linear-gradient(
    90deg,
    var(--color-primary-100) 0%,
    var(--color-primary-50) 50%,
    var(--color-primary-100) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

.skeleton-content {
  padding: 1.25rem;
}

.skeleton-meta {
  width: 40%;
  height: 12px;
  background: var(--color-primary-100);
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.skeleton-title {
  width: 80%;
  height: 20px;
  background: var(--color-primary-100);
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.skeleton-excerpt {
  width: 100%;
  height: 48px;
  background: var(--color-primary-50);
  border-radius: 6px;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Empty state */
.posts-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 1rem;
}

.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  background: var(--color-primary-100);
  border-radius: 50%;
  color: var(--color-primary-400);
  margin-bottom: 1.5rem;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary-900);
  margin-bottom: 0.5rem;
}

.empty-description {
  font-size: 0.9375rem;
  color: var(--color-primary-600);
  max-width: 24rem;
  margin-bottom: 1.5rem;
}

/* Load more */
.load-more-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.load-more-btn {
  min-width: 200px;
}

.posts-count {
  font-size: 0.875rem;
  color: var(--color-primary-500);
}

.all-loaded {
  text-align: center;
  font-size: 0.9375rem;
  color: var(--color-primary-500);
  margin-top: 3rem;
  padding: 1rem;
  background: var(--color-surface-1);
  border-radius: 12px;
}

/* Dark mode */
:global(.dark) .post-skeleton {
  background: var(--color-surface-1);
  border-color: var(--color-border);
}

:global(.dark) .skeleton-image {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

:global(.dark) .skeleton-meta,
:global(.dark) .skeleton-title {
  background: rgba(255, 255, 255, 0.08);
}

:global(.dark) .skeleton-excerpt {
  background: rgba(255, 255, 255, 0.05);
}

:global(.dark) .empty-icon {
  background: rgba(64, 150, 255, 0.15);
  color: var(--color-primary-400);
}

:global(.dark) .empty-title {
  color: var(--color-primary-100);
}

:global(.dark) .empty-description {
  color: var(--color-primary-400);
}

:global(.dark) .posts-count {
  color: var(--color-primary-400);
}

:global(.dark) .all-loaded {
  background: var(--color-surface-1);
  color: var(--color-primary-400);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .skeleton-image {
    animation: none;
  }
}
</style>

