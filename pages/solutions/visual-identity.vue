<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { SectionNavItem } from "~/components/services/SectionNav.vue";

const logoImages = [
  "/images/visual-identity/logos/logo1.png",
  "/images/visual-identity/logos/logo2.png",
  "/images/visual-identity/logos/logo3.png",
  "/images/visual-identity/logos/logo4.png",
  "/images/visual-identity/logos/logo5.png",
  "/images/visual-identity/logos/logo6.png",
  "/images/visual-identity/logos/logo7.png",
  "/images/visual-identity/logos/logo8.png",
  "/images/visual-identity/logos/logo9.png",
  "/images/visual-identity/logos/logo10.png",
  "/images/visual-identity/logos/logo11.png",
  "/images/visual-identity/logos/logo12.png",
];

const typographyImages = [
  "/images/visual-identity/typography/typography-exo.png",
  "/images/visual-identity/typography/typography-montserrat.png",
];

const logoIndex = ref(0);
const typographyIndex = ref(0);

let logoTimer: ReturnType<typeof setInterval> | null = null;
let typographyTimer: ReturnType<typeof setInterval> | null = null;

const { t, tm } = useI18n();
const localePath = useLocalePath();

useSeo({
  title: () => t("servicesSubpages.visualIdentity.meta.title"),
  description: () => t("servicesSubpages.visualIdentity.meta.description"),
  type: "website",
  schemaType: "WebPage",
  includeWebSiteSchema: false,
  breadcrumbs: [
    { name: "Home", url: "https://eyeonidea.com" },
    { name: t("servicesSubpages.visualIdentity.breadcrumb.services"), url: "https://eyeonidea.com/solutions" },
    {
      name: t("servicesSubpages.visualIdentity.breadcrumb.current"),
      url: "https://eyeonidea.com/solutions/visual-identity",
    },
  ],
});

const navSections = computed<SectionNavItem[]>(() => [
  { id: "deliverables-section",     label: t("servicesSubpages.visualIdentity.nav.deliverables") },
  { id: "process-section",          label: t("servicesSubpages.visualIdentity.nav.process") },
  { id: "identity-pricing-section", label: t("servicesSubpages.visualIdentity.nav.pricing") },
  { id: "identity-faq-section",     label: t("servicesSubpages.visualIdentity.nav.faq") },
  { id: "identity-contact-section", label: t("servicesSubpages.visualIdentity.nav.contact") },
]);

interface DeliverableItem {
  title: string;
  description: string;
  placeholderDescription: string;
}

const deliverables = computed(
  () => tm("servicesSubpages.visualIdentity.deliverables.items") as DeliverableItem[],
);

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const processSteps = computed(
  () => tm("servicesSubpages.visualIdentity.process.steps") as ProcessStep[],
);

interface PricingHighlight {
  name: string;
  price: string;
  unit: string;
}

const pricingHighlights = computed(
  () => tm("servicesSubpages.visualIdentity.pricing.highlights") as PricingHighlight[],
);

const deliverablesRef = ref<HTMLElement | null>(null);
const processRef = ref<HTMLElement | null>(null);
const pricingRef = ref<HTMLElement | null>(null);
const deliverablesVisible = ref(false);
const processVisible = ref(false);
const pricingVisible = ref(false);

const numerals = ["I", "II", "III", "IV"];

onMounted(() => {
  const obs = (el: HTMLElement | null, setter: () => void) => {
    if (!el) return;
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { setter(); o.disconnect(); }
      });
    }, { threshold: 0.08 });
    o.observe(el);
    return o;
  };

  const o1 = obs(deliverablesRef.value, () => { deliverablesVisible.value = true; });
  const o2 = obs(processRef.value, () => { processVisible.value = true; });
  const o3 = obs(pricingRef.value, () => { pricingVisible.value = true; });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion) {
    logoTimer = setInterval(() => {
      logoIndex.value = (logoIndex.value + 1) % logoImages.length;
    }, 2500);
    typographyTimer = setInterval(() => {
      typographyIndex.value = (typographyIndex.value + 1) % typographyImages.length;
    }, 3500);
  }

  onUnmounted(() => {
    o1?.disconnect();
    o2?.disconnect();
    o3?.disconnect();
    if (logoTimer) clearInterval(logoTimer);
    if (typographyTimer) clearInterval(typographyTimer);
  });
});
</script>

