<script setup lang="ts">
import { ref, onMounted } from "vue";

const { t } = useI18n();

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <section
    class="services-hero"
    aria-labelledby="services-hero-heading"
  >
    <!-- Background -->
    <div class="hero-background" aria-hidden="true">
      <div class="bg-gradient" />
      <div class="bg-pattern" />
    </div>

    <!-- Content -->
    <div class="hero-content">
      <div
        class="content-wrapper"
        :class="{ 'animate-in': isVisible }"
      >
        <span class="hero-badge glass-brand">
          {{ t("services.hero.badge") }}
        </span>

        <h1 id="services-hero-heading" class="hero-title">
          {{ t("services.hero.title") }}
        </h1>

        <p class="hero-subtitle">
          {{ t("services.hero.subtitle") }}
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.services-hero {
  position: relative;
  padding: 10rem 1.5rem 6rem;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 12rem 2rem 8rem;
  }
}

.hero-background {
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
      ellipse at 20% 30%,
      rgba(223, 175, 133, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 70%,
      rgba(42, 147, 134, 0.08) 0%,
      transparent 50%
    );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  text-align: center;
}

.content-wrapper {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-badge {
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

.hero-title {
  font-size: var(--text-4xl);
  color: var(--color-hero-text);
  margin-bottom: 1.5rem;
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: var(--text-5xl);
  }
}

.hero-subtitle {
  font-size: var(--text-lg);
  line-height: 1.7;
  color: var(--color-hero-text-muted);
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: var(--text-xl);
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-wrapper {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
