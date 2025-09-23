<template>
  <section class="relative">
    <div
      class="absolute inset-0 -z-10 bg-center bg-cover"
      style="
        background-image: url('/assets/img/stock/pexels-pixabay-47306.jpg');
      "
      aria-hidden="true"
    ></div>
    <div class="absolute inset-0 -z-10 bg-white/70"></div>
    <UContainer class="max-w-[1440px] py-14 md:py-20">
      <div class="md:flex md:items-center md:justify-between gap-6">
        <div
          class="max-w-2xl rounded-xl bg-[var(--color-bg)]/95 shadow-md ring-1 ring-[var(--color-border)] p-6 md:p-8 text-primary-900"
        >
          <h2 class="text-2xl md:text-3xl font-semibold">Collaborators</h2>
          <p class="mt-2">
            Tegetec delivers integrated projects with
            <strong>single-point accountability</strong>, partnering with proven
            manufacturers across packaging and processing. We represent
            <strong>RA Jones (KartridgPak)</strong> in the Nordics and parts of
            Europe, offering end-to-end packaging solutions backed by a global
            install base and complete field service—from installation and
            training to parts and support.
          </p>
          <p class="mt-3">
            Our processing portfolio centers on
            <strong>Lyco Manufacturing</strong>, whose
            <strong>Clean-Flow®</strong> blancher and
            <strong>rotary drum cooker/coolers</strong> improve quality, yield,
            and changeovers across pasta, rice, and vegetable lines. Locally, we
            collaborate with <strong>Elmoprint</strong> to integrate date-coding
            systems into packaging lines, while <strong>Mepaco</strong> provides
            tailored blending, cooking, and material-handling solutions,
            supported by engineering, controls, parts, and service.
          </p>
          <div class="mt-6">
            <UButton variant="solid" to="/collaborators"
              >See collaborators</UButton
            >
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
p {
  letter-spacing: 0.3px;
  strong {
    font-weight: 500;
  }
}
</style>
