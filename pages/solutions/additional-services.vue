<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { SectionNavItem } from "~/components/services/SectionNav.vue";

const { t, tm } = useI18n();
const localePath = useLocalePath();

useSeo({
  title: () => t("servicesSubpages.additionalServices.meta.title"),
  description: () => t("servicesSubpages.additionalServices.meta.description"),
  type: "website",
  schemaType: "WebPage",
  includeWebSiteSchema: false,
  breadcrumbs: [
    { name: "Home", url: "https://eyeonidea.com" },
    { name: t("servicesSubpages.additionalServices.breadcrumb.services"), url: "https://eyeonidea.com/solutions" },
    {
      name: t("servicesSubpages.additionalServices.breadcrumb.current"),
      url: "https://eyeonidea.com/solutions/additional-services",
    },
  ],
});

const navSections = computed<SectionNavItem[]>(() => [
  { id: "addons-intro-section",   label: t("servicesSubpages.additionalServices.nav.intro") },
  { id: "content-section",        label: t("servicesSubpages.additionalServices.nav.content") },
  { id: "domain-section",         label: t("servicesSubpages.additionalServices.nav.domain") },
  { id: "email-section",          label: t("servicesSubpages.additionalServices.nav.email") },
  { id: "seo-consulting-section", label: t("servicesSubpages.additionalServices.nav.seoConsulting") },
  { id: "support-plans",          label: t("servicesSubpages.additionalServices.nav.support") },
]);

// ─── Intro tiles ─────────────────────────────────────────────────
interface IntroTile {
  icon: string;
  title: string;
  body: string;
}

const introTiles = computed(
  () => tm("servicesSubpages.additionalServices.intro.tiles") as IntroTile[],
);

// ─── Section data ─────────────────────────────────────────────────
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
  intro: tm(`servicesSubpages.additionalServices.sections.${key}.intro`) as string[],
  items: tm(`servicesSubpages.additionalServices.sections.${key}.items`) as SectionItem[],
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

// ─── Mobile collapse ─────────────────────────────────────────────
const expandedSections = ref<Set<SectionKey>>(new Set(sectionKeys));
const isSectionExpanded = (key: SectionKey) => expandedSections.value.has(key);
const toggleSection = (key: SectionKey) => {
  const next = new Set(expandedSections.value);
  if (next.has(key)) { next.delete(key); } else { next.add(key); }
  expandedSections.value = next;
};

