<!-- components/MyHeader.vue -->
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const route = useRoute();
const { t } = useI18n();

const navLinks = computed(() => [
  { label: t("nav.home"), to: "/" },
  { label: t("nav.services"), to: "/services" },
  { label: t("nav.news"), to: "/news" },
  {
    label: t("nav.about"),
    to: "/about",
    children: [
      {
        label: t("nav.legal"),
        to: "/about/legal",
      },
      {
        label: t("nav.policies"),
        to: "/about/policies",
      },
    ],
  },
  { label: t("nav.contact"), to: "/contact" },
]);

type NavLink = {
  label: string;
  to: string;
  children?: Array<{ label: string; to: string }>;
};

// Dropdown state for desktop
const openDropdown = ref<string | null>(null);
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

const getDropdownId = (index: number) => `nav-dropdown-${index}`;

const openDropdownMenu = (to: string) => {
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
  openDropdown.value = to;
};

const closeDropdownMenu = () => {
  closeTimeout = setTimeout(() => {
    openDropdown.value = null;
  }, 150);
};

const handleDropdownFocusOut = (event: FocusEvent) => {
  const currentTarget = event.currentTarget as HTMLElement | null;
  const nextTarget = event.relatedTarget as HTMLElement | null;
  if (currentTarget && nextTarget && currentTarget.contains(nextTarget)) {
    return;
  }
  closeDropdownMenu();
};

const getDropdownItems = (dropdownId: string) => {
  const menu = document.getElementById(dropdownId);
  if (!menu) return [];
  return Array.from(menu.querySelectorAll<HTMLElement>(".dropdown-item"));
};

const focusDropdownItem = (dropdownId: string, index: number) => {
  const items = getDropdownItems(dropdownId);
  if (items.length === 0) return;
  const wrappedIndex = ((index % items.length) + items.length) % items.length;
  items[wrappedIndex]?.focus();
};

const focusDropdownTrigger = (eventTarget: HTMLElement) => {
  const container = eventTarget.closest("[data-dropdown-container]");
  const trigger = container?.querySelector<HTMLElement>(
    "[data-dropdown-trigger]",
  );
  trigger?.focus();
};

const handleDropdownKeydown = async (
  event: KeyboardEvent,
  link: NavLink,
  index: number,
) => {
  if (!link.children) return;
  const dropdownId = getDropdownId(index);

  switch (event.key) {
    case "Enter":
    case " ":
    case "ArrowDown":
      event.preventDefault();
      openDropdown.value = link.to;
      await nextTick();
      focusDropdownItem(dropdownId, 0);
      break;
    case "ArrowUp":
      event.preventDefault();
      openDropdown.value = link.to;
      await nextTick();
      focusDropdownItem(dropdownId, -1);
      break;
    case "Escape":
      event.preventDefault();
      openDropdown.value = null;
      (event.currentTarget as HTMLElement | null)?.focus();
      break;
  }
};

const handleDropdownItemKeydown = (
  event: KeyboardEvent,
  dropdownId: string,
) => {
  const items = getDropdownItems(dropdownId);
  if (items.length === 0) return;
  const currentIndex = items.indexOf(event.currentTarget as HTMLElement);

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      focusDropdownItem(dropdownId, currentIndex + 1);
      break;
    case "ArrowUp":
      event.preventDefault();
      focusDropdownItem(dropdownId, currentIndex - 1);
      break;
    case "Home":
      event.preventDefault();
      focusDropdownItem(dropdownId, 0);
      break;
    case "End":
      event.preventDefault();
      focusDropdownItem(dropdownId, items.length - 1);
      break;
    case "Escape":
      event.preventDefault();
      openDropdown.value = null;
      focusDropdownTrigger(event.currentTarget as HTMLElement);
      break;
  }
};

// Mobile expandable state
const expandedMobile = ref<string | null>(null);

const toggleMobileExpand = (to: string) => {
  expandedMobile.value = expandedMobile.value === to ? null : to;
};

// Check if current route matches link or any of its children
const isActiveLink = (link: { to: string; children?: { to: string }[] }) => {
  if (route.path === link.to || route.path === link.to.replace("/#", "/")) {
    return true;
  }
  if (link.children) {
    return link.children.some(
      (child) =>
        route.path === child.to || route.path === child.to.replace("/#", "/"),
    );
  }
  return false;
};

// Scroll bar
const progressMax = 10000;
const scrollProgress = ref(0);

const updateScrollProgress = () => {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop;
  const scrollHeight = doc.scrollHeight - window.innerHeight;

  // Prevent division by zero on very short pages
  const ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

  scrollProgress.value = Math.round(ratio * progressMax);
};

onMounted(() => {
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScrollProgress);
});
</script>

