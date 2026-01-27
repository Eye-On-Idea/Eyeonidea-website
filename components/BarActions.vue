<template>
  <div class="flex flex-wrap gap-2">
    <UButton color="brand" variant="solid" @click="acceptAll"
      >Accept all</UButton
    >
    <UButton variant="ghost" @click="rejectAll">Reject all</UButton>
    <UButton variant="outline" @click="acceptOnlyNecessary"
      >Only necessary</UButton
    >
  </div>
</template>

<script setup lang="ts">
const cc = useCookieControl();
// These method names are stable across versions; if TS complains,
// fallback to cc.toggle and cc.accept/cc.decline patterns your version exposes.
const acceptAll = () => cc.acceptAll();
const rejectAll = () => cc.declineAll();
const acceptOnlyNecessary = () =>
  cc.acceptNecessary?.() ?? cc.accept(["ncc-essential"]);
</script>
