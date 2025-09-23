<template>
  <ESHrIntro />
  <ESSystems />
  <ChubmakerTables />
  <ESProcess />
</template>

<script lang="ts" setup>
import ChubmakerTables from "~/components/equipment/ChubmakerTables.vue";
import ESHrIntro from "~/components/equipment/ESHrIntro.vue";
import ESProcess from "~/components/equipment/ESProcess.vue";
import ESSystems from "~/components/equipment/ESSystems.vue";
useHead({
  title: "Equipment & Solutions",
  meta: [
    {
      name: "description",
      content:
        "Processing (blanching, cook/cool, material handling) and packaging (chub/cartoning) with integration and service.",
    },
  ],
});
</script>

<style lang="scss" scoped></style>