<template>
  <UHeader
    class="header-main sticky top-0 z-50"
    :class="{ 'header-scrolled': scrollProgress > 100 }"
    ><div
      class="absolute -bottom-4.5 left-0 right-0 w-full h-auto z-49 bg-transparent"
    >
      <progress
        id="progressBar"
        :value="scrollProgress"
        :max="progressMax"
        :aria-valuenow="scrollProgress"
        :aria-valuemin="0"
        :aria-valuemax="progressMax"
        :aria-label="t('common.accessibility.scrollProgress')"
        class="w-full h-3"
      ></progress>
    </div>
    <template #title>
      <NuxtLink to="/" class="flex items-center gap-3 group logo-container">
        <img
          src="/public-material/logo-center-shadow.svg"
          alt="Eye On Idea"
          class="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
        />
      </NuxtLink>
    </template>

    <!-- Desktop Navigation -->
    <nav class="hidden lg:flex items-center gap-1">
      <template v-for="(link, index) in navLinks" :key="link.to">
        <!-- Links without children -->
        <NuxtLink
          v-if="!link.children"
          :to="link.to"
          class="relative px-4 py-2.5 text-sm font-bold transition-all duration-300 flex items-center gap-2 rounded-lg overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-400 focus-visible:ring-offset-neutral-900"
          :class="
            isActiveLink(link)
              ? 'text-primary-600 bg-primary-50/80'
              : 'text-neutral-600 hover:text-white hover:bg-(--color-text)/10'
          "
        >
          <span class="relative z-10 text-primary-900!">{{ link.label }}</span>
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="opacity-0 scale-x-0"
            enter-to-class="opacity-100 scale-x-100"
            leave-from-class="opacity-100 scale-x-100"
            leave-to-class="opacity-0 scale-x-0"
          >
            <div
              v-if="isActiveLink(link)"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary-400 to-accent-400 origin-left"
            ></div>
          </Transition>
        </NuxtLink>

        <!-- Links with children (dropdown) -->
        <div
          v-else
          class="relative"
          data-dropdown-container
          @mouseenter="openDropdownMenu(link.to)"
          @mouseleave="closeDropdownMenu"
          @focusin="openDropdownMenu(link.to)"
          @focusout="handleDropdownFocusOut"
        >
          <NuxtLink
            :to="link.to"
            data-dropdown-trigger
            aria-haspopup="menu"
            :aria-expanded="openDropdown === link.to"
            :aria-controls="getDropdownId(index)"
            @keydown="handleDropdownKeydown($event, link, index)"
            class="relative px-4 py-2.5 text-sm font-bold transition-all duration-300 flex items-center gap-2 rounded-lg overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-400 focus-visible:ring-offset-neutral-900"
            :class="
              isActiveLink(link)
                ? 'text-primary-600 bg-primary-50/80'
                : 'text-neutral-600 hover:text-white hover:bg-(--color-text)/10'
            "
          >
            <span class="relative z-10 text-primary-900!">{{
              link.label
            }}</span>
            <Icon
              name="i-heroicons-chevron-down-20-solid"
              class="w-4 h-4 text-primary-900 transition-transform duration-200"
              :class="{ 'rotate-180': openDropdown === link.to }"
            />
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-200 ease-in"
              enter-from-class="opacity-0 scale-x-0"
              enter-to-class="opacity-100 scale-x-100"
              leave-from-class="opacity-100 scale-x-100"
              leave-to-class="opacity-0 scale-x-0"
            >
              <div
                v-if="isActiveLink(link)"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary-400 to-accent-400 origin-left"
              ></div>
            </Transition>
          </NuxtLink>

          <!-- Dropdown menu -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            leave-active-class="transition-all duration-150 ease-in"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div
              v-if="openDropdown === link.to"
              :id="getDropdownId(index)"
              role="menu"
              class="dropdown-menu absolute top-full left-0 mt-1 min-w-55 rounded-xl overflow-hidden z-50 bg-white/95"
            >
              <NuxtLink
                v-for="child in link.children"
                :key="child.to"
                :to="child.to"
                role="menuitem"
                @keydown="
                  handleDropdownItemKeydown($event, getDropdownId(index))
                "
                class="dropdown-item block px-4 py-3 text-sm font-medium transition-colors duration-150"
                :class="{
                  'dropdown-item-active': route.path === child.to,
                }"
              >
                {{ child.label }}
              </NuxtLink>
            </div>
          </Transition>
        </div>
      </template>
    </nav>

    <template #right>
      <LanguageSwitcher />
    </template>

    <!-- Mobile Navigation -->
    <template #body>
      <div class="space-y-3 p-4">
        <div class="flex flex-col gap-2">
          <template v-for="link in navLinks" :key="link.to">
            <!-- Links without children -->
            <NuxtLink
              v-if="!link.children"
              :to="link.to"
              class="px-4 py-3 rounded-xl text-base font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-400 focus-visible:ring-offset-neutral-900"
              :class="
                isActiveLink(link)
                  ? 'bg-primary-500/10 border border-primary-500/20'
                  : ' hover:bg-(--color-text)/10'
              "
            >
              <span class="text-primary-700!">{{ link.label }}</span>
            </NuxtLink>

            <!-- Links with children (expandable) -->
            <div v-else class="flex flex-col">
              <div class="flex items-center gap-2">
                <NuxtLink
                  :to="link.to"
                  class="flex-1 px-4 py-3 rounded-xl text-base font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-400 focus-visible:ring-offset-neutral-900"
                  :class="
                    isActiveLink(link)
                      ? 'bg-primary-500/10 border border-primary-500/20'
                      : ' hover:bg-(--color-text)/10'
                  "
                >
                  <span class="text-primary-700!">{{ link.label }}</span>
                </NuxtLink>
                <button
                  type="button"
                  class="touch-target p-3 rounded-xl text-accent-50 hover:bg-(--color-text)/10 transition-colors duration-200"
                  :aria-expanded="expandedMobile === link.to"
                  :aria-label="
                    expandedMobile === link.to
                      ? 'Collapse submenu'
                      : 'Expand submenu'
                  "
                  @click="toggleMobileExpand(link.to)"
                >
                  <Icon
                    name="i-heroicons-chevron-down-20-solid"
                    class="w-5 h-5 transition-transform duration-200"
                    :class="{ 'rotate-180': expandedMobile === link.to }"
                  />
                </button>
              </div>

              <!-- Child links -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                leave-active-class="transition-all duration-150 ease-in"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-40"
                leave-from-class="opacity-100 max-h-40"
                leave-to-class="opacity-0 max-h-0"
              >
                <div
                  v-if="expandedMobile === link.to"
                  class="overflow-hidden ml-4 mt-1 flex flex-col gap-1"
                >
                  <NuxtLink
                    v-for="child in link.children"
                    :key="child.to"
                    :to="child.to"
                    class="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                    :class="
                      route.path === child.to
                        ? 'bg-primary-500/10 border-l-2 border-primary-400'
                        : ' hover:bg-(--color-text)/5'
                    "
                  >
                    <span class="text-primary-700!">{{ child.label }}</span>
                  </NuxtLink>
                </div>
              </Transition>
            </div>
          </template>
        </div>
      </div>
    </template>
  </UHeader>
