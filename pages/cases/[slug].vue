<script setup lang="ts">
import { animationPresets, withDelay } from "~/composables/useAccessibleMotion";
import { useWindowScroll, usePreferredReducedMotion } from "@vueuse/core";

const route = useRoute();
const { t, tm, locale } = useI18n();
const localePath = useLocalePath();

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

const isGalleryOpen = ref(false);
const selectedImageIndex = ref(0);

const openGallery = (index: number) => {
  selectedImageIndex.value = index;
  isGalleryOpen.value = true;
};

const closeGallery = () => {
  isGalleryOpen.value = false;
};

const prefersReducedMotion = usePreferredReducedMotion();
const { y: scrollY } = useWindowScroll();
const heroParallax = computed(() =>
  prefersReducedMotion.value === "reduce" ? "none" : `translateY(${scrollY.value * 0.25}px)`
);
const orbParallax = computed(() =>
  prefersReducedMotion.value === "reduce" ? "none" : `translateY(${scrollY.value * -0.12}px)`
);

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
  navigateTo(localePath("/cases"));
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
    <span class="cs-loading__spinner" aria-hidden="true" />
    <p class="cs-loading__text">Loading case study...</p>
  </div>

  <div v-else class="cs-page">

    <section class="cs-hero" aria-labelledby="cs-hero-title">
      <div class="cs-hero__bg" aria-hidden="true" :style="{ transform: orbParallax }" />

      <UContainer class="max-w-360 cs-hero__container">

        <NuxtLink :to="localePath('/cases')" class="cs-back">
          <span aria-hidden="true">←</span>
          {{ t("cases.navigation.backToCases") }}
        </NuxtLink>

        <div class="cs-hero__body">

          <div class="cs-hero__text">
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
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

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

    <div class="cs-main">
      <UContainer class="max-w-360">
        <div class="cs-layout">

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
                  { key: 'challenge', label: t('cases.sections.challenge'), text: caseStudy.overview.challenge },
                  { key: 'solution', label: t('cases.sections.solution'), text: caseStudy.overview.solution },
                  { key: 'outcome', label: t('cases.sections.outcome'), text: caseStudy.overview.outcome },
                ]"
                :key="item.key"
                class="cs-overview__card"
                v-motion
                :initial="animationPresets.fadeInUpScale.initial"
                :visible-once="withDelay('fadeInUpScale', i * 120).visible"
              >
                <span class="overview-diamond" aria-hidden="true" />
                <h3 class="cs-overview__heading">{{ item.label }}</h3>
                <p class="cs-overview__text">{{ item.text }}</p>
              </div>
            </div>
          </section>

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
                      <span class="deliverable-diamond" aria-hidden="true" />
                      {{ d }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
              <div
                v-for="(challenge, i) in caseStudy.challenges"
                :key="challenge.title"
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
              </div>
            </div>
          </section>

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
                  <span class="result-diamond" aria-hidden="true" />
                  <span>{{ highlight }}</span>
                </li>
              </ul>
            </div>
          </section>

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
                  <div class="cs-gallery__expand" aria-hidden="true">⤡</div>
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

    <nav
      v-if="previousCase && nextCase"
      class="cs-nav"
      :aria-label="t('cases.navigation.backToCases')"
    >
      <UContainer class="max-w-360">
        <div class="cs-nav__grid">
          <NuxtLink :to="localePath('/cases/' + previousCase.slug)" class="cs-nav__link cs-nav__link--prev">
            <span class="cs-nav__arrow" aria-hidden="true">←</span>
            <div>
              <p class="cs-nav__direction">{{ t("cases.navigation.previousCase") }}</p>
              <h3 class="cs-nav__case-title">{{ previousCase.title }}</h3>
            </div>
          </NuxtLink>
          <NuxtLink :to="localePath('/cases/' + nextCase.slug)" class="cs-nav__link cs-nav__link--next">
            <div>
              <p class="cs-nav__direction">{{ t("cases.navigation.nextCase") }}</p>
              <h3 class="cs-nav__case-title">{{ nextCase.title }}</h3>
            </div>
            <span class="cs-nav__arrow" aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </UContainer>
    </nav>

    <section class="cs-cta-wrap" aria-labelledby="cs-cta-heading">
      <div class="cta-bg-radial" aria-hidden="true" />
      <div class="cta-container">
        <div class="cta-inner">
          <div class="deco-frame-cta" aria-hidden="true">
            <span class="cta-corner cta-corner--tl" />
            <span class="cta-corner cta-corner--tr" />
            <span class="cta-corner cta-corner--bl" />
            <span class="cta-corner cta-corner--br" />
          </div>
          <div class="cta-label-row" aria-hidden="true">
            <span class="cta-sep-line" />
            <span class="cta-sep-diamond" />
            <span class="cta-sep-text">{{ t("cases.contact.title") }}</span>
            <span class="cta-sep-diamond" />
            <span class="cta-sep-line" />
          </div>
          <h2 id="cs-cta-heading" class="cta-heading">{{ t("cases.contact.title") }}</h2>
          <div class="cta-deco-divider" aria-hidden="true">
            <span class="cta-div-line" />
            <span class="cta-div-diamond cta-div-diamond--sm" />
            <span class="cta-div-line cta-div-line--inner" />
            <span class="cta-div-diamond" />
            <span class="cta-div-line cta-div-line--inner" />
            <span class="cta-div-diamond cta-div-diamond--sm" />
            <span class="cta-div-line" />
          </div>
          <p class="cta-description">{{ t("cases.contact.description") }}</p>
          <div class="cta-actions">
            <AppCtaButton variant="primary" :to="localePath('/contact')" :show-icon="true">
              {{ t("cases.contact.button") }}
            </AppCtaButton>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style lang="scss" scoped>

.cs-loading {
  min-height: 100vh;
  background: #0d0908;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.cs-loading__spinner {
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgba(223, 175, 133, 0.15);
  border-top-color: rgba(223, 175, 133, 0.6);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

.cs-loading__text {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 237, 223, 0.3);
}

@keyframes spin { to { transform: rotate(360deg); } }

.cs-page {
  min-height: 100vh;
  background: #0d0908;
}

.cs-hero {
  position: relative;
  background: #0d0908;
  overflow: hidden;
  padding: 5rem 0 6rem;

  @media (min-width: 768px) {
    padding: 7rem 0 8rem;
  }
}

@supports (animation-timeline: scroll()) {
  .cs-hero {
    animation: heroFade linear both;
    animation-timeline: scroll(root block);
    animation-range: 0px 400px;
  }

  @keyframes heroFade { to { opacity: 0.7; } }
}

.cs-hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  will-change: transform;
  background: radial-gradient(ellipse 70% 60% at 65% 0%, rgba(223, 175, 133, 0.07) 0%, transparent 65%);
}

