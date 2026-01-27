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
</script>

<template>
  <section
    id="identity-section"
    ref="sectionRef"
    class="identity-section"
    aria-labelledby="identity-heading"
  >
    <div class="section-container">
      <div class="content-grid" :class="{ 'animate-in': isVisible }">
        <!-- Left: Main Content -->
        <div class="main-content">
          <span class="section-badge">{{ t("services.identity.badge") }}</span>
          <h2 id="identity-heading" class="section-title">
            {{ t("services.identity.title") }}
          </h2>
          <p class="section-description">
            {{ t("services.identity.description") }}
          </p>

          <!-- Core Includes -->
          <div class="includes-card glass-subtle">
            <h3 class="card-heading">Core Deliverables</h3>
            <ul class="includes-list">
              <li
                v-for="(item, index) in (tm('services.identity.includes') as string[])"
                :key="index"
                class="include-item"
              >
                <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <NuxtLink to="/contact" class="cta-button">
            {{ t("services.identity.cta") }}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="cta-icon">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Right: Add-ons -->
        <div class="addons-panel">
          <div class="addons-card">
            <h3 class="addons-heading">{{ t("services.identity.addons.title") }}</h3>
            <ul class="addons-list">
              <li
                v-for="(addon, index) in (tm('services.identity.addons.items') as string[])"
                :key="index"
                class="addon-item"
              >
                <svg class="plus-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                <span>{{ addon }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.identity-section {
  padding: 6rem 1.5rem;
  background: var(--color-hero-bg-gradient);
  position: relative;
  overflow: hidden;

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

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 0.8fr;
    gap: 4rem;
    align-items: start;
  }
}

.main-content {
  color: var(--color-hero-text);
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: var(--color-accent-300);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
  font-size: var(--text-3xl);
  color: var(--color-hero-text);
  margin-bottom: 1.25rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.section-description {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-hero-text-muted);
  margin-bottom: 2rem;
  max-width: 540px;

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

.includes-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  margin-bottom: 2rem;
}

.card-heading {
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-hero-text);
  margin-bottom: 1rem;
}

.includes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.include-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: var(--text-sm);
  color: var(--color-hero-text-muted);
  line-height: 1.4;
}

.check-icon {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  color: var(--color-accent-400);
  margin-top: 0.0625rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: var(--color-accent-500);
  color: white;
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background 0.2s var(--ease-smooth), transform 0.2s var(--ease-smooth);

  &:hover {
    background: var(--color-accent-600);
    transform: translateX(4px);
  }
}

.cta-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s var(--ease-smooth);

  .cta-button:hover & {
    transform: translateX(2px);
  }
}

.addons-panel {
  @media (min-width: 1024px) {
    position: sticky;
    top: 6rem;
  }
}

.addons-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
}

.addons-heading {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-hero-text);
  margin-bottom: 1.5rem;
}

.addons-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.addon-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: var(--text-sm);
  color: var(--color-hero-text-muted);
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  transition: background 0.2s var(--ease-smooth);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
}

.plus-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: var(--color-primary-400);
}

@media (prefers-reduced-motion: reduce) {
  .content-grid {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
