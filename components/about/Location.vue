<script setup lang="ts">
import { computed } from "vue";
import { animationPresets, withDelay } from "~/composables/useAccessibleMotion";

const { t, tm } = useI18n();

const quickFacts = computed(() =>
  tm("about.quickFacts.items") as Array<{ icon: string; label: string; value: string }>
);
</script>

<template>
  <section
    class="about-location"
    aria-labelledby="location-heading"
  >
    <div class="section-container">
      <div class="location-grid">
        <!-- Left: Location details -->
        <div
          class="location-col"
          v-motion
          :initial="animationPresets.slideInLeft.initial"
          :visible-once="animationPresets.slideInLeft.visible"
        >
          <span class="section-badge">{{ t("about.location.badge") }}</span>
          <h2 id="location-heading" class="section-title" style="text-wrap: balance">
            {{ t("about.location.title") }}
          </h2>
          <p class="location-description">
            {{ t("about.location.description") }}
          </p>

          <dl class="location-details">
            <div class="detail-row">
              <dt class="detail-label">
                <UIcon name="i-heroicons-map-pin" class="detail-icon" aria-hidden="true" />
                Headquarters
              </dt>
              <dd class="detail-value">{{ t("about.location.details.headquarters") }}</dd>
            </div>
            <div class="detail-row">
              <dt class="detail-label">
                <UIcon name="i-heroicons-globe-alt" class="detail-icon" aria-hidden="true" />
                Coverage
              </dt>
              <dd class="detail-value">{{ t("about.location.details.coverage") }}</dd>
            </div>
            <div class="detail-row">
              <dt class="detail-label">
                <UIcon name="i-heroicons-language" class="detail-icon" aria-hidden="true" />
                Languages
              </dt>
              <dd class="detail-value">{{ t("about.location.details.languages") }}</dd>
            </div>
          </dl>

          <NuxtLink to="/services/process" class="process-link">
            {{ t("about.location.processLink") }}
            <UIcon name="i-heroicons-arrow-right" class="link-icon" aria-hidden="true" />
          </NuxtLink>
        </div>

        <!-- Right: Quick Facts -->
        <div
          class="facts-col"
          v-motion
          :initial="animationPresets.slideInRight.initial"
          :visible-once="withDelay('slideInRight', 200).visible"
        >
          <h3 class="facts-title">{{ t("about.quickFacts.title") }}</h3>
          <div class="facts-grid">
            <div
              v-for="(fact, index) in quickFacts"
              :key="index"
              class="fact-card hover-lift"
              v-motion
              :initial="animationPresets.scaleIn.initial"
              :visible-once="withDelay('scaleIn', 400 + index * 100).visible"
            >
              <div class="fact-icon-wrap">
                <UIcon :name="fact.icon" class="fact-icon" aria-hidden="true" />
              </div>
              <span class="fact-label">{{ fact.label }}</span>
              <span class="fact-value">{{ fact.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-location {
  padding: 6rem 1.5rem;
  background: var(--color-section-dark);

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
}

.section-container {
  max-width: 1100px;
  margin: 0 auto;
}

.location-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    align-items: start;
  }
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--color-primary-900);
  color: var(--color-primary-300);
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
  line-height: 1.15;
  margin-bottom: 1.25rem;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.location-description {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

.location-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  min-width: 140px;
}

.detail-icon {
  width: 1.125rem;
  height: 1.125rem;
  color: var(--color-accent-500);
  flex-shrink: 0;
}

.detail-value {
  font-size: var(--text-sm);
  color: var(--color-text);
}

.process-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-accent-500);
  text-decoration: none;
  min-height: 48px;
  padding: 0.5rem 0;
  transition: color 0.2s var(--ease-smooth);

  &:hover {
    color: var(--color-accent-400);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent-400);
    outline-offset: 4px;
    border-radius: var(--radius-sm);
  }
}

.link-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s var(--ease-smooth);

  .process-link:hover & {
    transform: translateX(3px);
  }
}

// Right column - Quick Facts
.facts-col {
  @media (min-width: 768px) {
    padding-top: 0.5rem;
  }
}

.facts-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1.25rem;
}

.facts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.fact-card {
  padding: 1.5rem;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-align: center;
}

.fact-icon-wrap {
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 auto 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-100);
  border-radius: var(--radius-lg);
}

.fact-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary-600);
}

.fact-label {
  display: block;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.fact-value {
  display: block;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
}

// Light mode
:root:not(.dark) {
  .about-location {
    background: var(--color-section-light);
  }

  .section-badge {
    background: var(--color-primary-100);
    color: var(--color-primary-700);
  }
}

// Dark mode
:root.dark {
  .fact-icon {
    color: var(--color-primary-300);
  }

  .fact-icon-wrap {
    background: var(--color-primary-800);
  }
}
</style>
