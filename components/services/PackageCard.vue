<script setup lang="ts">
interface Props {
  packageKey: "launch" | "growth" | "platform";
  featured?: boolean;
  numeral: string;
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
});

const { t, tm } = useI18n();
const localePath = useLocalePath();

const includes = computed(
  () => tm(`services.packages.${props.packageKey}.includes`) as string[],
);

const price = computed(() => ({
  amount: t(`services.packages.${props.packageKey}.price.amount`),
  currency: t(`services.packages.${props.packageKey}.price.currency`),
  unit: t(`services.packages.${props.packageKey}.price.unit`),
  prefix: t(`services.packages.${props.packageKey}.price.prefix`),
  vatNote: t(`services.packages.${props.packageKey}.price.vatNote`),
}));
</script>

<template>
  <article class="pkg-panel" :class="{ 'pkg-panel--featured': featured }">

    <div class="panel-gradient-layer" aria-hidden="true" />

    <div class="deco-frame" aria-hidden="true">
      <span class="corner corner--tl" />
      <span class="corner corner--tr" />
      <span class="corner corner--bl" />
      <span class="corner corner--br" />
    </div>

    <div class="numeral-row" aria-hidden="true">
      <span class="num-rule" />
      <span class="num-label">{{ numeral }}</span>
      <span class="num-rule" />
    </div>

    <h3 class="pkg-name">{{ t(`services.packages.${packageKey}.name`) }}</h3>

    <div class="pkg-deco-divider" aria-hidden="true">
      <span class="deco-line" />
      <span class="deco-diamond" />
      <span class="deco-line" />
    </div>

    <p class="pkg-tagline">
      {{ t(`services.packages.${packageKey}.tagline`) }}
    </p>
    <p class="pkg-description">
      {{ t(`services.packages.${packageKey}.description`) }}
    </p>

    <p class="pkg-ideal">
      <span class="ideal-label">Ideal for —</span>
      {{ t(`services.packages.${packageKey}.idealFor`) }}
    </p>

    <ul class="pkg-includes" role="list">
      <li v-for="(item, i) in includes" :key="i" class="pkg-include-item">
        <span class="include-diamond" aria-hidden="true" />
        <span>{{ item }}</span>
      </li>
    </ul>

    <div class="pkg-spacer" />

    <div class="pkg-pricing">
      <div class="pricing-rule" aria-hidden="true" />
      <div class="price-row">
        <span class="price-prefix">{{ price.prefix }}</span>
        <span class="price-currency">{{ price.currency }}</span>
        <span class="price-amount">{{ price.amount }}</span>
        <span class="price-unit">{{ price.unit }}</span>
      </div>
      <span class="price-vat">{{ price.vatNote }}</span>
    </div>

    <div class="pkg-cta">
      <AppCtaButton
        :variant="featured ? 'primary' : 'secondary'"
        :to="localePath('/contact')"
        :show-icon="featured"
        class="pkg-cta-btn"
      >
        {{ t("services.packages.cta") }}
      </AppCtaButton>
    </div>
  </article>
</template>

<style lang="scss" scoped>

.pkg-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #161210;
  border-right: 1px solid rgba(223, 175, 133, 0.08);
  border-bottom: 1px solid rgba(223, 175, 133, 0.08);
  padding: 2.5rem 2rem 2rem;
  overflow: hidden;
  transition: background 0.35s ease;

  &:last-child {
    border-right: none;
  }

  &:hover {
    .panel-gradient-layer {
      opacity: 1;
    }
    .num-label {
      opacity: 1;
    }
    .deco-diamond {
      background: rgba(223, 175, 133, 0.65);
    }
    .corner {
      border-color: rgba(223, 175, 133, 0.4);
    }
  }

  &--featured {
    background: #1a100a;

    .panel-gradient-layer {
      opacity: 0.5;
    }

    .pkg-name {
      color: #dfaf85;
    }
  }
}

.panel-gradient-layer {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #3a1508 0%, #1a0904 100%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.deco-frame {
  position: absolute;
  inset: 1rem;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 0.875rem;
  height: 0.875rem;
  border-color: rgba(223, 175, 133, 0.2);
  border-style: solid;
  transition: border-color 0.35s ease;

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

.numeral-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.num-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);
}

.num-label {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #dfaf85;
  opacity: 0.45;
  flex-shrink: 0;
  transition: opacity 0.35s ease;
}

.pkg-deco-divider {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.875rem 0 1rem;
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
  transition: background 0.35s ease;
}

.pkg-name {
  position: relative;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.5rem, 2vw, 1.75rem);
  line-height: 1.1;
  color: #ffeddf;
  margin: 0;
  letter-spacing: -0.01em;
  transition: color 0.35s ease;
}

.pkg-tagline {
  position: relative;
  font-family: var(--font-text);
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(223, 175, 133, 0.7);
  margin: 0 0 1rem;
  line-height: 1.5;
}

.pkg-description {
  position: relative;
  font-family: var(--font-text);
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgba(255, 237, 223, 0.5);
  margin: 0 0 1.25rem;
}

.pkg-ideal {
  position: relative;
  font-family: var(--font-text);
  font-size: 0.8rem;
  line-height: 1.5;
  color: rgba(255, 237, 223, 0.4);
  margin: 0 0 1.5rem;
  padding: 0.875rem;
  border: 1px solid rgba(223, 175, 133, 0.08);
  border-radius: 2px;
}