// ─── Visibility observers ─────────────────────────────────────────
const visibleSections = ref(new Set<SectionKey>());
const sectionRefs = ref<Partial<Record<SectionKey, HTMLElement>>>({});
const setSectionRef = (el: unknown, key: SectionKey) => {
  if (el instanceof HTMLElement) sectionRefs.value[key] = el;
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

// ─── Helpers ─────────────────────────────────────────────────────
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

    <!-- ── Hero ──────────────────────────────────────── -->
    <PageHero
      heading-id="addons-hero-heading"
      :badge="t('servicesSubpages.additionalServices.hero.badge')"
      :title="t('servicesSubpages.additionalServices.hero.title')"
      :subtitle="t('servicesSubpages.additionalServices.hero.subtitle')"
      bg-image="/images/additional-services/hero.jpg"
    >
      <template #cta>
        <AppCtaButton variant="primary" :to="localePath('/contact')" :show-icon="true">
          {{ t("servicesSubpages.additionalServices.cta.primaryText") }}
        </AppCtaButton>
        <AppCtaButton variant="secondary" :to="localePath('/solutions')">
          {{ t("servicesSubpages.additionalServices.breadcrumb.services") }}
        </AppCtaButton>
      </template>
    </PageHero>

    <!-- ── Sticky nav ─────────────────────────────────── -->
    <ServicesSectionNav
      :sections="navSections"
      :aria-label="t('servicesSubpages.additionalServices.hero.badge')"
    />

    <!-- ── Intro tiles ────────────────────────────────── -->
    <section id="addons-intro-section" class="addons-intro-section" aria-labelledby="addons-intro-heading">
      <div class="section-label-row" aria-hidden="true">
        <span class="sep-line" />
        <span class="sep-diamond" />
        <span class="sep-text">{{ t("servicesSubpages.additionalServices.intro.badge") }}</span>
        <span class="sep-diamond" />
        <span class="sep-line" />
      </div>

      <div class="intro-container">
        <h2 id="addons-intro-heading" class="section-title">
          {{ t("servicesSubpages.additionalServices.intro.title") }}
        </h2>

        <ul class="intro-tiles" role="list">
          <li v-for="(tile, i) in introTiles" :key="i" class="intro-tile">
            <div class="tile-numeral-row" aria-hidden="true">
              <span class="tile-rule" />
              <span class="tile-diamond" />
              <span class="tile-rule" />
            </div>
            <p class="tile-title">{{ tile.title }}</p>
            <p class="tile-body">{{ tile.body }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- ── Service sections ───────────────────────────── -->
    <section
      v-for="section in sections"
      :key="section.key"
      :id="section.id"
      class="service-section"
      :class="{ 'animate-in': visibleSections.has(section.key) }"
      :ref="(el) => setSectionRef(el, section.key)"
      :aria-labelledby="`section-heading-${section.key}`"
    >
      <!-- Section label row -->
      <div class="section-label-row" aria-hidden="true">
        <span class="sep-line" />
        <span class="sep-diamond" />
        <span class="sep-text">{{ section.badge }}</span>
        <span class="sep-diamond" />
        <span class="sep-line" />
      </div>

      <div class="service-inner">
        <!-- Left column -->
        <div class="service-left">
          <button
            type="button"
            class="section-toggle"
            :aria-expanded="isSectionExpanded(section.key)"
            :aria-controls="`section-body-${section.key}`"
            @click="toggleSection(section.key)"
          >
            <h2 :id="`section-heading-${section.key}`" class="service-title">
              {{ section.title }}
            </h2>
            <span
              class="section-chevron"
              :class="{ 'section-chevron--open': isSectionExpanded(section.key) }"
              aria-hidden="true"
            >▾</span>
          </button>

          <div class="service-intro">
            <p
              v-for="(para, i) in section.intro"
              :key="i"
              class="service-intro__para"
            >
              {{ para }}
            </p>
          </div>
        </div>

        <!-- Right column: price list -->
        <div
          :id="`section-body-${section.key}`"
          class="service-right"
          :class="{ 'service-right--open': isSectionExpanded(section.key) }"
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
                  <span class="price-row__value">{{ currency }}{{ item.price }}</span>
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

    <!-- ── VAT note ───────────────────────────────────── -->
    <div class="vat-note-wrapper">
      <p class="vat-note">{{ vatNote }}</p>
    </div>

    <!-- ── Support Plans ──────────────────────────────── -->
    <ServicesSupportPlans />

    <!-- ── FAQ ───────────────────────────────────────── -->
    <ProcessFAQ />

    <!-- ── CTA ───────────────────────────────────────── -->
    <ServicesCTA />
  </div>
</template>

<style lang="scss" scoped>
.additional-services-page {
  min-height: 100vh;
  background: #0d0908;
}

/* Scroll margin */
#addons-intro-section,
#content-section,
#domain-section,
#email-section,
#seo-consulting-section,
:deep(#support-plans) {
  scroll-margin-top: 136px;
}


/* ── Section label row ────────────────────────────────────────── */
.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 2rem 3rem;
}

/* ── Shared title ─────────────────────────────────────────────── */
.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  line-height: 1.1;
  color: #fff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}

/* ── Intro tiles ──────────────────────────────────────────────── */
.addons-intro-section {
  background: #0d0908;
  padding-bottom: 0;
}

.intro-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

.intro-tiles {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
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

.intro-tile {
  padding: 2rem 2rem 2.5rem;
  border-right: 1px solid rgba(223, 175, 133, 0.08);
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);

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

.tile-numeral-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.875rem;
}

.tile-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.tile-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.tile-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(0.95rem, 1.1vw, 1rem);
  color: #ffeddf;
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
}

.tile-body {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 0.85rem;
  line-height: 1.65;
  color: rgba(255, 237, 223, 0.5);
  margin: 0;
}

/* ── Service sections ─────────────────────────────────────────── */
.service-section {
  background: #0d0908;
  padding-bottom: 0;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.65s var(--ease-smooth),
    transform 0.65s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 3fr;
    gap: 6rem;
    align-items: start;
  }
}

