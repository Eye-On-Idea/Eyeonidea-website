<template>
  <section id="expertise" class="relative">
    <UContainer class="max-w-[1440px] py-10 md:py-14">
      <!-- Grid with 2 rows: (1) full-width header, (2) tiles + right card -->
      <div class="grid gap-6 md:grid-cols-3">
        <!-- Row 1: header spans all columns -->
        <div class="md:col-span-3">
          <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
            What we do
          </h2>
          <p class="mt-3 text-primary-900">
            We scope, specify and supply equipment for pasta, rice, vegetables,
            meats, adhesives and more—prioritising reliability, operating cost,
            and sanitation. From trials and FAT/SAT to commissioning and
            training, we stay involved through the full lifecycle.
          </p>
        </div>

        <!-- Row 2: left group (2 cols) + right card (1 col) -->
        <div class="md:col-span-2">
          <!-- 2×2 tiles; equal heights; min-width guards -->
          <div class="grid gap-6 sm:grid-cols-2 auto-rows-fr">
            <UCard
              class="bg-[var(--color-surface-1)] text-primary-900 h-full min-w-[260px]"
            >
              <h3 class="text-lg font-semibold text-primary-900">Processing</h3>
              <ul class="mt-2 list-disc pl-5 space-y-1">
                <li>Clean-Flow® blanchers; rotary drum cook/cool</li>
                <li>Cooling, separation and de-watering</li>
                <li>Material handling & hygienic conveyors</li>
              </ul>
            </UCard>

            <UCard
              class="bg-[var(--color-surface-1)] text-primary-900 h-full min-w-[260px]"
            >
              <h3 class="text-lg font-semibold text-primary-900">
                Packaging & coding
              </h3>
              <ul class="mt-2 list-disc pl-5 space-y-1">
                <li>KartridgPak chub packaging systems</li>
                <li>Cartoning & in-line date-coding</li>
                <li>Recipe-driven changeovers</li>
              </ul>
            </UCard>

            <UCard
              class="bg-[var(--color-surface-1)] text-primary-900 h-full min-w-[260px]"
            >
              <h3 class="text-lg font-semibold text-primary-900">
                Integration
              </h3>
              <ul class="mt-2 list-disc pl-5 space-y-1">
                <li>Line controls & data (OEE/alarms)</li>
                <li>Trial planning, FAT/SAT, commissioning</li>
                <li>Operator training & documentation</li>
              </ul>
            </UCard>

            <UCard
              class="bg-[var(--color-surface-1)] text-primary-900 h-full min-w-[260px]"
            >
              <h3 class="text-lg font-semibold text-primary-900">
                Afterservice
              </h3>
              <ul class="mt-2 list-disc pl-5 space-y-1">
                <li>OEM parts & scheduled maintenance</li>
                <li>Field rebuilds & factory overhauls</li>
                <li>Upgrades & conversion kits</li>
              </ul>
            </UCard>
          </div>
        </div>

        <!-- Right card: same row, stretches to same height as the 2×2 group -->
        <div class="flex">
          <UCard
            class="bg-[var(--color-surface-1)] text-primary-900 h-full min-w-[280px] flex flex-col grow"
          >
            <h3 class="text-lg font-semibold text-primary-900">
              Why producers choose Tegetec
            </h3>
            <ul class="mt-2 space-y-2">
              <li class="pl-4 relative">
                <span
                  class="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-[var(--color-primary-600)]"
                ></span
                >Integrated projects with a single point of contact
              </li>
              <li class="pl-4 relative">
                <span
                  class="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-[var(--color-primary-600)]"
                ></span
                >Proven OEMs with strong install base and service
              </li>
              <li class="pl-4 relative">
                <span
                  class="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-[var(--color-primary-600)]"
                ></span
                >Focus on ROI: throughput, yield, utilities and uptime
              </li>
              <li class="pl-4 relative">
                <span
                  class="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-[var(--color-primary-600)]"
                ></span
                >Clear documentation, training and lifecycle support
              </li>
            </ul>
            <div class="md:mt-auto mt-9">
              <UButton variant="solid" to="/equipment-and-solutions"
                >Explore equipment</UButton
              >
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
