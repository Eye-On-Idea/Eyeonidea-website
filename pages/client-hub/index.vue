<script setup lang="ts">
definePageMeta({
  layout: "client-hub",
  middleware: ["client-hub-auth"],
});

const { t } = useI18n();
const localePath = useLocalePath();

useSeoMeta({
  title: () => t("clientHub.meta.title"),
  description: () => t("clientHub.meta.description"),
  ogTitle: () => t("clientHub.meta.title"),
  ogDescription: () => t("clientHub.meta.description"),
  ogType: "website",
  ogUrl: "https://eyeonidea.com/client-hub",
});

useHead({
  link: [{ rel: "canonical", href: "https://eyeonidea.com/client-hub" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Client Hub",
        description:
          "Guides and resources to help you manage your website, email, domain, hosting, and brand identity",
        publisher: {
          "@type": "Organization",
          name: "Eye On Idea",
          url: "https://eyeonidea.com",
        },
      }),
    },
  ],
});
</script>

<template>
  <div class="hub-landing">

    <section
      class="hub-hero"
      aria-labelledby="hub-hero-heading"
    >

      <div class="hub-hero__orbs" aria-hidden="true">
        <div class="hub-hero__orb hub-hero__orb--1" />
        <div class="hub-hero__orb hub-hero__orb--2" />
        <div class="hub-hero__orb hub-hero__orb--3" />
        <div class="hub-hero__orb hub-hero__orb--4" />
      </div>

      <div class="hub-hero__content">
        <p class="hub-hero__eyebrow">
          {{ t("clientHub.nav.hubTitle") }}
        </p>
        <h1 id="hub-hero-heading" class="hub-hero__title">
          {{ t("clientHub.hub.welcomeTitle") }}
        </h1>
        <p class="hub-hero__tagline">
          {{ t("clientHub.hub.heroTagline") }}
        </p>
        <div class="hub-hero__ctas">
          <NuxtLink
            :to="localePath('/client-hub/onboarding')"
            class="hub-cta hub-cta--accent"
          >
            <UIcon name="i-heroicons-academic-cap" class="w-4 h-4" aria-hidden="true" />
            {{ t("clientHub.hub.heroCta1") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/client-hub/website-content')"
            class="hub-cta hub-cta--outline"
          >
            <UIcon name="i-heroicons-book-open" class="w-4 h-4" aria-hidden="true" />
            {{ t("clientHub.hub.heroCta2") }}
          </NuxtLink>
        </div>
      </div>

      <div class="hub-hero__scroll-indicator" aria-hidden="true">
        <UIcon name="i-heroicons-chevron-down" class="w-6 h-6" />
      </div>
    </section>

    <div class="hub-inner">

      <NuxtLink
        :to="localePath('/client-hub/onboarding')"
        class="hub-onboarding-card group"
        :aria-label="t('clientHub.onboarding.title')"
      >
        <div class="hub-onboarding-card__gradient" aria-hidden="true" />
        <div class="hub-onboarding-card__body">
          <div class="hub-onboarding-card__icon-wrap">
            <UIcon
              name="i-heroicons-academic-cap"
              class="w-7 h-7 text-accent-500"
              aria-hidden="true"
            />
          </div>
          <div class="hub-onboarding-card__text">
            <h2 class="hub-onboarding-card__title">
              {{ t("clientHub.onboarding.title") }}
            </h2>
            <p class="hub-onboarding-card__desc">
              {{ t("clientHub.onboarding.ctaDescription") }}
            </p>
          </div>
          <UIcon
            name="i-heroicons-arrow-right"
            class="hub-onboarding-card__arrow"
            aria-hidden="true"
          />
        </div>
      </NuxtLink>

      <div class="hub-intro">
        <h2 class="hub-intro__title">
          {{ t("clientHub.hub.introTitle") }}
        </h2>
        <p class="hub-intro__body">
          {{ t("clientHub.hub.introBody") }}
        </p>
      </div>

    </div>

    <div class="hub-faq-wrapper">
      <ProcessFAQ />
    </div>

    <div class="hub-contact">
      <div class="hub-contact__inner">
        <div class="hub-contact__text">
          <h2 class="hub-contact__title">
            {{ t("clientHub.hub.contactTitle") }}
          </h2>
          <p class="hub-contact__body">
            {{ t("clientHub.hub.contactBody") }}
          </p>
        </div>
        <div class="hub-contact__links">
          <a
            href="mailto:hello@eyeonidea.com"
            class="hub-contact__link"
          >
            <UIcon name="i-heroicons-envelope" class="w-5 h-5" aria-hidden="true" />
            <span>{{ t("clientHub.hub.contactEmail") }}</span>
            <span class="sr-only">hello@eyeonidea.com</span>
          </a>
          <a
            href="tel:+4529930583"
            class="hub-contact__link"
          >
            <UIcon name="i-heroicons-phone" class="w-5 h-5" aria-hidden="true" />
            <span>{{ t("clientHub.hub.contactPhone") }}</span>
            <span class="sr-only">+45 29 93 05 83</span>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>

.hub-landing {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.hub-hero {
  position: relative;
  overflow: hidden;

  margin: -1rem -1rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  min-height: 60vh;
  min-height: 60svh;
  padding: 3rem 1.5rem 5rem;

  background: var(--color-primary-950, #1a1614);

  @media (min-width: 640px) {
    margin: -1.5rem -1.5rem 0;
    min-height: calc(100vh - 4rem);
    min-height: calc(100svh - 4rem);
    padding: 4rem 2rem 6rem;
  }
}

.hub-hero__orbs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hub-hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.hub-hero__orb--1 {
  width: 480px;
  height: 480px;
  top: -10%;
  left: -10%;
  background: radial-gradient(circle, #dfaf85 0%, transparent 70%);
  opacity: 0.25;
  animation: orb-drift-1 20s ease-in-out infinite;
}

.hub-hero__orb--2 {
  width: 520px;
  height: 520px;
  bottom: -15%;
  right: -10%;
  background: radial-gradient(circle, #64c6b7 0%, transparent 70%);
  opacity: 0.2;
  animation: orb-drift-2 17s ease-in-out infinite;
}

.hub-hero__orb--3 {
  width: 300px;
  height: 300px;
  top: 30%;
  right: 5%;
  background: radial-gradient(circle, #dfaf85 0%, transparent 70%);
  opacity: 0.15;
  animation: orb-drift-3 24s ease-in-out infinite;
}

.hub-hero__orb--4 {
  width: 240px;
  height: 240px;
  top: -5%;
  right: 20%;
  background: radial-gradient(circle, #64c6b7 0%, transparent 70%);
  opacity: 0.15;
  animation: orb-drift-1 15s ease-in-out infinite reverse;
}

@keyframes orb-drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(30px, -20px) scale(1.05); }
  66%       { transform: translate(-20px, 15px) scale(0.95); }
}

@keyframes orb-drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  40%       { transform: translate(-25px, 20px) scale(1.04); }
  75%       { transform: translate(15px, -15px) scale(0.97); }
}

@keyframes orb-drift-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(-18px, -25px) scale(1.06); }
}

.hub-hero__content {
  position: relative;
  z-index: 1;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.hub-hero__eyebrow {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #64c6b7;
  margin: 0;
}

.hub-hero__title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #f9f5f1;
  line-height: 1.15;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 2.5rem;
  }
}

.hub-hero__tagline {
  font-size: 1rem;
  color: #c9b8a8;
  line-height: 1.65;
  margin: 0;
  max-width: 520px;
}

.hub-hero__ctas {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

.hub-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0.625rem 1.25rem;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.2s var(--ease-smooth, ease),
    color 0.2s var(--ease-smooth, ease),
    box-shadow 0.2s var(--ease-smooth, ease),
    transform 0.15s var(--ease-smooth, ease);

  &:focus-visible {
    outline: 2px solid #64c6b7;
    outline-offset: 3px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

.hub-cta--accent {
  background: #2a9386;
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(42, 147, 134, 0.3);

  &:hover {
    background: #3aafa1;
    box-shadow: 0 6px 20px rgba(42, 147, 134, 0.45);
  }
}

.hub-cta--outline {
  background: transparent;
  color: #f9f5f1;
  border: 1.5px solid rgba(255, 255, 255, 0.25);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.4);
  }
}

.hub-hero__scroll-indicator {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  color: #c9b8a8;
  opacity: 0.6;
  animation: scroll-bounce 2s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(6px); }
}

.hub-inner {
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hub-onboarding-card {
  position: relative;
  display: block;
  border-radius: 1rem;
  overflow: hidden;
  text-decoration: none;
  border: 1.5px solid transparent;
  background:
    linear-gradient(var(--color-surface-1), var(--color-surface-1)) padding-box,
    linear-gradient(135deg, #64c6b7, #dfaf85) border-box;
  transition:
    box-shadow 0.25s var(--ease-smooth, ease),
    transform 0.2s var(--ease-smooth, ease);

  &:hover {
    box-shadow: 0 8px 32px rgba(42, 147, 134, 0.18);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 3px;
  }
}

.hub-onboarding-card__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, #64c6b7 6%, transparent),
    transparent 60%
  );
  pointer-events: none;
}

.hub-onboarding-card__body {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
}

.hub-onboarding-card__icon-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: color-mix(in srgb, #64c6b7 12%, transparent);
}

.hub-onboarding-card__text {
  flex: 1;
  min-width: 0;
}

.hub-onboarding-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem;
  transition: color 0.2s var(--ease-smooth, ease);

  .hub-onboarding-card:hover & {
    color: #2a9386;
  }
}

