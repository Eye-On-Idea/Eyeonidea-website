<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { usePreferredReducedMotion } from "@vueuse/core";

const { t } = useI18n();
const localePath = useLocalePath();
const sceneState = useSceneState();

const prefersReducedMotion = usePreferredReducedMotion();
const reducedMotion = computed(() => prefersReducedMotion.value === "reduce");

interface ServiceItem {
  key: string;
  icon: string;
  href: string;
}

const services: ServiceItem[] = [
  {
    key: "websites",
    icon: "i-heroicons-globe-alt",
    href: "/solutions/website-packages",
  },
  {
    key: "identity",
    icon: "i-heroicons-paint-brush",
    href: "/solutions/visual-identity",
  },
  {
    key: "content",
    icon: "i-heroicons-pencil-square",
    href: "/solutions/additional-services#content",
  },
  {
    key: "seo",
    icon: "i-heroicons-magnifying-glass-circle",
    href: "/solutions/additional-services#seo",
  },
  {
    key: "email",
    icon: "i-heroicons-envelope",
    href: "/solutions/additional-services#email",
  },
  {
    key: "domain",
    icon: "i-heroicons-server",
    href: "/solutions/additional-services#domain",
  },
  {
    key: "qa",
    icon: "i-heroicons-shield-check",
    href: "/solutions/additional-services#qa",
  },
];
const firstService = services[0] as ServiceItem;

// Subtle per-service diamond glow tints — shape stays consistent,
// only the ambient shadow colour shifts.
const diamondGlow: Record<string, string> = {
  websites: "rgba(223, 175, 133, 0.10)",
  identity: "rgba(200, 155, 110, 0.14)",
  content: "rgba(210, 185, 155, 0.10)",
  seo: "rgba(150, 185, 210, 0.10)",
  email: "rgba(155, 195, 175, 0.10)",
  domain: "rgba(185, 165, 145, 0.09)",
  qa: "rgba(145, 200, 165, 0.11)",
};

const sectionRef = ref<HTMLElement | null>(null);
const chapterIndex = ref(0);

const updateChapter = () => {
  if (!sectionRef.value) return;
  const rect = sectionRef.value.getBoundingClientRect();
  const totalTravel = sectionRef.value.offsetHeight - window.innerHeight;
  const scrolled = -rect.top;
  if (scrolled < 0 || totalTravel <= 0) return;
  const progress = Math.max(0, Math.min(1, scrolled / totalTravel));
  chapterIndex.value = Math.min(Math.floor(progress * 7), 6);
};

onMounted(() => {
  window.addEventListener("scroll", updateChapter, { passive: true });
  updateChapter();
});
onUnmounted(() => {
  window.removeEventListener("scroll", updateChapter);
});

// Keep 3-D scene in sync with the active chapter
watch(chapterIndex, (idx) => sceneState.setActiveService(idx), {
  immediate: true,
});

const currentService = computed<ServiceItem>(
  () => services[chapterIndex.value] ?? firstService,
);
const chapterLabel = computed(() =>
  String(chapterIndex.value + 1).padStart(2, "0"),
);
const currentGlow = computed(() => diamondGlow[currentService.value.key] ?? diamondGlow.websites);

const scrollToChapter = (targetIdx: number) => {
  if (!sectionRef.value) return;
  const sectionTop = sectionRef.value.offsetTop;
  const totalTravel = sectionRef.value.offsetHeight - window.innerHeight;
  const targetY = sectionTop + (targetIdx / 7) * totalTravel;
  window.scrollTo({
    top: targetY,
    behavior: reducedMotion.value ? "instant" : "smooth",
  });
};
</script>

