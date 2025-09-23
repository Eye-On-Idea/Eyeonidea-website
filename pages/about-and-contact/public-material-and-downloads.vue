<template>
  <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <UContainer class="max-w-[1440px] py-10 md:py-14">
      <header class="mb-8">
        <h1
          class="text-3xl md:text-4xl font-semibold tracking-tight text-primary-900"
        >
          Public material & downloads
        </h1>
        <p class="mt-3 text-primary-900">
          Browse brand assets, product visuals, and download brochures. All
          files are provided for reference.
        </p>
      </header>

      <section aria-labelledby="media-gallery-heading" class="mb-12">
        <h2
          id="media-gallery-heading"
          class="text-2xl md:text-3xl font-semibold text-primary-900 mb-4"
        >
          Gallery
        </h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Video -->
          <UCard class="bg-[var(--color-surface-1)] text-primary-900">
            <figure class="relative">
              <video
                class="w-full h-auto rounded-md"
                src="/assets/video/tegetec_v2Compressed.mp4"
                aria-label="Video of various machinery for food production packaging"
                muted
                playsinline
                controls
              ></video>
              <figcaption class="sr-only">
                Video of various machinery for food production packaging
              </figcaption>
            </figure>
          </UCard>

          <!-- Images (Lyco product images) -->
          <UCard
            v-for="img in productImages"
            :key="img.src"
            class="bg-[var(--color-surface-1)] text-primary-900"
          >
            <figure>
              <img
                :src="img.src"
                :alt="img.alt"
                class="w-full h-auto rounded-md object-contain"
              />
              <figcaption class="sr-only">{{ img.alt }}</figcaption>
            </figure>
          </UCard>

          <!-- Logos -->
          <UCard
            v-for="logo in logos"
            :key="logo.src"
            class="bg-[var(--color-surface-1)] text-primary-900"
          >
            <figure class="flex items-center justify-center">
              <img
                :src="logo.src"
                :alt="logo.alt"
                class="w-48 md:w-56 h-auto object-contain bg-white rounded-[6px] p-2 ring-1 ring-[var(--color-border)]"
              />
              <figcaption class="sr-only">{{ logo.alt }}</figcaption>
            </figure>
          </UCard>
        </div>
      </section>

      <section aria-labelledby="brochures-heading">
        <h2
          id="brochures-heading"
          class="text-2xl md:text-3xl font-semibold text-primary-900 mb-4"
        >
          PDF brochures
        </h2>
        <UCard class="bg-[var(--color-surface-1)] text-primary-900">
          <ul class="divide-y">
            <li
              v-for="pdf in pdfs"
              :key="pdf.href"
              class="py-3 flex items-center gap-4 ring-1 ring-primary-500/20 p-10 mt-4"
            >
              <Icon
                name="i-heroicons-document-arrow-down-20-solid"
                class="shrink-0"
                aria-hidden="true"
              />
              <div class="min-w-0 flex-1">
                <p class="font-medium text-primary-900 truncate">
                  {{ pdf.title }}
                </p>
                <p class="text-sm text-primary-900">{{ pdf.subtitle }}</p>
              </div>
              <UButton
                :href="pdf.href"
                download
                variant="solid"
                target="_blank"
                rel="noopener"
                :aria-label="`Download ${pdf.title} (PDF)`"
                class="ml-auto"
              >
                Download
              </UButton>
            </li>
          </ul>
        </UCard>
      </section>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
useHead({ title: "Public material & downloads — Tegetec" });

// From JSON (strip leading "public/")
const productImages = [
  {
    src: "/assets/img/lyco/content_cleanflow_92_pastablancher.png",
    alt: "Lyco Clean-Flow pasta blancher",
  },
  {
    src: "/assets/img/lyco/content_cleanflow_diagram_96.png",
    alt: "Lyco Clean-Flow process diagram",
  },
  {
    src: "/assets/img/lyco/content_lyco_rotarydrum_100.jpg",
    alt: "Lyco rotary drum system",
  },
];

const logos = [
  {
    src: "/assets/img/collaborators/elmoprint.svg",
    alt: "Logo for the company Elmoprint",
  },
  {
    src: "/assets/img/collaborators/lyco.svg",
    alt: "Logo for the company Lyco",
  },
  {
    src: "/assets/img/collaborators/mepaco-logo.svg",
    alt: "Logo for the company Mepaco",
  },
  {
    src: "/assets/img/collaborators/RA_JONES_Logo.svg",
    alt: "Logo for the company RA Jones",
  },
];
const pdfs = [
  {
    href: "/assets/brochures/lyco/15_3073-cleanflowjr.pdf",
    title: "Lyco — Clean-Flow JR brochure (PDF)",
    subtitle: "15_3073-cleanflowjr.pdf",
  },
  {
    href: "/assets/brochures/lyco/16_cleanflow.pdf",
    title: "Lyco — Clean-Flow brochure (PDF)",
    subtitle: "16_cleanflow.pdf",
  },
];
</script>

<style></style>
