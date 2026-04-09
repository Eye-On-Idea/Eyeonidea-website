<script setup lang="ts">
const { t } = useI18n();

const services = [
  { key: "qa",       icon: "i-heroicons-shield-check",            href: "/solutions/additional-services#qa",      x: 50.0, y: 3.3  },
  { key: "websites", icon: "i-heroicons-globe-alt",               href: "/solutions/website-packages",            x: 90.4, y: 26.7 },
  { key: "identity", icon: "i-heroicons-paint-brush",             href: "/solutions/visual-identity",             x: 90.4, y: 73.3 },
  { key: "content",  icon: "i-heroicons-pencil-square",           href: "/solutions/additional-services#content", x: 50.0, y: 96.7 },
  { key: "seo",      icon: "i-heroicons-magnifying-glass-circle", href: "/solutions/additional-services#seo",     x: 9.6,  y: 73.3 },
  { key: "email",    icon: "i-heroicons-envelope",                href: "/solutions/additional-services#email",   x: 9.6,  y: 26.7 },
] as const;

type ServiceKey = typeof services[number]["key"];

const hoveredKey = ref<ServiceKey | null>(null);

const isActive = (key: ServiceKey) => hoveredKey.value === key;
const isDimmed  = (key: ServiceKey) => hoveredKey.value !== null && hoveredKey.value !== key;

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

    <div class="orb-track" :class="{ 'is-paused': hoveredKey !== null }">
      <button
        v-for="svc in services"
        :key="svc.key"
        type="button"
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
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.orb-root {

  position: relative;
  width: 100%;
  aspect-ratio: 1;

  container-type: size;
}

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

.service-view__desc {
  font-family: var(--font-text);
  font-weight: 300;
  color: rgba(223, 175, 133, 0.82);
  line-height: 1.4;
  margin: 0;
}

.orb-track {
  position: absolute;
  inset: 0;
  animation: trackSpin 55s linear infinite;
  transform-origin: 50% 50%;

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
  appearance: none;
  padding: 0;

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
