<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { SectionNavItem } from "~/components/services/SectionNav.vue";
import { staggeredFadeInUp } from "~/composables/useAccessibleMotion";

// ─── Deliverable media ────────────────────────────────────────────────────────

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

useSeo({
  title: () => t("servicesSubpages.visualIdentity.meta.title"),
  description: () => t("servicesSubpages.visualIdentity.meta.description"),
  type: "website",
  schemaType: "WebPage",
  includeWebSiteSchema: false,
  breadcrumbs: [
    { name: "Home", url: "https://eyeonidea.com" },
    { name: t("servicesSubpages.visualIdentity.breadcrumb.services"), url: "https://eyeonidea.com/services" },
    {
      name: t("servicesSubpages.visualIdentity.breadcrumb.current"),
      url: "https://eyeonidea.com/services/visual-identity",
    },
  ],
});

const breadcrumbs = computed(() => [
  { label: "Home", to: "/" },
  {
    label: t("servicesSubpages.visualIdentity.breadcrumb.services"),
    to: "/services",
  },
  { label: t("servicesSubpages.visualIdentity.breadcrumb.current") },
]);

const navSections = computed<SectionNavItem[]>(() => [
  {
    id: "deliverables-section",
    label: t("servicesSubpages.visualIdentity.nav.deliverables"),
    icon: "i-heroicons-gift",
  },
  {
    id: "process-section",
    label: t("servicesSubpages.visualIdentity.nav.process"),
    icon: "i-heroicons-arrow-path",
  },
  {
    id: "identity-pricing-section",
    label: t("servicesSubpages.visualIdentity.nav.pricing"),
    icon: "i-heroicons-banknotes",
  },
  {
    id: "identity-faq-section",
    label: t("servicesSubpages.visualIdentity.nav.faq"),
    icon: "i-heroicons-question-mark-circle",
  },
  {
    id: "identity-contact-section",
    label: t("servicesSubpages.visualIdentity.nav.contact"),
    icon: "i-heroicons-envelope",
  },
]);

interface DeliverableItem {
  title: string;
  description: string;
  placeholderDescription: string;
}

const deliverables = computed(
  () =>
    tm(
      "servicesSubpages.visualIdentity.deliverables.items",
    ) as DeliverableItem[],
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
  () =>
    tm(
      "servicesSubpages.visualIdentity.pricing.highlights",
    ) as PricingHighlight[],
);

// Intersection observers for section animations
const deliverablesRef = ref<HTMLElement | null>(null);
const processRef = ref<HTMLElement | null>(null);
const pricingRef = ref<HTMLElement | null>(null);
const deliverablesVisible = ref(false);
const processVisible = ref(false);
const pricingVisible = ref(false);

onMounted(() => {
  const observerOptions = { threshold: 0.1 };

  const makeObserver = (onVisible: () => void) =>
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      });
    }, observerOptions);

  const deliverablesObserver = makeObserver(() => {
    deliverablesVisible.value = true;
    deliverablesObserver.disconnect();
  });
  const processObserver = makeObserver(() => {
    processVisible.value = true;
    processObserver.disconnect();
  });
  const pricingObserver = makeObserver(() => {
    pricingVisible.value = true;
    pricingObserver.disconnect();
  });

  if (deliverablesRef.value)
    deliverablesObserver.observe(deliverablesRef.value);
  if (processRef.value) processObserver.observe(processRef.value);
  if (pricingRef.value) pricingObserver.observe(pricingRef.value);

  // Only autoplay if user has no motion preference
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!reducedMotion) {
    logoTimer = setInterval(() => {
      logoIndex.value = (logoIndex.value + 1) % logoImages.length;
    }, 2500);
    typographyTimer = setInterval(() => {
      typographyIndex.value =
        (typographyIndex.value + 1) % typographyImages.length;
    }, 3500);
  }

  onUnmounted(() => {
    deliverablesObserver.disconnect();
    processObserver.disconnect();
    pricingObserver.disconnect();
    if (logoTimer) clearInterval(logoTimer);
    if (typographyTimer) clearInterval(typographyTimer);
  });
});
</script>

