<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

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

  onUnmounted(() => {
    observer.disconnect();
  });
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

// Open first category by default on mount
onMounted(() => {
  if (categories.value.length > 0) {
    expandedCategories.value = new Set([categories.value[0].key]);
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
    <div class="section-container">
      <!-- Header -->
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 id="comparison-heading" class="section-title">
          {{ t("services.comparison.title") }}
        </h2>
        <p class="section-subtitle">
          {{ t("services.comparison.subtitle") }}
        </p>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- DESKTOP: Original table (hidden on mobile)  -->
      <!-- ═══════════════════════════════════════════ -->
      <div
        class="table-wrapper desktop-only"
        :class="{ 'animate-in': isVisible }"
      >
        <div class="table-container">
          <table class="comparison-table" role="grid">
            <!-- Sticky Header -->
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
                      <span class="price-currency">{{
                        getPackageCurrency(pkg)
                      }}</span>
                      <span class="price-amount">{{
                        getPackagePrice(pkg)
                      }}</span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody>
              <template v-for="category in categories" :key="category.key">
                <!-- Category Header Row -->
                <tr class="category-row">
                  <th
                    :colspan="packages.length + 1"
                    class="category-header"
                    scope="colgroup"
                  >
                    {{ category.title }}
                  </th>
                </tr>

                <!-- Feature Rows -->
                <tr
                  v-for="(feature, fIndex) in category.features"
                  :key="`${category.key}-${fIndex}`"
                  class="feature-row"
                >
                  <th class="feature-name" scope="row">
                    <button
                      type="button"
                      class="feature-name-button"
                      :aria-expanded="
                        activeTooltip === `${category.key}-${fIndex}`
                      "
                      @click="toggleTooltip(`${category.key}-${fIndex}`)"
                    >
                      <span>{{ feature.name }}</span>
                      <UIcon
                        name="i-heroicons-information-circle"
                        class="info-icon"
                      />
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
                    :class="{
                      'feature-cell--featured': pkg === 'growth',
                    }"
                  >
                    <span
                      v-if="getFeatureValue(feature, pkg) === true"
                      class="feature-check"
                    >
                      <UIcon name="i-heroicons-check" class="check-icon" />
                      <span class="sr-only">{{
                        t("services.comparison.legend.included")
                      }}</span>
                    </span>
                    <span
                      v-else-if="getFeatureValue(feature, pkg) === false"
                      class="feature-dash"
                    >
                      <UIcon name="i-heroicons-minus" class="dash-icon" />
                      <span class="sr-only">{{
                        t("services.comparison.legend.notIncluded")
                      }}</span>
                    </span>
                    <span v-else class="feature-partial">
                      {{ getFeatureValue(feature, pkg) }}
                    </span>
                  </td>
                </tr>
              </template>
            </tbody>

            <!-- CTA Footer -->
            <tfoot>
              <tr class="cta-row">
                <td class="cta-spacer"></td>
                <td
                  v-for="pkg in packages"
                  :key="pkg"
                  class="cta-cell"
                  :class="{ 'cta-cell--featured': pkg === 'growth' }"
                >
                  <NuxtLink
                    to="/contact"
                    class="cta-button"
                    :class="{
                      'cta-button--featured': pkg === 'growth',
                      'cta-button--default': pkg !== 'growth',
                    }"
                  >
                    {{ t("services.packages.cta") }}
                  </NuxtLink>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- MOBILE: Accordion comparison view           -->
      <!-- ═══════════════════════════════════════════ -->
      <div
        class="mobile-comparison mobile-only"
        :class="{ 'animate-in': isVisible }"
      >
        <!-- Package header row (always visible) -->
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
              <span class="mobile-price-currency">{{
                getPackageCurrency(pkg)
              }}</span>
              <span class="mobile-price-amount">{{
                getPackagePrice(pkg)
              }}</span>
            </div>
          </div>
        </div>

        <!-- Accordion categories -->
        <div class="mobile-categories">
          <div
            v-for="category in categories"
            :key="category.key"
            class="mobile-category"
            :class="{
              'mobile-category--expanded': isCategoryExpanded(category.key),
            }"
          >
            <button
              type="button"
              class="mobile-category__trigger"
              :aria-expanded="isCategoryExpanded(category.key)"
              :aria-controls="`mobile-cat-${category.key}`"
              @click="toggleCategory(category.key)"
            >
              <span class="mobile-category__title">{{ category.title }}</span>
              <span class="mobile-category__count">{{
                category.features.length
              }}</span>
              <UIcon
                name="i-heroicons-chevron-down"
                class="mobile-category__chevron"
                :class="{
                  'mobile-category__chevron--open': isCategoryExpanded(
                    category.key,
                  ),
                }"
                aria-hidden="true"
              />
            </button>

            <div
              :id="`mobile-cat-${category.key}`"
              class="mobile-category__panel"
              :class="{
                'mobile-category__panel--open': isCategoryExpanded(
                  category.key,
                ),
              }"
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
                    :aria-expanded="
                      activeTooltip === `m-${category.key}-${fIndex}`
                    "
                    :aria-label="`Info: ${feature.name}`"
                    @click.stop="toggleTooltip(`m-${category.key}-${fIndex}`)"
                  >
                    <UIcon
                      name="i-heroicons-information-circle"
                      class="mobile-feature__info-icon"
                    />
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

                <!-- 3-column grid of values -->
                <div class="mobile-feature__values">
                  <div
                    v-for="pkg in packages"
                    :key="pkg"
                    class="mobile-feature__value"
                    :class="{
                      'mobile-feature__value--featured': pkg === 'growth',
                    }"
                  >
                    <span class="mobile-feature__pkg-label">{{
                      getPackageName(pkg)
                    }}</span>
                    <span
                      v-if="getFeatureValue(feature, pkg) === true"
                      class="feature-check feature-check--sm"
                    >
                      <UIcon
                        name="i-heroicons-check"
                        class="check-icon check-icon--sm"
                      />
                      <span class="sr-only">{{
                        t("services.comparison.legend.included")
                      }}</span>
                    </span>
                    <span
                      v-else-if="getFeatureValue(feature, pkg) === false"
                      class="feature-dash feature-dash--sm"
                    >
                      <UIcon
                        name="i-heroicons-minus"
                        class="dash-icon dash-icon--sm"
                      />
                      <span class="sr-only">{{
                        t("services.comparison.legend.notIncluded")
                      }}</span>
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

        <!-- Mobile CTA -->
        <div class="mobile-cta-row">
          <NuxtLink
            v-for="pkg in packages"
            :key="pkg"
            to="/contact"
            class="mobile-cta-button"
            :class="{
              'mobile-cta-button--featured': pkg === 'growth',
              'mobile-cta-button--default': pkg !== 'growth',
            }"
          >
            {{ getPackageName(pkg) }}
          </NuxtLink>
        </div>
      </div>

      <!-- Legend -->
      <div class="legend" :class="{ 'animate-in': isVisible }">
        <div class="legend-item">
          <span class="legend-check">
            <UIcon name="i-heroicons-check" />
          </span>
          <span>{{ t("services.comparison.legend.included") }}</span>
        </div>
        <div class="legend-item">
          <span class="legend-dash">
            <UIcon name="i-heroicons-minus" />
          </span>
          <span>{{ t("services.comparison.legend.notIncluded") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.comparison-section {
  padding: 6rem 1.5rem;
  background: var(--color-section-light);

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--badge-primary-bg);
  color: var(--badge-primary-text);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: var(--text-3xl);
  color: var(--color-text);
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.section-subtitle {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-text-muted);
}

/* ══════════════════════════════════════════ */
/* Visibility toggles                        */
/* ══════════════════════════════════════════ */
.desktop-only {
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
}

.mobile-only {
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
}

/* ══════════════════════════════════════════ */
/* DESKTOP TABLE (unchanged)                 */
/* ══════════════════════════════════════════ */
.table-wrapper {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.2s,
    transform 0.6s var(--ease-smooth) 0.2s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 16px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);

  scrollbar-width: thin;
  scrollbar-color: var(--color-primary-300) transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-primary-300);
    border-radius: 3px;
  }
}

