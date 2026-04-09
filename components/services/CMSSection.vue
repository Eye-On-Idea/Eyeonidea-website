<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

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
    { threshold: 0.08 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});

const numerals = ["I", "II", "III", "IV"];
</script>

<template>
  <section
    id="cms-section"
    ref="sectionRef"
    class="cms-section"
    aria-labelledby="cms-heading"
  >

    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("services.cms.title") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-header">
      <h2 id="cms-heading" class="section-title">
        {{ t("services.cms.title") }}
      </h2>
      <p class="section-description">{{ t("services.cms.description") }}</p>
    </div>

    <ol class="features-grid" role="list">
      <li
        v-for="(feature, index) in (tm('services.cms.features') as { title: string; description: string }[])"
        :key="index"
        class="feature-item"
        :class="{ 'animate-in': isVisible }"
        :style="{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }"
      >

        <div class="numeral-row" aria-hidden="true">
          <span class="numeral-rule" />
          <span class="numeral">{{ numerals[index] }}</span>
          <span class="numeral-rule" />
        </div>

        <div class="deco-divider" aria-hidden="true">
          <span class="deco-line" />
          <span class="deco-diamond" />
          <span class="deco-line" />
        </div>

        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-body">{{ feature.description }}</p>
      </li>
    </ol>

    <div class="cta-row">
      <AppCtaButton
        variant="primary"
        :to="localePath('/contact')"
        :show-icon="true"
      >
        {{ t("services.cms.cta") }}
      </AppCtaButton>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.cms-section {
  background: #0d0908;
  padding-bottom: 5rem;
}

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

.section-header {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  line-height: 1.1;
  color: #fff;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
}

.section-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.5);
  max-width: 48ch;
  margin: 0;
}

.features-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgba(223, 175, 133, 0.08);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.feature-item {
  padding: 2.5rem 2rem 3rem;
  border-right: 1px solid rgba(223, 175, 133, 0.08);
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth),
    background 0.3s ease;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    background: rgba(223, 175, 133, 0.02);
    .numeral { opacity: 1; }
    .deco-diamond { background: rgba(223, 175, 133, 0.65); }
  }

  @media (min-width: 1024px) {
    &:last-child { border-right: none; }
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    &:nth-child(2n) { border-right: none; }
  }

  @media (max-width: 639px) {
    border-right: none;
  }
}

.numeral-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.numeral-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);
}

.numeral {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #dfaf85;
  opacity: 0.45;
  flex-shrink: 0;
  transition: opacity 0.3s ease;
}

.deco-divider {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.1);
}

.deco-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.3);
  transform: rotate(45deg);
  flex-shrink: 0;
  transition: background 0.3s ease;
}

.feature-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  line-height: 1.3;
  color: #fff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.01em;
}

.feature-body {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.85rem, 0.9vw, 0.9rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.cta-row {
  display: flex;
  justify-content: center;
  padding: 3rem 2rem 0;
}

@media (prefers-reduced-motion: reduce) {
  .feature-item {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

html:not(.dark) {
  .cms-section { background: var(--color-section-light); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title       { color: var(--color-text-primary); }
  .section-description { color: var(--color-text-subtle); }

  .features-grid { border-top-color: var(--deco-line); }

  .feature-item {
    border-right-color: var(--deco-line);
    border-bottom-color: var(--deco-line);

    &:hover {
      background: rgba(153, 82, 38, 0.02);
      .deco-diamond { background: rgba(153, 82, 38, 0.6); }
    }
  }

  .numeral-rule { background: var(--deco-line); }
  .numeral      { color: var(--color-primary-500); opacity: 0.6; }
  .deco-line    { background: var(--deco-line); }
  .deco-diamond { background: var(--deco-diamond); }

  .feature-title { color: var(--color-text-primary); }
  .feature-body  { color: var(--color-text-subtle); }
}
</style>

