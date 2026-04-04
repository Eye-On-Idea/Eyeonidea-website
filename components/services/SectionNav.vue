<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
// Always visible — uses position:sticky to snap below header on scroll

const { t } = useI18n();

export interface SectionNavItem {
  id: string;
  label: string;
  icon?: string;
}

const props = withDefaults(
  defineProps<{
    /** Override the default section list. Defaults to the full /solutions index sections. */
    sections?: SectionNavItem[];
    /** aria-label for the nav element */
    ariaLabel?: string;
  }>(),
  {
    sections: undefined,
    ariaLabel: undefined,
  },
);

// Default section definitions for /solutions index — order matches page layout
const defaultSections = computed<SectionNavItem[]>(() => [
  { id: "overview-websites", label: t("services.overview.nav.websites") },
  { id: "overview-identity", label: t("services.overview.nav.identity") },
  { id: "overview-additional", label: t("services.overview.nav.additional") },
  { id: "overview-support", label: t("services.overview.nav.support") },
  { id: "how-we-work-section", label: t("services.overview.nav.howWeWork") },
]);

const sections = computed<SectionNavItem[]>(
  () => props.sections ?? defaultSections.value,
);
const navAriaLabel = computed(
  () => props.ariaLabel ?? t("services.hero.badge"),
);

const activeId = ref<string | null>(null);
const navRef = ref<HTMLElement | null>(null);
const scrollContainerRef = ref<HTMLElement | null>(null);
const pillStyle = ref({ left: "0px", width: "0px" });
const isScrolling = ref(false);
const stickyTop = ref(0);

const measureHeaderBottom = () => {
  const header = document.querySelector<HTMLElement>(".header-main");
  if (header) {
    stickyTop.value = header.getBoundingClientRect().bottom;
  }
};

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

  // Account for header + this nav bar so the section isn't hidden behind them
  const navHeight = navRef.value?.offsetHeight ?? 0;
  const offset = stickyTop.value + navHeight;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });

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
    items[targetIndex]?.focus();
  }
};

onMounted(() => {
  // Measure header bottom so sticky nav snaps directly below the floating header
  nextTick(measureHeaderBottom);
  window.addEventListener("resize", measureHeaderBottom);

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
  window.removeEventListener("resize", measureHeaderBottom);
});
</script>