.comparison-table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
}

.table-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--card-bg);
}

.feature-header {
  padding: 1.5rem 1rem;
  text-align: left;
  min-width: 200px;
  background: var(--card-bg);
}

.package-header {
  padding: 1.5rem 1rem;
  text-align: center;
  min-width: 140px;
  background: var(--card-bg);
  border-left: 1px solid var(--color-border);

  &--featured {
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-accent-50) 50%, var(--card-bg)) 0%,
      var(--card-bg) 100%
    );
  }
}

.package-header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.popular-indicator {
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent-600);
  background: var(--color-accent-100);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 0.25rem;
}

.package-name {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
}

.package-price {
  display: flex;
  align-items: baseline;
  gap: 0.125rem;
}

.price-currency {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-muted);
}

.price-amount {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-primary-600);
}

.category-row {
  background: var(--color-surface-2);
}

.category-header {
  padding: 0.875rem 1rem;
  text-align: left;
  font-size: var(--text-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.feature-row {
  border-top: 1px solid var(--color-border);

  &:hover {
    background: var(--color-surface-2);
  }
}

.feature-name {
  padding: 0.875rem 1rem;
  text-align: left;
  font-weight: 500;
  color: var(--color-text);
  position: relative;
}

.feature-name-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-align: left;

  &:hover .info-icon,
  &:focus .info-icon {
    color: var(--color-primary-500);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

.info-icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-subtle);
  transition: color var(--duration-fast) var(--ease-smooth);
}

.tooltip {
  position: absolute;
  left: 1rem;
  top: 100%;
  z-index: 20;
  max-width: 280px;
  padding: 0.75rem 1rem;
  background: var(--color-primary-900);
  color: white;
  font-size: var(--text-sm);
  font-weight: 400;
  line-height: 1.5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s var(--ease-smooth);
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.feature-cell {
  padding: 0.875rem 1rem;
  text-align: center;
  border-left: 1px solid var(--color-border);

  &--featured {
    background: color-mix(in srgb, var(--color-accent-50) 20%, transparent);
  }
}

.feature-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--color-accent-500);
  border-radius: 50%;
}

