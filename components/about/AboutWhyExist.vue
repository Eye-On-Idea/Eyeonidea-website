<template>
  <section class="py-16 md:py-24 bg-brand-100 text-[var(--color-neutral-900)]">
    <UContainer>
      <div class="grid md:grid-cols-12 gap-8">
        <div class="md:col-span-7">
          <h2 class="font-heading text-3xl text-neutral-900!">
            Why EOI exists
          </h2>
          <p class="mt-3 text-neutral-900! max-w-prose">
            Too often, teams receive long audits or reports that never translate
            into real progress. EOI exists to change that. We cut through the
            noise and deliver clear, prioritized actions your team can take
            right away. Our mission is to make digital products perform better —
            driving stronger engagement, smoother user journeys, and measurable
            results for your business.
          </p>
          <div class="mt-6">
            <UAlert
              icon="i-heroicons-light-bulb"
              color="primary"
              variant="soft"
              title="Better experiences create better outcomes"
              description="Optimised design increases engagement, strengthens loyalty, and maximises ROI."
              :ui="{
                rounded: 'rounded-[var(--radius-md)]',
              }"
            />
            <p class="mt-4 text-neutral-900! max-w-prose">
              By focusing on clarity, usability, and consistent design, we help
              businesses reduce drop-offs and improve follow-through. The result
              is a product that not only feels polished, but also supports your
              growth goals and delivers real value to your users.
            </p>
          </div>
        </div>
        <div class="md:col-span-5">
          <UCard :ui="{ rounded: 'rounded-[var(--radius-md)]' }">
            <h3 class="font-heading text-xl">Our focus</h3>
            <ul class="mt-4 space-y-2 text-neutral-800">
              <li class="list-disc! ml-4">
                User interfaces that are clear, consistent, and easy to navigate
              </li>
              <li class="list-disc! ml-4">
                Design choices that increase engagement and customer loyalty
              </li>
              <li class="list-disc! ml-4">
                Optimised experiences that support higher ROI and better
                conversions
              </li>
            </ul>
            <p class="mt-4 text-neutral-700">
              Our role is to highlight where your product experience can improve
              and show you how to get there. We go beyond checking boxes we help
              you create digital journeys that are intuitive, efficient, and
              rewarding for users. This approach ensures that your design
              decisions directly contribute to business goals, from stronger
              customer retention to measurable gains in performance.
            </p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
