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

const serviceCategories = [
  { key: "consulting" as const, icon: "clipboard-check" },
  { key: "domain" as const, icon: "globe" },
  { key: "email" as const, icon: "mail" },
  { key: "content" as const, icon: "document-text" },
  { key: "seo" as const, icon: "trending-up" },
  { key: "hosting" as const, icon: "server" },
];
</script>

<template>
  <section
    id="additional-services"
    ref="sectionRef"
    class="additional-services"
    aria-labelledby="additional-heading"
  >
    <div class="section-container">
      <!-- Header -->
      <div
        class="section-header"
        :class="{ 'animate-in': isVisible }"
      >
        <span class="section-badge">{{ t("services.secondary.badge") }}</span>
        <h2 id="additional-heading" class="section-title">
          {{ t("services.secondary.title") }}
        </h2>
      </div>

      <!-- Services Grid -->
      <div class="services-grid" :class="{ 'animate-in': isVisible }">
        <div
          v-for="(category, index) in serviceCategories"
          :key="category.key"
          class="service-card glass-subtle"
          :class="`stagger-${index + 1}`"
        >
          <div class="card-icon" :class="`icon-${category.icon}`">
            <!-- Consulting -->
            <svg v-if="category.icon === 'clipboard-check'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 14l2 2 4-4" />
            </svg>
            <!-- Globe -->
            <svg v-else-if="category.icon === 'globe'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
            <!-- Mail -->
            <svg v-else-if="category.icon === 'mail'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            <!-- Document -->
            <svg v-else-if="category.icon === 'document-text'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
            <!-- Trending Up -->
            <svg v-else-if="category.icon === 'trending-up'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            <!-- Server -->
            <svg v-else-if="category.icon === 'server'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
          </div>

          <h3 class="card-title">
            {{ t(`services.secondary.categories.${category.key}.title`) }}
          </h3>

          <!-- Email has special structure with plans -->
          <template v-if="category.key === 'email'">
            <p class="card-description">
              {{ t(`services.secondary.categories.${category.key}.description`) }}
            </p>
            <div class="email-plans">
              <div class="plan-item">
                <span class="plan-label">Starter</span>
                <span class="plan-price">{{ t("services.secondary.categories.email.plans.starter") }}</span>
              </div>
              <div class="plan-item">
                <span class="plan-label">Pro</span>
                <span class="plan-price">{{ t("services.secondary.categories.email.plans.pro") }}</span>
              </div>
            </div>
          </template>

          <!-- Standard items list -->
          <ul v-else class="card-items">
            <li
              v-for="(item, itemIndex) in (tm(`services.secondary.categories.${category.key}.items`) as string[])"
              :key="itemIndex"
              class="item"
            >
              <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.additional-services {
  padding: 6rem 1.5rem;
  background: var(--color-section-dark);

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
  max-width: 600px;
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
  background: var(--color-accent-900);
  color: var(--color-accent-300);
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
  margin-bottom: 0;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
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

  &.animate-in .service-card {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-card {
  padding: 2rem;
  border-radius: var(--radius-lg);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth);

  &.stagger-1 { transition-delay: 50ms; }
  &.stagger-2 { transition-delay: 100ms; }
  &.stagger-3 { transition-delay: 150ms; }
  &.stagger-4 { transition-delay: 200ms; }
  &.stagger-5 { transition-delay: 250ms; }
  &.stagger-6 { transition-delay: 300ms; }
}

.card-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1.25rem;
  color: var(--color-accent-500);

  svg {
    width: 100%;
    height: 100%;
  }
}

.card-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.card-description {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.card-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.4;
}

.check-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: var(--color-accent-500);
  margin-top: 0.125rem;
}

.email-plans {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.plan-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
}

.plan-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text);
}

.plan-price {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

// Light mode adjustments
:root:not(.dark) {
  .additional-services {
    background: var(--color-section-light);
  }

  .section-badge {
    background: var(--color-accent-100);
    color: var(--color-accent-700);
  }

  .plan-item {
    background: var(--color-bg-subtle);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .service-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
