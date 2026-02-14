<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Badge/tag text above the title */
    badge?: string;
    /** Section heading text */
    title?: string;
    /** Subtitle or description below the heading */
    subtitle?: string;
    /** Heading level (rendered as h2 or h3) */
    tag?: "h2" | "h3";
    /** Text alignment */
    align?: "left" | "center";
    /** ID for the heading element (for aria-labelledby) */
    headingId?: string;
  }>(),
  {
    tag: "h2",
    align: "center",
  }
);
</script>

<template>
  <div class="section-header" :class="`section-header--${align}`">
    <span v-if="badge" class="section-badge">{{ badge }}</span>
    <component
      :is="tag"
      v-if="title"
      :id="headingId"
      class="section-title"
    >
      <slot name="title">{{ title }}</slot>
    </component>
    <p v-if="subtitle" class="section-subtitle">
      {{ subtitle }}
    </p>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.section-header {
  margin-bottom: 3rem;

  &--center {
    text-align: center;
  }

  &--left {
    text-align: left;
  }
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--badge-accent-bg, rgba(42, 147, 134, 0.1));
  color: var(--badge-accent-text, var(--color-accent-600));
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  margin-bottom: 1rem;
  border: 1px solid var(--badge-accent-border, rgba(42, 147, 134, 0.2));
}

.section-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.section-subtitle {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 650px;

  .section-header--center & {
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}
</style>