<template>
  <div class="visual-identity-page">
    <!-- Hero 
    <BaseHero
      :badge="t('servicesSubpages.visualIdentity.hero.badge')"
      :title="t('servicesSubpages.visualIdentity.hero.title')"
      :subtitle="t('servicesSubpages.visualIdentity.hero.subtitle')"
      heading-id="identity-hero-heading"
      variant="dark"
    >
      <template #after-subtitle>
        <div class="hero-breadcrumb">
          <Breadcrumb
            :crumbs="breadcrumbs"
            aria-label="Breadcrumb navigation"
          />
        </div>
      </template>
    </BaseHero>
    -->
    <!-- Intro strip -->
    <section
      id="identity-section"
      class="identity-intro-section"
      aria-labelledby="identity-intro-heading"
    >
      <div class="identity-intro-container">
        <div class="identity-intro-left">
          <p class="identity-intro-eyebrow">
            {{ t("servicesSubpages.visualIdentity.intro.eyebrow") }}
          </p>
          <h1 id="identity-intro-heading" class="identity-intro-heading">
            {{ t("servicesSubpages.visualIdentity.intro.heading") }}
          </h1>
        </div>
        <p class="identity-intro-body">
          {{ t("servicesSubpages.visualIdentity.intro.body") }}
        </p>
      </div>
    </section>
    <!-- Sticky Section Navigation -->
    <ServicesSectionNav
      :sections="navSections"
      :aria-label="t('servicesSubpages.visualIdentity.hero.badge')"
    />

    <!-- What You Get -->
    <section
      id="deliverables-section"
      ref="deliverablesRef"
      class="deliverables-section"
      aria-labelledby="deliverables-heading"
    >
      <div class="section-container">
        <SectionHeader
          :badge="t('servicesSubpages.visualIdentity.deliverables.badge')"
          :title="t('servicesSubpages.visualIdentity.deliverables.title')"
          :subtitle="t('servicesSubpages.visualIdentity.deliverables.subtitle')"
          heading-id="deliverables-heading"
          align="center"
        />

        <div
          class="deliverables-grid"
          :class="{ 'animate-in': deliverablesVisible }"
        >
          <article
            v-for="(item, index) in deliverables"
            :key="index"
            class="deliverable-card"
            :class="`stagger-${index + 1}`"
          >
            <!-- 0: Logo carousel -->
            <div
              v-if="index === 0"
              class="deliverable-image deliverable-carousel"
              :aria-label="item.placeholderDescription"
            >
              <TransitionGroup
                name="carousel-fade"
                tag="div"
                class="deliverable-carousel__track"
              >
                <NuxtImg
                  v-for="(src, i) in logoImages"
                  v-show="logoIndex === i"
                  :key="src"
                  :src="src"
                  :alt="`${item.title} - example ${i + 1} of ${logoImages.length}`"
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
                  :class="{
                    'deliverable-carousel__dot--active': logoIndex === i,
                  }"
                  :aria-label="`Show logo example ${i + 1}`"
                  @click="logoIndex = i"
                />
              </div>
            </div>

            <!-- 1: Colour palette static image -->
            <div
              v-else-if="index === 1"
              class="deliverable-image deliverable-static-img"
            >
              <NuxtImg
                src="/images/visual-identity/palette.png"
                :alt="item.placeholderDescription"
                format="webp"
                loading="lazy"
                class="deliverable-static-img__img"
              />
            </div>

            <!-- 2: Typography carousel -->
            <div
              v-else-if="index === 2"
              class="deliverable-image deliverable-carousel"
              :aria-label="item.placeholderDescription"
            >
              <TransitionGroup
                name="carousel-fade"
                tag="div"
                class="deliverable-carousel__track"
              >
                <NuxtImg
                  v-for="(src, i) in typographyImages"
                  v-show="typographyIndex === i"
                  :key="src"
                  :src="src"
                  :alt="`${item.title} - example ${i + 1} of ${typographyImages.length}`"
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
                  :class="{
                    'deliverable-carousel__dot--active': typographyIndex === i,
                  }"
                  :aria-label="`Show typography example ${i + 1}`"
                  @click="typographyIndex = i"
                />
              </div>
            </div>

            <!-- 3: Brand guidelines static image -->
            <div
              v-else-if="index === 3"
              class="deliverable-image deliverable-static-img"
            >
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

    <!-- How It Works -->
    <section
      id="process-section"
      ref="processRef"
      class="process-section"
      aria-labelledby="identity-process-heading"
    >
      <div class="section-container">
        <SectionHeader
          :badge="t('servicesSubpages.visualIdentity.process.badge')"
          :title="t('servicesSubpages.visualIdentity.process.title')"
          :subtitle="t('servicesSubpages.visualIdentity.process.subtitle')"
          heading-id="identity-process-heading"
          align="center"
        />

        <ol
          class="process-steps"
          :class="{ 'animate-in': processVisible }"
          role="list"
        >
          <li
            v-for="(step, index) in processSteps"
            :key="step.number"
            class="process-step"
            :class="`stagger-${index + 1}`"
          >
            <div class="step-number" aria-hidden="true">{{ step.number }}</div>
            <div class="step-content">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-description">{{ step.description }}</p>
            </div>
            <div
              v-if="index < processSteps.length - 1"
              class="step-connector"
              aria-hidden="true"
            />
          </li>
        </ol>
      </div>
    </section>

    <!-- Pricing highlights -->
    <section
      id="identity-pricing-section"
      ref="pricingRef"
      class="pricing-section"
      aria-labelledby="identity-pricing-heading"
    >
      <div class="pricing-container">
        <div class="pricing-layout" :class="{ 'animate-in': pricingVisible }">
          <!-- Left: intro copy -->
          <div class="pricing-intro">
            <p class="pricing-intro__badge">
              {{ t("servicesSubpages.visualIdentity.pricing.badge") }}
            </p>
            <h2 id="identity-pricing-heading" class="pricing-intro__title">
              {{ t("servicesSubpages.visualIdentity.pricing.introTitle") }}
            </h2>
            <div class="pricing-intro__body">
              <p
                v-for="(paragraph, i) in t(
                  'servicesSubpages.visualIdentity.pricing.introBody',
                ).split('\n\n')"
                :key="i"
              >
                {{ paragraph }}
              </p>
            </div>
            <p class="pricing-intro__footnote">
              {{ t("servicesSubpages.visualIdentity.pricing.footnote") }}
            </p>
          </div>

          <!-- Right: price list card -->
          <div class="pricing-card">
            <ul class="price-list" role="list">
              <li
                v-for="(item, index) in pricingHighlights"
                :key="index"
                class="price-row"
              >
                <span class="price-row__name">{{ item.name }}</span>
                <span class="price-row__price">
                  <span class="price-row__starts-at">{{
                    t("servicesSubpages.visualIdentity.pricing.startsAt")
                  }}</span>
                  <span class="price-row__currency">{{
                    t("servicesSubpages.visualIdentity.pricing.currency")
                  }}</span>
                  <span class="price-row__value">{{ item.price }}</span>
                </span>
              </li>
            </ul>

            <div class="pricing-footer">
              <p class="pricing-vat">
                {{ t("servicesSubpages.visualIdentity.pricing.vatNote") }}
              </p>
              <p class="pricing-full-list">
                {{ t("servicesSubpages.visualIdentity.pricing.fullListNote") }}
                <NuxtLink
                  :to="
                    t('servicesSubpages.visualIdentity.pricing.fullListHref')
                  "
                  class="pricing-full-list__link"
                >
                  {{
                    t(
                      "servicesSubpages.visualIdentity.pricing.fullListLinkText",
                    )
                  }}
                  <UIcon
                    name="i-heroicons-arrow-right"
                    class="pricing-full-list__icon"
                    aria-hidden="true"
                  />
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
    <!-- CTA -->
    <div id="identity-contact-section">
      <BaseCTASection
        :badge="t('servicesSubpages.visualIdentity.cta.badge')"
        :title="t('servicesSubpages.visualIdentity.cta.title')"
        :description="t('servicesSubpages.visualIdentity.cta.description')"
        :primary-text="t('servicesSubpages.visualIdentity.cta.primaryText')"
        primary-to="/contact"
        :secondary-text="t('servicesSubpages.visualIdentity.cta.secondaryText')"
        secondary-to="/services/website-packages"
        heading-id="identity-cta-heading"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.visual-identity-page {
  min-height: 100vh;
}

