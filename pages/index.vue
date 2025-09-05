<template>
  <main>
    <div id="hero" class="flex row align justify">
      <section class="hero-left"></section>
      <!-- <div aria-hidden="true" class="dec-line"></div> -->
      <section class="hero-right"></section>
    </div>
  </main>
</template>

<script></script>

<style lang="scss" scoped>
main {
  padding: 2%;
  #hero {
    width: 100%;
    height: 80lvh;

    .hero-left {
      width: 45%;
      height: 100%;
    }
    .dec-line {
      height: 100%;
      width: 2%;
      border-radius: var(--border-radius);
      background-color: var(--prim-colour);
    }
    .hero-right {
      width: 45%;
      height: 100%;
    }
  }
}
</style>
