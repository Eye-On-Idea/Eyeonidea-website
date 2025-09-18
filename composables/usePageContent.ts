// composables/usePageContent.ts
export function usePageContent() {
  const { lang } = useLang(); // 'en' | 'da'
  const page = ref<any>(null);
  const pending = ref<boolean>(true);
  const error = ref<unknown>(null);

  // Eagerly import all locale JSONs at build/dev time (fast + HMR-safe)
  // Vite will bundle them; keys look like '/content/en/index.json'
  const modules = import.meta.glob("/content/**/index.json", { eager: true });

  const load = (l = lang.value) => {
    pending.value = true;
    error.value = null;
    try {
      // Find a module whose path ends with '/{lang}/index.json'
      const entry = Object.entries(modules).find(([k]) =>
        k.endsWith(`/${l}/index.json`)
      );
      if (!entry) {
        // Fallback: try dynamic import (dev convenience)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return import(/* @vite-ignore */ `~/content/${l}/index.json`)
          .then((m) => {
            page.value = (m as any).default;
            pending.value = false;
          })
          .catch((e) => {
            error.value = e;
            pending.value = false;
          });
      }
      const mod = entry[1] as any;
      page.value = mod.default || mod;
    } catch (e) {
      error.value = e;
    } finally {
      pending.value = false;
    }
  };

  // Initial + reactive reload
  watchEffect(() => load(lang.value));

  return { page, lang, pending, error, reload: () => load(lang.value) };
}
