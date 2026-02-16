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

const featureIcons = ["grid", "users", "layers", "puzzle"];
</script>

<template>
  <section
    id="cms-section"
    ref="sectionRef"
    class="cms-section"
    aria-labelledby="cms-heading"
  >
    <div class="section-container">
      <!-- Header -->
      <div
        class="section-header"
        :class="{ 'animate-in': isVisible }"
      >
        <h2 id="cms-heading" class="section-title">
          {{ t("services.cms.title") }}
        </h2>
        <p class="section-description">
          {{ t("services.cms.description") }}
        </p>
      </div>

      <!-- Features Grid -->
      <div class="features-grid" :class="{ 'animate-in': isVisible }">
        <div
          v-for="(feature, index) in (tm('services.cms.features') as { title: string; description: string }[])"
          :key="index"
          class="feature-card"
          :class="`stagger-${index + 1}`"
        >
          <div class="feature-icon" :class="`icon-${featureIcons[index]}`">
            <!-- Grid -->
            <svg v-if="featureIcons[index] === 'grid'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <!-- Users -->
            <svg v-else-if="featureIcons[index] === 'users'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            <!-- Layers -->
            <svg v-else-if="featureIcons[index] === 'layers'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <!-- Puzzle -->
            <svg v-else-if="featureIcons[index] === 'puzzle'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 01-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 10-3.214 3.214c.446.166.855.497.925.968a.979.979 0 01-.276.837l-1.61 1.61a2.404 2.404 0 01-1.705.707 2.402 2.402 0 01-1.704-.706l-1.568-1.568a1.026 1.026 0 00-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 11-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 00-.289-.877l-1.568-1.568A2.402 2.402 0 011.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 103.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0112 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 113.237 3.237c-.464.18-.894.527-.967 1.02z" />
            </svg>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-wrapper" :class="{ 'animate-in': isVisible }">
        <NuxtLink to="/contact" class="cta-button">
          {{ t("services.cms.cta") }}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="cta-icon">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cms-section {
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
  max-width: 1000px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 650px;
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
  background: var(--color-accent-100);
  color: var(--color-accent-700);
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

.section-description {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-text-muted);

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  &.animate-in .feature-card {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card {
  padding: 2rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth), box-shadow 0.3s var(--ease-smooth);

  &.stagger-1 { transition-delay: 50ms; }
  &.stagger-2 { transition-delay: 100ms; }
  &.stagger-3 { transition-delay: 150ms; }
  &.stagger-4 { transition-delay: 200ms; }

  &:hover {
    box-shadow: var(--shadow-md);
  }
}

.feature-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1.25rem;
  padding: 0.625rem;
  background: var(--color-accent-100);
  border-radius: var(--radius-md);
  color: var(--color-accent-600);

  svg {
    width: 100%;
    height: 100%;
  }
}

.feature-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.feature-description {
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-text-muted);
}

.cta-wrapper {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-smooth) 0.3s, transform 0.6s var(--ease-smooth) 0.3s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: var(--color-accent-500);
  color: white;
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background 0.2s var(--ease-smooth), transform 0.2s var(--ease-smooth);

  &:hover {
    background: var(--color-accent-600);
    transform: translateY(-2px);
  }
}

.cta-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s var(--ease-smooth);

  .cta-button:hover & {
    transform: translateX(2px);
  }
}

// Dark mode
:root.dark {
  .cms-section {
    background: var(--color-section-dark);
  }

  .section-badge {
    background: var(--color-accent-900);
    color: var(--color-accent-300);
  }

  .feature-card {
    background: var(--color-bg-card);
    border-color: var(--color-border);
  }

  .feature-icon {
    background: var(--color-accent-900);
    color: var(--color-accent-400);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .feature-card,
  .cta-wrapper {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
