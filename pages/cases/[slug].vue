<script setup lang="ts">
import { animationPresets, withDelay } from "~/composables/useAccessibleMotion";
import { useWindowScroll, usePreferredReducedMotion } from "@vueuse/core";

const route = useRoute();
const { t, tm, locale } = useI18n();

interface BeforeAfterMetric {
  label: string;
  before: string;
  after: string;
  unit: string;
  improved: boolean;
}

interface CaseStudy {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  company: string;
  role: string;
  year: string;
  duration?: string;
  url?: string;
  thumbnail?: string;
  hero?: string;
  tags?: string[];
  overview: {
    challenge: string;
    solution: string;
    outcome: string;
  };
  keyMetrics?: Array<{ label: string; value: string; description?: string }>;
  technologies?: string[];
  process?: Array<{
    phase: string;
    description: string;
    deliverables?: string[];
  }>;
  challenges?: Array<{
    title: string;
    problem: string;
    solution: string;
  }>;
  results?: { summary: string; highlights?: string[] };
  gallery?: string[];
  beforeAfter?: {
    title: string;
    subtitle: string;
    beforeLabel: string;
    afterLabel: string;
    metrics: BeforeAfterMetric[];
  };
  category?: string;
}

// Gallery modal state
const isGalleryOpen = ref(false);
const selectedImageIndex = ref(0);

const openGallery = (index: number) => {
  selectedImageIndex.value = index;
  isGalleryOpen.value = true;
};

const closeGallery = () => {
  isGalleryOpen.value = false;
};

// Parallax scroll tracking
const prefersReducedMotion = usePreferredReducedMotion();
const { y: scrollY } = useWindowScroll();
const heroParallax = computed(() =>
  prefersReducedMotion.value === "reduce" ? "none" : `translateY(${scrollY.value * 0.25}px)`
);
const orbParallax = computed(() =>
  prefersReducedMotion.value === "reduce" ? "none" : `translateY(${scrollY.value * -0.12}px)`
);

// Case data
const caseStudy = computed<CaseStudy | undefined>(() => {
  const slug = route.params.slug as string;
  const all = tm("caseStudies") as Record<string, unknown>;
  const data = all[slug];
  return data && typeof data === "object" ? (data as CaseStudy) : undefined;
});

const caseStudies = computed<CaseStudy[]>(() => {
  const studies = tm("casesIndex") as unknown;
  if (Array.isArray(studies)) return studies as CaseStudy[];
  if (studies && typeof studies === "object") return Object.values(studies) as CaseStudy[];
  return [];
});

if (import.meta.client && !caseStudy.value) {
  navigateTo("/cases");
}

const config = useRuntimeConfig();
const baseUrl = config.public.siteUrl || "https://eyeonidea.com";

useSeo({
  title: caseStudy.value
    ? `${caseStudy.value.title} | Our Work`
    : t("cases.metaTitle"),
  description:
    caseStudy.value?.overview.challenge || t("cases.metaDescription"),
  keywords: caseStudy.value?.tags || [],
  type: "portfolio",
  image: caseStudy.value?.thumbnail
    ? `${baseUrl}${caseStudy.value.thumbnail}`
    : undefined,
  publishedTime: caseStudy.value?.year
    ? `${caseStudy.value.year}-01-01`
    : undefined,
  breadcrumbs: [
    { name: "Home", url: `${baseUrl}` },
    { name: t("cases.metaTitle"), url: `${baseUrl}/cases` },
    {
      name: caseStudy.value?.title || "Case Study",
      url: `${baseUrl}/cases/${route.params.slug}`,
    },
  ],
  structuredData: caseStudy.value
    ? {
        "@type": "CreativeWork",
        "@id": `${baseUrl}/cases/${caseStudy.value.slug}`,
        name: caseStudy.value.title,
        description: caseStudy.value.overview.challenge,
        creator: {
          "@type": "Organization",
          name: "Eye On Idea",
          url: baseUrl,
        },
        image: caseStudy.value.thumbnail
          ? `${baseUrl}${caseStudy.value.thumbnail}`
          : undefined,
        keywords: caseStudy.value.tags?.join(", "),
        inLanguage: locale.value,
      }
    : undefined,
});

const currentIndex = computed(() =>
  caseStudies.value.findIndex((c) => c.slug === route.params.slug),
);

const nextCase = computed<CaseStudy | undefined>(() => {
  if (!caseStudies.value.length) return undefined;
  if (currentIndex.value === -1) return caseStudies.value[0];
  const nextIndex = (currentIndex.value + 1) % caseStudies.value.length;
  return caseStudies.value[nextIndex];
});

