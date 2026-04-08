<script setup lang="ts">
const { t } = useI18n();

// Hero section is always dark — no color mode observation needed.

const services = [
  {
    key: "qa",
    icon: "i-heroicons-shield-check",
    shape: "diamond" as const,
    x: 50,
    y: 3,
  },
  {
    key: "websites",
    icon: "i-heroicons-globe-alt",
    shape: "circle" as const,
    x: 86,
    y: 18,
  },
  {
    key: "identity",
    icon: "i-heroicons-paint-brush",
    shape: "diamond" as const,
    x: 88,
    y: 80,
  },
  {
    key: "content",
    icon: "i-heroicons-pencil-square",
    shape: "circle" as const,
    x: 50,
    y: 97,
  },
  {
    key: "seo",
    icon: "i-heroicons-magnifying-glass-circle",
    shape: "diamond" as const,
    x: 12,
    y: 80,
  },
  {
    key: "email",
    icon: "i-heroicons-envelope",
    shape: "circle" as const,
    x: 14,
    y: 18,
  },
] as const;

type ServiceKey = (typeof services)[number]["key"];

const hoveredKey = ref<ServiceKey | null>(null);

const isActive = (key: ServiceKey) => hoveredKey.value === key;
const isDimmed = (key: ServiceKey) =>
  hoveredKey.value !== null && hoveredKey.value !== key;

// Desktop: hover in/out
const onEnter = (key: ServiceKey) => {
  hoveredKey.value = key;
};
const onLeave = () => {
  hoveredKey.value = null;
};

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
      <!-- Outer dashed ring — sits at the orb radius -->
      <circle
        cx="180"
        cy="180"
        r="168"
        stroke="#dfaf85"
        stroke-opacity="0.14"
        stroke-width="1"
        stroke-dasharray="3 10"
      />
      <!-- Inner dashed ring — tighter, around the center piece -->
      <circle
        cx="180"
        cy="180"
        r="106"
        stroke="#dfaf85"
        stroke-opacity="0.09"
        stroke-width="1"
        stroke-dasharray="3 10"
      />
    </svg>

    <!-- ── Morphing center piece ────────────────────────────────────── -->
    <!--
      Default: rotated 45° square (diamond).
      Hover: border-radius → 50% + rotation unwound → circle.
      Content inside is counter-rotated so it stays upright while the
      shell is a diamond, then the counter-rotation eases back to 0°
      as it becomes a circle.
    -->
    <div
      class="center-shell"
      :class="{ 'is-circle': hoveredKey !== null }"
      aria-hidden="true"
    >
      <!-- Ornamental inner diamond border — fades out when circle -->
      <div class="center-ornament" />

      <!-- Counter-rotating content wrapper -->
      <div class="center-body" :class="{ 'is-unrotated': hoveredKey !== null }">
        <Transition name="content-cross" mode="out-in">
          <!-- Default state: jewel graphic -->
          <div v-if="hoveredKey === null" class="jewel-view" key="jewel">
            <div class="jewel-ring" />
            <div class="jewel-dot" />
          </div>

          <!-- Hovered state: service name + short note -->
          <div v-else class="service-view" :key="hoveredKey">
            <span class="service-view__title">
              {{ t(`landing.services.categories.${hoveredKey}.title`) }}
            </span>
            <p class="service-view__desc">
              {{ t(`landing.services.categories.${hoveredKey}.orbNote`) }}
            </p>
          </div>
        </Transition>
      </div>
    </div>

    <!-- ── Service orbs ─────────────────────────────────────────────── -->
    <button
      v-for="svc in services"
      :key="svc.key"
      type="button"
      class="orb"
      :class="[
        `orb--${svc.shape}`,
        { 'orb--active': isActive(svc.key), 'orb--dim': isDimmed(svc.key) },
      ]"
      :style="{ left: `${svc.x}%`, top: `${svc.y}%` }"
      :aria-label="t(`landing.services.categories.${svc.key}.title`)"
      @mouseenter="onEnter(svc.key)"
      @mouseleave="onLeave()"
    >
      <UIcon :name="svc.icon" class="orb-icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
/* ── Root container ────────────────────────────────────────────── */
.orb-root {
  position: relative;
  width: 340px;
  height: 340px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 260px;
    height: 260px;
  }
}

/* ── Orbit rings SVG ───────────────────────────────────────────── */
.orbit-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  animation: orbitSpin 180s linear infinite;
}

