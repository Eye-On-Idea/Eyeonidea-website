<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "~/stores/preferences";

const { locale, setLocale, t } = useI18n();
const preferencesStore = usePreferencesStore();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLButtonElement | null>(null);
const activeIndex = ref(-1);
const menuId = "language-switcher-menu";

const languageDetails: Record<
  SupportedLanguage,
  { name: string; icon: string }
> = {
  en: { name: "English", icon: "i-circle-flags-gb" },
  fr: { name: "Français", icon: "i-circle-flags-fr" },
  es: { name: "Español", icon: "i-circle-flags-es" },
};

const availableLocales = SUPPORTED_LANGUAGES.map((code) => ({
  code,
  ...languageDetails[code],
}));

const currentLanguage = computed(() => {
  const found = availableLocales.find((lang) => lang.code === locale.value);
  return found ?? availableLocales[0];
});

const currentLanguageName = computed(
  () => currentLanguage.value?.name ?? languageDetails.en.name
);

const switchLanguage = async (langCode: SupportedLanguage) => {
  if (locale.value === langCode) {
    closeMenu(true);
    return;
  }

  // Save preference to cookie and localStorage FIRST
  await preferencesStore.setLanguage(langCode);

  // Then change the locale
  await setLocale(langCode);

  closeMenu(true);
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const getMenuItems = () => {
  const dropdown = dropdownRef.value;
  if (!dropdown) return [];
  return Array.from(
    dropdown.querySelectorAll<HTMLElement>('[role="menuitem"]')
  );
};

const focusMenuItem = (index: number) => {
  const items = getMenuItems();
  if (items.length === 0) return;
  const wrappedIndex = ((index % items.length) + items.length) % items.length;
  activeIndex.value = wrappedIndex;
  items[wrappedIndex]?.focus();
};

const openMenu = (focusIndex: number) => {
  isOpen.value = true;
  nextTick(() => focusMenuItem(focusIndex));
};

const closeMenu = (returnFocus = false) => {
  isOpen.value = false;
  activeIndex.value = -1;
  if (returnFocus) {
    nextTick(() => buttonRef.value?.focus());
  }
};

const toggleDropdown = () => {
  if (isOpen.value) {
    closeMenu();
    return;
  }
  isOpen.value = true;
};

const handleButtonKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      openMenu(0);
      break;
    case "ArrowUp":
      event.preventDefault();
      openMenu(availableLocales.length - 1);
      break;
    case "Enter":
    case " ":
      if (!isOpen.value) {
        event.preventDefault();
        openMenu(0);
      }
      break;
    case "Escape":
      if (isOpen.value) {
        event.preventDefault();
        closeMenu(true);
      }
      break;
  }
};

const handleMenuKeydown = (event: KeyboardEvent) => {
  const items = getMenuItems();
  if (items.length === 0) return;
  const activeElement = document.activeElement as HTMLElement | null;
  const currentIndex = activeElement ? items.indexOf(activeElement) : -1;

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      focusMenuItem(currentIndex < 0 ? 0 : currentIndex + 1);
      break;
    case "ArrowUp":
      event.preventDefault();
      focusMenuItem(
        currentIndex < 0 ? items.length - 1 : currentIndex - 1
      );
      break;
    case "Home":
      event.preventDefault();
      focusMenuItem(0);
      break;
    case "End":
      event.preventDefault();
      focusMenuItem(items.length - 1);
      break;
    case "Escape":
      event.preventDefault();
      closeMenu(true);
      break;
  }
};
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <!-- Language Button -->
    <button
      ref="buttonRef"
      @click="toggleDropdown"
      @keydown="handleButtonKeydown"
      class="touch-target px-3 py-2 bg-(--color-surface-1)! hover:bg-primary-800/10! dark:hover:bg-(--color-surface-3) rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
      :aria-label="t('common.accessibility.selectLanguage')"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      :aria-controls="menuId"
    >
      <UIcon
        :name="currentLanguage?.icon ?? 'i-circle-flags-gb'"
        class="w-5 h-5"
      />
      <span class="sm:inline text-neutral-900">{{ currentLanguageName }}</span>
      <UIcon
        name="i-lucide-chevron-down"
        class="h-4 w-4 transition-transform duration-200 bg-neutral-900"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        :id="menuId"
        v-show="isOpen"
        class="absolute right-0 mt-2 w-48 rounded-lg bg-(--color-surface-1) shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 z-50"
      >
        <div class="py-1" role="menu" @keydown="handleMenuKeydown">
          <button
            v-for="lang in availableLocales"
            :key="lang.code"
            @click="switchLanguage(lang.code)"
            class="w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-(--color-surface-2) dark:hover:bg-(--color-surface-3) hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left cursor-pointer"
            :class="{
              'bg-(--color-surface-2) dark:bg-(--color-surface-3)':
                locale === lang.code,
            }"
            role="menuitem"
          >
            <UIcon :name="lang.icon" class="h-5 w-5" />
            <span>{{ lang.name }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
