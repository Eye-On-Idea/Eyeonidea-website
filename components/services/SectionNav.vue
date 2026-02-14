<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
// Always visible — uses position:sticky to snap below header on scroll

const { t } = useI18n();

// Section definitions — order matches page layout
const sections = computed(() => [
  {
    id: "packages-section",
    label: t("services.packages.badge"),
    icon: "i-heroicons-cube",
  },
  {
    id: "comparison-section",
    label: t("services.comparison.badge"),
    icon: "i-heroicons-table-cells",
  },
  {
    id: "addons-section",
    label: t("services.addons.badge"),
    icon: "i-heroicons-puzzle-piece",
  },
  {
    id: "identity-section",
    label: t("services.identity.badge"),
    icon: "i-heroicons-paint-brush",
  },
  {
    id: "cms-section",
    label: t("services.cms.badge"),
    icon: "i-heroicons-square-3-stack-3d",
  },
  {
    id: "support-plans",
    label: t("services.support.badge"),
    icon: "i-heroicons-shield-check",
  },
  {
    id: "how-we-work-section",
    label: t("services.howWeWork.badge"),
    icon: "i-heroicons-arrow-path",
  },
]);

const activeId = ref<string | null>(null);
const navRef = ref<HTMLElement | null>(null);
const scrollContainerRef = ref<HTMLElement | null>(null);
const pillStyle = ref({ left: "0px", width: "0px" });
const isScrolling = ref(false);

let sectionObservers: IntersectionObserver | null = null;

const updatePill = () => {
  if (!activeId.value || !navRef.value) return;
  const activeButton = navRef.value.querySelector<HTMLElement>(
    `[data-section="${activeId.value}"]`,
  );
  if (!activeButton || !scrollContainerRef.value) return;

  const containerRect = scrollContainerRef.value.getBoundingClientRect();
  const buttonRect = activeButton.getBoundingClientRect();

  pillStyle.value = {
    left: `${buttonRect.left - containerRect.left + scrollContainerRef.value.scrollLeft}px`,
    width: `${buttonRect.width}px`,
  };

  // Scroll active item into view on mobile
  activeButton.scrollIntoView({
    inline: "center",
    block: "nearest",
    behavior: "smooth",
  });
};

watch(activeId, () => {
  nextTick(updatePill);
});

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  isScrolling.value = true;
  activeId.value = sectionId;

  element.scrollIntoView({ behavior: "smooth", block: "start" });

  // Re-enable observer-based tracking after scroll settles
  setTimeout(() => {
    isScrolling.value = false;
  }, 1000);
};

const handleKeydown = (event: KeyboardEvent, index: number) => {
  const items = navRef.value?.querySelectorAll<HTMLElement>('[role="tab"]');
  if (!items) return;

  let targetIndex = -1;

  switch (event.key) {
    case "ArrowRight":
      event.preventDefault();
      targetIndex = (index + 1) % items.length;
      break;
    case "ArrowLeft":
      event.preventDefault();
      targetIndex = (index - 1 + items.length) % items.length;
      break;
    case "Home":
      event.preventDefault();
      targetIndex = 0;
      break;
    case "End":
      event.preventDefault();
      targetIndex = items.length - 1;
      break;
  }

  if (targetIndex >= 0) {
    items[targetIndex].focus();
  }
};

onMounted(() => {
  // Observe each section for active tracking
  sectionObservers = new IntersectionObserver(
    (entries) => {
      if (isScrolling.value) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      });
    },
    {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    },
  );

  sections.value.forEach((section) => {
    const el = document.getElementById(section.id);
    if (el) sectionObservers!.observe(el);
  });

  // Update pill position on resize
  window.addEventListener("resize", updatePill);
});

onUnmounted(() => {
  sectionObservers?.disconnect();
  window.removeEventListener("resize", updatePill);
});
</script>

