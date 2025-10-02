import { createGtm } from "@gtm-support/vue-gtm";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const { cookiesEnabledIds } = useCookieControl();
  const runtimeConfig = useRuntimeConfig();

  // Get GTM ID from runtime config (public.gtmId in nuxt.config.ts)
  const gtmId = runtimeConfig.public.gtmId as string;

  // Hard block: only load if consent already given
  const initialEnabled = (cookiesEnabledIds.value ?? []).includes(
    "google-tag-manager"
  );

  // Register Vue GTM plugin
  nuxtApp.vueApp.use(
    createGtm({
      id: gtmId,
      defer: true,
      enabled: initialEnabled,
      vueRouter: router, // auto pageview on route changes
      trackOnNextTick: false,
      compatibility: true, // avoids SSR hydration issues
    })
  );

  // Access the injected GTM instance ($gtm)
  const gtm = nuxtApp.vueApp.config.globalProperties.$gtm as any;

  // React to cookie consent changes
  const isGtmOn = computed(() =>
    (cookiesEnabledIds.value ?? []).includes("google-tag-manager")
  );

  watch(
    isGtmOn,
    (enabled) => {
      if (enabled) {
        gtm?.enable(true); // injects gtm.js if not already
      } else {
        gtm?.disable();
      }
    },
    { immediate: false }
  );
});
