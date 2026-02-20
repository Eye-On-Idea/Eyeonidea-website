<script lang="ts" setup>
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "~/stores/preferences";

const { locale, setLocale, t } = useI18n();
const preferencesStore = usePreferencesStore();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLButtonElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const activeIndex = ref(-1);

// Complete language registry — only those in SUPPORTED_LANGUAGES are shown
const languageRegistry: Record<
  string,
  { nativeName: string; icon: string; region: string }
> = {
  en: { nativeName: "English", icon: "i-circle-flags-gb", region: "GB" },
  fr: { nativeName: "Français", icon: "i-circle-flags-fr", region: "FR" },
  es: { nativeName: "Español", icon: "i-circle-flags-es", region: "ES" },
  de: { nativeName: "Deutsch", icon: "i-circle-flags-de", region: "DE" },
  it: { nativeName: "Italiano", icon: "i-circle-flags-it", region: "IT" },
  dk: { nativeName: "Dansk", icon: "i-circle-flags-dk", region: "DK" },
};

const options = computed(() =>
  SUPPORTED_LANGUAGES.map((code) => ({
    code,
    ...(languageRegistry[code] ?? {
      nativeName: code.toUpperCase(),
      icon: "i-heroicons-language",
      region: code.toUpperCase(),
    }),
  })),
);

const currentLanguage = computed(
  () =>
    options.value.find((lang) => lang.code === locale.value) ??
    options.value[0],
);

const switchLanguage = async (langCode: SupportedLanguage) => {
  if (locale.value === langCode) {
    closePanel(true);
    return;
  }
  await preferencesStore.setLanguage(langCode);
  await setLocale(langCode);
  closePanel(true);
};

// Panel open/close
const openPanel = (focusIndex = 0) => {
  isOpen.value = true;
  activeIndex.value = focusIndex;
  nextTick(() => focusItem(focusIndex));
};

const closePanel = (returnFocus = false) => {
  isOpen.value = false;
  activeIndex.value = -1;
  if (returnFocus) {
    nextTick(() => buttonRef.value?.focus());
  }
};

const togglePanel = () => {
  if (isOpen.value) {
    closePanel();
  } else {
    openPanel(0);
  }
};

// Focus management
const getItems = () => {
  if (!panelRef.value) return [];
  return Array.from(
    panelRef.value.querySelectorAll<HTMLElement>('[role="radio"]'),
  );
};

const focusItem = (index: number) => {
  const items = getItems();
  if (items.length === 0) return;
  const wrappedIndex = ((index % items.length) + items.length) % items.length;
  activeIndex.value = wrappedIndex;
  items[wrappedIndex]?.focus();
};

// Keyboard: trigger button
const handleButtonKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowDown":
    case "Enter":
    case " ":
      event.preventDefault();
      openPanel(0);
      break;
    case "ArrowUp":
      event.preventDefault();
      openPanel(options.value.length - 1);
      break;
    case "Escape":
      if (isOpen.value) {
        event.preventDefault();
        closePanel(true);
      }
      break;
  }
};

// Keyboard: within panel (grid navigation)
const handlePanelKeydown = (event: KeyboardEvent) => {
  const items = getItems();
  if (items.length === 0) return;
  const current = activeIndex.value;
  // Calculate columns based on grid layout (2 columns on small, 3 on larger)
  const cols = window.innerWidth >= 640 ? 3 : 2;

  switch (event.key) {
    case "ArrowRight":
      event.preventDefault();
      focusItem(current + 1);
      break;
    case "ArrowLeft":
      event.preventDefault();
      focusItem(current - 1);
      break;
    case "ArrowDown":
      event.preventDefault();
      focusItem(current + cols);
      break;
    case "ArrowUp":
      event.preventDefault();
      focusItem(current - cols);
      break;
    case "Home":
      event.preventDefault();
      focusItem(0);
      break;
    case "End":
      event.preventDefault();
      focusItem(items.length - 1);
      break;
    case "Escape":
      event.preventDefault();
      closePanel(true);
      break;
  }
};

