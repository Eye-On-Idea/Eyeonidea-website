<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();
const localePath = useLocalePath();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const activeTooltip = ref<string | null>(null);
const expandedCategories = ref<Set<string>>(new Set());

onMounted(() => {
  if (!sectionRef.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});

interface Feature {
  name: string;
  tooltip: string;
  launch: boolean | string;
  growth: boolean | string;
  platform: boolean | string;
}

interface Category {
  title: string;
  features: Feature[];
}

const categories = computed(() => {
  const raw = tm("services.comparison.categories") as Record<string, Category>;
  return Object.entries(raw).map(([key, category]) => ({
    key,
    title: category.title,
    features: category.features,
  }));
});

const packages = ["launch", "growth", "platform"] as const;

const getPackageName = (key: string) => t(`services.packages.${key}.name`);
const getPackagePrice = (key: string) =>
  t(`services.packages.${key}.price.amount`);
const getPackageCurrency = (key: string) =>
  t(`services.packages.${key}.price.currency`);

const toggleTooltip = (featureKey: string) => {
  activeTooltip.value = activeTooltip.value === featureKey ? null : featureKey;
};

const toggleCategory = (key: string) => {
  const newSet = new Set(expandedCategories.value);
  if (newSet.has(key)) {
    newSet.delete(key);
  } else {
    newSet.add(key);
  }
  expandedCategories.value = newSet;
};

const isCategoryExpanded = (key: string) => expandedCategories.value.has(key);

const getFeatureValue = (
  feature: Feature,
  pkg: (typeof packages)[number],
): boolean | string => {
  return feature[pkg];
};

onMounted(() => {
  const firstCategory = categories.value[0];
  if (firstCategory) {
    expandedCategories.value = new Set([firstCategory.key]);
  }
});
</script>

<template>
  <section
    id="comparison-section"
    ref="sectionRef"
    class="comparison-section"
    aria-labelledby="comparison-heading"
  >
    <!-- Section label row -->
    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("services.comparison.title") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-container">
      <!-- Header -->
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 id="comparison-heading" class="section-title">
          {{ t("services.comparison.title") }}
        </h2>
        <p class="section-subtitle">{{ t("services.comparison.subtitle") }}</p>
      </div>

      <!-- DESKTOP TABLE -->
      <div class="table-wrapper desktop-only" :class="{ 'animate-in': isVisible }">
        <div class="table-container">
          <table class="comparison-table" role="grid">
            <thead class="table-header">
              <tr>
                <th class="feature-header" scope="col">
                  <span class="sr-only">Feature</span>
                </th>
                <th
                  v-for="pkg in packages"
                  :key="pkg"
                  class="package-header"
                  :class="{ 'package-header--featured': pkg === 'growth' }"
                  scope="col"
                >
                  <div class="package-header-content">
                    <span v-if="pkg === 'growth'" class="popular-indicator">
                      {{ t("services.packages.growth.popular") }}
                    </span>
                    <span class="package-name">{{ getPackageName(pkg) }}</span>
                    <div class="package-price">
                      <span class="price-currency">{{ getPackageCurrency(pkg) }}</span>
                      <span class="price-amount">{{ getPackagePrice(pkg) }}</span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              <template v-for="category in categories" :key="category.key">
                <tr class="category-row">
                  <th :colspan="packages.length + 1" class="category-header" scope="colgroup">
                    <button
                      type="button"
                      class="category-toggle"
                      :aria-expanded="isCategoryExpanded(category.key)"
                      :aria-controls="`dt-cat-${category.key}`"
                      @click="toggleCategory(category.key)"
                    >
                      <span class="cat-diamond" aria-hidden="true" />
                      {{ category.title }}
                      <span
                        class="cat-chevron"
                        :class="{ 'cat-chevron--open': isCategoryExpanded(category.key) }"
                        aria-hidden="true"
                      >▾</span>
                    </button>
                  </th>
                </tr>

                <tr
                  v-for="(feature, fIndex) in category.features"
                  :key="`${category.key}-${fIndex}`"
                  v-show="isCategoryExpanded(category.key)"
                  class="feature-row"
                >
                  <th class="feature-name" scope="row">
                    <button
                      type="button"
                      class="feature-name-button"
                      :aria-expanded="activeTooltip === `${category.key}-${fIndex}`"
                      @click="toggleTooltip(`${category.key}-${fIndex}`)"
                    >
                      <span>{{ feature.name }}</span>
                      <span class="info-icon" aria-hidden="true">?</span>
                    </button>
                    <Transition name="tooltip">
                      <div
                        v-if="activeTooltip === `${category.key}-${fIndex}`"
                        class="tooltip"
                        role="tooltip"
                      >
                        {{ feature.tooltip }}
                      </div>
                    </Transition>
                  </th>

                  <td
                    v-for="pkg in packages"
                    :key="pkg"
                    class="feature-cell"
                    :class="{ 'feature-cell--featured': pkg === 'growth' }"
                  >
                    <span v-if="getFeatureValue(feature, pkg) === true" class="feature-check" aria-label="Included">
                      <span class="check-diamond" aria-hidden="true" />
                    </span>
                    <span v-else-if="getFeatureValue(feature, pkg) === false" class="feature-dash" aria-label="Not included">
                      <span class="dash-line" aria-hidden="true" />
                    </span>
                    <span v-else class="feature-partial">
                      {{ getFeatureValue(feature, pkg) }}
                    </span>
                  </td>
                </tr>
              </template>
            </tbody>

            <tfoot>
              <tr class="cta-row">
                <td class="cta-spacer" />
                <td
                  v-for="pkg in packages"
                  :key="pkg"
                  class="cta-cell"
                  :class="{ 'cta-cell--featured': pkg === 'growth' }"
                >
                  <AppCtaButton
                    :variant="pkg === 'growth' ? 'primary' : 'secondary'"
                    :to="localePath('/contact')"
                    class="cta-pkg-btn"
                  >
                    {{ t("services.packages.cta") }}
                  </AppCtaButton>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!-- MOBILE ACCORDION -->
      <div class="mobile-comparison mobile-only" :class="{ 'animate-in': isVisible }">
        <div class="mobile-pkg-header">
          <div
            v-for="pkg in packages"
            :key="pkg"
            class="mobile-pkg-col"
            :class="{ 'mobile-pkg-col--featured': pkg === 'growth' }"
          >
            <span v-if="pkg === 'growth'" class="mobile-popular">
              {{ t("services.packages.growth.popular") }}
            </span>
            <span class="mobile-pkg-name">{{ getPackageName(pkg) }}</span>
            <div class="mobile-pkg-price">
              <span class="mobile-price-currency">{{ getPackageCurrency(pkg) }}</span>
              <span class="mobile-price-amount">{{ getPackagePrice(pkg) }}</span>
            </div>
          </div>
        </div>

        <div class="mobile-categories">
          <div
            v-for="category in categories"
            :key="category.key"
            class="mobile-category"
            :class="{ 'mobile-category--expanded': isCategoryExpanded(category.key) }"
          >
            <button
              type="button"
              class="mobile-category__trigger"
              :aria-expanded="isCategoryExpanded(category.key)"
              :aria-controls="`mobile-cat-${category.key}`"
              @click="toggleCategory(category.key)"
            >
              <span class="mobile-category__title">{{ category.title }}</span>
              <span class="mobile-category__count">{{ category.features.length }}</span>
              <span
                class="mobile-category__chevron"
                :class="{ 'mobile-category__chevron--open': isCategoryExpanded(category.key) }"
                aria-hidden="true"
              >▾</span>
            </button>

            <div
              :id="`mobile-cat-${category.key}`"
              class="mobile-category__panel"
              :class="{ 'mobile-category__panel--open': isCategoryExpanded(category.key) }"
              role="region"
              :aria-label="category.title"
            >
              <div
                v-for="(feature, fIndex) in category.features"
                :key="fIndex"
                class="mobile-feature"
              >
                <div class="mobile-feature__name">
                  {{ feature.name }}
                  <button
                    type="button"
                    class="mobile-feature__info"
                    :aria-expanded="activeTooltip === `m-${category.key}-${fIndex}`"
                    :aria-label="`Info: ${feature.name}`"
                    @click.stop="toggleTooltip(`m-${category.key}-${fIndex}`)"
                  >
                    <span class="mobile-info-icon" aria-hidden="true">?</span>
                  </button>
                </div>

                <Transition name="tooltip">
                  <div
                    v-if="activeTooltip === `m-${category.key}-${fIndex}`"
                    class="mobile-feature__tooltip"
                    role="tooltip"
                  >
                    {{ feature.tooltip }}
                  </div>
                </Transition>

                <div class="mobile-feature__values">
                  <div
                    v-for="pkg in packages"
                    :key="pkg"
                    class="mobile-feature__value"
                    :class="{ 'mobile-feature__value--featured': pkg === 'growth' }"
                  >
                    <span class="mobile-feature__pkg-label">{{ getPackageName(pkg) }}</span>
                    <span v-if="getFeatureValue(feature, pkg) === true" class="feature-check feature-check--sm" aria-label="Included">
                      <span class="check-diamond" aria-hidden="true" />
                    </span>
                    <span v-else-if="getFeatureValue(feature, pkg) === false" class="feature-dash feature-dash--sm" aria-label="Not included">
                      <span class="dash-line" aria-hidden="true" />
                    </span>
                    <span v-else class="feature-partial feature-partial--sm">
                      {{ getFeatureValue(feature, pkg) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mobile-cta-row">
          <AppCtaButton
            v-for="pkg in packages"
            :key="pkg"
            :variant="pkg === 'growth' ? 'primary' : 'secondary'"
            :to="localePath('/contact')"
            class="mobile-cta-pkg-btn"
          >
            {{ getPackageName(pkg) }}
          </AppCtaButton>
        </div>
      </div>

      <!-- Legend -->
      <div class="legend" :class="{ 'animate-in': isVisible }">
        <div class="legend-item">
          <span class="check-diamond legend-check-diamond" aria-hidden="true" />
          <span>{{ t("services.comparison.legend.included") }}</span>
        </div>
        <div class="legend-item">
          <span class="dash-line legend-dash-line" aria-hidden="true" />
          <span>{{ t("services.comparison.legend.notIncluded") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.comparison-section {
  background: #0d0908;
  padding-bottom: 0;
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

.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.sep-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.sep-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  flex-shrink: 0;
}

/* ── Container ────────────────────────────────────────────────── */
.section-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

/* ── Header ───────────────────────────────────────────────────── */
.section-header {
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
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
  margin: 0;
}

/* ── Desktop / Mobile breakpoints ────────────────────────────── */
.desktop-only {
  display: none;
  @media (min-width: 768px) { display: block; }
}

.mobile-only {
  display: block;
  @media (min-width: 768px) { display: none; }
}

/* ── Table wrapper ────────────────────────────────────────────── */
.table-wrapper {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.1s,
    transform 0.6s var(--ease-smooth) 0.1s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.table-container {
  overflow-x: auto;
  border: 1px solid rgba(223, 175, 133, 0.1);
  border-radius: 2px;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

/* ── Table header ─────────────────────────────────────────────── */
.table-header {
  position: sticky;
  top: 0;
  z-index: 2;
}

.feature-header {
  background: #161210;
  border-bottom: 1px solid rgba(223, 175, 133, 0.12);
  padding: 1.25rem 1.5rem;
  width: 35%;
}

.package-header {
  background: #161210;
  border-bottom: 1px solid rgba(223, 175, 133, 0.12);
  border-left: 1px solid rgba(223, 175, 133, 0.08);
  padding: 1.25rem 1rem;
  text-align: center;
  width: 21.6%;

  &--featured {
    background: #1a1410;
    border-left-color: rgba(223, 175, 133, 0.18);
    border-right: 1px solid rgba(223, 175, 133, 0.18);
  }
}

.package-header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.popular-indicator {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.8);
  padding: 0.2rem 0.6rem;
  border: 1px solid rgba(223, 175, 133, 0.3);
  border-radius: 100px;
}

.package-name {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 237, 223, 0.8);
}

.package-price {
  display: flex;
  align-items: baseline;
  gap: 0.1rem;
  justify-content: center;
}

.price-currency {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: rgba(223, 175, 133, 0.6);
  align-self: flex-start;
  margin-top: 3px;
}

.price-amount {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  color: #dfaf85;
  letter-spacing: -0.02em;
}

/* ── Category row ─────────────────────────────────────────────── */
.category-row .category-header {
  background: #120f0d;
  padding: 0;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
  border-bottom: 1px solid rgba(223, 175, 133, 0.06);
  text-align: left;
}

.category-toggle {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.85rem 1.5rem;
  background: none;
  border: none;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.5);
  cursor: pointer;
  text-align: left;
  min-height: 44px;
  transition: color 0.2s ease;

  &:hover { color: rgba(223, 175, 133, 0.8); }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.45);
    outline-offset: -2px;
  }
}

.cat-diamond {
  display: inline-block;
  width: 4px;
  height: 4px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  margin-right: 0.6rem;
  flex-shrink: 0;
}

.cat-chevron {
  margin-left: auto;
  font-size: 1rem;
  color: rgba(223, 175, 133, 0.4);
  transition: transform 0.25s ease;
  line-height: 1;

  &--open { transform: rotate(180deg); }
}

/* ── Feature rows ─────────────────────────────────────────────── */
.feature-row {
  &:hover {
    .feature-name, .feature-cell { background: rgba(223, 175, 133, 0.02); }
  }
}

.feature-name {
  padding: 0.85rem 1.5rem;
  border-bottom: 1px solid rgba(223, 175, 133, 0.05);
  vertical-align: middle;
  position: relative;
  background: #0d0908;
}

.feature-name-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-text);
  font-size: 0.85rem;
  color: rgba(255, 237, 223, 0.65);
  text-align: left;
  cursor: pointer;
  width: 100%;
  min-height: 44px;

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 2px;
  }
}

