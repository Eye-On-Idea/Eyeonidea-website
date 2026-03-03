<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { getServices, getOnboardingSections, getService } = useClientHub();

useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

// ─── Route-based active state (persists on navigation) ────────────────────────

const activeServiceSlug = computed<string | null>(() => {
  const match = route.path.match(/^\/client-hub\/([^/]+)/);
  const slug = match?.[1] ?? null;
  if (!slug || slug === "login" || slug === "onboarding") return null;
  const service = getService(slug);
  return service && !service.comingSoon ? slug : null;
});

const activeCategorySlug = computed<string | null>(() => {
  const match = route.path.match(/^\/client-hub\/[^/]+\/([^/]+)/);
  return match?.[1] ?? null;
});

// ─── Hover state (drives flyout preview) ──────────────────────────────────────

const hoveredServiceSlug = ref<string | null>(null);
const hoveredCategorySlug = ref<string | null>(null);

let serviceHoverTimer: ReturnType<typeof setTimeout> | null = null;
let categoryHoverTimer: ReturnType<typeof setTimeout> | null = null;

const onServiceEnter = (slug: string) => {
  if (serviceHoverTimer) clearTimeout(serviceHoverTimer);
  serviceHoverTimer = setTimeout(() => {
    hoveredServiceSlug.value = slug;
    hoveredCategorySlug.value = null;
  }, 200);
};

const onServiceLeave = () => {
  if (serviceHoverTimer) clearTimeout(serviceHoverTimer);
  serviceHoverTimer = setTimeout(() => {
    hoveredServiceSlug.value = null;
    hoveredCategorySlug.value = null;
  }, 200);
};

const onSecondaryEnter = () => {
  if (serviceHoverTimer) clearTimeout(serviceHoverTimer);
};

const onSecondaryLeave = () => {
  if (serviceHoverTimer) clearTimeout(serviceHoverTimer);
  if (categoryHoverTimer) clearTimeout(categoryHoverTimer);
  serviceHoverTimer = setTimeout(() => {
    hoveredServiceSlug.value = null;
    hoveredCategorySlug.value = null;
  }, 200);
};

const onCategoryEnter = (slug: string) => {
  if (categoryHoverTimer) clearTimeout(categoryHoverTimer);
  categoryHoverTimer = setTimeout(() => {
    hoveredCategorySlug.value = slug;
  }, 200);
};

const onCategoryLeave = () => {
  if (categoryHoverTimer) clearTimeout(categoryHoverTimer);
  categoryHoverTimer = setTimeout(() => {
    hoveredCategorySlug.value = null;
  }, 200);
};

const onTertiaryEnter = () => {
  if (categoryHoverTimer) clearTimeout(categoryHoverTimer);
};

const onTertiaryLeave = () => {
  if (categoryHoverTimer) clearTimeout(categoryHoverTimer);
  categoryHoverTimer = setTimeout(() => {
    hoveredCategorySlug.value = null;
  }, 200);
};

onUnmounted(() => {
  if (serviceHoverTimer) clearTimeout(serviceHoverTimer);
  if (categoryHoverTimer) clearTimeout(categoryHoverTimer);
});

// ─── Derived display state ────────────────────────────────────────────────────
//
// Flyout VISIBILITY is purely hover-driven — the panels only appear while the
// user is hovering the sidebar area. Route-based active slugs are used solely
// for item highlighting inside the flyouts, never for showing them.

// Which service's categories to show in the secondary flyout (hover only)
const displayService = computed(() =>
  hoveredServiceSlug.value ? getService(hoveredServiceSlug.value) : null,
);

// Which category's articles to show in the tertiary flyout.
// When a service is hovered: prefer the hovered category, fall back to the
// active category for that service so the tertiary auto-opens at the right place.
const displayCategorySlug = computed(() => {
  if (!hoveredServiceSlug.value) return null;
  return (
    hoveredCategorySlug.value ??
    (activeServiceSlug.value === hoveredServiceSlug.value
      ? activeCategorySlug.value
      : null)
  );
});

const displayCategory = computed(() => {
  if (!displayService.value || !displayCategorySlug.value) return null;
  return (
    displayService.value.categories.find(
      (c) => c.slug === displayCategorySlug.value,
    ) ?? null
  );
});

