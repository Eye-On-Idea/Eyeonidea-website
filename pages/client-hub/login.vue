<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

const handleContinue = () => {
  localStorage.setItem("client-hub-acknowledged", "1");
  const redirect = (route.query.redirect as string) || "/client-hub";
  router.replace(redirect);
};
</script>

<template>
  <div
    class="login-page min-h-screen flex flex-col items-center justify-center px-4"
  >
    <!-- Background -->
    <div class="absolute inset-0 bg-(--color-hero-bg,var(--ui-bg))" />

    <div class="relative z-10 w-full max-w-md">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <NuxtLink to="/" class="flex items-center gap-3 min-h-11">
          <img
            src="/public-material/logo-center-shadow.svg"
            alt="Eye On Idea"
            class="h-12 w-auto"
          />
        </NuxtLink>
      </div>

      <!-- Disclaimer card -->
      <GlassCard variant="solid" hover-effect="none" :padding="true">
        <div class="p-2 sm:p-4">
          <div class="flex justify-center mb-4">
            <span
              class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/10"
            >
              <UIcon
                name="i-heroicons-lock-closed"
                class="w-6 h-6 text-primary-500"
                aria-hidden="true"
              />
            </span>
          </div>

          <h1
            class="text-2xl font-bold text-(--color-text-primary) text-center"
          >
            {{ t("clientHub.disclaimer.title") }}
          </h1>
          <p
            class="text-sm text-(--color-text-secondary) text-center mt-2 mb-6"
          >
            {{ t("clientHub.disclaimer.subtitle") }}
          </p>

          <p
            class="text-sm text-(--color-text-muted) text-center mb-8 leading-relaxed"
          >
            {{ t("clientHub.disclaimer.body") }}
          </p>

          <button
            type="button"
            class="w-full px-4 py-3 min-h-11 text-sm font-semibold rounded-xl bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-all"
            @click="handleContinue"
          >
            {{ t("clientHub.disclaimer.continueButton") }}
          </button>
        </div>
      </GlassCard>

      <!-- Back to site -->
      <div class="flex justify-center mt-6">
        <NuxtLink
          to="/"
          class="flex items-center gap-1.5 min-h-11 text-sm text-(--color-text-tertiary) hover:text-(--color-text-secondary) transition-colors"
        >
          <UIcon
            name="i-heroicons-arrow-left"
            class="w-4 h-4"
            aria-hidden="true"
          />
          {{ t("clientHub.disclaimer.backToSite") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
