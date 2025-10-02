<template>
  <section id="systems" class="relative">
    <UContainer class="max-w-[1440px] py-12 md:py-16">
      <header class="mb-8">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Systems overview
        </h2>
        <p class="mt-2 text-primary-900">
          Start with key families below—open a card for highlights and typical
          use cases. Detailed specs available on request.
        </p>
      </header>

      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <!-- Chubmaker -->
        <UCard id="chubmaker" class="group bg-primary-50">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-primary-900">
                KartridgPak Chubmaker
              </h3>
              <UBadge color="gray" variant="solid">Packaging</UBadge>
            </div>
          </template>
          <p class="text-primary-900">
            High‑volume chub packaging with continuous operation, flexible
            sealing and material savings.
          </p>
          <ul class="mt-4 list-disc pl-5 text-primary-900">
            <li>Consistent diameter control and seal integrity</li>
            <li>Wide film/clip options; recipe‑driven changeovers</li>
            <li>Upgrades: film drive, safety guard, HMI retrofit</li>
          </ul>
          <template #footer>
            <div class="flex gap-3">
              <UButton variant="solid" to="#contact">Request info</UButton>
              <UButton variant="solid" to="#chubmaker-details"
                >Learn More</UButton
              >
            </div>
          </template>
        </UCard>

        <!-- Clean-Flow -->
        <UCard id="clean-flow" class="group bg-[var(--color-surface-1)]">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-primary-900">
                Lyco Clean‑Flow® Blanchers
              </h3>
              <UBadge color="gray" variant="solid">Processing</UBadge>
            </div>
          </template>
          <p class="text-primary-900">
            Innovative blanching with Hydro‑Flow® agitation for uniform quality,
            higher recovery and rapid changeovers.
          </p>
          <ul class="mt-4 list-disc pl-5 text-primary-900">
            <li>Reduced cook times and improved texture</li>
            <li>Lower water usage; sanitation‑friendly design</li>
            <li>Applications: pasta, rice, vegetables, beans</li>
          </ul>
          <template #footer>
            <div class="flex gap-3">
              <UButton variant="solid" to="#contact">Request info</UButton>
              <UButton variant="solid" to="/collaborators">See brand</UButton>
            </div>
          </template>
        </UCard>

        <!-- Rotary Drum Systems -->
        <UCard id="rotary-drum" class="group bg-[var(--color-surface-1)]">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-primary-900">
                Rotary Drum Cooker/Coolers
              </h3>
              <UBadge color="gray" variant="solid">Processing</UBadge>
            </div>
          </template>
          <p class="text-primary-900">
            Space‑efficient continuous systems with sanitation benefits and
            energy efficiency.
          </p>
          <ul class="mt-4 list-disc pl-5 text-primary-900">
            <li>Uniform residence time and gentle handling</li>
            <li>Compact footprint; easy maintenance access</li>
            <li>Ideal for vegetables, legumes and pasta</li>
          </ul>
          <template #footer>
            <div class="flex gap-3">
              <UButton variant="solid" to="#contact">Request info</UButton>
              <UButton variant="solid" to="/collaborators">See brand</UButton>
            </div>
          </template>
        </UCard>

        <!-- Date coding -->
        <UCard id="date-coding" class="group bg-[var(--color-surface-1)]">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-primary-900">
                Elmoprint Date‑coding
              </h3>
              <UBadge color="gray" variant="solid">Coding</UBadge>
            </div>
          </template>
          <p class="text-primary-900">
            Fully integratable coding systems for flexible packaging and
            cartoning lines.
          </p>
          <ul class="mt-4 list-disc pl-5 text-primary-900">
            <li>High‑contrast prints, minimal downtime</li>
            <li>Easy integration with conveyors and HMIs</li>
            <li>Consumables &amp; service available regionally</li>
          </ul>
          <template #footer>
            <div class="flex gap-3">
              <UButton variant="solid" to="#contact">Request info</UButton>
              <UButton variant="solid" to="/collaborators">See brand</UButton>
            </div>
          </template>
        </UCard>

        <!-- Mepaco -->
        <UCard id="mepaco" class="group bg-[var(--color-surface-1)]">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-primary-900">
                Mepaco Processing Systems
              </h3>
              <UBadge color="gray" variant="solid">Processing</UBadge>
            </div>
          </template>
          <p class="text-primary-900">
            Customized blending, cooking and material‑handling modules for
            upstream and mid‑process.
          </p>
          <ul class="mt-4 list-disc pl-5 text-primary-900">
            <li>Sanitary designs with robust drives</li>
            <li>Batch or continuous configurations</li>
            <li>Controls, parts and local service</li>
          </ul>
          <template #footer>
            <div class="flex gap-3">
              <UButton variant="solid" to="#contact">Request info</UButton>
              <UButton variant="solid" to="/collaborators">See brand</UButton>
            </div>
          </template>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
// No script required for static content
</script>
