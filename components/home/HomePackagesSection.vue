<script setup lang="ts">
import { withDelay } from "~/composables/useAccessibleMotion";

const { t, tm } = useI18n();
const localePath = useLocalePath();

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
const panelMotion = (i: number) => withDelay("fadeInUp", 180 + i * 120);
const footerMotion = withDelay("fadeIn", 540);

const packages = computed(
  () =>
    tm("landing.packages.items") as Array<{
      numeral: string;
      name: string;
      tagline: string;
      description: string;
      includes: string[];
      price: string;
      currency: string;
      pricePer?: string;
      priceNote: string;
      featured?: string;
    }>,
);

const panelGradients = [
  "linear-gradient(160deg, #3a1508 0%, #1a0904 100%)",
  "linear-gradient(160deg, #995226 0%, #5e2210 100%)",
  "linear-gradient(160deg, #481f0a 0%, #200b03 100%)",
];
</script>

<template>
  <section
    ref="sectionRef"
    id="packages-section"
    class="packages-section"
    aria-labelledby="packages-heading"
  >
    <!-- Header -->
    <div
      class="packages-header"
      :key="`packages-header-${visible}`"
      v-motion
      :initial="headingMotion.initial"
      :enter="visible ? headingMotion.visible : headingMotion.initial"
    >
      <h2 id="packages-heading" class="packages-title">
        {{ t("landing.packages.title") }}
      </h2>
      <p class="packages-subtitle">{{ t("landing.packages.subtitle") }}</p>
    </div>

    <!-- Panels -->
    <ul class="panels-grid" role="list">
      <li
        v-for="(pkg, i) in packages"
        :key="`pkg-panel-${i}-${visible}`"
        class="pkg-panel"
        :class="{ 'pkg-panel--featured': !!pkg.featured }"
        :style="{ '--panel-gradient': panelGradients[i] }"
        v-motion
        :initial="panelMotion(i).initial"
        :enter="visible ? panelMotion(i).visible : panelMotion(i).initial"
      >
        <!-- Gradient layer — fades in on hover -->
        <div class="panel-gradient-layer" aria-hidden="true" />

        <!-- Featured badge -->
        <div
          v-if="pkg.featured"
          class="featured-badge"
          aria-label="Most requested package"
        >
          {{ pkg.featured }}
        </div>

        <!-- Art deco corner frame -->
        <div class="deco-frame" aria-hidden="true">
          <span class="corner corner--tl" />
          <span class="corner corner--tr" />
          <span class="corner corner--bl" />
          <span class="corner corner--br" />
        </div>

        <!-- Panel content -->
        <div class="panel-body">
          <!-- Top: numeral + name + tagline -->
          <div class="panel-top">
            <div class="deco-numeral-row" aria-hidden="true">
              <span class="deco-rule" />
              <span class="deco-numeral">{{ pkg.numeral }}</span>
              <span class="deco-rule" />
            </div>
            <h3 class="panel-name">{{ pkg.name }}</h3>
            <p class="panel-tagline">{{ pkg.tagline }}</p>
          </div>

          <!-- Art deco divider -->
          <div class="deco-divider" aria-hidden="true">
            <span class="deco-line" />
            <span class="deco-diamond" />
            <span class="deco-line" />
          </div>

          <!-- Description -->
          <p class="panel-description">{{ pkg.description }}</p>

          <!-- Includes list -->
          <ul class="includes-list" role="list">
            <li
              v-for="(item, j) in pkg.includes"
              :key="j"
              class="includes-item"
            >
              <span class="includes-diamond" aria-hidden="true" />
              <span class="includes-text">{{ item }}</span>
            </li>
          </ul>

          <!-- Bottom: price + CTA -->
          <div class="panel-bottom">
            <div class="deco-divider deco-divider--subtle" aria-hidden="true">
              <span class="deco-line" />
              <span class="deco-diamond deco-diamond--sm" />
              <span class="deco-line" />
            </div>
            <div class="price-block">
              <span class="price-from">From</span>
              <div class="price-main">
                <span class="price-currency">{{ pkg.currency }}</span>
                <span class="price-amount">{{ pkg.price }}</span>
                <span v-if="pkg.pricePer" class="price-per">{{
                  pkg.pricePer
                }}</span>
              </div>
              <span class="price-note">{{ pkg.priceNote }}</span>
            </div>
            <AppCtaButton
              :to="localePath(t('landing.packages.ctaHref'))"
              variant="primary"
              :show-icon="true"
              class="panel-cta-btn"
            >
              {{ t("landing.packages.cta") }}
            </AppCtaButton>
          </div>
        </div>
      </li>
    </ul>

    <!-- Footer strip -->
    <NuxtLink
      :to="localePath(t('landing.packages.footerCtaHref'))"
      class="packages-footer-strip"
      :key="`packages-footer-${visible}`"
      v-motion
      :initial="footerMotion.initial"
      :enter="visible ? footerMotion.visible : footerMotion.initial"
    >
      <span class="footer-strip-deco" aria-hidden="true">
        <span class="footer-deco-line" />
        <span class="footer-deco-diamond footer-deco-diamond--sm" />
        <span class="footer-deco-line footer-deco-line--inner" />
        <span class="footer-deco-diamond" />
        <span class="footer-deco-line footer-deco-line--inner" />
        <span class="footer-deco-diamond footer-deco-diamond--sm" />
        <span class="footer-deco-line" />
      </span>
      <span class="footer-strip-label">
        {{ t("landing.packages.footerCta") }}
        <UIcon name="i-heroicons-arrow-right-20-solid" class="footer-strip-icon" />
      </span>
      <span class="footer-strip-deco" aria-hidden="true">
        <span class="footer-deco-line" />
        <span class="footer-deco-diamond footer-deco-diamond--sm" />
        <span class="footer-deco-line footer-deco-line--inner" />
        <span class="footer-deco-diamond" />
        <span class="footer-deco-line footer-deco-line--inner" />
        <span class="footer-deco-diamond footer-deco-diamond--sm" />
        <span class="footer-deco-line" />
      </span>
    </NuxtLink>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.packages-section {
  background: var(--color-section-light);
  border-top: 1px solid var(--color-border);
}

