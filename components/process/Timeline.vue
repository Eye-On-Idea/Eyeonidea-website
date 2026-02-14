<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useStrokeDraw } from "~/composables/useStrokeDraw";

const { t, tm } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const visibleSteps = ref<Set<string>>(new Set());
const activeStep = ref<string | null>(null);

const stepKeys = [
  "contact",
  "discovery",
  "proposal",
  "kickoff",
  "development",
  "preview",
  "payment",
  "postlaunch",
  "handoff",
] as const;

const stepIcons: Record<string, string> = {
  contact: "i-heroicons-phone",
  discovery: "i-heroicons-light-bulb",
  proposal: "i-heroicons-document-check",
  kickoff: "i-heroicons-rocket-launch",
  development: "i-heroicons-code-bracket",
  preview: "i-heroicons-eye",
  payment: "i-heroicons-banknotes",
  postlaunch: "i-heroicons-shield-check",
  handoff: "i-heroicons-hand-thumb-up",
};

interface StepCTA {
  label: string;
  to: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
  note?: string;
  cta?: StepCTA;
}

const steps = computed(() =>
  stepKeys.map((key) => {
    const step = tm(`process.timeline.steps.${key}`) as Step;
    return {
      key,
      icon: stepIcons[key],
      ...step,
    };
  })
);

// Stroke-draw for step icons
useStrokeDraw(sectionRef, {
  delay: 100,
  stagger: 80,
  duration: 600,
  selector: ".step-icon-wrapper",
});

let stepObserver: IntersectionObserver | null = null;
let activeObserver: IntersectionObserver | null = null;

onMounted(() => {
  if (!sectionRef.value) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Section visibility
  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          sectionObs.disconnect();
        }
      });
    },
    { threshold: 0.05 }
  );
  sectionObs.observe(sectionRef.value);

  // Individual step stagger animation (one-time reveal)
  stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const key = (entry.target as HTMLElement).dataset.step;
          if (key) visibleSteps.value.add(key);
          stepObserver?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  // Active step tracking (continuous - highlights current step)
  if (!prefersReduced) {
    activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = (entry.target as HTMLElement).dataset.step;
          if (!key) return;
          if (entry.isIntersecting) {
            activeStep.value = key;
          }
        });
      },
      { threshold: 0.4, rootMargin: "-20% 0px -40% 0px" }
    );
  }

  const stepElements = sectionRef.value.querySelectorAll("[data-step]");
  stepElements.forEach((el) => {
    stepObserver!.observe(el);
    activeObserver?.observe(el);
  });

  onUnmounted(() => {
    sectionObs.disconnect();
    stepObserver?.disconnect();
    activeObserver?.disconnect();
  });
});
</script>

<template>
  <section
    ref="sectionRef"
    class="process-timeline"
    aria-labelledby="timeline-heading"
  >
    <div class="section-container">
      <!-- Header -->
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 id="timeline-heading" class="section-title">
          {{ t("process.timeline.title") }}
        </h2>
        <p class="section-intro">
          {{ t("process.intro.text") }}
        </p>
      </div>

      <!-- Timeline -->
      <div class="timeline" role="list">
        <article
          v-for="(step, index) in steps"
          :key="step.key"
          :data-step="step.key"
          class="timeline-step"
          :class="{
            'timeline-step--visible': visibleSteps.has(step.key),
            'timeline-step--active': activeStep === step.key,
            'timeline-step--completed': visibleSteps.has(step.key) && stepKeys.indexOf(step.key) < stepKeys.indexOf(activeStep as any),
            'timeline-step--even': index % 2 === 1,
          }"
          role="listitem"
        >
          <!-- Connector line -->
          <div class="timeline-connector" aria-hidden="true">
            <div class="connector-line">
              <div class="connector-line__fill" />
            </div>
            <div class="connector-dot">
              <span class="dot-number">{{ step.number }}</span>
            </div>
          </div>

          <!-- Step card -->
          <div class="step-card">
            <div class="step-card__header">
              <div class="step-icon-wrapper">
                <UIcon :name="step.icon" class="step-icon" aria-hidden="true" />
              </div>
              <h3 class="step-title">{{ step.title }}</h3>
            </div>

            <p class="step-description">{{ step.description }}</p>

            <ul class="step-details" role="list">
              <li
                v-for="(detail, dIndex) in step.details"
                :key="dIndex"
                class="step-detail"
              >
                <UIcon name="i-heroicons-check-circle" class="detail-icon" aria-hidden="true" />
                <span>{{ detail }}</span>
              </li>
            </ul>

            <!-- Optional note -->
            <div v-if="step.note" class="step-note">
              <UIcon name="i-heroicons-information-circle" class="note-icon" aria-hidden="true" />
              <p>{{ step.note }}</p>
            </div>

            <!-- Optional CTA -->
            <NuxtLink
              v-if="step.cta"
              :to="step.cta.to"
              class="step-cta"
            >
              {{ step.cta.label }}
              <UIcon name="i-heroicons-arrow-right" class="cta-arrow" aria-hidden="true" />
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.process-timeline {
  padding: 5rem 1.5rem;
  background: var(--color-section-light);

  @media (min-width: 768px) {
    padding: 7rem 2rem;
  }
}

