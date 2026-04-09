<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

definePageMeta({
  layout: "client-hub",
  middleware: ["client-hub-auth"],
});

const { t, tm } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const { getOnboardingSections } = useClientHub();

const sections = getOnboardingSections();
const fallbackSection = sections[0] ?? {
  key: "whereWeAre",
  titleKey: "clientHub.onboarding.sections.whereWeAre.title",
};

const STORAGE_KEY = "client-hub-onboarding-v1";

const currentIndex = ref(0);
const completedSteps = ref<Set<string>>(new Set());
const wizardComplete = ref(false);
const transitionDirection = ref<"forward" | "back">("forward");
const checkedItems = ref<Set<number>>(new Set());

onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      if (Array.isArray(data.completed)) {
        completedSteps.value = new Set(data.completed);
      }
      if (typeof data.currentIndex === "number" && data.currentIndex < sections.length) {
        currentIndex.value = data.currentIndex;
      }
      if (data.wizardComplete) {
        wizardComplete.value = true;
      }
      if (Array.isArray(data.checkedItems)) {
        checkedItems.value = new Set(data.checkedItems);
      }
    }
  } catch {

  }

  const stepParam = route.query.step as string | undefined;
  if (stepParam) {
    const idx = sections.findIndex((s) => s.key === stepParam);
    if (idx >= 0) currentIndex.value = idx;
  }
});

watch(
  [currentIndex, completedSteps, wizardComplete, checkedItems],
  () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentIndex: currentIndex.value,
          completed: [...completedSteps.value],
          wizardComplete: wizardComplete.value,
          checkedItems: [...checkedItems.value],
        })
      );
    } catch {

    }
  },
  { deep: true }
);

const toggleCheckItem = (index: number) => {
  if (checkedItems.value.has(index)) {
    checkedItems.value.delete(index);
  } else {
    checkedItems.value.add(index);
  }

  checkedItems.value = new Set(checkedItems.value);
};

const markCurrentStepComplete = () => {
  const section = sections[currentIndex.value];
  if (section) {
    completedSteps.value.add(section.key);
  }
};

const currentSection = computed(() => sections[currentIndex.value] ?? fallbackSection);
const isFirst = computed(() => currentIndex.value === 0);
const isLast = computed(() => currentIndex.value === sections.length - 1);
const progress = computed(
  () => ((currentIndex.value + 1) / sections.length) * 100
);
const progressLabelPrefix = computed(() => {
  const firstSegment = String(t("clientHub.onboarding.title")).split("—")[0] ?? "";
  return firstSegment.trim();
});

const goTo = (index: number) => {
  if (index === currentIndex.value) return;
  transitionDirection.value = index > currentIndex.value ? "forward" : "back";
  markCurrentStepComplete();
  currentIndex.value = index;
};

const next = () => {
  if (isLast.value) {
    markCurrentStepComplete();
    wizardComplete.value = true;
  } else {
    goTo(currentIndex.value + 1);
  }
};

const prev = () => {
  if (!isFirst.value) {
    transitionDirection.value = "back";
    currentIndex.value--;
  }
};

const restart = () => {
  wizardComplete.value = false;
  completedSteps.value = new Set();
  currentIndex.value = 0;
  transitionDirection.value = "forward";
};

