<script setup lang="ts">
import { withDelay } from "~/composables/useAccessibleMotion";

const { t } = useI18n();
const localePath = useLocalePath();

const cardMotion = withDelay("fadeInUp", 80);
</script>

<template>
  <section
    id="cta-section"
    class="cta-section"
    aria-labelledby="cta-heading"
  >
    <!-- Deep directional gradient -->
    <div class="cta-bg-gradient" aria-hidden="true" />
    <!-- Radial warmth at centre -->
    <div class="cta-bg-radial" aria-hidden="true" />

    <div class="cta-inner">
      <div
        class="cta-glass"
        :key="`cta-glass-${cardMotion}`"
        v-motion
        :initial="cardMotion.initial"
        :visible-once="cardMotion.visible"
      >
        <!-- Art deco corner frame -->
        <div class="deco-frame" aria-hidden="true">
          <span class="corner corner--tl" />
          <span class="corner corner--tr" />
          <span class="corner corner--bl" />
          <span class="corner corner--br" />
        </div>

        <!-- Badge -->
        <span class="cta-badge">
          {{ t("landing.cta.badge") }}
        </span>

        <!-- Deco divider -->
        <div class="cta-deco-divider" aria-hidden="true">
          <span class="deco-line" />
          <span class="deco-diamond deco-diamond--sm" />
          <span class="deco-line deco-line--inner" />
          <span class="deco-diamond" />
          <span class="deco-line deco-line--inner" />
          <span class="deco-diamond deco-diamond--sm" />
          <span class="deco-line" />
        </div>

        <!-- Heading -->
        <h2 id="cta-heading" class="cta-heading">
          {{ t("landing.cta.title") }}
        </h2>

        <!-- Description -->
        <p class="cta-description">
          {{ t("landing.cta.description") }}
        </p>

        <!-- Full-width strip CTA -->
        <NuxtLink
          :to="localePath('/contact')"
          class="cta-strip"
          :aria-label="t('landing.cta.primary')"
        >
          <span class="strip-deco" aria-hidden="true">
            <span class="strip-line" />
            <span class="strip-diamond strip-diamond--sm" />
            <span class="strip-line strip-line--inner" />
            <span class="strip-diamond" />
            <span class="strip-line strip-line--inner" />
            <span class="strip-diamond strip-diamond--sm" />
            <span class="strip-line" />
          </span>
          <span class="strip-label">
            {{ t("landing.cta.primary") }}
            <UIcon name="i-heroicons-arrow-right-20-solid" class="strip-icon" />
          </span>
          <span class="strip-deco" aria-hidden="true">
            <span class="strip-line" />
            <span class="strip-diamond strip-diamond--sm" />
            <span class="strip-line strip-line--inner" />
            <span class="strip-diamond" />
            <span class="strip-line strip-line--inner" />
            <span class="strip-diamond strip-diamond--sm" />
            <span class="strip-line" />
          </span>
        </NuxtLink>

        <!-- Contact info row -->
        <div class="cta-contacts">
          <a
            :href="`mailto:${t('common.contact.email')}`"
            class="cta-contact-link"
          >
            <UIcon name="i-heroicons-envelope" class="w-4 h-4 shrink-0" />
            <span>{{ t("common.contact.email") }}</span>
          </a>
          <span class="cta-contacts__sep" aria-hidden="true" />
          <a
            :href="`tel:${t('common.contact.phone').replace(/\s/g, '')}`"
            class="cta-contact-link"
          >
            <UIcon name="i-heroicons-phone" class="w-4 h-4 shrink-0" />
            <span>{{ t("common.contact.phone") }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.cta-section {
  position: relative;
  z-index: 1;
  background: transparent;
  padding: 8rem 1.5rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 11rem 1.5rem;
  }
}

/* ── Background layers ────────────────────────────────────────── */
.cta-bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 7, 6, 0.78) 0%,
    rgba(13, 9, 8, 0.72) 50%,
    rgba(10, 7, 6, 0.78) 100%
  );
  pointer-events: none;
}

.cta-bg-radial {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 55% 55% at 50% 50%,
    rgba(125, 52, 18, 0.30) 0%,
    transparent 70%
  );
  pointer-events: none;
}

/* ── Content wrapper ──────────────────────────────────────────── */
.cta-inner {
  position: relative;
  z-index: 10;
  max-width: 50rem;
  margin: 0 auto;
}

/* ── Glass card ───────────────────────────────────────────────── */
.cta-glass {
  position: relative;
  border-radius: 2px;
  padding: 3.5rem 2rem 2.5rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(223, 175, 133, 0.18);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  box-shadow:
    0 8px 48px rgba(0, 0, 0, 0.45),
    0 0 80px rgba(223, 175, 133, 0.06),
    inset 0 1px 0 rgba(255, 237, 223, 0.07);
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 5rem 4rem 3rem;
  }
}

/* ── Art deco corner frame ────────────────────────────────────── */
.deco-frame {
  position: absolute;
  inset: 1.25rem;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-color: rgba(223, 175, 133, 0.2);
  border-style: solid;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

/* ── Badge ────────────────────────────────────────────────────── */
.cta-badge {
  display: inline-block;
  margin-bottom: 1.5rem;
  padding: 0.4rem 1.25rem;
  border-radius: 100px;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.90);
  background: rgba(223, 175, 133, 0.12);
  border: 1px solid rgba(223, 175, 133, 0.30);
}

