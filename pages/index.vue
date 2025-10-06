<template>
  <div class="main-bg fixed w-full h-screen overflow-hidden"></div>
  <index-my-hero />
  <index-my-about />
  <index-my-services />
  <index-my-contact-faq />
  <CookieControl locale="en" />
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

@media (min-width: 1940px) {
  .main-bg {
    background-image: url("/images/pexels-large.jpg");
    background-size: cover;
    width: 1920px;
  }
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
