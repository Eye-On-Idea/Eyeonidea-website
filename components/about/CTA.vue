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
    { threshold: 0.2 }
  );

  observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <section
    ref="sectionRef"
    class="about-cta"
    aria-labelledby="about-cta-heading"
  >
    <div class="cta-background" aria-hidden="true">
      <div class="bg-gradient" />
      <div class="bg-pattern" />
    </div>

    <div
      class="cta-content"
      :class="{ 'animate-in': isVisible }"
    >
      <span class="cta-badge glass-brand">{{ t("about.cta.badge") }}</span>
      <h2 id="about-cta-heading" class="cta-title">
        {{ t("about.cta.title") }}
      </h2>
      <p class="cta-description">
        {{ t("about.cta.description") }}
      </p>

      <div class="cta-actions">
        <NuxtLink to="/contact" class="btn-primary">
          {{ t("about.cta.primary") }}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="btn-icon">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
        <NuxtLink to="/services" class="btn-secondary">
          {{ t("about.cta.secondary") }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-cta {
  position: relative;
  padding: 6rem 1.5rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 10rem 2rem;
  }
}

.cta-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: var(--color-hero-bg-gradient);
}

.bg-pattern {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse at 25% 30%,
      rgba(223, 175, 133, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 75% 70%,
      rgba(42, 147, 134, 0.1) 0%,
      transparent 50%
    );
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-accent-200);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
}

.cta-title {
  font-size: var(--text-3xl);
  color: var(--color-hero-text);
  margin-bottom: 1.25rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.cta-description {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-hero-text-muted);
  margin-bottom: 2.5rem;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--color-primary-500);
  color: white;
  font-size: var(--text-base);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background 0.2s var(--ease-smooth), transform 0.2s var(--ease-smooth);

  &:hover {
    background: var(--color-primary-600);
    transform: translateY(-2px);
  }
}

.btn-icon {
  width: 1.125rem;
  height: 1.125rem;
  transition: transform 0.2s var(--ease-smooth);

  .btn-primary:hover & {
    transform: translateX(3px);
  }
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: var(--color-hero-text);
  font-size: var(--text-base);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background 0.2s var(--ease-smooth), border-color 0.2s var(--ease-smooth);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cta-content {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
