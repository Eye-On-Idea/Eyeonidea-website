<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

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
    { threshold: 0.15 },
  );

  observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});

// Package data
const packages = [
  {
    key: "launch",
    variant: "default" as const,
    popular: false,
  },
  {
    key: "growth",
    variant: "featured" as const,
    popular: true,
  },
  {
    key: "platform",
    variant: "default" as const,
    popular: false,
  },
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
</script>

<template>
  <section
    id="services-section"
    ref="sectionRef"
    class="services-section"
    aria-labelledby="services-heading"
  >
    <!-- Background Pattern -->
    <div class="section-background" aria-hidden="true">
      <div class="bg-pattern" />
    </div>

    <div class="services-container">
      <!-- Section Header -->
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 id="services-heading" class="section-title">
          {{ t("landing.services.title") }}
        </h2>
        <p class="section-subtitle">
          {{ t("landing.services.subtitle") }}
        </p>
      </div>

      <!-- Package Cards Grid - Uses centralized services.packages locale -->
      <div class="packages-grid" :class="{ 'animate-in': isVisible }">
        <HomePackageCard
          v-for="(pkg, index) in packages"
          :key="pkg.key"
          :name="t(`services.packages.${pkg.key}.name`)"
          :tagline="t(`services.packages.${pkg.key}.tagline`)"
          :description="t(`services.packages.${pkg.key}.description`)"
          :ideal-for="t(`services.packages.${pkg.key}.idealFor`)"
          :features="tm(`services.packages.${pkg.key}.includes`) as string[]"
          :price="{
            amount: t(`services.packages.${pkg.key}.price.amount`),
            currency: t(`services.packages.${pkg.key}.price.currency`),
            prefix: t(`services.packages.${pkg.key}.price.prefix`),
            vatNote: t(`services.packages.${pkg.key}.price.vatNote`),
          }"
          :variant="pkg.variant"
          :popular-label="
            pkg.popular ? t(`services.packages.${pkg.key}.popular`) : undefined
          "
          class="package-item"
          :class="`stagger-${index + 1}`"
        >
          <template #cta>
            <NuxtLink
              to="/contact"
              class="cta-button"
              :class="
                pkg.variant === 'featured'
                  ? 'cta-button--featured'
                  : 'cta-button--default'
              "
            >
              <span>{{ t("services.packages.cta") }}</span>
              <UIcon name="i-heroicons-arrow-right" class="cta-arrow" />
            </NuxtLink>
          </template>
        </HomePackageCard>
      </div>

      <!-- Additional Services -->
      <div class="additional-services" :class="{ 'animate-in': isVisible }">
        <h3 class="additional-title">
          {{ t("landing.services.additionalServices.title") }}
        </h3>

        <div class="services-grid">
          <GlassCard
            v-for="(service, index) in additionalServices"
            :key="service.key"
            tint-color="light"
            hover-effect="lift"
            class="service-card"
            :class="`stagger-${index + 4}`"
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
      <div class="section-cta" :class="{ 'animate-in': isVisible }">
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
      rgba(223, 175, 133, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 100%,
      rgba(42, 147, 134, 0.06) 0%,
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

  &.animate-in .package-item {
    opacity: 1;
    transform: translateY(0);
  }
}

.package-item {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.stagger-1 {
    transition-delay: 100ms;
  }
  &.stagger-2 {
    transition-delay: 200ms;
  }
  &.stagger-3 {
    transition-delay: 300ms;
  }
}

// Button styles for package cards
:deep(.cta-button) {
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

  .cta-arrow {
    width: 18px;
    height: 18px;
    transition: transform var(--duration-fast) var(--ease-smooth);
  }

  &:hover .cta-arrow {
    transform: translateX(4px);
  }
}

:deep(.cta-button--default) {
  background: transparent;
  color: var(--color-primary-200);
  border: 2px solid var(--color-primary-400);

  &:hover {
    background: rgba(255, 237, 223, 0.1);
    border-color: var(--color-primary-300);
    color: var(--color-primary-100);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-300);
    outline-offset: 4px;
  }
}

:deep(.cta-button--featured) {
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

  &:focus-visible {
    outline: 2px solid var(--color-accent-400);
    outline-offset: 4px;
  }
}

.additional-services {
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.4s,
    transform 0.6s var(--ease-smooth) 0.4s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
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
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s var(--ease-smooth),
    transform 0.5s var(--ease-smooth);

  .animate-in & {
    opacity: 1;
    transform: translateY(0);
  }

  &.stagger-4 {
    transition-delay: 500ms;
  }
  &.stagger-5 {
    transition-delay: 600ms;
  }
  &.stagger-6 {
    transition-delay: 700ms;
  }
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
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.6s,
    transform 0.6s var(--ease-smooth) 0.6s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
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

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .package-item,
  .additional-services,
  .service-card,
  .section-cta {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