.ideal-label {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  display: block;
  margin-bottom: 0.25rem;
}

.pkg-includes {
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.pkg-include-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-family: var(--font-text);
  font-size: 0.825rem;
  font-weight: 300;
  color: rgba(255, 237, 223, 0.6);
  line-height: 1.5;
}

.include-diamond {
  width: 5px;
  height: 5px;
  min-width: 5px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;
  margin-top: 0.45rem;
}

.pkg-spacer {
  flex: 1;
  min-height: 1.5rem;
}

.pkg-pricing {
  position: relative;
  margin-bottom: 1.5rem;
}

.pricing-rule {
  height: 1px;
  background: rgba(223, 175, 133, 0.1);
  margin-bottom: 1.25rem;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  margin-bottom: 0.25rem;
}

.price-prefix {
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: rgba(255, 237, 223, 0.4);
  font-weight: 400;
}

.price-currency {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  color: rgba(223, 175, 133, 0.65);
}

.price-amount {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #ffeddf;
  letter-spacing: 0.02em;
  line-height: 1;
}

.price-unit {
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: rgba(255, 237, 223, 0.5);
}

.price-vat {
  font-family: var(--font-text);
  font-size: 0.7rem;
  color: rgba(255, 237, 223, 0.3);
  display: block;
}

.pkg-cta {
  position: relative;
}

.pkg-cta-btn {
  width: 100%;
}

html:not(.dark) {
  .pkg-panel {
    background: linear-gradient(175deg, #ffffff 0%, #fff7f0 100%);
    border-right-color: var(--deco-line);
    border-bottom-color: var(--deco-line);
    box-shadow: 0 2px 12px rgba(153, 82, 38, 0.06);

    .num-rule     { background: var(--deco-line); }
    .num-label    { color: var(--color-primary-500); opacity: 0.7; }
    .deco-line    { background: var(--deco-line); }
    .deco-diamond { background: var(--deco-diamond); }
    .corner       { border-color: var(--deco-border); }

    .pkg-name        { color: var(--color-text-primary); }
    .pkg-tagline     { color: var(--color-text-subtle); }
    .pkg-description { color: var(--color-text-secondary); }
    .pkg-ideal {
      color: var(--color-text-tertiary);
      border-color: var(--deco-line);
      background: rgba(153, 82, 38, 0.025);
    }
    .ideal-label     { color: var(--color-primary-600); }
    .pkg-include-item { color: var(--color-text-secondary); }
    .include-diamond  { background: rgba(153, 82, 38, 0.5); }
    .pricing-rule     { background: var(--deco-line); }
    .price-prefix     { color: var(--color-text-subtle); }
    .price-currency   { color: var(--color-primary-600); }
    .price-amount     { color: var(--color-text-primary); }
    .price-unit       { color: var(--color-text-subtle); }
    .price-vat        { color: var(--color-text-muted); }

    .panel-gradient-layer {
      background: linear-gradient(
        160deg,
        rgba(153, 82, 38, 0.07) 0%,
        rgba(184, 115, 67, 0.03) 100%
      );
    }

    &:hover {
      .num-label    { opacity: 1; }
      .deco-diamond { background: rgba(153, 82, 38, 0.6); }
      .corner       { border-color: rgba(153, 82, 38, 0.35); }
    }
  }

  .pkg-panel--featured {
    background: linear-gradient(175deg, #ffe4cf 0%, #ffeddf 55%, #fff7f0 100%);
    border-right-color: rgba(153, 82, 38, 0.28);
    border-bottom-color: rgba(153, 82, 38, 0.28);
    box-shadow: 0 4px 24px rgba(153, 82, 38, 0.12);

    .pkg-name        { color: #441a08; }
    .pkg-tagline     { color: var(--color-primary-700); }
    .pkg-description { color: var(--color-text-secondary); }
    .pkg-ideal {
      color: var(--color-text-tertiary);
      border-color: rgba(153, 82, 38, 0.12);
      background: rgba(153, 82, 38, 0.04);
    }
    .ideal-label     { color: var(--color-primary-600); }
    .num-rule        { background: rgba(153, 82, 38, 0.2); }
    .num-label       { color: var(--color-primary-600); opacity: 0.85; }
    .deco-line       { background: rgba(153, 82, 38, 0.15); }
    .deco-diamond    { background: rgba(153, 82, 38, 0.45); }
    .corner          { border-color: rgba(153, 82, 38, 0.25); }
    .pkg-include-item { color: var(--color-text-secondary); }
    .include-diamond  { background: rgba(153, 82, 38, 0.55); }
    .pricing-rule     { background: rgba(153, 82, 38, 0.15); }
    .price-prefix     { color: var(--color-text-subtle); }
    .price-currency   { color: var(--color-primary-600); }
    .price-amount     { color: #441a08; }
    .price-unit       { color: var(--color-text-subtle); }
    .price-vat        { color: var(--color-text-muted); }

    .panel-gradient-layer {
      background: linear-gradient(
        160deg,
        rgba(153, 82, 38, 0.1) 0%,
        rgba(184, 115, 67, 0.05) 100%
      );
    }

    &:hover {
      .num-label    { opacity: 1; }
      .deco-diamond { background: rgba(153, 82, 38, 0.7); }
      .corner       { border-color: rgba(153, 82, 38, 0.45); }
    }
  }
}
</style>
