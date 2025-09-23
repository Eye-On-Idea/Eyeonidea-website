export default defineNuxtPlugin(() => {
  const { public: pub } = useRuntimeConfig();
  const GTM_ID = pub.GTM_ID;
  if (!GTM_ID) return;

  const { cookiesEnabledIds, isConsentGiven } = useCookieControl();

  const hasGTM = () => cookiesEnabledIds.value.includes("google-tag-manager");
  const hasGA = () => cookiesEnabledIds.value.includes("google-analytics");

  let loaded = false;
  const loadGtmOnce = () => {
    if (loaded) return;
    loaded = true;
    // @ts-expect-error
    window.dataLayer = window.dataLayer || [];
    // Default denied BEFORE GTM loads
    // @ts-expect-error
    window.dataLayer.push({
      event: "default_consent",
      ad_user_data: "denied",
      ad_personalization: "denied",
      ad_storage: "denied",
      analytics_storage: "denied",
    });
    // Inject GTM
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(
      GTM_ID
    )}`;
    document.head.appendChild(s);
  };

  const updateConsent = () => {
    const allowContainer = hasGTM();
    const allowAnalytics = hasGA();
    // Update Consent Mode
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
      cookiesEnabledIds: [...cookiesEnabledIds.value],
    });
  };

  if (process.client) {
    loadGtmOnce();
    if (isConsentGiven.value) updateConsent();
  }

  watch(cookiesEnabledIds, () => {
    loadGtmOnce();
    updateConsent();
  });
});
