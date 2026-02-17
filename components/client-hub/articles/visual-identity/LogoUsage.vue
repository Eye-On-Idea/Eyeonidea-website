<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.logoUsage.versionsTitle") }}</h2>
    <p>{{ t("clientHub.article.content.logoUsage.versionsText") }}</p>
    <ul>
      <li>{{ t("clientHub.article.content.logoUsage.version1") }}</li>
      <li>{{ t("clientHub.article.content.logoUsage.version2") }}</li>
      <li>{{ t("clientHub.article.content.logoUsage.version3") }}</li>
      <li>{{ t("clientHub.article.content.logoUsage.version4") }}</li>
      <li>{{ t("clientHub.article.content.logoUsage.version5") }}</li>
      <li>{{ t("clientHub.article.content.logoUsage.version6") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.logoUsage.rulesTitle") }}</h2>
    <p>{{ t("clientHub.article.content.logoUsage.rulesText") }}</p>

    <h2>{{ t("clientHub.article.content.logoUsage.doNotTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.logoUsage.doNot1") }}</li>
      <li>{{ t("clientHub.article.content.logoUsage.doNot2") }}</li>
      <li>{{ t("clientHub.article.content.logoUsage.doNot3") }}</li>
      <li>{{ t("clientHub.article.content.logoUsage.doNot4") }}</li>
      <li>{{ t("clientHub.article.content.logoUsage.doNot5") }}</li>
    </ul>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.logoUsage.warning") }}
    </div>
  </div>
</template>
