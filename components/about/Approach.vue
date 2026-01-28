<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

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
    class="about-approach"
    aria-labelledby="approach-heading"
  >
    <div class="section-container">
      <!-- Header -->
      <div
        class="section-header"
        :class="{ 'animate-in': isVisible }"
      >
        <span class="section-badge">{{ t("about.approach.badge") }}</span>
        <h2 id="approach-heading" class="section-title">
          {{ t("about.approach.title") }}
        </h2>
      </div>

      <!-- Steps -->
      <div class="steps-grid" :class="{ 'animate-in': isVisible }">
        <div
          v-for="(step, index) in (tm('about.approach.steps') as Array<{number: string, title: string, description: string}>)"
          :key="index"
          class="step-card"
          :class="`stagger-${index + 1}`"
        >
          <span class="step-number">{{ step.number }}</span>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-approach {
  padding: 6rem 1.5rem;
  background: var(--color-section-dark);

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
}

.section-container {
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--color-primary-900);
  color: var(--color-primary-300);
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
  margin-bottom: 0;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.steps-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  &.animate-in .step-card {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-card {
  position: relative;
  padding: 2rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth);

  &.stagger-1 { transition-delay: 100ms; }
  &.stagger-2 { transition-delay: 200ms; }
  &.stagger-3 { transition-delay: 300ms; }
  &.stagger-4 { transition-delay: 400ms; }

  @media (min-width: 1024px) {
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -0.75rem;
      width: 1.5rem;
      height: 2px;
      background: var(--color-border);
      transform: translateY(-50%);
    }
  }
}

.step-number {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  background: linear-gradient(
    135deg,
    var(--color-primary-500) 0%,
    var(--color-accent-500) 100%
  );
  color: white;
  font-size: var(--text-lg);
  font-weight: 700;
  border-radius: 50%;
  margin-bottom: 1.25rem;
}

.step-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.step-description {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-muted);
}

// Light mode
:root:not(.dark) {
  .about-approach {
    background: var(--color-section-light);
  }

  .section-badge {
    background: var(--color-primary-100);
    color: var(--color-primary-700);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .step-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
