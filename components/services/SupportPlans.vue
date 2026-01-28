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
      <div class="section-header" :class="{ 'animate-in': isVisible }">
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
        <article
          v-for="(plan, index) in plans"
          :key="plan.key"
          class="plan-card"
          :class="[`stagger-${index + 1}`, { 'plan-card--featured': plan.featured }]"
        >
          <div v-if="plan.featured" class="featured-badge">
            <UIcon name="i-heroicons-sparkles-solid" class="badge-icon" />
            <span>{{ t("services.packages.growth.popular") }}</span>
          </div>

          <header class="plan-header">
            <h3 class="plan-name">
              {{ t(`services.support.plans.${plan.key}.name`) }}
            </h3>
            <p class="plan-description">
              {{ t(`services.support.plans.${plan.key}.description`) }}
            </p>
          </header>

          <!-- Pricing -->
          <div class="plan-pricing">
            <div class="price-main">
              <span class="price-currency">{{
                t(`services.support.plans.${plan.key}.price.currency`)
              }}</span>
              <span class="price-amount">{{
                t(`services.support.plans.${plan.key}.price.amount`)
              }}</span>
              <span class="price-unit">{{
                t(`services.support.plans.${plan.key}.price.unit`)
              }}</span>
            </div>
            <span class="price-vat">{{
              t(`services.support.plans.${plan.key}.price.vatNote`)
            }}</span>
          </div>

          <div class="plan-best-for">
            <UIcon name="i-heroicons-user-group" class="best-for-icon" />
            <span class="best-for-value">{{
              t(`services.support.plans.${plan.key}.bestFor`)
            }}</span>
          </div>

          <ul class="plan-includes" role="list">
            <li
              v-for="(item, itemIndex) in (tm(`services.support.plans.${plan.key}.includes`) as string[])"
              :key="itemIndex"
              class="include-item"
            >
              <span class="check-wrapper">
                <UIcon name="i-heroicons-check" class="check-icon" />
              </span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <div class="plan-cta-wrapper">
            <NuxtLink
              to="/contact"
              class="plan-cta"
              :class="plan.featured ? 'plan-cta--featured' : 'plan-cta--default'"
            >
              <span>{{ t("services.support.cta") }}</span>
              <UIcon name="i-heroicons-arrow-right" class="cta-icon" />
            </NuxtLink>
          </div>
        </article>
      </div>

      <!-- Billing Note -->
      <p class="billing-note" :class="{ 'animate-in': isVisible }">
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
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--badge-primary-bg);
  color: var(--badge-primary-text);
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
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth),
    box-shadow 0.3s var(--ease-smooth);

  &.stagger-1 {
    transition-delay: 100ms;
  }
  &.stagger-2 {
    transition-delay: 200ms;
  }
  &.stagger-3 {
    transition-delay: 300ms;
  }

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  }

  &--featured {
    border: 2px solid var(--color-accent-500);
    background: linear-gradient(
      180deg,
      var(--card-bg) 0%,
      color-mix(in srgb, var(--color-accent-50) 30%, var(--card-bg)) 100%
    );

    .plan-name {
      color: var(--color-accent-600);
    }

    .check-wrapper {
      background: var(--color-accent-500);
    }

    .price-amount {
      color: var(--color-accent-600);
    }
  }
}

.featured-badge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(
    135deg,
    var(--color-accent-500) 0%,
    var(--color-accent-600) 100%
  );
  color: white;
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-radius: 9999px;
  box-shadow: 0 4px 16px rgba(42, 147, 134, 0.35);
  white-space: nowrap;
}

.badge-icon {
  width: 14px;
  height: 14px;
}

.plan-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.plan-name {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-primary-600);
  margin-bottom: 0.5rem;
}

.plan-description {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-muted);
}

.plan-pricing {
  text-align: center;
  margin-bottom: 1.5rem;
}

.price-main {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.125rem;
  line-height: 1;
}

.price-currency {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text);
  align-self: flex-start;
  margin-top: 0.5rem;
}

.price-amount {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--color-primary-600);
  letter-spacing: -0.02em;
}

.price-unit {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-muted);
}

.price-vat {
  display: block;
  margin-top: 0.25rem;
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
}

.plan-best-for {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-surface-2);
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.best-for-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--icon-accent);
  margin-top: 2px;
}

.best-for-value {
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-text);
}

.plan-includes {
  list-style: none;
  padding: 0;
  margin: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.include-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: var(--text-sm);
  color: var(--color-text);
  line-height: 1.5;
}

.check-wrapper {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-500);
  border-radius: 50%;
  margin-top: 1px;
}

.check-icon {
  width: 14px;
  height: 14px;
  color: white;
}

.plan-cta-wrapper {
  margin-top: 2rem;
}

.plan-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 1.5rem;
  font-weight: 600;
  font-size: var(--text-sm);
  text-decoration: none;
  border-radius: 12px;
  transition: all var(--duration-normal) var(--ease-smooth);

  &--default {
    background: transparent;
    color: var(--color-primary-600);
    border: 2px solid var(--color-primary-400);

    &:hover {
      background: var(--color-primary-50);
      border-color: var(--color-primary-500);
      transform: translateY(-2px);
    }
  }

  &--featured {
    background: linear-gradient(
      135deg,
      var(--color-accent-500) 0%,
      var(--color-accent-600) 100%
    );
    color: white;
    border: 2px solid transparent;
    box-shadow: 0 4px 16px rgba(42, 147, 134, 0.25);

    &:hover {
      background: linear-gradient(
        135deg,
        var(--color-accent-600) 0%,
        var(--color-accent-700) 100%
      );
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(42, 147, 134, 0.35);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 4px;
  }
}

.cta-icon {
  width: 18px;
  height: 18px;
  transition: transform var(--duration-fast) var(--ease-smooth);

  .plan-cta:hover & {
    transform: translateX(4px);
  }
}

.billing-note {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.4s,
    transform 0.6s var(--ease-smooth) 0.4s;

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
    background: var(--card-bg);
    border-color: var(--card-border);

    &:hover {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    }

    &--featured {
      border-color: var(--color-accent-400);
      background: linear-gradient(
        180deg,
        var(--card-bg) 0%,
        color-mix(in srgb, var(--color-accent-900) 40%, var(--card-bg)) 100%
      );

      .plan-name {
        color: var(--color-accent-400);
      }

      .check-wrapper {
        background: var(--color-accent-400);
      }

      .price-amount {
        color: var(--color-accent-400);
      }
    }
  }

  .plan-name {
    color: var(--color-primary-300);
  }

  .plan-best-for {
    background: var(--color-surface-3);
  }

  .check-wrapper {
    background: var(--color-primary-400);
  }

  .price-amount {
    color: var(--color-primary-300);
  }

  .plan-cta--default {
    color: var(--color-primary-300);
    border-color: var(--color-primary-500);

    &:hover {
      background: rgba(211, 154, 105, 0.1);
    }
  }

  .plan-cta--featured {
    background: linear-gradient(
      135deg,
      var(--color-accent-400) 0%,
      var(--color-accent-500) 100%
    );

    &:hover {
      background: linear-gradient(
        135deg,
        var(--color-accent-500) 0%,
        var(--color-accent-600) 100%
      );
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

  .plan-cta:hover,
  .plan-cta:hover .cta-icon {
    transform: none;
  }
}
</style>