const previousCase = computed<CaseStudy | undefined>(() => {
  if (!caseStudies.value.length) return undefined;
  if (currentIndex.value === -1) return caseStudies.value[caseStudies.value.length - 1];
  const prevIndex =
    currentIndex.value === 0
      ? caseStudies.value.length - 1
      : currentIndex.value - 1;
  return caseStudies.value[prevIndex];
});

const isOwnBrand = (company: string) =>
  company === "Eye On Idea" || company === "Herqulez";

const getBadgeLabel = (company: string) => {
  if (company === "Eye On Idea") return t("cases.badges.eyeOnIdea");
  if (company === "Herqulez") return t("cases.badges.herqulez");
  return company;
};
</script>

<template>
  <div
    v-if="!caseStudy"
    class="cs-loading"
    role="status"
    aria-live="polite"
  >
    <UIcon name="i-lucide-loader-2" class="cs-loading__icon" />
    <p class="cs-loading__text">Loading case study...</p>
  </div>

  <div v-else class="cs-page">

    <!-- ─── HERO ─────────────────────────────────────────────── -->
    <section class="cs-hero" aria-labelledby="cs-hero-title">
      <!-- Parallax background layer -->
      <div class="cs-hero__bg" aria-hidden="true" :style="{ transform: orbParallax }">
        <div class="cs-hero__orb cs-hero__orb--1" />
        <div class="cs-hero__orb cs-hero__orb--2" />
        <div class="cs-hero__orb cs-hero__orb--3" />
        <div class="cs-hero__grain" />
      </div>

      <UContainer class="max-w-360 cs-hero__container">
        <!-- Back link -->
        <NuxtLink to="/cases" class="cs-back">
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
          {{ t("cases.navigation.backToCases") }}
        </NuxtLink>

        <div class="cs-hero__body">
          <!-- Left: text content -->
          <div class="cs-hero__text">
            <!-- Badge -->
            <div
              v-motion
              :initial="animationPresets.fadeIn.initial"
              :visible-once="animationPresets.fadeIn.visible"
              class="cs-hero__badges"
            >
              <span class="cs-badge cs-badge--category">
                {{ getBadgeLabel(caseStudy.company) }}
              </span>
              <span v-for="tag in caseStudy.tags?.slice(0, 2)" :key="tag" class="cs-badge cs-badge--tag">
                {{ tag }}
              </span>
            </div>

            <h1
              id="cs-hero-title"
              class="cs-hero__title"
              v-motion
              :initial="animationPresets.fadeInUpScale.initial"
              :visible-once="withDelay('fadeInUpScale', 100).visible"
            >
              {{ caseStudy.title }}
            </h1>

            <p
              class="cs-hero__subtitle"
              v-motion
              :initial="animationPresets.fadeInUp.initial"
              :visible-once="withDelay('fadeInUp', 200).visible"
            >
              {{ caseStudy.subtitle }}
            </p>

            <!-- Meta row -->
            <div
              class="cs-hero__meta"
              v-motion
              :initial="animationPresets.fadeInUp.initial"
              :visible-once="withDelay('fadeInUp', 300).visible"
            >
              <div class="cs-meta-item">
                <span class="cs-meta-item__label">{{ t("cases.stats.role") }}</span>
                <span class="cs-meta-item__value">{{ caseStudy.role }}</span>
              </div>
              <div class="cs-meta-divider" aria-hidden="true" />
              <div class="cs-meta-item">
                <span class="cs-meta-item__label">{{ t("cases.stats.year") }}</span>
                <span class="cs-meta-item__value">{{ caseStudy.year }}</span>
              </div>
              <div class="cs-meta-divider" aria-hidden="true" />
              <div class="cs-meta-item">
                <span class="cs-meta-item__label">{{ t("cases.stats.duration") }}</span>
                <span class="cs-meta-item__value">{{ caseStudy.duration }}</span>
              </div>
              <a
                v-if="caseStudy.url"
                :href="caseStudy.url"
                target="_blank"
                rel="noopener noreferrer"
                class="cs-visit-link"
              >
                {{ t("cases.cta.visitSite") }}
                <UIcon name="i-lucide-external-link" class="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <!-- Right: hero image with parallax -->
          <div
            v-if="caseStudy.hero"
            class="cs-hero__visual"
            v-motion
            :initial="animationPresets.slideInRight.initial"
            :visible-once="withDelay('slideInRight', 250).visible"
          >
            <div class="cs-hero__image-frame">
              <div class="cs-hero__image-glow" aria-hidden="true" />
              <img
                :src="caseStudy.hero"
                :alt="`${caseStudy.title} website screenshot`"
                class="cs-hero__image"
                :style="{ transform: heroParallax }"
              />
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ─── KEY METRICS ──────────────────────────────────────── -->
    <section
      v-if="caseStudy.keyMetrics?.length"
      class="cs-metrics-strip"
      aria-label="Project metrics"
    >
      <UContainer class="max-w-360">
        <div class="cs-metrics-strip__grid">
          <div
            v-for="(metric, i) in caseStudy.keyMetrics"
            :key="metric.label"
            class="cs-metric-item"
            v-motion
            :initial="animationPresets.fadeInUpScale.initial"
            :visible-once="withDelay('fadeInUpScale', i * 100).visible"
          >
            <span class="cs-metric-item__value">{{ metric.value }}</span>
            <span class="cs-metric-item__label">{{ metric.label }}</span>
            <span v-if="metric.description" class="cs-metric-item__desc">{{ metric.description }}</span>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ─── MAIN CONTENT ─────────────────────────────────────── -->
    <div class="cs-main">
      <UContainer class="max-w-360">
        <div class="cs-layout">

          <!-- ── OVERVIEW ── -->
          <section class="cs-section" aria-labelledby="cs-overview-heading">
            <h2
              id="cs-overview-heading"
              class="cs-section__eyebrow"
              v-motion
              :initial="animationPresets.fadeInUp.initial"
              :visible-once="animationPresets.fadeInUp.visible"
            >
              {{ t("cases.sections.overview") }}
            </h2>
            <div class="cs-overview">
              <div
                v-for="(item, i) in [
                  { key: 'challenge', label: t('cases.sections.challenge'), icon: 'i-lucide-target', text: caseStudy.overview.challenge },
                  { key: 'solution', label: t('cases.sections.solution'), icon: 'i-lucide-lightbulb', text: caseStudy.overview.solution },
                  { key: 'outcome', label: t('cases.sections.outcome'), icon: 'i-lucide-trending-up', text: caseStudy.overview.outcome },
                ]"
                :key="item.key"
                class="cs-overview__card"
                v-motion
                :initial="animationPresets.fadeInUpScale.initial"
                :visible-once="withDelay('fadeInUpScale', i * 120).visible"
              >
                <div class="cs-overview__icon-wrap" aria-hidden="true">
                  <UIcon :name="item.icon" class="cs-overview__icon" />
                </div>
                <h3 class="cs-overview__heading">{{ item.label }}</h3>
                <p class="cs-overview__text">{{ item.text }}</p>
              </div>
            </div>
          </section>

          <!-- ── TECHNOLOGIES ── -->
          <section
            v-if="caseStudy.technologies?.length"
            class="cs-tech-section"
            aria-label="Technologies used"
            v-motion
            :initial="animationPresets.fadeInUp.initial"
            :visible-once="animationPresets.fadeInUp.visible"
          >
            <h3 class="cs-tech-section__label">{{ t("cases.stats.technologies") }}</h3>
            <div class="cs-tech-list">
              <span
                v-for="tech in caseStudy.technologies"
                :key="tech"
                class="cs-tech-tag"
              >{{ tech }}</span>
            </div>
          </section>

          <!-- ── PROCESS ── -->
          <section
            v-if="caseStudy.process?.length"
            class="cs-section"
            aria-labelledby="cs-process-heading"
          >
            <h2
              id="cs-process-heading"
              class="cs-section__eyebrow"
              v-motion
              :initial="animationPresets.fadeInUp.initial"
              :visible-once="animationPresets.fadeInUp.visible"
            >
              {{ t("cases.sections.process") }}
            </h2>

            <div class="cs-process">
              <div
                v-for="(phase, index) in caseStudy.process"
                :key="index"
                class="cs-phase"
                v-motion
                :initial="animationPresets.fadeInUp.initial"
                :visible-once="withDelay('fadeInUp', index * 100).visible"
              >
                <div class="cs-phase__aside">
                  <div class="cs-phase__number" aria-hidden="true">{{ index + 1 }}</div>
                  <div class="cs-phase__connector" aria-hidden="true" />
                </div>
                <div class="cs-phase__body">
                  <h3 class="cs-phase__title">{{ phase.phase }}</h3>
                  <p class="cs-phase__desc">{{ phase.description }}</p>
                  <div v-if="phase.deliverables?.length" class="cs-phase__deliverables">
                    <span
                      v-for="d in phase.deliverables"
                      :key="d"
                      class="cs-deliverable"
                    >
                      <UIcon name="i-lucide-check" class="w-3 h-3" aria-hidden="true" />
                      {{ d }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- ── CHALLENGES ── -->
          <section
            v-if="caseStudy.challenges?.length"
            class="cs-section"
            aria-labelledby="cs-challenges-heading"
          >
            <h2
              id="cs-challenges-heading"
              class="cs-section__eyebrow"
              v-motion
              :initial="animationPresets.fadeInUp.initial"
              :visible-once="animationPresets.fadeInUp.visible"
            >
              {{ t("cases.sections.challenges") }}
            </h2>

            <div class="cs-challenges">
              <TiltCard
                v-for="(challenge, i) in caseStudy.challenges"
                :key="challenge.title"
                :max-tilt="4"
                :scale="1.02"
                class="cs-challenge"
                v-motion
                :initial="animationPresets.fadeInUpScale.initial"
                :visible-once="withDelay('fadeInUpScale', i * 130).visible"
              >
                <div class="cs-challenge__number" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</div>
                <h3 class="cs-challenge__title">{{ challenge.title }}</h3>
                <div class="cs-challenge__pair">
                  <div class="cs-challenge__block cs-challenge__block--problem">
                    <span class="cs-challenge__block-label">Problem</span>
                    <p class="cs-challenge__block-text">{{ challenge.problem }}</p>
                  </div>
                  <div class="cs-challenge__block cs-challenge__block--solution">
                    <span class="cs-challenge__block-label">How we solved it</span>
                    <p class="cs-challenge__block-text">{{ challenge.solution }}</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </section>

          <!-- ── BEFORE / AFTER ── -->
          <section
            v-if="caseStudy.beforeAfter"
            class="cs-section"
            aria-labelledby="cs-ba-heading"
          >
            <h2
              id="cs-ba-heading"
              class="cs-section__eyebrow"
              v-motion
              :initial="animationPresets.fadeInUp.initial"
              :visible-once="animationPresets.fadeInUp.visible"
            >
              Results, measured
            </h2>
            <CasesBeforeAfter
              :data="caseStudy.beforeAfter"
              :is-client="!isOwnBrand(caseStudy.company)"
            />
          </section>

          <!-- ── RESULTS ── -->
          <section
            v-if="caseStudy.results"
            class="cs-section"
            aria-labelledby="cs-results-heading"
          >
            <h2
              id="cs-results-heading"
              class="cs-section__eyebrow"
              v-motion
              :initial="animationPresets.fadeInUp.initial"
              :visible-once="animationPresets.fadeInUp.visible"
            >
              {{ t("cases.sections.results") }}
            </h2>

            <div
              class="cs-results"
              v-motion
              :initial="animationPresets.fadeInUpScale.initial"
              :visible-once="withDelay('fadeInUpScale', 100).visible"
            >
              <p class="cs-results__summary">{{ caseStudy.results.summary }}</p>
              <ul v-if="caseStudy.results.highlights" class="cs-results__list" role="list">
                <li
                  v-for="(highlight, i) in caseStudy.results.highlights"
                  :key="highlight"
                  class="cs-results__item"
                  v-motion
                  :initial="animationPresets.slideInLeft.initial"
                  :visible-once="withDelay('slideInLeft', 150 + i * 70).visible"
                >
                  <UIcon name="i-lucide-check-circle-2" class="cs-results__icon" aria-hidden="true" />
                  <span>{{ highlight }}</span>
                </li>
              </ul>
            </div>
          </section>

          <!-- ── GALLERY ── -->
          <section
            v-if="caseStudy.gallery?.length"
            class="cs-section"
            aria-labelledby="cs-gallery-heading"
          >
            <h2
              id="cs-gallery-heading"
              class="cs-section__eyebrow"
              v-motion
              :initial="animationPresets.fadeInUp.initial"
              :visible-once="animationPresets.fadeInUp.visible"
            >
              {{ t("cases.sections.gallery") }}
            </h2>

            <div class="cs-gallery">
              <button
                v-for="(image, index) in caseStudy.gallery"
                :key="index"
                type="button"
                class="cs-gallery__item group"
                :aria-label="`${caseStudy.title} screenshot ${index + 1}, open gallery`"
                v-motion
                :initial="animationPresets.fadeInUpScale.initial"
                :visible-once="withDelay('fadeInUpScale', index * 120).visible"
                @click="openGallery(index)"
              >
                <img
                  :src="image"
                  :alt="`${caseStudy.title} screenshot ${index + 1}`"
                  class="cs-gallery__image"
                />
                <div class="cs-gallery__overlay" aria-hidden="true">
                  <div class="cs-gallery__expand">
                    <UIcon name="i-lucide-maximize-2" class="w-5 h-5" />
                  </div>
                </div>
              </button>
            </div>

            <CasesImageGalleryModal
              v-if="caseStudy.gallery"
              :images="caseStudy.gallery"
              :title="caseStudy.title"
              :is-open="isGalleryOpen"
              :initial-index="selectedImageIndex"
              @close="closeGallery"
              @index-change="(index) => (selectedImageIndex = index)"
            />
          </section>

        </div>
      </UContainer>
    </div>

    <!-- ─── CASE NAVIGATION ──────────────────────────────────── -->
    <nav
      v-if="previousCase && nextCase"
      class="cs-nav"
      :aria-label="t('cases.navigation.backToCases')"
    >
      <UContainer class="max-w-360">
        <div class="cs-nav__grid">
          <NuxtLink :to="`/cases/${previousCase.slug}`" class="cs-nav__link cs-nav__link--prev">
            <UIcon name="i-lucide-arrow-left" class="w-4 h-4 cs-nav__arrow" aria-hidden="true" />
            <div>
              <p class="cs-nav__direction">{{ t("cases.navigation.previousCase") }}</p>
              <h3 class="cs-nav__case-title">{{ previousCase.title }}</h3>
            </div>
          </NuxtLink>
          <NuxtLink :to="`/cases/${nextCase.slug}`" class="cs-nav__link cs-nav__link--next">
            <div>
              <p class="cs-nav__direction">{{ t("cases.navigation.nextCase") }}</p>
              <h3 class="cs-nav__case-title">{{ nextCase.title }}</h3>
            </div>
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4 cs-nav__arrow" aria-hidden="true" />
          </NuxtLink>
        </div>
      </UContainer>
    </nav>

    <!-- ─── CTA ─────────────────────────────────────────────── -->
    <section class="cs-cta-wrap">
      <UContainer class="max-w-360">
        <BaseCTASection
          :title="t('cases.contact.title')"
          :description="t('cases.contact.description')"
          :primary-text="t('cases.contact.button')"
          primary-to="/contact"
        />
      </UContainer>
    </section>

  </div>
</template>

<style lang="scss" scoped>
/* ── Loading ───────────────────────────────────────────── */
.cs-loading {
  min-height: 100vh;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.cs-loading__icon {
  width: 3rem;
  height: 3rem;
  color: var(--color-primary-500);
  animation: spin 1s linear infinite;
}

.cs-loading__text {
  color: var(--color-text-secondary);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Page ──────────────────────────────────────────────── */
.cs-page {
  min-height: 100vh;
  background: var(--color-bg);
}

/* ── Hero ──────────────────────────────────────────────── */
.cs-hero {
  position: relative;
  background: var(--color-hero-bg);
  overflow: hidden;
  padding: 5rem 0 6rem;

  @media (min-width: 768px) {
    padding: 7rem 0 8rem;
  }
}

// Scroll-driven parallax on the whole hero (progressive enhancement)
@supports (animation-timeline: scroll()) {
  .cs-hero {
    animation: heroFade linear both;
    animation-timeline: scroll(root block);
    animation-range: 0px 400px;
  }

  @keyframes heroFade {
    to { opacity: 0.6; }
  }
}

.cs-hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  will-change: transform;
}

.cs-hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);

  &--1 {
    width: 28rem;
    height: 28rem;
    background: radial-gradient(circle, var(--color-primary-600), transparent 70%);
    top: -6rem;
    right: -4rem;
    opacity: 0.5;
  }

  &--2 {
    width: 20rem;
    height: 20rem;
    background: radial-gradient(circle, var(--color-primary-400), transparent 70%);
    bottom: -4rem;
    left: 10%;
    opacity: 0.3;
  }

  &--3 {
    width: 16rem;
    height: 16rem;
    background: radial-gradient(circle, color-mix(in srgb, var(--color-accent-500) 40%, var(--color-primary-700)), transparent 70%);
    top: 30%;
    left: 40%;
    opacity: 0.2;
  }
}

