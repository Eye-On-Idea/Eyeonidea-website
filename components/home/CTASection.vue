<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t } = useI18n();

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
    { threshold: 0.3 },
  );

  observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <section
    id="cta-section"
    ref="sectionRef"
    class="cta-section"
    aria-labelledby="cta-heading"
  >
    <!-- Background Elements -->
    <div class="cta-background" aria-hidden="true">
      <div class="bg-gradient" />
      <div class="bg-pattern" />
    </div>

    <div class="cta-container">
      <GlassCard
        tint-color="dark"
        :gradient-border="true"
        :elevated="true"
        hover-effect="none"
        class="cta-card"
        :class="{ 'animate-in': isVisible }"
      >
        <div class="cta-content">
          <!-- Badge -->
          <span class="cta-badge">{{ t("landing.cta.badge") }}</span>

          <!-- Heading -->
          <h2 id="cta-heading" class="cta-heading">
            {{ t("landing.cta.title") }}
          </h2>

          <!-- Description -->
          <p class="cta-description">
            {{ t("landing.cta.description") }}
          </p>

          <!-- Buttons -->
          <div class="cta-buttons">
            <NuxtLink to="/contact" class="btn-primary">
              {{ t("landing.cta.primary") }}
              <UIcon name="i-heroicons-arrow-right-20-solid" class="btn-icon" />
            </NuxtLink>

            <NuxtLink to="/about" class="btn-secondary">
              {{ t("landing.cta.secondary") }}
            </NuxtLink>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <a
              :href="`mailto:${t('common.contact.email')}`"
              class="contact-link"
            >
              <UIcon name="i-heroicons-envelope" class="contact-icon" />
              <span>{{ t("common.contact.email") }}</span>
            </a>
            <span class="contact-divider">|</span>
            <a
              :href="`tel:${t('common.contact.phone').replace(/\s/g, '')}`"
              class="contact-link"
            >
              <UIcon name="i-heroicons-phone" class="contact-icon" />
              <span>{{ t("common.contact.phone") }}</span>
            </a>
          </div>
        </div>
      </GlassCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cta-section {
  position: relative;
  padding: 6rem 1.5rem;
  background: var(--color-section-alt);
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
  pointer-events: none;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 100%,
    rgba(42, 147, 134, 0.08) 0%,
    transparent 60%
  );
}

.bg-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background-image: radial-gradient(
    circle at 1px 1px,
    var(--color-accent-200) 1px,
    transparent 0
  );
  background-size: 40px 40px;
}

.cta-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  z-index: 1;
}

.cta-card {
  position: relative;
  overflow: hidden;
  background: var(--color-surface-1);
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  transition:
    opacity 0.7s var(--ease-smooth),
    transform 0.7s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.cta-content {
  position: relative;
  text-align: center;
  z-index: 2;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
}

.cta-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--color-accent-100);
  color: var(--color-accent-700);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
}

.cta-heading {
  font-size: var(--text-3xl);
  color: var(--color-text);
  margin-bottom: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.cta-description {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 550px;
  margin: 0 auto 2rem;

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  @media (min-width: 480px) {
    flex-direction: row;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--color-accent-500);
  color: white;
  font-weight: 600;
  font-size: var(--text-base);
  text-decoration: none;
  border-radius: 12px;
  transition: all var(--duration-normal) var(--ease-smooth);
  min-width: 200px;
  justify-content: center;

  &:hover {
    background: var(--color-accent-600);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(42, 147, 134, 0.3);

    .btn-icon {
      transform: translateX(4px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent-400);
    outline-offset: 4px;
  }
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform var(--duration-fast) var(--ease-smooth);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: transparent;
  color: var(--color-text);
  font-weight: 600;
  font-size: var(--text-base);
  text-decoration: none;
  border: 1px solid var(--color-border-strong);
  border-radius: 12px;
  transition: all var(--duration-normal) var(--ease-smooth);
  min-width: 180px;

  &:hover {
    background: var(--color-surface-2);
    border-color: var(--color-primary-400);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 4px;
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-smooth);

  &:hover {
    color: var(--color-primary-600);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 4px;
    border-radius: 4px;
  }
}

.contact-icon {
  width: 18px;
  height: 18px;
}

.contact-divider {
  display: none;
  color: var(--color-border-strong);

  @media (min-width: 640px) {
    display: block;
  }
}

.cta-decoration {
  position: absolute;
  right: -80px;
  bottom: -80px;
  width: 300px;
  height: 300px;
  opacity: 0.04;
  pointer-events: none;
  z-index: 1;

  @media (min-width: 768px) {
    right: -60px;
    bottom: -60px;
    width: 350px;
    height: 350px;
  }
}

.decoration-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

// Dark mode
:root.dark {
  .cta-section {
    background: var(--color-section-dark);
  }

  .bg-pattern {
    opacity: 0.1;
    background-image: radial-gradient(
      circle at 1px 1px,
      var(--color-accent-700) 1px,
      transparent 0
    );
  }

  .cta-card {
    background: var(--color-surface-2);
  }

  .cta-badge {
    background: var(--color-accent-900);
    color: var(--color-accent-300);
  }

  .contact-link:hover {
    color: var(--color-primary-300);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cta-card {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .btn-primary:hover,
  .btn-secondary:hover {
    transform: none;
  }
}
</style>