// Flyouts are visible only while hovering
const showSecondary = computed(() => !!hoveredServiceSlug.value);
const showTertiary = computed(
  () => !!hoveredServiceSlug.value && !!displayCategory.value,
);

// ─── Primary nav items ────────────────────────────────────────────────────────

const fixedNavItems = computed(() => [
  {
    label: t("clientHub.nav.home"),
    icon: "i-heroicons-home",
    to: "/client-hub",
  },
  {
    label: t("clientHub.onboarding.title"),
    icon: "i-heroicons-academic-cap",
    to: "/client-hub/onboarding",
  },
]);

const serviceNavItems = computed(() =>
  getServices()
    .filter((s) => !s.comingSoon)
    .map((s) => ({
      slug: s.slug,
      label: t(s.titleKey),
      icon: t(s.iconKey),
      to: `/client-hub/${s.slug}`,
    })),
);

// ─── Command palette ──────────────────────────────────────────────────────────

const searchGroups = computed(() => {
  const services = getServices();
  const onboardingSections = getOnboardingSections();

  return [
    {
      id: "onboarding",
      label: t("clientHub.onboarding.title"),
      items: onboardingSections.map((section) => ({
        label: t(section.titleKey),
        icon: "i-heroicons-academic-cap",
        to: `/client-hub/onboarding?step=${section.key}`,
      })),
    },
    ...services
      .filter((s) => !s.comingSoon)
      .map((service) => ({
        id: service.slug,
        label: t(service.titleKey),
        items: service.categories.flatMap((cat) =>
          cat.articles.map((article) => ({
            label: t(article.titleKey),
            suffix: t(cat.titleKey),
            icon: t(service.iconKey),
            to: `/client-hub/${service.slug}/${cat.slug}/${article.slug}`,
          })),
        ),
      })),
  ];
});
</script>

