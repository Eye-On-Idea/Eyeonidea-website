<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { SectionNavItem } from "~/components/services/SectionNav.vue";

const { t, tm } = useI18n();

useSeoMeta({
  title: () => t("servicesSubpages.additionalServices.meta.title"),
  description: () => t("servicesSubpages.additionalServices.meta.description"),
  ogTitle: () => t("servicesSubpages.additionalServices.meta.title"),
  ogDescription: () =>
    t("servicesSubpages.additionalServices.meta.description"),
  ogType: "website",
  ogUrl: "https://eyeonidea.com/services/additional-services",
  twitterCard: "summary_large_image",
  twitterTitle: () => t("servicesSubpages.additionalServices.meta.title"),
  twitterDescription: () =>
    t("servicesSubpages.additionalServices.meta.description"),
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://eyeonidea.com/services/additional-services",
    },
  ],
});

const breadcrumbs = computed(() => [
  { label: "Home", to: "/" },
  {
    label: t("servicesSubpages.additionalServices.breadcrumb.services"),
    to: "/services",
  },
  { label: t("servicesSubpages.additionalServices.breadcrumb.current") },
]);

const navSections = computed<SectionNavItem[]>(() => [
  {
    id: "addons-intro-section",
    label: t("servicesSubpages.additionalServices.nav.intro"),
    icon: "i-heroicons-squares-2x2",
  },
  {
    id: "content-section",
    label: t("servicesSubpages.additionalServices.nav.content"),
    icon: "i-heroicons-document-text",
  },
  {
    id: "domain-section",
    label: t("servicesSubpages.additionalServices.nav.domain"),
    icon: "i-heroicons-globe-alt",
  },
  {
    id: "email-section",
    label: t("servicesSubpages.additionalServices.nav.email"),
    icon: "i-heroicons-envelope",
  },
  {
    id: "seo-consulting-section",
    label: t("servicesSubpages.additionalServices.nav.seoConsulting"),
    icon: "i-heroicons-magnifying-glass",
  },
  {
    id: "support-plans",
    label: t("servicesSubpages.additionalServices.nav.support"),
    icon: "i-heroicons-shield-check",
  },
]);

// ─── Intro tiles ──────────────────────────────────────────────────────────────

interface IntroTile {
  icon: string;
  title: string;
  body: string;
}

const introTiles = computed(
  () => tm("servicesSubpages.additionalServices.intro.tiles") as IntroTile[],
);

// ─── Section data ─────────────────────────────────────────────────────────────

interface SectionItem {
  name: string;
  price: string;
  unit: string;
  description: string;
}

interface SectionData {
  badge: string;
  title: string;
  intro: string[];
  items: SectionItem[];
}

const sectionKeys = ["content", "domain", "email", "seoConsulting"] as const;
type SectionKey = (typeof sectionKeys)[number];

const sectionIds: Record<SectionKey, string> = {
  content: "content-section",
  domain: "domain-section",
  email: "email-section",
  seoConsulting: "seo-consulting-section",
};

const getSectionData = (key: SectionKey): SectionData => ({
  badge: t(`servicesSubpages.additionalServices.sections.${key}.badge`),
  title: t(`servicesSubpages.additionalServices.sections.${key}.title`),
  intro: tm(
    `servicesSubpages.additionalServices.sections.${key}.intro`,
  ) as string[],
  items: tm(
    `servicesSubpages.additionalServices.sections.${key}.items`,
  ) as SectionItem[],
});

const sections = computed(() =>
  sectionKeys.map((key) => ({
    key,
    id: sectionIds[key],
    ...getSectionData(key),
  })),
);

const currency = computed(() => t("services.addons.currency"));
const vatNote = computed(() => t("services.addons.vatNote"));

// ─── Mobile collapse ──────────────────────────────────────────────────────────

const expandedSections = ref<Set<SectionKey>>(new Set(sectionKeys));

const isSectionExpanded = (key: SectionKey) => expandedSections.value.has(key);

const toggleSection = (key: SectionKey) => {
  const next = new Set(expandedSections.value);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  expandedSections.value = next;
};

