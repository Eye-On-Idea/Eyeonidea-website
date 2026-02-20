<template>
  <div class="news-filters bg-neutral-50/85">
    <UContainer class="max-w-360">
      <div
        v-if="shouldAnnounce"
        class="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {{ resultsMessage }}
      </div>
      <div
        v-motion
        :initial="motionVariants.fadeInUp.initial"
        :visible-once="motionVariants.fadeInUp.visible"
        class="filters-container"
      >
        <!-- Search -->
        <div class="filter-search">
          <Icon
            name="i-heroicons-magnifying-glass"
            class="search-icon"
            aria-hidden="true"
          />
          <input
            v-model="localSearch"
            type="search"
            name="search"
            autocomplete="search"
            :placeholder="t('news.filters.search')"
            class="search-input"
            @input="debouncedSearch"
          />
          <button
            v-if="localSearch"
            type="button"
            class="search-clear"
            :aria-label="t('news.filters.clearSearch')"
            @click="clearSearch"
          >
            <Icon name="i-heroicons-x-mark" class="size-4" />
          </button>
        </div>

        <!-- Type filter -->
        <div class="filter-type">
          <label for="post-type-filter" class="filter-label">
            <Icon name="i-heroicons-funnel" class="size-4" aria-hidden="true" />
            {{ t("news.filters.filterByType") }}
          </label>
          <select
            id="post-type-filter"
            v-model="localType"
            class="filter-select"
            @change="updateType"
          >
            <option value="">{{ t("news.filters.allTypes") }}</option>
            <option
              v-for="type in postTypes"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </option>
          </select>
        </div>

        <!-- Active filter chips -->
        <div v-if="hasActiveFilters" class="active-filters">
          <span class="filter-chip" v-if="searchQuery">
            {{ t("news.filters.searchChip", { query: searchQuery }) }}
            <button type="button" class="chip-remove" @click="clearSearch">
              <Icon name="i-heroicons-x-mark" class="size-3" />
            </button>
          </span>
          <span class="filter-chip" v-if="selectedType">
            {{ getTypeLabel(selectedType) }}
            <button type="button" class="chip-remove" @click="clearType">
              <Icon name="i-heroicons-x-mark" class="size-3" />
            </button>
          </span>
          <button type="button" class="clear-all" @click="clearAll">
            {{ t("news.filters.clearAll") }}
          </button>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { animationPresets } from "~/composables/useAccessibleMotion";
import type { PostType } from "~/types/sanity";

const props = defineProps<{
  searchQuery: string;
  selectedType: PostType | null;
  filteredCount?: number;
  isLoading?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:searchQuery", value: string): void;
  (e: "update:selectedType", value: PostType | null): void;
}>();

const { t } = useI18n();
const postTypes = computed((): { value: PostType; label: string }[] => [
  { value: "news", label: t("news.postTypes.news") },
  { value: "event", label: t("news.postTypes.event") },
  { value: "product_update", label: t("news.postTypes.product_update") },
  { value: "press_release", label: t("news.postTypes.press_release") },
]);

const motionVariants = {
  fadeInUp: animationPresets.fadeInUp,
};

const shouldAnnounce = computed(
  () => props.filteredCount !== undefined && !props.isLoading
);
const resultsMessage = computed(() => {
  if (props.filteredCount === undefined) return "";
  const count = props.filteredCount;
  return count === 1
    ? t("news.filters.resultsCountSingle", { count })
    : t("news.filters.resultsCount", { count });
});

const localSearch = ref(props.searchQuery);
const localType = ref(props.selectedType || "");

// Watch for external changes
watch(
  () => props.searchQuery,
  (val) => {
    localSearch.value = val;
  }
);

watch(
  () => props.selectedType,
  (val) => {
    localType.value = val || "";
  }
);

const hasActiveFilters = computed(() => {
  return props.searchQuery || props.selectedType;
});

function getTypeLabel(type: PostType) {
  return postTypes.value.find((t) => t.value === type)?.label || type;
}

// Debounced search
let searchTimeout: ReturnType<typeof setTimeout>;
function debouncedSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    emit("update:searchQuery", localSearch.value);
  }, 300);
}

onUnmounted(() => {
  clearTimeout(searchTimeout);
});

function clearSearch() {
  localSearch.value = "";
  emit("update:searchQuery", "");
}

function updateType() {
  emit(
    "update:selectedType",
    localType.value ? (localType.value as PostType) : null
  );
}

function clearType() {
  localType.value = "";
  emit("update:selectedType", null);
}

function clearAll() {
  clearSearch();
  clearType();
}
</script>

<style lang="scss" scoped>
.news-filters {
  position: sticky;
  top: 64px; // Header height
  z-index: 40;
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
  backdrop-filter: blur(3px);
  @media (min-width: 768px) {
    padding: 1.25rem 0;
  }
}

.filters-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
}

.filter-search {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary-400);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.75rem;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-size: 0.9375rem;
  color: var(--color-text);
  transition: all var(--duration-fast) var(--ease-smooth);

  &::placeholder {
    color: var(--color-primary-400);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 3px rgba(64, 150, 255, 0.15);
  }
}

.search-clear {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  background: var(--color-primary-100);
  border: none;
  border-radius: 6px;
  color: var(--color-primary-600);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-smooth);

  &:hover {
    background: var(--color-primary-200);
  }
}

.filter-type {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-primary-700);
  white-space: nowrap;
}

.filter-select {
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-size: 0.9375rem;
  color: var(--color-text);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  transition: all var(--duration-fast) var(--ease-smooth);

  &:focus {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 3px rgba(64, 150, 255, 0.15);
  }
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
    margin-left: auto;
  }
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  background: var(--color-primary-100);
  border-radius: 9999px;
  font-size: 0.8125rem;
  color: var(--color-primary-700);
}

.chip-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  background: var(--color-primary-200);
  border: none;
  border-radius: 50%;
  color: var(--color-primary-600);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-smooth);

  &:hover {
    background: var(--color-primary-300);
  }
}

.clear-all {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-primary-600);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color var(--duration-fast) var(--ease-smooth);

  &:hover {
    color: var(--color-primary-500);
  }
}

/* Dark mode */
:global(.dark) .news-filters {
  background: var(--color-bg);
}

:global(.dark) .search-input {
  background: var(--color-surface-1);
  border-color: var(--color-border);

  &::placeholder {
    color: var(--color-primary-500);
  }

  &:focus {
    border-color: var(--color-primary-500);
  }
}

:global(.dark) .search-clear {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-primary-300);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
}

:global(.dark) .filter-label {
  color: var(--color-primary-300);
}

:global(.dark) .filter-select {
  background-color: var(--color-surface-1);
  border-color: var(--color-border);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
}

:global(.dark) .filter-chip {
  background: rgba(64, 150, 255, 0.2);
  color: var(--color-primary-200);
}

:global(.dark) .chip-remove {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-primary-300);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

:global(.dark) .clear-all {
  color: var(--color-primary-400);

  &:hover {
    color: var(--color-primary-300);
  }
}
</style>