<template>
  <!-- ── STATIC FALLBACK  -->
  <section
    v-if="reducedMotion"
    id="services-section"
    class="static-section"
    aria-labelledby="services-heading-static"
  >
    <div class="max-w-4xl mx-auto px-6 py-28">
      <div class="text-center mb-14">
        <span class="section-badge">{{ t("landing.services.badge") }}</span>
        <h2 id="services-heading-static" class="static-heading">
          {{ t("landing.services.title") }}
        </h2>
        <p class="static-sub">{{ t("landing.services.subtitle") }}</p>
      </div>
      <ul class="space-y-4">
        <li v-for="service in services" :key="service.key">
          <NuxtLink :to="localePath(service.href)" class="static-card">
            <div class="static-card__icon">
              <UIcon :name="service.icon" class="w-4 h-4 text-primary-200" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-sm text-primary-50 mb-1">
                {{ t(`landing.services.categories.${service.key}.title`) }}
              </p>
              <p class="text-xs leading-relaxed text-primary-100/60">
                {{ t(`landing.services.categories.${service.key}.need`) }}
              </p>
            </div>
            <UIcon
              name="i-heroicons-arrow-right-20-solid"
              class="w-4 h-4 text-primary-200 shrink-0 mt-0.5"
            />
          </NuxtLink>
        </li>
      </ul>
      <div class="mt-10 text-center">
        <NuxtLink :to="localePath('/solutions')" class="cta-link">
          {{ t("landing.services.cta.viewAll") }}
          <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- ── CINEMATIC SCROLL JOURNEY -->
  <section
    v-else
    ref="sectionRef"
    id="services-section"
    class="services-journey"
    aria-labelledby="services-heading"
  >
    <div class="sticky top-0 overflow-hidden journey-panel">
      <!-- Section background -->
      <div class="journey-bg" aria-hidden="true" />
      <!-- Left vignette for text contrast -->
      <div class="journey-vignette" aria-hidden="true" />
      <!-- Warm radial ambient -->
      <div class="journey-radial" aria-hidden="true" />

      <!-- ── Split layout ──────────────────────────────────────────────── -->
      <div class="journey-inner">
        <div class="journey-grid">
          <!-- LEFT: Chapter content -->
          <div
            class="chapter-content"
            :key="chapterIndex"
            role="region"
            :aria-label="`Service ${chapterLabel} of 07: ${t(`landing.services.categories.${currentService.key}.title`)}`"
          >
            <!-- Counter + badge row -->
            <div class="chapter-meta">
              <span class="chapter-count">
                {{ chapterLabel }}
                <span class="chapter-count__total">/ 07</span>
              </span>
              <div class="chapter-rule" aria-hidden="true" />
              <span class="chapter-badge">{{
                t("landing.services.badge")
              }}</span>
            </div>

            <!-- Service icon -->
            <div class="chapter-icon-wrap">
              <UIcon
                :name="currentService.icon"
                class="w-6 h-6 text-primary-200"
              />
            </div>

            <!-- Service title -->
            <h2 id="services-heading" class="chapter-title">
              {{ t(`landing.services.categories.${currentService.key}.title`) }}
            </h2>

            <!-- The need — gold accent left-border -->
            <p class="chapter-need">
              {{ t(`landing.services.categories.${currentService.key}.need`) }}
            </p>

            <!-- Our skill — muted secondary -->
            <p class="chapter-skill">
              {{ t(`landing.services.categories.${currentService.key}.skill`) }}
            </p>

            <!-- Chapter CTA -->
            <NuxtLink
              :to="localePath(currentService.href)"
              class="chapter-cta group"
            >
              {{ t(`landing.services.categories.${currentService.key}.cta`) }}
              <UIcon
                name="i-heroicons-arrow-right-20-solid"
                class="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
              />
            </NuxtLink>
          </div>

          <!-- RIGHT: Visual panel inside diamond frame -->
          <div class="chapter-visual" :key="`visual-${chapterIndex}`">
            <!--
              Diamond backdrop — large rotated square, dark glass.
              Per-chapter: only the ambient glow colour shifts subtly.
            -->
            <div
              class="diamond-frame"
              :style="{ '--glow': currentGlow }"
              aria-hidden="true"
            />
            <!-- Service SVG panel sits above the diamond -->
            <HomeServiceVisualPanel
              :service-key="currentService.key"
              class="visual-panel"
            />
          </div>
        </div>
      </div>

      <!-- ── Vertical chapter nav  -->
      <nav class="chapter-nav" aria-label="Service chapters">
        <button
          v-for="(service, i) in services"
          :key="service.key"
          class="chapter-dot"
          :class="{ 'chapter-dot--active': i === chapterIndex }"
          :aria-label="t(`landing.services.categories.${service.key}.title`)"
          :aria-current="i === chapterIndex ? 'step' : undefined"
          @click="scrollToChapter(i)"
        />
      </nav>

      <!-- ── Bottom "see all"  -->
      <div class="journey-footer">
        <NuxtLink :to="localePath('/solutions')" class="footer-link">
          {{ t("landing.services.cta.viewAll") }}
          <UIcon name="i-heroicons-arrow-right-20-solid" class="w-3.5 h-3.5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Scroll container — 7 chapters × ~114vh each ─────────────── */
