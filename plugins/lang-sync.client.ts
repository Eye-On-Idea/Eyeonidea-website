export default defineNuxtPlugin(() => {
  if (process.server) return;
  const { lang } = useLang();
  watchEffect(() => {
    document.documentElement.lang = lang.value; // 'en' | 'da'
  });
});