const stepIcons: Record<string, string> = {
  whereWeAre: "i-heroicons-map-pin",
  launchTimeline: "i-heroicons-calendar-days",
  accessCredentials: "i-heroicons-key",
  legalCompliance: "i-heroicons-shield-check",
  seoExpectations: "i-heroicons-magnifying-glass",
  monitoring: "i-heroicons-chart-bar",
  launchChecklist: "i-heroicons-clipboard-document-check",
  supportWindow: "i-heroicons-lifebuoy",
  handoff: "i-heroicons-hand-raised",
  communication: "i-heroicons-chat-bubble-left-right",
};

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
  <div class="wizard-page">
    <div class="wizard-container">

      <div class="wizard-header">
        <div class="wizard-header__icon" aria-hidden="true">
          <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-accent-500" />
        </div>
        <div>
          <h1 class="wizard-header__title">
            {{ t("clientHub.onboarding.title") }}
          </h1>
          <p class="wizard-header__subtitle">
            {{ t("clientHub.onboarding.description") }}
          </p>
        </div>
      </div>

      <div class="wizard-indicators" role="navigation" aria-label="Onboarding steps">
        <div class="wizard-indicators__track">
          <template v-for="(section, index) in sections" :key="section.key">

            <div
              v-if="index > 0"
              class="wizard-indicators__line"
              :class="{ 'wizard-indicators__line--done': completedSteps.has(section.key) || index <= currentIndex }"
              aria-hidden="true"
            />

            <button
              type="button"
              class="wizard-step-dot"
              :class="{
                'wizard-step-dot--active': index === currentIndex && !wizardComplete,
                'wizard-step-dot--done': completedSteps.has(section.key),
              }"
              :aria-label="`Step ${index + 1}: ${t(section.titleKey)}${completedSteps.has(section.key) ? ' (completed)' : ''}`"
              :aria-current="index === currentIndex && !wizardComplete ? 'step' : undefined"
              @click="!wizardComplete && goTo(index)"
            >
              <UIcon
                v-if="completedSteps.has(section.key)"
                name="i-heroicons-check"
                class="wizard-step-dot__check"
                aria-hidden="true"
              />
              <span v-else class="wizard-step-dot__num" aria-hidden="true">
                {{ index + 1 }}
              </span>
            </button>
          </template>
        </div>

        <div class="wizard-progress" role="progressbar" aria-label="Onboarding progress" :aria-valuenow="Math.round(progress)" aria-valuemin="0" aria-valuemax="100">
          <div
            class="wizard-progress__fill"
            :style="{ width: `${wizardComplete ? 100 : progress}%` }"
          />
        </div>
        <div class="wizard-progress__label">
          <span v-if="!wizardComplete">
            {{ progressLabelPrefix }} {{ currentIndex + 1 }} / {{ sections.length }}
          </span>
          <span v-else class="wizard-complete-label">
            <UIcon name="i-heroicons-check-circle" class="w-4 h-4" aria-hidden="true" />
            All steps complete
          </span>
        </div>
      </div>

      <Transition :name="transitionDirection === 'forward' ? 'slide-forward' : 'slide-back'" mode="out-in">

        <div v-if="wizardComplete" key="complete" class="wizard-card wizard-card--complete">
          <div class="wizard-complete">
            <div class="wizard-complete__icon" aria-hidden="true">
              <UIcon name="i-heroicons-check-circle" class="w-12 h-12 text-accent-500" />
            </div>
            <h2 class="wizard-complete__title">You're all set!</h2>
            <p class="wizard-complete__body">
              You've completed the onboarding guide. You now have a clear picture of your launch timeline, access, legal setup, and how support works going forward.
            </p>
            <div class="wizard-complete__actions">
              <NuxtLink :to="localePath('/client-hub')" class="wizard-btn wizard-btn--primary">
                <UIcon name="i-heroicons-home" class="w-4 h-4" aria-hidden="true" />
                Back to Hub Home
              </NuxtLink>
              <button type="button" class="wizard-btn wizard-btn--ghost" @click="restart">
                <UIcon name="i-heroicons-arrow-path" class="w-4 h-4" aria-hidden="true" />
                Review again
              </button>
            </div>
          </div>
        </div>

        <div v-else :key="currentIndex" class="wizard-card">

          <div class="wizard-card__header">
            <div class="wizard-card__meta">
              <span class="wizard-card__badge">Step {{ currentIndex + 1 }} of {{ sections.length }}</span>
              <div class="wizard-card__step-icon" aria-hidden="true">
                <UIcon
                  :name="stepIcons[currentSection.key] || 'i-heroicons-document-text'"
                  class="w-5 h-5 text-accent-500"
                />
              </div>
            </div>
            <h2 class="wizard-card__title">{{ t(currentSection.titleKey) }}</h2>
          </div>

          <div class="wizard-card__divider" aria-hidden="true" />

          <div class="wizard-card__body">

            <template v-if="currentSection.key === 'whereWeAre'">
              <p class="wizard-text">
                {{ t("clientHub.onboarding.sections.whereWeAre.content") }}
              </p>
            </template>

            <template v-else-if="currentSection.key === 'launchTimeline'">
              <div class="wizard-info-cards">
                <div class="wizard-info-card wizard-info-card--before">
                  <div class="wizard-info-card__label">Before Launch</div>
                  <p class="wizard-text">{{ t("clientHub.onboarding.sections.launchTimeline.beforeLaunch") }}</p>
                </div>
                <div class="wizard-info-card wizard-info-card--day">
                  <div class="wizard-info-card__label">Launch Day</div>
                  <p class="wizard-text">{{ t("clientHub.onboarding.sections.launchTimeline.launchDay") }}</p>
                </div>
                <div class="wizard-info-card wizard-info-card--after">
                  <div class="wizard-info-card__label">After Launch</div>
                  <p class="wizard-text">{{ t("clientHub.onboarding.sections.launchTimeline.afterLaunch") }}</p>
                </div>
              </div>
            </template>

            <template v-else-if="currentSection.key === 'accessCredentials'">
              <div class="wizard-info-cards">
                <div class="wizard-info-card">
                  <div class="wizard-info-card__label">
                    <UIcon name="i-heroicons-globe-alt" class="w-3.5 h-3.5" aria-hidden="true" />
                    CMS
                  </div>
                  <p class="wizard-text">{{ t("clientHub.onboarding.sections.accessCredentials.cms") }}</p>
                </div>
                <div class="wizard-info-card">
                  <div class="wizard-info-card__label">
                    <UIcon name="i-heroicons-envelope" class="w-3.5 h-3.5" aria-hidden="true" />
                    Email
                  </div>
                  <p class="wizard-text">{{ t("clientHub.onboarding.sections.accessCredentials.email") }}</p>
                </div>
                <div class="wizard-info-card">
                  <div class="wizard-info-card__label">
                    <UIcon name="i-heroicons-link" class="w-3.5 h-3.5" aria-hidden="true" />
                    Domain
                  </div>
                  <p class="wizard-text">{{ t("clientHub.onboarding.sections.accessCredentials.domain") }}</p>
                </div>
                <div class="wizard-info-card">
                  <div class="wizard-info-card__label">
                    <UIcon name="i-heroicons-server" class="w-3.5 h-3.5" aria-hidden="true" />
                    Hosting
                  </div>
                  <p class="wizard-text">{{ t("clientHub.onboarding.sections.accessCredentials.hosting") }}</p>
                </div>
              </div>
            </template>

            <template v-else-if="currentSection.key === 'legalCompliance'">
              <p class="wizard-text">{{ t("clientHub.onboarding.sections.legalCompliance.content") }}</p>
            </template>

            <template v-else-if="currentSection.key === 'seoExpectations'">
              <p class="wizard-text">{{ t("clientHub.onboarding.sections.seoExpectations.content") }}</p>
            </template>

            <template v-else-if="currentSection.key === 'monitoring'">
              <p class="wizard-text">{{ t("clientHub.onboarding.sections.monitoring.content") }}</p>
            </template>

            <template v-else-if="currentSection.key === 'launchChecklist'">
              <p class="wizard-text mb-4">{{ t("clientHub.onboarding.sections.launchChecklist.intro") }}</p>
              <ul class="wizard-checklist" role="list">
                <li
                  v-for="(item, i) in (tm('clientHub.onboarding.sections.launchChecklist.items') as string[])"
                  :key="i"
                  class="wizard-checklist__item"
                  :class="{ 'wizard-checklist__item--checked': checkedItems.has(i) }"
                >
                  <label class="wizard-checklist__label">
                    <input
                      type="checkbox"
                      class="wizard-checklist__checkbox"
                      :checked="checkedItems.has(i)"
                      :aria-label="item"
                      @change="toggleCheckItem(i)"
                    />
                    <span class="wizard-checklist__box" aria-hidden="true">
                      <UIcon v-if="checkedItems.has(i)" name="i-heroicons-check" class="w-3 h-3" />
                    </span>
                    <span class="wizard-checklist__text">{{ item }}</span>
                  </label>
                </li>
              </ul>
              <div class="wizard-note">
                <UIcon name="i-heroicons-information-circle" class="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{{ t("clientHub.onboarding.sections.launchChecklist.note") }}</span>
              </div>
            </template>

            <template v-else-if="currentSection.key === 'supportWindow'">
              <p class="wizard-text">{{ t("clientHub.onboarding.sections.supportWindow.content") }}</p>
            </template>

            <template v-else-if="currentSection.key === 'handoff'">
              <p class="wizard-text">{{ t("clientHub.onboarding.sections.handoff.content") }}</p>
            </template>

            <template v-else-if="currentSection.key === 'communication'">
              <p class="wizard-text">{{ t("clientHub.onboarding.sections.communication.content") }}</p>
            </template>

          </div>
        </div>
      </Transition>

      <div v-if="!wizardComplete" class="wizard-nav">
        <button
          type="button"
          class="wizard-btn wizard-btn--outline"
          :disabled="isFirst"
          :aria-disabled="isFirst"
          @click="prev"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" aria-hidden="true" />
          {{ t("clientHub.article.previousArticle") }}
        </button>
        <button
          type="button"
          class="wizard-btn wizard-btn--primary"
          @click="next"
        >
          <span v-if="isLast">
            Finish
            <UIcon name="i-heroicons-check" class="w-4 h-4" aria-hidden="true" />
          </span>
          <span v-else>
            {{ t("clientHub.article.nextArticle") }}
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div class="wizard-help">
        <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5 text-primary-500 shrink-0" aria-hidden="true" />
        <div>
          <p class="wizard-help__title">{{ t("clientHub.article.needHelp") }}</p>
          <p class="wizard-help__text">{{ t("clientHub.article.needHelpText") }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>

.wizard-page {
  padding: 2rem 1rem 4rem;

  @media (min-width: 640px) {
    padding: 2.5rem 1.5rem 5rem;
  }
}

.wizard-container {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.wizard-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.wizard-header__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.875rem;
  background: color-mix(in srgb, var(--color-accent-500) 12%, transparent);
  flex-shrink: 0;
  margin-top: 2px;
}

.wizard-header__title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.25;
  margin-bottom: 0.375rem;

  @media (min-width: 640px) {
    font-size: var(--text-3xl);
  }
}

