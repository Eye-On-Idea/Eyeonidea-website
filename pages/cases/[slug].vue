<script setup lang="ts">
const route = useRoute();
const { t, tm, locale } = useI18n();

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
  learnings?: string[];
  gallery?: string[];
  nextSteps?: string[];
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

// Get case study directly by slug from the split i18n structure
const caseStudy = computed<CaseStudy | undefined>(() => {
  const slug = route.params.slug as string;
  const all = tm("caseStudies") as Record<string, unknown>;
  const data = all[slug];
  return data && typeof data === "object" ? (data as CaseStudy) : undefined;
});

// Full list (from lightweight index) used only for prev/next navigation
const caseStudies = computed<CaseStudy[]>(() => {
  const studies = tm("casesIndex") as unknown;
  if (Array.isArray(studies)) return studies as CaseStudy[];
  if (studies && typeof studies === "object") return Object.values(studies) as CaseStudy[];
  return [];
});

// Redirect to /cases if slug not found (client-side only)
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

// Prev/next navigation (circular)
const currentIndex = computed(() =>
  caseStudies.value.findIndex((c) => c.slug === route.params.slug)
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

const getBadgeLabel = (company: string) => {
  if (company === "Eye On Idea") return t("cases.badges.eyeOnIdea");
  if (company === "Herqulez") return t("cases.badges.herqulez");
  return company;
};

const isOwnBrand = (company: string) =>
  company === "Eye On Idea" || company === "Herqulez";
</script>

<template>
  <!-- Loading/not found state -->
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
    <!-- Sticky back nav -->
    <div class="cs-back-bar">
      <UContainer class="max-w-360">
        <NuxtLink to="/cases" class="cs-back-link">
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
          {{ t("cases.navigation.backToCases") }}
        </NuxtLink>
      </UContainer>
    </div>

    <!-- Hero -->
    <section class="cs-hero">
      <div class="cs-hero__bg" aria-hidden="true">
        <div :class="['cs-hero__orb', isOwnBrand(caseStudy.company) ? 'cs-hero__orb--brand' : 'cs-hero__orb--client']" />
        <div :class="['cs-hero__orb cs-hero__orb--secondary', isOwnBrand(caseStudy.company) ? 'cs-hero__orb--brand' : 'cs-hero__orb--client']" />
      </div>
      <UContainer class="max-w-360">
        <div class="cs-hero__content">
          <!-- Badge -->
          <div class="cs-hero__badge-wrap">
            <span :class="['cs-hero__badge', isOwnBrand(caseStudy.company) ? 'cs-hero__badge--brand' : 'cs-hero__badge--client']">
              {{ getBadgeLabel(caseStudy.company) }}
            </span>
          </div>

          <h1 class="cs-hero__title">{{ caseStudy.title }}</h1>
          <p class="cs-hero__subtitle">{{ caseStudy.subtitle }}</p>

          <!-- Meta stats -->
          <div class="cs-meta">
            <div class="cs-meta__item">
              <p class="cs-meta__label">{{ t("cases.stats.role") }}</p>
              <p class="cs-meta__value">{{ caseStudy.role }}</p>
            </div>
            <div class="cs-meta__item">
              <p class="cs-meta__label">{{ t("cases.stats.year") }}</p>
              <p class="cs-meta__value">{{ caseStudy.year }}</p>
            </div>
            <div class="cs-meta__item">
              <p class="cs-meta__label">{{ t("cases.stats.duration") }}</p>
              <p class="cs-meta__value">{{ caseStudy.duration }}</p>
            </div>
            <div class="cs-meta__item">
              <a
                v-if="caseStudy.url"
                :href="caseStudy.url"
                target="_blank"
                rel="noopener noreferrer"
                :class="['cs-meta__link', isOwnBrand(caseStudy.company) ? 'cs-meta__link--brand' : 'cs-meta__link--client']"
              >
                {{ t("cases.cta.visitSite") }}
                <UIcon name="i-lucide-external-link" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Main content -->
    <div class="cs-main">
      <UContainer class="max-w-360">
        <div class="cs-content">
          <!-- Overview -->
          <section class="cs-section">
            <h2 class="cs-section__title">{{ t("cases.sections.overview") }}</h2>
            <div class="cs-overview-grid">
              <div class="cs-overview-card">
                <h3 :class="['cs-overview-card__heading', isOwnBrand(caseStudy.company) ? 'cs-overview-card__heading--brand' : 'cs-overview-card__heading--client']">
                  {{ t("cases.sections.challenge") }}
                </h3>
                <p class="cs-overview-card__text">{{ caseStudy.overview.challenge }}</p>
              </div>
              <div class="cs-overview-card">
                <h3 :class="['cs-overview-card__heading', isOwnBrand(caseStudy.company) ? 'cs-overview-card__heading--brand' : 'cs-overview-card__heading--client']">
                  {{ t("cases.sections.solution") }}
                </h3>
                <p class="cs-overview-card__text">{{ caseStudy.overview.solution }}</p>
              </div>
              <div class="cs-overview-card">
                <h3 :class="['cs-overview-card__heading', isOwnBrand(caseStudy.company) ? 'cs-overview-card__heading--brand' : 'cs-overview-card__heading--client']">
                  {{ t("cases.sections.outcome") }}
                </h3>
                <p class="cs-overview-card__text">{{ caseStudy.overview.outcome }}</p>
              </div>
            </div>
          </section>

          <!-- Key Metrics -->
          <section
            v-if="caseStudy.keyMetrics && caseStudy.keyMetrics.length"
            :class="['cs-metrics', isOwnBrand(caseStudy.company) ? 'cs-metrics--brand' : 'cs-metrics--client']"
          >
            <h2 class="cs-metrics__title">{{ t("cases.sections.keyMetrics") }}</h2>
            <div class="cs-metrics__grid">
              <div
                v-for="metric in caseStudy.keyMetrics"
                :key="metric.label"
                class="cs-metric"
              >
                <p :class="['cs-metric__value', isOwnBrand(caseStudy.company) ? 'cs-metric__value--brand' : 'cs-metric__value--client']">
                  {{ metric.value }}
                </p>
                <p class="cs-metric__label">{{ metric.label }}</p>
                <p class="cs-metric__description">{{ metric.description }}</p>
              </div>
            </div>
          </section>

          <!-- Technologies -->
          <section
            v-if="caseStudy.technologies && caseStudy.technologies.length"
            class="cs-section"
          >
            <h3 class="cs-section__subtitle">{{ t("cases.stats.technologies") }}</h3>
            <div class="cs-tech-list">
              <span
                v-for="tech in caseStudy.technologies"
                :key="tech"
                class="cs-tech-tag"
              >{{ tech }}</span>
            </div>
          </section>

          <!-- Process -->
          <section
            v-if="caseStudy.process && caseStudy.process.length"
            class="cs-section"
          >
            <h2 class="cs-section__title">{{ t("cases.sections.process") }}</h2>
            <div class="cs-process">
              <div
                v-for="(phase, index) in caseStudy.process"
                :key="index"
                :class="['cs-phase', isOwnBrand(caseStudy.company) ? 'cs-phase--brand' : 'cs-phase--client']"
              >
                <div :class="['cs-phase__number', isOwnBrand(caseStudy.company) ? 'cs-phase__number--brand' : 'cs-phase__number--client']">
                  {{ index + 1 }}
                </div>
                <h3 class="cs-phase__title">{{ phase.phase }}</h3>
                <p class="cs-phase__description">{{ phase.description }}</p>
                <div v-if="phase.deliverables && phase.deliverables.length" class="cs-phase__deliverables">
                  <span
                    v-for="d in phase.deliverables"
                    :key="d"
                    class="cs-deliverable"
                  >{{ d }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Challenges and Solutions -->
          <section
            v-if="caseStudy.challenges && caseStudy.challenges.length"
            class="cs-section"
          >
            <h2 class="cs-section__title">{{ t("cases.sections.challenges") }}</h2>
            <div class="cs-challenges">
              <div
                v-for="challenge in caseStudy.challenges"
                :key="challenge.title"
                class="cs-challenge"
              >
                <h3 class="cs-challenge__title">{{ challenge.title }}</h3>
                <div class="cs-challenge__item">
                  <p class="cs-challenge__label cs-challenge__label--problem">Problem</p>
                  <p class="cs-challenge__text">{{ challenge.problem }}</p>
                </div>
                <div class="cs-challenge__item">
                  <p class="cs-challenge__label cs-challenge__label--solution">Solution</p>
                  <p class="cs-challenge__text">{{ challenge.solution }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Results -->
          <section v-if="caseStudy.results" class="cs-section">
            <h2 class="cs-section__title">{{ t("cases.sections.results") }}</h2>
            <div class="cs-results">
              <p class="cs-results__summary">{{ caseStudy.results.summary }}</p>
              <ul v-if="caseStudy.results.highlights" class="cs-results__list">
                <li
                  v-for="highlight in caseStudy.results.highlights"
                  :key="highlight"
                  class="cs-results__item"
                >
                  <UIcon name="i-lucide-check-circle" class="cs-results__icon" aria-hidden="true" />
                  <span>{{ highlight }}</span>
                </li>
              </ul>
            </div>
          </section>

          <!-- Key Learnings -->
          <section
            v-if="caseStudy.learnings && caseStudy.learnings.length"
            class="cs-section"
          >
            <h2 class="cs-section__title">{{ t("cases.sections.learnings") }}</h2>
            <div class="cs-learnings">
              <ul class="cs-learnings__list">
                <li
                  v-for="learning in caseStudy.learnings"
                  :key="learning"
                  class="cs-learnings__item"
                >
                  <UIcon name="i-lucide-lightbulb" class="cs-learnings__icon" aria-hidden="true" />
                  <span>{{ learning }}</span>
                </li>
              </ul>
            </div>
          </section>

          <!-- Gallery -->
          <section
            v-if="caseStudy.gallery && caseStudy.gallery.length"
            class="cs-section"
          >
            <h2 class="cs-section__title">{{ t("cases.sections.gallery") }}</h2>
            <div class="cs-gallery">
              <button
                v-for="(image, index) in caseStudy.gallery"
                :key="index"
                type="button"
                class="cs-gallery__item group"
                :aria-label="`${caseStudy.title} screenshot ${index + 1}, open gallery`"
                @click="openGallery(index)"
              >
                <img
                  :src="image"
                  :alt="`${caseStudy.title} screenshot ${index + 1}`"
                  class="cs-gallery__image"
                />
                <div class="cs-gallery__overlay">
                  <div class="cs-gallery__expand">
                    <UIcon name="i-lucide-maximize-2" class="w-6 h-6" />
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

          <!-- Next Steps -->
          <section
            v-if="caseStudy.nextSteps && caseStudy.nextSteps.length"
            class="cs-section"
          >
            <h2 class="cs-section__title">{{ t("cases.sections.nextSteps") }}</h2>
            <div class="cs-next-steps">
              <ul class="cs-next-steps__list">
                <li
                  v-for="step in caseStudy.nextSteps"
                  :key="step"
                  class="cs-next-steps__item"
                >
                  <UIcon
                    name="i-lucide-arrow-right"
                    :class="['cs-next-steps__icon', isOwnBrand(caseStudy.company) ? 'cs-next-steps__icon--brand' : 'cs-next-steps__icon--client']"
                    aria-hidden="true"
                  />
                  <span>{{ step }}</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </UContainer>
    </div>

    <!-- Case navigation -->
    <nav
      v-if="previousCase && nextCase"
      class="cs-nav"
      :aria-label="t('cases.navigation.backToCases')"
    >
      <UContainer class="max-w-360">
        <div class="cs-nav__grid">
          <NuxtLink :to="`/cases/${previousCase.slug}`" class="cs-nav__link cs-nav__link--prev">
            <p class="cs-nav__direction">{{ t("cases.navigation.previousCase") }}</p>
            <h3 class="cs-nav__case-title">{{ previousCase.title }}</h3>
          </NuxtLink>
          <NuxtLink :to="`/cases/${nextCase.slug}`" class="cs-nav__link cs-nav__link--next">
            <p class="cs-nav__direction">{{ t("cases.navigation.nextCase") }}</p>
            <h3 class="cs-nav__case-title">{{ nextCase.title }}</h3>
          </NuxtLink>
        </div>
      </UContainer>
    </nav>

    <!-- CTA -->
    <section class="cs-cta-section">
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
/* ---- Loading ---- */
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

/* ---- Page ---- */
.cs-page {
  min-height: 100vh;
  background: var(--color-bg);
}

/* ---- Back bar ---- */
.cs-back-bar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: color-mix(in srgb, var(--color-surface-1) 85%, transparent);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
}

.cs-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 200ms var(--ease-smooth);

  &:hover {
    color: var(--color-primary-600);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

/* ---- Hero ---- */
.cs-hero {
  position: relative;
  background: var(--color-surface-1);
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
  padding: 4rem 0;

  @media (min-width: 768px) {
    padding: 6rem 0;
  }
}

.cs-hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cs-hero__orb {
  position: absolute;
  width: 24rem;
  height: 24rem;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.06;

  &--brand {
    background: radial-gradient(circle, var(--color-primary-400), var(--color-accent-400));
  }

  &--client {
    background: radial-gradient(circle, var(--color-accent-500), var(--color-primary-400));
  }

  &:first-child {
    top: -8rem;
    right: -8rem;
  }

  &.cs-hero__orb--secondary {
    bottom: -8rem;
    left: -8rem;
  }
}

.cs-hero__content {
  max-width: 56rem;
}

.cs-hero__badge-wrap {
  margin-bottom: 1.5rem;
}

.cs-hero__badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid;

  &--brand {
    background: color-mix(in srgb, var(--color-primary-500) 10%, transparent);
    color: var(--color-primary-700);
    border-color: color-mix(in srgb, var(--color-primary-500) 20%, transparent);
  }

  &--client {
    background: color-mix(in srgb, var(--color-accent-500) 10%, transparent);
    color: var(--color-accent-700);
    border-color: color-mix(in srgb, var(--color-accent-500) 20%, transparent);
  }
}

.cs-hero__title {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 800;
  color: var(--color-text-heading);
  line-height: 1.1;
  margin-bottom: 1rem;
}

.cs-hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* ---- Meta stats ---- */
.cs-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.cs-meta__label {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.cs-meta__value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-heading);
}

.cs-meta__link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 200ms var(--ease-smooth);

  &:hover { opacity: 0.75; }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
    border-radius: 4px;
  }

  &--brand { color: var(--color-primary-600); }
  &--client { color: var(--color-accent-600); }
}