.cs-hero__container {
  position: relative;
  z-index: 1;
}

.cs-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  text-decoration: none;
  margin-bottom: 3rem;
  transition: color 0.2s ease;

  &:hover { color: rgba(223, 175, 133, 0.75); }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 4px;
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

.cs-hero__text { max-width: 36rem; }

.cs-hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.cs-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  &--category {
    background: rgba(223, 175, 133, 0.08);
    color: rgba(223, 175, 133, 0.75);
    border: 1px solid rgba(223, 175, 133, 0.2);
  }

  &--tag {
    background: rgba(223, 175, 133, 0.04);
    color: rgba(223, 175, 133, 0.45);
    border: 1px solid rgba(223, 175, 133, 0.1);
  }
}

.cs-hero__title {
  font-family: var(--font-heading);
  font-size: clamp(2.25rem, 5.5vw, 3.75rem);
  font-weight: 700;
  color: #ffeddf;
  line-height: 1.06;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.cs-hero__subtitle {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  color: rgba(255, 237, 223, 0.5);
  line-height: 1.7;
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
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(223, 175, 133, 0.4);
}

.cs-meta-item__value {
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 237, 223, 0.7);
}

.cs-meta-divider {
  width: 1px;
  height: 2rem;
  background: rgba(223, 175, 133, 0.12);
}

.cs-visit-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1.125rem;
  min-height: 44px;
  background: rgba(223, 175, 133, 0.08);
  border: 1px solid rgba(223, 175, 133, 0.2);
  color: rgba(223, 175, 133, 0.7);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(223, 175, 133, 0.12);
    border-color: rgba(223, 175, 133, 0.35);
    color: rgba(223, 175, 133, 0.9);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 2px;
  }
}

