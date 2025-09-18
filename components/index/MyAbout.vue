<script lang="ts" setup>
// IMG Carousel
const aboutItems = [
  { src: "/images/desk/rune_desk1.png", alt: "Alt text 1" },
  { src: "/images/desk/rune_desk2.png", alt: "Alt text 2" },
];

// Language Toggle
const { page } = usePageContent();
const about = computed(() => page.value?.about);
</script>

<template>
  <div
    v-if="about"
    :id="about.id"
    aria-labelledby="about-title"
    class="bg flex bg-neutral-900/50 backdrop-blur-xs"
  >
    <div class="cont flex flex-row">
      <section class="flex flex-col gap-1">
        <h2 id="about-title" class="!text-brand-200">{{ about.title }}</h2>
        <p v-html="about.tagline" />
        <section class="flex flex-col gap-4 mt-3" aria-labelledby="areas-title">
          <h3 id="areas-title">EOI Areas</h3>
          <p>
            <small>{{ about.areas }}</small>
          </p>
          <p v-for="(para, i) in about.paragraphs" :key="i" v-html="para" />
        </section>
      </section>
      <div
        class="carousel flex flex-col justify-center"
        role="region"
        aria-labelledby="about-carousel-title"
      >
        <UCarousel
          :items="aboutItems"
          dots
          loop
          :autoplay="{ delay: 10000 }"
          v-slot="{ item }"
          class="w-full mx-auto"
          aria-describedby="about-carousel-status"
        >
          <img :src="item.src" :alt="item.alt" class="rounded-lg" />
        </UCarousel>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  .cont {
    margin: 0 auto;
    max-width: 1440px;
    position: relative;
    padding: 50px 0 50px 0;
    height: 100%;
  }
  section {
    width: 100%;
    z-index: 2;
    padding-right: 12px;
    align-self: center;

    p {
      line-height: 1.53;
      letter-spacing: 0.6px;
      strong {
        &:only-child {
          font-size: 1.2rem;
          font-family: kanit;
          letter-spacing: 1px;
        }
      }
      small {
        text-transform: uppercase;
      }
    }
  }
  .carousel {
    width: 100%;
    z-index: 2;
    max-width: fit-content;
    max-width: 590px;
  }
}

@media (max-width: 1440px) {
  .cont {
    padding: 25px;
  }
}
@media (max-width: 1200px) {
  .cont {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    section {
      width: 80%;
      section {
        width: 100%;
      }
      p {
        padding: 0;
      }
    }
  }
}
@media (max-width: 769px) {
  .cont {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    section {
      width: 90%;
      section {
        width: 100%;
      }
      p {
        padding: 0;
        font-size: 0.8rem;
      }
    }
    .carousel {
      max-width: 590px;
      padding: 15px;
    }
  }
}
</style>
