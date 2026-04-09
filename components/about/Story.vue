<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  if (!sectionRef.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.08 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <section
    ref="sectionRef"
    class="about-story"
    aria-labelledby="story-heading"
  >

    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("about.story.badge") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-container">
      <div class="story-grid" :class="{ 'animate-in': isVisible }">

        <div class="story-heading-col">
          <h2 id="story-heading" class="section-title">
            {{ t("about.story.title") }}
          </h2>
        </div>

        <div class="story-content-col">
          <p
            v-for="(paragraph, index) in tm('about.story.paragraphs') as string[]"
            :key="index"
            class="story-paragraph"
            :style="{ transitionDelay: `${index * 120}ms` }"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="story-image-wrap">
        <NuxtImg
          src="/images/about/story.jpg"
          :alt="t('about.story.imageAlt')"
          class="story-image"
          width="1920"
          height="640"
          format="webp"
          quality="82"
          loading="lazy"
        />
        <div class="deco-frame" aria-hidden="true">
          <span class="corner corner--tl" />
          <span class="corner corner--tr" />
          <span class="corner corner--bl" />
          <span class="corner corner--br" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.about-story {
  background: #0d0908;
  padding-bottom: 0;
}

.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
}

.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.sep-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.sep-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  flex-shrink: 0;
}

.section-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 6rem;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 5rem;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s var(--ease-smooth),
    transform 0.7s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1.5fr;
    gap: 5rem;
    align-items: start;
  }
}

.story-heading-col {
  @media (min-width: 768px) {
    position: sticky;
    top: 8rem;
  }
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.9rem, 3.5vw, 2.75rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ffeddf;
  margin: 0;
}

.story-content-col {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  border-left: 1px solid rgba(223, 175, 133, 0.2);
  padding-left: 2.5rem;
}

@supports (animation-timeline: view()) {
  .story-content-col {
    animation: borderAmber linear;
    animation-timeline: view();
    animation-range: entry 0% cover 60%;
  }

  @keyframes borderAmber {
    from { border-left-color: rgba(223, 175, 133, 0.1); }
    to   { border-left-color: rgba(223, 175, 133, 0.4); }
  }
}

.story-paragraph {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.8;
  color: rgba(255, 237, 223, 0.55);
  margin: 0;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  .animate-in & {
    opacity: 1;
    transform: translateY(0);
  }
}

.story-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 21 / 7;
  overflow: hidden;
  border: 1px solid rgba(223, 175, 133, 0.08);

  @media (min-width: 768px) {
    aspect-ratio: 21 / 6;
  }
}

.story-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.deco-frame {
  position: absolute;
  inset: 0.75rem;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-color: rgba(223, 175, 133, 0.12);
  border-style: solid;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

@media (prefers-reduced-motion: reduce) {
  .story-grid,
  .story-paragraph {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

html:not(.dark) {
  .about-story { background: var(--color-section-light); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title { color: var(--color-text-primary); }

  .story-content-col {
    border-left-color: var(--deco-line-strong);
  }

  @supports (animation-timeline: view()) {
    .story-content-col {
      animation: borderPrimary linear;
      animation-timeline: view();
      animation-range: entry 0% cover 60%;
    }
    @keyframes borderPrimary {
      from { border-left-color: rgba(153, 82, 38, 0.12); }
      to   { border-left-color: rgba(153, 82, 38, 0.40); }
    }
  }

  .story-paragraph { color: var(--color-text-subtle); }

  .story-image-wrap {
    border-color: var(--color-border);
  }

  .corner { border-color: var(--deco-border); }
}
</style>

