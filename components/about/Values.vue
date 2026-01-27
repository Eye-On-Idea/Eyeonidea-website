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

const valueIcons = ["lightbulb", "handshake", "chat", "shield"];
</script>

<template>
  <section
    ref="sectionRef"
    class="about-values"
    aria-labelledby="values-heading"
  >
    <div class="section-container">
      <!-- Header -->
      <div
        class="section-header"
        :class="{ 'animate-in': isVisible }"
      >
        <span class="section-badge">{{ t("about.values.badge") }}</span>
        <h2 id="values-heading" class="section-title">
          {{ t("about.values.title") }}
        </h2>
      </div>

      <!-- Values Grid -->
      <div class="values-grid" :class="{ 'animate-in': isVisible }">
        <div
          v-for="(value, index) in t('about.values.items')"
          :key="index"
          class="value-card glass-subtle"
          :class="`stagger-${index + 1}`"
        >
          <div class="value-icon" :class="`icon-${valueIcons[index]}`">
            <!-- Lightbulb -->
            <svg v-if="valueIcons[index] === 'lightbulb'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
            </svg>
            <!-- Handshake -->
            <svg v-else-if="valueIcons[index] === 'handshake'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 8V4H8" />
              <rect x="2" y="2" width="20" height="8" rx="2" />
              <path d="m18 14.4-3-1.9c-.4-.2-.9-.4-1.4-.4H9.4c-.5 0-1 .2-1.4.4l-4 2.5c-.4.3-.8.7-1 1.2l-.5 1.7c-.2.7.1 1.4.7 1.7l3.4 1.9c.3.1.6.2.9.2h3c.3 0 .6-.1.9-.2l4.1-2.2" />
              <path d="m14 21 2.5-1.4" />
              <path d="m7 14 5 1 3-2" />
            </svg>
            <!-- Chat -->
            <svg v-else-if="valueIcons[index] === 'chat'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              <path d="M8 10h.01M12 10h.01M16 10h.01" />
            </svg>
            <!-- Shield -->
            <svg v-else-if="valueIcons[index] === 'shield'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h3 class="value-title">{{ value.title }}</h3>
          <p class="value-description">{{ value.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-values {
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
  margin-bottom: 0;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  &.animate-in .value-card {
    opacity: 1;
    transform: translateY(0);
  }
}

.value-card {
  padding: 2rem;
  border-radius: var(--radius-lg);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth);

  &.stagger-1 { transition-delay: 100ms; }
  &.stagger-2 { transition-delay: 150ms; }
  &.stagger-3 { transition-delay: 200ms; }
  &.stagger-4 { transition-delay: 250ms; }
}

.value-icon {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1.25rem;
  padding: 0.625rem;
  background: var(--color-accent-100);
  border-radius: var(--radius-md);
  color: var(--color-accent-600);

  svg {
    width: 100%;
    height: 100%;
  }
}

.value-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.value-description {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-text-muted);
}

// Dark mode
:root.dark {
  .about-values {
    background: var(--color-section-dark);
  }

  .section-badge {
    background: var(--color-accent-900);
    color: var(--color-accent-300);
  }

  .value-icon {
    background: var(--color-accent-900);
    color: var(--color-accent-400);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .value-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