</template>

<style lang="scss" scoped>
/* Header base styles */
.header-main {
  background: color-mix(in srgb, var(--color-primary-50) 75%, transparent);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  -webkit-backdrop-filter: blur(var(--glass-blur))
    saturate(var(--glass-saturation));
  border-bottom: 1px solid var(--glass-border-subtle);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all var(--duration-normal) var(--ease-smooth);
}

/* Enhanced glass effect when scrolled */
.header-scrolled {
  background: rgba(248, 250, 252, 0.92);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* Dark mode header */
:global(.dark) .header-main {
  background: rgba(15, 23, 42, 0.85);
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

:global(.dark) .header-scrolled {
  background: rgba(15, 23, 42, 0.95);
}

/* Dropdown menu with glass effect */
.dropdown-menu {
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  -webkit-backdrop-filter: blur(var(--glass-blur))
    saturate(var(--glass-saturation));
  border: 1px solid var(--color-border);
  box-shadow: var(--glass-shadow-elevated);
}

:global(.dark) .dropdown-menu {
  background: rgba(30, 41, 59, 0.95);
  border-color: var(--color-border);
}

.dropdown-item {
  color: var(--color-text);

  &:hover {
    background: var(--color-primary-100);
  }
}

.dropdown-item-active {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
}

:global(.dark) .dropdown-item {
  color: var(--color-text);

  &:hover {
    background: var(--color-surface-3);
  }
}

:global(.dark) .dropdown-item-active {
  background: var(--color-surface-3);
  color: var(--color-primary-300);
}

svg {
  path,
  circle {
    fill: var(--color-primary-500);
    transition: fill 0.3s ease;
  }
}

a:hover svg {
  path,
  circle {
    fill: var(--color-primary-400);
  }
}

/* Logo container with dark background for visibility */
.logo-container {
  background: rgba(31, 31, 31, 0.85);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
}

// Progress bar background (the empty track)
progress {
  appearance: none;
  border: none;
  overflow: hidden;
}

// WebKit browsers (Chrome, Edge, Safari)
progress::-webkit-progress-bar {
  background-color: transparent;
}

// VALUE (the filled part)
progress::-webkit-progress-value {
  background: linear-gradient(
    to right,
    var(--color-primary-400),
    var(--color-accent-400)
  );
  border-radius: 4px;
}

// Firefox
progress::-moz-progress-bar {
  background: linear-gradient(
    to right,
    var(--color-primary-400),
    var(--color-accent-400)
  );
  border-radius: 4px;
}

/* Respect reduced transparency */
@media (prefers-reduced-transparency: reduce) {
  .header-main {
    background: var(--color-surface-1);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .dropdown-menu {
    background: var(--color-surface-1);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>
