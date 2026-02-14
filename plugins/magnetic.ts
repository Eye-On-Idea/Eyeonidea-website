/**
 * v-magnetic directive
 * Applies a subtle scale effect when the cursor is near the element.
 * Desktop only, respects prefers-reduced-motion.
 * Registered universally so SSR doesn't fail, but logic only runs client-side.
 *
 * Usage: <button v-magnetic>Click me</button>
 *        <button v-magnetic="{ scale: 1.03, radius: 120 }">Custom</button>
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("magnetic", {
    getSSRProps() {
      return {};
    },

    mounted(el: HTMLElement, binding) {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const isMobile =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(max-width: 1024px)").matches;

      if (prefersReduced || isMobile) return;

      const opts = binding.value ?? {};
      const scale = opts.scale ?? 1.02;
      const radius = opts.radius ?? 100;

      let raf: number | null = null;
      let currentScale = 1;
      let targetScale = 1;
      let isActive = false;

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const animate = () => {
        currentScale = lerp(currentScale, targetScale, 0.15);

        if (Math.abs(currentScale - targetScale) < 0.001) {
          currentScale = targetScale;
        }

        el.style.transform = `scale(${currentScale})`;

        if (isActive || Math.abs(currentScale - 1) > 0.001) {
          raf = requestAnimationFrame(animate);
        } else {
          el.style.transform = "";
          raf = null;
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < radius) {
          isActive = true;
          targetScale = scale;
          if (!raf) raf = requestAnimationFrame(animate);
        }
      };

      const onMouseLeave = () => {
        isActive = false;
        targetScale = 1;
        if (!raf) raf = requestAnimationFrame(animate);
      };

      el.addEventListener("mousemove", onMouseMove, { passive: true });
      el.addEventListener("mouseleave", onMouseLeave);

      (el as any).__magnetic = { onMouseMove, onMouseLeave, raf };
    },

    unmounted(el: HTMLElement) {
      const data = (el as any).__magnetic;
      if (!data) return;
      el.removeEventListener("mousemove", data.onMouseMove);
      el.removeEventListener("mouseleave", data.onMouseLeave);
      if (data.raf) cancelAnimationFrame(data.raf);
      el.style.transform = "";
      delete (el as any).__magnetic;
    },
  });
});
