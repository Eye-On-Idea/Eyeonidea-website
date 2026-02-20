<!-- components/MyHeader.vue -->
<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const navLinks = computed(() => [
  { label: t("nav.home"), to: "/" },
  {
    label: t("nav.services"),
    to: "/services",
    children: [
      {
        label: t("nav.process"),
        to: "/services/process",
      },
    ],
  },
  // { label: t("nav.news"), to: "/news" },
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

// Close dropdown and mobile menu on route change
watch(
  () => route.path,
  () => {
    openDropdown.value = null;
    expandedMobile.value = null;
  },
);

// Check if current route matches link or any of its children
const isActiveLink = (link: { to: string; children?: { to: string }[] }) => {
  // Normalize trailing slashes for comparison
  const path = route.path.replace(/\/$/, "") || "/";
  const linkPath = link.to.replace(/\/$/, "") || "/";
  // Exact match
  if (path === linkPath) return true;
  // For parent links with children, also match child routes
  if (link.children && linkPath !== "/") {
    return path.startsWith(linkPath + "/") || path === linkPath;
  }
  return false;
};
</script>

<template>
  <UHeader
    class="header-main sticky top-0 z-50 bg-primary-800 dark:bg-primary-950"
    ><div
      class="absolute -bottom-4.5 left-0 right-0 w-full h-auto z-49 bg-transparent"
    ></div>
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
          class="header-nav-link relative px-4 py-2.5 text-sm font-bold transition-all duration-300 flex items-center gap-2 rounded-lg group"
          :class="{ 'header-nav-link-active': isActiveLink(link) }"
        >
          <span class="relative z-10">{{ link.label }}</span>
          <div
            class="header-nav-underline absolute bottom-0 left-0 right-0 h-0.5 origin-left transition-all duration-300 ease-out"
            :class="
              isActiveLink(link)
                ? 'opacity-100 scale-x-100'
                : 'opacity-0 scale-x-0'
            "
          ></div>
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
            class="header-nav-link relative px-4 py-2.5 text-sm font-bold transition-all duration-300 flex items-center gap-2 rounded-lg group"
            :class="{ 'header-nav-link-active': isActiveLink(link) }"
          >
            <span class="relative z-10">{{ link.label }}</span>
            <Icon
              name="i-heroicons-chevron-down-20-solid"
              class="header-nav-icon w-4 h-4 transition-transform duration-200"
              :class="{ 'rotate-180': openDropdown === link.to }"
            />
            <div
              class="header-nav-underline absolute bottom-0 left-0 right-0 origin-left transition-all duration-300 ease-out"
              :class="
                isActiveLink(link)
                  ? 'opacity-100 scale-x-100'
                  : 'opacity-0 scale-x-0'
              "
            ></div>
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
              class="dropdown-menu absolute top-full left-0 mt-1 min-w-55 rounded-xl overflow-hidden z-50"
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
      <div class="flex items-center gap-2">
        <NuxtLink
          to="/client-hub"
          class="header-hub-link hidden sm:inline-flex items-center gap-1.5 px-3 py-2 min-h-9 text-sm font-bold rounded-lg transition-all duration-300"
          :aria-label="t('nav.clientHub')"
        >
          <Icon
            name="i-heroicons-book-open"
            class="w-4 h-4"
            aria-hidden="true"
          />
          <span>{{ t("nav.clientHub") }}</span>
        </NuxtLink>
        <ColorModeToggle />
        <LanguageSwitcher />
      </div>
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
              class="header-mobile-link px-4 py-3 rounded-xl text-base font-bold transition-all duration-300"
              :class="{ 'header-mobile-link-active': isActiveLink(link) }"
            >
              <span>{{ link.label }}</span>
            </NuxtLink>

            <!-- Links with children (expandable) -->
            <div v-else class="flex flex-col">
              <div class="flex items-center gap-2">
                <NuxtLink
                  :to="link.to"
                  class="header-mobile-link flex-1 px-4 py-3 rounded-xl text-base font-bold transition-all duration-300"
                  :class="{ 'header-mobile-link-active': isActiveLink(link) }"
                >
                  <span>{{ link.label }}</span>
                </NuxtLink>
                <button
                  type="button"
                  class="header-mobile-toggle touch-target p-3 rounded-xl transition-colors duration-200"
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
                    class="header-mobile-child-link px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                    :class="{
                      'header-mobile-child-active': route.path === child.to,
                    }"
                  >
                    <span>{{ child.label }}</span>
                  </NuxtLink>
                </div>
              </Transition>
            </div>
          </template>

          <!-- Client Hub link (mobile) -->
          <div class="mt-2 pt-2 border-t border-(--glass-border-subtle)">
            <NuxtLink
              to="/client-hub"
              class="header-mobile-link flex items-center gap-2 px-4 py-3 rounded-xl text-base font-bold transition-all duration-300"
            >
              <Icon
                name="i-heroicons-book-open"
                class="w-5 h-5"
                aria-hidden="true"
              />
              <span>{{ t("nav.clientHub") }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </UHeader>
</template>

<style lang="scss" scoped>
/* Header base styles */
.header-main {
  background: color-mix(in srgb, var(--color-hero-bg) 95%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--glass-border-subtle);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all var(--duration-normal) var(--ease-smooth);
}

/* Slightly more opaque when scrolled */
.header-scrolled {
  background: color-mix(in srgb, var(--ui-bg) 97%, transparent);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

/* Logo container with dark background for visibility */
.logo-container {
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
}

span {
  color: var(--color-primary-50);
}

.header-nav-underline {
  border-radius: 0 0 4px 4px;
  height: calc(var(--spacing) * 1.3);
}

/* Client Hub link - accent-tinted pill */
.header-hub-link {
  color: var(--nav-link-text, var(--ui-text));
  background: color-mix(in srgb, var(--color-accent-500) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent-500) 20%, transparent);
}

.header-hub-link:hover {
  background: color-mix(in srgb, var(--color-accent-500) 22%, transparent);
  border-color: color-mix(in srgb, var(--color-accent-500) 35%, transparent);
}

.header-hub-link:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--focus-ring),
    0 0 0 4px var(--ring-offset);
}
/* Respect reduced transparency */
@media (prefers-reduced-transparency: reduce) {
  .header-main {
    background: var(--color-surface-1);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .dropdown-menu {
    background: var(--nav-dropdown-bg, var(--color-surface-1));
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>
