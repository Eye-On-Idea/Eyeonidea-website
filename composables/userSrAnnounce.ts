export function useSrAnnounce() {
  // Shared state so any component can read it
  const srMessage = useState<string>("sr-message", () => "");
  // Announce a message (clears first to retrigger polite live regions)
  const announce = async (msg: string) => {
    srMessage.value = "";
    await nextTick();
    srMessage.value = msg;
  };
  return { srMessage, announce };
}