.cs-hero__grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.4;
  mix-blend-mode: overlay;
}

.cs-hero__container {
  position: relative;
  z-index: 1;
}

.cs-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-primary-200);
  text-decoration: none;
  margin-bottom: 3rem;
  opacity: 0.8;
  transition: opacity 200ms var(--ease-smooth);

  &:hover { opacity: 1; }

  &:focus-visible {
    outline: 2px solid var(--color-primary-300);
    outline-offset: 4px;
    border-radius: 4px;
  }
}

.cs-hero__body {
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.cs-hero__text {
  max-width: 36rem;
}

.cs-hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.cs-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;

  &--category {
    background: color-mix(in srgb, var(--color-primary-300) 20%, transparent);
    color: var(--color-primary-100);
    border: 1px solid color-mix(in srgb, var(--color-primary-300) 30%, transparent);
  }

  &--tag {
    background: color-mix(in srgb, var(--color-primary-950) 40%, transparent);
    color: var(--color-primary-200);
    border: 1px solid color-mix(in srgb, var(--color-primary-200) 15%, transparent);
    font-weight: 500;
  }
}

.cs-hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: var(--color-primary-50);
  line-height: 1.05;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.cs-hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-primary-200);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cs-hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
}

.cs-meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.cs-meta-item__label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary-400);
}

