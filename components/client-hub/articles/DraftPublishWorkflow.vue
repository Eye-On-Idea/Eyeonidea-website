<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.draftPublishWorkflow.overviewTitle") }}</h2>
    <p>{{ t("clientHub.article.content.draftPublishWorkflow.overviewText") }}</p>

    <h2>{{ t("clientHub.article.content.draftPublishWorkflow.flowTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.draftPublishWorkflow.flow1") }}</li>
      <li>{{ t("clientHub.article.content.draftPublishWorkflow.flow2") }}</li>
      <li>{{ t("clientHub.article.content.draftPublishWorkflow.flow3") }}</li>
      <li>{{ t("clientHub.article.content.draftPublishWorkflow.flow4") }}</li>
    </ol>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.draftPublishWorkflow.tip") }}
    </div>
  </div>
</template>
