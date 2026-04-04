<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();
const localePath = useLocalePath();

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
  if (Array.isArray(studies)) return studies as CaseStudy[];
  if (studies && typeof studies === "object")
    return Object.values(studies) as CaseStudy[];
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

// Scroll-reveal
const heroRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const isHeroVisible = ref(false);
const isGridVisible = ref(false);

onMounted(() => {
  const obs = (el: HTMLElement | null, setter: (v: boolean) => void) => {
    if (!el) return;
    const o = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setter(true);
          o.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    o.observe(el);
    onUnmounted(() => o.disconnect());
  };
  obs(heroRef.value, (v) => (isHeroVisible.value = v));
  obs(gridRef.value, (v) => (isGridVisible.value = v));
});
</script>

<template>
  <div class="cases-page">

    <!-- ── Hero ──────────────────────────────────────────────── -->
    <section
      ref="heroRef"
      class="cases-hero"
      aria-labelledby="cases-hero-heading"
    >
      <div class="hero-bg" aria-hidden="true" />

      <!-- Art deco corner brackets — full viewport edges like PageHero -->
      <div class="deco-frame deco-frame--page" aria-hidden="true">
        <span class="corner corner--tl" />
        <span class="corner corner--tr" />
        <span class="corner corner--bl" />
        <span class="corner corner--br" />
      </div>

      <div class="hero-container">
        <div class="hero-content" :class="{ 'animate-in': isHeroVisible }">

          <!-- Label row — left-anchored like PageHero -->
          <div class="hero-label-row" aria-hidden="true">
            <span class="label-line" />
            <span class="label-diamond" />
            <span class="label-text">{{ t("cases.hero.badge") }}</span>
            <span class="label-diamond" />
            <span class="label-line label-line--trail" />
          </div>

          <h1 id="cases-hero-heading" class="hero-heading">
            {{ t("cases.hero.title") }}
          </h1>

          <div class="hero-deco-divider" aria-hidden="true">
            <span class="div-line" />
            <span class="div-diamond div-diamond--sm" />
            <span class="div-line div-line--inner" />
            <span class="div-diamond" />
            <span class="div-line div-line--inner" />
            <span class="div-diamond div-diamond--sm" />
            <span class="div-line" />
          </div>

          <p class="hero-subtitle">{{ t("cases.hero.subtitle") }}</p>
          <p class="hero-description">{{ t("cases.hero.description") }}</p>
        </div>
      </div>
    </section>

    <!-- ── Cases Grid ─────────────────────────────────────────── -->
    <section ref="gridRef" class="cases-grid-section" aria-label="Case studies">
      <div class="section-container">

        <!-- Client Work -->
        <div
          v-if="groupedCases.clientWork.length > 0"
          class="cases-category"
          :class="{ 'animate-in': isGridVisible }"
        >
          <div class="category-label-row" aria-hidden="true">
            <span class="cat-line" />
            <span class="cat-diamond" />
            <span class="cat-text">{{ t("cases.categories.clientWork") }}</span>
            <span class="cat-diamond" />
            <span class="cat-line" />
          </div>

          <div class="cases-grid">
            <NuxtLink
              v-for="(cs, i) in groupedCases.clientWork"
              :key="cs.id ?? cs.slug"
              :to="localePath(`/cases/${cs.slug}`)"
              class="case-card"
              :style="{ transitionDelay: `${i * 60}ms` }"
            >
              <!-- Image / gradient area -->
              <div class="card-visual">
                <div class="card-visual__gradient" aria-hidden="true" />
                <img
                  v-if="cs.thumbnail"
                  :src="cs.thumbnail"
                  :alt="`${cs.title} preview`"
                  class="card-visual__image"
                />
                <span class="card-badge">{{ cs.company }}</span>
              </div>

              <!-- Body -->
              <div class="card-body">
                <!-- Corner frame -->
                <div class="deco-frame deco-frame--card" aria-hidden="true">
                  <span class="corner corner--tl" />
                  <span class="corner corner--br" />
                </div>

                <h3 class="card-title">{{ cs.title }}</h3>
                <p v-if="cs.subtitle" class="card-subtitle">{{ cs.subtitle }}</p>

                <div v-if="cs.tags?.length" class="card-tags">
                  <span
                    v-for="tag in cs.tags.slice(0, 3)"
                    :key="tag"
                    class="card-tag"
                  >{{ tag }}</span>
                </div>

                <div class="card-footer">
                  <span class="card-year">{{ cs.year }}</span>
                  <span class="card-cta">
                    {{ t("cases.cta.viewCase") }} →
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Our Brands -->
        <div
          v-if="groupedCases.myCompanies.length > 0"
          class="cases-category"
          :class="{ 'animate-in': isGridVisible }"
          style="transition-delay: 0.1s"
        >
          <div class="category-label-row" aria-hidden="true">
            <span class="cat-line" />
            <span class="cat-diamond" />
            <span class="cat-text">{{ t("cases.categories.myCompanies") }}</span>
            <span class="cat-diamond" />
            <span class="cat-line" />
          </div>

          <div class="cases-grid">
            <NuxtLink
              v-for="(cs, i) in groupedCases.myCompanies"
              :key="cs.id ?? cs.slug"
              :to="localePath(`/cases/${cs.slug}`)"
              class="case-card"
              :style="{ transitionDelay: `${i * 60}ms` }"
            >
              <div class="card-visual">
                <div class="card-visual__gradient" aria-hidden="true" />
                <img
                  v-if="cs.thumbnail"
                  :src="cs.thumbnail"
                  :alt="`${cs.title} preview`"
                  class="card-visual__image"
                />
                <span class="card-badge card-badge--brand">
                  {{ getBadgeLabel(cs.company) }}
                </span>
              </div>

              <div class="card-body">
                <div class="deco-frame deco-frame--card" aria-hidden="true">
                  <span class="corner corner--tl" />
                  <span class="corner corner--br" />
                </div>

                <h3 class="card-title">{{ cs.title }}</h3>
                <p v-if="cs.subtitle" class="card-subtitle">{{ cs.subtitle }}</p>

                <div v-if="cs.tags?.length" class="card-tags">
                  <span
                    v-for="tag in cs.tags.slice(0, 3)"
                    :key="tag"
                    class="card-tag"
                  >{{ tag }}</span>
                </div>

                <div class="card-footer">
                  <span class="card-year">{{ cs.year }}</span>
                  <span class="card-cta card-cta--brand">
                    {{ t("cases.cta.viewCase") }} →
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="caseStudies.length === 0" class="cases-empty">
          <span class="empty-diamond" aria-hidden="true" />
          <p class="cases-empty__text">No case studies available yet.</p>
        </div>

      </div>
    </section>

    <!-- ── CTA ────────────────────────────────────────────────── -->
    <section class="cases-cta" aria-labelledby="cases-cta-heading">
      <div class="cta-bg-radial" aria-hidden="true" />
      <div class="cta-container">
        <div class="cta-inner">
          <div class="deco-frame" aria-hidden="true">
            <span class="corner corner--tl" />
            <span class="corner corner--tr" />
            <span class="corner corner--bl" />
            <span class="corner corner--br" />
          </div>

          <div class="cta-label-row" aria-hidden="true">
            <span class="label-line" />
            <span class="label-diamond" />
            <span class="label-text">{{ t("cases.contact.title") }}</span>
            <span class="label-diamond" />
            <span class="label-line" />
          </div>

          <h2 id="cases-cta-heading" class="cta-heading">
            {{ t("cases.contact.title") }}
          </h2>

          <div class="hero-deco-divider" aria-hidden="true">
            <span class="div-line" />
            <span class="div-diamond div-diamond--sm" />
            <span class="div-line div-line--inner" />
            <span class="div-diamond" />
            <span class="div-line div-line--inner" />
            <span class="div-diamond div-diamond--sm" />
            <span class="div-line" />
          </div>

          <p class="cta-description">{{ t("cases.contact.description") }}</p>

          <div class="cta-actions">
            <AppCtaButton
              variant="primary"
              :to="localePath('/contact')"
              :show-icon="true"
            >
              {{ t("cases.contact.button") }}
            </AppCtaButton>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style lang="scss" scoped>
