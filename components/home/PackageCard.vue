<script setup lang="ts">
interface Price {
  amount: string;
  currency: string;
  prefix: string;
  vatNote: string;
}

interface Props {
  name: string;
  tagline: string;
  description: string;
  idealFor: string;
  features: string[];
  price: Price;
  popularLabel?: string;
  variant?: "default" | "featured";
}

const props = withDefaults(defineProps<Props>(), {
  popularLabel: undefined,
  variant: "default",
});
</script>

<template>
  <article
    class="package-card"
    :class="{ 'package-card--featured': variant === 'featured' }"
  >
    <!-- Popular Badge -->
    <div v-if="popularLabel" class="popular-badge">
      <UIcon name="i-heroicons-sparkles-solid" class="badge-icon" />
      <span>{{ popularLabel }}</span>
    </div>

    <!-- Header -->
    <header class="package-header">
      <h3 class="package-name">{{ name }}</h3>
      <p class="package-tagline">{{ tagline }}</p>
    </header>

    <!-- Description -->
    <p class="package-description">{{ description }}</p>

    <!-- Ideal For -->
    <div class="package-ideal">
      <UIcon name="i-heroicons-user-group" class="ideal-icon" />
      <span class="ideal-text">{{ idealFor }}</span>
    </div>

    <!-- Features List -->
    <ul class="feature-list" role="list">
      <li
        v-for="(feature, index) in features"
        :key="index"
        class="feature-item"
      >
        <span class="feature-check">
          <UIcon name="i-heroicons-check" class="check-icon" />
        </span>
        <span class="feature-text">{{ feature }}</span>
      </li>
    </ul>

    <!-- Pricing Section -->
    <div class="package-pricing">
      <div class="price-container">
        <span class="price-prefix">{{ price.prefix }}</span>
        <div class="price-main">
          <span class="price-currency">{{ price.currency }}</span>
          <span class="price-amount">{{ price.amount }}</span>
        </div>
        <span class="price-vat">{{ price.vatNote }}</span>
      </div>
    </div>

    <!-- CTA -->
    <div class="package-cta">
      <slot name="cta" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.package-card {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  box-shadow: var(--card-shadow);
  transition: all var(--duration-normal) var(--ease-smooth);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }

  &--featured {
    border: 2px solid var(--color-accent-500);
    background: linear-gradient(
      180deg,
      var(--card-bg) 0%,
      color-mix(in srgb, var(--color-accent-50) 30%, var(--card-bg)) 100%
    );

    .package-name {
      color: var(--color-accent-600);
    }

    .feature-check {
      background: var(--color-accent-500);
    }

    .price-amount {
      color: var(--color-accent-600);
    }
  }
}

.popular-badge {
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

.package-header {
  text-align: center;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

.package-name {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-primary-600);
  margin-bottom: 0.375rem;
}

.package-tagline {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 500;
}

.package-description {
  font-size: var(--text-sm);
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: 1.25rem;
  text-align: center;
}

.package-ideal {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-surface-2);
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.ideal-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--icon-accent);
  margin-top: 2px;
}

.ideal-text {
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-text);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.feature-check {
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
  stroke-width: 3;
}

.feature-text {
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-text);
}

.package-pricing {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.price-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.price-prefix {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 500;
}

.price-main {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  line-height: 1;
}

.price-currency {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text);
  margin-top: 0.375rem;
}

.price-amount {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: var(--color-primary-600);
  letter-spacing: -0.02em;
}

.price-vat {
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
  font-weight: 500;
}

.package-cta {
  margin-top: 1.5rem;
}

// Dark mode
:root.dark {
  .package-card {
    background: var(--card-bg);
    border-color: var(--card-border);

    &:hover {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    }

    &--featured {
      border-color: var(--color-accent-400);
      background: linear-gradient(
        180deg,
        var(--card-bg) 0%,
        color-mix(in srgb, var(--color-accent-900) 40%, var(--card-bg)) 100%
      );

      .package-name {
        color: var(--color-accent-400);
      }

      .feature-check {
        background: var(--color-accent-400);
      }

      .price-amount {
        color: var(--color-accent-400);
      }
    }
  }

  .package-name {
    color: var(--color-primary-300);
  }

  .package-ideal {
    background: var(--color-surface-3);
  }

  .feature-check {
    background: var(--color-primary-400);
  }

  .price-amount {
    color: var(--color-primary-300);
  }
}

@media (prefers-reduced-motion: reduce) {
  .package-card {
    transition: none;
  }

  .package-card:hover {
    transform: none;
  }
}
</style>