.feature-check--sm {
  width: 24px;
  height: 24px;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: white;
}

.check-icon--sm {
  width: 14px;
  height: 14px;
}

.feature-dash {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--color-surface-3);
  border-radius: 50%;
}

.feature-dash--sm {
  width: 24px;
  height: 24px;
}

.dash-icon {
  width: 14px;
  height: 14px;
  color: var(--color-text-subtle);
}

.dash-icon--sm {
  width: 12px;
  height: 12px;
}

.feature-partial {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  font-size: var(--text-xs);
  font-weight: 600;
  border-radius: 9999px;
  text-transform: capitalize;
}

.feature-partial--sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.625rem;
}

.cta-row {
  border-top: 1px solid var(--color-border);
}

.cta-spacer {
  padding: 1.5rem 1rem;
}

.cta-cell {
  padding: 1.5rem 1rem;
  text-align: center;
  border-left: 1px solid var(--color-border);

  &--featured {
    background: color-mix(in srgb, var(--color-accent-50) 20%, transparent);
  }
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: var(--text-sm);
  text-decoration: none;
  border-radius: 10px;
  transition: all var(--duration-normal) var(--ease-smooth);

  &--default {
    background: transparent;
    color: var(--color-primary-600);
    border: 2px solid var(--color-primary-400);

    &:hover {
      background: var(--color-primary-50);
      border-color: var(--color-primary-500);
    }
  }

  &--featured {
    background: var(--color-accent-500);
    color: white;
    border: 2px solid transparent;

    &:hover {
      background: var(--color-accent-600);
      box-shadow: 0 4px 16px rgba(42, 147, 134, 0.3);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 4px;
  }
}

/* ══════════════════════════════════════════ */
/* MOBILE: Accordion comparison view         */
/* ══════════════════════════════════════════ */
.mobile-comparison {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.2s,
    transform 0.6s var(--ease-smooth) 0.2s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Package header strip */
.mobile-pkg-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.mobile-pkg-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 12px 8px;
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  text-align: center;
}

.mobile-pkg-col--featured {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-accent-50) 50%, var(--card-bg)) 0%,
    var(--card-bg) 100%
  );
  border-color: color-mix(
    in srgb,
    var(--color-accent-400) 30%,
    var(--card-border)
  );
}