<template>
  <nav
    ref="navRef"
    class="section-nav"
    role="navigation"
    :aria-label="t('services.hero.badge')"
  >
    <div class="section-nav__container">
      <div
        ref="scrollContainerRef"
        class="section-nav__scroll"
        role="tablist"
        :aria-label="t('services.hero.badge')"
      >
        <!-- Animated pill indicator -->
        <span class="section-nav__pill" :style="pillStyle" aria-hidden="true" />

        <button
          v-for="(section, index) in sections"
          :key="section.id"
          type="button"
          role="tab"
          :data-section="section.id"
          :aria-selected="activeId === section.id"
          :aria-current="activeId === section.id ? 'location' : undefined"
          :tabindex="activeId === section.id ? 0 : -1"
          class="section-nav__item"
          :class="{ 'section-nav__item--active': activeId === section.id }"
          @click="scrollToSection(section.id)"
          @keydown="handleKeydown($event, index)"
        >
          <UIcon
            :name="section.icon"
            class="section-nav__icon"
            aria-hidden="true"
          />
          <span class="section-nav__label">{{ section.label }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.section-nav {
  position: sticky;
  top: 60px; /* Below UHeader + progress bar */
  z-index: 40;
  background: color-mix(in srgb, var(--color-surface-1) 85%, transparent);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid var(--glass-border-subtle);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
  padding-top: 16px;
}

.section-nav__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-nav__scroll {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 8px 0;
}

.section-nav__scroll::-webkit-scrollbar {
  display: none;
}

/* Animated pill indicator */
.section-nav__pill {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: calc(100% - 12px);
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-primary-500) 15%, transparent),
    color-mix(in srgb, var(--color-accent-500) 15%, transparent)
  );
  border: 1px solid
    color-mix(in srgb, var(--color-primary-500) 20%, transparent);
  transition:
    left 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 0;
}

/* Nav items */
.section-nav__item {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  min-height: 40px;
  white-space: nowrap;
  border: none;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  transition:
    color var(--duration-fast) var(--ease-smooth),
    transform var(--duration-fast) var(--ease-smooth);
  flex-shrink: 0;
}

.section-nav__item:hover {
  color: var(--color-text-primary);
}

.section-nav__item:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: -2px;
}

.section-nav__icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-tertiary);
  transition: color var(--duration-fast) var(--ease-smooth);
  flex-shrink: 0;
}

.section-nav__label {
  font-family: var(--font-text);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: color var(--duration-fast) var(--ease-smooth);
}

/* Active state */
.section-nav__item--active .section-nav__icon {
  color: var(--color-primary-600);
}

.section-nav__item--active .section-nav__label {
  color: var(--color-text-primary);
  font-weight: 700;
}

/* Hover on non-active */
.section-nav__item:not(.section-nav__item--active):hover .section-nav__icon {
  color: var(--color-text-secondary);
}

.section-nav__item:not(.section-nav__item--active):hover .section-nav__label {
  color: var(--color-text-primary);
}

/* ── Dark mode ── */
html.dark .section-nav {
  background: color-mix(in srgb, var(--color-surface-1) 90%, transparent);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.15);
}

html.dark .section-nav__pill {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-primary-400) 18%, transparent),
    color-mix(in srgb, var(--color-accent-400) 18%, transparent)
  );
  border-color: color-mix(in srgb, var(--color-primary-400) 25%, transparent);
}

html.dark .section-nav__item--active .section-nav__icon {
  color: var(--color-primary-300);
}

/* ── Responsive ── */
@media (min-width: 640px) {
  .section-nav__container {
    padding: 0 1.5rem;
  }

  .section-nav__item {
    padding: 8px 16px;
  }
}

@media (min-width: 1024px) {
  .section-nav__scroll {
    justify-content: center;
    gap: 4px;
  }

  .section-nav__container {
    padding: 0 2rem;
  }
}

/* Fade edges on mobile for scroll hint */
@media (max-width: 1023px) {
  .section-nav__container {
    position: relative;
  }

  .section-nav__container::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 32px;
    background: linear-gradient(
      to right,
      transparent,
      color-mix(in srgb, var(--color-surface-1) 85%, transparent)
    );
    pointer-events: none;
    z-index: 2;
  }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .section-nav__pill,
  .section-nav__item,
  .section-nav__icon,
  .section-nav__label {
    transition: none;
  }
}

/* ── Reduced transparency ── */
@media (prefers-reduced-transparency: reduce) {
  .section-nav {
    background: var(--color-surface-1);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>
