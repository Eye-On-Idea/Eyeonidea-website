<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.domainTransfer.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.domainTransfer.introText") }}</p>

    <h2>{{ t("clientHub.article.content.domainTransfer.processTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.domainTransfer.processStep1") }}</li>
      <li>{{ t("clientHub.article.content.domainTransfer.processStep2") }}</li>
      <li>{{ t("clientHub.article.content.domainTransfer.processStep3") }}</li>
    </ol>

    <div class="note-box">
      <p><strong>{{ t("clientHub.article.noteLabel") }}:</strong> {{ t("clientHub.article.content.domainTransfer.note") }}</p>
    </div>
  </div>
</template>
