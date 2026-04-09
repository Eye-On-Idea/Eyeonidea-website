<script setup lang="ts">

const props = withDefaults(defineProps<{
  variant?: "primary" | "secondary";
  to?: string;
  showIcon?: boolean;
  type?: "button" | "submit" | "reset";
}>(), {
  variant: "primary",
  showIcon: false,
  type: "button",
});
</script>

<template>
  <NuxtLink
    v-if="props.to"
    :to="props.to"
    class="app-cta"
    :class="`app-cta--${props.variant}`"
  >
    <slot />
    <UIcon
      v-if="props.showIcon && props.variant === 'primary'"
      name="i-heroicons-arrow-right-20-solid"
      class="app-cta-icon"
    />
  </NuxtLink>
  <button
    v-else
    class="app-cta"
    :class="`app-cta--${props.variant}`"
    :type="props.type"
  >
    <slot />
    <UIcon
      v-if="props.showIcon && props.variant === 'primary'"
      name="i-heroicons-arrow-right-20-solid"
      class="app-cta-icon"
    />
  </button>
</template>

<style lang="scss" scoped>

.app-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.75rem 2rem;
  min-width: 10rem;
  border-radius: 100px;
  font-family: var(--font-heading);
  font-style: normal;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  border: none;

  transition:
    background   0.3s ease,
    border-color 0.3s ease,
    box-shadow   0.3s ease,
    color        0.3s ease,
    transform    0.25s var(--ease-smooth, cubic-bezier(0.22, 1, 0.36, 1));

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.8);
    outline-offset: 4px;
  }
}

.app-cta--primary {
  border: 1px solid rgba(223, 175, 133, 0.60);
  background: linear-gradient(
    156deg,
    rgba(223, 175, 133, 0.22) 0%,
    rgba(255, 237, 223, 0.10) 50%,
    rgba(223, 175, 133, 0.22) 100%
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #ffeddf;

  &:hover {
    background: linear-gradient(
      156deg,
      rgba(223, 175, 133, 0.35) 0%,
      rgba(255, 237, 223, 0.16) 50%,
      rgba(223, 175, 133, 0.35) 100%
    );
    border-color: rgba(223, 175, 133, 0.85);
    box-shadow: 0 8px 28px rgba(223, 175, 133, 0.18);
    transform: translateY(-2px);
  }
}

.app-cta--secondary {
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: rgba(255, 237, 223, 0.75);
  padding: 0.75rem 1.75rem;
  min-width: 9rem;

  &:hover {
    border-color: rgba(255, 255, 255, 0.35);
    color: #ffeddf;
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }
}

.app-cta-icon {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  .app-cta--primary:hover & {
    transform: translateX(3px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-cta:hover {
    transform: none;
  }

  .app-cta-icon {
    transition: none;
  }
}

html:not(.dark) {
  .app-cta--primary {
    border-color: rgba(153, 82, 38, 0.55);
    background: linear-gradient(
      156deg,
      rgba(153, 82, 38, 0.14) 0%,
      rgba(153, 82, 38, 0.06) 50%,
      rgba(153, 82, 38, 0.14) 100%
    );
    color: var(--color-primary-800);

    &:hover {
      background: linear-gradient(
        156deg,
        rgba(153, 82, 38, 0.22) 0%,
        rgba(153, 82, 38, 0.10) 50%,
        rgba(153, 82, 38, 0.22) 100%
      );
      border-color: rgba(153, 82, 38, 0.75);
      box-shadow: 0 8px 28px rgba(153, 82, 38, 0.15);
    }

    &:focus-visible { outline-color: rgba(153, 82, 38, 0.7); }
  }

  .app-cta--secondary {
    border-color: rgba(153, 82, 38, 0.28);
    color: var(--color-primary-700);

    &:hover {
      border-color: rgba(153, 82, 38, 0.5);
      color: var(--color-primary-800);
      background: rgba(153, 82, 38, 0.06);
    }

    &:focus-visible { outline-color: rgba(153, 82, 38, 0.7); }
  }
}
</style>