<template>
  <div class="visual-identity-page">

    <PageHero
      heading-id="vi-hero-heading"
      :badge="t('servicesSubpages.visualIdentity.hero.badge')"
      :title="t('servicesSubpages.visualIdentity.hero.title')"
      :subtitle="t('servicesSubpages.visualIdentity.hero.subtitle')"
      bg-image="/images/visual-identity/hero.jpg"
      bg-image-position="left center"
      bg-image-position-mobile="left center"
    >
      <template #cta>
        <AppCtaButton variant="primary" :to="localePath('/contact')" :show-icon="true">
          {{ t("servicesSubpages.visualIdentity.cta.primaryText") }}
        </AppCtaButton>
        <AppCtaButton variant="secondary" :to="localePath('/solutions')">
          {{ t("servicesSubpages.visualIdentity.breadcrumb.services") }}
        </AppCtaButton>
      </template>
    </PageHero>

    <ServicesSectionNav
      :sections="navSections"
      :aria-label="t('servicesSubpages.visualIdentity.hero.badge')"
    />

    <section
      id="deliverables-section"
      ref="deliverablesRef"
      class="deliverables-section"
      aria-labelledby="deliverables-heading"
    >
      <div class="section-label-row" aria-hidden="true">
        <span class="sep-line" />
        <span class="sep-diamond" />
        <span class="sep-text">{{ t("servicesSubpages.visualIdentity.deliverables.badge") }}</span>
        <span class="sep-diamond" />
        <span class="sep-line" />
      </div>

      <div class="inner-container">
        <h2 id="deliverables-heading" class="section-title">
          {{ t("servicesSubpages.visualIdentity.deliverables.title") }}
        </h2>
        <p class="section-subtitle">
          {{ t("servicesSubpages.visualIdentity.deliverables.subtitle") }}
        </p>

        <div class="deliverables-grid" :class="{ 'animate-in': deliverablesVisible }">
          <article
            v-for="(item, index) in deliverables"
            :key="index"
            class="deliverable-card"
            :class="`stagger-${index + 1}`"
          >

            <div
              v-if="index === 0"
              class="deliverable-image deliverable-carousel"
              :aria-label="item.placeholderDescription"
            >
              <TransitionGroup name="carousel-fade" tag="div" class="deliverable-carousel__track">
                <NuxtImg
                  v-for="(src, i) in logoImages"
                  v-show="logoIndex === i"
                  :key="src"
                  :src="src"
                  :alt="`${item.title} - example ${i + 1}`"
                  format="webp"
                  loading="lazy"
                  class="deliverable-carousel__img"
                />
              </TransitionGroup>
              <div class="deliverable-carousel__dots" aria-hidden="true">
                <button
                  v-for="(_, i) in logoImages"
                  :key="i"
                  type="button"
                  class="deliverable-carousel__dot"
                  :class="{ 'deliverable-carousel__dot--active': logoIndex === i }"
                  :aria-label="`Show logo example ${i + 1}`"
                  @click="logoIndex = i"
                />
              </div>
            </div>

            <div v-else-if="index === 1" class="deliverable-image deliverable-static-img">
              <NuxtImg
                src="/images/visual-identity/palette.png"
                :alt="item.placeholderDescription"
                format="webp"
                loading="lazy"
                class="deliverable-static-img__img"
              />
            </div>

            <div
              v-else-if="index === 2"
              class="deliverable-image deliverable-carousel"
              :aria-label="item.placeholderDescription"
            >
              <TransitionGroup name="carousel-fade" tag="div" class="deliverable-carousel__track">
                <NuxtImg
                  v-for="(src, i) in typographyImages"
                  v-show="typographyIndex === i"
                  :key="src"
                  :src="src"
                  :alt="`${item.title} - example ${i + 1}`"
                  format="webp"
                  loading="lazy"
                  class="deliverable-carousel__img"
                />
              </TransitionGroup>
              <div class="deliverable-carousel__dots" aria-hidden="true">
                <button
                  v-for="(_, i) in typographyImages"
                  :key="i"
                  type="button"
                  class="deliverable-carousel__dot"
                  :class="{ 'deliverable-carousel__dot--active': typographyIndex === i }"
                  :aria-label="`Show typography example ${i + 1}`"
                  @click="typographyIndex = i"
                />
              </div>
            </div>

            <div v-else-if="index === 3" class="deliverable-image deliverable-static-img">
              <NuxtImg
                src="/images/visual-identity/brand-guide.png"
                :alt="item.placeholderDescription"
                format="webp"
                loading="lazy"
                class="deliverable-static-img__img"
              />
            </div>

            <div class="deliverable-content">
              <h3 class="deliverable-title">{{ item.title }}</h3>
              <p class="deliverable-description">{{ item.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section
      id="process-section"
      ref="processRef"
      class="identity-process-section"
      aria-labelledby="vi-process-heading"
    >
      <div class="section-label-row" aria-hidden="true">
        <span class="sep-line" />
        <span class="sep-diamond" />
        <span class="sep-text">{{ t("servicesSubpages.visualIdentity.process.badge") }}</span>
        <span class="sep-diamond" />
        <span class="sep-line" />
      </div>

      <div class="inner-container">
        <h2 id="vi-process-heading" class="section-title">
          {{ t("servicesSubpages.visualIdentity.process.title") }}
        </h2>

        <ol class="process-steps" role="list">
          <li
            v-for="(step, index) in processSteps"
            :key="step.number"
            class="process-step"
            :class="{ 'animate-in': processVisible }"
            :style="{ transitionDelay: processVisible ? `${index * 100}ms` : '0ms' }"
          >
            <div class="step-numeral-row" aria-hidden="true">
              <span class="step-rule" />
              <span class="step-numeral">{{ numerals[index] ?? step.number }}</span>
              <span class="step-rule" />
            </div>

            <div class="step-deco-divider" aria-hidden="true">
              <span class="deco-line" />
              <span class="deco-diamond" />
              <span class="deco-line" />
            </div>

            <h3 class="step-heading">{{ step.title }}</h3>
            <p class="step-body">{{ step.description }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section
      id="identity-pricing-section"
      ref="pricingRef"
      class="pricing-section"
      aria-labelledby="vi-pricing-heading"
    >
      <div class="section-label-row" aria-hidden="true">
        <span class="sep-line" />
        <span class="sep-diamond" />
        <span class="sep-text">{{ t("servicesSubpages.visualIdentity.pricing.badge") }}</span>
        <span class="sep-diamond" />
        <span class="sep-line" />
      </div>

      <div class="inner-container">
        <div class="pricing-layout" :class="{ 'animate-in': pricingVisible }">

          <div class="pricing-intro">
            <h2 id="vi-pricing-heading" class="section-title">
              {{ t("servicesSubpages.visualIdentity.pricing.introTitle") }}
            </h2>

            <div class="pricing-intro__body">
              <p
                v-for="(paragraph, i) in t('servicesSubpages.visualIdentity.pricing.introBody').split('\n\n')"
                :key="i"
              >
                {{ paragraph }}
              </p>
            </div>

            <p class="pricing-intro__footnote">
              {{ t("servicesSubpages.visualIdentity.pricing.footnote") }}
            </p>
          </div>

          <div class="pricing-card">
            <ul class="price-list" role="list">
              <li
                v-for="(item, index) in pricingHighlights"
                :key="index"
                class="price-row"
              >
                <span class="price-row__name">{{ item.name }}</span>
                <span class="price-row__price">
                  <span class="price-row__starts-at">{{ t("servicesSubpages.visualIdentity.pricing.startsAt") }}</span>
                  <span class="price-row__currency">{{ t("servicesSubpages.visualIdentity.pricing.currency") }}</span>
                  <span class="price-row__value">{{ item.price }}</span>
                  <span class="price-row__unit">/ {{ item.unit }}</span>
                </span>
              </li>
            </ul>

            <div class="pricing-footer">
              <p class="pricing-vat">{{ t("servicesSubpages.visualIdentity.pricing.vatNote") }}</p>
              <p class="pricing-full-list">
                {{ t("servicesSubpages.visualIdentity.pricing.fullListNote") }}
                <NuxtLink
                  :to="t('servicesSubpages.visualIdentity.pricing.fullListHref')"
                  class="pricing-full-list__link"
                >
                  {{ t("servicesSubpages.visualIdentity.pricing.fullListLinkText") }}
                  <UIcon name="i-heroicons-arrow-right-20-solid" class="pricing-full-list__icon" aria-hidden="true" />
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div id="identity-faq-section">
      <ProcessFAQ />
    </div>

    <div id="identity-contact-section">
      <ServicesCTA />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.visual-identity-page {
  min-height: 100vh;
  background: #0d0908;
}

#identity-section,
#deliverables-section,
#process-section,
#identity-pricing-section,
#identity-faq-section,
#identity-contact-section {
  scroll-margin-top: 136px;
}

.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 2rem 3rem;
}

.inner-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  line-height: 1.1;
  color: #fff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.5);
  max-width: 48ch;
  margin: 0 0 2.5rem;
}

