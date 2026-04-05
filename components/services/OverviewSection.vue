<script setup lang="ts">
import { withDelay } from "~/composables/useAccessibleMotion";

const { tm } = useI18n();
const localePath = useLocalePath();

const services = computed(
  () =>
    tm("services.overview.services") as Array<{
      label: string;
      heading: string;
      body: string;
      linkText: string;
      linkHref: string;
      id: string;
      imageAlt: string;
    }>,
);

const visibleSections = ref(new Set<number>());
const sectionRefs = ref<(HTMLElement | null)[]>([]);
const observers: IntersectionObserver[] = [];

function setSectionRef(el: unknown, index: number) {
  sectionRefs.value[index] = (el as HTMLElement) ?? null;
}

onMounted(() => {
  nextTick(() => {
    sectionRefs.value.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.value = new Set([...visibleSections.value, index]);
              obs.disconnect();
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -80px 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
  });
});

onUnmounted(() => {
  observers.forEach((o) => o.disconnect());
});

// Images mapped to service order: websites, identity, additional, support
const serviceImages = [
  "/images/solutions/overview-website-packages.jpg",
  "/images/solutions/overview-visual-identity.jpg",
  "/images/solutions/overview-additional-services.jpg",
  "/images/solutions/overview-ongoing-support.jpg",
];
</script>

<template>
  <div class="overview-sections">
    <section
      v-for="(service, index) in services"
      :key="index"
      :id="service.id"
      :ref="(el) => setSectionRef(el, index)"
      class="service-section"
      :aria-labelledby="`overview-heading-${index}`"
    >
      <!-- Section separator / label -->
      <div class="section-label-row" aria-hidden="true">
        <span class="sep-line" />
        <span class="sep-diamond" />
        <span class="sep-text">{{ service.label }}</span>
        <span class="sep-diamond" />
        <span class="sep-line" />
      </div>

      <!-- Editorial two-column row -->
      <div
        class="section-inner"
        :class="[
          `section-inner--${index % 2 === 0 ? 'ltr' : 'rtl'}`,
          { 'animate-in': visibleSections.has(index) },
        ]"
      >
        <!-- Text column -->
        <div class="section-text">
          <h2
            :id="`overview-heading-${index}`"
            class="service-heading"
          >
            {{ service.heading }}
          </h2>

          <div class="deco-divider" aria-hidden="true">
            <span class="deco-line" />
            <span class="deco-diamond" />
            <span class="deco-line" />
          </div>

          <p class="service-body">{{ service.body }}</p>

          <AppCtaButton
            variant="primary"
            :to="localePath(service.linkHref)"
            :show-icon="true"
            class="service-cta"
          >
            {{ service.linkText }}
          </AppCtaButton>
        </div>

        <!-- Service visual image -->
        <div class="section-visual">
          <NuxtImg
            :src="serviceImages[index % serviceImages.length]"
            :alt="service.imageAlt ?? ''"
            class="visual-image"
            width="960"
            height="720"
            format="webp"
            quality="82"
            loading="lazy"
          />
          <div class="visual-deco-frame" aria-hidden="true">
            <span class="corner corner--tl" />
            <span class="corner corner--tr" />
            <span class="corner corner--bl" />
            <span class="corner corner--br" />
          </div>
        </div>
      </div>

      <!-- Bottom rule before next section -->
      <div class="section-bottom-rule" aria-hidden="true">
        <span class="rule-line" />
        <span class="rule-diamond" />
        <span class="rule-line" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
/* ── Outer container ──────────────────────────────────────────── */
.overview-sections {
  background: #0d0908;
}

/* ── Service section ──────────────────────────────────────────── */
.service-section {
  background: #0d0908;
  padding-bottom: 0;
}

/* ── Section label row ────────────────────────────────────────── */
.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 4.5rem 2rem 2.5rem;
}

.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.sep-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.sep-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  flex-shrink: 0;
}

/* ── Editorial inner layout ───────────────────────────────────── */
.section-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
  }

  /* Alternating: image left on odd rows */
  &--rtl {
    @media (min-width: 1024px) {
      .section-text { order: 2; }
      .section-visual { order: 1; }
    }
  }
}

/* ── Entrance animation ───────────────────────────────────────── */
.section-text {
  opacity: 0;
  transform: translateX(-20px);
  transition:
    opacity 0.7s var(--ease-smooth),
    transform 0.7s var(--ease-smooth);
}

.section-visual {
  opacity: 0;
  transform: translateX(20px);
  transition:
    opacity 0.7s var(--ease-smooth) 0.1s,
    transform 0.7s var(--ease-smooth) 0.1s;

  @media (max-width: 1023px) {
    display: none;
  }
}

.animate-in {
  .section-text {
    opacity: 1;
    transform: translateX(0);
  }

  .section-visual {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ── Text content ─────────────────────────────────────────────── */
.service-heading {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: #ffeddf;
  margin: 0 0 1.25rem;
}

.deco-divider {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);
}

.deco-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.service-body {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.1vw, 1.05rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.55);
  max-width: 46ch;
  margin: 0 0 2.25rem;
}

.service-cta {
  align-self: flex-start;
}

/* ── Visual image block ───────────────────────────────────────── */
.section-visual {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 2px;
  overflow: hidden;
}

.visual-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.visual-deco-frame {
  position: absolute;
  inset: 1rem;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border-color: rgba(223, 175, 133, 0.22);
  border-style: solid;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

/* ── Bottom rule ──────────────────────────────────────────────── */
.section-bottom-rule {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 2rem;
}

.rule-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.08);
}

.rule-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.2);
  transform: rotate(45deg);
  flex-shrink: 0;
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .section-text,
  .section-visual {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .overview-sections { background: var(--color-section-light); }

  .service-section { background: var(--color-section-light); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .service-heading { color: var(--color-text-primary); }

  .deco-line    { background: var(--deco-line); }
  .deco-diamond { background: var(--deco-diamond); }

  .service-body { color: var(--color-text-subtle); }

  .corner { border-color: var(--deco-border); }

  .rule-line   { background: var(--deco-line); }
  .rule-diamond { background: var(--deco-diamond-sm); }
}
</style>
