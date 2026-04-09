
export default defineNuxtPlugin({
  name: "passive-events",
  enforce: "pre",
  setup() {
    if (import.meta.server) return;

    const originalAddEventListener = EventTarget.prototype.addEventListener;

    const passiveEvents = new Set([
      "touchstart",
      "touchmove",
      "wheel",
      "mousewheel",
    ]);

    EventTarget.prototype.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions
    ) {

      if (passiveEvents.has(type) && options === undefined) {
        return originalAddEventListener.call(this, type, listener, {
          passive: true,
        });
      }

      if (passiveEvents.has(type) && typeof options === "boolean") {
        return originalAddEventListener.call(this, type, listener, {
          capture: options,
          passive: true,
        });
      }

      if (
        passiveEvents.has(type) &&
        typeof options === "object" &&
        options.passive === undefined
      ) {
        return originalAddEventListener.call(this, type, listener, {
          ...options,
          passive: true,
        });
      }

      return originalAddEventListener.call(this, type, listener, options);
    };
  },
});