/* ── Page ─────────────────────────────────────────────────────── */
.cases-page {
  min-height: 100vh;
  background: #0d0908;
}

/* ── Hero ─────────────────────────────────────────────────────── */
.cases-hero {
  position: relative;
  background: #0d0908;
  overflow: hidden;
  min-height: 72dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 9rem 2rem 6rem;

  @media (min-width: 768px) {
    padding: 11rem 2rem 7rem;
  }
}

/* Parallax ambient layer — matches PageHero */
.hero-bg {
  position: absolute;
  inset: -10% 0;
  background:
    radial-gradient(ellipse 75% 55% at 18% 45%, rgba(223, 175, 133, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 55% 40% at 80% 85%, rgba(223, 175, 133, 0.03) 0%, transparent 55%);
  pointer-events: none;
}

/* Art deco corner brackets — full section edges */
.deco-frame--page {
  position: absolute;
  inset: 2rem;
  pointer-events: none;
  z-index: 5;
}

/* Max-width content container — left-aligned like PageHero */
.hero-container {
  position: relative;
  z-index: 2;
  max-width: 90rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.hero-content {
  max-width: 52rem;
  padding: 2rem 0;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.8s var(--ease-smooth),
    transform 0.8s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Corner frame (shared card + page variants) ───────────────── */
.deco-frame {
  position: absolute;
  inset: 0.75rem;
  pointer-events: none;

  &--card { inset: 0.5rem; }
}

.corner {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-color: rgba(223, 175, 133, 0.2);
  border-style: solid;

  &::after {
    content: "";
    position: absolute;
    width: 0.85rem;
    height: 0.85rem;
    border-style: solid;
    border-color: rgba(223, 175, 133, 0.1);
  }

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; &::after { top: 5px; left: 5px; border-width: 1px 0 0 1px; } }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; &::after { top: 5px; right: 5px; border-width: 1px 1px 0 0; } }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; &::after { bottom: 5px; left: 5px; border-width: 0 0 1px 1px; } }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; &::after { bottom: 5px; right: 5px; border-width: 0 1px 1px 0; } }
}

