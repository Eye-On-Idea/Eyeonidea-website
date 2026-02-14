<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.editingContent.findTitle") }}</h2>
    <p>{{ t("clientHub.article.content.editingContent.findText") }}</p>

    <h2>{{ t("clientHub.article.content.editingContent.stepsTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.editingContent.step1") }}</li>
      <li>{{ t("clientHub.article.content.editingContent.step2") }}</li>
      <li>{{ t("clientHub.article.content.editingContent.step3") }}</li>
      <li>{{ t("clientHub.article.content.editingContent.step4") }}</li>
    </ol>

    <ClientHubScreenshotPlaceholder description="Editing a content document in the Studio" />

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.editingContent.tip") }}
    </div>
  </div>
</template>
