<script lang="ts" setup>
//Import SOME Logos
import linkedinLogo from "/images/some/LinkedIn_Logo.svg";
import bluesky from "/images/some/bluesky.svg";
import instagram from "/images/some/instagram-brands-solid-full.svg";
import x from "/images/some/x_logo.svg";
//Scroll toggle
import { onMounted, onUnmounted, ref } from "vue";
const isAtTop = ref(true);
const handleScroll = () => {
  isAtTop.value = window.scrollY < 50;
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div
    id="hero"
    class="flex-row h-full w-full relative justify-center align-middle bg-neutral-900/10"
  >
    <section class="left flex-col flex">
      <div class="project-status">
        <div class="circle-status"></div>
        <p>Open for projects</p>
      </div>

      <h1>
        <strong>Transform</strong>
        <span class="text-brand-200"> good</span> ideas<br />
        into <span class="text-brand-200">great</span>
        <strong> experiences</strong>
      </h1>

      <p>
        Your users expect products that just work. Reliably and built to last.
        <br /><strong>Eye On Idea</strong> helps you ship better digital
        experiences with clear, actionable quality assessment and idea
        development.
      </p>

      <div class="button-cont flex-row flex gap-6">
        <UButton
          href="#contact"
          variant="outline"
          class="border-brand-50 text-brand-50 bg-transparent hover:bg-neutral-900/75 focus-visible:ring-brand-50 text-[0.75rem] font-sans ring-brand-50"
        >
          <span>Get in touch</span>
        </UButton>

        <UButton
          href="#services"
          variant="outline"
          class="border-brand-50 bg-brand-200 ring-brand-50 hover:bg-brand-300 focus-visible:ring-brand-50 font-bold"
        >
          <span class="text-neutral-900 font-medium"
            >What we can do for you</span
          >
        </UButton>
      </div>

      <div class="some flex flex-row">
        <index-my-somecard
          :img-src="linkedinLogo"
          alt="Logo for social media LinkedIn"
          text="LinkedIn"
          href="https://www.linkedin.com/company/eye-on-idea/"
        />
        <index-my-somecard
          :img-src="bluesky"
          alt="Logo for social media Bluesky"
          text="Bluesky"
          href="https://bsky.app/profile/eyeonidea.bsky.social"
        />
        <index-my-somecard
          :img-src="instagram"
          alt="Logo for social media Instagram"
          text="Instagram"
          href="https://www.instagram.com/eye.on.idea/"
        />
        <index-my-somecard
          :img-src="x"
          alt="Logo for social media X"
          text="X"
          href="https://x.com/eyeonidea"
        />
      </div>
    </section>

    <div class="scroll flex flex-col" aria-hidden="true">
      <p>Scroll to explore</p>
      <img
        src="/public-material/icons/scroll-mouse.svg"
        alt="icon to indicate scrolling is possible, depicting a computer mouse with a highlighted scroll wheel."
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#hero {
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  padding-top: 10%;
  padding-bottom: 5%;
  z-index: 2;
  .left {
    width: 40%;
    height: 100%;
    row-gap: 40px;
    h1 {
      font-size: 3.2rem;
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
  bottom: 12%;
  right: 46.5%;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  p {
    font-size: 12px;
  }
  img {
    width: 24px;
  }
  &.hidden {
    opacity: 0;
    visibility: hidden;
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
@media (max-width: 590px) {
  #hero {
    padding-top: 25%;
    min-height: 50lvh;
    .left {
      row-gap: 20px;
    }
    h1 {
      font-size: 3rem !important;
    }
    p {
      width: 100% !important;
    }
    .project-status {
      padding: 5px 10px 5px 10px !important;
      gap: 6px;
      font-size: 0.9rem;
      .circle-status {
        width: 10px !important;
        height: 10px !important;
      }
    }
  }
}
@media (max-width: 420px) {
  #hero {
    padding-top: 25%;
    h1 {
      font-size: 2rem !important;
    }
    p {
      width: 100% !important;
    }
  }
}
</style>
