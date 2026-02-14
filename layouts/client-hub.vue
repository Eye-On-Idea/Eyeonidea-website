<script setup lang="ts">
const { t } = useI18n();
const { clear } = useUserSession();
const router = useRouter();

const handleLogout = async () => {
  await $fetch("/api/client-hub/logout", { method: "POST" });
  await clear();
  await router.push("/client-hub/login");
};
</script>

<template>
  <div class="client-hub-layout min-h-screen flex flex-col">
    <!-- Skip link (WCAG 2.4.1) -->
    <a href="#hub-main-content" class="skip-link">
      Skip to content
    </a>

    <!-- Hub Header -->
    <header
      class="hub-header sticky top-0 z-50"
      role="banner"
    >
      <nav
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Client Hub navigation"
      >
        <div class="flex items-center justify-between h-16">
          <!-- Left: Logo + Hub title -->
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/client-hub"
              class="flex items-center gap-3 group min-h-11"
              :aria-label="t('clientHub.nav.hubTitle') + ' — ' + t('clientHub.nav.home')"
            >
              <img
                src="/public-material/logo-center-shadow.svg"
                alt=""
                class="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              />
              <span class="hub-title text-lg font-bold">
                {{ t("clientHub.nav.hubTitle") }}
              </span>
            </NuxtLink>
          </div>

          <!-- Right: Actions -->
          <div class="flex items-center gap-2">
            <LanguageSwitcher />
            <ColorModeToggle />

            <!-- Back to site -->
            <NuxtLink
              to="/"
              class="hub-action-btn hidden sm:inline-flex items-center gap-1.5 min-h-9 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200"
            >
              <Icon name="i-heroicons-arrow-left" class="w-4 h-4" aria-hidden="true" />
              {{ t("clientHub.nav.backToSite") }}
            </NuxtLink>

            <!-- Logout -->
            <button
              type="button"
              class="hub-action-btn hub-action-btn--logout inline-flex items-center gap-1.5 px-3 py-1.5 min-h-9 text-sm font-medium rounded-lg transition-all duration-200"
              @click="handleLogout"
            >
              <Icon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4" aria-hidden="true" />
              <span class="hidden sm:inline">{{ t("clientHub.nav.logout") }}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main content -->
    <main id="hub-main-content" class="flex-1" role="main">
      <slot />
    </main>

    <!-- Minimal footer -->
    <footer
      class="hub-footer border-t border-(--glass-border-subtle) py-6"
      role="contentinfo"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-(--color-text-tertiary)">
          <NuxtLink
            to="/"
            class="min-h-11 inline-flex items-center hover:text-(--color-text-secondary) transition-colors"
          >
            {{ t("clientHub.nav.backToSite") }}
          </NuxtLink>
          <button
            type="button"
            class="min-h-11 inline-flex items-center hover:text-(--color-text-secondary) transition-colors"
            @click="handleLogout"
          >
            {{ t("clientHub.nav.logout") }}
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.hub-header {
  background: color-mix(in srgb, var(--color-surface-1, var(--ui-bg)) 85%, transparent);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid var(--glass-border-subtle);
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
}

.hub-title {
  color: var(--color-text-primary);
  background: var(--gradient-text-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hub-action-btn {
  color: var(--color-text-secondary);
  background: color-mix(in srgb, var(--color-surface-2) 60%, transparent);
  border: 1px solid var(--glass-border-subtle);
}

.hub-action-btn:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-2);
  border-color: var(--glass-border);
}

.hub-action-btn:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.hub-action-btn--logout {
  color: var(--color-text-secondary);
}

.hub-action-btn--logout:hover {
  color: var(--color-danger, #dc2626);
  background: color-mix(in srgb, var(--color-danger, #dc2626) 8%, transparent);
  border-color: color-mix(in srgb, var(--color-danger, #dc2626) 20%, transparent);
}

.hub-footer {
  background: var(--color-surface-1, var(--ui-bg));
}

@media (prefers-reduced-transparency: reduce) {
  .hub-header {
    background: var(--color-surface-1, var(--ui-bg));
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hub-header * {
    transition-duration: 0.01ms !important;
  }
}
</style>
