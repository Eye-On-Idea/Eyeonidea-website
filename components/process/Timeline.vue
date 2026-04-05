<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();
const localePath = useLocalePath();

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

const stepImages: Record<string, string> = {
  contact:     "/images/process/step-initial-contact.jpg",
  discovery:   "/images/process/step-discovery-meeting.jpg",
  proposal:    "/images/process/step-proposal-agreement.jpg",
  kickoff:     "/images/process/step-project-kickoff.jpg",
  development: "/images/process/step-development-progress.jpg",
  preview:     "/images/process/step-pre-launch-preview.jpg",
  payment:     "/images/process/step-final-payment-launch.jpg",
  postlaunch:  "/images/process/step-post-launch-support.jpg",
  handoff:     "/images/process/step-handoff-beyond.jpg",
};

const stepImageAlts: Record<string, string> = {
  contact:     "Step 1 — inbox view with meeting invitation and project note cards representing the initial contact phase",
  discovery:   "Step 2 — discovery workshop materials with audience profile cards, asset audit checklist, and timeline worksheet",
  proposal:    "Step 3 — finalized proposal pack with scope map, deliverable matrix, pricing summary, and GDPR compliance note",
  kickoff:     "Step 4 — project board setup with sprint calendar and communication channels representing the project kickoff",
  development: "Step 5 — staged website interface build with version notes and optional preview server indicator",
  preview:     "Step 6 — test URL preview on screen with feedback annotations and final approval checklist",
  payment:     "Step 7 — final invoice card with go-live checklist and deployment confirmation markers",
  postlaunch:  "Step 8 — monitoring dashboard and two-week stability tracker representing the post-launch support phase",
  handoff:     "Step 9 — completed project archive with ongoing support plan options and future roadmap cards",
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
    return { key, ...step };
  }),
);

let stepObserver: IntersectionObserver | null = null;
let activeObserver: IntersectionObserver | null = null;

onMounted(() => {
  if (!sectionRef.value) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
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
    { threshold: 0.05 },
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
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
  );

  // Active step tracking (continuous — highlights current step)
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
      { threshold: 0.4, rootMargin: "-20% 0px -40% 0px" },
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
    <!-- Section label row -->
    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("process.timeline.title") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-container">
      <!-- Header -->
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 id="timeline-heading" class="section-title">
          {{ t("process.timeline.title") }}
        </h2>
        <p class="section-intro">{{ t("process.intro.text") }}</p>
      </div>

      <!-- Timeline -->
      <div class="timeline">
        <article
          v-for="(step, index) in steps"
          :key="step.key"
          :data-step="step.key"
          class="timeline-step"
          :class="{
            'timeline-step--visible': visibleSteps.has(step.key),
            'timeline-step--active': activeStep === step.key,
            'timeline-step--completed':
              visibleSteps.has(step.key) &&
              stepKeys.indexOf(step.key) <
                stepKeys.indexOf(activeStep as (typeof stepKeys)[number]),
          }"
          :style="{ transitionDelay: visibleSteps.has(step.key) ? `${index * 60}ms` : '0ms' }"
        >
          <!-- Left rail: connector line + badge -->
          <div class="timeline-connector" aria-hidden="true">
            <div class="connector-line">
              <div class="connector-line__fill" />
            </div>
            <div class="connector-badge">
              <span class="badge-number">{{ step.number }}</span>
            </div>
            <div class="connector-line connector-line--below">
              <div class="connector-line__fill" />
            </div>
          </div>

          <!-- Step card -->
          <div class="step-card">
            <!-- Corner frame -->
            <div class="deco-frame" aria-hidden="true">
              <span class="corner corner--tl" />
              <span class="corner corner--tr" />
              <span class="corner corner--bl" />
              <span class="corner corner--br" />
            </div>

            <!-- Card header -->
            <div class="step-card__header">
              <div class="step-numeral-row" aria-hidden="true">
                <span class="step-rule" />
                <span class="step-num">{{ step.number }}</span>
                <span class="step-rule" />
              </div>
              <h3 class="step-title">{{ step.title }}</h3>
            </div>

            <p class="step-description">{{ step.description }}</p>

            <!-- Step visual -->
            <div class="step-image-wrap">
              <NuxtImg
                :src="stepImages[step.key]"
                :alt="stepImageAlts[step.key]"
                class="step-image"
                width="960"
                height="540"
                format="webp"
                quality="78"
                loading="lazy"
              />
              <div class="step-img-deco" aria-hidden="true">
                <span class="si-corner si-corner--tl" />
                <span class="si-corner si-corner--tr" />
                <span class="si-corner si-corner--bl" />
                <span class="si-corner si-corner--br" />
              </div>
            </div>

            <!-- Details list -->
            <ul class="step-details" role="list">
              <li
                v-for="(detail, dIndex) in step.details"
                :key="dIndex"
                class="step-detail"
              >
                <span class="detail-diamond" aria-hidden="true" />
                <span>{{ detail }}</span>
              </li>
            </ul>

            <!-- Optional note -->
            <div v-if="step.note" class="step-note">
              <p>{{ step.note }}</p>
            </div>

            <!-- Optional CTA -->
            <div v-if="step.cta" class="step-cta-wrapper">
              <AppCtaButton
                variant="secondary"
                :to="localePath(step.cta.to)"
                class="step-cta-btn"
              >
                {{ step.cta.label }}
              </AppCtaButton>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.process-timeline {
  background: #0d0908;
  padding-bottom: 0;
}

