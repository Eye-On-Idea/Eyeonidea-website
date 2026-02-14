<script setup lang="ts">
import { animationPresets, withDelay } from "~/composables/useAccessibleMotion";

const { t, tm } = useI18n();
</script>

<template>
  <section
    class="about-story"
    aria-labelledby="story-heading"
  >
    <div class="section-container">
      <div class="story-grid">
        <!-- Left: Heading -->
        <div
          class="story-heading-col"
          v-motion
          :initial="animationPresets.slideInLeft.initial"
          :visible-once="animationPresets.slideInLeft.visible"
        >
          <span class="section-badge">{{ t("about.story.badge") }}</span>
          <h2 id="story-heading" class="section-title" style="text-wrap: balance">
            {{ t("about.story.title") }}
          </h2>
        </div>

        <!-- Right: Paragraphs -->
        <div
          class="story-content-col"
          v-motion
          :initial="animationPresets.slideInRight.initial"
          :visible-once="withDelay('slideInRight', 200).visible"
        >
          <div class="story-content">
            <p
              v-for="(paragraph, index) in tm('about.story.paragraphs') as string[]"
              :key="index"
              class="story-paragraph"
              v-motion
              :initial="animationPresets.staggerItem.initial"
              :visible-once="withDelay('staggerItem', 300 + index * 150).visible"
            >
              {{ paragraph }}
            </p>
          </div>
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
  max-width: 1100px;
  margin: 0 auto;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1.4fr;
    gap: 4rem;
    align-items: start;
  }
}

.story-heading-col {
  @media (min-width: 768px) {
    position: sticky;
    top: 8rem;
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
  line-height: 1.15;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.story-content-col {
  border-left: 3px solid var(--color-accent-200);
  padding-left: 2rem;
}

// Scroll-driven border color shift (progressive enhancement)
@supports (animation-timeline: view()) {
  .story-content-col {
    animation: borderColorShift linear;
    animation-timeline: view();
    animation-range: entry 0% cover 50%;
  }

  @keyframes borderColorShift {
    from { border-left-color: var(--color-accent-200); }
    to { border-left-color: var(--color-primary-500); }
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

  .story-content-col {
    border-left-color: var(--color-accent-700);
  }
}
</style>
