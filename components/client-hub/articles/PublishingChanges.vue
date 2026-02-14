<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.publishingChanges.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.publishingChanges.introText") }}</p>

    <h2>{{ t("clientHub.article.content.publishingChanges.stepsTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.publishingChanges.step1") }}</li>
      <li>{{ t("clientHub.article.content.publishingChanges.step2") }}</li>
      <li>{{ t("clientHub.article.content.publishingChanges.step3") }}</li>
    </ol>

    <ClientHubScreenshotPlaceholder description="The Publish button in the Studio" />

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.publishingChanges.warning") }}
    </div>

    <h2>{{ t("clientHub.article.content.publishingChanges.delayTitle") }}</h2>
    <p>{{ t("clientHub.article.content.publishingChanges.delayText") }}</p>
  </div>
</template>
