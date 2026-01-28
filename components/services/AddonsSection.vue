<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const expandedCategory = ref<string | null>(null);

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
    { threshold: 0.1 }
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

interface AddonCategory {
  title: string;
  icon: string;
  items: AddonItem[];
}

const categories = computed(() => {
  const raw = tm("services.addons.categories") as Record<string, AddonCategory>;
  return Object.entries(raw).map(([key, category]) => ({
    key,
    ...category,
  }));
});

const currency = computed(() => t("services.addons.currency"));

const toggleCategory = (key: string) => {
  expandedCategory.value = expandedCategory.value === key ? null : key;
};

const formatPrice = (price: string) => {
  return price.includes("-") ? price : price;
};

const formatUnit = (unit: string) => {
  const unitMap: Record<string, string> = {
    "one-time": "",
    "per page": "/ page",
    "per hour": "/ hour",
    "per language": "/ language",
    "per year": "/ year",
    "per month": "/ month",
    "per account/month": "/ account / mo",
    "per session": "/ session",
  };
  return unitMap[unit] || unit;
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
      <!-- Header -->
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <span class="section-badge">{{ t("services.addons.badge") }}</span>
        <h2 id="addons-heading" class="section-title">
          {{ t("services.addons.title") }}
        </h2>
        <p class="section-subtitle">
          {{ t("services.addons.subtitle") }}
        </p>
      </div>

      <!-- Add-ons Grid -->
      <div class="addons-grid" :class="{ 'animate-in': isVisible }">
        <article
          v-for="(category, index) in categories"
          :key="category.key"
          class="addon-card"
          :class="[
            `stagger-${index + 1}`,
            { 'addon-card--expanded': expandedCategory === category.key },
          ]"
        >
          <!-- Card Header (clickable on mobile) -->
          <button
            type="button"
            class="addon-header"
            :aria-expanded="expandedCategory === category.key"
            :aria-controls="`addon-content-${category.key}`"
            @click="toggleCategory(category.key)"
          >
            <div class="addon-icon-wrapper">
              <UIcon :name="category.icon" class="addon-icon" />
            </div>
            <h3 class="addon-title">{{ category.title }}</h3>
            <span class="addon-count">{{ category.items.length }} items</span>
            <UIcon
              name="i-heroicons-chevron-down"
              class="expand-icon"
              :class="{ 'expand-icon--rotated': expandedCategory === category.key }"
            />
          </button>

          <!-- Card Content -->
          <div
            :id="`addon-content-${category.key}`"
            class="addon-content"
            :class="{ 'addon-content--visible': expandedCategory === category.key }"
          >
            <ul class="addon-list" role="list">
              <li
                v-for="(item, itemIndex) in category.items"
                :key="itemIndex"
                class="addon-item"
              >
                <span class="item-name">{{ item.name }}</span>
                <span class="item-price">
                  <span class="price-value">
                    {{ currency }}{{ formatPrice(item.price) }}
                  </span>
                  <span v-if="formatUnit(item.unit)" class="price-unit">
                    {{ formatUnit(item.unit) }}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <!-- VAT Note -->
      <p class="vat-note" :class="{ 'animate-in': isVisible }">
        {{ t("services.addons.vatNote") }}
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.addons-section {
  padding: 6rem 1.5rem;
  background: var(--color-section-alt);

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
  background: var(--badge-accent-bg);
  color: var(--badge-accent-text);
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

.addons-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  &.animate-in .addon-card {
    opacity: 1;
    transform: translateY(0);
  }
}

.addon-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth),
    box-shadow var(--duration-normal) var(--ease-smooth);

  &.stagger-1 { transition-delay: 100ms; }
  &.stagger-2 { transition-delay: 150ms; }
  &.stagger-3 { transition-delay: 200ms; }
  &.stagger-4 { transition-delay: 250ms; }
  &.stagger-5 { transition-delay: 300ms; }
  &.stagger-6 { transition-delay: 350ms; }

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  // On desktop, always show content
  @media (min-width: 768px) {
    .addon-content {
      max-height: none !important;
      opacity: 1 !important;
      padding: 0 1.5rem 1.5rem !important;
    }

    .expand-icon {
      display: none;
    }

    .addon-header {
      cursor: default;
    }
  }
}

.addon-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: -2px;
  }
}

.addon-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--color-primary-100);
  border-radius: 12px;
  flex-shrink: 0;
}

.addon-icon {
  width: 24px;
  height: 24px;
  color: var(--icon-primary);
}

.addon-title {
  flex: 1;
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.addon-count {
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
  background: var(--color-surface-2);
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;

  @media (min-width: 768px) {
    display: none;
  }
}

.expand-icon {
  width: 20px;
  height: 20px;
  color: var(--color-text-muted);
  transition: transform var(--duration-fast) var(--ease-smooth);

  &--rotated {
    transform: rotate(180deg);
  }
}

.addon-content {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    max-height 0.3s var(--ease-smooth),
    opacity 0.3s var(--ease-smooth),
    padding 0.3s var(--ease-smooth);

  &--visible {
    max-height: 500px;
    opacity: 1;
    padding: 0 1.5rem 1.5rem;
  }
}

.addon-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.addon-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--color-border);

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
}

.item-name {
  font-size: var(--text-sm);
  color: var(--color-text);
  flex: 1;
}

.item-price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  text-align: right;
  flex-shrink: 0;
}

.price-value {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary-600);
}

.price-unit {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.vat-note {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
  margin-top: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.5s,
    transform 0.6s var(--ease-smooth) 0.5s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

// Dark mode
:root.dark {
  .addons-section {
    background: var(--color-section-dark);
  }

  .section-badge {
    background: var(--color-accent-900);
    color: var(--color-accent-300);
  }

  .addon-card {
    background: var(--card-bg);
    border-color: var(--card-border);

    &:hover {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
  }

  .addon-icon-wrapper {
    background: var(--color-primary-900);
  }

  .addon-icon {
    color: var(--color-primary-300);
  }

  .addon-count {
    background: var(--color-surface-3);
  }

  .price-value {
    color: var(--color-primary-300);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .addon-card,
  .vat-note {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .addon-content {
    transition: none;
  }

  .expand-icon {
    transition: none;
  }
}
</style>
