<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  if (!sectionRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <section
    ref="sectionRef"
    class="about-story"
    aria-labelledby="story-heading"
  >
    <div class="section-container">
      <div
        class="content-wrapper"
        :class="{ 'animate-in': isVisible }"
      >
        <span class="section-badge">{{ t("about.story.badge") }}</span>
        <h2 id="story-heading" class="section-title">
          {{ t("about.story.title") }}
        </h2>

        <div class="story-content">
          <p
            v-for="(paragraph, index) in t('about.story.paragraphs')"
            :key="index"
            class="story-paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-story {
  padding: 6rem 1.5rem;
  background: var(--color-section-light);

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
}

.section-container {
  max-width: 800px;
  margin: 0 auto;
}

.content-wrapper {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: var(--text-3xl);
  color: var(--color-text);
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.story-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.story-paragraph {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--color-text-muted);

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

// Dark mode
:root.dark {
  .about-story {
    background: var(--color-section-dark);
  }

  .section-badge {
    background: var(--color-primary-900);
    color: var(--color-primary-300);
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-wrapper {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
