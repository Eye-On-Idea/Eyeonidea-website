<template>
  <section>
    <UContainer class="max-w-[1440px] py-14 md:py-20">
      <header class="mb-8 text-primary-900">
        <h2 class="text-2xl md:text-3xl font-semibold">
          Equipment & Solutions
        </h2>
        <p class="mt-2">
          Overview of packaging and processing systems for pasta, rice, beans,
          vegetables, meats, adhesives and more.
        </p>
      </header>
      <div class="grid gap-6 md:grid-cols-3">
        <UCard class="hover:shadow-lg transition-shadow card">
          <template #header>
            <h3 class="font-semibold">KartridgPak Chubmaker</h3>
          </template>
          <p>
            High‑volume chub packaging with continuous operation, flexible
            sealing, and lower material costs.
          </p>
          <template #footer>
            <UButton
              variant="solid"
              to="/equipment-and-solutions#chubmaker"
              class="mt-12"
              >Learn more</UButton
            >
          </template>
        </UCard>
        <UCard class="hover:shadow-lg transition-shadow card">
          <template #header>
            <h3 class="font-semibold">Lyco Clean‑Flow®</h3>
          </template>
          <p>
            Continuous blanchers with Hydro‑Flow® tech for higher recovery,
            uniform quality, and rapid changeovers.
          </p>
          <template #footer>
            <UButton
              variant="solid"
              to="/equipment-and-solutions#clean-flow"
              class="mt-6"
              >Learn more</UButton
            >
          </template>
        </UCard>
        <UCard class="hover:shadow-lg transition-shadow card">
          <template #header>
            <h3 class="font-semibold">Rotary Drum Systems</h3>
          </template>
          <p>
            Unique blancher/cooker/coolers with space‑saving design, sanitation
            benefits and energy efficiency.
          </p>
          <template #footer>
            <UButton
              variant="solid"
              to="/equipment-and-solutions#rotary-drum"
              class="mt-12"
              >Learn more</UButton
            >
          </template>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
}
</style>
