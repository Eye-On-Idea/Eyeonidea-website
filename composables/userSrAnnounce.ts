export function useSrAnnounce() {

  const srMessage = useState<string>("sr-message", () => "");

  const announce = async (msg: string) => {
    srMessage.value = "";
    await nextTick();
    srMessage.value = msg;
  };
  return { srMessage, announce };
}