.hero-breadcrumb {
  margin-top: 2rem;
}

/* ── Intro strip ── */
.identity-intro-section {
  padding: 3rem 1.5rem;
  background: var(--color-section-light);

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
}

.identity-intro-container {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1.6fr;
    gap: 4rem;
    align-items: center;
  }
}

.identity-intro-eyebrow {
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent-500);
  margin-bottom: 0.75rem;
}

.identity-intro-heading {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.25;
  margin-bottom: 0;

  @media (min-width: 768px) {
    font-size: var(--text-3xl);
  }
}

.identity-intro-body {
  font-size: var(--text-sm);
  line-height: 1.75;
  color: var(--color-text-muted);

  @media (min-width: 768px) {
    font-size: var(--text-base);
  }
}

/* Offset smooth-scroll targets for sticky header + section nav */
#identity-section,
#deliverables-section,
#process-section,
#identity-pricing-section,
#identity-faq-section,
#identity-contact-section {
  scroll-margin-top: 136px;
}

// ─── Deliverables ────────────────────────────────────────────────────────────

.deliverables-section {
  padding: 6rem 1.5rem;
  background: var(--color-section-light);

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
  transform: translateY(32px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.stagger-1 {
    transition-delay: 50ms;
  }
  &.stagger-2 {
    transition-delay: 150ms;
  }
  &.stagger-3 {
    transition-delay: 250ms;
  }
  &.stagger-4 {
    transition-delay: 350ms;
  }
}

.deliverable-image {
  margin-bottom: 1.5rem;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

// ─── Carousel ────────────────────────────────────────────────────────────────

.deliverable-carousel {
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--color-surface-2);
  border: 1px solid var(--glass-border-subtle);
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
  background: color-mix(in srgb, var(--color-text-primary) 25%, transparent);
  cursor: pointer;
  transition:
    background 0.2s var(--ease-smooth),
    width 0.2s var(--ease-smooth);
  min-height: 0;

  &--active {
    width: 16px;
    border-radius: 3px;
    background: var(--color-primary-500);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
}

// ─── Static image ─────────────────────────────────────────────────────────────

.deliverable-static-img {
  aspect-ratio: 16 / 9;
  background: var(--color-surface-2);
  border: 1px solid var(--glass-border-subtle);
}

.deliverable-static-img__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  display: block;
}

// ─── Carousel transition ──────────────────────────────────────────────────────

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
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.625rem;
  line-height: 1.3;
}

