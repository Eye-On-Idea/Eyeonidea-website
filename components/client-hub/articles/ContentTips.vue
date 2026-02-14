<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.contentTips.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.contentTips.introText") }}</p>

    <h2>{{ t("clientHub.article.content.contentTips.writingTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.contentTips.writing1") }}</li>
      <li>{{ t("clientHub.article.content.contentTips.writing2") }}</li>
      <li>{{ t("clientHub.article.content.contentTips.writing3") }}</li>
      <li>{{ t("clientHub.article.content.contentTips.writing4") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.contentTips.formattingTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.contentTips.formatting1") }}</li>
      <li>{{ t("clientHub.article.content.contentTips.formatting2") }}</li>
      <li>{{ t("clientHub.article.content.contentTips.formatting3") }}</li>
    </ul>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.contentTips.tip") }}
    </div>
  </div>
</template>
