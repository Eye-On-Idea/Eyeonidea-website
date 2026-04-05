<!-- components/MyHeader.vue -->
<script lang="ts" setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

const navLinks = computed(() => [
  { label: t("nav.home"), to: localePath("/") },
  {
    label: t("nav.services"),
    to: localePath("/solutions"),
    children: [
      {
        label: t("nav.websitepackages"),
        to: localePath("/solutions/website-packages"),
      },
      {
        label: t("nav.visualidentity"),
        to: localePath("/solutions/visual-identity"),
      },
      {
        label: t("nav.additionalservices"),
        to: localePath("/solutions/additional-services"),
      },
      { label: t("nav.process"), to: localePath("/solutions/process") },
    ],
  },
  { label: t("nav.cases"), to: localePath("/cases") },
  // { label: t("nav.news"), to: localePath("/news") },
  {
    label: t("nav.about"),
    to: localePath("/about"),
    children: [
      { label: t("nav.legal"), to: localePath("/about/legal") },
      { label: t("nav.policies"), to: localePath("/about/policies") },
    ],
  },
  { label: t("nav.contact"), to: localePath("/contact") },
]);

type NavLink = {
  label: string;
  to: string;
  children?: Array<{ label: string; to: string }>;
};

// ── Desktop dropdown ──────────────────────────────────────────────
const openDropdown = ref<string | null>(null);
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

// Derive the active dropdown link object for rendering the panel
const activeDropdownLink = computed(
  () => navLinks.value.find((l) => l.to === openDropdown.value) ?? null,
);

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
  if (currentTarget && nextTarget && currentTarget.contains(nextTarget)) return;
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

// ── Mobile ────────────────────────────────────────────────────────
const isMobileOpen = ref(false);
const expandedMobile = ref<string | null>(null);
const headerWrapperRef = ref<HTMLElement | null>(null);

const toggleMobileExpand = (to: string) => {
  expandedMobile.value = expandedMobile.value === to ? null : to;
};

watch(
  () => route.path,
  () => {
    openDropdown.value = null;
    expandedMobile.value = null;
    isMobileOpen.value = false;
  },
);

const handleDocumentClick = (e: MouseEvent) => {
  if (!isMobileOpen.value) return;
  if (
    headerWrapperRef.value &&
    !headerWrapperRef.value.contains(e.target as Node)
  ) {
    isMobileOpen.value = false;
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isMobileOpen.value) isMobileOpen.value = false;
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleDocumentClick, { capture: true });
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("click", handleDocumentClick, { capture: true });
});

const isActiveLink = (link: { to: string; children?: { to: string }[] }) => {
  const path = route.path.replace(/\/$/, "") || "/";
  const linkPath = link.to.replace(/\/$/, "") || "/";
  if (path === linkPath) return true;
  if (linkPath !== "/") return path.startsWith(linkPath + "/");
  return false;
};
</script>

