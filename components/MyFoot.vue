<template>
  <footer class="bg-gray-900 text-[var(--color-text)] mt-16 flex-1 flex-wrap">
    <!-- Top: Logo + Contacts + Site nav -->
    <UContainer class="max-w-[1920px] py-12">
      <div class="grid gap-10 lg:grid-cols-[320px_1fr_320px] items-start">
        <!-- Brand / intro -->
        <div class="space-y-4">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 ring-offset-[var(--ring-offset)]"
          >
            <img
              src="../public/assets/img/tegetec.svg"
              alt="Tegetec logo"
              class="h-10 w-auto"
            />
            <span class="sr-only">Go to homepage</span>
          </NuxtLink>
          <p class="text-amber-50">
            <i
              >Food processing & packaging equipment across the Nordics and
              Europe—backed by service and spare parts.</i
            >
          </p>
        </div>

        <!-- Contacts (3 cards) -->
        <div class="flex flex-row flex-wrap gap-2 justify-center">
          <UCard class="text-amber-50 w-[360px]">
            <template #header>
              <h3 class="text-xl font-semibold">tegetec Denmark</h3>
            </template>
            <address class="not-italic space-y-3">
              <p>Holmensvej 38, 3600 Frederikssund, Denmark</p>
              <p class="flex items-center gap-2">
                <Icon
                  name="i-heroicons-phone"
                  aria-hidden="true"
                  class="size-6"
                />
                <a
                  class="underline underline-offset-2 text-amber-50!"
                  href="tel:+4570252420"
                  >+45 70 25 24 20</a
                >
              </p>
              <p class="flex items-center gap-2">
                <Icon
                  name="i-heroicons-envelope"
                  aria-hidden="true"
                  class="size-6"
                />
                <a
                  class="underline underline-offset-2 text-amber-50!"
                  href="mailto:mail@tegetec.com"
                  >mail@tegetec.com</a
                >
              </p>
              <p class="flex items-center gap-2">
                <Icon
                  name="i-heroicons-identification"
                  aria-hidden="true"
                  class="size-6"
                />
                CVR: 28847920
              </p>
              <p class="flex items-center gap-2">
                <Icon
                  name="i-heroicons-link"
                  aria-hidden="true"
                  class="size-6"
                />
                <a
                  class="underline underline-offset-2 text-amber-50!"
                  href="https://dk.linkedin.com/company/tegetec-aps"
                  target="_blank"
                  rel="noopener"
                  >Visit our LinkedIn</a
                >
              </p>
            </address>
          </UCard>

          <UCard class="text-amber-50 w-[360px]">
            <template #header>
              <h3 class="text-xl font-semibold">tegetec Spain</h3>
            </template>
            <address class="not-italic space-y-3">
              <p>C/ Montpao 19, Tarragona, 43820 Calafell, Spain</p>
              <p class="flex items-center gap-2">
                <Icon
                  name="i-heroicons-phone"
                  aria-hidden="true"
                  class="size-6"
                />
                <a
                  class="underline underline-offset-2 text-amber-50!"
                  href="tel:+34646713427"
                  >+34 646 713 427</a
                >
              </p>
              <p class="flex items-center gap-2">
                <Icon
                  name="i-heroicons-envelope"
                  aria-hidden="true"
                  class="size-6"
                />
                <a
                  class="underline underline-offset-2 text-amber-50!"
                  href="mailto:jose@tegetec.com"
                  >jose@tegetec.com</a
                >
              </p>
            </address>
          </UCard>

          <UCard class="text-amber-50 w-[360px]">
            <template #header>
              <h3 class="text-xl font-semibold">tegetec Finland</h3>
            </template>
            <address class="not-italic space-y-3">
              <p>Fladabrinken 7A, 00840 Helsinki, Finland</p>
              <p class="flex items-center gap-2">
                <Icon
                  name="i-heroicons-phone"
                  aria-hidden="true"
                  class="size-6"
                />
                <a
                  class="underline underline-offset-2 text-amber-50!"
                  href="tel:+358405555863"
                  >+358 40 5555 863</a
                >
              </p>
              <p class="flex items-center gap-2">
                <Icon
                  name="i-heroicons-envelope"
                  aria-hidden="true"
                  class="size-6"
                />
                <a
                  class="underline underline-offset-2 text-amber-50!"
                  href="mailto:kalevi.enberg@omaco.fi"
                  >kalevi.enberg@omaco.fi</a
                >
              </p>
            </address>
          </UCard>
        </div>

        <!-- Site nav (full) -->
        <nav class="lg:justify-self-end" aria-label="footer-nav">
          <h3 class="text-xl font-semibold mb-4 text-primary-50">Site</h3>
          <ul class="grid gap-2 text-[var(--color-text-muted)] min-w-[240px]">
            <li>
              <NuxtLink class="hover:underline underline-offset-2" to="/"
                >Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:underline underline-offset-2"
                to="/equipment-and-solutions"
                >Equipment &amp; Solutions</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:underline underline-offset-2"
                to="/collaborators"
                >Collaborators</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:underline underline-offset-2"
                to="/about-and-contact"
                >About &amp; Contact</NuxtLink
              >
            </li>
            <li class="mt-2">
              <NuxtLink
                class="hover:underline underline-offset-2"
                to="/about/public-material-and-downloads"
                >Public Material &amp; Downloads</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:underline underline-offset-2"
                to="/about/privacy-policy"
                >Privacy Policy</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:underline underline-offset-2"
                to="/about/cookie-policy"
                >Cookie Policy</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </UContainer>

    <!-- Bottom: copyright -->
    <div class="border-t border-[var(--color-border)] bg-primary-900">
      <UContainer
        class="max-w-[1440px] py-4 text-sm text-amber-100 flex items-center justify-center gap-4"
      >
        <p>Copyright © {{ new Date().getFullYear() }} Tegetec ApS</p>
      </UContainer>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No script needed for static footer; NuxtLink auto-imported
</script>

<style scoped>
/* Accessibility & polish */
a {
  color: var(--link);
}
a:hover {
  color: var(--link-hover);
}
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}

address {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  row-gap: 10px;
  min-height: 200px;
}
</style>
