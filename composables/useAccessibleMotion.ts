import { usePreferredReducedMotion } from "@vueuse/core";
import { computed } from "vue";

export function useAccessibleMotion() {

  const reducedMotionPreference = usePreferredReducedMotion();
  const prefersReducedMotion = computed(() => reducedMotionPreference.value === "reduce");

  const variant = <T extends Record<string, any>>(
    animationVariant: T,
    staticVariant?: Partial<T>
  ): T => {
    if (prefersReducedMotion.value) {

      return (staticVariant || animationVariant.visible || {}) as T;
    }
    return animationVariant;
  };

  return {
    prefersReducedMotion,
    variant,
    animationPresets,
  };
}

export const STAGGER_CARD = 100;
export const STAGGER_TEXT = 60;
export const STAGGER_ICON = 120;

export function staggeredFadeInUp(index: number, baseDelay = 0) {
  return withDelay("fadeInUp", baseDelay + index * STAGGER_CARD);
}

export const animationPresets = {

  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 500, ease: "easeOut" },
    },
  },

  fadeIn: {
    initial: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 400, ease: "easeOut" },
    },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 400, ease: "easeOut" },
    },
  },

  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 500, ease: "easeOut" },
    },
  },

  slideInRight: {
    initial: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 500, ease: "easeOut" },
    },
  },

  fadeInUpScale: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 500, ease: "easeOut" },
    },
  },

  iconHover: {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  },

  iconRotate: {
    initial: { rotate: 0 },
    hover: {
      rotate: 360,
      transition: { duration: 500, ease: "easeInOut" },
    },
  },

  buttonLift: {
    initial: { y: 0 },
    hover: {
      y: -2,
      transition: { duration: 200, ease: "easeOut" },
    },
  },

  buttonGlow: {
    initial: { boxShadow: "0 0 0 0 rgba(204, 31, 53, 0)" },
    hover: {
      boxShadow: "0 0 20px 4px rgba(204, 31, 53, 0.3)",
      transition: { duration: 300, ease: "easeOut" },
    },
  },

  shake: {
    initial: { x: 0 },
    error: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 400, ease: "easeInOut" },
    },
  },

  successPulse: {
    initial: { scale: 1 },
    success: {
      scale: [1, 1.05, 1],
      transition: { duration: 500, ease: "easeOut" },
    },
  },

  staggerContainer: {
    initial: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 400, ease: "easeOut" },
    },
  },
} as const;

export function getStaggerDelay(
  baseDelay: number = 0,
  itemDelay: number = 100,
  index: number = 0
): number {
  return baseDelay + index * itemDelay;
}

export function withDelay(
  preset: keyof typeof animationPresets,
  delay: number
): any {
  const basePreset = animationPresets[preset];
  if (!("visible" in basePreset)) {
    return basePreset;
  }

  const visiblePreset = basePreset.visible;
  return {
    ...basePreset,
    visible: {
      ...visiblePreset,
      transition: {
        ...("transition" in visiblePreset ? (visiblePreset.transition || {}) : {}),
        delay: delay / 1000,
      },
    },
  };
}
