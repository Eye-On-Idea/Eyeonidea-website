// composables/useLang.ts
export type Lang = "en" | "da";

export function useLang() {
  const cookie = useCookie<Lang>("lang", {
    default: () => "en",
    sameSite: "lax",
  });
  const lang = useState<Lang>("lang", () => cookie.value || "en");

  watch(lang, (val) => {
    cookie.value = val;
  });
  const toggleLang = () => {
    lang.value = lang.value === "en" ? "da" : "en";
  };

  return { lang, toggleLang };
}
