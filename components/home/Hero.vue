<template>
  <section class="relative" id="hero">
    <UContainer class="max-w-[1440px] py-12 md:py-20">
      <div class="grid gap-8 md:grid-cols-2 md:items-center">
        <!-- Copy -->
        <div class="max-w-3xl txt-cont">
          <h1 class="text-4xl md:text-5xl font-semibold tracking-tight">
            Food Processing & Packaging <br />
            Serving the Nordics
          </h1>
          <p class="mt-4 text-lg">
            20+ years delivering reliable, cost‑effective equipment and
            afterservice across Denmark, Finland, Spain and beyond. Trusted by
            producers for ROI‑driven solutions.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <UButton
              color="neutral"
              variant="solid"
              size="lg"
              to="/equipment-and-solutions"
              >Explore equipment</UButton
            >
            <UButton variant="solid" size="lg" to="/about-and-contact#contact"
              >Contact sales</UButton
            >
          </div>
        </div>
        <!-- Media -->
        <div
          class="relative rounded-xl overflow-hidden shadow-sm h-full w-full"
        >
          <div
            class="relative w-full h-full aspect-video md:aspect-auto md:h-[420px] lg:h-[520px]"
          >
            <video
              ref="heroVideo"
              :controls="showControls"
              @mouseenter="showControls = true"
              @mouseleave="showControls = false"
              src="/assets/video/tegetec_v2Compressed.mp4"
              aria-label="Video of various machinery for food production packaging"
              autoplay
              muted
              loop
              playsinline
              class="absolute inset-0 w-full h-full object-cover"
            ></video>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
const showControls = ref(false);
const heroVideo = ref<HTMLVideoElement | null>(null);
</script>

<style lang="scss" scoped>
#hero {
  color: var(--color-primary-50);
  border-radius: 0 0 6px 6px;
  background-color: var(--color-primary-900);
}
</style>
