import { ref, computed, onMounted, onUnmounted } from "vue";

export function useScrollProgress() {
  const rawProgress = ref(0);
  const smoothedProgress = ref(0);
  const reducedMotion = ref(false);

  let rafId: number | null = null;
  let isVisible = true;

  const updateRaw = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    rawProgress.value = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
  };

  const smoothingFactor = computed(() => (reducedMotion.value ? 1.0 : 0.04));

  const tick = () => {
    if (!isVisible) return;
    const delta = rawProgress.value - smoothedProgress.value;
    if (Math.abs(delta) > 0.00001) {
      smoothedProgress.value += delta * smoothingFactor.value;
    }
    rafId = requestAnimationFrame(tick);
  };

  const onScroll = () => updateRaw();

  const onVisibility = () => {
    isVisible = !document.hidden;
    if (isVisible && rafId === null) {
      rafId = requestAnimationFrame(tick);
    } else if (!isVisible && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  onMounted(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.value = mq.matches;
    mq.addEventListener("change", (e) => {
      reducedMotion.value = e.matches;
    });

    updateRaw();
    smoothedProgress.value = rawProgress.value;

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(tick);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVisibility);
    if (rafId !== null) cancelAnimationFrame(rafId);
  });

  /**
   * Returns a computed 0–1 value representing progress through a sub-range of the page.
   * @param start - fraction of total page where this range begins (0–1)
   * @param end   - fraction of total page where this range ends (0–1)
   */
  const sectionProgress = (start: number, end: number) =>
    computed(() => {
      const p = smoothedProgress.value;
      return Math.max(0, Math.min(1, (p - start) / (end - start)));
    });

  return { rawProgress, smoothedProgress, reducedMotion, sectionProgress };
}
