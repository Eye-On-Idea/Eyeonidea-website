<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

const { tm } = useI18n();

const services = computed(
  () =>
    tm("services.overview.services") as Array<{
      label: string;
      heading: string;
      body: string;
      linkText: string;
      linkHref: string;
      icon: string;
      id: string;
    }>,
);

const visibleSections = ref(new Set<number>());
const sectionRefs = ref<(HTMLElement | null)[]>([]);

function setSectionRef(el: unknown, index: number) {
  sectionRefs.value[index] = (el as HTMLElement) ?? null;
}

const observers: IntersectionObserver[] = [];

onMounted(() => {
  nextTick(() => {
    sectionRefs.value.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.value = new Set([...visibleSections.value, index]);
              observer.disconnect();
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -60px 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    });
  });
});

onUnmounted(() => {
  observers.forEach((o) => o.disconnect());
});
</script>

<template>
  <div class="overview-sections">
    <section
      v-for="(service, index) in services"
      :key="index"
      :id="service.id"
      :ref="(el) => setSectionRef(el, index)"
      class="service-section"
      :class="[
        index % 2 === 0 ? 'service-section--light' : 'service-section--alt',
        { 'animate-in': visibleSections.has(index) },
      ]"
      :aria-labelledby="`overview-heading-${index}`"
    >
      <div class="section-inner">
        <!-- Left: text content -->
        <div class="section-left">
          <span class="service-label">{{ service.label }}</span>
          <h2
            :id="`overview-heading-${index}`"
            class="service-heading"
          >
            {{ service.heading }}
          </h2>
          <p class="service-body">{{ service.body }}</p>
          <NuxtLink :to="service.linkHref" class="service-link">
            <span>{{ service.linkText }}</span>
            <UIcon
              name="i-heroicons-arrow-right"
              class="service-link__arrow"
              aria-hidden="true"
            />
          </NuxtLink>
        </div>

        <!-- Right: decorative icon -->
        <div class="section-right" aria-hidden="true">
          <div class="icon-display">
            <UIcon :name="service.icon" class="icon-display__symbol" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// ─── Section wrapper ──────────────────────────────────────────────────────────

.service-section {
  padding: 6rem 1.5rem;

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 10rem 2rem;
  }

  &--light {
    background: var(--color-section-light);
  }

  &--alt {
    background: var(--color-section-alt);
  }
}

// ─── Inner two-column grid ────────────────────────────────────────────────────

.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
  }
}

// ─── Entrance animation (triggered per-section) ───────────────────────────────

.section-left {
  opacity: 0;
  transform: translateX(-24px);
  transition:
    opacity 0.7s var(--ease-smooth),
    transform 0.7s var(--ease-smooth);
}

.section-right {
  opacity: 0;
  transform: translateX(24px);
  transition:
    opacity 0.7s var(--ease-smooth) 0.1s,
    transform 0.7s var(--ease-smooth) 0.1s;

  // Stack below text on mobile — swap to side-by-side on desktop
  @media (max-width: 1023px) {
    display: none;
  }
}

.animate-in {
  .section-left {
    opacity: 1;
    transform: translateX(0);
  }

  .section-right {
    opacity: 1;
    transform: translateX(0);
  }
}

// ─── Text content ─────────────────────────────────────────────────────────────

.service-label {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary-600);
  margin-bottom: 1rem;
}

.service-heading {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
  margin-bottom: 1.25rem;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.service-body {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--color-text-muted);
  max-width: 52ch;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

// ─── Link ─────────────────────────────────────────────────────────────────────

.service-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  min-height: 44px;
  background: var(--color-primary-500);
  color: white;
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition:
    background 0.2s var(--ease-smooth),
    transform 0.2s var(--ease-smooth);

  &:hover {
    background: var(--color-primary-600);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 4px;
  }
}

.service-link__arrow {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  transition: transform 0.2s var(--ease-smooth);

  .service-link:hover & {
    transform: translateX(3px);
  }
}

// ─── Decorative icon ──────────────────────────────────────────────────────────

.icon-display {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  max-width: 320px;
  margin: 0 auto;
  background: color-mix(in srgb, var(--color-primary-500) 6%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary-400) 15%, transparent);
  border-radius: 32px;
}

.icon-display__symbol {
  width: 40%;
  height: 40%;
  color: color-mix(in srgb, var(--color-primary-500) 35%, transparent);
}

// ─── Dark mode ────────────────────────────────────────────────────────────────

:root.dark {
  .service-section--light {
    background: var(--color-section-light);
  }

  .service-section--alt {
    background: var(--color-section-alt);
  }

  .service-label {
    color: var(--color-primary-400);
  }

  .service-link {
    background: var(--color-primary-600);

    &:hover {
      background: var(--color-primary-500);
    }
  }

  .icon-display {
    background: color-mix(in srgb, var(--color-primary-400) 8%, transparent);
    border-color: color-mix(in srgb, var(--color-primary-400) 12%, transparent);
  }

  .icon-display__symbol {
    color: color-mix(in srgb, var(--color-primary-400) 30%, transparent);
  }
}

// ─── Reduced motion ───────────────────────────────────────────────────────────

@media (prefers-reduced-motion: reduce) {
  .section-left,
  .section-right {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .service-link,
  .service-link__arrow {
    transition: none;

    &:hover {
      transform: none;
    }
  }
}
</style>
