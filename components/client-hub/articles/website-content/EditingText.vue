<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.editingText.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.editingText.introText") }}</p>

    <h2>{{ t("clientHub.article.content.editingText.stepsTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.editingText.step1") }}</li>
      <li>{{ t("clientHub.article.content.editingText.step2") }}</li>
      <li>{{ t("clientHub.article.content.editingText.step3") }}</li>
    </ol>

    <h3>{{ t("clientHub.article.content.editingText.pastingTitle") }}</h3>
    <p>{{ t("clientHub.article.content.editingText.pastingText") }}</p>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.editingText.tip") }}
    </div>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.editingText.warning") }}
    </div>
  </div>
</template>
