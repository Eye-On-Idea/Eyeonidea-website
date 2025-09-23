<template>
  <section id="chubmaker-details">
    <UContainer class="max-w-[1440px] py-10 md:py-14">
      <UCard class="bg-[var(--color-surface-1)] text-primary-900">
        <template #header>
          <div class="flex items-center justify-between flex-wrap gap-3">
            <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
              Chubmaker — Applications, Features, Technical Specs
            </h2>
            <p class="mt-4 text-sm text-primary-900">
              High‑volume, continuous chub packaging with flexible sealing
              options, tight diameter control and recipe‑driven changeovers.
            </p>
            <UBadge color="gray" variant="solid">KartridgPak</UBadge>
          </div>
        </template>

        <!-- Native, accessible accordions: headline+lead always visible; table hidden until opened -->
        <div class="divide-y">
          <!-- Applications -->
          <details class="group py-4">
            <summary
              class="flex items-start justify-between gap-3 cursor-pointer list-none"
            >
              <div class="min-w-0">
                <h3 class="text-base md:text-lg font-semibold text-primary-900">
                  Applications
                </h3>
                <p class="mt-1 text-sm md:text-base text-primary-900">
                  Suitable for a wide range of pumpable products.
                </p>
              </div>
              <Icon
                name="i-heroicons-chevron-down-20-solid"
                class="mt-1 shrink-0 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>

            <!-- Content hidden until open -->
            <div class="pt-3 pb-5 selectable">
              <ul
                class="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 text-primary-900"
              >
                <li
                  v-for="(t, i) in applications"
                  :key="i"
                  class="pl-3 relative"
                >
                  <span
                    class="absolute left-0 top-[0.6em] block h-1.5 w-1.5 rounded-full bg-[var(--color-primary-600)]"
                    aria-hidden="true"
                  />
                  {{ t }}
                </li>
              </ul>
            </div>
          </details>

          <!-- Features & benefits -->
          <details class="group py-4">
            <summary
              class="flex items-start justify-between gap-3 cursor-pointer list-none"
            >
              <div class="min-w-0">
                <h3 class="text-base md:text-lg font-semibold text-primary-900">
                  Features & benefits
                </h3>
                <p class="mt-1 text-sm md:text-base text-primary-900">
                  Highlights that affect throughput, cost and usability.
                </p>
              </div>
              <Icon
                name="i-heroicons-chevron-down-20-solid"
                class="mt-1 shrink-0 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>

            <div class="pt-3 pb-5 selectable">
              <div
                class="overflow-x-auto rounded-lg ring-1 ring-[var(--color-border)]"
              >
                <table
                  class="min-w-full border-separate border-spacing-0 text-primary-900"
                >
                  <thead>
                    <tr>
                      <th :class="thClass">Features</th>
                      <th :class="thClass">Benefits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="([f, b], i) in features"
                      :key="f"
                      :class="[
                        i % 2 ? 'bg-[var(--color-surface-2)]/60' : 'bg-white',
                        'align-top',
                      ]"
                    >
                      <td :class="tdClass + ' font-medium'">{{ f }}</td>
                      <td :class="tdClass">{{ b }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </details>

          <!-- Technical specs -->
          <details class="group py-4">
            <summary
              class="flex items-start justify-between gap-3 cursor-pointer list-none"
            >
              <div class="min-w-0">
                <h3 class="text-base md:text-lg font-semibold text-primary-900">
                  Technical specs
                </h3>
                <p class="mt-1 text-sm md:text-base text-primary-900">
                  Headline specifications for common models.
                </p>
              </div>
              <Icon
                name="i-heroicons-chevron-down-20-solid"
                class="mt-1 shrink-0 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>

            <div class="pt-3 pb-5 selectable">
              <div
                class="overflow-x-auto rounded-lg ring-1 ring-[var(--color-border)]"
              >
                <table
                  class="min-w-full border-separate border-spacing-0 text-primary-900"
                >
                  <thead class="bg-[var(--color-surface-3)]/80">
                    <tr>
                      <th v-for="hd in specHeads" :key="hd" :class="thClass">
                        {{ hd }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, i) in specs"
                      :key="row[0]"
                      :class="[
                        i % 2 ? 'bg-[var(--color-surface-2)]/60' : 'bg-white',
                        'align-top',
                      ]"
                    >
                      <td
                        v-for="(c, idx) in row"
                        :key="idx"
                        :class="tdClass + (idx === 0 ? ' font-medium' : '')"
                      >
                        {{ c }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </details>
        </div>

        <template #footer>
          <div class="space-y-1 text-sm text-primary-900 selectable">
            <p>
              *** All technical specifications are subject to updates. Contact
              your sales representative for details on your specific machine.
            </p>
            <p>* Other diameter ranges available by request.</p>
            <p>
              ** Up to 40&quot; with optional clutch brake. Packages shorter
              than 4&quot; available by request.
            </p>
            <p>*** Depends on film type and characteristics.</p>
          </div>
        </template>
      </UCard>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const thClass =
  "text-left text-sm font-semibold uppercase tracking-wide p-3 border-b border-[var(--color-border)]";
const tdClass = "p-3 border-b border-[var(--color-border)]";

const applications = [
  "Adhesives (Twin Compartment)",
  "Butter",
  "Caulks",
  "Cookie Dough",
  "Cream Cheese",
  "Dressings",
  "Explosives",
  "Ground Meat",
  "Ice Cream",
  "Liverwurst",
  "Marmalade",
  "Marzipan",
  "Montebello",
  "Mashed and Au Gratin Potatoes",
  "Pet Food",
  "Polenta",
  "Processed Cheese",
  "Processed Meat",
  "Resin Bolts (Twin Compartment)",
  "Sauces",
  "Sausage",
  "Sealants",
  "Shortening",
  "Soups",
  "Stuffing",
  "Vegetables",
];

const features: Array<[string, string]> = [
  ["CE marked", "Fulfills global safety requirements"],
  ["Close-clip options", "Reduced film costs; enhances package aesthetics"],
  ["Continuous motion", "Reduces downtime and parts usage"],
  ["Clutch brake option", "Flexibility to fill long packages"],
  [
    "Explosion-proof motors & pressurized cabinet (opt.)",
    "Safe in hazardous environments; lower risk & insurance premiums",
  ],
  ["Graphic readout of operating conditions", "Ease of operator interface"],
  [
    "Heavy-duty, high-speed clipping head",
    "Increases productivity & reliability; up to 120 ppm",
  ],
  ["KwikTear", "Consumer-friendly package"],
  ["Multiple date-coding options", "Flexibility in choosing coder"],
  ["Multiple film sealing systems", "Heat, RF, extrusion sealing"],
  [
    "PLC control",
    "Visual display, store recipes, faster start-up & changeover, multi-language",
  ],
  ["Registration", "Run pre-printed film; no label required"],
  ["Rollstock clips & film", "Save ~60–80% vs pre-formed clips"],
  [
    "Simplified clipping head assembly",
    "Reduces parts/service costs; prevents damage",
  ],
  [
    "Simplified film handling",
    "Easier loading/threading; less down-time; less training",
  ],
  ["Simultaneous adjust (clip/film/pump)", "Quick changeover; reduces scrap"],
  ["Stainless steel construction", "Made for rigorous wash-down"],
  ["Under-carriage with overload", "Reduces maintenance costs"],
  ["Voider system", "Reduces waste; tighter clips; improved appearance"],
  ["2nd package registration", "Eliminates film waste; saves set-up time"],
  ["Three sealing options", "Heat · RF · Extruder"],
  ["40+ ppm with clutch brake", "Handles extended/second-third registration"],
];

const specHeads = ["Description", "2500", "4000", "4100"];
const specs: string[][] = [
  ["PPM Min/Max", "15–120", "15–120", "15–150"],
  ["Machine Control", "PLC", "PLC", "PanelView (touch)"],
  [
    "Available Seal Methods",
    "Heated Air · RF · Extrusion",
    "Heated Air · RF · Extrusion",
    "Heated Air · RF",
  ],
  ["Diameter Range *", "—", "5/8″ – 4 1/8″", "5/8″ – 4 1/8″"],
  ["Std. Length Range **", "4″ – 12″", "4″ – 12″", "4″ – 12″"],
  ["Maximum Film Sealing Speed ***", "—", "1200 inches/min", "1200 inches/min"],
];
</script>

<style scoped>
/* Make summary itself non-selecting to avoid accidental text drag while trying to toggle */
summary {
  user-select: none;
  background-color: var(--color-primary-50);
  padding: 10px;
  border-radius: 6px;
  align-items: center;
  outline: solid;
  outline-width: 1px;
  outline-color: var(--color-primary-300);
}
.selectable {
  user-select: text;
}
</style>
