<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t } = useI18n();
const localePath = useLocalePath();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  if (!sectionRef.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.06 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <section
    ref="sectionRef"
    class="contact-info"
    aria-labelledby="contact-info-heading"
  >

    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("contact.info.heading") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-container" :class="{ 'animate-in': isVisible }">
      <div class="info-grid">

        <div class="reach-col">
          <h2 id="contact-info-heading" class="col-title">
            {{ t("contact.info.directContact.title") }}
          </h2>
          <p class="col-description">
            {{ t("contact.info.directContact.description") }}
          </p>

          <div class="contact-rows">
            <a href="mailto:hello@eyeonidea.com" class="contact-row">
              <span class="row-label">
                <span class="row-diamond" aria-hidden="true" />
                {{ t("contact.info.email.label", "Email") }}
              </span>
              <span class="row-value">{{ t("contact.info.email.value") }}</span>
            </a>
            <a href="tel:+4529930583" class="contact-row">
              <span class="row-label">
                <span class="row-diamond" aria-hidden="true" />
                {{ t("contact.info.phone.label", "Phone") }}
              </span>
              <span class="row-value">{{ t("contact.info.phone.value") }}</span>
            </a>
          </div>
        </div>

        <div class="quick-col">

          <div class="info-block">
            <h3 class="block-title">{{ t("contact.info.location.title") }}</h3>
            <p class="block-value">{{ t("contact.info.location.address") }}</p>
            <p class="block-note">{{ t("contact.info.location.description") }}</p>
          </div>

          <div class="info-block">
            <h3 class="block-title">{{ t("contact.info.hours.title") }}</h3>
            <p class="block-value">{{ t("contact.info.hours.weekdays") }}</p>
            <p class="block-note">{{ t("contact.info.hours.response") }}</p>
          </div>

          <div class="info-block">
            <h3 class="block-title">{{ t("contact.info.social.title") }}</h3>
            <a
              href="https://www.linkedin.com/company/eye-on-idea/"
              target="_blank"
              rel="noopener noreferrer"
              class="linkedin-link"
              :aria-label="`${t('contact.info.social.linkedin')} (opens in new tab)`"
            >
              <span class="linkedin-monogram" aria-hidden="true">in</span>
              {{ t("contact.info.social.linkedin") }}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

      </div>

      <div class="bottom-cta" :class="{ 'animate-in': isVisible }">
        <div class="cta-panel">

          <div class="deco-frame" aria-hidden="true">
            <span class="corner corner--tl" />
            <span class="corner corner--tr" />
            <span class="corner corner--bl" />
            <span class="corner corner--br" />
          </div>

          <div class="cta-label-row" aria-hidden="true">
            <span class="cta-line" />
            <span class="cta-diamond" />
            <span class="cta-line" />
          </div>

          <h3 class="cta-title">{{ t("contact.cta.title") }}</h3>
          <p class="cta-description">{{ t("contact.cta.description") }}</p>
          <div class="cta-actions">
            <AppCtaButton variant="primary" :to="localePath('/solutions/website-packages')">
              {{ t("contact.cta.services") }}
            </AppCtaButton>
            <AppCtaButton variant="secondary" :to="localePath('/cases')">
              {{ t("contact.cta.news") }}
            </AppCtaButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.contact-info {
  background: #0d0908;
  padding-bottom: 0;
}

.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
}

.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.sep-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.sep-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  flex-shrink: 0;
}

.section-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 6rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.7s var(--ease-smooth),
    transform 0.7s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  margin-bottom: 5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1.2fr 1fr;
    gap: 5rem;
  }
}

.col-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #ffeddf;
  margin: 0 0 1rem;
}

.col-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.875rem, 1.1vw, 0.975rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.45);
  margin: 0 0 2.5rem;
}

.contact-rows {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
}

.contact-row {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 1.5rem;
  align-items: baseline;
  padding: 1.125rem 0;
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(223, 175, 133, 0.02);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.4);
    outline-offset: 2px;
  }
}

.row-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.4);
}

