<script setup lang="ts">
import { withDelay } from "~/composables/useAccessibleMotion";

const { t } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const visible    = ref(false);
const observer   = ref<IntersectionObserver | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        visible.value = true;
        observer.value?.disconnect();
      }
    },
    { threshold: 0.08 }
  );
  if (sectionRef.value) observer.value.observe(sectionRef.value);
});
onUnmounted(() => observer.value?.disconnect());

const headMotion = withDelay("fadeInUp", 80);

const packages = [
  { key: "launch"   as const, featured: false, numeral: "I"   },
  { key: "growth"   as const, featured: true,  numeral: "II"  },
  { key: "platform" as const, featured: false, numeral: "III" },
];
</script>

<template>
  <section
    id="packages-section"
    ref="sectionRef"
    class="packages-section"
    aria-labelledby="packages-heading"
  >
    <!-- Section separator / label -->
    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("services.packages.title") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <!-- Header -->
    <div
      class="section-header"
      :key="`pkg-header-${visible}`"
      v-motion
      :initial="headMotion.initial"
      :enter="visible ? headMotion.visible : headMotion.initial"
    >
      <h2 id="packages-heading" class="section-title">
        {{ t("services.packages.subtitle") }}
      </h2>
    </div>

    <!-- Packages grid — full-width columns -->
    <div class="packages-grid">
      <ServicesPackageCard
        v-for="(pkg, i) in packages"
        :key="pkg.key"
        :package-key="pkg.key"
        :featured="pkg.featured"
        :numeral="pkg.numeral"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 120 + i * 100 } }"
      />
    </div>

    <!-- Footer pricing note -->
    <div class="pricing-note-row" aria-hidden="false">
      <span class="sep-line" />
      <span class="pricing-note">{{ t("services.packages.pricingNote") }}</span>
      <span class="sep-line" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.packages-section {
  background: #0d0908;
  padding-bottom: 0;
}

/* ── Section separator / label ────────────────────────────────── */
.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 2rem 3rem;
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

/* ── Header ───────────────────────────────────────────────────── */
.section-header {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  color: #fff;
  margin: 0;
  letter-spacing: -0.02em;
}

/* ── Packages grid ────────────────────────────────────────────── */
.packages-grid {
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgba(223, 175, 133, 0.08);

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ── Footer note ──────────────────────────────────────────────── */
.pricing-note-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
}

.pricing-note {
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: rgba(255, 237, 223, 0.3);
  flex-shrink: 0;
  white-space: nowrap;
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .packages-section { background: var(--color-section-light); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title { color: var(--color-text-primary); }

  .packages-grid { border-top-color: var(--deco-line); }

  .pricing-note-row { border-top-color: var(--deco-line); }
  .sep-line { background: var(--deco-line); }
  .pricing-note { color: var(--color-text-subtle); opacity: 0.6; }
}
</style>


