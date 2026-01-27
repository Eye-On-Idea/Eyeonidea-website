<template>
  <nav :aria-label="t('news.article.breadcrumbLabel')" class="breadcrumb-nav">
    <ol class="breadcrumb-list">
      <li v-for="(crumb, index) in crumbs" :key="crumb.to" class="breadcrumb-item">
        <NuxtLink
          v-if="index < crumbs.length - 1"
          :to="crumb.to"
          class="breadcrumb-link"
        >
          <Icon
            v-if="index === 0"
            name="i-heroicons-home"
            class="breadcrumb-home-icon"
            aria-hidden="true"
          />
          <span :class="{ 'sr-only': index === 0 }">{{ crumb.label }}</span>
        </NuxtLink>
        <span v-else class="breadcrumb-current" aria-current="page">
          {{ crumb.label }}
        </span>
        <Icon
          v-if="index < crumbs.length - 1"
          name="i-heroicons-chevron-right"
          class="breadcrumb-separator"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface Crumb {
  label: string;
  to: string;
}

defineProps<{
  crumbs: Crumb[];
}>();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.breadcrumb-nav {
  padding: 1rem 0;
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--color-primary-600);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-smooth);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;

  &:hover {
    color: var(--color-primary-800);
    background: var(--color-primary-50);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
}

.breadcrumb-home-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.breadcrumb-separator {
  width: 1rem;
  height: 1rem;
  color: var(--color-primary-400);
  flex-shrink: 0;
}

.breadcrumb-current {
  color: var(--color-primary-900);
  font-weight: 500;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Dark mode */
:global(.dark) .breadcrumb-link {
  color: var(--color-primary-400);

  &:hover {
    color: var(--color-primary-200);
    background: rgba(64, 150, 255, 0.1);
  }
}

:global(.dark) .breadcrumb-separator {
  color: var(--color-primary-600);
}

:global(.dark) .breadcrumb-current {
  color: var(--color-primary-100);
}

/* Responsive */
@media (max-width: 640px) {
  .breadcrumb-current {
    max-width: 150px;
  }
}
</style>