.cs-meta-item__value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-primary-100);
}

.cs-meta-divider {
  width: 1px;
  height: 2rem;
  background: color-mix(in srgb, var(--color-primary-300) 25%, transparent);
}

.cs-visit-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  min-height: 44px;
  background: var(--color-primary-500);
  color: var(--color-primary-50);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background 200ms var(--ease-smooth), transform 200ms var(--ease-smooth);

  &:hover {
    background: var(--color-primary-400);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-300);
    outline-offset: 2px;
  }
}

// Hero image
.cs-hero__visual {
  @media (max-width: 1023px) {
    max-width: 36rem;
    margin: 0 auto;
  }
}

.cs-hero__image-frame {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
}

.cs-hero__image-glow {
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--color-primary-400) 40%, transparent),
    color-mix(in srgb, var(--color-primary-600) 20%, transparent)
  );
  z-index: 0;
  filter: blur(12px);
}

.cs-hero__image {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0.875rem;
  border: 1px solid color-mix(in srgb, var(--color-primary-400) 30%, transparent);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--color-primary-300) 10%, transparent),
    0 32px 64px -16px rgba(0, 0, 0, 0.5);
  will-change: transform;
}

/* ── Metrics strip ─────────────────────────────────────── */
.cs-metrics-strip {
  background: var(--color-primary-900);
  border-bottom: 1px solid color-mix(in srgb, var(--color-primary-700) 40%, transparent);
  padding: 2rem 0;
}

