<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.supportAndMaintenance.basicTitle") }}</h2>
    <p>{{ t("clientHub.article.content.supportAndMaintenance.basicText") }}</p>
    <ul>
      <li>{{ t("clientHub.article.content.supportAndMaintenance.basic1") }}</li>
      <li>{{ t("clientHub.article.content.supportAndMaintenance.basic2") }}</li>
      <li>{{ t("clientHub.article.content.supportAndMaintenance.basic3") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.supportAndMaintenance.extendedTitle") }}</h2>
    <p>{{ t("clientHub.article.content.supportAndMaintenance.extendedText") }}</p>
    <ul>
      <li>{{ t("clientHub.article.content.supportAndMaintenance.extended1") }}</li>
      <li>{{ t("clientHub.article.content.supportAndMaintenance.extended2") }}</li>
      <li>{{ t("clientHub.article.content.supportAndMaintenance.extended3") }}</li>
      <li>{{ t("clientHub.article.content.supportAndMaintenance.extended4") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.supportAndMaintenance.accessTitle") }}</h2>
    <p>{{ t("clientHub.article.content.supportAndMaintenance.accessText") }}</p>
  </div>
</template>
