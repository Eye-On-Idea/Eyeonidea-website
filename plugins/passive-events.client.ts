/**
 * Plugin to make touch/wheel event listeners passive by default
 * This improves scroll performance and eliminates browser warnings
 *
 * The warning occurs because non-passive event listeners can block scrolling
 * while the handler executes. Making them passive tells the browser it's safe
 * to scroll immediately without waiting for the handler.
 *
 * Note: This only applies passive: true when no options are specified.
 * Libraries that explicitly set passive: false will still work correctly.
 */
export default defineNuxtPlugin({
  name: "passive-events",
  enforce: "pre", // Run before other plugins
  setup() {
    if (import.meta.server) return;

    // Store the original addEventListener
    const originalAddEventListener = EventTarget.prototype.addEventListener;

    // Events that benefit from being passive for scroll performance
    const passiveEvents = new Set([
      "touchstart",
      "touchmove",
      "wheel",
      "mousewheel",
    ]);

    // Override addEventListener to add passive: true for scroll-blocking events
    // when no explicit passive option is provided
    EventTarget.prototype.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions
    ) {
      // Only modify if this is a scroll-blocking event AND no options specified
      if (passiveEvents.has(type) && options === undefined) {
        return originalAddEventListener.call(this, type, listener, {
          passive: true,
        });
      }

      // If options is a boolean (capture flag) and event should be passive
      if (passiveEvents.has(type) && typeof options === "boolean") {
        return originalAddEventListener.call(this, type, listener, {
          capture: options,
          passive: true,
        });
      }

      // If options is an object but passive is not explicitly set
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

      // For all other cases, use original behavior
      return originalAddEventListener.call(this, type, listener, options);
    };
  },
});
