<script setup lang="ts">
import { computed } from "vue";
import { useWindowScroll, useWindowSize } from "@vueuse/core";
import { withDelay } from "~/composables/useAccessibleMotion";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const highlightWords = new Set(["business", "brand", "presence", "trust"]);

const { y: scrollY } = useWindowScroll();
const { height: windowHeight } = useWindowSize();

const heroFade = computed(() => {
  const start = windowHeight.value * 0.8;
  return Math.max(0, 1 - Math.max(0, scrollY.value - start) / 300);
});

const normalizeWord = (word: string) =>
  word.toLowerCase().replace(/[^a-z0-9]/gi, "");

const isHighlightedWord = (word: string) =>
  highlightWords.has(normalizeWord(word));

const headlineWords = computed(() => {
  locale.value;
  return t("landing.hero.headline").split(/\s+/).filter(Boolean);
});

const headlineAccentWords = computed(() => {
  locale.value;
  return t("landing.hero.headlineAccent").split(/\s+/).filter(Boolean);
});

const logoMotion = withDelay("fadeInUp", 200);
const headingMotion = withDelay("fadeInUp", 380);
const subMotion = withDelay("fadeInUp", 520);
const ctaMotion = withDelay("fadeInUp", 660);
const orbMotion = withDelay("fadeIn", 500);
const scrollMotion = withDelay("fadeIn", 1200);
</script>

<template>
  <section
    id="hero-section"
    class="hero-section"
    aria-labelledby="hero-heading"
  >

    <div
      class="hero-fade-wrap"
      :style="{ opacity: heroFade }"
      aria-hidden="false"
    >

      <div class="hero-bg-gradient" aria-hidden="true" />
      <div class="hero-bg-radial" aria-hidden="true" />

      <div class="deco-frame" aria-hidden="true">
        <span class="corner corner--tl" />
        <span class="corner corner--tr" />
        <span class="corner corner--bl" />
        <span class="corner corner--br" />
      </div>

      <div class="hero-bottom-ornament" aria-hidden="true">
        <span class="ornament-line" />
        <span class="ornament-diamond ornament-diamond--sm" />
        <span class="ornament-line ornament-line--inner" />
        <span class="ornament-diamond" />
        <span class="ornament-line ornament-line--inner" />
        <span class="ornament-diamond ornament-diamond--sm" />
        <span class="ornament-line" />
      </div>

      <div class="hero-layout">

        <div class="hero-left">

          <div
            v-motion
            :initial="headingMotion.initial"
            :enter="headingMotion.visible"
          >
            <h1 id="hero-heading" class="hero-headline">
              <span class="hero-line">
                <span
                  v-for="(word, index) in headlineWords"
                  :key="`headline-${index}`"
                  :class="[
                    'hero-word',
                    { 'hero-word--highlight': isHighlightedWord(word) },
                  ]"
                  >{{ word
                  }}{{ index < headlineWords.length - 1 ? " " : "" }}</span
                >
              </span>
              <span class="hero-line hero-line--accent">
                <span
                  v-for="(word, index) in headlineAccentWords"
                  :key="`headline-accent-${index}`"
                  :class="[
                    'hero-word',
                    { 'hero-word--highlight': isHighlightedWord(word) },
                  ]"
                  >{{ word
                  }}{{
                    index < headlineAccentWords.length - 1 ? " " : ""
                  }}</span
                >
              </span>
            </h1>
          </div>

          <p
            class="hero-sub"
            v-motion
            :initial="subMotion.initial"
            :enter="subMotion.visible"
          >
            {{ t("landing.hero.subheadline") }}
          </p>

          <div
            class="hero-ctas"
            v-motion
            :initial="ctaMotion.initial"
            :enter="ctaMotion.visible"
          >
            <AppCtaButton
              v-magnetic
              :to="localePath('/solutions/website-packages')"
              variant="primary"
              :show-icon="true"
            >
              {{ t("landing.hero.cta.primary") }}
            </AppCtaButton>
            <AppCtaButton
              v-magnetic
              :to="localePath('/cases')"
              variant="secondary"
            >
              {{ t("landing.hero.cta.secondary") }}
            </AppCtaButton>
          </div>
        </div>

        <div
          class="hero-right"
          v-motion
          :initial="orbMotion.initial"
          :enter="orbMotion.visible"
        >
          <ServiceOrb />
        </div>

      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>

.hero-section {
  position: relative;
  top: 0;
  z-index: 0;
  min-height: 95dvh;
  background: transparent;

  @media (min-width: 640px) {
    position: sticky;
    min-height: 95vh;
    min-height: 95dvh;
    overflow: hidden;
  }
}

.hero-fade-wrap {
  position: relative;
  width: 100%;
  min-height: 95dvh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: calc(5.5rem + env(safe-area-inset-top, 0px)) 1.5rem 5rem;
  will-change: opacity;

  @media (min-width: 640px) {
    position: absolute;
    inset: 0;
    min-height: unset;
    justify-content: center;
    padding: 7rem 1.5rem 6rem;
  }
}

.hero-bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(13, 9, 8, 0.92) 0%,
    rgba(13, 9, 8, 0.65) 45%,
    rgba(13, 9, 8, 0.35) 70%,
    rgba(13, 9, 8, 0.18) 100%
  );
  pointer-events: none;
  z-index: 1;
}

.hero-bg-radial {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 60% at 65% 55%,
    rgba(125, 52, 18, 0.2) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 2;
}

.hero-layout {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 82rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr minmax(300px, 420px);
    align-items: center;
    gap: 4rem;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 1fr minmax(360px, 480px);
    gap: 5rem;
  }
}

