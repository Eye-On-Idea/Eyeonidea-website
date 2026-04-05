<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();
const localePath = useLocalePath();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  if (!sectionRef.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.06 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});

const quickFacts = computed(
  () =>
    tm("about.quickFacts.items") as Array<{
      icon: string;
      label: string;
      value: string;
    }>,
);

</script>

<template>
  <section
    ref="sectionRef"
    class="about-location"
    aria-labelledby="location-heading"
  >
    <!-- Full-section background: Denmark/Europe map image -->
    <div class="location-bg" aria-hidden="true">
      <img
        src="/images/about/location.jpg"
        alt=""
        class="location-bg-img"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
      />
    </div>
    <!-- Dark overlay: uniform base + subtle vignette -->
    <div class="location-overlay" aria-hidden="true" />

    <!-- Content layer -->
    <div class="location-content-wrap">

      <!-- Section label row -->
      <div class="section-label-row" aria-hidden="true">
        <span class="sep-line" />
        <span class="sep-diamond" />
        <span class="sep-text">{{ t("about.location.badge") }}</span>
        <span class="sep-diamond" />
        <span class="sep-line" />
      </div>

      <div class="section-container" :class="{ 'animate-in': isVisible }">
        <div class="location-grid">

          <!-- Left: location details -->
          <div class="location-col">
            <h2 id="location-heading" class="section-title">
              {{ t("about.location.title") }}
            </h2>
            <p class="location-description">
              {{ t("about.location.description") }}
            </p>

            <dl class="location-details">
              <div class="detail-row">
                <dt class="detail-label">
                  <span class="detail-diamond" aria-hidden="true" />
                  Headquarters
                </dt>
                <dd class="detail-value">{{ t("about.location.details.headquarters") }}</dd>
              </div>
              <div class="detail-row">
                <dt class="detail-label">
                  <span class="detail-diamond" aria-hidden="true" />
                  Coverage
                </dt>
                <dd class="detail-value">{{ t("about.location.details.coverage") }}</dd>
              </div>
              <div class="detail-row">
                <dt class="detail-label">
                  <span class="detail-diamond" aria-hidden="true" />
                  Languages
                </dt>
                <dd class="detail-value">{{ t("about.location.details.languages") }}</dd>
              </div>
            </dl>

            <NuxtLink :to="localePath('/solutions/process')" class="process-link">
              {{ t("about.location.processLink") }}
              <span aria-hidden="true" class="link-arrow">→</span>
            </NuxtLink>
          </div>

          <!-- Right: quick facts -->
          <div class="facts-col">
            <div class="facts-header" aria-hidden="true">
              <span class="facts-rule" />
              <span class="facts-label">{{ t("about.quickFacts.title") }}</span>
              <span class="facts-rule" />
            </div>

            <ol class="facts-list" :aria-label="t('about.quickFacts.title')">
              <li
                v-for="(fact, index) in quickFacts"
                :key="index"
                class="fact-row"
                :style="{ transitionDelay: `${index * 80}ms` }"
              >
                <span class="fact-numeral" aria-hidden="true">{{ ["I", "II", "III", "IV"][index] }}</span>
                <span class="fact-value">{{ fact.value }}</span>
                <span class="fact-label">{{ fact.label }}</span>
              </li>
            </ol>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.about-location {
  position: relative;
  background: #120703;
  padding-bottom: 0;
  overflow: hidden;
}

/* ── Background image ─────────────────────────────────────────── */
.location-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.location-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/*
 * Overlay: dark enough to read all text, light enough to
 * let the amber map lines read through as atmosphere.
 * Vignette (radial) darkens edges, focuses the centre.
 */
.location-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse 90% 70% at 50% 50%,
      rgba(18, 7, 3, 0.55) 0%,
      rgba(18, 7, 3, 0.82) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(18, 7, 3, 0.45) 0%,
      rgba(18, 7, 3, 0.3) 50%,
      rgba(18, 7, 3, 0.6) 100%
    );
  pointer-events: none;
}

/* ── Content layer ────────────────────────────────────────────── */
.location-content-wrap {
  position: relative;
  z-index: 1;
}

