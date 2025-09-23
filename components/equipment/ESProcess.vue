<template>
  <section id="process" class="relative">
    <UContainer class="max-w-[1440px] py-12 md:py-14">
      <header class="mb-8 md:mb-10">
        <h2 class="text-3xl md:text-4xl font-semibold text-primary-900">
          Typical process flow
        </h2>
      </header>

      <!-- Smooth, eased emphasis per section; tighter rhythm -->
      <div class="relative">
        <ol class="space-y-8 md:space-y-12">
          <li
            v-for="(step, i) in steps"
            :key="i"
            :ref="(el) => setStepRef(el, i)"
            :aria-current="activeIndex === i ? 'step' : undefined"
            class="transition-[transform,opacity] duration-500 will-change-transform snap-start"
            :style="{
              transform: `scale(${scales[i] || 1})`,
              opacity: opacities[i] || 0.95,
            }"
          >
            <div
              class="grid md:grid-cols-[56px_1fr] gap-4 md:gap-6 items-start"
            >
              <!-- Number circle -->
              <div
                class="flex flex-col md:justify-center align-middle mt-auto mb-auto"
              >
                <div
                  class="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border-2 border-primary-900 bg-white text-primary-900 text-base md:text-lg font-semibold select-none"
                >
                  {{ i + 1 }}
                </div>
              </div>

              <!-- Content card -->
              <div
                class="rounded-xl ring-1 ring-[var(--color-border)] bg-white/90 p-4 md:p-5"
              >
                <h3 class="text-xl md:text-2xl font-semibold text-primary-900">
                  {{ step.label }}
                </h3>
                <p
                  v-if="step.lead"
                  class="mt-2 md:mt-3 text-base md:text-lg text-primary-900"
                >
                  {{ step.lead }}
                </p>
                <ul
                  v-if="step.points?.length"
                  class="mt-3 md:mt-4 space-y-1.5 md:space-y-2"
                >
                  <li
                    v-for="(p, k) in step.points"
                    :key="k"
                    class="pl-4 relative text-primary-900"
                  >
                    <span
                      class="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-primary-900"
                      aria-hidden="true"
                    ></span>
                    {{ p }}
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";

type Step = { label: string; lead?: string; points?: string[] };

const steps: Step[] = [
  {
    label: "Infeed & de-watering",
    lead: "Gentle infeed, screening and water removal to stabilize flow and protect product.",
    points: [
      "Stabilize upstream hopper levels and line pace",
      "Screen fines; remove free water to reduce carryover",
    ],
  },
  {
    label: "Blanching / Cooking",
    lead: "Clean-Flow® or rotary drum systems optimize heat transfer and uniformity.",
    points: [
      "Uniform residence time for consistent texture",
      "Hydro-Flow® agitation improves heat transfer and recovery",
    ],
  },
  {
    label: "Cooling & separation",
    lead: "Rapid cooling locks texture and stops cook; separation removes starch and fines.",
    points: [
      "Counter-flow cooling for lower water usage",
      "Starch removal to improve downstream QA",
    ],
  },
  {
    label: "Inspection & conveying",
    lead: "Product handling to packaging with optional QA gates.",
    points: [
      "Vision/metal detection where specified",
      "Sanitary conveyors with easy access for cleaning",
    ],
  },
  {
    label: "Packaging (chub/carton)",
    lead: "KartridgPak chubmaker or cartoning; date-coding integrated via Elmoprint.",
    points: [
      "Tight diameter control; flexible sealing options",
      "Recipe-driven changeovers for short runs",
    ],
  },
  {
    label: "Controls & data",
    lead: "Recipe control, OEE visibility and integration to plant systems.",
    points: [
      "PLC/HMI with multilingual UI and stored recipes",
      "OEE and alarms available for SCADA/MES",
    ],
  },
];

// Smooth eased emphasis based on distance to viewport center
const activeIndex = ref(0);
const stepEls = ref<HTMLElement[]>([]);
const scales = ref<number[]>([]);
const opacities = ref<number[]>([]);
let ticking = false;

function setStepRef(el: Element | null, i: number) {
  if (el) stepEls.value[i] = el as HTMLElement;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const viewportCenter = window.innerHeight / 2;
    const influence = Math.max(220, window.innerHeight * 0.6); // px over which emphasis builds
    let bestIdx = 0;
    let bestDist = Infinity;

    stepEls.value.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.abs(elCenter - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }

      // normalized 0..1 where 1 is at center
      const t = Math.max(0, 1 - dist / influence);
      const eased = easeOutCubic(t);
      // scale between 1.0 and 1.07; opacity between 0.9 and 1.0
      scales.value[idx] = 1 + 0.07 * eased;
      opacities.value[idx] = 0.9 + 0.1 * eased;
    });

    activeIndex.value = bestIdx;
    ticking = false;
  });
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // init
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
/* Tighter item height for less travel, still roomy */
ol > li {
  min-height: 25vh;
  max-height: 300px;
}

/* Smooth easing */
ol > li {
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  ol > li {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>