/* ── Section label row ────────────────────────────────────────── */
.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 2rem 3rem;
}

.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.sep-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.sep-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  flex-shrink: 0;
}

/* ── Container ────────────────────────────────────────────────── */
.section-container {
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

/* ── Header ───────────────────────────────────────────────────── */
.section-header {
  margin-bottom: 3.5rem;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  line-height: 1.1;
  color: #fff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}

.section-intro {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.5);
  max-width: 52ch;
  margin: 0;
}

/* ── Timeline ─────────────────────────────────────────────────── */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Step ─────────────────────────────────────────────────────── */
.timeline-step {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.6s var(--ease-smooth),
    transform 0.6s var(--ease-smooth);

  &.timeline-step--visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 640px) {
    grid-template-columns: 3rem 1fr;
    gap: 2rem;
  }
}

/* ── Left connector rail ──────────────────────────────────────── */
.timeline-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.connector-line {
  width: 1px;
  flex: 1;
  min-height: 1.5rem;
  background: rgba(223, 175, 133, 0.12);
  position: relative;
  overflow: hidden;

  &--below {
    min-height: 2rem;
  }
}

.connector-line__fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(223, 175, 133, 0.5),
    rgba(223, 175, 133, 0.2)
  );
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.8s var(--ease-smooth);
}

.timeline-step--visible .connector-line__fill {
  transform: scaleY(1);
}

.connector-badge {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(223, 175, 133, 0.06);
  border: 1px solid rgba(223, 175, 133, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  transition: border-color 0.3s ease, background 0.3s ease;

  @media (min-width: 640px) {
    width: 3rem;
    height: 3rem;
  }
}

.badge-number {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgba(223, 175, 133, 0.55);
}

/* Active step highlights */
.timeline-step--active .connector-badge {
  border-color: rgba(223, 175, 133, 0.5);
  background: rgba(223, 175, 133, 0.1);
}

.timeline-step--active .badge-number {
  color: rgba(223, 175, 133, 0.85);
}

.timeline-step--active .step-card {
  border-color: rgba(223, 175, 133, 0.22);
}

.timeline-step--completed .connector-line__fill {
  background: rgba(223, 175, 133, 0.45);
}

/* ── Step card ────────────────────────────────────────────────── */
.step-card {
  position: relative;
  background: #161210;
  border: 1px solid rgba(223, 175, 133, 0.1);
  border-radius: 2px;
  padding: 1.75rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: border-color 0.3s ease;

  @media (min-width: 640px) {
    padding: 2rem 2.25rem;
    margin-bottom: 2rem;
  }
}

/* ── Corner frame ─────────────────────────────────────────────── */
.deco-frame {
  position: absolute;
  inset: 0.75rem;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  border-color: rgba(223, 175, 133, 0.12);
  border-style: solid;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

/* ── Card header ──────────────────────────────────────────────── */
.step-card__header {
  margin-bottom: 0.875rem;
}

.step-numeral-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.625rem;
}

.step-rule {
  height: 1px;
  flex: 1;
  background: rgba(223, 175, 133, 0.1);
}

.step-num {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(223, 175, 133, 0.4);
}

.step-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  color: #ffeddf;
  margin: 0;
  letter-spacing: -0.01em;
}