.deliverable-description {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-text-muted);
}

// ─── Process ─────────────────────────────────────────────────────────────────

.process-section {
  padding: 6rem 1.5rem;
  background: var(--color-section-alt, var(--color-surface-2));

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 10rem 2rem;
  }
}

.process-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  position: relative;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }

  &.animate-in .process-step {
    opacity: 1;
    transform: translateY(0);
  }
}

.process-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2rem 0 0;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.stagger-1 {
    transition-delay: 100ms;
  }
  &.stagger-2 {
    transition-delay: 250ms;
  }
  &.stagger-3 {
    transition-delay: 400ms;
  }

  @media (min-width: 768px) {
    padding: 0 3rem 0 0;
  }
}

.step-number {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 800;
  line-height: 1;
  color: color-mix(in srgb, var(--color-primary-500) 25%, transparent);
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.625rem;
}

.step-description {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-text-muted);
}

/* Horizontal connector between steps on desktop */
.step-connector {
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    top: 1.5rem;
    right: 0;
    width: 2rem;
    height: 2px;
    background: linear-gradient(
      to right,
      color-mix(in srgb, var(--color-primary-400) 40%, transparent),
      color-mix(in srgb, var(--color-primary-400) 10%, transparent)
    );
  }
}

// ─── Pricing highlights ───────────────────────────────────────────────────────

