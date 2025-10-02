<template>
  <section class="py-16 md:py-24">
    <UContainer>
      <div class="grid md:grid-cols-12 gap-10 items-center">
        <div class="md:col-span-5">
          <UCard :ui="{ rounded: 'rounded-[var(--radius-md)]' }">
            <div class="flex items-center gap-4">
              <UAvatar
                size="xl"
                alt="Rune Pjetursson portrait"
                :text="'RP'"
                class="ring-2 ring-[var(--color-brand-100)]"
              />
              <div>
                <h3 class="font-heading text-2xl">Rune Pjetursson</h3>
                <p class="text-neutral-700">Founder of EOI</p>
              </div>
            </div>
            <p class="mt-4 text-neutral-700">
              Rune is the founder of EOI, combining QA, project management, and
              concept development. With a background in multimedia design and
              digital concept development, he specialises in spotting issues and
              opportunities, turning them into clear, actionable solutions.
            </p>
            <br />
            <p>
              Guided by a user-first mindset, he focuses on optimising digital
              interfaces to drive clarity, engagement, and measurable business
              results.
            </p>
          </UCard>
        </div>
        <div class="md:col-span-7">
          <h2 class="font-heading text-3xl">Our approach</h2>
          <p class="mt-3 text-neutral-700 max-w-prose">
            We keep communication concise and human. Reports are easy to read
            and act on, with screenshots and affected elements grouped to reduce
            noise. Dark mode is tested and referenced succinctly when no unique
            issues are found.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <UButton
              to="/services"
              color="primary"
              variant="soft"
              :ui="{ rounded: 'rounded-[var(--radius-md)]' }"
              >See services</UButton
            >
            <UButton
              to="/contact"
              color="primary"
              :ui="{ rounded: 'rounded-[var(--radius-md)]' }"
              >Book a call</UButton
            >
            <UButton
              to="/about/legal"
              variant="outline"
              :ui="{ rounded: 'rounded-[var(--radius-md)]' }"
              >Legal</UButton
            >
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
