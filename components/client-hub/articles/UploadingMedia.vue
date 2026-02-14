<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.uploadingMedia.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.uploadingMedia.introText") }}</p>

    <h2>{{ t("clientHub.article.content.uploadingMedia.stepsTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.uploadingMedia.step1") }}</li>
      <li>{{ t("clientHub.article.content.uploadingMedia.step2") }}</li>
      <li>{{ t("clientHub.article.content.uploadingMedia.step3") }}</li>
    </ol>

    <ClientHubScreenshotPlaceholder description="The media upload interface in the Studio" />

    <h2>{{ t("clientHub.article.content.uploadingMedia.formatsTitle") }}</h2>
    <p>{{ t("clientHub.article.content.uploadingMedia.formatsText") }}</p>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.uploadingMedia.tip") }}
    </div>
  </div>
</template>