/* ── Header ───────────────────────────────────────────────────── */
.packages-header {
  max-width: 48rem;
  margin: 0 auto;
  padding: 5rem 1.5rem 3.5rem;
  text-align: center;

  @media (min-width: 768px) {
    padding: 6.5rem 2rem 4rem;
  }
}

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
  color: var(--color-primary-600);
  border: 1px solid var(--color-primary-200);
  background: color-mix(in srgb, var(--color-primary-100) 50%, transparent);

  html.dark & {
    color: var(--color-primary-300);
    border-color: rgba(184, 115, 67, 0.25);
    background: rgba(184, 115, 67, 0.08);
  }
}

.packages-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.5rem, 2.5vw, 2.1rem);
  line-height: 1.25;
  color: var(--color-text);
  margin: 0 0 0.875rem;
  letter-spacing: -0.01em;
}

.packages-subtitle {
  font-family: var(--font-text);
  font-weight: 400;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.6;
  color: var(--color-text-muted);
  margin: 0;
}

/* ── Panels grid ──────────────────────────────────────────────── */
.panels-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ── Panel ────────────────────────────────────────────────────── */
.pkg-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: clamp(480px, 68vh, 660px);

  /* Neutral dark base — always visible */
  background: #161210;

  @media (min-width: 768px) {
    &:not(:last-child) {
      border-right: 1px solid rgba(255, 255, 255, 0.06);
    }
  }

  @media (max-width: 767px) {
    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
  }

  /* Reveal gradient and corner ornaments on hover */
  &:hover .panel-gradient-layer {
    opacity: 1;
  }

  &:hover .corner {
    border-color: rgba(223, 175, 133, 0.55);
  }

  &:hover .deco-numeral {
    opacity: 1;
  }

  &:hover .panel-tagline {
    color: #dfaf85;
  }

  &:hover .price-amount {
    color: #fff;
  }
}

/* ── Gradient reveal layer ────────────────────────────────────── */
.panel-gradient-layer {
  position: absolute;
  inset: 0;
  background: var(--panel-gradient);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: 0;
}

/* ── Featured state ───────────────────────────────────────────── */
.pkg-panel--featured {
  /* Show a hint of warmth even when not hovered */
  background: #1e1410;

  .panel-gradient-layer {
    opacity: 0.4;
  }

  &:hover .panel-gradient-layer {
    opacity: 1;
  }
}