@keyframes orbitSpin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Center morphing shell ─────────────────────────────────────── */
.center-shell {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140px;
  height: 140px;
  transform: translate(-50%, -50%) rotate(45deg);

  background: linear-gradient(
    156deg,
    rgba(223, 175, 133, 0.18) 0%,
    rgba(255, 237, 223, 0.07) 50%,
    rgba(223, 175, 133, 0.18) 100%
  );
  border: 1px solid rgba(223, 175, 133, 0.5);
  backdrop-filter: blur(16px) saturate(130%);
  -webkit-backdrop-filter: blur(16px) saturate(130%);
  box-shadow:
    inset 0 1px 0 rgba(255, 237, 223, 0.1),
    0 0 36px rgba(223, 175, 133, 0.07);

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    border-radius 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth),
    width 0.6s var(--ease-smooth),
    height 0.6s var(--ease-smooth),
    background 0.45s ease,
    border-color 0.4s ease,
    box-shadow 0.45s ease;

  &.is-circle {
    border-radius: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    width: 154px;
    height: 154px;
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
.center-ornament {
  position: absolute;
  inset: 18%;
  border: 1px solid rgba(223, 175, 133, 0.28);
  transition:
    opacity 0.35s ease,
    border-color 0.35s ease;
  pointer-events: none;

  .is-circle & {
    opacity: 0;
  }
}

/* ── Counter-rotating content wrapper ─────────────────────────── */
/* Keeps text upright while shell is rotated as a diamond.        */
.center-body {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-45deg);
  transition: transform 0.6s var(--ease-smooth);

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

.jewel-ring {
  position: absolute;
  inset: 22%;
  border-radius: 50%;
  border: 1px solid rgba(223, 175, 133, 0.22);
}

.jewel-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(223, 175, 133, 0.65) 0%,
    rgba(223, 175, 133, 0.2) 70%,
    transparent 100%
  );
  border: 1px solid rgba(223, 175, 133, 0.45);
  box-shadow: 0 0 18px rgba(223, 175, 133, 0.2);
}

/* ── Hover service info ────────────────────────────────────────── */
.service-view {
  padding: 10px 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
}

.service-view__title {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  color: #ffeddf;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: block;
}

.service-view__desc {
  font-family: var(--font-text);
  font-size: 9.5px;
  font-weight: 300;
  color: rgba(223, 175, 133, 0.82);
  line-height: 1.45;
  margin: 0;
}

/* ── Service orbs ─────────────────────────────────────────────── */
.orb {
  position: absolute;
  /* Centred on its x/y percentage anchor */
  transform: translate(-50%, -50%);
  width: 38px;
  height: 38px;

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
    transform 0.3s var(--ease-smooth),
    opacity 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.3s ease;

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.8);
    outline-offset: 3px;
  }

  /* Circle orb */
  &--circle {
    border-radius: 50%;
  }

  /* Diamond orb — rotated so the icon stays upright via counter-rotation */
  &--diamond {
    border-radius: 4px;
    transform: translate(-50%, -50%) rotate(45deg);

    .orb-icon {
      transform: rotate(-45deg);
    }
  }

  /* Active (hovered) state */
  &--active {
    background: rgba(223, 175, 133, 0.32);
    border-color: rgba(223, 175, 133, 0.82);
    box-shadow: 0 0 20px rgba(223, 175, 133, 0.28);
  }

  &--circle.orb--active {
    transform: translate(-50%, -50%) scale(1.18);
  }

  &--diamond.orb--active {
    transform: translate(-50%, -50%) rotate(45deg) scale(1.18);
  }

  /* Dimmed — another orb is active */
  &--dim {
    opacity: 0.38;
  }
}

.orb-icon {
  width: 16px;
  height: 16px;
  color: rgba(223, 175, 133, 0.85);
  flex-shrink: 0;
  transition: color 0.25s ease;

  .orb--active & {
    color: #ffeddf;
  }
}

/* ── Content crossfade ─────────────────────────────────────────── */
.content-cross-enter-active {
  transition: opacity 0.22s ease 0.12s; /* slight delay = shell finishes rotating first */
}
.content-cross-leave-active {
  transition: opacity 0.15s ease;
}
.content-cross-enter-from,
.content-cross-leave-to {
  opacity: 0;
}

/* Light-mode colors are handled entirely via Vue :style bindings in the template.
   The inline bindings directly observe html.dark class and bypass CSS cascade. */

/* ── Reduced motion ────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .center-shell,
  .center-body,
  .orb {
    transition: none;
  }

  .orbit-svg {
    animation: none;
  }

  .content-cross-enter-active,
  .content-cross-leave-active {
    transition: none;
  }
}
</style>
