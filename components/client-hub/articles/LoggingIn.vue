<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.loggingIn.accessTitle") }}</h2>
    <p>{{ t("clientHub.article.content.loggingIn.accessText") }}</p>

    <h2>{{ t("clientHub.article.content.loggingIn.stepsTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.loggingIn.step1") }}</li>
      <li>{{ t("clientHub.article.content.loggingIn.step2") }}</li>
      <li>{{ t("clientHub.article.content.loggingIn.step3") }}</li>
    </ol>

    <ClientHubScreenshotPlaceholder description="The Sanity Studio login screen" />

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.loggingIn.note") }}
    </div>

    <h2>{{ t("clientHub.article.content.loggingIn.bookmarkTitle") }}</h2>
    <p>{{ t("clientHub.article.content.loggingIn.bookmarkText") }}</p>
  </div>
</template>
