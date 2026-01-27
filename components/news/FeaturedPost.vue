<template>
  <article v-if="post" class="featured-post">
    <NuxtLink :to="`/news/${post.slug.current}`" class="featured-post-link">
      <!-- Image -->
      <div class="featured-image-container">
        <SanityImage
          v-if="post.heroImage"
          :asset-id="post.heroImage.asset?._ref"
          :alt="post.heroImageAlt || post.title"
          auto="format"
          class="featured-image"
        />
        <div v-else class="featured-image-placeholder">
          <Icon name="i-heroicons-newspaper" class="size-16 text-primary-300" aria-hidden="true" />
        </div>
        <div class="featured-overlay" aria-hidden="true"></div>
      </div>

      <!-- Content overlay -->
      <div class="featured-content">
        <div class="featured-badge">
          <Icon name="i-heroicons-star" class="size-4" aria-hidden="true" />
          {{ t("news.featured.badge") }}
        </div>

        <div class="featured-meta">
          <span class="featured-type" :class="`type-${post.postType}`">
            {{ postTypeLabel }}
          </span>
          <time :datetime="post.publishedAt" class="featured-date">
            {{ formattedDate }}
          </time>
        </div>

        <h2 class="featured-title">{{ post.title }}</h2>

        <p class="featured-excerpt">{{ post.excerpt }}</p>

        <span class="featured-cta">
          {{ t("news.featured.readArticle") }}
          <Icon name="i-heroicons-arrow-right" class="size-5 cta-icon" aria-hidden="true" />
        </span>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Post } from "~/types/sanity";

const props = defineProps<{
  post: Post | null;
}>();

const { t, locale } = useI18n();

const postTypeLabel = computed(() => {
  if (!props.post) return "";
  return t(`news.postTypes.${props.post.postType}`);
});

const formattedDate = computed(() => {
  if (!props.post?.publishedAt) return "";
  return new Date(props.post.publishedAt).toLocaleDateString(locale.value, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<style lang="scss" scoped>
.featured-post {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  min-height: 400px;

  @media (min-width: 768px) {
    min-height: 480px;
  }
}

.featured-post-link {
  display: block;
  position: relative;
  height: 100%;
  text-decoration: none;
  color: white;

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 4px;
  }

  &:hover .featured-image {
    transform: scale(1.05);
  }

  &:hover .cta-icon {
    transform: translateX(4px);
  }
}

.featured-image-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-smooth);
}

.featured-image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary-800), var(--color-primary-900));
}

.featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(15, 23, 42, 0.7) 40%,
    rgba(15, 23, 42, 0.3) 100%
  );
}

.featured-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  min-height: 400px;
  padding: 2rem;

  @media (min-width: 768px) {
    min-height: 480px;
    padding: 2.5rem;
  }
}

.featured-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  width: fit-content;
  padding: 0.375rem 0.875rem;
  background: linear-gradient(135deg, var(--color-accent-500), var(--color-accent-600));
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
}

.featured-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.featured-type {
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
}

.type-news {
  background: rgba(64, 150, 255, 0.3);
}

.type-event {
  background: rgba(249, 115, 22, 0.3);
}

.type-product_update {
  background: rgba(34, 197, 94, 0.3);
}

.type-press_release {
  background: rgba(139, 92, 246, 0.3);
}

.featured-date {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.featured-title {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.75rem;
  max-width: 48rem;
}

.featured-excerpt {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  max-width: 40rem;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
}

.featured-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent-300);
  width: fit-content;
}

.cta-icon {
  transition: transform var(--duration-fast) var(--ease-smooth);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .featured-post-link:hover .featured-image {
    transform: none;
  }

  .featured-post-link:hover .cta-icon {
    transform: none;
  }
}
</style>
