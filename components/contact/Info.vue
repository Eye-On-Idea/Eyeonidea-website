<script setup lang="ts">
import { ref } from "vue";
import {
  animationPresets,
  withDelay,
  staggeredFadeInUp,
} from "~/composables/useAccessibleMotion";
import { useStrokeDraw } from "~/composables/useStrokeDraw";

const { t } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);

useStrokeDraw(sectionRef, {
  delay: 200,
  stagger: 120,
  duration: 600,
  selector: ".card-icon",
});

// v-motion presets
const headingMotion = animationPresets.fadeInUp;
const bottomCtaMotion = withDelay("fadeInUp", 300);
</script>

<template>
  <section
    ref="sectionRef"
    class="contact-info"
    aria-labelledby="contact-info-heading"
  >
    <div class="section-container">
      <h2
        id="contact-info-heading"
        class="section-heading"
        v-motion
        :initial="headingMotion.initial"
        :visible-once="headingMotion.visible"
      >
        {{ t("contact.info.heading") }}
      </h2>

      <div class="info-grid">
        <!-- Direct Contact Card -->
        <div
          class="info-card"
          v-motion
          :initial="staggeredFadeInUp(0).initial"
          :visible-once="staggeredFadeInUp(0).visible"
        >
          <div class="card-icon">
            <UIcon name="i-heroicons-phone" aria-hidden="true" />
          </div>
          <h3 class="card-title">
            {{ t("contact.info.directContact.title") }}
          </h3>
          <p class="card-description">
            {{ t("contact.info.directContact.description") }}
          </p>

          <div class="contact-methods">
            <a href="mailto:hello@eyeonidea.com" class="contact-link">
              <UIcon name="i-heroicons-envelope" aria-hidden="true" />
              <span>{{ t("contact.info.email.value") }}</span>
            </a>
            <a href="tel:+4529930583" class="contact-link">
              <UIcon name="i-heroicons-phone" aria-hidden="true" />
              <span>{{ t("contact.info.phone.value") }}</span>
            </a>
          </div>
        </div>

        <!-- Location Card -->
        <div
          class="info-card"
          v-motion
          :initial="staggeredFadeInUp(1).initial"
          :visible-once="staggeredFadeInUp(1).visible"
        >
          <div class="card-icon">
            <UIcon name="i-heroicons-map-pin" aria-hidden="true" />
          </div>
          <h3 class="card-title">{{ t("contact.info.location.title") }}</h3>
          <p class="card-address">{{ t("contact.info.location.address") }}</p>
          <p class="card-description">
            {{ t("contact.info.location.description") }}
          </p>
        </div>

        <!-- Business Hours Card -->
        <div
          class="info-card"
          v-motion
          :initial="staggeredFadeInUp(2).initial"
          :visible-once="staggeredFadeInUp(2).visible"
        >
          <div class="card-icon">
            <UIcon name="i-heroicons-clock" aria-hidden="true" />
          </div>
          <h3 class="card-title">{{ t("contact.info.hours.title") }}</h3>
          <p class="card-hours">{{ t("contact.info.hours.weekdays") }}</p>
          <p class="card-description">{{ t("contact.info.hours.response") }}</p>
        </div>

        <!-- Social Card -->
        <div
          class="info-card"
          v-motion
          :initial="staggeredFadeInUp(3).initial"
          :visible-once="staggeredFadeInUp(3).visible"
        >
          <div class="card-icon">
            <UIcon name="i-heroicons-share" aria-hidden="true" />
          </div>
          <h3 class="card-title">{{ t("contact.info.social.title") }}</h3>
          <div class="social-links">
            <a
              href="https://www.linkedin.com/company/eye-on-idea/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :aria-label="`${t('contact.info.social.linkedin')} (${t('common.accessibility.externalLink', 'opens in new tab')})`"
            >
              <UIcon
                name="i-mdi-linkedin"
                aria-hidden="true"
                class="text-primary-50 w-8 h-8"
              />
              <span>{{ t("contact.info.social.linkedin") }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div
        class="bottom-cta"
        v-motion
        :initial="bottomCtaMotion.initial"
        :visible-once="bottomCtaMotion.visible"
      >
        <h3 class="cta-title">{{ t("contact.cta.title") }}</h3>
        <p class="cta-description">{{ t("contact.cta.description") }}</p>
        <div class="cta-buttons">
          <NuxtLink to="/services" class="btn-primary">
            {{ t("contact.cta.services") }}
          </NuxtLink>
          <!-- Bottom CTA  <NuxtLink to="/news" class="btn-secondary">
            {{ t("contact.cta.news") }}
          </NuxtLink>-->
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact-info {
  padding: 4rem 1.5rem 6rem;
  background: var(--color-hero-bg-gradient);

  @media (min-width: 768px) {
    padding: 6rem 2rem 8rem;
  }
}

.section-container {
  max-width: 1000px;
  margin: 0 auto;
}

.section-heading {
  text-align: center;
  font-size: var(--text-2xl);
  color: var(--color-hero-text);
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    font-size: var(--text-3xl);
  }
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 4rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-card {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);

  @media (min-width: 768px) {
    padding: 2rem;
  }
}

.card-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-300);

  :deep(svg),
  :deep(.iconify) {
    width: 100%;
    height: 100%;
  }
}

.card-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-hero-text);
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-hero-text-muted);
}

.card-address {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-hero-text);
  margin-bottom: 0.5rem;
}

.card-hours {
  font-size: var(--text-sm);
  color: var(--color-hero-text);
  margin-bottom: 0.5rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.875rem;
  min-height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
  color: var(--color-hero-text);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: background 0.2s var(--ease-smooth);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  :deep(svg),
  :deep(.iconify) {
    width: 1rem;
    height: 1rem;
    color: var(--color-primary-300);
    flex-shrink: 0;
  }
}

.social-links {
  margin-top: 1rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  min-height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
  color: var(--color-hero-text);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: background 0.2s var(--ease-smooth);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
}

.bottom-cta {
  text-align: center;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-xl);
}

.cta-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-hero-text);
  margin-bottom: 0.75rem;

  @media (min-width: 768px) {
    font-size: var(--text-2xl);
  }
}

.cta-description {
  font-size: var(--text-base);
  color: var(--color-hero-text-muted);
  margin-bottom: 1.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
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
  padding: 0.875rem 1.75rem;
  min-height: 48px;
  background: var(--color-accent-500);
  color: white;
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition:
    background 0.2s var(--ease-smooth),
    transform 0.2s var(--ease-smooth);

  &:hover {
    background: var(--color-accent-600);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 4px;
  }
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 1.75rem;
  min-height: 48px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: var(--color-hero-text);
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition:
    background 0.2s var(--ease-smooth),
    border-color 0.2s var(--ease-smooth);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 4px;
  }
}

// prefers-reduced-motion handled by v-motion / useAccessibleMotion
</style>