.cs-hero__visual {
  @media (max-width: 1023px) {
    max-width: 36rem;
    margin: 0 auto;
  }
}

.cs-hero__image-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(223, 175, 133, 0.12);
}

.cs-hero__image-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(223, 175, 133, 0.06) 0%, transparent 60%);
  z-index: 0;
  pointer-events: none;
}

.cs-hero__image {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
  will-change: transform;
}

.cs-metrics-strip {
  background: #120703;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);
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
  border-right: 1px solid rgba(223, 175, 133, 0.07);

  &:last-child { border-right: none; }
}

.cs-metric-item__value {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: rgba(223, 175, 133, 0.85);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.cs-metric-item__label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  color: rgba(255, 237, 223, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.cs-metric-item__desc {
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: rgba(255, 237, 223, 0.3);
  margin-top: 0.125rem;
  line-height: 1.4;
}

.cs-main {
  background: #0d0908;
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

  @media (min-width: 768px) { gap: 6rem; }
}

.cs-section__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(223, 175, 133, 0.45);
  margin-bottom: 1.75rem;

  &::before,
  &::after {
    content: '';
    flex: 0 0 3rem;
    height: 1px;
    background: rgba(223, 175, 133, 0.1);
  }
}

.cs-overview {
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
}

.cs-overview__card {
  padding: 1.75rem;
  background: #161210;
  border: 1px solid rgba(223, 175, 133, 0.1);
  transition: border-color 0.3s ease;

  &:hover { border-color: rgba(223, 175, 133, 0.22); }
}

.overview-diamond {
  display: block;
  width: 8px;
  height: 8px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  margin-bottom: 1rem;
}

.cs-overview__heading {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  color: rgba(223, 175, 133, 0.6);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.cs-overview__text {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 0.9rem;
  color: rgba(255, 237, 223, 0.5);
  line-height: 1.75;
  margin: 0;
}

.cs-tech-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.cs-tech-section__label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 237, 223, 0.3);
  white-space: nowrap;
}

.cs-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cs-tech-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(223, 175, 133, 0.05);
  border: 1px solid rgba(223, 175, 133, 0.12);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: rgba(223, 175, 133, 0.55);
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(223, 175, 133, 0.08);
    border-color: rgba(223, 175, 133, 0.22);
  }
}

.cs-process {
  display: flex;
  flex-direction: column;
}

.cs-phase {
  display: grid;
  grid-template-columns: 3rem 1fr;
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
  background: rgba(223, 175, 133, 0.06);
  border: 1px solid rgba(223, 175, 133, 0.2);
  color: rgba(223, 175, 133, 0.55);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.cs-phase__connector {
  flex: 1;
  width: 1px;
  background: rgba(223, 175, 133, 0.1);
  margin: 0.5rem 0;
  min-height: 2rem;
}

.cs-phase:last-child .cs-phase__connector { display: none; }

.cs-phase__body { padding-bottom: 2.5rem; }
.cs-phase:last-child .cs-phase__body { padding-bottom: 0; }

.cs-phase__title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  color: #ffeddf;
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
}

.cs-phase__desc {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 0.9rem;
  color: rgba(255, 237, 223, 0.5);
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
  gap: 0.5rem;
  padding: 0.2rem 0.625rem;
  background: rgba(223, 175, 133, 0.04);
  border: 1px solid rgba(223, 175, 133, 0.1);
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: rgba(255, 237, 223, 0.45);
}

.deliverable-diamond {
  flex-shrink: 0;
  width: 4px;
  height: 4px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
}

.cs-challenges {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cs-challenge {
  padding: 2rem;
  background: #161210;
  border: 1px solid rgba(223, 175, 133, 0.1);
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s ease;

  &:hover { border-color: rgba(223, 175, 133, 0.22); }
}

.cs-challenge__number {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 900;
  color: rgba(223, 175, 133, 0.04);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  font-variant-numeric: tabular-nums;
}

.cs-challenge__title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  color: #ffeddf;
  margin-bottom: 1.25rem;
  letter-spacing: -0.01em;
}

.cs-challenge__pair {
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) { grid-template-columns: 1fr 1fr; }
}

