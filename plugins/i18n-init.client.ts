export default defineNuxtPlugin(() => {
  const preferencesStore = usePreferencesStore();

  preferencesStore.loadPreferences();
});