.deliverables-section {
  background: #0d0908;
  padding-bottom: 0;
}

.deliverables-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  &.animate-in .deliverable-card {
    opacity: 1;
    transform: translateY(0);
  }
}

.deliverable-card {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.stagger-1 { transition-delay: 50ms; }
  &.stagger-2 { transition-delay: 150ms; }
  &.stagger-3 { transition-delay: 250ms; }
  &.stagger-4 { transition-delay: 350ms; }
}

.deliverable-image {
  margin-bottom: 1.5rem;
  border: 1px solid rgba(223, 175, 133, 0.1);
  border-radius: 2px;
  overflow: hidden;
  background: #161210;
}

.deliverable-carousel {
  position: relative;
  aspect-ratio: 16 / 9;
}

.deliverable-carousel__track {
  position: relative;
  width: 100%;
  height: 100%;
}

.deliverable-carousel__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
}

.deliverable-carousel__dots {
  position: absolute;
  bottom: 0.625rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.375rem;
  z-index: 1;
}

.deliverable-carousel__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: rgba(223, 175, 133, 0.2);
  cursor: pointer;
  min-height: 0;
  transition: background 0.2s ease;

  &--active {
    width: 16px;
    border-radius: 3px;
    background: rgba(223, 175, 133, 0.7);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 2px;
  }
}

