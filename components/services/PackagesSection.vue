<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t } = useI18n();

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

const packages = [
  { key: "launch" as const, featured: false },
  { key: "growth" as const, featured: true },
  { key: "platform" as const, featured: false },
];
</script>

<template>
  <section
    id="packages-section"
    ref="sectionRef"
    class="packages-section"
    aria-labelledby="packages-heading"
  >
    <div class="section-container">
      <!-- Header -->
      <div
        class="section-header"
        :class="{ 'animate-in': isVisible }"
      >
        <span class="section-badge">{{ t("services.packages.badge") }}</span>
        <h2 id="packages-heading" class="section-title">
          {{ t("services.packages.title") }}
        </h2>
        <p class="section-subtitle">
          {{ t("services.packages.subtitle") }}
        </p>
      </div>

      <!-- Package Cards -->
      <div class="packages-grid" :class="{ 'animate-in': isVisible }">
        <ServicesPackageCard
          v-for="(pkg, index) in packages"
          :key="pkg.key"
          :package-key="pkg.key"
          :featured="pkg.featured"
          class="package-item"
          :class="`stagger-${index + 1}`"
        />
      </div>

      <!-- Pricing Note -->
      <p
        class="pricing-note"
        :class="{ 'animate-in': isVisible }"
      >
        {{ t("services.packages.pricingNote") }}
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.packages-section {
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

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

.packages-grid {
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

  &.animate-in .package-item {
    opacity: 1;
    transform: translateY(0);
  }
}

.package-item {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth);

  &.stagger-1 { transition-delay: 100ms; }
  &.stagger-2 { transition-delay: 200ms; }
  &.stagger-3 { transition-delay: 300ms; }
}

.pricing-note {
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
  .packages-section {
    background: var(--color-section-dark);
  }

  .section-badge {
    background: var(--color-primary-900);
    color: var(--color-primary-300);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .package-item,
  .pricing-note {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