// ─── Per-section IntersectionObserver ────────────────────────────────────────

const visibleSections = ref(new Set<SectionKey>());
const sectionRefs = ref<Partial<Record<SectionKey, HTMLElement>>>({});

const setSectionRef = (el: unknown, key: SectionKey) => {
  if (el instanceof HTMLElement) {
    sectionRefs.value[key] = el;
  }
};

onMounted(() => {
  const observers: IntersectionObserver[] = [];

  sectionKeys.forEach((key) => {
    const el = sectionRefs.value[key];
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.value = new Set([...visibleSections.value, key]);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08 },
    );

    observer.observe(el);
    observers.push(observer);
  });

  onUnmounted(() => observers.forEach((o) => o.disconnect()));
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatUnit = (unit: string): string => {
  const map: Record<string, string> = {
    "one-time": "",
    "per page": "/ page",
    "per hour": "/ hr",
    "per language": "/ language",
    "per year": "/ year",
    "per month": "/ mo",
    "per account / month": "/ account / mo",
    "per session": "/ session",
  };
  return map[unit] ?? unit;
};
</script>

<template>
  <div class="additional-services-page">
    <!-- Hero -->
    <BaseHero
      :badge="t('servicesSubpages.additionalServices.hero.badge')"
      :title="t('servicesSubpages.additionalServices.hero.title')"
      :subtitle="t('servicesSubpages.additionalServices.hero.subtitle')"
      heading-id="additional-hero-heading"
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

    <!-- Sticky Section Navigation -->
    <ServicesSectionNav
      :sections="navSections"
      :aria-label="t('servicesSubpages.additionalServices.hero.badge')"
    />

    <!-- Intro / TLDR section -->
    <section id="addons-intro-section" class="addons-intro-section" aria-labelledby="addons-intro-heading">
      <div class="addons-intro-inner">
        <div class="addons-intro-header">
          <p class="addons-intro-badge">
            {{ t("servicesSubpages.additionalServices.intro.badge") }}
          </p>
          <h2 id="addons-intro-heading" class="addons-intro-title">
            {{ t("servicesSubpages.additionalServices.intro.title") }}
          </h2>
        </div>
        <ul class="addons-intro-tiles" role="list">
          <li
            v-for="(tile, i) in introTiles"
            :key="i"
            class="addons-intro-tile"
          >
            <UIcon :name="tile.icon" class="addons-intro-tile__icon" aria-hidden="true" />
            <div>
              <p class="addons-intro-tile__title">{{ tile.title }}</p>
              <p class="addons-intro-tile__body">{{ tile.body }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Service sections — one full-width section per category -->
    <section
      v-for="section in sections"
      :key="section.key"
      :id="section.id"
      class="service-section"
      :class="{ 'animate-in': visibleSections.has(section.key) }"
      :ref="(el) => setSectionRef(el, section.key)"
      :aria-labelledby="`section-heading-${section.key}`"
    >
      <div class="section-inner">
        <!-- Left: label, heading, intro, mobile toggle -->
        <div class="section-left">
          <button
            type="button"
            class="section-toggle"
            :aria-expanded="isSectionExpanded(section.key)"
            :aria-controls="`section-body-${section.key}`"
            @click="toggleSection(section.key)"
          >
            <div class="section-toggle__text">
              <h2 :id="`section-heading-${section.key}`" class="section-title">
                {{ section.title }}
              </h2>
            </div>
            <UIcon
              name="i-heroicons-chevron-down"
              class="section-chevron"
              :class="{
                'section-chevron--open': isSectionExpanded(section.key),
              }"
              aria-hidden="true"
            />
          </button>

          <div class="section-intro">
            <p
              v-for="(para, i) in section.intro"
              :key="i"
              class="section-intro__para"
            >
              {{ para }}
            </p>
          </div>
        </div>

        <!-- Right: price list -->
        <div
          :id="`section-body-${section.key}`"
          class="section-right"
          :class="{ 'section-right--open': isSectionExpanded(section.key) }"
        >
          <ul class="price-list" role="list">
            <li
              v-for="(item, itemIndex) in section.items"
              :key="itemIndex"
              class="price-row"
            >
              <div class="price-row__top">
                <span class="price-row__name">{{ item.name }}</span>
                <span class="price-row__price">
                  <span class="price-row__value"
                    >{{ currency }}{{ item.price }}</span
                  >
                  <span v-if="formatUnit(item.unit)" class="price-row__unit">
                    {{ formatUnit(item.unit) }}
                  </span>
                </span>
              </div>
              <p class="price-row__description">{{ item.description }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- VAT note -->
    <div class="vat-note-wrapper">
      <p class="vat-note">{{ vatNote }}</p>
    </div>

    <!-- Support Plans -->
    <ServicesSupportPlans />
    <ProcessFAQ />
    <!-- CTA -->
    <BaseCTASection
      :badge="t('servicesSubpages.additionalServices.cta.badge')"
      :title="t('servicesSubpages.additionalServices.cta.title')"
      :description="t('servicesSubpages.additionalServices.cta.description')"
      :primary-text="t('servicesSubpages.additionalServices.cta.primaryText')"
      primary-to="/contact"
      :secondary-text="
        t('servicesSubpages.additionalServices.cta.secondaryText')
      "
      secondary-to="/services/website-packages"
      heading-id="additional-cta-heading"
    />
  </div>
</template>

<style lang="scss" scoped>
.additional-services-page {
  min-height: 100vh;
}

.hero-breadcrumb {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

// ─── Scroll-margin for sticky header + section nav ────────────────────────────

#addons-intro-section,
#content-section,
#domain-section,
#email-section,
#seo-consulting-section,
:deep(#support-plans) {
  scroll-margin-top: 136px;
}

// ─── Intro / TLDR section ─────────────────────────────────────────────────────

.addons-intro-section {
  padding: 4rem 1.5rem;
  background: var(--color-section-alt, var(--color-surface-2));
  border-bottom: 1px solid var(--color-border);

  @media (min-width: 768px) {
    padding: 5rem 2rem;
  }
}

.addons-intro-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 900px) {
    grid-template-columns: auto 1fr;
    gap: 4rem;
    align-items: start;
  }
}

