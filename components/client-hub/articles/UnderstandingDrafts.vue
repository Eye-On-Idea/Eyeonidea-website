<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.understandingDrafts.whatTitle") }}</h2>
    <p>{{ t("clientHub.article.content.understandingDrafts.whatText") }}</p>

    <h2>{{ t("clientHub.article.content.understandingDrafts.differenceTitle") }}</h2>
    <ul>
      <li><strong>{{ t("clientHub.article.content.understandingDrafts.draftLabel") }}</strong> — {{ t("clientHub.article.content.understandingDrafts.draftDesc") }}</li>
      <li><strong>{{ t("clientHub.article.content.understandingDrafts.publishedLabel") }}</strong> — {{ t("clientHub.article.content.understandingDrafts.publishedDesc") }}</li>
    </ul>

    <ClientHubScreenshotPlaceholder description="Draft vs Published status indicator in the Studio" />

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.understandingDrafts.warning") }}
    </div>

    <h2>{{ t("clientHub.article.content.understandingDrafts.howToTellTitle") }}</h2>
    <p>{{ t("clientHub.article.content.understandingDrafts.howToTellText") }}</p>
  </div>
</template>
