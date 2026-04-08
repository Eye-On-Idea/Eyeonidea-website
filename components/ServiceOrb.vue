<script setup lang="ts">
const { t } = useI18n();

// All orbs use 'circle' shape for visual consistency.
// Positions are percentages [x, y] of the component container.
//
// 6 orbs placed at 60° intervals on the outer orbit ring.
// Ring radius = 168 / 180 = 93.3% of half-container = 46.67% of full container.
// Center = (50%, 50%). Angle 0° = top, clockwise.
// x_i = 50 + 46.67 * cos(-90° + i*60°)
// y_i = 50 + 46.67 * sin(-90° + i*60°)
const services = [
  { key: "qa",       icon: "i-heroicons-shield-check",            href: "/solutions/additional-services#qa",      x: 50.0, y: 3.3  },  // 0° — top
  { key: "websites", icon: "i-heroicons-globe-alt",               href: "/solutions/website-packages",            x: 90.4, y: 26.7 },  // 60° — top-right
  { key: "identity", icon: "i-heroicons-paint-brush",             href: "/solutions/visual-identity",             x: 90.4, y: 73.3 },  // 120° — bottom-right
  { key: "content",  icon: "i-heroicons-pencil-square",           href: "/solutions/additional-services#content", x: 50.0, y: 96.7 },  // 180° — bottom
  { key: "seo",      icon: "i-heroicons-magnifying-glass-circle", href: "/solutions/additional-services#seo",     x: 9.6,  y: 73.3 },  // 240° — bottom-left
  { key: "email",    icon: "i-heroicons-envelope",                href: "/solutions/additional-services#email",   x: 9.6,  y: 26.7 },  // 300° — top-left
] as const;

type ServiceKey = typeof services[number]["key"];

const hoveredKey = ref<ServiceKey | null>(null);

const isActive = (key: ServiceKey) => hoveredKey.value === key;
const isDimmed  = (key: ServiceKey) => hoveredKey.value !== null && hoveredKey.value !== key;

// Scale font size based on character count of the active locale string.
// Range: 50 chars → 3.4cqmin (short/large), 105 chars → 2.4cqmin (long/small).
const descFontSize = computed(() => {
  if (!hoveredKey.value) return '2.9cqmin';
  const text = t(`landing.services.categories.${hoveredKey.value}.need`);
  const len = text.length;
  const size = Math.max(2.4, Math.min(3.4, 3.4 - (len - 50) * (1 / 55)));
  return `${size.toFixed(2)}cqmin`;
});
</script>

<template>
  <div
    class="orb-root"
    role="group"
    :aria-label="t('landing.hero.orbLabel')"
  >
    <!-- ── Decorative orbit rings ───────────────────────────────────── -->
    <svg
      class="orbit-svg"
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="180" cy="180" r="168" stroke="#dfaf85" stroke-opacity="0.14" stroke-width="1" stroke-dasharray="3 10" />
      <circle cx="180" cy="180" r="106" stroke="#dfaf85" stroke-opacity="0.09" stroke-width="1" stroke-dasharray="3 10" />
    </svg>

    <!-- ── Morphing center piece ────────────────────────────────────── -->
    <div
      class="center-shell"
      :class="{ 'is-circle': hoveredKey !== null }"
      aria-hidden="true"
    >
      <div class="center-ornament" />
      <div class="center-body" :class="{ 'is-unrotated': hoveredKey !== null }">
        <Transition name="content-cross" mode="out-in">
          <div v-if="hoveredKey === null" class="jewel-view" key="jewel">
            <div class="jewel-ring" />
            <div class="jewel-dot" />
          </div>
          <div v-else class="service-view" :key="hoveredKey">
            <span class="service-view__title">
              {{ t(`landing.services.categories.${hoveredKey}.title`) }}
            </span>
            <p class="service-view__desc" :style="{ fontSize: descFontSize }">
              {{ t(`landing.services.categories.${hoveredKey}.need`) }}
            </p>
          </div>
        </Transition>
      </div>
    </div>

    <!-- ── Service orbs — all circles ───────────────────────────────── -->
    <!--
      .orb-track rotates clockwise around the center.
      .orb-counter inside each orb counter-rotates at the same speed
      so icons always face upright regardless of orbit position.
    -->
    <div class="orb-track" :class="{ 'is-paused': hoveredKey !== null }">
      <div
        v-for="svc in services"
        :key="svc.key"
        class="orb"
        :class="{ 'orb--active': isActive(svc.key), 'orb--dim': isDimmed(svc.key) }"
        :style="{ left: `${svc.x}%`, top: `${svc.y}%` }"
        :aria-label="t(`landing.services.categories.${svc.key}.title`)"
        @mouseenter="hoveredKey = svc.key"
        @mouseleave="hoveredKey = null"
      >
        <span class="orb-counter">
          <UIcon :name="svc.icon" class="orb-icon" />
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/*
 * All internal sizes are expressed in `cqmin` (container-query min unit).
 * cqmin = min(container-width, container-height).
 * Because .orb-root always has aspect-ratio: 1, cqmin === container-width.
 * This makes every element scale proportionally as the parent resizes.
 *
 * Reference base: 340px (original design size).
 * Formula: value_px / 340 * 100 = value_cqmin
 */