.services-journey {
  height: 800vh;
}

/* ── Sticky viewport panel — dvh with vh fallback ─────────────── */
.journey-panel {
  height: 100vh;
  height: 100dvh;
}

/* ── Static section background ────────────────────────────────── */
.static-section {
  background: #0d0908;
}

/* ── Background layers ────────────────────────────────────────── */
.journey-bg {
  position: absolute;
  inset: 0;
  background: #0d0908;
}

.journey-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(13, 9, 8, 0.96) 0%,
    rgba(13, 9, 8, 0.72) 45%,
    rgba(13, 9, 8, 0.38) 100%
  );
  pointer-events: none;
}

.journey-radial {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 40% 55% at 24% 52%,
    rgba(125, 52, 18, 0.16) 0%,
    transparent 70%
  );
  pointer-events: none;
}

/* ── Layout ───────────────────────────────────────────────────── */
.journey-inner {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
}

.journey-grid {
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  align-items: center;

  @media (min-width: 1024px) {
    padding: 0 4rem;
    grid-template-columns: 1fr 1fr;
  }
}

/* ── Chapter entrance animation ───────────────────────────────── */
.chapter-content {
  padding: 4rem 0;
  animation: chapterIn 0.48s var(--ease-smooth) both;

  @media (min-width: 1024px) {
    padding: 0;
  }
}

@keyframes chapterIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Chapter metadata ─────────────────────────────────────────── */
.chapter-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.chapter-count {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.65);
  font-feature-settings: "tnum";
}

.chapter-count__total {
  opacity: 0.45;
}

.chapter-rule {
  height: 1px;
  width: 2.5rem;
  background: rgba(255, 255, 255, 0.12);
}

.chapter-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.85);
  border: 1px solid rgba(223, 175, 133, 0.25);
  background: rgba(223, 175, 133, 0.07);
}

/* ── Chapter icon ─────────────────────────────────────────────── */
.chapter-icon-wrap {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: rgba(223, 175, 133, 0.1);
  border: 1px solid rgba(223, 175, 133, 0.22);
}

/* ── Chapter title ────────────────────────────────────────────── */
.chapter-title {
  font-family: var(--font-heading);
  font-style: normal;
  font-weight: 600;
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  line-height: 1.06;
  color: #ffeddf;
  margin: 0 0 1.75rem;
}

/* ── Chapter need — buff accent left-border ───────────────────── */
.chapter-need {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  line-height: 1.65;
  color: #dfaf85;
  border-left: 2px solid rgba(223, 175, 133, 0.45);
  padding-left: 1rem;
  margin: 0 0 1.1rem;
  max-width: 30rem;
}

/* ── Chapter skill ────────────────────────────────────────────── */
.chapter-skill {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.65;
  color: rgba(255, 237, 223, 0.52);
  margin: 0 0 2.25rem;
  max-width: 30rem;
}

