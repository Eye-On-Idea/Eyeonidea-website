<script setup lang="ts">
const { t, tm } = useI18n();

interface CaseStudy {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  company: string;
  role?: string;
  year: string;
  duration?: string;
  url?: string;
  thumbnail?: string;
  tags?: string[];
  category?: "myCompanies" | "clientWork" | "sideProjects" | string;
}

const config = useRuntimeConfig();
const baseUrl = config.public.siteUrl || "https://eyeonidea.com";

useSeo({
  title: t("cases.metaTitle"),
  description: t("cases.metaDescription"),
  keywords: [
    "web development portfolio",
    "case studies",
    "website design Aalborg",
    "UX/UI design",
    "digital projects",
    "Eye On Idea",
    "Tegetec",
    "Herqulez",
    "web agency Denmark",
  ],
  type: "website",
  schemaType: "CollectionPage",
  breadcrumbs: [
    { name: "Home", url: `${baseUrl}` },
    { name: t("cases.metaTitle"), url: `${baseUrl}/cases` },
  ],
});

const caseStudies = computed<CaseStudy[]>(() => {
  const studies = tm("casesIndex") as unknown;
  if (Array.isArray(studies)) {
    return studies as CaseStudy[];
  }
  if (studies && typeof studies === "object") {
    return Object.values(studies) as CaseStudy[];
  }
  return [];
});

type CaseGroups = {
  myCompanies: CaseStudy[];
  clientWork: CaseStudy[];
  sideProjects: CaseStudy[];
  [key: string]: CaseStudy[];
};

const groupedCases = computed<CaseGroups>(() => {
  const groups: CaseGroups = {
    myCompanies: [],
    clientWork: [],
    sideProjects: [],
  };
  caseStudies.value.forEach((cs) => {
    const category = cs.category || "clientWork";
    if (!groups[category]) groups[category] = [];
    groups[category].push(cs);
  });
  return groups;
});

const getBadgeLabel = (company: string) => {
  if (company === "Eye On Idea") return t("cases.badges.eyeOnIdea");
  if (company === "Herqulez") return t("cases.badges.herqulez");
  return company;
};
</script>