/* ---- Main content ---- */
.cs-main {
  padding: 4rem 0;

  @media (min-width: 768px) {
    padding: 6rem 0;
  }
}

.cs-content {
  max-width: 56rem;
  margin: 0 auto;
}

/* ---- Sections ---- */
.cs-section {
  margin-bottom: 4rem;
}

.cs-section__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-text-heading);
  margin-bottom: 2rem;
}

.cs-section__subtitle {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin-bottom: 1rem;
}

/* ---- Overview ---- */
.cs-overview-grid {
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.cs-overview-card {
  padding: 1.5rem;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
}

.cs-overview-card__heading {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;

  &--brand { color: var(--color-primary-600); }
  &--client { color: var(--color-accent-600); }
}

.cs-overview-card__text {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* ---- Metrics ---- */
.cs-metrics {
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid;
  margin-bottom: 4rem;

  &--brand {
    background: linear-gradient(135deg,
      color-mix(in srgb, var(--color-primary-500) 5%, transparent),
      color-mix(in srgb, var(--color-accent-500) 5%, transparent)
    );
    border-color: color-mix(in srgb, var(--color-primary-500) 15%, transparent);
  }

  &--client {
    background: linear-gradient(135deg,
      color-mix(in srgb, var(--color-accent-500) 5%, transparent),
      color-mix(in srgb, var(--color-primary-400) 5%, transparent)
    );
    border-color: color-mix(in srgb, var(--color-accent-500) 15%, transparent);
  }
}

.cs-metrics__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-heading);
  text-align: center;
  margin-bottom: 1.5rem;
}