/* ── Label rows ───────────────────────────────────────────────── */
.hero-label-row,
.cta-label-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  max-width: 22rem;
}

.label-line {
  flex: 0 0 1.5rem;
  height: 1px;
  background: rgba(223, 175, 133, 0.2);

  &--trail { flex: 1; }
}

.label-diamond {
  width: 4px;
  height: 4px;
  background: rgba(223, 175, 133, 0.45);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.label-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.55);
  flex-shrink: 0;
}

/* ── Hero text ────────────────────────────────────────────────── */
.hero-heading {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2.5rem, 5.5vw, 4.5rem);
  line-height: 1.06;
  letter-spacing: -0.025em;
  color: #ffeddf;
  margin: 0 0 1.75rem;
}

/* ── Deco divider ─────────────────────────────────────────────── */
.hero-deco-divider {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 1.5rem;
  max-width: 18rem;
}

.div-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.14);

  &--inner { flex: 0 0 0.875rem; }
}

.div-diamond {
  width: 6px;
  height: 6px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 3px;
    height: 3px;
    background: rgba(223, 175, 133, 0.2);
  }
}

.hero-subtitle {
  font-family: var(--font-heading);
  font-size: clamp(0.95rem, 1.3vw, 1.05rem);
  font-weight: 500;
  color: rgba(223, 175, 133, 0.65);
  margin: 0 0 0.75rem;
  letter-spacing: 0.01em;
}

.hero-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.875rem, 1.1vw, 0.95rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.45);
  max-width: 44ch;
  margin: 0;
}

/* ── Grid section ─────────────────────────────────────────────── */
.cases-grid-section {
  background: #0d0908;
  padding: 5rem 0 7rem;
}

