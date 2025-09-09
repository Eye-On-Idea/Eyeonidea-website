<template>
  <div id="hero" class="flex-row">
    <section class="hero-left">
      <h1>
        <b>Transform</b> <span class="sec-col">good</span> ideas into
        <span class="sec-col">great </span>
        <b>experiences</b>
      </h1>
    </section>
    <section class="hero-right"></section>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
#hero {
  width: 100%;
  height: 80lvh;

  .sec-col {
    color: var(--sec-colour);
  }
  .hero-left {
    width: 45%;
    height: 100%;
    h1 {
      font-size: 48px;
      width: 80%;
    }
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
</style>
