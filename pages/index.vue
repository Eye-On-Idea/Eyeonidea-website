<template>
  <div class="main-bg fixed w-full h-screen overflow-hidden"></div>
  <!-- Hero content -->
  <div
    id="hero"
    class="flex-row h-full w-full relative justify-center align-middle"
  >
    <section class="hero-left flex-col items-center">
      <h1>
        <b>Transform</b> <span class="sec-col">good</span> ideas <br />
        into <span class="sec-col">great</span> <b>experiences</b>
      </h1>
      <p>
        Your users expect products that work well and feel easy to use. Here at
        Eye On Idea, we test, guide, and support you in building digital
        experiences that are reliable, accessible, and built to last.
      </p>
    </section>
    <section class="hero-right"></section>
  </div>
</template>

<script setup>
// no script needed for this block
</script>

<style lang="scss" scoped>
.main-bg {
  background-color: var(--quart-colour);
  background-image: url("/images/pexels-small.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

@media (min-width: 768px) {
  .main-bg {
    background-image: url("/images/pexels-medium.jpg");
  }
}
@media (min-width: 1440px) {
  .main-bg {
    background-image: url("/images/pexels-large.jpg");
  }
}

/* Large screens (desktops / wide monitors) */
@media (min-width: 1440px) {
  .main-bg {
    background-image: url("/images/pexels-large.jpg");
  }
}

#hero {
  margin: 0 auto;
  width: 100%;
  min-height: 100lvh;
  max-width: 1440px;
  padding-top: 10%;

  .sec-col {
    color: var(--sec-colour);
  }

  .hero-left {
    width: 45%;
    height: 100%;

    h1 {
      font-size: 48px;
    }
    p {
    }
  }

  .hero-right {
    width: 45%;
    height: 100%;
  }
}
</style>
