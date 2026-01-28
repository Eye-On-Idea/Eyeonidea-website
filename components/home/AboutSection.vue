<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t } = useI18n();

// Scroll animation
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
    { threshold: 0.2 }
  );

  observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});

// Value cards data using i18n
const values = [
  {
    key: "clarity",
    icon: "i-heroicons-light-bulb",
  },
  {
    key: "partnership",
    icon: "i-heroicons-users",
  },
  {
    key: "quality",
    icon: "i-heroicons-shield-check",
  },
];
</script>

<template>
  <section
    id="about-section"
    ref="sectionRef"
    class="about-section"
    aria-labelledby="about-heading"
  >
    <div class="about-container">
      <!-- Section Header -->
      <div
        class="section-header"
        :class="{ 'animate-in': isVisible }"
      >
        <span class="section-badge">{{ t("landing.about.badge") }}</span>
        <h2 id="about-heading" class="section-title">
          {{ t("landing.about.title") }}
        </h2>
        <p class="section-description">
          {{ t("landing.about.description") }}
        </p>
      </div>

      <!-- Value Cards -->
      <div class="values-grid" :class="{ 'animate-in': isVisible }">
        <GlassCard
          v-for="(value, index) in values"
          :key="value.key"
          tint-color="dark"
          hover-effect="lift"
          :gradient-border="true"
          class="value-card"
          :class="`stagger-${index + 1}`"
        >
          <div class="value-icon-wrapper">
            <UIcon :name="value.icon" class="value-icon" />
          </div>
          <h3 class="value-title">
            {{ t(`landing.about.values.${value.key}.title`) }}
          </h3>
          <p class="value-description">
            {{ t(`landing.about.values.${value.key}.description`) }}
          </p>
        </GlassCard>
      </div>

      <!-- CTA -->
      <div class="about-cta" :class="{ 'animate-in': isVisible }">
        <NuxtLink to="/about" class="cta-link">
          {{ t("landing.about.cta") }}
          <UIcon name="i-heroicons-arrow-right-20-solid" class="cta-icon" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-section {
  position: relative;
  padding: 6rem 1.5rem;
  background: var(--color-section-light);
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 10rem 2rem;
  }

  // Subtle gradient overlay
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(
      to bottom,
      var(--color-primary-800) 0%,
      transparent 100%
    );
    opacity: 0.03;
    pointer-events: none;
  }
}

.about-container {
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
  background: var(--badge-accent-bg);
  color: var(--badge-accent-text);
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

.values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  &.animate-in .value-card {
    opacity: 1;
    transform: translateY(0);
  }
}

.value-card {
  background: var(--color-surface-1);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth);

  &.stagger-1 { transition-delay: 100ms; }
  &.stagger-2 { transition-delay: 200ms; }
  &.stagger-3 { transition-delay: 300ms; }
}

.value-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(
    135deg,
    var(--color-accent-100) 0%,
    var(--color-accent-50) 100%
  );
  border-radius: 12px;
  margin-bottom: 1.25rem;
}

.value-icon {
  width: 28px;
  height: 28px;
  color: var(--icon-accent);
}

.value-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.value-description {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-muted);
}

.about-cta {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-smooth) 0.4s, transform 0.6s var(--ease-smooth) 0.4s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-primary-600);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all var(--duration-normal) var(--ease-smooth);

  &:hover {
    color: var(--color-primary-700);
    background: var(--color-primary-50);

    .cta-icon {
      transform: translateX(4px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 4px;
  }
}

.cta-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform var(--duration-fast) var(--ease-smooth);
}

// Dark mode adjustments
:root.dark {
  .about-section {
    background: var(--color-section-dark);
  }

  .section-badge {
    background: var(--color-accent-900);
    color: var(--color-accent-300);
  }

  .value-card {
    background: var(--color-surface-2);
  }

  .value-icon-wrapper {
    background: linear-gradient(
      135deg,
      var(--color-accent-800) 0%,
      var(--color-accent-900) 100%
    );
  }

  .value-icon {
    color: var(--color-accent-300);
  }

  .cta-link {
    color: var(--color-primary-300);

    &:hover {
      color: var(--color-primary-200);
      background: rgba(211, 154, 105, 0.1);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .value-card,
  .about-cta {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