.addons-intro-header {
  @media (min-width: 900px) {
    max-width: 260px;
  }
}

.addons-intro-badge {
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent-500);
  margin-bottom: 0.75rem;
}

.addons-intro-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
  margin: 0;

  @media (min-width: 768px) {
    font-size: var(--text-3xl);
  }
}

.addons-intro-tiles {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.addons-intro-tile {
  display: flex;
  gap: 0.875rem;
  align-items: flex-start;
  padding: 1.25rem 0;
  border-top: 1px solid var(--color-border);

  @media (min-width: 640px) {
    padding: 1.25rem 1.5rem 1.25rem 0;
  }
}

.addons-intro-tile__icon {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  color: var(--color-accent-500);
  margin-top: 0.2rem;
}

.addons-intro-tile__title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.addons-intro-tile__body {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-muted);
  margin: 0;
}

// ─── Individual service sections ─────────────────────────────────────────────

.service-section {
  padding: 6rem 1.5rem;
  background: var(--color-section-light);
  border-top: 1px solid var(--color-border);

  // Staggered fade-in per section
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.65s var(--ease-smooth),
    transform 0.65s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 10rem 2rem;
  }
}

// ─── Two-column inner grid ───────────────────────────────────────────────────

.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0; // mobile: left flows into right (right collapses)

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 3fr;
    gap: 6rem;
    align-items: start;
  }
}

// ─── Left column ─────────────────────────────────────────────────────────────

.section-left {
  // On desktop, sticky top so intro stays aligned while scrolling through long lists
  @media (min-width: 1024px) {
    position: sticky;
    top: 160px; // header + section nav + a little breathing room
  }
}

