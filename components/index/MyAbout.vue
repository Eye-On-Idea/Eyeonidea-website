<script setup lang="ts">
import MyServices from "./MyServices.vue";
</script>

<template>
  <div
    id="about"
    aria-labelledby="about-title"
    class="bg flex bg-neutral-900/50 backdrop-blur-xs"
  >
    <div class="cont flex flex-row">
      <section class="flex flex-col gap-1">
        <h2 id="about-title" class="!text-brand-200">Eye On Idea</h2>
        <p class="w-[95%]">
          <strong
            >Your digital consultant to improve, refine and grow digital
            products.</strong
          >
        </p>

        <section class="flex flex-col gap-4 mt-3" aria-labelledby="areas-title">
          <ul class="flex flex-col gap-2 list-inside">
            <li class="list-disc!">
              Spot issues early (UX, UI, or conceptual gaps).
            </li>
            <li class="list-disc!">
              Provide ideas and direction for product development.
            </li>
            <li class="list-disc!">
              Web development and visual identity creation, for smaller and new
              business.
            </li>
            <li class="list-disc!">
              Deliver practical, tailored advice and solutions.
            </li>
          </ul>
        </section>
        <p class="w-[90%] mt-2">
          At <strong>Eye On Idea</strong> we help businesses shape smarter, more
          user-friendly digital products by combining concept development,
          usability insight, and practical tech know-how. Your consulting
          partner, bringing clarity to ideas, spotting UX and UI issues, and
          offering straightforward human-centered solutions.
        </p>
        <p class="w-[90%] mt-2">
          We also guide companies in choosing digital tools that fit their
          needs, with a focus on privacy-friendly, EU-based services. For those
          who need a solid web presence, we build modern, accessible websites
          tailored to smaller teams and budgets. Whether you’re building
          something new or improving what’s already there, we help turn ideas
          into digital experiences that work better for real people.
        </p>
      </section>

      <div
        class="carousel flex flex-col justify-center"
        role="region"
        aria-labelledby="about-carousel-title"
      >
        <UCarousel
          :items="[
            {
              src: '/images/desk/rune_desk1.png',
              alt: 'Rune working at desk with monitor',
            },
            {
              src: '/images/desk/rune_desk2.png',
              alt: 'Rune at desk, focused on QA testing',
            },
          ]"
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
