<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.altTextAndFiles.altTextTitle") }}</h2>
    <p>{{ t("clientHub.article.content.altTextAndFiles.altTextText") }}</p>
    <p class="good-example">{{ t("clientHub.article.content.altTextAndFiles.altTextGood") }}</p>
    <p class="bad-example">{{ t("clientHub.article.content.altTextAndFiles.altTextBad") }}</p>

    <h2>{{ t("clientHub.article.content.altTextAndFiles.publishTitle") }}</h2>
    <p>{{ t("clientHub.article.content.altTextAndFiles.publishText") }}</p>

    <h2>{{ t("clientHub.article.content.altTextAndFiles.filesTitle") }}</h2>
    <p>{{ t("clientHub.article.content.altTextAndFiles.filesText") }}</p>
    <ul>
      <li>{{ t("clientHub.article.content.altTextAndFiles.file1") }}</li>
      <li>{{ t("clientHub.article.content.altTextAndFiles.file2") }}</li>
      <li>{{ t("clientHub.article.content.altTextAndFiles.file3") }}</li>
      <li>{{ t("clientHub.article.content.altTextAndFiles.file4") }}</li>
    </ul>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.altTextAndFiles.warning") }}
    </div>
  </div>
</template>
