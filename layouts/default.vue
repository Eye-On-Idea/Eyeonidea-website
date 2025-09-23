<script setup lang="ts">
import MyContactAbs from "~/components/MyContactAbs.vue";
</script>

<template>
  <div class="default-layout min-h-screen flex flex-col">
    <main class="flex-1">
      <slot />
    </main>
    <MyContactAbs />
  </div>
</template>