/* ── Service left ─────────────────────────────────────────────── */
.service-left {
  @media (min-width: 1024px) {
    position: sticky;
    top: 160px;
  }
}

.section-toggle {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  min-height: 44px;
  font: inherit;
  text-align: left;
  cursor: pointer;
  margin-bottom: 1.25rem;

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 4px;
    border-radius: 2px;
  }

  @media (min-width: 1024px) {
    pointer-events: none;
    cursor: default;
  }
}

.service-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  line-height: 1.15;
  color: #fff;
  margin: 0;
  letter-spacing: -0.02em;
}

.section-chevron {
  flex-shrink: 0;
  font-size: 1.25rem;
  color: rgba(223, 175, 133, 0.4);
  margin-top: 4px;
  transition: transform 0.25s ease;
  line-height: 1;

  &--open { transform: rotate(180deg); }

  @media (min-width: 1024px) { display: none; }
}

.service-intro {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.service-intro__para {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.875rem, 1vw, 0.95rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.5);
  margin: 0;
}

/* ── Service right ────────────────────────────────────────────── */
.service-right {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s var(--ease-smooth);

  &--open { max-height: 3200px; }

  @media (min-width: 1024px) {
    max-height: none !important;
    overflow: visible;
  }
}

/* ── Price list ───────────────────────────────────────────────── */
.price-list {
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 1023px) {
    margin-top: 1.5rem;
  }
}

.price-row {
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(223, 175, 133, 0.06);

  &:first-child {
    border-top: 1px solid rgba(223, 175, 133, 0.06);
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
  font-family: var(--font-text);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.4;
  color: rgba(255, 237, 223, 0.75);
  flex: 1;

  @media (min-width: 1024px) {
    font-size: 0.95rem;
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
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: #dfaf85;
  font-variant-numeric: tabular-nums;
}

.price-row__unit {
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: rgba(255, 237, 223, 0.35);
}

.price-row__description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 0.8rem;
  line-height: 1.6;
  color: rgba(255, 237, 223, 0.35);
  margin: 0;
}

/* ── VAT note ─────────────────────────────────────────────────── */
.vat-note-wrapper {
  background: #0d0908;
  padding: 0 2rem 4rem;
  max-width: 80rem;
  margin: 0 auto;
}

.vat-note {
  font-family: var(--font-text);
  font-size: 0.8rem;
  color: rgba(255, 237, 223, 0.25);
  border-top: 1px solid rgba(223, 175, 133, 0.08);
  padding-top: 1.25rem;
  margin: 0;
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .service-section {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .service-right,
  .section-chevron {
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .additional-services-page { background: var(--color-section-light); }

  /* Shared separator rows */
  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title { color: var(--color-text-primary); }

  /* Intro tiles section — alt gradient for variety */
  .addons-intro-section { background: var(--color-section-alt); }

  .intro-tiles {
    border-top-color: var(--deco-line);
  }

  .intro-tile {
    border-right-color: var(--deco-line);
    border-bottom-color: var(--deco-line);
  }

  .tile-rule    { background: var(--deco-line); }
  .tile-diamond { background: var(--deco-diamond); }
  .tile-title   { color: var(--color-text-primary); }
  .tile-body    { color: var(--color-text-subtle); }

  /* Individual service sections */
  .service-section { background: var(--color-section-light); }

  .service-title      { color: var(--color-text-primary); }
  .section-chevron    { color: rgba(153, 82, 38, 0.4); }
  .service-intro__para { color: var(--color-text-subtle); }

  /* Price rows */
  .price-row {
    border-bottom-color: var(--deco-line);
    &:first-child { border-top-color: var(--deco-line); }
  }

  .price-row__name        { color: var(--color-text-secondary); }
  .price-row__value       { color: var(--color-primary-700); }
  .price-row__unit        { color: var(--color-text-subtle); }
  .price-row__description { color: var(--color-text-subtle); }

  /* VAT note */
  .vat-note-wrapper { background: var(--color-section-light); }
  .vat-note {
    color: var(--color-text-muted);
    border-top-color: var(--deco-line);
  }
}
</style>