/* ── Root container ────────────────────────────────────────────── */
.orb-root {
  /* Fill the parent column; parent controls the max size */
  position: relative;
  width: 100%;
  aspect-ratio: 1;

  /* Establish a container-query context so children can use cqmin */
  container-type: size;
}

/* ── Orbit rings SVG ───────────────────────────────────────────── */
.orbit-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  animation: orbitSpin 60s linear infinite;
}

@keyframes orbitSpin {
  to { transform: rotate(360deg); }
}

/* ── Center morphing shell ─────────────────────────────────────── */
/* 168 / 340 = 49.4 → 49cqmin  |  active: 186 / 340 = 54.7 → 55cqmin */
.center-shell {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 49cqmin;
  height: 49cqmin;
  transform: translate(-50%, -50%) rotate(45deg);

  background: linear-gradient(
    156deg,
    rgba(223, 175, 133, 0.18) 0%,
    rgba(255, 237, 223, 0.07) 50%,
    rgba(223, 175, 133, 0.18) 100%
  );
  border: 1px solid rgba(223, 175, 133, 0.50);
  backdrop-filter: blur(16px) saturate(130%);
  -webkit-backdrop-filter: blur(16px) saturate(130%);
  box-shadow:
    inset 0 1px 0 rgba(255, 237, 223, 0.10),
    0 0 36px rgba(223, 175, 133, 0.07);

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    border-radius 0.60s var(--ease-smooth),
    transform     0.60s var(--ease-smooth),
    width         0.60s var(--ease-smooth),
    height        0.60s var(--ease-smooth),
    background    0.45s ease,
    border-color  0.40s ease,
    box-shadow    0.45s ease;

  &.is-circle {
    border-radius: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    width: 55cqmin;
    height: 55cqmin;
    background: linear-gradient(
      156deg,
      rgba(223, 175, 133, 0.28) 0%,
      rgba(255, 237, 223, 0.12) 50%,
      rgba(223, 175, 133, 0.28) 100%
    );
    border-color: rgba(223, 175, 133, 0.75);
    box-shadow:
      inset 0 1px 0 rgba(255, 237, 223, 0.18),
      0 0 48px rgba(223, 175, 133, 0.18),
      0 0 80px rgba(223, 175, 133, 0.07);
  }
}

/* ── Inner ornamental diamond border ──────────────────────────── */
/* inset is already %, stays proportional automatically */
.center-ornament {
  position: absolute;
  inset: 18%;
  border: 1px solid rgba(223, 175, 133, 0.28);
  transition: opacity 0.35s ease, border-color 0.35s ease;
  pointer-events: none;

  .is-circle & {
    opacity: 0;
  }
}

/* ── Counter-rotating content wrapper ─────────────────────────── */
.center-body {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-45deg);
  transition: transform 0.60s var(--ease-smooth);

  &.is-unrotated {
    transform: rotate(0deg);
  }
}

