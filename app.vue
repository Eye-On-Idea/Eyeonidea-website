<script setup lang="ts">
import SRAnnouncer from "./SRAnnouncer.vue";

const { locale } = useI18n();
useHead({ htmlAttrs: { lang: locale } });
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
      <SRAnnouncer />
    </NuxtLayout>
  </UApp>
</template>
