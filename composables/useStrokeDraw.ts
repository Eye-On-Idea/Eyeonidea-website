import { ref, onMounted, onUnmounted, type Ref } from "vue";

/**
 * Composable that animates SVG stroke-dashoffset on icon elements
 * when they enter the viewport. Works with UIcon's rendered SVGs.
 *
 * @param containerRef - Ref to the parent element containing SVG icons
 * @param options - Configuration for delay, stagger, and duration
 */
export function useStrokeDraw(
  containerRef: Ref<HTMLElement | null>,
  options: {
    /** Delay before animation starts (ms) */
    delay?: number;
    /** Stagger between each icon (ms) */
    stagger?: number;
    /** Animation duration (ms) */
    duration?: number;
    /** CSS easing function */
    easing?: string;
    /** Selector for icon wrapper elements */
    selector?: string;
  } = {}
) {
  const {
    delay = 0,
    stagger = 120,
    duration = 600,
    easing = "cubic-bezier(0.22, 1, 0.36, 1)",
    selector = ".value-icon-wrap",
  } = options;

  const isDrawn = ref(false);
  let observer: IntersectionObserver | null = null;

  function animatePaths(container: HTMLElement) {
    const wrappers = container.querySelectorAll(selector);

    wrappers.forEach((wrapper, index) => {
      const paths = wrapper.querySelectorAll<SVGPathElement | SVGLineElement | SVGCircleElement | SVGPolylineElement>(
        "svg path, svg line, svg circle, svg polyline, svg rect"
      );

      paths.forEach((path) => {
        // Get the total length of the path for stroke-dash animation
        if (typeof path.getTotalLength !== "function") return;

        const length = path.getTotalLength();

        // Set initial state: fully hidden stroke
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        path.style.transition = `stroke-dashoffset ${duration}ms ${easing} ${delay + index * stagger}ms`;

        // Trigger the draw on next frame
        requestAnimationFrame(() => {
          path.style.strokeDashoffset = "0";
        });
      });
    });

    isDrawn.value = true;
  }

  onMounted(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || !containerRef.value) {
      isDrawn.value = true;
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && containerRef.value) {
          animatePaths(containerRef.value);
          observer?.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.value);
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return { isDrawn };
}
