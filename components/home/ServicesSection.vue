<script setup lang="ts">
import { animationPresets, withDelay, staggeredFadeInUp } from "~/composables/useAccessibleMotion";

const { t } = useI18n();

// Package data
const packages = [
  { key: "launch" as const, featured: false },
  { key: "growth" as const, featured: true },
  { key: "platform" as const, featured: false },
];

// Additional services
const additionalServices = [
  {
    key: "identity",
    icon: "i-heroicons-paint-brush",
  },
  {
    key: "cms",
    icon: "i-heroicons-squares-2x2",
  },
  {
    key: "support",
    icon: "i-heroicons-lifebuoy",
  },
];

// v-motion presets
const headerMotion = animationPresets.fadeInUp;
const additionalMotion = withDelay("fadeInUp", 400);
const ctaMotion = withDelay("fadeInUp", 600);
</script>

<template>
  <section
    id="services-section"
    class="services-section"
    aria-labelledby="services-heading"
  >
    <!-- Background Pattern -->
    <div class="section-background" aria-hidden="true">
      <div class="bg-pattern" />
    </div>

    <div class="services-container">
      <!-- Section Header -->
      <div
        class="section-header"
        v-motion
        :initial="headerMotion.initial"
        :visible-once="headerMotion.visible"
      >
        <h2 id="services-heading" class="section-title">
          {{ t("landing.services.title") }}
        </h2>
        <p class="section-subtitle">
          {{ t("landing.services.subtitle") }}
        </p>
      </div>

      <!-- Package Cards Grid -->
      <div class="packages-grid">
        <ServicesPackageCard
          v-for="(pkg, index) in packages"
          :key="pkg.key"
          v-motion
          :initial="staggeredFadeInUp(index).initial"
          :visible-once="staggeredFadeInUp(index).visible"
          :package-key="pkg.key"
          :featured="pkg.featured"
          class="package-item"
        />
      </div>

      <!-- Additional Services -->
      <div
        class="additional-services"
        v-motion
        :initial="additionalMotion.initial"
        :visible-once="additionalMotion.visible"
      >
        <h3 class="additional-title">
          {{ t("landing.services.additionalServices.title") }}
        </h3>

        <div class="services-grid">
          <GlassCard
            v-for="(service, index) in additionalServices"
            :key="service.key"
            v-motion
            :initial="staggeredFadeInUp(index, 500).initial"
            :visible-once="staggeredFadeInUp(index, 500).visible"
            variant="solid"
            hover-effect="lift"
            class="service-card"
          >
            <div class="service-icon-wrapper">
              <UIcon :name="service.icon" class="service-icon" />
            </div>
            <h4 class="service-title">
              {{
                t(`landing.services.additionalServices.${service.key}.title`)
              }}
            </h4>
            <p class="service-description">
              {{
                t(
                  `landing.services.additionalServices.${service.key}.description`,
                )
              }}
            </p>
          </GlassCard>
        </div>
      </div>

      <!-- Section CTA -->
      <div
        class="section-cta"
        v-motion
        :initial="ctaMotion.initial"
        :visible-once="ctaMotion.visible"
      >
        <NuxtLink to="/services" class="cta-primary">
          {{ t("landing.services.cta.viewAll") }}
          <UIcon name="i-heroicons-arrow-right-20-solid" class="cta-icon" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.services-section {
  position: relative;
  padding: 6rem 1.5rem;
  background: var(--color-primary-800);
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 10rem 2rem;
  }
}

.section-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-pattern {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse at 20% 0%,
      rgba(223, 175, 133, 0.06) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 100%,
      rgba(211, 154, 105, 0.04) 0%,
      transparent 50%
    );
}

.services-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1;
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
}

.section-title {
  font-size: var(--text-3xl);
  color: var(--color-hero-text);
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.section-subtitle {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-hero-text-muted);

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

.packages-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

}

.additional-services {
  margin-bottom: 3rem;
}

.additional-title {
  font-size: var(--text-xl);
  color: var(--color-hero-text);
  text-align: center;
  margin-bottom: 2rem;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.service-card {
  text-align: center;
}

.service-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-primary-100);
  border-radius: 12px;
  margin-bottom: 1rem;
}

.service-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary-600);
}

.service-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.service-description {
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-text-muted);
}

.section-cta {
  text-align: center;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--color-primary-200);
  color: var(--color-primary-900);
  font-weight: 600;
  font-size: var(--text-base);
  text-decoration: none;
  border-radius: 12px;
  transition: all var(--duration-normal) var(--ease-smooth);

  &:hover {
    background: var(--color-primary-100);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(223, 175, 133, 0.3);

    .cta-icon {
      transform: translateX(4px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-100);
    outline-offset: 4px;
  }
}

.cta-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform var(--duration-fast) var(--ease-smooth);
}

// prefers-reduced-motion handled by v-motion / useAccessibleMotion
</style>