.section-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ── Category block ───────────────────────────────────────────── */
.cases-category {
  margin-bottom: 5rem;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &:last-child { margin-bottom: 0; }

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.cat-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.1);
}

.cat-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.3);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.cat-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.4);
  flex-shrink: 0;
}

/* ── Cases grid ───────────────────────────────────────────────── */
.cases-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ── Case card ────────────────────────────────────────────────── */
.case-card {
  display: flex;
  flex-direction: column;
  background: #161210;
  border: 1px solid rgba(223, 175, 133, 0.1);
  border-radius: 2px;
  overflow: hidden;
  text-decoration: none;
  transition:
    border-color 0.3s var(--ease-smooth),
    transform 0.3s var(--ease-smooth);

  &:hover {
    border-color: rgba(223, 175, 133, 0.28);
    transform: translateY(-3px);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 2px;
  }
}

/* ── Card visual area ─────────────────────────────────────────── */
.card-visual {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #120703;
}

.card-visual__gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 80% at 30% 40%, rgba(223, 175, 133, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 60% at 70% 70%, rgba(223, 175, 133, 0.04) 0%, transparent 50%);
}

.card-visual__image {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 65%;
  margin: 0 auto;
  display: block;
  padding: 1.5rem;
  transition: transform 0.35s var(--ease-smooth);

  .case-card:hover & {
    transform: scale(1.04);
  }
}

.card-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  padding: 0.2rem 0.625rem;
  background: rgba(13, 9, 8, 0.75);
  border: 1px solid rgba(223, 175, 133, 0.2);
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.6);
  backdrop-filter: blur(8px);

  &--brand {
    border-color: rgba(223, 175, 133, 0.35);
    color: rgba(223, 175, 133, 0.8);
  }
}

/* ── Card body ────────────────────────────────────────────────── */
.card-body {
  position: relative;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  color: #ffeddf;
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;

  .case-card:hover & {
    color: rgba(223, 175, 133, 0.9);
  }
}

.card-subtitle {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 0.8rem;
  color: rgba(255, 237, 223, 0.4);
  line-height: 1.6;
  margin: 0 0 1rem;
}

/* ── Tags ─────────────────────────────────────────────────────── */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 1rem;
}

.card-tag {
  padding: 0.2rem 0.5rem;
  border: 1px solid rgba(223, 175, 133, 0.12);
  font-family: var(--font-text);
  font-size: 0.7rem;
  color: rgba(255, 237, 223, 0.35);
  letter-spacing: 0.03em;
}

/* ── Card footer ──────────────────────────────────────────────── */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(223, 175, 133, 0.07);
  margin-top: auto;
}

.card-year {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(223, 175, 133, 0.35);
}

.card-cta {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.5);
  transition: color 0.2s ease;

  .case-card:hover & {
    color: rgba(223, 175, 133, 0.85);
  }

  &--brand {
    color: rgba(223, 175, 133, 0.6);

    .case-card:hover & {
      color: rgba(223, 175, 133, 0.95);
    }
  }
}

/* ── Empty state ──────────────────────────────────────────────── */
.cases-empty {
  text-align: center;
  padding: 5rem 1rem;
}

.empty-diamond {
  display: block;
  width: 2rem;
  height: 2rem;
  background: rgba(223, 175, 133, 0.1);
  border: 1px solid rgba(223, 175, 133, 0.2);
  transform: rotate(45deg);
  margin: 0 auto 1.5rem;
}

.cases-empty__text {
  font-family: var(--font-text);
  font-size: 1rem;
  color: rgba(255, 237, 223, 0.35);
}

