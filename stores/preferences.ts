import { defineStore } from "pinia";

export const SUPPORTED_LANGUAGES = ["en", "fr", "es", "de", "it", "dk"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const normalizeLanguage = (
  language: string | null | undefined
): SupportedLanguage | null => {
  if (!language) {
    return null;
  }

  const normalized = language.trim().toLowerCase();
  return SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)
    ? (normalized as SupportedLanguage)
    : null;
};

export interface PreferencesState {
  language: SupportedLanguage;
  theme: "light" | "dark" | "system";
  units: "metric" | "imperial";
  loading: boolean;
}

export const usePreferencesStore = defineStore("preferences", {
  state: (): PreferencesState => ({
    language: SUPPORTED_LANGUAGES[0],
    theme: "system",
    units: "metric",
    loading: false,
  }),

  getters: {
    currentLanguage: (state) => state.language,
    currentTheme: (state) => state.theme,
    currentUnits: (state) => state.units,
    isMetric: (state) => state.units === "metric",
  },

  actions: {
    async setLanguage(language: SupportedLanguage) {
      this.language = language;

      if (import.meta.client) {

        localStorage.setItem("user_language", language);
      }
    },

    async setTheme(theme: "light" | "dark" | "system") {
      this.theme = theme;

      const colorMode = useColorMode();
      colorMode.preference = theme;

      if (import.meta.client) {
        localStorage.setItem("user_theme", theme);
      }
    },

    async setUnits(units: "metric" | "imperial") {
      this.units = units;

      if (import.meta.client) {
        localStorage.setItem("user_units", units);
      }
    },

    async loadPreferences() {
      this.loading = true;

      try {
        if (import.meta.client) {
          const savedLanguage = normalizeLanguage(
            localStorage.getItem("user_language")
          );
          const savedUnits = localStorage.getItem("user_units");

          if (savedLanguage) {
            this.language = savedLanguage;
          }
          if (savedUnits) {
            this.units = savedUnits as "metric" | "imperial";
          }
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      } finally {
        this.loading = false;
      }
    },

    async syncWithProfile() {
      await this.loadPreferences();
    },
  },
});
