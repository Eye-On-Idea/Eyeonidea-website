<script setup lang="ts">
import { withDelay } from "~/composables/useAccessibleMotion";

const { t, tm } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const visible = ref(false);
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        visible.value = true;
        observer.value?.disconnect();
      }
    },
    { threshold: 0.08 },
  );
  if (sectionRef.value) observer.value.observe(sectionRef.value);
});
onUnmounted(() => observer.value?.disconnect());

const headingMotion = withDelay("fadeInUp", 80);
const rowMotion = (i: number) => withDelay("fadeInUp", 100 + i * 120);

const situations = computed(
  () =>
    tm("landing.audience.situations") as Array<{
      icon: string;
      heading: string;
      body: string;
    }>,
);

const panelGradients = [
  "linear-gradient(155deg, #481f0a 0%, #1a0904 100%)",
  "linear-gradient(155deg, #7d3412 0%, #3a1508 100%)",
  "linear-gradient(155deg, #995226 0%, #481f0a 100%)",
];

const panelAccents = [
  "rgba(184, 115, 67, 0.52)",
  "rgba(211, 154, 105, 0.46)",
  "rgba(223, 175, 133, 0.42)",
];

const numerals = ["I", "II", "III"];
</script>

<template>
  <section
    ref="sectionRef"
    id="audience-section"
    class="audience-section"
    aria-labelledby="audience-heading"
  >
    <!-- Section header -->
    <div
      class="audience-header-wrap"
      :key="`audience-header-${visible}`"
      v-motion
      :initial="headingMotion.initial"
      :enter="visible ? headingMotion.visible : headingMotion.initial"
    >
      <h2 id="audience-heading" class="audience-title">
        {{ t("landing.audience.title") }}
      </h2>
      <p class="audience-subtitle">{{ t("landing.audience.subtitle") }}</p>
    </div>

    <!-- Stacked alternating rows -->
    <ul class="audience-rows" role="list">
      <li
        v-for="(item, i) in situations"
        :key="`audience-row-${i}-${visible}`"
        class="audience-row"
        :class="i % 2 === 0 ? 'audience-row--normal' : 'audience-row--reversed'"
        v-motion
        :initial="rowMotion(i).initial"
        :enter="visible ? rowMotion(i).visible : rowMotion(i).initial"
      >
        <!-- ── Text column ─────────────────────────────── -->
        <div class="row-text">
          <div class="row-text__inner">
            <div class="deco-numeral-row" aria-hidden="true">
              <span class="deco-rule" />
              <span class="deco-numeral">{{ numerals[i] }}</span>
              <span class="deco-rule" />
            </div>
            <h3 class="row-heading">{{ item.heading }}</h3>
            <div class="deco-divider" aria-hidden="true">
              <span class="deco-line-el" />
              <span class="deco-diamond-el" />
              <span class="deco-line-el" />
            </div>
            <p class="row-body">{{ item.body }}</p>
          </div>
        </div>

        <!-- ── Visual column ──────────────────────────── -->
        <div
          class="row-visual"
          :style="{
            '--panel-gradient': panelGradients[i],
            '--panel-accent': panelAccents[i],
          }"
          aria-hidden="true"
        >
          <!-- Ambient glow orb -->
          <div class="panel-orb" />
          <!-- Art deco corner frame -->
          <div class="deco-frame">
            <span class="corner corner--tl" />
            <span class="corner corner--tr" />
            <span class="corner corner--bl" />
            <span class="corner corner--br" />
          </div>
          <!-- Icon focal point -->
          <div class="visual-icon-wrap">
            <UIcon :name="item.icon" class="visual-icon" />
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.audience-section {
  background: #1a0904;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

/* ── Header ───────────────────────────────────────────────────── */
.audience-header-wrap {
  max-width: 52rem;
  margin: 0 auto;
  padding: 5rem 1.5rem 2.5rem;
  text-align: center;

  @media (min-width: 768px) {
    padding: 6.5rem 2rem 3.5rem;
  }
}

.audience-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.5rem, 2.5vw, 2.1rem);
  line-height: 1.25;
  color: #fff;
  margin: 0 0 0.875rem;
  letter-spacing: -0.01em;
}

.audience-subtitle {
  font-family: var(--font-text);
  font-weight: 400;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

/* ── Rows container ───────────────────────────────────────────── */
.audience-rows {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* ── Individual row ───────────────────────────────────────────── */
.audience-row {
  display: grid;
  grid-template-columns: 1fr;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  /* Mobile: visual above, text below */
  .row-visual { order: 1; }
  .row-text   { order: 2; }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    min-height: clamp(320px, 44vh, 460px);

    /* Normal: text left, visual right */
    &--normal {
      .row-text   { order: 1; }
      .row-visual {
        order: 2;
        mask-image: linear-gradient(to right, transparent 0%, black 42%);
        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 42%);
      }
    }

    /* Reversed: visual left, text right */
    &--reversed {
      .row-visual {
        order: 1;
        mask-image: linear-gradient(to left, transparent 0%, black 42%);
        -webkit-mask-image: linear-gradient(to left, transparent 0%, black 42%);
      }
      .row-text { order: 2; }
    }
  }
}

