<template>
  <section class="relative bg-primary-800" id="hero">
    <UContainer class="max-w-[1440px] py-12 md:py-16">
      <div
        class="grid md:grid-cols-[1.2fr_1fr] gap-10 md:items-center text-primary-50"
      >
        <div>
          <h1 class="text-3xl md:text-4xl font-semibold tracking-tight">
            Equipment &amp; Solutions
          </h1>
          <p class="mt-4 text-lg">
            Packaging and processing systems for pasta, rice, beans, vegetables,
            meats and more—selected for reliability, total cost of ownership,
            and afterservice availability.
          </p>
          <ul class="mt-6 grid gap-2">
            <li class="flex items-start gap-2">
              <Icon
                name="i-heroicons-check-circle"
                class="mt-0.5"
                aria-hidden="true"
              /><span
                ><strong>Fast changeovers</strong> and uniform quality for short
                runs and frequent SKU swaps.</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon
                name="i-heroicons-check-circle"
                class="mt-0.5"
                aria-hidden="true"
              /><span
                ><strong>Energy &amp; water efficiency</strong> with modern
                blanching, cooking and cooling designs.</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon
                name="i-heroicons-check-circle"
                class="mt-0.5"
                aria-hidden="true"
              /><span
                ><strong>Lifecycle support</strong>—spare parts, upgrades and
                field service across the Nordics.</span
              >
            </li>
          </ul>
          <div class="mt-8 flex flex-wrap gap-3">
            <UButton variant="solid" to="#systems">Browse systems</UButton>
            <UButton variant="solid" to="#process">See process flow</UButton>
          </div>
        </div>
        <div class="carousel rounded-lg">
          <UCarousel
            v-slot="{ item }"
            loop
            align-center
            :autoplay="{ delay: 5000 }"
            :items="items"
            class="w-full max-w-xs mx-auto"
          >
            <img :src="item" class="rounded-lg" />
          </UCarousel>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script lang="ts" setup>
const items = [
  "assets/img/lyco/content_cleanflow_92_pastablancher.png",
  "assets/img/lyco/content_lyco_rotarydrum_100.jpg",
  "assets/img/lyco/content_cleanflow_diagram_96.png",
];
</script>

<style lang="scss" scoped>
.carousel {
  padding: 50px;
}
</style>