.cs-challenge__block {
  padding: 1rem 1.25rem;
  border-left: 2px solid;

  &--problem {
    background: rgba(220, 38, 38, 0.04);
    border-color: rgba(220, 38, 38, 0.3);
  }

  &--solution {
    background: rgba(223, 175, 133, 0.04);
    border-color: rgba(223, 175, 133, 0.25);
  }
}

.cs-challenge__block-label {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;

  .cs-challenge__block--problem & { color: rgba(220, 38, 38, 0.7); }
  .cs-challenge__block--solution & { color: rgba(223, 175, 133, 0.6); }
}

.cs-challenge__block-text {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 0.875rem;
  color: rgba(255, 237, 223, 0.5);
  line-height: 1.65;
  margin: 0;
}

.cs-results {
  padding: 2.5rem;
  background: #161210;
  border: 1px solid rgba(223, 175, 133, 0.12);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(223, 175, 133, 0.4),
      transparent
    );
  }
}

.cs-results__summary {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  color: rgba(255, 237, 223, 0.65);
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
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-text);
  font-size: 0.9rem;
  color: rgba(255, 237, 223, 0.55);
  line-height: 1.6;
}

.result-diamond {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  background: rgba(223, 175, 133, 0.45);
  transform: rotate(45deg);
}

.cs-gallery {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
}

.cs-gallery__item {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(223, 175, 133, 0.1);
  background: #161210;
  cursor: pointer;
  padding: 0;
  transition: border-color 0.3s ease;

  &:hover { border-color: rgba(223, 175, 133, 0.25); }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 2px;
  }
}

.cs-gallery__image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.4s var(--ease-smooth);

  .cs-gallery__item:hover & { transform: scale(1.04); }
}

.cs-gallery__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s ease;

  .cs-gallery__item:hover & { background: rgba(13, 9, 8, 0.55); }
}

.cs-gallery__expand {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(223, 175, 133, 0.12);
  border: 1px solid rgba(223, 175, 133, 0.3);
  color: rgba(223, 175, 133, 0.8);
  font-size: 1.1rem;
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;

  .cs-gallery__item:hover & {
    opacity: 1;
    transform: scale(1);
  }
}

.cs-nav {
  background: #120703;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
  padding: 3rem 0;
}

.cs-nav__grid {
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
}

.cs-nav__link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(223, 175, 133, 0.08);
  background: #161210;
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: rgba(223, 175, 133, 0.2);
    background: rgba(223, 175, 133, 0.03);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 2px;
  }

  &--next {
    justify-content: flex-end;
    text-align: right;
  }
}

.cs-nav__arrow {
  font-size: 1rem;
  color: rgba(223, 175, 133, 0.4);
  flex-shrink: 0;
  transition: color 0.2s ease, transform 0.2s ease;

  .cs-nav__link:hover & { color: rgba(223, 175, 133, 0.7); }
  .cs-nav__link--prev:hover & { transform: translateX(-3px); }
  .cs-nav__link--next:hover & { transform: translateX(3px); }
}

.cs-nav__direction {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 237, 223, 0.3);
  margin-bottom: 0.375rem;
}

.cs-nav__case-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(0.875rem, 1.1vw, 0.95rem);
  color: rgba(255, 237, 223, 0.65);
  transition: color 0.2s ease;
  letter-spacing: -0.01em;

  .cs-nav__link:hover & { color: rgba(223, 175, 133, 0.8); }
}

.cs-cta-wrap {
  position: relative;
  background: #0d0908;
  overflow: hidden;
  padding: 5rem 2rem;

  @media (min-width: 768px) { padding: 7rem 2rem; }
}

.cta-bg-radial {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 80% at 50% 100%,
    rgba(223, 175, 133, 0.05) 0%,
    transparent 65%
  );
  pointer-events: none;
}

.cta-container {
  position: relative;
  max-width: 44rem;
  margin: 0 auto;
}

.cta-inner {
  position: relative;
  padding: 3rem 2.5rem;
  border: 1px solid rgba(223, 175, 133, 0.12);
  text-align: center;

  @media (min-width: 768px) { padding: 4rem 3.5rem; }
}

.deco-frame-cta {
  position: absolute;
  inset: 0.875rem;
  pointer-events: none;
}

