<script setup lang="ts">
interface Props {
  name: string;
  tagline: string;
  description: string;
  idealFor: string;
  features: string[];
  popularLabel?: string;
  variant?: "default" | "featured";
}

const props = withDefaults(defineProps<Props>(), {
  popularLabel: undefined,
  variant: "default",
});
</script>

<template>
  <GlassCard
    :tint-color="variant === 'featured' ? 'brand' : 'dark'"
    hover-effect="lift"
    :gradient-border="variant === 'featured'"
    :elevated="variant === 'featured'"
    class="package-card"
    :class="{ 'package-card--featured': variant === 'featured' }"
  >
    <!-- Popular Badge -->
    <div v-if="popularLabel" class="popular-badge">
      <UIcon name="i-heroicons-star-solid" class="badge-icon" />
      <span>{{ popularLabel }}</span>
    </div>

    <!-- Package Header -->
    <div class="package-header">
      <h3 class="package-name">{{ name }}</h3>
      <p class="package-tagline">{{ tagline }}</p>
    </div>

    <!-- Description -->
    <p class="package-description">{{ description }}</p>

    <!-- Ideal For -->
    <div class="package-ideal">
      <span class="ideal-label">Ideal for:</span>
      <span class="ideal-text">{{ idealFor }}</span>
    </div>

    <!-- Features List -->
    <ul class="package-features">
      <li
        v-for="(feature, index) in features"
        :key="index"
        class="feature-item"
      >
        <UIcon name="i-heroicons-check-circle-solid" class="feature-icon" />
        <span>{{ feature }}</span>
      </li>
    </ul>

    <!-- CTA -->
    <div class="package-cta">
      <slot name="cta" />
    </div>
  </GlassCard>
</template>

<style lang="scss" scoped>
.package-card {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  &--featured {
    .package-name {
      color: var(--color-accent-400);
    }

    .feature-icon {
      color: var(--color-accent-400);
    }
  }
}

.popular-badge {
  position: absolute;
  top: -12px;
  right: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  background: linear-gradient(
    135deg,
    var(--color-accent-500) 0%,
    var(--color-accent-600) 100%
  );
  color: white;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(42, 147, 134, 0.3);
}

.badge-icon {
  width: 14px;
  height: 14px;
}

.package-header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.package-name {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.package-tagline {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 500;
}

.package-description {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-muted);
  margin-bottom: 1.25rem;
}

.package-ideal {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.875rem;
  background: var(--color-surface-2);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.ideal-label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ideal-text {
  font-size: var(--text-sm);
  color: var(--color-text);
}

.package-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  flex: 1;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.5rem 0;
  font-size: var(--text-sm);
  color: var(--color-text);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }
}

.feature-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--color-primary-500);
  margin-top: 1px;
}

.package-cta {
  margin-top: auto;
  padding-top: 1rem;
}

// Dark mode
:root.dark {
  .package-ideal {
    background: var(--color-surface-3);
  }

  .feature-icon {
    color: var(--color-primary-300);
  }

  .package-card--featured .feature-icon {
    color: var(--color-accent-300);
  }
}
</style>
