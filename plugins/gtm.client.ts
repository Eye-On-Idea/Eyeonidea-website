export default defineNuxtPlugin(() => {
  const { public: pub } = useRuntimeConfig();
  const GTM_ID = pub.GTM_ID;
  if (!GTM_ID) return;

  const { cookiesEnabledIds } = useCookieControl();

  const hasGTM = () => cookiesEnabledIds.value?.includes("google-tag-manager") ?? false;
  const hasGA = () => cookiesEnabledIds.value?.includes("google-analytics") ?? false;

  let loaded = false;

  const ensureDataLayer = () => {
    // @ts-expect-error
    window.dataLayer = window.dataLayer || [];
  };

  const pushDefaultConsent = () => {
    ensureDataLayer();
    // Default denied BEFORE GTM loads
    // @ts-expect-error
    window.dataLayer.push({
      event: "default_consent",
      ad_user_data: "denied",
      ad_personalization: "denied",
      ad_storage: "denied",
      analytics_storage: "denied",
    });
  };

  const loadGtmOnce = () => {
    if (loaded || !hasGTM()) return;
    loaded = true;
    pushDefaultConsent();
    // Inject GTM
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(
      GTM_ID
    )}`;
    document.head.appendChild(s);
  };

  const updateConsent = () => {
    if (!loaded) return;
    const allowContainer = hasGTM();
    const allowAnalytics = hasGA();
    // Update Consent Mode
    ensureDataLayer();
    // @ts-expect-error
    window.dataLayer?.push({
      event: "consent_update",
      ad_user_data: "denied",
      ad_personalization: "denied",
      ad_storage: allowContainer ? "granted" : "denied",
      analytics_storage: allowAnalytics ? "granted" : "denied",
    });
    // Optional: custom event for GTM triggers
    // @ts-expect-error
    window.dataLayer?.push({
      event: "cookie_preferences_changed",
      cookiesEnabledIds: cookiesEnabledIds.value ? [...cookiesEnabledIds.value] : [],
    });
  };

  const syncConsent = () => {
    if (hasGTM()) loadGtmOnce();
    updateConsent();
  };

  syncConsent();
  watch(cookiesEnabledIds, syncConsent, { deep: true });
});