.cta-corner {
  position: absolute;
  width: 1rem;
  height: 1rem;
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
  margin-bottom: 1.5rem;
}

.cta-sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.cta-sep-diamond {
  width: 4px;
  height: 4px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.cta-sep-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.5);
  flex-shrink: 0;
}

.cta-heading {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  line-height: 1.1;
  color: #ffeddf;
  margin: 0 0 1.25rem;
  letter-spacing: -0.02em;
}

.cta-deco-divider {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.cta-div-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.1);

  &--inner { flex: 0 0 0.75rem; }
}

.cta-div-diamond {
  width: 6px;
  height: 6px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 3px;
    height: 3px;
    background: rgba(223, 175, 133, 0.2);
  }
}

.cta-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.5);
  max-width: 44ch;
  margin: 0 auto 2.5rem;
}

.cta-actions {
  display: flex;
  justify-content: center;
}

@media (prefers-reduced-motion: reduce) {
  .cs-loading__spinner { animation: none; }

  .cs-hero__image,
  .cs-gallery__image,
  .cs-gallery__expand,
  .cs-nav__link,
  .cs-nav__arrow,
  .cs-visit-link,
  .cs-overview__card,
  .cs-tech-tag,
  .cs-challenge,
  .cs-gallery__item {
    transition: none;
  }

  .cs-gallery__item:hover .cs-gallery__image { transform: none; }
  .cs-gallery__expand { opacity: 1; transform: none; }
}