.row-diamond {
  display: inline-block;
  width: 4px;
  height: 4px;
  background: rgba(223, 175, 133, 0.3);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.row-value {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.875rem, 1.1vw, 0.975rem);
  color: rgba(255, 237, 223, 0.75);
  transition: color 0.2s ease;

  .contact-row:hover & {
    color: rgba(223, 175, 133, 0.9);
  }
}

.quick-col {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
}

.info-block {
  padding: 1.75rem 0;
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);
}

.block-title {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.4);
  margin: 0 0 0.625rem;
}

.block-value {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  color: #ffeddf;
  margin: 0 0 0.375rem;
}

.block-note {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.8rem, 0.9vw, 0.875rem);
  line-height: 1.65;
  color: rgba(255, 237, 223, 0.35);
  margin: 0;
}

.linkedin-link {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.875rem;
  min-height: 40px;
  background: rgba(223, 175, 133, 0.05);
  border: 1px solid rgba(223, 175, 133, 0.15);
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.6);
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(223, 175, 133, 0.1);
    border-color: rgba(223, 175, 133, 0.28);
    color: rgba(223, 175, 133, 0.9);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.4);
    outline-offset: 2px;
  }
}

.linkedin-monogram {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  background: rgba(223, 175, 133, 0.1);
  border: 1px solid rgba(223, 175, 133, 0.18);
  font-size: 0.5rem;
  font-weight: 900;
  letter-spacing: 0;
  color: rgba(223, 175, 133, 0.65);
}

.bottom-cta {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.2s,
    transform 0.6s var(--ease-smooth) 0.2s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-panel {
  position: relative;
  padding: 3.5rem 2.5rem;
  background: rgba(18, 7, 3, 0.5);
  border: 1px solid rgba(223, 175, 133, 0.12);
  text-align: center;

  @media (min-width: 640px) {
    padding: 4rem 4rem;
  }
}

.deco-frame {
  position: absolute;
  inset: 0.875rem;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 1.125rem;
  height: 1.125rem;
  border-color: rgba(223, 175, 133, 0.18);
  border-style: solid;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

.cta-label-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}

.cta-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.1);
}

.cta-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.3);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.cta-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ffeddf;
  margin: 0 0 1rem;
  text-wrap: balance;
}

.cta-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.875rem, 1.1vw, 0.975rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.4);
  max-width: 44ch;
  margin: 0 auto 2rem;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .section-container,
  .bottom-cta {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

html:not(.dark) {
  .contact-info { background: var(--color-section-alt); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .col-title       { color: var(--color-text-primary); }
  .col-description { color: var(--color-text-subtle); }

  .contact-rows { border-top-color: var(--deco-line); }

  .contact-row {
    border-bottom-color: var(--deco-line);

    &:hover { background: rgba(153, 82, 38, 0.02); }
    &:focus-visible { outline-color: var(--color-primary-500); }
  }

  .row-label   { color: var(--color-primary-500); opacity: 0.6; }
  .row-diamond { background: var(--deco-diamond-sm); }

  .row-value {
    color: var(--color-text-secondary);

    .contact-row:hover & { color: var(--color-primary-600); }
  }

  .quick-col { border-top-color: var(--deco-line); }
  .info-block { border-bottom-color: var(--deco-line); }
  .block-title { color: var(--color-primary-500); opacity: 0.6; }
  .block-value { color: var(--color-text-primary); }
  .block-note  { color: var(--color-text-subtle); }

  .linkedin-link {
    background: rgba(153, 82, 38, 0.06);
    border-color: var(--deco-line);
    color: var(--color-primary-600);

    &:hover {
      background: rgba(153, 82, 38, 0.12);
      border-color: var(--deco-line-strong);
      color: var(--color-primary-700);
    }

    &:focus-visible { outline-color: var(--color-primary-500); }
  }

  .linkedin-monogram {
    background: rgba(153, 82, 38, 0.10);
    border-color: var(--deco-border);
    color: var(--color-primary-600);
  }

  .cta-panel {
    background: rgba(255, 255, 255, 0.70);
    border-color: var(--deco-border);
  }

  .corner    { border-color: var(--deco-border); }
  .cta-line  { background: var(--deco-line); }
  .cta-diamond { background: var(--deco-diamond); }
  .cta-title { color: var(--color-text-primary); }
  .cta-description { color: var(--color-text-subtle); }
}
</style>

