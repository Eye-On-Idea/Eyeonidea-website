<script setup lang="ts">
import { ref } from "vue";
import {
  animationPresets,
  withDelay,
  staggeredFadeInUp,
} from "~/composables/useAccessibleMotion";
import { useStrokeDraw } from "~/composables/useStrokeDraw";

const { t } = useI18n();

const gridRef = ref<HTMLElement | null>(null);

useStrokeDraw(gridRef, {
  delay: 200,
  stagger: 120,
  duration: 600,
  selector: ".value-icon-wrapper",
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

// v-motion presets
const headerMotion = animationPresets.fadeInUp;
const ctaMotion = withDelay("fadeInUp", 400);
</script>

<template>
  <section
    id="about-section"
    class="about-section"
    aria-labelledby="about-heading"
  >
    <div class="about-container">
      <!-- Section Header -->
      <div
        class="section-header"
        v-motion
        :initial="headerMotion.initial"
        :visible-once="headerMotion.visible"
      >
        <h2 id="about-heading" class="section-title">
          {{ t("landing.about.title") }}
        </h2>
        <p class="section-description">
          {{ t("landing.about.description") }}
        </p>
      </div>

      <!-- Value Cards -->
      <div ref="gridRef" class="values-grid">
        <GlassCard
          v-for="(value, index) in values"
          :key="value.key"
          v-motion
          :initial="staggeredFadeInUp(index).initial"
          :visible-once="staggeredFadeInUp(index).visible"
          variant="solid"
          hover-effect="lift"
          :gradient-border="false"
          class="value-card"
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
      <div
        class="about-cta"
        v-motion
        :initial="ctaMotion.initial"
        :visible-once="ctaMotion.visible"
      >
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
}

.value-card {
  background: var(--color-surface-1);
}

.value-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--color-primary-100);
  border-radius: 12px;
  margin-bottom: 1.25rem;
}

.value-icon {
  width: 28px;
  height: 28px;
  color: var(--color-primary-600);
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
    background: var(--color-primary-800);
  }

  .value-icon {
    color: var(--color-primary-300);
  }

  .cta-link {
    color: var(--color-primary-300);

    &:hover {
      color: var(--color-primary-200);
      background: rgba(211, 154, 105, 0.1);
    }
  }
}

// prefers-reduced-motion handled by v-motion / useAccessibleMotion
</style>