html:not(.dark) {

  .cs-loading { background: var(--color-section-light); }
  .cs-loading__text { color: var(--color-text-subtle); }
  .cs-page { background: var(--color-section-light); }

  .cs-hero { background: var(--color-hero-bg); }
  .cs-hero__bg {
    background: radial-gradient(ellipse 70% 60% at 65% 0%, rgba(153, 82, 38, 0.06) 0%, transparent 65%);
  }

  .cs-back {
    color: var(--color-primary-600);
    &:hover { color: var(--color-primary-800); }
  }

  .cs-badge {
    &--category {
      background: rgba(153, 82, 38, 0.06);
      color: var(--color-primary-700);
      border-color: rgba(153, 82, 38, 0.2);
    }
    &--tag {
      background: rgba(153, 82, 38, 0.03);
      color: var(--color-primary-500);
      border-color: rgba(153, 82, 38, 0.12);
    }
  }

  .cs-hero__title    { color: #441a08; }
  .cs-hero__subtitle { color: var(--color-text-subtle); }

  .cs-meta-item__label { color: var(--color-primary-500); }
  .cs-meta-item__value { color: var(--color-text-secondary); }
  .cs-meta-divider     { background: var(--deco-line); }

  .cs-hero__image-frame { border-color: var(--deco-line); }
  .cs-hero__image-glow {
    background: radial-gradient(ellipse at 50% 0%, rgba(153, 82, 38, 0.04) 0%, transparent 60%);
  }

  .cs-visit-link {
    background: rgba(153, 82, 38, 0.05);
    border-color: rgba(153, 82, 38, 0.18);
    color: var(--color-primary-600);
    &:hover {
      background: rgba(153, 82, 38, 0.08);
      border-color: rgba(153, 82, 38, 0.3);
      color: var(--color-primary-700);
    }
  }

  .cs-metrics-strip {
    background: linear-gradient(175deg, #ffe4cf 0%, #ffeddf 100%);
    border-top-color: var(--deco-line);
    border-bottom-color: var(--deco-line);
  }
  .cs-metric-item         { border-right-color: var(--deco-line); }
  .cs-metric-item__value  { color: var(--color-primary-700); }
  .cs-metric-item__label  { color: var(--color-text-subtle); }
  .cs-metric-item__desc   { color: var(--color-text-muted); }

  .cs-main { background: var(--color-section-light); }
  .cs-section__eyebrow { color: var(--color-primary-500); &::before, &::after { background: var(--deco-line); } }

  .cs-overview__card {
    background: linear-gradient(175deg, #ffffff 0%, #fff7f0 100%);
    border-color: var(--deco-line);
    &:hover { border-color: rgba(153, 82, 38, 0.25); }
  }
  .overview-diamond      { background: rgba(153, 82, 38, 0.4); }
  .cs-overview__heading  { color: var(--color-primary-600); }
  .cs-overview__text     { color: var(--color-text-secondary); }

  .cs-tech-section__label { color: var(--color-text-muted); }
  .cs-tech-tag {
    background: rgba(153, 82, 38, 0.04);
    border-color: rgba(153, 82, 38, 0.12);
    color: var(--color-primary-600);
    &:hover { background: rgba(153, 82, 38, 0.07); border-color: rgba(153, 82, 38, 0.22); }
  }

  .cs-phase__number {
    background: rgba(153, 82, 38, 0.05);
    border-color: rgba(153, 82, 38, 0.2);
    color: var(--color-primary-600);
  }
  .cs-phase__connector { background: var(--deco-line); }
  .cs-phase__title     { color: var(--color-text-primary); }
  .cs-phase__desc      { color: var(--color-text-subtle); }
  .cs-deliverable {
    background: rgba(153, 82, 38, 0.03);
    border-color: rgba(153, 82, 38, 0.1);
    color: var(--color-text-secondary);
  }
  .deliverable-diamond { background: rgba(153, 82, 38, 0.4); }

  .cs-challenge {
    background: linear-gradient(175deg, #ffffff 0%, #fff7f0 100%);
    border-color: var(--deco-line);
    &:hover { border-color: rgba(153, 82, 38, 0.25); }
  }
  .cs-challenge__number { color: rgba(153, 82, 38, 0.06); }
  .cs-challenge__title  { color: var(--color-text-primary); }
  .cs-challenge__block--problem {
    background: rgba(220, 38, 38, 0.04);
    border-color: rgba(220, 38, 38, 0.28);
  }
  .cs-challenge__block--solution {
    background: rgba(153, 82, 38, 0.04);
    border-color: rgba(153, 82, 38, 0.22);
  }
  .cs-challenge__block-text { color: var(--color-text-secondary); }

  .cs-results {
    background: linear-gradient(175deg, #ffe4cf 0%, #ffeddf 60%, #faf7f4 100%);
    border-color: var(--deco-line-strong);
    &::before { background: linear-gradient(90deg, transparent, rgba(153, 82, 38, 0.35), transparent); }
  }
  .cs-results__summary { color: var(--color-text-secondary); }
  .cs-results__item    { color: var(--color-text-secondary); }
  .result-diamond      { background: rgba(153, 82, 38, 0.45); }

  .cs-gallery__item {
    background: #f5efe8;
    border-color: var(--deco-line);
    &:hover { border-color: rgba(153, 82, 38, 0.28); }
  }
  .cs-gallery__overlay .cs-gallery__item:hover & { background: rgba(245, 239, 232, 0.55); }

  .cs-nav { background: var(--color-section-alt); border-top-color: var(--deco-line); }
  .cs-nav__link {
    background: linear-gradient(175deg, #ffffff 0%, #fff7f0 100%);
    border-color: var(--deco-line);
    &:hover { border-color: rgba(153, 82, 38, 0.25); background: rgba(153, 82, 38, 0.02); }
  }
  .cs-nav__arrow     { color: var(--color-primary-400); }
  .cs-nav__direction { color: var(--color-text-muted); }
  .cs-nav__case-title { color: var(--color-text-secondary); }
  .cs-nav__link:hover .cs-nav__case-title { color: var(--color-primary-700); }

  .cs-cta-wrap { background: var(--color-section-alt); }
  .cta-bg-radial {
    background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(153, 82, 38, 0.04) 0%, transparent 65%);
  }
  .cta-inner         { border-color: var(--deco-line-strong); }
  .cta-corner        { border-color: var(--deco-border); }
  .cta-sep-line      { background: var(--deco-line); }
  .cta-sep-diamond   { background: var(--deco-diamond); }
  .cta-sep-text      { color: var(--deco-text); }
  .cta-heading       { color: var(--color-text-primary); }
  .cta-div-line      { background: var(--deco-line); &--inner { background: var(--deco-line); } }
  .cta-div-diamond   { background: var(--deco-diamond); &--sm { background: var(--deco-diamond-sm); } }
  .cta-description   { color: var(--color-text-subtle); }
}
</style>
