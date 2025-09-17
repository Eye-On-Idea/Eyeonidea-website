<template>
  <div
    id="hero"
    class="flex-row h-full w-full relative justify-center align-middle"
  >
    <section class="left flex-col flex">
      <div class="project-status">
        <div class="circle-status"></div>
        <p>Open for projects</p>
      </div>
      <h1>
        <strong>Transform</strong> <span class="sec-col">good</span> ideas
        <br />
        into <span class="sec-col">great</span> <strong>experiences</strong>
      </h1>
      <p>
        Your users expect products that work well and feel easy to use. <br />
        Here at <strong>Eye On Idea</strong>, we test, guide, and support you in
        building digital experiences that are reliable, accessible, and built to
        last.
      </p>
      <div class="button-cont flex-row flex gap-6">
        <UButton
          to="#contact"
          variant="outline"
          class="border-brand-50 text-brand-50 bg-transparent hover:bg-neutral-900/75 focus-visible:ring-brand-50 text-[0.75rem] font-sans ring-brand-50"
          >Get in touch
        </UButton>

        <UButton
          to="/services"
          variant="outline"
          class="border-brand-50 bg-brand-200 ring-brand-50 hover:bg-brand-300 focus-visible:ring-brand-50 font-bold"
          ><span class="text-neutral-900 font-medium"
            >See services provided</span
          >
        </UButton>
      </div>
      <div class="some flex flex-row">
        <index-my-somecard
          :img-src="linkedinLogo"
          alt="Logo for social media
        LinkedIn"
          text="LinkedIn"
          href="https://www.linkedin.com/company/eye-on-idea/"
        />
        <index-my-somecard
          :img-src="bluesky"
          alt="Logo for social media
        Bluesky"
          text="Bluesky"
          href="https://bsky.app/profile/eyeonidea.bsky.social"
        />
        <index-my-somecard
          :img-src="instagram"
          alt="Logo for social media
        Instagram"
          text="Instagram"
          href="https://www.instagram.com/eye.on.idea/"
        />
        <index-my-somecard
          :img-src="x"
          alt="Logo for social media
        X"
          text="X"
          href="https://x.com/eyeonidea"
        />
      </div>
    </section>
    <div class="scroll flex flex-col" aria-hidden="true">
      <p>Scroll to explore</p>
      <img
        src="../../assets/icons/scroll-mouse.svg"
        alt="icon to indicate scroll possible, depicting a computer mouse with highlighted scroll wheel."
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import linkedinLogo from "/public/images/some/LinkedIn_Logo.svg";
import bluesky from "/public/images/some/Bluesky_logo.svg";
import instagram from "/public/images/some/instagram-brands-solid-full.svg";
import x from "/public/images/some/x_logo.svg";
</script>

<style lang="scss" scoped>
#hero {
  margin: 0 auto;
  width: 100%;
  min-height: 100lvh;
  max-width: 1440px;
  padding-top: 10%;
  z-index: 2;

  .sec-col {
    color: var(--sec-colour);
  }

  .left {
    width: 40%;
    height: 100%;
    row-gap: 40px;

    h1 {
      font-size: 49px;
    }
    .project-status {
      padding: 10px 14px 10px 14px;
      width: fit-content;
      border-radius: 100px;
      border-color: var(--color-lime);
      border-style: solid;
      border-width: 1px;
      align-items: center;
      display: flex;
      gap: 6px;

      .circle-status {
        border-radius: 20px;
        background-color: var(--color-lime);
        width: 15px;
        height: 15px;
      }
      p {
        color: var(--color-lime);
      }
    }
  }
  .some {
    gap: 25px;
    height: fit-content;
    padding-top: 25%;
  }
}

.right {
  width: 45%;
  height: 100%;
}
.scroll {
  align-items: center;
  position: absolute;
  bottom: 3%;
  right: 46.5%;
  p {
    font-size: 12px;
  }
  img {
    width: 24px;
  }
}

@media (max-width: 1550px) {
  #hero {
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 15%;
  }
}
@media (max-width: 1290px) {
  .scroll {
    display: none;
  }
  #hero {
    flex-direction: column;
    .left {
      width: 70%;

      p {
        &:nth-child(3) {
          width: 66%;
        }
      }
    }
  }
}
@media (max-width: 769px) {
  #hero {
    padding-top: 20%;
    .left {
      width: 100%;
      p {
        &:nth-child(3) {
          width: 80%;
        }
      }
    }
  }
}
@media (max-width: 550px) {
  #hero {
    padding-top: 25%;
    h1 {
      font-size: 36px;
    }
    p {
      width: 90%;
    }
  }
}
</style>