.cs-metrics-strip__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0;
  text-align: center;
}

.cs-metric-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.25rem 1rem;
  border-right: 1px solid color-mix(in srgb, var(--color-primary-700) 30%, transparent);

  &:last-child { border-right: none; }
}

.cs-metric-item__value {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--color-primary-100);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.cs-metric-item__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-primary-400);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.cs-metric-item__desc {
  font-size: 0.75rem;
  color: var(--color-primary-500);
  margin-top: 0.125rem;
  line-height: 1.4;
}

/* ── Main content ──────────────────────────────────────── */
.cs-main {
  padding: 5rem 0 3rem;

  @media (min-width: 768px) {
    padding: 7rem 0 4rem;
  }
}

.cs-layout {
  max-width: 56rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  @media (min-width: 768px) {
    gap: 6rem;
  }
}

/* ── Section heading ───────────────────────────────────── */
.cs-section__eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-primary-600);
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: color-mix(in srgb, var(--color-primary-500) 20%, transparent);
    max-width: 3rem;
  }
}

:global(.dark) .cs-section__eyebrow {
  color: var(--color-primary-400);

  &::after {
    background: color-mix(in srgb, var(--color-primary-400) 25%, transparent);
  }
}

/* ── Overview ──────────────────────────────────────────── */
.cs-overview {
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.cs-overview__card {
  padding: 1.75rem;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  transition: border-color 300ms var(--ease-smooth), box-shadow 300ms var(--ease-smooth);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary-500), var(--color-primary-300));
    opacity: 0;
    transition: opacity 300ms var(--ease-smooth);
  }

  &:hover {
    border-color: color-mix(in srgb, var(--color-primary-500) 30%, transparent);
    box-shadow: 0 8px 32px -8px color-mix(in srgb, var(--color-primary-500) 10%, transparent);

    &::before { opacity: 1; }
  }
}