/* ── Default jewel graphic ─────────────────────────────────────── */
.jewel-view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
}

/* inset 22% scales automatically with the shell */
.jewel-ring {
  position: absolute;
  inset: 22%;
  border-radius: 50%;
  border: 1px solid rgba(223, 175, 133, 0.22);
}

/* 32 / 340 = 9.4 → 9.5cqmin */
.jewel-dot {
  width: 9.5cqmin;
  height: 9.5cqmin;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(223, 175, 133, 0.65) 0%,
    rgba(223, 175, 133, 0.20) 70%,
    transparent 100%
  );
  border: 1px solid rgba(223, 175, 133, 0.45);
  box-shadow: 0 0 24px rgba(223, 175, 133, 0.24);
}

/* ── Hover service info ────────────────────────────────────────── */
/* padding 12px/16px → 3.5/4.7cqmin  |  gap 7px → 2cqmin */
.service-view {
  padding: 3.5cqmin 4.7cqmin;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2cqmin;
  width: 100%;
  overflow: hidden;
}

/* 14px / 340 = 4.1 → 4cqmin */
.service-view__title {
  font-family: var(--font-heading);
  font-size: 4cqmin;
  font-weight: 600;
  font-style: normal;
  color: #ffeddf;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: block;
}

/* font-size is set dynamically via :style binding based on string length */
.service-view__desc {
  font-family: var(--font-text);
  font-weight: 300;
  color: rgba(223, 175, 133, 0.82);
  line-height: 1.4;
  margin: 0;
}

/* ── Orbiting track ────────────────────────────────────────────── */
/* Fills the root and rotates all orbs around the center together  */
.orb-track {
  position: absolute;
  inset: 0;
  animation: trackSpin 55s linear infinite;
  transform-origin: 50% 50%;

  /* Pause both track and all counter-spinners on any orb hover */
  &.is-paused {
    animation-play-state: paused;

    .orb-counter {
      animation-play-state: paused;
    }
  }
}

@keyframes trackSpin {
  to { transform: rotate(360deg); }
}

/* ── Service orbs (all circles) ────────────────────────────────── */
/* 46px / 340 = 13.5cqmin */
.orb {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 13.5cqmin;
  height: 13.5cqmin;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;

  background: rgba(223, 175, 133, 0.14);
  border: 1px solid rgba(223, 175, 133, 0.38);
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);

  transition:
    transform     0.30s var(--ease-smooth),
    opacity       0.25s ease,
    border-color  0.25s ease,
    background    0.25s ease,
    box-shadow    0.30s ease;

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.8);
    outline-offset: 3px;
  }

  &--active {
    background: rgba(223, 175, 133, 0.32);
    border-color: rgba(223, 175, 133, 0.82);
    box-shadow: 0 0 20px rgba(223, 175, 133, 0.28);
    transform: translate(-50%, -50%) scale(1.18);
  }

  &--dim {
    opacity: 0.38;
  }
}

/* Counter-rotation wrapper — keeps icons upright while track orbits */
.orb-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  animation: counterSpin 55s linear infinite;
  transform-origin: center;
}

@keyframes counterSpin {
  to { transform: rotate(-360deg); }
}

/* 20px / 340 = 5.9 → 6cqmin */
.orb-icon {
  width: 6cqmin;
  height: 6cqmin;
  color: rgba(223, 175, 133, 0.85);
  flex-shrink: 0;
  transition: color 0.25s ease;

  .orb--active & {
    color: #ffeddf;
  }
}

/* ── Content crossfade ─────────────────────────────────────────── */
.content-cross-enter-active {
  transition: opacity 0.22s ease 0.12s;
}
.content-cross-leave-active {
  transition: opacity 0.15s ease;
}
.content-cross-enter-from,
.content-cross-leave-to {
  opacity: 0;
}

/* ── Reduced motion ────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .center-shell,
  .center-body,
  .orb {
    transition: none;
  }

  .orbit-svg,
  .orb-track,
  .orb-counter {
    animation: none;
  }

  .content-cross-enter-active,
  .content-cross-leave-active {
    transition: none;
  }
}
</style>