.wizard-header__subtitle {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 52ch;
}

.wizard-indicators {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.wizard-indicators__track {
  display: flex;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 4px 2px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.wizard-indicators__line {
  flex: 1;
  height: 2px;
  min-width: 12px;
  background: var(--glass-border-subtle, rgba(255,255,255,0.1));
  border-radius: 1px;
  transition: background 0.3s var(--ease-smooth);

  &--done {
    background: var(--color-accent-500);
  }
}

.wizard-step-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: var(--color-surface-3);
  flex-shrink: 0;
  cursor: pointer;
  transition:
    background 0.2s var(--ease-smooth),
    border-color 0.2s var(--ease-smooth),
    box-shadow 0.2s var(--ease-smooth),
    transform 0.2s var(--ease-smooth);
  position: relative;

  &:focus-visible {
    outline: 2px solid var(--color-accent-500);
    outline-offset: 3px;
  }

  &--active {
    width: 32px;
    height: 32px;
    border-color: var(--color-accent-500);
    background: color-mix(in srgb, var(--color-accent-500) 12%, transparent);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-accent-500) 15%, transparent);
  }

  &--done {
    background: var(--color-accent-500);
    border-color: var(--color-accent-500);
  }
}

.wizard-step-dot__num {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-text-muted);
  line-height: 1;

  .wizard-step-dot--active & {
    color: var(--color-accent-500);
  }
}

