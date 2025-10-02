<template>
  <aside class="w-full md:w-[520px] space-y-6">
    <!-- Time-Based -->
    <NuxtLink
      to="/services#time-based"
      class="group relative block rounded-2xl border border-brand-200/50 bg-neutral-900/40 p-5 hover:border-brand-200 hover:shadow-xl hover:shadow-black/20 transition"
      aria-label="Read more about Time-Based QA"
    >
      <div class="side-c flex items-start justify-between gap-4">
        <div>
          <h3 class="text-brand-100 text-lg font-semibold">Time-Based QA</h3>
          <p class="text-sm text-brand-200/90">
            Flexible hours for quick checks
          </p>
        </div>
        <img
          src="/public-material/logo-center-shadow.svg"
          alt=""
          class="h-10 w-auto opacity-40 select-none pointer-events-none"
          aria-hidden="true"
          draggable="false"
        />
      </div>

      <div class="mt-3 text-sm text-brand-200/90">
        <p class="font-medium">From €60/hour</p>
        <ul class="mt-2 space-y-1">
          <li class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="h-4 w-4 text-brand-500"
            />
            Cross-device & cross-browser QA
          </li>
          <li class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="h-4 w-4 text-brand-500"
            />
            Clear, reproducible bug reports
          </li>
        </ul>
      </div>

      <div
        class="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-brand-50"
      />
    </NuxtLink>

    <!-- Project -->
    <NuxtLink
      to="/services#project-based"
      class="group relative block rounded-2xl border border-brand-200/50 bg-neutral-900/40 p-5 hover:border-brand-200 hover:shadow-xl hover:shadow-black/20 transition"
      aria-label="Read more about Project QA"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-brand-100 text-lg font-semibold">Project QA</h3>
          <p class="text-sm text-brand-200/90">Fixed scope, flexible hours</p>
        </div>
        <img
          src="/public-material/logo-center-shadow.svg"
          alt=""
          class="h-10 w-auto opacity-40 select-none pointer-events-none"
          aria-hidden="true"
          draggable="false"
        />
      </div>

      <div class="mt-3 text-sm text-brand-200/90">
        <p class="font-medium">
          Tailored quote • Small projects from €1,500–€3,500
        </p>
        <ul class="mt-2 space-y-1">
          <li class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="h-4 w-4 text-brand-500"
            />
            Acceptance criteria & smoke tests
          </li>
          <li class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="h-4 w-4 text-brand-500"
            />
            Heuristic review & microcopy fixes
          </li>
        </ul>
      </div>

      <div
        class="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-brand-50"
      />
    </NuxtLink>

    <!-- Retainer -->
    <NuxtLink
      to="/services#retainer"
      class="group relative block rounded-2xl border border-brand-200/50 bg-neutral-900/40 p-5 hover:border-brand-200 hover:shadow-xl hover:shadow-black/20 transition"
      aria-label="Read more about Retainer QA"
    >
      <div class="side-c flex items-start justify-between gap-4">
        <div>
          <h3 class="text-brand-100 text-lg font-semibold">Retainer QA</h3>
          <p class="text-sm text-brand-200/90">Continuous collaboration</p>
        </div>
        <img
          src="/public-material/logo-center-shadow.svg"
          alt=""
          class="h-10 w-auto opacity-40 select-none pointer-events-none"
          aria-hidden="true"
          draggable="false"
        />
      </div>

      <div class="mt-3 text-sm text-brand-200/90">
        <p class="font-medium">From €400/month</p>
        <ul class="mt-2 space-y-1">
          <li class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="h-4 w-4 text-brand-500"
            />
            Ongoing optimization & triage
          </li>
          <li class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="h-4 w-4 text-brand-500"
            />
            Priority response window
          </li>
        </ul>
      </div>

      <div
        class="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-brand-50"
      />
    </NuxtLink>
  </aside>
</template>

<style lang="scss" scoped>
.group {
  &:hover {
    img {
      opacity: 100% !important;
    }
  }
}
</style>