.info-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(223, 175, 133, 0.25);
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  color: rgba(223, 175, 133, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.tooltip {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 10;
  background: #1e150d;
  border: 1px solid rgba(223, 175, 133, 0.2);
  border-radius: 2px;
  padding: 0.625rem 0.875rem;
  font-family: var(--font-text);
  font-size: 0.8rem;
  line-height: 1.55;
  color: rgba(255, 237, 223, 0.65);
  max-width: 260px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.feature-cell {
  padding: 0.85rem 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(223, 175, 133, 0.05);
  border-left: 1px solid rgba(223, 175, 133, 0.05);
  vertical-align: middle;
  background: #0d0908;

  &--featured {
    background: rgba(223, 175, 133, 0.02);
    border-left-color: rgba(223, 175, 133, 0.08);
    border-right: 1px solid rgba(223, 175, 133, 0.08);
  }
}

/* ── Check / Dash indicators ──────────────────────────────────── */
.check-diamond {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: rgba(223, 175, 133, 0.7);
  transform: rotate(45deg);
}

.dash-line {
  display: inline-block;
  width: 12px;
  height: 1px;
  background: rgba(255, 237, 223, 0.18);
  vertical-align: middle;
}

.feature-check, .feature-dash {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 20px;
}

.feature-partial {
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: rgba(223, 175, 133, 0.65);
  line-height: 1.3;
}

/* ── CTA footer ───────────────────────────────────────────────── */
.cta-spacer {
  background: #0d0908;
  border-top: 1px solid rgba(223, 175, 133, 0.1);
  padding: 1.25rem 1.5rem;
}

.cta-cell {
  background: #0d0908;
  border-top: 1px solid rgba(223, 175, 133, 0.1);
  border-left: 1px solid rgba(223, 175, 133, 0.05);
  padding: 1.25rem 1rem;
  text-align: center;

  &--featured {
    background: rgba(223, 175, 133, 0.02);
    border-left-color: rgba(223, 175, 133, 0.1);
    border-right: 1px solid rgba(223, 175, 133, 0.1);
  }
}

.cta-pkg-btn {
  width: 100%;
  justify-content: center;
  font-size: 0.75rem;
}

/* ── Mobile comparison ────────────────────────────────────────── */
.mobile-comparison {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.1s,
    transform 0.6s var(--ease-smooth) 0.1s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-pkg-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #161210;
  border: 1px solid rgba(223, 175, 133, 0.1);
  border-radius: 2px 2px 0 0;
}

.mobile-pkg-col {
  padding: 1rem 0.75rem;
  text-align: center;
  border-right: 1px solid rgba(223, 175, 133, 0.08);

  &:last-child { border-right: none; }

  &--featured {
    background: rgba(223, 175, 133, 0.04);
  }
}

.mobile-popular {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.7);
  margin-bottom: 0.2rem;
}

.mobile-pkg-name {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 237, 223, 0.75);
}

