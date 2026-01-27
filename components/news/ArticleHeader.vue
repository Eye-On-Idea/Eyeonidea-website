<template>
  <header class="article-header">
    <!-- Post type badge -->
    <div class="article-meta-top">
      <span :class="['post-type-badge', `badge-${post.postType}`]">
        {{ postTypeLabel }}
      </span>
      <span v-if="readingTime" class="reading-time">
        <Icon name="i-heroicons-clock" class="clock-icon" aria-hidden="true" />
        {{ readingTime }} {{ t("news.article.minRead") }}
      </span>
    </div>

    <!-- Title -->
    <h1 class="article-title">{{ post.title }}</h1>

    <!-- Excerpt -->
    <p v-if="post.excerpt" class="article-excerpt">{{ post.excerpt }}</p>

    <!-- Meta row -->
    <div class="article-meta">
      <time :datetime="post.publishedAt" class="publish-date">
        <Icon name="i-heroicons-calendar" class="meta-icon" aria-hidden="true" />
        {{ formattedDate }}
      </time>

      <!-- Author -->
      <template v-if="post.author">
        <span class="meta-separator">|</span>
        <span class="author">
          <Icon name="i-heroicons-user" class="meta-icon" aria-hidden="true" />
          {{ post.author.name }}
        </span>
      </template>

      <!-- Event info -->
      <template v-if="post.postType === 'event' && post.eventStartDate">
        <span class="meta-separator">|</span>
        <span class="event-date">
          <Icon name="i-heroicons-map-pin" class="meta-icon" aria-hidden="true" />
          {{ formatEventDate(post.eventStartDate, post.eventEndDate) }}
          <template v-if="post.eventLocation"> - {{ post.eventLocation }}</template>
        </span>
      </template>

      <!-- Collaborators -->
      <template v-if="post.collaborators && post.collaborators.length > 0">
        <span class="meta-separator">|</span>
        <span class="collaborators">
          <Icon name="i-heroicons-building-office" class="meta-icon" aria-hidden="true" />
          <template v-for="(collab, index) in post.collaborators" :key="collab._id">
            <NuxtLink
              v-if="collab.slug"
              :to="`/collaborators#${collab.slug.current}`"
              class="collaborator-link"
            >
              {{ collab.name }}
            </NuxtLink>
            <span v-else>{{ collab.name }}</span>
            <span v-if="index < post.collaborators.length - 1">, </span>
          </template>
        </span>
      </template>
    </div>

    <!-- Hero image -->
    <figure v-if="post.heroImage" class="article-hero-image">
      <SanityImage
        :asset-id="post.heroImage.asset?._ref"
        auto="format"
        :alt="post.heroImageAlt || post.title"
        class="hero-img"
      />
    </figure>
  </header>
</template>

<script setup lang="ts">
import type { Post } from "~/types/sanity";

const props = defineProps<{
  post: Post;
}>();

const { t, locale } = useI18n();

const postTypeLabel = computed(() => t(`news.postTypes.${props.post.postType}`));

const formattedDate = computed(() => {
  if (!props.post.publishedAt) return "";
  return new Date(props.post.publishedAt).toLocaleDateString(locale.value, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Estimate reading time based on body content or use override
const readingTime = computed(() => {
  if (props.post.readingTimeOverride) return props.post.readingTimeOverride;
  if (!props.post.body) return null;

  // Rough estimate: count text in blocks
  const text = props.post.body
    .filter((block: any) => block._type === "block")
    .map((block: any) => block.children?.map((c: any) => c.text).join(" ") || "")
    .join(" ");

  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
});

function formatEventDate(start: string, end?: string): string {
  const startDate = new Date(start);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  if (end && end !== start) {
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString(locale.value, options)} - ${endDate.toLocaleDateString(locale.value, options)}`;
  }

  return startDate.toLocaleDateString(locale.value, options);
}
</script>

<style lang="scss" scoped>
.article-header {
  margin-bottom: 2.5rem;
}

.article-meta-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.post-type-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
}

.badge-news {
  background: linear-gradient(135deg, rgba(64, 150, 255, 0.15), rgba(64, 150, 255, 0.25));
  color: var(--color-primary-700);
}

.badge-event {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(249, 115, 22, 0.25));
  color: var(--color-accent-700);
}

.badge-product_update {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.25));
  color: #15803d;
}

.badge-press_release {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.25));
  color: #6d28d9;
}

.reading-time {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: var(--color-primary-600);
}

.clock-icon {
  width: 1rem;
  height: 1rem;
}

.article-title {
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-primary-900);
  margin-bottom: 1rem;
}

.article-excerpt {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-primary-700);
  margin-bottom: 1.5rem;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--color-primary-600);
  margin-bottom: 2rem;
}

.meta-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.publish-date,
.author,
.event-date,
.collaborators {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.meta-separator {
  color: var(--color-primary-400);
}

.collaborator-link {
  color: var(--color-primary-600);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color var(--duration-fast) var(--ease-smooth);

  &:hover {
    color: var(--color-primary-500);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
}

.article-hero-image {
  margin: 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--glass-shadow-elevated);
}

.hero-img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

/* Dark mode */
:global(.dark) .post-type-badge {
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

:global(.dark) .reading-time {
  color: var(--color-primary-400);
}

:global(.dark) .article-title {
  color: var(--color-primary-100);
}

:global(.dark) .article-excerpt {
  color: var(--color-primary-300);
}

:global(.dark) .article-meta {
  color: var(--color-primary-400);
}

:global(.dark) .meta-separator {
  color: var(--color-primary-600);
}

:global(.dark) .collaborator-link {
  color: var(--color-primary-400);

  &:hover {
    color: var(--color-primary-300);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .meta-separator {
    display: none;
  }
}
</style>
