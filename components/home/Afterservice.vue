<template>
  <section class="relative">
    <div
      class="absolute bg inset-0 -z-10 bg-center bg-cover"
      aria-hidden="true"
    ></div>
    <div class="absolute inset-0 -z-10 bg-white/60"></div>
    <UContainer class="max-w-[1440px] py-14 md:py-20">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div
          class="rounded-xl bg-[var(--color-bg)]/95 shadow-md ring-1 ring-[var(--color-border)] p-6 md:p-8 text-primary-900"
        >
          <h2 class="text-2xl md:text-3xl font-semibold">
            Afterservice & Spare Parts
          </h2>
          <p class="mt-2">
            Field rebuilds, factory overhauls and conversion kits to keep your
            lines running at peak performance.
          </p>
          <p class="mt-3">
            We provide OEM parts, scheduled maintenance, emergency call‑outs,
            and performance audits for packaging and processing lines -
            minimizing downtime and improving OEE.
          </p>
          <br />
          <ul class="list-disc pl-5">
            <li>Preventive maintenance programs</li>
            <li>On‑site rebuilds and factory overhauls</li>
            <li>Conversion kits and performance upgrades</li>
          </ul>
          <br />
          <div class="mt-6 flex gap-3">
            <UButton variant="solid" to="/about-and-contact#service"
              >Service & support</UButton
            >
            <UButton variant="solid" to="/about-and-contact#contact"
              >Request parts</UButton
            >
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style lang="scss" scoped>
.bg {
  background-image: url(/assets/img/stock/pexels-padrinan-971078.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
