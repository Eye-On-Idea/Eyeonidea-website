<template>
  <section class="border-y bg-primary-50 border-[var(--color-border)]">
    <UContainer class="max-w-[1440px] py-8 md:py-10">
      <div class="flex flex-wrap items-center gap-6 md:gap-10 justify-center">
        <span class="text-sm uppercase tracking-widest font-medium text-black"
          >Representing</span
        >
        <ul
          class="flex flex-wrap items-center gap-6 md:gap-8"
          aria-label="Represented companies"
        >
          <li class="flex items-center gap-2">
            <NuxtLink
              to="/collaborators"
              class="inline-flex items-center"
              aria-label="Go to collaborators"
            >
              <img
                src="../../public/assets/img/collaborators/RA_JONES_Logo.svg"
                alt="Logo for the company RA Jones"
                class="w-28 md:w-32 h-auto object-contain bg-white rounded-[6px] ring-0 hover:ring-1"
              />
              <span class="sr-only">RA Jones</span>
            </NuxtLink>
          </li>
          <li class="flex items-center gap-2">
            <NuxtLink
              to="/collaborators"
              class="inline-flex items-center"
              aria-label="Go to collaborators"
            >
              <img
                src="../../public/assets/img/collaborators/elmoprint.svg"
                alt="Logo for the company Elmoprint"
                class="w-28 md:w-32 h-auto object-contain bg-white rounded-[6px] ring-0 hover:ring-1"
              />
              <span class="sr-only">Elmoprint</span>
            </NuxtLink>
          </li>
          <li class="flex items-center gap-2">
            <NuxtLink
              to="/collaborators"
              class="inline-flex items-center"
              aria-label="Go to collaborators"
            >
              <img
                src="../../public/assets/img/collaborators/lyco.svg"
                alt="Logo for the company Lyco"
                class="w-28 md:w-32 h-auto object-contain bg-white rounded-[6px] ring-0 hover:ring-1"
              />
              <span class="sr-only">Lyco</span>
            </NuxtLink>
          </li>
          <li class="flex items-center gap-2">
            <NuxtLink
              to="/collaborators"
              class="inline-flex items-center"
              aria-label="Go to collaborators"
            >
              <img
                src="../../public/assets/img/collaborators/mepaco-logo.svg"
                alt="Logo for the company Mepaco"
                class="w-28 md:w-32 h-auto object-contain bg-white rounded-[6px] ring-0 hover:ring-1"
              />
              <span class="sr-only">Mepaco</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </UContainer>
  </section>
</template>
