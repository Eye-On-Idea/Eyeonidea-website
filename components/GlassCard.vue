<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    /** Card surface variant */
    variant?: "glass" | "solid" | "outlined";
    /** Glass effect intensity (0-1), only applies to glass variant */
    glassIntensity?: number;
    /** Glass tint color, only applies to glass variant */
    tintColor?: "light" | "dark" | "brand";
    /** Hover interaction style */
    hoverEffect?: "lift" | "glow" | "none";
    /** Add gradient border */
    gradientBorder?: boolean;
    /** Extra elevation/shadow */
    elevated?: boolean;
    /** Additional wrapper classes */
    wrapperClass?: string | string[];
    /** Whether to apply internal padding */
    padding?: boolean;
  }>(),
  {
    variant: "glass",
    glassIntensity: 0.5,
    tintColor: "dark",
    hoverEffect: "lift",
    gradientBorder: false,
    elevated: false,
    padding: true,
  }
);

const cardClass = computed(() => {
  const classes: string[] = [];

  // Variant class
  if (props.variant === "glass") {
    classes.push("glass-card");
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
  } else if (props.variant === "solid") {
    classes.push("solid-card");
  } else if (props.variant === "outlined") {
    classes.push("outlined-card");
  }

  // Hover effect
  if (props.hoverEffect === "lift") {
    classes.push("hover-lift");
  } else if (props.hoverEffect === "glow") {
    classes.push("hover-glow");
  }

  // Gradient border
  if (props.gradientBorder) {
    classes.push("gradient-border");
  }

  // Elevated
  if (props.elevated) {
    classes.push("card-elevated");
  }

  return classes;
});

const cardStyles = computed(() => {
  if (props.variant !== "glass") return {};
  const blur = Math.round(props.glassIntensity * 20);
  return { "--glass-blur-dynamic": `${blur}px` };
});
</script>

<template>
  <div
    :style="cardStyles"
    :class="[cardClass, wrapperClass]"
    class="relative rounded-xl overflow-hidden transition-all duration-300"
    role="presentation"
  >
    <div :class="{ 'p-4 md:p-6': padding }" class="flex flex-col h-full">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* ── Glass variant ─────────────────────────────── */
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

/* ── Solid variant ─────────────────────────────── */
.solid-card {
  background: var(--card-bg, var(--color-surface-1));
  border: 1px solid var(--card-border, var(--color-border));
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04);
}

/* ── Outlined variant ──────────────────────────── */
.outlined-card {
  background: transparent;
  border: 1px solid var(--card-border, var(--color-border));
  box-shadow: none;
}

/* ── Elevated ──────────────────────────────────── */
.card-elevated {
  box-shadow: var(--glass-shadow-elevated, 0 16px 48px rgba(0, 0, 0, 0.15)),
    0 0 40px rgba(64, 150, 255, 0.1);
}

/* ── Gradient border ───────────────────────────── */
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

/* ── Hover states ──────────────────────────────── */
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12),
    0 0 30px rgba(64, 150, 255, 0.1);
}

.hover-glow:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 40px rgba(64, 150, 255, 0.25);
}

/* ── Accessibility ─────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .glass-card,
  .solid-card,
  .outlined-card {
    transition: none;
  }

  .hover-lift:hover {
    transform: none;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .glass-card {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: var(--color-surface-1);
  }
}
</style>
