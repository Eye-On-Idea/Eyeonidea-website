<template>
  <div class="main-bg fixed w-full h-screen overflow-hidden"></div>
  <index-my-hero />
  <index-my-about />
  <index-my-services />
  <index-my-contact-faq />
</template>

<script setup lang="ts">
onMounted(() => {
  const { lang } = useLang();
  const other = lang.value === "en" ? "da" : "en";
  import(/* @vite-ignore */ `~/content/${other}/index.json`).catch(() => {});
});
</script>

<style lang="scss" scoped>
.main-bg {
  background-color: var(--quart-colour);
  background-image: url("/images/pexels-large.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  max-width: 1920px;
}

@media (max-width: 1440px) {
  .main-bg {
    background-image: url("/images/pexels-medium.jpg");
  }
}
@media (max-width: 768px) {
  .main-bg {
    background-image: url("/images/pexels-small.jpg");
  }
}
</style>
