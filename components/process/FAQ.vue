<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const openIndex = ref<number | null>(0); // First item open by default

onMounted(() => {
  if (!sectionRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});

interface FAQItem {
  question: string;
  answer: string;
}

const items = computed(() => tm("process.faq.items") as FAQItem[]);

const toggleItem = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <section
    ref="sectionRef"
    class="process-faq"
    aria-labelledby="faq-heading"
  >
    <div class="section-container">
      <!-- Header -->
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <span class="section-badge">{{ t("process.faq.title") }}</span>
        <h2 id="faq-heading" class="section-title">
          {{ t("process.faq.subtitle") }}
        </h2>
      </div>

      <!-- Accordion -->
      <div
        class="faq-list"
        :class="{ 'animate-in': isVisible }"
        role="list"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="faq-item"
          :class="{ 'faq-item--open': openIndex === index }"
          role="listitem"
        >
          <button
            type="button"
            class="faq-trigger"
            :aria-expanded="openIndex === index"
            :aria-controls="`faq-panel-${index}`"
            @click="toggleItem(index)"
          >
            <span class="faq-question">{{ item.question }}</span>
            <UIcon
              name="i-heroicons-chevron-down"
              class="faq-chevron"
              :class="{ 'faq-chevron--open': openIndex === index }"
              aria-hidden="true"
            />
          </button>

          <div
            :id="`faq-panel-${index}`"
            class="faq-panel"
            :class="{ 'faq-panel--open': openIndex === index }"
            role="region"
            :aria-label="item.question"
          >
            <p class="faq-answer">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.process-faq {
  padding: 5rem 1.5rem;
  background: var(--color-section-alt);

  @media (min-width: 768px) {
    padding: 7rem 2rem;
  }
}

.section-container {
  max-width: 800px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--badge-accent-bg);
  color: var(--badge-accent-text);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: var(--text-2xl);
  color: var(--color-text);

  @media (min-width: 768px) {
    font-size: var(--text-3xl);
  }
}

/* ── FAQ list ── */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s var(--ease-smooth) 0.2s,
    transform 0.6s var(--ease-smooth) 0.2s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-item {
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  overflow: hidden;
  transition: box-shadow var(--duration-fast) var(--ease-smooth);
}

.faq-item--open {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.faq-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 16px 20px;
  min-height: 56px;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  text-align: left;
}

.faq-trigger:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: -2px;
}

.faq-question {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: var(--text-base);
  }
}

.faq-chevron {
  width: 20px;
  height: 20px;
  color: var(--color-text-muted);
  transition: transform var(--duration-fast) var(--ease-smooth);
  flex-shrink: 0;
}

.faq-chevron--open {
  transform: rotate(180deg);
}

/* ── Panel (collapsible) ── */
.faq-panel {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    max-height 0.3s var(--ease-smooth),
    opacity 0.3s var(--ease-smooth);
}

.faq-panel--open {
  max-height: 500px;
  opacity: 1;
}

.faq-answer {
  padding: 0 20px 20px;
  font-size: var(--text-sm);
  line-height: 1.7;
  color: var(--color-text-muted);
  margin: 0;

  @media (min-width: 768px) {
    font-size: var(--text-base);
  }
}

/* ── Dark mode ── */
:root.dark {
  .process-faq {
    background: var(--color-section-dark);
  }

  .section-badge {
    background: var(--color-accent-900);
    color: var(--color-accent-300);
  }

  .faq-item {
    background: var(--card-bg);
    border-color: var(--card-border);
  }

  .faq-item--open {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .section-header,
  .faq-list {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .faq-panel {
    transition: none;
  }

  .faq-chevron {
    transition: none;
  }
}
</style>
