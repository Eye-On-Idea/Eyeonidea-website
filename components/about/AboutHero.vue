<!-- Page header / hero -->
<template>
  <header id="hero">
    <UContainer class="py-16 md:py-24">
      <div class="grid md:grid-cols-12 gap-8 mt-10 md:mt-16 items-center">
        <div class="md:col-span-7">
          <h1 class="font-heading text-4xl md:text-5xl leading-tight">
            <span class="text-brand-200">Eye On Idea</span> <br />human-centered
            QA that raises the bar for digital experiences
          </h1>
          <p class="mt-4 text-lg max-w-prose">
            We help small and medium-sized teams across Europe ship accessible,
            usable, and reliable products. Our audits are actionable: we
            identify the issue, explain why it matters, and tell you how to fix
            it.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <UButton
              to="/contact"
              color="primary"
              size="lg"
              class="ring ring-brand-400 transition-all hover:ring-amber-50 hover:bg-brand-700"
              aria-label="Contact EOI"
            >
              Start a conversation
            </UButton>
            <UButton
              to="/services"
              variant="outline"
              size="lg"
              class="ring transition-all hover:ring-amber-50 hover:bg-brand-700/50"
              aria-label="View EOI services"
            >
              Explore services
            </UButton>
          </div>
          <p class="mt-4 text-sm text-neutral-600">
            Need policies or terms? Visit
            <ULink to="/about/legal"
              ><span class="underline">Legal information</span></ULink
            >
          </p>
        </div>
      </div>
    </UContainer>
  </header>
</template>