<template>
  <!-- Fixed wrapper: header pill + dropdown panel + mobile panel all share this container -->
  <div ref="headerWrapperRef" class="header-outer">
    <UHeader
      class="header-main"
      :class="{ 'mob-open': isMobileOpen }"
      :ui="{
        root: 'relative border-b-0 header-root-bg',
        toggle: 'hidden',
      }"
    >
      <!-- Art deco edge lines -->
      <span class="header-edge-line header-edge-line--top" aria-hidden="true" />
      <span
        class="header-edge-line header-edge-line--bottom"
        aria-hidden="true"
      />

      <template #title>
        <NuxtLink
          :to="localePath('/')"
          aria-label="Eye On Idea - Home"
          class="flex items-center justify-center gap-3 group logo-container"
        >
          <img
            src="/public-material/img/logo-nobg_dark.png"
            alt="Eye On Idea"
            class="block h-10 w-auto transition-transform duration-300 group-hover:scale-105 pt-0.5 invert brightness-0"
          />
        </NuxtLink>
      </template>

      <!-- Desktop Navigation -->
      <nav
        class="hidden lg:flex items-center gap-1"
        @mouseleave="closeDropdownMenu"
      >
        <template v-for="(link, index) in navLinks" :key="link.to">
          <span v-if="index > 0" class="nav-sep" aria-hidden="true" />

          <!-- Simple link -->
          <NuxtLink
            v-if="!link.children"
            :to="link.to"
            class="header-nav-link"
            :class="{ 'header-nav-link-active': isActiveLink(link) }"
          >
            <span>{{ link.label }}</span>
            <div
              class="header-nav-underline absolute bottom-0 left-0 right-0 origin-left transition-all duration-300 ease-out"
              :class="
                isActiveLink(link)
                  ? 'opacity-100 scale-x-100'
                  : 'opacity-0 scale-x-0'
              "
            />
          </NuxtLink>

          <!-- Link with dropdown -->
          <div
            v-else
            data-dropdown-container
            @mouseenter="openDropdownMenu(link.to)"
            @focusin="openDropdownMenu(link.to)"
            @focusout="handleDropdownFocusOut"
          >
            <NuxtLink
              :to="link.to"
              data-dropdown-trigger
              aria-haspopup="menu"
              :aria-expanded="openDropdown === link.to"
              :aria-controls="getDropdownId(index)"
              class="header-nav-link"
              :class="{ 'header-nav-link-active': isActiveLink(link) }"
              @keydown="handleDropdownKeydown($event, link, index)"
            >
              <span>{{ link.label }}</span>
              <Icon
                name="i-heroicons-chevron-down-20-solid"
                class="header-nav-icon transition-transform duration-200"
                :class="{ 'rotate-180': openDropdown === link.to }"
              />
              <div
                class="header-nav-underline absolute bottom-0 left-0 right-0 origin-left transition-all duration-300 ease-out"
                :class="
                  isActiveLink(link)
                    ? 'opacity-100 scale-x-100'
                    : 'opacity-0 scale-x-0'
                "
              />
            </NuxtLink>
          </div>
        </template>
      </nav>

      <template #right>
        <div class="flex items-center gap-2">
          <NuxtLink
            :to="localePath('/client-hub')"
            class="header-hub-link hidden sm:inline-flex"
            :aria-label="t('nav.clientHub')"
          >
            <Icon
              name="i-heroicons-book-open"
              class="w-4 h-4"
              aria-hidden="true"
            />
            <span>{{ t("nav.clientHub") }}</span>
          </NuxtLink>
          <ColorModeToggle class="color-mode-override" />
          <LanguageSwitcher class="lang-switcher-override" />

          <!-- Custom mobile burger -->
          <button
            type="button"
            class="mob-burger lg:hidden"
            :aria-expanded="isMobileOpen"
            :aria-label="
              isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'
            "
            @click="isMobileOpen = !isMobileOpen"
          >
            <span
              class="burger-bar burger-bar--top"
              :class="{ open: isMobileOpen }"
            />
            <span
              class="burger-bar burger-bar--mid"
              :class="{ open: isMobileOpen }"
            />
            <span
              class="burger-bar burger-bar--bot"
              :class="{ open: isMobileOpen }"
            />
          </button>
        </div>
      </template>
    </UHeader>

    <!-- ── Desktop dropdown panel — snaps to header bottom ─────── -->
    <Transition name="desk-dropdown">
      <div
        v-if="activeDropdownLink"
        :id="getDropdownId(navLinks.indexOf(activeDropdownLink))"
        role="menu"
        class="desk-dropdown-panel"
        @mouseenter="openDropdownMenu(activeDropdownLink.to)"
        @mouseleave="closeDropdownMenu"
      >
        <!-- Art deco separator -->
        <div class="desk-drop__sep" aria-hidden="true">
          <span class="sep-line" />
          <span class="sep-diamond sep-diamond--sm" />
          <span class="sep-line sep-line--inner" />
          <span class="sep-diamond" />
          <span class="sep-line sep-line--inner" />
          <span class="sep-diamond sep-diamond--sm" />
          <span class="sep-line" />
        </div>
        <div class="desk-drop__items">
          <NuxtLink
            v-for="child in activeDropdownLink.children"
            :key="child.to"
            :to="child.to"
            role="menuitem"
            class="dropdown-item"
            :class="{ 'dropdown-item-active': route.path === child.to }"
            @keydown="
              handleDropdownItemKeydown(
                $event,
                getDropdownId(navLinks.indexOf(activeDropdownLink)),
              )
            "
          >
            {{ child.label }}
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- ── Mobile slide-down panel ──────────────────────────────── -->
    <Transition name="mob-panel">
      <nav v-if="isMobileOpen" class="mob-panel" aria-label="Mobile navigation">
        <div class="mob-panel__sep" aria-hidden="true">
          <span class="sep-line" />
          <span class="sep-diamond sep-diamond--sm" />
          <span class="sep-line sep-line--inner" />
          <span class="sep-diamond" />
          <span class="sep-line sep-line--inner" />
          <span class="sep-diamond sep-diamond--sm" />
          <span class="sep-line" />
        </div>

        <div class="mob-panel__content">
          <template v-for="(link, i) in navLinks" :key="link.to">
            <NuxtLink
              v-if="!link.children"
              :to="link.to"
              class="mob-link"
              :class="{ 'mob-link--active': isActiveLink(link) }"
              :style="{ '--i': i }"
            >
              {{ link.label }}
            </NuxtLink>

            <div v-else class="mob-expandable" :style="{ '--i': i }">
              <div class="mob-expandable__row">
                <NuxtLink
                  :to="link.to"
                  class="mob-link mob-link--expand"
                  :class="{ 'mob-link--active': isActiveLink(link) }"
                >
                  {{ link.label }}
                </NuxtLink>
                <button
                  type="button"
                  class="mob-chevron-btn"
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
                    class="w-4 h-4 transition-transform duration-200"
                    :class="{ 'rotate-180': expandedMobile === link.to }"
                  />
                </button>
              </div>

              <Transition name="mob-sub">
                <div v-if="expandedMobile === link.to" class="mob-children">
                  <NuxtLink
                    v-for="child in link.children"
                    :key="child.to"
                    :to="child.to"
                    class="mob-child-link"
                    :class="{
                      'mob-child-link--active': route.path === child.to,
                    }"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </div>
              </Transition>
            </div>
          </template>

          <div class="mob-panel__divider" aria-hidden="true" />
          <NuxtLink
            :to="localePath('/client-hub')"
            class="mob-link mob-link--hub"
            :style="{ '--i': navLinks.length }"
          >
            <Icon
              name="i-heroicons-book-open"
              class="w-4 h-4"
              aria-hidden="true"
            />
            <span>{{ t("nav.clientHub") }}</span>
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
// ── Shared amber tokens ────────────────────────────────────────────
// dark amber:  rgba(223, 175, 133, X)  — #dfaf85
// primary-50:  #ffeddf                 — cream white
// header bg:   #1a1210                 — warm near-black (both modes)
// panel bg:    #1e1411                 — fractionally lighter