.pricing-section {
  padding: 6rem 1.5rem;
  background: var(--color-section-light);

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 10rem 2rem;
  }
}

.pricing-container {
  max-width: 1200px;
  margin: 0 auto;
}

// Two-column layout: left=intro, right=card
.pricing-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: start;
  opacity: 0;
  transform: translateY(24px);
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

  @media (min-width: 1100px) {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 5rem;
  }
}

// ─── Left: intro copy ────────────────────────────────────────────────────────

.pricing-intro {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.pricing-intro__badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--badge-accent-bg);
  color: var(--badge-accent-text);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  width: fit-content;
  margin: 0;
}

.pricing-intro__title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
  margin: 0;

  @media (min-width: 768px) {
    font-size: var(--text-3xl);
  }
}

.pricing-intro__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: var(--text-base);
    line-height: 1.75;
    color: var(--color-text-muted);
    margin: 0;
  }
}

.pricing-intro__footnote {
  font-size: var(--text-xs);
  line-height: 1.6;
  color: var(--color-text-subtle);
  margin: 0;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-border);
}

// ─── Right: price list card ──────────────────────────────────────────────────

.pricing-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  overflow: hidden;
  position: sticky;
  top: 136px; /* sticky header + section nav offset */
}

.price-list {
  list-style: none;
  padding: 0 1.5rem;
  margin: 1.5rem 0 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 0 2rem;
    margin: 2rem 0 0;
  }
}

.price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--color-border);

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }
}

.price-row__name {
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-text);
  flex: 1;
}

.price-row__price {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
  flex-shrink: 0;
}

.price-row__starts-at {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-right: 0.2rem;
  font-style: italic;
}

.price-row__currency {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary-600);
}

.price-row__value {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-primary-600);
  font-variant-numeric: tabular-nums;
}

.pricing-footer {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid var(--color-border);

  @media (min-width: 768px) {
    padding: 1.25rem 2rem 2rem;
  }
}

.pricing-vat {
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
}

.pricing-full-list {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.pricing-full-list__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  color: var(--color-primary-600);
  text-decoration: none;
  margin-left: 0.25rem;
  min-height: 44px;
  transition: gap var(--duration-fast) var(--ease-smooth);

  &:hover {
    gap: 0.5rem;
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
    border-radius: 3px;
  }
}

.pricing-full-list__icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  transition: transform var(--duration-fast) var(--ease-smooth);

  .pricing-full-list__link:hover & {
    transform: translateX(3px);
  }
}

// ─── Dark mode ───────────────────────────────────────────────────────────────

:root.dark {
  .deliverables-section {
    background: var(--color-section-dark);
  }

  .pricing-section {
    background: var(--color-section-dark);
  }

  .pricing-card {
    background: var(--card-bg);
    border-color: var(--card-border);
  }

  .pricing-intro__footnote {
    border-top-color: var(--card-border);
  }

  .price-row__currency,
  .price-row__value {
    color: var(--color-primary-300);
  }

  .pricing-full-list__link {
    color: var(--color-primary-300);
  }
}

// ─── Reduced motion ──────────────────────────────────────────────────────────

@media (prefers-reduced-motion: reduce) {
  .deliverable-card,
  .process-step,
  .pricing-layout {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .pricing-full-list__link,
  .pricing-full-list__icon {
    transition: none;
  }

  .deliverable-carousel__dot {
    transition: none;
  }

  .carousel-fade-enter-active,
  .carousel-fade-leave-active {
    transition: none;
  }
}
</style>