.deliverable-static-img {
  aspect-ratio: 16 / 9;
}

.deliverable-static-img__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  display: block;
}

.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 0.5s var(--ease-smooth);
}

.carousel-fade-enter-from,
.carousel-fade-leave-to {
  opacity: 0;
}

.deliverable-content {
  padding: 0 0.25rem;
}

.deliverable-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  color: #ffeddf;
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
}

.deliverable-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgba(255, 237, 223, 0.5);
  margin: 0;
}

.identity-process-section {
  background: #0d0908;
  padding-bottom: 0;
}

.process-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgba(223, 175, 133, 0.08);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.process-step {
  padding: 2.5rem 2rem 3rem;
  border-right: 1px solid rgba(223, 175, 133, 0.08);
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 1024px) {
    &:last-child { border-right: none; }
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    &:nth-child(2n) { border-right: none; }
  }

  @media (max-width: 639px) {
    border-right: none;
  }
}

.step-numeral-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.step-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);
}

.step-numeral {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #dfaf85;
  opacity: 0.45;
  flex-shrink: 0;
}

.step-deco-divider {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.1);
}

.deco-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.3);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.step-heading {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  line-height: 1.3;
  color: #fff;
  margin: 0 0 0.75rem;
}

.step-body {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.85rem, 0.9vw, 0.9rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.pricing-section {
  background: #0d0908;
  padding-bottom: 0;
}

.pricing-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: start;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.pricing-intro {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.pricing-intro__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-family: var(--font-text);
    font-weight: 300;
    font-size: clamp(0.9rem, 1.1vw, 1rem);
    line-height: 1.75;
    color: rgba(255, 237, 223, 0.5);
    margin: 0;
  }
}

.pricing-intro__footnote {
  font-family: var(--font-text);
  font-size: 0.8rem;
  line-height: 1.6;
  color: rgba(255, 237, 223, 0.3);
  margin: 0;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(223, 175, 133, 0.1);
}

.pricing-card {
  background: #161210;
  border: 1px solid rgba(223, 175, 133, 0.12);
  border-radius: 2px;
  overflow: hidden;

  @media (min-width: 900px) {
    position: sticky;
    top: 136px;
  }
}

.price-list {
  list-style: none;
  padding: 0 1.5rem;
  margin: 1.5rem 0 0;
  display: flex;
  flex-direction: column;
}

.price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);

  &:first-child { padding-top: 0; }
  &:last-child { border-bottom: none; }
}

.price-row__name {
  font-family: var(--font-text);
  font-size: 0.875rem;
  color: rgba(255, 237, 223, 0.65);
  flex: 1;
}

.price-row__price {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  flex-shrink: 0;
}

.price-row__starts-at {
  font-size: 0.7rem;
  color: rgba(255, 237, 223, 0.3);
  margin-right: 0.2rem;
  font-style: italic;
  font-family: var(--font-text);
}