<template>
  <UDashboardGroup storage="cookie" storage-key="client-hub" unit="rem">
    <!-- Skip link (WCAG 2.4.1) -->
    <a href="#hub-main-content" class="skip-link">Skip to content</a>

    <!-- ── Primary sidebar ───────────────────────────────────────────────── -->
    <UDashboardSidebar
      id="hub-sidebar"
      collapsible
      resizable
      :min-size="14"
      :max-size="25"
      :default-size="16"
      :collapsed-size="4.2"
    >
      <!-- Logo -->
      <template #header="{ collapsed }">
        <NuxtLink
          to="/client-hub"
          class="flex items-center min-h-11"
          :class="collapsed ? 'justify-center px-0' : 'gap-3 px-1'"
          :aria-label="
            t('clientHub.nav.hubTitle') + ' - ' + t('clientHub.nav.home')
          "
        >
          <img
            src="/public-material/img/logo-nobg_dark.png"
            alt=""
            class="w-auto transition-transform duration-300 dark:invert shrink-0"
            :class="collapsed ? 'h-6' : 'h-8'"
            aria-hidden="true"
          />
          <span
            v-if="!collapsed"
            class="text-lg font-bold whitespace-nowrap text-primary-950 dark:text-primary-200 ml-4 uppercase"
          >
            {{ t("clientHub.nav.hubTitle") }}
          </span>
        </NuxtLink>
      </template>

      <!-- Search + navigation + flyout panels (all inside sidebar slot so
           panels are children of the sidebar's positioned container) -->
      <template #default="{ collapsed }">
        <UDashboardSearchButton
          :collapsed="collapsed"
          :tooltip="collapsed"
          class="mb-2"
        />

        <nav class="primary-nav" aria-label="Hub navigation">
          <!-- Fixed items -->
          <ul class="primary-nav__list" role="list">
            <li v-for="item in fixedNavItems" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="primary-nav__item"
                :class="{
                  'primary-nav__item--active': route.path === item.to,
                }"
                :aria-current="route.path === item.to ? 'page' : undefined"
              >
                <UIcon
                  :name="item.icon"
                  class="primary-nav__icon"
                  aria-hidden="true"
                />
                <span v-if="!collapsed" class="primary-nav__label">
                  {{ item.label }}
                </span>
              </NuxtLink>
            </li>
          </ul>

          <div class="primary-nav__divider" aria-hidden="true" />

          <!-- Service items -->
          <ul class="primary-nav__list" role="list">
            <li
              v-for="service in serviceNavItems"
              :key="service.slug"
              @mouseenter="onServiceEnter(service.slug)"
              @mouseleave="onServiceLeave"
            >
              <NuxtLink
                :to="service.to"
                class="primary-nav__item"
                :class="{
                  'primary-nav__item--active':
                    activeServiceSlug === service.slug,
                  'primary-nav__item--hovered':
                    hoveredServiceSlug === service.slug &&
                    activeServiceSlug !== service.slug,
                }"
                :aria-current="
                  activeServiceSlug === service.slug ? 'page' : undefined
                "
              >
                <UIcon
                  :name="service.icon"
                  class="primary-nav__icon"
                  aria-hidden="true"
                />
                <span v-if="!collapsed" class="primary-nav__label">
                  {{ service.label }}
                </span>
                <UIcon
                  v-if="!collapsed"
                  name="i-heroicons-chevron-right"
                  class="primary-nav__chevron"
                  aria-hidden="true"
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- ── Secondary flyout (absolutely positioned off sidebar right edge) -->
        <Transition name="panel-slide">
          <div
            v-if="showSecondary"
            class="flyout flyout--secondary"
            role="navigation"
            :aria-label="t(displayService!.titleKey)"
            @mouseenter="onSecondaryEnter"
            @mouseleave="onSecondaryLeave"
          >
            <div class="flyout__heading">
              <UIcon
                :name="t(displayService!.iconKey)"
                class="flyout__heading-icon"
                aria-hidden="true"
              />
              <span class="flyout__heading-label">
                {{ t(displayService!.titleKey) }}
              </span>
            </div>

            <ul class="flyout__list" role="list">
              <li
                v-for="category in displayService!.categories"
                :key="category.slug"
                @mouseenter="onCategoryEnter(category.slug)"
                @mouseleave="onCategoryLeave"
              >
                <button
                  type="button"
                  class="flyout__item"
                  :class="{
                    'flyout__item--active':
                      activeCategorySlug === category.slug &&
                      activeServiceSlug === displayService!.slug,
                    'flyout__item--hovered':
                      hoveredCategorySlug === category.slug &&
                      !(
                        activeCategorySlug === category.slug &&
                        activeServiceSlug === displayService!.slug
                      ),
                  }"
                  :aria-current="
                    activeCategorySlug === category.slug &&
                    activeServiceSlug === displayService!.slug
                      ? 'true'
                      : undefined
                  "
                  @click="
                    router.push(
                      `/client-hub/${displayService!.slug}/${category.slug}/${category.articles[0]?.slug ?? ''}`,
                    )
                  "
                >
                  <UIcon
                    :name="t(category.iconKey)"
                    class="flyout__item-icon"
                    aria-hidden="true"
                  />
                  <span class="flyout__item-label">
                    {{ t(category.titleKey) }}
                  </span>
                  <UIcon
                    name="i-heroicons-chevron-right"
                    class="flyout__item-chevron"
                    aria-hidden="true"
                  />
                </button>
              </li>
            </ul>

            <!-- ── Tertiary flyout (off right edge of secondary) -->
            <Transition name="panel-slide">
              <div
                v-if="showTertiary"
                class="flyout flyout--tertiary"
                role="navigation"
                :aria-label="t(displayCategory!.titleKey)"
                @mouseenter="onTertiaryEnter"
                @mouseleave="onTertiaryLeave"
              >
                <div class="flyout__heading">
                  <UIcon
                    :name="t(displayCategory!.iconKey)"
                    class="flyout__heading-icon"
                    aria-hidden="true"
                  />
                  <span class="flyout__heading-label">
                    {{ t(displayCategory!.titleKey) }}
                  </span>
                </div>

                <ul class="flyout__list" role="list">
                  <li
                    v-for="article in displayCategory!.articles"
                    :key="article.slug"
                  >
                    <NuxtLink
                      :to="`/client-hub/${displayService!.slug}/${displayCategory!.slug}/${article.slug}`"
                      class="flyout__item flyout__item--article"
                      :class="{
                        'flyout__item--active': route.path.endsWith(
                          `/${article.slug}`,
                        ),
                      }"
                      :aria-current="
                        route.path.endsWith(`/${article.slug}`)
                          ? 'page'
                          : undefined
                      "
                    >
                      <span class="flyout__item-label">
                        {{ t(article.titleKey) }}
                      </span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </Transition>
      </template>

      <!-- Footer -->
      <template #footer="{ collapsed }">
        <div class="flex flex-col gap-1">
          <NuxtLink
            v-if="!collapsed"
            to="/"
            class="hub-footer-link flex items-center gap-2 min-h-11 px-3 py-2 text-sm rounded-lg transition-colors"
          >
            <Icon
              name="i-heroicons-arrow-left"
              class="w-4 h-4 shrink-0"
              aria-hidden="true"
            />
            {{ t("clientHub.nav.backToSite") }}
          </NuxtLink>
          <UDashboardSidebarCollapse />
        </div>
      </template>
    </UDashboardSidebar>

    <!-- ── Main content panel (unaffected by flyouts) ────────────────────── -->
    <UDashboardPanel id="hub-main-content">
      <template #header>
        <div class="bg-primary-800 dark:bg-primary-950">
          <UDashboardNavbar>
            <template #toggle="{ sidebarOpen }">
              <UDashboardSidebarToggle
                :class="
                  sidebarOpen
                    ? 'text-primary-50 dark:text-primary-50'
                    : 'text-primary-50'
                "
              />
            </template>
            <template #right>
              <div class="flex items-center gap-1">
                <LanguageSwitcher />
                <ColorModeToggle />
              </div>
            </template>
          </UDashboardNavbar>
        </div>
      </template>

      <template #body>
        <slot />

        <div class="hub-version backdrop-blur-xs" role="contentinfo">
          <span>v1.0.0</span>
          <span class="hub-version__sep">&middot;</span>
          <span>&copy; {{ new Date().getFullYear() }} Eye On Idea</span>
        </div>
      </template>
    </UDashboardPanel>

    <!-- Command palette (Cmd+K) -->
    <UDashboardSearch :groups="searchGroups" />
  </UDashboardGroup>
