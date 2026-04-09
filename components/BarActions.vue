<template>
  <div class="flex flex-wrap gap-2">
    <UButton color="primary" variant="solid" @click="acceptAll"
      >Accept all</UButton
    >
    <UButton variant="ghost" @click="rejectAll">Reject all</UButton>
    <UButton variant="outline" @click="acceptOnlyNecessary"
      >Only necessary</UButton
    >
  </div>
</template>

<script setup lang="ts">
const cc = useCookieControl() as {
  acceptAll?: () => void;
  declineAll?: () => void;
  acceptNecessary?: () => void;
  accept?: (cookies: string[]) => void;
};

const acceptAll = () => cc.acceptAll?.();
const rejectAll = () => cc.declineAll?.();
const acceptOnlyNecessary = () =>
  cc.acceptNecessary?.() ?? cc.accept?.(["ncc-essential"]);
</script>