.price-row__currency {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(223, 175, 133, 0.6);
}

.price-row__value {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: #dfaf85;
  font-variant-numeric: tabular-nums;
}

.price-row__unit {
  font-family: var(--font-text);
  font-size: 0.72rem;
  color: rgba(255, 237, 223, 0.4);
}

.pricing-footer {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
}

.pricing-vat {
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: rgba(255, 237, 223, 0.3);
  margin: 0;
}

.pricing-full-list {
  font-family: var(--font-text);
  font-size: 0.85rem;
  color: rgba(255, 237, 223, 0.4);
  margin: 0;
}

.pricing-full-list__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.65);
  text-decoration: none;
  margin-left: 0.25rem;
  min-height: 44px;
  transition: color 0.25s ease;

  &:hover {
    color: #dfaf85;
    .pricing-full-list__icon { transform: translateX(3px); }
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 2px;
    border-radius: 2px;
  }
}

.pricing-full-list__icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  transition: transform 0.25s ease;
}

@media (prefers-reduced-motion: reduce) {
  .deliverable-card,
  .process-step,
  .pricing-layout {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .deliverable-carousel__dot,
  .pricing-full-list__link,
  .pricing-full-list__icon {
    transition: none;
  }

  .carousel-fade-enter-active,
  .carousel-fade-leave-active {
    transition: none;
  }
}

.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);
}
.sep-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;
}
.sep-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.55);
  flex-shrink: 0;
}

html:not(.dark) {
  .visual-identity-page { background: var(--color-section-light); }

  .sep-line    { background: rgba(153, 82, 38, 0.20); }
  .sep-diamond { background: rgba(153, 82, 38, 0.45); }
  .sep-text    { color: rgba(153, 82, 38, 0.65); }

  .section-title    { color: #441a08; }
  .section-subtitle { color: #67280e; }

  .deliverables-section { background: var(--color-section-alt); }

  .deliverable-title       { color: #441a08; }
  .deliverable-description { color: #67280e; }

  .deliverable-image {
    background: linear-gradient(145deg, #ffffff 0%, #fffaf7 100%);
    border-color: rgba(153, 82, 38, 0.12);
  }

  .deliverable-carousel__dot {
    background: rgba(153, 82, 38, 0.2);
    &--active { background: rgba(153, 82, 38, 0.65); }
  }

  .identity-process-section { background: var(--color-section-light); }

  .process-steps { border-top-color: rgba(153, 82, 38, 0.12); }
  .process-step  {
    border-right-color:  rgba(153, 82, 38, 0.12);
    border-bottom-color: rgba(153, 82, 38, 0.12);
  }

  .step-rule    { background: rgba(153, 82, 38, 0.15); }
  .step-numeral { color: #7d3412; opacity: 0.85; }
  .deco-line    { background: rgba(153, 82, 38, 0.12); }
  .deco-diamond { background: rgba(153, 82, 38, 0.40); }
  .step-heading { color: #441a08; }
  .step-body    { color: #67280e; }

  .pricing-section { background: var(--color-section-alt); }

  .pricing-card {
    background: linear-gradient(175deg, #ffffff 0%, #fff7f0 100%);
    border-color: rgba(153, 82, 38, 0.14);
    box-shadow: 0 2px 12px rgba(153, 82, 38, 0.06);
  }

  .pricing-intro__body p   { color: #67280e; }
  .pricing-intro__footnote {
    color: rgba(103, 40, 14, 0.55);
    border-top-color: rgba(153, 82, 38, 0.12);
  }

  .price-row           { border-bottom-color: rgba(153, 82, 38, 0.10); }
  .price-row__name     { color: #481f0a; }
  .price-row__currency { color: #7d3412; }
  .price-row__value    { color: #67280e; }
  .price-row__unit     { color: rgba(103, 40, 14, 0.7); }
  .price-row__starts-at { color: rgba(103, 40, 14, 0.55); }

  .pricing-footer { border-top-color: rgba(153, 82, 38, 0.10); }
  .pricing-vat    { color: rgba(103, 40, 14, 0.5); }
  .pricing-full-list { color: #67280e; }

  .pricing-full-list__link {
    color: #7d3412;
    &:hover { color: #441a08; }
    &:focus-visible { outline-color: rgba(153, 82, 38, 0.6); }
  }
}
</style>