.mobile-pkg-price {
  display: flex;
  align-items: baseline;
  gap: 0.1rem;
  justify-content: center;
  margin-top: 0.25rem;
}

.mobile-price-currency {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  color: rgba(223, 175, 133, 0.55);
  align-self: flex-start;
  margin-top: 2px;
}

.mobile-price-amount {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: #dfaf85;
  letter-spacing: -0.02em;
}

/* Mobile categories */
.mobile-categories {
  border: 1px solid rgba(223, 175, 133, 0.1);
  border-top: none;
}

.mobile-category {
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);

  &:last-child { border-bottom: none; }
}

.mobile-category__trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 1.25rem;
  background: #120f0d;
  border: none;
  font: inherit;
  cursor: pointer;
  text-align: left;
  min-height: 44px;

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: -2px;
  }
}

.mobile-category__title {
  flex: 1;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.6);
}

.mobile-category__count {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  color: rgba(255, 237, 223, 0.25);
}

.mobile-category__chevron {
  font-size: 1rem;
  color: rgba(223, 175, 133, 0.4);
  transition: transform 0.25s ease;
  line-height: 1;

  &--open { transform: rotate(180deg); }
}

.mobile-category__panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s var(--ease-smooth);

  &--open { max-height: 3000px; }
}

.mobile-feature {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(223, 175, 133, 0.05);

  &:last-child { border-bottom: none; }
}

