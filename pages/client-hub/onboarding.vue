<script setup lang="ts">
definePageMeta({
  layout: "client-hub",
  middleware: ["client-hub-auth"],
});

const { t } = useI18n();
const route = useRoute();
const { getOnboardingSections } = useClientHub();

const sections = getOnboardingSections();
const stepperRef = ref();

// Map sections to stepper items
const stepperItems = computed(() =>
  sections.map((section, index) => ({
    value: section.key,
    title: t(section.titleKey),
    description: `${index + 1} / ${sections.length}`,
    slot: section.key,
  })),
);

// Support deep-linking via ?step= query param
const initialStep = computed(() => {
  const stepParam = route.query.step as string | undefined;
  if (stepParam && sections.some((s) => s.key === stepParam)) {
    return stepParam;
  }
  return sections[0]?.key;
});

// Track current step for progress display
const currentStep = ref(initialStep.value);

// Find current step index for progress display
const currentStepIndex = computed(() => {
  const idx = sections.findIndex((s) => s.key === currentStep.value);
  return idx >= 0 ? idx : 0;
});

// SEO
useSeoMeta({
  title: () =>
    `${t("clientHub.onboarding.title")} | ${t("clientHub.meta.title")}`,
  description: () => t("clientHub.onboarding.description"),
  ogTitle: () =>
    `${t("clientHub.onboarding.title")} | ${t("clientHub.meta.title")}`,
  ogDescription: () => t("clientHub.onboarding.description"),
  ogType: "article",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://eyeonidea.com/client-hub/onboarding",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        name: "Website Onboarding & Launch Guide",
        description:
          "Everything you need to know before and after your website launch.",
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
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2.5 rounded-xl bg-accent-500/10">
            <Icon
              name="i-heroicons-academic-cap"
              class="w-7 h-7 text-accent-500"
              aria-hidden="true"
            />
          </div>
          <div>
            <h1
              class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)"
            >
              {{ t("clientHub.onboarding.title") }}
            </h1>
          </div>
        </div>
        <p
          class="text-base text-(--color-text-secondary) leading-relaxed max-w-2xl"
        >
          {{ t("clientHub.onboarding.description") }}
        </p>
      </div>

      <!-- Progress indicator (compact, always visible) -->
      <div
        class="mb-6 flex items-center gap-3 p-3 rounded-xl bg-(--color-surface-1) border border-(--glass-border-subtle)"
      >
        <div
          class="text-sm font-semibold text-(--color-text-primary) whitespace-nowrap"
        >
          {{ currentStepIndex + 1 }} / {{ sections.length }}
        </div>
        <div class="flex-1 h-1.5 bg-(--color-surface-3) rounded-full overflow-hidden">
          <div
            class="h-full bg-accent-500 rounded-full transition-all duration-300"
            :style="{
              width: `${((currentStepIndex + 1) / sections.length) * 100}%`,
            }"
          />
        </div>
        <div class="text-xs text-(--color-text-tertiary) whitespace-nowrap hidden sm:block">
          {{ stepperItems[currentStepIndex]?.title }}
        </div>
      </div>

      <!-- Stepper -->
      <UStepper
        ref="stepperRef"
        v-model="currentStep"
        :items="stepperItems"
        orientation="vertical"
        :linear="false"
        color="primary"
        size="md"
      >
        <!-- Where We Are Now -->
        <template #whereWeAre>
          <div class="onboarding-content">
            <p>
              {{
                t("clientHub.onboarding.sections.whereWeAre.content")
              }}
            </p>
          </div>
        </template>

        <!-- Launch Timeline -->
        <template #launchTimeline>
          <div class="onboarding-content space-y-4">
            <div>
              <h3
                class="font-semibold text-(--color-text-primary) mb-1"
              >
                Before Launch
              </h3>
              <p>
                {{
                  t(
                    "clientHub.onboarding.sections.launchTimeline.beforeLaunch",
                  )
                }}
              </p>
            </div>
            <div>
              <h3
                class="font-semibold text-(--color-text-primary) mb-1"
              >
                Launch Day
              </h3>
              <p>
                {{
                  t(
                    "clientHub.onboarding.sections.launchTimeline.launchDay",
                  )
                }}
              </p>
            </div>
            <div>
              <h3
                class="font-semibold text-(--color-text-primary) mb-1"
              >
                After Launch
              </h3>
              <p>
                {{
                  t(
                    "clientHub.onboarding.sections.launchTimeline.afterLaunch",
                  )
                }}
              </p>
            </div>
          </div>
        </template>

        <!-- Access & Credentials -->
        <template #accessCredentials>
          <div class="onboarding-content space-y-4">
            <div>
              <h3
                class="font-semibold text-(--color-text-primary) mb-1"
              >
                CMS
              </h3>
              <p>
                {{
                  t(
                    "clientHub.onboarding.sections.accessCredentials.cms",
                  )
                }}
              </p>
            </div>
            <div>
              <h3
                class="font-semibold text-(--color-text-primary) mb-1"
              >
                Email
              </h3>
              <p>
                {{
                  t(
                    "clientHub.onboarding.sections.accessCredentials.email",
                  )
                }}
              </p>
            </div>
            <div>
              <h3
                class="font-semibold text-(--color-text-primary) mb-1"
              >
                Domain
              </h3>
              <p>
                {{
                  t(
                    "clientHub.onboarding.sections.accessCredentials.domain",
                  )
                }}
              </p>
            </div>
            <div>
              <h3
                class="font-semibold text-(--color-text-primary) mb-1"
              >
                Hosting
              </h3>
              <p>
                {{
                  t(
                    "clientHub.onboarding.sections.accessCredentials.hosting",
                  )
                }}
              </p>
            </div>
          </div>
        </template>

        <!-- Legal & Compliance -->
        <template #legalCompliance>
          <div class="onboarding-content">
            <p>
              {{
                t(
                  "clientHub.onboarding.sections.legalCompliance.content",
                )
              }}
            </p>
          </div>
        </template>

        <!-- SEO & Expectations -->
        <template #seoExpectations>
          <div class="onboarding-content">
            <p>
              {{
                t(
                  "clientHub.onboarding.sections.seoExpectations.content",
                )
              }}
            </p>
          </div>
        </template>

        <!-- Monitoring & Maintenance -->
        <template #monitoring>
          <div class="onboarding-content">
            <p>
              {{
                t("clientHub.onboarding.sections.monitoring.content")
              }}
            </p>
          </div>
        </template>

        <!-- Launch Checklist -->
        <template #launchChecklist>
          <div class="onboarding-content">
            <p class="mb-3">
              {{
                t(
                  "clientHub.onboarding.sections.launchChecklist.intro",
                )
              }}
            </p>
            <ul class="space-y-2 mb-4">
              <li
                v-for="(item, i) in (t('clientHub.onboarding.sections.launchChecklist.items') as unknown as string[])"
                :key="i"
                class="flex items-start gap-2.5"
              >
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-4.5 h-4.5 text-accent-500 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{{ item }}</span>
              </li>
            </ul>
            <div class="note-box">
              <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
              {{
                t(
                  "clientHub.onboarding.sections.launchChecklist.note",
                )
              }}
            </div>
          </div>
        </template>

        <!-- Support Window -->
        <template #supportWindow>
          <div class="onboarding-content">
            <p>
              {{
                t(
                  "clientHub.onboarding.sections.supportWindow.content",
                )
              }}
            </p>
          </div>
        </template>

        <!-- Handoff & Ownership -->
        <template #handoff>
          <div class="onboarding-content">
            <p>
              {{
                t("clientHub.onboarding.sections.handoff.content")
              }}
            </p>
          </div>
        </template>

        <!-- Communication -->
        <template #communication>
          <div class="onboarding-content">
            <p>
              {{
                t(
                  "clientHub.onboarding.sections.communication.content",
                )
              }}
            </p>
          </div>
        </template>
      </UStepper>

      <!-- Prev / Next buttons -->
      <div class="mt-8 flex items-center justify-between gap-4">
        <UButton
          :disabled="!stepperRef?.hasPrev"
          variant="outline"
          color="neutral"
          icon="i-heroicons-arrow-left"
          @click="stepperRef?.prev()"
        >
          {{ t("clientHub.article.previousArticle") }}
        </UButton>
        <UButton
          :disabled="!stepperRef?.hasNext"
          trailing-icon="i-heroicons-arrow-right"
          @click="stepperRef?.next()"
        >
          {{ t("clientHub.article.nextArticle") }}
        </UButton>
      </div>

      <!-- Need help callout -->
      <div
        class="mt-10 p-4 rounded-xl bg-(--color-surface-2) border border-(--glass-border-subtle)"
      >
        <div class="flex items-start gap-3">
          <Icon
            name="i-heroicons-chat-bubble-left-right"
            class="w-5 h-5 text-primary-500 shrink-0 mt-0.5"
            aria-hidden="true"
          />
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
    </div>
  </div>
</template>

<style scoped>
.onboarding-content {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.onboarding-content p {
  margin-bottom: 0.75rem;
}

.onboarding-content p:last-child {
  margin-bottom: 0;
}

.onboarding-content h3 {
  font-size: 0.9375rem;
}

.note-box {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: color-mix(in srgb, var(--color-primary-500) 5%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary-500) 15%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .onboarding-page * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