/* ── Chapter CTA ──────────────────────────────────────────────── */
.chapter-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.5rem;
  border-radius: 100px;
  font-family: var(--font-heading);
  font-style: normal;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: #ffeddf;
  background: linear-gradient(
    156deg,
    rgba(223, 175, 133, 0.2) 0%,
    rgba(255, 237, 223, 0.08) 50%,
    rgba(223, 175, 133, 0.2) 100%
  );
  border: 1px solid rgba(223, 175, 133, 0.48);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.25s var(--ease-smooth);

  &:hover {
    background: linear-gradient(
      156deg,
      rgba(223, 175, 133, 0.32) 0%,
      rgba(255, 237, 223, 0.14) 50%,
      rgba(223, 175, 133, 0.32) 100%
    );
    border-color: rgba(223, 175, 133, 0.8);
    box-shadow: 0 6px 24px rgba(223, 175, 133, 0.16);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.7);
    outline-offset: 3px;
  }
}

/* ── Visual panel (right column) ─────────────────────────────── */
.chapter-visual {
  display: none;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (min-width: 1024px) {
    display: flex;
  }
}

/*
  Diamond frame backdrop.
  A rotated square with dark glass fill and gold border.
  The --glow CSS var is set per-chapter for the ambient shadow shift.
*/
.diamond-frame {
  --glow: rgba(223, 175, 133, 0.1);
  position: absolute;
  width: 420px;
  height: 420px;
  transform: rotate(45deg);
  transform-origin: center;
  background: rgba(10, 6, 4, 0.8);
  border: 1px solid rgba(223, 175, 133, 0.22);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow:
    0 0 60px var(--glow),
    0 0 120px var(--glow),
    inset 0 1px 0 rgba(255, 237, 223, 0.06);
  transition:
    box-shadow 0.6s ease,
    border-color 0.6s ease;
}

.visual-panel {
  position: relative;
  z-index: 10;
  animation: chapterIn 0.48s var(--ease-smooth) both;
}

/* ── Dot navigator ────────────────────────────────────────────── */
.chapter-nav {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chapter-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
  background: rgba(255, 255, 255, 0.18);
  transition: all 0.35s var(--ease-smooth);

  &:hover:not(.chapter-dot--active) {
    background: rgba(255, 255, 255, 0.42);
    transform: scale(1.25);
  }

  &--active {
    background: linear-gradient(
      135deg,
      rgba(223, 175, 133, 0.9) 0%,
      rgba(125, 52, 18, 0.7) 50%,
      rgba(255, 237, 223, 0.8) 100%
    );
    transform: scale(1.55);
    box-shadow: 0 0 10px rgba(223, 175, 133, 0.4);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.7);
    outline-offset: 3px;
    border-radius: 50%;
  }
}

/* ── Footer link ──────────────────────────────────────────────── */
.journey-footer {
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
}

.footer-link {
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 237, 223, 0.42);
  text-decoration: none;
  transition:
    color 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    color: rgba(223, 175, 133, 0.85);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.6);
    border-radius: 3px;
  }
}

/* ── Static fallback helpers ──────────────────────────────────── */
.section-badge {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.3rem 1rem;
  border-radius: 100px;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.85);
  border: 1px solid rgba(223, 175, 133, 0.25);
  background: rgba(223, 175, 133, 0.07);
}

.static-heading {
  font-family: var(--font-heading);
  font-weight: 600;
  color: #ffeddf;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin: 0 0 0.75rem;
}

.static-sub {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 1rem;
  color: rgba(255, 237, 223, 0.55);
  max-width: 32rem;
  margin: 0 auto;
}

.static-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(223, 175, 133, 0.14);
  background: rgba(223, 175, 133, 0.05);
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: rgba(223, 175, 133, 0.28);
    background: rgba(223, 175, 133, 0.09);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.6);
    outline-offset: 2px;
  }
}