:root.dark .hub-onboarding-card:hover .hub-onboarding-card__title {
  color: #64c6b7;
}

.hub-onboarding-card__desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.55;
  margin: 0;
}

.hub-onboarding-card__arrow {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-text-tertiary);
  transition:
    color 0.2s var(--ease-smooth, ease),
    transform 0.2s var(--ease-smooth, ease);

  .hub-onboarding-card:hover & {
    color: #2a9386;
    transform: translateX(3px);
  }
}

.hub-intro {
  padding: 1.5rem;
  border-radius: 0.875rem;
  background: var(--color-surface-2);
  border: 1px solid var(--glass-border-subtle);
}

.hub-intro__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.625rem;
}

.hub-intro__body {
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
}

.hub-faq-wrapper {
  margin-left: -1rem;
  margin-right: -1rem;
  width: calc(100% + 2rem);

  @media (min-width: 640px) {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    width: calc(100% + 3rem);
  }
}

.hub-contact {
  margin-left: -1rem;
  margin-right: -1rem;
  margin-bottom: -1rem;
  background: var(--color-primary-950, #1a1614);
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  @media (min-width: 640px) {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    margin-bottom: -1.5rem;
  }
}

:root.dark .hub-contact {
  background: var(--color-surface-2);
  border-top: 1px solid var(--glass-border-subtle);
}

.hub-contact__inner {
  max-width: 768px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 2rem;
  }
}