.cs-overview__icon-wrap {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  background: color-mix(in srgb, var(--color-primary-500) 10%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.cs-overview__icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary-600);
}

:global(.dark) .cs-overview__icon {
  color: var(--color-primary-400);
}

.cs-overview__heading {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-primary-600);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

:global(.dark) .cs-overview__heading {
  color: var(--color-primary-400);
}

.cs-overview__text {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.75;
}

/* ── Technologies ──────────────────────────────────────── */
.cs-tech-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.cs-tech-section__label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.cs-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cs-tech-tag {
  padding: 0.375rem 0.875rem;
  background: color-mix(in srgb, var(--color-primary-500) 8%, var(--color-surface-1));
  border: 1px solid color-mix(in srgb, var(--color-primary-500) 20%, transparent);
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-primary-700);
  transition: background 200ms var(--ease-smooth);

  &:hover {
    background: color-mix(in srgb, var(--color-primary-500) 14%, var(--color-surface-1));
  }
}

:global(.dark) .cs-tech-tag {
  color: var(--color-primary-300);
  background: color-mix(in srgb, var(--color-primary-500) 10%, var(--color-surface-2));
  border-color: color-mix(in srgb, var(--color-primary-400) 20%, transparent);
}

/* ── Process ───────────────────────────────────────────── */
.cs-process {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.cs-phase {
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: 0 1.5rem;
}

.cs-phase__aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.125rem;
}

