<script setup lang="ts">
definePageMeta({
  layout: "client-hub",
  middleware: ["client-hub-auth"],
});

const { t } = useI18n();
const { getOnboardingSections } = useClientHub();

const sections = getOnboardingSections();
const expandedItems = ref<Set<string>>(new Set());

function toggleItem(key: string) {
  if (expandedItems.value.has(key)) {
    expandedItems.value.delete(key);
  } else {
    expandedItems.value.add(key);
  }
}

function isItemExpanded(key: string) {
  return expandedItems.value.has(key);
}

function expandAll() {
  sections.forEach((s) => expandedItems.value.add(s.key));
}

function collapseAll() {
  expandedItems.value.clear();
}

const allExpanded = computed(() => expandedItems.value.size === sections.length);

useSeoMeta({
  title: () => `${t("clientHub.onboarding.title")} | ${t("clientHub.meta.title")}`,
  description: () => t("clientHub.onboarding.description"),
  ogTitle: () => `${t("clientHub.onboarding.title")} | ${t("clientHub.meta.title")}`,
  ogDescription: () => t("clientHub.onboarding.description"),
  ogType: "article",
});

useHead({
  link: [{ rel: "canonical", href: "https://eyeonidea.com/client-hub/onboarding" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        name: "Website Onboarding & Launch Guide",
        description: "Everything you need to know before and after your website launch.",
        publisher: {
          "@type": "Organization",
          name: "Eye On Idea",
          url: "https://eyeonidea.com",
        },
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Client Hub",
            item: "https://eyeonidea.com/client-hub",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Onboarding Guide",
          },
        ],
      }),
    },
  ],
});
</script>