.featured-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 3;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #1a0904;
  background: #dfaf85;
  padding: 0.3rem 0.85rem;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
}

/* ── Art deco corner frame ────────────────────────────────────── */
.deco-frame {
  position: absolute;
  inset: 1.5rem;
  pointer-events: none;
  z-index: 2;
}

.corner {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border-color: rgba(223, 175, 133, 0.15);
  border-style: solid;
  transition: border-color 0.4s ease;

  &--tl {
    top: 0;
    left: 0;
    border-width: 1px 0 0 1px;
  }
  &--tr {
    top: 0;
    right: 0;
    border-width: 1px 1px 0 0;
  }
  &--bl {
    bottom: 0;
    left: 0;
    border-width: 0 0 1px 1px;
  }
  &--br {
    bottom: 0;
    right: 0;
    border-width: 0 1px 1px 0;
  }
}

/* ── Panel body ───────────────────────────────────────────────── */
.panel-body {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 3rem 2.5rem 2.75rem;

  @media (min-width: 1024px) {
    padding: 3.5rem 3rem 3rem;
  }
}

/* ── Top block ────────────────────────────────────────────────── */
.panel-top {
  margin-bottom: 1.75rem;
}

.deco-numeral-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.deco-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.2);
}

.deco-numeral {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #dfaf85;
  opacity: 0.45;
  text-transform: uppercase;
  flex-shrink: 0;
  transition: opacity 0.4s ease;
}

.panel-name {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.5rem, 2vw, 1.9rem);
  line-height: 1.15;
  color: #fff;
  margin: 0 0 0.6rem;
  letter-spacing: -0.01em;
}

.panel-tagline {
  font-family: var(--font-text);
  font-size: clamp(0.85rem, 0.95vw, 0.9rem);
  font-weight: 400;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
  transition: color 0.4s ease;
}

/* ── Art deco divider ─────────────────────────────────────────── */
.deco-divider {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.75rem;

  &--subtle {
    margin-bottom: 1.5rem;
    opacity: 0.5;
  }
}

.deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.2);
}

.deco-diamond {
  width: 7px;
  height: 7px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 5px;
    height: 5px;
  }
}

/* ── Description ──────────────────────────────────────────────── */
.panel-description {
  font-family: var(--font-text);
  font-size: clamp(0.85rem, 0.95vw, 0.9rem);
  font-weight: 300;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

/* ── Includes list ────────────────────────────────────────────── */
.includes-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}

.includes-item {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
}

.includes-diamond {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.5);
  transform: rotate(45deg);
  margin-top: 0.1rem;
  transition: background 0.4s ease;

  .pkg-panel:hover & {
    background: rgba(223, 175, 133, 0.85);
  }
}

.includes-text {
  font-family: var(--font-text);
  font-size: 0.82rem;
  font-weight: 400;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.4s ease;

  .pkg-panel:hover & {
    color: rgba(255, 255, 255, 0.75);
  }
}

/* ── Bottom block ─────────────────────────────────────────────── */
.panel-bottom {
  margin-top: 2rem;
}

.price-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
  margin-bottom: 1.5rem;
}

.price-from {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}

.price-main {
  display: flex;
  align-items: flex-start;
  gap: 0.2rem;
  line-height: 1;
}

.price-currency {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  color: #dfaf85;
  margin-top: 0.45rem;
}

.price-amount {
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 4.5vw, 3.5rem);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: -0.02em;
  transition: color 0.4s ease;
}

.price-per {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
  align-self: flex-end;
  margin-bottom: 0.3rem;
}

.price-note {
  font-family: var(--font-text);
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 400;
  margin-top: 0.15rem;
}

/* ── CTA — AppCtaButton override for full width ───────────────── */
.panel-cta-btn {
  width: 100%;
}

/* ── Footer strip ─────────────────────────────────────────────── */
.packages-footer-strip {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 3rem;
  background: #120703;
  text-decoration: none;
  transition: background 0.35s ease;

  &:hover {
    background: #1e0b04;
  }

  &:focus-visible {
    outline: 2px solid #dfaf85;
    outline-offset: -2px;
  }
}