.cs-metrics__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  max-width: 36rem;
  margin: 0 auto;
  text-align: center;
}

.cs-metric__value {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
  line-height: 1;

  &--brand { color: var(--color-primary-600); }
  &--client { color: var(--color-accent-600); }
}

.cs-metric__label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-heading);
  margin-bottom: 0.25rem;
}

.cs-metric__description {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

/* ---- Technologies ---- */
.cs-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.cs-tech-tag {
  padding: 0.5rem 1rem;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

/* ---- Process ---- */
.cs-process {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.cs-phase {
  position: relative;
  padding-left: 2.5rem;
  border-left: 2px solid;

  &--brand { border-color: var(--color-primary-500); }
  &--client { border-color: var(--color-accent-500); }
}

.cs-phase__number {
  position: absolute;
  left: -1rem;
  top: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #fff;

  &--brand { background: var(--color-primary-500); }
  &--client { background: var(--color-accent-500); }
}

.cs-phase__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin-bottom: 0.75rem;
}

.cs-phase__description {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.7;
}

.cs-phase__deliverables {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cs-deliverable {
  padding: 0.25rem 0.625rem;
  background: var(--color-surface-2);
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

/* ---- Challenges ---- */
.cs-challenges {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cs-challenge {
  padding: 1.5rem;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
}

.cs-challenge__title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin-bottom: 1rem;
}

.cs-challenge__item {
  margin-bottom: 0.75rem;
}

.cs-challenge__label {
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;

  &--problem { color: var(--color-error, #dc2626); }
  &--solution { color: var(--color-success, #16a34a); }
}

.cs-challenge__text {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* ---- Results ---- */
.cs-results {
  padding: 2rem;
  background: color-mix(in srgb, #16a34a 6%, var(--color-surface-1) 94%);
  border: 1px solid color-mix(in srgb, #16a34a 20%, transparent);
  border-radius: 1rem;
}

.cs-results__summary {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
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
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.cs-results__icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #16a34a;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

/* ---- Learnings ---- */
.cs-learnings {
  padding: 2rem;
  background: color-mix(in srgb, var(--color-primary-500) 5%, var(--color-surface-1) 95%);
  border: 1px solid color-mix(in srgb, var(--color-primary-500) 15%, transparent);
  border-radius: 1rem;
}

.cs-learnings__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cs-learnings__item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.cs-learnings__icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary-500);
  flex-shrink: 0;
  margin-top: 0.125rem;
}

/* ---- Gallery ---- */
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
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface-1);
  cursor: pointer;
  padding: 0;

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
}

.cs-gallery__image {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  transition: transform 300ms var(--ease-smooth);

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
  transition: background 200ms var(--ease-smooth);

  .cs-gallery__item:hover & {
    background: rgba(0, 0, 0, 0.2);
  }
}

.cs-gallery__expand {
  padding: 0.75rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-surface-1) 90%, transparent);
  backdrop-filter: blur(8px);
  color: var(--color-text-heading);
  opacity: 0;
  transition: opacity 200ms var(--ease-smooth);

  .cs-gallery__item:hover & {
    opacity: 1;
  }
}

/* ---- Next Steps ---- */
.cs-next-steps {
  padding: 2rem;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
}

.cs-next-steps__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cs-next-steps__item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.cs-next-steps__icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;

  &--brand { color: var(--color-primary-500); }
  &--client { color: var(--color-accent-500); }
}

/* ---- Case navigation ---- */
.cs-nav {
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-1);
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
  display: block;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  text-decoration: none;
  transition: border-color 200ms var(--ease-smooth), box-shadow 200ms var(--ease-smooth);

  &:hover {
    border-color: color-mix(in srgb, var(--color-primary-500) 50%, transparent);
    box-shadow: 0 8px 24px -8px color-mix(in srgb, var(--color-primary-500) 15%, transparent);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  &--next {
    text-align: right;
  }
}

.cs-nav__direction {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
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

/* ---- CTA ---- */
.cs-cta-section {
  padding: 0 0 5rem;

  @media (min-width: 768px) {
    padding: 0 0 6rem;
  }
}

/* Dark mode adjustments */
:global(.dark) .cs-hero__badge--brand {
  color: var(--color-primary-300);
}

:global(.dark) .cs-hero__badge--client {
  color: var(--color-accent-300);
}

:global(.dark) .cs-back-link:hover {
  color: var(--color-primary-400);
}

:global(.dark) .cs-meta__link--brand {
  color: var(--color-primary-400);
}

:global(.dark) .cs-meta__link--client {
  color: var(--color-accent-400);
}

:global(.dark) .cs-overview-card__heading--brand {
  color: var(--color-primary-400);
}

:global(.dark) .cs-overview-card__heading--client {
  color: var(--color-accent-400);
}

:global(.dark) .cs-metric__value--brand {
  color: var(--color-primary-400);
}

:global(.dark) .cs-metric__value--client {
  color: var(--color-accent-400);
}

:global(.dark) .cs-nav__case-title {
  .cs-nav__link:hover & {
    color: var(--color-primary-400);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cs-gallery__image,
  .cs-gallery__overlay,
  .cs-gallery__expand,
  .cs-nav__link {
    transition: none;
  }

  .cs-gallery__item:hover .cs-gallery__image {
    transform: none;
  }
}
</style>