.hub-contact__title {
  font-size: 1rem;
  font-weight: 700;
  color: #f9f5f1;
  margin: 0 0 0.375rem;
}

:root.dark .hub-contact__title {
  color: var(--color-text-primary);
}

.hub-contact__body {
  font-size: 0.875rem;
  color: #c9b8a8;
  margin: 0;
  line-height: 1.55;
}

:root.dark .hub-contact__body {
  color: var(--color-text-secondary);
}

.hub-contact__links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.hub-contact__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0.5rem 1rem;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1614;
  background: #dfaf85;
  text-decoration: none;
  transition:
    background 0.2s var(--ease-smooth, ease),
    transform 0.15s var(--ease-smooth, ease);

  &:hover {
    background: #e8c49d;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #64c6b7;
    outline-offset: 3px;
  }
}

:root.dark .hub-contact__link {
  background: color-mix(in srgb, #dfaf85 15%, transparent);
  color: var(--color-text-primary);
  border: 1px solid var(--glass-border-subtle);

  &:hover {
    background: color-mix(in srgb, #dfaf85 25%, transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hub-hero__orb {
    animation: none;
  }

  .hub-hero__scroll-indicator {
    animation: none;
  }

  .hub-cta,
  .hub-onboarding-card,
  .hub-onboarding-card__title,
  .hub-onboarding-card__arrow,
  .hub-contact__link {
    transition: none;
  }

  .hub-cta:hover,
  .hub-onboarding-card:hover,
  .hub-contact__link:hover {
    transform: none;
  }
}
</style>
