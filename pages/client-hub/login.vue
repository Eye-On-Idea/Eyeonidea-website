<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { loggedIn, user, fetch: fetchSession } = useUserSession();

const password = ref("");
const error = ref("");
const isLoading = ref(false);
const showPassword = ref(false);
const passwordRef = ref<HTMLInputElement | null>(null);

// If already logged in, redirect to hub
watch(
  loggedIn,
  (val) => {
    if (val && user.value?.clientHub) {
      const redirect = (route.query.redirect as string) || "/client-hub";
      router.replace(redirect);
    }
  },
  { immediate: true },
);

const handleSubmit = async () => {
  error.value = "";

  if (!password.value.trim()) {
    error.value = t("clientHub.login.errorRequired");
    nextTick(() => {
      passwordRef.value?.focus();
      passwordRef.value?.select();
    });
    return;
  }

  isLoading.value = true;

  try {
    await $fetch("/api/client-hub/login", {
      method: "POST",
      body: { password: password.value },
    });
    await fetchSession();
    const redirect = (route.query.redirect as string) || "/client-hub";
    await router.replace(redirect);
  } catch (e: any) {
    if (e?.statusCode === 401) {
      error.value = t("clientHub.login.errorInvalid");
    } else {
      error.value = t("clientHub.login.errorGeneric");
    }
    password.value = "";
    nextTick(() => {
      passwordRef.value?.focus();
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-page min-h-screen flex flex-col items-center justify-center px-4">
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

      <!-- Login card -->
      <GlassCard tint-color="dark" hover-effect="none" :padding="true">
        <div class="p-2 sm:p-4">
          <h1 class="text-2xl font-bold text-(--color-text-primary) text-center">
            {{ t("clientHub.login.title") }}
          </h1>
          <p class="text-sm text-(--color-text-secondary) text-center mt-2 mb-6">
            {{ t("clientHub.login.subtitle") }}
          </p>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Error message -->
            <Transition
              enter-active-class="transition-all duration-200"
              leave-active-class="transition-all duration-150"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div
                v-if="error"
                id="login-error"
                role="alert"
                class="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400"
              >
                <Icon name="i-heroicons-exclamation-triangle" class="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{{ error }}</span>
              </div>
            </Transition>

            <!-- Password field -->
            <div>
              <label
                for="hub-password"
                class="block text-sm font-medium text-(--color-text-secondary) mb-1.5"
              >
                {{ t("clientHub.login.passwordLabel") }}
              </label>
              <div class="relative">
                <input
                  id="hub-password"
                  ref="passwordRef"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="t('clientHub.login.passwordPlaceholder')"
                  autocomplete="current-password"
                  :disabled="isLoading"
                  maxlength="128"
                  :aria-invalid="!!error"
                  :aria-describedby="error ? 'login-error' : undefined"
                  class="w-full px-4 py-3 pr-12 min-h-11 text-sm rounded-xl bg-(--color-surface-2) border border-(--glass-border-subtle) text-(--color-text-primary) placeholder-(--color-text-tertiary) focus:outline-none focus:ring-2 focus:ring-primary-400 hover:border-primary-400/30 disabled:opacity-50 transition-all"
                />
                <button
                  type="button"
                  class="absolute right-1 top-1/2 -translate-y-1/2 p-2 min-w-9 min-h-9 inline-flex items-center justify-center rounded-lg text-(--color-text-tertiary) hover:text-(--color-text-secondary) transition-colors"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                >
                  <Icon
                    :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                    class="w-4 h-4"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="isLoading"
              :aria-busy="isLoading"
              class="w-full px-4 py-3 min-h-11 text-sm font-semibold rounded-xl bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:opacity-50 transition-all"
            >
              <span v-if="isLoading" class="flex items-center justify-center gap-2">
                <Icon name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" aria-hidden="true" />
                {{ t("clientHub.login.submitting") }}
              </span>
              <span v-else>{{ t("clientHub.login.submitButton") }}</span>
            </button>
          </form>

          <!-- Help text -->
          <p class="text-xs text-(--color-text-tertiary) text-center mt-6">
            {{ t("clientHub.login.helpText") }}
          </p>
        </div>
      </GlassCard>

      <!-- Back to site -->
      <div class="flex justify-center mt-6">
        <NuxtLink
          to="/"
          class="flex items-center gap-1.5 min-h-11 text-sm text-(--color-text-tertiary) hover:text-(--color-text-secondary) transition-colors"
        >
          <Icon name="i-heroicons-arrow-left" class="w-4 h-4" aria-hidden="true" />
          {{ t("clientHub.nav.backToSite") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