.hero-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.75rem;
  width: 100%;

  @media (min-width: 1024px) {
    align-items: flex-start;
    text-align: left;
  }
}

.hero-logo-wrap {
  display: flex;
}

.hero-logo {
  width: 10rem;
  height: auto;
  filter: drop-shadow(0 0 24px rgba(223, 175, 133, 0.16));

  @media (min-width: 640px) {
    width: 11.5rem;
  }
  @media (min-width: 768px) {
    width: 13rem;
  }
}

.logo-path-a {
  fill: #dfaf85;
}
.logo-path-b {
  fill: #ffeddf;
}

.hero-headline {
  display: flex;
  flex-direction: column;
  font-family: var(--font-heading);
  font-style: normal;
  font-weight: 700;
  font-size: clamp(2.4rem, 4vw + 1rem, 4.2rem);
  line-height: 1.08;
  letter-spacing: -0.01em;
  margin: 0;
}

.hero-line {
  display: block;
  color: #ffeddf;
}
.hero-line--accent {
  color: #ffeddf;
}
.hero-word--highlight {
  color: #dfaf85;
}

.hero-sub {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(1rem, 1.3vw + 0.4rem, 1.15rem);
  line-height: 1.7;
  color: rgba(255, 237, 223, 0.62);
  max-width: 34rem;
  margin: 0;
}

.hero-ctas {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  align-items: center;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
}

.hero-right {
  display: flex;
  align-items: center;
  justify-content: center;

  width: clamp(240px, 72vw, 360px);

  @media (min-width: 1024px) {
    width: 100%;
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  background: transparent;
  border: none;
  cursor: pointer;
  min-width: 2.75rem;
  min-height: 2.75rem;

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.6);
    border-radius: 4px;
  }
}

.scroll-label {
  font-family: var(--font-text);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 237, 223, 0.38);
}

.scroll-mouse {
  width: 20px;
  height: 32px;
  border: 1.5px solid rgba(223, 175, 133, 0.25);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding-top: 5px;
  transition: border-color 0.3s ease;

  .scroll-indicator:hover & {
    border-color: rgba(223, 175, 133, 0.55);
  }
}

.scroll-wheel {
  width: 2.5px;
  height: 6px;
  background: rgba(223, 175, 133, 0.45);
  border-radius: 2px;
  animation: scrollWheel 2.4s ease-in-out infinite;
}

@keyframes scrollWheel {
  0%,
  100% {
    opacity: 0.8;
    transform: translateY(0);
  }
  50% {
    opacity: 0.15;
    transform: translateY(6px);
  }
}

.deco-frame {
  position: absolute;
  inset: 2rem;
  pointer-events: none;
  z-index: 5;
}

.corner {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-color: rgba(223, 175, 133, 0.2);
  border-style: solid;

  &::after {
    content: "";
    position: absolute;
    width: 0.85rem;
    height: 0.85rem;
    border-style: solid;
    border-color: rgba(223, 175, 133, 0.1);
  }

  &--tl {
    top: 0;
    left: 0;
    border-width: 1px 0 0 1px;
  }
  &--tl::after {
    top: 5px;
    left: 5px;
    border-width: 1px 0 0 1px;
  }

  &--tr {
    top: 0;
    right: 0;
    border-width: 1px 1px 0 0;
  }
  &--tr::after {
    top: 5px;
    right: 5px;
    border-width: 1px 1px 0 0;
  }

  &--bl {
    bottom: 0;
    left: 0;
    border-width: 0 0 1px 1px;
  }
  &--bl::after {
    bottom: 5px;
    left: 5px;
    border-width: 0 0 1px 1px;
  }

  &--br {
    bottom: 0;
    right: 0;
    border-width: 0 1px 1px 0;
  }
  &--br::after {
    bottom: 5px;
    right: 5px;
    border-width: 0 1px 1px 0;
  }
}

.hero-left {
  position: relative;

  &::before {
    content: "";
    display: none;

    @media (min-width: 1024px) {
      display: block;
      position: absolute;
      left: -2.5rem;
      top: 8%;
      bottom: 8%;
      width: 1px;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(223, 175, 133, 0.22) 25%,
        rgba(223, 175, 133, 0.22) 75%,
        transparent 100%
      );
    }
  }
}

.hero-topper {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 1.25rem;
  width: 100%;
  max-width: 22rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 1024px) {
    margin-left: 0;
    margin-right: 0;
  }
}

.topper-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.18);

  &--inner {
    flex: 0 0 1.25rem;
  }
}

.topper-diamond {
  width: 7px;
  height: 7px;
  background: rgba(223, 175, 133, 0.45);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 4px;
    height: 4px;
    background: rgba(223, 175, 133, 0.25);
  }
}

.hero-bottom-ornament {
  position: absolute;
  bottom: 3.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: min(18rem, 50vw);
  pointer-events: none;
}

.ornament-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.16);

  &--inner {
    flex: 0 0 1rem;
  }
}

.ornament-diamond {
  width: 6px;
  height: 6px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 4px;
    height: 4px;
    background: rgba(223, 175, 133, 0.2);
  }
}

.hero-deco-divider {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  max-width: 22rem;
  margin: 0 auto;

  @media (min-width: 1024px) {
    margin: 0;
  }
}

.deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.2);

  &--inner {
    flex: 0 0 1.25rem;
  }
}

.deco-diamond {
  width: 7px;
  height: 7px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 4px;
    height: 4px;
    background: rgba(223, 175, 133, 0.22);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-wheel {
    animation: none;
  }
}

</style>