</template>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════════════
   PRIMARY NAV
═══════════════════════════════════════════════════════════════════════════ */

.primary-nav {
  display: flex;
  flex-direction: column;
  position: relative; /* establishes stacking context so flyouts z-index works */
}

.primary-nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.primary-nav__divider {
  height: 1px;
  background: var(--ui-border);
  margin: 0.5rem 0.25rem;
}

.primary-nav__item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  min-height: 2.5rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.5rem;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition:
    background 0.15s var(--ease-smooth),
    color 0.15s var(--ease-smooth);
}

.primary-nav__item:hover {
  background: var(--color-surface-2);
  color: var(--color-text-primary);
}

.primary-nav__item--active {
  background: color-mix(in srgb, var(--color-primary-500) 12%, transparent);
  color: var(--color-primary-600);
  font-weight: 600;
}

:root.dark .primary-nav__item--active {
  color: var(--color-primary-400);
}

.primary-nav__item--hovered {
  background: var(--color-surface-2);
  color: var(--color-text-primary);
}

.primary-nav__item:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.primary-nav__icon {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
}

.primary-nav__label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.primary-nav__chevron {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
  opacity: 0.4;
}

/* ═══════════════════════════════════════════════════════════════════════════
   FLYOUT PANELS  — absolutely positioned, never affect flex layout
═══════════════════════════════════════════════════════════════════════════ */

/*
  The sidebar's #default slot content has `position: relative` from .primary-nav,
  but the flyout itself needs to escape the sidebar's scrollable overflow.
  We use `position: fixed` anchored to the sidebar's visual right edge.
  The sidebar width is a CSS custom property exposed by UDashboardGroup as
  --sidebar-width (rem).  We fall back to the default 16rem.
*/

