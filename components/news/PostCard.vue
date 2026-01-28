<template>
  <article class="post-card" :class="{ 'post-card--featured': featured }">
    <NuxtLink :to="`/news/${post.slug.current}`" class="post-card-link">
      <!-- Image -->
      <div class="post-card-image">
        <SanityImage
          v-if="post.heroImage"
          :asset-id="post.heroImage.asset?._ref"
          :alt="post.heroImageAlt || post.title"
          auto="format"
          class="post-image"
        />
        <div v-else class="post-image-placeholder">
          <Icon name="i-heroicons-newspaper" class="size-12 text-primary-300" aria-hidden="true" />
        </div>
        <!-- Post type badge -->
        <span class="post-type-badge" :class="`badge-${post.postType}`">
          {{ postTypeLabel }}
        </span>
      </div>

      <!-- Content -->
      <div class="post-card-content">
        <!-- Meta -->
        <div class="post-meta">
          <time :datetime="post.publishedAt" class="post-date">
            <Icon name="i-heroicons-calendar" class="size-4" aria-hidden="true" />
            {{ formattedDate }}
          </time>
          <span v-if="readingTime" class="post-reading-time">
            <Icon name="i-heroicons-clock" class="size-4" aria-hidden="true" />
            {{ readingTime }} {{ t("news.article.minRead") }}
          </span>
        </div>

        <!-- Title -->
        <h3 class="post-title">{{ post.title }}</h3>

        <!-- Excerpt -->
        <p class="post-excerpt">{{ post.excerpt }}</p>

        <!-- Event info (if event type) -->
        <div v-if="post.postType === 'event' && post.eventStartDate" class="post-event-info">
          <Icon name="i-heroicons-map-pin" class="size-4" aria-hidden="true" />
          <span>{{ post.eventLocation }}</span>
          <span class="event-divider">|</span>
          <span>{{ formatEventDate(post.eventStartDate) }}</span>
        </div>

        <!-- Read more -->
        <span class="post-read-more">
          {{ t("news.postCard.readMore") }}
          <Icon name="i-heroicons-arrow-right" class="size-4 read-more-icon" aria-hidden="true" />
        </span>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Post } from "~/types/sanity";

const props = defineProps<{
  post: Post;
  featured?: boolean;
}>();

const { t, locale } = useI18n();

const postTypeLabel = computed(() => t(`news.postTypes.${props.post.postType}`));

const formattedDate = computed(() => {
  if (!props.post.publishedAt) return "";
  return new Date(props.post.publishedAt).toLocaleDateString(locale.value, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});

const readingTime = computed(() => {
  if (props.post.readingTimeOverride) return props.post.readingTimeOverride;
  // Estimate based on excerpt length (rough estimate)
  const words = props.post.excerpt?.split(/\s+/).length || 0;
  return Math.max(1, Math.ceil(words / 200));
});

function formatEventDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(locale.value, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
</script>

<style lang="scss" scoped>
.post-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-smooth);
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--glass-shadow-elevated);
    border-color: var(--color-primary-200);

    .post-image {
      transform: scale(1.05);
    }

    .read-more-icon {
      transform: translateX(4px);
    }
  }
}

.post-card--featured {
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }

  .post-card-image {
    aspect-ratio: 21 / 9;
  }

  .post-title {
    font-size: 1.5rem;
  }
}

.post-card-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
}

.post-card-image {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--color-primary-100);
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-smooth);
}

.post-image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-50));
}

.post-type-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;
  backdrop-filter: blur(8px);
}

.badge-news {
  background: rgba(64, 150, 255, 0.9);
  color: white;
}

.badge-event {
  background: rgba(249, 115, 22, 0.9);
  color: white;
}

.badge-product_update {
  background: rgba(34, 197, 94, 0.9);
  color: white;
}

.badge-press_release {
  background: rgba(139, 92, 246, 0.9);
  color: white;
}

.post-card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.25rem;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.post-date,
.post-reading-time {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--color-primary-700); /* Improved from primary-500 for WCAG AA contrast */
}

.post-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-primary-900);
  line-height: 1.4;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-excerpt {
  flex: 1;
  font-size: 0.9rem;
  color: var(--color-primary-700);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
}

.post-event-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--color-accent-600);
  margin-bottom: 1rem;
}

.event-divider {
  opacity: 0.5;
}

.post-read-more {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary-600);
  margin-top: auto;
}

.read-more-icon {
  transition: transform var(--duration-fast) var(--ease-smooth);
}

/* Dark mode */
:global(.dark) .post-card {
  background: var(--color-surface-1);
  border-color: var(--color-border);

  &:hover {
    border-color: var(--color-primary-600);
  }
}

:global(.dark) .post-image-placeholder {
  background: linear-gradient(135deg, var(--color-primary-900), var(--color-primary-800));
}

:global(.dark) .post-title {
  color: var(--color-primary-100);
}

:global(.dark) .post-excerpt {
  color: var(--color-primary-300);
}

:global(.dark) .post-date,
:global(.dark) .post-reading-time {
  color: var(--color-primary-400);
}

:global(.dark) .post-read-more {
  color: var(--color-primary-300);
}

:global(.dark) .post-event-info {
  color: var(--color-accent-400);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .post-card:hover {
    transform: none;
  }

  .post-card:hover .post-image {
    transform: none;
  }

  .post-card:hover .read-more-icon {
    transform: none;
  }
}
</style>
