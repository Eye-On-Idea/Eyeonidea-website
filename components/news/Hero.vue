<template>
  <section class="news-hero">
    <div class="hero-pattern" aria-hidden="true"></div>
    <div class="hero-gradient" aria-hidden="true"></div>

    <UContainer class="max-w-480 relative z-10">
      <div class="hero-content">
        <!-- Header -->
        <div
          v-motion
          :initial="motionVariants.fadeInUp.initial"
          :visible-once="motionVariants.fadeInUp.visible"
          class="hero-header"
        >
          <h1 class="hero-title">
            <span class="text-gradient">{{ t("news.hero.title") }}</span>
          </h1>
          <p class="hero-description">
            {{ t("news.hero.subtitle") }}
          </p>
        </div>

        <!-- Featured Post -->
        <div
          v-if="featuredPost"
          v-motion
          :initial="motionVariants.fadeInUp.initial"
          :visible-once="{
            ...motionVariants.fadeInUp.visible,
            transition: { delay: 150 },
          }"
          class="featured-container max-w-260 ml-auto mr-auto"
        >
          <NewsFeaturedPost :post="featuredPost" />
        </div>

        <!-- Skeleton for loading -->
        <div v-else-if="pending" class="featured-skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-badge"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { animationPresets } from "~/composables/useAccessibleMotion";
import type { Post } from "~/types/sanity";

defineProps<{
  featuredPost: Post | null;
  pending?: boolean;
}>();

const { t } = useI18n();

const motionVariants = {
  fadeInUp: animationPresets.fadeInUp,
};
</script>

<style lang="scss" scoped>
.news-hero {
  position: relative;
  background: var(--color-hero-bg-gradient);
  padding: 6rem 0 4rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 8rem 0 5rem;
  }
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
      circle at 20% 30%,
      rgba(64, 150, 255, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(249, 115, 22, 0.06) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(15, 23, 42, 0.3) 100%
  );
  pointer-events: none;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.hero-header {
  text-align: center;
  max-width: 48rem;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.text-gradient {
  background: var(--gradient-text-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-primary-200);
  line-height: 1.6;
  max-width: 36rem;
  margin: 0 auto;
}

.featured-container {
  width: 100%;
}

/* Skeleton loading */
.featured-skeleton {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.05);

  @media (min-width: 768px) {
    min-height: 480px;
  }
}

.skeleton-image {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.03) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

.skeleton-content {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
}

.skeleton-badge {
  width: 100px;
  height: 28px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.skeleton-title {
  width: 70%;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.skeleton-text {
  width: 50%;
  height: 20px;
  background: rgba(255, 255, 255, 0.08);
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

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .skeleton-image {
    animation: none;
  }
}
</style>
