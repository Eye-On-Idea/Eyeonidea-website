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

const plans = [
  { key: "essential" as const, featured: false },
  { key: "growth" as const, featured: true },
  { key: "partner" as const, featured: false },
];
</script>

<template>
  <section
    id="support-plans"
    ref="sectionRef"
    class="support-plans"
    aria-labelledby="support-heading"
  >
    <div class="section-container">
      <!-- Header -->
      <div
        class="section-header"
        :class="{ 'animate-in': isVisible }"
      >
        <span class="section-badge">{{ t("services.support.badge") }}</span>
        <h2 id="support-heading" class="section-title">
          {{ t("services.support.title") }}
        </h2>
        <p class="section-subtitle">
          {{ t("services.support.subtitle") }}
        </p>
      </div>

      <!-- Plans Grid -->
      <div class="plans-grid" :class="{ 'animate-in': isVisible }">
        <div
          v-for="(plan, index) in plans"
          :key="plan.key"
          class="plan-card"
          :class="[
            `stagger-${index + 1}`,
            { featured: plan.featured }
          ]"
        >
          <div v-if="plan.featured" class="featured-badge">
            {{ t("services.packages.growth.popular") }}
          </div>

          <div class="plan-header">
            <h3 class="plan-name">
              {{ t(`services.support.plans.${plan.key}.name`) }}
            </h3>
            <p class="plan-description">
              {{ t(`services.support.plans.${plan.key}.description`) }}
            </p>
          </div>

          <div class="plan-best-for">
            <span class="best-for-label">Best for:</span>
            <span class="best-for-value">{{ t(`services.support.plans.${plan.key}.bestFor`) }}</span>
          </div>

          <ul class="plan-includes">
            <li
              v-for="(item, itemIndex) in (tm(`services.support.plans.${plan.key}.includes`) as string[])"
              :key="itemIndex"
              class="include-item"
            >
              <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>{{ item }}</span>
            </li>
          </ul>

          <NuxtLink
            to="/contact"
            class="plan-cta"
            :class="{ 'cta-featured': plan.featured }"
          >
            {{ t("services.support.cta") }}
          </NuxtLink>
        </div>
      </div>

      <!-- Billing Note -->
      <p
        class="billing-note"
        :class="{ 'animate-in': isVisible }"
      >
        {{ t("services.support.billing") }}
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.support-plans {
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
  font-style: italic;

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

.plans-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  &.animate-in .plan-card {
    opacity: 1;
    transform: translateY(0);
  }
}

.plan-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth), box-shadow 0.3s var(--ease-smooth);

  &.stagger-1 { transition-delay: 100ms; }
  &.stagger-2 { transition-delay: 200ms; }
  &.stagger-3 { transition-delay: 300ms; }

  &:hover {
    box-shadow: var(--shadow-lg);
  }

  &.featured {
    border-color: var(--color-primary-400);
    background: linear-gradient(
      135deg,
      var(--color-bg-card) 0%,
      var(--color-primary-50) 100%
    );

    @media (min-width: 1024px) {
      transform: translateY(40px) scale(1.02);

      &.animate-in {
        transform: translateY(0) scale(1.02);
      }
    }
  }
}

.featured-badge {
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.25rem 1rem;
  background: var(--color-primary-500);
  color: white;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;
  white-space: nowrap;
}

.plan-header {
  margin-bottom: 1.5rem;
}

.plan-name {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.plan-description {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-muted);
}

.plan-best-for {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  background: var(--color-bg-subtle);
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
}

.best-for-label {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-subtle);
}

.best-for-value {
  font-size: var(--text-sm);
  color: var(--color-text);
}

.plan-includes {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.include-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.4;
}

.check-icon {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  color: var(--color-primary-500);
  margin-top: 0.0625rem;
}

.plan-cta {
  display: block;
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: transparent;
  border: 2px solid var(--color-primary-400);
  border-radius: var(--radius-md);
  color: var(--color-primary-600);
  font-size: var(--text-sm);
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s var(--ease-smooth), color 0.2s var(--ease-smooth);

  &:hover {
    background: var(--color-primary-50);
  }

  &.cta-featured {
    background: var(--color-primary-500);
    border-color: var(--color-primary-500);
    color: white;

    &:hover {
      background: var(--color-primary-600);
      border-color: var(--color-primary-600);
    }
  }
}

.billing-note {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-smooth) 0.4s, transform 0.6s var(--ease-smooth) 0.4s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

// Dark mode
:root.dark {
  .support-plans {
    background: var(--color-section-dark);
  }

  .section-badge {
    background: var(--color-primary-900);
    color: var(--color-primary-300);
  }

  .plan-card {
    background: var(--color-bg-card);
    border-color: var(--color-border);

    &.featured {
      background: linear-gradient(
        135deg,
        var(--color-bg-card) 0%,
        var(--color-primary-900) 100%
      );
      border-color: var(--color-primary-600);
    }
  }

  .plan-best-for {
    background: var(--color-bg-elevated);
  }

  .plan-cta {
    border-color: var(--color-primary-500);
    color: var(--color-primary-400);

    &:hover {
      background: var(--color-primary-900);
    }

    &.cta-featured {
      background: var(--color-primary-600);
      border-color: var(--color-primary-600);

      &:hover {
        background: var(--color-primary-500);
        border-color: var(--color-primary-500);
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .plan-card,
  .billing-note {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .plan-card.featured {
    transform: scale(1.02);
  }
}
</style>