.section-container {
  max-width: 900px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
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

.section-title {
  font-size: var(--text-3xl);
  color: var(--color-text);
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.section-intro {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

/* ── Timeline layout ── */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Step ── */
.timeline-step {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  @media (min-width: 768px) {
    grid-template-columns: 60px 1fr;
    gap: 2rem;
  }
}

.timeline-step--visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline-step--active .connector-dot {
  box-shadow: 0 0 0 4px var(--color-section-light), 0 0 16px rgba(153, 82, 38, 0.4);
  transform: scale(1.1);
}

.timeline-step--active .step-card {
  border-color: color-mix(in srgb, var(--color-primary-400) 40%, transparent);
  box-shadow: 0 4px 20px rgba(153, 82, 38, 0.1);
}

.timeline-step--completed .connector-dot {
  background: var(--color-accent-500);
}

.timeline-step--visible .connector-line__fill {
  transform: scaleY(1);
}

.timeline-step--completed .connector-line__fill {
  background: linear-gradient(180deg, var(--color-accent-400), var(--color-accent-500));
}

/* ── Connector (left rail) ── */
.timeline-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.connector-line {
  width: 2px;
  flex: 1;
  background: color-mix(in srgb, var(--color-primary-400) 15%, transparent);
  position: relative;
  overflow: hidden;
}

.connector-line__fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    var(--color-primary-400),
    var(--color-accent-400)
  );
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.8s var(--ease-smooth);
}

.timeline-step:first-child .connector-line {
  // No line above the first dot
}

.connector-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 0 4px var(--color-section-light), 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  transition:
    box-shadow var(--duration-slow) var(--ease-smooth),
    transform var(--duration-slow) var(--ease-smooth),
    background var(--duration-slow) var(--ease-smooth);

  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
  }
}

.dot-number {
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;

  @media (min-width: 768px) {
    font-size: 0.8125rem;
  }
}

/* ── Step card ── */
.step-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: box-shadow var(--duration-normal) var(--ease-smooth);

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  }

  @media (min-width: 768px) {
    padding: 2rem;
    margin-bottom: 2rem;
  }
}

.step-card__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.step-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--color-primary-100);
  flex-shrink: 0;
}

.step-icon {
  width: 22px;
  height: 22px;
  color: var(--icon-primary);
}

.step-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
  margin: 0;

  @media (min-width: 768px) {
    font-size: var(--text-xl);
  }
}

.step-description {
  font-size: var(--text-sm);
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: var(--text-base);
  }
}

/* ── Details list ── */
.step-details {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-detail {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: var(--text-sm);
  color: var(--color-text);
  line-height: 1.5;
}

.detail-icon {
  width: 18px;
  height: 18px;
  color: var(--color-accent-500);
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── Note callout ── */
.step-note {
  display: flex;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--color-accent-500) 6%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent-500) 15%, transparent);
  margin-bottom: 1rem;
}

.note-icon {
  width: 18px;
  height: 18px;
  color: var(--color-accent-600);
  flex-shrink: 0;
  margin-top: 2px;
}

.step-note p {
  font-size: var(--text-xs);
  line-height: 1.6;
  color: var(--color-text-muted);
  margin: 0;

  @media (min-width: 768px) {
    font-size: var(--text-sm);
  }
}

/* ── CTA link ── */
.step-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  min-height: 36px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary-600);
  text-decoration: none;
  border-radius: 8px;
  background: color-mix(in srgb, var(--color-primary-500) 8%, transparent);
  transition: all var(--duration-fast) var(--ease-smooth);
}

.step-cta:hover {
  background: color-mix(in srgb, var(--color-primary-500) 14%, transparent);
  color: var(--color-primary-700);
}

.step-cta:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.cta-arrow {
  width: 16px;
  height: 16px;
  transition: transform var(--duration-fast) var(--ease-smooth);
}

.step-cta:hover .cta-arrow {
  transform: translateX(3px);
}

/* ── Dark mode ── */
:root.dark {
  .process-timeline {
    background: var(--color-section-dark);
  }

  .connector-dot {
    box-shadow: 0 0 0 4px var(--color-section-dark), 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .timeline-step--active .connector-dot {
    box-shadow: 0 0 0 4px var(--color-section-dark), 0 0 16px rgba(211, 154, 105, 0.5);
  }

  .timeline-step--active .step-card {
    border-color: color-mix(in srgb, var(--color-primary-400) 30%, transparent);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }

  .step-card {
    background: var(--card-bg);
    border-color: var(--card-border);

    &:hover {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    }
  }

  .step-icon-wrapper {
    background: var(--color-primary-900);
  }

  .step-icon {
    color: var(--color-primary-300);
  }

  .detail-icon {
    color: var(--color-accent-400);
  }

  .step-note {
    background: color-mix(in srgb, var(--color-accent-400) 8%, transparent);
    border-color: color-mix(in srgb, var(--color-accent-400) 15%, transparent);
  }

  .note-icon {
    color: var(--color-accent-400);
  }

  .step-cta {
    color: var(--color-primary-300);
    background: color-mix(in srgb, var(--color-primary-400) 10%, transparent);

    &:hover {
      background: color-mix(in srgb, var(--color-primary-400) 16%, transparent);
      color: var(--color-primary-200);
    }
  }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .section-header,
  .timeline-step {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .connector-dot {
    transition: none;
  }

  .connector-line__fill {
    transform: scaleY(1);
    transition: none;
  }

  .cta-arrow {
    transition: none;
  }
}
</style>