.mobile-popular {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent-600);
  background: var(--color-accent-100);
  padding: 2px 8px;
  border-radius: 9999px;
  margin-bottom: 2px;
}

.mobile-pkg-name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text);
}

.mobile-pkg-price {
  display: flex;
  align-items: baseline;
  gap: 1px;
}

.mobile-price-currency {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.mobile-price-amount {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-primary-600);
}

/* Accordion categories */
.mobile-categories {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-category {
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  overflow: hidden;
  transition: box-shadow var(--duration-fast) var(--ease-smooth);
}

.mobile-category--expanded {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.mobile-category__trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 14px 16px;
  min-height: 48px;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  text-align: left;
}

.mobile-category__trigger:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: -2px;
}

.mobile-category__title {
  flex: 1;
  font-size: var(--text-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.mobile-category__count {
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
  background: var(--color-surface-2);
  padding: 2px 8px;
  border-radius: 9999px;
}

.mobile-category__chevron {
  width: 18px;
  height: 18px;
  color: var(--color-text-muted);
  transition: transform var(--duration-fast) var(--ease-smooth);
  flex-shrink: 0;
}

.mobile-category__chevron--open {
  transform: rotate(180deg);
}

/* Panel (collapsible) */
.mobile-category__panel {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    max-height 0.3s var(--ease-smooth),
    opacity 0.3s var(--ease-smooth);
}

.mobile-category__panel--open {
  max-height: 2000px;
  opacity: 1;
}

/* Feature row */
.mobile-feature {
  padding: 0 16px;
  border-top: 1px solid var(--color-border);
}

.mobile-feature:last-child {
  padding-bottom: 12px;
}

.mobile-feature__name {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 0 6px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text);
}

.mobile-feature__info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 6px;
  flex-shrink: 0;
}

.mobile-feature__info:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: -2px;
}

.mobile-feature__info-icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-subtle);
  transition: color var(--duration-fast) var(--ease-smooth);
}

.mobile-feature__info:hover .mobile-feature__info-icon {
  color: var(--color-primary-500);
}

.mobile-feature__tooltip {
  padding: 8px 12px;
  margin-bottom: 6px;
  background: var(--color-primary-900);
  color: white;
  font-size: var(--text-xs);
  line-height: 1.5;
  border-radius: 8px;
}

/* 3-column values grid */
.mobile-feature__values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  padding-bottom: 10px;
}

.mobile-feature__value {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px 4px;
  border-radius: 8px;
  background: var(--color-surface-2);
}

.mobile-feature__value--featured {
  background: color-mix(
    in srgb,
    var(--color-accent-50) 30%,
    var(--color-surface-2)
  );
}

.mobile-feature__pkg-label {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-text-subtle);
}

/* Mobile CTA row */
.mobile-cta-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 16px;
}

.mobile-cta-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 8px;
  min-height: 44px;
  font-weight: 600;
  font-size: var(--text-xs);
  text-decoration: none;
  border-radius: 10px;
  text-align: center;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.mobile-cta-button--default {
  background: transparent;
  color: var(--color-primary-600);
  border: 2px solid var(--color-primary-400);
}