/* ── Section label row ────────────────────────────────────────── */
.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
}

.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);
}

.sep-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.sep-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.5);
  flex-shrink: 0;
}

/* ── Container ────────────────────────────────────────────────── */
.section-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 6rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.7s var(--ease-smooth),
    transform 0.7s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Grid ─────────────────────────────────────────────────────── */
.location-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1.2fr 1fr;
    gap: 5rem;
  }
}

/* ── Left col ─────────────────────────────────────────────────── */
.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.9rem, 3.5vw, 2.75rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ffeddf;
  margin: 0 0 1.25rem;
  text-wrap: balance;
}

.location-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.8;
  color: rgba(255, 237, 223, 0.55);
  margin: 0 0 2.5rem;
}

/* ── Detail rows ──────────────────────────────────────────────── */
.location-details {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0 0 2.5rem;
  border-top: 1px solid rgba(223, 175, 133, 0.12);
}

.detail-row {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: 1.5rem;
  align-items: baseline;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(223, 175, 133, 0.12);
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
}

.detail-diamond {
  display: inline-block;
  width: 4px;
  height: 4px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.detail-value {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.85rem, 1vw, 0.95rem);
  color: rgba(255, 237, 223, 0.7);
}

/* ── Process link ─────────────────────────────────────────────── */
.process-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.6);
  text-decoration: none;
  min-height: 44px;
  transition: color 0.2s ease;

  &:hover { color: rgba(223, 175, 133, 0.95); }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 4px;
  }
}

.link-arrow {
  transition: transform 0.2s ease;
  .process-link:hover & { transform: translateX(3px); }
}

/* ── Right col ────────────────────────────────────────────────── */
.facts-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0;
}

.facts-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.facts-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.4);
  flex-shrink: 0;
}

/* ── Fact rows ────────────────────────────────────────────────── */
.facts-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid rgba(223, 175, 133, 0.12);
}

.fact-row {
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  gap: 1rem;
  align-items: baseline;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(223, 175, 133, 0.12);
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.5s var(--ease-smooth),
    transform 0.5s var(--ease-smooth);

  .animate-in & {
    opacity: 1;
    transform: translateY(0);
  }
}

.fact-numeral {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(223, 175, 133, 0.28);
}

.fact-value {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: #ffeddf;
  letter-spacing: -0.01em;
}

.fact-label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.38);
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .section-container,
  .fact-row {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .about-location { background: var(--color-section-light); }

  /* Lighten overlay so map image reads through in light mode */
  .location-overlay {
    background:
      radial-gradient(
        ellipse 90% 70% at 50% 50%,
        rgba(250, 247, 244, 0.45) 0%,
        rgba(250, 247, 244, 0.78) 100%
      ),
      linear-gradient(
        to bottom,
        rgba(250, 247, 244, 0.35) 0%,
        rgba(250, 247, 244, 0.2) 50%,
        rgba(250, 247, 244, 0.55) 100%
      );
  }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title        { color: var(--color-text-primary); }
  .location-description { color: var(--color-text-subtle); }

  .location-details { border-top-color: var(--deco-line); }
  .detail-row       { border-bottom-color: var(--deco-line); }
  .detail-label     { color: var(--color-primary-500); opacity: 0.6; }
  .detail-diamond   { background: var(--deco-diamond-sm); }
  .detail-value     { color: var(--color-text-secondary); }

  .process-link {
    color: var(--color-primary-600);
    &:hover { color: var(--color-primary-700); }
    &:focus-visible { outline-color: var(--color-primary-500); }
  }

  .facts-rule  { background: var(--deco-line); }
  .facts-label { color: var(--deco-text); opacity: 0.6; }
  .facts-list  { border-top-color: var(--deco-line); }
  .fact-row    { border-bottom-color: var(--deco-line); }
  .fact-numeral { color: rgba(153, 82, 38, 0.30); }
  .fact-value  { color: var(--color-text-primary); }
  .fact-label  { color: var(--color-primary-500); opacity: 0.5; }
}
</style>
