<script setup lang="ts">
const { t } = useI18n();
const { searchArticles } = useClientHub();

const query = ref("");
const isOpen = ref(false);
const activeIndex = ref(-1);
const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLElement | null>(null);

const results = computed(() => searchArticles(query.value));

// Reset active index when results change
watch(results, () => {
  activeIndex.value = -1;
});

const handleFocus = () => {
  isOpen.value = true;
};

const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false;
    activeIndex.value = -1;
  }, 200);
};

const handleSelect = () => {
  query.value = "";
  isOpen.value = false;
  activeIndex.value = -1;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!isOpen.value || query.value.length < 2) return;

  const count = results.value.length;
  if (count === 0) return;

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      activeIndex.value = activeIndex.value < count - 1 ? activeIndex.value + 1 : 0;
      scrollActiveIntoView();
      break;
    case "ArrowUp":
      e.preventDefault();
      activeIndex.value = activeIndex.value > 0 ? activeIndex.value - 1 : count - 1;
      scrollActiveIntoView();
      break;
    case "Enter":
      e.preventDefault();
      if (activeIndex.value >= 0 && activeIndex.value < count) {
        const article = results.value[activeIndex.value];
        navigateTo(`/client-hub/${article.serviceSlug}/${article.categorySlug}/${article.slug}`);
        handleSelect();
      }
      break;
    case "Escape":
      e.preventDefault();
      isOpen.value = false;
      activeIndex.value = -1;
      inputRef.value?.blur();
      break;
  }
};

const scrollActiveIntoView = () => {
  nextTick(() => {
    const active = listRef.value?.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: "nearest" });
  });
};

// Cmd+K / Ctrl+K global shortcut
const handleGlobalKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    inputRef.value?.focus();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleGlobalKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleGlobalKeydown);
});

const activeDescendantId = computed(() =>
  activeIndex.value >= 0 ? `search-result-${activeIndex.value}` : undefined,
);

const isMac = computed(() => {
  if (import.meta.server) return false;
  return navigator.platform?.toUpperCase().includes("MAC");
});
</script>

<template>
  <div class="hub-search relative" role="search">
    <label for="hub-search-input" class="sr-only">
      {{ t("clientHub.nav.search") }}
    </label>
    <div class="relative">
      <Icon
        name="i-heroicons-magnifying-glass"
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-tertiary)"
        aria-hidden="true"
      />
      <input
        id="hub-search-input"
        ref="inputRef"
        v-model="query"
        type="search"
        :placeholder="t('clientHub.nav.search')"
        role="combobox"
        aria-autocomplete="list"
        aria-controls="hub-search-results"
        :aria-expanded="isOpen && query.length >= 2"
        :aria-activedescendant="activeDescendantId"
        class="w-full pl-9 pr-16 py-2.5 min-h-11 text-sm rounded-xl bg-(--color-surface-2) border border-(--glass-border-subtle) text-(--color-text-primary) placeholder-(--color-text-tertiary) focus:outline-none focus:ring-2 focus:ring-primary-400 hover:border-primary-400/30 transition-all"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      <!-- Keyboard shortcut hint -->
      <kbd
        v-if="!query"
        class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs text-(--color-text-tertiary) bg-(--color-surface-1) border border-(--glass-border-subtle) rounded-md font-mono"
        aria-hidden="true"
      >
        {{ isMac ? "⌘" : "Ctrl+" }}K
      </kbd>
    </div>

    <!-- Live region for screen readers -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      <span v-if="isOpen && query.length >= 2">
        {{ results.length === 0
          ? t("clientHub.nav.noResults", { query })
          : `${results.length} ${results.length === 1 ? 'result' : 'results'} found`
        }}
      </span>
    </div>

    <!-- Results dropdown -->
    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      leave-active-class="transition-all duration-100 ease-in"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen && query.length >= 2"
        id="hub-search-results"
        ref="listRef"
        class="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-lg border border-(--glass-border-subtle) bg-(--color-surface-1) z-50 max-h-80 overflow-y-auto"
        role="listbox"
      >
        <div v-if="results.length === 0" class="px-4 py-3 text-sm text-(--color-text-tertiary)">
          {{ t("clientHub.nav.noResults", { query }) }}
        </div>
        <NuxtLink
          v-for="(article, index) in results"
          :id="`search-result-${index}`"
          :key="`${article.categorySlug}/${article.slug}`"
          :to="`/client-hub/${article.serviceSlug}/${article.categorySlug}/${article.slug}`"
          role="option"
          :aria-selected="index === activeIndex"
          :data-active="index === activeIndex"
          class="block px-4 py-3 text-sm transition-colors border-b border-(--glass-border-subtle) last:border-b-0 min-h-11"
          :class="index === activeIndex
            ? 'bg-primary-500/10 text-(--color-text-primary)'
            : 'hover:bg-(--color-surface-2)'"
          @click="handleSelect"
        >
          <div class="font-medium text-(--color-text-primary)">
            {{ t(article.titleKey) }}
          </div>
          <div class="text-(--color-text-tertiary) mt-0.5">
            {{ t(article.summaryKey) }}
          </div>
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>
