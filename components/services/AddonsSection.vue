<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

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
    { threshold: 0.05 },
  );

  observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});

interface AddonItem {
  name: string;
  price: string;
  unit: string;
}

interface AddonSection {
  id: string;
  title: string;
  description: string;
  note?: string;
  items: AddonItem[];
}

const sections = computed(() => {
  const raw = tm("services.addons.sections") as Record<string, AddonSection>;
  return Object.entries(raw).map(([key, section]) => ({
    key,
    ...section,
  }));
});

const currency = computed(() => t("services.addons.currency"));

const expandedSections = ref<Set<string>>(new Set());

const allExpanded = ref(true);

const initExpanded = () => {
  const keys = Object.keys(
    tm("services.addons.sections") as Record<string, AddonSection>
  );
  expandedSections.value = new Set(keys);
};

onMounted(() => {
  initExpanded();
});

const toggleSection = (key: string) => {
  const next = new Set(expandedSections.value);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  expandedSections.value = next;
  allExpanded.value = next.size === sections.value.length;
};

const toggleAll = () => {
  if (allExpanded.value) {
    expandedSections.value = new Set();
    allExpanded.value = false;
  } else {
    initExpanded();
    allExpanded.value = true;
  }
};

const isSectionExpanded = (key: string) => expandedSections.value.has(key);

const formatUnit = (unit: string): string => {
  if (!unit) return "";
  return `/ ${unit}`;
};
</script>

<template>
  <section
    id="addons-section"
    ref="sectionRef"
    class="addons-section"
    aria-labelledby="addons-heading"
  >
    <div class="section-container">

      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <SectionHeader
          :badge="t('services.addons.badge')"
          :title="t('services.addons.title')"
          :subtitle="t('services.addons.subtitle')"
          heading-id="addons-heading"
          align="center"
        />

        <button
          type="button"
          class="toggle-all-btn"
          :aria-label="allExpanded ? 'Collapse all sections' : 'Expand all sections'"
          @click="toggleAll"
        >
          <span>{{ allExpanded ? "Collapse all" : "Expand all" }}</span>
          <UIcon
            name="i-heroicons-chevron-up-down"
            class="toggle-all-icon"
            aria-hidden="true"
          />
        </button>
      </div>

      <div class="addons-sections" :class="{ 'animate-in': isVisible }">
        <div
          v-for="(section, sectionIndex) in sections"
          :key="section.key"
          :id="section.id"
          class="addon-section"
          :class="`stagger-${sectionIndex + 1}`"
        >

          <button
            type="button"
            class="addon-section__header"
            :aria-expanded="isSectionExpanded(section.key)"
            :aria-controls="`addon-body-${section.key}`"
            @click="toggleSection(section.key)"
          >
            <div class="addon-section__title-group">
              <h3 class="addon-section__title">{{ section.title }}</h3>
              <p class="addon-section__description">{{ section.description }}</p>
            </div>
            <UIcon
              name="i-heroicons-chevron-down"
              class="addon-section__chevron"
              :class="{ 'addon-section__chevron--open': isSectionExpanded(section.key) }"
              aria-hidden="true"
            />
          </button>

          <div
            :id="`addon-body-${section.key}`"
            class="addon-section__body"
            :class="{ 'addon-section__body--open': isSectionExpanded(section.key) }"
          >
            <p v-if="section.note" class="addon-section__note">
              {{ section.note }}
            </p>

            <ul class="price-list" role="list">
              <li
                v-for="(item, itemIndex) in section.items"
                :key="itemIndex"
                class="price-row"
              >
                <span class="price-row__name">{{ item.name }}</span>
                <span class="price-row__price">
                  <span class="price-row__currency">{{ currency }}</span>
                  <span class="price-row__value">{{ item.price }}</span>
                  <span v-if="formatUnit(item.unit)" class="price-row__unit">
                    {{ formatUnit(item.unit) }}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p class="vat-note" :class="{ 'animate-in': isVisible }">
        {{ t("services.addons.vatNote") }}
      </p>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.addons-section {
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
  max-width: 900px;
  margin: 0 auto;
}

.section-header {
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

.toggle-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  min-height: 44px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-smooth),
    color var(--duration-fast) var(--ease-smooth);

  &:hover {
    border-color: var(--color-primary-400);
    color: var(--color-text-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (min-width: 768px) {
    display: none;
  }
}

.toggle-all-icon {
  width: 16px;
  height: 16px;
}

.addons-sections {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--card-border);
  border-radius: 16px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.1s,
    transform 0.6s var(--ease-smooth) 0.1s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.addon-section {
  border-bottom: 1px solid var(--card-border);

  &:last-child {
    border-bottom: none;
  }

  &.stagger-1 { transition-delay: 120ms; }
  &.stagger-2 { transition-delay: 200ms; }
  &.stagger-3 { transition-delay: 280ms; }
  &.stagger-4 { transition-delay: 360ms; }
}

.addon-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  padding: 1.75rem 2rem;
  background: var(--card-bg);
  border: none;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-smooth);

  &:hover {
    background: color-mix(in srgb, var(--color-primary-50) 40%, var(--card-bg));
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: -2px;
  }

  @media (min-width: 768px) {
    cursor: default;
    pointer-events: none;

    &:hover {
      background: var(--card-bg);
    }
  }
}

.addon-section__title-group {
  flex: 1;
  min-width: 0;
}

.addon-section__title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.375rem;
  line-height: 1.3;
}

.addon-section__description {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-muted);
  margin: 0;

  @media (max-width: 767px) {
    display: none;
  }
}

.addon-section__chevron {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--color-text-muted);
  transition: transform var(--duration-fast) var(--ease-smooth);

  &--open {
    transform: rotate(180deg);
  }

  @media (min-width: 768px) {
    display: none;
  }
}

.addon-section__body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s var(--ease-smooth);

  &--open {
    max-height: 600px;
  }

  @media (min-width: 768px) {
    max-height: none !important;
    overflow: visible;
  }
}

.addon-section__note {
  padding: 0 2rem 0.75rem;
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
  font-style: italic;
}

.price-list {
  list-style: none;
  padding: 0 2rem 1.75rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--color-border);

  &:first-child {
    border-top: none;
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
  gap: 0.35rem;
  flex-shrink: 0;
  text-align: right;
}

.price-row__currency {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.price-row__value {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary-600);
  font-variant-numeric: tabular-nums;
}

.price-row__unit {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.vat-note {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
  margin-top: 1.5rem;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.5s,
    transform 0.6s var(--ease-smooth) 0.5s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

:root.dark {
  .addons-section {
    background: var(--color-section-dark);
  }

  .addon-section__header:hover {
    background: color-mix(in srgb, var(--color-primary-900) 30%, var(--card-bg));
  }

  .price-row__currency {
    color: var(--color-primary-300);
  }

  .price-row__value {
    color: var(--color-primary-300);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .addons-sections,
  .vat-note {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .addon-section__body {
    transition: none;
  }

  .addon-section__chevron {
    transition: none;
  }
}
</style>