/* ── Description ──────────────────────────────────────────────── */
.step-description {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.875rem, 1vw, 0.95rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.5);
  margin: 0 0 1.25rem;
}

/* ── Details list ─────────────────────────────────────────────── */
.step-details {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-detail {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-text);
  font-size: 0.85rem;
  color: rgba(255, 237, 223, 0.6);
  line-height: 1.5;
}

.detail-diamond {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.45);
  transform: rotate(45deg);
}

/* ── Note callout ─────────────────────────────────────────────── */
.step-note {
  padding: 0.875rem 1rem;
  border-left: 2px solid rgba(223, 175, 133, 0.3);
  background: rgba(223, 175, 133, 0.03);
  margin-bottom: 1.25rem;

  p {
    font-family: var(--font-text);
    font-weight: 300;
    font-size: 0.8rem;
    line-height: 1.65;
    color: rgba(255, 237, 223, 0.4);
    margin: 0;
  }
}

/* ── Step CTA ─────────────────────────────────────────────────── */
.step-cta-wrapper {
  margin-top: 0.5rem;
}

/* ── Step image ───────────────────────────────────────────────── */
.step-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  margin: 0 0 1.25rem;
  border: 1px solid rgba(223, 175, 133, 0.06);
}

.step-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.step-img-deco {
  position: absolute;
  inset: 0.5rem;
  pointer-events: none;
}

.si-corner {
  position: absolute;
  width: 0.625rem;
  height: 0.625rem;
  border-color: rgba(223, 175, 133, 0.18);
  border-style: solid;

  &--tl { top: 0; left: 0;  border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0;  border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

/* ── Reduced motion ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .section-header,
  .timeline-step {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .connector-badge,
  .step-card {
    transition: none;
  }

  .connector-line__fill {
    transform: scaleY(1);
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .process-timeline { background: var(--color-section-light); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .section-title { color: var(--color-text-primary); }
  .section-intro { color: var(--color-text-subtle); }

  .connector-line { background: var(--deco-line); }

  .connector-line__fill {
    background: linear-gradient(
      180deg,
      rgba(153, 82, 38, 0.5),
      rgba(153, 82, 38, 0.2)
    );
  }

  .connector-badge {
    background: rgba(153, 82, 38, 0.05);
    border-color: var(--deco-line-strong);
  }

  .badge-number { color: var(--color-primary-500); opacity: 0.7; }

  .timeline-step--active .connector-badge {
    border-color: var(--color-primary-400);
    background: rgba(153, 82, 38, 0.10);
  }

  .timeline-step--active .badge-number { color: var(--color-primary-600); opacity: 1; }

  .timeline-step--active .step-card { border-color: var(--deco-line-strong); }

  .timeline-step--completed .connector-line__fill {
    background: rgba(153, 82, 38, 0.45);
  }

  .step-card {
    background: rgba(255, 255, 255, 0.80);
    border-color: var(--deco-line);
  }

  .corner    { border-color: var(--deco-border); }
  .step-rule { background: var(--deco-line); }
  .step-num  { color: var(--color-primary-500); opacity: 0.5; }

  .step-title       { color: var(--color-text-primary); }
  .step-description { color: var(--color-text-subtle); }
  .step-detail      { color: var(--color-text-secondary); }
  .detail-diamond   { background: rgba(153, 82, 38, 0.45); }

  .step-note {
    border-left-color: var(--deco-line-strong);
    background: rgba(153, 82, 38, 0.03);

    p { color: var(--color-text-subtle); }
  }
}
</style>