<template>
  <div class="onboarding-page">
    <div class="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Breadcrumb -->
      <BaseBreadcrumb
        :crumbs="[
          { label: t('clientHub.breadcrumb.hub'), to: '/client-hub' },
          { label: t('clientHub.onboarding.title') },
        ]"
      />

      <!-- Header -->
      <div class="mt-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2.5 rounded-xl bg-accent-500/10">
            <Icon
              name="i-heroicons-academic-cap"
              class="w-7 h-7 text-accent-500"
              aria-hidden="true"
            />
          </div>
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)">
              {{ t("clientHub.onboarding.title") }}
            </h1>
          </div>
        </div>
        <p class="text-base text-(--color-text-secondary) leading-relaxed max-w-2xl">
          {{ t("clientHub.onboarding.description") }}
        </p>
      </div>

      <!-- Expand/Collapse all toggle -->
      <div class="mt-6 flex justify-end">
        <button
          class="text-sm text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors min-h-9 px-2"
          @click="allExpanded ? collapseAll() : expandAll()"
        >
          {{ allExpanded ? t("clientHub.onboarding.collapseLabel") : t("clientHub.onboarding.expandLabel") }}
        </button>
      </div>

      <!-- Sections accordion -->
      <div class="mt-2 space-y-2">
        <div
          v-for="(section, index) in sections"
          :key="section.key"
          class="onboarding-item rounded-xl border border-(--glass-border-subtle) overflow-hidden bg-(--color-surface-1)"
          :style="{ '--stagger-delay': `${index * 50}ms` }"
        >
          <button
            :id="`onboarding-trigger-${section.key}`"
            class="flex items-center justify-between w-full min-h-12 px-5 py-3.5 text-left font-medium text-(--color-text-primary) hover:bg-(--color-surface-2) transition-colors"
            :aria-expanded="isItemExpanded(section.key)"
            :aria-controls="`onboarding-panel-${section.key}`"
            @click="toggleItem(section.key)"
          >
            <div class="flex items-center gap-3">
              <span class="text-xs font-bold text-(--color-text-tertiary) w-5 text-center tabular-nums">{{ index + 1 }}</span>
              <span>{{ t(section.titleKey) }}</span>
            </div>
            <Icon
              name="i-heroicons-chevron-down"
              class="w-4 h-4 text-(--color-text-tertiary) shrink-0 transition-transform duration-200"
              :class="{ 'rotate-180': isItemExpanded(section.key) }"
              aria-hidden="true"
            />
          </button>

          <div
            :id="`onboarding-panel-${section.key}`"
            role="region"
            :aria-labelledby="`onboarding-trigger-${section.key}`"
            class="onboarding-panel"
            :class="{ 'onboarding-panel--open': isItemExpanded(section.key) }"
          >
            <div class="px-5 pb-5 pl-13 text-sm text-(--color-text-secondary) leading-relaxed article-content">
              <!-- Where We Are Now -->
              <template v-if="section.key === 'whereWeAre'">
                <p>{{ t("clientHub.onboarding.sections.whereWeAre.content") }}</p>
              </template>

              <!-- Launch Timeline -->
              <template v-else-if="section.key === 'launchTimeline'">
                <div class="space-y-4">
                  <div>
                    <h3 class="font-semibold text-(--color-text-primary) mb-1">Before Launch</h3>
                    <p>{{ t("clientHub.onboarding.sections.launchTimeline.beforeLaunch") }}</p>
                  </div>
                  <div>
                    <h3 class="font-semibold text-(--color-text-primary) mb-1">Launch Day</h3>
                    <p>{{ t("clientHub.onboarding.sections.launchTimeline.launchDay") }}</p>
                  </div>
                  <div>
                    <h3 class="font-semibold text-(--color-text-primary) mb-1">After Launch</h3>
                    <p>{{ t("clientHub.onboarding.sections.launchTimeline.afterLaunch") }}</p>
                  </div>
                </div>
              </template>

              <!-- Access & Credentials -->
              <template v-else-if="section.key === 'accessCredentials'">
                <div class="space-y-4">
                  <div>
                    <h3 class="font-semibold text-(--color-text-primary) mb-1">CMS</h3>
                    <p>{{ t("clientHub.onboarding.sections.accessCredentials.cms") }}</p>
                  </div>
                  <div>
                    <h3 class="font-semibold text-(--color-text-primary) mb-1">Email</h3>
                    <p>{{ t("clientHub.onboarding.sections.accessCredentials.email") }}</p>
                  </div>
                  <div>
                    <h3 class="font-semibold text-(--color-text-primary) mb-1">Domain</h3>
                    <p>{{ t("clientHub.onboarding.sections.accessCredentials.domain") }}</p>
                  </div>
                  <div>
                    <h3 class="font-semibold text-(--color-text-primary) mb-1">Hosting</h3>
                    <p>{{ t("clientHub.onboarding.sections.accessCredentials.hosting") }}</p>
                  </div>
                </div>
              </template>

              <!-- Launch Checklist -->
              <template v-else-if="section.key === 'launchChecklist'">
                <p class="mb-3">{{ t("clientHub.onboarding.sections.launchChecklist.intro") }}</p>
                <ul class="space-y-2 mb-4">
                  <li
                    v-for="(item, i) in (t('clientHub.onboarding.sections.launchChecklist.items') as unknown as string[])"
                    :key="i"
                    class="flex items-start gap-2.5"
                  >
                    <Icon name="i-heroicons-check-circle" class="w-4.5 h-4.5 text-accent-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
                <div class="note-box">
                  <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
                  {{ t("clientHub.onboarding.sections.launchChecklist.note") }}
                </div>
              </template>

              <!-- Generic content sections -->
              <template v-else-if="section.key === 'legalCompliance'">
                <p>{{ t("clientHub.onboarding.sections.legalCompliance.content") }}</p>
              </template>
              <template v-else-if="section.key === 'seoExpectations'">
                <p>{{ t("clientHub.onboarding.sections.seoExpectations.content") }}</p>
              </template>
              <template v-else-if="section.key === 'monitoring'">
                <p>{{ t("clientHub.onboarding.sections.monitoring.content") }}</p>
              </template>
              <template v-else-if="section.key === 'supportWindow'">
                <p>{{ t("clientHub.onboarding.sections.supportWindow.content") }}</p>
              </template>
              <template v-else-if="section.key === 'handoff'">
                <p>{{ t("clientHub.onboarding.sections.handoff.content") }}</p>
              </template>
              <template v-else-if="section.key === 'communication'">
                <p>{{ t("clientHub.onboarding.sections.communication.content") }}</p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Need help callout -->
      <div class="mt-10 p-4 rounded-xl bg-(--color-surface-2) border border-(--glass-border-subtle)">
        <div class="flex items-start gap-3">
          <Icon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 class="text-sm font-semibold text-(--color-text-primary)">
              {{ t("clientHub.article.needHelp") }}
            </h3>
            <p class="text-sm text-(--color-text-secondary) mt-0.5">
              {{ t("clientHub.article.needHelpText") }}
            </p>
          </div>
        </div>
      </div>

      <!-- Back to hub -->
      <div class="mt-8">
        <NuxtLink
          to="/client-hub"
          class="flex items-center gap-2 min-h-11 text-sm text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
        >
          <Icon name="i-heroicons-arrow-left" class="w-4 h-4" aria-hidden="true" />
          <span class="font-medium">{{ t("clientHub.onboarding.backToHub") }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.onboarding-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--duration-normal, 300ms) var(--ease-smooth, cubic-bezier(0.22, 1, 0.36, 1));
}

.onboarding-panel > div {
  overflow: hidden;
}

.onboarding-panel--open {
  grid-template-rows: 1fr;
}

.pl-13 {
  padding-left: 3.25rem;
}

.article-content :deep(h3) {
  font-size: 0.9375rem;
}

.article-content :deep(p) {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

.article-content :deep(p:last-child) {
  margin-bottom: 0;
}

.note-box {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: color-mix(in srgb, var(--color-primary-500) 5%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary-500) 15%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .onboarding-panel {
    transition: none;
  }

  .onboarding-page * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
