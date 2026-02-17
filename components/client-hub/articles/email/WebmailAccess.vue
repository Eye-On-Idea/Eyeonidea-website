<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.webmailAccess.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.webmailAccess.introText") }}</p>

    <h2>{{ t("clientHub.article.content.webmailAccess.featuresTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.webmailAccess.feature1") }}</li>
      <li>{{ t("clientHub.article.content.webmailAccess.feature2") }}</li>
      <li>{{ t("clientHub.article.content.webmailAccess.feature3") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.webmailAccess.accessTitle") }}</h2>
    <p>{{ t("clientHub.article.content.webmailAccess.accessText") }}</p>

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.webmailAccess.note") }}
    </div>
  </div>
</template>