<template>
  <div class="cases-page">
    <!-- Hero -->
    <section class="cases-hero">
      <div class="cases-hero__bg" aria-hidden="true">
        <div class="cases-hero__orb cases-hero__orb--right" />
        <div class="cases-hero__orb cases-hero__orb--left" />
      </div>
      <UContainer class="max-w-360">
        <div class="cases-hero__content">
          <div class="cases-hero__label">
            <span>Portfolio</span>
          </div>
          <h1 class="cases-hero__title">{{ t("cases.hero.title") }}</h1>
          <p class="cases-hero__subtitle">{{ t("cases.hero.subtitle") }}</p>
          <p class="cases-hero__description">{{ t("cases.hero.description") }}</p>
        </div>
      </UContainer>
    </section>

    <!-- Cases Grid -->
    <section class="cases-grid-section">
      <UContainer class="max-w-360">
        <!-- Client Work -->
        <div v-if="groupedCases.clientWork.length > 0" class="cases-category">
          <div class="cases-category__header">
            <h2 class="cases-category__title">{{ t("cases.categories.clientWork") }}</h2>
            <div class="cases-category__line cases-category__line--accent" />
          </div>
          <div class="cases-grid">
            <NuxtLink
              v-for="cs in groupedCases.clientWork"
              :key="cs.id"
              :to="`/cases/${cs.slug}`"
              class="case-card case-card--client group"
            >
              <div class="case-card__image-wrap">
                <img
                  :src="cs.thumbnail"
                  :alt="`${cs.title} logo`"
                  class="case-card__image"
                />
                <div class="case-card__badge case-card__badge--client">
                  {{ cs.company }}
                </div>
              </div>
              <div class="case-card__body">
                <h3 class="case-card__title case-card__title--client">{{ cs.title }}</h3>
                <p class="case-card__subtitle">{{ cs.subtitle }}</p>
                <div class="case-card__tags">
                  <span
                    v-for="tag in (cs.tags || []).slice(0, 3)"
                    :key="tag"
                    class="case-card__tag"
                  >{{ tag }}</span>
                </div>
                <div class="case-card__footer">
                  <span class="case-card__year">{{ cs.year }}</span>
                  <span class="case-card__cta case-card__cta--client">
                    {{ t("cases.cta.viewCase") }}
                    <UIcon name="i-lucide-arrow-right" class="case-card__cta-icon" />
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Our Brands -->
        <div v-if="groupedCases.myCompanies.length > 0" class="cases-category">
          <div class="cases-category__header">
            <h2 class="cases-category__title">{{ t("cases.categories.myCompanies") }}</h2>
            <div class="cases-category__line cases-category__line--brand" />
          </div>
          <div class="cases-grid">
            <NuxtLink
              v-for="cs in groupedCases.myCompanies"
              :key="cs.id"
              :to="`/cases/${cs.slug}`"
              class="case-card group"
            >
              <div class="case-card__image-wrap">
                <img
                  :src="cs.thumbnail"
                  :alt="`${cs.title} logo`"
                  class="case-card__image"
                />
                <div class="case-card__badge case-card__badge--brand">
                  {{ getBadgeLabel(cs.company) }}
                </div>
              </div>
              <div class="case-card__body">
                <h3 class="case-card__title">{{ cs.title }}</h3>
                <p class="case-card__subtitle">{{ cs.subtitle }}</p>
                <div class="case-card__tags">
                  <span
                    v-for="tag in (cs.tags || []).slice(0, 3)"
                    :key="tag"
                    class="case-card__tag"
                  >{{ tag }}</span>
                </div>
                <div class="case-card__footer">
                  <span class="case-card__year">{{ cs.year }}</span>
                  <span class="case-card__cta">
                    {{ t("cases.cta.viewCase") }}
                    <UIcon name="i-lucide-arrow-right" class="case-card__cta-icon" />
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="caseStudies.length === 0" class="cases-empty">
          <UIcon name="i-lucide-folder-search" class="cases-empty__icon" aria-hidden="true" />
          <p class="cases-empty__text">No case studies available yet.</p>
        </div>
      </UContainer>
    </section>

    <!-- CTA -->
    <section class="cases-cta-section">
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
.cases-page {
  min-height: 100vh;
  background: var(--color-bg);
}

/* ---- Hero ---- */
.cases-hero {
  position: relative;
  background: var(--color-surface-1);
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
  padding: 5rem 0 4rem;

  @media (min-width: 768px) {
    padding: 8rem 0 6rem;
  }
}

.cases-hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cases-hero__orb {
  position: absolute;
  width: 24rem;
  height: 24rem;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.06;
}

.cases-hero__orb--right {
  top: -8rem;
  right: -8rem;
  background: radial-gradient(circle, var(--color-primary-400), var(--color-accent-400));
}

.cases-hero__orb--left {
  bottom: -8rem;
  left: -8rem;
  background: radial-gradient(circle, var(--color-accent-400), var(--color-primary-400));
}

.cases-hero__content {
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
}

.cases-hero__label {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: color-mix(in srgb, var(--color-primary-500) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary-500) 20%, transparent);
  border-radius: 9999px;
  margin-bottom: 1.5rem;

  span {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-primary-600);
  }
}

.cases-hero__title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  color: var(--color-text-heading);
  line-height: 1.1;
  margin-bottom: 1rem;
}

.cases-hero__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  font-weight: 500;
  color: var(--color-primary-600);
  margin-bottom: 0.75rem;
}

.cases-hero__description {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  max-width: 36rem;
  margin: 0 auto;
  line-height: 1.7;
}

/* ---- Grid section ---- */
.cases-grid-section {
  padding: 4rem 0 6rem;

  @media (min-width: 768px) {
    padding: 6rem 0 8rem;
  }
}