// Click outside
const handleClickOutside = (event: MouseEvent) => {
  if (
    containerRef.value &&
    !containerRef.value.contains(event.target as Node)
  ) {
    closePanel();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div ref="containerRef" class="lang-switcher">
    <!-- Globe trigger button -->
    <button
      ref="buttonRef"
      type="button"
      class="lang-switcher__trigger active:bg-primary-600 hover:bg-primary-600"
      :aria-label="t('common.accessibility.selectLanguage')"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      @click="togglePanel"
      @keydown="handleButtonKeydown"
    >
      <ClientOnly>
        <UIcon :name="currentLanguage.icon" class="lang-switcher__flag" />
        <template #fallback>
          <UIcon name="i-heroicons-language" class="lang-switcher__flag" />
        </template>
      </ClientOnly>
      <span class="lang-switcher__code text-primary-50">{{
        currentLanguage.code.toUpperCase()
      }}</span>
      <UIcon
        name="i-lucide-chevron-down"
        class="lang-switcher__chevron text-primary-50"
        :class="{ 'lang-switcher__chevron--open': isOpen }"
      />
    </button>

    <!-- Flyout panel -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-1"
    >
      <div
        v-if="isOpen"
        ref="panelRef"
        class="lang-switcher__panel"
        role="radiogroup"
        :aria-label="t('common.accessibility.selectLanguage')"
        @keydown="handlePanelKeydown"
      >
        <button
          v-for="(lang, index) in options"
          :key="lang.code"
          type="button"
          role="radio"
          :aria-checked="locale === lang.code"
          :aria-label="lang.nativeName"
          :tabindex="index === activeIndex ? 0 : -1"
          class="lang-switcher__item"
          :class="{ 'lang-switcher__item--active': locale === lang.code }"
          @click="switchLanguage(lang.code)"
        >
          <UIcon :name="lang.icon" class="lang-switcher__item-flag" />
          <span class="lang-switcher__item-name" :lang="lang.code">{{
            lang.nativeName
          }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lang-switcher {
  position: relative;
}

/* ── Trigger button ── */
.lang-switcher__trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 10px;
  min-height: 44px;
  border-radius: 12px;

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-smooth);
}

.lang-switcher__flag {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.lang-switcher__code {
  font-family: var(--font-text);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.lang-switcher__chevron {
  width: 14px;
  height: 14px;
  transition: transform var(--duration-fast) var(--ease-smooth);
}

.lang-switcher__chevron--open {
  transform: rotate(180deg);
}

/* ── Flyout panel ── */
.lang-switcher__panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  padding: 8px;
  min-width: 240px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--color-surface-1) 94%, transparent);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  -webkit-backdrop-filter: blur(var(--glass-blur))
    saturate(var(--glass-saturation));
  box-shadow: var(--glass-shadow-elevated);
  transform-origin: top right;
}

@media (min-width: 640px) {
  .lang-switcher__panel {
    grid-template-columns: repeat(3, 1fr);
    min-width: 320px;
  }
}

/* ── Language item ── */
.lang-switcher__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 10px;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-smooth);
}

.lang-switcher__item:hover {
  background: var(--color-surface-2);
  border-color: var(--glass-border-subtle);
}

.lang-switcher__item:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: -2px;
}

.lang-switcher__item--active {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-primary-500) 15%, transparent),
    color-mix(in srgb, var(--color-accent-500) 15%, transparent)
  );
  border-color: color-mix(in srgb, var(--color-primary-500) 25%, transparent);
}

.lang-switcher__item--active:hover {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-primary-500) 20%, transparent),
    color-mix(in srgb, var(--color-accent-500) 20%, transparent)
  );
}

.lang-switcher__item-flag {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.lang-switcher__item-name {
  font-family: var(--font-text);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.lang-switcher__item--active .lang-switcher__item-name {
  color: var(--color-text-primary);
  font-weight: 700;
}

/* ── Dark mode ── */
html.dark .lang-switcher__trigger {
  background: color-mix(in srgb, var(--color-surface-2) 70%, transparent);
}

html.dark .lang-switcher__panel {
  background: color-mix(in srgb, var(--color-surface-1) 96%, transparent);
}

html.dark .lang-switcher__item--active {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-primary-400) 18%, transparent),
    color-mix(in srgb, var(--color-accent-400) 18%, transparent)
  );
  border-color: color-mix(in srgb, var(--color-primary-400) 30%, transparent);
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .lang-switcher__chevron,
  .lang-switcher__trigger,
  .lang-switcher__item {
    transition: none;
  }
}

/* ── Reduced transparency ── */
@media (prefers-reduced-transparency: reduce) {
  .lang-switcher__trigger {
    background: var(--color-surface-1);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .lang-switcher__panel {
    background: var(--color-surface-1);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>