.footer-strip-deco {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.footer-deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.2);

  &--inner {
    flex: 0 0 1.25rem;
  }
}

.footer-deco-diamond {
  width: 7px;
  height: 7px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;
  transition: background 0.35s ease;

  &--sm {
    width: 4px;
    height: 4px;
    background: rgba(223, 175, 133, 0.22);
  }

  .packages-footer-strip:hover & {
    background: rgba(223, 175, 133, 0.7);
  }

  .packages-footer-strip:hover &--sm {
    background: rgba(223, 175, 133, 0.4);
  }
}

.footer-strip-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.7);
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.35s ease;

  .packages-footer-strip:hover & {
    color: #dfaf85;
  }
}

.footer-strip-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.25s ease;

  .packages-footer-strip:hover & {
    transform: translateX(4px);
  }
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .panel-gradient-layer,
  .corner,
  .deco-numeral,
  .panel-tagline,
  .price-amount,
  .packages-footer-strip,
  .footer-deco-diamond,
  .footer-strip-label,
  .footer-strip-icon {
    transition: none;
  }

  .packages-footer-strip:hover .footer-strip-icon {
    transform: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  /* Panel base — white glass card */
  .pkg-panel {
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid var(--deco-line);

    &:not(:last-child) {
      border-right-color: var(--deco-line);
      border-bottom-color: var(--deco-line);
    }

    &:hover .corner {
      border-color: var(--deco-line-strong);
    }

    &:hover .panel-tagline {
      color: var(--color-primary-600);
    }

    &:hover .price-amount {
      color: var(--color-primary-800);
    }
  }

  /* Featured panel — warm cream tint */
  .pkg-panel--featured {
    background: rgba(255, 243, 233, 0.96);
    border-color: var(--deco-line-strong);
  }

  /* Gradient hover layer — warm mid-to-dark brand tint */
  .panel-gradient-layer {
    background: linear-gradient(
      155deg,
      rgba(72, 31, 10, 0.18) 0%,
      rgba(125, 52, 18, 0.11) 50%,
      rgba(184, 115, 67, 0.04) 100%
    );
  }

  .pkg-panel--featured .panel-gradient-layer {
    background: linear-gradient(
      155deg,
      rgba(72, 31, 10, 0.22) 0%,
      rgba(125, 52, 18, 0.14) 50%,
      rgba(184, 115, 67, 0.05) 100%
    );
  }

  /* Corner frame */
  .corner {
    border-color: var(--deco-border);
  }

  /* Numeral row */
  .deco-rule    { background: var(--deco-line); }
  .deco-numeral { color: var(--color-primary-500); opacity: 0.55; }

  .pkg-panel:hover .deco-numeral { opacity: 1; }

  /* Panel text */
  .panel-name        { color: var(--color-text-primary); }
  .panel-tagline     { color: var(--color-text-subtle); }
  .panel-description { color: var(--color-text-subtle); }

  /* Deco dividers */
  .deco-line    { background: var(--deco-line); }
  .deco-diamond { background: var(--deco-diamond); }

  /* Includes list */
  .includes-diamond { background: var(--deco-diamond-sm); }
  .includes-text    { color: var(--color-text-secondary); }

  .pkg-panel:hover .includes-diamond { background: var(--deco-diamond); }
  .pkg-panel:hover .includes-text    { color: var(--color-text-primary); }

  /* Price block */
  .price-from    { color: var(--color-text-subtle); }
  .price-currency { color: var(--color-primary-600); }
  .price-amount  { color: var(--color-text-secondary); }
  .price-per     { color: var(--color-text-subtle); }
  .price-note    { color: var(--color-text-subtle); }

  /* Footer strip */
  .packages-footer-strip {
    background: rgba(153, 82, 38, 0.06);
    border-top: 1px solid var(--deco-line);

    &:hover {
      background: rgba(153, 82, 38, 0.12);
    }

    &:focus-visible {
      outline-color: var(--color-primary-600);
    }
  }

  .footer-deco-line { background: var(--deco-line); }

  .footer-deco-diamond {
    background: var(--deco-diamond);
    &--sm { background: var(--deco-diamond-sm); }
  }

  .footer-strip-label { color: var(--color-primary-600); }
}
</style>


