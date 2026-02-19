<script setup lang="ts">
const { t } = useI18n();
const { clear } = useUserSession();
const router = useRouter();
const route = useRoute();
const { getServices, getOnboardingSections, getAllArticles, searchArticles } =
  useClientHub();

const handleLogout = async () => {
  await $fetch("/api/client-hub/logout", { method: "POST" });
  await clear();
  await router.push("/client-hub/login");
};

// Build navigation items from composable data
const navigationItems = computed(() => {
  const services = getServices();

  // Group 1: Fixed navigation items
  const fixedItems = [
    {
      label: t("clientHub.nav.home"),
      icon: "i-heroicons-home",
      to: "/client-hub",
      exact: true,
    },
    {
      label: t("clientHub.onboarding.title"),
      icon: "i-heroicons-academic-cap",
      to: "/client-hub/onboarding",
    },
  ];

  // Group 2: Services with category labels + article links as children
  const serviceItems = services
    .filter((s) => !s.comingSoon)
    .map((service) => {
      // Flatten categories: use type 'label' for category headers,
      // then articles as link items underneath
      const children: Array<{
        label: string;
        icon?: string;
        to?: string;
        type?: "label" | "link";
        class?: string;
      }> = [];

      for (const category of service.categories) {
        // Category header
        children.push({
          label: t(category.titleKey),
          icon: t(category.iconKey),
          type: "label" as const,
        });
        // Article links under this category
        for (const article of category.articles) {
          children.push({
            label: t(article.titleKey),
            to: `/client-hub/${service.slug}/${category.slug}/${article.slug}`,
            class: "mb-1",
          });
        }
      }

      return {
        label: t(service.titleKey),
        icon: t(service.iconKey),
        defaultOpen: route.path.startsWith(`/client-hub/${service.slug}`),
        class: "p-4 cursor-pointer mb-1",
        ui: {
          content: "mb-4",
        },
        children,
      };
    });

  return [fixedItems, serviceItems];
});

// Build search groups for command palette
const searchGroups = computed(() => {
  const services = getServices();
  const onboardingSections = getOnboardingSections();

  const onboardingGroup = {
    id: "onboarding",
    label: t("clientHub.onboarding.title"),

    items: onboardingSections.map((section) => ({
      label: t(section.titleKey),
      icon: "i-heroicons-academic-cap",
      to: `/client-hub/onboarding?step=${section.key}`,
    })),
  };

  const articleGroups = services
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
    }));

  return [onboardingGroup, ...articleGroups];
});
</script>

<template>
  <UDashboardGroup storage="cookie" storage-key="client-hub" unit="rem">
    <!-- Skip link (WCAG 2.4.1) -->
    <a href="#hub-main-content" class="skip-link">Skip to content</a>

    <UDashboardSidebar
      id="hub-sidebar"
      collapsible
      resizable
      :min-size="14"
      :max-size="25"
      :default-size="16"
      :collapsed-size="4.2"
    >
      <!-- HEADER: Logo -->
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

      <!-- BODY: Search + Navigation -->
      <template #default="{ collapsed }">
        <UDashboardSearchButton
          :collapsed="collapsed"
          :tooltip="collapsed"
          class="mb-2"
        />
        <UNavigationMenu
          orientation="vertical"
          :collapsed="collapsed"
          :tooltip="collapsed"
          highlight
          color="primary"
          :items="navigationItems"
        />
      </template>

      <!-- FOOTER: Controls -->
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
          <button
            v-if="!collapsed"
            type="button"
            class="hub-footer-link hub-footer-link--logout flex items-center gap-2 min-h-11 px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer w-full text-left"
            @click="handleLogout"
          >
            <Icon
              name="i-heroicons-arrow-right-on-rectangle"
              class="w-4 h-4 shrink-0"
              aria-hidden="true"
            />
            {{ t("clientHub.nav.logout") }}
          </button>
          <UDashboardSidebarCollapse />
        </div>
      </template>
    </UDashboardSidebar>

    <!-- Content Panel -->
    <UDashboardPanel id="hub-main-content">
      <template #header>
        <UDashboardNavbar>
          <template #right>
            <div class="flex items-center gap-1">
              <LanguageSwitcher />
              <ColorModeToggle />
            </div>
          </template>
        </UDashboardNavbar>
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

    <!-- Command palette search (Cmd+K) -->
    <UDashboardSearch :groups="searchGroups" />
  </UDashboardGroup>
</template>

<style scoped>
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

.hub-footer-link--logout:hover {
  color: var(--color-danger, #dc2626);
  background: color-mix(in srgb, var(--color-danger, #dc2626) 8%, transparent);
}

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

/* Active/open state for service accordion triggers */
#hub-sidebar :deep([data-state="open"] > [data-slot="link"]) {
  background: var(--gradient-text-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

#hub-sidebar
  :deep(
    [data-state="open"] > [data-slot="link"] [data-slot="linkLeadingIcon"]
  ) {
  color: var(--color-primary-500);
}

#hub-sidebar
  :deep(
    [data-state="open"] > [data-slot="link"] [data-slot="linkTrailingIcon"]
  ) {
  color: var(--color-primary-500);
}

@media (prefers-reduced-motion: reduce) {
  .hub-title,
  .hub-footer-link {
    transition-duration: 0.01ms !important;
  }
}
</style>
