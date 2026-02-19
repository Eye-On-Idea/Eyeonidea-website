<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.analyticsReporting.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.analyticsReporting.introText") }}</p>

    <ClientHubArticleImage alt="Analytics dashboard overview" caption="Example analytics dashboard" />

    <h3>{{ t("clientHub.article.content.analyticsReporting.optionsTitle") }}</h3>
    <ul>
      <li>{{ t("clientHub.article.content.analyticsReporting.option1") }}</li>
      <li>{{ t("clientHub.article.content.analyticsReporting.option2") }}</li>
      <li>{{ t("clientHub.article.content.analyticsReporting.option3") }}</li>
    </ul>

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.analyticsReporting.note") }}
    </div>
  </div>
</template>
