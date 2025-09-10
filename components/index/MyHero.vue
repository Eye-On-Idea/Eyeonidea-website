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
      <div class="button-cont">
        <a type="button" href="#contact" class="button">Get in touch</a>
        <a type="button" href="/services" class="button"
          >See services provided
        </a>
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
      outline: auto;
      align-items: center;
      outline-color: var(--color-lime-500);

      display: flex;
      gap: 6px;
      .circle-status {
        border-radius: 20px;
        background-color: var(--color-lime-600);

        width: 15px;
        height: 15px;
      }
      p {
        color: var(--color-lime-500);
      }
    }
    .button-cont {
      display: flex;
      flex-direction: row;
      gap: 16px;
      a {
        outline-color: var(--prim-colour);
        font-family: quicksand;
        font-size: 12px;

        &:nth-child(2) {
          background-color: var(--sec-colour);
          color: var(--quart-colour);
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
    right: 47%;
    p {
      font-size: 12px;
    }
    img {
      width: 24px;
    }
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
