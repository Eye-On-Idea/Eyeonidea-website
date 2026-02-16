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

const steps = computed(() =>
  (tm("services.howWeWork.steps") as Array<{ icon: string; title: string; description: string }>)
);
</script>

<template>
  <section
    id="how-we-work-section"
    ref="sectionRef"
    class="how-we-work-section"
    aria-labelledby="how-we-work-heading"
  >
    <div class="section-container">
      <!-- Header -->
      <div
        class="section-header"
        :class="{ 'animate-in': isVisible }"
      >
        <h2 id="how-we-work-heading" class="section-title">
          {{ t("services.howWeWork.title") }}
        </h2>
        <p class="section-subtitle">
          {{ t("services.howWeWork.subtitle") }}
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="steps-grid" :class="{ 'animate-in': isVisible }">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="step-card"
          :class="`stagger-${index + 1}`"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-icon-wrap">
            <UIcon :name="step.icon" class="step-icon" aria-hidden="true" />
          </div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>

      <!-- CTA Link -->
      <div
        class="section-cta"
        :class="{ 'animate-in': isVisible }"
      >
        <NuxtLink to="/services/process" class="cta-link">
          {{ t("services.howWeWork.cta") }}
          <UIcon name="i-heroicons-arrow-right" class="cta-icon" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.how-we-work-section {
  padding: 6rem 1.5rem;
  background: var(--color-section-light);

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 10rem 2rem;
  }
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 700px;
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
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.section-subtitle {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-text-muted);

  @media (min-width: 768px) {
    font-size: var(--text-lg);
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
  padding: 2rem 1.5rem;
  text-align: center;
  background: var(--color-surface-1);
  border: 1px solid var(--glass-border-subtle);
  border-radius: var(--radius-xl);
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth),
    box-shadow 0.2s var(--ease-smooth);

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  &.stagger-1 { transition-delay: 100ms; }
  &.stagger-2 { transition-delay: 200ms; }
  &.stagger-3 { transition-delay: 300ms; }
  &.stagger-4 { transition-delay: 400ms; }
}

.step-number {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-primary-500);
  background: var(--color-primary-100);
  border-radius: 9999px;
}

.step-icon-wrap {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-primary-500) 12%, transparent),
    color-mix(in srgb, var(--color-accent-500) 12%, transparent)
  );
  border-radius: var(--radius-lg);
}

.step-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-primary-600);
}

.step-title {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.step-description {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-muted);
}

.section-cta {
  text-align: center;
  margin-top: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-smooth) 0.5s, transform 0.6s var(--ease-smooth) 0.5s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: var(--color-primary-500);
  color: white;
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background 0.2s var(--ease-smooth), transform 0.2s var(--ease-smooth);

  &:hover {
    background: var(--color-primary-600);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 4px;
  }
}

.cta-icon {
  width: 1.125rem;
  height: 1.125rem;
  transition: transform 0.2s var(--ease-smooth);

  .cta-link:hover & {
    transform: translateX(3px);
  }
}

// Dark mode
:root.dark {
  .how-we-work-section {
    background: var(--color-section-dark);
  }

  .section-badge {
    background: var(--color-primary-900);
    color: var(--color-primary-300);
  }

  .step-number {
    background: var(--color-primary-900);
    color: var(--color-primary-300);
  }

  .step-card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .step-icon {
    color: var(--color-primary-400);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .step-card,
  .section-cta {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
