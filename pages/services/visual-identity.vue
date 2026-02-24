<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { SectionNavItem } from "~/components/services/SectionNav.vue";
import { staggeredFadeInUp } from "~/composables/useAccessibleMotion";

const { t, tm } = useI18n();

useSeoMeta({
  title: () => t("servicesSubpages.visualIdentity.meta.title"),
  description: () => t("servicesSubpages.visualIdentity.meta.description"),
  ogTitle: () => t("servicesSubpages.visualIdentity.meta.title"),
  ogDescription: () => t("servicesSubpages.visualIdentity.meta.description"),
  ogType: "website",
  ogUrl: "https://eyeonidea.com/services/visual-identity",
  twitterCard: "summary_large_image",
  twitterTitle: () => t("servicesSubpages.visualIdentity.meta.title"),
  twitterDescription: () => t("servicesSubpages.visualIdentity.meta.description"),
});

useHead({
  link: [{ rel: "canonical", href: "https://eyeonidea.com/services/visual-identity" }],
});

const breadcrumbs = computed(() => [
  { label: "Home", to: "/" },
  { label: t("servicesSubpages.visualIdentity.breadcrumb.services"), to: "/services" },
  { label: t("servicesSubpages.visualIdentity.breadcrumb.current") },
]);

const navSections = computed<SectionNavItem[]>(() => [
  { id: "identity-section",         label: t("servicesSubpages.visualIdentity.nav.overview"),     icon: "i-heroicons-paint-brush" },
  { id: "deliverables-section",     label: t("servicesSubpages.visualIdentity.nav.deliverables"), icon: "i-heroicons-gift" },
  { id: "process-section",          label: t("servicesSubpages.visualIdentity.nav.process"),      icon: "i-heroicons-arrow-path" },
  { id: "identity-pricing-section", label: t("servicesSubpages.visualIdentity.nav.pricing"),      icon: "i-heroicons-banknotes" },
]);

interface DeliverableItem {
  title: string;
  description: string;
  placeholderDescription: string;
}

const deliverables = computed(() =>
  tm("servicesSubpages.visualIdentity.deliverables.items") as DeliverableItem[]
);

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const processSteps = computed(() =>
  tm("servicesSubpages.visualIdentity.process.steps") as ProcessStep[]
);

interface PricingHighlight {
  name: string;
  price: string;
  unit: string;
}

const pricingHighlights = computed(() =>
  tm("servicesSubpages.visualIdentity.pricing.highlights") as PricingHighlight[]
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

  if (deliverablesRef.value) deliverablesObserver.observe(deliverablesRef.value);
  if (processRef.value) processObserver.observe(processRef.value);
  if (pricingRef.value) pricingObserver.observe(pricingRef.value);

  onUnmounted(() => {
    deliverablesObserver.disconnect();
    processObserver.disconnect();
    pricingObserver.disconnect();
  });
});
</script>

<template>
  <div class="visual-identity-page">

    <!-- Hero -->
    <BaseHero
      :badge="t('servicesSubpages.visualIdentity.hero.badge')"
      :title="t('servicesSubpages.visualIdentity.hero.title')"
      :subtitle="t('servicesSubpages.visualIdentity.hero.subtitle')"
      heading-id="identity-hero-heading"
      variant="dark"
    >
      <template #after-subtitle>
        <div class="hero-breadcrumb">
          <Breadcrumb :crumbs="breadcrumbs" aria-label="Breadcrumb navigation" />
        </div>
      </template>
    </BaseHero>

    <!-- Sticky Section Navigation -->
    <ServicesSectionNav
      :sections="navSections"
      :aria-label="t('servicesSubpages.visualIdentity.hero.badge')"
    />

    <!-- Overview + Carousel (existing component) -->
    <ServicesIdentitySection />

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

        <div class="deliverables-grid" :class="{ 'animate-in': deliverablesVisible }">
          <article
            v-for="(item, index) in deliverables"
            :key="index"
            class="deliverable-card"
            :class="`stagger-${index + 1}`"
          >
            <!-- Image placeholder: real brand work screenshots will replace these -->
            <BaseImagePlaceholder
              :description="item.placeholderDescription"
              ratio="video"
              class="deliverable-image"
            />
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
            <div v-if="index < processSteps.length - 1" class="step-connector" aria-hidden="true" />
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
        <SectionHeader
          :badge="t('servicesSubpages.visualIdentity.pricing.badge')"
          :title="t('servicesSubpages.visualIdentity.pricing.title')"
          :subtitle="t('servicesSubpages.visualIdentity.pricing.subtitle')"
          heading-id="identity-pricing-heading"
          align="center"
        />

        <div class="pricing-card" :class="{ 'animate-in': pricingVisible }">
          <ul class="price-list" role="list">
            <li
              v-for="(item, index) in pricingHighlights"
              :key="index"
              class="price-row"
            >
              <span class="price-row__name">{{ item.name }}</span>
              <span class="price-row__price">
                <span class="price-row__currency">{{ t('servicesSubpages.visualIdentity.pricing.currency') }}</span>
                <span class="price-row__value">{{ item.price }}</span>
                <span class="price-row__unit">{{ item.unit }}</span>
              </span>
            </li>
          </ul>

          <div class="pricing-footer">
            <p class="pricing-vat">{{ t('servicesSubpages.visualIdentity.pricing.vatNote') }}</p>
            <p class="pricing-full-list">
              {{ t('servicesSubpages.visualIdentity.pricing.fullListNote') }}
              <NuxtLink
                :to="t('servicesSubpages.visualIdentity.pricing.fullListHref')"
                class="pricing-full-list__link"
              >
                {{ t('servicesSubpages.visualIdentity.pricing.fullListLinkText') }}
                <UIcon name="i-heroicons-arrow-right" class="pricing-full-list__icon" aria-hidden="true" />
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
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
</template>

<style lang="scss" scoped>
.visual-identity-page {
  min-height: 100vh;
}

.hero-breadcrumb {
  margin-top: 2rem;
}

/* Offset smooth-scroll targets for sticky header + section nav */
:deep(#identity-section),
:deep(#deliverables-section),
:deep(#process-section),
:deep(#identity-pricing-section) {
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

  &.stagger-1 { transition-delay: 50ms; }
  &.stagger-2 { transition-delay: 150ms; }
  &.stagger-3 { transition-delay: 250ms; }
  &.stagger-4 { transition-delay: 350ms; }
}

.deliverable-image {
  margin-bottom: 1.5rem;
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

  &.stagger-1 { transition-delay: 100ms; }
  &.stagger-2 { transition-delay: 250ms; }
  &.stagger-3 { transition-delay: 400ms; }

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
  background: var(--color-section-alt, var(--color-surface-2));

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 10rem 2rem;
  }
}

.pricing-container {
  max-width: 700px;
  margin: 0 auto;
}

.pricing-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.price-list {
  list-style: none;
  padding: 0 2rem;
  margin: 2rem 0 0;
  display: flex;
  flex-direction: column;
}

.price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--color-border);

  &:first-child {
    padding-top: 0;
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
  gap: 0.125rem;
  flex-shrink: 0;
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

.price-row__unit {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-left: 0.25rem;
}

.pricing-footer {
  padding: 1.25rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
  min-height: 44px; // WCAG 2.5.5 touch target
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

  .pricing-card {
    background: var(--card-bg);
    border-color: var(--card-border);
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
  .pricing-card {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .pricing-full-list__link,
  .pricing-full-list__icon {
    transition: none;
  }
}
</style>
