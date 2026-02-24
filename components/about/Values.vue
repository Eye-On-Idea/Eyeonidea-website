<script setup lang="ts">
import { ref } from "vue";
import { animationPresets, withDelay } from "~/composables/useAccessibleMotion";
import { useStrokeDraw } from "~/composables/useStrokeDraw";

const { t, tm } = useI18n();
const gridRef = ref<HTMLElement | null>(null);

useStrokeDraw(gridRef, {
  delay: 200,
  stagger: 120,
  duration: 600,
  selector: ".value-icon-wrap",
});

const values = computed(
  () =>
    tm("about.values.items") as Array<{
      icon: string;
      title: string;
      description: string;
    }>,
);
</script>

<template>
  <section class="about-values" aria-labelledby="values-heading">
    <div class="section-container">
      <!-- Header -->
      <div
        class="section-header"
        v-motion
        :initial="animationPresets.fadeInUp.initial"
        :visible-once="animationPresets.fadeInUp.visible"
      >
        <span class="section-badge">{{ t("about.values.badge") }}</span>
        <br />
        <h2
          id="values-heading"
          class="section-title"
          style="text-wrap: balance"
        >
          {{ t("about.values.title") }}
        </h2>
      </div>

      <!-- Bento Values Grid — About-only: TiltCard + cursor shine for featured value highlight -->
      <div ref="gridRef" class="values-bento">
        <!-- First value: featured / larger -->
        <div
          v-if="values[0]"
          v-motion
          :initial="animationPresets.fadeInUpScale.initial"
          :visible-once="withDelay('fadeInUpScale', 200).visible"
        >
          <TiltCard
            :max-tilt="6"
            :scale="1.02"
            class="value-card value-card--featured"
          >
            <div
              class="value-icon-wrap"
              v-motion
              :initial="animationPresets.iconHover.initial"
              :hover="animationPresets.iconHover.hover"
            >
              <UIcon
                :name="values[0].icon"
                class="value-icon"
                aria-hidden="true"
              />
            </div>
            <div class="value-text">
              <h3 class="value-title">{{ values[0].title }}</h3>
              <p class="value-description">{{ values[0].description }}</p>
            </div>
          </TiltCard>
        </div>

        <!-- Remaining values: smaller cards -->
        <div
          v-for="(value, index) in values.slice(1)"
          :key="index + 1"
          v-motion
          :initial="animationPresets.staggerItem.initial"
          :visible-once="withDelay('staggerItem', 350 + index * 120).visible"
          class="h-full"
        >
          <TiltCard :max-tilt="8" :scale="1.03" class="value-card h-full">
            <div
              class="value-icon-wrap"
              v-motion
              :initial="animationPresets.iconHover.initial"
              :hover="animationPresets.iconHover.hover"
            >
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
  background: var(--color-primary-200);

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
  background: var(--color-primary-100);
  color: var(--color-primary-700);
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
  padding: 1.25rem;
  height: 100%;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  transition: box-shadow 0.2s var(--ease-smooth);

  @media (min-width: 480px) {
    padding: 2rem;
  }

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }
}

// Ensure TiltCard wrapper stretches to fill grid cell height for non-featured cards
.values-bento > :not(:first-child) :deep(.tilt-card-wrapper) {
  height: 100%;
}

// Featured card spans all 3 columns on desktop
.value-card--featured {
  overflow: hidden;

  @media (min-width: 480px) {
    padding: 2rem;
  }

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

.value-icon-wrap {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-100);
  border-radius: var(--radius-lg);
}

.value-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-primary-600);
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
    background: var(--color-primary-900);
    color: var(--color-primary-300);
  }

  .value-icon {
    color: var(--color-primary-300);
  }

  .value-card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
}
</style>
