import { usePreferredReducedMotion } from "@vueuse/core";

export function useCursorFollow() {
  const reducedMotionPreference = usePreferredReducedMotion();
  const prefersReducedMotion = computed(
    () => reducedMotionPreference.value === "reduce"
  );

  const cursorX = ref(0);
  const cursorY = ref(0);
  const isHovering = ref(false);

  let animationFrameId: number | null = null;
  let targetX = 0;
  let targetY = 0;

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const updateCursorPosition = () => {
    if (prefersReducedMotion.value) {
      cursorX.value = targetX;
      cursorY.value = targetY;
    } else {
      cursorX.value = lerp(cursorX.value, targetX, 0.15);
      cursorY.value = lerp(cursorY.value, targetY, 0.15);
    }
    animationFrameId = requestAnimationFrame(updateCursorPosition);
  };

  const handleMouseMove = (e: MouseEvent) => {
    targetX = e.clientX;
    targetY = e.clientY;
  };

  const handleMouseEnter = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target &&
      (target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.classList?.contains("cursor-interactive"))
    ) {
      isHovering.value = true;
    }
  };

  const handleMouseLeave = () => {
    isHovering.value = false;
  };

  onMounted(() => {
    // Don't run on mobile or with reduced motion
    const isMobile =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(max-width: 1024px)").matches;

    if (prefersReducedMotion.value || isMobile) return;

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, {
      capture: true,
    });
    document.addEventListener("mouseleave", handleMouseLeave, {
      capture: true,
    });

    animationFrameId = requestAnimationFrame(updateCursorPosition);
  });

  onUnmounted(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseenter", handleMouseEnter, {
      capture: true,
    });
    document.removeEventListener("mouseleave", handleMouseLeave, {
      capture: true,
    });

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  });

  return {
    cursorX,
    cursorY,
    isHovering,
    prefersReducedMotion,
  };
}
