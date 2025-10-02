<template>
  <section class="py-16 md:py-24">
    <UContainer>
      <div class="grid md:grid-cols-12 gap-10 items-start">
        <!-- LEFT: What we do -->
        <div class="md:col-span-6">
          <h2 class="font-heading text-3xl">What we do</h2>
          <p class="mt-3 text-amber-50! max-w-prose">
            We audit your product experience end to end to improve engagement,
            conversions, and reliability. You get a concise report with a
            prioritized backlog sized by effort and impact. We can follow up
            after you ship to confirm results.
          </p>
          <ul class="mt-6 space-y-3 text-neutral-800">
            <li class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="mt-1"
                aria-hidden="true"
              />
              <span
                ><strong>Conversion-focused UI reviews</strong> – remove
                friction in key flows like sign up, checkout, and booking.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="mt-1"
                aria-hidden="true"
              />
              <span
                ><strong>Usability and clarity</strong> – improve structure,
                hierarchy, and microcopy so users act with confidence.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="mt-1"
                aria-hidden="true"
              />
              <span
                ><strong>Front-end quality and performance</strong> –
                responsiveness, speed, and stability across devices and
                browsers.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="mt-1"
                aria-hidden="true"
              />
              <span
                ><strong>Advisory and rapid iteration</strong> – focused working
                sessions with your team to turn findings into wins.</span
              >
            </li>
          </ul>
        </div>

        <!-- RIGHT: How we work -->
        <div class="md:col-span-6">
          <UCard
            :ui="{ rounded: 'rounded-[var(--radius-md)]' }"
            class="bg-brand-400"
          >
            <h3 class="font-heading text-xl">How we work</h3>
            <ul class="mt-4 grid sm:grid-cols-2 gap-4">
              <li class="p-4 rounded-lg border border-neutral-200">
                <p class="font-medium">Outcome first</p>
                <p class="mt-1">
                  Every recommendation ties to engagement, conversion, or
                  reliability.
                </p>
              </li>
              <li class="p-4 rounded-lg border border-neutral-200">
                <p class="font-medium">Actionable</p>
                <p class="mt-1">
                  Clear steps with effort and impact so teams know where to
                  start.
                </p>
              </li>
              <li class="p-4 rounded-lg border border-neutral-200">
                <p class="font-medium">Evidence-based</p>
                <p class="mt-1">
                  Screens, repro steps, and rationale that reduce back and
                  forth.
                </p>
              </li>
              <li class="p-4 rounded-lg border border-neutral-200">
                <p class="font-medium">Follow up</p>
                <p class="mt-1">
                  Verification after changes to confirm improvements and next
                  steps.
                </p>
              </li>
            </ul>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style lang="scss" scoped>
p,
h3 {
  color: var(--color-amber-50);
}
</style>
