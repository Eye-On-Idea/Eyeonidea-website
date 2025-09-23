<template>
  <section id="hero" class="relative bg-primary-700 text-primary-50">
    <UContainer class="max-w-[1440px] py-12 md:py-16">
      <div class="grid items-center gap-8 md:grid-cols-2">
        <!-- Left: copy -->
        <header class="max-w-3xl">
          <h1 class="text-3xl md:text-4xl font-semibold tracking-tight">
            Collaborators
          </h1>
          <p class="mt-3 text-lg">
            We partner with proven manufacturers to deliver integrated systems
            with single-point accountability—covering processing, packaging and
            date-coding, backed by service and spare parts.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <UButton
              variant="solid"
              to="/equipment-and-solutions"
              class="hover:bg-primary-900"
            >
              Browse equipment
            </UButton>
          </div>
        </header>

        <!-- Right: logo -->
        <div class="flex justify-center md:justify-end">
          <!-- from /public, so use an absolute path -->
          <img
            src="/assets/img/tegetec.svg"
            alt="Tegetec logo"
            class="w-56 md:w-72 lg:w-80 xl:w-96 h-auto object-contain"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>
