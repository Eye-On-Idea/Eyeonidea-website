<script lang="ts" setup>
import { nextTick } from "vue";

const colorMode = useColorMode();
const { t } = useI18n();
const buttonRef = ref<HTMLButtonElement | null>(null);

const isDark = computed(() => colorMode.value === "dark");

/**
 * Toggle color mode with View Transitions API animation
 * Creates an expanding circle effect from the toggle button
 */
const toggleColorMode = async (event: MouseEvent) => {
  // Check for View Transitions API support and reduced motion preference
  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const supportsViewTransitions =
    "startViewTransition" in document && !isReducedMotion;

  // Capture the current state BEFORE toggling
  const isCurrentlyDark = isDark.value;

  // Fallback for browsers without View Transitions API
  if (!supportsViewTransitions) {
    colorMode.preference = isCurrentlyDark ? "light" : "dark";
    return;
  }

  // Get the click position (center of button)
  const button = buttonRef.value;
  const rect = button?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : event.clientX;
  const y = rect ? rect.top + rect.height / 2 : event.clientY;

  // Calculate the maximum radius needed to cover the entire screen
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  // Start the view transition
  const transition = (document as any).startViewTransition(async () => {
    colorMode.preference = isCurrentlyDark ? "light" : "dark";
    await nextTick();
  });

  // Wait for the transition to be ready
  await transition.ready;

  // Animate the old view shrinking to reveal the new view underneath
  // This works for both directions since old is always on top (z-index: 9999)
  const animation = document.documentElement.animate(
    {
      clipPath: [
        `circle(${maxRadius}px at ${x}px ${y}px)`,
        `circle(0px at ${x}px ${y}px)`,
      ],
    },
    {
      duration: 500,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  // Wait for animation to complete to prevent flash at end
  await animation.finished;
};

const currentIcon = computed(() =>
  isDark.value ? "i-lucide-moon" : "i-lucide-sun",
);

const currentLabel = computed(() =>
  isDark.value ? t("common.colorMode.dark") : t("common.colorMode.light"),
);
</script>

<template>
  <button
    ref="buttonRef"
    @click="toggleColorMode"
    class="touch-target p-2.5 hover:bg-primary-800/10! dark:hover:bg-(--color-surface-3) rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer group"
    :aria-label="t('common.accessibility.toggleColorMode')"
    :title="currentLabel"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      enter-from-class="opacity-0 rotate-[-90deg] scale-50"
      enter-to-class="opacity-100 rotate-0 scale-100"
      leave-from-class="opacity-100 rotate-0 scale-100"
      leave-to-class="opacity-0 rotate-90 scale-50"
    >
      <UIcon
        :key="currentIcon"
        :name="currentIcon"
        class="w-5 h-5 bg-primary-50 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
      />
    </Transition>
  </button>
</template>
