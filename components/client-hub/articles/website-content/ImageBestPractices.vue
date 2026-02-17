<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.imageBestPractices.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.imageBestPractices.introText") }}</p>

    <h2>{{ t("clientHub.article.content.imageBestPractices.prepareTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.imageBestPractices.prepare1") }}</li>
      <li>{{ t("clientHub.article.content.imageBestPractices.prepare2") }}</li>
      <li>{{ t("clientHub.article.content.imageBestPractices.prepare3") }}</li>
      <li>{{ t("clientHub.article.content.imageBestPractices.prepare4") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.imageBestPractices.uploadTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.imageBestPractices.uploadStep1") }}</li>
      <li>{{ t("clientHub.article.content.imageBestPractices.uploadStep2") }}</li>
      <li>{{ t("clientHub.article.content.imageBestPractices.uploadStep3") }}</li>
    </ol>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.imageBestPractices.uploadWarning") }}
    </div>

    <h3>{{ t("clientHub.article.content.imageBestPractices.cropTitle") }}</h3>
    <p>{{ t("clientHub.article.content.imageBestPractices.cropText") }}</p>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.imageBestPractices.tip") }}
    </div>
  </div>
</template>
