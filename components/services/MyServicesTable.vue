<template>
  <UCard class="bg-white dark:bg-neutral-900 border border-brand-200/40">
    <div class="px-2 sm:px-4">
      <h2
        class="text-xl font-semibold text-neutral-900 dark:text-brand-100 mb-4"
      >
        Service Packages
      </h2>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <!-- Column titles -->
          <thead>
            <tr class="bg-brand-500 text-white">
              <th
                scope="col"
                class="text-left text-sm font-medium px-4 py-3 rounded-tl-xl"
              ></th>
              <th
                scope="col"
                class="text-center text-sm font-semibold px-4 py-3"
              >
                Time Based
              </th>
              <th
                scope="col"
                class="text-center text-sm font-semibold px-4 py-3"
              >
                Project Based
              </th>
              <th
                scope="col"
                class="text-center text-sm font-semibold px-4 py-3 rounded-tr-xl"
              >
                Retainer Based
              </th>
            </tr>
            <!-- Pricing row under headers -->
            <tr
              class="bg-brand-50 text-neutral-900 dark:bg-neutral-800 dark:text-brand-100"
            >
              <th scope="row" class="text-left text-xs font-medium px-4 py-2">
                Pricing
              </th>
              <td class="text-center text-sm px-4 py-2">
                <span class="font-medium">From €60/hour</span>
                <span class="block text-xs opacity-80"
                  >Great for quick tasks & QA</span
                >
              </td>
              <td class="text-center text-sm px-4 py-2">
                <span class="font-medium">Scoped — tailored quote</span>
                <span class="block text-xs opacity-80"
                  >Small project examples from €1,500–€3,500</span
                >
              </td>
              <td class="text-center text-sm px-4 py-2">
                <span class="font-medium">From €400/month</span>
                <span class="block text-xs opacity-80"
                  >Reserved hours & priority support</span
                >
              </td>
            </tr>
          </thead>

          <!-- Feature rows -->
          <tbody class="divide-y divide-brand-200/40">
            <tr v-for="row in rows" :key="row.key">
              <th
                scope="row"
                class="text-left text-sm font-medium text-neutral-900 dark:text-brand-100 px-4 py-3"
              >
                {{ row.label }}
                <p
                  v-if="row.hint"
                  class="text-xs text-neutral-600/80 dark:text-brand-200/80 mt-0.5"
                >
                  {{ row.hint }}
                </p>
              </th>

              <td class="text-center px-4 py-3">
                <UIcon
                  :name="
                    row.time ? 'i-heroicons-check-circle' : 'i-heroicons-x-mark'
                  "
                  :class="iconClass(row.time)"
                  aria-hidden="true"
                />
              </td>

              <td class="text-center px-4 py-3">
                <UIcon
                  :name="
                    row.project
                      ? 'i-heroicons-check-circle'
                      : 'i-heroicons-x-mark'
                  "
                  :class="iconClass(row.project)"
                  aria-hidden="true"
                />
              </td>

              <td class="text-center px-4 py-3">
                <UIcon
                  :name="
                    row.retainer
                      ? 'i-heroicons-check-circle'
                      : 'i-heroicons-x-mark'
                  "
                  :class="iconClass(row.retainer)"
                  aria-hidden="true"
                />
              </td>
            </tr>
          </tbody>

          <!-- Footnote -->
          <tfoot>
            <tr>
              <td
                colspan="4"
                class="px-4 py-3 text-xs text-neutral-700/80 dark:text-brand-200/80"
              >
                * Time Based = hourly blocks. Project Based = scoped
                deliverables with a fixed quote. Retainer Based = ongoing
                partnership with reserved hours, monthly insights, and priority
                response.
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
type Row = {
  key: string;
  label: string;
  hint?: string;
  time: boolean;
  project: boolean;
  retainer: boolean;
};

const rows: Row[] = [
  {
    key: "discovery",
    label: "Discovery Call",
    hint: "Understand goals & scope",
    time: true,
    project: true,
    retainer: true,
  },
  {
    key: "workshop",
    label: "Requirements Workshop",
    time: false,
    project: true,
    retainer: true,
  },
  {
    key: "ux-audit",
    label: "UX & Heuristic Review",
    time: false,
    project: true,
    retainer: true,
  },
  {
    key: "a11y",
    label: "Accessibility QA (WCAG 2.1 AA)",
    time: false,
    project: true,
    retainer: true,
  },
  {
    key: "design-system",
    label: "Design Tokens / System Setup",
    time: false,
    project: true,
    retainer: true,
  },
  {
    key: "impl",
    label: "Implementation Support",
    hint: "Pairing, PR reviews",
    time: true,
    project: true,
    retainer: true,
  },
  {
    key: "analytics",
    label: "Analytics & Event Setup",
    time: false,
    project: true,
    retainer: true,
  },
  {
    key: "opt",
    label: "Ongoing Optimization",
    time: false,
    project: false,
    retainer: true,
  },
  {
    key: "priority",
    label: "Priority Support SLA",
    time: false,
    project: false,
    retainer: true,
  },
  {
    key: "report",
    label: "Monthly Report & Roadmap",
    time: false,
    project: false,
    retainer: true,
  },
];

// Brand-aware icon styling (checks vs. grayed X)
const iconClass = (val: boolean) =>
  val
    ? "text-brand-500 inline-block align-middle w-6 h-6"
    : "text-neutral-400 inline-block align-middle w-6 h-6 opacity-60";
</script>

<style scoped>
thead tr:first-child > th:first-child {
  border-top-left-radius: 0.75rem;
}
thead tr:first-child > th:last-child {
  border-top-right-radius: 0.75rem;
}
</style>
