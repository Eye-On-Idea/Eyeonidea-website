<script setup lang="ts">
import { ref, computed } from "vue";
import { animationPresets, withDelay } from "~/composables/useAccessibleMotion";
import { useStrokeDraw } from "~/composables/useStrokeDraw";

const { t, tm } = useI18n();
const { cursorX, cursorY, prefersReducedMotion } = useCursorFollow();

const featuredRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);

useStrokeDraw(gridRef, {
  delay: 300,
  stagger: 150,
  duration: 700,
  selector: ".value-icon-wrap",
});

const values = computed(() =>
  tm("about.values.items") as Array<{ icon: string; title: string; description: string }>
);

// Cursor-following shine on featured card
const shineStyle = computed(() => {
  if (prefersReducedMotion.value || !featuredRef.value) return {};
  const rect = featuredRef.value?.getBoundingClientRect();
  if (!rect) return {};
  const x = cursorX.value - rect.left;
  const y = cursorY.value - rect.top;
  return {
    background: `radial-gradient(400px circle at ${x}px ${y}px, rgba(42, 147, 134, 0.08), transparent 60%)`,
  };
});
</script>

<template>
  <section
    class="about-values"
    aria-labelledby="values-heading"
  >
    <div class="section-container">
      <!-- Header -->
      <div
        class="section-header"
        v-motion
        :initial="animationPresets.fadeInUp.initial"
        :visible-once="animationPresets.fadeInUp.visible"
      >
        <span class="section-badge">{{ t("about.values.badge") }}</span>
        <h2 id="values-heading" class="section-title" style="text-wrap: balance">
          {{ t("about.values.title") }}
        </h2>
      </div>

      <!-- Bento Values Grid -->
      <div ref="gridRef" class="values-bento">
        <!-- First value: featured / larger -->
        <div
          v-if="values[0]"
          ref="featuredRef"
          v-motion
          :initial="animationPresets.fadeInUpScale.initial"
          :visible-once="withDelay('fadeInUpScale', 200).visible"
        >
          <TiltCard :max-tilt="6" :scale="1.02" class="value-card value-card--featured">
            <div class="value-icon-wrap" v-motion :initial="animationPresets.iconHover.initial" :hover="animationPresets.iconHover.hover">
              <UIcon :name="values[0].icon" class="value-icon" aria-hidden="true" />
            </div>
            <div class="value-text">
              <h3 class="value-title">{{ values[0].title }}</h3>
              <p class="value-description">{{ values[0].description }}</p>
            </div>
            <!-- Cursor-following shine overlay -->
            <div class="shine-overlay" :style="shineStyle" aria-hidden="true" />
          </TiltCard>
        </div>

        <!-- Remaining values: smaller cards -->
        <div
          v-for="(value, index) in values.slice(1)"
          :key="index + 1"
          v-motion
          :initial="animationPresets.staggerItem.initial"
          :visible-once="withDelay('staggerItem', 350 + index * 120).visible"
        >
          <TiltCard :max-tilt="8" :scale="1.03" class="value-card">
            <div class="value-icon-wrap" v-motion :initial="animationPresets.iconHover.initial" :hover="animationPresets.iconHover.hover">
              <UIcon :name="value.icon" class="value-icon" aria-hidden="true" />
            </div>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-description">{{ value.description }}</p>
          </TiltCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-values {
  padding: 6rem 1.5rem;
  background: var(--color-section-light);

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
}

.section-container {
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3.5rem;
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--color-accent-100);
  color: var(--color-accent-700);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: var(--text-3xl);
  color: var(--color-text);

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.values-bento {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.value-card {
  position: relative;
  padding: 2rem;
  background: var(--color-surface-1);
  border: 1px solid var(--glass-border-subtle);
  border-radius: var(--radius-xl);
  transition: box-shadow 0.2s var(--ease-smooth);

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }
}

// Featured card spans all 3 columns on desktop
.value-card--featured {
  overflow: hidden;

  @media (min-width: 640px) {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2.5rem;
  }

  .value-text {
    flex: 1;
  }

  .value-icon-wrap {
    @media (min-width: 640px) {
      width: 4rem;
      height: 4rem;
      flex-shrink: 0;
    }
  }

  .value-icon {
    @media (min-width: 640px) {
      width: 2rem;
      height: 2rem;
    }
  }

  .value-title {
    @media (min-width: 640px) {
      font-size: var(--text-xl);
    }
  }
}

// Featured card parent spans full width in the grid
.values-bento > :first-child {
  @media (min-width: 640px) {
    grid-column: 1 / -1;
  }
}

.shine-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  z-index: 1;
}

.value-icon-wrap {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-primary-500) 12%, transparent),
    color-mix(in srgb, var(--color-accent-500) 12%, transparent)
  );
  border-radius: var(--radius-lg);
}

.value-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-accent-600);
}

.value-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.value-description {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-muted);
}

// Dark mode
:root.dark {
  .about-values {
    background: var(--color-section-dark);
  }

  .section-badge {
    background: var(--color-accent-900);
    color: var(--color-accent-300);
  }

  .value-icon {
    color: var(--color-accent-400);
  }

  .value-card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
}
</style>
