<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.creatingContent.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.creatingContent.introText") }}</p>

    <h2>{{ t("clientHub.article.content.creatingContent.stepsTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.creatingContent.step1") }}</li>
      <li>{{ t("clientHub.article.content.creatingContent.step2") }}</li>
      <li>{{ t("clientHub.article.content.creatingContent.step3") }}</li>
      <li>{{ t("clientHub.article.content.creatingContent.step4") }}</li>
    </ol>

    <ClientHubScreenshotPlaceholder description="Creating a new content item in the Studio" />

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.creatingContent.note") }}
    </div>

    <h2>{{ t("clientHub.article.content.creatingContent.fieldsTitle") }}</h2>
    <p>{{ t("clientHub.article.content.creatingContent.fieldsText") }}</p>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.creatingContent.tip") }}
    </div>
  </div>
</template>
