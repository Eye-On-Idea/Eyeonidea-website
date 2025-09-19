<template>
  <div class="cont">
    <div class="top flex flex-row justify-center">
      <section class="flex flex-col text-cont">
        <h3 class="font-bold">{{ h3 }}</h3>
        <p>{{ text1 }}</p>
      </section>
      <img
        src="../../assets/img/logo-nobg.png"
        alt="Eye On Idea logo"
        class="w-25"
      />
    </div>
    <div class="bot bg-brand-200 transition-all">
      <NuxtLink :to="href" class="nav-link"
        >Read more about <strong>{{ text2 }}</strong></NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  h3: string;
  text1: string;
  text2: string;
  href: string;
}>();
</script>
<style lang="scss" scoped>
.cont {
  min-width: 320px;
  width: 370px;
  max-width: 500px;
  .top {
    outline: solid;
    outline-color: var(--color-brand-200);
    border-radius: 6px 6px 0 6px;
    padding: 25px;
    gap: 25px;
    justify-content: space-around;
    .text-cont {
      h3 {
        font-family: var(--font-heading);
        letter-spacing: 1.1px;
      }
      p {
        font-size: 0.9rem;
      }
    }
  }
  .bot {
    border-radius: 0 0 6px 6px;
    text-align: right;
    margin-left: auto;
    font-size: 0.7rem;

    width: fit-content;
    outline: solid;
    outline-color: var(--color-brand-200);
    cursor: pointer;
    .nav-link {
      color: var(--color-neutral-900);
      padding: 6px 16px 6px 16px;
    }
    &:hover {
      background-color: var(--color-brand-300);
    }
  }
}
</style>
