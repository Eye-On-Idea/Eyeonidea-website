<script setup lang="ts">
import { ref, onMounted } from "vue";

const { t } = useI18n();

// Animation states
const isVisible = ref(false);
const prefersReducedMotion = ref(false);

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Trigger entrance animation
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

// Scroll to next section
const scrollToContent = () => {
  const nextSection = document.querySelector("#about-section");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <section
    id="hero-section"
    class="hero-section"
    aria-labelledby="hero-heading"
  >
    <!-- Gradient Background -->
    <div class="hero-gradient" aria-hidden="true" />

    <!-- Particle Animation Background -->
    <ClientOnly>
      <ThreeHeroBackground />
    </ClientOnly>

    <!-- Content Container -->
    <div class="hero-content">
      <div
        class="content-wrapper"
        :class="{
          'animate-in': isVisible,
          'no-animation': prefersReducedMotion,
        }"
      >
        <!-- Logo Watermark -->
        <div class="w-3xs ml-auto mr-auto mb-2 p-4" aria-hidden="true">
          <img
            src="/public-material/logo-center-shadow.svg"
            alt="logo for eye on idea"
            class="w-full"
            loading="eager"
          />
        </div>
        <!-- Main Heading -->
        <h1 id="hero-heading" class="hero-heading">
          <span class="headline-primary">{{ t("landing.hero.headline") }}</span>
          <span class="headline-accent text-gradient">{{
            t("landing.hero.headlineAccent")
          }}</span>
        </h1>

        <!-- Subheadline -->
        <p class="hero-subheadline">
          {{ t("landing.hero.subheadline") }}
        </p>

        <!-- CTA Buttons -->
        <div class="hero-cta">
          <NuxtLink to="/contact" class="btn-primary">
            {{ t("landing.hero.cta.primary") }}
            <UIcon name="i-heroicons-arrow-right-20-solid" class="btn-icon" />
          </NuxtLink>

          <NuxtLink to="/services" class="btn-secondary">
            {{ t("landing.hero.cta.secondary") }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <button
      class="scroll-indicator"
      :class="{ visible: isVisible }"
      @click="scrollToContent"
      :aria-label="t('landing.hero.scrollIndicator')"
    >
      <span class="scroll-text">{{ t("landing.hero.scrollIndicator") }}</span>
      <div class="scroll-mouse">
        <div class="scroll-wheel" />
      </div>
    </button>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: rem 1.5rem 4rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: var(--color-hero-bg-gradient);
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        ellipse at 30% 20%,
        rgba(223, 175, 133, 0.15) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse at 70% 80%,
        rgba(42, 147, 134, 0.1) 0%,
        transparent 50%
      );
  }
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 900px;
  width: 100%;
  text-align: center;
}

.content-wrapper {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s var(--ease-smooth),
    transform 0.8s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  &.no-animation {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-accent-200);
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.hero-heading {
  font-size: var(--text-5xl);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--color-hero-text);

  @media (min-width: 768px) {
    font-size: var(--text-6xl);
  }
}

.headline-primary {
  display: block;
  margin-bottom: 0.25rem;
}

.headline-accent {
  display: block;
}

.hero-subheadline {
  font-size: var(--text-lg);
  line-height: 1.6;
  color: var(--color-hero-text-muted);
  max-width: 600px;
  margin: 0 auto 2.5rem;

  @media (min-width: 768px) {
    font-size: var(--text-xl);
  }
}

.hero-cta {
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
  background: var(--color-primary-200);
  color: var(--color-primary-900);
  font-weight: 600;
  font-size: var(--text-base);
  border-radius: 12px;
  text-decoration: none;
  transition: all var(--duration-normal) var(--ease-smooth);
  min-width: 200px;
  justify-content: center;

  &:hover {
    background: var(--color-primary-100);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(223, 175, 133, 0.3);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-100);
    outline-offset: 4px;
  }

  .btn-icon {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform var(--duration-fast) var(--ease-smooth);
  }

  &:hover .btn-icon {
    transform: translateX(4px);
  }
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: transparent;
  color: var(--color-hero-text);
  font-weight: 600;
  font-size: var(--text-base);
  border: 1px solid var(--color-primary-300); /* Improved visibility from glass-border */
  border-radius: 12px;
  text-decoration: none;
  transition: all var(--duration-normal) var(--ease-smooth);
  min-width: 180px;

  &:hover {
    background: rgba(211, 154, 105, 0.15); /* primary-300 with transparency */
    border-color: var(--color-primary-200);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-200);
    outline-offset: 4px;
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.5s var(--ease-smooth) 0.8s;
  z-index: 10;

  &.visible {
    opacity: 1;
  }

  &:hover {
    .scroll-mouse {
      border-color: var(--color-primary-200);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-200);
    outline-offset: 4px;
    border-radius: 4px;
  }
}

.scroll-text {
  font-size: var(--text-xs);
  color: var(--color-hero-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.scroll-mouse {
  width: 24px;
  height: 40px;
  border: 2px solid var(--color-primary-300); /* Improved visibility */
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
  transition: border-color var(--duration-normal) var(--ease-smooth);
}

.scroll-wheel {
  width: 4px;
  height: 8px;
  background: var(--color-primary-200);
  border-radius: 2px;
  animation: scrollWheel 2s ease-in-out infinite;
}

@keyframes scrollWheel {
  0%,
  100% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0.3;
    transform: translateY(8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-wrapper {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .scroll-indicator {
    opacity: 1;
    transition: none;
  }

  .scroll-wheel {
    animation: none;
  }

  .btn-primary:hover,
  .btn-secondary:hover {
    transform: none;
  }
}
</style>
