<script setup lang="ts">
import { withDelay } from "~/composables/useAccessibleMotion";

const { t } = useI18n();
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
    { threshold: 0.1 }
  );
  if (sectionRef.value) observer.value.observe(sectionRef.value);
});
onUnmounted(() => observer.value?.disconnect());

const leftMotion = withDelay("fadeInUp", 80);
const rightMotion = withDelay("fadeInUp", 200);

const values = ["clarity", "partnership", "quality"] as const;
</script>

<template>
  <section
    ref="sectionRef"
    id="about-section"
    class="about-section"
    aria-labelledby="about-heading"
  >

    <div class="about-bg" aria-hidden="true">
      <img
        src="/images/landing/about-panel.jpg"
        alt=""
        class="about-bg-img"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="about-overlay" aria-hidden="true" />

    <div class="about-content-wrap">

      <div class="section-label-row" aria-hidden="true">
        <span class="sep-line" />
        <span class="sep-diamond" />
        <span class="sep-text">{{ t("landing.about.badge") }}</span>
        <span class="sep-diamond" />
        <span class="sep-line" />
      </div>

      <div class="about-inner">

        <div
          class="about-left"
          :key="`about-left-${visible}`"
          v-motion
          :initial="leftMotion.initial"
          :enter="visible ? leftMotion.visible : leftMotion.initial"
        >
          <h2 id="about-heading" class="about-title">
            {{ t("landing.about.title") }}
          </h2>

          <div class="about-deco-divider" aria-hidden="true">
            <span class="deco-line" />
            <span class="deco-diamond" />
            <span class="deco-line" />
          </div>

          <p class="about-description">{{ t("landing.about.description") }}</p>

          <AppCtaButton
            variant="secondary"
            :to="localePath('/about')"
            class="about-cta"
          >
            {{ t("landing.about.cta") }}
          </AppCtaButton>
        </div>

        <div
          class="about-right"
          :key="`about-right-${visible}`"
          v-motion
          :initial="rightMotion.initial"
          :enter="visible ? rightMotion.visible : rightMotion.initial"
        >
          <div class="values-panel">

            <span class="vp-corner vp-corner--tl" aria-hidden="true" />
            <span class="vp-corner vp-corner--tr" aria-hidden="true" />
            <span class="vp-corner vp-corner--bl" aria-hidden="true" />
            <span class="vp-corner vp-corner--br" aria-hidden="true" />

            <ul class="values-list" role="list">
              <li
                v-for="key in values"
                :key="key"
                class="value-item"
              >
                <div class="value-marker" aria-hidden="true">
                  <span class="marker-rule" />
                  <span class="marker-diamond" />
                </div>
                <div class="value-content">
                  <h3 class="value-title">{{ t(`landing.about.values.${key}.title`) }}</h3>
                  <p class="value-body">{{ t(`landing.about.values.${key}.description`) }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="section-bottom-rule" aria-hidden="true">
        <span class="sep-line" />
        <span class="sep-diamond-lg" />
        <span class="sep-line" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.about-section {
  position: relative;
  z-index: 1;
  background: #0d0908;
  padding-bottom: 0;
  overflow: hidden;
}

.about-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.about-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
}

.about-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(
      to right,
      rgba(13, 9, 8, 0.96) 0%,
      rgba(13, 9, 8, 0.82) 40%,
      rgba(13, 9, 8, 0.60) 70%,
      rgba(13, 9, 8, 0.50) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(13, 9, 8, 0.45) 0%,
      rgba(13, 9, 8, 0.10) 30%,
      rgba(13, 9, 8, 0.10) 70%,
      rgba(13, 9, 8, 0.55) 100%
    );
}

.about-content-wrap {
  position: relative;
  z-index: 1;
}

.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 2rem 3.5rem;
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

.about-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }
}

.about-left {
  display: flex;
  flex-direction: column;
}

.about-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  line-height: 1.15;
  color: #ffeddf;
  margin: 0 0 1.5rem;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.about-deco-divider {
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

.about-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.1vw, 1.05rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.60);
  margin: 0 0 2.5rem;
  max-width: 42ch;
}

.about-cta {
  align-self: flex-start;
}

.about-right {
  display: flex;
  flex-direction: column;
}

.values-panel {
  position: relative;
  background: rgba(13, 9, 8, 0.62);
  border: 1px solid rgba(223, 175, 133, 0.10);
  padding: 2rem 2rem 0.5rem;
}

.vp-corner {
  position: absolute;
  width: 1.1rem;
  height: 1.1rem;
  border-color: rgba(223, 175, 133, 0.30);
  border-style: solid;

  &--tl { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
  &--tr { top: -1px; right: -1px; border-width: 1px 1px 0 0; }
  &--bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
  &--br { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }
}

.values-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.value-item {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(223, 175, 133, 0.10);

  &:last-child {
    border-bottom: 1px solid rgba(223, 175, 133, 0.10);
    margin-bottom: 1.5rem;
  }
}

.value-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.3rem;
  gap: 0.4rem;
  flex-shrink: 0;
}

.marker-rule {
  width: 1px;
  height: 0.875rem;
  background: rgba(223, 175, 133, 0.25);
}

.marker-diamond {
  width: 6px;
  height: 6px;
  background: rgba(223, 175, 133, 0.5);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.value-content {
  flex: 1;
}

.value-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(0.95rem, 1.1vw, 1rem);
  line-height: 1.3;
  color: #ffeddf;
  margin: 0 0 0.4rem;
}

.value-body {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(255, 237, 223, 0.55);
  margin: 0;
}

.section-bottom-rule {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

.sep-diamond-lg {
  width: 7px;
  height: 7px;
  background: rgba(223, 175, 133, 0.25);
  transform: rotate(45deg);
  flex-shrink: 0;
}

@media (prefers-reduced-motion: reduce) {
  .about-bg-img { will-change: auto; }
}

</style>