.wizard-step-dot__check {
  width: 13px;
  height: 13px;
  color: white;
}

.wizard-progress {
  height: 3px;
  background: var(--color-surface-3);
  border-radius: 9999px;
  overflow: hidden;
}

.wizard-progress__fill {
  height: 100%;
  background: var(--color-accent-500);
  border-radius: 9999px;
  transition: width 0.3s var(--ease-smooth);
}

.wizard-progress__label {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.wizard-complete-label {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--color-accent-500);
  font-weight: 500;
}

.wizard-card {
  background: var(--color-surface-1);
  border: 1px solid var(--glass-border-subtle);
  border-radius: var(--radius-xl, 1rem);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.wizard-card--complete {
  background: color-mix(in srgb, var(--color-accent-500) 5%, var(--color-surface-1));
  border-color: color-mix(in srgb, var(--color-accent-500) 20%, transparent);
}

.wizard-card__header {
  padding: 1.5rem 1.75rem 0;
}

.wizard-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.wizard-card__badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: color-mix(in srgb, var(--color-accent-500) 10%, transparent);
  color: var(--color-accent-500);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: 9999px;
  border: 1px solid color-mix(in srgb, var(--color-accent-500) 20%, transparent);
}

.wizard-card__step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: color-mix(in srgb, var(--color-accent-500) 10%, transparent);
}

.wizard-card__title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;

  @media (min-width: 640px) {
    font-size: var(--text-2xl);
  }
}

.wizard-card__divider {
  height: 1px;
  margin: 1.25rem 1.75rem 0;
  background: var(--glass-border-subtle);
}