.mobile-cta-button--default:hover {
  background: var(--color-primary-50);
}

.mobile-cta-button--featured {
  background: var(--color-accent-500);
  color: white;
  border: 2px solid transparent;
}

.mobile-cta-button--featured:hover {
  background: var(--color-accent-600);
}

.mobile-cta-button:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* ══════════════════════════════════════════ */
/* Legend + shared                            */
/* ══════════════════════════════════════════ */
.legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.4s,
    transform 0.6s var(--ease-smooth) 0.4s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.legend-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: var(--color-accent-500);
  border-radius: 50%;
  color: white;

  :deep(svg) {
    width: 12px;
    height: 12px;
  }
}

.legend-dash {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: var(--color-surface-3);
  border-radius: 50%;
  color: var(--color-text-subtle);

  :deep(svg) {
    width: 10px;
    height: 10px;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ══════════════════════════════════════════ */
/* Dark mode                                 */
/* ══════════════════════════════════════════ */
:root.dark {
  .comparison-section {
    background: var(--color-section-dark);
  }

  .section-badge {
    background: var(--color-primary-900);
    color: var(--color-primary-300);
  }

  .table-container {
    background: var(--card-bg);
    border-color: var(--card-border);
  }

  .table-header,
  .feature-header,
  .package-header {
    background: var(--card-bg);
  }

  .package-header--featured {
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-accent-900) 40%, var(--card-bg)) 0%,
      var(--card-bg) 100%
    );
  }

  .popular-indicator,
  .mobile-popular {
    background: var(--color-accent-900);
    color: var(--color-accent-300);
  }

  .price-amount,
  .mobile-price-amount {
    color: var(--color-primary-300);
  }

  .category-row {
    background: var(--color-surface-3);
  }

  .feature-row:hover {
    background: var(--color-surface-3);
  }

  .feature-cell--featured {
    background: color-mix(in srgb, var(--color-accent-900) 20%, transparent);
  }

  .tooltip,
  .mobile-feature__tooltip {
    background: var(--color-neutral-800);
  }

  .feature-partial {
    background: var(--color-primary-900);
    color: var(--color-primary-300);
  }

  .cta-cell--featured {
    background: color-mix(in srgb, var(--color-accent-900) 20%, transparent);
  }

  .cta-button--default,
  .mobile-cta-button--default {
    color: var(--color-primary-300);
    border-color: var(--color-primary-500);

    &:hover {
      background: rgba(211, 154, 105, 0.1);
    }
  }

  .cta-button--featured,
  .mobile-cta-button--featured {
    background: var(--color-accent-400);

    &:hover {
      background: var(--color-accent-500);
    }
  }

  .feature-dash {
    background: var(--color-surface-4);
  }

  .legend-dash {
    background: var(--color-surface-4);
  }

  // Mobile dark mode
  .mobile-pkg-col {
    background: var(--card-bg);
    border-color: var(--card-border);
  }

  .mobile-pkg-col--featured {
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-accent-900) 40%, var(--card-bg)) 0%,
      var(--card-bg) 100%
    );
    border-color: color-mix(
      in srgb,
      var(--color-accent-500) 25%,
      var(--card-border)
    );
  }

  .mobile-category {
    background: var(--card-bg);
    border-color: var(--card-border);
  }

  .mobile-category--expanded {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .mobile-feature__value {
    background: var(--color-surface-3);
  }

  .mobile-feature__value--featured {
    background: color-mix(
      in srgb,
      var(--color-accent-900) 25%,
      var(--color-surface-3)
    );
  }

  .mobile-category__count {
    background: var(--color-surface-3);
  }
}

/* ══════════════════════════════════════════ */
/* Reduced motion                            */
/* ══════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .section-header,
  .table-wrapper,
  .mobile-comparison,
  .legend {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .mobile-category__panel {
    transition: none;
  }

  .mobile-category__chevron {
    transition: none;
  }
}
</style>
