<script setup lang="ts">
import { ref, onMounted } from "vue";

const { t, tm } = useI18n();

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

useSeoMeta({
  title: () => t("legal.meta.title"),
  description: () => t("legal.meta.description"),
  ogTitle: () => t("legal.meta.title"),
  ogDescription: () => t("legal.meta.description"),
  ogType: "website",
  ogUrl: "https://eyeonidea.com/about/legal",
  twitterCard: "summary",
  twitterTitle: () => t("legal.meta.title"),
  twitterDescription: () => t("legal.meta.description"),
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://eyeonidea.com/about/legal",
    },
  ],
});

const sectionKeys = [
  "introduction",
  "services",
  "engagement",
  "payment",
  "intellectualProperty",
  "confidentiality",
  "warranties",
  "termination",
  "websiteUse",
  "governing",
  "contact",
];
</script>

<template>
  <div class="legal-page">
    <!-- Hero -->
    <section class="page-hero" aria-labelledby="legal-heading">
      <div class="hero-background" aria-hidden="true">
        <div class="bg-gradient" />
      </div>
      <div class="hero-content" :class="{ 'animate-in': isVisible }">
        <span class="hero-badge glass-brand">{{ t("legal.hero.badge") }}</span>
        <h1 id="legal-heading" class="hero-title">{{ t("legal.hero.title") }}</h1>
        <p class="hero-subtitle">{{ t("legal.hero.subtitle") }}</p>
      </div>
    </section>

    <!-- Content -->
    <section class="page-content">
      <div class="content-container" :class="{ 'animate-in': isVisible }">
        <p class="last-updated">{{ t("legal.lastUpdated") }}</p>

        <div
          v-for="key in sectionKeys"
          :key="key"
          class="content-section"
        >
          <h2 class="section-title">{{ t(`legal.sections.${key}.title`) }}</h2>
          <p
            v-for="(paragraph, index) in (tm(`legal.sections.${key}.content`) as string[])"
            :key="index"
            class="section-paragraph"
          >
            {{ paragraph }}
          </p>
        </div>

        <!-- Back Link -->
        <div class="back-link-wrapper">
          <NuxtLink to="/about" class="back-link">
            <UIcon name="i-heroicons-arrow-left" class="back-icon" aria-hidden="true" />
            {{ t("common.cta.backToAbout") }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.legal-page {
  min-height: 100vh;
}

.page-hero {
  position: relative;
  padding: 10rem 1.5rem 4rem;
  text-align: center;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 12rem 2rem 5rem;
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

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
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
  margin-bottom: 1rem;
}

.hero-title {
  font-size: var(--text-3xl);
  color: var(--color-hero-text);
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.hero-subtitle {
  font-size: var(--text-base);
  color: var(--color-hero-text-muted);
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

.page-content {
  padding: 4rem 1.5rem 6rem;
  background: var(--color-section-light);

  @media (min-width: 768px) {
    padding: 5rem 2rem 8rem;
  }
}

.content-container {
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s var(--ease-smooth) 0.2s, transform 0.8s var(--ease-smooth) 0.2s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.last-updated {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.content-section {
  margin-bottom: 2.5rem;

  &:last-of-type {
    margin-bottom: 3rem;
  }
}

.section-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.section-paragraph {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--color-text-muted);
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.back-link-wrapper {
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary-600);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 500;
  transition: color 0.2s var(--ease-smooth);

  &:hover {
    color: var(--color-primary-700);
  }
}

.back-icon {
  width: 1rem;
  height: 1rem;
}

// Dark mode
:root.dark {
  .page-content {
    background: var(--color-section-dark);
  }

  .back-link {
    color: var(--color-primary-400);

    &:hover {
      color: var(--color-primary-300);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-content,
  .content-container {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