.cases-category {
  margin-bottom: 5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.cases-category__header {
  margin-bottom: 2rem;
}

.cases-category__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-text-heading);
  margin-bottom: 0.5rem;
}

.cases-category__line {
  height: 3px;
  width: 4rem;
  border-radius: 9999px;

  &--brand {
    background: linear-gradient(to right, var(--color-primary-500), var(--color-accent-500));
  }

  &--accent {
    background: linear-gradient(to right, var(--color-accent-500), var(--color-primary-400));
  }
}

/* ---- Case grid ---- */
.cases-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ---- Case card ---- */
.case-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 300ms var(--ease-smooth), box-shadow 300ms var(--ease-smooth), border-color 300ms var(--ease-smooth);
  text-decoration: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px -12px color-mix(in srgb, var(--color-primary-500) 15%, transparent);
    border-color: color-mix(in srgb, var(--color-primary-500) 50%, transparent);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  &--client:hover {
    box-shadow: 0 20px 40px -12px color-mix(in srgb, var(--color-accent-500) 15%, transparent);
    border-color: color-mix(in srgb, var(--color-accent-500) 50%, transparent);
  }
}

.case-card__image-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  background: var(--color-primary-950);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
}

.case-card__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 70%;
  transition: transform 300ms var(--ease-smooth);

  .case-card:hover & {
    transform: scale(1.05);
  }
}

.case-card__badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
  border: 1px solid;

  &--brand {
    background: color-mix(in srgb, var(--color-primary-500) 15%, var(--color-surface-1) 85%);
    color: var(--color-primary-700);
    border-color: color-mix(in srgb, var(--color-primary-500) 25%, transparent);
  }

  &--client {
    background: color-mix(in srgb, var(--color-accent-500) 15%, var(--color-surface-1) 85%);
    color: var(--color-accent-700);
    border-color: color-mix(in srgb, var(--color-accent-500) 25%, transparent);
  }
}

.case-card__body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.case-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin-bottom: 0.5rem;
  transition: color 200ms var(--ease-smooth);

  .case-card:hover & {
    color: var(--color-primary-600);
  }
}

.case-card__title--client {
  .case-card:hover & {
    color: var(--color-accent-600);
  }
}

.case-card__subtitle {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.case-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 1rem;
}

.case-card__tag {
  padding: 0.25rem 0.5rem;
  background: var(--color-surface-2);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.case-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.case-card__year {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.case-card__cta {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-primary-600);

  &--client {
    color: var(--color-accent-600);
  }
}

.case-card__cta-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 200ms var(--ease-smooth);

  .case-card:hover & {
    transform: translateX(3px);
  }
}

/* ---- Empty state ---- */
.cases-empty {
  text-align: center;
  padding: 4rem 1rem;
}

.cases-empty__icon {
  width: 4rem;
  height: 4rem;
  color: var(--color-text-muted);
  margin: 0 auto 1rem;
}

.cases-empty__text {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
}

/* ---- CTA section ---- */
.cases-cta-section {
  padding: 0 0 5rem;

  @media (min-width: 768px) {
    padding: 0 0 6rem;
  }
}

/* Dark mode */
:global(.dark) .cases-hero__label span {
  color: var(--color-primary-300);
}

:global(.dark) .cases-hero__subtitle {
  color: var(--color-primary-400);
}

:global(.dark) .case-card__badge--brand {
  color: var(--color-primary-300);
}

:global(.dark) .case-card__badge--client {
  color: var(--color-accent-300);
}

:global(.dark) .case-card__title {
  .case-card:hover & {
    color: var(--color-primary-400);
  }
}

:global(.dark) .case-card__title--client {
  .case-card:hover & {
    color: var(--color-accent-400);
  }
}

:global(.dark) .case-card__cta {
  color: var(--color-primary-400);

  &--client {
    color: var(--color-accent-400);
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-card,
  .case-card__image,
  .case-card__cta-icon {
    transition: none;
  }

  .case-card:hover {
    transform: none;
  }
}
</style>
