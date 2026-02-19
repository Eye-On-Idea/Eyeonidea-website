<script setup lang="ts">
defineProps<{
  href: string;
  label: string;
  icon?: string;
}>();
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="external-link-btn"
  >
    <Icon
      :name="icon || 'i-heroicons-arrow-top-right-on-square'"
      class="w-4 h-4 shrink-0"
      aria-hidden="true"
    />
    <span>{{ label }}</span>
  </a>
</template>

<style scoped>
.external-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 0;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary-500);
  background: color-mix(in srgb, var(--color-primary-500) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary-500) 20%, transparent);
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s var(--ease-smooth, ease);
  min-height: 44px;
}

.external-link-btn:hover {
  background: color-mix(in srgb, var(--color-primary-500) 15%, transparent);
  border-color: color-mix(in srgb, var(--color-primary-500) 35%, transparent);
}

.external-link-btn:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .external-link-btn {
    transition-duration: 0.01ms !important;
  }
}
</style>
