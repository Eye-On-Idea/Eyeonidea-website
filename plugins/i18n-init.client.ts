export default defineNuxtPlugin(() => {
  const preferencesStore = usePreferencesStore();

  // Load preferences from localStorage on app start
  preferencesStore.loadPreferences();
});