.flyout {
  position: fixed;
  top: 0;
  /* left is set per-level via --flyout-left */
  left: var(--flyout-left, 16rem);
  width: 14rem;
  height: 100dvh;
  z-index: 40;
  display: flex;
  flex-direction: column;
  background: var(--ui-bg);
  border-right: 1px solid var(--ui-border);
  box-shadow: 4px 0 16px -4px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

:root.dark .flyout {
  box-shadow: 4px 0 16px -4px rgba(0, 0, 0, 0.35);
}

/*
  Secondary flyout: sits immediately right of the sidebar.
  We read the sidebar width from the CSS custom property set by UDashboardGroup.
  UDashboardSidebar exposes its current width on :root as
  --ui-dashboard-sidebar-width (Nuxt UI v4 naming convention).
  Fall back to 16rem (default sidebar size).
*/
.flyout--secondary {
  left: var(--ui-dashboard-sidebar-width, 16rem);
}

/* Tertiary flyout: sits right of the secondary (secondary width = 14rem) */
.flyout--tertiary {
  position: fixed; /* re-declare for clarity */
  left: calc(var(--ui-dashboard-sidebar-width, 16rem) + 14rem);
  top: 0;
  width: 15rem; /* slightly wider — article titles can be longer */
  height: 100dvh;
  z-index: 41;
  display: flex;
  flex-direction: column;
  background: var(--ui-bg);
  border-right: 1px solid var(--ui-border);
  box-shadow: 4px 0 16px -4px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

:root.dark .flyout--tertiary {
  box-shadow: 4px 0 16px -4px rgba(0, 0, 0, 0.35);
}

.flyout__heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 1rem 0.875rem 0.75rem;
  border-bottom: 1px solid var(--ui-border);
}

.flyout__heading-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-primary-500);
  flex-shrink: 0;
}

.flyout__heading-label {
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flyout__list {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow-y: auto;
  flex: 1;
}

.flyout__item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  min-height: 2.75rem;
  padding: 0.5rem 0.625rem;
  border-radius: 0.5rem;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  transition:
    background 0.15s var(--ease-smooth),
    color 0.15s var(--ease-smooth);
}

.flyout__item:hover {
  background: var(--color-surface-2);
  color: var(--color-text-primary);
}

.flyout__item--active {
  background: color-mix(in srgb, var(--color-primary-500) 12%, transparent);
  color: var(--color-primary-600);
  font-weight: 600;
}

:root.dark .flyout__item--active {
  color: var(--color-primary-400);
}

.flyout__item--hovered {
  background: var(--color-surface-2);
  color: var(--color-text-primary);
}

.flyout__item:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* Article items have no icon, so less left padding */
.flyout__item--article {
  padding-left: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  align-items: flex-start;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
}

.flyout__item-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.flyout__item--active .flyout__item-icon {
  color: var(--color-primary-500);
}

.flyout__item-label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flyout__item--article .flyout__item-label {
  white-space: normal; /* allow article titles to wrap */
}

.flyout__item-chevron {
  width: 0.75rem;
  height: 0.75rem;
  flex-shrink: 0;
  opacity: 0.35;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SLIDE TRANSITION
═══════════════════════════════════════════════════════════════════════════ */

.panel-slide-enter-active {
  transition:
    opacity 0.2s var(--ease-smooth),
    transform 0.2s var(--ease-smooth);
}

.panel-slide-leave-active {
  transition:
    opacity 0.15s var(--ease-smooth),
    transform 0.15s var(--ease-smooth);
}

.panel-slide-enter-from {
  opacity: 0;
  transform: translateX(-12px);
}

.panel-slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER LINK
═══════════════════════════════════════════════════════════════════════════ */

.hub-footer-link {
  color: var(--color-text-secondary);
}

.hub-footer-link:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-2);
}

.hub-footer-link:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   VERSION BADGE
═══════════════════════════════════════════════════════════════════════════ */

.hub-version {
  position: fixed;
  bottom: 10px;
  right: 20px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.6875rem;
  color: var(--color-text-tertiary);
  pointer-events: none;
}

.hub-version__sep {
  opacity: 0.5;
}

/* ═══════════════════════════════════════════════════════════════════════════
   REDUCED MOTION
═══════════════════════════════════════════════════════════════════════════ */

@media (prefers-reduced-motion: reduce) {
  .panel-slide-enter-active,
  .panel-slide-leave-active {
    transition: none;
  }

  .primary-nav__item,
  .flyout__item,
  .hub-footer-link {
    transition: none;
  }
}
</style>
