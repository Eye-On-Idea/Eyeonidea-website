<script setup lang="ts">
import SRAnnouncer from "./SRAnnouncer.vue";
import MyFoot from "~/components/MyFoot.vue";
import MyHeader from "~/components/MyHeader.vue";
</script>

<template>
  <UApp>
    <NuxtLayout>
      <MyHeader />
      <NuxtPage />
      <SRAnnouncer />
      <MyFoot />
      <CookieControl locale="en" />
    </NuxtLayout>
  </UApp>
</template>