// Toggle button (acts as heading on mobile, non-interactive on desktop)
.section-toggle {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  min-height: 44px; // WCAG 2.5.5 touch target
  font: inherit;
  text-align: left;
  cursor: pointer;
  margin-bottom: 1.25rem;

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 4px;
    border-radius: 4px;
  }

  // Desktop: not interactive
  @media (min-width: 1024px) {
    pointer-events: none;
    cursor: default;
  }
}

.section-toggle__text {
  flex: 1;
  min-width: 0;
}

.section-badge {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent-600);
  margin-bottom: 0.625rem;
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
  margin: 0;

  @media (min-width: 1024px) {
    font-size: var(--text-3xl);
  }
}

.section-chevron {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  color: var(--color-text-muted);
  margin-top: 6px; // optical alignment with first title line
  transition: transform var(--duration-fast) var(--ease-smooth);

  &--open {
    transform: rotate(180deg);
  }

  // Hidden on desktop (always expanded)
  @media (min-width: 1024px) {
    display: none;
  }
}

.section-intro {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;

  // On mobile: hide when section is collapsed (chevron closed)
  // The intro is always visible — only the price list collapses
  @media (max-width: 1023px) {
    margin-bottom: 0;
  }
}

.section-intro__para {
  font-size: var(--text-sm);
  line-height: 1.8;
  color: var(--color-text-muted);
  margin: 0;

  @media (min-width: 1024px) {
    font-size: var(--text-base);
  }
}

// ─── Right column — price list ────────────────────────────────────────────────

.section-right {
  // Mobile: collapsible
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s var(--ease-smooth);

  &--open {
    max-height: 3200px;
  }

  // Desktop: always visible
  @media (min-width: 1024px) {
    max-height: none !important;
    overflow: visible;
  }
}

// ─── Price list ───────────────────────────────────────────────────────────────

.price-list {
  list-style: none;
  padding: 0;
  margin: 0;

  // Mobile: add top spacing after intro
  @media (max-width: 1023px) {
    margin-top: 1.5rem;
  }
}

.price-row {
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--color-border);

  &:first-child {
    border-top: 1px solid var(--color-border);
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.price-row__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 0.375rem;
}

.price-row__name {
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text);
  flex: 1;

  @media (min-width: 1024px) {
    font-size: var(--text-base);
  }
}

.price-row__price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  flex-shrink: 0;
  text-align: right;
}

.price-row__value {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary-600);
  font-variant-numeric: tabular-nums;

  @media (min-width: 1024px) {
    font-size: var(--text-base);
  }
}

.price-row__unit {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.price-row__description {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-subtle);
  margin: 0;
}

// ─── VAT note ─────────────────────────────────────────────────────────────────

.vat-note-wrapper {
  background: var(--color-section-light);
  padding: 0 1.5rem 4rem;

  @media (min-width: 768px) {
    padding: 0 2rem 5rem;
  }
}

.vat-note {
  max-width: 1200px;
  margin: 0 auto;
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
}

// ─── Dark mode ────────────────────────────────────────────────────────────────

:root.dark {
  .addons-intro-section {
    background: var(--color-section-dark);
    border-bottom-color: rgba(255, 255, 255, 0.08);
  }

  .addons-intro-tile {
    border-top-color: rgba(255, 255, 255, 0.08);
  }

  .service-section {
    background: var(--color-section-dark);
    border-top-color: rgba(255, 255, 255, 0.08);
  }

  .section-badge {
    color: var(--color-accent-400);
  }

  .price-row {
    border-color: rgba(255, 255, 255, 0.08);

    &:first-child {
      border-top-color: rgba(255, 255, 255, 0.08);
    }
  }

  .price-row__value {
    color: var(--color-primary-300);
  }

  .vat-note-wrapper {
    background: var(--color-section-dark);
  }

  .vat-note {
    border-top-color: rgba(255, 255, 255, 0.08);
  }
}

// ─── Reduced motion ──────────────────────────────────────────────────────────

@media (prefers-reduced-motion: reduce) {
  .service-section {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .section-right {
    transition: none;
  }

  .section-chevron {
    transition: none;
  }
}
</style>
