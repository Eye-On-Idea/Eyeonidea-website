<template>
  <section class="py-16 md:py-20 bg-[var(--color-brand-500)] text-white">
    <UContainer>
      <div
        class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          <h2 class="font-heading text-3xl">Ready to raise the quality bar?</h2>
          <p class="mt-2 text-white/90 max-w-prose">
            Tell us about your product and goals. We’ll propose a clear plan
            that fits your timeline.
          </p>
        </div>
        <div class="flex gap-3">
          <UButton
            to="/contact"
            size="lg"
            color="white"
            variant="solid"
            :ui="{ rounded: 'rounded-[var(--radius-md)]' }"
            >Contact EOI</UButton
          >
          <UButton
            to="/services"
            size="lg"
            variant="outline"
            color="white"
            :ui="{
              rounded: 'rounded-[var(--radius-md)]',
              color: {
                white: {
                  outline:
                    'ring-1 ring-white text-white hover:bg-white hover:text-[var(--color-brand-600)]',
                },
              },
            }"
            >Our services</UButton
          >
        </div>
      </div>
    </UContainer>
  </section>
</template>