.cs-phase__number {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--color-primary-800);
  color: var(--color-primary-100);
  font-size: 0.8125rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid var(--color-primary-600);
  position: relative;
  z-index: 1;
}

.cs-phase__connector {
  flex: 1;
  width: 2px;
  background: linear-gradient(to bottom,
    var(--color-primary-600),
    color-mix(in srgb, var(--color-primary-500) 20%, transparent)
  );
  margin: 0.5rem 0;
  min-height: 2rem;
}

.cs-phase:last-child .cs-phase__connector {
  display: none;
}

.cs-phase__body {
  padding-bottom: 2.5rem;
}

.cs-phase:last-child .cs-phase__body {
  padding-bottom: 0;
}

.cs-phase__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin-bottom: 0.75rem;
}

.cs-phase__desc {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.75;
  margin-bottom: 1rem;
}

.cs-phase__deliverables {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cs-deliverable {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: color-mix(in srgb, var(--color-primary-500) 8%, var(--color-surface-1));
  border: 1px solid color-mix(in srgb, var(--color-primary-500) 15%, transparent);
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-primary-700);

  svg { color: var(--color-primary-500); }
}

:global(.dark) .cs-deliverable {
  color: var(--color-primary-300);
  background: color-mix(in srgb, var(--color-primary-500) 10%, var(--color-surface-2));
  border-color: color-mix(in srgb, var(--color-primary-400) 18%, transparent);

  svg { color: var(--color-primary-400); }
}

/* ── Challenges ────────────────────────────────────────── */
.cs-challenges {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cs-challenge {
  padding: 2rem;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  transition: border-color 200ms var(--ease-smooth), box-shadow 200ms var(--ease-smooth);

  &:hover {
    border-color: color-mix(in srgb, var(--color-primary-500) 35%, transparent);
    box-shadow: 0 12px 40px -12px color-mix(in srgb, var(--color-primary-500) 12%, transparent);
  }
}

.cs-challenge__number {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font-size: 3.5rem;
  font-weight: 900;
  color: color-mix(in srgb, var(--color-primary-500) 8%, transparent);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  font-variant-numeric: tabular-nums;
}

.cs-challenge__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin-bottom: 1.25rem;
}

.cs-challenge__pair {
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.cs-challenge__block {
  padding: 1rem 1.25rem;
  border-radius: 0.625rem;
  border-left: 3px solid;

  &--problem {
    background: color-mix(in srgb, #dc2626 5%, var(--color-surface-2));
    border-color: color-mix(in srgb, #dc2626 50%, transparent);
  }

  &--solution {
    background: color-mix(in srgb, var(--color-primary-500) 7%, var(--color-surface-2));
    border-color: var(--color-primary-500);
  }
}

.cs-challenge__block-label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;

  .cs-challenge__block--problem & { color: #dc2626; }
  .cs-challenge__block--solution & { color: var(--color-primary-600); }
}

:global(.dark) .cs-challenge__block-label {
  .cs-challenge__block--solution & { color: var(--color-primary-400); }
}

.cs-challenge__block-text {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
}

/* ── Results ───────────────────────────────────────────── */
.cs-results {
  padding: 2.5rem;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-primary-800) 95%, transparent),
    color-mix(in srgb, var(--color-primary-900) 95%, transparent)
  );
  border: 1px solid color-mix(in srgb, var(--color-primary-600) 30%, transparent);
  border-radius: 1.25rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg,
      var(--color-primary-500),
      var(--color-primary-300),
      var(--color-primary-500)
    );
  }
}

