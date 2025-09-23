<template>
  <section id="contact" class="relative">
    <UContainer class="max-w-[1440px] py-10 md:py-14">
      <header class="mb-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Contact
        </h2>
      </header>

      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-start">
        <!-- Denmark -->
        <UCard class="bg-[var(--color-surface-1)] text-primary-900 h-full">
          <template #header>
            <div class="flex items-center gap-2">
              <Icon
                name="i-heroicons-building-office-20-solid"
                aria-hidden="true"
              />
              <h3 class="text-xl font-semibold text-primary-900">
                tegetec Denmark
              </h3>
            </div>
          </template>

          <div
            class="overflow-hidden rounded-lg ring-1 ring-[var(--color-border)]"
          >
            <iframe
              title="Map — tegetec Denmark"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="w-full aspect-video"
              src="https://www.google.com/maps?q=Holmensvej%2038%2C%203600%20Frederikssund%2C%20Denmark&output=embed"
            ></iframe>
          </div>

          <address class="not-italic mt-4 space-y-2">
            <p class="flex items-center gap-2">
              <Icon name="i-heroicons-map-pin-20-solid" aria-hidden="true" />
              Holmensvej 38, 3600 Frederikssund, Denmark
            </p>
            <p class="flex items-center gap-2">
              <Icon name="i-heroicons-phone-20-solid" aria-hidden="true" />
              <a class="underline underline-offset-2" href="tel:+4570252420"
                >+45 70 25 24 20</a
              >
            </p>
            <p class="flex items-center gap-2">
              <Icon name="i-heroicons-envelope-20-solid" aria-hidden="true" />
              <a
                class="underline underline-offset-2"
                href="mailto:mail@tegetec.com"
                >mail@tegetec.com</a
              >
            </p>
            <p class="flex items-center gap-2">
              <Icon
                name="i-heroicons-identification-20-solid"
                aria-hidden="true"
              />
              CVR: 28847920
            </p>
            <p class="flex items-center gap-2">
              <Icon name="i-heroicons-link-20-solid" aria-hidden="true" />
              <a
                class="underline underline-offset-2"
                href="https://dk.linkedin.com/company/tegetec-aps"
                target="_blank"
                rel="noopener"
                >LinkedIn</a
              >
            </p>
          </address>
        </UCard>

        <!-- Spain -->
        <UCard class="bg-[var(--color-surface-1)] text-primary-900 h-full">
          <template #header>
            <div class="flex items-center gap-2">
              <Icon
                name="i-heroicons-building-office-20-solid"
                aria-hidden="true"
              />
              <h3 class="text-xl font-semibold text-primary-900">
                tegetec Spain
              </h3>
            </div>
          </template>

          <div
            class="overflow-hidden rounded-lg ring-1 ring-[var(--color-border)]"
          >
            <iframe
              title="Map — tegetec Spain"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="w-full aspect-video"
              src="https://www.google.com/maps?q=C/%20Montpao%2019%2C%2043820%20Calafell%2C%20Spain&output=embed"
            ></iframe>
          </div>

          <address class="not-italic mt-4 space-y-2">
            <p class="flex items-center gap-2">
              <Icon name="i-heroicons-map-pin-20-solid" aria-hidden="true" />
              C/ Montpao 19, 43820 Calafell, Spain
            </p>
            <p class="flex items-center gap-2">
              <Icon name="i-heroicons-phone-20-solid" aria-hidden="true" />
              <a class="underline underline-offset-2" href="tel:+34646713427"
                >+34 646 713 427</a
              >
            </p>
            <p class="flex items-center gap-2">
              <Icon name="i-heroicons-envelope-20-solid" aria-hidden="true" />
              <a
                class="underline underline-offset-2"
                href="mailto:jose@tegetec.com"
                >jose@tegetec.com</a
              >
            </p>
          </address>
        </UCard>

        <!-- Finland -->
        <UCard class="bg-[var(--color-surface-1)] text-primary-900 h-full">
          <template #header>
            <div class="flex items-center gap-2">
              <Icon
                name="i-heroicons-building-office-20-solid"
                aria-hidden="true"
              />
              <h3 class="text-xl font-semibold text-primary-900">
                tegetec Finland
              </h3>
            </div>
          </template>

          <div
            class="overflow-hidden rounded-lg ring-1 ring-[var(--color-border)]"
          >
            <iframe
              title="Map — tegetec Finland"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="w-full aspect-video"
              src="https://www.google.com/maps?q=Fladabrinken%207A%2C%2000840%20Helsinki%2C%20Finland&output=embed"
            ></iframe>
          </div>

          <address class="not-italic mt-4 space-y-2">
            <p class="flex items-center gap-2">
              <Icon name="i-heroicons-map-pin-20-solid" aria-hidden="true" />
              Fladabrinken 7A, 00840 Helsinki, Finland
            </p>
            <p class="flex items-center gap-2">
              <Icon name="i-heroicons-phone-20-solid" aria-hidden="true" />
              <a class="underline underline-offset-2" href="tel:+358405555863"
                >+358 40 5555 863</a
              >
            </p>
            <p class="flex items-center gap-2">
              <Icon name="i-heroicons-envelope-20-solid" aria-hidden="true" />
              <a
                class="underline underline-offset-2"
                href="mailto:kalevi.enberg@omaco.fi"
                >kalevi.enberg@omaco.fi</a
              >
            </p>
          </address>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
// purely presentational
</script>