.wizard-card__body {
  padding: 1.5rem 1.75rem 1.75rem;
}

.wizard-complete {
  padding: 3rem 1.75rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.wizard-complete__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-accent-500) 15%, transparent);
}

.wizard-complete__title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text);
}

.wizard-complete__body {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 46ch;
}

.wizard-complete__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.wizard-text {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.75;
}

.mb-4 {
  margin-bottom: 1rem;
}

.wizard-info-cards {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.wizard-info-card {
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  background: var(--color-surface-2);
  border: 1px solid var(--glass-border-subtle);
  border-left: 3px solid var(--color-accent-500);
}

.wizard-info-card--before {
  border-left-color: var(--color-primary-400);
}

.wizard-info-card--day {
  border-left-color: var(--color-accent-500);
}

.wizard-info-card--after {
  border-left-color: var(--color-primary-600);
}

.wizard-info-card__label {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.wizard-checklist {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.wizard-checklist__item {
  border-radius: 0.625rem;
  transition: background 0.15s var(--ease-smooth);

  &--checked {
    background: color-mix(in srgb, var(--color-accent-500) 6%, transparent);
  }
}

.wizard-checklist__label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  cursor: pointer;
  min-height: 44px;
  border-radius: 0.625rem;

  &:hover .wizard-checklist__box {
    border-color: var(--color-accent-500);
  }
}

.wizard-checklist__checkbox {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  &:focus-visible ~ .wizard-checklist__box {
    outline: 2px solid var(--color-accent-500);
    outline-offset: 2px;
  }
}

.wizard-checklist__box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.375rem;
  border: 2px solid var(--glass-border-subtle);
  background: var(--color-surface-2);
  flex-shrink: 0;
  transition:
    background 0.15s var(--ease-smooth),
    border-color 0.15s var(--ease-smooth);
  color: white;

  .wizard-checklist__item--checked & {
    background: var(--color-accent-500);
    border-color: var(--color-accent-500);
  }
}

.wizard-checklist__text {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.5;
  transition: color 0.15s var(--ease-smooth);

  .wizard-checklist__item--checked & {
    color: var(--color-text-muted);
    text-decoration: line-through;
    text-decoration-color: color-mix(in srgb, var(--color-text-muted) 50%, transparent);
  }
}

.wizard-note {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  background: color-mix(in srgb, var(--color-primary-500) 6%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary-500) 15%, transparent);
}

.wizard-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.wizard-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  min-height: 44px;
  border-radius: 0.625rem;
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition:
    background 0.2s var(--ease-smooth),
    color 0.2s var(--ease-smooth),
    box-shadow 0.2s var(--ease-smooth),
    transform 0.15s var(--ease-smooth);

  &:focus-visible {
    outline: 2px solid var(--color-accent-500);
    outline-offset: 3px;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &--primary {
    background: var(--color-accent-500);
    color: white;

    &:hover:not(:disabled) {
      background: color-mix(in srgb, var(--color-accent-500) 85%, black);
    }
  }

  &--outline {
    background: transparent;
    color: var(--color-text-muted);
    border: 1px solid var(--glass-border-subtle);

    &:hover:not(:disabled) {
      color: var(--color-text);
      border-color: var(--color-border);
      background: var(--color-surface-2);
    }

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
      transform: none;
    }
  }

  &--ghost {
    background: transparent;
    color: var(--color-text-muted);

    &:hover {
      color: var(--color-text);
      background: var(--color-surface-2);
    }
  }
}

.wizard-help {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  border-radius: 0.875rem;
  background: var(--color-surface-2);
  border: 1px solid var(--glass-border-subtle);
}

.wizard-help__title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.wizard-help__text {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.5;
}

.slide-forward-enter-active,
.slide-forward-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  transition:
    opacity 0.22s ease-out,
    transform 0.22s ease-out;
}

.slide-forward-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-forward-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-back-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-back-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

@media (prefers-reduced-motion: reduce) {
  .slide-forward-enter-active,
  .slide-forward-leave-active,
  .slide-back-enter-active,
  .slide-back-leave-active {
    transition: opacity 0.15s ease-out;
  }

  .slide-forward-enter-from,
  .slide-forward-leave-to,
  .slide-back-enter-from,
  .slide-back-leave-to {
    transform: none;
  }

  .wizard-step-dot,
  .wizard-progress__fill,
  .wizard-indicators__line,
  .wizard-btn {
    transition: none;
  }
}
</style>