.cs-results__summary {
  font-size: 1.0625rem;
  color: var(--color-primary-100);
  line-height: 1.75;
  margin-bottom: 1.75rem;
}

.cs-results__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cs-results__item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9375rem;
  color: var(--color-primary-200);
  line-height: 1.6;
}

.cs-results__icon {
  width: 1.125rem;
  height: 1.125rem;
  color: var(--color-primary-400);
  flex-shrink: 0;
  margin-top: 0.2rem;
}

/* ── Gallery ───────────────────────────────────────────── */
.cs-gallery {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.cs-gallery__item {
  position: relative;
  overflow: hidden;
  border-radius: 0.875rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface-1);
  cursor: pointer;
  padding: 0;

  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
}

.cs-gallery__image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 400ms var(--ease-smooth);

  .cs-gallery__item:hover & {
    transform: scale(1.04);
  }
}

.cs-gallery__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 250ms var(--ease-smooth);

  .cs-gallery__item:hover & {
    background: color-mix(in srgb, var(--color-primary-900) 50%, transparent);
  }
}

.cs-gallery__expand {
  padding: 0.875rem;
  border-radius: 50%;
  background: var(--color-primary-500);
  color: #fff;
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 250ms var(--ease-smooth),
    transform 250ms var(--ease-smooth);

  .cs-gallery__item:hover & {
    opacity: 1;
    transform: scale(1);
  }
}

/* ── Case navigation ───────────────────────────────────── */
.cs-nav {
  background: var(--color-surface-1);
  border-top: 1px solid var(--color-border);
  padding: 3rem 0;
}

.cs-nav__grid {
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.cs-nav__link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.875rem;
  border: 1px solid var(--color-border);
  text-decoration: none;
  transition:
    border-color 200ms var(--ease-smooth),
    background 200ms var(--ease-smooth),
    box-shadow 200ms var(--ease-smooth);

  &:hover {
    border-color: color-mix(in srgb, var(--color-primary-500) 40%, transparent);
    background: color-mix(in srgb, var(--color-primary-500) 4%, var(--color-surface-1));
    box-shadow: 0 8px 24px -8px color-mix(in srgb, var(--color-primary-500) 12%, transparent);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  &--next {
    justify-content: flex-end;
    text-align: right;
  }
}

.cs-nav__arrow {
  color: var(--color-primary-500);
  flex-shrink: 0;
  transition: transform 200ms var(--ease-smooth);

  .cs-nav__link--prev:hover & { transform: translateX(-3px); }
  .cs-nav__link--next:hover & { transform: translateX(3px); }
}

.cs-nav__direction {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  margin-bottom: 0.375rem;
}

.cs-nav__case-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-text-heading);
  transition: color 200ms var(--ease-smooth);

  .cs-nav__link:hover & {
    color: var(--color-primary-600);
  }
}

:global(.dark) .cs-nav__case-title {
  .cs-nav__link:hover & {
    color: var(--color-primary-400);
  }
}

/* ── CTA ───────────────────────────────────────────────── */
.cs-cta-wrap {
  padding: 0 0 5rem;

  @media (min-width: 768px) {
    padding: 0 0 6rem;
  }
}

/* ── Dark mode overrides ───────────────────────────────── */
:global(.dark) {
  .cs-metrics-strip {
    background: color-mix(in srgb, var(--color-primary-950) 90%, var(--color-surface-2));
    border-color: color-mix(in srgb, var(--color-primary-800) 50%, transparent);
  }

  .cs-metric-item {
    border-color: color-mix(in srgb, var(--color-primary-800) 40%, transparent);
  }

  .cs-results {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--color-primary-950) 95%, var(--color-surface-2)),
      var(--color-surface-2)
    );
    border-color: color-mix(in srgb, var(--color-primary-700) 30%, transparent);
  }

  .cs-challenge__block--problem {
    background: color-mix(in srgb, #dc2626 6%, var(--color-surface-2));
  }

  .cs-challenge__block--solution {
    background: color-mix(in srgb, var(--color-primary-500) 8%, var(--color-surface-2));
  }

  .cs-overview__card {
    background: var(--color-surface-2);
  }
}

/* ── Reduced motion ────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .cs-hero__image,
  .cs-gallery__image,
  .cs-gallery__expand,
  .cs-nav__link,
  .cs-nav__arrow,
  .cs-visit-link {
    transition: none;
  }

  .cs-gallery__item:hover .cs-gallery__image {
    transform: none;
  }

  .cs-gallery__expand {
    opacity: 1;
    transform: none;
  }
}
</style>
