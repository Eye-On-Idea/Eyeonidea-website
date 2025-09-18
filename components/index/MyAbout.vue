<template>
  <div class="bg flex bg-neutral-900/50 backdrop-blur-xs" id="about">
    <div class="cont flex flex-row">
      <section class="flex flex-col gap-1">
        <h2 class="!text-brand-200" id="about-title">Eye On Idea</h2>
        <p><strong>Human-centered QA for better digital Products</strong></p>
        <section class="flex flex-col gap-4 mt-3">
          <h3>EOI Areas</h3>
          <p>
            <small>
              UX · UI · Accessibility · Usability · Responsiveness ·
              Mobile/Tablet · Cross-Browser · Compatibility · Screen Readers ·
              Performance · Design · Testing · Front-End
            </small>
          </p>
          <p>
            EOI is a quality assurance partner that
            <strong>helps businesses</strong> across Europe build digital
            products that are reliable, accessible, and
            <strong>easy to use</strong>. We combine usability, accessibility,
            and front-end QA expertise to make sure your digital presence
            <strong> works for every user </strong>.
          </p>
          <p>
            We work closely with your team to review, test, and improve digital
            services. Every audit or project is tailored to your needs, with
            clear and practical steps that can be acted on right away. Our
            process is flexible, human-centered, and designed to fit into your
            workflow.
          </p>
          <p>
            With a focus on detail and measurable results, we help you deliver
            products that perform better and create smoother experiences for
            your users. Our goal is simple: to raise the quality of your digital
            solutions and support your long-term success.
          </p>
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

<script lang="ts" setup>
const aboutItems = [
  { src: "/images/desk/rune_desk1.png", alt: "Alt text 1" },
  { src: "/images/desk/rune_desk2.png", alt: "Alt text 2" },
];
</script>

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