/* ═══════════════════════════════════════════════════════════════════
   HEADER PILL — always dark regardless of color mode
   ═══════════════════════════════════════════════════════════════════ */
:deep(.header-root-bg) {
  background: #1a1210 !important;
}
.header-outer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 50;
  width: 100%;
  max-width: 100vw;

  @media (min-width: 640px) {
    top: 4rem;
  }

  @media (min-width: 1024px) {
    left: 50%;
    transform: translateY(-50%);
    width: 90%;
    min-width: 70%;
    max-width: 1920px;
  }
  @media (min-width: 1921px) {
    left: 50%;
    transform: translateY(-50%);
    width: 75%;
    min-width: 70%;
    max-width: 1920px;
  }
}

.header-main {
  background: #1a1210;
  overflow: visible;
  border-radius: 1.5rem;
  box-shadow:
    0 0 0 1px rgba(223, 175, 133, 0.35),
    0 0 0 4px rgba(223, 175, 133, 0.07),
    0 4px 28px rgba(0, 0, 0, 0.45),
    0 1px 4px rgba(0, 0, 0, 0.5);
  transition:
    border-radius 0.25s var(--ease-smooth, ease-out),
    box-shadow 0.28s var(--ease-smooth, ease-out);

  &.mob-open {
    border-radius: 1.5rem 1.5rem 0 0;
    box-shadow:
      0 0 0 1px rgba(223, 175, 133, 0.35),
      0 0 0 4px rgba(223, 175, 133, 0.07);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   ART DECO EDGE LINES
   ═══════════════════════════════════════════════════════════════════ */
.header-edge-line {
  position: absolute;
  left: 6%;
  right: 6%;
  height: 1px;
  pointer-events: none;
  z-index: 60;
  background: linear-gradient(
    to right,
    transparent,
    rgba(223, 175, 133, 0.4) 18%,
    rgba(223, 175, 133, 0.4) 82%,
    transparent
  );

  &--top {
    top: 0;
  }
  &--bottom {
    bottom: 0;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   LOGO
   ═══════════════════════════════════════════════════════════════════ */
.logo-container {
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
}

/* ═══════════════════════════════════════════════════════════════════
   DESKTOP NAV — diamond separator
   ═══════════════════════════════════════════════════════════════════ */
.nav-sep {
  display: block;
  width: 3px;
  height: 3px;
  background: rgba(223, 175, 133, 0.32);
  transform: rotate(45deg);
  flex-shrink: 0;
  margin: 0 0.25rem;
}

/* ═══════════════════════════════════════════════════════════════════
   DESKTOP NAV LINKS
   ═══════════════════════════════════════════════════════════════════ */
.header-nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.45rem 0.875rem;
  border-radius: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.65);
  text-decoration: none;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  span {
    color: inherit;
  }

  &:hover {
    background: rgba(223, 175, 133, 0.07);
    color: #ffeddf;
  }

  &.header-nav-link-active {
    color: #ffeddf;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(223, 175, 133, 0.5);
  }
}

.header-nav-icon {
  opacity: 0.7;
  width: 0.75rem;
  height: 0.75rem;
}

.header-nav-underline {
  position: absolute;
  bottom: 2px;
  left: 18%;
  right: 18%;
  height: 1px;
  border-radius: 1px;
  transform-origin: left center;
  background: linear-gradient(
    to right,
    transparent,
    rgba(223, 175, 133, 0.95),
    transparent
  );
  box-shadow: 0 0 7px rgba(223, 175, 133, 0.55);
}

/* ═══════════════════════════════════════════════════════════════════
   CLIENT HUB PILL
   ═══════════════════════════════════════════════════════════════════ */
.header-hub-link {
  align-items: center;
  gap: 0.375rem;
  padding: 0.35rem 0.75rem;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.65);
  border: 1px solid rgba(223, 175, 133, 0.24);
  border-radius: 0.5rem;
  text-decoration: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

  span {
    color: inherit;
  }

  &:hover {
    background: rgba(223, 175, 133, 0.1);
    border-color: rgba(223, 175, 133, 0.5);
    color: #ffeddf;
    box-shadow: 0 0 10px rgba(223, 175, 133, 0.18);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(223, 175, 133, 0.5);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   COLOR MODE TOGGLE + LANGUAGE SWITCHER — amber override
   ═══════════════════════════════════════════════════════════════════ */
.color-mode-override {
  :deep(button) {
    color: rgba(223, 175, 133, 0.65);
    &:hover {
      background: rgba(223, 175, 133, 0.08) !important;
    }
  }
  :deep(.u-icon),
  :deep(svg),
  :deep([class*="lucide"]) {
    color: rgba(223, 175, 133, 0.65) !important;
  }
}

.lang-switcher-override {
  :deep(.lang-switcher__trigger) {
    background: transparent !important;
    &:hover {
      background: rgba(223, 175, 133, 0.08) !important;
    }
  }
  :deep(.lang-switcher__code),
  :deep(.lang-switcher__chevron) {
    color: rgba(223, 175, 133, 0.65) !important;
  }
  :deep(.lang-switcher__panel) {
    background: #1a1210;
    border-color: rgba(223, 175, 133, 0.22);
    box-shadow:
      0 0 0 3px rgba(223, 175, 133, 0.05),
      0 10px 32px rgba(0, 0, 0, 0.5);
  }
  :deep(.lang-switcher__item-name) {
    color: rgba(223, 175, 133, 0.65);
  }
  :deep(.lang-switcher__item:hover) {
    background: rgba(223, 175, 133, 0.07) !important;
    border-color: rgba(223, 175, 133, 0.15) !important;
  }
  :deep(.lang-switcher__item--active) {
    background: rgba(223, 175, 133, 0.1) !important;
    border-color: rgba(223, 175, 133, 0.28) !important;
    .lang-switcher__item-name {
      color: #ffeddf !important;
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════
   DESKTOP DROPDOWN PANEL — snapped to header bottom
   ═══════════════════════════════════════════════════════════════════ */
.desk-dropdown-panel {
  position: absolute;
  // Snap flush to header bottom, no gap (border merges visually)
  top: 100%;
  // Center under the nav area (roughly middle of the pill)
  left: 50%;
  transform: translateX(-50%);
  z-index: 49;
  background: #1a1210;
  border: 1px solid rgba(223, 175, 133, 0.35);
  border-top: none; // merges with header bottom border
  border-radius: 0 0 1rem 1rem;
  box-shadow:
    0 0 0 4px rgba(223, 175, 133, 0.07),
    0 12px 36px rgba(0, 0, 0, 0.5);
  min-width: 18rem;
  overflow: hidden;
}

.desk-drop__sep {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.75rem 1.25rem 0;
}

.desk-drop__items {
  display: flex;
  flex-direction: column;
  padding: 0.375rem 0.5rem 0.75rem;
}

// Dropdown enter/leave
.desk-dropdown-enter-active {
  transition:
    opacity 0.2s ease-out,
    transform 0.2s ease-out;
}
.desk-dropdown-leave-active {
  transition:
    opacity 0.15s ease-in,
    transform 0.15s ease-in;
}
.desk-dropdown-enter-from,
.desk-dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px);
}

/* ── Dropdown items ─────────────────────────────────────────────── */
.dropdown-item {
  display: block;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.6);
  text-decoration: none;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: rgba(223, 175, 133, 0.08);
    color: #ffeddf;
  }

  &.dropdown-item-active {
    color: #ffeddf;
    background: rgba(223, 175, 133, 0.07);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   BURGER BUTTON (mobile only)
   ═══════════════════════════════════════════════════════════════════ */
.mob-burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0.375rem;
  border-radius: 0.5rem;
  background: transparent;
  cursor: pointer;
  transition: background 0.18s ease;

  @media (min-width: 1024px) {
    display: none;
  }

  &:hover {
    background: rgba(223, 175, 133, 0.1);
  }
}

.burger-bar {
  display: block;
  width: 18px;
  height: 1.5px;
  background: rgba(223, 175, 133, 0.78);
  border-radius: 1px;
  transform-origin: center;
  transition:
    transform 0.28s ease-in-out,
    opacity 0.2s ease,
    width 0.2s ease;

  &--top.open {
    transform: translateY(6.5px) rotate(45deg);
  }
  &--mid.open {
    opacity: 0;
    width: 0;
  }
  &--bot.open {
    transform: translateY(-6.5px) rotate(-45deg);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   SHARED SEPARATOR ELEMENTS (desktop dropdown + mobile panel)
   ═══════════════════════════════════════════════════════════════════ */
.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.16);

  &--inner {
    flex: 0 0 0.875rem;
  }
}

.sep-diamond {
  width: 6px;
  height: 6px;
  background: rgba(223, 175, 133, 0.42);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 3px;
    height: 3px;
    background: rgba(223, 175, 133, 0.22);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   MOBILE SLIDE-DOWN PANEL
   ═══════════════════════════════════════════════════════════════════ */
.mob-panel {
  background: #1e1411;
  border-radius: 0 0 1.5rem 1.5rem;
  box-shadow:
    0 0 0 1px rgba(223, 175, 133, 0.35),
    0 0 0 4px rgba(223, 175, 133, 0.07),
    0 14px 44px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}

.mob-panel-enter-active {
  transition:
    opacity 0.28s ease-out,
    transform 0.28s var(--ease-smooth, ease-out);
}
.mob-panel-leave-active {
  transition:
    opacity 0.2s ease-in,
    transform 0.2s ease-in;
}
.mob-panel-enter-from,
.mob-panel-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.mob-panel-enter-active .mob-link,
.mob-panel-enter-active .mob-expandable {
  animation: mob-item-reveal 0.32s ease-out backwards;
  animation-delay: calc(0.06s + var(--i, 0) * 0.04s);
}

@keyframes mob-item-reveal {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mob-panel__sep {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.875rem 1.5rem 0;
}

.mob-panel__content {
  display: flex;
  flex-direction: column;
  padding: 0.625rem 0.75rem 1.125rem;
  gap: 0.125rem;
}

/* ── Mobile nav links ───────────────────────────────────────────── */
.mob-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.65);
  text-decoration: none;
  transition:
    background 0.18s ease,
    color 0.18s ease;

  span {
    color: inherit;
  }

  &:hover {
    background: rgba(223, 175, 133, 0.08);
    color: #ffeddf;
  }
  &--active {
    color: #ffeddf;
    background: rgba(223, 175, 133, 0.07);
  }
  &--expand {
    flex: 1;
    border-radius: 0.75rem 0 0 0.75rem;
  }
}

.mob-expandable__row {
  display: flex;
  align-items: stretch;
  border-radius: 0.75rem;
  overflow: hidden;
}

.mob-chevron-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.875rem;
  color: rgba(223, 175, 133, 0.45);
  background: transparent;
  border-left: 1px solid rgba(223, 175, 133, 0.1);
  transition:
    background 0.18s ease,
    color 0.18s ease;

  &:hover {
    background: rgba(223, 175, 133, 0.08);
    color: #ffeddf;
  }
}

.mob-children {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 0.25rem 0 0.25rem 1.5rem;
}

.mob-child-link {
  display: block;
  padding: 0.55rem 1rem;
  border-radius: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  text-decoration: none;
  border-left: 1px solid rgba(223, 175, 133, 0.12);
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    color: #ffeddf;
    border-color: rgba(223, 175, 133, 0.35);
    background: rgba(223, 175, 133, 0.06);
  }
  &--active {
    color: #ffeddf;
    border-color: rgba(223, 175, 133, 0.38);
  }
}

.mob-sub-enter-active {
  overflow: hidden;
  max-height: 320px;
  transition:
    opacity 0.22s ease-out,
    transform 0.22s ease-out,
    max-height 0.28s ease-out;
}
.mob-sub-leave-active {
  overflow: hidden;
  max-height: 320px;
  transition:
    opacity 0.16s ease-in,
    transform 0.16s ease-in,
    max-height 0.22s ease-in;
}
.mob-sub-enter-from,
.mob-sub-leave-to {
  opacity: 0;
  transform: translateY(-4px);
  max-height: 0 !important;
}

.mob-panel__divider {
  height: 1px;
  background: rgba(223, 175, 133, 0.1);
  margin: 0.375rem 0.25rem;
}

/* ═══════════════════════════════════════════════════════════════════
   LIGHT MODE — only mobile panel gets a light background
   Header pill, dropdown, and all nav elements stay dark
   ═══════════════════════════════════════════════════════════════════ */
html:not(.dark) {
  .mob-panel {
    background: #fff4ec;
    box-shadow:
      0 0 0 1px rgba(153, 82, 38, 0.28),
      0 0 0 4px rgba(153, 82, 38, 0.06),
      0 14px 44px rgba(153, 82, 38, 0.14);
  }

  .sep-line {
    background: rgba(153, 82, 38, 0.13);
  }
  .sep-diamond {
    background: rgba(153, 82, 38, 0.32);
    &--sm {
      background: rgba(153, 82, 38, 0.16);
    }
  }
  .mob-panel__divider {
    background: rgba(153, 82, 38, 0.1);
  }

  .mob-link {
    color: rgba(68, 26, 8, 0.65);
    span {
      color: inherit;
    }
    &:hover {
      background: rgba(153, 82, 38, 0.07);
      color: #441a08;
    }
    &--active {
      background: rgba(153, 82, 38, 0.06);
      color: #67280e;
    }
  }

  .mob-chevron-btn {
    color: rgba(153, 82, 38, 0.45);
    border-color: rgba(153, 82, 38, 0.1);
    &:hover {
      background: rgba(153, 82, 38, 0.07);
      color: rgba(153, 82, 38, 0.82);
    }
  }

  .mob-child-link {
    color: rgba(68, 26, 8, 0.5);
    border-color: rgba(153, 82, 38, 0.12);
    &:hover {
      color: #441a08;
      border-color: rgba(153, 82, 38, 0.32);
      background: rgba(153, 82, 38, 0.04);
    }
    &--active {
      color: #67280e;
      border-color: rgba(153, 82, 38, 0.36);
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════
   REDUCED MOTION
   ═══════════════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .mob-panel-enter-active,
  .mob-panel-leave-active,
  .mob-sub-enter-active,
  .mob-sub-leave-active,
  .desk-dropdown-enter-active,
  .desk-dropdown-leave-active {
    transition: none;
  }

  .mob-panel-enter-active .mob-link,
  .mob-panel-enter-active .mob-expandable {
    animation: none;
  }

  .burger-bar {
    transition: none;
  }
  .header-main {
    transition: none;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   REDUCED TRANSPARENCY
   ═══════════════════════════════════════════════════════════════════ */
@media (prefers-reduced-transparency: reduce) {
  .header-main {
    background: #0f0c0b;
  }
  .mob-panel {
    background: #0f0c0b;
  }
  .desk-dropdown-panel {
    background: #0f0c0b;
  }

  html:not(.dark) .mob-panel {
    background: #fff7f0;
  }
}
</style>