/* ── Text column ──────────────────────────────────────────────── */
.row-text {
  display: flex;
  align-items: center;
  padding: 3rem 2rem;

  @media (min-width: 768px) {
    padding: 4rem 3rem;
  }

  @media (min-width: 1024px) {
    padding: 5rem 4.5rem;
  }
}

.row-text__inner {
  width: 100%;
  max-width: 30rem;
}

/* Reversed row: nudge text slightly inward from the visual edge */
.audience-row--reversed .row-text {
  @media (min-width: 768px) {
    padding-left: 3.5rem;
  }

  @media (min-width: 1024px) {
    padding-left: 5rem;
  }
}

/* ── Deco numeral row ─────────────────────────────────────────── */
.deco-numeral-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.deco-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.22);
}

.deco-numeral {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: rgba(223, 175, 133, 0.6);
  flex-shrink: 0;
}

/* ── Deco divider ─────────────────────────────────────────────── */
.deco-divider {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.875rem 0;
}

.deco-line-el {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.2);
}

.deco-diamond-el {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.38);
  transform: rotate(45deg);
  flex-shrink: 0;
}

/* ── Row text content ─────────────────────────────────────────── */
.row-heading {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(1.1rem, 1.5vw, 1.4rem);
  line-height: 1.28;
  color: #fff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.01em;
}

.row-body {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.88rem, 1vw, 0.97rem);
  line-height: 1.72;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

/* ── Visual column ────────────────────────────────────────────── */
.row-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--panel-gradient);
  overflow: hidden;
  min-height: 260px;

  /* Mobile: fade bottom edge into the text below */
  @media (max-width: 767px) {
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
  }
}

/* ── Ambient glow orb ─────────────────────────────────────────── */
.panel-orb {
  position: absolute;
  width: 26rem;
  height: 26rem;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    var(--panel-accent) 0%,
    transparent 65%
  );
  pointer-events: none;

  /* Normal row — orb at top-right (away from fade zone) */
  .audience-row--normal & {
    top: -5rem;
    right: -3rem;
  }

  /* Reversed row — orb at top-left (away from fade zone) */
  .audience-row--reversed & {
    top: -5rem;
    left: -3rem;
  }

  /* Mobile: always top-right */
  @media (max-width: 767px) {
    top: -4rem;
    right: -3rem;
    left: auto;
  }
}

/* ── Art deco corner frame ────────────────────────────────────── */
.deco-frame {
  position: absolute;
  inset: 2rem;
  pointer-events: none;
  z-index: 2;
}

.corner {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border-color: rgba(223, 175, 133, 0.16);
  border-style: solid;

  &--tl { top: 0; left: 0;     border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0;    border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0;  border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

/* ── Icon focal point ─────────────────────────────────────────── */
.visual-icon-wrap {
  position: relative;
  z-index: 1;
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(223, 175, 133, 0.1);
  border: 1px solid rgba(223, 175, 133, 0.26);
  box-shadow:
    0 0 0 8px rgba(223, 175, 133, 0.05),
    0 0 48px rgba(223, 175, 133, 0.12);
}

.visual-icon {
  width: 2.25rem;
  height: 2.25rem;
  color: rgba(223, 175, 133, 0.82);
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .panel-orb { opacity: 0.5; }
}

/* ── Light mode ───────────────────────────────────────────────── */
/* Section bg and text switch; visual panels stay dark (they are
   atmospheric illustrative panels — the mask blend handles the
   transition to the light section background organically).        */
html:not(.dark) {
  .audience-section {
    background: var(--color-section-alt);
    border-top-color: var(--color-border);
  }

  .audience-row:not(:last-child) {
    border-bottom-color: var(--color-border);
  }

  .audience-title   { color: var(--color-text-primary); }
  .audience-subtitle { color: var(--color-text-subtle); }

  .deco-rule       { background: var(--deco-line); }
  .deco-numeral    { color: var(--color-primary-500); opacity: 0.7; }
  .deco-line-el    { background: var(--deco-line); }
  .deco-diamond-el { background: var(--deco-diamond); }
  .row-heading     { color: var(--color-text-primary); }
  .row-body        { color: var(--color-text-subtle); }
}
</style>


