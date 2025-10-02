// plugins/gtag-consent.client.ts
export default defineNuxtPlugin(() => {
  const { gtag, initialize } = useGtag();
  const { cookiesEnabledIds } = useCookieControl();

  // Avoid 'possibly undefined' by defaulting to []
  const isGAEnabled = computed<boolean>(() => {
    const ids = cookiesEnabledIds.value ?? [];
    return ids.includes("google-analytics");
  });

  watch(
    isGAEnabled,
    (enabled) => {
      if (enabled) {
        // initialize(); // Uncomment if you set gtag.initMode = 'manual'
        gtag("consent", "update", {
          ad_user_data: "granted",
          ad_personalization: "granted",
          ad_storage: "granted",
          analytics_storage: "granted",
        });
      } else {
        gtag("consent", "update", {
          ad_user_data: "denied",
          ad_personalization: "denied",
          ad_storage: "denied",
          analytics_storage: "denied",
        });
      }
    },
    { immediate: true }
  );
});
