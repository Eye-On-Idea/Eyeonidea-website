<template>
  <section
    class="w-full min-h-[90vh] flex flex-col justify-center items-center text-white bg-[--color-neutral-900] px-6 md:px-12 lg:px-20 py-20 space-y-20"
    aria-labelledby="contact-heading"
    id="hero"
  >
    <!-- Contact Card Hero -->
    <div
      class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[--color-brand-700] rounded-2xl shadow-xl border border-[--color-brand-400]"
    >
      <div class="space-y-6 p-10">
        <img
          src="/public-material/logo-center-shadow.svg"
          alt="Eye On Idea Logo"
          class="h-14 w-auto"
        />
        <h1
          id="contact-heading"
          class="text-3xl md:text-4xl font-heading font-semibold leading-tight"
        >
          Get in Touch
        </h1>
        <p class="text-lg text-white max-w-prose">
          Whether you’re ready to collaborate, have questions, or just want to
          know more - we're just a message away. Reach out directly or use the
          contact form below.
        </p>
      </div>

      <address
        class="not-italic text-base flex flex-col gap-y-4 justify-center space-y-3 bg-brand-400 p-4 h-[100%]"
      >
        <p>
          <span class="block font-medium text-white mb-4">Email:</span>
          <a
            href="mailto:hello@eyeonidea.com"
            class="underline text-brand-50! ring ring-amber-50 p-4 rounded-lg hover:bg-brand-600 transition"
            >hello@eyeonidea.com</a
          >
        </p>
        <p>
          <span class="block font-medium text-white mb-4">Phone:</span>
          <a
            href="tel:+4529930583"
            class="underline text-brand-50! ring ring-amber-50 p-4 rounded-lg hover:bg-brand-600 transition"
            >+45 29 93 05 83</a
          >
        </p>
        <div class="flex items-center gap-3">
          <span class="font-medium">Business hours:</span>
          <span class="text-white">08:00 - 16:00</span>
        </div>
      </address>
    </div>

    <!-- Navigation Links Section -->
    <section aria-labelledby="info-links-heading" class="w-full max-w-6xl">
      <h2 id="info-links-heading" class="sr-only">
        Company information and navigation
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <UCard
          class="bg-[--color-brand-600] text-white border border-[--color-brand-300]"
        >
          <template #header>
            <h3 class="text-xl font-heading">Services</h3>
          </template>
          <p class="text-sm text-[--color-brand-50] mb-4">
            Want to know how we can help your product?
          </p>
          <NuxtLink to="/services">
            <UButton
              block
              size="sm"
              class="!bg-[--color-brand-500] hover:!bg-[--color-brand-400] text-white cursor-pointer mt-auto"
            >
              View Services
            </UButton>
          </NuxtLink>
        </UCard>

        <UCard
          class="bg-[--color-brand-600] text-white border border-[--color-brand-300]"
        >
          <template #header>
            <h3 class="text-xl font-heading">About EOI</h3>
          </template>
          <p class="text-sm text-[--color-brand-50] mb-4">
            Curious about our values, approach and background?
          </p>
          <NuxtLink to="/about">
            <UButton
              block
              size="sm"
              class="!bg-[--color-brand-500] hover:!bg-[--color-brand-400] text-white cursor-pointer mt-auto"
            >
              About Us
            </UButton>
          </NuxtLink>
        </UCard>

        <UCard
          class="bg-[--color-brand-600] text-white border border-[--color-brand-300]"
        >
          <template #header>
            <h3 class="text-xl font-heading">Legal</h3>
          </template>
          <p class="text-sm text-[--color-brand-50] mb-4">
            Company registration details and transparency policies.
          </p>
          <NuxtLink to="/about/legal">
            <UButton
              block
              size="sm"
              class="!bg-[--color-brand-500] hover:!bg-[--color-brand-400] text-white cursor-pointer mt-auto"
            >
              View Legal Info
            </UButton>
          </NuxtLink>
        </UCard>

        <UCard
          class="bg-[--color-brand-600] text-white border border-[--color-brand-300]"
        >
          <template #header>
            <h3 class="text-xl font-heading">Policies</h3>
          </template>
          <p class="text-sm text-[--color-brand-50] mb-4">
            Read about how we handle data, privacy and cookie use.
          </p>
          <NuxtLink to="/about/policies">
            <UButton
              block
              size="sm"
              class="!bg-[--color-brand-500] hover:!bg-[--color-brand-400] text-white cursor-pointer mt-auto"
            >
              View Policies
            </UButton>
          </NuxtLink>
        </UCard>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
section {
  font-family: var(--font-sans);
}
h1,
h2,
h3 {
  font-family: var(--font-heading);
}
</style>
