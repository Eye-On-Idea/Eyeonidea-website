<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.contentUpdates.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.contentUpdates.introText") }}</p>

    <h2>{{ t("clientHub.article.content.contentUpdates.processTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.contentUpdates.processStep1") }}</li>
      <li>{{ t("clientHub.article.content.contentUpdates.processStep2") }}</li>
      <li>{{ t("clientHub.article.content.contentUpdates.processStep3") }}</li>
      <li>{{ t("clientHub.article.content.contentUpdates.processStep4") }}</li>
    </ol>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.contentUpdates.tip") }}
    </div>
  </div>
</template>
