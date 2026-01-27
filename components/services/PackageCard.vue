<script setup lang="ts">
interface Props {
  packageKey: "launch" | "growth" | "platform";
  featured?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
});

const { t, tm } = useI18n();

const includes = computed(() =>
  tm(`services.packages.${props.packageKey}.includes`) as string[]
);

const excludes = computed(() =>
  tm(`services.packages.${props.packageKey}.excludes`) as string[]
);
</script>

<template>
  <GlassCard
    :tint-color="featured ? 'brand' : 'dark'"
    hover-effect="lift"
    :gradient-border="featured"
    :elevated="featured"
    class="package-card"
    :class="{ 'package-card--featured': featured }"
  >
    <!-- Popular Badge -->
    <div v-if="featured" class="popular-badge">
      <UIcon name="i-heroicons-star-solid" class="badge-icon" />
      <span>{{ t(`services.packages.${packageKey}.popular`) }}</span>
    </div>

    <!-- Header -->
    <div class="package-header">
      <h3 class="package-name">
        {{ t(`services.packages.${packageKey}.name`) }}
      </h3>
      <p class="package-tagline">
        {{ t(`services.packages.${packageKey}.tagline`) }}
      </p>
    </div>

    <!-- Description -->
    <p class="package-description">
      {{ t(`services.packages.${packageKey}.description`) }}
    </p>

    <!-- Ideal For -->
    <div class="package-ideal">
      <span class="ideal-label">Ideal for:</span>
      <span class="ideal-text">
        {{ t(`services.packages.${packageKey}.idealFor`) }}
      </span>
    </div>

    <!-- Includes -->
    <div class="package-section">
      <h4 class="section-label">What's included:</h4>
      <ul class="feature-list">
        <li
          v-for="(item, index) in includes"
          :key="index"
          class="feature-item feature-item--included"
        >
          <UIcon name="i-heroicons-check-circle-solid" class="feature-icon feature-icon--included" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>

    <!-- Excludes -->
    <div class="package-section">
      <h4 class="section-label">Not included:</h4>
      <ul class="feature-list">
        <li
          v-for="(item, index) in excludes"
          :key="index"
          class="feature-item feature-item--excluded"
        >
          <UIcon name="i-heroicons-minus-circle" class="feature-icon feature-icon--excluded" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>

    <!-- Pricing -->
    <div class="package-pricing">
      <p class="pricing-text">
        {{ t(`services.packages.${packageKey}.pricing`) }}
      </p>
    </div>

    <!-- CTA -->
    <div class="package-cta">
      <NuxtLink
        to="/contact"
        :class="featured ? 'btn-accent' : 'btn-outline'"
      >
        {{ t("services.packages.cta") }}
      </NuxtLink>
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

.package-section {
  margin-bottom: 1.25rem;
}

.section-label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.375rem 0;
  font-size: var(--text-sm);
  color: var(--color-text);
}

.feature-icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin-top: 2px;

  &--included {
    color: var(--color-accent-500);
  }

  &--excluded {
    color: var(--color-text-subtle);
    opacity: 0.6;
  }
}

.feature-item--excluded {
  color: var(--color-text-muted);
  opacity: 0.8;
}

.package-pricing {
  margin-top: auto;
  padding: 1rem 0;
  border-top: 1px solid var(--color-border);
}

.pricing-text {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-style: italic;
}

.package-cta {
  padding-top: 0.5rem;
}

.btn-accent {
  display: block;
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: var(--color-accent-500);
  color: white;
  font-weight: 600;
  font-size: var(--text-sm);
  text-align: center;
  text-decoration: none;
  border-radius: 10px;
  transition: all var(--duration-normal) var(--ease-smooth);

  &:hover {
    background: var(--color-accent-600);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(42, 147, 134, 0.3);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent-400);
    outline-offset: 4px;
  }
}

.btn-outline {
  display: block;
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: transparent;
  color: var(--color-primary-600);
  font-weight: 600;
  font-size: var(--text-sm);
  text-align: center;
  text-decoration: none;
  border: 1px solid var(--color-primary-400);
  border-radius: 10px;
  transition: all var(--duration-normal) var(--ease-smooth);

  &:hover {
    background: var(--color-primary-50);
    border-color: var(--color-primary-500);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 4px;
  }
}

// Dark mode
:root.dark {
  .package-ideal {
    background: var(--color-surface-3);
  }

  .feature-icon--included {
    color: var(--color-accent-400);
  }

  .btn-outline {
    color: var(--color-primary-300);
    border-color: var(--color-primary-500);

    &:hover {
      background: rgba(211, 154, 105, 0.1);
    }
  }
}
</style>
