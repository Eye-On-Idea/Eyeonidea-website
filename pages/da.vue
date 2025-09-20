<template locale="da">
  <div class="main-bg fixed w-full h-screen overflow-hidden"></div>
  <index-my-hero-da />
  <index-my-about-da />
  <index-my-services-da />
  <index-my-contact-faq-da />
  <CookieControl locale="da" />
</template>

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