/* ── Deco divider ─────────────────────────────────────────────── */
.cta-deco-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  margin-bottom: 1.5rem;
  max-width: 20rem;
  margin-left: auto;
  margin-right: auto;
}

.deco-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.18);

  &--inner {
    flex: 0 0 1rem;
  }
}

.deco-diamond {
  width: 7px;
  height: 7px;
  background: rgba(223, 175, 133, 0.45);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 4px;
    height: 4px;
    background: rgba(223, 175, 133, 0.22);
  }
}

/* ── Heading ──────────────────────────────────────────────────── */
.cta-heading {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.08;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #ffeddf;
  margin: 0 0 1.25rem;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
}

/* ── Description ──────────────────────────────────────────────── */
.cta-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  line-height: 1.65;
  color: rgba(255, 237, 223, 0.58);
  max-width: 36rem;
  margin: 0 auto 2.5rem;
}

/* ── Full-width strip CTA ─────────────────────────────────────── */
.cta-strip {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: calc(100% + 4rem);
  margin-left: -2rem;
  margin-right: -2rem;
  margin-bottom: 2.5rem;
  padding: 1.5rem 2rem;
  background: #120703;
  border-top: 1px solid rgba(223, 175, 133, 0.14);
  border-bottom: 1px solid rgba(223, 175, 133, 0.14);
  text-decoration: none;
  transition: background 0.35s ease;

  &:hover {
    background: #1e0b04;

    .strip-diamond {
      background: rgba(223, 175, 133, 0.7);
    }

    .strip-diamond--sm {
      background: rgba(223, 175, 133, 0.4);
    }

    .strip-label {
      color: #dfaf85;
    }

    .strip-icon {
      transform: translateX(4px);
    }
  }

  &:focus-visible {
    outline: 2px solid #dfaf85;
    outline-offset: -2px;
  }

  @media (min-width: 768px) {
    width: calc(100% + 8rem);
    margin-left: -4rem;
    margin-right: -4rem;
    padding: 1.5rem 3rem;
  }
}

.strip-deco {
  flex: 1;
  display: none;
  align-items: center;
  gap: 0.55rem;

  @media (min-width: 768px) {
    display: flex;
  }
}

.strip-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.2);

  &--inner {
    flex: 0 0 1.25rem;
  }
}

.strip-diamond {
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
}

.strip-label {
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
  width: 100%;
  justify-content: center;

  @media (min-width: 768px) {
    width: auto;
    justify-content: flex-start;
  }
}

.strip-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.25s ease;
}

/* ── Contact row ──────────────────────────────────────────────── */
.cta-contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  @media (min-width: 480px) {
    flex-direction: row;
    gap: 1.25rem;
  }
}

.cta-contacts__sep {
  display: none;

  @media (min-width: 480px) {
    display: block;
    width: 1px;
    height: 1rem;
    background: rgba(255, 255, 255, 0.18);
  }
}

.cta-contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-text);
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(255, 237, 223, 0.48);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(223, 175, 133, 0.90);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.6);
    border-radius: 3px;
    outline-offset: 2px;
  }
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .cta-strip,
  .strip-diamond,
  .strip-label,
  .strip-icon,
  .cta-contact-link {
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  /* Section + background layers */
  .cta-section {
    background: var(--color-section-alt);
  }

  .cta-bg-gradient {
    background: linear-gradient(to bottom, #f0ebe5 0%, var(--color-section-alt) 50%, #f0ebe5 100%);
  }

  .cta-bg-radial {
    background: radial-gradient(
      ellipse 55% 55% at 50% 50%,
      rgba(153, 82, 38, 0.10) 0%,
      transparent 70%
    );
  }

  /* Glass card */
  .cta-glass {
    background: rgba(255, 255, 255, 0.65);
    border-color: var(--deco-border);
    box-shadow:
      0 8px 48px rgba(0, 0, 0, 0.06),
      0 0 80px rgba(153, 82, 38, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }

  /* Art deco corners */
  .corner {
    border-color: var(--deco-border);
  }

  /* Badge */
  .cta-badge {
    color: var(--color-primary-700);
    background: rgba(153, 82, 38, 0.10);
    border-color: var(--deco-border);
  }

  /* Deco divider */
  .deco-line {
    background: var(--deco-line);
  }

  .deco-diamond {
    background: var(--deco-diamond);

    &--sm {
      background: var(--deco-diamond-sm);
    }
  }

  /* Heading & description */
  .cta-heading {
    color: var(--color-text-primary);
  }

  .cta-description {
    color: var(--color-text-subtle);
  }

  /* Strip CTA */
  .cta-strip {
    background: rgba(153, 82, 38, 0.06);
    border-top-color: var(--deco-line);
    border-bottom-color: var(--deco-line);

    &:hover {
      background: rgba(153, 82, 38, 0.12);

      .strip-diamond {
        background: rgba(153, 82, 38, 0.65);
      }

      .strip-diamond--sm {
        background: rgba(153, 82, 38, 0.35);
      }

      .strip-label {
        color: var(--color-primary-600);
      }
    }

    &:focus-visible {
      outline-color: var(--color-primary-600);
    }
  }

  .strip-line {
    background: var(--deco-line);
  }

  .strip-diamond {
    background: var(--deco-diamond);

    &--sm {
      background: var(--deco-diamond-sm);
    }
  }

  .strip-label {
    color: var(--color-primary-500);
  }

  /* Contact row */
  .cta-contacts__sep {
    background: rgba(0, 0, 0, 0.12);
  }

  .cta-contact-link {
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