.static-card__icon {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(223, 175, 133, 0.1);
  border: 1px solid rgba(223, 175, 133, 0.2);
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 100px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  color: #ffeddf;
  text-decoration: none;
  background: rgba(223, 175, 133, 0.14);
  border: 1px solid rgba(223, 175, 133, 0.38);
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: rgba(223, 175, 133, 0.24);
    border-color: rgba(223, 175, 133, 0.6);
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  /* Static fallback */
  .static-section {
    background: var(--color-section-light);
  }

  .section-badge {
    color: var(--color-primary-700);
    background: rgba(153, 82, 38, 0.09);
    border-color: var(--deco-border);
  }

  .static-heading {
    color: var(--color-text-primary);
  }

  .static-sub {
    color: var(--color-text-subtle);
  }

  .static-card {
    border-color: var(--deco-line);
    background: rgba(153, 82, 38, 0.04);

    &:hover {
      border-color: var(--deco-line-strong);
      background: rgba(153, 82, 38, 0.08);
    }
  }

  .static-card__icon {
    background: rgba(153, 82, 38, 0.09);
    border-color: var(--deco-border);
  }

  .cta-link {
    color: var(--color-primary-700);
    background: rgba(153, 82, 38, 0.09);
    border-color: var(--deco-border);

    &:hover {
      background: rgba(153, 82, 38, 0.16);
      border-color: var(--deco-line-strong);
    }
  }

  /* Cinematic journey */
  .journey-bg {
    background: var(--color-section-light);
  }

  .journey-vignette {
    background: linear-gradient(
      to right,
      rgba(250, 247, 244, 0.96) 0%,
      rgba(250, 247, 244, 0.72) 45%,
      rgba(250, 247, 244, 0.2) 100%
    );
  }

  .journey-radial {
    background: radial-gradient(
      ellipse 40% 55% at 24% 52%,
      rgba(153, 82, 38, 0.08) 0%,
      transparent 70%
    );
  }

  .chapter-count {
    color: var(--color-primary-600);
  }

  .chapter-rule {
    background: rgba(0, 0, 0, 0.12);
  }

  .chapter-badge {
    color: var(--color-primary-700);
    border-color: var(--deco-border);
    background: rgba(153, 82, 38, 0.08);
  }

  .chapter-icon-wrap {
    background: rgba(153, 82, 38, 0.09);
    border-color: var(--deco-border);
  }

  .chapter-title {
    color: var(--color-text-primary);
  }

  .chapter-need {
    color: var(--color-primary-600);
    border-left-color: var(--deco-line-strong);
  }

  .chapter-skill {
    color: var(--color-text-subtle);
  }

  .chapter-cta {
    color: var(--color-primary-700);
    background: linear-gradient(
      156deg,
      rgba(153, 82, 38, 0.14) 0%,
      rgba(153, 82, 38, 0.06) 50%,
      rgba(153, 82, 38, 0.14) 100%
    );
    border-color: var(--deco-line-strong);

    &:hover {
      background: linear-gradient(
        156deg,
        rgba(153, 82, 38, 0.22) 0%,
        rgba(153, 82, 38, 0.12) 50%,
        rgba(153, 82, 38, 0.22) 100%
      );
      border-color: var(--color-primary-500);
      box-shadow: 0 6px 24px rgba(153, 82, 38, 0.12);
    }

    &:focus-visible {
      outline-color: var(--color-primary-500);
    }
  }

  /* Diamond frame — light glass */
  .diamond-frame {
    background: rgba(255, 255, 255, 0.6);
    border-color: var(--deco-border);
    box-shadow:
      0 0 60px rgba(153, 82, 38, 0.06),
      0 0 120px rgba(153, 82, 38, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }

  /* Nav dots */
  .chapter-dot {
    background: rgba(0, 0, 0, 0.18);

    &:hover:not(.chapter-dot--active) {
      background: rgba(0, 0, 0, 0.38);
    }

    &--active {
      background: linear-gradient(
        135deg,
        var(--color-primary-500) 0%,
        var(--color-primary-700) 100%
      );
      box-shadow: 0 0 10px rgba(153, 82, 38, 0.35);
    }

    &:focus-visible {
      outline-color: var(--color-primary-500);
    }
  }

  /* Footer link */
  .footer-link {
    color: var(--color-text-muted);

    &:hover {
      color: var(--color-primary-600);
    }

    &:focus-visible {
      outline-color: var(--color-primary-500);
    }
  }
}
</style>
