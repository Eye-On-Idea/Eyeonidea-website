<script setup lang="ts">
import { computed } from "vue";
import { useSimpleCardTilt } from "~/composables/useCardTilt";

const props = withDefaults(
  defineProps<{
    // Glass effect props
    glassIntensity?: number; // 0-1 for blur amount
    tintColor?: "light" | "dark" | "brand"; // Glass tint variant
    // Interaction props
    hoverEffect?: "lift" | "glow" | "tilt" | "none";
    // Visual props
    gradientBorder?: boolean; // Add gradient border
    elevated?: boolean; // Extra elevation/shadow
    // Layout props
    wrapperClass?: string | string[];
    padding?: boolean;
    // Legacy props (kept for backwards compatibility)
    displacementScale?: number;
    blurAmount?: number;
    cornerRadius?: number;
    saturation?: number;
    overLight?: boolean;
  }>(),
  {
    glassIntensity: 0.5,
    tintColor: "dark",
    hoverEffect: "lift",
    gradientBorder: false,
    elevated: false,
    padding: true,
  }
);

// Conditionally use tilt effect
const { cardRef, cardStyle, glareStyle, isHovered } =
  props.hoverEffect === "tilt"
    ? useSimpleCardTilt()
    : { cardRef: null, cardStyle: null, glareStyle: null, isHovered: null };

// Compute glass class based on tint
const glassClass = computed(() => {
  const classes = ["glass-card"];

  switch (props.tintColor) {
    case "light":
      classes.push("glass-light");
      break;
    case "brand":
      classes.push("glass-brand");
      break;
    case "dark":
    default:
      classes.push("glass-dark");
      break;
  }

  // Add hover effect class
  if (props.hoverEffect === "lift") {
    classes.push("hover-lift");
  } else if (props.hoverEffect === "glow") {
    classes.push("hover-glow");
  }

  // Add gradient border class
  if (props.gradientBorder) {
    classes.push("gradient-border");
  }

  // Add elevated class
  if (props.elevated) {
    classes.push("glass-elevated");
  }

  return classes;
});

// Compute dynamic glass intensity styles
const glassStyles = computed(() => {
  const blur = Math.round(props.glassIntensity * 20); // 0-20px blur
  return {
    "--glass-blur-dynamic": `${blur}px`,
  };
});
</script>

<template>
  <div
    :ref="hoverEffect === 'tilt' ? (el) => (cardRef = el as HTMLElement) : undefined"
    :style="[glassStyles, hoverEffect === 'tilt' && cardStyle ? cardStyle : {}]"
    :class="[glassClass, wrapperClass]"
    class="relative rounded-xl overflow-hidden transition-all duration-300"
    role="presentation"
  >
    <!-- Glare overlay for tilt effect -->
    <div
      v-if="hoverEffect === 'tilt' && glareStyle"
      class="absolute inset-0 pointer-events-none z-10 rounded-xl"
      :style="glareStyle"
    />

    <!-- Content wrapper -->
    <div :class="{ 'p-4 md:p-6': padding }" class="flex flex-col h-full">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.glass-card {
  backdrop-filter: blur(var(--glass-blur-dynamic, var(--glass-blur, 20px)))
    saturate(var(--glass-saturation, 180%));
  -webkit-backdrop-filter: blur(
      var(--glass-blur-dynamic, var(--glass-blur, 20px))
    )
    saturate(var(--glass-saturation, 180%));
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.2));
  box-shadow: var(--glass-shadow, 0 8px 32px rgba(0, 0, 0, 0.1));
}

/* Elevated glass with stronger shadow */
.glass-elevated {
  box-shadow: var(--glass-shadow-elevated, 0 16px 48px rgba(0, 0, 0, 0.15)),
    0 0 40px rgba(64, 150, 255, 0.1);
}

/* Gradient border effect */
.gradient-border {
  position: relative;
  border: none;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      var(--color-primary-400),
      var(--color-accent-400),
      var(--color-primary-400)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}

/* Enhanced hover states */
.glass-card.hover-lift:hover {
  box-shadow: var(--glass-shadow-elevated, 0 16px 48px rgba(0, 0, 0, 0.15)),
    0 0 30px rgba(64, 150, 255, 0.15);
}

.glass-card.hover-glow:hover {
  box-shadow: var(--glass-shadow, 0 8px 32px rgba(0, 0, 0, 0.1)),
    0 0 40px rgba(64, 150, 255, 0.25);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .glass-card {
    transition: none;
  }
}

/* Respect reduced transparency */
@media (prefers-reduced-transparency: reduce) {
  .glass-card {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: var(--color-surface-1);
  }
}
</style>
