import { ref, onMounted, onUnmounted, type Ref } from "vue";
import { STAGGER_ICON } from "~/composables/useAccessibleMotion";

export function useStrokeDraw(
  containerRef: Ref<HTMLElement | null>,
  options: {

    delay?: number;

    stagger?: number;

    duration?: number;

    easing?: string;

    selector?: string;
  } = {}
) {
  const {
    delay = 0,
    stagger = STAGGER_ICON,
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

        if (typeof path.getTotalLength !== "function") return;

        const length = path.getTotalLength();

        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        path.style.transition = `stroke-dashoffset ${duration}ms ${easing} ${delay + index * stagger}ms`;

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
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && containerRef.value) {
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