.mobile-feature__name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-text);
  font-size: 0.85rem;
  color: rgba(255, 237, 223, 0.65);
  margin-bottom: 0.75rem;
}

.mobile-feature__info {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  min-height: 24px;
  display: flex;
  align-items: center;

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 2px;
  }
}

.mobile-info-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(223, 175, 133, 0.25);
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  color: rgba(223, 175, 133, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-feature__tooltip {
  background: #1e150d;
  border: 1px solid rgba(223, 175, 133, 0.2);
  border-radius: 2px;
  padding: 0.625rem 0.875rem;
  font-family: var(--font-text);
  font-size: 0.8rem;
  line-height: 1.55;
  color: rgba(255, 237, 223, 0.65);
  margin-bottom: 0.75rem;
}

.mobile-feature__values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.mobile-feature__value {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 0.25rem;
  border: 1px solid rgba(223, 175, 133, 0.06);
  border-radius: 2px;

  &--featured {
    border-color: rgba(223, 175, 133, 0.12);
    background: rgba(223, 175, 133, 0.03);
  }
}

.mobile-feature__pkg-label {
  font-family: var(--font-heading);
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 237, 223, 0.3);
}

.feature-check--sm, .feature-dash--sm {
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-partial--sm {
  font-family: var(--font-text);
  font-size: 0.7rem;
  color: rgba(223, 175, 133, 0.65);
  text-align: center;
}

/* Mobile CTA */
.mobile-cta-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.mobile-cta-pkg-btn {
  font-size: 0.7rem;
  padding: 0.6rem 0.5rem;
  justify-content: center;
}

/* ── Legend ───────────────────────────────────────────────────── */
.legend {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.3s,
    transform 0.6s var(--ease-smooth) 0.3s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: rgba(255, 237, 223, 0.4);
}

.legend-check-diamond {
  flex-shrink: 0;
}

.legend-dash-line {
  flex-shrink: 0;
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .section-header,
  .table-wrapper,
  .mobile-comparison,
  .legend {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .mobile-category__chevron {
    transition: none;
  }

  .mobile-category__panel {
    transition: none;
  }

  .tooltip-enter-active,
  .tooltip-leave-active {
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  /* Section background + separator */
  .comparison-section { background: var(--color-section-light); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title    { color: var(--color-text-primary); }
  .section-subtitle { color: var(--color-text-secondary); }

  /* ── Desktop table ────────────────────────────── */
  .table-container {
    border-color: rgba(153, 82, 38, 0.14);
    background: #fff;
  }

  .feature-header {
    background: linear-gradient(175deg, #ffffff 0%, #fff7f0 100%);
    border-bottom-color: rgba(153, 82, 38, 0.12);
  }

  .package-header {
    background: linear-gradient(175deg, #ffffff 0%, #fff7f0 100%);
    border-bottom-color: rgba(153, 82, 38, 0.12);
    border-left-color: rgba(153, 82, 38, 0.08);

    &--featured {
      background: linear-gradient(175deg, #ffe4cf 0%, #ffeddf 100%);
      border-left-color: rgba(153, 82, 38, 0.22);
      border-right-color: rgba(153, 82, 38, 0.22);
    }
  }

  .popular-indicator {
    color: var(--color-primary-700);
    border-color: rgba(153, 82, 38, 0.35);
  }

  .package-name    { color: var(--color-text-primary); }
  .price-currency  { color: var(--color-primary-600); }
  .price-amount    { color: var(--color-primary-800); }

  .category-row .category-header {
    background: #faf6f2;
    border-top-color: rgba(153, 82, 38, 0.08);
    border-bottom-color: rgba(153, 82, 38, 0.06);
  }

  .category-toggle {
    color: var(--color-primary-600);
    &:hover { color: var(--color-primary-800); }
    &:focus-visible { outline-color: rgba(153, 82, 38, 0.45); }
  }

  .cat-diamond  { background: rgba(153, 82, 38, 0.45); }
  .cat-chevron  { color: rgba(153, 82, 38, 0.5); }

  .feature-row {
    &:hover {
      .feature-name, .feature-cell { background: rgba(153, 82, 38, 0.025); }
    }
  }

  .feature-name {
    background: #ffffff;
    border-bottom-color: rgba(153, 82, 38, 0.06);
  }

  .feature-name-button {
    color: var(--color-text-secondary);

    &:focus-visible { outline-color: rgba(153, 82, 38, 0.45); }
  }

  .info-icon {
    border-color: rgba(153, 82, 38, 0.25);
    color: var(--color-primary-600);
  }

  .tooltip {
    background: #fff;
    border-color: rgba(153, 82, 38, 0.2);
    color: var(--color-text-secondary);
    box-shadow: 0 4px 16px rgba(153, 82, 38, 0.1);
  }

  .feature-cell {
    background: #ffffff;
    border-bottom-color: rgba(153, 82, 38, 0.06);
    border-left-color: rgba(153, 82, 38, 0.06);

    &--featured {
      background: rgba(255, 228, 207, 0.25);
      border-left-color: rgba(153, 82, 38, 0.12);
      border-right-color: rgba(153, 82, 38, 0.12);
    }
  }

  .check-diamond { background: rgba(153, 82, 38, 0.65); }
  .dash-line     { background: rgba(153, 82, 38, 0.2); }
  .feature-partial { color: var(--color-primary-700); }

  .cta-spacer {
    background: #fff;
    border-top-color: rgba(153, 82, 38, 0.1);
  }

  .cta-cell {
    background: #ffffff;
    border-top-color: rgba(153, 82, 38, 0.1);
    border-left-color: rgba(153, 82, 38, 0.06);

    &--featured {
      background: rgba(255, 228, 207, 0.25);
      border-left-color: rgba(153, 82, 38, 0.12);
      border-right-color: rgba(153, 82, 38, 0.12);
    }
  }

  /* ── Mobile accordion ─────────────────────────── */
  .mobile-pkg-header {
    background: linear-gradient(175deg, #ffffff 0%, #fff7f0 100%);
    border-color: rgba(153, 82, 38, 0.14);
  }

  .mobile-pkg-col {
    border-right-color: rgba(153, 82, 38, 0.08);

    &--featured { background: rgba(255, 228, 207, 0.35); }
  }

  .mobile-popular         { color: var(--color-primary-700); }
  .mobile-pkg-name        { color: var(--color-text-primary); }
  .mobile-price-currency  { color: var(--color-primary-600); }
  .mobile-price-amount    { color: var(--color-primary-800); }

  .mobile-categories {
    border-color: rgba(153, 82, 38, 0.12);
    background: #fff;
  }

  .mobile-category {
    border-bottom-color: rgba(153, 82, 38, 0.08);
  }

  .mobile-category__trigger {
    background: #faf6f2;

    &:focus-visible { outline-color: rgba(153, 82, 38, 0.45); }
  }

  .mobile-category__title   { color: var(--color-primary-600); }
  .mobile-category__count   { color: var(--color-text-muted); }
  .mobile-category__chevron { color: rgba(153, 82, 38, 0.5); }

  .mobile-feature {
    border-bottom-color: rgba(153, 82, 38, 0.05);
  }

  .mobile-feature__name { color: var(--color-text-secondary); }

  .mobile-info-icon {
    border-color: rgba(153, 82, 38, 0.25);
    color: var(--color-primary-600);
  }

  .mobile-feature__tooltip {
    background: #fff;
    border-color: rgba(153, 82, 38, 0.18);
    color: var(--color-text-secondary);
  }

  .mobile-feature__value {
    border-color: rgba(153, 82, 38, 0.08);

    &--featured {
      border-color: rgba(153, 82, 38, 0.16);
      background: rgba(255, 228, 207, 0.2);
    }
  }

  .mobile-feature__pkg-label { color: var(--color-text-muted); }
  .feature-partial--sm       { color: var(--color-primary-700); }

  /* ── Legend ───────────────────────────────────── */
  .legend       { border-top-color: var(--deco-line); }
  .legend-item  { color: var(--color-text-subtle); opacity: 0.8; }
}
</style>
