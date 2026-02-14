/**
 * v-magnetic directive
 * Subtly attracts an element toward the cursor when hovering nearby.
 * Desktop only, respects prefers-reduced-motion.
 * Registered universally so SSR doesn't fail, but logic only runs client-side.
 *
 * Usage: <button v-magnetic>Click me</button>
 *        <button v-magnetic="{ strength: 0.4, radius: 120 }">Custom</button>
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
      const strength = opts.strength ?? 0.3;
      const radius = opts.radius ?? 100;

      let raf: number | null = null;
      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;
      let isActive = false;

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const animate = () => {
        currentX = lerp(currentX, targetX, 0.15);
        currentY = lerp(currentY, targetY, 0.15);

        if (
          Math.abs(currentX - targetX) < 0.1 &&
          Math.abs(currentY - targetY) < 0.1
        ) {
          currentX = targetX;
          currentY = targetY;
        }

        el.style.transform = `translate(${currentX}px, ${currentY}px)`;

        if (isActive || Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
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
          targetX = distX * strength;
          targetY = distY * strength;
          if (!raf) raf = requestAnimationFrame(animate);
        }
      };

      const onMouseLeave = () => {
        isActive = false;
        targetX = 0;
        targetY = 0;
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