/* ── CTA section ──────────────────────────────────────────────── */
.cases-cta {
  position: relative;
  background: #0d0908;
  overflow: hidden;
  padding: 5rem 2rem;

  @media (min-width: 768px) {
    padding: 7rem 2rem;
  }
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

  @media (min-width: 768px) {
    padding: 4rem 3.5rem;
  }
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

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hero-content,
  .cases-category {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .case-card,
  .card-visual__image {
    transition: none;
  }

  .case-card:hover {
    transform: none;
  }
}

/* ── Light mode ───────────────────────────────────────────────── */
html:not(.dark) {
  /* Page & hero */
  .cases-page    { background: var(--color-section-light); }
  .cases-hero    { background: var(--color-hero-bg); }

  .hero-bg {
    background:
      radial-gradient(ellipse 75% 55% at 18% 45%, rgba(153, 82, 38, 0.07) 0%, transparent 60%),
      radial-gradient(ellipse 55% 40% at 80% 85%, rgba(153, 82, 38, 0.03) 0%, transparent 55%);
  }

  .corner {
    border-color: rgba(153, 82, 38, 0.18);
    &::after { border-color: rgba(153, 82, 38, 0.08); }
  }

  .label-line    { background: var(--deco-line); }
  .label-diamond { background: var(--deco-diamond); }
  .label-text    { color: var(--deco-text); }

  .hero-heading    { color: #441a08; }
  .div-line        { background: var(--deco-line); }
  .div-diamond     { background: var(--deco-diamond); &--sm { background: var(--deco-diamond-sm); } }
  .hero-subtitle   { color: var(--color-primary-600); }
  .hero-description { color: var(--color-text-subtle); }

  /* Grid section */
  .cases-grid-section { background: var(--color-section-light); }

  .cat-line    { background: var(--deco-line); }
  .cat-diamond { background: var(--deco-diamond); }
  .cat-text    { color: var(--deco-text); }

  /* Case cards */
  .case-card {
    background: linear-gradient(175deg, #ffffff 0%, #fff7f0 100%);
    border-color: var(--deco-line);
    box-shadow: 0 2px 10px rgba(153, 82, 38, 0.05);

    &:hover {
      border-color: rgba(153, 82, 38, 0.3);
      box-shadow: 0 4px 20px rgba(153, 82, 38, 0.1);
    }

    &:focus-visible { outline-color: var(--color-primary-500); }
  }

  .card-visual { background: #f5efe8; }

  .card-visual__gradient {
    background:
      radial-gradient(ellipse 80% 80% at 30% 40%, rgba(153, 82, 38, 0.06) 0%, transparent 60%),
      radial-gradient(ellipse 60% 60% at 70% 70%, rgba(153, 82, 38, 0.03) 0%, transparent 50%);
  }

  .card-badge {
    background: rgba(255, 255, 255, 0.85);
    border-color: rgba(153, 82, 38, 0.2);
    color: var(--color-primary-600);
    backdrop-filter: blur(8px);

    &--brand {
      border-color: rgba(153, 82, 38, 0.35);
      color: var(--color-primary-700);
    }
  }

  .card-title   { color: var(--color-text-primary); }
  .card-subtitle { color: var(--color-text-subtle); }
  .card-tag {
    border-color: var(--deco-line);
    color: var(--color-text-muted);
  }
  .card-footer  { border-top-color: var(--deco-line); }
  .card-year    { color: var(--color-primary-500); }
  .card-cta     { color: var(--color-primary-600); }

  .case-card:hover .card-title { color: var(--color-primary-700); }
  .case-card:hover .card-cta  { color: var(--color-primary-800); }

  /* CTA section */
  .cases-cta { background: var(--color-section-alt); }

  .cta-bg-radial {
    background: radial-gradient(
      ellipse 60% 80% at 50% 100%,
      rgba(153, 82, 38, 0.05) 0%,
      transparent 65%
    );
  }

  .cta-inner     { border-color: var(--deco-line-strong); }
  .label-line    { background: var(--deco-line); }
  .label-diamond { background: var(--deco-diamond); }
  .label-text    { color: var(--deco-text); }
  .cta-heading   { color: var(--color-text-primary); }
  .div-line      { background: var(--deco-line); }
  .div-diamond   { background: var(--deco-diamond); &--sm { background: var(--deco-diamond-sm); } }
  .cta-description { color: var(--color-text-subtle); }

  /* Empty state */
  .empty-diamond { background: rgba(153, 82, 38, 0.08); border-color: var(--deco-line); }
  .cases-empty__text { color: var(--color-text-subtle); }
}
</style>