<template>
  <nav
    ref="navRef"
    class="section-nav"
    role="navigation"
    :aria-label="navAriaLabel"
    :style="stickyTop ? { top: `${stickyTop}px` } : undefined"
  >
    <div class="section-nav__container">
      <div
        ref="scrollContainerRef"
        class="section-nav__scroll"
        role="tablist"
        :aria-label="navAriaLabel"
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
          <span class="section-nav__label">{{ section.label }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* ── Outer wrapper — just handles sticky positioning ────────────── */
.section-nav {
  position: sticky;
  top: 0; /* overridden dynamically via inline style to match floating header bottom */
  z-index: 40;
  display: flex;
  justify-content: center;
  /*
   * Thin full-width backdrop so wide viewports don't expose the raw body
   * behind the left/right edges of the inner container.
   * The fixed html ambient gradient shows through here at the sides.
   */
  background: rgba(13, 9, 8, 0.45);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

/* ── Inner container — the pill extension that visually attaches to the header ── */
.section-nav__container {
  width: 90%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;

  /* Same glassmorphism background as the header */
  background: color-mix(in srgb, #0d0908 72%, transparent);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);

  /*
   * Amber ring matching the header:
   *   layer 1 — 1px amber border ring (same opacity as header's 0 0 0 1px)
   *   layer 2 — 3px outer amber glow  (same opacity as header's 0 0 0 3px)
   *   layer 3 — drop shadow
   * The top portion of the ring is hidden behind the header (z-index 50 > 40),
   * so only the sides and bottom of the ring are visible — a clean flush join.
   */
  box-shadow:
    0 0 0 1px rgba(223, 175, 133, 0.25),
    0 0 0 4px rgba(223, 175, 133, 0.07),
    0 6px 24px rgba(0, 0, 0, 0.35);

  /* Round the bottom corners to mirror the header pill */
  border-radius: 0 0 1.5rem 1.5rem;

  /* Clip nav content to the rounded corners */
  overflow: hidden;
}

/* ── Scroll track ────────────────────────────────────────────────── */
.section-nav__scroll {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  /* Top padding creates breathing room below the header bottom edge */
  padding: 6px 0 10px;
}

.section-nav__scroll::-webkit-scrollbar {
  display: none;
}

/* ── Active underline indicator ──────────────────────────────────── */
.section-nav__pill {
  position: absolute;
  bottom: 4px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(223, 175, 133, 0.75) 20%,
    rgba(223, 175, 133, 0.75) 80%,
    transparent 100%
  );
  transition:
    left 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 0;
  top: auto;
  transform: none;
  border-radius: 0;
  border: none;
}

/* ── Nav items ───────────────────────────────────────────────────── */
.section-nav__item {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  min-height: 44px;
  white-space: nowrap;
  border: none;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  transition: none;
  flex-shrink: 0;
}

.section-nav__item:focus-visible {
  outline: 2px solid rgba(223, 175, 133, 0.6);
  outline-offset: -2px;
  border-radius: 4px;
}

.section-nav__label {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.4);
  transition: color 0.2s ease;
}

.section-nav__item:hover .section-nav__label {
  color: rgba(223, 175, 133, 0.75);
}

/* Active state */
.section-nav__item--active .section-nav__label {
  color: #dfaf85;
}

/* ── Centred tabs on wide screens ─────────────────────────────── */
@media (min-width: 1024px) {
  .section-nav__scroll {
    justify-content: center;
  }
}

/* ── Right fade on mobile to hint overflow ──────────────────────── */
@media (max-width: 1023px) {
  .section-nav__container::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 3rem;
    /* Fade to match the container background */
    background: linear-gradient(to right, transparent, rgba(13, 9, 8, 0.85));
    pointer-events: none;
    z-index: 2;
    border-bottom-right-radius: 1.5rem;
  }
}

/* ── Reduced motion ──────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .section-nav__pill,
  .section-nav__label {
    transition: none;
  }
}

/* ── Reduced transparency ────────────────────────────────────────── */
@media (prefers-reduced-transparency: reduce) {
  .section-nav__container {
    background: #0d0908;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) .section-nav {
  background: rgba(250, 247, 244, 0.6);
}

html:not(.dark) .section-nav__container {
  background: color-mix(in srgb, #faf7f4 78%, transparent);
  box-shadow:
    0 0 0 1px rgba(153, 82, 38, 0.18),
    0 0 0 4px rgba(153, 82, 38, 0.05),
    0 6px 24px rgba(0, 0, 0, 0.08);
}

html:not(.dark) .section-nav__pill {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(153, 82, 38, 0.65) 20%,
    rgba(153, 82, 38, 0.65) 80%,
    transparent 100%
  );
}

html:not(.dark) .section-nav__label {
  color: rgba(153, 82, 38, 0.45);
}

html:not(.dark) .section-nav__item:hover .section-nav__label {
  color: rgba(153, 82, 38, 0.8);
}

html:not(.dark) .section-nav__item--active .section-nav__label {
  color: var(--color-primary-700);
}

html:not(.dark) .section-nav__item:focus-visible {
  outline-color: rgba(153, 82, 38, 0.5);
}

@media (max-width: 1023px) {
  html:not(.dark) .section-nav__container::after {
    background: linear-gradient(
      to right,
      transparent,
      rgba(250, 247, 244, 0.92)
    );
  }
}

@media (prefers-reduced-transparency: reduce) {
  html:not(.dark) .section-nav__container {
    background: #faf7f4;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>
