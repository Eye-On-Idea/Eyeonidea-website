<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.changesNotShowing.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.changesNotShowing.introText") }}</p>

    <h2>{{ t("clientHub.article.content.changesNotShowing.checklistTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.changesNotShowing.check1") }}</li>
      <li>{{ t("clientHub.article.content.changesNotShowing.check2") }}</li>
      <li>{{ t("clientHub.article.content.changesNotShowing.check3") }}</li>
      <li>{{ t("clientHub.article.content.changesNotShowing.check4") }}</li>
    </ol>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.changesNotShowing.tip") }}
    </div>
  </div>
</template>
